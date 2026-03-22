module.exports = {
	/**
	 * 获取当前用户的部门层级和视角设置
	 * @url admin/system/dept/sys/getMyLevel
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;

		// 直接从数据库查询当前用户的 dept_level 和 selected_view_tenant_id
		let user = await vk.baseDao.findByWhereJson({
			dbName: 'uni-id-users',
			whereJson: { _id: userInfo._id },
			fieldJson: {
				_id: true,
				dept_level: true,
				tenant_id: true,
				tenant_name: true,
				selected_view_tenant_id: true
			}
		});

		if (!user) return { code: -1, msg: '用户不存在' };

		// 服务端明确判断：只有 dept_level 字段存在且等于 0 时才允许切换视角
		let canSwitchView = (user.dept_level !== undefined && user.dept_level !== null && user.dept_level === 0);

		return {
			code: 0,
			msg: '',
			canSwitchView: canSwitchView,
			dept_level: user.dept_level,
			tenant_id: user.tenant_id,
			tenant_name: user.tenant_name,
			selected_view_tenant_id: canSwitchView ? (user.selected_view_tenant_id || '') : ''
		};
	}
}
