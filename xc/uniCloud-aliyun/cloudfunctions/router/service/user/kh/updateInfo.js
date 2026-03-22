'use strict';
module.exports = {
	/**
	 * 用户更新个人信息
	 * @url user/kh/updateInfo
	 * @description 已登录用户修改自身的 real_name 和 mobile
	 * @param {String} data.real_name 真实姓名
	 * @param {String} data.mobile    手机号码
	 */
	main: async (event) => {
		// ============ 第一层解构：event（全量，不可省略） ============
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		// ============ 第二层解构：util（全量，不可省略） ============
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		// ============ 第三层解构：data（按需） ============
		let { real_name, mobile } = data;
		// ============ 返回值初始化 ============
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------

		if (!real_name || !real_name.trim()) {
			return { code: -1, msg: '真实姓名不能为空' };
		}

		let updateData = {
			real_name: real_name.trim()
		};

		// 手机号前端格式校验（宪法明确仅前端校验，不做短信验证）
		if (mobile) {
			if (!vk.pubfn.test(mobile, 'mobile')) {
				return { code: -1, msg: '手机号格式不正确' };
			}
			updateData.mobile = mobile;
		}

		await vk.baseDao.update({
			dbName: 'uni-id-users',
			whereJson: { _id: userInfo._id },
			dataJson: updateData
		});

		res.msg = '个人信息更新成功';

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
};
