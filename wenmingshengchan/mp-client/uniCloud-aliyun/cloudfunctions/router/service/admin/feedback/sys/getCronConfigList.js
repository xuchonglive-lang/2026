module.exports = {
  /**
   * 获取定时任务配置列表
   * @url admin/feedback/sys/getCronConfigList
   */
  main: async (event) => {
    // 解构入参数据
    let { data = {}, userInfo, util } = event;
    let { vk } = util;
    
    // 执行分页查询，获取数据库里的定时配置数据（如早班、晚班任务生成配置）
    let res = await vk.baseDao.getTableData({
      dbName: "key-point-cron-config", // 数据来源：定时配置表
      data: data,                      // 前端传入的分页参数 pageIndex、pageSize 等会自动在这里处理
      whereJson: {}                    // 暂无查询限制条件，全量分页获取
    });

    // 返回分页结构给前端列表渲染
    return res;
  }
};
