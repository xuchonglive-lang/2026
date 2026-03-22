const formRules = require("../util/formRules.js");
module.exports = {
	/**
	 * 修改部门
	 * @url admin/system/dept/sys/update
	 * @param {String} _id         部门ID（必填）
	 * @param {String} name        部门名称
	 * @param {String} code        部门编码
	 * @param {Number} dept_level  层级
	 * @param {String} leader_id   负责人用户ID
	 * @param {Number} sort_num    排序号
	 * @param {Number} status      状态
	 * @param {String} description 简介
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let res = { code: 0, msg: '' };

		// 权限校验：仅集团级用户允许修改部门
		if (userInfo.dept_level !== 0) {
			return { code: -1, msg: '权限不足：仅集团管理员可操作' };
		}

		let formRulesRes = await formRules.update(event);
		if (formRulesRes.code !== 0) return formRulesRes;

		let { _id, name, code, dept_level, leader_id, sort_num, status, description } = data;

		let dataJson = {
			updated_by: userInfo._id,
			updated_at: Date.now()
		};
		if (name !== undefined) dataJson.name = name;
		if (code !== undefined) dataJson.code = code;
		if (dept_level !== undefined) dataJson.dept_level = dept_level;
		if (leader_id !== undefined) dataJson.leader_id = leader_id;
		if (sort_num !== undefined) dataJson.sort_num = sort_num;
		if (status !== undefined) dataJson.status = status;
		if (description !== undefined) dataJson.description = description;

		// 如果修改了 name，同步更新关联用户的 tenant_name
		if (name !== undefined) {
			await vk.baseDao.update({
				dbName: 'uni-id-users',
				whereJson: { tenant_id: _id },
				dataJson: { tenant_name: name }
			});
		}

		await vk.baseDao.update({
			dbName: 'xc-tenants',
			whereJson: { _id },
			dataJson
		});

		return res;
	}
}
