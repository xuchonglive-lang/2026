'use strict';
module.exports = {
	/**
	 * 删除信息分类（Q15: 禁止删除有文章的分类）
	 * @url admin/info-publish/sys/categoryDel
	 * @description 软删除分类，需先确保无文章引用和无子分类
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { _id } = data;
		if (vk.pubfn.isNull(_id)) return { code: -1, msg: '缺少分类ID' };

		// 检查是否有文章引用该分类
		let articleCount = await vk.baseDao.count({
			dbName: 'xc-info-articles',
			whereJson: { category_id: _id, is_deleted: false },
		});
		if (articleCount > 0) {
			return { code: -1, msg: '该分类下还有文章，请先迁移或删除文章后再删除分类' };
		}

		// 检查是否有子分类
		let childCount = await vk.baseDao.count({
			dbName: 'xc-info-categories',
			whereJson: { parent_id: _id, is_deleted: false },
		});
		if (childCount > 0) {
			return { code: -1, msg: '该分类下还有子分类，请先删除子分类' };
		}

		// 软删除
		await vk.baseDao.update({
			dbName: 'xc-info-categories',
			whereJson: { _id },
			dataJson: { is_deleted: true, updated_by: userInfo.uid, updated_at: Date.now() },
		});
		res.msg = '分类删除成功';
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	},
};
