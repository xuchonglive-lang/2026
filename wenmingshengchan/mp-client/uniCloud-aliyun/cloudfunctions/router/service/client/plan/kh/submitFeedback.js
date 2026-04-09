'use strict';
const planUtils = require('../../../common/plan-utils');
module.exports = {
  /**
   * 执行人提交反馈（3层防护栈）
   * @url client/plan/kh/submitFeedback
   * @description 防护栈：①身份校验 ②状态校验 ③时限校验。通过后使用 _.push() 原子追加 feedbacks 数组
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };
    // 业务逻辑开始-----------------------------------------------------------

    let { plan_id, imgs, remark = '' } = data;

    // 入参校验
    if (!plan_id) return { code: -1, msg: 'plan_id 不能为空' };
    if (!imgs || !Array.isArray(imgs) || imgs.length === 0) {
      return { code: -1, msg: '请至少上传一张照片' };
    }
    if (imgs.length > 9) return { code: -1, msg: '最多上传9张照片' };

    // 查询计划记录
    let plan = await vk.baseDao.findById({
      dbName: 'daily-plan',
      id: plan_id
    });
    if (!plan) return { code: -1, msg: '计划不存在' };

    // === 防护层1：状态校验 ===
    if (plan.status === 5) {
      return { code: 71004, msg: '该任务已完成，不可再操作' };
    }
    if (![1, 2, 3].includes(plan.status)) {
      return { code: 71004, msg: '该任务当前状态不允许提交反馈' };
    }

    // === 防护层2：时限校验 ===
    if (planUtils.isExpired(plan.plan_date)) {
      return { code: 71001, msg: '已逾期，不能提交' };
    }

    // === 防护层3：身份校验 ===
    let userDoc = await vk.baseDao.findById({
      dbName: 'uni-id-users',
      id: uid,
      fieldJson: { department_id: 1 }
    });
    let userDeptId = userDoc ? userDoc.department_id : '';

    let isAssignee = false;
    if (plan.assignee_type === 'users') {
      isAssignee = plan.assignee_target && plan.assignee_target.includes(uid);
    } else if (plan.assignee_type === 'group') {
      isAssignee = plan.assignee_target && plan.assignee_target.includes(userDeptId);
    }
    if (!isAssignee) {
      return { code: 71003, msg: '您不是该任务的指定执行人' };
    }

    // === 通过全部校验，原子写入 ===
    await vk.baseDao.update({
      dbName: 'daily-plan',
      whereJson: { _id: plan_id },
      dataJson: {
        feedbacks: _.push({
          uid: uid,
          time: Date.now(),
          imgs: imgs,
          remark: remark
        }),
        status: 2
      }
    });

    res.msg = '反馈提交成功';

    // 业务逻辑结束-----------------------------------------------------------
    return res;
  },
};
