'use strict';
module.exports = {
	/**
	 * 标记单条消息已读
	 * @url client/message/kh/markRead 前端调用的url参数地址
	 * @param {String} _id 消息ID
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { _id } = data;
		if (!_id) return { code: -1, msg: '缺少消息ID' };

		await vk.baseDao.update({
			dbName: 'xc-messages',
			whereJson: {
				_id,
				receiver_id: userInfo.uid
			},
			dataJson: {
				is_read: true,
				read_time: Date.now()
			}
		});
		res.msg = '已标记为已读';
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
