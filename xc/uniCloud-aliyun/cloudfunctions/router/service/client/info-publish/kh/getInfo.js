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
		let { _id, markRead } = data;
		if (vk.pubfn.isNull(_id)) return { code: -1, msg: '缺少文章ID' };

		// 新增：自动记录阅读记录和访问数递增（原本这部分由于没对接 markRead 参数而失效）
		let currentUid = (userInfo && userInfo.uid) || data.uid;
		if (markRead && vk.pubfn.isNotNull(currentUid)) {
			let existingView = await vk.baseDao.findByWhereJson({
				dbName: 'xc-info-views',
				whereJson: { article_id: _id, user_id: currentUid },
			});
			if (vk.pubfn.isNull(existingView)) {
				await vk.baseDao.add({
					dbName: 'xc-info-views',
					dataJson: {
						tenant_id: userInfo && userInfo.tenant_id ? userInfo.tenant_id : '',
						article_id: _id,
						user_id: currentUid,
						read_time: Date.now(),
						created_at: Date.now(),
					},
				});
				await vk.baseDao.update({
					dbName: 'xc-info-articles',
					whereJson: { _id },
					dataJson: { view_count: _.inc(1) },
				});
			} else {
				await vk.baseDao.update({
					dbName: 'xc-info-views',
					whereJson: { _id: existingView._id },
					dataJson: { read_time: Date.now() },
				});
			}
		}

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

		// 获取最新浏览记录 (近期访客)
		let recentViews = await vk.baseDao.select({
			dbName: 'xc-info-views',
			whereJson: { article_id: _id },
			sortArr: [{ name: 'read_time', type: 'desc' }],
			limit: 15,
		});

		let viewRows = recentViews.rows || [];
		let userIds = viewRows.map(v => v.user_id);
		let usersList = [];
		if (userIds.length > 0) {
			let usersRes = await vk.baseDao.select({
				dbName: 'uni-id-users',
				whereJson: { _id: _.in(userIds) },
				fieldJson: { _id: true, nickname: true, avatar: true },
			});
			usersList = usersRes.rows || [];
		}
		let userMap = {};
		for (let u of usersList) userMap[u._id] = u;

		// 去重处理与合并
		let uniqueViewers = [];
		let seenUids = new Set();
		for (let record of viewRows) {
			let ui = userMap[record.user_id];
			if (ui && !seenUids.has(record.user_id)) {
				record.user_info = ui;
				uniqueViewers.push(record);
				seenUids.add(record.user_id);
			}
		}
		article.recent_viewers = uniqueViewers.slice(0, 8);

		res.data = article;
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	},
};
