'use strict';
module.exports = {
	/**
	 * 集团超管审批入驻申请
	 * @url admin/system/user/sys/approve
	 * @description 通过或拒绝用户的部门入驻申请，通过时自动更新用户的 tenant_id 等冗余字段
	 * @param {String} data.application_id 申请记录ID（必填）
	 * @param {String} data.action         approve=通过 reject=拒绝（默认approve）
	 * @param {String} data.target_dept_id 可选，超管可覆盖目标部门
	 * @param {String} data.reject_reason  拒绝原因（拒绝时可选）
	 */
	main: async (event) => {
		// ============ 第一层解构：event（全量，不可省略） ============
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		// ============ 第二层解构：util（全量，不可省略） ============
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		// ============ 第三层解构：data（按需） ============
		let { application_id, action = 'approve', target_dept_id, reject_reason } = data;
		// ============ 返回值初始化 ============
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------

		if (!application_id) {
			return { code: -1, msg: '参数 application_id 不能为空' };
		}

		// 查询申请记录
		let appDoc = await vk.baseDao.findById({
			dbName: 'xc-dept-applications',
			id: application_id
		});
		if (!appDoc) {
			return { code: -1, msg: '申请记录不存在' };
		}
		if (appDoc.status !== 0) {
			return { code: -1, msg: '该申请已被处理' };
		}

		const now = Date.now();

		if (action === 'approve') {
			// ========== 通过审批 ==========
			let finalDeptId = target_dept_id || appDoc.target_dept_id;

			// 查询部门信息，获取冗余字段
			let deptDoc = await vk.baseDao.findById({
				dbName: 'xc-tenants',
				id: finalDeptId
			});
			if (!deptDoc) {
				return { code: -1, msg: '目标部门不存在' };
			}

			// 更新用户记录
			await vk.baseDao.update({
				dbName: 'uni-id-users',
				whereJson: { _id: appDoc.user_id },
				dataJson: {
					tenant_id: finalDeptId,
					tenant_name: deptDoc.name || '',
					dept_path: deptDoc.dept_path || ''
				}
			});

			// 更新申请状态
			await vk.baseDao.updateById({
				dbName: 'xc-dept-applications',
				id: application_id,
				dataJson: {
					status: 1,
					approved_by: userInfo._id,
					approved_at: now
				}
			});

			res.msg = '审批通过，用户已加入部门';
		} else {
			// ========== 拒绝审批 ==========
			await vk.baseDao.updateById({
				dbName: 'xc-dept-applications',
				id: application_id,
				dataJson: {
					status: 2,
					reject_reason: reject_reason || '',
					approved_by: userInfo._id,
					approved_at: now
				}
			});

			res.msg = '已拒绝该申请';
		}

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
};
