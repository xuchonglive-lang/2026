module.exports = {
  /**
   * 更新重控点位配置 (含软删除)
   * @url admin/feedback/sys/updateConfig
   */
  main: async (event) => {
    // 解构获取云函数入参：data为需要更新的业务数据，userInfo为当前登录用户信息，util为工具对象
    let { data = {}, userInfo, util } = event;
    // 提取 vk 对象用于后续数据库操作
    let { vk } = util;
    // 初始化默认返回结构
    let res = { code: 0, msg: '' };

    // 数据完整性校验：更新操作必须提供记录的唯一标识 _id
    if (!data._id) return { code: -1, msg: "缺少记录_id" };

    // 提取出 _id 以便在更新条件中使用，并从 data 中删除，防止被作为更新字段更新
    let _id = data._id;
    delete data._id;

    // 处理前端传入的区域与点位级联数据 [area_id, point_id]
    if (data.area_point_ids && data.area_point_ids.length >= 2) {
      // 提取第一个元素为区域 ID
      data.area_id = data.area_point_ids[0];
      // 提取第二个元素为点位 ID
      data.point_id = data.area_point_ids[1];
      // 提取完后删除该虚拟字段，不在数据库中持久化
      delete data.area_point_ids;
    }

    // 权限与部门处理：检查用户是否为系统管理员
    let isAdmin = userInfo.role && (userInfo.role.includes('admin') || userInfo.role.includes('super_admin'));
    // 如果不是管理员，且用户拥有所属部门 ID，则不允许修改配置所属的部门，强制重置为其所在部门
    if (!isAdmin && userInfo.department_id) {
       let deptIdArray = Array.isArray(userInfo.department_id) ? userInfo.department_id : [userInfo.department_id];
       data.dept_id = deptIdArray[0];
    }
    
    // 数据清理：移除旧版本废弃的图片数量限制字段
    delete data.required_photo_count;
    // 格式化照片要求：保证 photo_requirements 如果存在则必须是数组格式
    if (data.photo_requirements && !Array.isArray(data.photo_requirements)) {
      data.photo_requirements = [data.photo_requirements];
    }

    // 调用基础 DAO 执行数据库更新操作
    let num = await vk.baseDao.updateById({
      dbName: "key-point-config", // 操作的表名：重控点位配置表
      id: _id,                    // 目标记录的唯一标识
      dataJson: data              // 需要更新的新数据内容
    });

    // 验证更新结果：如果受影响的行数大于 0，说明更新成功
    if(num > 0) {
      res.msg = "修改成功";
    } else {
      // 若为 0 说明没有匹配的记录，可能已被删除或 _id 不正确
      res.code = -1;
      res.msg = "记录不存在或已被删除";
    }

    // 返回操作结果
    return res;
  }
};
