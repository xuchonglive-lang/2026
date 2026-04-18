module.exports = {
	/**
	 * 查询多条记录 分页
	 * @url client/user/kh/getDataForTable/getDataForTable  前端调用的url参数地址
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
	
		

		res = await vk.baseDao.selects({
			dbName:"grouting",
			data,
			pageIndex: 1,
			pageSize: 5000,
			//  日期范围  并且  点位  point_id
			whereJson: {
				g_date: _.gte(data.g_dateStart).lte(data.g_dateEnd)
			},

			// 强制字段显示规则
			fieldJson: {


			},
			// 副表排序规则
			sortArr: [{
				"name": "g_date",
				"type": "desc"
			}],
			// 副表列表
			foreignDB: [{
				dbName: "drill", // 副表名
				localKey: "drill_id", // 主表外键字段名
				foreignKey: "_id", // 副表外键字段名
				as: "drill",
				limit: 1, // 当limit = 1时，以对象形式返回，否则以数组形式返回
				// 副表where条件
				whereJson: {
					// point_id: data.point_id,  
				},
				// 副表字段显示规则
				fieldJson: {

				},
				// 副表排序规则
				sortArr: [{
					"name": "_id",
					"type": "desc"
				}],
			}, ],
			// 聚合结束后的where条件
			lastWhereJson: {

				"drill.point_id": data.point_id

			}
		});
	


		// 构建uchart的数据     为对象组成    其中 一个图的数据为一个对象{}，其中属性为
		let chartDataArr = [];
		let chartData1 = {}; //注浆和涌水量图表对象
		let chartData2 = {}; //钻进量图表对象
		// let chartData3 = {}; //注浆效率图表对象
		let xzhouzuan = []; //X轴 钻进
		let xzhouzzhu = []; //X轴  注浆
		// let xzhouxiaolv = []; //X轴
		let cement_sdone = []; //注浆量
		let waterglass_sdone = []; //涌水量数据
		let depth90_drill = []; //钻进量
		let depth90_drill_sao = []; //扫孔量
		// let zhujiangxiaolv = []; //注浆效率


		// 这里添加一个代码，主要用于将json对象添加新的属性，将dirll 对象中的属性拉取出来变成一级属性
		res.rows.forEach(item => {
			if (item.g_shift == 1) {
				item.shift = "白班";
			}
			if (item.g_shift == 2) {
				item.shift = "夜班";
			}
			
			// 只有当有钻进的时候才注入数据
			if(item.cement_sdone>0||item.waterglass_sdone>0){
				xzhouzzhu.push(item.g_date.slice(5, 10)+item.shift);
				cement_sdone.push(item.cement_sdone);
				waterglass_sdone.push(item.waterglass_sdone);			
			}
			 
			// 只有当有钻进的时候才注入数据
			if(item.depth90_drill>0){
				xzhouzuan.push(item.g_date.slice(5, 10)+item.shift);
				depth90_drill.push(item.depth90_drill);
						
			}	
			item.drill_name = item.drill.drill_name;		
			item.depth_design = item.drill.depth_design;
		})
		// 上述方法是错误的方法
		// chartData={"categories":xzhou,"series":[{"name":"注浆量"，"data":groutingNum},{"name":"涌水量"，"data":yongshuiNum}]}  

		// 这里是第一个图，注浆量和涌水量------------------------------start
		chartData1.categories = xzhouzzhu;

		let seriresAarry = [];
		let line1 = {};
		line1.name = "水泥注入量(t)";
		line1.data = cement_sdone;

		let line2 = {};
		line2.name = "水玻璃注入量(t)";
		line2.data = waterglass_sdone;
		seriresAarry.push(line1);
		seriresAarry.push(line2);

		chartData1.series = seriresAarry;
		// 这里是第一个图，注浆量和涌水量----------------------------------end

		// 这里是第二个图，钻进量------------------------------start
		chartData2.categories = xzhouzuan;

		let seriresAarry2 = [];
		let line3 = {};
		line3.name = "钻进量(m)";
		line3.data = depth90_drill;
		// let line4 = {};
		// line4.name = "扫孔量(m)";
		// line4.data = depth90_drill_sao;

		seriresAarry2.push(line3);
		// seriresAarry2.push(line4);

		chartData2.series = seriresAarry2;
		// 这里是第二个图，钻进量----------------------------------end


		// // 这里是第三个图，注浆效率------------------------------start
		// chartData3.categories = xzhouxiaolv;

		// let seriresAarry3 = [];
		// let line5 = {};
		// line5.name = "水泥注浆效率(t/h)";
		// line5.data = zhujiangxiaolv;

		// seriresAarry3.push(line5);


		// chartData3.series = seriresAarry3;
		// 这里是第二个图，钻进量----------------------------------end
		// 将三个对象全部塞进一个数组对象中，将其作为属性赋值给res对象
		// *********这里有变化，第一个图是钻进图，第二个图是注浆图********************************************
		chartDataArr.push(chartData2);
		chartDataArr.push(chartData1);
		
		// chartDataArr.push(chartData3);
		res.chartDataArr = chartDataArr;
		return res;
	}

}
