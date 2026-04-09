'use strict';
const planUtils = require('../../../common/plan-utils');
module.exports = {
  /**
   * 统计汇总
   * @url admin/plan/sys/getStatistics
   * @description 按日期范围聚合统计完成率/逾期率，支持Excel导出数据源
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };
    // 业务逻辑开始-----------------------------------------------------------

    let { date_start, date_end, dept_id } = data;
    if (!date_start || !date_end) return { code: -1, msg: '日期范围必填' };

    let whereJson = {
      plan_date: _.gte(date_start).and(_.lte(date_end)),
      is_del: _.neq(1)
    };
    if (dept_id) whereJson.dept_id = dept_id;

    // 查询全部数据（统计用，设大 pageSize）
    let result = await vk.baseDao.select({
      dbName: 'daily-plan',
      whereJson: whereJson,
      fieldJson: { status: 1, plan_date: 1 },
      pageSize: 5000
    });
    let list = result.rows || [];

    let total = list.length;
    let completed = 0, overdue = 0, rejected = 0, timeout = 0;

    list.forEach(plan => {
      let ds = planUtils.getDisplayStatus(plan);
      if (ds === 5) completed++;
      else if (ds === 6) overdue++;
      else if (ds === 3) rejected++;
      else if (ds === 4) timeout++;
    });

    res.data = {
      total,
      completed,
      overdue,
      rejected,
      timeout,
      completion_rate: total > 0 ? Math.round(completed / total * 100) : 0
    };

    // 业务逻辑结束-----------------------------------------------------------
    return res;
  },
};
