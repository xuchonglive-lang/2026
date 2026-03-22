'use strict';
module.exports = {
	/**
	 * 租户内新增小组
	 * @url admin/tenant/group/sys/add
	 * @description 租户管理员在其部门内新增内部小组（支持无限层级）
	 * @param {String} data.name        小组名称（必填）
	 * @param {String} data.parent_id   上级小组ID（可选，为空则为根小组）
	 * @param {String} data.leader_id   组长用户ID（可选）
	 * @param {Number} data.sort_num    排序号（可选）
	 * @param {String} data.description 简介（可选）
	 */
	main: async (event) => {
		// ============ 第一层解构：event（全量，不可省略） ============
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		// ============ 第二层解构：util（全量，不可省略） ============
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		// ============ 第三层解构：data（按需） ============
		let { name, parent_id, leader_id, sort_num = 0, description = '' } = data;
		// ============ 返回值初始化 ============
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------

		if (!name || !name.trim()) {
			return { code: -1, msg: '小组名称不能为空' };
		}

		// tenantFilter 已将 tenant_id 注入 whereJson，但此处需要写入新记录
		let tenantId = userInfo.tenant_id;
		if (!tenantId) {
			return { code: -1, msg: '非租户用户无法操作' };
		}

		// 构造 group_path
		let groupPath = '';
		if (parent_id) {
			let parentDoc = await vk.baseDao.findById({
				dbName: 'xc-tenant-groups',
				id: parent_id
			});
			if (!parentDoc) {
				return { code: -1, msg: '上级小组不存在' };
			}
			if (parentDoc.tenant_id !== tenantId) {
				return { code: -1, msg: '上级小组不属于当前租户' };
			}
			groupPath = (parentDoc.group_path || '') + '/' + parent_id;
		}

		let id = await vk.baseDao.add({
			dbName: 'xc-tenant-groups',
			dataJson: {
				tenant_id: tenantId,
				parent_id: parent_id || '',
				name: name.trim(),
				group_path: groupPath,
				leader_id: leader_id || '',
				sort_num,
				status: 1,
				description,
				created_by: userInfo._id,
				created_at: Date.now()
			}
		});

		res.id = id;
		res.msg = '小组创建成功';

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
};
