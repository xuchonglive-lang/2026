module.exports = {
	/**
	 * 获取部门列表（按集团分组）
	 * @url admin/system/dept/sys/getList
	 * @param {Number} status  按状态筛选（可选）
	 * @param {String} keyword 关键词搜索（可选）
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { status, keyword } = data;

		let whereJson = {};
		if (status !== undefined && status !== '') {
			whereJson.status = Number(status);
		}
		if (keyword) {
			whereJson.name = new RegExp(keyword, 'i');
		}

		let listRes = await vk.baseDao.select({
			dbName: 'xc-tenants',
			whereJson,
			sortArr: [
				{ name: 'dept_level', type: 'asc' },
				{ name: 'sort_num', type: 'asc' }
			],
			fieldJson: {
				name: true,
				code: true,
				parent_id: true,
				dept_path: true,
				dept_level: true,
				leader_id: true,
				sort_num: true,
				status: true,
				description: true
			}
		});

		return {
			code: 0,
			msg: '',
			rows: listRes.rows || listRes
		};
	}
}
