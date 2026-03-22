'use strict';
module.exports = {
	/**
	 * 编辑文章
	 * @url admin/info-publish/sys/update
	 * @description 更新文章指定字段
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let {
			_id, title, content, summary, cover_image, category_id,
			attachments, visibility, target_dept_ids, target_user_ids,
			allow_comment,
		} = data;
		if (vk.pubfn.isNull(_id)) return { code: -1, msg: '缺少文章ID' };

		let updateJson = { updated_by: userInfo.uid, updated_at: Date.now() };
		if (title !== undefined) updateJson.title = title;
		if (content !== undefined) {
			updateJson.content = content;
			if (vk.pubfn.isNull(summary)) {
				let cleanText = content
					.replace(/```[\s\S]*?```/g, '')
					.replace(/!\[.*?\]\(.*?\)/g, '')
					.replace(/\[([^\]]*)\]\(.*?\)/g, '$1')
					.replace(/[#*>\-_~`|]/g, '')
					.replace(/\n+/g, ' ')
					.trim();
				updateJson.summary = cleanText.substring(0, 100) + (cleanText.length > 100 ? '...' : '');
			}
		}
		if (summary !== undefined) updateJson.summary = summary;
		if (cover_image !== undefined) updateJson.cover_image = cover_image;
		if (category_id !== undefined) updateJson.category_id = category_id;
		if (attachments !== undefined) updateJson.attachments = attachments;
		if (visibility !== undefined) updateJson.visibility = visibility;
		if (target_dept_ids !== undefined) updateJson.target_dept_ids = target_dept_ids;
		if (target_user_ids !== undefined) updateJson.target_user_ids = target_user_ids;
		if (allow_comment !== undefined) updateJson.allow_comment = allow_comment;

		await vk.baseDao.update({
			dbName: 'xc-info-articles',
			whereJson: { _id },
			dataJson: updateJson,
		});
		res.msg = '文章更新成功';
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	},
};
