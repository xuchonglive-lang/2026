// 统一的基础核心云端控制方法出口配置封装
module.exports = {
  // 定义方法的对外开放识别说明
  /**
   * 添加业务区域
   * @url admin/base-area/sys/add
   */
  // 系统接收来自外部请求命令第一首要响应逻辑处理函数
  main: async (event) => {
    // 攫取来自外部端通过协议传输进来的数据负载以及平台工具参数 util
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    // 分拣出进行各种复杂后端业务关联查控修改所必需依赖底层包
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    // 设置并规定函数将会在理想情形下的默认安全标准输出包裹体
    let res = { code: 0, msg: '' };
    
    // -----------------------------------------------------------
    // 业务逻辑开始
    // -----------------------------------------------------------
    
    // 获取欲添加新增的关键业务项：新建的网格名
    let name = data.name;
    // 倘若没填必须的名称进行非法提交则从服务器源头立刻拒绝返回并弹明原委
    if (!name) return { code: -1, msg: "业务区域名称必须填写" };

    // 获取欲关联的大架构组织的记录ID
    let deptId = data.manager_dept_id;
    // 进行防呆阻止若此节点竟然未关联大部门节点则属于死业务也应当弹回
    if (!deptId) return { code: -1, msg: "必须选择所挂靠的管辖大组织" };

    // 通过直接传递组装完毕的安全业务载荷交给底层自动自增模块处理保存持久记录
    res.id = await vk.baseDao.add({
      // 指向保存数据的归属：组织空间
      dbName: "base-area",
      // 一同转入本次新增业务所有的前台设定字段信息
      dataJson: data
    });
    
    // 提交圆满完成则向端系统发送带有返回添加完毕唯一标识 ID 的响应信号
    return res;
  }
};
