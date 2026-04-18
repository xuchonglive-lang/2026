module.exports = {
	/**
	 * 查询多条记录 分页
	 * @url client/user/kh/analyse/getGroutingForDrill  前端调用的url参数地址
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
		let drill_id = data.drill_id
		res = await vk.baseDao.selects({
			dbName,
			data,
			pageIndex: 1,
			pageSize: 5000,
			//  日期范围  并且  点位  point_id
			whereJson: _.and([{
					drill_id
				},
				_.or([{
						depth90_drill: _.gt(0)
					},
					{
						depth90_drill_sao: _.gt(0)
					}
				])
			]),
			// 强制字段显示规则
			fieldJson: {


			},
			// 副表排序规则
			sortArr: [{
				"name": "g_date",
				"type": "desc"
			}]
		});

		res.rows.forEach(item => {
			if (item.g_shift == 1) {
				item.shift = "白班";
			}
			if (item.g_shift == 2) {
				item.shift = "夜班";
			}
		});

		return res;
	}

}
