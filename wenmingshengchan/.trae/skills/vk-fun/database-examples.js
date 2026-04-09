'use strict';
/**
 * ====================================================================
 * vk-fun 技能 - 数据库操作全量示例 (database-examples.js)
 * ====================================================================
 * 本文件为宪法第七章 DB Norm 的可运行参考代码。
 * 涵盖：增删改查、分页、连表、树形、聚合、原子操作、事务。
 * ====================================================================
 */

module.exports = {
  // =====================================================================
  // 1. 基础 CRUD
  // =====================================================================

  /** 添加单条 */
  add: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    res.id = await vk.baseDao.add({
      dbName: '表名',
      dataJson: {
        name: '张三',
        age: 18,
        status: 1,
      },
    });

    return res;
  },

  /** 批量添加 */
  adds: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    res.ids = await vk.baseDao.adds({
      dbName: '表名',
      dataJson: [
        { name: '张三', age: 18 },
        { name: '李四', age: 20 },
      ],
    });

    return res;
  },

  /** 按 ID 删除 */
  deleteById: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    await vk.baseDao.deleteById({
      dbName: '表名',
      id: data._id,
    });

    return res;
  },

  /** 条件删除 */
  del: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    await vk.baseDao.del({
      dbName: '表名',
      whereJson: { status: 0 },
    });

    return res;
  },

  /** 按 ID 修改 */
  updateById: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    await vk.baseDao.updateById({
      dbName: '表名',
      id: data._id,
      dataJson: { name: '李四' },
    });

    return res;
  },

  /** 条件修改 */
  update: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    await vk.baseDao.update({
      dbName: '表名',
      whereJson: { _id: data._id },
      dataJson: { name: '李四', status: 1 },
    });

    return res;
  },

  /** 按 ID 查询单条 */
  findById: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    res.info = await vk.baseDao.findById({
      dbName: '表名',
      id: data._id,
      fieldJson: { password: false, token: false }, // 排除敏感字段
    });

    return res;
  },

  /** 条件查询单条 */
  findByWhereJson: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    res.info = await vk.baseDao.findByWhereJson({
      dbName: '表名',
      whereJson: { mobile: data.mobile },
    });

    return res;
  },

  // =====================================================================
  // 2. 全量查询（⚠️ select 返回对象，不是数组！）
  // =====================================================================

  /**
   * ⚠️ 致命陷阱：vk.baseDao.select() 返回 { rows, total, pagination } 对象
   * 必须取 .rows 才能拿到数据数组，否则传给 arrayToTree 等会返回空结果
   */
  selectAll: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    // ⚠️ select() 返回对象，不是数组！
    let result = await vk.baseDao.select({
      dbName: '表名',
      whereJson: { status: 1 },
      pageSize: 500,            // 默认只返回 10 条，查全量必须设大
      sortArr: [{ name: 'sort', type: 'asc' }],
    });
    let list = result.rows || [];  // ← 取 .rows 才是数组

    // 此时 list 才可以传给 arrayToTree 或做 .length / .map / .filter 等操作
    res.tree = vk.pubfn.arrayToTree(list, {
      id: '_id',
      parent_id: 'parent_id',
      children: 'children',
    });

    return res;
  },

  // =====================================================================
  // 3. 分页查询（配合万能表格 vk-data-table）
  // =====================================================================

  /** 标准分页 */
  getTableData: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    res = await vk.baseDao.getTableData({
      dbName: '表名',
      pageIndex: data.pageIndex,
      pageSize: data.pageSize,
      whereJson: {},
      sortArr: [{ name: '_add_time', type: 'desc' }],
      fieldJson: {},
      foreignDB: [],
    });

    return res;
  },

  // =====================================================================
  // 3. 万能连表查询 (foreignDB) — 宪法强制
  // =====================================================================

  /** 多表连接 + getMain + getOne */
  selects: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    res = await vk.baseDao.selects({
      dbName: 'order',
      getCount: true,
      pageIndex: data.pageIndex || 1,
      pageSize: data.pageSize || 10,
      whereJson: {},
      fieldJson: {},
      sortArr: [{ name: '_add_time', type: 'desc' }],
      // 副表列表
      foreignDB: [
        {
          dbName: 'uni-id-users',
          localKey: 'user_id',
          foreignKey: '_id',
          as: 'userInfo',
          limit: 1,
          // getMain 强制：将副表结果提到主表同级
          // getOne 强制：副表只取一条时返回对象而非数组
        },
        {
          dbName: 'goods',
          localKey: 'goods_id',
          foreignKey: '_id',
          as: 'goodsInfo',
          limit: 1,
          fieldJson: { name: true, price: true, cover: true },
        },
      ],
    });

    return res;
  },

  // =====================================================================
  // 4. 树形查询 (treeProps) — 宪法强制
  // =====================================================================

  /** 递归树形结构 */
  tree: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    res = await vk.baseDao.getTableData({
      dbName: 'opendb-admin-menus',
      whereJson: {
        enable: true,
        parent_id: null, // 只查根节点
      },
      treeProps: {
        id: 'menu_id',           // 唯一标识字段，默认为 _id
        parent_id: 'parent_id',  // 父级标识字段
        children: 'children',    // 返回的下级字段名
        level: 3,                // 最大层级（最大 15）
        limit: 500,              // 每一级最大返回数
        whereJson: {
          enable: true,          // 子级筛选条件
        },
      },
    });

    return res;
  },

  // =====================================================================
  // 5. 原子操作 — 宪法强制
  // =====================================================================

  /** _.inc 自增（计数器、余额变更） */
  atomicIncrement: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    await vk.baseDao.update({
      dbName: '表名',
      whereJson: { _id: data._id },
      dataJson: {
        view_count: _.inc(1),     // 浏览量 +1
        money: _.inc(-100),       // 余额 -100（扣费）
      },
    });

    return res;
  },

  /** updateAndReturn 原子更新并返回（宪法强制用于状态变更） */
  atomicUpdateAndReturn: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    res.info = await vk.baseDao.updateAndReturn({
      dbName: '表名',
      whereJson: { _id: data._id },
      dataJson: {
        money: _.inc(1),
      },
    });

    return res;
  },

  // =====================================================================
  // 6. 数组字段操作
  // =====================================================================

  /** 数组追加/移除 + 索引查询 */
  arrayOperations: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    // 追加元素
    await vk.baseDao.update({
      dbName: '表名',
      whereJson: { _id: data._id },
      dataJson: { tags: _.push('newTag') },
    });

    // 移除元素
    await vk.baseDao.update({
      dbName: '表名',
      whereJson: { _id: data._id },
      dataJson: { tags: _.pull('oldTag') },
    });

    // 数组索引查询（宪法强制格式：'arr.0'）
    res.info = await vk.baseDao.findByWhereJson({
      dbName: '表名',
      whereJson: { 'tags.0': 'firstTag' },
    });

    // 数组包含
    res.list = await vk.baseDao.getTableData({
      dbName: '表名',
      whereJson: { tags: _.all(['tag1', 'tag2']) },
    });

    return res;
  },

  // =====================================================================
  // 7. 聚合查询
  // =====================================================================

  /** 计数 / 求和 / 最大值 / 最小值 / 平均值 */
  aggregate: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    res.count = await vk.baseDao.count({
      dbName: '表名',
      whereJson: { status: 1 },
    });

    res.sum = await vk.baseDao.sum({
      dbName: '表名',
      fieldName: 'money',
      whereJson: { status: 1 },
    });

    res.max = await vk.baseDao.max({
      dbName: '表名',
      fieldName: 'money',
      whereJson: { status: 1 },
    });

    res.min = await vk.baseDao.min({
      dbName: '表名',
      fieldName: 'money',
      whereJson: { status: 1 },
    });

    res.avg = await vk.baseDao.avg({
      dbName: '表名',
      fieldName: 'money',
      whereJson: { status: 1 },
    });

    return res;
  },

  // =====================================================================
  // 8. 事务操作
  // =====================================================================

  /** 数据库事务（转账场景示例） */
  transaction: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    const transaction = await vk.baseDao.startTransaction();
    try {
      // 扣减发送方余额
      await vk.baseDao.updateAndReturn({
        db: transaction,
        dbName: 'account',
        whereJson: { _id: data.from_id, money: _.gte(data.amount) },
        dataJson: { money: _.inc(-data.amount) },
      });

      // 增加接收方余额
      await vk.baseDao.updateAndReturn({
        db: transaction,
        dbName: 'account',
        whereJson: { _id: data.to_id },
        dataJson: { money: _.inc(data.amount) },
      });

      // 提交事务
      await transaction.commit();
      res.msg = '转账成功';
    } catch (err) {
      // 事务回滚
      return await vk.baseDao.rollbackTransaction({
        db: transaction,
        err,
      });
    }

    return res;
  },

  // =====================================================================
  // 9. 常用查询指令速查
  // =====================================================================

  /** 查询指令组合示例 */
  queryCommands: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    res = await vk.baseDao.getTableData({
      dbName: '表名',
      whereJson: {
        // 比较
        age: _.gt(18),                           // 大于
        // age: _.gte(18),                        // 大于等于
        // age: _.lt(60),                         // 小于
        // age: _.lte(60),                        // 小于等于
        // status: _.neq(0),                      // 不等于

        // 范围
        // status: _.in([1, 2, 3]),               // 包含
        // status: _.nin([0]),                     // 不包含

        // 组合
        // age: _.gt(18).and(_.lt(60)),           // 且
        // _id: _.or(_.eq('001'), _.eq('002')),   // 或

        // 模糊搜索
        // name: new RegExp(data.keyword),

        // 字段存在
        // avatar: _.exists(true),
      },
      sortArr: [{ name: '_add_time', type: 'desc' }],
    });

    return res;
  },
};
