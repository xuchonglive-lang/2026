'use strict';
const planUtils = require('../../../common/plan-utils');
module.exports = {
  /**
   * 计划详情查询
   * @url client/plan/kh/getDetail
   * @description 返回完整计划数据 + 关联人员姓名 + 被动感知状态 + 操作权限标记
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };
    // 业务逻辑开始-----------------------------------------------------------

    let { plan_id } = data;
    if (!plan_id) return { code: -1, msg: 'plan_id 不能为空' };

    // 查询计划
    let plan = await vk.baseDao.findById({
      dbName: 'daily-plan',
      id: plan_id
    });
    if (!plan) return { code: -1, msg: '计划不存在' };

    // 关联查询区域名称
    if (plan.area_id) {
      let area = await vk.baseDao.findById({ dbName: 'base-area', id: plan.area_id, fieldJson: { name: 1 } });
      plan.area_name = area ? area.name : '';
    }
    // 关联下达人姓名
    if (plan.issuer_uid) {
      let issuer = await vk.baseDao.findById({ dbName: 'uni-id-users', id: plan.issuer_uid, fieldJson: { real_name: 1 } });
      plan.issuer_name = issuer ? issuer.real_name : '';
    }
    // 关联反馈人姓名（批量查询去重后的uid集合）
    if (plan.feedbacks && plan.feedbacks.length > 0) {
      let feedbackUids = [...new Set(plan.feedbacks.map(f => f.uid))];
      let usersResult = await vk.baseDao.select({
        dbName: 'uni-id-users',
        whereJson: { _id: _.in(feedbackUids) },
        fieldJson: { real_name: 1 },
        pageSize: 100
      });
      let users = usersResult.rows || [];
      let nameMap = {};
      users.forEach(u => { nameMap[u._id] = u.real_name; });
      plan.feedbacks.forEach(f => { f.user_name = nameMap[f.uid] || '未知'; });
    }
    // 关联验收人姓名
    if (plan.verify_result && plan.verify_result.uid) {
      let verifier = await vk.baseDao.findById({ dbName: 'uni-id-users', id: plan.verify_result.uid, fieldJson: { real_name: 1 } });
      if (verifier) plan.verify_result.user_name = verifier.real_name;
    }
    // 关联执行人显示名称
    if (plan.assignee_type === 'group' && plan.assignee_target && plan.assignee_target.length > 0) {
      let deptsResult = await vk.baseDao.select({
        dbName: 'base-dept',
        whereJson: { _id: _.in(plan.assignee_target) },
        fieldJson: { name: 1 },
        pageSize: 100
      });
      plan.assignee_names = (deptsResult.rows || []).map(d => d.name);
    } else if (plan.assignee_type === 'users' && plan.assignee_target && plan.assignee_target.length > 0) {
      let usrsResult = await vk.baseDao.select({
        dbName: 'uni-id-users',
        whereJson: { _id: _.in(plan.assignee_target) },
        fieldJson: { real_name: 1 },
        pageSize: 100
      });
      plan.assignee_names = (usrsResult.rows || []).map(u => u.real_name);
    }

    // 被动感知计算展示状态
    plan.display_status = planUtils.getDisplayStatus(plan);

    // 计算操作权限标记
    let curUser = await vk.baseDao.findById({
      dbName: 'uni-id-users',
      id: uid,
      fieldJson: { department_id: 1, role: 1 }
    });
    let userDeptId = curUser ? curUser.department_id : '';
    let userRoles = curUser ? (curUser.role || []) : [];

    // can_submit: 用户是执行人 + status允许 + 未过期
    let isAssignee = false;
    if (plan.assignee_type === 'users') {
      isAssignee = plan.assignee_target && plan.assignee_target.includes(uid);
    } else if (plan.assignee_type === 'group') {
      isAssignee = plan.assignee_target && plan.assignee_target.includes(userDeptId);
    }
    plan.can_submit = isAssignee && [1, 2, 3].includes(plan.status) && !planUtils.isExpired(plan.plan_date);

    // can_verify: plan_admin/super_admin + status=2
    plan.can_verify = (
      (userRoles.includes('plan_admin') && plan.dept_id === userDeptId) ||
      userRoles.includes('super_admin')
    ) && plan.status === 2;

    res.data = plan;

    // 业务逻辑结束-----------------------------------------------------------
    return res;
  },
};
