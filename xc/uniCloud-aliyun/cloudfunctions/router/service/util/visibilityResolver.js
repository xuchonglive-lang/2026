'use strict';
/**
 * 可见性接收人解析公共工具
 * 根据 visibility 配置解析出目标用户 uid 数组
 * 多模块复用：信息共享、培训、重点工作等
 *
 * 使用方式：
 * const visibilityResolver = require('../../util/visibilityResolver');
 * const uids = await visibilityResolver.resolve({
 *   visibility: 'targeted',
 *   target_dept_ids: ['dept_001'],
 *   target_user_ids: ['uid_001'],
 *   tenant_id: 'xxx',
 *   publisher_dept_id: 'dept_002',  // visibility=private 时需要
 *   db                               // 数据库实例
 * });
 */

/**
 * 根据可见性配置解析目标用户 uid 列表
 * @param {Object} params
 * @param {string} params.visibility - public/private/targeted
 * @param {string[]} params.target_dept_ids - 目标部门ID数组（targeted 时必填）
 * @param {string[]} params.target_user_ids - 目标用户ID数组（可选精确控制）
 * @param {string} params.tenant_id - 租户ID
 * @param {string} params.publisher_dept_id - 发布者所在部门ID（private 时必填）
 * @param {Object} params.db - 数据库实例
 * @returns {string[]} uid 数组（已去重）
 */
async function resolve({
	visibility = 'private',
	target_dept_ids = [],
	target_user_ids = [],
	tenant_id,
	publisher_dept_id,
	db
}) {
	if (!tenant_id) {
		throw new Error('visibilityResolver: tenant_id 不能为空');
	}
	if (!db) {
		throw new Error('visibilityResolver: db 实例不能为空');
	}

	const dbCmd = db.command;
	const usersCollection = db.collection('uni-id-users');
	let uids = [];

	switch (visibility) {
		case 'public': {
			// 查询该租户下所有活跃用户
			const res = await usersCollection
				.where({
					dcloudAppidList: dbCmd.exists(true),
					status: 0 // uni-id-users 中 0=正常
				})
				.field({ _id: 1 })
				.limit(10000)
				.get();
			uids = res.data.map(u => u._id);
			break;
		}

		case 'private': {
			// 查询发布者所在部门的所有用户
			if (!publisher_dept_id) {
				throw new Error('visibilityResolver: visibility=private 时 publisher_dept_id 不能为空');
			}
			const res = await usersCollection
				.where({
					dept_id: publisher_dept_id,
					status: 0
				})
				.field({ _id: 1 })
				.limit(10000)
				.get();
			uids = res.data.map(u => u._id);
			break;
		}

		case 'targeted': {
			// 按指定部门 + 指定用户合并
			let deptUids = [];
			if (target_dept_ids && target_dept_ids.length > 0) {
				const res = await usersCollection
					.where({
						dept_id: dbCmd.in(target_dept_ids),
						status: 0
					})
					.field({ _id: 1 })
					.limit(10000)
					.get();
				deptUids = res.data.map(u => u._id);
			}

			// 合并指定用户 + 部门用户，去重
			const allUids = [...deptUids, ...(target_user_ids || [])];
			uids = [...new Set(allUids)];
			break;
		}

		default:
			throw new Error(`visibilityResolver: 不支持的 visibility 值: ${visibility}`);
	}

	return uids;
}

module.exports = {
	resolve
};
