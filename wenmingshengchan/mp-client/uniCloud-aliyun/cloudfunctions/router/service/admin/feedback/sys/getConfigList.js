module.exports = {
  /**
   * 获取配置列表
   * @url admin/feedback/sys/getConfigList
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    let whereJson = {};

    // 部门管理员过滤：只看本部门相关的
    // 假设 dept_admin 角色限制 (根据您的实际角色名判断)
    let isDeptAdmin = userInfo.role && userInfo.role.includes("dept_admin");
    if (isDeptAdmin && userInfo.department_id) {
      // 若存在多级部门，应使用前端传来的树形列表查in，这里做简单适配
      whereJson.dept_id = userInfo.department_id;
    }

    if (data.point_id) {
      whereJson.point_id = data.point_id;
    }
    
    if (data.status !== undefined && data.status !== "") {
      whereJson.status = data.status;
    }

    res = await vk.baseDao.getTableData({
      dbName: "key-point-config",
      data: data,
      whereJson: whereJson,
      foreignDB: [
        {
          dbName: "base-area",
          localKey: "area_id",
          foreignKey: "_id",
          as: "area_info",
          limit: 1
        },
        {
          dbName: "base-point",
          localKey: "point_id",
          foreignKey: "_id",
          as: "point_info",
          limit: 1
        },
        {
          dbName: "base-dept",
          localKey: "dept_id",
          foreignKey: "_id",
          as: "dept_info",
          limit: 1
        }
      ]
    });

    return res;
  }
};
