'use strict';
module.exports = {
  /**
   * 创建日计划
   * @url admin/plan/sys/add
   * @description 计划员创建当日治理计划并指派给本部门人员或班组，status 自动为1(执行中)
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };
    // 业务逻辑开始-----------------------------------------------------------

    let { title, content_standard, area_id, plan_date, assignee_type, assignee_target } = data;

    // 入参校验
    if (!title) return { code: -1, msg: '计划标题必须填写' };
    if (!content_standard) return { code: -1, msg: '执行标准必须填写' };
    if (!area_id) return { code: -1, msg: '执行区域必须选择' };
    if (!plan_date) return { code: -1, msg: '计划日期必须选择' };
    if (!assignee_type || !['group', 'users'].includes(assignee_type)) {
      return { code: -1, msg: '派发方式不合法' };
    }
    if (!assignee_target || !Array.isArray(assignee_target) || assignee_target.length === 0) {
      return { code: -1, msg: '必须指定执行人' };
    }

    // 获取操作人部门ID
    let userDoc = await vk.baseDao.findById({
      dbName: 'uni-id-users',
      id: uid,
      fieldJson: { department_id: 1 }
    });
    let deptId = userDoc ? userDoc.department_id : '';

    // 安全重组数据，不直接透传 data
    let insertData = {
      dept_id: deptId,
      title: title,
      content_standard: content_standard,
      area_id: area_id,
      plan_date: plan_date,
      issuer_uid: uid,
      assignee_type: assignee_type,
      assignee_target: assignee_target,
      status: 1,
      feedbacks: [],
      verify_result: null,
      is_del: 0
    };

    res.id = await vk.baseDao.add({
      dbName: 'daily-plan',
      dataJson: insertData
    });

    res.msg = '计划创建成功';

    // 业务逻辑结束-----------------------------------------------------------
    return res;
  },
};
