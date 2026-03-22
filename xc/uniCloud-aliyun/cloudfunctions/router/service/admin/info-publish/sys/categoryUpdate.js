'use strict';
module.exports = {
	/**
	 * 修改信息分类
	 * @url admin/info-publish/sys/categoryUpdate
	 * @description 修改分类名称、排序、状态
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { _id, name, sort, status } = data;
		if (vk.pubfn.isNull(_id)) return { code: -1, msg: '缺少分类ID' };

		let updateJson = { updated_by: userInfo.uid, updated_at: Date.now() };
		if (name !== undefined) updateJson.name = name;
		if (sort !== undefined) updateJson.sort = sort;
		if (status !== undefined) updateJson.status = status;

		await vk.baseDao.update({
			dbName: 'xc-info-categories',
			whereJson: { _id },
			dataJson: updateJson,
		});
		res.msg = '分类更新成功';
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	},
};
