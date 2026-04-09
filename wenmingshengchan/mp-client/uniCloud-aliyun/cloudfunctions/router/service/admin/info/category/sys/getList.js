'use strict';
module.exports = {
  /**
   * 获取文章分类列表核心接口
   * @url admin/info/category/sys/getList 
   * @description 作为B端后台中坚列表数据驱动源。根据规范，必须将已被假卸载（软删）的无效类目排查在外，仅推送健康的存活节点。
   */
  main: async (event) => {
    // 提取系统全局环境组件，准备唤醒数据库路由守卫层
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    // 分拣 vk.baseDao 操作底座工具
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' }; // 按矩搭建返回载具

    let dbName = "info-category"; // 操作集合定位环

    // 查询条件初组：这里坚守一条铁律法则，任何读取必须强行设立 is_del === 0 保护网，断绝拉取已抛弃孤魂野鬼可能
    let whereJson = {
      is_del: 0 // 软删除拦截铁幕
    };

    // 如果客户端携带了 name 传参，采用正则表达式对象注入 JSON 进行非相连片段匹配的强大模糊搜遍查询功能
    if (data.name) {
      whereJson.name = new RegExp(data.name);
    }

    // 调用最繁重、功能涵盖分页+排序+检索三位一体的高级提取器基方法 getTableData
    res = await vk.baseDao.getTableData({
      dbName: dbName,                    // 对准刚才定义好的分发库表
      data: data,                        // 完整承接客户端透传的 pageIndex 和 pageSize 分隔参数用以计算游标
      whereJson: whereJson,              // 安置加工完成含防删硬盾带模糊检索能力的网兜
      // 这里构建双维度倒排序链制，首先比拼排序值，大的为王排前列，同票数下对垒时间发生节点（越新的ID越高）
      sortArr: [{ "name": "sort", "type": "desc" }, { "name": "_id", "type": "desc" }]
    });

    // 将连带 rows、total 等各种详实数据的巨物对象封回包裹遣送前端进行 vue 数据刷新渲染
    return res;
  }
}
