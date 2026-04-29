'use strict';
module.exports = {
  /**
   * 获取可选执行人列表
   * @url admin/plan/sys/getAssigneeList
   * @description 严格限定只显示当前录入者所属部门（及子部门）的人员
   */
  main: async (event) => {
		let { data = {}, userInfo, util } = event;
		let { vk, _, db } = util;

		let res = { code: 0, msg: '' };
		// 基础过滤网：没有部门的孤立用户数据不获取
		let whereJson = {
			department_id: _.and(_.exists(true), _.neq(""))
		};

		try {
			// ==================【鉴权与隔离拦截】==================
			let role = userInfo.role || [];
			if (!role.includes("admin") && !role.includes("super_admin")) {
				// 作为 dept_admin，必须拥有 department_id，否则不准看任何数据
				if (!userInfo.department_id) {
					return { code: -1, msg: "未归属任何部门，没有分配权！", rows: [], total: 0 };
				}
				
				// 取出全量部门并在内存中找到自己的家族分支
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

			// ==================【支持部门与小组双向智能搜索】==================
			// 接收前端级联选择器传来的 tree_node_id
			if (data.formData && data.formData.tree_node_id) {
				// 采用纯对象 $or 语法，保证 whereJson 能和 real_name 等条件合并
				whereJson.$or = [
					{ department_id: data.formData.tree_node_id },
					{ group_id: data.formData.tree_node_id }
				];
				// 阅后即焚
				delete data.formData.tree_node_id;
			}

			// ==================【执行外键提取与响应】==================
			let foreignDB = [
				{
					dbName: "base-dept",
					localKey: "department_id",
					foreignKey: "_id",
					as: "dept_info",
					limit: 1,
					fieldJson: { name: true }
				},
				{
					dbName: "base-dept",
					localKey: "group_id",
					foreignKey: "_id",
					as: "group_info",
					limit: 1,
					fieldJson: { name: true }
				}
			];

			res = await vk.baseDao.getTableData({
				dbName: "uni-id-users",
				data,
				whereJson,
				foreignDB,
				fieldJson: { password: 0 }
			});

			return res;

		} catch (err) {
			return { code: -1, msg: "查询抛出异常", err: err };
		}
	}
}
