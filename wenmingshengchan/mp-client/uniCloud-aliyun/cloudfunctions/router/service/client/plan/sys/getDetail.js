'use strict';
module.exports = {
  /**
   * C端小程序查看详细计划信息及历史跟踪反馈接口
   * @url client/plan/sys/getDetail
   * @description 通过单条拉取该计划核心骨架，同时跨域融合其执行工长昵称以形成立体展示结构，并在最后处理嵌套对象反馈的真实人名下发
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, _ } = util;
    let { plan_id } = data;

    // 非法入参回弹
    if (!plan_id) return { code: -1, msg: "确实详情依赖ID" };

    let res = { code: 0, msg: '' };

    // 获取计划详细结构同时带出两级虚拟外联参数(左连双表)
    let itemDoc = await vk.baseDao.findById({
      dbName: "daily-plan",
      id: plan_id,
      foreignDB: [
        {
          dbName: "uni-id-users",
          localKey: "issuer_uid",  // 创建方管理员身份
          foreignKey: "_id",
          as: "issuer_info",
          limit: 1,
          fieldJson: { nickname: true, avatar: true }
        },
        {
          dbName: "uni-id-users",
          localKey: "assignee_ids", // C端指配负责的职工数组并集
          foreignKey: "_id",
          as: "assignee_list",
          fieldJson: { nickname: true, avatar: true }
        },
        {
          dbName: "base-area",
          localKey: "area_id",
          foreignKey: "_id",
          as: "area_info",
          limit: 1,
          fieldJson: { name: true }
        }
      ]
    });

    if (itemDoc) {
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
          fieldJson: { nickname: true, avatar: true } // 只暴露花名和图像以减负
        });

        // 二手重组化身为 O(1) 取值的 HashMap 高效路由哈希
        let userMap = {};
        usersRes.rows.forEach(u => {
          userMap[u._id] = u;
        });

        // 最后再次迭代并强力拼凑出全形态历史供客户端直接复用上屏
        feedbacks.forEach(item => {
          let uinfo = userMap[item.uid] || {};
          item.nickname = uinfo.nickname || '未命名';
          item.avatar = uinfo.avatar || '';
        });
        
        // 倒序：让最近发生的事情永远顶到视图呈现列表顶端排头
        itemDoc.feedbacks = feedbacks.sort((a,b) => b.time - a.time);
      }
      res.item = itemDoc;
    } else {
      res.code = -1;
      res.msg = "单据不存在或已被删除";
    }

    return res;
  }
}
