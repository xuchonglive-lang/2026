module.exports = {
  /**
   * 监管层大盘流水查询 (获取重控点位的反馈记录列表)
   * @url admin/feedback/sys/getFeedbackList
   */
  main: async (event) => {
    // 解构获取云函数入参
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    // 初始化查询条件对象
    let whereJson = {};

    // 部门管理员过滤机制：检查当前登录用户是否具有部门管理员角色
    let isDeptAdmin = userInfo.role && userInfo.role.includes("dept_admin");
    // 如果是部门管理员且绑定了部门，则强制将其能够查询的数据限定在本部门之内
    if (isDeptAdmin && userInfo.department_id) {
      whereJson.dept_id = userInfo.department_id;
    }

    // 状态过滤：如果前端传了明确的 status 值（包含0），则加入筛选条件
    if (data.status !== undefined && data.status !== "") {
      whereJson.status = data.status;
    }
    // 日期过滤：筛选特定业务发生日期的反馈记录
    if (data.shift_date) {
      whereJson.shift_date = data.shift_date;
    }
    // 班次过滤：筛选特定的班次（例如 白班、夜班）
    if (data.shift_type) {
      whereJson.shift_type = data.shift_type;
    }
    // 点位过滤：筛选特定重控点位的反馈记录
    if (data.point_id) {
      whereJson.point_id = data.point_id;
    }

    // 执行多表关联分页查询，获取重控记录流水
    res = await vk.baseDao.getTableData({
      dbName: "key-point-feedback", // 主表：重控点位流水表
      data: data,                   // 分页及其他透传参数
      whereJson: whereJson,         // 组装好的过滤条件
      // 配置外键关联，提取展示所需的相关实体信息
      foreignDB: [
        {
          dbName: "uni-id-users",   // 关联用户表，提取实际提交人信息
          localKey: "submit_uid",
          foreignKey: "_id",
          as: "submit_user_info",
          limit: 1
        },
        {
          dbName: "base-dept",      // 关联部门表，提取归属部门信息
          localKey: "dept_id",
          foreignKey: "_id",
          as: "dept_info",
          limit: 1
        },
        {
          dbName: "uni-id-users",   // 关联用户表，提取审核/督查人信息
          localKey: "audit_uid",
          foreignKey: "_id",
          as: "audit_user_info",
          limit: 1
        },
        {
          dbName: "uni-id-users",   // 关联用户表，提取预设的承办人员列表（可能有多个人）
          localKey: "assignee_ids",
          localKeyType: "array",    // 标明 localKey 是一个数组
          foreignKey: "_id",
          as: "assignee_info",
          limit: 100                // 限制最多关联查询100人
        },
        {
          dbName: "uni-id-users",   // 关联用户表，提取该记录的下发人/安排人信息
          localKey: "issuer_uid",
          foreignKey: "_id",
          as: "issuer_info",
          limit: 1
        },
        {
          dbName: "key-point-config", // 关联配置表，用于旧数据没有 issuer_uid 的情况兜底
          localKey: "config_id",
          foreignKey: "_id",
          as: "config_info",
          limit: 1
        }
      ]
    });

    // ==========================================
    // 惰性过期状态处理机制 (基于精确物理时间判定)
    // ==========================================
    let currentTime = Date.now();
    let list = res.rows || [];
    let updatedIds = []; // 收集确认为逾期且需同步回数据库的 ID

    // 1. 获取班次配置映射
    let cronConfigs = await vk.baseDao.selects({ dbName: "key-point-cron-config" });
    let shiftMap = {};
    if (cronConfigs.rows) {
      cronConfigs.rows.forEach(c => shiftMap[c.shift_type] = c);
    }

    // 2. 收集缺失的安排人信息 (原有逻辑保留)
    let missingIssuerUids = [];
    list.forEach(item => {
      if (!item.issuer_info && item.config_info) {
        let conf = Array.isArray(item.config_info) ? item.config_info[0] : item.config_info;
        if (conf && conf.issuer_uid) {
          item._fallback_issuer_uid = conf.issuer_uid;
          missingIssuerUids.push(conf.issuer_uid);
        }
      }
    });

    let fallbackUserMap = {};
    if (missingIssuerUids.length > 0) {
      let usersResult = await vk.baseDao.selects({
        dbName: "uni-id-users",
        whereJson: { _id: _.in(missingIssuerUids) },
        fieldJson: { nickname: true, real_name: true, username: true }
      });
      if (usersResult.rows) {
        usersResult.rows.forEach(u => fallbackUserMap[u._id] = u);
      }
    }

    // 3. 遍历数据集进行状态修正与格式化
    list.forEach(item => {
      if (item.status === 0) {
        let conf = shiftMap[item.shift_type];
        if (conf && conf.feedback_end) {
          // A. 构造物理截止时间
          let dateStr = item.shift_date || vk.pubfn.timeFormat(item._add_time, "yyyy-MM-dd");
          let baseDateStr = dateStr.replace(/-/g, '/');
          let endTimeObj = new Date(baseDateStr);
          let endParts = conf.feedback_end.split(':');
          endTimeObj.setHours(parseInt(endParts[0]), parseInt(endParts[1]), 0, 0);

          // B. 处理夜班/跨天逻辑 (20:00 阈值)
          if (conf.feedback_end >= "20:00") {
            endTimeObj.setTime(endTimeObj.getTime() - 24 * 60 * 60 * 1000);
          }

          // C. 判定逾期
          if (currentTime > endTimeObj.getTime()) {
            item.status = 2; // 动态修改内存状态
            updatedIds.push(item._id); // 记录逾期 ID
          }
        }
      }

      // 文本字段格式化 (原有逻辑保留)
      if (item.assignee_info) {
        let assignees = Array.isArray(item.assignee_info) ? item.assignee_info : [item.assignee_info];
        item.assignee_names = assignees.length > 0 ? assignees.map(u => u.real_name || u.nickname || '未知').join(', ') : '-';
      } else {
        item.assignee_names = '-';
      }
      
      if (item.issuer_info) {
        let issuer = Array.isArray(item.issuer_info) ? item.issuer_info[0] : item.issuer_info;
        item.issuer_name = issuer ? (issuer.real_name || issuer.nickname || '未知') : '-';
      } else if (item._fallback_issuer_uid && fallbackUserMap[item._fallback_issuer_uid]) {
        let issuer = fallbackUserMap[item._fallback_issuer_uid];
        item.issuer_name = issuer.real_name || issuer.nickname || '未知';
      } else {
        item.issuer_name = '-';
      }
    });

    // 4. 触发惰性数据库批量更新
    if (updatedIds.length > 0) {
      vk.baseDao.update({
        dbName: "key-point-feedback",
        whereJson: { _id: _.in(updatedIds), status: 0 },
        dataJson: { status: 2 }
      });
    }

    // 将处理完毕的结果集返回给前端
    return res;
  }
};
