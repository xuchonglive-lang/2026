'use strict';
module.exports = {
	/**
	 * 更新微信自定义菜单
	 * @url admin/wx-push/sys/updateMenuData 前端调用的url参数地址
	 * @param {Object} menuData 微信菜单数据
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { menuData } = data;
		if (!menuData) return { code: -1, msg: '菜单数据不能为空' };

		let wxConfig = await vk.baseDao.select({
			dbName: 'xc-wx-config',
			getOne: true,
			whereJson: {}
		});
		if (!wxConfig || !wxConfig.app_id) {
			return { code: -1, msg: '请先在"公众号配置"中填写微信凭证' };
		}

		try {
			let createRes = await vk.openapi.weixin.request({
				method: 'POST',
				url: `https://api.weixin.qq.com/cgi-bin/menu/create`,
				data: menuData
			});
			if (createRes.errcode === 0) {
				res.msg = '菜单更新成功';
			} else {
				res = { code: -1, msg: createRes.errmsg || '更新失败' };
			}
		} catch (err) {
			res = { code: -1, msg: '更新菜单失败: ' + err.message };
		}
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
