module.exports = {
  /**
   * 获取区域列表
   * @url admin/base-area/sys/getList
   * @description 获取区域列表，包含分页、关联查询与按排序码升序排序
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };
    // 业务逻辑开始-----------------------------------------------------------
    
    // 基于逻辑删除体系过滤废弃区域条目
    let whereJson = data.whereJson || {};
    whereJson.is_del = _.neq(1);

    // 注入底层基于表的全套安全检查与列表整合生成 API
    let listRes = await vk.baseDao.getTableData({
      dbName: "base-area",
      pageIndex: data.pageIndex,
      pageSize: data.pageSize,
      whereJson: whereJson,
      sortArr: [{ name: 'sort', type: 'asc' }],
      foreignDB: [
        {
          dbName: "base-dept",
          localKey: "manager_dept_id",
          foreignKey: "_id",
          as: "dept_info",
          limit: 1
        }
      ]
    });
    
    // 业务逻辑结束-----------------------------------------------------------
    return listRes;
  }
};
