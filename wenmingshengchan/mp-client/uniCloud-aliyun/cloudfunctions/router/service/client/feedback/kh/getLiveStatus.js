'use strict';

/**
 * 获取实时反馈状态 (全局总览 & 单点位分析)
 * @url client/feedback/kh/getLiveStatus
 */
module.exports = {
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { mode, date, shiftType, pointId, startDate, endDate } = data;
		let res = { code: 0, msg: "" };

		const DEFAULT_IMG = "https://mp-f5dec8e2-6434-4681-934d-fc46f8267fea.cdn.bspapp.com/static/images/PixPin_2026-05-08_15-50-57.png";

		// 1. 默认日期班次逻辑
		if (mode === 'global' && (!date || !shiftType)) {
			let now = new Date();
			let hour = now.getHours();
			if (hour < 8) {
				date = vk.pubfn.timeFormat(now, "yyyy-MM-dd");
				shiftType = 'night';
			} else if (hour < 20) {
				date = vk.pubfn.timeFormat(now, "yyyy-MM-dd");
				shiftType = 'day';
			} else {
				let tomorrow = new Date(now.getTime() + 24 * 3600 * 1000);
				date = vk.pubfn.timeFormat(tomorrow, "yyyy-MM-dd");
				shiftType = 'night';
			}
		}

		// 2. 基础数据准备
		let [areaRes, pointRes, configsRes] = await Promise.all([
			vk.baseDao.select({ dbName: "base-area", pageSize: 500, whereJson: { is_del: _.neq(1) } }),
			vk.baseDao.select({ dbName: "base-point", pageSize: 500, whereJson: { is_del: _.neq(1) } }),
			vk.baseDao.select({ dbName: "key-point-config", whereJson: { status: 1 }, pageSize: 500 })
		]);

		let allAreas = areaRes.rows || [];
		let allPoints = pointRes.rows || [];
		let allConfigs = configsRes.rows || [];

		// 映射基础信息
		let areaIdToName = {};
		allAreas.forEach(a => areaIdToName[a._id] = a.name);
		let pointIdToInfo = {};
		allPoints.forEach(p => pointIdToInfo[p._id] = p);

		// 过滤出符合当前班次的配置
		let configMap = {};
		allConfigs.forEach(c => {
			if (c.require_shifts && c.require_shifts.length > 0 && !c.require_shifts.includes(shiftType)) return;
			configMap[c.point_id] = c;
		});

		// 获取反馈记录
		let feedbackQuery = { is_del: _.neq(1) };
		if (mode === 'global') {
			feedbackQuery.shift_date = date;
			feedbackQuery.shift_type = shiftType;
		} else {
			feedbackQuery.point_id = pointId;
			if (startDate && endDate) feedbackQuery.shift_date = _.gte(startDate).lte(endDate);
		}
		let feedbackRes = await vk.baseDao.select({
			dbName: "key-point-feedback",
			whereJson: feedbackQuery,
			pageIndex: mode === 'single' ? (data.pageIndex || 1) : 1,
			pageSize: mode === 'single' ? (data.pageSize || 10) : 1000,
			sortArr: [{ "name": "shift_date", "type": "desc" }, { "name": "shift_type", "type": "desc" }, { "name": "submit_time", "type": "desc" }]
		});
		let feedbacks = feedbackRes.rows || [];

		// ====== 优化：全局总览模式下，如果当前选择的班次暂无数据，自动回溯到上一个有数据的班次 ======
		if (mode === 'global' && feedbacks.length === 0) {
			let fallbackRes = await vk.baseDao.select({
				dbName: "key-point-feedback",
				whereJson: {
					is_del: _.neq(1),
					shift_date: _.lte(date)
				},
				pageSize: 50, 
				sortArr: [{ "name": "shift_date", "type": "desc" }, { "name": "shift_type", "type": "desc" }]
			});
			let fallbackRows = fallbackRes.rows || [];
			let targetDate = null;
			let targetShift = null;

			for (let r of fallbackRows) {
				if (r.shift_date < date) {
					targetDate = r.shift_date;
					targetShift = r.shift_type;
					break;
				} else if (r.shift_date === date) {
					if (shiftType === 'night') {
						targetDate = r.shift_date;
						targetShift = r.shift_type;
						break;
					} else if (shiftType === 'day' && r.shift_type === 'day') {
						targetDate = r.shift_date;
						targetShift = r.shift_type;
						break;
					}
				}
			}

			if (targetDate && targetShift) {
				date = targetDate;
				shiftType = targetShift;
				// 重新查询该回溯班次的完整数据
				let newRes = await vk.baseDao.select({
					dbName: "key-point-feedback",
					whereJson: {
						is_del: _.neq(1),
						shift_date: date,
						shift_type: shiftType
					},
					pageSize: 1000,
					sortArr: [{ "name": "submit_time", "type": "desc" }]
				});
				feedbacks = newRes.rows || [];
			}
		}
		// =========================================================================================

		// 3. 手动映射用户和部门 (带 ObjectId 转换)
		let uidSet = new Set();
		let didSet = new Set();
		allConfigs.forEach(c => {
			if (c.dept_id) didSet.add(c.dept_id);
			if (c.assignee_ids) c.assignee_ids.forEach(id => uidSet.add(id));
		});
		feedbacks.forEach(f => {
			if (f.submit_uid) uidSet.add(f.submit_uid);
			if (f.dept_id) didSet.add(f.dept_id);
		});

		const formatId = (id) => {
			if (typeof id === 'string' && id.length === 24 && /^[0-9a-fA-F]+$/.test(id)) {
				try { return db.command.ObjectId(id); } catch (e) { return id; }
			}
			return id;
		};

		let [usersData, deptsData] = await Promise.all([
			uidSet.size > 0 ? db.collection("uni-id-users").where({ _id: _.in(Array.from(uidSet).map(formatId)) }).limit(1000).get() : { data: [] },
			didSet.size > 0 ? db.collection("base-dept").where({ _id: _.in(Array.from(didSet).map(formatId)) }).limit(1000).get() : { data: [] }
		]);

		let userMap = {};
		usersData.data.forEach(u => userMap[u._id.toString()] = u.real_name || u.nickname || u.username || "未知");
		let deptMap = {};
		deptsData.data.forEach(d => deptMap[d._id.toString()] = d.name || "");

		// 4. 辅助函数
		const getFooter = (item, has_feedback, config, d, s) => {
			let sDate = item ? item.shift_date : d;
			let sType = item ? item.shift_type : s;
			let sName = sType === 'day' ? '白班' : '夜班';

			if (has_feedback && item.status === 1) {
				let uName = userMap[item.submit_uid] || "未知";
				let dName = deptMap[item.dept_id] || "";
				let tStr = item.submit_time ? vk.pubfn.timeFormat(item.submit_time, "hh:mm") : "";
				return `${sDate} ${sName} ${tStr} 由 ${dName}${uName}反馈`;
			} else {
				// 优先从实录中获取部门和负责人 (实录中存有任务下发时的快照)
				let dId = (item && item.dept_id) ? item.dept_id : (config ? config.dept_id : null);
				let aIds = (item && item.assignee_ids) ? item.assignee_ids : (config ? (config.assignee_ids || []) : []);
				let dName = dId ? (deptMap[dId.toString()] || "") : "";
				let aNames = aIds.map(id => userMap[id.toString()] || "未知");
				let uStr = aNames.slice(0, 2).join("、");
				if (aNames.length > 2) uStr += "...";
				return `${sDate} ${sName}未反馈，责任人为：${dName}${uStr || "未分配"}`;
			}
		};

		const getPhotos = (item, config) => {
			let imgs = [];
			if (item && item.images) {
				imgs = item.images;
				if (typeof imgs === 'string') { try { imgs = JSON.parse(imgs); } catch (e) { imgs = [imgs]; } }
			}

			// 逻辑修正：如果实录中已有图片且包含显式标题，则以实录为准（解决历史配置变更导致的标签数量不一致问题）
			let hasExplicitTitles = Array.isArray(imgs) && imgs.length > 0 && imgs.some(img => typeof img === 'object' && img.title);
			
			let labels = hasExplicitTitles 
				? imgs.map((img, i) => (typeof img === 'object' && img.title ? img.title : `位置${i+1}`))
				: ((config && config.photo_requirements) ? config.photo_requirements : ["位置1"]);

			if (item && item.status === 1) {
				return labels.map((title, i) => {
					let img = imgs[i];
					let url = (typeof img === 'object' ? img.url : img) || DEFAULT_IMG;
					if (!url || typeof url !== 'string' || !url.startsWith('http')) url = DEFAULT_IMG;
					return {
						url: url,
						title: (typeof img === 'object' ? (img.title || title) : title),
						time: item.submit_time ? vk.pubfn.timeFormat(item.submit_time, "hh:mm") : ""
					};
				});
			} else {
				return labels.map(title => ({
					url: DEFAULT_IMG,
					title: title,
					time: ""
				}));
			}
		};

		// 5. 组合数据 (修正：只显示有实录记录的点位，不再从最新配置表生成骨架)
		if (mode === 'global') {
			let areaPointMap = {};

			// 直接从反馈实录构建数据 (实录表包含了所有应反馈和已反馈的任务点)
			feedbacks.forEach(item => {
				let aName = item.area_name || areaIdToName[item.area_id] || '未分配区域';
				let pName = item.point_name || '未命名点位';
				let cfg = configMap[item.point_id];

				if (!areaPointMap[aName]) areaPointMap[aName] = {};
				
				// 如果同一班次同一点位有多个记录，优先展示状态为1的
				if (!areaPointMap[aName][pName] || (item.status === 1 && !areaPointMap[aName][pName].has_feedback)) {
					let hasFeedback = item.status === 1;
					areaPointMap[aName][pName] = {
						point_id: item.point_id,
						area_name: aName,
						point_name: pName,
						photos: getPhotos(hasFeedback ? item : null, cfg, pName),
						has_feedback: hasFeedback,
						footer_text: getFooter(item, hasFeedback, cfg, date, shiftType)
					};
				}
			});

			let globalData = [];
			let carouselList = [];
			for (let aName in areaPointMap) {
				let points = Object.values(areaPointMap[aName]);
				globalData.push({ area_name: aName, points });
				points.forEach(p => {
					p.photos.forEach(photo => {
						carouselList.push({
							underImg: photo.url,
							remark: `${p.area_name}${p.point_name}${photo.title}`,
							dateText: `${p.footer_text}`
						});
					});
				});
			}
			res.data = globalData;
			res.carouselList = carouselList;
			res.queryParam = { date, shiftType };
		} else {
			// single mode
			let pointConfig = allConfigs.find(c => c.point_id === pointId);
			let pName = (pointIdToInfo[pointId] && pointIdToInfo[pointId].name) || '未命名点位';
			
			// 直接使用数据库分页后的 rows 和 total
			res.list = feedbacks.map(item => {
				let hasFeedback = item.status === 1;
				return {
					date_title: `${item.shift_date} ${item.shift_type === 'day' ? '白班' : '夜班'}`,
					point_card: {
						point_name: pName,
						has_feedback: hasFeedback,
						photos: getPhotos(hasFeedback ? item : null, pointConfig, pName),
						footer_text: getFooter(item, hasFeedback, pointConfig, item.shift_date, item.shift_type)
					}
				};
			});
			res.total = feedbackRes.total; // 透传数据库总数
		}

		return res;
	}
};
