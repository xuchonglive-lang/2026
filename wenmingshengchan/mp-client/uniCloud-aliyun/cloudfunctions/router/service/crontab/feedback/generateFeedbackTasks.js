'use strict'; // 开启严格模式
module.exports = { // 导出模块逻辑
	/**
	 * 定时任务：卡点派发重控点位巡回反馈任务
	 * @url crontab/feedback/generateFeedbackTasks
	 * @description 该函数由 feedbackDispatcher.js 在时间窗口命中时调用，根据配置的时间点发放当班次的反馈任务快照。
	 *              防重机制：写库操作依赖 (config_id + shift_date + shift_type) 复合唯一索引，
	 *              即使在 5 分钟窗口内被多次调用，数据库层面也会自动拦截重复派单。
	 */
	main: async (event) => { // 主入口函数
		let { util } = event; // 从事件中解构工具类
		let { pubFun, vk, _ } = util; // 提取常用工具函数、数据库操作类及查询操作符
		let res = { code: 0, msg: "执行完成" }; // 初始化返回结果

		// 1. 获取并格式化当前系统时间
		let now = new Date(); // 创建当前时间对象
		let current_time_str = pubFun.timeFormat(now, "hh:mm"); // 格式化当前时分为 "HH:mm"
		let current_date_str = pubFun.timeFormat(now, "yyyy-MM-dd"); // 格式化当前日期为 "YYYY-MM-DD"
		// 将当前时刻转换为今日分钟数，用于与配置时间进行数值差值比较
		let nowParts = current_time_str.split(':');
		let nowTotalMinutes = parseInt(nowParts[0], 10) * 60 + parseInt(nowParts[1], 10);

		console.log(`[generateFeedbackTasks] 开始执行，当前时间：${current_time_str}（今日第 ${nowTotalMinutes} 分钟）`);

		// 2. 获取所有的定时发放配置
		let cronConfigs = await vk.baseDao.selects({ // 从数据库查询 Cron 配置表
			dbName: "key-point-cron-config" // 表名：重控点位 Cron 触发配置
		});
		
		if (!cronConfigs.rows || cronConfigs.rows.length === 0) { // 如果没有配置项
			return { code: 0, msg: "暂无Cron发送配置定点" }; // 直接返回，无需执行后续逻辑
		}
		
		// 3. 筛选当前时间点命中的班次（时间窗口匹配：±5 分钟内均视为命中）
		// 说明：由于定时器存在调度误差，不能使用精准字符串比对（=== 精确到分钟必然错过），
		//       改为差值比对：只要当前时间与配置 trigger_time 的差值在 ±5 分钟以内即视为命中。
		//       防重由数据库复合唯一索引 (config_id + shift_date + shift_type) 保障，不会重复派单。
		const TRIGGER_WINDOW_MINUTES = 5; // 触发窗口半径，单位：分钟，与 feedbackDispatcher 保持一致
		let matchedShifts = []; // 用于存储匹配到的班次配置
		for (let conf of cronConfigs.rows) { // 遍历所有配置项
			let triggerTime = conf.trigger_time; // 获取配置的触发时间点（如 "07:30"）
			let trigParts = (triggerTime || '').split(':');
			if (trigParts.length < 2) {
				console.warn(`[generateFeedbackTasks] 班次 ${conf.shift_type} 的 trigger_time 格式异常，跳过`);
				continue;
			}
			// 将配置时间转换为今日分钟数
			let trigTotalMinutes = parseInt(trigParts[0], 10) * 60 + parseInt(trigParts[1], 10);
			// 计算当前时间相对于触发时间的流逝分钟数（处理跨天）
			let diffMinutes = nowTotalMinutes - trigTotalMinutes;
			if (diffMinutes < 0) {
				diffMinutes += 24 * 60;
			}
			console.log(`[generateFeedbackTasks] 班次 ${conf.shift_type}：trigger_time=${triggerTime}，已过=${diffMinutes}min，窗口=${TRIGGER_WINDOW_MINUTES}min`);
			if (diffMinutes >= 0 && diffMinutes < TRIGGER_WINDOW_MINUTES) { // 严格匹配时间窗后才算命中，且仅命中一次
				matchedShifts.push(conf); // 将该班次配置加入待执行队列
			}
		}
		
		if (matchedShifts.length === 0) { // 如果当前时间没有命中任何触发点
			return { code: 0, msg: "当下未命中任何发单时间点（超出±5min窗口）" }; // 正常结束流程
		}

		// 4. 为命中的班次生成并派发任务
		for (let shiftConf of matchedShifts) { // 遍历所有命中的班次
			let shift_type = shiftConf.shift_type; // 获取班次类型（day/night）
			// 处理日期逻辑：为了方便结算，夜班的任务通常挂载到下班时的次日日期上
			let shift_date = current_date_str; // 默认使用当天日期
			if (shift_type === 'night') { // 如果是夜班
				let tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 计算明天的时间对象
				shift_date = pubFun.timeFormat(tomorrow, "yyyy-MM-dd"); // 将日期设为明天
			}

			// 5. 拉取该班次下所有处于启用状态的任务模板
			let configRes = await vk.baseDao.selects({ // 查询任务配置表
				dbName: "key-point-config", // 表名：重控点位任务配置模板
				whereJson: { // 查询条件
					status: 1, // 必须是启用状态
					require_shifts: _.in([shift_type]) // 必须包含当前匹配的班次类型
				},
				foreignDB: [
					{
						dbName: "base-area",
						localKey: "area_id",
						foreignKey: "_id",
						as: "area_info",
						limit: 1
					},
					{
						dbName: "base-point",
						localKey: "point_id",
						foreignKey: "_id",
						as: "point_info",
						limit: 1
					}
				]
			});
			
			if (configRes.rows && configRes.rows.length > 0) { // 如果找到了任务模板
				let payloadArr = configRes.rows.map(item => { // 将模板转换为待落库的任务实录
					let area = Array.isArray(item.area_info) ? item.area_info[0] : item.area_info;
					let point = Array.isArray(item.point_info) ? item.point_info[0] : item.point_info;
					
					return {
						config_id: item._id, // 关联的配置模板 ID
						point_id: item.point_id, // 关联的点位 ID
						point_name: (point && point.name) ? point.name : (item.point_name || ""), // 点位名称快照（防止模板修改后历史数据失真）
						area_id: item.area_id, // 关联的区域 ID
						area_name: (area && area.name) ? area.name : (item.area_name || ""), // 区域名称快照
						dept_id: item.dept_id, // 归属部门 ID
						shift_date: shift_date, // 归属班次日期
						shift_type: shift_type, // 班次类型
						assignee_ids: item.assignee_ids, // 冗余执行人列表
						issuer_uid: item.issuer_uid, // 冗余任务安排人/配置人 ID
						status: 0 // 任务状态初始设为 0：待执行
					}
				});
				
				// 6. 批量插入任务实录表（依赖复合唯一索引实现幂等防重）
				try {
					await vk.baseDao.adds({ // 批量新增操作
						dbName: "key-point-feedback", // 表名：重控点位反馈实录表
						dataJson: payloadArr // 待插入的数据数组
					});
					console.log(`[generateFeedbackTasks] ✅ 班次 ${shift_type} 派单成功，共插入 ${payloadArr.length} 条任务，归属日期：${shift_date}`);
				} catch (e) {
					// 此处利用数据库的复合唯一索引（config_id + shift_date + shift_type）来防止重复发单
					// 如果触发器在 5 分钟窗口内多次运行，后续的插入会抛出唯一键冲突异常，直接忽略即可
					console.log("[generateFeedbackTasks] 拦截到重复派单（唯一索引冲突），已自动跳过：", e.message);
				}
			} else {
				console.log(`[generateFeedbackTasks] 班次 ${shift_type} 无启用的任务模板，跳过`);
			}
		}

		return res; // 返回成功响应
	}
}

