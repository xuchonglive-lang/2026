'use strict';
module.exports = {
	/**
	 * 发表评论（两层扁平结构）
	 * @url client/info-publish/kh/addComment
	 * @description Q7: 两层扁平评论，Q21: 校验 allow_comment，Q13: 不触发通知
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { article_id, content, parent_id, reply_to_uid, reply_to_nickname } = data;
		if (vk.pubfn.isNull(article_id)) return { code: -1, msg: '缺少文章ID' };
		if (vk.pubfn.isNull(content)) return { code: -1, msg: '评论内容不能为空' };

		// 验证文章是否存在、已发布、允许评论（Q21）
		let article = await vk.baseDao.findByWhereJson({
			dbName: 'xc-info-articles',
			whereJson: { _id: article_id, is_deleted: false },
		});
		if (vk.pubfn.isNull(article)) return { code: -1, msg: '文章不存在' };
		if (article.status !== 1) return { code: -1, msg: '文章未发布，无法评论' };
		if (article.allow_comment === false) return { code: -1, msg: '该文章不允许评论' };

		// 如果是回复，验证父评论存在
		if (vk.pubfn.isNotNull(parent_id)) {
			let parentComment = await vk.baseDao.findByWhereJson({
				dbName: 'xc-info-comments',
				whereJson: { _id: parent_id, is_deleted: false },
			});
			if (vk.pubfn.isNull(parentComment)) return { code: -1, msg: '回复的评论不存在' };
		}

		// 查询发表者的详细信息，兼容匿名评论且防止查全量引发 _id: undefined 报错
		let currentUid = (userInfo && userInfo.uid) || data.uid;
		let currentUser = null;
		if (vk.pubfn.isNotNull(currentUid)) {
			currentUser = await vk.baseDao.findByWhereJson({
				dbName: 'uni-id-users',
				whereJson: { _id: currentUid },
				fieldJson: { _id: true, nickname: true, avatar: true },
			});
		}
		let author_nickname = currentUser && currentUser.nickname ? currentUser.nickname : '匿名用户';
		let author_avatar = currentUser && currentUser.avatar ? currentUser.avatar : '';

		// 写入评论
		res.id = await vk.baseDao.add({
			dbName: 'xc-info-comments',
			dataJson: {
				tenant_id: userInfo.tenant_id || '',
				target_type: data.target_type || 'info-publish',
				target_id: data.target_id || article_id,
				article_id,
				parent_id: parent_id || '',
				reply_to_uid: reply_to_uid || '',
				reply_to_nickname: reply_to_nickname || '',
				content: content.trim(),
				is_deleted: false,
				created_by: currentUid || '',
				author_nickname,
				author_avatar,
				created_at: Date.now(),
			},
		});

		// 文章评论数原子递增
		await vk.baseDao.update({
			dbName: 'xc-info-articles',
			whereJson: { _id: article_id },
			dataJson: { comment_count: _.inc(1) },
		});

		res.msg = '评论发表成功';
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	},
};
