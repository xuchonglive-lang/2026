'use strict';
module.exports = {
	/**
	 * 查看文章阅读记录
	 * @url admin/info-publish/sys/getViewRecords
	 * @description 后台查看指定文章的阅读记录列表
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { article_id } = data;
		if (vk.pubfn.isNull(article_id)) return { code: -1, msg: '缺少文章ID' };

		if (!data.whereJson) data.whereJson = {};
		data.whereJson.article_id = article_id;

		res = await vk.baseDao.getTableData({
			dbName: 'xc-info-views',
			data,
			orderBy: [{ name: 'read_time', type: 'desc' }],
			foreignDB: [
				{
					dbName: 'uni-id-users',
					localKey: 'user_id',
					foreignKey: '_id',
					as: 'user_info',
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
