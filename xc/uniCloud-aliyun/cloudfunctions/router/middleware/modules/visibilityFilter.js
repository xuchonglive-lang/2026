/**
 * 可见性数据过滤中间件
 * 与 tenantFilter 并行工作，专职处理文章（xc-info-articles）的可见性过滤。
 * 仅对 client/info-publish/ 路径生效。
 *
 * 过滤逻辑：
 * - visibility=public 的文章，所有人可见
 * - visibility=private 的文章，仅发布者所在部门可见
 * - visibility=targeted 的文章，仅 target_dept_ids 包含用户部门的可见
 */
module.exports = [{
	id: "visibilityFilter",
	regExp: "^client/info-publish",
	description: "信息共享可见性过滤器",
	index: 360,
	enable: true,
	mode: "onActionExecuting",
	main: async function(event) {
		let { data = {}, userInfo, util, url } = event;
		let { db } = util;

		// 无用户信息则跳过
		if (!userInfo || !userInfo._id) {
			return { code: 0, msg: "" };
		}

		let tenantId = userInfo.tenant_id;
		let deptLevel = userInfo.dept_level;

		// 集团级（dept_level === 0）：超管看全部，不过滤可见性
		if (deptLevel === 0) {
			return { code: 0, msg: "" };
		}

		if (!data.whereJson) data.whereJson = {};
		let cmd = db.command;

		// 构建 $or 条件：用户能看到的文章范围
		let visibilityConditions = [
			// 公开文章
			{ visibility: "public" },
			// 本部门内部文章（发布者所在部门 = 用户部门）
			{ visibility: "private", tenant_id: tenantId },
			// 定向发布且包含用户所在部门
			{
				visibility: "targeted",
				target_dept_ids: cmd.in([tenantId])
			}
		];

		// 如果用户有指定的 uid，也能看到 target_user_ids 包含自己的文章
		visibilityConditions.push({
			visibility: "targeted",
			target_user_ids: cmd.in([userInfo._id])
		});

		// 合并到现有 whereJson（不覆盖 tenantFilter 已注入的条件）
		if (data.whereJson.$or) {
			// 如果 tenantFilter 已注入 $or，用 $and 组合
			data.whereJson.$and = [
				{ $or: data.whereJson.$or },
				{ $or: visibilityConditions }
			];
			delete data.whereJson.$or;
		} else {
			data.whereJson.$or = visibilityConditions;
		}

		return { code: 0, msg: "" };
	}
}]
