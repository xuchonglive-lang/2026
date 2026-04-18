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
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------

		let selectRes = await vk.baseDao.selects({
			pageIndex: 1,
			pageSize: 100, //写该语句是因为这里有分页，写多点
			dbName: "rockshaft",
			fieldJson: {
				label: "$rock_name",
				value: "$_id",
				_id: false
			},
			whereJson: {
				
				complete:1	

			},
			
			// 副表列表
			foreignDB: [{
				dbName: "point",
				localKey: "_id",
				foreignKey: "rock_id",
				as: "children",
				// limit: 30,
				fieldJson: {
					label: "$lp_string",
					value: "$_id",
					_id: false
				},
				whereJson: {
					complete:1			
				},
				// 副表排序规则
				sortArr: [{
					"name": "_add_time",
					"type": "desc"
				}],
				foreignDB: [{
					dbName: "drill",
					localKey: "_id",
					foreignKey: "point_id",
					as: "children",
					// limit: 30,
					// limit: 1,
					fieldJson: {
						label: "$drill_name",
						value: "$_id",
						_id: false
					},
					// 副表排序规则
					sortArr: [{
					"name": "_add_time",
					"type": "asc"
					}],
				}, ]
			}]


		});







		return selectRes.rows;
	}

}
