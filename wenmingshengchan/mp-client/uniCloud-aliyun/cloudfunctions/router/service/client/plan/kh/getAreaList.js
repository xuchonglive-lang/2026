'use strict';
module.exports = {
	/**
	 * 供C端直接调取的日常区域获取接口
	 * @url client/plan/kh/getAreaList 
	 */
	main: async (event) => {
		let { util } = event;
		let { vk, _ } = util;
		
		// 业务逻辑开始-----------------------------------------------------------
		let selectRes = await vk.baseDao.selects({
			pageIndex: 1,
			pageSize: 500, // 不做重度分页，拉取全部可用区域
			dbName: "base-area",
			fieldJson: {
				_id: true,
				name: true
			},
			whereJson: {
				// 屏蔽掉被软删掉的区域
				is_del: _.neq(1)
			}
		});
		
		// 业务逻辑结束-----------------------------------------------------------
		return selectRes;
	}
}
