'use strict';
module.exports = {
	/**
	 * 刷新微信 access_token
	 * @url admin/wx-push/sys/refreshToken 前端调用的url参数地址
	 * res 返回参数说明
	 * @param {Number} code 错误码，0表示成功
	 * @param {String} msg 详细信息
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		// 1. 获取微信配置
		let wxConfig = await vk.baseDao.select({
			dbName: 'xc-wx-config',
			getOne: true,
			whereJson: {}
		});
		if (!wxConfig || !wxConfig.app_id) {
			return { code: -1, msg: '微信服务号未配置' };
		}

		// 2. 调用微信接口获取 access_token
		// TODO: 联调时替换 - devMode 下模拟返回
		try {
			let tokenRes = await vk.openapi.weixin.h5.auth.getAccessToken({
				appid: wxConfig.app_id,
				secret: wxConfig.app_secret
			});
			if (tokenRes.access_token) {
				await vk.baseDao.update({
					dbName: 'xc-wx-config',
					whereJson: { _id: wxConfig._id },
					dataJson: {
						access_token: tokenRes.access_token,
						access_token_expires: Date.now() + 7000 * 1000, // 约2小时
						updated_at: Date.now()
					}
				});
				res.msg = 'access_token 刷新成功';
				res.access_token = tokenRes.access_token;
			} else {
				res = { code: -1, msg: tokenRes.errmsg || '获取 access_token 失败' };
			}
		} catch (err) {
			res = { code: -1, msg: 'access_token 刷新异常: ' + err.message };
		}
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
