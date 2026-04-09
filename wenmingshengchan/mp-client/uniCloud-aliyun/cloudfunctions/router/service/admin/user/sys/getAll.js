'use strict';
module.exports = {
  /**
   * 获取所有用户列表（下拉选择用）
   * @url admin/user/sys/getAll
   * @description 返回所有在职用户（status=0正常）的 _id 和 real_name，供日计划派发选人用
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };
    // 业务逻辑开始-----------------------------------------------------------

    let allData = await vk.baseDao.select({
      dbName: 'uni-id-users',
      whereJson: { status: 0 },
      fieldJson: { real_name: 1, department_id: 1, mobile: 1 },
      pageSize: 500,
      sortArr: [{ name: 'real_name', type: 'asc' }]
    });

    res.rows = allData.rows || [];
    return res;

    // 业务逻辑结束-----------------------------------------------------------
  },
};
