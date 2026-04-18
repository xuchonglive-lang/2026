module.exports = {
	/**
	 * 查询多条记录 分页
	 * @url client/user/kh/report/getRockList 前端调用的url参数地址
	 * data 请求参数 说明
	 * @param {Number}         pageIndex 当前页码
	 * @param {Number}         pageSize  每页显示数量
	 * @param {Array<Object>}  sortRule  排序规则
	 * @param {object}         formData  查询条件数据源
	 * @param {Array<Object>}  columns   查询条件规则
	 * res 返回参数说明
	 * @param {Number}         code      错误码，0表示成功
	 * @param {String}         msg       详细信息
	 */
	main: async (event) => {
		let {
			data = {}, userInfo, util, filterResponse, originalParam
		} = event;
		let {
			customUtil,
			uniID,
			config,
			pubFun,
			vk,
			db,
			_
		} = util;
		let {
			uid
		} = data;
		let res = {
			code: 0,
			msg: ''
		};
		// 业务逻辑开始-----------------------------------------------------------
		let dbName = "rockshaft";
		res = await vk.baseDao.selects({
			pageIndex: 1,
			pageSize: 5000,
			dbName,
			// 主表where条件
			whereJson: {

			},
		});


		// res  代表是井的集合，就是一般会有3回和3副两个井

		// 这里定义两个变量，一个变量是grouting单量，这里有值班人的姓名和头像，另一个变量是一个boolean值，
		// havePoint  如果是false就代表这个井没有注浆点位就不显示
		let grouting = {}
        let grouting2 = {}   //这个用与兼容以前的开发思路，用来判断时间是否倒退，意思就是全天都搞不到一个注浆记录，就应该回退到昨天


		let result = res.rows
		let len = result.length
		console.log("len?", len);
		// 将两个井进行循环，因为进场主要是针对井来进场
		for (let i = 0; i < len; i++) {
			grouting={}
   
			// 下面是对井的的材料进场信息进行拼凑
			let entrys = {
				code: 0,
				msg: ''
			};
			entrys = await vk.baseDao.selects({
				pageIndex: 1,
				pageSize: 5000,
				dbName: "entryofmaterial",
				// 主表where条件
				whereJson: {
					rock_id: result[i]._id,
					e_date: data.date,
					e_shift: data.shift,

				}
			});
			
			// 因为是循环，i是一个井的循环






			// 下面是对井的点位--注浆--下井进行拼凑
			let havePoint = false
			console.log("能进来吗？")
			let points = {
				code: 0,
				msg: ''
			};
			points = await vk.baseDao.selects({
				pageIndex: 1,
				pageSize: 5000,
				dbName: "point",
				// 主表where条件
				whereJson: {
					rock_id: result[i]._id,
					complete: 1,
					view: 2
				}
			});
			let result2 = points.rows
			let len2 = result2.length
			if (len2) {
				havePoint = true
			}
			// 上面主要是看看有没有注浆点位，
			
			
			
			// 如果有点位，就对点位进行循环，然后将注浆对象进行赋值给这个点位
			for (let j = 0; j < len2; j++) {
				
				let groutings = {
					code: 0,
					msg: ''
				};
				groutings = await vk.baseDao.selects({
					pageIndex: 1,
					pageSize: 5000,
					dbName: "grouting",
					// 主表where条件
					whereJson: {
						g_date: data.date,
						g_shift: data.shift,
						point_id: result2[j]._id
					},
					// 副表列表
					foreignDB: [{
						dbName: "drill", // 副表名
						localKey: "drill_id", // 主表外键字段名
						foreignKey: "_id", // 副表外键字段名
						as: "drill",
						limit: 1, // 当limit = 1时，以对象形式返回，否则以数组形式返回
						// 副表where条件
						whereJson: {

						},
						// 副表字段显示规则
						fieldJson: {

						}
					}],
				});

				// 这里要循环下groutings.rows，然后获取这个点位的当天累计钻进量、水泥消耗、水玻璃消耗
				let sumzuanjin = 0;
				let sumshuini = 0;
				let sumshuiboli = 0;
				groutings.rows.forEach(its => {
					sumzuanjin = sumzuanjin + its.depth90_drill;
					sumshuini = sumshuini + its.cement_sdone;
					sumshuiboli = sumshuiboli + its.waterglass_sdone;

				})



				result2[j].groutingList = groutings.rows
				result2[j].sumzuanjin = sumzuanjin
				result2[j].sumshuini = sumshuini
				result2[j].sumshuiboli = sumshuiboli
				// 每个点位当天的钻进、水泥、水玻璃消耗量进行累计


				// 这里就将第一条grouting 赋值给 grouting了，用于显示白班、或者夜班的人员信息
				
				
				
				
				let index=0;
				let length=0;
				if(groutings.rows.length){
					index=groutings.rows.length-1;
					length=groutings.rows.length;
				}
				if(length>0){
					grouting = groutings.rows[index]
				}
				
				if(JSON.stringify(grouting2)=='{}'){
					grouting2=groutings.rows[0]
				}
				// if(groutings.rows.length>0){grouting = groutings.rows[0]}
				// if(!that.usergrouting_bai&&!that.usergrouting_ye){
				// 	that.date=that.$util.getBeforeDate(1)
				// 	that.getAllRock2()
				// 	return
				// }
				// 在vue中判断是有问题的，应该    !（that.usergrouting_bai&&that.usergrouting_ye

				console.log("看看这里的point_id值是多少？", result2[j].point_id)
				let descentMaterials = {
					code: 0,
					msg: ''
				};
				descentMaterials = await vk.baseDao.selects({
					pageIndex: 1,
					pageSize: 5000,
					dbName: "descentofmaterial",
					// 主表where条件
					whereJson: {
						d_date: data.date,
						d_shift: data.shift,
						point_id: result2[j]._id
					}
				});
				result2[j].descentMaterialList = descentMaterials.rows


			}

			points.rows = result2

			console.log("这里能查询出来值吗？", points.rows)
			console.log("这里能查询出来值吗？", JSON.stringify(points.rows))



			result[i].pointList = points.rows
			// 这里加一个统计一个井所有点位的总钻进量、水泥消耗量


			let sumzuanjinAllpoint = 0;
			let sumshuiniAllpoint = 0;
			let sumshuiboliAllpoint = 0;
			result[i].pointList.forEach(i => {
				sumzuanjinAllpoint = sumzuanjinAllpoint + i.sumzuanjin;
				sumshuiniAllpoint = sumshuiniAllpoint + i.sumshuini;
				sumshuiboliAllpoint = sumshuiboliAllpoint + i.sumshuiboli;

			})

			//将每个井的当天总施工量进行了统计
			result[i].sumzuanjinAllpoint = sumzuanjinAllpoint;
			result[i].sumshuiniAllpoint = sumshuiniAllpoint;
			result[i].sumshuiboliAllpoint = sumshuiboliAllpoint;


			result[i].havePoint = havePoint
			result[i].groutingtest = grouting
			result[i].entryMaterialList = entrys.rows


		}


		res.rows = result
		
		res.grouting = grouting2




		return res;
	}

}
