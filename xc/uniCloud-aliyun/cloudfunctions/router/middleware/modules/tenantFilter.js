/**
 * 租户数据隔离过滤器
 * 根据用户的 dept_level 自动注入数据过滤条件：
 * - dept_level === 0（集团级）：不过滤，看全部数据
 * - dept_level > 0（部门级）：注入 $or 条件实现数据隔离
 * - 未分配部门：仅看 public 数据
 */
module.exports = [{
	id: "tenantFilter",
	regExp: [],
	description: "租户数据隔离过滤器",
	index: 350,
	enable: true,
	mode: "onActionExecuting",
	main: async function(event) {
		let { data = {}, userInfo, util, url } = event;
		let { vk, db } = util;

		// 不需要登录的接口跳过（pub 目录）
		if (url && url.indexOf("user/pub/") === 0) {
			return { code: 0, msg: "" };
		}

		// 系统管理接口跳过（部门管理等操作 xc-tenants 表本身，不需要租户过滤）
		if (url && url.indexOf("admin/system/") === 0) {
			return { code: 0, msg: "" };
		}

		// ========== 租户管理员独立通道 ==========
		// admin/tenant/ 目录的请求强制锁定为当前用户的 tenant_id
		if (url && url.indexOf("admin/tenant/") === 0) {
			if (!userInfo || !userInfo._id) {
				return { code: 403, msg: "请先登录" };
			}
			let tid = userInfo.tenant_id;
			if (!tid) {
				return { code: 403, msg: "您的账号尚未归属任何租户，无法使用该功能" };
			}
			if (!data.whereJson) data.whereJson = {};
			data.whereJson.tenant_id = tid;
			return { code: 0, msg: "" };
		}

		// 无用户信息则跳过（未登录场景由 loginFilter 处理）
		if (!userInfo || !userInfo._id) {
			return { code: 0, msg: "" };
		}

		let deptLevel = userInfo.dept_level;
		let tenantId = userInfo.tenant_id;

		// ========== 集团级（dept_level === 0）：超管 ==========
		if (deptLevel === 0) {
			// 从用户记录读取已切换的部门视角（由 switchView 云函数写入）
			let selectedTenantId = userInfo.selected_view_tenant_id;
			if (selectedTenantId) {
				if (!data.whereJson) data.whereJson = {};
				data.whereJson.tenant_id = selectedTenantId;
			}
			// 不注入额外过滤，超管看全部
			return { code: 0, msg: "" };
		}

		// ========== 未分配部门的用户（裸号）：仅看 public ==========
		if (!tenantId) {
			if (!data.whereJson) data.whereJson = {};
			data.whereJson.visibility = "public";
			return { code: 0, msg: "" };
		}

		// ========== 普通部门用户：注入 $or 条件 ==========
		if (!data.whereJson) data.whereJson = {};
		let cmd = db.command;
		let orConditions = [
			// 本租户内且未设置小组定向的数据
			{ tenant_id: tenantId, target_group_ids: cmd.exists(false) },
			{ tenant_id: tenantId, target_group_ids: null },
			{ tenant_id: tenantId, target_group_ids: [] },
			// 公开数据
			{ visibility: "public" },
			// 跨租户定向发布的数据
			{
				visibility: "targeted",
				target_dept_ids: cmd.in([tenantId]),
				creator_dept_level: cmd.lte(deptLevel)
			}
		];

		// 如果用户属于某个小组，则可以看该小组定向的数据
		if (userInfo.group_id) {
			orConditions.push({
				tenant_id: tenantId,
				target_group_ids: cmd.in([userInfo.group_id])
			});
		}

		data.whereJson.$or = orConditions;

		return { code: 0, msg: "" };
	}
}]
