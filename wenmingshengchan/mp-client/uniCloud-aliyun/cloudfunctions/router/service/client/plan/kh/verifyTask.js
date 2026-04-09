'use strict';
module.exports = {
  /**
   * 计划员验收操作
   * @url client/plan/kh/verifyTask
   * @description 计划员对已提交(status=2)的计划进行验收，通过→status=5，驳回→status=3
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };
    // 业务逻辑开始-----------------------------------------------------------

    let { plan_id, passed, remark = '' } = data;
    if (!plan_id) return { code: -1, msg: 'plan_id 不能为空' };
    if (typeof passed !== 'boolean') return { code: -1, msg: 'passed 参数必须为布尔值' };
    if (!passed && !remark) return { code: -1, msg: '驳回时必须填写理由' };

    // 获取用户信息
    let userDoc = await vk.baseDao.findById({
      dbName: 'uni-id-users',
      id: uid,
      fieldJson: { department_id: 1, role: 1 }
    });
    let userRoles = userDoc ? (userDoc.role || []) : [];
    let userDeptId = userDoc ? userDoc.department_id : '';

    // 角色校验
    if (!userRoles.includes('plan_admin') && !userRoles.includes('super_admin')) {
      return { code: 71005, msg: '您没有验收权限' };
    }

    // 查询计划
    let plan = await vk.baseDao.findById({ dbName: 'daily-plan', id: plan_id });
    if (!plan) return { code: -1, msg: '计划不存在' };

    // 归属校验（plan_admin 仅可验收本部门）
    if (!userRoles.includes('super_admin') && plan.dept_id !== userDeptId) {
      return { code: 71006, msg: '该计划不属于您的部门' };
    }

    // 状态校验
    if (plan.status !== 2) {
      return { code: 71007, msg: '该计划当前状态不可验收' };
    }

    // 写入验收结果
    await vk.baseDao.update({
      dbName: 'daily-plan',
      whereJson: { _id: plan_id },
      dataJson: {
        verify_result: {
          uid: uid,
          time: Date.now(),
          passed: passed,
          remark: remark
        },
        status: passed ? 5 : 3
      }
    });

    res.msg = passed ? '验收通过' : '验收驳回';

    // 业务逻辑结束-----------------------------------------------------------
    return res;
  },
};
