module.exports = {
  /**
   * 转派处理组
   * @url admin/report/sys/transferIssue
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };

    let { _id, manager_dept_id } = data;

    if (!_id) return { code: -1, msg: '缺少记录ID' };
    if (!manager_dept_id) return { code: -1, msg: '必须选择转派部门' };

    let updateCount = await vk.baseDao.updateById({
      dbName: "problem-report",
      id: _id,
      dataJson: {
        manager_dept_id: manager_dept_id,
        status: 0, // 转派后重置为待受理
        reply_content: "【系统流转】该工单已被转派至新部门",
        reply_time: new Date().getTime()
      }
    });

    if (updateCount > 0) {
      res.msg = '转派成功';
    } else {
      res.code = -1;
      res.msg = '转派失败';
    }

    return res;
  }
};
