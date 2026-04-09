'use strict';
module.exports = {
	/**
	 * XXXnameXXX
	 * @url admin/utils/catagory/sys/getSubjectList 前端调用的url参数地址
	 * data 请求参数
	 * @param {String} params1  参数1
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: "" };
		// 业务逻辑开始-----------------------------------------------------------
		let selectRes = await vk.baseDao.selects({
			pageIndex: 1,
			pageSize: 100, //写该语句是因为这里有分页，写多点
			dbName: "region",
			fieldJson: {
				label: "$region_name",
				value: "$_id",
				_id: false

			},
			whereJson: {

			}
		});
		



		// 业务逻辑结束-----------------------------------------------------------
		return selectRes;
	}
}
