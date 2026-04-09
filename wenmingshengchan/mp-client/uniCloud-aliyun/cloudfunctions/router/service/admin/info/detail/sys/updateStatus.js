'use strict';
module.exports = {
  /**
   * 快捷拨动文章在架视野切换器 (快捷上下架)
   * @url admin/info/detail/sys/updateStatus
   * @description 为了使运营操作员不需要点进沉重的细枝末节页面即可干脆利落地一键剥夺某文章前台暴露权，打造该极简切换接口。
   */
  main: async (event) => {
    // 获取云环境挂载上下文工具链以及客户端事件携带包裹
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;

    // 定位目标标识及其最新的在离架状态（0代表下架退隐，1代表光耀于世上架）
    let { _id, status } = data;
    
    // 如果没有这两个任何一端的决绝操作符，直接拦截丢弃避免弄乱数据
    if (!_id || status === undefined) return { code: -1, msg: "无规不成方圆：由于在架状态码缺失导致动作中止" };

    // 人性化的系统反馈回馈包，拨号 1 就响应“上架成功”，拨 0 则是“已沉沦下架”
    let res = { code: 0, msg: status === 1 ? "恭贺该篇文章隆重上架发排！" : "此篇推文已沉沦下架隐藏" };
    
    // 通知底层数据库运用 updateById 定向制导单一特定文档修改操作，极大地提高了寻觅执行效率
    res.num = await vk.baseDao.updateById({
      dbName: "info",          // 操作池锁定核心资讯库
      id: _id,                 // 对这把具体的钥匙动手
      dataJson: { status: status } // 极其干净、纯粹地下派最新的启用开关门闭值
    });

    return res;
  }
}
