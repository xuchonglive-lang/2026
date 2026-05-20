'use strict';
module.exports = {
  /**
   * 校验当前小程序版本是否处于审核态
   * @param {Object} event 请求参数
   * @param {String} event.version 小程序当前运行版本号
   * @param {Object} context 上下文
   */
  main: async (event, context) => {
    const { version } = event.data;
    const db = uniCloud.database();
    
    try {
      const res = await db.collection('sys_config').doc('app_audit_config').get();
      if (!res.data || res.data.length === 0) {
        // 兜底：若未配置，默认已过审
        return { code: 0, isPassed: true };
      }
      
      const config = res.data[0].value;
      const isGlobalAudit = config.is_global_audit || false;
      const auditVersions = config.audit_versions || [];
      
      // 如果全局处于审核态，或者当前版本在审核列表中，则判定未过审
      if (isGlobalAudit || auditVersions.includes(version)) {
        return { code: 0, isPassed: false };
      }
      
      return { code: 0, isPassed: true };
    } catch (err) {
      // 数据库读取出错兜底：返回未过审，保证审核期间的安全
      return { code: 0, isPassed: false, msg: err.message };
    }
  }
}
