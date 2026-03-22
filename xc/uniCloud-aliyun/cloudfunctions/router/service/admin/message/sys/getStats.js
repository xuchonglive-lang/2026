'use strict';
module.exports = {
	/**
	 * 消息统计
	 * @url admin/message/sys/getStats 前端调用的url参数地址
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let totalCount = await vk.baseDao.count({
			dbName: 'xc-messages',
			whereJson: {}
		});
		let successCount = await vk.baseDao.count({
			dbName: 'xc-messages',
			whereJson: { push_status: 'success' }
		});
		let failedCount = await vk.baseDao.count({
			dbName: 'xc-messages',
			whereJson: { push_status: 'failed' }
		});
		let pendingCount = await vk.baseDao.count({
			dbName: 'xc-messages',
			whereJson: { push_status: 'pending' }
		});
		res.data = { totalCount, successCount, failedCount, pendingCount };
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
