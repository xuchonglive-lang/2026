module.exports = {
  /**
   * 获取定时任务配置列表
   * @url admin/feedback/sys/getCronConfigList
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk } = util;
    
    let res = await vk.baseDao.getTableData({
      dbName: "key-point-cron-config",
      data: data,
      whereJson: {}
    });

    return res;
  }
};
