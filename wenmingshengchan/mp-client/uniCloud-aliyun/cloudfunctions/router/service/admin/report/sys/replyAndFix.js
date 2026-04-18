module.exports = {
  /**
   * 处理及结案（带乐观锁）
   * @url admin/report/sys/replyAndFix
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };

    let { _id, reply_content, reply_images, status } = data;

    if (!_id) return { code: -1, msg: '缺少记录ID' };
    if (vk.pubfn.isNull(status)) return { code: -1, msg: '缺少处理状态' };

    // 如果状态为 2，并且没有填写回复内容
    if (status === 2 && vk.pubfn.isNull(reply_content)) {
      return { code: -1, msg: '结案时必须填写处理意见' };
    }

    // 乐观锁：只允许状态 0 或 1 被操作，或者状态为 3 作废
    // 如果要作废，管理员可以在任何时候作废 (除非已结案？)
    let conditionStatus = _.in([0, 1]);
    if (status === 3) {
      conditionStatus = _.in([0, 1, 2]); // 可以把任何状态作废
    }

    let updateRes = await vk.baseDao.updateAndReturn({
      dbName: "problem-report",
      whereJson: {
        _id: _id,
        status: conditionStatus
      },
      dataJson: {
        status: status,
        reply_content: reply_content,
        reply_images: reply_images || [],
        reply_uid: uid,
        reply_time: new Date().getTime()
      }
    });

    if (updateRes && updateRes._id) {
      res.msg = '处理成功';
    } else {
      res.code = -1;
      res.msg = '操作被阻断：该工单可能已被其他同事处理，或当前状态不可更改。';
    }

    return res;
  }
};
