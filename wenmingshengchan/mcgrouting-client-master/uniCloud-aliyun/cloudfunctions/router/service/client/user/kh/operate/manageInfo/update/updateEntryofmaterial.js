'use strict';
module.exports = {
	/**
	 * 此函数名称
	 * @url client/user/kh/operate/manageInfo/update/updateEntryofmaterial 前端调用的url参数地址
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
		let materials = { code : 0, msg : '' };
		let teams = { code : 0, msg : '' };
		let rockshafts = { code : 0, msg : '' };
		let team_id=data.team_id
		let material_id=data.material_id
		let rock_id=data.rock_id
		
		// 业务逻辑开始-----------------------------------------------------------
			materials.item = await vk.baseDao.findById({
				dbName:"material",
				id:material_id,
				fieldJson:{
		
				}
			});
			
			teams.item = await vk.baseDao.findById({
				dbName:"team",
				id:team_id,
				fieldJson:{
					
				}
			});
			rockshafts.item = await vk.baseDao.findById({
				dbName:"rockshaft",
				id:rock_id,
				fieldJson:{
					
				}
			});
		
		
		/* 这里获取到了材料与单位的名称 */
		let material_name=materials.item.material_name
		let team_name=teams.item.team_name
		let rock_name=rockshafts.item.rock_name
		let num = await vk.baseDao.update({
		  dbName:"entryofmaterial", // 表名
		  whereJson:{ // 条件
		    _id:data.entryofmaterial_id,
		  },
		  dataJson:{ // 需要修改的数据
		   "e_date":data.e_date,
		   "remark":data.remark,
		   "e_shift":data.e_shift,
		   "num":data.num,
		   "team_id":data.team_id,
		   "material_id":data.material_id,
		   "team_name":team_name,
		   "material_name":material_name		,
		   "rock_id":data.rock_id,
		   "rock_name":rock_name
		  }
		});
		
		
		
		
		
		
		if(num){
			res.code=0;
			res.msg="信息更新成功"
		}else{
			res.code=-1;
			res.msg="系统故障，更新不成功"
		}
		




		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
