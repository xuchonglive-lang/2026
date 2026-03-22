'use strict';
module.exports = {
	/**
	 * 新建文章（Q20: 摘要为空时正则清洗自动生成）
	 * @url admin/info-publish/sys/add
	 * @description 创建文章草稿
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let {
			title, content, summary, cover_image, category_id,
			attachments, visibility, target_dept_ids, target_user_ids,
			allow_comment,
		} = data;

		if (vk.pubfn.isNull(title)) return { code: -1, msg: '标题不能为空' };
		if (vk.pubfn.isNull(content)) return { code: -1, msg: '正文内容不能为空' };
		if (vk.pubfn.isNull(category_id)) return { code: -1, msg: '请选择分类' };

		// Q20: 摘要为空时正则清洗 content 前 100 字
		if (vk.pubfn.isNull(summary)) {
			let cleanText = content
				.replace(/```[\s\S]*?```/g, '')
				.replace(/!\[.*?\]\(.*?\)/g, '')
				.replace(/\[([^\]]*)\]\(.*?\)/g, '$1')
				.replace(/[#*>\-_~`|]/g, '')
				.replace(/\n+/g, ' ')
				.trim();
			summary = cleanText.substring(0, 100) + (cleanText.length > 100 ? '...' : '');
		}

		res.id = await vk.baseDao.add({
			dbName: 'xc-info-articles',
			dataJson: {
				tenant_id: userInfo.tenant_id || '',
				title,
				summary,
				content,
				cover_image: cover_image || '',
				category_id,
				attachments: attachments || [],
				visibility: visibility || 'private',
				target_dept_ids: target_dept_ids || [],
				target_user_ids: target_user_ids || [],
				allow_comment: allow_comment !== false,
				view_count: 0,
				comment_count: 0,
				status: 0,
				is_deleted: false,
				publish_time: null,
				created_by: userInfo.uid,
				created_at: Date.now(),
				updated_by: userInfo.uid,
				updated_at: Date.now(),
			},
		});
		res.msg = '文章创建成功（草稿）';
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	},
};
