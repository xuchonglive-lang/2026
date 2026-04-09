// 基础导出模块口用以为提供前端安全服务环境调用请求
module.exports = {
  // 定义前端开发查阅及系统的元信息标头注解
  /**
   * 调取点位节点分页组数目录
   * @url admin/base-point/sys/getList
   * @param {object}         formData  查询条件数据源
   * @param {Array<Object>}  columns   查询条件规则
   */
  // 函数执行请求落地后真正拉起系统进行运行的代码区
  main: async (event) => {
    // 利用结构拿取前端页面送过来的入参载荷部分与平台级参数提取结构工具族
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    // 一键拨开拿出直接对接底层能力的诸如包含 BaseDao 的万能对象集合
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    // 构建初始化回应成功状态包模板用于返回底层信息使用
    let res = { code: 0, msg: '' };
    
    // -----------------------------------------------------------
    // 简单的分页数据吐出业务
    // -----------------------------------------------------------
    
    // 根据安全及数据追溯原则将标记为软删除的点位进行屏蔽隔离过滤不予下发浏览器
    let whereJson = data.whereJson || {};
    whereJson.is_del = db.command.neq(1);

    // 把一切重压丢给基于 Dao 封装后的 getTableData 黑盒处理器
    res = await vk.baseDao.getTableData({
      // 定位需要拉取的底层物理库
      dbName: "base-point",
      // 把网页发来的如 pageIndex 和模糊条件如 %% 全部穿透底层系统组装请求发回给服务端处理成数组
      data: data,
      whereJson: whereJson,
      // 使用后台联表能力将该点位的双向关联的外键全部换化并合并出来发往客户端以方便它中文展示
      foreignDB: [
        {
          dbName: "base-area",
          localKey: "area_id",
          foreignKey: "_id",
          as: "area_info",
          limit: 1
        },
        {
          dbName: "base-dept",
          localKey: "manager_dept_id",
          foreignKey: "_id",
          as: "dept_info",
          limit: 1
        }
      ]
    });
    
    // 回吐给浏览器终端，此时数据已含有 rows 数据列表及分断所必须包含的总页长对象数字组合
    return res;
  }
};
