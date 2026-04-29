module.exports = {
  main: async (event) => {
    let { data = {}, util } = event;
    let { vk } = util;
    let users = await vk.baseDao.selects({
      dbName: "uni-id-users",
      fieldJson: { real_name: 1, department_id: 1, group_id: 1 }
    });
    let depts = await vk.baseDao.selects({
      dbName: "base-dept",
      fieldJson: { name: 1, parent_id: 1 }
    });
    return { users: users.rows, depts: depts.rows };
  }
}
