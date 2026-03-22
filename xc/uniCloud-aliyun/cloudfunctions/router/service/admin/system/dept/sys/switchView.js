module.exports = {
	/**
	 * 保存管理员的部门视角切换
	 * @url admin/system/dept/sys/switchView
	 * @param {String} tenant_id 切换到的部门ID（空字符串表示清除选择，查看全部）
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { tenant_id } = data;

		// 仅集团级（dept_level===0）可切换
		if (userInfo.dept_level !== 0) {
			return { code: -1, msg: '仅集团级管理员可切换部门视角' };
		}

		let dataJson = {};
		if (tenant_id) {
			// 验证目标部门存在
			let dept = await vk.baseDao.findByWhereJson({
				dbName: 'xc-tenants',
				whereJson: { _id: tenant_id }
			});
			if (!dept) return { code: -1, msg: '目标部门不存在' };
			dataJson.selected_view_tenant_id = tenant_id;
		} else {
			// 清除选择，使用 db.command.remove() 删除字段
			dataJson.selected_view_tenant_id = _.remove();
		}

		await vk.baseDao.update({
			dbName: 'uni-id-users',
			whereJson: { _id: userInfo._id },
			dataJson
		});

		return { code: 0, msg: tenant_id ? '已切换部门视角' : '已恢复全局视角' };
	}
}
