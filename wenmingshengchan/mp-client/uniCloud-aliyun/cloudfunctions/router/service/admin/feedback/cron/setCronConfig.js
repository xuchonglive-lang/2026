'use strict';
module.exports = {
	/**
	 * 设置定点卡点配置（白班与夜班发版时间）
	 * @url admin/feedback/cron/setCronConfig
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: "保存重控卡点成功" };

		let { _id, trigger_time } = data;
		if (!_id || !trigger_time) return { code: -1, msg: "配置载体和时间缺失" };

		// 业务逻辑开始-----------------------------------------------------------
		// B端一般只做修改，不做新增和删除（库里预埋2笔初始数据 day/night）
		let updateRes = await vk.baseDao.updateById({
			dbName: "key-point-cron-config",
			id: _id,
			dataJson: {
				trigger_time: trigger_time,
				updator_uid: uid,
				update_time: new Date().getTime()
			}
		});

		if (updateRes <= 0) {
			return { code: -1, msg: "更新发单触发点失败" };
		}
		
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
