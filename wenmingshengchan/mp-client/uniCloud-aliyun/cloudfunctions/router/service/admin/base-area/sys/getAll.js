module.exports = {
  /**
   * 获取所有区域列表（下拉用）
   * @url admin/base-area/sys/getAll
   */
  main: async (event) => {
    let { data = {}, util } = event;
    let { vk } = util;
    let res = { code: 0, msg: '' };

    // 简单获取所有可用业务区域
    let allData = await vk.baseDao.select({
      dbName: "base-area",
      whereJson: {},
      pageSize: 500,
      sortArr: [{ name: 'sort', type: 'asc' }]
    });

    res.rows = allData.rows;
    return res;
  }
};
