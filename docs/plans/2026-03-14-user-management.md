# 用户管理模块 Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 实现用户管理模块的全部功能——数据库基建、安全中间件升级、后台 6 个管理页面、前台拦截与个人信息页，微信云函数的壳代码（真实 API 对接留到 Phase 6 最后一公里联调）。

**Architecture:** 分 6 个 Phase 渐进交付。Phase 1-2 搭建数据库与安全基础设施；Phase 3 全量开发云函数；Phase 4 开发后台 6 个管理页面（利用 VK admin 原生 `vk-data-table` / `vk-data-form` / `el-tree` 组件）；Phase 5 开发前台页面与拦截弹窗；Phase 6 微信联调冲刺。开发期间使用账密登录，测试账号直接指定 `tenant_id`，完全不依赖微信环境。

**Tech Stack:** vk-unicloud-router, vk.baseDao, Element UI (admin), SCSS 设计系统 (前台), uniCloud MongoDB

**参考文档:**
- 头脑风暴设计: `brain/2026-03-14-user-mgmt-brainstorm.md`
- 原始提案: `specs/公共核心-用户管理-提案.md`
- 云函数规范: `.agent/skills/vk-fun/SKILL.md`
- 已有部门管理代码参考: `service/admin/system/dept/sys/add.js`

---

## Task 1: 数据库 Schema 与索引 — xc-tenant-groups

**Files:**
- Create: `xc/uniCloud-aliyun/database/xc-tenant-groups.schema.json`
- Create: `xc/uniCloud-aliyun/database/xc-tenant-groups.index.json`

**Step 1: 创建 Schema**

参照 `xc-tenants.schema.json` 的风格，字段包含：
- `tenant_id` (string, 必填, 关联 xc-tenants._id)
- `parent_id` (string, 根小组为 null)
- `name` (string, 必填, trim)
- `group_path` (string, 格式 /tenant_id/g1/g2)
- `leader_id` (string)
- `sort_num` (int, 默认 0)
- `status` (int, enum [0,1], 默认 1)
- `description` (string)
- `created_by`, `created_at`, `updated_by`, `updated_at`

权限: read=登录可读, CUD=需要 `*_XC_TENANT_GROUPS` permission

**Step 2: 创建索引**

- `tenant_id` 单字段索引
- `parent_id` 单字段索引

**Step 3: 验证**

在 uniCloud 控制台上传 Schema 和索引，确认集合创建成功且索引生效。

**Step 4: Commit**

```bash
git add xc/uniCloud-aliyun/database/xc-tenant-groups.*
git commit -m "feat(db): add xc-tenant-groups schema and index"
```

---

## Task 2: 数据库 Schema — xc-dept-applications

**Files:**
- Create: `xc/uniCloud-aliyun/database/xc-dept-applications.schema.json`
- Create: `xc/uniCloud-aliyun/database/xc-dept-applications.index.json`

**Step 1: 创建 Schema**

字段：`user_id`, `target_dept_id`, `real_name`, `phone`, `status`(int, enum 0/1/2, 默认0), `approved_by`, `approved_at`, `created_at`(forceDefaultValue $env now)

权限: read=`doc.user_id == auth.uid`, create=登录, update/delete=false

**Step 2: 创建索引**

- `user_id`, `target_dept_id`, `status` 各一个单字段索引

**Step 3: Commit**

```bash
git add xc/uniCloud-aliyun/database/xc-dept-applications.*
git commit -m "feat(db): add xc-dept-applications schema and index"
```

---

## Task 3: 数据库 Schema — xc-weixin-scan-login

**Files:**
- Create: `xc/uniCloud-aliyun/database/xc-weixin-scan-login.schema.json`
- Create: `xc/uniCloud-aliyun/database/xc-weixin-scan-login.index.json`

**Step 1: 创建 Schema**

临时 TTL 表，字段：`scene_id`(unique), `status`(int 0-3), `openid`, `token`, `userInfo`(object), `created_at`, `expire_at`

权限：全 false（仅云函数操作）

**Step 2: 创建索引**

- `scene_id` 唯一索引
- `expire_at` TTL 索引 (`expireAfterSeconds: 0`)

**Step 3: Commit**

```bash
git add xc/uniCloud-aliyun/database/xc-weixin-scan-login.*
git commit -m "feat(db): add xc-weixin-scan-login TTL schema"
```

---

