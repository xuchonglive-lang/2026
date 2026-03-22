'use strict';
module.exports = {
	/**
	 * 删除微信自定义菜单
	 * @url admin/wx-push/sys/deleteMenuData 前端调用的url参数地址
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let wxConfig = await vk.baseDao.select({
			dbName: 'xc-wx-config',
			getOne: true,
			whereJson: {}
		});
		if (!wxConfig || !wxConfig.app_id) {
			return { code: -1, msg: '请先在"公众号配置"中填写微信凭证' };
		}

		try {
			let delRes = await vk.openapi.weixin.request({
				method: 'GET',
				url: `https://api.weixin.qq.com/cgi-bin/menu/delete`,
				data: {}
			});
			if (delRes.errcode === 0) {
				res.msg = '菜单删除成功';
			} else {
				res = { code: -1, msg: delRes.errmsg || '删除失败' };
			}
		} catch (err) {
			res = { code: -1, msg: '删除菜单失败: ' + err.message };
		}
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
