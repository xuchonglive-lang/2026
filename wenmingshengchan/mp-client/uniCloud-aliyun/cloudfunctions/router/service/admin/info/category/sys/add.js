'use strict';
module.exports = {
  /**
   * 添加文章分类接口
   * @url admin/info/category/sys/add 前端调用路径：通常配置于 vk-data-form 的 action 参数内
   * @description 管理员用于新建分类（如: '系统通知', '车间公报' 等）。依据原则，新建数据在初始化时自带合理缺省配置。
   */
  main: async (event) => {
    // 步骤1：从上下文中解构必备的环境与数据。其中 data 承载外部打入的荷载，util 聚合着云端的核心生态环境
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    // 步骤2：运用 vk-fun 解构框架唯一的生命线 util，提炼 vk 实例，获取底层数据库连接句柄
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data; // 捕捉管理员UID
    // 步骤3：设定标准的 vk 框架统一基础返回体，默认状态0代码代表万事如意，成功直通
    let res = { code: 0, msg: '' };
    
    // 基础防抖拦截：业务核心判断。名称作为分类的唯一重要门面，绝不允许投递空值
    let name = data.name;
    if (!name) return { code: -1, msg: "非常抱歉，分类名称必须详尽填写不得放空" };

    // 数据组合：指明动作发生向往的核心数据库集合名称
    let dbName = "info-category";
    
    // 我们必须手动拼装待插入对象，杜绝一切前端未知脏数据直接丢入数据库导致库体浑浊
    let insertData = {
      name: name,                             // 承接并写入受洗过的合法名称
      sort: data.sort || 0,                   // 对排序赋以退路值：如果不传，默认排于最末 (权重0)
      status: data.status !== undefined ? data.status : 1, // 如果不传启用状态标识，缺省默认为积极在线 (1)
      is_del: 0                               // 必须初始化逻辑删除封条标示，宣示这条新分类生命勃发且免遭删除封印
    };

    // 步骤4：借由 vk.baseDao 的封装体系触发底层原子性记录建立 API
    res.id = await vk.baseDao.add({ 
      dbName,             // 指向目标域
      dataJson: insertData // 抛下组装完备的数据矩阵
    });
    
    // 将建立出来的数据库派发原石ID交付前端收卷
    return res;
  }
}
