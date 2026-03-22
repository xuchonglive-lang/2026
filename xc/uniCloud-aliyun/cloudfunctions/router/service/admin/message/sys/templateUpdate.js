'use strict';
module.exports = {
	/**
	 * 更新消息模板
	 * @url admin/message/sys/templateUpdate 前端调用的url参数地址
	 * @param {String} _id 模板ID
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { _id, name, biz_type, wx_template_id, title_template, content_template, url_template, status } = data;
		if (!_id) return { code: -1, msg: '缺少模板ID' };

		let dataJson = { updated_by: userInfo.uid, updated_at: Date.now() };
		if (name !== undefined) dataJson.name = name;
		if (biz_type !== undefined) dataJson.biz_type = biz_type;
		if (wx_template_id !== undefined) dataJson.wx_template_id = wx_template_id;
		if (title_template !== undefined) dataJson.title_template = title_template;
		if (content_template !== undefined) dataJson.content_template = content_template;
		if (url_template !== undefined) dataJson.url_template = url_template;
		if (status !== undefined) dataJson.status = status;

		await vk.baseDao.update({
			dbName: 'xc-message-templates',
			whereJson: { _id },
			dataJson
		});
		res.msg = '模板更新成功';
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
