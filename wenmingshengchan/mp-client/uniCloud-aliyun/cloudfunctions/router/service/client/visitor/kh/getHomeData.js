'use strict';
module.exports = {
	/**
	 * 访客大厅：获取首页聚合数据（鉴权）
	 * @url client/visitor/kh/getHomeData
	 */
	main: async (event) => {
		let { util } = event;
		let { vk, db, _ } = util;
		let res = { code: 0, msg: "" };

		// 1. 获取最新现场照片
		let photoRes = await vk.baseDao.selects({
			dbName: "key-point-feedback",
			whereJson: { status: 1, is_del: _.neq(1) },
			sortArr: [{ "name": "submit_time", "type": "desc" }],
			pageIndex: 1,
			pageSize: 5
		});
		let swiperList = [];
		(photoRes.rows || []).forEach(item => {
			if (item.images && item.images.length > 0) {
				let img = item.images[0];
				let url = typeof img === 'object' ? img.url : img;
				swiperList.push({
					image: url,
					title: `${item.shift_date} | ${item.area_name || ''} ${item.point_name || ''}`
				});
			}
		});

		// 2. 获取最新专业资讯
		let infoRes = await vk.baseDao.getTableData({
			dbName: "info",
			whereJson: { status: 1, is_del: 0 },
			sortArr: [{ "name": "is_top", "type": "desc" }, { "name": "publish_time", "type": "desc" }],
			pageSize: 4,
			fieldJson: { content: false },
			foreignDB: [{ dbName: "info-category", localKey: "category_id", foreignKey: "_id", as: "category_info", limit: 1 }]
		});

		// 3. 获取最新公示报备
		let reportRes = await vk.baseDao.selects({
			dbName: "problem-report",
			whereJson: { status: _.neq(3) },
			sortArr: [{ "name": "create_time", "type": "desc" }],
			pageSize: 1
		});

		res.swiperList = swiperList;
		res.infoList = infoRes.rows || [];
		res.lastReport = reportRes.rows[0] || null;

		return res;
	}
};
