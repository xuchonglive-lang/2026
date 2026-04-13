# 日治理计划管理 Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 完成“日治理计划管理”模块开发。先优先完成 B 端的管理台脚手架构建与全系列底层云函数开发；然后在不改变 C 端已有像素级复刻视图骨架的前提下整合前端。

**Architecture:** 
1. 表结构优化：统一将验收结果（朱批）和执行证明作为多态对象推入 `feedbacks` 数组。
2. 数据流获取：所有列表获取方法附带 Lazy DDL Update 进行物理洗库，解决查询穿透。
3. 界面整合：优先实现后端；C端界面严格维持先前的 1:1 设计结构，增加干净胶囊Tabs用于分类。

**Tech Stack:** uni-app, Vue 2, vk-uni-cloud-router, CSS, SCSS

---

### Task 0: 完善 PRD 定稿
**Files:**
- Modify: `specs/日治理计划管理-提案.md`

**Step 1:** 将头脑风暴确定的 Tabs 分类、Lazy 惰性洗库策略、多态 `feedbacks` 数组重组逻辑更新入提案（本流程已通过先前的步骤自动化落实）。

---

### Task 1: DDL 惰性洗库与核心获取 API (云函数)

**Files:**
- Create: `uniCloud/cloudfunctions/router/service/client/plan/sys/getList.js`
- Create: `uniCloud/cloudfunctions/router/service/client/plan/sys/getDetail.js`

**Step 1: Write Lazy Update Logic & GetList**
编写统一的方法，在查询物理表前强插 `updateMany`。

---

### Task 2: 原子化流转云函数 (Feedback & Audit)

**Files:**
- Create: `uniCloud/cloudfunctions/router/service/client/plan/user/submitFeedback.js`
- Create: `uniCloud/cloudfunctions/router/service/client/plan/pub/auditPlan.js`

**Step 1: Write submitFeedback & auditPlan**
利用 `_.push` 压入区分了 `type: 'submit'` 以及 `type: 'audit'` 的多态评述记录。

---

### Task 3: B 端 Admin 台脚手架搭建与后端联调

**Files:**
- Create: `mp-admin/pages/plan/daily/list.vue`
- Create: `uniCloud/cloudfunctions/router/service/admin/plan/sys/getList.js`
- Create: `uniCloud/cloudfunctions/router/service/admin/plan/sys/add.js`
- Create: `uniCloud/cloudfunctions/router/service/admin/plan/sys/update.js`

**Step 1: Write vk-data-table mapping**
通过标准 vk-data-table 挂载数据渲染视图表格，先打通全域数据库测试和业务后台发布通路。

---

### Task 4: C 端列表页 Tabs 分流与数据对接

**Files:**
- Modify: `mp-client/pages/plan/list/index.vue`

**Step 1: Implement UI Tabs and Data Integration**
在现有精细化列表界面上方的搜索栏内/下加入【全部计划 | 需我执行 | 需我验收】胶囊 Tabs 组件，**严格不破坏既有卡片结构和背景点阵墙结构**，将卡片接入云端 `z-paging` 或普通列表查询进行全域渲染。

---

### Task 5: C 端反馈页数据与生命周期接驳

**Files:**
- Modify: `mp-client/pages/plan/feedback/index.vue`

**Step 1: Refactor UI to timeline arrays**
在维持原有优美表单流结构不变的基础上，把信息区渲染逻辑改为遍历 `feedbacks`，通过 `item.type` 控制分支展示劳工呈文与主管批文；接入云端提交流转动作。
