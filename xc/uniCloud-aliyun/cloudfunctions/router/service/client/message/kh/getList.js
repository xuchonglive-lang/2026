'use strict';
module.exports = {
	/**
	 * 消息列表（分页+类型筛选）
	 * @url client/message/kh/getList 前端调用的url参数地址
	 * @param {String} msg_type 消息类型筛选（可选）
	 * @param {Number} pageIndex 页码
	 * @param {Number} pageSize 每页条数
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { msg_type } = data;

		// 强制限定只查自己的消息
		if (!data.formData) data.formData = {};
		data.formData.receiver_id = userInfo.uid;
		data.formData.is_deleted = _.neq(true);
		if (msg_type) {
			data.formData.msg_type = msg_type;
		}

		res = await vk.baseDao.getTableData({
			dbName: 'xc-messages',
			data,
			orderBy: [{ name: 'created_at', type: 'desc' }],
			fieldJson: {
				title: true,
				summary: true,
				msg_type: true,
				target_type: true,
				target_id: true,
				is_read: true,
				created_at: true
			}
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
