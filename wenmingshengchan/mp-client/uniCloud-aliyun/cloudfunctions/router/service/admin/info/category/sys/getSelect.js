'use strict';
module.exports = {
	/**
	 * 获取分类下来列表 (供remote-select使用)
	 * @url admin/info/category/sys/getSelect
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: "" };
		// 业务逻辑开始-----------------------------------------------------------
		let whereJson = {
			is_del: 0
		};
		
		if (data.searchvalue) {
			whereJson.name = new RegExp(data.searchvalue, 'i');
		}

		let selectRes = await vk.baseDao.selects({
			pageIndex: 1,
			pageSize: 100, // 给 remote-select 足量数据
			dbName: "info-category",
			fieldJson: {
				label: "$name", // 转换为组件所需字段
				value: "$_id",  // 转换为组件所需字段
				_id: false
			},
			whereJson: whereJson,
			sortArr: [{ "name": "sort", "type": "desc" }, { "name": "_id", "type": "desc" }]
		});

		// 业务逻辑结束-----------------------------------------------------------
		return selectRes;
	}
}
