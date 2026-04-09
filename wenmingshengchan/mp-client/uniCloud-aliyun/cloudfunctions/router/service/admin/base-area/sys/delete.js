// 导出模块主对象，由前端调用触发
module.exports = {
  /**
   * 删除业务区域
   * @url admin/base-area/sys/delete
   * data 请求参数 说明
   * @param {String} _id 		区域ID
   */
  // 云函数的主逻辑触发点
  main: async (event) => {
    // 从框架底层获得传入的事件对象以及相关的系统数据
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    // 分解拿到操作底层数据库的核心 api 如 vk 对象，及内部方法包
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    // 生成安全标准的正常返回主体对象
    let res = { code: 0, msg: '' };
    
    // -----------------------------------------------------------
    // 业务逻辑开始
    // -----------------------------------------------------------
    
    // 攫取本次用户将要处理的核心 id 即数据项唯一标示键
    let _id = data._id;
    // 如果为空直接切断拦截此非正常请求报文
    if (!_id) return { code: -1, msg: "缺少_id字段" };

    // 守护检查：运用底层内置查询核查是否有活跃点位依附在目前正将擦除的区域中
    let pointCount = await vk.baseDao.count({
      // 验证目标聚焦在 base-point 也就是负责前线的那个作业点位子业务集
      dbName: "base-point",
      // 从那些子集中找看存不存在其挂载标志位（包含区域）依然填着目前_id的记录
      whereJson: { area_id: _id }
    });
    // 若查出来只要不是 0 都算拦截范围内，说明仍关联强业务下放的活动点
    if (pointCount > 0) {
      // 强制输出错误代码和阻断中文提示语予以管理员规劝去先解除这些点的相关
      return { code: -1, msg: "死锁拦截：该业务区域中存在已登记的物理点位，需先解绑点位关联，禁止强制擦除区域" };
    }

    // 以上强关联卡口皆通过之后即可合法地行使得删除数据的业务流转下去
    res.num = await vk.baseDao.updateById({
      // 执行清理操作作用在业务所处的业务区域 base-area 的这个集合内部
      dbName: "base-area",
      // 将上述确凿证明安全的 id 给过去实施终结
      id: _id,
      dataJson: {
        is_del: 1
      }
    });
    // 回传带有 num 个成功影响数量值的数据作为成功的明证送还前台客户端显示
    return res;
  }
};
