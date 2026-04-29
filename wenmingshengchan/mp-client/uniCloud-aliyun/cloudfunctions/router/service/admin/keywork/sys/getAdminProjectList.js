module.exports = {
  /**
   * B端获取后台管理项目大盘列表
   * @url admin/keywork/sys/getAdminProjectList
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let { uid, role, department_id } = userInfo;

    let isSuperAdmin = role && role.includes('super_admin');
    let whereJson = data.whereJson || {};

    // 【核心机制：数据大盘树状下钻隔离可见性】
    if (!isSuperAdmin) {
      let userIds = [uid];
      if (department_id) {
        // 查询同部门及下属人员。依照规范，排除封禁用户且严防 undefined 崩溃
        let usersRes = await vk.baseDao.selects({
          dbName: "uni-id-users",
          whereJson: { department_id: department_id, status: 0 },
          pageSize: 500
        });
        let deptUsers = (usersRes.rows || []).map(u => u._id);
        userIds = userIds.concat(deptUsers);
      }
      // _.in() 接受明确的数组进行全扫描比对
      whereJson.assignee_uids = _.in(userIds);
    }

    // 补丁：确保获取下达人的 localKey（create_uid）能被主表查出，防止因前端未配置该列而自动丢弃
    if (data.columns && Array.isArray(data.columns)) {
      let hasUid = data.columns.find(item => item.key === 'create_uid');
      if (!hasUid) {
        data.columns.push({ key: "create_uid", type: "text", show: false });
      }
    }

    // 利用框架 getTableData 无缝对接 vk-data-table 格式
    let res = await vk.baseDao.getTableData({
      dbName: "key-project",
      data: data,
      whereJson: whereJson,
      foreignDB: [
        { dbName: "base-area", localKey: "area_id", foreignKey: "_id", as: "area_info", limit: 1 },
        { dbName: "base-point", localKey: "point_id", foreignKey: "_id", as: "point_info", limit: 1 },
        {
          dbName: "uni-id-users",
          localKey: "create_uid",
          foreignKey: "_id",
          as: "create_user_info",
          limit: 1,
          fieldJson: { real_name: true, nickname: true, username: true }
        }
      ]
    });

    return res;
  }
};
