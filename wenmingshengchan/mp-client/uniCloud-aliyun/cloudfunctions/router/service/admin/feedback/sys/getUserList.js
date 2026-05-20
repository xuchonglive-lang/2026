module.exports = {
  /**
   * 获取同部门下的人员列表 (供 table-select 使用)
   * @url admin/feedback/sys/getUserList
   */
  main: async (event) => {
    // 解构云函数入参
    let { data = {}, userInfo, util } = event;
    // 提取 vk 对象及 _ (下划线工具对象，内置如 _.in 等数据库操作符)
    let { vk, _ } = util;

    // table-select 组件在获取数据时，其自带的 queryColumns 搜索数据会包裹在 data.formData 下
    let formData = data.formData || {};

    // === 第一步：确定当前查询的目标部门ID列表 ===
    let myDeptIds = [];
    // 判断是否为管理员或超级管理员角色
    let isAdmin = userInfo.role && (userInfo.role.includes("admin") || userInfo.role.includes("super_admin"));
    
    // 如果前端传了锁定的部门 ID (locked_dept_id)，且当前用户是管理员，则优先使用传来的锁定 ID
    if (data.locked_dept_id && isAdmin) {
       myDeptIds = [data.locked_dept_id];
    } else if (userInfo.department_id) {
       // 否则使用当前用户自身的部门 ID（支持单部门或多部门数组）
       myDeptIds = Array.isArray(userInfo.department_id) ? userInfo.department_id : [userInfo.department_id];
    }

    // 如果未获取到任何部门 ID 且不是管理员，则直接拦截，防止越权拉取全库人员
    if (myDeptIds.length === 0 && !isAdmin) {
       return { code: 0, rows: [], total: 0, msg: "未绑定部门，无权获取用户" };
    }

    // === 第二步：查询当前部门的所有下辖小组 ===
    let validDeptIds = [...myDeptIds];
    // 如果本部门 ID 存在，则去查询其子部门（小组）的 ID
    if (myDeptIds.length > 0) {
       let groupRes = await vk.baseDao.selects({
          dbName: "base-dept", // 查询部门表
          whereJson: { parent_id: _.in(myDeptIds) } // 查找 parent_id 为当前部门的所有子部门
       });
       // 提取子部门 ID 集合
       let subIds = groupRes.rows.map(item => item._id);
       // 将子部门 ID 也合并进合法的部门查询范围里
       validDeptIds = validDeptIds.concat(subIds);
    }

    // === 第三步：构建安全的 whereJson ===
    let whereJson = {};
    
    // 获取组件/页面传来的层级结构节点 ID (支持多种传参形式的兼容)
    let treeNodeId = formData.tree_node_id || data.tree_node_id || (data.whereJson && data.whereJson.tree_node_id);
    let targetGroupId = null;
    // 若树节点 ID 为数组（级联结构），则取最后一级；否则直接取本身
    if (treeNodeId) {
       targetGroupId = Array.isArray(treeNodeId) ? treeNodeId[treeNodeId.length - 1] : treeNodeId;
    }

    if (targetGroupId) {
       // 如果指定了具体要查的部门/小组 ID，则在 department_id 或 group_id 中匹配
       whereJson.$or = [
         { department_id: targetGroupId },
         { group_id: targetGroupId }
       ];
       // 安全校验：如果当前用户不是管理员，且试图查询的部门 ID 不在自己有权访问的 validDeptIds 列表内，则拦截
       if (!isAdmin && !validDeptIds.includes(targetGroupId)) {
           return { code: 0, rows: [], total: 0, msg: "越权访问" };
       }
    } else if (validDeptIds.length > 0) {
       // 当 cascader (级联选择器) 为空，没选具体小组时，强制约束搜索范围在所选或所属的部门及其子集内
       // 防止未传参时搜出全库人员
       whereJson.$or = [
         { department_id: _.in(validDeptIds) },
         { group_id: _.in(validDeptIds) }
       ];
    }

    // 根据真实姓名模糊搜索：兼容不同来源的 searchName 参数
    let searchName = formData.real_name || data.real_name;
    if (searchName) {
      // 构造正则以实现模糊搜索
      whereJson.real_name = new RegExp(searchName);
    } else if (data.whereJson && data.whereJson.real_name) {
      // 如果未做正则处理但前端传了精确的姓名匹配
      whereJson.real_name = data.whereJson.real_name;
    }

    // === 第四步：只传分页参数给 getTableData 获取最终结果 ===
    let res = await vk.baseDao.getTableData({
      dbName: "uni-id-users", // 查询用户表
      data: {
        pageIndex: data.pageIndex || 1, // 当前页码
        pageSize: data.pageSize || 20   // 每页数量
      },
      whereJson: whereJson,             // 组装好的查询条件
      // 安全过滤：不返回敏感字段（token, password）
      fieldJson: { token: false, password: false }
    });

    // 返回分页列表数据
    return res;
  }
};
