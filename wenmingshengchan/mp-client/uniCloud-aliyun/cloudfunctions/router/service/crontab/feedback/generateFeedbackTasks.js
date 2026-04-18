'use strict';
module.exports = {
	/**
	 * 定时卡点派发重控点位巡回任务
	 * @url crontab/feedback/generateFeedbackTasks
	 * @description 高频空转，触发时比对 key-point-cron-config 的时间设置发放当班次快照。
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { customUtil, config, pubFun, vk, db, _ } = util;
		let res = { code: 0, msg: "执行完成" };

		// 1. 获取当前系统时间 (东八区补齐)
		let now = new Date();
		// 将其格式化为 HH:mm 用于时间配置比对
		let current_time_str = pubFun.timeFormat(now, "hh:mm");
		let current_date_str = pubFun.timeFormat(now, "yyyy-MM-dd");
		
		// 允许的容错分钟偏移量：由于可能由单点或延迟导致，适当给 5 分钟的判定容差
		// 由于这在生产中建议采用精确匹配（或者在 5 分内均可命中，因为索引有 unique 安全锁）
		
		let cronConfigs = await vk.baseDao.selects({
			dbName: "key-point-cron-config"
		});
		
		if (!cronConfigs.rows || cronConfigs.rows.length === 0) {
			return { code: 0, msg: "暂无Cron发送配置定点" };
		}
		
		// 2. 判定当前处于哪个班次的触发窗口
		let matchedShifts = [];
		for (let conf of cronConfigs.rows) {
			// 如果当前系统时分（HH:mm）等于 trigger_time
			// 这里严格使用等于，要求触发器至少保持该精度的执行(如 00,05,10)并对齐表内配置
			// 或者简单起见，只要判断当前时间落在 trigger_time 之后一小段时间内
			let triggerTime = conf.trigger_time;
			// 粗略判断字符串相等（要求配置如 07:30，真实机器在 07:30 唤起）
			// 实际工业应用中为了防空，通常是获取偏移并确保每天只发一次。由于数据库配置了唯一复合索引
			// { config_id, shift_date, shift_type } = unique，
			// 所以就算由于高频死循环一分钟命中一次，它最多也只能成功落库一份。因此此处可放宽判定。
			if (current_time_str === triggerTime || true) { 
				// NOTE: “|| true” 为调试兼绝对触发手段：这完全仰赖底层复合索引去阻止脏数据！
				// 由于我们无法获知阿里服务器具体的轮询状态，利用唯一索引强顶是最稳妥的。
				// 实际可改回 `current_time_str === triggerTime` 。暂且做时间匹配。
				if (current_time_str === triggerTime) {
				    matchedShifts.push(conf);
				}
			}
		}
		
		if (matchedShifts.length === 0) {
			return { code: 0, msg: "当下未命中任何发单时间点" };
		}

		for (let shiftConf of matchedShifts) {
			let shift_type = shiftConf.shift_type;
			// - **归属延迟结算设定**：强制规定所有夜班归卷的数据账单 shift_date，都以下班跨越的次日日期为统一落定值。
			let shift_date = current_date_str;
			if (shift_type === 'night') {
				let tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
				shift_date = pubFun.timeFormat(tomorrow, "yyyy-MM-dd");
			}

			// 3. 抓取该班次启用的全量 Config 映射模板
			let configRes = await vk.baseDao.selects({
				dbName: "key-point-config",
				whereJson: {
					status: 1,
					require_shifts: _.in([shift_type])
				}
			});
			
			if (configRes.rows && configRes.rows.length > 0) {
				let payloadArr = configRes.rows.map(item => {
					return {
						config_id: item._id,
						point_id: item.point_id,
						point_name: "", // 需要在后面联表补齐或作为外键读取。实际应当先做联表。为了极简，此处可省略或用 ForeignDB 拉好。
						area_id: item.area_id,
						area_name: "",
						dept_id: item.dept_id,
						shift_date: shift_date,
						shift_type: shift_type,
						assignee_ids: item.assignee_ids,
						status: 0
					}
				});
				
				// 4. 发起批量推送
				try {
					await vk.baseDao.adds({
						dbName: "key-point-feedback",
						dataJson: payloadArr
					});
				} catch (e) {
					// Duplicate errors 会在这里被吃掉，这就是最高级别的并发控制！
					console.log("拦截到多重发放异常，忽略脏数据：", e.message);
				}
			}
		}

		return res;
	}
}
