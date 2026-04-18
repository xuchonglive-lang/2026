'use strict';
module.exports = {
	/**
	 * 此函数名称
	 * @url client/user/kh/operate/manageInfo/delete/deleteGrouting 前端调用的url参数地址
	 * data 请求参数
	 * @params {String} params1  参数1
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { customUtil, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : '' };
		
		// 业务逻辑开始-----------------------------------------------------------
		// 可写与数据库的交互逻辑等等
		// 返回被修改的记录条数
		// 返回被删除的记录条数
		
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
			console.log('这里有值吗ggg？',grouting)
		console.log('这里有值吗？',drill)
		
		
		// 第二步，对drill对象进行还原更新
	
		// 存在对应的钻孔对象时，更新其累计值和关键信息
		if (drill) {
			// 下面是对钻孔深度、扫孔深度、总出水量、水泥总消耗量、水玻璃总消耗量进行累计计算，每次都要判断是否是第一次填写，因此用到了三元表达式
			drill.depth_drillsum = (drill.depth_drillsum ? drill.depth_drillsum : 0) -grouting.depth90_drill
			drill.depth_drillsaosum = (drill.depth_drillsaosum ? drill.depth_drillsaosum : 0) - grouting
				.depth90_drill_sao
			drill.water_sum = (drill.water_sum ? drill.water_sum : 0) - grouting.water_shift
			drill.cement_sum = (drill.cement_sum ? drill.cement_sum : 0) - grouting.cement_sdone
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
		
		
		
		
	
	
		
		let num = await vk.baseDao.del({
		  dbName:"grouting",
		  whereJson:{
		   _id:data.grouting_id,
		  }
		});

		if(num){
			res.code=0;
			res.msg="删除成功"
		}else{
			res.code=-1;
			res.msg="系统故障，删除不成功"
		}
		




		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
