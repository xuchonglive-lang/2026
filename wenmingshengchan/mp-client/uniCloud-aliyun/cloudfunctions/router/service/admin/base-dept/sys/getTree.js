module.exports = {
  /**
   * 获取基地所有有效部门的树状结构
   * @url admin/base-dept/sys/getTree
   */
  main: async (event) => {
    let { data = {}, util } = event;
    let { vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    // 获取所有可用部门数据
    let allData = await vk.baseDao.select({
      dbName: "base-dept",
      whereJson: { is_del: _.neq(1) },
      pageSize: 500 // 一次性拉取，小表用这个
    });
    
    // 使用 vk.pubfn 把扁平化数据转出多层级树
    // arrayToTree 返回的是数组形态的树
    let tree = vk.pubfn.arrayToTree(allData.rows, {
      id: "_id",
      parent_id: "parent_id",
      children: "children"
    });

    res.rows = tree;
    return res;
  }
};
