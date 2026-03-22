'use strict';
module.exports = {
	/**
	 * 后台消息记录查询
	 * @url admin/message/sys/getList 前端调用的url参数地址
	 * data 请求参数 说明
	 * @param {Object} formData 查询条件（msg_type, push_status等）
	 * @param {Number} pageIndex 页码
	 * @param {Number} pageSize 每页条数
	 * res 返回参数说明
	 * @param {Number} code 错误码，0表示成功
	 * @param {String} msg 详细信息
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		res = await vk.baseDao.getTableData({
			dbName: 'xc-messages',
			data,
			orderBy: [{ name: 'created_at', type: 'desc' }],
			foreignDB: [
				{
					dbName: 'uni-id-users',
					localKey: 'sender_id',
					foreignKey: '_id',
					as: 'sender_info',
					limit: 1,
					getOne: true,
					fieldJson: { _id: true, nickname: true, username: true, avatar: true }
				},
				{
					dbName: 'uni-id-users',
					localKey: 'receiver_id',
					foreignKey: '_id',
					as: 'receiver_info',
					limit: 1,
					getOne: true,
					fieldJson: { _id: true, nickname: true, username: true, avatar: true }
				}
			]
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
