'use strict';
const planUtils = require('../../../common/plan-utils');
module.exports = {
  /**
   * 日计划列表查询（双Tab数据源）
   * @url client/plan/kh/getList
   * @description Tab1(all)全局当日计划不过滤身份；Tab2(mine)仅返回分配给当前用户的计划
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };
    // 业务逻辑开始-----------------------------------------------------------

    let { tab = 'all', plan_date } = data;

    // 默认今天
    if (!plan_date) {
      plan_date = vk.pubfn.timeFormat(new Date(), 'yyyy-MM-dd');
    }

    let whereJson = { plan_date: plan_date };

    // Tab2: 我的任务，追加身份过滤
    if (tab === 'mine') {
      let userDoc = await vk.baseDao.findById({
        dbName: 'uni-id-users',
        id: uid,
        fieldJson: { department_id: 1 }
      });
      let deptId = userDoc ? userDoc.department_id : '';
      // assignee_target 可能包含 uid(按人) 或 deptId(按组)
      whereJson.assignee_target = _.in([uid, deptId]);
    }

    let listRes = await vk.baseDao.getTableData({
      dbName: 'daily-plan',
      data: data,
      whereJson: whereJson,
      sortArr: [{ name: 'create_time', type: 'desc' }],
      foreignDB: [
        {
          dbName: 'base-area',
          localKey: 'area_id',
          foreignKey: '_id',
          as: 'area_info',
          limit: 1
        },
        {
          dbName: 'base-dept',
          localKey: 'dept_id',
          foreignKey: '_id',
          as: 'dept_info',
          limit: 1
        },
        {
          dbName: 'uni-id-users',
          localKey: 'issuer_uid',
          foreignKey: '_id',
          as: 'issuer_info',
          limit: 1
        }
      ]
    });

    // 被动感知计算展示状态 + 数据整形
    if (listRes.rows) {
      listRes.rows.forEach(item => {
        item.display_status = planUtils.getDisplayStatus(item);
        item.area_name = item.area_info && item.area_info[0] ? item.area_info[0].name : '';
        item.dept_name = item.dept_info && item.dept_info[0] ? item.dept_info[0].name : '';
        item.issuer_name = item.issuer_info && item.issuer_info[0] ? item.issuer_info[0].real_name : '';
        item.feedback_count = item.feedbacks ? item.feedbacks.length : 0;
      });
    }

    res = listRes;

    // 业务逻辑结束-----------------------------------------------------------
    return res;
  },
};
