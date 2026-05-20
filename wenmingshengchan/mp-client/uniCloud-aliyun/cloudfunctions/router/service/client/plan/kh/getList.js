'use strict';
module.exports = {
  /**
   * C端工人获取列表分页数据查询接口
   * @url client/plan/kh/getList
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
      // 1. 处理执行中（status: 0）超时变为已逾期（status: 4）
      await db.collection("daily-plan").where({
        status: 0,
        deadline_time: _.lt(now),
        is_del: _.neq(1)
      }).update({
        status: 4
      });
      // 2. 处理待验收（status: 1）超时变为超时未验收（status: 5）
      await db.collection("daily-plan").where({
        status: 1,
        deadline_time: _.lt(now),
        is_del: _.neq(1)
      }).update({
        status: 5
      });
    } catch (err) {
      console.error('Lazy update failed:', err);
    }

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
          localKey: "uid",
          foreignKey: "_id",
          as: "issuer_info",
          limit: 1,
          fieldJson: { real_name: true, nickname: true, username: true, avatar: true }
        },
        {
          dbName: "uni-id-users",
          localKey: "assignee_ids",
          localKeyType: "array",
          foreignKey: "_id",
          as: "assignee_info",
          fieldJson: { real_name: true, nickname: true, username: true, avatar: true }
        },
        {
          dbName: "base-dept",
          localKey: "dept_id",
          foreignKey: "_id",
          as: "dept_info",
          limit: 1,
          fieldJson: { name: true }
        },
        {
          dbName: "base-area",
          localKey: "area_id",
          foreignKey: "_id",
          as: "area_info",
          limit: 1,
          fieldJson: { name: true }
        }
      ]
    });

    return res;
  }
}
