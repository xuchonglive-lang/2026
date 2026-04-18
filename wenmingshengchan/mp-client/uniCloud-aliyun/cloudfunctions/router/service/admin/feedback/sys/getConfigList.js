'use strict';
module.exports = {
	/**
	 * 获取重控点位监控配置列表
	 * @url admin/feedback/sys/getConfigList
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: "" };

		// 业务逻辑开始-----------------------------------------------------------
		// 1. 获取部门树状下钻数据做权限隔离
		// userInfo 里会有权限标识或部门挂靠信息等，这里示例：
		// 如果需要可以补充: whereJson['dept_id'] = _.in(userDeptTreeArr)

		let selectRes = await vk.baseDao.getTableData({
			dbName: "key-point-config",
			data: data,
			whereJson: {
				is_del: _.neq(1) // 根据防踩坑指南，严格拦截软删除数据
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
				}
			]
		});

		// 业务逻辑结束-----------------------------------------------------------
		return selectRes;
	}
}
