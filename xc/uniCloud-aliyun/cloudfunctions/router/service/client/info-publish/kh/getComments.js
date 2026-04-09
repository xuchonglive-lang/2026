'use strict';
module.exports = {
	/**
	 * 查询评论列表（Q17: 时间正序+"查看更多"，Q7: 两层扁平）
	 * @url client/info-publish/kh/getComments
	 * @description 分页查一级评论，批量查回复挂载
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { article_id } = data;
		if (vk.pubfn.isNull(article_id)) return { code: -1, msg: '缺少文章ID' };

		if (!data.pageSize) data.pageSize = 20;
		if (!data.whereJson) data.whereJson = {};
		data.whereJson.article_id = article_id;
		data.whereJson.is_deleted = false;
		data.whereJson.parent_id = '';

		// Q17: 时间正序查询一级评论
		let topRes = await vk.baseDao.getTableData({
			dbName: 'xc-info-comments',
			data,
			orderBy: [{ name: 'created_at', type: 'asc' }],
			foreignDB: [
				{
					dbName: 'uni-id-users',
					localKey: 'created_by',
					foreignKey: '_id',
					as: 'user_info',
					limit: 1,
					getOne: true,
					fieldJson: { _id: true, nickname: true, avatar: true, dept_name: true },
				},
			],
		});

		// Q7: 查询每条一级评论的回复（两层扁平展示）
		if (vk.pubfn.isNotNull(topRes.rows) && topRes.rows.length > 0) {
			let topIds = topRes.rows.map(r => r._id);
			let repliesRes = await vk.baseDao.select({
				dbName: 'xc-info-comments',
				whereJson: {
					parent_id: _.in(topIds),
					is_deleted: false,
				},
				sortArr: [{ name: 'created_at', type: 'asc' }],
			});
			let replies = repliesRes.rows || [];

			// 获取回复者信息
			if (replies.length > 0) {
				let replyUserIds = [...new Set(replies.map(r => r.created_by))];
				let replyUsersRes = await vk.baseDao.select({
					dbName: 'uni-id-users',
					whereJson: { _id: _.in(replyUserIds) },
					fieldJson: { _id: true, nickname: true, avatar: true, dept_name: true },
				});
				let replyUsers = replyUsersRes.rows || [];
				let userMap = {};
				replyUsers.forEach(u => { userMap[u._id] = u; });
				replies.forEach(r => { r.user_info = userMap[r.created_by] || {}; });
			}

			// 按 parent_id 分组挂载到一级评论
			let replyMap = {};
			replies.forEach(r => {
				if (!replyMap[r.parent_id]) replyMap[r.parent_id] = [];
				replyMap[r.parent_id].push(r);
			});
			topRes.rows.forEach(row => {
				row.replies = replyMap[row._id] || [];
			});
		}

		res = topRes;
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	},
};
