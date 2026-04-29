'use strict';
module.exports = {
	/**
	 * C端工友：抢答提交重控点位考勤照片及报告
	 * @url client/feedback/kh/submitFeedback
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let uid = userInfo ? userInfo._id : null;
		let res = { code: 0, msg: "安检信息上报成功！" };

		let { _id, images, content } = data;

		if (!_id || !images || images.length === 0) return { code: -1, msg: "目标单据或核心照片缺失" };

		// 统一处理兼容：确保所有的图像项均为 { title, url } 对象快照
		let formattedImages = images.map(img => {
			if (typeof img === 'string') {
				return { title: '现场照片', url: img };
			}
			return img;
		});

		// ---- 反馈时间窗口校验 ----
		// 先查询任务获取 shift_type
		let taskInfo = await vk.baseDao.findById({
			dbName: "key-point-feedback",
			id: _id
		});
		if (!taskInfo || taskInfo.status !== 0) return { code: -1, msg: "任务不存在或状态异常" };

		let configList = await vk.baseDao.selects({
			dbName: "key-point-cron-config",
			whereJson: { shift_type: taskInfo.shift_type }
		});
		if (configList.rows && configList.rows.length > 0) {
			let conf = configList.rows[0];
			if (conf.feedback_start && conf.feedback_end) {
				let now = new Date();
				let currentTimeStr = (now.getHours() < 10 ? '0' : '') + now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
				if (currentTimeStr < conf.feedback_start) {
					return { code: -1, msg: `未到反馈时间，请在 ${conf.feedback_start} 之后提交` };
				}
				if (currentTimeStr > conf.feedback_end) {
					return { code: -1, msg: "反馈窗口已关闭，任务已逾期" };
				}
			}
		}

		// 业务逻辑开始-----------------------------------------------------------
		
		// 高度并发抢答锁：只瞄准 status === 0 的那条属于且仅属于待办通道的单子更新。
		// 由于是组内分发（assignee_ids 包含组内多人），一人提交直接落锤，其他人再提交查不到 status=0 就会被软阻断。
		
		let updateRes = await vk.baseDao.update({
			dbName: "key-point-feedback",
			whereJson: {
				_id: _id,
				status: 0,
				is_del: _.neq(1)
			},
			dataJson: {
				status: 1, // 状态推演到：已完满反馈
				submit_uid: uid,
				submit_time: new Date().getTime(),
				images: formattedImages,
				content: content || ""
			}
		});

		// 兼容 vk-fun 内部可能返回 { updated: X } 或是裸整数字的形态
		let count = typeof updateRes === "number" ? updateRes : (updateRes ? (updateRes.num || updateRes.updated || 0) : 0);

		if (count <= 0) {
			return { code: -1, msg: "提交阻断：任务可能已被组内其他工友抢先完成，或当前班次已被硬封控作废。" };
		}
		
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}

