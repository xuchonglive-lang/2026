'use strict';
module.exports = {
  /**
   * 获取所有部门列表（下拉选择用）
   * @url admin/base-dept/sys/getAll
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };
    // 业务逻辑开始-----------------------------------------------------------

    let allData = await vk.baseDao.select({
      dbName: 'base-dept',
      whereJson: { is_del: _.neq(1) },
      pageSize: 500,
      sortArr: [{ name: 'sort', type: 'asc' }]
    });

    res.rows = allData.rows || [];
    return res;

    // 业务逻辑结束-----------------------------------------------------------
  },
};
