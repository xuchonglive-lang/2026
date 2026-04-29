# B端Admin后台研发避坑指南与故障排查记录 (Troubleshooting Record)

本指南总结了在开发“文明生产管理系统” B端基础数据模块时遇到的核心坑点及完整解决方案。本项目的后续开发**必须**将此文件作为红线校验单，以防同类错误阻碍研发流程。

## 0. 最高危安全红线 (Critical Security Gotchas)

### 0.1 【最高危漏洞】`userInfo` 错误解构导致 MongoDB 鉴权穿透（越权全表扫描）
*   **现象**：非某点位的责任人（或无关账号）登录系统后，却能越权查看到全公司所有人名下的反馈记录或待办工单。
*   **产生原因**：
    1. 开发者习惯性地使用了 `let { uid } = userInfo;`。但 `uni-id` 和 `vk-unicloud-router` 框架下 `userInfo` 的用户主键是 `_id`，因此取出的 `uid` 实际上是 `undefined`。
    2. 当拿着这个 `undefined` 去进行云数据库查询时（例如 `whereJson: { assignee_ids: uid }`），**MongoDB 的原生解析器会直接忽略/丢弃值为 `undefined` 的查询键**。
    3. 于是数据权限围栏瞬间土崩瓦解（`assignee_ids` 过滤条件失效），数据库直接放行执行全表扫描，造成极其严重的数据越权泄露！
*   **正解**：
    永远不要单方面解构 `uid`！在一切需要将 `uid` 作为数据隔离与越权防御过滤条件的地方，**必须**使用以下标准写法进行提取，并在数据库调用前进行判空拦截：
    ```javascript
    // 规范提取
    let uid = userInfo ? userInfo._id : null;
    
    // 【防线】如果该参数是查询/更新的核心凭证，必须阻断！绝不能把空值放给数据库
    if (!uid) return { code: 403, msg: "安全阻断：无法提取有效的用户身份标识" };
    ```

---

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

### 2.5 云函数获取当前用户 ID 的致命陷阱 (userInfo.uid vs userInfo._id)
*   **现象**：在云函数中执行新增操作时，业务代码似乎正常写入了操作人字段（如 `operate_uid`），但随后在详情页或列表中发现该字段丢失，导致关联查询（`foreignDB`）无法匹配到用户信息，界面显示兜底内容（如“系统”）。
*   **产生原因**：开发者习惯性地解构 `let { uid } = userInfo;` 来获取当前登录用户的 ID。但是在 uniCloud 和 VK 框架的底层标准中，用户表的真实主键字段名是 `_id`。这导致解构出来的 `uid` 实际上是 `undefined`（空值），从而把 `operate_uid: undefined` 传入了 `vk.baseDao.add`，被数据库底层驱动直接过滤未存入。
*   **正解**：永远不要单方面只去解构 `uid`，必须严格采用如下标准后备方案进行用户 ID 的安全提取，以兼容多端登录及底层框架的差异：
    ```javascript
    let uid = userInfo._id || userInfo.uid || event.uid;
    if (!uid) return { code: -1, msg: "系统内部错误：无法获取当前登录用户的uid" };
    ```

---

## 3. 项目拓扑与微服务安全红线

### 3.1 跨端云函数路径架构错位
*   **现象**：报错 `Error: not found【admin/base-dept/sys/getList】`，查询发现函数明明刚写好，为何寻址未果。
*   **产生原因**：错把 B端（mp-admin）当做了服务端本体，在其名下的 `uniCloud-aliyun` 目录中开垦代码逻辑去了。
*   **正解（终极规范）**：任何与数据库相关或提供业务的云函数、触发器代码，**必须且只能唯一存在于 `mp-client` 小程序端源的根基上**。后台系统只作为浏览器上的一个壳子去发射 `url` 向外请求，不准内置自身的云函数部署空间。