## Task 4: uni-id-users 扩展字段 + tenant_admin 角色

**Files:**
- Modify: `xc/uniCloud-aliyun/database/uni-id-users.schema.json` (在 properties 尾部追加字段)
- Modify: `xc/uniCloud-aliyun/database/uni-id-roles.init_data.json` (追加 tenant_admin)

**Step 1: 给 uni-id-users 追加字段**

在 `inviter_lock` 之后追加：`real_name`, `tenant_id`, `tenant_name`, `dept_path`, `group_id`, `group_path`, `group_name`, `wx_nickname`, `wx_avatar`

**Step 2: 追加 tenant_admin 角色**

在 `uni-id-roles.init_data.json` 数组末尾追加 `tenant_admin` 角色对象。

**Step 3: Commit**

```bash
git add xc/uniCloud-aliyun/database/uni-id-users.schema.json xc/uniCloud-aliyun/database/uni-id-roles.init_data.json
git commit -m "feat(db): extend uni-id-users fields and add tenant_admin role"
```

---

## Task 5: tenantFilter.js 升级

**Files:**
- Modify: `xc/uniCloud-aliyun/cloudfunctions/router/middleware/modules/tenantFilter.js`

**Step 1: 新增 admin/tenant/ 拦截段**

在 `admin/system/` 跳过段之后，新增：
- 匹配 `admin/tenant/` 的 URL → 强制注入 `whereJson.tenant_id = userInfo.tenant_id`
- 无 `tenant_id` 则返回 403

**Step 2: 升级普通用户的 $or 条件**

- 原 `{ tenant_id: tenantId }` 拆分为三条：处理 `target_group_ids` 不存在/null/空数组的情况
- 新增 `userInfo.group_id` 匹配 `target_group_ids` 的条件

**Step 3: 验证**

用测试账号调用一个含 `target_group_ids` 的业务云函数，确认过滤逻辑正确。

**Step 4: Commit**

```bash
git add xc/uniCloud-aliyun/cloudfunctions/router/middleware/modules/tenantFilter.js
git commit -m "feat(middleware): upgrade tenantFilter for group isolation and tenant admin"
```

---

## Task 6: 菜单配置注入

**Files:**
- Modify: `xc/uniCloud-aliyun/database/opendb-admin-menus.init_data.json`

**Step 1: 追加菜单项**

在 JSON 数组末尾追加 7 条菜单记录：
- 1 个 `tenant-mgmt` 顶级菜单组
- 4 个子菜单: `tenant-settings`, `tenant-groups`, `tenant-members`, `tenant-apps`
- 2 个集团级子菜单: `sys-user-manage-ext` (指向 listforsystem), `sys-dept-apps` (指向 applications)

**Step 2: Commit**

```bash
git add xc/uniCloud-aliyun/database/opendb-admin-menus.init_data.json
git commit -m "feat(admin): inject tenant and user management menu items"
```

---

## Task 7: 云函数 — 租户内小组 CRUD

**Files:**
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/tenant/group/sys/add.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/tenant/group/sys/update.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/tenant/group/sys/delete.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/tenant/group/sys/getList.js`

**Step 1: 编写 4 个云函数**

参照 `admin/system/dept/sys/add.js` 的风格：
- `add.js`: 校验 tenant_id（来自 tenantFilter 注入），若有 parent_id 则查父级拼接 group_path，调 `vk.baseDao.add`
- `update.js`: 禁止修改 tenant_id/group_path，调 `vk.baseDao.updateById`
- `delete.js`: 检查子级和成员数量，无依赖才允许删除
- `getList.js`: `vk.baseDao.selects` 一次性拉取所有（树形结构），按 sort_num 排序

**Step 2: 验证**

在后台用 tenant_admin 账号调用 add → getList → update → delete 完整流程。

**Step 3: Commit**

```bash
git add xc/uniCloud-aliyun/cloudfunctions/router/service/admin/tenant/group/
git commit -m "feat(api): tenant group CRUD cloud functions"
```

---

## Task 8: 云函数 — 租户内成员管理

**Files:**
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/tenant/member/sys/getList.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/tenant/member/sys/assign.js`

**Step 1: 编写 getList**

调 `vk.baseDao.selects` 查 `uni-id-users`，tenantFilter 已注入 tenant_id，排除密码/token 敏感字段。

**Step 2: 编写 assign**

接收 `user_ids[]` 和 `target_group_id`，批量更新 `group_id`/`group_path`/`group_name`。双保险校验 tenant_id。

