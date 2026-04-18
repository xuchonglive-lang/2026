module.exports = {
	/**
	 * 查询多条记录 分页
	 * @url client/user/kh/analyse/getChartDataForDrill  前端调用的url参数地址
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
		let dbName = "grouting";
		let drill_id=data.drill_id
		res = await vk.baseDao.selects({
			dbName,
			data,
			pageIndex: 1,
			pageSize: 5000,
			//  日期范围  并且  点位  point_id
			whereJson: {
				drill_id,
				water_shift:_.gt(0)
			},

			
			// 副表排序规则
			sortArr: [{
				"name": "_add_time",
				"type": "asc"
			}],
			
		});


	
		let chartDataOfWaterOfDrill = {}; //出水图表对象
	
		
		/*******************************************第一个图表的数据 开始*****************************************************/
		let xzhou= []; //X轴 孔号
		let water= []; //单班出水量
		/*******************************************第一个图表的数据** 结束***************************************************/
		
	


		// 这里添加一个代码，主要用于将json对象添加新的属性，将dirll 对象中的属性拉取出来变成一级属性
		res.rows.forEach(item => {
			if (item.g_shift == 1) {
				item.shift = "白班";
			}
			if (item.g_shift == 2) {
				item.shift = "夜班";
			}
		     xzhou.push(item.g_date.slice(5, 10)+item.shift);
			 water.push(item.water_shift.toFixed(1));
	
		})
		// 上述方法是错误的方法
		// chartData={"categories":xzhou,"series":[{"name":"注浆量"，"data":groutingNum},{"name":"涌水量"，"data":yongshuiNum}]}  

		// 这里是第一个图，注浆量和涌水量------------------------------start
		chartDataOfWaterOfDrill.categories = xzhou;
		
		
		
		let seriresAarry = [];
		let line1 = {};
		line1.name = "涌水量(m³/h)";
		line1.data = water;
		
		seriresAarry.push(line1);

		
		chartDataOfWaterOfDrill.series = seriresAarry;

		res.chartDataOfWaterForDrill=chartDataOfWaterOfDrill;

		return res;
	}

}
