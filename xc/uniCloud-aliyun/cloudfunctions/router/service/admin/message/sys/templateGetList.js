'use strict';
module.exports = {
	/**
	 * 消息模板列表
	 * @url admin/message/sys/templateGetList 前端调用的url参数地址
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		res = await vk.baseDao.getTableData({
			dbName: 'xc-message-templates',
			data,
			orderBy: [{ name: 'created_at', type: 'desc' }]
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
