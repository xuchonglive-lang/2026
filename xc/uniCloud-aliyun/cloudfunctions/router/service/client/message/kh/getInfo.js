'use strict';
module.exports = {
	/**
	 * 消息详情（自动标记已读）
	 * @url client/message/kh/getInfo 前端调用的url参数地址
	 * @param {String} _id 消息ID
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { _id } = data;
		if (!_id) return { code: -1, msg: '缺少消息ID' };

		// 查询消息详情（验证是本人的消息）
		let msgInfo = await vk.baseDao.select({
			dbName: 'xc-messages',
			getOne: true,
			whereJson: {
				_id,
				receiver_id: userInfo.uid
			}
		});
		if (!msgInfo) return { code: -1, msg: '消息不存在' };

		// 自动标记已读
		if (!msgInfo.is_read) {
			await vk.baseDao.update({
				dbName: 'xc-messages',
				whereJson: { _id },
				dataJson: {
					is_read: true,
					read_time: Date.now()
				}
			});
			msgInfo.is_read = true;
			msgInfo.read_time = Date.now();
		}

		res.data = msgInfo;
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
