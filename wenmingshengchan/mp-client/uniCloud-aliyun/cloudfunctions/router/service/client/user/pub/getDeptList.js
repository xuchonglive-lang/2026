module.exports = {
  /**
   * 获取提供给前端级联选择的部门小组树形列表
   * @url client/user/pub/getDeptList
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let res = { code: 0, msg: '' };
    
    // 业务逻辑开始-----------------------------------------------------------
    
    // 查询所有正常的部门和小组（未软删除且状态正常的主数据）
    let selectRes = await vk.baseDao.selects({
      dbName: "base-dept",
      whereJson: {
        // vk默认软删除标记为 1 或 true
      },
      // 只选取需要的字段，减轻传输体积
      fieldJson: {
        _id: true,
        name: true,
        parent_id: true,
        sort: true
      },
      sortArr: [{ name: "sort", type: "asc" }], // 支持按原定逻辑排序
    });

    let rawList = selectRes.rows || [];

    // u-select 级联选择器需要特定的结构：{ value, label, children }
    // 步骤 1：全量映射数据字段
    let mapList = rawList.map(item => {
      return {
        _id: item._id,            // 保留 _id 给 arrayToTree 用作辨认关系
        parent_id: item.parent_id || '', // 有些顶级可能是 undefined
        value: item._id,          // u-select 规定要求
        label: item.name          // u-select 规定要求
      }
    });

    // 步骤 2：借用框架函数树形化
    // vk-fun 中的 arrayToTree 的参数是 (array, options)
    let treeList = vk.pubfn.arrayToTree(mapList, {
      id: "_id",
      parent_id: "parent_id",
      children: "children"
    });

    res.deptList = treeList;
    
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }
}
