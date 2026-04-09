// 导出的默认对象，所有的业务 API 将挂载至此处暴露出来
module.exports = {
  /**
   * 修改部门
   * @url admin/base-dept/sys/update
   */
  // main 就是云函数每次受到 HTTP 或者 API 召唤的最前端的闸门触发口
  main: async (event) => {
    // 拉取事件上下文，解析前端带来的 data 与服务端系统预设的 util
    let { data = {}, util } = event;
    // 直接解构拿出万能的操作库对象 vk (也就是包含了 baseDao 等工具的核心包)
    let { vk } = util;
    // 构建初始化成功的状态反馈空壳结构 
    let res = { code: 0, msg: '' };
    
    // 获取提交更改信息里面的记录的唯一识别字符 _id
    let _id = data._id;
    // 如果无此关键 _id 则终止拦截该次异常提交
    if (!_id) return { code: -1, msg: "缺少_id字段，操作对象不明" };

    // 进行特别的场景防护守护：判定是否管理员把前端传入状态变更为了“禁用(0)”
    if (data.status === 0) {
      // 只要一旦触发冻结、禁用动作便进入底层的拦截盘查逻辑计算有无牵连
      let userCount = await vk.baseDao.count({
        // 查找指向系统的统一鉴权数据集合：uni-id-users 
        dbName: "uni-id-users",
        // 条件就是：目前该部门辖下还有正在运作的活人信息遗留
        whereJson: { department_id: _id }
      });
      // 统计大于零说明存在强依赖牵涉，不可随便变更业务架构生存状态
      if (userCount > 0) {
        // 直接返回业务逻辑阻断错误码给到表单前台从而禁止后续动作发生
        return { code: -1, msg: "安全协议冲突：该部门辖下还有关联人员，禁止冻结或下线部门节点" };
      }
    }

    // 倘若经过层层拦截仍旧安全无虞，则最终委托底座引擎触发实际硬层面的修改指令
    res.num = await vk.baseDao.updateById({
      // 更新作用域所在的表名称
      dbName: "base-dept",
      // 指定精准到 _id 进行修改靶向
      id: _id,
      // 直接把前端携带修改好的更新 JSON 对象铺进去覆写数据库文档
      dataJson: data
    });
    // 无错结束，把带有成功修改记录量的 res 主体吐给调用的页面端
    return res;
  }
};
