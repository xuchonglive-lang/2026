module.exports = {
  /**
   * B端新建重点项目并分发
   * @url admin/keywork/sys/createProject
   */
  main: async (event) => {
    let { data = {}, userInfo = {}, util } = event;
    let { vk, db, _ } = util;
    let uid = userInfo.uid || userInfo._id || event.uid;

    if (!uid) {
      return { code: -1, msg: "系统内部错误：无法获取当前登录用户的uid" };
    }

    // 参数校验
    if (vk.pubfn.isNull(data.title)) return { code: -1, msg: "项目名称必填" };

    // 处理级联选择的区域和点位
    let area_id = "";
    let point_id = "";
    if (data.area_point_path && data.area_point_path.length > 0) {
      area_id = data.area_point_path[0] || "";
      point_id = data.area_point_path[1] || "";
    } else {
      area_id = data.area_id || "";
      point_id = data.point_id || "";
    }

    let res = { code: 0, msg: "项目下达成功" };

    // 插入 key-project
    res.id = await vk.baseDao.add({
      dbName: "key-project",
      dataJson: {
        title: data.title,
        area_id: area_id,
        point_id: point_id,
        standard_desc: data.standard_desc || "",
        deadline: data.deadline || null,
        assignee_uids: data.assignee_uids || [],
        status: 0, // 新建项目默认状态：0(进行中)
        create_uid: uid,
        _add_time: new Date().getTime()
      }
    });

    // 自动插入一条“立项下达”的初始流转记录，让项目一开始就有“进行中”的状态
    await vk.baseDao.add({
      dbName: "key-project-process",
      dataJson: {
        project_id: res.id,
        type: 0, // 0表示立项下达
        desc_content: "重点项目已下达，状态变为：进行中",
        attachment_imgs: [],
        operate_uid: uid,
        create_time: new Date().getTime()
      }
    });

    return res;
  }
};
