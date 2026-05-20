module.exports = {
  /**
   * 提交现场隐患报备
   * @url client/report/kh/submitIssue
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let uid = userInfo._id;
    let res = { code: 0, msg: '' };

    let { title, content, images, urgency, is_anonymous, area_id, point_id, handle_dept_id, handle_dept_name } = data;

    // 参数校验
    if (vk.pubfn.isNull(title)) return { code: -1, msg: '标题不能为空' };
    if (vk.pubfn.isNull(content)) return { code: -1, msg: '描述不能为空' };
    if (vk.pubfn.isNull(area_id)) return { code: -1, msg: '请选择作业区域' };
    if (vk.pubfn.isNull(point_id)) return { code: -1, msg: '请选择作业点位' };
    if (vk.pubfn.isNull(handle_dept_id)) return { code: -1, msg: '请选择责任单位' };

    // 从 base-point 获取该点位所属的 manager_dept_id
    let pointInfo = await vk.baseDao.findById({
      dbName: "base-point",
      id: point_id
    });
    
    if (!pointInfo) return { code: -1, msg: '作业点位不存在' };

    // 写入报备记录
    res.id = await vk.baseDao.add({
      dbName: "problem-report",
      dataJson: {
        title,
        content,
        images: images || [],
        urgency: urgency || 0,
        is_anonymous: is_anonymous === false ? false : true,
        area_id,
        point_id,
        handle_dept_id,
        handle_dept_name,
        manager_dept_id: pointInfo.manager_dept_id,
        status: 0,
        create_uid: uid,
        create_time: new Date().getTime()
      }
    });

    if (res.id) {
      res.msg = '报备成功';
    } else {
      return { code: -1, msg: '系统异常，报备失败' };
    }

    return res;
  }
};
