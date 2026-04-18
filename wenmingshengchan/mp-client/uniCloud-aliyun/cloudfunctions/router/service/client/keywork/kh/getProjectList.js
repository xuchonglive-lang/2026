module.exports = {
  /**
   * 获取指派给我的重点项目列表
   * @url client/keywork/kh/getProjectList
   * @description 依据 assignee_uids 筛选指派给我的项目，并通过 foreignDB 关联区域与点位信息
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let { uid } = userInfo;

    // 分页参数
    let pageIndex = data.pageIndex || 1;
    let pageSize = data.pageSize || 10;
    // 状态过滤 (可选)
    let status = data.status;

    let whereJson = {
      assignee_uids: uid // MongoDB 数组包含查询，只需直接传入标量
    };
    
    if (vk.pubfn.isNotNull(status)) {
      whereJson.status = status;
    }

    // 查询列表
    let res = await vk.baseDao.selects({
      dbName: "key-project",
      pageIndex: pageIndex,
      pageSize: pageSize,
      whereJson: whereJson,
      sortArr: [{ name: "_add_time", type: "desc" }],
      // foreignDB: 关联区域与点位名称
      foreignDB: [
        {
          dbName: "base-area",
          localKey: "area_id",
          foreignKey: "_id",
          as: "area_info",
          limit: 1
        },
        {
          dbName: "base-point",
          localKey: "point_id",
          foreignKey: "_id",
          as: "point_info",
          limit: 1
        }
      ]
    });
    
    // selects 直接返回 { rows, total, pagination }
    return res;
  }
};
