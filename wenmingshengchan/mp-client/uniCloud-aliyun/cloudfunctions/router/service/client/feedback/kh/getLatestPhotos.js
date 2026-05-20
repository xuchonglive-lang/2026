'use strict';
module.exports = {
	/**
	 * 获取首页轮播图展示的最新现场照片
	 * @url client/feedback/kh/getLatestPhotos
	 */
	main: async (event) => {
		let { util } = event;
		let { vk, _ } = util;
		let res = { code: 0, msg: "" };

		// 查询最新 20 条已完满反馈 (status = 1) 的记录，以确保能取到包含图片的记录
		let result = await vk.baseDao.selects({
			dbName: "key-point-feedback",
			whereJson: {
				status: 1,
				is_del: _.neq(1)
			},
			sortArr: [{ "name": "submit_time", "type": "desc" }],
			pageIndex: 1,
			pageSize: 20
		});

		let rows = result.rows || [];
		let swiperList = [];

		for (let i = 0; i < rows.length; i++) {
			let item = rows[i];
			if (item.images && item.images.length > 0) {
				// 每条记录可能有多张图，我们取第一张作为展示
				let img = item.images[0];
				let url = typeof img === 'object' ? img.url : img;
				let shiftText = item.shift_type === 'day' ? '白班' : '夜班';
				
				swiperList.push({
					image: url,
					title: `${item.area_name || ''} · ${item.point_name || ''} · ${item.shift_date || ''} · ${shiftText}`
				});
				
				if (swiperList.length >= 5) {
					break;
				}
			}
		}

		res.rows = swiperList;
		return res;
	}
};
