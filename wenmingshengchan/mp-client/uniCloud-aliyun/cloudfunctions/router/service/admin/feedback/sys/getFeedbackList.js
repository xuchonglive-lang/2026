'use strict';
module.exports = {
	/**
	 * 获取重控点位监控的单据结果列表 (主要功能也是为了包含B端流水线)
	 * @url admin/feedback/sys/getFeedbackList
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: "" };

		// 业务逻辑开始-----------------------------------------------------------

		let selectRes = await vk.baseDao.getTableData({
			dbName: "key-point-feedback",
			data: data,
			whereJson: {
				is_del: _.neq(1) // 延续软删防线
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
					dbName: "base-dept",
					localKey: "dept_id",
					foreignKey: "_id",
					as: "dept_info",
					limit: 1
				},
				{
					dbName: "uni-id-users",
					localKey: "submit_uid",
					foreignKey: "_id",
					as: "submit_user_info",
					limit: 1
				},
				{
					dbName: "uni-id-users",
					localKey: "audit_uid",
					foreignKey: "_id",
					as: "audit_user_info",
					limit: 1
				}
			]
		});

		// 业务逻辑结束-----------------------------------------------------------
		return selectRes;
	}
}
