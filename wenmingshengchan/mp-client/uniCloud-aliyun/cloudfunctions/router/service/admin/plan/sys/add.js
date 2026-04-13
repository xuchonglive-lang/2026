'use strict';
module.exports = {
  /**
   * 新增日计划下达单据 (B端后台管理员专用)
   * @url admin/plan/sys/add
   * @description 该接口接收管理平台录入的参数，通过系统统一的软删除与时间戳校验写入新计划集合中，初始态强制指定为 0 (执行中)
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk } = util;
    let { uid } = userInfo; // 获取当前登录的管理员真实UID

    // 组装将要存入数据库的对象
    // 合并前端传入的核心结构，并在此基础上做系统级覆写防御
    let dataJson = {
      ...data,               // 包含 title, status, desc 等
      issuer_uid: uid,       // 下发人绑定为当前管理员
      feedbacks: [],         // 历史反馈记录置空，开辟全新生命周期
      status: 0,             // 预设默认状态：0执行中
      is_del: 0,             // 采用软删除架构标记，0未删除，1逻辑死
      create_time: Date.now()// 录入当前的创建绝对毫秒数
    };

    // 时间转化容错：若前端发送的截止时间是字面量，在此化为毫秒时间戳进行精准计算
    if (dataJson.deadline_time && typeof dataJson.deadline_time === 'string') {
      dataJson.deadline_time = new Date(dataJson.deadline_time).getTime();
    }

    // 获取分配人员的信息，继承其部门
    if (dataJson.assignee_ids && dataJson.assignee_ids.length > 0) {
      let main_assignee_id = Array.isArray(dataJson.assignee_ids) ? dataJson.assignee_ids[0] : dataJson.assignee_ids;
      let userRes = await vk.baseDao.findById({
        dbName: "uni-id-users",
        id: main_assignee_id
      });
      if (userRes && userRes.department_id) {
        dataJson.dept_id = userRes.department_id;
      }
    }

    // 调用基础增删改查安全模块将数据正式入库
    let id = await vk.baseDao.add({
      dbName: "daily-plan",
      dataJson: dataJson
    });

    return { code: 0, msg: "添加成功", id };
  }
}
