'use strict';
module.exports = {
	/**
	 * C端工友：提取历史足迹与流转清单 (包含已反馈或自己没抢到但归属于自己小组逾期流拍的单据)
	 * @url client/feedback/kh/getHistoryList
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = userInfo;
		let res = { code: 0, msg: "" };

		// 业务逻辑开始-----------------------------------------------------------

		let selectRes = await vk.baseDao.getTableData({
			dbName: "key-point-feedback",
			data: data,
			whereJson: {
				assignee_ids: _.in([uid]),
				status: _.neq(0), // 只要不在挂起待办池中（无论是已完成=1 还是逾期=2）都拉进历史列表追溯
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
