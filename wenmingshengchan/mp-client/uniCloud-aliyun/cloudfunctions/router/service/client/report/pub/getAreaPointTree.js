'use strict';
module.exports = {
  /**
   * 获取区域和点位树状结构（公开）
   * @url client/report/pub/getAreaPointTree
   */
  main: async (event) => {
    let { data = {}, util } = event;
    let { vk } = util;
    
    let areaRes = await vk.baseDao.select({
      dbName: "base-area",
      pageSize: 500
    });
    
    let pointRes = await vk.baseDao.select({
      dbName: "base-point",
      pageSize: 500
    });
    
    let areas = areaRes.rows || [];
    let points = pointRes.rows || [];
    
    let tree = areas.map(area => {
      let children = points.filter(p => p.area_id === area._id).map(p => {
        return { value: p._id, label: p.name };
      });
      if (children.length === 0) {
        children = [{ value: '', label: '暂无可选点位' }];
      }
      return {
        value: area._id,
        label: area.name,
        children: children
      };
    });
    
    return { code: 0, tree };
  }
}
