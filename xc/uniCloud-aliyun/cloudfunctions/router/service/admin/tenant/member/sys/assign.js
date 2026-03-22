'use strict';
module.exports = {
	/**
	 * 将租户内人员分配至具体小组
	 * @url admin/tenant/member/sys/assign
	 * @description 租户管理员批量将成员分配/移出内部小组
	 * @param {Array}  data.user_ids        用户ID数组（必填）
	 * @param {String} data.target_group_id 目标小组ID（为空则移出小组，变为散户）
	 */
	main: async (event) => {
		// ============ 第一层解构：event（全量，不可省略） ============
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		// ============ 第二层解构：util（全量，不可省略） ============
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		// ============ 第三层解构：data（按需） ============
		let { user_ids, target_group_id } = data;
		// ============ 返回值初始化 ============
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------

		if (!user_ids || !Array.isArray(user_ids) || user_ids.length === 0) {
			return { code: -1, msg: '请选择要分配的成员' };
		}

		let tenantId = userInfo.tenant_id;
		if (!tenantId) {
			return { code: -1, msg: '非租户用户无法操作' };
		}

		let groupPath = '';
		let groupName = '';

		// 有目标小组时，校验归属并获取冗余信息
		if (target_group_id) {
			let groupDoc = await vk.baseDao.findById({
				dbName: 'xc-tenant-groups',
				id: target_group_id
			});
			if (!groupDoc) {
				return { code: -1, msg: '目标小组不存在' };
			}
			if (groupDoc.tenant_id !== tenantId) {
				return { code: -1, msg: '目标小组不属于当前租户' };
			}
			groupPath = groupDoc.group_path
				? `${groupDoc.group_path}/${groupDoc._id}`
				: `/${groupDoc._id}`;
			groupName = groupDoc.name;
		}

		// 批量更新用户的小组信息（双保险校验 tenant_id）
		await vk.baseDao.update({
			dbName: 'uni-id-users',
			whereJson: {
				_id: _.in(user_ids),
				tenant_id: tenantId
			},
			dataJson: {
				group_id: target_group_id || '',
				group_path: groupPath,
				group_name: groupName
			}
		});

		res.msg = target_group_id ? '分配成功' : '已将成员移出小组';

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
};
