'use strict';
module.exports = {
	/**
	 * C端工友：获取属于自己且尚未填报的待处理重控点巡检任务
	 * @url client/feedback/kh/getTodoList
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = userInfo;
		let res = { code: 0, msg: "" };

		// 业务逻辑开始-----------------------------------------------------------
		// 为了防止过量联表导致 C端响应慢，由于我们的定时发单器未来大概率能补足 point_name，
		// 此处暂时加一层 ForeignDB 透出信息，供列表页展示“XX区域-XX监测点”字样

		let selectRes = await vk.baseDao.getTableData({
			dbName: "key-point-feedback",
			data: data,
			whereJson: {
				assignee_ids: _.in([uid]), // 核心点：我是指定被派发的巡线网格员之一
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
				}
			]
		});

		// 业务逻辑结束-----------------------------------------------------------
		return selectRes;
	}
}
