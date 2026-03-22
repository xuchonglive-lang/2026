module.exports = {
	/**
	 * 新增部门参数校验
	 */
	add: async (event) => {
		let { data = {}, util } = event;
		let { vk, db } = util;
		let { name, code, dept_level } = data;

		if (!name) return { code: -1, msg: '部门名称不能为空' };
		if (!code) return { code: -1, msg: '部门编码不能为空' };
		if (![0, 10, 20].includes(dept_level)) return { code: -1, msg: '部门层级无效' };

		// 编码唯一性校验
		let num = await vk.baseDao.count({
			dbName: 'xc-tenants',
			whereJson: { code }
		});
		if (num > 0) return { code: -1, msg: `部门编码【${code}】已存在` };

		return { code: 0, msg: '' };
	},
	/**
	 * 修改部门参数校验
	 */
	update: async (event) => {
		let { data = {}, util } = event;
		let { vk, db } = util;
		let { _id, name, code } = data;
		let _ = db.command;

		if (!_id) return { code: -1, msg: '缺少部门ID' };
		if (!name) return { code: -1, msg: '部门名称不能为空' };

		if (code) {
			let num = await vk.baseDao.count({
				dbName: 'xc-tenants',
				whereJson: {
					code,
					_id: _.neq(_id)
				}
			});
			if (num > 0) return { code: -1, msg: `部门编码【${code}】已存在` };
		}

		return { code: 0, msg: '' };
	}
}
