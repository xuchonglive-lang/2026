module.exports = {
  /**
   * 获取报备详情
   * @url admin/report/sys/getDetail
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };

    let { report_id } = data;
    if (!report_id) return { code: -1, msg: '缺少记录ID' };

    let item = await vk.baseDao.findById({
      dbName: "problem-report",
      id: report_id
    });

    if (!item) {
      return { code: -1, msg: '记录不存在' };
    }

    // 关联用户信息
    if (item.create_uid) {
      let user = await vk.baseDao.findById({
        dbName: "uni-id-users",
        id: item.create_uid,
        fieldJson: { nickname: true, real_name: true }
      });
      if (user) {
        let realName = user.nickname || user.real_name || '未知';
        item.user_name = item.is_anonymous ? `${realName} (匿名)` : realName;
      }
    } else {
      item.user_name = '匿名用户';
    }

    res.item = item;
    return res;
  }
};
