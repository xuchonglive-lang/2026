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

    // 获取过程流转记录（包含结项申请、反馈、驳回等）
    let processListRes = await vk.baseDao.selects({
      dbName: "key-project-process",
      whereJson: { project_id: project_id },
      sortArr: [{ name: "create_time", type: "desc" }], // 倒序
      foreignDB: [
         { dbName: "uni-id-users", localKey: "operate_uid", foreignKey: "_id", as: "user_info", limit: 1 }
      ]
    });
    
    projectInfo.process_list = processListRes.rows || [];
    return { code: 0, msg: "ok", data: projectInfo };
  }
};
