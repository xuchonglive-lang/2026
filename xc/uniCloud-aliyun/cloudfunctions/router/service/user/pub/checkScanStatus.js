'use strict';
module.exports = {
	/**
	 * 轮询扫码登录状态
	 * @url user/pub/checkScanStatus
	 * @description 前端定时轮询，获取扫码登录的实时状态
	 * @param {String} data.scene_id 场景值（必填）
	 */
	main: async (event) => {
		// ============ 第一层解构：event（全量，不可省略） ============
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		// ============ 第二层解构：util（全量，不可省略） ============
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		// ============ 第三层解构：data（按需） ============
		let { scene_id } = data;
		// ============ 返回值初始化 ============
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------

		if (!scene_id) {
			return { code: -1, msg: '参数 scene_id 不能为空' };
		}

		let doc = await vk.baseDao.findByWhereJson({
			dbName: 'xc-weixin-scan-login',
			whereJson: { scene_id }
		});

		if (!doc) {
			return { code: -1, msg: '二维码已过期，请刷新重试' };
		}

		res.status = doc.status;

		if (doc.status === 2) {
			// 登录成功，返回 token 和用户信息
			res.token = doc.token || '';
			res.userInfo = doc.userInfo || {};
			res.msg = '登录成功';
		} else if (doc.status === 1) {
			res.msg = '已扫码，等待确认';
		} else if (doc.status === 3) {
			res.msg = '二维码已过期';
		} else {
			res.msg = '等待扫码';
		}

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
};
