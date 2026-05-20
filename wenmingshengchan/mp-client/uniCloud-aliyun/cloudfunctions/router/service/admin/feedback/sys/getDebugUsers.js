module.exports = {
  // 一个提供给开发者/管理员快速获取全量用户和部门对照的简单接口（供调试核对数据使用）
  main: async (event) => {
    let { data = {}, util } = event;
    let { vk } = util;
    // 1. 无条件查出所有的用户信息
    let users = await vk.baseDao.selects({
      dbName: "uni-id-users", // 查询用户表
      fieldJson: { real_name: 1, department_id: 1, group_id: 1 } // 仅保留真实姓名、大部门ID和小组ID，减少返回载荷
    });
    // 2. 无条件查出所有的部门信息
    let depts = await vk.baseDao.selects({
      dbName: "base-dept", // 查询部门表
      fieldJson: { name: 1, parent_id: 1 } // 仅保留部门名称和上级ID
    });
    // 返回这两类数据用于页面端或调用端直接对比调试分析
    return { users: users.rows, depts: depts.rows };
  }
}
