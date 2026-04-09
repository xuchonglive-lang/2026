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

		// 构造独立的 whereJson 查询对象
		let customWhereJson = {};
		
		// 基础条件：已发布 + 未删除
		customWhereJson.status = 1;
		customWhereJson.is_deleted = false;

		// 分类筛选: 支持单ID或数组ID(多父子类)
		if (vk.pubfn.isNotNull(category_id)) {
			if (Array.isArray(category_id)) {
				customWhereJson.category_id = _.in(category_id);
			} else {
				customWhereJson.category_id = category_id;
			}
		}

		// Q11: 标题或关键字模糊搜索
		if (vk.pubfn.isNotNull(keyword)) {
			customWhereJson.title = new RegExp(keyword, 'i');
		}

		// 默认每页10条
		if (!data.pageSize) data.pageSize = 10;

		// 【核心修复】：合并由过滤中间件(tenantFilter等)自动注入的 data.whereJson 数据隔离条件
		data.whereJson = Object.assign(data.whereJson || {}, customWhereJson);

		res = await vk.baseDao.getTableData({
			dbName: 'xc-info-articles',
			data,
			// whereJson: customWhereJson, // 已禁用：禁止强行覆盖，必须让底层组件自动读取 data.whereJson 里的租户防御网
			fieldJson: {
				content: false,
				target_dept_ids: false,
				target_user_ids: false,
			},
			orderBy: [{ name: 'is_sticky', type: 'desc' }, { name: 'created_at', type: 'desc' }],
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
