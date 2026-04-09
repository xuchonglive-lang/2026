'use strict';
/**
 * 日治理计划模块 - 公共工具函数
 */
module.exports = {
  /**
   * 计算计划的展示状态（被动感知逾期/超时）
   * @param {Object} plan - 计划记录，需包含 status 和 plan_date
   * @returns {Number} 展示状态: 1/2/3/4/5/6
   */
  getDisplayStatus(plan) {
    let deadline = new Date(plan.plan_date + ' 23:59:59').getTime();
    let now = Date.now();
    let isExpired = now > deadline;
    // 物理终态直接返回
    if (plan.status === 5) return 5;
    // 被动感知
    if (isExpired) {
      if (plan.status === 2) return 4; // 超时未验收
      if (plan.status === 1 || plan.status === 3) return 6; // 已逾期
    }
    return plan.status;
  },

  /**
   * 判断计划是否已过截止时间
   * @param {String} plan_date - "YYYY-MM-DD"
   * @returns {Boolean}
   */
  isExpired(plan_date) {
    let deadline = new Date(plan_date + ' 23:59:59').getTime();
    return Date.now() > deadline;
  },

  /**
   * 状态字典映射
   */
  statusDict: {
    1: '执行中',
    2: '已提交',
    3: '未达标',
    4: '超时未验收',
    5: '已完成',
    6: '已逾期'
  }
};
