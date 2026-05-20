module.exports = {
  /**
   * 更新定时任务配置
   * @url admin/feedback/sys/updateCronConfig
   */
  main: async (event) => {
    // 解构云函数入参
    let { data = {}, userInfo, util } = event;
    let { vk } = util;
    // 初始化默认返回对象
    let res = { code: 0, msg: '' };

    // 数据完整性校验：必须提供要修改记录的主键 _id
    if (!data._id) return { code: -1, msg: "缺少记录_id" };

    // 反馈窗口时间格式校验：必须为 HH:mm 格式的 24 小时制字符串
    let timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    // 如果传入了开始时间，则进行正则校验
    if (data.feedback_start && !timeRegex.test(data.feedback_start)) return { code: -1, msg: "反馈开始时间格式错误，需为 HH:mm" };
    // 如果传入了截止时间，同样进行正则校验
    if (data.feedback_end && !timeRegex.test(data.feedback_end)) return { code: -1, msg: "反馈截止时间格式错误，需为 HH:mm" };
    // 逻辑比对：确保反馈开始时间严格早于截止时间（注：此逻辑不兼容跨天班次的场景，若有跨天业务需重构此判断）
    if (data.feedback_start && data.feedback_end && data.feedback_start >= data.feedback_end) {
      return { code: -1, msg: "反馈开始时间必须早于截止时间" };
    }

    // 获取当前登录用户 uid 的安全写法（兼容三种常见取法）
    let uid = userInfo._id || userInfo.uid || event.uid;
    
    // 取出主键 _id 并在原对象中删除，防止它作为被更新的内容错误覆盖数据库的 _id 属性
    let _id = data._id;
    delete data._id;

    // 记录本次修改是由谁操作，以及发生的时间
    data.updator_uid = uid;
    data.update_time = Date.now();

    // 调用基础 DAO 执行通过 _id 更新的操作
    let num = await vk.baseDao.updateById({
      dbName: "key-point-cron-config", // 定时任务配置表
      id: _id,                         // 目标行主键
      dataJson: data                   // 更新的新数据对象
    });

    // 检验更新结果
    if (num > 0) {
      // 成功影响了 1 行或以上数据
      res.msg = "更新成功";
    } else {
      // 未影响任何数据，可能是因为 _id 错误或记录已遭删除
      res.code = -1;
      res.msg = "更新失败";
    }

    return res;
  }
};

