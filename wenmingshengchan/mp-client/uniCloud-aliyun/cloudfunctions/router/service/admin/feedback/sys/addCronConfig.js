module.exports = {
  /**
   * 添加自动派发时点配置
   * @url admin/feedback/sys/addCronConfig
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk } = util;

    // 参数校验
    if (!data.shift_type) return { code: -1, msg: "班次不能为空" };
    if (!data.trigger_time) return { code: -1, msg: "派发时点不能为空" };
    if (!data.feedback_start) return { code: -1, msg: "反馈开始时间不能为空" };
    if (!data.feedback_end) return { code: -1, msg: "反馈截止时间不能为空" };

    // 格式简单校验 (HH:mm)
    let timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    if (!timeRegex.test(data.trigger_time)) {
      return { code: -1, msg: "派发时点格式错误，需为 HH:mm" };
    }
    if (!timeRegex.test(data.feedback_start) || !timeRegex.test(data.feedback_end)) {
      return { code: -1, msg: "反馈时间格式错误，需为 HH:mm" };
    }
    if (data.feedback_start >= data.feedback_end) {
      return { code: -1, msg: "反馈开始时间必须早于截止时间" };
    }

    // 检查是否存在重复的班次配置
    let exist = await vk.baseDao.count({
      dbName: "key-point-cron-config",
      whereJson: { shift_type: data.shift_type }
    });
    if (exist > 0) return { code: -1, msg: "该班次配置已存在，如需修改请直接编辑" };

    data.updator_uid = userInfo._id;
    data.update_time = new Date().getTime();

    let res = await vk.baseDao.add({
      dbName: "key-point-cron-config",
      dataJson: {
        shift_type: data.shift_type,
        trigger_time: data.trigger_time,
        feedback_start: data.feedback_start,
        feedback_end: data.feedback_end,
        updator_uid: data.updator_uid,
        update_time: data.update_time
      }
    });
    return { code: 0, msg: "新增成功", _id: typeof res === 'string' ? res : res._id || res.id };
  }
};
