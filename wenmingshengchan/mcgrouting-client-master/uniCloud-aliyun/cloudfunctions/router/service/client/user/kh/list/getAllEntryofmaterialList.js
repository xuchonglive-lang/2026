module.exports = {
  /**
   * 查询多条记录 分页
   * @url client/user/kh/list/getAllEntryofmaterialList 前端调用的url参数地址
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
		let { customUtil, uniID, config, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : '' };
		// 业务逻辑开始-----------------------------------------------------------
		let dbName = "entryofmaterial";
		res = await vk.baseDao.selects({
			pageIndex: data.pageIndex, // 查询第几页
			pageSize: data.pageSize,
			dbName,
		// 主表where条件
		  whereJson: {
			
		  },
		 // 主表排序规则
		 sortArr: [{ "name": "e_date","type": "desc" }],
		  
		});
		
		// 这里添加一个代码，主要用于将json对象添加新的属性，将dirll 对象中的属性拉取出来变成一级属性
		res.rows.forEach(item => {
			if (item.e_shift == 1) {
				item.shift = "白班";
			}
			if (item.e_shift == 2) {
				item.shift = "夜班";
			}
			// item.depth_design = item.drill.depth_design;
		})
		
		return res;
  }

}
