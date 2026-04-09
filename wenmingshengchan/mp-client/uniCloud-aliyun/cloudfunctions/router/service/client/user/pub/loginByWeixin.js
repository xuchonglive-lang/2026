module.exports = {
  /**
   * 微信静默登录与授权
   * @url client/user/pub/loginByWeixin
   * @description 通过微信授权获取登录信息并同步微信昵称和头像
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };
    
    // --------------------------------业务逻辑开始--------------------------------
    // 从前端请求体中提取临时登录凭证 code 和 前端捕获的用户信息 clientUserInfo
    let { code, userInfo: clientUserInfo = {} } = data;
    // 如果前端没有传微信授权 code，则拦截报错，因为该接口强依赖微信 code 换取 session
    if (!code) return { code: -1, msg: '缺少code参数，无法启动鉴权' };

    // 调用 uniID 内置的 loginByWeixin 方法底层进行 code 校验及拉取 openid。如果是不存在的用户，系统会自动创建（静默注册）
    res = await uniID.loginByWeixin({
      // 指定第三方提供商为微信小程序
      provider: 'weixin',
      // 将前端带来的微信凭据传入
      code: code,
      // 启用新版权限返回特征，返回的数据更加规整
      needPermission: true
    });
    
    // 若返回的 type 为 'register'，代表这是一个彻头彻尾的全新用户，首次在平台注册成功
    if (res.code === 0 && res.type === 'register') {
      // 补充标志位告知前端，要求前端引导进入【信息完善弹窗】或页面
      res.isNewUser = true;
    }
    
    // 如果微信换取并拉起 user 档案完毕，且未抛出错误（即有合法的 uid 生成或返回）
    if (res.code === 0 && res.uid) {
      // 构建我们需要同步给这名用户的更新实体数据字典
      let updateData = {};

      // 1. 提取并兼容多种微信特性的头像键名
      let finalAvatar = clientUserInfo.avatar || clientUserInfo.avatarUrl;
      if (finalAvatar) updateData.avatar = finalAvatar;

      // 2. 提取并兼容多种微信特性的昵称键名
      let finalNickname = clientUserInfo.nickname || clientUserInfo.nickName;
      if (finalNickname) updateData.nickname = finalNickname;

      // 3. 如果恰好该名用户为第一次注册（新用户），追加【新手村】初始化参数，彻底完善账户骨架！！！
      if (res.isNewUser) {
        updateData.audit_status = 0;   // 进度标记：0 = 资料待完善（需后续提交姓名/部门/手机号）
        updateData.status = 0;         // 封禁标记：0 = 正常活跃态
        updateData.role = ["user"];    // 身份矩阵：初始剥夺并重置为底层群众 (user)
        
        // 可选：将最原始微信档案双重备份存放至 wx_userinfo (很多 uni-id 老插件极度依赖此字段)
        updateData.wx_userinfo = {
          avatarUrl: finalAvatar || "",
          nickName: finalNickname || ""
        };
      }

      // 如果成功提取到了有价值的同步信息（不为空对象）或者恰逢新用户必须补充初始化血肉
      if (Object.keys(updateData).length > 0) {
        // 利用安全的 vk.baseDao 组件通过主键执行数据库的部分键值更新
        await vk.baseDao.updateById({
          // 指向系统内定存放用户花名册的主表
          dbName: "uni-id-users",
          // 指定修改的具体用户的数据标识，也就是我们要改哪位成员
          id: res.uid,
          // 指定你要向其身上覆盖的新字典（微信昵称、头像更新及新用户初始化结构）
          dataJson: updateData
        });
      }

      // 既然前面或许做出了修改，我们需要向数据库重抽一份彻底的最新鲜画像返还给客户端内存
      let currentUser = await vk.baseDao.findById({
        // 指定所要查询的表
        dbName: "uni-id-users",
        // 利用其确定的身份 ID 追查
        id: res.uid
      });
      // 查到本尊后
      if (currentUser) {
        // 将新鲜刚出炉带有头像和昵称的用户主源体覆写原本略显薄弱的 session 上帝视角数据
        res.userInfo = Object.assign(res.userInfo || {}, currentUser);
      }
    }
    // --------------------------------业务逻辑结束--------------------------------
    // 将满载登录状态，新用户标识与完善后最新实体数据的集合上交给前端环境接手
    return res;
  }
}
