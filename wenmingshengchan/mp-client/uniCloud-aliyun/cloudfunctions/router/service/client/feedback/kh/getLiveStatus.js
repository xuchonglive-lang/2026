'use strict';
module.exports = {
	/**
	 * 现场实时状态查看数据接口
	 * @url client/feedback/kh/getLiveStatus
	 */
	main: async (event) => {
		let { data = {}, util } = event;
		let { vk, db, _ } = util;
		let { mode, date, shiftType, pointId, startDate, endDate } = data;
		let res = { code: 0, msg: "" };

		if (mode === 'global') {
			// Tab 1: 全局总览
			// 查询某天某班次的所有已反馈 (status = 1)
			let whereJson = {
				status: 1,
				is_del: _.neq(1)
			};
			if (date) whereJson.shift_date = date;
			if (shiftType) whereJson.shift_type = shiftType;

			let result = await vk.baseDao.selects({
				dbName: "key-point-feedback",
				whereJson: whereJson,
				sortArr: [{ "name": "submit_time", "type": "desc" }]
			});

			let list = result.rows || [];
			
			// 按 area_name 和 point_name 分组
			let groupedData = [];
			let areaMap = {};

			list.forEach(item => {
				if (!item.images || item.images.length === 0) return;
				
				let aName = item.area_name || '未命名区域';
				let pName = item.point_name || '未命名点位';

				if (!areaMap[aName]) {
					areaMap[aName] = {
						area_name: aName,
						points: {}
					};
				}
				
				if (!areaMap[aName].points[pName]) {
					areaMap[aName].points[pName] = {
						point_name: pName,
						photos: []
					};
				}

				// 处理新老格式的 images
				let formattedPhotos = item.images.map(img => {
					let url = typeof img === 'object' ? img.url : img;
					let title = typeof img === 'object' ? img.title : pName;
					// 提取时间
					let timeStr = item.submit_time ? vk.pubfn.timeFormat(item.submit_time, "hh:mm") : "未知";
					return { url, title, time: timeStr };
				});

				areaMap[aName].points[pName].photos.push(...formattedPhotos);
			});

			// 转换为数组格式
			for (let aName in areaMap) {
				let area = areaMap[aName];
				let pointList = [];
				for (let pName in area.points) {
					pointList.push(area.points[pName]);
				}
				groupedData.push({
					area_name: area.area_name,
					points: pointList
				});
			}

			res.data = groupedData;
		} else if (mode === 'single') {
			// Tab 2: 单点位分析
			let whereJson = {
				point_id: pointId,
				status: 1,
				is_del: _.neq(1)
			};
			
			if (startDate && endDate) {
				whereJson.shift_date = _.gte(startDate).lte(endDate);
			}

			let result = await vk.baseDao.selects({
				dbName: "key-point-feedback",
				whereJson: whereJson,
				sortArr: [{ "name": "shift_date", "type": "desc" }, { "name": "submit_time", "type": "desc" }]
			});

			let list = result.rows || [];
			
			// 按日期分组
			let dateMap = {};
			list.forEach(item => {
				if (!item.images || item.images.length === 0) return;
				
				let dateStr = item.shift_date;
				if (!dateMap[dateStr]) {
					dateMap[dateStr] = {
						date: dateStr,
						photos: []
					};
				}
				
				let pName = item.point_name || '未命名点位';
				
				let formattedPhotos = item.images.map(img => {
					let url = typeof img === 'object' ? img.url : img;
					let title = typeof img === 'object' ? img.title : pName;
					let timeStr = item.submit_time ? vk.pubfn.timeFormat(item.submit_time, "hh:mm") : "未知";
					return { url, title, time: timeStr };
				});

				dateMap[dateStr].photos.push(...formattedPhotos);
			});

			// 转数组
			let dateList = [];
			for (let dateStr in dateMap) {
				dateList.push(dateMap[dateStr]);
			}
			
			// 确保按日期倒序
			dateList.sort((a, b) => b.date.localeCompare(a.date));

			res.data = dateList;
		}

		return res;
	}
};
