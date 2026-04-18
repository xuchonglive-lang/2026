module.exports = {
  /**
   * 获取公示列表（严格脱敏）
   * @url client/report/kh/getPublicList
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };

    // 只获取非废弃的记录，状态 0, 1, 2
    let whereJson = {
      status: _.neq(3)
    };

    if (vk.pubfn.isNotNull(data.status)) {
      whereJson.status = data.status; // 状态筛选
    }

    let result = await vk.baseDao.selects({
      dbName: "problem-report",
      pageIndex: data.pageIndex || 1,
      pageSize: data.pageSize || 10,
      whereJson: whereJson,
      sortArr: [{ "name": "create_time", "type": "desc" }],
      // 强脱敏，剥离一切隐私指纹
      fieldJson: {
        create_uid: false,
        reply_uid: false
      },
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

    // 务必返回完整的包含 rows 和分页的对象
    res = result;

    return res;
  }
};
