'use strict';
module.exports = {
	main: async (event) => {
		const db = uniCloud.database();
		const _ = db.command;
		let res = await db.collection('key-point-feedback').where({
			shift_date: '2026-05-04',
			is_del: _.neq(1)
		}).get();
		return res;
	}
}
