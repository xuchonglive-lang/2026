'use strict';
const visibilityResolver = require('../../../util/visibilityResolver');
const messagePush = require('../../../util/messagePush');

module.exports = {
	/**
	 * 发布文章（Q14: 草稿→发布，Q4: 按可见性推送消息）
	 * @url admin/info-publish/sys/publish
	 * @description 更新状态为已发布，并通过 visibilityResolver 解析接收人推送消息
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { _id } = data;
		if (vk.pubfn.isNull(_id)) return { code: -1, msg: '缺少文章ID' };

		// 查询文章信息
		let article = await vk.baseDao.findByWhereJson({
			dbName: 'xc-info-articles',
			whereJson: { _id },
		});
		if (vk.pubfn.isNull(article)) return { code: -1, msg: '文章不存在' };
		if (article.status === 1) return { code: -1, msg: '文章已发布，无需重复发布' };

		// 更新状态为已发布
		await vk.baseDao.update({
			dbName: 'xc-info-articles',
			whereJson: { _id },
			dataJson: {
				status: 1,
				publish_time: Date.now(),
				updated_by: userInfo.uid,
				updated_at: Date.now(),
			},
		});

		// Q4: 按可见性自动推送消息
		try {
			let receivers = await visibilityResolver.resolve({
				visibility: article.visibility,
				target_dept_ids: article.target_dept_ids,
				target_user_ids: article.target_user_ids,
				tenant_id: article.tenant_id,
				publisher_dept_id: userInfo.tenant_id,
				db,
			});

			// 排除发布者自己
			receivers = receivers.filter(id => id !== userInfo.uid);

			if (receivers.length > 0) {
				await messagePush.send({
					receivers,
					template_key: 'info-publish',
					variables: {
						article_title: article.title,
						article_id: _id,
					},
					sender_id: userInfo.uid,
					tenant_id: article.tenant_id,
					target_type: 'info-publish',
					target_id: _id,
					util,
					devMode: true,
				});
			}
		} catch (pushErr) {
			console.error('消息推送异常:', pushErr);
		}

		res.msg = '文章发布成功';
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	},
};
