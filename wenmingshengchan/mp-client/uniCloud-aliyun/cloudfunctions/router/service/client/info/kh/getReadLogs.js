'use strict';
module.exports = {
  /**
   * C端横拉取阅览足迹清单
   * @url client/info/kh/getReadLogs
   * @description 一套纯净的小巧接口，专门承接通过文章底层发起的足迹查阅索要请求。
   */
  main: async (event) => {
    // 拉取提取工作流外置资源变量及触发者投送载荷
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    // 分拣 vk.baseDao 这一云引擎核心套件的各种子服务把手
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };
    
    // 定向靶点必须存在
    let { info_id, pageIndex = 1, pageSize = 30 } = data;
    if (!info_id) return { code: -1, msg: "传达坐标失明：未给足查缺足迹的归属底本" };

    // 执行搭载跨库关联查询的翻阅流水帐提权方法
    // 执行独立查询，规避 vk.baseDao foreignDB 遇到 uni-id-users 时触发互相查阅保密锁
    let logRes = await vk.baseDao.getTableData({
      dbName: "info-read-log", 
      data: { pageIndex, pageSize },
      whereJson: { info_id: info_id },
      sortArr: [{ "name": "read_time", "type": "desc" }]
    });

    if (logRes.rows && logRes.rows.length > 0) {
      let uids = logRes.rows.map(item => item.user_id);
      let userRes = await db.collection("uni-id-users")
          .where({ _id: _.in(uids) })
          .field({ real_name: true, nickname: true, department_name: true, avatar: true })
          .limit(1000)
          .get();
      
      let uMap = {};
      userRes.data.forEach(u => uMap[u._id] = u);
      
      logRes.rows.forEach(item => {
        let uInfo = uMap[item.user_id];
        // 伪装成 vk.baseDao foreignDB 返回的装态
        item.userInfo = uInfo ? [uInfo] : [];
      });
    }

    return logRes;

    return res;
  }
}
