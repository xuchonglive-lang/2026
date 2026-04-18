module.exports = {
	/**
	 * 更新用户真实姓名
	 * @url client/user/kh/common/addRealName  前端调用的url参数地址
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
		let { data = {}, userInfo, util, originalParam } = event;
		let { uniID, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : 'ok' };
    // 业务逻辑开始-----------------------------------------------------------
	// 返回被修改的记录条数
	let num = await vk.baseDao.update({
	  dbName:"uni-id-users", // 表名
	  whereJson:{ // 条件
	    _id:userInfo._id  
	  },
	  dataJson:{ // 需要修改的数据
	    realName:data.realName
	  }
	});
	
	if(num>0){
		res.msg="真实姓名更新成功"
	}else{
		res.msg="出现错误，请重试"
	}
	
	
		
		// 对应的sql:
		// select * from vk-test where _id = "5f3a125b3d11c6000106d338"
    // 业务逻辑结束-----------------------------------------------------------
    return res;
	}

}
