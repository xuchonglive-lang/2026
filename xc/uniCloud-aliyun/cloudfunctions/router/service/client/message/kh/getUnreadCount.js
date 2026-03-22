'use strict';
module.exports = {
	/**
	 * 获取未读消息数
	 * @url client/message/kh/getUnreadCount 前端调用的url参数地址
	 * res 返回参数说明
	 * @param {Number} code 错误码，0表示成功
	 * @param {Number} count 未读消息数
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let count = await vk.baseDao.count({
			dbName: 'xc-messages',
			whereJson: {
				receiver_id: userInfo.uid,
				is_read: false,
				is_deleted: _.neq(true)
			}
		});
		res.count = count;
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
