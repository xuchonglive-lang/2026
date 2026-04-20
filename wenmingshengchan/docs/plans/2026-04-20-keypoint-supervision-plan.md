# Keypoint Supervision Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 实现重控点位监督管理模块，基于惰性查询和无锁抢答机制完成每日重点点位的现场图文反馈。

**Architecture:** B端配置生成规则与人员映射，UniCloud 定时触发器自动生成快照单据。C端列表查询采用惰性时间过滤动态返回逾期状态，提交更新采用 `status: 0` 乐观锁防并发踩踏。每日凌晨执行物理状态洗库兜底。

**Tech Stack:** uni-app, vk-unicloud-router, uni-id

---

### Task 1: 建立底层数据结构 (Database Schemas)

**Files:**
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\database\key-point-cron-config.schema.ext.js`
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\database\key-point-config.schema.ext.js`
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\database\key-point-feedback.schema.ext.js`

**Step 1: 创建 Schema 定义文件并写入字段配置**
根据设计文档，在 `database` 目录下创建三个表对应的扩展 schema 文件。

**Step 2: 提交代码**
```bash
git add mp-client/uniCloud-aliyun/database/*
git commit -m "feat: add key-point database schemas"
```

---

### Task 2: B端云函数开发 - 配置管理 (Admin Config API)

**Files:**
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\cloudfunctions\router\service\admin\feedback\sys\addConfig.js`
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\cloudfunctions\router\service\admin\feedback\sys\updateConfig.js`
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\cloudfunctions\router\service\admin\feedback\sys\getConfigList.js`

**Step 1: 实现配置表的 CRUD**
实现 `vk.baseDao.add`, `update`, `getList` 逻辑。特别是在 `getList` 中，针对部门管理员加入 `dept_id` 过滤机制。

**Step 2: 提交代码**
```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/feedback/sys/*
git commit -m "feat: implement admin config management APIs"
```

---

### Task 3: 云函数 - 定时任务生成引擎 (Cron Task Generator)

**Files:**
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\cloudfunctions\router\service\client\timer\pub\generateFeedbackTasks.js`

**Step 1: 实现任务生成逻辑**
1. 读取 `key-point-cron-config` 验证当前时间是否命中某个班次的 `trigger_time`。
2. 若命中，拉取所有启用态的 `key-point-config`。
3. 组合 `shift_date` (若是夜班记次日) 和快照数据，使用 `vk.baseDao.adds` 批量插入 `key-point-feedback`。

**Step 2: 提交代码**
```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/timer/pub/generateFeedbackTasks.js
git commit -m "feat: implement feedback task cron generator"
```

---

### Task 4: C端云函数 - 任务获取与惰性判断 (Client Lazy Query)

**Files:**
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\cloudfunctions\router\service\client\feedback\user\getTodoList.js`
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\cloudfunctions\router\service\client\feedback\user\getHistoryList.js`

**Step 1: 实现带惰性更新策略的查询接口**
1. 根据 `uid` 过滤分配给自己的任务 (`_.in(assignee_ids)`)。
2. 在返回列表数据前，遍历处理：若 `status === 0`，计算当前时间是否已超班次结束+2小时。若超时，将返回数据体的 `status` 置为 `2`。

**Step 2: 提交代码**
```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/feedback/user/*
git commit -m "feat: implement client lazy evaluation list APIs"
```

---

### Task 5: C端云函数 - 抢答提交与撤回 (Client Submit & Retract)

**Files:**
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\cloudfunctions\router\service\client\feedback\user\submitFeedback.js`
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\cloudfunctions\router\service\client\feedback\user\retractFeedback.js`

**Step 1: 实现无锁更新抢答**
1. `submitFeedback`: `vk.baseDao.update({ where: { _id, status: 0 }, data: { status: 1, submit_uid: uid, ... } })`
2. 若更新失败抛出提示。
3. `retractFeedback`: 将 `status: 1` 且属于自己的单据清空照片并置为 `status: 0`。

**Step 2: 提交代码**
```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/feedback/user/*
git commit -m "feat: implement optimistic lock submission and retraction"
```

---

### Task 6: 定时任务 - 凌晨物理兜底洗库 (Nightly Fallback Sweep)

**Files:**
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\cloudfunctions\router\service\client\timer\pub\sweepOverdueFeedback.js`

**Step 1: 实现兜底更新**
直接用 `vk.baseDao.update` 将数据库中时间已超出阈值且 `status: 0` 的记录全部更新为 `status: 2`，释放查询接口的惰性计算压力。

**Step 2: 提交代码**
```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/timer/pub/sweepOverdueFeedback.js
git commit -m "feat: add nightly sweep for overdue tasks"
```
