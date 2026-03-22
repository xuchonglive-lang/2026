'use strict';
module.exports = {
	/**
	 * 删除消息模板
	 * @url admin/message/sys/templateDel 前端调用的url参数地址
	 * @param {String} _id 模板ID
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { _id } = data;
		if (!_id) return { code: -1, msg: '缺少模板ID' };

		await vk.baseDao.del({
			dbName: 'xc-message-templates',
			whereJson: { _id }
		});
		res.msg = '模板删除成功';
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
