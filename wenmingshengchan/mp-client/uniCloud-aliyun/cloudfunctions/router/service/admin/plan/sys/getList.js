'use strict';
module.exports = {
  /**
   * 获取日计划管理列表 (B端后台管理员综合监控)
   * @url admin/plan/sys/getList
   * @description 具备综合查询及数据表关联，提供下辖部门及处理人员连带拉取，内含惰性洗库判定机制。
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    // 获取云端JQL语法扩展实例和下沉模块
    let { vk, db, _ } = util;

    let res = { code: 0, msg: '' };

    // -------------------------------------------------------------
    // 执行点一：被动式（惰性）死线过期自动洗库降级判定
    // 代替 Cron 的高负载循环，当且仅当发生请求列出此表结构时
    // 会将被遗忘的计划自动转化为逾期状态
    // -------------------------------------------------------------
    const now = Date.now(); // 摘录当前请求发生的绝对时间节点
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
      console.error('Admin lazy update failed:', err);
    }

    // -------------------------------------------------------------
    // 执行点二：挂载强制业务安全过滤锁并重写复杂多表逻辑
    // -------------------------------------------------------------
    // 吸纳前端传递在 JSON 里的查询意图，比如模糊搜查/状态栏点选
    let whereJson = data.whereJson || {};
    // 强制插入隐形查询断言点，决不允许调出 is_del(物理已摧毁/软删) 的行项
    whereJson.is_del = _.neq(1);

    // ---- 数据隔离：非超管/admin 只能看到自己下达的计划 ----
    let role = userInfo.role || [];
    if (!role.includes('admin') && !role.includes('super_admin')) {
      whereJson.issuer_uid = userInfo._id;
    }

    // 执行跨集合(Collection)表联查，进行联想赋值(例如反推管理员代号)
    res = await vk.baseDao.getTableData({
      dbName: "daily-plan",
      data: data,
      whereJson: whereJson,
      foreignDB: [
        {
          // 关联发件人账户花名册
          dbName: "uni-id-users",
          localKey: "issuer_uid",
          foreignKey: "_id",
          as: "issuer_info",
          limit: 1,
          fieldJson: { nickname: true, real_name: true, username: true }
        },
        {
          // 左联部门表
          dbName: "base-dept",
          localKey: "dept_id",
          foreignKey: "_id",
          as: "dept_info",
          limit: 1,
          fieldJson: { name: true }
        }
        // 注意：assignee_ids 是数组字段，vk foreignDB 的 $lookup 不支持数组 localKey，
        // 会导致返回空数组 []。因此改用下方手动查询。
      ]
    });

    // -------------------------------------------------------------
    // 执行点三：手动批量查询执行人及其小组名称 (全栈修复版)
    // -------------------------------------------------------------
    if (res.rows && res.rows.length > 0) {
      // 1. 收集所有执行人 ID
      let allUserIds = [];
      res.rows.forEach(row => {
        let uids = row.assignee_ids;
        if (uids) {
          if (Array.isArray(uids)) {
            uids.forEach(id => { if (id && !allUserIds.includes(id)) allUserIds.push(id); });
          } else if (typeof uids === 'string') {
            if (!allUserIds.includes(uids)) allUserIds.push(uids);
          }
        }
      });

      if (allUserIds.length > 0) {
        // 2. 批量查用户（拿姓名和所属小组ID）
        let usersRes = await vk.baseDao.select({
          dbName: "uni-id-users",
          whereJson: { _id: _.in(allUserIds) },
          fieldJson: { real_name: true, group_id: true },
          pageSize: 1000
        });
        let userList = usersRes.rows || [];
        
        let userMap = {}; // uid -> { name, gids }
        let allGroupIds = [];
        userList.forEach(u => {
          let gids = u.group_id ? (Array.isArray(u.group_id) ? u.group_id : [u.group_id]) : [];
          userMap[u._id] = { name: u.real_name || '未知', gids: gids };
          gids.forEach(gid => { if (gid && !allGroupIds.includes(gid)) allGroupIds.push(gid); });
        });

        // 3. 批量查小组名
        let groupMap = {}; // gid -> name
        if (allGroupIds.length > 0) {
          let groupsRes = await vk.baseDao.select({
            dbName: "base-dept",
            whereJson: { _id: _.in(allGroupIds) },
            fieldJson: { name: true },
            pageSize: 1000
          });
          (groupsRes.rows || []).forEach(g => { groupMap[g._id] = g.name; });
        }

        // 4. 最终回填：为每一行生成纯净的显示字符串数组
        res.rows.forEach(row => {
          let uids = row.assignee_ids;
          if (!Array.isArray(uids)) uids = uids ? [uids] : [];
          
          let aNames = []; // 执行人姓名
          let gNames = []; // 小组名称
          
          uids.forEach(uid => {
            let uInfo = userMap[uid];
            if (uInfo) {
              if (uInfo.name && !aNames.includes(uInfo.name)) aNames.push(uInfo.name);
              uInfo.gids.forEach(gid => {
                let gn = groupMap[gid];
                if (gn && !gNames.includes(gn)) gNames.push(gn);
              });
            }
          });
          
          row.assignee_names = aNames;
          row.group_info_names = gNames;
        });
      }
    }

    return res;
  }
}
