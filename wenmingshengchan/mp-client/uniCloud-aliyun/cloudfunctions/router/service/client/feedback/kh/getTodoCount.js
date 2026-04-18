'use strict';
module.exports = {
	/**
	 * C端工友：获取属于自己的待办重控任务数量（用于首页红点Badge）
	 * @url client/feedback/kh/getTodoCount
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = userInfo;
		let res = { code: 0, msg: "", count: 0 };

		// 业务逻辑开始-----------------------------------------------------------
		let countRes = await vk.baseDao.count({
			dbName: "key-point-feedback",
			whereJson: {
				assignee_ids: _.in([uid]),
				status: 0, // 等待抢单反馈
				is_del: _.neq(1)
			}
		});

		res.count = countRes;
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
