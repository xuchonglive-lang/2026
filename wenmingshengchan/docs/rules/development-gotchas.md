# B端Admin后台研发避坑指南与故障排查记录 (Troubleshooting Record)

本指南总结了在开发“文明生产管理系统” B端基础数据模块时遇到的核心坑点及完整解决方案。本项目的后续开发**必须**将此文件作为红线校验单，以防同类错误阻碍研发流程。

## 1. 视图层渲染与生命周期陷阱

### 1.1 `vk-data-table` 缺失 action 导致前端白屏死锁
*   **现象**：在 `data()` 中若将 `table1.action` 留空为 `""`，由于 `vk-data-table` 底层源码在 `mounted` 时强查验该属性以构建加载流水线，会导致全屏报内存寻址异常引发白屏（这会株连左侧不相关的 `el-tree` 也无法渲染）。
*   **正解**：千万不要去 `init()` 等外部函数延迟注入，必须**直接在 `data()` 内部通过箭头函数原生声明闭包**，此时的 `this` 能够精准绑定到 Vue 实例，直接读取到任何上层输入（例如 `this.queryForm1.formData`），极简且稳固。

### 1.2 `vk-data-table` 自定义 action 的“死亡转圈”
*   **现象**：表格右上角或点击搜索后，加载 loading 动画无止尽地一直转圈（界面卡死）。
*   **产生原因**：重写了 `action: (obj = {}) => { ... }` 却不小心丢掉了必要的执行流回调握手。
*   **正解**：**永远不要忘了调用 `complete()`**，并且 `success()` 解构必须对齐为 `{ rows, total }`。固定模板如下：
    ```javascript
    success: (res) => { if (typeof success === "function") success({ rows: res.rows || [], total: res.total || 0 }); },
    fail: (err) => { if (typeof fail === "function") fail(err); },
    complete: () => { if (typeof complete === "function") complete(); }
    ```

### 1.3 组件数据项渲染：严禁使用 `dict`
*   **现象**：新增 / 编辑弹窗里的 `select` (下拉)、`radio` (单选)、`cascader` (级联) 组件出现空白标签框，没有选项产生。
*   **产生原因**：混淆了旧版 element-ui 系统特性，误写为了 `dict: "关联字典"` 或 `{ dict: [...] }`。
*   **正解**：`vk-data-form` 的底层必须且只能使用 `data: []` 来接收静态数据源，如果是关联云端则使用 `action` 加 `props: {value, label}` 替代。

### 1.4 `defaultValue` 失效及弹窗数据重置问题
*   **现象**：表单里的 `status` 在配置结构中写了 `defaultValue: 1`，但新建时候没有命中1（依然空白）。
*   **产生原因**：`vk.pubfn.resetForm(originalForms, that)` 底层动作是通过深拷贝还原形态，会用空对象强刷掉目前数据结构。因此仅在最初挂载生效，动态弹窗下会被覆灭掉。
*   **正解**：在一切弹出“添加录入”窗口的按钮函数中（如 `addBtn`），务必手动下发强赋值指令：`that.form1.data.status = 1;` 作为防空洞。

---

## 2. 云端逻辑与数据库执行陷阱

### 2.1 `db.command.in` 的 `undefined` 非法传参地雷
*   **现象**：云函数一旦执行，前端只接到无脑拦截错误或者干脆一直转圈无响应。
*   **产生原因**：代码中试图使用条件组合匹配 `whereJson.parent_id = dbCmd.in(["", null, undefined]);` 进行全扫描，但 **JSON 及 NoSQL 数据库的底层概念中不存在 undefined**。这会立刻引发 JQL 致命异常并打断函数的完整执行栈。
*   **正解**：绝对杜绝将 `undefined` 喂给云数据库校验。如果确实需要模糊判定，直接以明确字符串或布尔值替代，甚至可以直接省略该字段；并且在 `vk.baseDao.getTableData` 操作外一定要架设 `try...catch` 返还 `{code: -1}`。

### 2.2 外键（ForeignDB）中文转化缺位
*   **现象**：表格中原本该显现“某某部门”的地方，全是反人类的一大串 hash 文本码（`5fe...11c`）。
*   **正解**：严禁依靠前端自己发起异步获取与 for 循环匹配，**必须由后端的 `getTableData` 以云端联表（`foreignDB`）下放**。
    ```javascript
    foreignDB: [{
      dbName: "base-dept", localKey: "manager_dept_id", foreignKey: "_id", as: "dept_info", limit: 1
    }]
    ```
    对应前台只需将 `:columns` 取值由 `manager_dept_id` 修改为嵌套对象 `dept_info.name`。

### 2.3 严打物理删除 (Physical Deletion Forbidden) 
*   **现象**：一旦调用 `deleteById` 删除父部门，其下的小组和挂靠人员彻底变为无主孤魂，牵扯账单统计报表等相关模块时会形成悬空游离的严重脏数据灾难。
*   **正解**：全系统严格执行**软删除逻辑（Soft Delete）**：
    1.  **删除机制**：改 `deleteById` 为 `updateById`，下发更改标示 `dataJson: { is_del: 1 }`。
    2.  **获取机制**：所有的查询入口（`getList`, `getTree`, `getAll`）皆需挂载硬装甲守卫：`whereJson.is_del = db.command.neq(1);`

### 2.4 云函数 `vk.db.command` 解构失败导致的 TypeError
*   **现象**：控制台无情抛出高频核心错误 `Cannot read properties of undefined (reading 'command')` 并致使整个数据列表 501 崩溃。
*   **产生原因**：凭直觉从云函数的 `uniCloud.vk` 顶层单例去生拔 `db`。但实际上，由于 `vk-unicloud-router` 中间件层架空了许多原生实例，`vk` 实体自身并不携带 `db` 及其下属的 `command`。
*   **正解**：千万不要写出 `vk.db.command` 和 `let vk = uniCloud.vk` 这种散装逻辑。请**老老实实从该框架唯一的生命线 `event.util` 中一次性把它们原生萃取出来**：
    ```javascript
    let { vk, db, _ } = util; // "_" 就是 db.command 的简写
    // 后续业务直接拿 _ 通行
    whereJson: { is_del: _.neq(1) }
    ```

---

## 3. 项目拓扑与微服务安全红线

### 3.1 跨端云函数路径架构错位
*   **现象**：报错 `Error: not found【admin/base-dept/sys/getList】`，查询发现函数明明刚写好，为何寻址未果。
*   **产生原因**：错把 B端（mp-admin）当做了服务端本体，在其名下的 `uniCloud-aliyun` 目录中开垦代码逻辑去了。
*   **正解（终极规范）**：任何与数据库相关或提供业务的云函数、触发器代码，**必须且只能唯一存在于 `mp-client` 小程序端源的根基上**。后台系统只作为浏览器上的一个壳子去发射 `url` 向外请求，不准内置自身的云函数部署空间。
