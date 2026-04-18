module.exports = {
  /**
   * B端新建重点项目并分发
   * @url admin/keywork/sys/createProject
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let { uid } = userInfo;

    // 参数校验
    if (vk.pubfn.isNull(data.title)) return { code: -1, msg: "项目名称必填" };

    // 插入 key-project
    return await vk.baseDao.add({
      dbName: "key-project",
      dataJson: {
        title: data.title,
        area_id: data.area_id || "",
        point_id: data.point_id || "",
        standard_desc: data.standard_desc || "",
        deadline: data.deadline || null,
        assignee_uids: data.assignee_uids || [],
        status: 0, // 新建项目默认状态：0(进行中)
        create_uid: uid,
        _add_time: new Date().getTime()
      }
    });
  }
};
