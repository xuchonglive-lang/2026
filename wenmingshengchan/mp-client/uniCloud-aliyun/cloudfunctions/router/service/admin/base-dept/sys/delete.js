// 导出云函数的标准主控模块，暴露方法供端侧或前端拉取接口
module.exports = {
  /**
   * 删除部门
   * @url admin/base-dept/sys/delete 前端调用的url参数地址
   * data 请求参数 说明
   * @param {String} _id 		部门ID
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   */
  // main 函数为实际业务逻辑入口，接收一个 event 对象
  main: async (event) => {
    // 从 event 解析需要的内部变量：入参 data、公用工具 util 等
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    // 从 util 工具中解构核心的 vk 环境类对象及数据库操纵器等类包
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    // 提取当前身份的操作者信息 UID（如果有必要使用的话）
    let { uid } = data;
    // 定义统一的初始化标准返回对象，设定初始防误报错 code 设为 0
    let res = { code: 0, msg: '' };
    
    // -----------------------------------------------------------
    // 业务逻辑开始
    // -----------------------------------------------------------
    
    // 解析取得客户端提交需要欲删除的实体目标主键标志 _id
    let _id = data._id;
    // 若请求并未载入合法 _id 即立刻驳回返回失败消息对象终止往下跑
    if (!_id) return { code: -1, msg: "缺少_id参数，无法识别目标" };

    // 守护检查 1：调用 Dao 中基础功能检查是否有从属当前的子部门数据
    let childCount = await vk.baseDao.count({
      // 指向当前处理范围部门字典表集合
      dbName: "base-dept",
      // 条件过滤筛选，验证 parent_id 的数值是否映射指针对当前删对象的 _id
      whereJson: { parent_id: _id }
    });
    // 若查询所得存在的子项计数高于 0 ，即立刻产生严重拦截拦截异常并返回前台
    if (childCount > 0) {
      // 通过明确的话术阻止其物理级硬干预执行下去
      return { code: -1, msg: "安全拦截：该部门下存在子部门，禁止直接删除" };
    }

    // 守护检查 2：更关键的是检索平台基础人员授权数据源看是否拥有其指代的人员
    let userCount = await vk.baseDao.count({
      // 指向核心跨联系统的云端用户总管表
      dbName: "uni-id-users",
      // 定义拦截关系，筛查组织从属的 key 中是否涵盖了 _id 
      whereJson: { department_id: _id }
    });
    // 如计数值结果命中人员残留现象
    if (userCount > 0) {
      // 执行更为严重的底层物理阻断提示
      return { code: -1, msg: "安全拦截：该结构内存在已绑定的人员（包括历史档案），禁止物理删除或下线" };
    }

    // 全部风险阻断流程安全完成确认放行后，开始走底层物理清除机制逻辑，更新为逻辑删除
    res.num = await vk.baseDao.updateById({
      // 指向处理的具体数据库 collection
      dbName: "base-dept",
      // 直接通过特定的数据条目的唯一识别标号进行准星级别打压
      id: _id,
      dataJson: {
        is_del: 1
      }
    });
    // 最终完美顺利通过了操作并将记录影响条目结果一并发回终端侧进行交互回显
    return res;
  }
};
