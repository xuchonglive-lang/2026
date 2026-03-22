'use strict';
module.exports = {
	/**
	 * 获取微信自定义菜单
	 * @url admin/wx-push/sys/getMenuData 前端调用的url参数地址
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
			// 未配置，返回空数据（页面会显示空菜单）
			res.data = {};
			return res;
		}

		// TODO: 正式对接微信API时启用
		// try {
		// 	res.data = await vk.openapi.weixin.request({
		// 		method: 'GET',
		// 		url: 'https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info',
		// 		data: {}
		// 	});
		// } catch (err) {
		// 	res = { code: -1, msg: '获取菜单失败: ' + err.message };
		// }

		// devMode: 返回空数据，待联调时打开上方注释
		res.data = {};
		res.msg = '当前为开发模式，菜单数据为空';
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
