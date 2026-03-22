module.exports = {
	/**
	 * 获取当前用户部门信息
	 * @url user/kh/dept/getMyDept
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;

		let tenantId = userInfo.tenant_id;
		if (!tenantId) {
			return { code: 0, msg: '未分配部门', data: null };
		}

		let dept = await vk.baseDao.findByWhereJson({
			dbName: 'xc-tenants',
			whereJson: { _id: tenantId },
			fieldJson: {
				_id: true,
				name: true,
				code: true,
				parent_id: true,
				dept_path: true,
				dept_level: true,
				leader_id: true,
				status: true,
				description: true
			}
		});

		if (!dept) return { code: 0, msg: '部门不存在', data: null };

		// 查询负责人信息
		if (dept.leader_id) {
			let leader = await vk.baseDao.findByWhereJson({
				dbName: 'uni-id-users',
				whereJson: { _id: dept.leader_id },
				fieldJson: { _id: true, nickname: true, avatar: true }
			});
			dept.leader_info = leader || null;
		}

		return { code: 0, msg: '', data: dept };
	}
}
