module.exports = {
	/**
	 * 查询多条记录 分页
	 * @url client/user/kh/getDataForTable/getDataForTable2  前端调用的url参数地址
	 * data 请求参数 说明
	 * @params {String} tableName 	表名
	 * @params {String} addTime 		搜索开始时间
	 * @params {String} endTime 		搜索截止时间
	 * @params {String} searchvalue 搜索指定内容
	 * @params {Number} pageIndex 	当前页码
	 * @params {Number} pageSize 		每页显示数量
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 */
	main: async (event) => {
		let {
			data = {}, userInfo, util, filterResponse, originalParam
		} = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------

		let point_id = data.point_id
		
		// 业务逻辑开始-----------------------------------------------------------
		// 添加成功后 获取drill的对象，加上累计数





		/***************查询材料进场信息*****************************************************************************************************/
		let entry = { code: 0, msg: '' };
		entry = await vk.baseDao.selects({
			dbName: "entryofmaterial",
			data,
			pageIndex: 1,
			pageSize: 500,
			//  日期范围  并且  点位  point_id
			whereJson: {
				e_date: _.gte(data.g_dateStart).lte(data.g_dateEnd),
				rock_id: data.rock_id,
				team_id: data.team_id,
				
				
			},
			// 强制字段显示规则
			fieldJson: {


			},
			// 副表排序规则
			sortArr: [{
				"name": "e_date",
				"type": "desc"
			}]
		});
		/****************查询材料进场信息****************************************************************************************************/

		/****************查询材料下井信息****************************************************************************************************/
		let descent = { code: 0, msg: '' };
		descent = await vk.baseDao.selects({
			dbName: "descentofmaterial",
			data,
			pageIndex: 1,
			pageSize: 500,
			//  日期范围  并且  点位  point_id
			whereJson: {
				d_date: _.gte(data.g_dateStart).lte(data.g_dateEnd),
				point_id: data.point_id
			},

			// 强制字段显示规则
			fieldJson: {


			},
			// 副表排序规则
			sortArr: [{
				"name": "d_date",
				"type": "desc"
			}]
		});
		/****************查询材料下井信息****************************************************************************************************/

		// 构建uchart的数据     为对象组成    其中 一个图的数据为一个对象{}，其中属性为
		let chartDataArr2 = []; //里面存储的是到场与下井材料的图表信息
		
		let entryChartData={};   //进场图表
		let descentChartData={};  //下井图表
		

		let xzhou2 = []; //到场图表的x轴
		let xzhou3 = []; //下井图表的x轴

		let eshuininum = []; //到场水泥和水玻璃数
		let eshuibolinum = [];

		let dshuininum = []; //下井水泥和水玻璃数
		let dshuibolinum = [];

		// 这里添加一个代码，  图表要区分出水泥还是水玻璃
		// 主要用于将json对象添加新的属性，将dirll 对象中的属性拉取出来变成一级属性（）
		// 这里添加一个代码，主要用于将json对象添加新的属性，将dirll 对象中的属性拉取出来变成一级属性
		entry.rows.forEach(item1 => {
			if (item1.e_shift == 1) {
				item1.shift = "白班";
			}
			if (item1.e_shift == 2) {
				item1.shift = "夜班";
			}

			xzhou2.push(item1.e_date.slice(5, 10) + item1.shift);
			//这里有两个柱子，一个柱子是水泥量，一个是水玻璃量
			if (item1.material_name == '水泥') {
				eshuininum.push(item1.num)
				eshuibolinum.push(0)
			}
			if (item1.material_name == '水玻璃') {
				eshuibolinum.push(item1.num)
				eshuininum.push(0)
			}
		})

		//  完善柱子对象

		let ezhuzi1 = {};
		ezhuzi1.name = "水泥进场量(t)";
		ezhuzi1.data = eshuininum;

		let ezhuzi2 = {};
		ezhuzi2.name = "水玻璃进场量(t)";
		ezhuzi2.data = eshuibolinum;
		
		// 这里X轴的对象，需要将柱子对象要push进去
		let eseriresAarry = [];
		eseriresAarry.push(ezhuzi1);
		eseriresAarry.push(ezhuzi2);
		
		//生成进场信息的图表
		entryChartData.series = eseriresAarry;
		// 这里是Y轴数据对象
		
		
		// 这里是第三个图，注浆效率------------------------------start
		entryChartData.categories = xzhou2;
		// 这里是X轴数据对象
		
		// 将图表1对象push到图表属性中
		chartDataArr2.push(entryChartData);
		
		//---------------------------------------------------------------完成下井图表数据的充填----------------------------
		
		
		
		
		
		
		// 这里添加一个代码，  图表要区分出水泥还是水玻璃
		// 主要用于将json对象添加新的属性，将dirll 对象中的属性拉取出来变成一级属性（）
		// 这里添加一个代码，主要用于将json对象添加新的属性，将dirll 对象中的属性拉取出来变成一级属性
		descent.rows.forEach(item2 => {
			if (item2.d_shift == 1) {
				item2.shift = "白班";
			}
			if (item2.d_shift == 2) {
				item2.shift = "夜班";
			}
		
			xzhou3.push(item2.d_date.slice(5, 10) + item2.shift);
			//这里有两个柱子，一个柱子是水泥量，一个是水玻璃量
			if (item2.material_name == '水泥') {
				dshuininum.push(item2.num)
				dshuibolinum.push(0)
			}
			if (item2.material_name == '水玻璃') {
				dshuibolinum.push(item2.num)
				dshuininum.push(0)
			}
		})
		
		//  完善柱子对象
		
		let dzhuzi1 = {};
		dzhuzi1.name = "水泥下井量(t)";
		dzhuzi1.data = dshuininum;
		
		let dzhuzi2 = {};
		dzhuzi2.name = "水玻璃下井量(t)";
		dzhuzi2.data = dshuibolinum;
		
		// 这里X轴的对象，需要将柱子对象要push进去
		let dseriresAarry = [];
		dseriresAarry.push(dzhuzi1);
		dseriresAarry.push(dzhuzi2);
		
		//生成进场信息的图表
		descentChartData.series = dseriresAarry;
		// 这里是Y轴数据对象
		
		
		// 这里是第三个图，注浆效率------------------------------start
		descentChartData.categories = xzhou3;
		// 这里是X轴数据对象
		
		// 将图表1对象push到图表属性中
		chartDataArr2.push(descentChartData);
		
		//---------------------------------------------------------------完成下井图表数据的充填----------------------------
		
		
	



		res.chartDataArr2 = chartDataArr2;
		res.entrys = entry.rows;
		res.descents = descent.rows;
		




		return res;
	}

}
