'use strict';
module.exports = {
  /**
   * C端工长或管理员：审计并通过/驳回上报信息
   * @url client/plan/user/auditPlan
   * @description 通过判断 audit_result 以修改主单据状态为（验收合格结转 2/验收残次打回 3），并追加批复评语印记入反馈列表流
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let { uid } = userInfo; // 操作管理端账号UID
    let { plan_id, content, images, audit_result } = data; // 从交互接收动作定论：pass 通过，reject 打回

    if (!plan_id) return { code: -1, msg: '确实被审查单据实体标识' };
    if (!['pass', 'reject'].includes(audit_result)) {
      return { code: -1, msg: '非法审批标识请求枚举' };
    }

    try {
      // 演算状态跃迁下一步的落子
      let newStatus = audit_result === 'pass' ? 2 : 3;

      let res = await vk.baseDao.update({
        dbName: "daily-plan",
        whereJson: {
          _id: plan_id,
          // 逻辑锁排查：如果工人还未提交，或是已经被审核成了定论态，严禁随意二次干涉修改
          status: 1, 
          is_del: _.neq(1)
        },
        dataJson: {
          status: newStatus, // 刷新统筹阶段定论状态
          // 把领导下发的回执言论及照片，与之前的汇报链条接龙汇成闭合回路
          feedbacks: _.push({
            type: 'audit', // 多态标记点：领导审核批复行文
            audit_result: audit_result, // pass(通过的喜悦) | reject(残酷的整改)
            uid: uid,
            time: Date.now(),
            content: content || '',
            images: images || []
          })
        }
      });
      if (res && res.updated > 0) {
        return { code: 0, msg: '审计动作签署与发报响应成功' };
      } else {
        return { code: -1, msg: '阻断报错：目标计划并不处于"交付待查"阶段或者存在数据并发幻读保护。' };
      }
    } catch(err) {
      return { code: -1, msg: err.message };
    }
  }
}
