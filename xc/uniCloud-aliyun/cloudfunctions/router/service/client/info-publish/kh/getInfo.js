'use strict';
module.exports = {
	/**
	 * 前台文章详情
	 * @url client/info-publish/kh/getInfo
	 * @description 返回完整文章内容 + 分类名 + 作者信息
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { _id } = data;
		if (vk.pubfn.isNull(_id)) return { code: -1, msg: '缺少文章ID' };

		let article = await vk.baseDao.findByWhereJson({
			dbName: 'xc-info-articles',
			whereJson: { _id, is_deleted: false, status: 1 },
		});
		if (vk.pubfn.isNull(article)) return { code: -1, msg: '文章不存在或已下架' };

		// 连表获取分类名称
		if (vk.pubfn.isNotNull(article.category_id)) {
			let category = await vk.baseDao.findByWhereJson({
				dbName: 'xc-info-categories',
				whereJson: { _id: article.category_id },
			});
			article.category_name = category ? category.name : '';
		}

		// 获取作者信息
		if (vk.pubfn.isNotNull(article.created_by)) {
			let author = await vk.baseDao.findByWhereJson({
				dbName: 'uni-id-users',
				whereJson: { _id: article.created_by },
				fieldJson: { nickname: true, avatar: true, username: true },
			});
			article.author_info = author || {};
		}

		res.data = article;
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	},
};
