'use strict';
module.exports = {
  /**
   * B端管理员：审计并通过/驳回上报信息
   * @url admin/plan/sys/auditPlan
   * @description 通过判断 audit_result 以修改主单据状态为（验收合格结转 2 / 驳回执行中 0），并追加批复评语印记入反馈列表流
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let uid = userInfo ? userInfo._id : null; 
    let { plan_id, content, images, audit_result } = data; // 从交互接收动作定论：pass 通过，reject 打回

    if (!plan_id) return { code: -1, msg: '缺失被审查单据实体标识' };
    if (!['pass', 'reject'].includes(audit_result)) {
      return { code: -1, msg: '非法审批标识请求枚举' };
    }

    try {
      // 演算状态跃迁下一步的落子: 若通过(pass)则推进到 2(已完成)；若驳回(reject)则打回至 0(重新回归执行中)
      let newStatus = audit_result === 'pass' ? 2 : 0;

      let res = await vk.baseDao.update({
        dbName: "daily-plan",
        whereJson: {
          _id: plan_id,
          // 管理端通常允许对所有状态进行干预，但业务逻辑上建议仅对“验收中(1)”进行标准审计
          // 如果需要强制干预，可以去掉 status: 1 的限制
          status: 1, 
          is_del: _.neq(1)
        },
        dataJson: {
          status: newStatus, 
          feedbacks: _.push({
            type: 'audit', 
            audit_result: audit_result, 
            uid: uid,
            time: Date.now(),
            content: content || '',
            images: images || []
          })
        }
      });

      let updatedCount = typeof res === 'number' ? res : (res ? (res.num || res.updated || 0) : 0);
      if (updatedCount > 0) {
        return { code: 0, msg: '验收操作成功' };
      } else {
        return { code: -1, msg: '操作失败：计划不处于待验收状态或已被处理' };
      }
    } catch(err) {
      return { code: -1, msg: err.message };
    }
  }
}
