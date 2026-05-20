module.exports = {
  /**
   * 用户登录 - 微信登录（新版）
   * @url client/user/pub/loginByWeixin 前端调用的url参数地址
   * @description 支持APP、微信小程序、微信公众号
   * data 请求参数 说明
   * @param {String} code 登录返回的code
   * @param {String} type 指定操作类型，可选值为login、register，不传此参数时表现为已注册则登录，未注册则进行注册
   * @param {String} nickname 用户昵称，仅注册时有效
   * @param {String} avatar 用户头像，仅注册时有效
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} token 登录成功之后返回的token信息
   * @param {String} tokenExpired token过期时间
   * @param {Object} userInfo 用户信息
   */
  main: async (event) => {
    let { data = {}, util, originalParam } = event;
    let { uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };
    // 业务逻辑开始-----------------------------------------------------------
    let { code, type, nickname, avatar } = data;

    if (!code) {
      return { code: -1, msg: 'code不能为空' };
    }

    // 标记当前平台的provider
    const provider = 'wx'; // 历史原因，这里用wx，而非weixin

    // 如果有platform参数，则使用platform参数，否则从context中获取
    if (data.platform) originalParam.context.PLATFORM = data.platform;

    let platform = vk.pubfn.getPlatformForUniId(originalParam.context);

    // 额外写入的自定义字段数据
    let customData = {
      nickname,
      avatar,
    };

    // 额外返回给前端的数据
    let extraRes = {};

    let customConfig = {};
    if (data.appid) {
      customConfig.appid = data.appid;
    }

    // code获取openid
    let code2SessionRes = await vk.openapi.weixin.auth.code2Session({
      context: originalParam.context,
      code,
      needKey: true,
      ...customConfig,
    });
    if (code2SessionRes.code !== 0) {
      return code2SessionRes;
    }
    let {
      appid,
      openid,
      unionid,
      sessionKey,
      accessToken,
      refreshToken,
      expiresIn: accessTokenExpired,
      encryptedKey,
    } = code2SessionRes;

    extraRes = {
      encryptedKey,
      openid,
      unionid,
    };
    if (['h5', 'h5-weixin', 'app-plus'].indexOf(platform) > -1) {
      let getUserInfoRes = await vk.openapi.weixin.app.auth.getUserInfo({
        access_token: accessToken,
        openid: openid,
      });
      if (!customData.nickname) customData.nickname = getUserInfoRes.nickname;
      if (!customData.avatar) customData.avatar = getUserInfoRes.headimgurl;
    }

    // 核心登录逻辑
    const loginUtil = vk.require('service/user/util/loginUtil');
    res = await loginUtil.login(
      {
        clientInfo: originalParam.context,
        type,
        provider,
        appid,
        openid,
        unionid,
        customData,
        extraRes,
        addLog: false,
      },
      util
    );

    if (res.code !== 0) {
      return res;
    }

    // 更新 sessionKey
    if (vk.system.opendbOpenDataDao) {
      let platformData = {
        'mp-weixin': 'weixin-mp',
        'app-plus': 'weixin-app',
        app: 'weixin-app',
        'h5-weixin': 'weixin-h5',
        'web-weixin': 'weixin-web',
        'web-weixin-mp': 'weixin-mp',
      };
      if (platformData[platform]) {
        let cacheKey = {
          appId: appid,
          platform: platformData[platform],
          openid,
        };
        await vk.system.opendbOpenDataDao.setSessionKey(cacheKey, { session_key: sessionKey }, 30 * 24 * 60 * 60);
      }
    }

    // 添加登录日志
    const loginLogService = vk.require('service/user/util/loginLog');
    await loginLogService.add(
      {
        type: 'login',
        login_type: 'weixin',
        user_id: res.uid,
        context: originalParam.context,
      },
      util
    );

    return res;
  },
};