**Step 3: Commit**

```bash
git add xc/uniCloud-aliyun/cloudfunctions/router/service/admin/tenant/member/
git commit -m "feat(api): tenant member list and assign cloud functions"
```

---

## Task 9: 云函数 — 集团级用户管理与审批

**Files:**
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/system/user/sys/approve.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/user/kh/applyDept.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/user/kh/updateInfo.js`

**Step 1: 编写 approve.js**

接收 `application_id` + `action`(approve/reject)。通过时更新 `uni-id-users` 的 `tenant_id`/`tenant_name`/`dept_path`，同时更新 `xc-dept-applications.status`。

**Step 2: 编写 applyDept.js**

裸号用户提交 `real_name` + `target_dept_id`，校验无 `tenant_id` 且无重复待审申请，写入 `xc-dept-applications`，顺带更新 `uni-id-users.real_name`。

**Step 3: 编写 updateInfo.js**

允许登录用户修改自己的 `real_name` 和 `mobile`。

**Step 4: Commit**

```bash
git add xc/uniCloud-aliyun/cloudfunctions/router/service/admin/system/user/sys/approve.js
git add xc/uniCloud-aliyun/cloudfunctions/router/service/user/kh/applyDept.js
git add xc/uniCloud-aliyun/cloudfunctions/router/service/user/kh/updateInfo.js
git commit -m "feat(api): user approve, applyDept, updateInfo cloud functions"
```

---

## Task 10: 云函数 — 微信扫码壳代码

**Files:**
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/user/pub/weixinScanLogin.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/user/pub/checkScanStatus.js`

**Step 1: 编写 weixinScanLogin.js 壳**

生成 scene_id，写入 `xc-weixin-scan-login` 表，返回 mock 二维码 URL。内部标记 `// TODO: Phase 6 对接正式微信 API`。

**Step 2: 编写 checkScanStatus.js 壳**

根据 scene_id 查询 `xc-weixin-scan-login`，返回 status/token。

**Step 3: Commit**

```bash
git add xc/uniCloud-aliyun/cloudfunctions/router/service/user/pub/weixinScanLogin.js
git add xc/uniCloud-aliyun/cloudfunctions/router/service/user/pub/checkScanStatus.js
git commit -m "feat(api): wechat scan login stub cloud functions (Phase 6 TODO)"
```

---

## Task 11: 后台页面 — 集团级用户管理 listforsystem.vue

**Files:**
- Create: `xc-admin/pages_plugs/system/user/listforsystem.vue`

**Step 1: 编写页面**

参照已有 `system/dept/list.vue` 的布局风格：
- 左侧 `el-tree` 复用 `DeptSelector` 大盘部门树
- 右侧 `vk-data-table`，action 指向 `admin/system/user/sys/getList`
- 列: 头像、微信昵称、真实姓名、手机号、部门、角色标签、状态标签
- 编辑弹窗: 可修改 `tenant_id`(部门树选择器)、角色(多选)、状态(下拉)

**Step 2: Commit**

```bash
git add xc-admin/pages_plugs/system/user/listforsystem.vue
git commit -m "feat(admin): group-level user management page"
```

---

## Task 12: 后台页面 — 集团级入驻审批 applications.vue

**Files:**
- Create: `xc-admin/pages_plugs/system/dept/applications.vue`

**Step 1: 编写页面**

`vk-data-table` 展示 `xc-dept-applications`，列: 申请人、目标部门、真实姓名、状态标签、申请时间。右侧操作按钮: 通过/拒绝。

**Step 2: Commit**

```bash
git add xc-admin/pages_plugs/system/dept/applications.vue
git commit -m "feat(admin): department application approval page"
```

---

## Task 13: 后台页面 — 租户级 settings + applications

**Files:**
- Create: `xc-admin/pages_plugs/tenant/settings.vue`
- Create: `xc-admin/pages_plugs/tenant/applications.vue`

**Step 1: 编写 settings.vue**

只读展示本租户信息（名称、编码、负责人），数据从 `xc-tenants` 中读取（tenantFilter 自动锁定）。

**Step 2: 编写 applications.vue**

与 Task 12 类似，但过滤条件由 tenantFilter 自动限制为本租户的申请。

**Step 3: Commit**

```bash
git add xc-admin/pages_plugs/tenant/settings.vue xc-admin/pages_plugs/tenant/applications.vue
git commit -m "feat(admin): tenant settings and applications pages"
```

