'use strict';
module.exports = {
  /**
   * C端获取全量开放的文章分类
   * @url client/info/pub/getCategory
   * @description 供小程序 C 端界面顶部选项卡等使用。放置于 pub 命名空间公开免登录调用。
   */
  main: async (event) => {
    let { util } = event;
    let { vk } = util;

    let res = await vk.baseDao.select({
      dbName: "info-category",
      // 只拉取被激活展示的分类，若数据库设计了显示开关则可扩充。默认抓取当前所有可用分类。
      whereJson: {
        // enable: true
      }, 
      sortArr: [{ "name": "sort", "type": "asc" }, { "name": "_add_time", "type": "asc" }]
    });

    return {
      code: 0,
      msg: '获取成功',
      rows: res.rows || []
    };
  }
}
