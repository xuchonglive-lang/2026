'use strict';
const planUtils = require('../../../common/plan-utils');
module.exports = {
  /**
   * B端日计划列表（多维筛选+权限隔离）
   * @url admin/plan/sys/getList
   * @description 支持日期范围、部门、区域、状态多维筛选。plan_admin 自动追加部门隔离。使用 foreignDB 关联区域/部门/下达人信息
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };
    // 业务逻辑开始-----------------------------------------------------------

    // 软删除护城河（参照 development-gotchas.md 2.3）
    let whereJson = { is_del: _.neq(1) };

    // 多维筛选条件组装
    if (data.plan_date_start && data.plan_date_end) {
      whereJson.plan_date = _.gte(data.plan_date_start).and(_.lte(data.plan_date_end));
    } else if (data.plan_date) {
      whereJson.plan_date = data.plan_date;
    }
    if (data.area_id) whereJson.area_id = data.area_id;
    if (data.status !== undefined && data.status !== '') whereJson.status = Number(data.status);

    // 权限隔离：非 super_admin 自动追加部门过滤
    let userDoc = await vk.baseDao.findById({
      dbName: 'uni-id-users',
      id: uid,
      fieldJson: { department_id: 1, role: 1 }
    });
    let userRoles = userDoc ? (userDoc.role || []) : [];

    if (!userRoles.includes('super_admin')) {
      let userDeptId = userDoc ? userDoc.department_id : '';
      whereJson.dept_id = data.dept_id || userDeptId;
    } else if (data.dept_id) {
      whereJson.dept_id = data.dept_id;
    }

    let listRes = await vk.baseDao.getTableData({
      dbName: 'daily-plan',
      data: data,
      whereJson: whereJson,
      sortArr: [{ name: 'create_time', type: 'desc' }],
      foreignDB: [
        { dbName: 'base-area', localKey: 'area_id', foreignKey: '_id', as: 'area_info', limit: 1 },
        { dbName: 'base-dept', localKey: 'dept_id', foreignKey: '_id', as: 'dept_info', limit: 1 },
        { dbName: 'uni-id-users', localKey: 'issuer_uid', foreignKey: '_id', as: 'issuer_info', limit: 1 }
      ]
    });

    // 被动感知 + 数据整形
    if (listRes.rows) {
      listRes.rows.forEach(item => {
        item.display_status = planUtils.getDisplayStatus(item);
        item.area_name = item.area_info && item.area_info[0] ? item.area_info[0].name : '';
        item.dept_name = item.dept_info && item.dept_info[0] ? item.dept_info[0].name : '';
        item.issuer_name = item.issuer_info && item.issuer_info[0] ? item.issuer_info[0].real_name : '';
        item.feedback_count = item.feedbacks ? item.feedbacks.length : 0;
      });
    }

    return listRes;

    // 业务逻辑结束-----------------------------------------------------------
  },
};
