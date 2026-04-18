'use strict';
module.exports = {
	/**
	 * C端工友：抢答提交重控点位考勤照片及报告
	 * @url client/feedback/kh/submitFeedback
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = userInfo;
		let res = { code: 0, msg: "安检信息上报成功！" };

		let { _id, main_image, sub_images, photo_shoot_time, device_model, content } = data;

		if (!_id || !main_image) return { code: -1, msg: "目标单据或核心照片缺失" };

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
				main_image: main_image,
				sub_images: sub_images || [],
				photo_shoot_time: photo_shoot_time || "EXIF缺失",
				device_model: device_model || "未识别型号",
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
