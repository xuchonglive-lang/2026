module.exports = {
  /**
   * 删除自动派发时点配置
   * @url admin/feedback/sys/deleteCronConfig
   */
  main: async (event) => {
    // 解构入参
    let { data = {}, userInfo, util } = event;
    let { vk } = util;

    // 参数校验：必须明确指明需要删除记录的 _id，防止误删全表或多条记录
    if (!data._id) return { code: -1, msg: "缺少记录ID" };

    // 调用基础 DAO，通过主键 _id 物理删除数据行
    let res = await vk.baseDao.deleteById({
      dbName: "key-point-cron-config", // 目标集合
      id: data._id                     // 需要删除的记录 _id
    });
    
    // res 的返回值是被删除影响的行数 count，封装并返回给前端
    return { code: 0, msg: "删除成功", count: res };
  }
};
