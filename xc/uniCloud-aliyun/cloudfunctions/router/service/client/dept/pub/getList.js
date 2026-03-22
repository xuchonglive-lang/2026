'use strict';
module.exports = {
	/**
	 * 公开接口：查询可选部门列表（供前台选择器使用）
	 * @url client/dept/pub/getList
	 * @description 返回启用状态的部室/车间列表（dept_level > 0），无需登录
	 */
	main: async (event) => {
		// ============ 第一层解构：event（全量，不可省略） ============
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		// ============ 第二层解构：util（全量，不可省略） ============
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		// ============ 返回值初始化 ============
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------

		res = await vk.baseDao.getTableData({
			dbName: 'xc-tenants',
			pageIndex: 1,
			pageSize: 200,
			whereJson: {
				dept_level: _.gt(0),
				status: 1
			},
			sortArr: [
				{ name: 'dept_level', type: 'asc' },
				{ name: 'sort_num', type: 'asc' }
			],
			fieldJson: {
				_id: true,
				name: true,
				code: true,
				dept_level: true
			}
		});

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
};
