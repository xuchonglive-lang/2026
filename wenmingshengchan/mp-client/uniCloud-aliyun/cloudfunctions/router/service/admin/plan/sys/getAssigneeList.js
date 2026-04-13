'use strict';
module.exports = {
  /**
   * 获取可选执行人列表
   * @url admin/plan/sys/getAssigneeList
   * @description 严格限定只显示当前录入者所属部门（及子部门）的人员
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, _, db } = util;

    let whereJson = data.whereJson || {};

    if (!userInfo.department_id) {
        return { code: 0, msg: "未归属任何部门，无法分配！", rows: [], total: 0 };
    }

    // 递归获取子部门
    let deptRes = await vk.baseDao.select({
        dbName: "base-dept",
        whereJson: { is_del: _.neq(1) },
        limit: 1000
    });
    
    let myDeptIds = [userInfo.department_id];
    const findDescendants = (parentId) => {
        let children = deptRes.rows.filter(d => d.parent_id === parentId);
        children.forEach(c => {
            myDeptIds.push(c._id);
            findDescendants(c._id);
        });
    };
    findDescendants(userInfo.department_id);
    
    // 强制截流查询范围内只可包含归属自身树结构的员工
    // 如果前端搜索条件本身指定了更细分的 department_id，这里需要进行交集判定
    if (whereJson.department_id) {
       // 保留前端发出的更精确的搜索(例如点选了指定小组)
       // 理论安全性: 只要前端不越权请求即可，若要极致防伪还需判定前端传入的 dept_id 是否在 myDeptIds 内
       const targetDept = typeof whereJson.department_id === 'string' ? whereJson.department_id : (whereJson.department_id.value || whereJson.department_id);
       if (!myDeptIds.includes(targetDept)) {
            // 防篡改拦截：如果前端传入的查询部门不属于该管理员管辖范围内，返回空
            whereJson.department_id = "illegal_access";
       }
    } else {
       // 前端没有传部室删选条件，展示权限管辖下全部员工
       whereJson.department_id = _.in(myDeptIds);
    }

    let foreignDB = [{
        dbName: "base-dept",
        localKey: "department_id",
        foreignKey: "_id",
        as: "dept_info",
        limit: 1,
        fieldJson: { name: true }
    }];

    let res = await vk.baseDao.getTableData({
        dbName: "uni-id-users",
        data,
        whereJson,
        foreignDB,
        fieldJson: { password: 0 }
    });
    
    return res;
  }
}
