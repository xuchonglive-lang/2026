'use strict';
module.exports = {
	/**
	 * 管理员对收上来的现场反馈进行违章追责或核查留痕
	 * @url admin/feedback/sys/auditFeedback
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data; // 登录人的uid
		let res = { code: 0, msg: "流转批示成功" };

		let { _id, audit_mark } = data; // 必传要审核哪条记录，以及批示意见

		if (!_id) return { code: -1, msg: "记录标定ID缺失" };

		// 业务逻辑开始-----------------------------------------------------------
		// 采用 vk.baseDao.update 进行轻量化留痕操作。不改变单据所属状态(依然是已反馈状态)
		// 旨在提供后期定责溯源，不进入回退闭环（无交班缓冲的一刀切原则）
		
		let updateRes = await vk.baseDao.updateById({
			dbName: "key-point-feedback",
			id: _id,
			dataJson: {
				audit_uid: uid,
				audit_mark: audit_mark,
				audit_time: new Date().getTime() // 注入查实时间
			}
		});

		if (updateRes <= 0) {
			return { code: -1, msg: "批示落地失败" };
		}
		
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
