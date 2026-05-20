'use strict';
module.exports = {
  /**
   * 修改/重整日计划单据核心数据 (B端后台管理员专用)
   * @url admin/plan/sys/update
   * @description 管理后台表单发起的实体数据篡改，支持各种预设状态下的容错转换与内容补齐。
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
    // 非超管且非本人不允许修改
    if (!isSuperAdmin && existing.issuer_uid !== uid) {
      return { code: -1, msg: "无权修改他人下达的计划" };
    }
    // 有反馈记录后仅超管可修改
    if (!isSuperAdmin && existing.feedbacks && existing.feedbacks.length > 0) {
      return { code: -1, msg: "计划已有执行反馈，不可修改" };
    }

    // 克隆传递的表单数据源为局部变量
    let dataJson = { ...data };
    
    // 中间件处理：如果前端发送了修改的截止时限且为本地格式字符串，予以抹平转换
    if (dataJson.deadline_time && typeof dataJson.deadline_time === 'string') {
      dataJson.deadline_time = new Date(dataJson.deadline_time).getTime();
    }
    // 获取分配人员的信息，继承其部门，并采集所有小组ID
    if (dataJson.assignee_ids && dataJson.assignee_ids.length > 0) {
      let ids = Array.isArray(dataJson.assignee_ids) ? dataJson.assignee_ids : [dataJson.assignee_ids];
      let usersRes = await vk.baseDao.select({
        dbName: "uni-id-users",
        whereJson: { _id: _.in(ids) },
        fieldJson: { department_id: 1, group_id: 1 },
        pageSize: 100
      });
      if (usersRes.rows && usersRes.rows.length > 0) {
        let firstUser = usersRes.rows[0];
        if (firstUser.department_id) {
          dataJson.dept_id = Array.isArray(firstUser.department_id) ? firstUser.department_id[0] : firstUser.department_id;
        }
        let groupIds = [];
        usersRes.rows.forEach(u => {
          if (u.group_id) {
            let gids = Array.isArray(u.group_id) ? u.group_id : [u.group_id];
            gids.forEach(gid => {
              if (gid && !groupIds.includes(gid)) {
                groupIds.push(gid);
              }
            });
          }
        });
        dataJson.group_ids = groupIds;
      }
    }

    // 调用基础库，根据 _id 覆盖保存其值
    let num = await vk.baseDao.updateById({
      dbName: "daily-plan",
      id: dataJson._id,
      dataJson: dataJson
    });

    return { code: 0, msg: "修改成功", num };
  }
}
