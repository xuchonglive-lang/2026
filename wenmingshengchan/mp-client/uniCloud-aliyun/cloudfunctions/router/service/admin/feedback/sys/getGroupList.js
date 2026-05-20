module.exports = {
  /**
   * 获取同部门下的下辖小组列表 (供 table-select 过滤下拉使用)
   * @url admin/feedback/sys/getGroupList
   */
  main: async (event) => {
    // 解构入参获取数据、用户信息、工具对象
    let { data = {}, userInfo, util } = event;
    let { vk, _ } = util;

    // 获取当前登录用户自身的部门 ID
    let rawDeptId = userInfo.department_id;
    // 判断是否为管理员角色
    let isAdmin = userInfo.role && userInfo.role.includes("admin");
    // 如果是管理员，并且前端显式传递了需要锁定的指定大部门 ID (locked_dept_id)
    if (data.locked_dept_id && isAdmin) {
        // 则覆盖查询目标为该指定的部门 ID
        rawDeptId = data.locked_dept_id;
    }
    
    // 如果没有获取到部门 ID，或者是空数组
    if (!rawDeptId || (Array.isArray(rawDeptId) && rawDeptId.length === 0)) {
       // 超管可能在某些情况下没有绑定部门，直接返回空数组（而不是报错）
       if (isAdmin) return { code: 0, rows: [], msg: "" }; 
       // 普通用户未绑定部门则给予明确提示
       return { code: 0, rows: [], msg: "未绑定部门" };
    }

    // 为了兼容单部门和多部门场景，强制统一转换为数组格式
    let parentIds = Array.isArray(rawDeptId) ? rawDeptId : [rawDeptId];

    // 查询部门表，找出所有 parent_id 归属于上述部门的小组列表
    let res = await vk.baseDao.selects({
      dbName: "base-dept", // 部门表
      whereJson: {
        parent_id: _.in(parentIds), // 查找其上级是大部门的节点
        status: 1                   // 仅查询状态为启用的部门
      }
    });

    // 返回找到的下属小组列表数据
    return { code: 0, rows: res.rows || [], msg: "" };
  }
};
