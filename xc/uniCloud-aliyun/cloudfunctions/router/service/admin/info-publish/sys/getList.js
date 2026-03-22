'use strict';
module.exports = {
	/**
	 * 后台文章列表查询（Q31: 分类+状态+关键词筛选）
	 * @url admin/info-publish/sys/getList
	 * @description 后台管理文章列表，配合 vk-data-table 使用
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		// 基础条件：未删除
		if (!data.whereJson) data.whereJson = {};
		data.whereJson.is_deleted = false;

		// Q31: 分类筛选
		if (vk.pubfn.isNotNull(data.formData && data.formData.category_id)) {
			data.whereJson.category_id = data.formData.category_id;
		}
		// Q31: 状态筛选
		if (data.formData && data.formData.status !== undefined && data.formData.status !== '') {
			data.whereJson.status = Number(data.formData.status);
		}
		// Q31: 关键词搜索
		if (vk.pubfn.isNotNull(data.formData && data.formData.keyword)) {
			data.whereJson.title = new RegExp(data.formData.keyword, 'i');
		}

		res = await vk.baseDao.getTableData({
			dbName: 'xc-info-articles',
			data,
			fieldJson: {
				content: false,
			},
			orderBy: [{ name: 'created_at', type: 'desc' }],
			foreignDB: [
				{
					dbName: 'xc-info-categories',
					localKey: 'category_id',
					foreignKey: '_id',
					as: 'category_info',
					limit: 1,
					getOne: true,
					fieldJson: { _id: true, name: true, parent_id: true },
				},
				{
					dbName: 'uni-id-users',
					localKey: 'created_by',
					foreignKey: '_id',
					as: 'author_info',
					limit: 1,
					getOne: true,
					fieldJson: { _id: true, nickname: true, username: true, avatar: true },
				},
			],
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	},
};
