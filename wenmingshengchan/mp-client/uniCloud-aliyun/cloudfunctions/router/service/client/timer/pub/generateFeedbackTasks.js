module.exports = {
  /**
   * 定时任务：动态生成卡点快照数据
   * @url client/timer/pub/generateFeedbackTasks
   */
  main: async (event) => {
    let { data = {}, util } = event;
    let { vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    // 1. 获取所有的触发规则
    let cronConfigResult = await vk.baseDao.selects({
      dbName: "key-point-cron-config",
      whereJson: {}
    });
    let cronConfigs = cronConfigResult.rows || [];

    // 2. 获取当前时间 HH:mm
    let now = new Date();
    // 云函数使用UTC时间，如果是北京时间需要加8小时，vk.pubfn.timeFormat 处理了时区问题
    let currentTimeStr = vk.pubfn.timeFormat(now, "hh:mm");
    let currentDateStr = vk.pubfn.timeFormat(now, "yyyy-MM-dd");

    // 找出当前需要触发的班次
    let activeShifts = [];
    cronConfigs.forEach(item => {
      // 在容差范围内（例如 +/- 2分钟）
      // 这里为精确匹配，假设云函数是每5分钟跑，我们可以写一个容差判断
      // 这里简化为：直接将当前时间截取到小时和分钟前一位来判断，或者只做精确匹配。
      // 为保证简单，这里采用一个简单的等值或时差判断。假设触发是准确的。
      if (item.trigger_time === currentTimeStr || Math.abs(new Date(`2000-01-01 ${item.trigger_time}`).getTime() - new Date(`2000-01-01 ${currentTimeStr}`).getTime()) < 5 * 60 * 1000) {
        activeShifts.push(item.shift_type);
      }
    });

    if (activeShifts.length === 0) {
      return { code: 0, msg: "未到任何班次配置的触发时间" };
    }

    // 3. 找出所有活跃的点位配置
    let pointConfigsResult = await vk.baseDao.selects({
      dbName: "key-point-config",
      whereJson: {
        status: 1
      }
    });
    let pointConfigs = pointConfigsResult.rows || [];

    let addTasks = [];

    // 获取对应的基础信息以备快照
    let pointIds = pointConfigs.map(item => item.point_id);
    let pointsResult = await vk.baseDao.selects({
      dbName: "base-point",
      whereJson: { _id: _.in(pointIds) }
    });
    let pointsMap = {};
    if (pointsResult.rows) {
      pointsResult.rows.forEach(p => pointsMap[p._id] = p.name);
    }

    let areaIds = pointConfigs.map(item => item.area_id);
    let areasResult = await vk.baseDao.selects({
      dbName: "base-area",
      whereJson: { _id: _.in(areaIds) }
    });
    let areasMap = {};
    if (areasResult.rows) {
      areasResult.rows.forEach(a => areasMap[a._id] = a.name);
    }

    activeShifts.forEach(shift_type => {
      // 确定记录日期 (夜班可能跨日，需顺延到次日早晨为日期，或者根据当前日期)
      // 若是夜班，此时触发一般是在前一天晚上或当天早晨。统一用当前日期即可。
      let shift_date = currentDateStr;

      pointConfigs.forEach(config => {
        // 如果这个配置需要在这个班次生成
        if (config.require_shifts && config.require_shifts.includes(shift_type)) {
          addTasks.push({
            config_id: config._id,
            point_id: config.point_id,
            point_name: pointsMap[config.point_id] || "",
            area_id: config.area_id,
            area_name: areasMap[config.area_id] || "",
            dept_id: config.dept_id,
            shift_date: shift_date,
            shift_type: shift_type,
            assignee_ids: config.assignee_ids,
            issuer_uid: config.issuer_uid,
            status: 0
          });
        }
      });
    });

    if (addTasks.length > 0) {
      try {
        await vk.baseDao.adds({
          dbName: "key-point-feedback",
          dataJson: addTasks
        });
        res.msg = `成功生成 ${addTasks.length} 条打卡任务`;
      } catch (e) {
        // 捕获唯一索引重复等异常
        res.msg = "生成任务遇到重复或异常：" + e.message;
      }
    }

    // --- 附带功能：将历史遗留未提交的改为逾期 (全量物理清算) ---
    // 为保证精准，这里先查询出所有待反馈且可能逾期的记录
    let pendingTasks = await vk.baseDao.selects({
      dbName: "key-point-feedback",
      whereJson: { status: 0 }
    });

    if (pendingTasks.rows && pendingTasks.rows.length > 0) {
      let finalOverdueIds = [];
      pendingTasks.rows.forEach(item => {
        let conf = cronConfigs.find(c => c.shift_type === item.shift_type);
        if (conf && conf.feedback_end) {
          let dateStr = item.shift_date || vk.pubfn.timeFormat(item._add_time, "yyyy-MM-dd");
          let baseDateStr = dateStr.replace(/-/g, '/');
          let endTimeObj = new Date(baseDateStr);
          let endParts = conf.feedback_end.split(':');
          endTimeObj.setHours(parseInt(endParts[0]), parseInt(endParts[1]), 0, 0);

          // 20:00 阈值逻辑
          if (conf.feedback_end >= "20:00") {
            endTimeObj.setTime(endTimeObj.getTime() - 24 * 60 * 60 * 1000);
          }

          if (Date.now() > endTimeObj.getTime()) {
            finalOverdueIds.push(item._id);
          }
        }
      });

      if (finalOverdueIds.length > 0) {
        await vk.baseDao.update({
          dbName: "key-point-feedback",
          whereJson: { _id: _.in(finalOverdueIds), status: 0 },
          dataJson: { status: 2 }
        });
      }
    }

    return res;
  }
};
