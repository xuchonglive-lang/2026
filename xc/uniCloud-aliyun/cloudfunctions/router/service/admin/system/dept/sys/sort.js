module.exports = {
	/**
	 * 同级排序
	 * @url admin/system/dept/sys/sort
	 * @param {Array} sortList 排序列表 [{ _id: "xxx", sort_num: 0 }, ...]
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { sortList } = data;

		// 权限校验：仅集团级用户允许在根目录排序
		if (userInfo.dept_level !== 0) {
			return { code: -1, msg: '权限拦截：仅集团管理员可操作' };
		}

		if (!Array.isArray(sortList) || sortList.length === 0) {
			return { code: -1, msg: '排序列表为空' };
		}

		for (let item of sortList) {
			await vk.baseDao.update({
				dbName: 'xc-tenants',
				whereJson: { _id: item._id },
				dataJson: {
					sort_num: item.sort_num,
					updated_at: Date.now()
				}
			});
		}

		return { code: 0, msg: '排序成功' };
	}
}
