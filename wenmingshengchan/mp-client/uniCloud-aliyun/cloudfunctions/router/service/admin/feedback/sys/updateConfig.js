module.exports = {
  /**
   * 更新重控点位配置 (含软删除)
   * @url admin/feedback/sys/updateConfig
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk } = util;
    let res = { code: 0, msg: '' };

    if (!data._id) return { code: -1, msg: "缺少记录_id" };

    let _id = data._id;
    delete data._id;

    // 支持级联选择器传值 [area_id, point_id]
    if (data.area_point_ids && data.area_point_ids.length >= 2) {
      data.area_id = data.area_point_ids[0];
      data.point_id = data.area_point_ids[1];
      delete data.area_point_ids;
    }

    // 如果不是admin，部门由当前人锁定，不能做修改
    let isAdmin = userInfo.role && (userInfo.role.includes('admin') || userInfo.role.includes('super_admin'));
    if (!isAdmin && userInfo.department_id) {
       let deptIdArray = Array.isArray(userInfo.department_id) ? userInfo.department_id : [userInfo.department_id];
       data.dept_id = deptIdArray[0];
    }
    // 移除废弃字段并规整数组
    delete data.required_photo_count;
    if (data.photo_requirements && !Array.isArray(data.photo_requirements)) {
      data.photo_requirements = [data.photo_requirements];
    }

    // 执行数据库更新
    let num = await vk.baseDao.updateById({
      dbName: "key-point-config",
      id: _id,
      dataJson: data
    });

    if(num > 0) {
      res.msg = "修改成功";
    } else {
      res.code = -1;
      res.msg = "记录不存在或已被删除";
    }

    return res;
  }
};
