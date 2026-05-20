module.exports = {
  /**
   * 获取区域-点位级联树
   * @url admin/feedback/sys/getAreaPointTree
   */
  main: async (event) => {
    // 从 event 中提取工具对象
    let { data = {}, userInfo, util } = event;
    let { vk } = util;

    // 1. 获取所有区域基础数据
    let areaRes = await vk.baseDao.selects({
      dbName: "base-area", // 查询区域字典表
      whereJson: {}        // 暂无过滤条件，全量查询
    });
    // 容错处理：如果查不到数据则使用空数组
    let areas = areaRes.rows || [];

    // 2. 获取所有点位基础数据
    let pointRes = await vk.baseDao.selects({
      dbName: "base-point", // 查询点位字典表
      whereJson: {}         // 暂无过滤条件，全量查询
    });
    // 容错处理：如果查不到数据则使用空数组
    let points = pointRes.rows || [];

    // 3. 构建供前端级联选择器 (Cascader) 使用的树形结构
    let tree = [];
    
    // 遍历所有区域以构建顶层节点
    areas.forEach(area => {
      let areaNode = {
        _id: area._id, // 区域的唯一标识，用于前端回显，最终会组合成 [area._id, point._id]
        name: area.name, // 区域名称，用于前端展示
        children: []     // 初始化存放属于该区域的点位列表
      };
      
      // 遍历所有点位，寻找归属于当前区域的点位
      points.forEach(point => {
        if (point.area_id === area._id) {
          // 如果点位的 area_id 匹配，则推入当前区域节点的 children 数组中
          areaNode.children.push({
            _id: point._id,   // 点位的唯一标识
            name: point.name  // 点位名称
          });
        }
      });
      
      // 将拼装好的当前区域节点追加到总体树结构中
      // 注意：这里会将所有区域返回，无论是否有子节点；如业务需要也可在此增加 if(areaNode.children.length > 0) 的过滤判断
      tree.push(areaNode);
    });

    // 返回组装完成的树形数据，前端可直接将其绑定至级联选择器组件
    return { code: 0, rows: tree, msg: "" };
  }
};
