module.exports = {
  /**
   * 新增重控点位配置
   * @url admin/feedback/sys/addConfig
   */
  main: async (event) => {
    // 解构获取云函数入参：data为前端传递的业务数据，userInfo为当前登录用户信息，util为vk路由内置工具对象
    let { data = {}, userInfo, util } = event;
    // 提取 vk 对象，用于后续调用 baseDao 进行数据库操作
    let { vk } = util;
    // 获取当前登录用户的 uid（兼容不同位置的 uid 定义）
    let uid = userInfo._id || userInfo.uid || event.uid;
    // 安全校验：如果无法获取到 uid，则说明用户未登录或状态异常，直接返回错误信息
    if (!uid) return { code: -1, msg: "系统内部错误：无法获取当前登录用户的uid" };

    // 初始化返回对象，默认 code 为 0 表示成功
    let res = { code: 0, msg: '' };

    // 补充默认字段：将下发人（创建人）记录为当前操作者的 uid
    data.issuer_uid = uid;
    // 设置初始状态，通常 1 表示“正常”或“启用”状态
    data.status = 1;

    // 记录第一次配置的人员名单，后续增配限制删除用
    if (data.assignee_ids && Array.isArray(data.assignee_ids)) {
      data.original_assignee_ids = [...data.assignee_ids];
    } else {
      data.original_assignee_ids = [];
    }

    // 处理前端传入的区域与点位级联数据
    // 如果前端通过级联选择器传值 [area_id, point_id]
    if (data.area_point_ids && data.area_point_ids.length >= 2) {
      // 提取第一个元素作为区域 ID
      data.area_id = data.area_point_ids[0];
      // 提取第二个元素作为点位 ID
      data.point_id = data.area_point_ids[1];
      // 从数据载荷中删除原有的级联数组，因为数据库实体不需要存储此结构
      delete data.area_point_ids;
    }

    // 权限与部门处理：检查当前用户是否具有管理员（admin 或 super_admin）权限
    let isAdmin = userInfo.role && (userInfo.role.includes('admin') || userInfo.role.includes('super_admin'));
    // 如果不是管理员，且用户拥有所属部门 ID
    if (!isAdmin && userInfo.department_id) {
       // 强制将用户的部门锁定为所属部门，不能越权创建其他部门的数据（容错处理：确保转为数组再取第一个）
       let deptIdArray = Array.isArray(userInfo.department_id) ? userInfo.department_id : [userInfo.department_id];
       data.dept_id = deptIdArray[0];
    }
    
    // 数据清理：移除旧版本废弃的照片数量配置字段，以防产生脏数据
    delete data.required_photo_count;
    
    // 照片要求字段规整：确保前端传来的 photo_requirements 一定是一个数组
    if (data.photo_requirements && !Array.isArray(data.photo_requirements)) {
      data.photo_requirements = [data.photo_requirements];
    }

    // 执行数据库新增操作，将整理后的 data 插入到 key-point-config 集合中
    res.id = await vk.baseDao.add({
      dbName: "key-point-config", // 目标集合名称：重控点位配置表
      dataJson: data              // 需要插入的数据对象
    });

    // 返回执行结果（包含新增成功后的记录 _id）
    return res;
  }
};
