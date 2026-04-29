module.exports = {
  /**
   * 删除自动派发时点配置
   * @url admin/feedback/sys/deleteCronConfig
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk } = util;

    if (!data._id) return { code: -1, msg: "缺少记录ID" };

    let res = await vk.baseDao.deleteById({
      dbName: "key-point-cron-config",
      id: data._id
    });
    return { code: 0, msg: "删除成功", count: res };
  }
};
