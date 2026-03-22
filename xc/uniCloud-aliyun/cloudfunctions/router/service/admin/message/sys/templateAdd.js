'use strict';
module.exports = {
	/**
	 * 新增消息模板
	 * @url admin/message/sys/templateAdd 前端调用的url参数地址
	 * @param {String} name 模板名称
	 * @param {String} biz_type 业务类型
	 * @param {String} wx_template_id 微信模板ID
	 * @param {String} title_template 标题模板
	 * @param {String} content_template 内容模板
	 * @param {String} url_template 跳转URL模板
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { name, biz_type, wx_template_id, title_template, content_template, url_template } = data;
		if (!name) return { code: -1, msg: '模板名称不能为空' };
		if (!biz_type) return { code: -1, msg: '业务类型不能为空' };

		res.id = await vk.baseDao.add({
			dbName: 'xc-message-templates',
			dataJson: {
				name,
				biz_type,
				wx_template_id: wx_template_id || '',
				title_template: title_template || '',
				content_template: content_template || '',
				url_template: url_template || '',
				status: 1,
				created_by: userInfo.uid,
				created_at: Date.now(),
				updated_at: Date.now()
			}
		});
		res.msg = '模板创建成功';
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
