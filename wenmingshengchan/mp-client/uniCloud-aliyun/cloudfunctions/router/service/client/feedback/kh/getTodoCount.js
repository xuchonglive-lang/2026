'use strict';
module.exports = {
	/**
	 * C端工友：获取属于自己的待办重控任务数量（用于首页红点Badge）
	 * @url client/feedback/kh/getTodoCount
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let uid = userInfo ? userInfo._id : null;
		let res = { code: 0, msg: "", count: 0 };

		// 业务逻辑开始-----------------------------------------------------------
		// 1. 获取班次配置 Map
		let configs = await vk.baseDao.selects({ dbName: "key-point-cron-config" });
		let shiftMap = {};
		if (configs.rows) {
			configs.rows.forEach(c => shiftMap[c.shift_type] = c);
		}

		let now = new Date();
		let currentTime = now.getTime();

		// 2. 惰性逾期清算：获取当前用户所有未处理任务，检查是否已过物理截止时间
		let pendingTasks = await vk.baseDao.selects({
			dbName: "key-point-feedback",
			fieldJson: { _id: 1, shift_type: 1, shift_date: 1, _add_time: 1 },
			whereJson: {
				assignee_ids: uid,
				status: 0,
				is_del: _.neq(1)
			}
		});

		let overdueIds = [];
		if (pendingTasks.rows) {
			for (let row of pendingTasks.rows) {
				let conf = shiftMap[row.shift_type];
				if (conf && conf.feedback_end) {
					// 构造物理截止时间
					let dateStr = row.shift_date || vk.pubfn.timeFormat(row._add_time, "yyyy-MM-dd");
					let baseDateStr = dateStr.replace(/-/g, '/');
					let endTimeObj = new Date(baseDateStr);
					let endParts = conf.feedback_end.split(':');
					endTimeObj.setHours(parseInt(endParts[0]), parseInt(endParts[1]), 0, 0);

					// 判定逻辑与 getTodoList 保持一致
					if (currentTime > endTimeObj.getTime()) {
						overdueIds.push(row._id);
					}
				}
			}
		}

		// 执行状态更新
		if (overdueIds.length > 0) {
			await vk.baseDao.update({
				dbName: "key-point-feedback",
				whereJson: { _id: _.in(overdueIds), status: 0 },
				dataJson: { status: 2 }
			});
		}

		// 3. 并行执行各项统计，显著提升性能
		const [feedbackCount, planCount, projectCount, monthOverdueCount] = await Promise.all([
			// 有效待办重控数量
			vk.baseDao.count({
				dbName: "key-point-feedback",
				whereJson: { assignee_ids: uid, status: 0, is_del: _.neq(1) }
			}),
			// 日计划待执行数量
			vk.baseDao.count({
				dbName: "daily-plan",
				whereJson: { assignee_ids: uid, status: 0, is_del: _.neq(1) }
			}),
			// 重点项目待执行数量
			vk.baseDao.count({
				dbName: "key-project",
				whereJson: { assignee_uids: uid, status: _.in([0, 3]), is_del: _.neq(1) }
			}),
			// 本月累计逾期数量
			vk.baseDao.count({
				dbName: "key-point-feedback",
				whereJson: {
					assignee_ids: uid,
					status: 2,
					_add_time: _.gte(new Date(now.getFullYear(), now.getMonth(), 1).getTime())
				}
			})
		]);

		res.feedbackCount = feedbackCount;
		res.planCount = planCount;
		res.projectCount = projectCount;
		res.count = feedbackCount + planCount + projectCount; // 总待办数
		res.monthOverdueCount = monthOverdueCount; // 本月逾期数
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
