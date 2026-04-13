'use strict';
module.exports = {
  /**
   * 删除日计划记录 (B端后台管理员 - 提供底层软删除)
   * @url admin/plan/sys/delete
   * @description 响应表格操作栏，进行数据表软删除控制。不破坏数据物理连贯性，避免引发严重统计断层。
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk } = util;

    // 此处使用封装的 baseDao.updateById 进行隐性修改操作
    // 强制把指定单据的 is_del 标记改为 1，达到前端消失、后端保留的效果
    let num = await vk.baseDao.updateById({
      dbName: "daily-plan",
      id: data._id,
      dataJson: { is_del: 1 } // 系统级软删除约束值
    });

    return { code: 0, msg: "删除成功", num };
  }
}
