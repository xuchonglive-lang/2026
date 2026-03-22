'use strict';
module.exports = {
	/**
	 * 查询部门入驻申请列表
	 * @url admin/system/dept/sys/getApplications
	 * @description 集团超管查看所有部门入驻申请（含连表查询目标部门名称）
	 * @param {Number} data.pageIndex 页码
	 * @param {Number} data.pageSize  每页条数
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
			dbName: 'xc-dept-applications',
			pageIndex: data.pageIndex || 1,
			pageSize: data.pageSize || 20,
			whereJson: data.whereJson || {},
			sortArr: [{ name: 'created_at', type: 'desc' }],
			fieldJson: {},
			foreignDB: [
				{
					dbName: 'xc-tenants',
					localKey: 'target_dept_id',
					foreignKey: '_id',
					as: '_target_dept_name',
					limit: 1,
					field: 'name'
				}
			]
		});

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
};
