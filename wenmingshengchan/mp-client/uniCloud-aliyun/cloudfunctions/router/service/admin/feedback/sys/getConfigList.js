module.exports = {
  /**
   * 获取配置列表
   * @url admin/feedback/sys/getConfigList
   */
  main: async (event) => {
    // 从云函数入参解构：data为查询参数，userInfo为当前登录用户信息，util为工具类集合
    let { data = {}, userInfo, util } = event;
    // 提取 vk 核心对象（包含 baseDao 等），db 数据库对象（未实际使用），_ 下划线工具（未实际使用）
    let { vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    // 初始化查询条件对象
    let whereJson = {};

    // 部门管理员过滤逻辑：只允许查询本部门相关的数据
    // 判断当前用户是否包含 dept_admin 角色
    let isDeptAdmin = userInfo.role && userInfo.role.includes("dept_admin");
    if (isDeptAdmin && userInfo.department_id) {
      // 附加部门 ID 作为强制查询条件（确保数据隔离）
      // 注：若后续需要支持多级子部门，这里应改为接收前端传来的树形列表查 in，此处为简化适配
      whereJson.dept_id = userInfo.department_id;
    }

    // 如果前端传入了级联选择的点位/区域 ID
    if (data.cascader_point_id) {
      // Because checkStrictly is true, it could be an area or a point.
      // But typically we can just match either area_id or point_id.
      whereJson = vk.pubfn.copyObject(whereJson);
      whereJson.$or = [
        { area_id: data.cascader_point_id },
        { point_id: data.cascader_point_id }
      ];
    }
    
    // 文本模糊搜索点位名称 (需要在外键联查后才能精确，但若要查主表，可简化处理，或者通过 vk baseDao 自动处理)
    // 更好的做法是将 point_name 留给 vk-data-table 的内置查询
    
    // 对于有效状态的精确查询
    if (data.status !== undefined && data.status !== "") {
      whereJson.status = data.status;
    }
    
    // 对于核签部门的查询
    if (data.dept_id) {
      whereJson.dept_id = data.dept_id;
    }

    // 执行联表分页查询操作，获取列表数据
    res = await vk.baseDao.getTableData({
      dbName: "key-point-config", // 主表名称：重控点位配置表
      data: data,                 // 前端传来的分页与其他参数 (pageIndex, pageSize等)
      whereJson: whereJson,       // 组装后的 where 查询条件
      // 配置外键关联查询，以获取更多展示用关联信息
      foreignDB: [
        {
          dbName: "base-area",    // 关联的区域字典表
          localKey: "area_id",    // 主表中用于关联的本表字段
          foreignKey: "_id",      // 关联表中用于匹配的字段
          as: "area_info",        // 查询结果被挂载到结果对象中的属性名
          limit: 1                // 限制只取一条关联数据（1对1关系）
        },
        {
          dbName: "base-point",   // 关联的点位字典表
          localKey: "point_id",   // 主表本表字段
          foreignKey: "_id",      // 关联表字段
          as: "point_info",       // 挂载的属性名
          limit: 1
        },
        {
          dbName: "base-dept",    // 关联的部门表
          localKey: "dept_id",    // 主表本表字段
          foreignKey: "_id",      // 关联表字段
          as: "dept_info",        // 挂载的属性名
          limit: 1
        },
        {
          dbName: "uni-id-users",
          localKey: "issuer_uid",
          foreignKey: "_id",
          as: "issuer_info",
          limit: 1,
          fieldJson: { nickname: true, real_name: true, username: true }
        },
        {
          dbName: "uni-id-users",
          localKey: "assignee_ids",
          localKeyType: "array",
          foreignKey: "_id",
          as: "assignee_info",
          limit: 500,
          fieldJson: { nickname: true, real_name: true, username: true, department_id: true, group_id: true, avatar: true }
        }
      ]
    });

    // 组装反馈人的单位、小组名称
    let rows = res.rows || [];
    let deptIds = [];
    rows.forEach(r => {
      if (r.assignee_info) {
        r.assignee_info.forEach(u => {
          if (u.department_id) deptIds.push(u.department_id);
          if (u.group_id) deptIds.push(u.group_id);
        });
      }
    });

    if (deptIds.length > 0) {
      let deptRes = await vk.baseDao.select({ 
        dbName: "base-dept", 
        whereJson: { _id: _.in(deptIds) }, 
        pageSize: 1000 
      });
      let deptMap = {};
      (deptRes.rows || []).forEach(d => {
        deptMap[d._id] = d.name;
      });

      rows.forEach(r => {
        if (r.assignee_info) {
          r.assignee_info.forEach(u => {
            u.dept_name = deptMap[u.department_id] || '-';
            u.group_name = deptMap[u.group_id] || '-';
          });
        }
      });
    }

    // 返回带有关联信息的分页数据结果
    return res;
  }
};
