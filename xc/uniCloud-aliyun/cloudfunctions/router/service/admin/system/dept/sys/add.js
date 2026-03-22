const formRules = require("../util/formRules.js");
module.exports = {
	/**
	 * 新增部门
	 * @url admin/system/dept/sys/add
	 * @param {String} name        部门名称（必填）
	 * @param {String} code        部门编码（必填，唯一）
	 * @param {String} parent_id   上级部门ID
	 * @param {Number} dept_level  层级（0=集团 10=部室 20=车间）
	 * @param {String} leader_id   负责人用户ID
	 * @param {Number} sort_num    排序号
	 * @param {Number} status      状态 0=停用 1=启用
	 * @param {String} description 简介
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let res = { code: 0, msg: '' };

		// 权限校验：仅集团级用户允许新增部门
		if (userInfo.dept_level !== 0) {
			return { code: -1, msg: '权限拦截：仅集团管理员可操作' };
		}

		// 参数校验
		let formRulesRes = await formRules.add(event);
		if (formRulesRes.code !== 0) return formRulesRes;

		let {
			name,
			code,
			parent_id,
			dept_level,
			leader_id,
			sort_num = 0,
			status = 1,
			description = ''
		} = data;

		// 查询父部门以生成 dept_path
		let dept_path = '/';
		if (parent_id) {
			let parentDept = await vk.baseDao.findByWhereJson({
				dbName: 'xc-tenants',
				whereJson: { _id: parent_id }
			});
			if (!parentDept) return { code: -1, msg: '上级部门不存在' };
			dept_path = parentDept.dept_path === '/'
				? `/${parent_id}`
				: `${parentDept.dept_path}/${parent_id}`;
		}

		let addRes = await vk.baseDao.add({
			dbName: 'xc-tenants',
			dataJson: {
				name,
				code,
				parent_id: parent_id || null,
				dept_path,
				dept_level,
				leader_id: leader_id || null,
				sort_num,
				status,
				description,
				created_by: userInfo._id,
				created_at: Date.now(),
				updated_by: userInfo._id,
				updated_at: Date.now()
			}
		});

		// 补充 dept_path（追加自身 _id）
		let newId = typeof addRes === 'string' ? addRes : (addRes.id || addRes._id);
		if (!newId) return { code: -1, msg: '创建部门失败，未获取到ID' };

		let finalPath = dept_path === '/'
			? `/${newId}`
			: `${dept_path}/${newId}`;

		await vk.baseDao.update({
			dbName: 'xc-tenants',
			whereJson: { _id: newId },
			dataJson: { dept_path: finalPath }
		});

		res.id = newId;
		return res;
	}
}
