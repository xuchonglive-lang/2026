'use strict';
module.exports = {
	/**
	 * 租户内修改小组
	 * @url admin/tenant/group/sys/update
	 * @description 租户管理员修改小组名称、负责人、排序等信息
	 * @param {String} data._id         小组ID（必填）
	 * @param {String} data.name        小组名称
	 * @param {String} data.leader_id   组长用户ID
	 * @param {Number} data.sort_num    排序号
	 * @param {Number} data.status      状态 0=停用 1=启用
	 * @param {String} data.description 简介
	 */
	main: async (event) => {
		// ============ 第一层解构：event（全量，不可省略） ============
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		// ============ 第二层解构：util（全量，不可省略） ============
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		// ============ 返回值初始化 ============
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------

		let { _id } = data;
		if (!_id) {
			return { code: -1, msg: '参数 _id 不能为空' };
		}

		// 禁止客户端篡改核心隔离字段
		delete data.tenant_id;
		delete data.group_path;
		delete data.created_by;
		delete data.created_at;

		// 追加审计字段
		data.updated_by = userInfo._id;
		data.updated_at = Date.now();

		await vk.baseDao.updateById({
			dbName: 'xc-tenant-groups',
			id: _id,
			dataJson: data
		});

		res.msg = '修改成功';

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
};
