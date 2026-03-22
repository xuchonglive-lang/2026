module.exports = {
	/**
	 * 获取部门详情
	 * @url admin/system/dept/sys/getInfo
	 * @param {String} _id 部门ID（必填）
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { _id } = data;
		if (!_id) return { code: -1, msg: '缺少部门ID' };

		let info = await vk.baseDao.findByWhereJson({
			dbName: 'xc-tenants',
			whereJson: { _id }
		});
		if (!info) return { code: -1, msg: '部门不存在' };

		// 如果有负责人，查询负责人信息
		if (info.leader_id) {
			let leader = await vk.baseDao.findByWhereJson({
				dbName: 'uni-id-users',
				whereJson: { _id: info.leader_id },
				fieldJson: { _id: true, nickname: true, avatar: true, mobile: true }
			});
			info.leader_info = leader || null;
		}

		return { code: 0, msg: '', data: info };
	}
}
