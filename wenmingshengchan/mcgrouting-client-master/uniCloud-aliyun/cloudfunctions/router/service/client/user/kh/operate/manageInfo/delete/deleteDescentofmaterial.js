'use strict';
module.exports = {
	/**
	 * 此函数名称
	 * @url client/user/kh/operate/manageInfo/delete/deleteDescentofmaterial 前端调用的url参数地址
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
		let num = await vk.baseDao.del({
		  dbName:"descentofmaterial",
		  whereJson:{
		   _id:data.descentofmaterial_id,
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
