module.exports = {
	/**
	 * 查询多条记录 分页
	 * @url client/user/kh/analyse/getAllGroutingForPoint  前端调用的url参数地址
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
		res = await vk.baseDao.selects({
			dbName,
			data,
			pageIndex: 1,
			pageSize: 5000,
			//  日期范围  并且  点位  point_id
			whereJson: {
				// g_date : _.gte(data.g_dateStart).lte(data.g_dateEnd)  
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
		return res;
	}

}
