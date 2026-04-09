'use strict';
module.exports = {
  /**
   * C端获取下发文章列表
   * @url client/info/kh/getListByCategory
   * @description 抛给小程序 C 端界面的全能拉取集。屏蔽掉了内容大字段节约带宽，外联并入分类签。
   */
  main: async (event) => {
    // 解构核心环境包
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };
    
    // 【强制过滤】对于面向公众的前端平台而言，所呈现的内容其：
    // 1. 生命状态必须是在线的 (1) 
    // 2. 逻辑轨迹上不能是死物抛弃的 (is_del: 0)
    let whereJson = { status: 1, is_del: 0 };
    
    // 如果首页或某选项卡定向指定归属板块则介入条件
    if (data.category_id) whereJson.category_id = data.category_id;

    // 支持搜索框查询（对 title 或 summary 模糊匹配）
    if (data.keyword) {
      whereJson = _.and([
        whereJson,
        _.or([
          { title: new RegExp(data.keyword, 'i') },
          { summary: new RegExp(data.keyword, 'i') }
        ])
      ]);
    }

    // 拉起框架基表寻址提取方法
    res = await vk.baseDao.getTableData({
      dbName: "info",                   // 拉取文章原库
      data: data,                       // 承接翻页偏移原参
      whereJson: whereJson,             // 载入层叠过滤结构
      sortArr: [
        { "name": "is_top", "type": "desc" },    // 大前段：高优呈现必须位于第一顺位的主副双段混排策略
        { "name": "publish_time", "type": "desc" }
      ],
      foreignDB: [
        {
          dbName: "info-category",
          localKey: "category_id",
          foreignKey: "_id",
          as: "category_info",
          limit: 1
        }
      ],
      // 性能边界！为了缩略纯净版极速直达视觉层，直接剃掉富文本主体，因为手机内存太紧张承受不起来回传输
      fieldJson: {
        content: false 
      }
    });

    return res;
  }
}
