module.exports = {
  /**
   * B端更新重点项目
   * @url admin/keywork/sys/updateProject
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;

    // 参数校验
    if (vk.pubfn.isNull(data._id)) return { code: -1, msg: "项目ID必填" };

    // 处理级联选择的区域和点位
    let updateJson = {
      title: data.title,
      standard_desc: data.standard_desc,
      deadline: data.deadline,
      assignee_uids: data.assignee_uids || []
    };

    if (data.area_point_path && data.area_point_path.length > 0) {
      updateJson.area_id = data.area_point_path[0] || "";
      updateJson.point_id = data.area_point_path[1] || "";
    } else {
      if (data.area_id !== undefined) updateJson.area_id = data.area_id;
      if (data.point_id !== undefined) updateJson.point_id = data.point_id;
    }

    let res = { code: 0, msg: "更新成功" };

    // 只能更新未结案状态的项目？或者管理员可以任意更新？由业务决定，这里允许直接更新
    res.num = await vk.baseDao.updateById({
      dbName: "key-project",
      id: data._id,
      dataJson: updateJson
    });

    return res;
  }
};
