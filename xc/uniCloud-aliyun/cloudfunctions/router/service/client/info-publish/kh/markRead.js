'use strict';
module.exports = {
	/**
	 * 标记文章已读（Q8: 双写+去重阅读计数）
	 * @url client/info-publish/kh/markRead
	 * @description 首次阅读插入记录+原子递增 view_count，重复访问只更新 read_time
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { article_id } = data;
		if (vk.pubfn.isNull(article_id)) return { code: -1, msg: '缺少文章ID' };

		// 先查是否已有阅读记录
		let existingView = await vk.baseDao.findByWhereJson({
			dbName: 'xc-info-views',
			whereJson: {
				article_id,
				user_id: userInfo.uid,
			},
		});

		if (vk.pubfn.isNull(existingView)) {
			// 首次阅读：插入记录 + view_count 原子递增
			await vk.baseDao.add({
				dbName: 'xc-info-views',
				dataJson: {
					tenant_id: userInfo.tenant_id || '',
					article_id,
					user_id: userInfo.uid,
					read_time: Date.now(),
					created_at: Date.now(),
				},
			});

			// 原子递增阅读数
			await vk.baseDao.update({
				dbName: 'xc-info-articles',
				whereJson: { _id: article_id },
				dataJson: { view_count: _.inc(1) },
			});
		} else {
			// 重复访问：只更新阅读时间
			await vk.baseDao.update({
				dbName: 'xc-info-views',
				whereJson: { _id: existingView._id },
				dataJson: { read_time: Date.now() },
			});
		}

		res.msg = 'ok';
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	},
};
