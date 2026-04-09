/**
 * 自定义过滤器 - 客户端认证状态全局死锁守卫
 */
module.exports = [
  {
    id: 'auditStatusFilter',
    regExp: '^.*/kh/.*', // 拦截所有客户授权端需要 Token 的接口
    description: '客户端认证状态全局死锁守卫，如果未通过审核则拦截非白名单操作',
    index: 310, 
    mode: 'onActionExecuting', 
    enable: true, 
    main: async function (event) {
      let { url, util, userInfo = {} } = event;
      let { vk } = util;

      // 白名单：充当免审核可用的接口，如查询自己状态、拉取菜单权限等
      const whiteList = [
        'user/kh/getMyUserInfo',
        'user/kh/getMenu', // 修复 vk-fun 底层拉取菜单权限时的拦截404
        'user/kh/updateUserRecord',
        'user/kh/closeAccount',
        'user/kh/unbindWeixin', // 如果有解绑需求
        'client/user/kh/updateUserInfo', 
        'client/user/kh/getMineProfile'
      ];
      
      if (whiteList.includes(url)) {
        return { code: 0, msg: '' };
      }

      // 如果 token 缓存的 audit_status 不等于 3（全量通过），为了防止滞后，做一次实时查库验证
      if (userInfo.audit_status !== 3) {
        let currentStatus = userInfo.audit_status || 0;
        let userId = userInfo.uid || userInfo._id || event.uid; // 增加备用取值
        
        // 【关键修复】：如果连 userId 都没有，说明请求根本没有携带有效 Token（未登录）。
        // 此时不该由权限过滤器拦截，应放行给底层 Token 过滤器去拦截并弹出“请先登录”，或者如果该接口本就是免登接口则直接放行。
        if (!userId) {
          return { code: 0, msg: '' };
        }

        let dbStatus = -999;
        let querySuccess = false;
        if (userId) {
          let userDoc = await vk.baseDao.findById({
            dbName: "uni-id-users",
            id: userId
          });
          if (userDoc) {
            querySuccess = true;
            currentStatus = userDoc.audit_status || 0;
            dbStatus = currentStatus;
            if (currentStatus === 3) {
              return { code: 0, msg: '' }; // 数据库中已经是3，放行
            }
          }
        }

        return {
          code: -1002,
          msg: `抱歉，您的账号未通过系统认证(当前状态:${currentStatus})，请等待管理员审核！`,
          audit_status: currentStatus
        };
      }
      
      return {
        code: 0,
        msg: '',
      };
    },
  },
];
