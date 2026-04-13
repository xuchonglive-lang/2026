'use strict';
module.exports = {
  /**
   * C端一线人员：提报日计划执行证明记录 (上交作业)
   * @url client/plan/user/submitFeedback
   * @description 将操作者上传的佐证以原子级别（Array.push形态）推入文档，触发主单据向“待审核已提交”倒转
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let { uid } = userInfo; // 提取授权校验通过后的客户端UID
    let { plan_id, content, images } = data; // 接收富文本以及图片集列表

    // 缺少必要结构支撑径直挂起拦截响应
    if (!plan_id) return { code: -1, msg: '严正拒绝：缺失指向单据主键ID' };

    try {
      // 通过对原表更新发起多步并行组合业务
      let res = await vk.baseDao.update({
        dbName: "daily-plan",
        whereJson: {
          _id: plan_id,
          // 极度严厉：如果任务当前已被完结闭环或因拒交被冻结了死线，决不让脏数据录入混淆视听
          status: _.in([0, 1, 3]), // 允许：[0初下执行中]、[1重复举证叠加]、[3此前被驳回责令重构] 
          is_del: _.neq(1)
        },
        dataJson: {
          // 直接牵引主单据头顶标位更改，向上挂起等候审查人员验收 (状态改为: 已提交待审批)
          status: 1, 
          // 采用文档内嵌型流式增长追加手段（防并发死锁且支持跨机器隔离操作）
          feedbacks: _.push({
            type: 'submit', // 多态标记点：执行人员正面回复动作
            uid: uid, // 保留责任者钢印痕迹
            time: Date.now(), // 毫秒防篡改时令戳
            content: content || '',
            images: images || [] // 可能空挂，默认为空以防解构故障崩溃
          })
        }
      });
      if (res && res.updated > 0) {
        return { code: 0, msg: '已安全提交审核材料栈，请候佳音' };
      } else {
        return { code: -1, msg: '提交异常：可能是权限过期、该单据时段不符合挂载等原因锁闭。' };
      }
    } catch(err) {
      return { code: -1, msg: err.message };
    }
  }
}
