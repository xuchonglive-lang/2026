'use strict';
module.exports = {
	/**
	 * 裸号用户提交部门入驻申请
	 * @url user/kh/applyDept
	 * @description 微信登录产生的裸账号用户在信息补全弹窗中提交姓名与目标部门
	 * @param {String} data.real_name      真实姓名（必填）
	 * @param {String} data.target_dept_id 目标部门ID（必填，关联 xc-tenants._id）
	 */
	main: async (event) => {
		// ============ 第一层解构：event（全量，不可省略） ============
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		// ============ 第二层解构：util（全量，不可省略） ============
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		// ============ 第三层解构：data（按需） ============
		let { real_name, target_dept_id } = data;
		// ============ 返回值初始化 ============
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------

		if (!real_name || !real_name.trim()) {
			return { code: -1, msg: '真实姓名不能为空' };
		}
		if (!target_dept_id) {
			return { code: -1, msg: '请选择所属部室/车间' };
		}

		let userId = userInfo._id;

		// 已归属部门的用户不可重复申请
		if (userInfo.tenant_id) {
			return { code: -1, msg: '您已归属部门，无需重复申请' };
		}

		// 检查是否已有待审批的申请
		let existCount = await vk.baseDao.count({
			dbName: 'xc-dept-applications',
			whereJson: {
				user_id: userId,
				status: 0
			}
		});
		if (existCount > 0) {
			return { code: -1, msg: '您已有待审批的申请，请耐心等待或联系管理员' };
		}

		// 写入申请表
		await vk.baseDao.add({
			dbName: 'xc-dept-applications',
			dataJson: {
				user_id: userId,
				target_dept_id,
				real_name: real_name.trim(),
				status: 0,
				created_at: Date.now()
			}
		});

		// 同步更新用户表的 real_name
		await vk.baseDao.update({
			dbName: 'uni-id-users',
			whereJson: { _id: userId },
			dataJson: { real_name: real_name.trim() }
		});

		res.msg = '申请已提交，请等待管理员审核';

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
};
