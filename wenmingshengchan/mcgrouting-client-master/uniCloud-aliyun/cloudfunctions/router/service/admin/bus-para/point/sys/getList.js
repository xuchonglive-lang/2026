module.exports = {
	/**
	 * 查询多条记录 分页
	 * @url admin/bus-para/level/sys/getList 前端调用的url参数地址
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
		let dbName = "point";
		res = await vk.baseDao.getTableData({
			dbName,
			data,
			// 强制where条件，比如这里设置了只能查询当前登录用户的数据
			// whereJson: {
			//   user_id:uid
			// }, 
			// 强制字段显示规则
			fieldJson: {

			},
			// 默认排序规则
			sortArr: [
				
			],
			// 副表列表
			foreignDB: [{
				dbName: "rockshaft", // 副表名
				localKey: "rock_id", // 主表外键字段名
				foreignKey: "_id", // 副表外键字段名
				as: "rockshaft",
				limit: 1, // 当limit = 1时，以对象形式返回，否则以数组形式返回
				// 副表where条件
				whereJson: {},
				// 副表字段显示规则
				fieldJson: {
					rock_name:true
				},
				// 副表排序规则
				sortArr: [{
					"name": "_id",
					"type": "desc"
				}],
			}, ],
			
			// 聚合结束后的where条件
			lastWhereJson: {

			}
		});
		
		return res;
	}

}
