# 现场反馈展示功能全面修复计划 (2026-05-09)

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 修复现场反馈模块的所有功能逻辑，包括 20:00 跨天班次逻辑、全量点位骨架展示、未反馈状态处理、大图查看、轮播图掩码增强以及单点位分析的 z-paging 分页。

**Architecture:** 采用后端驱动模式。云函数 `getLiveStatus.js` 负责全量逻辑；前端 `showpoint.vue` 负责 UI 渲染和分页触发。

**Tech Stack:** uni-app, uniCloud, z-paging, ColorUI.

---

### Task 1: 后端基础 - 班次判定与最新记录检测
**Files:**
- Modify: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/feedback/kh/getLiveStatus.js`

**Step 1: 修改 getLiveStatus.js 入口逻辑**
实现以下功能：
- 定义 `DEFAULT_IMG` 占位图常量。
- 如果没有传 `date` 和 `shiftType`，先查 `key-point-feedback` 最新一条记录的日期和班次。
- 返回 `queryParam` 给前端，以便同步 UI 状态。

### Task 2: 后端全局模式 - 骨架生成与反馈叠加
**Files:**
- Modify: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/feedback/kh/getLiveStatus.js`

**Step 1: 实现 Skeleton-Overlay 逻辑**
- 获取 `base-area` 和 `base-point` 的全量列表。
- 获取该班次的反馈记录。
- 合并逻辑：若无反馈，标记 `has_feedback: false`，展示占位图，从点位表读取负责人信息拼装页脚。
- 汇总 `carouselList` 用于轮播图，包含完整的描述掩码。

### Task 3: 后端单点模式 - 分页与分组
**Files:**
- Modify: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/feedback/kh/getLiveStatus.js`

**Step 1: 实现 mode: 'single' 分页逻辑**
- 根据 `pointId` 和日期范围查询。
- 按 `shift_date` + `shift_type` 分组。
- 兼容 `z-paging` 返回格式。

### Task 4: 前端 Tab 1 - UI 适配与大图预览
**Files:**
- Modify: `mp-client/pages/showpoint/showpoint.vue`
- Modify: `mp-client/components/live-status-carousel/live-status-carousel.vue`

**Step 1: 适配 Grid 视图**
- 使用后端返回的 `has_feedback` 判定显示样式。
- 统一调用 `vk.pubfn.previewImage`。
- 同步日期/班次状态到选择器。

**Step 2: 增强轮播图**
- 传递 `carouselList` 并显示 `carousel_mask`。

### Task 5: 前端 Tab 2 - z-paging 集成
**Files:**
- Modify: `mp-client/pages/showpoint/showpoint.vue`

**Step 1: 替换 Tab 2 列表为 z-paging**
- 配置分页参数。
- 渲染标准点位卡片。
