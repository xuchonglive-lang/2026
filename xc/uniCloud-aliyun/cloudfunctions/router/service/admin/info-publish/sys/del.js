'use strict';
module.exports = {
	/**
	 * 删除文章（Q23: 软删文章，Q18: 支持批量删除）
	 * @url admin/info-publish/sys/del
	 * @description 单条或批量软删除文章，评论和阅读记录保留原样
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { _id, ids } = data;

		if (vk.pubfn.isNotNull(ids) && ids.length > 0) {
			// 批量删除
			await db.collection('xc-info-articles').where({
				_id: _.in(ids),
			}).update({
				is_deleted: true,
				updated_by: userInfo.uid,
				updated_at: Date.now(),
			});
			res.msg = `已删除 ${ids.length} 篇文章`;
		} else if (vk.pubfn.isNotNull(_id)) {
			// 单条删除
			await vk.baseDao.update({
				dbName: 'xc-info-articles',
				whereJson: { _id },
				dataJson: {
					is_deleted: true,
					updated_by: userInfo.uid,
					updated_at: Date.now(),
				},
			});
			res.msg = '文章删除成功';
		} else {
			return { code: -1, msg: '缺少文章ID' };
		}
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	},
};
