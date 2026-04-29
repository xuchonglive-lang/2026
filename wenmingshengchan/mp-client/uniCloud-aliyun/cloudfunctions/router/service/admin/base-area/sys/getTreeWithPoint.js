module.exports = {
  /**
   * 获取区域与点位的级联树状结构
   * @url admin/base-area/sys/getTreeWithPoint
   */
  main: async (event) => {
    let { vk } = event.util;
    let res = { code: 0, msg: '' };

    // 获取所有区域及其对应的点位
    let treeData = await vk.baseDao.selects({
      dbName: "base-area",
      whereJson: {},
      foreignDB: [
        {
          dbName: "base-point",
          localKey: "_id",
          foreignKey: "area_id",
          as: "children",
          limit: 500
        }
      ],
      limit: 500
    });

    res.rows = treeData.rows;
    return res;
  }
};
