'use strict';
module.exports = {
	/**
	 * C端工友：获取属于自己且尚未填报的待处理重控点巡检任务
	 * @url client/feedback/kh/getTodoList
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let uid = userInfo ? userInfo._id : null;
		let res = { code: 0, msg: "" };

		// 业务逻辑开始-----------------------------------------------------------
		// 1. 获取班次配置 Map
		let configs = await vk.baseDao.selects({ dbName: "key-point-cron-config" });
		let shiftMap = {};
		if (configs.rows) {
			configs.rows.forEach(c => shiftMap[c.shift_type] = c);
		}

		let now = new Date();
		let currentTime = now.getTime();

		// 2. 轻量惰性逾期清算：获取当前用户所有未处理任务（不联表，只查最小必要字段）
		let pendingTasks = await vk.baseDao.selects({
			dbName: "key-point-feedback",
			fieldJson: { _id: 1, shift_type: 1, shift_date: 1, _add_time: 1 },
			whereJson: {
				assignee_ids: uid,
				status: 0,
				is_del: _.neq(1)
			}
		});

		let overdueIds = []; // 收集本次查询发现的逾期 ID
		if (pendingTasks.rows) {
			for (let row of pendingTasks.rows) {
				let conf = shiftMap[row.shift_type];
				if (conf && conf.feedback_start && conf.feedback_end) {
					let dateStr = row.shift_date || vk.pubfn.timeFormat(row._add_time, "yyyy-MM-dd");
					let [year, month, day] = dateStr.split('-').map(Number);
					let physicalStartDate = new Date(year, month - 1, day, 0, 0, 0);
					if (conf.feedback_start >= "20:00") {
						physicalStartDate.setDate(physicalStartDate.getDate() - 1);
					}
					let [endH, endM] = conf.feedback_end.split(':').map(Number);
					let endTimeObj = new Date(physicalStartDate);
					if (conf.feedback_end < conf.feedback_start) {
						endTimeObj.setDate(endTimeObj.getDate() + 1);
					}
					endTimeObj.setHours(endH, endM, 0, 0);
					let endTime = endTimeObj.getTime();

					if (currentTime > endTime) {
						overdueIds.push(row._id);
					}
				}
			}
		}

		// 强同步更新数据库中的逾期状态
		if (overdueIds.length > 0) {
			await vk.baseDao.update({
				dbName: "key-point-feedback",
				whereJson: { _id: _.in(overdueIds), status: 0 },
				dataJson: { status: 2 }
			});
		}

		// 3. 安全拉取最新真正有效的数据列表（已过期的已被更新，此处 status: 0 会自动排除它们）
		let selectRes = await vk.baseDao.selects({
			dbName: "key-point-feedback",
			whereJson: {
				assignee_ids: uid,
				status: 0,
				is_del: _.neq(1)
			},
			foreignDB: [
				{
					dbName: "base-point",
					localKey: "point_id",
					foreignKey: "_id",
					as: "point_info",
					limit: 1
				},
				{
					dbName: "base-area",
					localKey: "area_id",
					foreignKey: "_id",
					as: "area_info",
					limit: 1
				},
				{
					dbName: "uni-id-users",
					localKey: "assignee_ids",
					localKeyType: "array",
					foreignKey: "_id",
					as: "assignee_info",
					fieldJson: { _id: 1, real_name: 1, avatar: 1 },
					limit: 100
				},
				{
					dbName: "uni-id-users",
					localKey: "issuer_uid",
					foreignKey: "_id",
					as: "issuer_info",
					fieldJson: { _id: 1, real_name: 1, avatar: 1 },
					limit: 1
				},
				{
					dbName: "base-dept",
					localKey: "dept_id",
					foreignKey: "_id",
					as: "dept_info",
					fieldJson: { _id: 1, name: 1 },
					limit: 1
				}
			]
		});

		// 4. 注入反馈时间窗口状态 (仅包含 waiting 和 active)
		if (selectRes.rows) {
			for (let row of selectRes.rows) {
				let conf = shiftMap[row.shift_type];
				if (conf && conf.feedback_start && conf.feedback_end) {
					let dateStr = row.shift_date || vk.pubfn.timeFormat(row._add_time, "yyyy-MM-dd");
					let [year, month, day] = dateStr.split('-').map(Number);
					let physicalStartDate = new Date(year, month - 1, day, 0, 0, 0);
					if (conf.feedback_start >= "20:00") {
						physicalStartDate.setDate(physicalStartDate.getDate() - 1);
					}
					let [startH, startM] = conf.feedback_start.split(':').map(Number);
					let startTimeObj = new Date(physicalStartDate);
					startTimeObj.setHours(startH, startM, 0, 0);
					let startTime = startTimeObj.getTime();

					row._feedback_start = conf.feedback_start;
					row._feedback_end = conf.feedback_end;
					row._feedback_display_date = vk.pubfn.timeFormat(startTime, "yyyy-MM-dd");

					if (currentTime < startTime) {
						row._feedback_status = 'waiting';
					} else {
						row._feedback_status = 'active';
					}
				} else {
					row._feedback_status = 'active';
				}
			}
		}

		res.rows = selectRes.rows || [];
		res.total = selectRes.total || (selectRes.rows ? selectRes.rows.length : 0);
		res.hasMore = false;
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}

