'use strict';
module.exports = {
	/**
	 * 租户内查询小组列表
	 * @url admin/tenant/group/sys/getList
	 * @description 租户管理员拉取本租户内所有小组（一次性全量，用于树形渲染）
	 */
	main: async (event) => {
		// ============ 第一层解构：event（全量，不可省略） ============
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		// ============ 第二层解构：util（全量，不可省略） ============
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		// ============ 返回值初始化 ============
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------

		// tenantFilter 已在 whereJson 中注入了 tenant_id
		res = await vk.baseDao.getTableData({
			dbName: 'xc-tenant-groups',
			pageIndex: 1,
			pageSize: 500,
			whereJson: data.whereJson || {},
			sortArr: [
				{ name: 'sort_num', type: 'asc' },
				{ name: 'created_at', type: 'desc' }
			],
			fieldJson: {}
		});

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
};
