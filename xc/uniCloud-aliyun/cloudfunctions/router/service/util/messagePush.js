'use strict';
/**
 * 消息推送公共工具
 * 使用方式：在业务云函数中 require 此文件后调用 send 方法
 *
 * const messagePush = require('../../util/messagePush');
 * await messagePush.send({
 *   receivers: ['uid1', 'uid2'],    // 接收人 uid 数组
 *   template_key: 'training',       // 对应 xc-message-templates.biz_type
 *   variables: { course_name: 'xxx', course_id: 'yyy' },
 *   sender_id: userInfo.uid,
 *   tenant_id: '...',
 *   target_type: 'training',        // 关联业务类型（可选）
 *   target_id: 'xxx',               // 关联业务ID（可选）
 *   util,                           // 云函数 event.util
 *   devMode: true                   // true=不调微信API，仅写数据库
 * });
 */

/**
 * 替换模板中的 {{变量名}} 占位符
 */
function renderTemplate(template, variables) {
	if (!template) return '';
	return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
		return variables[key] !== undefined ? variables[key] : match;
	});
}

/**
 * 发送消息（站内 + 可选微信推送）
 * @param {Object} options
 * @param {Array<string>} options.receivers - 接收人 uid 数组
 * @param {string} options.template_key - 匹配 xc-message-templates.biz_type
 * @param {Object} options.variables - 模板变量键值对
 * @param {string} options.sender_id - 发送人 uid
 * @param {string} options.tenant_id - 租户ID
 * @param {string} [options.target_type] - 关联业务类型
 * @param {string} [options.target_id] - 关联业务ID
 * @param {Object} options.util - 云函数 event.util
 * @param {boolean} [options.devMode=true] - 是否为开发模式（不调微信）
 * @returns {Object} { code, msg, successCount, failCount }
 */
async function send(options) {
	const {
		receivers = [],
		template_key,
		variables = {},
		sender_id = '',
		tenant_id = '',
		target_type = '',
		target_id = '',
		util,
		devMode = true
	} = options;

	const { vk, db, _ } = util;
	let res = { code: 0, msg: '', successCount: 0, failCount: 0 };

	if (!receivers || receivers.length === 0) {
		return { code: -1, msg: '接收人列表为空' };
	}

	// 1. 查询消息模板
	let template = null;
	if (template_key) {
		let templateRes = await vk.baseDao.select({
			dbName: 'xc-message-templates',
			getOne: true,
			whereJson: {
				biz_type: template_key,
				status: 1
			}
		});
		template = templateRes;
	}

	// 2. 生成消息内容
	let title = '';
	let content = '';
	let summary = '';
	let urlPath = '';

	if (template) {
		title = renderTemplate(template.title_template, variables);
		content = renderTemplate(template.content_template, variables);
		urlPath = renderTemplate(template.url_template, variables);
	} else {
		// 无模板时使用 variables 中的直接值
		title = variables.title || '系统通知';
		content = variables.content || '';
	}
	summary = content.length > 50 ? content.substring(0, 50) + '...' : content;

	// 3. 批量写入 xc-messages（每人一行）
	const now = Date.now();
	const messageList = receivers.map(uid => ({
		title,
		summary,
		content,
		msg_type: template_key || 'system',
		target_type,
		target_id,
		sender_id,
		receiver_id: uid,
		is_read: false,
		is_deleted: false,
		push_status: 'pending',
		push_error: '',
		tenant_id,
		created_by: sender_id,
		created_at: now,
		updated_at: now
	}));

	// 批量插入
	let insertedIds = [];
	try {
		for (let i = 0; i < messageList.length; i += 50) {
			const batch = messageList.slice(i, i + 50);
			const addRes = await db.collection('xc-messages').add(batch);
			if (addRes.id) {
				insertedIds = insertedIds.concat(Array.isArray(addRes.id) ? addRes.id : [addRes.id]);
			}
		}
	} catch (err) {
		return { code: -1, msg: '消息写入失败: ' + err.message };
	}

	// 4. 微信推送（devMode 时跳过）
	if (devMode) {
		// 开发模式：直接标记为 success
		await db.collection('xc-messages').where({
			_id: _.in(insertedIds)
		}).update({
			push_status: 'success',
			push_error: 'devMode: 跳过微信推送'
		});
		res.successCount = insertedIds.length;
		res.msg = `devMode: ${insertedIds.length} 条消息已写入（跳过微信推送）`;
	} else {
		// 正式模式：批量调用微信模板消息
		// 获取微信配置
		let wxConfig = await vk.baseDao.select({
			dbName: 'xc-wx-config',
			getOne: true,
			whereJson: {}
		});

		if (!wxConfig || !wxConfig.app_id) {
			// 微信未配置，标记失败
			await db.collection('xc-messages').where({
				_id: _.in(insertedIds)
			}).update({
				push_status: 'failed',
				push_error: '微信服务号未配置'
			});
			res.failCount = insertedIds.length;
			res.msg = '微信服务号未配置，消息已写入但推送失败';
			return res;
		}

		// 获取接收人的微信 openid
		let userList = await vk.baseDao.select({
			dbName: 'uni-id-users',
			whereJson: {
				_id: _.in(receivers)
			},
			fieldJson: {
				_id: true,
				wx_openid: true
			}
		});
		const userMap = {};
		if (Array.isArray(userList)) {
			userList.forEach(u => { userMap[u._id] = u; });
		}

		// 逐条推送
		let successCount = 0;
		let failCount = 0;

		const pushTasks = insertedIds.map((msgId, index) => {
			return async () => {
				const receiverId = receivers[index];
				const user = userMap[receiverId];
				const openid = user && user.wx_openid && user.wx_openid['h5'];

				if (!openid) {
					await db.collection('xc-messages').doc(msgId).update({
						push_status: 'failed',
						push_error: '用户未绑定微信'
					});
					failCount++;
					return;
				}

				try {
					let wxRes = await vk.openapi.weixin.h5.templateMessage.send({
						touser: openid,
						template_id: template ? template.wx_template_id : '',
						url: urlPath || '',
						data: {
							first: { value: title },
							keyword1: { value: content },
							keyword2: { value: new Date().toLocaleString() },
							remark: { value: '点击查看详情' }
						}
					});

					if (wxRes.code === 0 || wxRes.errcode === 0) {
						await db.collection('xc-messages').doc(msgId).update({
							push_status: 'success'
						});
						successCount++;
					} else {
						await db.collection('xc-messages').doc(msgId).update({
							push_status: 'failed',
							push_error: wxRes.errmsg || wxRes.msg || '推送失败'
						});
						failCount++;
					}
				} catch (err) {
					await db.collection('xc-messages').doc(msgId).update({
						push_status: 'failed',
						push_error: err.message || '推送异常'
					});
					failCount++;
				}
			};
		});

		// 使用 batchRun 控制并发（concurrency=20）
		await vk.pubfn.batchRun({
			taskList: pushTasks,
			batchCount: 20
		});

		res.successCount = successCount;
		res.failCount = failCount;
		res.msg = `推送完成: 成功${successCount}条, 失败${failCount}条`;
	}

	return res;
}

module.exports = {
	send,
	renderTemplate
};
