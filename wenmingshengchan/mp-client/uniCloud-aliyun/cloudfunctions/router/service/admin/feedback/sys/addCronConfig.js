module.exports = {
  /**
   * 添加自动派发时点配置
   * @url admin/feedback/sys/addCronConfig
   */
  main: async (event) => {
    // 解构云函数入参
    let { data = {}, userInfo, util } = event;
    let { vk } = util;

    // 参数必填项安全校验
    if (!data.shift_type) return { code: -1, msg: "班次不能为空" };
    if (!data.trigger_time) return { code: -1, msg: "派发时点不能为空" };
    if (!data.feedback_start) return { code: -1, msg: "反馈开始时间不能为空" };
    if (!data.feedback_end) return { code: -1, msg: "反馈截止时间不能为空" };

    // 格式简单校验：利用正则表达式确保时间格式符合 HH:mm（24小时制）
    let timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    
    // 校验自动派发任务触发点的时间格式
    if (!timeRegex.test(data.trigger_time)) {
      return { code: -1, msg: "派发时点格式错误，需为 HH:mm" };
    }
    // 校验允许反馈的开始与截止时间格式
    if (!timeRegex.test(data.feedback_start) || !timeRegex.test(data.feedback_end)) {
      return { code: -1, msg: "反馈时间格式错误，需为 HH:mm" };
    }
    // 逻辑校验：反馈的开始时间在数值/字面上必须早于截止时间（例如 08:00 < 10:00）
    // 注意：如果是跨天夜班等特殊逻辑，前端传参或系统架构需额外处理跨天标志，这里假定同天比较
    if (data.feedback_start >= data.feedback_end) {
      return { code: -1, msg: "反馈开始时间必须早于截止时间" };
    }

    // 唯一性检查：检查数据库中是否已经存在相同班次 (shift_type) 的配置，避免重复插入
    let exist = await vk.baseDao.count({
      dbName: "key-point-cron-config", // 定时任务配置表
      whereJson: { shift_type: data.shift_type } // 根据班次进行条件统计
    });
    // 如果存在记录，则拒绝新增，提示用户去执行编辑操作
    if (exist > 0) return { code: -1, msg: "该班次配置已存在，如需修改请直接编辑" };

    // 填充修改人/创建人的用户ID，以及当前的时间戳
    data.updator_uid = userInfo._id;
    data.update_time = new Date().getTime();

    // 执行数据库新增操作
    let res = await vk.baseDao.add({
      dbName: "key-point-cron-config", // 定时任务配置表
      dataJson: {
        shift_type: data.shift_type,           // 班次标识（如白班、夜班等）
        trigger_time: data.trigger_time,       // 定时触发派发任务的时分
        feedback_start: data.feedback_start,   // 允许反馈开始的时分
        feedback_end: data.feedback_end,       // 允许反馈截止的时分
        updator_uid: data.updator_uid,         // 记录操作者 uid
        update_time: data.update_time          // 记录操作的时间戳
      }
    });
    
    // 返回执行结果，为了兼容不同的返回格式做安全容错，提取新增的主键 _id 返回给前端
    return { code: 0, msg: "新增成功", _id: typeof res === 'string' ? res : res._id || res.id };
  }
};
