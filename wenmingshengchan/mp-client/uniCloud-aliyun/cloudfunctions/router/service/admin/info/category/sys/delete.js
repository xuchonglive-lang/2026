'use strict';
module.exports = {
  /**
   * 删除文章分类逻辑控制站
   * @url admin/info/category/sys/delete 
   * @description 安全护栏核心：彻底摒除不留遗骸的物理拔除，落实更新 is_del = 1 标识下达的软抛弃，并且强拦截拥有活跃挂载子文章节点的危险剔除企图。
   */
  main: async (event) => {
    // 获取云环境挂载上下文工具链以及客户端事件携带包裹
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util; // 剥离 vk, db 核心连接池操控把手
    let res = { code: 0, msg: '' };
    
    let { _id } = data; // 从传入包体强行剥离要进行宣判极刑处决的分类识别码
    
    // 空虚传参直接遣返
    if (!_id) return { code: -1, msg: "缺乏靶场指令，请提供确定欲予清除的合法分类" };

    let dbName = "info-category"; // 操作靶标集合

    // 【重要护栏预判】核对有无“人肉护盾”（文章）在这层分类旗下存在
    // 这里采取 count 这种最高并发节约性能的探测术，只摸底查数不在内存解压缩数据包，节省系统算力
    let activeInfoCount = await vk.baseDao.count({
      dbName: "info",      // 面向真正宏大正文流水库寻查
      whereJson: { 
        category_id: _id,  // 指向这把断子绝孙刀待砍杀的这个分类分支
        is_del: 0          // 必须得是存活着的（不能算旧垃圾库里面已经被剔除掉的人员） 
      }
    });

    // 如果发现旗下有尚且依然存活在生产环境的文章依托它存活
    if (activeInfoCount > 0) {
      // 开启一票否决防破坏机制，绝不给这种危及全局外键绑定的命令放行
      return { code: -1, msg: "因该特定分类目前仍然作为骨干在下辖支撑若干有效业务资讯运转，强行删毁将波致大面积失格！建议前往处理其所有后裔文章后再度发起审裁" };
    }

    // 正式执行死缓斩首：绝对不能使用物理性破坏，采用平滑优雅地将其贬低至坟墓深处隐藏起来的手段
    res.num = await vk.baseDao.updateById({
      dbName: dbName,            // 回归我们要处理的分类主体
      id: _id,                   // 明确行刑分类ID
      dataJson: { is_del: 1 }    // 重点下发：改名废除为废弃状态（1=亡格）
    });

    // 清查收尾报告
    if (res.num > 0) {
      res.msg = "该分类数据防线剔除卸载完毕，现已被打入隐藏深宫不再参与运转";
    }

    // 大体收卷
    return res;
  }
}
