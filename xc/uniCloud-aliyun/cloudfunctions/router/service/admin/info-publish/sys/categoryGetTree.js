'use strict';
module.exports = {
	/**
	 * 查询信息分类树
	 * @url admin/info-publish/sys/categoryGetTree
	 * @description 使用 vk.pubfn.arrayToTree 构建二级分类树
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let selectResult = await vk.baseDao.select({
			dbName: 'xc-info-categories',
			whereJson: {
				is_deleted: _.neq(true),
			},
			pageSize: 500,
			sortArr: [{ name: 'sort', type: 'asc' }, { name: 'created_at', type: 'asc' }],
		});
		let allCategories = selectResult.rows || [];

		// 使用 vk.pubfn.arrayToTree 构建树（vk-fun 规范）
		res.rows = vk.pubfn.arrayToTree(allCategories, {
			id: '_id',
			parent_id: 'parent_id',
			children: 'children',
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	},
};
