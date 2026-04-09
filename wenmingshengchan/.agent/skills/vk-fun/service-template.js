'use strict';
/**
 * ====================================================================
 * vk-fun 技能 - 云函数标准模板 (service-template.js)
 * ====================================================================
 * 宪法强制项：
 *   1. 全量解构：data, userInfo, util, filterResponse, originalParam
 *   2. 工具注入：customUtil, uniID, config, pubFun, vk, db, _
 *   3. 上下文合规：客户端信息通过 originalParam.context 获取
 *   4. pub 目录需用户信息时，data 中传入 need_user_info: true
 * ====================================================================
 */

module.exports = {
  /**
   * [函数描述]
   * @url 模块名/权限级别/函数名
   * @description 详细描述
   * @param {Object} data.参数名 参数说明
   */
  main: async (event) => {
    // ============ 第一层解构：event（全量，不可省略） ============
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;

    // ============ 第二层解构：util（全量，不可省略） ============
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;

    // ============ 第三层解构：data（按需） ============
    let { uid } = data;

    // ============ 返回值初始化 ============
    let res = { code: 0, msg: '' };

    // 业务逻辑开始-----------------------------------------------------------

    // 【示例】获取客户端上下文信息（严格通过 originalParam.context）
    // let { PLATFORM, OS, APPID, DEVICEID, LOCALE } = originalParam.context || {};

    // 【示例】在 pub 目录下获取用户信息
    // 前端调用时需传入 { need_user_info: true }
    // if (userInfo && userInfo.uid) { ... }

    // 【示例】基础 CRUD
    // let id = await vk.baseDao.add({ dbName: '表名', dataJson: { ... } });
    // let info = await vk.baseDao.findById({ dbName: '表名', id: 'xxx' });
    // await vk.baseDao.update({ dbName: '表名', whereJson: { _id: 'xxx' }, dataJson: { ... } });
    // await vk.baseDao.del({ dbName: '表名', whereJson: { _id: 'xxx' } });

    // 【示例】分页查询（配合万能表格）
    // res = await vk.baseDao.getTableData({
    //   dbName: '表名',
    //   pageIndex: data.pageIndex,
    //   pageSize: data.pageSize,
    //   whereJson: {},
    //   sortArr: [{ name: '_add_time', type: 'desc' }],
    //   fieldJson: {},
    //   foreignDB: [],
    // });

    // 业务逻辑结束-----------------------------------------------------------
    return res;
  },
};
