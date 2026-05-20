'use strict';
module.exports = {
  /**
   * 供C端直接调取的日常区域获取接口
   * @url client/plan/kh/getAreaList 
   */
  main: async (event) => {
    let { util } = event;
    let { vk } = util;
    
    // 业务逻辑开始-----------------------------------------------------------
    // 使用最稳健的 select 方法查询 base-area 表
    let areaRes = await vk.baseDao.select({
      dbName: "base-area",
      pageSize: 500
    });
    
    // 业务逻辑结束-----------------------------------------------------------
    return {
      code: 0,
      rows: areaRes.rows || []
    };
  }
}
