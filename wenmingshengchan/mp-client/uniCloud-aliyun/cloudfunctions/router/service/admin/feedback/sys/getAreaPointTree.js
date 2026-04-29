module.exports = {
  /**
   * 获取区域-点位级联树
   * @url admin/feedback/sys/getAreaPointTree
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk } = util;

    // 1. 获取所有区域
    let areaRes = await vk.baseDao.selects({
      dbName: "base-area",
      whereJson: {}
    });
    let areas = areaRes.rows || [];

    // 2. 获取所有点位
    let pointRes = await vk.baseDao.selects({
      dbName: "base-point",
      whereJson: {}
    });
    let points = pointRes.rows || [];

    // 3. 构建树形结构
    let tree = [];
    areas.forEach(area => {
      let areaNode = {
        _id: area._id, // Cascader path [area._id, point._id]
        name: area.name,
        children: []
      };
      
      points.forEach(point => {
        if (point.area_id === area._id) {
          areaNode.children.push({
            _id: point._id,
            name: point.name
          });
        }
      });
      
      // 只返回有子节点的区域，或者全部返回
      tree.push(areaNode);
    });

    return { code: 0, rows: tree, msg: "" };
  }
};
