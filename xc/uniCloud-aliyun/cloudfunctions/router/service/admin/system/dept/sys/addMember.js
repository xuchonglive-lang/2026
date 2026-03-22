module.exports = {
	/**
	 * 添加成员到部门
	 * @url admin/system/dept/sys/addMember
	 * @param {String} dept_id  部门ID（必填）
	 * @param {String} user_id  用户ID（必填）
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { dept_id, user_id } = data;

		// 权限校验：仅集团级用户允许添加成员
		if (userInfo.dept_level !== 0) {
			return { code: -1, msg: '权限拦截：仅集团管理员可操作' };
		}

		if (!dept_id || !user_id) return { code: -1, msg: '缺少参数' };

		// 查询目标部门
		let dept = await vk.baseDao.findByWhereJson({
			dbName: 'xc-tenants',
			whereJson: { _id: dept_id }
		});
		if (!dept) return { code: -1, msg: '部门不存在' };
		if (dept.status === 0) return { code: -1, msg: '目标部门已停用' };

		// 查询用户当前归属
		let user = await vk.baseDao.findByWhereJson({
			dbName: 'uni-id-users',
			whereJson: { _id: user_id },
			fieldJson: { _id: true, nickname: true, tenant_id: true, tenant_name: true }
		});
		if (!user) return { code: -1, msg: '用户不存在' };

		// 返回用户当前归属信息，前端据此做确认弹窗
		let previousDept = null;
		if (user.tenant_id && user.tenant_id !== dept_id) {
			previousDept = {
				tenant_id: user.tenant_id,
				tenant_name: user.tenant_name || '未知部门'
			};
		}

		// 执行更新
		await vk.baseDao.update({
			dbName: 'uni-id-users',
			whereJson: { _id: user_id },
			dataJson: {
				tenant_id: dept_id,
				dept_path: dept.dept_path,
				tenant_name: dept.name,
				dept_level: dept.dept_level
			}
		});

		return {
			code: 0,
			msg: previousDept ? `已将用户从「${previousDept.tenant_name}」调整到「${dept.name}」` : '添加成功',
			previousDept
		};
	}
}
