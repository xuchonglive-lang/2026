'use strict';
module.exports = {
  /**
   * 首页我的待办计划数量
   * @url client/plan/kh/getTodoCount
   * @description 根据当前登录用户身份，统计今日需要其执行的日计划待办数量（status=1执行中 或 status=3未达标）
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };
    // 业务逻辑开始-----------------------------------------------------------

    // 获取当前用户的部门ID
    let userDoc = await vk.baseDao.findById({
      dbName: 'uni-id-users',
      id: uid,
      fieldJson: { department_id: 1 }
    });
    if (!userDoc) return { code: -1, msg: '用户信息异常' };
    let deptId = userDoc.department_id;

    // 今日日期字符串
    let today = vk.pubfn.timeFormat(new Date(), 'yyyy-MM-dd');

    // 查询条件：今日 + 可反馈状态(1或3) + 我是执行人
    let count = await vk.baseDao.count({
      dbName: 'daily-plan',
      whereJson: {
        plan_date: today,
        status: _.in([1, 3]),
        assignee_target: _.in([uid, deptId])
      }
    });

    res.count = count;

    // 业务逻辑结束-----------------------------------------------------------
    return res;
  },
};
