'use strict';
module.exports = {
  /**
   * 调取单条信息全文
   * @url admin/info/detail/sys/findById
   * @description 补充获取带有海量富文本 content 正文详情的基础 API。
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { vk } = util;
    let res = { code: 0, msg: '' };
    
    let { _id } = data;
    if (!_id) return { code: -1, msg: "确实查询核心坐标 _id" };

    res.item = await vk.baseDao.findById({
      dbName: "info",
      id: _id
    });

    return res;
  }
}
