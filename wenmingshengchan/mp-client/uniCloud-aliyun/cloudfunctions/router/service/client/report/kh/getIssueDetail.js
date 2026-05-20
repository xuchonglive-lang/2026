'use strict';
module.exports = {
  /**
   * 获取问题报备详情
   * @url client/report/kh/getIssueDetail
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let { id } = data;
    
    if (!id) return { code: -1, msg: "缺少ID" };
    
    let res = await vk.baseDao.selects({
      dbName: "problem-report",
      whereJson: { _id: id }
    });
    
    let record = res.rows && res.rows.length > 0 ? res.rows[0] : null;
    if (record) {
      // 手动关联区域和点位，兼容 String 和 ObjectId 两种形态
      const formatId = (id) => {
        if (typeof id === 'string' && id.length === 24 && /^[0-9a-fA-F]+$/.test(id)) {
          try { return db.command.ObjectId(id); } catch (e) { return id; }
        }
        return id;
      };
      
      let [areaRes, pointRes] = await Promise.all([
        vk.baseDao.findById({
          dbName: "base-area",
          id: formatId(record.area_id)
        }),
        vk.baseDao.findById({
          dbName: "base-point",
          id: formatId(record.point_id)
        })
      ]);
      
      record.area_info = areaRes ? [areaRes] : [];
      record.point_info = pointRes ? [pointRes] : [];
    }
    
    return {
      code: 0,
      data: record
    };
  }
}
