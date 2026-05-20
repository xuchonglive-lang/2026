module.exports = {
  // 一个测试/调试专用的云函数，用于简单快速地查看当前用户表和部门表的精简内容对照
  main: async (event) => {
    // 从 event.util 中提取基础框架操作对象 vk
    let { vk } = event.util;
    // 获取所有用户列表，但为了降低网络传输压力，仅提取出 real_name（真实姓名）、department_id（部门ID）、group_id（小组ID）字段
    let users = await vk.baseDao.selects({ dbName: 'uni-id-users', fieldJson: { real_name: 1, department_id: 1, group_id: 1 } });
    // 获取所有部门列表，同样仅保留 name（部门名称）、parent_id（上级ID）以便重构对照树或关系映射
    let depts = await vk.baseDao.selects({ dbName: 'base-dept', fieldJson: { name: 1, parent_id: 1 } });
    // 将两者同时打包返回，供调试人员直接阅览数据映射结构
    return { users: users.rows, depts: depts.rows };
  }
};
