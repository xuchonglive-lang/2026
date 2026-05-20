'use strict';
module.exports = {
  // 跳过具体权限校验（避免因通配符未更新或新接口未入库被拦截），仅要求登录即可访问
  permission: [], 
  
  /**
   * 获取当前用户所属部门及其子组的树结构
   * @url admin/plan/sys/getMyDeptTree
   * @description 专门用于日计划模块，限制非超管用户只能指派本部门人员
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let res = { code: 0, msg: '' };
    
    let role = userInfo.role || [];
    let isSuperAdmin = role.includes('admin') || role.includes('super_admin');

    // 获取所有可用部门数据
    let allData = await vk.baseDao.select({
      dbName: "base-dept",
      whereJson: {
        is_del: _.neq(1),
        name: _.neq("马城矿业")
      },
      pageSize: 500,
      sortArr: [{ name: 'sort', type: 'asc' }]
    });

    let rows = allData.rows || [];

    // 非超管：只保留自己部门及其子孙节点
    if (!isSuperAdmin) {
      if (!userInfo.department_id) {
        return { code: 0, msg: '您未绑定部门', rows: [] };
      }
      // 递归找出自己部门及其所有下级
      let myDeptIds = [userInfo.department_id];
      const findDescendants = (parentId) => {
        let children = rows.filter(d => d.parent_id === parentId);
        children.forEach(c => {
          myDeptIds.push(c._id);
          findDescendants(c._id);
        });
      };
      findDescendants(userInfo.department_id);
      // 过滤只保留自己家族分支
      rows = rows.filter(d => myDeptIds.includes(d._id));
    }

    // 构建树结构
    let tree = vk.pubfn.arrayToTree(rows, {
      id: "_id",
      parent_id: "parent_id",
      children: "children"
    });

    res.rows = tree;
    return res;
  }
};
