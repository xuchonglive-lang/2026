'use strict';
// ==================== 重控点位反馈任务 - 动态派单调度器 ====================
// 负责：每 5 分钟检查一次，判断当前时刻是否落在某个班次 trigger_time 的 ±5 分钟窗口内。
// 命中则调用 generateFeedbackTasks 发起派单，未命中则静默跳过。
// 防重机制：generateFeedbackTasks 写库时依赖 (config_id + shift_date + shift_type) 复合唯一索引，
//           即使本调度器在同一触发窗口内多次命中，数据库层面也会自动去重。

const generateFeedbackTasks = require('../feedback/generateFeedbackTasks');

// 触发窗口半径：±WINDOW_MINUTES 分钟内视为命中（与 taskConfig.main 保持一致）
const WINDOW_MINUTES = 5;

/**
 * 将 "HH:mm" 格式的时间字符串转换为从今日零时起的分钟数（用于数值比对）
 * @param {string} timeStr - 格式为 "HH:mm" 的时间字符串，例如 "14:00"
 * @returns {number} 从当天 00:00 开始的分钟数，例如 "14:00" 返回 840
 */
function timeStrToMinutes(timeStr) {
  const parts = (timeStr || '').split(':');
  if (parts.length < 2) return -1; // 格式非法则返回 -1，外部判断会跳过
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  if (isNaN(hours) || isNaN(minutes)) return -1;
  return hours * 60 + minutes;
}

/**
 * feedbackDispatcher - 动态派单调度器主入口
 * 由 taskConfig.js 中的 feedbackDispatcher: '5m' 驱动，每 5 分钟被调用一次
 */
module.exports = async function () {
  let res = { code: 0, msg: '' };

  // 1. 获取当前服务器时间（UTC+8 东八区，uniCloud 阿里云返回本地时间）
  const now = new Date();
  const nowHour = now.getHours();
  const nowMin = now.getMinutes();
  // 将当前时刻转换为今日分钟数，用于与配置进行数值差值比较
  const nowTotalMinutes = nowHour * 60 + nowMin;

  console.log(`[feedbackDispatcher] 开始检查，当前时间：${String(nowHour).padStart(2,'0')}:${String(nowMin).padStart(2,'0')}（今日第 ${nowTotalMinutes} 分钟），触发窗口：±${WINDOW_MINUTES}min`);

  // 2. 从数据库读取所有的班次触发时间配置（key-point-cron-config 表）
  const vk = uniCloud.vk;
  let cronConfigs;
  try {
    cronConfigs = await vk.baseDao.selects({
      dbName: 'key-point-cron-config', // 重控点位定时配置表
    });
  } catch (e) {
    console.error('[feedbackDispatcher] 读取 cron-config 失败：', e.message);
    return { code: -1, msg: '读取配置失败：' + e.message };
  }

  const rows = (cronConfigs && cronConfigs.rows) || [];
  if (rows.length === 0) {
    console.log('[feedbackDispatcher] 暂无 cron-config 配置，跳过本次检查');
    res.msg = '暂无配置';
    return res;
  }

  // 3. 遍历所有班次配置，逐一判断是否落在触发窗口内
  let triggeredShifts = [];
  for (const conf of rows) {
    const triggerTimeStr = conf.trigger_time; // 例如 "14:00" 或 "05:00"
    const triggerMinutes = timeStrToMinutes(triggerTimeStr);

    if (triggerMinutes < 0) {
      // 配置格式异常，跳过该条记录
      console.warn(`[feedbackDispatcher] 班次 ${conf.shift_type} 的 trigger_time 格式异常：${triggerTimeStr}，已跳过`);
      continue;
    }

    // 计算当前时间相对于触发时间的流逝分钟数（处理午夜跨越）
    let diffMinutes = nowTotalMinutes - triggerMinutes;
    if (diffMinutes < 0) {
      diffMinutes += 24 * 60; // 跨天处理
    }

    console.log(`[feedbackDispatcher] 班次 ${conf.shift_type}：trigger_time=${triggerTimeStr}（第${triggerMinutes}分钟），已过=${diffMinutes}min，窗口=${WINDOW_MINUTES}min`);

    // 核心判断：当前时间必须在触发时间之后，且差距严格小于 5 分钟
    // 这样在每 5 分钟执行一次的定时器下，必然且只会命中一次
    if (diffMinutes >= 0 && diffMinutes < WINDOW_MINUTES) {
      console.log(`[feedbackDispatcher] ✅ 命中！班次 ${conf.shift_type} 进入派单流程`);
      triggeredShifts.push(conf.shift_type);
    }
  }

  if (triggeredShifts.length === 0) {
    console.log('[feedbackDispatcher] 当前时间未命中任何触发窗口，本次检查结束');
    res.msg = '未命中任何触发窗口';
    return res;
  }

  // 4. 对命中的班次，调用实际的派单逻辑
  // generateFeedbackTasks 是一个 vk-unicloud-router 规范的模块，通过构造 event 调用其 main 方法
  console.log(`[feedbackDispatcher] 即将触发派单，命中班次：${triggeredShifts.join(', ')}`);
  try {
    // 构造兼容 vk-unicloud-router event 格式的调用参数
    const fakeEvent = {
      data: {},
      util: {
        vk,
        pubFun: vk.pubfn, // vk.pubfn 包含 timeFormat 等工具函数
        _: uniCloud.database().command,
      }
    };
    const genRes = await generateFeedbackTasks.main(fakeEvent);
    console.log('[feedbackDispatcher] 派单结果：', JSON.stringify(genRes));
    res.msg = `派单完成，命中班次：${triggeredShifts.join(', ')}`;
  } catch (e) {
    console.error('[feedbackDispatcher] 派单执行异常：', e.message);
    res.code = -1;
    res.msg = '派单执行异常：' + e.message;
  }

  return res;
};
