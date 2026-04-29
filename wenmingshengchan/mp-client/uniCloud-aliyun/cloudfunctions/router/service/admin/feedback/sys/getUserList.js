module.exports = {
  /**
   * 获取同部门下的人员列表 (供 table-select 使用)
   * @url admin/feedback/sys/getUserList
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, _ } = util;

    // table-select 的 queryColumns 数据会包裹在 data.formData 下
    let formData = data.formData || {};

    // === 第一步：确定当前查询的目标部门ID列表 ===
    let myDeptIds = [];
    let isAdmin = userInfo.role && (userInfo.role.includes("admin") || userInfo.role.includes("super_admin"));
    
    if (data.locked_dept_id && isAdmin) {
       myDeptIds = [data.locked_dept_id];
    } else if (userInfo.department_id) {
       myDeptIds = Array.isArray(userInfo.department_id) ? userInfo.department_id : [userInfo.department_id];
    }

    if (myDeptIds.length === 0 && !isAdmin) {
       return { code: 0, rows: [], total: 0, msg: "未绑定部门，无权获取用户" };
    }

    // === 第二步：查询当前部门的所有下辖小组 ===
    let validDeptIds = [...myDeptIds];
    if (myDeptIds.length > 0) {
       let groupRes = await vk.baseDao.selects({
          dbName: "base-dept",
          whereJson: { parent_id: _.in(myDeptIds) }
       });
       let subIds = groupRes.rows.map(item => item._id);
       validDeptIds = validDeptIds.concat(subIds);
    }

    // === 第三步：构建安全的 whereJson ===
    let whereJson = {};
    
    let treeNodeId = formData.tree_node_id || data.tree_node_id || (data.whereJson && data.whereJson.tree_node_id);
    let targetGroupId = null;
    if (treeNodeId) {
       targetGroupId = Array.isArray(treeNodeId) ? treeNodeId[treeNodeId.length - 1] : treeNodeId;
    }

    if (targetGroupId) {
       whereJson.$or = [
         { department_id: targetGroupId },
         { group_id: targetGroupId }
       ];
       if (!isAdmin && !validDeptIds.includes(targetGroupId)) {
           return { code: 0, rows: [], total: 0, msg: "越权访问" };
       }
    } else if (validDeptIds.length > 0) {
       // 当 cascader 为空时，强制约束在所选或所属部门及子集内，防止搜出全库
       whereJson.$or = [
         { department_id: _.in(validDeptIds) },
         { group_id: _.in(validDeptIds) }
       ];
    }

    // 兼容读取 formData.real_name 或 data.real_name，或直接保留 data.whereJson.real_name
    let searchName = formData.real_name || data.real_name;
    if (searchName) {
      whereJson.real_name = new RegExp(searchName);
    } else if (data.whereJson && data.whereJson.real_name) {
      whereJson.real_name = data.whereJson.real_name;
    }

    // === 第四步：只传分页参数给 getTableData ===
    let res = await vk.baseDao.getTableData({
      dbName: "uni-id-users",
      data: {
        pageIndex: data.pageIndex || 1,
        pageSize: data.pageSize || 20
      },
      whereJson: whereJson,
      fieldJson: { token: false, password: false }
    });

    return res;
  }
};
