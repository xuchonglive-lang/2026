module.exports = {
	/**
	 * 修改数据
	 * @urladmin/bus-para/rockshaft/update 前端调用的url参数地址
	 * data 请求参数 说明
	 * res 返回参数说明
	 * @param {Number} code 错误码，0表示成功
	 * @param {String} msg 详细信息
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { customUtil, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : '' };
		
		// 业务逻辑开始-----------------------------------------------------------
		// 可写与数据库的交互逻辑等等
		// 这里涉及到dirll的数据，逻辑相当复杂--------要先删除本次grouting对drill的操作影响，然后再执行一次新的drill数据更新操作----------------------------------------
		
		// 先执行一遍删除操作
		
		// 删除前需要对对应的dirll的信息进行还原，因为添加时已经进行过累加（真的麻烦）
		
		// 第一步得到 drill对象与 grouting对象 
		
		let result = { code: 0, msg: 'ok' };
		let result2 = { code: 0, msg: 'ok' };
			
		
		result2.item = await vk.baseDao.findById({
			dbName: "grouting",
			id: data.grouting_id,
			fieldJson: {
		
			}
		});
		
		result.item = await vk.baseDao.findById({
			dbName: "drill",
			id: result2.item.drill_id,
			fieldJson: {
		
			}
		});
		
		let drill = result.item
		let grouting=result2.item
		
		
		// 第二步，对drill对象进行还原更新
			
		// 存在对应的钻孔对象时，更新其累计值和关键信息
		if (drill) {
			// 下面是对钻孔深度、扫孔深度、总出水量、水泥总消耗量、水玻璃总消耗量进行累计计算，每次都要判断是否是第一次填写，因此用到了三元表达式
			drill.depth_drillsum = (drill.depth_drillsum?drill.depth_drillsum:0) -grouting.depth90_drill
			drill.depth_drillsaosum = (drill.depth_drillsaosum?drill.depth_drillsaosum : 0) - grouting
				.depth90_drill_sao
			drill.water_sum = (drill.water_sum?drill.water_sum:0)-grouting.water_shift
			drill.cement_sum = (drill.cement_sum ? drill.cement_sum:0) - grouting.cement_sdone
			drill.waterglass_sum = (drill.waterglass_sum ? drill.waterglass_sum : 0) - grouting.waterglass_sdone
			// 初压是当drill对象没有的时候才给入，只填写一次，如果删除，要将此对象置空，因此这个值只会出现一次
			
			// 终压每次都更新，如果删除，就不用管它。以后会重复叠加，要想删除的时候更新他，很麻烦，要找到最新的一次钻孔对象，并更新，先偷懒不管他
			
		
			// 层段与出水的问题， 并不是每次都有，因此需要有一个数组进行记录，如果是删除，那么需要shift（）操作
		
			if (grouting.duanceng) {
				// let dcitem={}
				// dcitem.date=data.g_date
				// dcitem.shift=data.g_shift=='1'?'白班':'夜班'
				// dcitem.reporter=userInfo.realName
				// dcitem.avatar=userInfo.avatar
				// dcitem.depth=data.duanceng
				
				
				if (drill.duanceng) {
					drill.duanceng.pop()
				}
				
			}
			if (grouting.chushui) {
				// let csitem={}
				// csitem.date=data.g_date
				// csitem.shift=data.g_shift=='1'?'白班':'夜班'
				// csitem.reporter=userInfo.realName
				// csitem.avatar=userInfo.avatar
				// csitem.depth=data.chushui
				
				if (drill.chushui) {
					drill.chushui.pop()
				}
				
			}
		
			// 这里该如何写，需要进行思考
		
		
		
		
		
		
			// 如何写
		}
		
		let newInfo = await vk.baseDao.updateById({
			dbName: "drill",
			id: grouting.drill_id,
			dataJson: {
				"depth_drillsum": drill.depth_drillsum,
				"depth_drillsaosum": drill.depth_drillsaosum,
				"water_sum": drill.water_sum,
				"cement_sum": drill.cement_sum,
				"waterglass_sum": drill.waterglass_sum,
				// "pressure_start": drill.pressure_start,
				// "pressure_end": drill.pressure_end,
				"duanceng": drill.duanceng,
				"chushui": drill.chushui
		
			},
			getUpdateData: true, // 去掉getUpdateData，则不会返回修改后的数据对象
		});
		
		
		
		
		
		
		
		
		
		
		
		// 再执行一遍新增操作（在执行添加之后）
		
		
		
		
		
		
		
		// 得到point的rlp_string 对象
		
		let info = await vk.baseDao.findByWhereJson({
			dbName: "point",
			whereJson: {
				_id: data.drill_ids[1],
			}
		});
		
		// 返回被修改的记录条数
		let num = await vk.baseDao.update({
		  dbName:"grouting", // 表名
		  whereJson:{ // 条件
		    _id:data.grouting_id,
		  },
		  dataJson:{ // 需要修改的数据
		  "g_date": data.g_date,
		  "remark": data.remark,
		  "g_shift": data.g_shift,
		  "drill_id": data.drill_id,
		  "drill_ids": data.drill_ids,
		 "point_id":data.drill_ids[1],
		 "rlp_string":info.rlp_string,
		  "depth90_drill": data.depth90_drill,
		  "depth90_drill_sao": data.depth90_drill_sao,
		  "water_shift": data.water_shift,
		  "cement_sdone": data.cement_sdone,
		  "waterglass_sdone": data.waterglass_sdone,
		  "pressure_start": data.pressure_start,
		  "pressure_end": data.pressure_end,
		  "single_ratio": data.single_ratio,
		  "single_amount": data.single_amount,
		  "double_ratio": data.double_ratio,
		  "double_wgamount": data.double_wgamount,
		  "double_dwamount": data.double_dwamount,
		  "grouting_time": data.grouting_time,
		  "realName": userInfo.realName,
		  "avatar": userInfo.avatar,
		  "nickname": userInfo.nickname,
		  "user_id": userInfo._id,
		  "duanceng": data.duanceng,
		  "chushui": data.chushui,
		  }
		});
		
		
		
		
		
		
		if(num){
			res.code=0;
			res.msg="信息更新成功"
			// 添加成功后 获取drill的对象，加上累计数
			let result = { code: 0, msg: 'ok' };
			// 业务逻辑开始-----------------------------------------------------------
			result.item = await vk.baseDao.findById({
				dbName: "drill",
				id: data.drill_id,
				fieldJson: {
			
				}
			});
			let drill = result.item
			// 存在对应的钻孔对象时，更新其累计值和关键信息
			if (drill) {
				// 下面是对钻孔深度、扫孔深度、总出水量、水泥总消耗量、水玻璃总消耗量进行累计计算，每次都要判断是否是第一次填写，因此用到了三元表达式
				drill.depth_drillsum = (drill.depth_drillsum ? drill.depth_drillsum : 0) + data.depth90_drill
				drill.depth_drillsaosum = (drill.depth_drillsaosum ? drill.depth_drillsaosum : 0) + data
					.depth90_drill_sao
				drill.water_sum = (drill.water_sum ? drill.water_sum : 0) + data.water_shift
				drill.cement_sum = (drill.cement_sum ? drill.cement_sum : 0) + data.cement_sdone
				drill.waterglass_sum = (drill.waterglass_sum ? drill.waterglass_sum : 0) + data.waterglass_sdone
				// 初压是当drill对象没有的时候才给入，只填写一次，如果删除，要将此对象置空，因此这个值只会出现一次
				if (!drill.pressure_start) {
					drill.pressure_start = data.pressure_start
				}
				// 终压每次都更新，如果删除，就不用管它。以后会重复叠加，要想删除的时候更新他，很麻烦，要找到最新的一次钻孔对象，并更新，先偷懒不管他
				if (data.pressure_end>0) {
					drill.pressure_end = data.pressure_end			
				}
			
				// 层段与出水的问题， 并不是每次都有，因此需要有一个数组进行记录，如果是删除，那么需要shift（）操作
			
				if (data.duanceng) {
					let dcitem={}
					dcitem.date=data.g_date
					dcitem.shift=data.g_shift=='1'?'白班':'夜班'
					dcitem.reporter=userInfo.realName
					dcitem.avatar=userInfo.avatar
					dcitem.depth=data.duanceng
					
					
					if (drill.duanceng) {
						drill.duanceng.push(dcitem)
					}else{
						drill.duanceng=[],
						drill.duanceng.push(dcitem)
					}
					
				}
				if (data.chushui) {
					let csitem={}
					csitem.date=data.g_date
					csitem.shift=data.g_shift=='1'?'白班':'夜班'
					csitem.reporter=userInfo.realName
					csitem.avatar=userInfo.avatar
					csitem.depth=data.chushui
					
					if (drill.chushui) {
						drill.chushui.push(csitem)
					}else{
						drill.chushui=[],
						drill.chushui.push(csitem)
					}
					
				}
			
				// 这里该如何写，需要进行思考
			
			
			
			
			
			
				// 如何写
			}
			
			let newInfo = await vk.baseDao.updateById({
				dbName: "drill",
				id: data.drill_id,
				dataJson: {
					"depth_drillsum": drill.depth_drillsum,
					"depth_drillsaosum": drill.depth_drillsaosum,
					"water_sum": drill.water_sum,
					"cement_sum": drill.cement_sum,
					"waterglass_sum": drill.waterglass_sum,
					"pressure_start": drill.pressure_start,
					"pressure_end": drill.pressure_end,
					"duanceng": drill.duanceng,
					"chushui": drill.chushui
			
				},
				getUpdateData: true, // 去掉getUpdateData，则不会返回修改后的数据对象
			});
			
		}else{
			res.code=-1;
			res.msg="系统故障，更新不成功"
		}
		
		
		
		
		
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}

}
