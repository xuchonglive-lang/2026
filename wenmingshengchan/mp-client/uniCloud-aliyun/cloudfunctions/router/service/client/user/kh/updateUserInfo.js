module.exports = {
  /**
   * 用户完善个人信息
   * @url client/user/kh/updateUserInfo
   */
  main: async (event) => {
    let { data = {}, userInfo, util, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    
    let { real_name, mobile, department_id, department_name } = data;
    
    if(!real_name || !mobile) {
      return { code: -1, msg: '缺少必填参数' }
    }

    // 更新用户数据，同时将状态改为1(待审)
    let updateData = {
      real_name,
      mobile,
      department_id,
      department_name,
      audit_status: 1
    };
    
    await vk.baseDao.updateById({
      dbName: "uni-id-users",
      id: uid,
      dataJson: updateData
    });
    
    // 获取最新数据返回给前端
    let newUserInfo = await vk.baseDao.findById({
      dbName: "uni-id-users",
      id: uid
    });

    if (!newUserInfo) {
      newUserInfo = {};
    }

    // 业务逻辑结束-----------------------------------------------------------
    return {
      code: 0,
      msg: '操作成功',
      userInfo: newUserInfo
    };
  }
}
