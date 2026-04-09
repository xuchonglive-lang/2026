// 核心导出一个对象，包含了云函数的全部定义
module.exports = {
  // 定义函数的注释和参数说明
  /**
   * 获取部门列表
   * @url admin/base-dept/sys/getList 前端调用的url参数地址
   * data 请求参数 说明
   * @param {Number}         pageIndex 当前页码
   * @param {Number}         pageSize  每页显示数量
   * @param {Array<Object>}  sortRule  排序规则
   * @param {object}         formData  查询条件数据源
   * @param {Array<Object>}  columns   查询条件规则
   * res 返回参数说明
   * @param {Number}         code      错误码，0表示成功
   * @param {String}         msg       详细信息
   */
  // main 函数为实际业务逻辑入口，接收一个 event 对象
  main: async (event) => {
    // 从 event 解析需要的内部变量：入参 data、公用工具 util 等
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    // 从 util 里解构框架提供的核心包（vk-uniCloud底层依赖对象 vk, db, _ 等）
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    // 解构出 data 里面的业务请求参数，通常含有分页搜索要求等内容
    let { uid } = data;
    // 初始化默认成功的标准统一返回体，code=0 即为操作成功
    let res = { code: 0, msg: '' };
    
    // -----------------------------------------------------------
    // 业务逻辑开始
    // -----------------------------------------------------------
    
    // 构建强制作用域：让右侧表格强制只显示查询到的特定上级机构的下属
    let whereJson = data.whereJson || {};
    
    // 加入全表假删除规避条件
    whereJson.is_del = db.command.neq(1);

    if (typeof data.parent_id !== "undefined") {
      if (data.parent_id === "") {
        // 马城矿业根节点：只查询无上级的“大部门” (根据应用层逻辑，这里均存为空字符串)
        whereJson.parent_id = "";
      } else {
        // 普通部门节点：只查询从属于它的“小组”
        whereJson.parent_id = data.parent_id;
      }
    }

    try {
      // 直接复用 vk 框架集成的系统标准查询方法，获取表内数据列表
      res = await vk.baseDao.getTableData({
        dbName: "base-dept",
        whereJson: whereJson,
        data: data
      });
    } catch (err) {
      return { code: -1, msg: err.message || "查询异常" };
    }
    
    // 操作顺利完成，向上抛回取得的查询封装对象包含 rows(数据行) 与 total(总数)
    return res;
  }
};
