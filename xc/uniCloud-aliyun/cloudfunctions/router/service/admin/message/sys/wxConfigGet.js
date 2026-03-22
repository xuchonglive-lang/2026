'use strict';
module.exports = {
	/**
	 * 获取微信配置
	 * @url admin/message/sys/wxConfigGet 前端调用的url参数地址
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let wxConfig = await vk.baseDao.select({
			dbName: 'xc-wx-config',
			getOne: true,
			whereJson: {}
		});
		res.data = wxConfig || {};
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
