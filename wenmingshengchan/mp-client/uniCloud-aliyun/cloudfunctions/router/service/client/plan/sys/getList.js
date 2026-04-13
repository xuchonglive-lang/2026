'use strict';
module.exports = {
  /**
   * C端工人获取列表分页数据查询接口
   * @url client/plan/sys/getList
   * @description 同样具备对单据失效及过期的前置被动式筛查更新功能。能支持通过 whereJson 分配特定执行人员
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;

    let res = { code: 0, msg: '' };

    // -------------------------------------------------------------
    // 执行点一：被动式（惰性）死线过期自动洗库降级判定
    // 代替 Cron 的高负载循环，防腐收起历史数据。
    // -------------------------------------------------------------
    const now = Date.now();
    try {
      await db.collection("daily-plan").where({
        status: _.in([0, 1]), // 当前还未封库了结的行项
        deadline_time: _.lt(now), // 最后界限被现行时间超越
        is_del: _.neq(1)
      }).update({
        // 使用聚合动作依据上一手停摆状态决定死亡形态
        status: _.cond([
          [_.eq('status', 0), 4], // 无进展直接封为“已逾期”
          [_.eq('status', 1), 5], // 在待验区卡死化为“超时未验收”
          [true, 0]
        ])
      });
    } catch (err) {}

    let whereJson = data.whereJson || {};
    // 防御系统层直接剥夺假死被软删掉的计划
    whereJson.is_del = _.neq(1);

    // 解析前端传来的纯时间戳，在后端组装范围检索以防止小程序内编译报错
    if (data.searchTimestamp) {
      let startTs = data.searchTimestamp;
      let endTs = startTs + 24 * 60 * 60 * 1000 - 1;
      whereJson.deadline_time = _.and(_.gte(startTs), _.lte(endTs));
    }

    // 调用万能外联接口对单据主信息及下派管理员进行绑定
    res = await vk.baseDao.getTableData({
      dbName: "daily-plan",
      data: data,
      whereJson: whereJson,
      foreignDB: [
        {
          dbName: "uni-id-users",
          localKey: "issuer_uid",
          foreignKey: "_id",
          as: "issuer_info",
          limit: 1,
          fieldJson: { nickname: true, avatar: true }
        }
      ]
    });

    return res;
  }
}
