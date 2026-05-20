module.exports = {
  /**
   * 用户登录（微信手机号授权登录）
   * @url client/user/pub/loginByWeixinPhoneNumber 前端调用的url参数地址
   */
  main: async (event) => {
    let { data = {}, util, originalParam } = event;
    let { uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = {};
    // 业务逻辑开始-----------------------------------------------------------
    let { nickname, avatar, gender, inviteCode, encryptedData, iv, encryptedKey, code } = data;

    // 标记当前平台的provider
    const provider = 'wx';
    const providerName = '微信';

    // 获取绑定的手机号
    res = await vk.openapi.weixin.decrypt.getPhoneNumber({
      encryptedKey,
      code,
      encryptedData,
      iv,
    });
    if (res.code !== 0) return res;
    let { mobile } = res;
    let mobileCode = vk.pubfn.random(6);
    
    // 通过手机号登录
    await uniID.setVerifyCode({ mobile, code: mobileCode, expiresIn: 60, type: 'login' });
    res = await uniID.loginBySms({ mobile, code: mobileCode, type: data.type, inviteCode });
    if (!res.token) return res;
    if (!res.msg) {
      res.msg = res.type === 'register' ? '注册成功' : '登录成功';
    }
    if (res.type === 'register') {
      if (!res.userInfo._id) res.userInfo._id = res.uid;
      let mobileStr = mobile.substring(7);
      let customData = {
        nickname: nickname || `手机尾号${mobileStr}用户`,
        avatar,
        gender,
      };
      if (encryptedKey) {
        const loginUtil = vk.require('service/user/util/loginUtil');
        await loginUtil.bind(
          {
            clientInfo: originalParam.context,
            userInfo: res.userInfo,
            provider,
            providerName,
            encryptedKey,
            customData,
          },
          util
        );
      } else {
        res.userInfo = await vk.baseDao.updateAndReturn({
          dbName: 'uni-id-users',
          whereJson: {
            _id: res.uid,
          },
          dataJson: customData,
        });
      }
    }
    
    // 日志服务
    const loginLogService = vk.require('service/user/util/loginLog');
    await loginLogService.add(
      {
        type: res.type,
        login_type: 'weixinPhoneNumber',
        user_id: res.uid,
        context: originalParam.context,
      },
      util
    );
    
    return res;
  },
};
