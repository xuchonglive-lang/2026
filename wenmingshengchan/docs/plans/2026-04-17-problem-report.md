# 报备信息管理 Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 实现现场问题报备管理，支持匿名提交、强制点位派发、图片压缩及带并发控制的 B 端处理闭环。

**Architecture:** Vue2 + VK UniCloud Router。基于宪法要求：前端进行 1:1 玻璃态复刻并做压缩处理，后端严格使用 vk-fun 与 Dao 2.0，必须确保跨表连表 `foreignDB` 安全及乐观锁 `updateAndReturn` 并发控制。

**Tech Stack:** uni-app, uniCloud, vue2, vk-unicloud-router

---

### Task 1: 数据库 (Database)

**目标**：建立 `problem-report` 数据表及索引。

**Files:**
- Create: `mp-client/uniCloud-aliyun/database/problem-report.schema.json`
- Create: `mp-client/uniCloud-aliyun/database/problem-report.index.json`

**具体要求**：
- **Schema**: 按照 Dao 2.0 规范创建 `problem-report.schema.json`。
- **字段**: `title`, `content`, `images` (array), `urgency` (int), `is_anonymous` (bool), `area_id`, `point_id`, `manager_dept_id`, `status` (int, default 0), `create_uid`, `create_time`, `reply_content`, `reply_images`, `reply_uid`, `reply_time`。
- **权限**: `permission: { read: false, create: false, update: false, delete: false }` (全权由云函数 vk-fun 代理通过事务操作)。
- **索引 (`problem-report.index.json`)**:
  - `unique_status_time`: `{"status": 1, "create_time": -1}` (大盘展示按状态和时间检索)
  - `unique_dept_status`: `{"manager_dept_id": 1, "status": 1}` (B端权限下钻与状态检索)

### Task 2: 云函数 (Cloud Functions)

**目标**：按照 `vk-fun` 开发规范实现前后端接口，确保严格执行宪法 `Dao 2.0`。

**Files:**
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/report/kh/submitIssue.js`
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/report/kh/getPublicList.js`
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/report/kh/getMyIssues.js`
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/report/sys/getList.js`
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/report/sys/replyAndFix.js`
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/report/sys/transferIssue.js`

**具体要求 (接口开发与数据库操作)**：
1. **`submitIssue`**:
   - 验证：必须登录。
   - DB操作：先查询 `base-point` 表，依据入参 `point_id` 获取该点位所属的 `manager_dept_id`。
   - 插入：执行 `this.dao.add()` 写入隐患记录。初始化 `status = 0`，记录 `create_uid`。
2. **`getPublicList`**:
   - DB操作：`this.dao.select()` 过滤 `status != 3`。配置 `getMain: true`。
   - 约束：使用字段过滤 `Omit`，彻底屏蔽 `create_uid` 等实名信息下发。
   - 联表：声明 `foreignDB` 获取关联 `base-area` 表名称供 C 端展现。
3. **`getMyIssues`**:
   - DB操作：`where: { create_uid: ctx.uid }`。允许下发包含处理官回执的全部信息。
4. **`admin/.../getList`**:
   - DB操作：基于当前后台管理员 `ctx.userInfo` 中的 `department_id` 构造权限条件 `dbCmd.in(子部门集合)` 赋予查询。
   - 联表：利用 `foreignDB` 还原用户的真实姓名（通过 `uni-id-users`），展现作业区域和点位名称。
5. **`admin/.../replyAndFix`**:
   - 数据库操作：必须使用 CAS 乐观锁防冲突。`this.dao.updateAndReturn({ where: { _id, status: { $in: [0, 1] } }, data: { status: 2, reply_content, ... } })`。

### Task 3: 客户端 (Client)

**目标**：基于 C 端设计规范，完成交互与信息公示体系组件开发。

**Files:**
- Modify: `mp-client/pages/report/submit-entry/index.vue`
- Modify: `mp-client/pages/report/public-board/index.vue`
- Modify: `mp-client/pages/report/my-record/index.vue`

**具体要求**：
1. **`/pages/report/submit-entry/index.vue`**:
   - **页面组件**:
     - 区域/点位级联选择器 (可考虑 `uni-data-picker` 配合云端 dict)。
     - 紧急度 Switch 开关组件，绑定 `urgency`。
     - 图片上传器：调用 `uni.compressImage`，限制 1MB 内，上限上传 3 张。
   - **接口调用**: 封装表单后调用 `vk.callFunction({ url: 'client/report/kh/submitIssue' })`，提交后重置表单并提示成功。
2. **`/pages/report/public-board/index.vue`**:
   - **页面组件**:
     - `Industrial Glassmorphism` 时间轴列表循环。
     - 状态分类芯片（全量/待受理/处理中/已结案）。
     - 集成下拉刷新与 `vk-u-loadmore` 分页机制。
   - **接口调用**: 绑定 `client/report/kh/getPublicList`。展示内容过滤实名。
3. **`/pages/report/my-record/index.vue`**:
   - **接口调用**: 绑定 `client/report/kh/getMyIssues`，展示包含被驳回历史在内的专属完整时间流。

### Task 4: B端 (B-end)

**目标**：构建 PC 管理台大盘数据表与核销弹窗。

**Files:**
- Create: `mp-admin/pages/report/report-list.vue`

**具体要求**：
1. **`report-list.vue`**:
   - **大盘展示与搜索组件**: 必须遵守 `vk-data-table` 规范。顶部配置查询区域（可按标题、时间范围、状态、责任区域精准筛选）。
   - **数据列配置**: 包括隐患标题、图片快览、紧急程度标记、作业区域、提报人实名、时间、状态。
   - **操作区与接口调用**:
     - 【处理/阅览】按钮：点击弹出基于 `vk-data-form` 的核销对话框（含图文展示位及 `reply_content` 输入组件），触发 `admin/report/sys/replyAndFix` 接口。
     - 【转派】按钮：弹出部门选择树，触发 `admin/report/sys/transferIssue` 接口变更责任部门。
     - 【驳回/作废】按钮：一键触发状态改置为 `3`。
