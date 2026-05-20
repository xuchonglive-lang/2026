'use strict';
module.exports = {
  /**
   * 获取新闻分类列表（鉴权）
   * @url client/info/kh/getCategory
   */
  main: async (event) => {
    let { data = {}, util } = event;
    let { vk } = util;
    let res = await vk.baseDao.select({
      dbName: "base-category",
      pageSize: 100,
      whereJson: {},
      sortArr: [{ name: "sort", type: "asc" }]
    });
    return res;
  }
}
