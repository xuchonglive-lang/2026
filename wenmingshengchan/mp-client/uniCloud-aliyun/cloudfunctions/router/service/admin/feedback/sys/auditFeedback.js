module.exports = {
  /**
   * 审核/督查反馈记录（监管层对员工提交的反馈进行批示留痕）
   * @url admin/feedback/sys/auditFeedback
   */
  main: async (event) => {
    // 解构入参：获取前端传参数据、当前登录用户信息、工具包对象
    let { data = {}, userInfo, util } = event;
    let { vk } = util;
    let res = { code: 0, msg: '' };

    // 数据完整性校验：必须提供待审核记录的唯一主键
    if (!data._id) return { code: -1, msg: "缺少记录_id" };

    // 提取出主键以及批示内容（审核意见/留痕记录）
    let _id = data._id;
    let audit_mark = data.audit_mark;
    
    // 获取当前进行审核操作的用户ID（兼容多种取值来源）
    let uid = userInfo._id || userInfo.uid || event.uid;

    // 执行数据库更新：定位到对应的重控流水记录，并修改相关审核字段
    let num = await vk.baseDao.update({
      dbName: "key-point-feedback", // 操作重控点位流水表
      whereJson: { _id: _id },      // 通过精确的_id寻找要被批注的数据
      dataJson: {
        audit_mark: audit_mark,     // 写入督查意见/审批备注
        audit_uid: uid,             // 记录是哪位审核人操作的
        audit_time: Date.now()      // 记录此次审核操作发生的时间戳
      }
    });

    // 检验是否更新成功（即是否成功命中该记录并完成覆盖）
    if (num > 0) {
      res.msg = "督查留痕成功";
    } else {
      res.code = -1;
      // 受影响行数为0，表示这条流水数据可能因为其它原因被删除了或找不到
      res.msg = "操作失败，可能记录已被删除";
    }

    // 返回操作结果对象
    return res;
  }
};
