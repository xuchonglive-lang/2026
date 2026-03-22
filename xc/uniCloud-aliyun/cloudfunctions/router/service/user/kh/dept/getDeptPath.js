module.exports = {
	/**
	 * 获取部门层级路径（面包屑用）
	 * @url user/kh/dept/getDeptPath
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;

		let tenantId = userInfo.tenant_id;
		if (!tenantId) return { code: 0, msg: '', data: [] };

		// 查当前部门
		let dept = await vk.baseDao.findByWhereJson({
			dbName: 'xc-tenants',
			whereJson: { _id: tenantId },
			fieldJson: { _id: true, dept_path: true }
		});
		if (!dept) return { code: 0, msg: '', data: [] };

		// 从 dept_path 解析父级 ID 链
		let pathIds = dept.dept_path.split('/').filter(Boolean);
		if (pathIds.length === 0) return { code: 0, msg: '', data: [] };

		let cmd = db.command;
		let allDepts = await vk.baseDao.select({
			dbName: 'xc-tenants',
			whereJson: { _id: cmd.in(pathIds) },
			fieldJson: { _id: true, name: true, dept_level: true, code: true }
		});

		// 按 dept_path 中的顺序排列
		let rows = allDepts.rows || allDepts;
		let pathList = [];
		for (let id of pathIds) {
			let found = rows.find(d => d._id === id);
			if (found) pathList.push(found);
		}

		return { code: 0, msg: '', data: pathList };
	}
}
