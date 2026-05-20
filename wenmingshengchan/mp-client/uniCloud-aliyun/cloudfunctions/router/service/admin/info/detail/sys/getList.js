'use strict';
module.exports = {
  /**
   * 获取管理端文章列表枢纽池
   * @url admin/info/detail/sys/getList
   * @description 具有极致数据裁切能力的读取管道。不仅排除了死亡软删文章，支持按标题探搜、按状态切片，更依靠高可用底座实现了连表回传归口分类信息，确保呈现无哈希黑洞的高可读结构。
   */
  main: async (event) => {
    // 获取云环境挂载上下文工具链
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    // 剥离 vk, db 核心连接池操控把手
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;

    // 起步构建护城河限制搜索：一切查询前必须保证绝对只探秘存世（未删除，is_del为0）的文本数据包。
    let whereJson = { is_del: 0 };

    // 灵活切块搜索逻辑网兜组合
    // 1: 若检索框输入了标题残片，我们采用强悍的正字表达扫描实现动态寻觅
    if (data.title) whereJson.title = new RegExp(data.title);
    // 2: 允许按照分类筛选以细分管控某单一门派发出的报文
    if (data.category_id) whereJson.category_id = data.category_id;
    // 3: 也可以直接筛选在架或下架断层，满足快捷筛别需求
    if (data.status !== undefined) whereJson.status = data.status;

    // 号令重资产提取方法器行动
    let res = await vk.baseDao.getTableData({
      dbName: "info",        // 主战线深入 info 集合
      data: data,            // 流水式带过传参给到底层进行 page 游标翻页核算
      whereJson: whereJson,  // 下挂各种检索及防删围栏条件的拼凑字典集

      // 两级重配权重倒排序！不仅要按照时间新鲜程度递减分发展现（新在先，旧在后），
      // 而且要在此之前，霸道强制将 is_top 布尔标识启动项给揪出横架在所有队伍前端傲视群雄
      sortArr: [{ name: "is_top", type: "desc" }, { name: "publish_time", type: "desc" }],

      // 高阶技巧：运用 Constitution 宪章提及的极品 foreignDB 解开外键孤岛迷雾。
      // 这个连表动作能顺着在 `info` 中的那个 `category_id`，沿着外表去找寻其实时映射出的类名并融合绑定进结果发还外围
      foreignDB: [
        {
          dbName: "info-category",      // 我要去这表探听虚实
          localKey: "category_id",      // 咱们这边的路标挂签
          foreignKey: "_id",            // 它家那边的门牌号底盘
          as: "category_info",          // 抓捕带回信息合并成一个富足的新对象放在这容器返回
          limit: 1                      // 只要准确击中那个户主便立撤，不在那边浪费盘桓过多运算
        },
        {
          dbName: "uni-id-users",
          localKey: "publish_uid",
          foreignKey: "_id",
          as: "user_info",
          limit: 1
        }
      ]
    });

    return res;
  }
}
