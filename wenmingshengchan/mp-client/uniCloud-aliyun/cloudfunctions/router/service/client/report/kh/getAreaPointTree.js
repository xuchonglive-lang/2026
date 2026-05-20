'use strict';
module.exports = {
  /**
   * 获取区域和点位树状结构（鉴权）
   * @url client/report/kh/getAreaPointTree
   */
  main: async (event) => {
    let { data = {}, util } = event;
    let { vk } = util;
    
    // 1. 获取所有区域
    let areaRes = await vk.baseDao.select({
      dbName: "base-area",
      pageSize: 500
    });
    
    // 2. 获取所有点位
    let pointRes = await vk.baseDao.select({
      dbName: "base-point",
      pageSize: 500
    });
    
    let areas = areaRes.rows || [];
    let points = pointRes.rows || [];
    
    // 3. 构建树形结构
    let tree = areas.map(area => {
      let children = points.filter(p => p.area_id === area._id).map(p => {
        return { value: p._id, label: p.name };
      });
      if (children.length === 0) {
        children = [{ value: '', label: '暂无点位' }];
      }
      return {
        value: area._id,
        label: area.name,
        children: children
      };
    });
    
    // 如果没有数据，返回默认值
    if (tree.length === 0) {
      tree = [{
        value: '',
        label: '默认区域',
        children: [{ value: '', label: '暂无点位' }]
      }];
    }
    
    return { code: 0, tree };
  }
}
