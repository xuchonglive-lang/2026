module.exports = {
  /**
   * 获取重点项目详情及时间轴
   * @url client/keywork/kh/getProjectDetail
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let { project_id } = data;

    if (vk.pubfn.isNull(project_id)) return { code: -1, msg: "项目ID不能为空" };

    // 获取主记录
    let projectInfo = await vk.baseDao.findById({
      dbName: "key-project",
      id: project_id,
      foreignDB: [
        { dbName: "base-area", localKey: "area_id", foreignKey: "_id", as: "area_info", limit: 1 },
        { dbName: "base-point", localKey: "point_id", foreignKey: "_id", as: "point_info", limit: 1 }
      ]
    });

    if (!projectInfo) return { code: -1, msg: "项目不存在" };

    // 手动填充 create_user_info
    if (projectInfo.create_uid) {
      let creatorRes = await vk.baseDao.findById({
        dbName: "uni-id-users",
        id: projectInfo.create_uid,
        fieldJson: { _id: 1, nickname: 1, avatar: 1, real_name: 1, username: 1 }
      });
      projectInfo.create_user_info = creatorRes ? creatorRes : null;
    } else {
      projectInfo.create_user_info = null;
    }

    // 手动填充 assignee_info (解决外键映射不支持纯字符串数组的痛点)
    if (projectInfo.assignee_uids && Array.isArray(projectInfo.assignee_uids) && projectInfo.assignee_uids.length > 0) {
      let usersRes = await vk.baseDao.selects({
        dbName: "uni-id-users",
        whereJson: { _id: _.in(projectInfo.assignee_uids) },
        fieldJson: { _id: 1, nickname: 1, avatar: 1, real_name: 1, username: 1 },
        pageSize: 1000
      });
      projectInfo.assignee_info = usersRes.rows || [];
    } else {
      projectInfo.assignee_info = [];
    }

    // 获取过程流转记录（包含结项申请、反馈、驳回等）
    let processListRes = await vk.baseDao.selects({
      dbName: "key-project-process",
      whereJson: { project_id: project_id },
      sortArr: [{ name: "create_time", type: "desc" }], // 倒序
      foreignDB: [
        { dbName: "uni-id-users", localKey: "operate_uid", foreignKey: "_id", as: "user_info", limit: 1, fieldJson: { nickname: 1, avatar: 1, real_name: 1, username: 1 } }
      ]
    });

    projectInfo.process_list = processListRes.rows || [];
    return { code: 0, msg: "ok", data: projectInfo };
  }
};
