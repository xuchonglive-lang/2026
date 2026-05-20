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
      pageSize: 500, // 默认 pageSize 是 10，查全量树必须设大
      whereJson: {
        is_del: _.neq(1) // 过滤掉软删除（逻辑删除）的数据，按照 vk-fun 规范使用 _
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

    // 强制补齐且仅保留二级结构，防止前端 u-select 组件出现异常或产生多余列
    treeList.forEach(dept => {
      if (!dept.children || dept.children.length === 0) {
        dept.children = [{
          _id: dept._id + '_none',
          value: '',
          label: '无分组',
          parent_id: dept._id
        }];
      } else {
        // 强制截断第三级，确保级联结构严格保持两级
        dept.children.forEach(group => {
          delete group.children;
        });
      }
    });

    res.deptList = treeList;
    
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }
}
