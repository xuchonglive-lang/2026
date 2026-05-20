'use strict';
module.exports = {
	main: async (event) => {
		let { vk, db, _ } = event.util;
		let res = await vk.baseDao.selects({
			dbName: "key-point-feedback",
			whereJson: { shift_date: "2026-05-04" },
			limit: 10,
			foreignDB: [
				{
					dbName: "uni-id-users",
					localKey: "submit_uid",
					foreignKey: "_id",
					as: "user_info"
				}
			]
		});
		return res.rows;
	}
};
