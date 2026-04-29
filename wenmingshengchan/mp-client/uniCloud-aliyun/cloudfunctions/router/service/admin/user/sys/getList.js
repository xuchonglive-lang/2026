'use strict';
module.exports = {
	/**
	 * 获取会员审核与管理列表 (带有严格的数据隔离)
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubObj, request, plugin, vk, db, _ } = util;
		let res = { code: 0, msg: '' };
		// 基础过滤网：根据需求，没有部门的孤立用户数据不获取
		let whereJson = {
			department_id: _.and(_.exists(true), _.neq(""))
		};

		try {
			// ==================【鉴权与隔离拦截】==================
			let role = userInfo.role || [];
			if (!role.includes("admin") && !role.includes("super_admin")) {
				// 作为 dept_admin，必须拥有 department_id，否则不准看任何数据
				if (!userInfo.department_id) {
					return { code: -1, msg: "未归属任何部门，没有审核权！", rows: [], total: 0 };
				}
				
				// 取出全量部门并在内存中找到自己的家族分支（架构不大，全量取极快）
				let deptRes = await vk.baseDao.select({
					dbName: "base-dept",
					whereJson: { is_del: _.neq(1) },
					limit: 1000
				});
				
				// 提取所属树家族的所有下属ID
				let myDeptIds = [userInfo.department_id];
				
				// 简易递归向下挖掘子组
				const findDescendants = (parentId) => {
					let children = deptRes.rows.filter(d => d.parent_id === parentId);
					children.forEach(c => {
						myDeptIds.push(c._id);
						findDescendants(c._id);
					});
				};
				findDescendants(userInfo.department_id);
				
				// 挂载数据墙隔离过滤器
				whereJson.department_id = _.in(myDeptIds);
			}

			// 如果前端左侧树点击了任何一个节点（无论是部门还是小组），传来了 tree_node_id
			if (data.formData && data.formData.tree_node_id) {
				// 采用纯对象 $or 语法，确保 whereJson 始终是普通 Object，
				// 避免变成 Command 对象后被 vk-base-dao 的深度合并机制（Object.assign）破坏，
				// 从而保证真实姓名 (real_name)、手机号等 formData 搜索条件能完美共存生效。
				whereJson.$or = [
					{ department_id: data.formData.tree_node_id },
					{ group_id: data.formData.tree_node_id }
				];
				// 阅后即焚，防止 vk-base-dao 拿着 tree_node_id 去匹配底层真实数据字段
				delete data.formData.tree_node_id;
			}

			// ==================【执行外键提取与响应】==================
			let foreignDB = [
				{
					dbName: "base-dept",
					localKey: "department_id",
					foreignKey: "_id",
					as: "dept_info",
					limit: 1
				},
				{
					dbName: "base-dept",
					localKey: "group_id",
					foreignKey: "_id",
					as: "group_info",
					limit: 1
				}
			];
			
			res = await vk.baseDao.getTableData({
				dbName: "uni-id-users",
				data,
				whereJson,
				foreignDB,
				fieldJson: { password: 0 } // 切勿传回密码摘要
			});
			return res;
		} catch (err) {
			return { code: -1, msg: "查询抛出异常", err: err };
		}
	}
}
