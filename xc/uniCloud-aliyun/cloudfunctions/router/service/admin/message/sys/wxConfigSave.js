'use strict';
module.exports = {
	/**
	 * 保存微信配置
	 * @url admin/message/sys/wxConfigSave 前端调用的url参数地址
	 * @param {String} app_id
	 * @param {String} app_secret
	 * @param {String} token
	 * @param {String} encoding_aes_key
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { app_id, app_secret, token, encoding_aes_key } = data;

		// 单行配置：查是否已存在
		let existing = await vk.baseDao.select({
			dbName: 'xc-wx-config',
			getOne: true,
			whereJson: {}
		});

		let dataJson = {
			app_id: app_id || '',
			app_secret: app_secret || '',
			token: token || '',
			encoding_aes_key: encoding_aes_key || '',
			updated_at: Date.now()
		};

		if (existing && existing._id) {
			await vk.baseDao.update({
				dbName: 'xc-wx-config',
				whereJson: { _id: existing._id },
				dataJson
			});
		} else {
			dataJson.created_at = Date.now();
			await vk.baseDao.add({
				dbName: 'xc-wx-config',
				dataJson
			});
		}
		res.msg = '微信配置保存成功';
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
