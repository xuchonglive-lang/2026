'use strict';
module.exports = {
  /**
   * 获取区域和点位树状结构
   * @url client/report/kh/getAreaPointTree 前端调用的url参数地址
   * @description 获取区域和点位树状结构，用于前端多级联动选择
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };
    
    // 1. 获取所有作业区域
    let areaRes = await vk.baseDao.select({
      dbName: "base-area",
      pageSize: 500,
      whereJson: {
        // status: 1 // 如果需要过滤可用的可以加上
      }
    });
    
    // 2. 获取所有作业点位
    let pointRes = await vk.baseDao.select({
      dbName: "base-point",
      pageSize: 500,
      whereJson: {
        // status: 1 
      }
    });
    
    let areas = areaRes.rows || [];
    let points = pointRes.rows || [];
    
    // 3. 在服务端拼接成 uView 级联选择器需要的树状结构
    let tree = areas.map(area => {
      let children = points.filter(p => p.area_id === area._id).map(p => {
        return { value: p._id, label: p.name };
      });
      // 容错处理：如果某个区域没有点位，塞入一个空节点，防止 uView 选择器报错
      if (children.length === 0) {
        children = [{ value: '', label: '暂无可选点位' }];
      }
      return {
        value: area._id,
        label: area.name,
        children: children
      };
    });
    
    res.tree = tree;
    return res;
  }
}
