// 导出模块对象
module.exports = {
  /**
   * 添加部门组织
   * @url admin/base-dept/sys/add 前端调用的接口地址
   */
  // main 业务处理拦截入口函数
  main: async (event) => {
    // 解析出核心的底层数据 data，以及工具链 util
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    // 抽取底层封装工具调用 vk 等
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    // 解析发起人的用户 id (后台通常使用内置 uid 判断当前登录的管理人员)
    let { uid } = data;
    // 统一定义初始化相应结构，默认为无错误的 0
    let res = { code: 0, msg: '' };
    
    // -----------------------------------------------------------
    // 业务逻辑开始
    // -----------------------------------------------------------
    
    // 获取提交的新建组织名称
    let name = data.name;
    // 若不存在名称字段参数，立刻回传错误
    if (!name) return { code: -1, msg: "部门名称不能为空" };

    // 调用框架标准的自增添加方法，持久化保存到数据表内
    res.id = await vk.baseDao.add({
      // 指定存入的集合名称 base-dept
      dbName: "base-dept",
      // 直接把前台送来的提交数据作为完整文档 JSON 对象装入
      dataJson: data
    });
    
    // 一切完毕，安全交付返回结果对象给前端表单回调
    return res;
  }
};
