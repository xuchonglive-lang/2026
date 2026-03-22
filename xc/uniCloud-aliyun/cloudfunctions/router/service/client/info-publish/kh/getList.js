'use strict';
module.exports = {
	/**
	 * 前台文章列表（Q28: 上拉无限加载, Q29: 未读标记, Q11: 标题模糊搜索）
	 * @url client/info-publish/kh/getList
	 * @description 前台分页文章列表，附带未读标记
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { category_id, keyword } = data;

		// 基础条件：已发布 + 未删除
		if (!data.whereJson) data.whereJson = {};
		data.whereJson.status = 1;
		data.whereJson.is_deleted = false;

		// 分类筛选
		if (vk.pubfn.isNotNull(category_id)) {
			data.whereJson.category_id = category_id;
		}

		// Q11: 标题模糊搜索
		if (vk.pubfn.isNotNull(keyword)) {
			data.whereJson.title = new RegExp(keyword, 'i');
		}

		// 默认每页10条
		if (!data.pageSize) data.pageSize = 10;

		res = await vk.baseDao.getTableData({
			dbName: 'xc-info-articles',
			data,
			fieldJson: {
				content: false,
				target_dept_ids: false,
				target_user_ids: false,
			},
			orderBy: [{ name: 'publish_time', type: 'desc' }],
			foreignDB: [
				{
					dbName: 'xc-info-categories',
					localKey: 'category_id',
					foreignKey: '_id',
					as: 'category_info',
					limit: 1,
					getOne: true,
					fieldJson: { _id: true, name: true },
				},
			],
		});

		// Q29: 查询当前用户已读文章ID列表，标记未读状态
		if (vk.pubfn.isNotNull(res.rows) && res.rows.length > 0) {
			let articleIds = res.rows.map(r => r._id);
			let readResult = await vk.baseDao.select({
				dbName: 'xc-info-views',
				whereJson: {
					user_id: userInfo.uid,
					article_id: _.in(articleIds),
				},
				fieldJson: { article_id: true },
				pageSize: 500,
			});
			let readRecords = readResult.rows || [];
			let readSet = new Set(readRecords.map(r => r.article_id));
			res.rows.forEach(row => {
				row.is_read = readSet.has(row._id);
			});
		}
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	},
};
