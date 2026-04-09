'use strict';
module.exports = {
  /**
   * 修改文章分类接口
   * @url admin/info/category/sys/update
   * @description 响应通过管理台传入的基础字段变更。对于不想变更的不传递就做忽视处理。
   */
  main: async (event) => {
    // 将整个事件模型中的载荷与底层执行引擎结构剥离提取
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };
    
    // 对获取到的变更意图核心值进行拆分装箱
    let { _id, name, sort, status } = data;
    
    // 若找不到更改对象门牌号，立马断刀喝止，决不往下越半步引发脏异常
    if (!_id) return { code: -1, msg: "修改前须精确核对其专有目标分类ID，禁止盲改" };

    let dbName = "info-category"; // 操作集合定位环
    
    // 组装升级挂件包：对于无需修改或者根本不处于变动行列内（如 undefined）的值不能覆盖掉原来的好数据
    let updateData = {};
    if (name !== undefined) updateData.name = name;      // 新名称捕获
    if (sort !== undefined) updateData.sort = sort;      // 新排序权重值捕获
    if (status !== undefined) updateData.status = status; // 生命状态切换（启用/停用）捕捉

    // 通知底层数据库运用 updateById 定向制导单一特定文档修改操作，极大地提高了寻觅执行效率
    res.num = await vk.baseDao.updateById({
      dbName: dbName,      // 对准库表目标
      id: _id,             // 抛出门牌标致
      dataJson: updateData // 挂上需升级覆盖挂件组件包
    });

    return res; // 响应前端反馈影响成功的总文档变更数 (num)
  }
}
