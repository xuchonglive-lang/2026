module.exports = {
  /**
   * 专门用于节点/小组精准查询的云函数
   * @url admin/feedback/sys/getUserListByGroup
   */
  main: async (event) => {
    // 解构入参：获取前端传参、用户信息、工具类对象
    let { data = {}, userInfo, util } = event;
    let { vk, _ } = util;

    // 1. 兼容获取内部的 formData 和 whereJson，防止被前端某些组件封装嵌套（如 data.data.formData）
    let innerData = data.data || {};
    // 逐层尝试读取 formData （table-select 等组件可能会有不同层级的包装）
    let formData = data.formData || innerData.formData || {};
    // 同理，兼容读取 whereJson 的实际载荷
    let whereJsonPayload = data.whereJson || innerData.whereJson || {};

    // 2. 获取用户在 cascader(级联选择器) 选中的具体小组 ID (tree_node_id)
    let treeNodeId = formData.tree_node_id || whereJsonPayload.tree_node_id;
    // 如果是个数组结构（级联路径），则取最后一个元素作为实际的选中节点
    if (Array.isArray(treeNodeId)) {
        treeNodeId = treeNodeId[treeNodeId.length - 1];
    }

    // 3. 获取锁定的大部门 ID (locked_dept_id)
    let lockedDeptId = data.locked_dept_id;
    // 如果是个数组，同样取最后一个元素
    if (Array.isArray(lockedDeptId)) {
        lockedDeptId = lockedDeptId[lockedDeptId.length - 1];
    }

    // 如果前端没有明确限制大部门 ID，则拒绝查询，保证数据隔离安全
    if (!lockedDeptId) {
        return { code: 0, rows: [], total: 0, msg: "缺少锁定部门/小组参数" };
    }

    // 4. 将这两个ID做综合判断（完全按照您的思路进行精确匹配）
    let whereJson = {};

    if (treeNodeId && treeNodeId !== lockedDeptId) {
        // 如果用户不仅传了锁定的部门 ID，还在组件里明确选择了某个具体的小组（且不等于大部门本身）
        // 则必须同时满足大部门 ID (department_id) 和小组 ID (group_id)
        whereJson = {
            department_id: lockedDeptId, // 约束在锁定的部门内
            group_id: treeNodeId         // 并且归属于所选的小组
        };
    } else {
        // 如果用户没有选择具体小组，或者选择的就是大部门节点本身，
        // 则只限定查属于该大部门的人员（无视具体的组）
        whereJson = {
            department_id: lockedDeptId
        };
    }

    // 5. 叠加姓名模糊搜索功能
    // 兼容读取真实姓名的搜索关键字
    let searchName = formData.real_name || data.real_name || whereJsonPayload.real_name;
    if (searchName) {
      // 通过正则构建姓名模糊查询条件
      whereJson.real_name = new RegExp(searchName);
    }

    // 6. 执行分页查询用户表
    let res = await vk.baseDao.getTableData({
      dbName: "uni-id-users", // 用户表
      data: {
        pageIndex: data.pageIndex || 1, // 当前页码，默认 1
        pageSize: data.pageSize || 20   // 每页数量，默认 20
      },
      whereJson: whereJson,             // 综合上述条件的查询参数
      fieldJson: { token: false, password: false } // 安全考虑，剔除敏感字段
    });

    // 返回经过精确匹配过滤后的结果
    return res;
  }
};
