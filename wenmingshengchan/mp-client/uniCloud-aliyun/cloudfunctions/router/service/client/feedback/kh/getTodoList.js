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
		// 为了防止过量联表导致 C端响应慢，由于我们的定时发单器未来大概率能补足 point_name，
		// 此处暂时加一层 ForeignDB 透出信息，供列表页展示"XX区域-XX监测点"字样

		let selectRes = await vk.baseDao.selects({
			dbName: "key-point-feedback",
			whereJson: {
				assignee_ids: uid,         // MongoDB原生支持：当字段为数组时，直接传值即可匹配包含该值的记录
				status: 0,                 // 仅拉取未反馈(挂起)状态的票据
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

		// ---- 反馈时间窗口状态注入 ----
		let configs = await vk.baseDao.selects({ dbName: "key-point-cron-config" });
		let shiftMap = {};
		if (configs.rows) {
			configs.rows.forEach(c => shiftMap[c.shift_type] = c);
		}

		let now = new Date();
		let currentTimeStr = (now.getHours() < 10 ? '0' : '') + now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();

		if (selectRes.rows) {
			for (let row of selectRes.rows) {
				let conf = shiftMap[row.shift_type];
				if (conf && conf.feedback_start && conf.feedback_end) {
					row._feedback_start = conf.feedback_start;
					row._feedback_end = conf.feedback_end;

					if (currentTimeStr < conf.feedback_start) {
						row._feedback_status = 'waiting';
					} else if (currentTimeStr > conf.feedback_end) {
						row._feedback_status = 'expired';
						row.status = 2; // 动态逾期标记
					} else {
						row._feedback_status = 'active';
					}
				} else {
					// 降级：无配置时默认允许提交
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

