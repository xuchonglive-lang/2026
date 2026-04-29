'use strict';
module.exports = {
	/**
	 * C端工友：查看特定巡检动作详情，连带拉取 B端当时下达的标准配置与评语
	 * @url client/feedback/kh/getDetail
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let uid = userInfo ? userInfo._id : null;
		let res = { code: 0, msg: "" };

		let { _id } = data;
		if (!_id) return { code: -1, msg: "确实详情单据号" };

		// 业务逻辑开始-----------------------------------------------------------

		let selectRes = await vk.baseDao.selects({
			dbName: "key-point-feedback",
			whereJson: { _id: _id },
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
					dbName: "key-point-config",
					localKey: "config_id",
					foreignKey: "_id",
					as: "config_info",
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

		res.data = selectRes.rows && selectRes.rows.length > 0 ? selectRes.rows[0] : null;
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
