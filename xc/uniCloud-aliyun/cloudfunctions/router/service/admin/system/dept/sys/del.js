module.exports = {
	/**
	 * 删除部门
	 * @url admin/system/dept/sys/del
	 * @param {String} _id 部门ID（必填）
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { _id } = data;

		// 权限校验：仅集团级用户允许删除部门
		if (userInfo.dept_level !== 0) {
			return { code: -1, msg: '权限拦截：仅集团管理员可操作' };
		}

		if (!_id) return { code: -1, msg: '缺少部门ID' };

		// 检查子部门
		let childCount = await vk.baseDao.count({
			dbName: 'xc-tenants',
			whereJson: { parent_id: _id }
		});
		if (childCount > 0) return { code: -1, msg: '该部门下存在子部门，无法删除' };

		// 检查成员
		let memberCount = await vk.baseDao.count({
			dbName: 'uni-id-users',
			whereJson: { tenant_id: _id }
		});
		if (memberCount > 0) return { code: -1, msg: '该部门下存在成员，无法删除' };

		await vk.baseDao.deleteById({
			dbName: 'xc-tenants',
			id: _id
		});

		return { code: 0, msg: '删除成功' };
	}
}
