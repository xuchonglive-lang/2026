'use strict';
module.exports = {
  /**
   * Admin 端横向拉取阅览足迹大盘
   * @url admin/info/log/sys/getList
   * @description 管理员全天候排查阅读流水，带全真实名及部门关联。
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };
    
    let { pageIndex = 1, pageSize = 15 } = data;
    
    // 从多级承载点中强力提取核心参数 (vk-data-table 的数据默认包裹在 formData 中)
    let info_id = data.info_id || (data.formData && data.formData.info_id);
    let real_name = data.real_name || (data.formData && data.formData.real_name) || "";
    
    if (!real_name && data._filter && typeof data._filter === 'string') {
        let match = data._filter.match(/real_name.*?\/(.*?)\//);
        if (match && match[1]) real_name = match[1];
    }
    
    let whereJson = {};
    if (info_id) {
       whereJson.info_id = info_id;
    }

    // 修复：如果传了搜索条件，必须在主表分页【之前】反查回来
    if (real_name && typeof real_name === 'string' && real_name.trim() !== '') {
        let searchUserRes = await db.collection("uni-id-users")
           .where({ real_name: new RegExp(real_name.trim(), 'i') })
           .field({ _id: true })
           .limit(1000)
           .get();
        let matchedIds = searchUserRes.data.map(u => u._id);
        
        if (matchedIds.length === 0) {
            // 没有搜到这个人，直接返回空大盘，不往后查了
            return { code: 0, msg: '', rows: [], total: 0 };
        }
        whereJson.user_id = _.in(matchedIds);
    }

    // 先拿到纯净且筛选完边界的流水表基线数据
    let logRes = await vk.baseDao.getTableData({
      dbName: "info-read-log",
      data: { pageIndex, pageSize },
      whereJson: whereJson,
      sortArr: [{ "name": "read_time", "type": "desc" }]
    });

    if (logRes.rows && logRes.rows.length > 0) {
      let uids = logRes.rows.map(item => item.user_id);
      
      let userRes = await db.collection("uni-id-users")
          .where({ _id: _.in(uids) })
          .field({ real_name: true, nickname: true, department_name: true, avatar: true })
          .limit(1000)
          .get();
      
      let uMap = {};
      userRes.data.forEach(u => uMap[u._id] = u);
      
      logRes.rows.forEach(item => {
        let uInfo = uMap[item.user_id];
        item.userInfo = uInfo ? [uInfo] : [];
        // 为了 admin data-table 直出，拍扁属性
        item.reader_real_name = uInfo ? (uInfo.real_name || uInfo.nickname || "未知矿工") : "匿名用户";
        item.reader_department = uInfo ? (uInfo.department_name || "-") : "-";
      });
    }

    return logRes;
  }
}
