/**
 * 自定义过滤器 - 前置，每次录入数据时，要求用户已经填入了真实姓名，
 */


/**
 * 店铺权限过滤器示例
 */
module.exports = [
  {
    id: "realNameFilter",   
    regExp: "^client/user/kh/operate/(.*)",
    description: "涉及到对信息增删改查的操作，就是operate目录下的函数，都要进行对真实用户名进行检查",
    index: 210,// 此处必须>200 因为检测用户是否登录的过滤器的index是200（越小越先执行）
    mode:"onActionExecuting", 
    enable:true, // 通过设置enable=false可以关闭该中间件
    main: async function(event) {
      let { util, filterResponse } = event;
      let { vk , db, _ } = util;
      let { userInfo = {} } = filterResponse; // 此处的 userInfo 是 kh 过滤器传过来的（kh的index是200）
      let { role = [] } = userInfo;
      let res = { code : 0, msg : 'ok' };
      // 用户没有shopManage角色则拦截。（拦截后后面的云函数将不会运行，达到了简单的权限控制效果）
      if(!userInfo.realName){
        return { code : -1, msg : '请填写真实姓名后再进行操作' };
      }
	  
	   if(role.indexOf("client-user-operate")===-1){
	          return { code : -1, msg : '您无权限执行数据操作，请联系管理员' };
	    }
      return res;
    }
  }
]
