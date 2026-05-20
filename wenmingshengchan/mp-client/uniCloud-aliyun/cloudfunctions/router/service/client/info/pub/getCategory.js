'use strict';
module.exports = {
  /**
   * 获取新闻分类列表（公开）
   * @url client/info/pub/getCategory
   */
  main: async (event) => {
    let { data = {}, util } = event;
    let { vk } = util;
    let res = await vk.baseDao.select({
      dbName: "base-category",
      pageSize: 100,
      whereJson: {
        // status: 1
      },
      sortArr: [{ name: "sort", type: "asc" }]
    });
    return res;
  }
}
