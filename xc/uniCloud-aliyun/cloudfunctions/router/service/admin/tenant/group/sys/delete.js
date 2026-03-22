'use strict';
module.exports = {
	/**
	 * 租户内删除小组
	 * @url admin/tenant/group/sys/delete
	 * @description 租户管理员删除内部小组（需先清空子级和成员）
	 * @param {String} data._id 小组ID（必填）
	 */
	main: async (event) => {
		// ============ 第一层解构：event（全量，不可省略） ============
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		// ============ 第二层解构：util（全量，不可省略） ============
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		// ============ 第三层解构：data（按需） ============
		let { _id } = data;
		// ============ 返回值初始化 ============
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------

		if (!_id) {
			return { code: -1, msg: '参数 _id 不能为空' };
		}

		// 检查是否有子级小组
		let childCount = await vk.baseDao.count({
			dbName: 'xc-tenant-groups',
			whereJson: { parent_id: _id }
		});
		if (childCount > 0) {
			return { code: -1, msg: '请先删除子小组' };
		}

		// 检查是否有成员挂靠
		let memberCount = await vk.baseDao.count({
			dbName: 'uni-id-users',
			whereJson: { group_id: _id }
		});
		if (memberCount > 0) {
			return { code: -1, msg: '该小组内还有成员，请先移除成员' };
		}

		await vk.baseDao.deleteById({
			dbName: 'xc-tenant-groups',
			id: _id
		});

		res.msg = '删除成功';

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
};
