'use strict';
module.exports = {
  /**
   * 修改日计划（仅无反馈数据时允许）
   * @url admin/plan/sys/update
   * @description 事实数据保护：feedbacks 非空时拒绝修改基本信息
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };
    // 业务逻辑开始-----------------------------------------------------------

    let { _id } = data;
    if (!_id) return { code: -1, msg: '_id 不能为空' };

    // 查询原记录
    let plan = await vk.baseDao.findById({ dbName: 'daily-plan', id: _id });
    if (!plan) return { code: -1, msg: '计划不存在' };

    // 事实数据保护
    if (plan.feedbacks && plan.feedbacks.length > 0) {
      return { code: 71008, msg: '该计划已有反馈数据，不可修改基本信息' };
    }

    // 白名单筛选允许修改的字段
    let allowKeys = ['title', 'content_standard', 'area_id', 'plan_date', 'assignee_type', 'assignee_target'];
    let updateData = {};
    allowKeys.forEach(key => {
      if (data[key] !== undefined) updateData[key] = data[key];
    });

    if (Object.keys(updateData).length === 0) {
      return { code: -1, msg: '没有需要修改的字段' };
    }

    await vk.baseDao.update({
      dbName: 'daily-plan',
      whereJson: { _id: _id },
      dataJson: updateData
    });

    res.msg = '修改成功';

    // 业务逻辑结束-----------------------------------------------------------
    return res;
  },
};
