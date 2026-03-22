module.exports = {
	/**
	 * 从部门移除成员
	 * @url admin/system/dept/sys/removeMember
	 * @param {String} user_id 用户ID（必填）
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { user_id } = data;

		// 权限校验：仅集团级用户允许移除成员
		if (userInfo.dept_level !== 0) {
			return { code: -1, msg: '权限拦截：仅集团管理员可操作' };
		}

		if (!user_id) return { code: -1, msg: '缺少用户ID' };

		await vk.baseDao.update({
			dbName: 'uni-id-users',
			whereJson: { _id: user_id },
			dataJson: {
				tenant_id: _.remove(),
				dept_path: _.remove(),
				tenant_name: _.remove(),
				dept_level: _.remove()
			}
		});

		return { code: 0, msg: '移除成功' };
	}
}
