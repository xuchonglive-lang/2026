module.exports = {
	/**
	 * 查询多条记录 分页
	 * @url client/user/kh/common/getDescentofmaterialById  前端调用的url参数地址
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
		let { uniID, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: 'ok' };
		// 业务逻辑开始-----------------------------------------------------------
		res.item = await vk.baseDao.findById({
			dbName: "descentofmaterial",
			id: data._id,
			fieldJson: {

			}
		});


		if (res.item.d_shift == 1) {
			res.item.shift = "白班";
		}
		if (res.item.d_shift == 2) {
			res.item.shift = "夜班";
		}


		// 对应的sql:
		// select * from vk-test where _id = "5f3a125b3d11c6000106d338"
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}

}
