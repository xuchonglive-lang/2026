'use strict';
module.exports = {
	/**
	 * 前台分类查询
	 * @url client/info-publish/kh/getCategories
	 * @description 使用 vk.pubfn.arrayToTree 返回启用的分类树
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let customWhereJson = { is_deleted: _.neq(true), status: 1 };
		let deptLevel = userInfo.dept_level;
		let tenantId = userInfo.tenant_id || '';
		let cmd = db.command;

		if (deptLevel === 0) {
			let selectedView = userInfo.selected_view_tenant_id;
			if (selectedView) {
				// 超管切换了视角：看集团统一的，和所选部门的
				customWhereJson.$or = [
					{ tenant_id: cmd.in(['', null]) },
					{ tenant_id: selectedView }
				];
			}
		} else {
			// 普通租户：看集团统一的，和自己的
			customWhereJson.$or = [
				{ tenant_id: cmd.in(['', null]) },
				{ tenant_id: tenantId }
			];
		}

		let allCategories = await vk.baseDao.select({
			dbName: 'xc-info-categories',
			whereJson: customWhereJson,
			pageSize: 500,
			sortArr: [{ name: 'sort', type: 'asc' }, { name: 'created_at', type: 'asc' }],
		});

		res.rows = vk.pubfn.arrayToTree(allCategories.rows || [], {
			id: '_id',
			parent_id: 'parent_id',
			children: 'children',
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	},
};
