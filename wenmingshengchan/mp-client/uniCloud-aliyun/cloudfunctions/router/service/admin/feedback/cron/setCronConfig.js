'use strict';
module.exports = {
	/**
	 * 设置定点卡点配置（白班与夜班发版时间）
	 * @url admin/feedback/cron/setCronConfig
	 */
	main: async (event) => {
		// 从事件对象中解构出需要的数据：前端载荷、用户信息、工具包等
		let { data = {}, userInfo, util, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		// 提取请求参数中携带的用户 uid，用于标识是谁发起了这个修改
		let { uid } = data;
		let res = { code: 0, msg: "保存重控卡点成功" };

		// 解构出需要变更的关键参数：_id、派发任务触发时间、反馈开始时间、反馈结束时间
		let { _id, trigger_time, feedback_start, feedback_end } = data;
		// 确保上述参数均存在，缺少任何一个则不允许提交
		if (!_id || !trigger_time || !feedback_start || !feedback_end) return { code: -1, msg: "配置载体和时间缺失" };

		// 业务逻辑开始-----------------------------------------------------------
		// 注解：B端配置界面通常只处理预置好的白班(day)和夜班(night)时点配置。
		// 一般不会提供新增和删除功能，只做基于已知_id的修改操作。

		// 更新指定记录的触发配置和时间窗口配置
		let updateRes = await vk.baseDao.updateById({
			dbName: "key-point-cron-config", // 定时器配置表
			id: _id,                         // 通过预埋主键修改对应的班次
			dataJson: {
				trigger_time: trigger_time,     // 时点：到这个时间服务器自动发单
				feedback_start: feedback_start, // 允许反馈起始时间
				feedback_end: feedback_end,     // 允许反馈截止时间
				updator_uid: uid,               // 最后修改人的UID
				update_time: new Date().getTime() // 标记修改时间
			}
		});

		// 如果影响的行数 <= 0，说明 _id 没有匹配到任何行（配置表数据丢失或脏数据）
		if (updateRes <= 0) {
			return { code: -1, msg: "更新发单触发点失败" };
		}
		
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}

