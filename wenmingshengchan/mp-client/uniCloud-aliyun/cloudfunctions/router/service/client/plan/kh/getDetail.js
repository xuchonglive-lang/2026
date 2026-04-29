'use strict';
module.exports = {
  /**
   * C端小程序查看详细计划信息及历史跟踪反馈接口
   * @url client/plan/kh/getDetail
   * @description 通过单条拉取该计划核心骨架，同时跨域融合其执行工长昵称以形成立体展示结构，并在最后处理嵌套对象反馈的真实人名下发
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, _ } = util;
    let { plan_id } = data;

    // 非法入参回弹
    if (!plan_id) return { code: -1, msg: "确实详情依赖ID" };

    let res = { code: 0, msg: '' };

    // 获取计划详细基础数据（完全弃用不可靠的 foreignDB，改为全手动精确装配）
    let itemDoc = await vk.baseDao.findById({
      dbName: "daily-plan",
      id: plan_id
    });

    if (itemDoc) {
      // 1. 手动关联下达人 (兼容部分旧数据记录为 uid 字段，新数据记录为 issuer_uid)
      let currentIssuerUid = itemDoc.issuer_uid || itemDoc.uid;
      if (currentIssuerUid) {
        let issuerRes = await vk.baseDao.findById({
          dbName: "uni-id-users",
          id: currentIssuerUid,
          fieldJson: { _id: 1, nickname: 1, avatar: 1, real_name: 1, username: 1 }
        });
        itemDoc.issuer_info = issuerRes ? [issuerRes] : [];
      } else {
        itemDoc.issuer_info = [];
      }

      // 2. 手动关联执行人 (解决外键不支持字符串数组或 fieldJson 兼容性问题)
      if (itemDoc.assignee_ids && Array.isArray(itemDoc.assignee_ids) && itemDoc.assignee_ids.length > 0) {
        let usersRes = await vk.baseDao.selects({
          dbName: "uni-id-users",
          whereJson: { _id: _.in(itemDoc.assignee_ids) },
          fieldJson: { _id: 1, nickname: 1, avatar: 1, real_name: 1, username: 1 },
          pageSize: 1000
        });
        itemDoc.assignee_list = usersRes.rows || [];
      } else {
        itemDoc.assignee_list = [];
      }

      // 3. 手动关联区域 (取代 foreignDB)
      if (itemDoc.area_id) {
        let areaRes = await vk.baseDao.findById({
          dbName: "base-area",
          id: itemDoc.area_id,
          fieldJson: { name: 1 }
        });
        itemDoc.area_info = areaRes ? [areaRes] : [];
      } else {
        itemDoc.area_info = [];
      }

      // 4. 手动关联部门 (取代 foreignDB)
      if (itemDoc.dept_id) {
        let deptRes = await vk.baseDao.findById({
          dbName: "base-dept",
          id: itemDoc.dept_id,
          fieldJson: { name: 1 }
        });
        itemDoc.dept_info = deptRes ? [deptRes] : [];
      } else {
        itemDoc.dept_info = [];
      }

      // 获取当前计划体内夹杂的多态历史跟进子集 feedbacks (含作业人员录入及组长驳回/通过审批)
      let feedbacks = itemDoc.feedbacks || [];
      if (feedbacks.length > 0) {
        // 利用提取重组提取所有在这条单据上留痕互动的身份账户实体 UID
        let uids = feedbacks.map(item => item.uid).filter(v => !!v);

        // 执行并发集中的单次联合大查询来化解嵌套用户详情反查(避免恶性 N+1 慢SQL查库问题)
        let usersRes = await vk.baseDao.select({
          dbName: "uni-id-users",
          whereJson: {
            _id: _.in(uids) // 限定从刚才摘出来的uid列表中检索名字
          },
          fieldJson: { nickname: true, real_name: true, username: true, avatar: true } // 只暴露花名和图像以减负
        });

        // 二手重组化身为 O(1) 取值的 HashMap 高效路由哈希
        let userMap = {};
        usersRes.rows.forEach(u => {
          userMap[u._id] = u;
        });

        // 最后再次迭代并强力拼凑出全形态历史供客户端直接复用上屏
        feedbacks.forEach(item => {
          if (!item.uid) {
            // 兼容旧的历史脏数据（当时保存记录时没有存入 uid）
            item.nickname = '未知历史用户';
            item.avatar = '';
          } else {
            let uinfo = userMap[item.uid] || {};
            item.nickname = uinfo.real_name || uinfo.nickname || uinfo.username || '未知身份';
            item.avatar = uinfo.avatar || '';
          }
        });

        // 倒序：让最近发生的事情永远顶到视图呈现列表顶端排头
        itemDoc.feedbacks = feedbacks.sort((a, b) => b.time - a.time);
      }
      res.item = itemDoc;
    } else {
      res.code = -1;
      res.msg = "单据不存在或已被删除";
    }

    return res;
  }
}
