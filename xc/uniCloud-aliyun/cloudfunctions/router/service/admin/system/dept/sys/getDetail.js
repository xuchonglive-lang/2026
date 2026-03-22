'use strict';
module.exports = {
	/**
	 * 查询单个部门详情
	 * @url admin/system/dept/sys/getDetail
	 * @description 根据 _id 查询 xc-tenants 单条记录
	 * @param {String} data._id 部门ID（必填）
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

		let doc = await vk.baseDao.findById({
			dbName: 'xc-tenants',
			id: _id
		});

		if (!doc) {
			return { code: -1, msg: '部门不存在' };
		}

		res.data = doc;

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
};
