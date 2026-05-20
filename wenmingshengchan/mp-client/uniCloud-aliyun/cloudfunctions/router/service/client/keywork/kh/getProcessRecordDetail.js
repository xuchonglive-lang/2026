'use strict';
module.exports = {
  /**
   * 获取重点项目过程反馈详情
   * @url client/keywork/kh/getProcessRecordDetail
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let { record_id } = data;
    
    if (!record_id) return { code: -1, msg: "缺少记录ID" };
    
    let res = await vk.baseDao.selects({
      dbName: "key-project-process",
      whereJson: { _id: record_id }
    });
    
    return {
      code: 0,
      data: res.rows && res.rows.length > 0 ? res.rows[0] : null
    };
  }
}
