module.exports = {
  /**
   * 获取当前用户最新资料 (刷新验证态及资料呈现)
   * @url client/user/kh/getMineProfile
   */
  main: async (event) => {
    let { data = {}, userInfo, util, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let uid = userInfo ? (userInfo._id || userInfo.uid) : null;
    
    if (!uid) {
      return {
        code: -1,
        msg: '未获取到登录态'
      };
    }

    // 获取最新数据
    let newUserInfo = await vk.baseDao.findById({
      dbName: "uni-id-users",
      id: uid
    });

    if (!newUserInfo) {
      newUserInfo = {};
    }

    return {
      code: 0,
      msg: '获取成功',
      userInfo: newUserInfo
    };
  }
}
