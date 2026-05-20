// 输出云函数对象，暴露被公网网关请求控制入口
module.exports = {
  // 面向后台接口字典的标准记录头，明示功能作用
  /**
   * 新增录入现场点位业务信息
   * @url admin/base-point/sys/add
   */
  // main 函数担当每一次外界调用发生的主控关卡截留处理者
  main: async (event) => {
    // 拉取事件触发携带进来的用户填报数据参数结构 data 与系统集成工具箱体 util
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    // 攫取内置各种辅助的系统包及底层对象 vk
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    // 包装好初始状态视为已过检无阻的安全信封待送出
    let res = { code: 0, msg: '' };

    // -----------------------------------------------------------
    // 业务逻辑防死锁开启
    // -----------------------------------------------------------

    // 提取使用者尝试新登入到库的名字值键
    let name = data.name;
    // 若系统捕获其意欲跳过必填名即刻拒绝返回
    if (!name) return { code: -1, msg: "点位名字不能为空" };

    // 接下来检查业务网必须绑定的网格归属及物理隶属区域
    if (!data.area_id) return { code: -1, msg: "必须选择所属区域" };
    if (!data.manager_dept_id) return { code: -1, msg: "必须选择责任小组" };

    // 防线悉数确认无误之后放行底层数据库进行新增数据存盘
    res.id = await vk.baseDao.add({
      // 指向末端的叶子节点数据基站群库名 base-point
      dbName: "base-point",
      // 将整一份来自于网页传包而来的填写字典悉数注入新表单列内
      dataJson: data
    });

    // 交出获得生成的那一串 uuid 序列成功记录反馈给界面
    return res;
  }
};
