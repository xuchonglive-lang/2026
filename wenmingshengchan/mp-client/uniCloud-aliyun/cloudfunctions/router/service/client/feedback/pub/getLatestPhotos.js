'use strict';
module.exports = {
  /**
   * 获取最新照片展示（公开）
   * @url client/feedback/pub/getLatestPhotos
   */
  main: async (event) => {
    let { data = {}, util } = event;
    let { vk } = util;
    let res = await vk.baseDao.select({
      dbName: "client-feedback",
      pageSize: 50,
      whereJson: {
        images: { $ne: [] }
      },
      sortArr: [{ name: "submit_time", type: "desc" }]
    });
    return res;
  }
}
