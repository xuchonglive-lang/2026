module.exports = {
  /**
   * 审核/督查反馈记录
   * @url admin/feedback/sys/auditFeedback
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk } = util;
    let res = { code: 0, msg: '' };

    if (!data._id) return { code: -1, msg: "缺少记录_id" };

    let _id = data._id;
    let audit_mark = data.audit_mark;
    
    // 获取审核人ID
    let uid = userInfo._id || userInfo.uid || event.uid;

    let num = await vk.baseDao.update({
      dbName: "key-point-feedback",
      whereJson: { _id: _id },
      dataJson: {
        audit_mark: audit_mark,
        audit_uid: uid,
        audit_time: Date.now()
      }
    });

    if (num > 0) {
      res.msg = "督查留痕成功";
    } else {
      res.code = -1;
      res.msg = "操作失败，可能记录已被删除";
    }

    return res;
  }
};
