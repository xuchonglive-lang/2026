// 注册供外部云环境获取列表调取的服务总对象
module.exports = {
  // 定义请求的方法和功能注释
  /**
   * 获取区域列表
   * @url admin/base-area/sys/getList 前端调用的接口地址
   * @param {object}         formData  查询条件数据源
   * @param {Array<Object>}  columns   查询条件规则
   */
  // 云函数真实执行的作用域网关
  main: async (event) => {
    // 拦截提取所有需要的上下文字段对象参数包
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    // 剥离系统自带库等环境要素变量赋予以底层执行能力的包引用
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    // 返回报文成功执行的数据载体
    let res = { code: 0, msg: '' };
    
    // -----------------------------------------------------------
    // 使用现成分页包装功能获取本实体数据
    // -----------------------------------------------------------
    
    // 基于逻辑删除体系过滤已被假删除隐藏的废弃区域条目
    let whereJson = data.whereJson || {};
    whereJson.is_del = db.command.neq(1);

    // 注入底层基于表的全套安全检查与列表整合生成 API
    res = await vk.baseDao.getTableData({
      // 需要拉取的最终物理表定位
      dbName: "base-area",
      // 此项为列表专用整合过的对象参数直抛机制
      data: data,
      whereJson: whereJson,
      // 云端通过聚合操作外键字典表直接拉取名字减少前端循环请求
      foreignDB: [
        {
          dbName: "base-dept",
          localKey: "manager_dept_id",
          foreignKey: "_id",
          as: "dept_info",
          limit: 1
        }
      ]
    });
    
    // 通过校验与执行将获得的 list 及其 count 聚合直接回复给调用的控制端界面
    return res;
  }
};
