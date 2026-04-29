module.exports = {
  /**
   * 更新定时任务配置
   * @url admin/feedback/sys/updateCronConfig
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk } = util;
    let res = { code: 0, msg: '' };

    if (!data._id) return { code: -1, msg: "缺少记录_id" };

    // 反馈窗口时间格式校验
    let timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    if (data.feedback_start && !timeRegex.test(data.feedback_start)) return { code: -1, msg: "反馈开始时间格式错误，需为 HH:mm" };
    if (data.feedback_end && !timeRegex.test(data.feedback_end)) return { code: -1, msg: "反馈截止时间格式错误，需为 HH:mm" };
    if (data.feedback_start && data.feedback_end && data.feedback_start >= data.feedback_end) {
      return { code: -1, msg: "反馈开始时间必须早于截止时间" };
    }

    let uid = userInfo._id || userInfo.uid || event.uid;
    let _id = data._id;
    delete data._id;

    data.updator_uid = uid;
    data.update_time = Date.now();

    let num = await vk.baseDao.updateById({
      dbName: "key-point-cron-config",
      id: _id,
      dataJson: data
    });

    if (num > 0) {
      res.msg = "更新成功";
    } else {
      res.code = -1;
      res.msg = "更新失败";
    }

    return res;
  }
};

