'use strict';
module.exports = {
  /**
   * 诊断工具：检查数据库是否有数据
   * @url client/report/kh/debugData
   */
  main: async (event) => {
    let { util } = event;
    let { vk } = util;
    let areaCount = await vk.baseDao.count({ dbName: "base-area" });
    let pointCount = await vk.baseDao.count({ dbName: "base-point" });
    let projectCount = await vk.baseDao.count({ dbName: "key-project" });
    return { areaCount, pointCount, projectCount };
  }
}
