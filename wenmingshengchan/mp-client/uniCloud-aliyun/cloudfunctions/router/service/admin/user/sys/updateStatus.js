'use strict';
module.exports = {
  /**
   * 更新用户的审核状态、封禁状态、角色、部门等边界属性
   * @url admin/user/sys/updateStatus
   * @description 管理员使用的万能用户属性修改接口，具备越权拦截守护功能
   */
  main: async (event) => {
    // 解构传入的事件对象，获取核心业务载荷 data，防伪识别参数 userInfo，工具包 util 等
    let { data = {}, userInfo, util } = event;
    // 从 util 工具包中抽取出我们需要用到的 vk 实例对象
    let { vk } = util;
    // 初始化标准的接口响应对象，并在发生抛错前默认为成功状态 {code: 0}
    let res = { code: 0, msg: '' };

    // 尝试提取前方传来的所要更改的受害/目标用户 ID 标识 (支持从 _id 或 id 中获取)
    let targetUserId = data._id || data.id;
    // 如果没有拿到明确的修改对象 ID，则立即拦截防御并抛出负代码反馈
    if (!targetUserId) return { code: -1, msg: "更新被绝壁拦截：缺失目标对象标识 (_id)" };

    try {
      // ==================【数据清洗与越权拦截守护】==================
      // 从上下文身份中抽取出当前发起人的所有角色集
      let role = userInfo.role || [];
      // 评估：此人是否包含了 'admin'（超管）或者 'super_admin'（最终大超管）的角色标签
      let isSuperAdmin = role.includes("admin") || role.includes("super_admin");
      
      // 如果发起人根本不具备超管系统全盘能力（只是一个基层分管员）
      if (!isSuperAdmin) {
        // 那他就不配直接指派和剥夺他人的 role 数组，在这里静默从载荷中抹去（剥夺）该意图
        delete data.role;
        // 同样他也无权篡改别人的归属部门关系网，同样抹去篡改请求
        delete data.department_id;
        // 也无权决定【全服开关/拉黑态】，同样封杀篡改企图
        delete data.status;
      }

      // 为了确保更新干净纯粹，避免 update 语法受意外注入，我们显式声明一个组装新字典
      let updateData = {};
      
      // 只要传来的要求中明确带有审核状态 audit_status 就将其采纳并装弹
      if (data.audit_status !== undefined) updateData.audit_status = data.audit_status;
      // 只要传来的要求中明确带有账号禁用状态 status，同理采纳
      if (data.status !== undefined) updateData.status = data.status;
      // 只要传来的要求中明确带有全新赋予的子系统身份集 role，同理采纳
      if (data.role !== undefined) updateData.role = data.role;
      // 只要传来的要求中明确带有想要将其调换往的部门 ID department_id，同理采纳
      if (data.department_id !== undefined) updateData.department_id = data.department_id;
      // 如果管理员人为修正其前台资料（昵称、头像），同样予以防失真采纳
      if (data.nickname !== undefined) updateData.nickname = data.nickname;
      if (data.avatar !== undefined) updateData.avatar = data.avatar;
      
      // 如果一波防伪鉴别和提取后，发现没有任何真实有效字段残留（全是废话）
      if (Object.keys(updateData).length === 0) {
          // 直接原路放行业务流，反馈无需大动干戈
          return { code: 0, msg: "无任何有效修改内容被通过，更新已废弃" };
      }
      
      // 调用符合 vk-fun 框架安全审计规格的底层 ORM 更新手段（使用 updateById 躲避更新灾难）
      await vk.baseDao.updateById({
        // 精确对准保存平台所有居民的终极花名册大表
        dbName: "uni-id-users",
        // 瞄准刚刚鉴定解析出来的那位居民识别码 ID
        id: targetUserId,
        // 将准备好的那份“部分更新辞海”盖到其身上完成部分覆盖
        dataJson: updateData
      });
      // 【关键修正】: vk-fun 严格规定云函数出口必须是标准的 JSON 对象且自带 code。不能直接返回 updateById 可能会输出的数字 1
      return { code: 0, msg: '权限与档案界定生效！' };
    } catch (err) {
      // 发生严重程序级别意外（例如字段类型互斥、断网、锁死），由云端最高处理中枢负责接盘输出安全报错
      return { code: -1, msg: "防越权与执行区间发生底层异常脱敏阻断", err: err };
    }
  }
}
