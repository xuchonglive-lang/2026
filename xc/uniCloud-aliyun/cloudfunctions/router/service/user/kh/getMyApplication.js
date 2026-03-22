'use strict';
module.exports = {
	/**
	 * 查询当前用户是否有待审批的入驻申请
	 * @url user/kh/getMyApplication
	 * @description 裸号用户登录后调用，用于判断是否已提交申请
	 */
	main: async (event) => {
		// ============ 第一层解构：event（全量，不可省略） ============
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		// ============ 第二层解构：util（全量，不可省略） ============
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		// ============ 返回值初始化 ============
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------

		let doc = await vk.baseDao.findByWhereJson({
			dbName: 'xc-dept-applications',
			whereJson: {
				user_id: userInfo._id,
				status: 0
			}
		});

		res.data = doc || null;

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
};
