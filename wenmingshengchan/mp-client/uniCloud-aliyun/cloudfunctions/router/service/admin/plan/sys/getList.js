'use strict';
module.exports = {
  /**
   * 获取日计划管理列表 (B端后台管理员综合监控)
   * @url admin/plan/sys/getList
   * @description 具备综合查询及数据表关联，提供下辖部门及处理人员连带拉取，内含惰性洗库判定机制。
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    // 获取云端JQL语法扩展实例和下沉模块
    let { vk, db, _ } = util;

    let res = { code: 0, msg: '' };

    // -------------------------------------------------------------
    // 执行点一：被动式（惰性）死线过期自动洗库降级判定
    // 代替 Cron 的高负载循环，当且仅当发生请求列出此表结构时
    // 会将被遗忘的计划自动转化为逾期状态
    // -------------------------------------------------------------
    const now = Date.now(); // 摘录当前请求发生的绝对时间节点
    try {
      // 触发展开判定所有执行中且跨过了 DDL 时限的记录
      await db.collection("daily-plan").where({
        status: _.in([0, 1]), // 0执行未果 1提交未审批
        deadline_time: _.lt(now), // 要求界限小于当前时间
        is_del: _.neq(1) // 剔除已被安全降解或历史归档软删的数据
      }).update({
        // 利用聚合处理条件进行平行更新分流状态机
        status: _.cond([
          [_.eq('status', 0), 4], // 无响应直接逾期
          [_.eq('status', 1), 5], // 有响应无验收判为超时未验收
          [true, 0] // 默认回弹
        ])
      });
    } catch (err) {
      // 忽略此并发执行引发的轻微阻塞锁竞争结构性报错，不影响主轴出列业务
    }

    // -------------------------------------------------------------
    // 执行点二：挂载强制业务安全过滤锁并重写复杂多表逻辑
    // -------------------------------------------------------------
    // 吸纳前端传递在 JSON 里的查询意图，比如模糊搜查/状态栏点选
    let whereJson = data.whereJson || {};
    // 强制插入隐形查询断言点，决不允许调出 is_del(物理已摧毁/软删) 的行项
    whereJson.is_del = _.neq(1); 

    // 执行跨集合(Collection)表联查，进行联想赋值(例如反推管理员代号)
    res = await vk.baseDao.getTableData({
      dbName: "daily-plan",
      data: data,
      whereJson: whereJson,
      foreignDB: [
        {
          // 关联发件人账户花名册，通过 _id 和表中的 issuer_uid 挂钩
          dbName: "uni-id-users",
          localKey: "issuer_uid",
          foreignKey: "_id",
          as: "issuer_info", // 虚设的外部挂载名称
          limit: 1, // 最高配给抓取一条
          fieldJson: { nickname: true } // 屏蔽繁杂仅抽调名字
        },
        {
          // 左联所属机构/部门行政表，利用该指派对象的归属 dept_id 反推部门全称
          dbName: "base-dept",
          localKey: "dept_id",
          foreignKey: "_id",
          as: "dept_info",
          limit: 1,
          fieldJson: { name: true }
        }
      ]
    });

    return res;
  }
}
