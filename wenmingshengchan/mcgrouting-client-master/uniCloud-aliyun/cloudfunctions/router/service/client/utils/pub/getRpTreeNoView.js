module.exports = {
	/**
	 * 只获取 井、水平与点位 两级数据
	 * @url client/utils/pub/getRpTree 前端调用的url参数地址
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
		let selectRes = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------

		selectRes = await vk.baseDao.selects({
			pageIndex: 1,
			pageSize: 100, //写该语句是因为这里有分页，写多点
			dbName: "point",
			fieldJson: {
				label: "$lp_string",
				value: "$_id",
				_id: false
			},
			whereJson: {	
				complete:1,
				view:2
			},
			// 副表排序规则
			sortArr: [{
				"name": "_add_time",
				"type": "desc"
			}],
			// 副表列表
			foreignDB: [{
				dbName: "rockshaft",
				localKey: "rock_id",
				foreignKey: "_id",
				as: "rockshaft",
				limit: 1,
				
				// 副表排序规则
				// 副表排序规则
				sortArr: [{
					"name": "_add_time",
					"type": "desc"
				}],
			}]


		});
		
		
		// 这里添加一个代码，主要用于将json对象添加新的属性，将dirll 对象中的属性拉取出来变成一级属性
		selectRes.rows.forEach(item=>{
			item.label=item.rockshaft.rock_name+item.label;	
		})
		







		return selectRes;
	}

}
