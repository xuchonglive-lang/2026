module.exports = {
  /**
   * 获取报备公示列表（支持多条件筛选）
   * @url client/report/kh/getReportList
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let uid = userInfo ? userInfo._id : null;

    let pageIndex = data.pageIndex || 1;
    let pageSize = data.pageSize || 10;

    let whereJson = {
      status: _.neq(3)
    };

    if (data.needMyFeedback && userInfo && userInfo.department_id) {
      let deptId = Array.isArray(userInfo.department_id) ? userInfo.department_id[0] : userInfo.department_id;
      if (deptId) {
        whereJson.handle_dept_id = deptId;
      }
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
      dbName: "problem-report",
      pageIndex: pageIndex,
      pageSize: pageSize,
      whereJson: whereJson,
      sortArr: [{ name: "_add_time", type: "desc" }],
      foreignDB: [
        {
          dbName: "base-area",
          localKey: "area_id",
          foreignKey: "_id",
          as: "area_info",
          limit: 1,
          fieldJson: { _id: 1, name: 1 }
        },
        {
          dbName: "base-point",
          localKey: "point_id",
          foreignKey: "_id",
          as: "point_info",
          limit: 1,
          fieldJson: { _id: 1, name: 1 }
        },
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
    
    // Fill assignee_info if problem-report has assignee_uids
    if (res.rows && res.rows.length > 0) {
      let userIds = [];
      res.rows.forEach(row => {
        if (row.assignee_uids && Array.isArray(row.assignee_uids)) {
          userIds = userIds.concat(row.assignee_uids);
        }
      });
      if (userIds.length > 0) {
        userIds = Array.from(new Set(userIds));
        let usersRes = await vk.baseDao.selects({
          dbName: "uni-id-users",
          whereJson: { _id: _.in(userIds) },
          fieldJson: { _id: 1, nickname: 1, avatar: 1, real_name: 1 },
          pageSize: 1000
        });
        let userMap = {};
        if (usersRes.rows) {
          usersRes.rows.forEach(u => {
            userMap[u._id] = u;
          });
        }
        res.rows.forEach(row => {
          row.assignee_info = [];
          if (row.assignee_uids && Array.isArray(row.assignee_uids)) {
            row.assignee_uids.forEach(assignee_uid => {
              if (userMap[assignee_uid]) {
                row.assignee_info.push(userMap[assignee_uid]);
              }
            });
          }
        });
      }
    }

    return res;
  }
};
