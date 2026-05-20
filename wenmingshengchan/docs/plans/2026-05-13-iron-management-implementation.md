# 铁器管理模块实施计划

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 构建完整的铁器管理闭环系统，包括字典配置、台账登记、奖励反馈及简化版周期性巡检提醒。

**Architecture:** 采用 UniCloud (Uniapp + 腾讯云/阿里云) 架构。B 端负责字典维护、全局数据监管与巡检点位配置；C 端负责业务录入与基于快照时间的巡检过期提醒；云函数负责 24 小时编辑锁及巡检状态计算逻辑。

**Tech Stack:** UniApp, UniCloud (JQL + Cloud Functions), ColorUI/uView (UI components), MongoDB (UniCloud Database).

---

### Task 1: 数据库 Schema 定义

**Files:**
- Create: `mp-client/uniCloud-aliyun/database/iron-type-dict.schema.json`
- Create: `mp-client/uniCloud-aliyun/database/iron-location-dict.schema.json`
- Create: `mp-client/uniCloud-aliyun/database/iron-register.schema.json`
- Create: `mp-client/uniCloud-aliyun/database/iron-reward-feedback.schema.json`
- Create: `mp-client/uniCloud-aliyun/database/iron-inspect-point.schema.json`
- Create: `mp-client/uniCloud-aliyun/database/iron-inspect-record.schema.json`

**Step 1: 创建铁器类型字典 Schema**
参考内容：包含 `name`, `sort`, `status` 字段。

**Step 2: 创建部位点位字典 Schema**
参考内容：包含 `name`, `sort`, `status` 字段。

**Step 3: 创建铁器登记 Schema**
包含 `name`, `location_id/name`, `iron_type_id/name`, `dept_id/name`, `damage_level`, `images` 及录入人信息。

**Step 4: 创建奖励性反馈 Schema**
包含 `name`, `found_location_id/name`, `iron_type_id/name`, `responsible_dept_id/name`, `images`。

**Step 5: 创建巡检点位配置 Schema**
关键字段：`period_days`, `assignees`, `last_inspect_at`, `next_deadline`, `status`。

**Step 6: 创建巡检录入日志 Schema**
记录历史每一次的巡检反馈详情。

**Step 7: 提交数据库定义**
```bash
git add mp-client/uniCloud-aliyun/database/*.schema.json
git commit -m "db: define schemas for iron management module"
```

---

### Task 2: B 端基础字典管理 (TQ-04)

**Files:**
- Modify: `mp-admin/uniCloud-aliyun/cloudfunctions/vk-admin/service/admin/iron/dict/sys/add.js` (新建)
- Modify: `mp-admin/uniCloud-aliyun/cloudfunctions/vk-admin/service/admin/iron/dict/sys/update.js` (新建)
- Modify: `mp-admin/uniCloud-aliyun/cloudfunctions/vk-admin/service/admin/iron/dict/sys/getList.js` (新建)
- Create: `mp-admin/pages/iron/dict/type.vue`
- Create: `mp-admin/pages/iron/dict/location.vue`

**Step 1: 编写字典通用增删改查云函数**
实现对 `iron-type-dict` 和 `iron-location-dict` 的基本操作。

**Step 2: 实现类型字典管理页面**
使用 `vk-data-table` 展示类型列表，支持排序和启停用。

**Step 3: 实现部位点位管理页面**
同上，维护发现部位/使用点位库。

**Step 4: 配置 B 端菜单**
在 `opendb-admin-menus` 中添加铁器管理及字典配置子菜单。

**Step 5: 提交字典管理功能**
```bash
git commit -m "feat(admin): add iron dictionary management pages and functions"
```

---

### Task 3: C 端铁器登记与奖励反馈录入 (TQ-01/TQ-02)

**Files:**
- Create: `mp-client/pages/iron/register/submit.vue`
- Create: `mp-client/pages/iron/reward/submit.vue`
- Modify: `mp-client/uniCloud-aliyun/cloudfunctions/iron-service/index.js` (新建模块化云函数)

**Step 1: 编写铁器业务云函数 (iron-service)**
集成 `addRegister`, `addRewardFeedback` 逻辑，并在其中加入 `role_id` 权限校验（限部门管理员以上）。

**Step 2: 开发铁器登记录入页面**
实现下拉选择点位/类型，支持多图上传，提交前校验必填项。

**Step 3: 开发奖励反馈录入页面**
同上，针对发现部位进行下拉选择。

**Step 4: 提交录入功能**
```bash
git commit -m "feat(client): implement iron registration and reward feedback submission"
```

---

### Task 4: 24 小时编辑锁逻辑

**Files:**
- Modify: `mp-client/uniCloud-aliyun/cloudfunctions/iron-service/index.js`

**Step 1: 实现修改/删除前的权限与时间校验**
在云函数中拦截 `update` 和 `delete` 请求，计算 `now - created_at` 是否超过 24 小时。

**Step 2: 前端 UI 适配**
在列表页中，根据时间逻辑动态控制“操作”按钮的显示/隐藏。

---

### Task 5: 简化版周期性巡检与主页提醒 (TQ-03)

**Files:**
- Create: `mp-admin/pages/iron/inspect/point-config.vue` (B端配置)
- Modify: `mp-client/pages/index/index.vue` (C端首页)
- Modify: `mp-client/pages/iron/inspect/submit.vue` (C端录入)

**Step 1: B 端开发点位巡检配置页面**
管理员指定责任人、周期天数，并初始化 `next_deadline`。

**Step 2: C 端首页巡检到期提示逻辑**
首页加载时调用云函数 `getInspectSummary`，查询当前用户负责且即将过期的点位数量。
若有过期任务，显示汇总文字：“您有 X 个巡检点位即将到期，请及时录入”。

**Step 3: C 端开发巡检反馈提交页面**
提交反馈后，云函数同步更新 `iron-inspect-point` 中的 `last_inspect_at` 和 `next_deadline`（当前时间 + 周期）。

**Step 4: 提交巡检提醒功能**
```bash
git commit -m "feat: implement simplified periodic inspection with home page reminders"
```

---

### Task 6: 数据查询、详情与导出

**Files:**
- Create: `mp-client/pages/iron/register/list.vue`
- Create: `mp-admin/pages/iron/register/all-list.vue`

**Step 1: 实现 C 端台账列表页**
支持按名称、类型、部门筛选。

**Step 2: 实现 B 端全量监管与导出**
超级管理员可查看所有记录并一键导出 Excel。

**Step 3: 最终集成测试与文档更新**
```bash
git commit -m "feat: complete iron management module with data export and polish"
```
