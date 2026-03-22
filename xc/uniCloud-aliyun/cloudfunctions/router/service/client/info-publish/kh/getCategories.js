'use strict';
module.exports = {
	/**
	 * 前台分类查询
	 * @url client/info-publish/kh/getCategories
	 * @description 使用 vk.pubfn.arrayToTree 返回启用的分类树
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let allCategories = await vk.baseDao.select({
			dbName: 'xc-info-categories',
			whereJson: { is_deleted: false, status: 1 },
			sortArr: [{ name: 'sort', type: 'asc' }, { name: 'created_at', type: 'asc' }],
		});

		res.rows = vk.pubfn.arrayToTree(allCategories, {
			id: '_id',
			parent_id: 'parent_id',
			children: 'children',
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	},
};
