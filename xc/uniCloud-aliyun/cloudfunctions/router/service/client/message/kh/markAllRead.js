'use strict';
module.exports = {
	/**
	 * 标记全部消息已读
	 * @url client/message/kh/markAllRead 前端调用的url参数地址
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let updateRes = await db.collection('xc-messages').where({
			receiver_id: userInfo.uid,
			is_read: false
		}).update({
			is_read: true,
			read_time: Date.now()
		});
		res.msg = '已全部标记为已读';
		res.updated = updateRes.updated || 0;
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
