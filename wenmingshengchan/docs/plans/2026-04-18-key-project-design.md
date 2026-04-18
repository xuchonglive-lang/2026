# 重点项目管理 Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 实现“重点文明生产项目”的生命周期闭环管理，包括任务下发、进展汇报、验收申请及后台动态数据隔离审核，并附带前端超时预警机制。

**Architecture:** 
1. **数据库层**：利用 `Dao 2.0` 操作 `key-project` 与 `key-project-process` 双表体系。
2. **云函数层**：严守 `vk-fun` 规范，所有云函数放置于 `./mp-client/uniCloud-aliyun/cloudfunctions/router/service` 目录下。采用 TDD 前置驱动。状态切换确保原子性操作。
3. **客户端**：C端利用微信小程序的原生视图能力展现工业风组件，包含时间轴渲染。
4. **B端后台**：依据部门树状结构动态下推数据可见性，利用 `vk-data-form` 和 `foreignDB` 聚合数据并渲染表单与预警提示。

**Tech Stack:** Vue 2, VK UniCloud Router, uni-app, vk-data-form, Dao 2.0.

---

### Task 1: 数据库层设计 (Database Schema)

**Files:**
- Create: `mp-client/uniCloud-aliyun/database/key-project.schema.json`
- Create: `mp-client/uniCloud-aliyun/database/key-project-process.schema.json`

**Step 1: 创建 Schema 配置**
创建 `key-project` 表结构，包含字段 `title`, `area_id`, `point_id`, `standard_desc`, `deadline` (Timestamp), `assignee_uids` (Array<String>), `status` (Number), `create_uid`, `audit_remark`。
创建 `key-project-process` 表结构，包含字段 `project_id`, `type` (Number), `desc_content`, `attachment_imgs` (Array), `operate_uid`, `create_time`。

**Step 2: 验证 Schema**
确保所有外键关联（如关联用户表）使用合适的 objectId 类型定义。

**Step 3: 提交代码**

---

### Task 2: 云函数层开发 - 遵循 TDD (Cloud Functions)

> 备注：所有操作统一收口于 `./mp-client/uniCloud-aliyun/cloudfunctions/router/service`

#### Task 2.1: C端接口

**Files:**
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/keywork/pub.test.js` (统一包含 C端测试)
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/keywork/pub/getProjectList.js`
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/keywork/pub/addProcessRecord.js`
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/keywork/pub/applyProjectClose.js`

**Step 1: Write the failing tests**
在 `pub.test.js` 编写断言，分别验证 `getProjectList` (筛选 `assignee_uids` 包含本人的记录), `addProcessRecord` (状态0或3时可插入), `applyProjectClose` (将状态从0或3切换到1，且具有原子性)。

**Step 2: Run test to verify it fails**
运行 TDD 测试环境确保报错。

**Step 3: Write minimal implementation**
实现上述三个 JS API。强制使用 `Dao 2.0` `this.dao` 写法，`foreignDB` 关联点位名称。`applyProjectClose` 中使用 `updateAndReturn` 或 `where({status: _.in([0,3])})` 防止并发重复申请。

**Step 4: Run test to verify it passes**
运行并确保测试用例通过。

**Step 5: Commit**

#### Task 2.2: B端接口

**Files:**
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/keywork/sys.test.js`
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/keywork/sys/createProject.js`
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/keywork/sys/auditProjectResult.js`
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/keywork/sys/getAdminProjectList.js`

**Step 1: Write the failing tests**
编写后台管理 API 测试用例。

**Step 2: Write minimal implementation**
特别注意 `getAdminProjectList.js` 的实现：首先获取当前登录管理员的 `department_id`，利用基础数据方法获取子树全量部门内的员工ID集合，再以 `assignee_uids: _.in(可见ID集合)` 作为筛选条件查询 `key-project` 列表，以此达到**动态数据可见性下钻**的要求。
`auditProjectResult.js` 实现验收逻辑：若通过，更新 `status` 到 2；若驳回，插入 `key-project-process` Type=3 记录，并将主表 `status` 更新为 3。

**Step 3: Run test to verify it passes**
确保全链路原子性测试通过。

**Step 4: Commit**

---

### Task 3: 客户端视图层 (mp-client)

**Files:**
- Create: `mp-client/pages/keywork/project/list.vue`
- Create: `mp-client/pages/keywork/project/process-feed.vue`
- Create: `mp-client/pages/keywork/project/apply-finish.vue`

**步骤细节**:
1. **list.vue**: 开发综合列表，按进行中/待验收/已完成分类。基于前端时间计算实现 `deadline` 逾期卡片标红高亮。
2. **process-feed.vue**: 开发带有时光轴（Timeline）瀑布流样式的记录展示页。仅当状态为0或3时开放底层输入框，调用 `addProcessRecord` 提交数据。
3. **apply-finish.vue**: 独立的验收申请页，执行 `applyProjectClose` 逻辑并阻断二次操作。
4. 提交客户端页面。

---

### Task 4: B端后台管理台 (mp-admin)

**Files:**
- Create: `mp-admin/pages/keywork/project-list.vue`

**步骤细节**:
1. **页面布局**: 开发后台列表页。使用 `vk-data-form` 构建新建项目、编辑项目的模态框表单。关联下发人员时提供带部门检索的用户选择器。
2. **警示可视化**: 在表格列中增加自定义 render，动态比对 `row.deadline` 与当前客户端时间。若未完成且超时，采用醒目颜色进行高亮。
3. **验收动作**: 表格操作栏增加“审核验收”按钮，弹出审核评价框。点击通过或驳回后，调用 `auditProjectResult.js`。
4. 提交 B 端页面。
