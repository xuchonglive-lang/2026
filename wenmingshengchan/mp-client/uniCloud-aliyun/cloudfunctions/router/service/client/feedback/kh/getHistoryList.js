'use strict';
module.exports = {
	/**
	 * C端工友：提取历史足迹与流转清单 (包含已反馈或自己没抢到但归属于自己小组逾期流拍的单据)
	 * @url client/feedback/kh/getHistoryList
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let uid = userInfo ? userInfo._id : null;
		let res = { code: 0, msg: "" };

		// 业务逻辑开始-----------------------------------------------------------

		let whereJson = {
			assignee_ids: uid,
			is_del: _.neq(1)
		};

		if (data.status === 1) {
			whereJson.status = 1;
		} else if (data.status === 2) {
			whereJson.status = 2;
		} else {
			whereJson.status = _.neq(0); // 全部就是非0
		}

		if (data.area_id) {
			whereJson.area_id = data.area_id;
		}
		if (data.point_id) {
			whereJson.point_id = data.point_id;
		}

		if (data.startTime && data.endTime) {
			whereJson._add_time = _.gte(data.startTime).lte(data.endTime);
		} else if (data.startTime) {
			whereJson._add_time = _.gte(data.startTime);
		} else if (data.endTime) {
			whereJson._add_time = _.lte(data.endTime);
		}

		let selectRes = await vk.baseDao.getTableData({
			dbName: "key-point-feedback",
			data: data,
			whereJson: whereJson,
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
					localKey: "submit_uid",
					foreignKey: "_id",
					as: "submit_user_info",
					limit: 1
				}
			]
		});

		// 业务逻辑结束-----------------------------------------------------------
		return selectRes;
	}
}
