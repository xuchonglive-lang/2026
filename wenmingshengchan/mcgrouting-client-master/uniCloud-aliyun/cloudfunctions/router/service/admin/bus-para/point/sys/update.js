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
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: 'ok' };
		// 业务逻辑开始-----------------------------------------------------------
		let {
			_id,
			level_name,
			point_name,
			remark,
			sort,
			rock_ids, //井筒编号
			team_ids,
			time_limit,
			depth_design,
			cement,
			waterglass,
			single,
			double,
			content,
			complete,
			view,
			drill_num
		} = data;
		// 这里需要把 params1 params2 params3 改成你数据库里允许用户添加的字段
		if (vk.pubfn.isNullOne(_id)) {
			return { code: -1, msg: '参数错误' };
		}
		// 因为使用了万能表单的cascader 组件，上传的是数据是一个数组，因此在新增及更新的时候，需要将其变成字符串
		// 因为使用了万能表单的cascader 组件，上传的是数据是一个数组，因此在新增及更新的时候，需要将其变成字符串
		let rock_id = rock_ids[0];
		let team_id = team_ids[0];
		// 这里新增一个字段，就是 井筒、水平、点位的全称，需要根据井筒id查询出井筒的名字

		let info = await vk.baseDao.findByWhereJson({
			dbName: "rockshaft",
			whereJson: {
				_id: rock_id,
			}
		});

		let team = await vk.baseDao.findByWhereJson({
			dbName: "team",
			whereJson: {
				_id: team_id,
			}
		});
		console.log(info)
		let rlp_string = info.rock_name + level_name + point_name;
		let temp = level_name.replace("水平", "");
		// let temp2=temp.replace("m","");
		let lp_string = temp + point_name;
		let team_name = team.team_name;



		let dbName = "point";
		await vk.baseDao.updateById({
			dbName,
			id: _id,
			dataJson: {
				level_name,
				point_name,
				remark,
				sort,
				rlp_string, //井筒水平点位
				lp_string, //水平点位
				rock_id, //井筒编号
				team_name, //施工单位名称
				team_id, //施工单位编号
				time_limit,
				depth_design,
				cement,
				waterglass,
				single,
				double,
				content,
				complete,
				view,
				drill_num
			}

		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}

}
