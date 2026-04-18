module.exports = {
	/**
	 * 查询多条记录 分页
	 * @url client/user/kh/analyse/getAllDrillsForPoint  前端调用的url参数地址
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
		let dbName = "drill";
		res = await vk.baseDao.selects({
			dbName,
			data,
			pageIndex: 1,
			pageSize: 5000,
			//  日期范围  并且  点位  point_id
			whereJson: {
				point_id: data.point_id
			},

			// 强制字段显示规则
			fieldJson: {

			},
			// 副表排序规则
			sortArr: [{
				"name": "sort",
				"type": "asc"
			}],
			
		});


		// 构建uchart的数据     为对象组成    其中 一个图的数据为一个对象{}，其中属性为
		let chartDataArr = [];//这里放的是所有图表对象的数组，要用的时候就从这里拿就行了
		let chartDataOfDrill = {}; //打孔和扫孔柱状图图表对象
		let chartDataOfXiaohao = {}; //材料消耗孔柱状图图表对象
		let chartDataOfWater = {}; //涌水的图表
		// let chartData2 = {}; //钻进量图表对象
		// let chartData3 = {}; //注浆效率图表对象
		
		/*******************************************第一个图表的数据 开始*****************************************************/
		let xzhouForDrillname = []; //X轴 孔号
		let depth_design = []; //设计孔深
		let depth_drillsum = []; //累计打孔
		let depth_drillsaosum = []; //累计扫孔
		/*******************************************第一个图表的数据** 结束***************************************************/
		
		
		/*******************************************第二个图表的数据 开始*****************************************************/
		// let xzhouForDrillname = []; //X轴 孔号
		let cement_sum = []; //累计水泥消耗量
		let waterglass_sum = []; //累计水玻璃消耗
		/*******************************************第二个图表的数据** 结束***************************************************/
		
		/*******************************************第三个图表的数据 开始*****************************************************/
		// let xzhouForDrillname = []; //X轴 孔号
		let water_sum = []; //累计水泥消耗量
	
		/*******************************************第三个图表的数据** 结束***************************************************/
		// let groutingNum = []; //注浆量
		// let yongshuiNum = []; //涌水量数据
		// let zuanjinNum = []; //钻进量
		// let zhujiangxiaolv = []; //注浆效率


        //********************修改了函数，因为程序错误，每个孔的累计打孔深度总会出现错误，因此每次在获取孔数集合的时候进行更新一次 添加于2022-6-13日 */
        for (var j = 0; j < res.rows.length; j++) {
			
			
			let resultres = await vk.baseDao.select({
				dbName:"grouting",
				pageIndex:1,
				pageSize:10000,
				whereJson:{
					drill_id:res.rows[j]._id
				}
			});
			let allGroutingsOfDrill=resultres.rows
			console.log("什么值？",resultres.rows)
			
			let depth_drillsum=0;
			let depth_drillsaosum=0;
			let cement_sum=0;
			let waterglass_sum=0;
			let water_sum=0;
			for (var i = 0; i < allGroutingsOfDrill.length; i++) {
				depth_drillsum=depth_drillsum+allGroutingsOfDrill[i].depth90_drill
				depth_drillsaosum=depth_drillsaosum+allGroutingsOfDrill[i].depth90_drill_sao
				cement_sum=cement_sum+allGroutingsOfDrill[i].cement_sdone
				waterglass_sum=waterglass_sum+allGroutingsOfDrill[i].waterglass_sdone
				water_sum=water_sum+allGroutingsOfDrill[i].water_shift
			}
			res.rows[j].depth_drillsum=depth_drillsum;
			res.rows[j].depth_drillsaosum=depth_drillsaosum;
			res.rows[j].cement_sum=cement_sum;
			res.rows[j].waterglass_sum=waterglass_sum;
			res.rows[j].water_sum=water_sum;
			
			
			
		}
		
 //********************修改了函数，因为程序错误，每个孔的累计打孔深度总会出现错误，因此每次在获取孔数集合的时候进行更新一次 添加于2022-6-13日 */




		// 这里添加一个代码，主要用于将json对象添加新的属性，将dirll 对象中的属性拉取出来变成一级属性
		res.rows.forEach(item => {
			
		
			
			
			
			
			// 这里是绘制图表参数
			xzhouForDrillname.push(item.drill_name);
			depth_design.push(item.depth_design);
			
			if(item.depth_drillsum>0){
				depth_drillsum.push(item.depth_drillsum.toFixed(1));
			}else{
				item.depth_drillsum=0;
				depth_drillsum.push(0);
			}
			if(item.depth_drillsaosum>0){
				depth_drillsaosum.push(item.depth_drillsaosum.toFixed(1));
			}else{
				item.depth_drillsaosum=0;
				depth_drillsaosum.push(0);
			}
			if(item.cement_sum>0){
				cement_sum.push(item.cement_sum.toFixed(1));
			}else{
				item.cement_sum=0;
				cement_sum.push(0);
			}
			if(item.waterglass_sum>0){
				waterglass_sum.push(item.waterglass_sum.toFixed(1));
			}else{
				item.waterglass_sum=0;
				waterglass_sum.push(0);
			}
			if(item.water_sum>0){
				water_sum.push(item.water_sum.toFixed(1));
			}else{
				item.water_sum=0;
				water_sum.push(0);
			}
			
			if(!item.pressure_start){
				item.pressure_start=0
			}
			if(!item.pressure_end){
				item.pressure_end=0
			}
			
			
			
			
			// 这里是将出水点位的信息进行一维赋值
			
			if(item.chushui){
				let temp=""
				item.chushui.forEach((it,index) => {
					
					temp+="第"+(index+1)+"处深度为"+it.depth+'m，反馈人'+it.reporter+";"
				});
				item.chushuidian=temp
			}else{
				
				item.chushuidian="未知";
			}
			if(item.duanceng){
				// 这里是将出水点位的信息进行一维赋值
				let temp1=""
				item.duanceng.forEach((it2,index2) => {
					
					temp1+="第"+(index2+1)+"处深度为"+it2.depth+'m，反馈人'+it2.reporter+";"
				});
				item.duancengdian=temp1
			}else{
				item.duancengdian="未知";
			}
	
			
		})
		// 上述方法是错误的方法
		// chartData={"categories":xzhou,"series":[{"name":"注浆量"，"data":groutingNum},{"name":"涌水量"，"data":yongshuiNum}]}  

		// 这里是第一个图，注浆量和涌水量------------------------------start
		chartDataOfDrill.categories = xzhouForDrillname;
		chartDataOfXiaohao.categories=xzhouForDrillname;
		chartDataOfWater.categories=xzhouForDrillname;

		
		/*******************************************第一个图表的数据 开始*****************************************************/
		let seriresAarry = [];
		let zhuzi1 = {};
		zhuzi1.name = "设计孔深(m)";
		zhuzi1.data = depth_design;
		
		let zhuzi2 = {};
		zhuzi2.name = "累计钻孔深度(m)";
		zhuzi2.data = depth_drillsum;
		
		let zhuzi3 = {};
		zhuzi3.name = "累计扫孔深度(m)";
		zhuzi3.data = depth_drillsaosum;

		seriresAarry.push(zhuzi1);
		seriresAarry.push(zhuzi2);
		seriresAarry.push(zhuzi3);

		chartDataOfDrill.series = seriresAarry;
	/*******************************************第一个图表的数据 开始*****************************************************/
	
	
	
	/*******************************************第二个图表的数据 开始*****************************************************/
		let seriresAarryx1 = [];
		let zhuzix1 = {};
		zhuzix1.name = "水泥消耗量(t)";
		zhuzix1.data = cement_sum;
		
		let zhuzix2 = {};
		zhuzix2.name = "水玻璃消耗量(t)";
		zhuzix2.data = waterglass_sum;

		seriresAarryx1.push(zhuzix1);
		seriresAarryx1.push(zhuzix2);

	
		chartDataOfXiaohao.series = seriresAarryx1;
	/*******************************************第二个图表的数据 开始*****************************************************/
	
	
	/*******************************************第三个图表的数据 开始*****************************************************/
		let seriresAarryx2 = [];
		let zhuziw = {};
		zhuziw.name = "涌水量(m³)";
		zhuziw.data = water_sum;
		
		
	
		seriresAarryx2.push(zhuziw);
	
	
	
		chartDataOfWater.series = seriresAarryx2;
	/*******************************************第三个图表的数据 开始*****************************************************/


		// 将三个对象全部塞进一个数组对象中，将其作为属性赋值给res对象
		chartDataArr.push(chartDataOfDrill);
		chartDataArr.push(chartDataOfXiaohao);
		chartDataArr.push(chartDataOfWater);
		// chartDataArr.push(chartData2);
		// chartDataArr.push(chartData3);
		
		
		res.chartDataArr=chartDataArr;

		return res;
	}

}
