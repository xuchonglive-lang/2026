'use strict';
module.exports = {
  /**
   * 挥泪斩决抛弃文章核心站
   * @url admin/info/detail/sys/delete
   * @description 秉承 `development-gotchas.md` 血泪坑点中总结出“绝不放任一切直接从底层清除表记录数据导致级联断裂（悬空空号灾难等）的大忌”。绝对推行 `updateById` 的替代软灭杀。
   */
  main: async (event) => {
    // 获取云环境挂载上下文工具链以及客户端事件携带包裹
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;

    // 擒拿判决罪人的独有的罪章代签符
    let { _id } = data;
    if (!_id) return { code: -1, msg: "无靶射杀预警拦截！请严格选择要废弃流放之文章单号！" };

    let res = { code: 0, msg: "该条案牍数据经裁定，现已被流放软杀出系统查询版图" };
    
    // 全系统贯彻这最后且必须唯一通过的一道指令手段防线：使用 update 的软杀
    res.num = await vk.baseDao.updateById({
      dbName: "info",          // 目标水域依然是主库体
      id: _id,                 // 指定打击对象ID
      dataJson: { is_del: 1 }  // 用 `is_del = 1` 这个冷酷的不治之症标识深深切碎埋封屏蔽它所有的未来可能性（列表和相关展现皆不带它玩）
    });

    return res;
  }
}
