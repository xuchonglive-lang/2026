module.exports = {
  /**
   * 专门用于节点/小组精准查询的云函数
   * @url admin/feedback/sys/getUserListByGroup
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, _ } = util;

    // 1. 兼容获取内部的 formData 和 whereJson，防止被前端组件封装嵌套（如 data.data.formData）
    let innerData = data.data || {};
    let formData = data.formData || innerData.formData || {};
    let whereJsonPayload = data.whereJson || innerData.whereJson || {};

    // 2. 获取用户在 cascader 选中的具体小组 (tree_node_id)
    let treeNodeId = formData.tree_node_id || whereJsonPayload.tree_node_id;
    if (Array.isArray(treeNodeId)) {
        treeNodeId = treeNodeId[treeNodeId.length - 1];
    }

    // 3. 获取锁定的大部门 ID (locked_dept_id)
    let lockedDeptId = data.locked_dept_id;
    if (Array.isArray(lockedDeptId)) {
        lockedDeptId = lockedDeptId[lockedDeptId.length - 1];
    }

    if (!lockedDeptId) {
        return { code: 0, rows: [], total: 0, msg: "缺少锁定部门/小组参数" };
    }

    // 4. 将这两个ID做综合判断（完全按照您的思路进行）
    let whereJson = {};

    if (treeNodeId && treeNodeId !== lockedDeptId) {
        // 如果用户选择了具体的小组，则必须同时满足大部门和小组的条件
        whereJson = {
            department_id: lockedDeptId,
            group_id: treeNodeId
        };
    } else {
        // 如果用户没有选择小组，或者选择的就是大部门节点，则只限定大部门
        whereJson = {
            department_id: lockedDeptId
        };
    }

    // 5. 叠加姓名模糊搜索
    let searchName = formData.real_name || data.real_name || whereJsonPayload.real_name;
    if (searchName) {
      whereJson.real_name = new RegExp(searchName);
    }

    // 5. 执行分页查询
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
