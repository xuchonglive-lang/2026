'use strict';
module.exports = {
	/**
	 * 租户内查询成员列表
	 * @url admin/tenant/member/sys/getList
	 * @description 租户管理员查询本租户内的用户列表（tenantFilter 自动锁定 tenant_id）
	 * @param {Number} data.pageIndex 页码
	 * @param {Number} data.pageSize  每页条数
	 * @param {Object} data.formData  查询表单参数（可选）
	 */
	main: async (event) => {
		// ============ 第一层解构：event（全量，不可省略） ============
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		// ============ 第二层解构：util（全量，不可省略） ============
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		// ============ 返回值初始化 ============
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------

		let whereJson = data.whereJson || {};

		// 支持按小组筛选
		if (data.formData && data.formData.group_id) {
			whereJson.group_id = data.formData.group_id;
		}

		// 支持按真实姓名模糊搜索
		if (data.formData && data.formData.real_name) {
			whereJson.real_name = new RegExp(data.formData.real_name);
		}

		res = await vk.baseDao.getTableData({
			dbName: 'uni-id-users',
			pageIndex: data.pageIndex || 1,
			pageSize: data.pageSize || 20,
			whereJson,
			sortArr: [{ name: '_add_time', type: 'desc' }],
			// 排除敏感字段
			fieldJson: {
				password: false,
				token: false,
				wx_openid: false,
				wx_unionid: false
			}
		});

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
};
