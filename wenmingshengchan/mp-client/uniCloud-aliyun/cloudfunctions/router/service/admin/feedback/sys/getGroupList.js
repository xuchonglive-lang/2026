module.exports = {
  /**
   * 获取同部门下的下辖小组列表 (供 table-select 过滤下拉使用)
   * @url admin/feedback/sys/getGroupList
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, _ } = util;

    let rawDeptId = userInfo.department_id;
    let isAdmin = userInfo.role && userInfo.role.includes("admin");
    if (data.locked_dept_id && isAdmin) {
        rawDeptId = data.locked_dept_id;
    }
    
    if (!rawDeptId || (Array.isArray(rawDeptId) && rawDeptId.length === 0)) {
       if (isAdmin) return { code: 0, rows: [], msg: "" }; // 超管可能看到空
       return { code: 0, rows: [], msg: "未绑定部门" };
    }

    // 统一转为数组
    let parentIds = Array.isArray(rawDeptId) ? rawDeptId : [rawDeptId];

    // 查询当前部门下的所有直属小组
    let res = await vk.baseDao.selects({
      dbName: "base-dept",
      whereJson: {
        parent_id: _.in(parentIds),
        status: 1
      }
    });

    return { code: 0, rows: res.rows || [], msg: "" };
  }
};
