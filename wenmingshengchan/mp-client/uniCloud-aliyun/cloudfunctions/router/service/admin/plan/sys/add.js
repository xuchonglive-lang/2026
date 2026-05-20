'use strict';
module.exports = {
  /**
   * 新增日计划下达单据 (B端后台管理员专用)
   * @url admin/plan/sys/add
   * @description 该接口接收管理平台录入的参数，通过系统统一的软删除与时间戳校验写入新计划集合中，初始态强制指定为 0 (执行中)
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let uid = userInfo ? userInfo._id : null; // 获取当前登录的管理员真实UID

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

    // 获取分配人员的信息，继承其部门，并采集所有小组ID
    if (dataJson.assignee_ids && dataJson.assignee_ids.length > 0) {
      let ids = Array.isArray(dataJson.assignee_ids) ? dataJson.assignee_ids : [dataJson.assignee_ids];
      let usersRes = await vk.baseDao.select({
        dbName: "uni-id-users",
        whereJson: { _id: _.in(ids) },
        fieldJson: { department_id: 1, group_id: 1 },
        pageSize: 100
      });
      // 主执行人的部门作为计划归属部门
      if (usersRes.rows && usersRes.rows.length > 0) {
        let firstUser = usersRes.rows[0];
        if (firstUser.department_id) {
          // 兼容 uni-id 中部门id可能是数组的情况
          dataJson.dept_id = Array.isArray(firstUser.department_id) ? firstUser.department_id[0] : firstUser.department_id;
        }
        // 采集所有执行人的小组ID（去重，并兼容 group_id 是数组的情况）
        let groupIds = [];
        usersRes.rows.forEach(u => {
          if (u.group_id) {
            let gids = Array.isArray(u.group_id) ? u.group_id : [u.group_id];
            gids.forEach(gid => {
              if (gid && !groupIds.includes(gid)) {
                groupIds.push(gid);
              }
            });
          }
        });
        dataJson.group_ids = groupIds;
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
