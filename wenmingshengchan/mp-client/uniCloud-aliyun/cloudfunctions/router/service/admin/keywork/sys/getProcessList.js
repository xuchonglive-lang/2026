module.exports = {
  /**
   * B端获取项目流转过程列表
   * @url admin/keywork/sys/getProcessList
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;

    let project_id = data.project_id;
    if (!project_id) return { code: -1, msg: "项目ID不能为空" };

    let res = await vk.baseDao.selects({
      dbName: "key-project-process",
      whereJson: { project_id: project_id },
      sortArr: [{ name: "create_time", type: "desc" }],
      foreignDB: [
        { dbName: "uni-id-users", localKey: "operate_uid", foreignKey: "_id", as: "user_info", limit: 1 }
      ]
    });

    return { code: 0, rows: res.rows };
  }
};
