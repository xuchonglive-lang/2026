module.exports = {
  /**
   * 修改数据
   * @urladmin/bus-para/rockshaft/update 前端调用的url参数地址
   * data 请求参数 说明
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : 'ok' };
		// 业务逻辑开始-----------------------------------------------------------
		let {
			_id,
			drill_name,
			depth_design,
			point_ids,
			sort
		} = data;
		// 这里需要把 params1 params2 params3 改成你数据库里允许用户添加的字段
		
		// 因为使用了万能表单的cascader 组件，上传的是数据是一个数组，因此在新增及更新的时候，需要将其变成字符串
		let point_id=point_ids[0];
		
		
		if(vk.pubfn.isNullOne(_id)){
			return { code : -1, msg : '参数错误' };
		}
		let dbName = "drill";
		await vk.baseDao.updateById({
			dbName,
			id:_id,
			dataJson:{
				drill_name,
				depth_design,
				point_id,
				sort
			}
		});
		// 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}
