'use strict';
module.exports = {
  /**
   * 删除日计划记录 (B端后台管理员 - 提供底层软删除)
   * @url admin/plan/sys/delete
   * @description 响应表格操作栏，进行数据表软删除控制。不破坏数据物理连贯性，避免引发严重统计断层。
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let uid = userInfo ? userInfo._id : null;
    let role = userInfo.role || [];
    let isSuperAdmin = role.includes('admin') || role.includes('super_admin');

    // ---- 权限校验：查出原记录 ----
    let existing = await vk.baseDao.findById({
      dbName: "daily-plan",
      id: data._id
    });
    if (!existing) {
      return { code: -1, msg: "计划记录不存在" };
    }
    // 非超管且非本人不允许删除
    if (!isSuperAdmin && existing.issuer_uid !== uid) {
      return { code: -1, msg: "无权删除他人下达的计划" };
    }
    // 有反馈记录后仅超管可删除
    if (!isSuperAdmin && existing.feedbacks && existing.feedbacks.length > 0) {
      return { code: -1, msg: "计划已有执行反馈，不可删除" };
    }

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
