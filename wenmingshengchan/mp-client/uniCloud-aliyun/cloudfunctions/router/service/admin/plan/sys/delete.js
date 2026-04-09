'use strict';
module.exports = {
  /**
   * 删除日计划（软删除，仅无反馈数据时允许）
   * @url admin/plan/sys/delete
   * @description 事实数据保护：feedbacks 非空时拒绝删除。使用软删除 is_del=1
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };
    // 业务逻辑开始-----------------------------------------------------------

    let { _id } = data;
    if (!_id) return { code: -1, msg: '_id 不能为空' };

    let plan = await vk.baseDao.findById({ dbName: 'daily-plan', id: _id });
    if (!plan) return { code: -1, msg: '计划不存在' };

    // 事实数据保护
    if (plan.feedbacks && plan.feedbacks.length > 0) {
      return { code: 71009, msg: '该计划已有反馈数据，不可删除' };
    }

    // 软删除（严打物理删除，参照 development-gotchas.md 2.3）
    await vk.baseDao.update({
      dbName: 'daily-plan',
      whereJson: { _id: _id },
      dataJson: { is_del: 1 }
    });

    res.msg = '删除成功';

    // 业务逻辑结束-----------------------------------------------------------
    return res;
  },
};