---

## Task 14: 后台页面 — 租户级小组管理 + 成员分配

**Files:**
- Create: `xc-admin/pages_plugs/tenant/group/list.vue`
- Create: `xc-admin/pages_plugs/tenant/member/list.vue`

**Step 1: 编写 group/list.vue**

参照已有 `system/dept/list.vue`：左侧 `el-tree` + 右侧 `vk-data-form` 编辑所选小组信息 + 新增弹窗。action 指向 `admin/tenant/group/sys/*`。

**Step 2: 编写 member/list.vue**

左侧小组树 + 右侧 `vk-data-table` 成员列表。支持批量选中 → 点击"分配至小组"按钮 → 弹出小组树选择器 → 调用 `admin/tenant/member/sys/assign`。

**Step 3: Commit**

```bash
git add xc-admin/pages_plugs/tenant/group/list.vue xc-admin/pages_plugs/tenant/member/list.vue
git commit -m "feat(admin): tenant group management and member assignment pages"
```

---

## Task 15: 前台 — DeptBindModal 裸号拦截弹窗

**Files:**
- Create: `xc/components/user/DeptBindModal.vue`
- Modify: `xc/components/layout/AppLayout.vue` (导入并挂载)

**Step 1: 编写 DeptBindModal.vue**

全屏不可关闭遮罩，表单含真实姓名(前端校验) + 部门级联选择(拉取 xc-tenants)，提交调用 `user/kh/applyDept`。提交后显示等待审核状态。通过 Vuex `$user.userInfo.tenant_id` 判断是否展示。

**Step 2: 挂载到 AppLayout**

在 `AppLayout.vue` 中 import 并放到 template 末尾。

**Step 3: Commit**

```bash
git add xc/components/user/DeptBindModal.vue xc/components/layout/AppLayout.vue
git commit -m "feat(frontend): DeptBindModal for unassigned user interception"
```

---

## Task 16: 前台 — 个人信息页 profile.vue

**Files:**
- Modify: `xc/pages_plugs/user-center/profile.vue`

**Step 1: 替换占位页面**

编写完整的个人信息页：头像+昵称头部、基本信息（真实姓名可编辑、手机号可编辑）、企业组织（租户名称只读、小组名称只读）、保存按钮、退出登录按钮。保存调用 `user/kh/updateInfo`。

**Step 2: Commit**

```bash
git add xc/pages_plugs/user-center/profile.vue
git commit -m "feat(frontend): user profile page"
```

---

## Task 17: 提案文档修订

**Files:**
- Modify: `specs/公共核心-用户管理-提案.md`

**Step 1: 同步修订原始提案**

- 路径约束表增加 6 个后台页面路径
- FR 列表增加 FR-008 (dev 环境直接指定 tenant_id)
- 云函数接口清单补充缺失接口 (updateInfo, getApplications 等)
- 新增「菜单配置」节
- 验收标准增加微信联调阶段独立标准

**Step 2: Commit**

```bash
git add specs/公共核心-用户管理-提案.md
git commit -m "docs: sync user management proposal with implementation decisions"
```

---

## Verification Plan

### 自动验证（每个 Task 完成后）

- Schema 文件上传后在 uniCloud 控制台确认集合和索引创建成功
- 云函数上传后通过 `vk.callFunction` 在前端控制台手动调用验证返回结果
- tenantFilter 修改后，用不同 `dept_level` 和 `group_id` 的测试账号验证过滤条件

### 集成验证（Phase 4-5 完成后）

1. **集团超管流程**：登录 xc-admin → 看到扩展用户管理菜单 → 查看/编辑用户 → 审批入驻申请
2. **租户管理员流程**：用 tenant_admin 账号登录 xc-admin → 仅看到 4 个租户菜单 → 创建小组 → 分配成员
3. **裸号拦截流程**：创建一个无 tenant_id 的测试账号 → 登录前台 → 验证弹窗不可关闭 → 提交申请 → 审批通过 → 弹窗消失
4. **个人信息页**：登录后访问 profile → 修改真实姓名 → 保存 → 刷新验证

### 微信联调验证（Phase 6，需用户配合）

1. 申请微信测试号
2. 配置回调域名和消息接收 URL
3. 端到端验证 H5 OAuth 和 PC 扫码登录
4. 切换正式公众号做上线回归
