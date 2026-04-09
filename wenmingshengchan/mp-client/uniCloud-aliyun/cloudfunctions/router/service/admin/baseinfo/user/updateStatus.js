'use strict';
module.exports = {
	/**
	 * 更新用户的审核状态、封禁状态等边界属性
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubObj, request, plugin } = util;
		let { uid } = event;
		let res = { code: 0, msg: '' };
		
		let vk = uniCloud.vk;
		let db = vk.db;
		let _ = db.command;

		let targetUserId = data._id;
		if (!targetUserId) return { code: -1, msg: "缺失目标对象标识" };

		try {
			// ==================【越权拦截守护】==================
			// 前台即使传来了 role 数组或 department_id 篡改方案，在此处于静默剥夺
			let role = userInfo.role || [];
			if (!role.includes("super_admin")) {
				delete data.role;
				delete data.department_id;
			}

			// 执行安全的定向更改！用 updateById 避开全覆盖。
			// 因为云函数需要对目标进行纯粹清洗，我们组装新对象
			let updateData = {};
			if (data.audit_status !== undefined) updateData.audit_status = data.audit_status;
			if (data.status !== undefined) updateData.status = data.status;
			if (data.role !== undefined) updateData.role = data.role;
			if (data.department_id !== undefined) updateData.department_id = data.department_id;
			
			if (Object.keys(updateData).length === 0) {
			    return { code: 0, msg: "无任何有效修改内容被通过" };
			}
			
			res = await vk.baseDao.updateById({
				dbName: "uni-id-users",
				id: targetUserId,
				dataJson: updateData
			});
			return res;
		} catch (err) {
			return { code: -1, msg: "拦截执行抛出异常", err: err };
		}
	}
}
