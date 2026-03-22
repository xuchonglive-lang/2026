'use strict';
module.exports = {
	/**
	 * 下架文章
	 * @url admin/info-publish/sys/unpublish
	 * @description 将已发布文章设为下架状态
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { _id } = data;
		if (vk.pubfn.isNull(_id)) return { code: -1, msg: '缺少文章ID' };

		await vk.baseDao.update({
			dbName: 'xc-info-articles',
			whereJson: { _id },
			dataJson: {
				status: 2,
				updated_by: userInfo.uid,
				updated_at: Date.now(),
			},
		});
		res.msg = '文章已下架';
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	},
};
