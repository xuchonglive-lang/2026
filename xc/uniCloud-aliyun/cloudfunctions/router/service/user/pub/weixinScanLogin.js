'use strict';
module.exports = {
	/**
	 * 生成微信带参二维码（壳代码）
	 * @url user/pub/weixinScanLogin
	 * @description 生成唯一 scene_id 并写入 xc-weixin-scan-login，返回二维码 URL
	 *              Phase 6 对接正式微信 API 时替换 mock 逻辑
	 */
	main: async (event) => {
		// ============ 第一层解构：event（全量，不可省略） ============
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		// ============ 第二层解构：util（全量，不可省略） ============
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		// ============ 返回值初始化 ============
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------

		// 生成唯一 scene_id
		const scene_id = vk.pubfn.random(32);

		// TODO: Phase 6 对接正式微信 API
		// const wxRes = await vk.request({
		//   url: 'https://api.weixin.qq.com/cgi-bin/qrcode/create',
		//   method: 'POST',
		//   data: {
		//     expire_seconds: 120,
		//     action_name: 'QR_STR_SCENE',
		//     action_info: { scene: { scene_str: scene_id } }
		//   }
		// });
		// const qr_url = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${encodeURIComponent(wxRes.ticket)}`;

		// DEV: 本地开发 mock 模式
		const qr_url = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=MOCK_TICKET_${scene_id}`;

		const now = Date.now();
		await vk.baseDao.add({
			dbName: 'xc-weixin-scan-login',
			dataJson: {
				scene_id,
				status: 0,
				created_at: now,
				expire_at: now + 120 * 1000
			}
		});

		res.scene_id = scene_id;
		res.qr_url = qr_url;
		res.expire_seconds = 120;

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
};
