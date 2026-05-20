module.exports = {
  /**
   * 获取指派给我的重点项目列表
   * @url client/keywork/kh/getProjectList
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let uid = userInfo ? userInfo._id : null;

    let pageIndex = data.pageIndex || 1;
    let pageSize = data.pageSize || 10;

    let whereJson = {};
    if (data.needMyFeedback) {
      whereJson.assignee_uids = uid;
    }
    if (vk.pubfn.isNotNull(data.status)) {
      if (Array.isArray(data.status)) {
        whereJson.status = _.in(data.status);
      } else {
        whereJson.status = data.status;
      }
    }
    if (vk.pubfn.isNotNull(data.area_id)) {
      whereJson.area_id = data.area_id;
    }
    if (vk.pubfn.isNotNull(data.point_id)) {
      whereJson.point_id = data.point_id;
    }
    if (vk.pubfn.isNotNull(data.startTime) && vk.pubfn.isNotNull(data.endTime)) {
      whereJson._add_time = _.and(_.gte(data.startTime), _.lte(data.endTime));
    } else if (vk.pubfn.isNotNull(data.startTime)) {
      whereJson._add_time = _.gte(data.startTime);
    } else if (vk.pubfn.isNotNull(data.endTime)) {
      whereJson._add_time = _.lte(data.endTime);
    }

    let res = await vk.baseDao.selects({
      dbName: "key-project",
      pageIndex: pageIndex,
      pageSize: pageSize,
      whereJson: whereJson,
      sortArr: [{ name: "_add_time", type: "desc" }],
      foreignDB: [
        { dbName: "base-area", localKey: "area_id", foreignKey: "_id", as: "area_info", limit: 1 },
        { dbName: "base-point", localKey: "point_id", foreignKey: "_id", as: "point_info", limit: 1 },
        {
          dbName: "uni-id-users",
          localKey: "create_uid",
          foreignKey: "_id",
          as: "create_user_info",
          limit: 1,
          fieldJson: { _id: 1, nickname: 1, avatar: 1, real_name: 1 }
        }
      ]
    });
    // 批量填充 assignee_info (支持多执行人)
    let allUids = [];
    if (res.rows && res.rows.length > 0) {
      res.rows.forEach(item => {
        if (item.assignee_uids && Array.isArray(item.assignee_uids)) {
          allUids.push(...item.assignee_uids);
        }
      });
    }
    
    // 去重
    allUids = [...new Set(allUids)];
    
    let usersMap = {};
    if (allUids.length > 0) {
      let usersRes = await vk.baseDao.selects({
        dbName: "uni-id-users",
        whereJson: { _id: _.in(allUids) },
        fieldJson: { _id: 1, nickname: 1, avatar: 1, real_name: 1, username: 1 },
        pageSize: 1000
      });
      if (usersRes.rows) {
        usersRes.rows.forEach(user => {
          usersMap[user._id] = user;
        });
      }
    }
    
    if (res.rows && res.rows.length > 0) {
      res.rows.forEach(item => {
        let assigneeInfo = [];
        if (item.assignee_uids && Array.isArray(item.assignee_uids)) {
          item.assignee_uids.forEach(uid => {
            if (usersMap[uid]) {
              assigneeInfo.push(usersMap[uid]);
            }
          });
        }
        item.assignee_info = assigneeInfo;
      });
    }

    return res;
  }
};
