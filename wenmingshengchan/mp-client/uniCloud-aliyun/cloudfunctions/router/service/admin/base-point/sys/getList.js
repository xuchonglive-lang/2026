module.exports = {
  /**
   * 调取点位节点分页组数目录
   * @url admin/base-point/sys/getList
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };

    // 业务逻辑开始-----------------------------------------------------------

    // 根据安全及数据追溯原则将标记为软删除的点位进行屏蔽隔离过滤
    let whereJson = data.whereJson || {};
    whereJson.is_del = _.neq(1);

    // 把一切重压丢给基于 Dao 封装后的 getTableData 黑盒处理器
    let listRes = await vk.baseDao.getTableData({
      dbName: "base-point",
      data: data,
      whereJson: whereJson,
      sortArr: [{ name: 'sort', type: 'asc' }],
      foreignDB: [
        {
          dbName: "base-area",
          localKey: "area_id",
          foreignKey: "_id",
          as: "area_info",
          limit: 1
        },
        {
          dbName: "base-dept",
          localKey: "manager_dept_id",
          foreignKey: "_id",
          as: "dept_info",
          limit: 1
        }
      ]
    });

    // 解析出上级部门，拼接到部门名称中以满足显示要求
    let rows = listRes.rows || [];
    if (rows.length > 0) {
      let parentIds = [];
      rows.forEach(item => {
        let dept = Array.isArray(item.dept_info) ? item.dept_info[0] : item.dept_info;
        if (dept && dept.parent_id) {
          parentIds.push(dept.parent_id);
        }
      });

      parentIds = [...new Set(parentIds)];

      if (parentIds.length > 0) {
        // 使用 vk.baseDao.select 全量拉取对应的父级部门，必须取 .rows
        let parentDeptsRes = await vk.baseDao.select({
          dbName: "base-dept",
          whereJson: { _id: _.in(parentIds) },
          pageSize: 500
        });

        let parentDepts = parentDeptsRes.rows || [];
        let parentMap = {};
        parentDepts.forEach(p => {
          parentMap[p._id] = p.name;
        });

        // 重新组装名称 "父部门 - 子部门"
        rows.forEach(item => {
          let dept = Array.isArray(item.dept_info) ? item.dept_info[0] : item.dept_info;
          if (dept && dept.parent_id && parentMap[dept.parent_id]) {
            dept.name = parentMap[dept.parent_id] + ' - ' + dept.name;
          }
        });
      }
    }

    // 业务逻辑结束-----------------------------------------------------------
    return listRes;
  }
};
