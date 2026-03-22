'use strict';
const messagePush = require('../../../util/messagePush');

module.exports = {
	/**
	 * 手动发送消息
	 * @url admin/message/sys/send 前端调用的url参数地址
	 * @param {String} title 消息标题
	 * @param {String} content 消息内容（纯文本）
	 * @param {Array} receiver_ids 接收人ID数组
	 * @param {String} msg_type 消息类型
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { title, content, receiver_ids = [], msg_type = 'system' } = data;

		if (!title) return { code: -1, msg: '消息标题不能为空' };
		if (!content) return { code: -1, msg: '消息内容不能为空' };
		if (!receiver_ids || receiver_ids.length === 0) {
			return { code: -1, msg: '请选择推送目标' };
		}

		res = await messagePush.send({
			receivers: receiver_ids,
			template_key: null, // 手动发送不使用模板
			variables: { title, content },
			sender_id: userInfo.uid,
			tenant_id: userInfo.tenant_id || '',
			util,
			devMode: true // TODO: 联调时根据配置切换
		});

		res.msg = res.msg || '消息发送完成';
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
