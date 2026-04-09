'use strict';
module.exports = {
  /**
   * C端回取个人信息阅兵库（我的足迹）
   * @url client/info/kh/getMyReadHistory
   * @description 响应提案扩展包需求“追寻过去轨迹”。依据本人UID，打捞历史足印并借助强大的联表还原真实原文标题。
   */
  main: async (event) => {
    // 解析拆解云中枢
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data; // 确保仅操作提取当前在网的真实请求者的日志。
    let res = { code: 0, msg: '' };
    
    // 只拉取归属自己所有的印记
    let whereJson = { user_id: uid };

    res = await vk.baseDao.getTableData({
      dbName: "info-read-log", 
      data: data,              
      whereJson: whereJson,    
      // 足迹按历史倒置轴列展示：谁是最晚的一步脚印，则理应显现于目面之处
      sortArr: [{ "name": "read_time", "type": "desc" }], 
      
      // 使用 Foreign 锚定法则：单独一条流水号日志毫无辨识度，必须联表挂载把“主文章门面”取过来作为包裹，不然前端不知道你在看什么。
      foreignDB: [{
        dbName: "info",                   // 面对内容巨表
        localKey: "info_id",              // 我的手中线
        foreignKey: "_id",                // 回归源初之锚
        as: "info",                       // 取而代之为 info 主体对象属性
        limit: 1,
        // 这里再次施展带宽救生圈：哪怕我外挂文章信息，我也不要把几万字的 content 捞出来！这完全没有意义。
        fieldJson: { content: false }     
      }]
    });

    return res;
  }
}
