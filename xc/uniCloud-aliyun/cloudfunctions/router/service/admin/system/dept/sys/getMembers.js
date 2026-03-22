module.exports = {
	/**
	 * 获取部门成员列表
	 * @url admin/system/dept/sys/getMembers
	 * @param {String} dept_id   部门ID（必填）
	 * @param {Number} pageIndex 页码，默认1
	 * @param {Number} pageSize  每页条数，默认20
	 * @param {String} keyword   搜索关键词（可选）
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		// 兼容 vk-data-table 的 query-form-param 格式（参数在 data.formData 中）
		let formData = data.formData || {};
		let dept_id = data.dept_id || formData.dept_id;
		let keyword = data.keyword || formData.keyword;
		let pageIndex = data.pageIndex || 1;
		let pageSize = data.pageSize || 20;
		if (!dept_id) return { code: -1, msg: '缺少部门ID' };

		let whereJson = { tenant_id: dept_id };
		if (keyword) {
			let reg = new RegExp(keyword, 'i');
			whereJson.$or = [
				{ nickname: reg },
				{ mobile: reg },
				{ username: reg }
			];
		}

		let listRes = await vk.baseDao.getTableData({
			dbName: 'uni-id-users',
			whereJson,
			pageIndex,
			pageSize,
			sortArr: [{ name: 'created_at', type: 'desc' }],
			fieldJson: {
				_id: true,
				nickname: true,
				avatar: true,
				mobile: true,
				username: true,
				role: true,
				status: true,
				created_at: true,
				tenant_id: true
			}
		});

		return {
			code: 0,
			msg: '',
			...listRes
		};
	}
}
