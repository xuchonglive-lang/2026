'use strict';
module.exports = {
	/**
	 * 新增信息分类
	 * @url admin/info-publish/sys/categoryAdd
	 * @description 新增一级或子分类，含同级同名校验
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { name, parent_id, sort } = data;
		if (vk.pubfn.isNull(name)) return { code: -1, msg: '分类名称不能为空' };

		// 同级同名检查
		let existCount = await vk.baseDao.count({
			dbName: 'xc-info-categories',
			whereJson: {
				name,
				parent_id: parent_id || '',
				is_deleted: false,
			},
		});
		if (existCount > 0) return { code: -1, msg: '同级别下已存在相同名称的分类' };

		res.id = await vk.baseDao.add({
			dbName: 'xc-info-categories',
			dataJson: {
				tenant_id: userInfo.tenant_id || '',
				name,
				parent_id: parent_id || '',
				sort: sort || 0,
				status: 1,
				is_deleted: false,
				created_by: userInfo.uid,
				created_at: Date.now(),
				updated_at: Date.now(),
			},
		});
		res.msg = '分类创建成功';
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	},
};
