module.exports = {
  /**
   * 获取我的报备记录
   * @url client/report/kh/getMyIssues
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };

    let whereJson = {
      create_uid: uid
    };

    let result = await vk.baseDao.selects({
      dbName: "problem-report",
      pageIndex: data.pageIndex || 1,
      pageSize: data.pageSize || 10,
      whereJson: whereJson,
      sortArr: [{ "name": "create_time", "type": "desc" }],
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

    res = result;

    return res;
  }
};
