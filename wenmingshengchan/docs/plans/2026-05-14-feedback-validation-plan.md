# 首页反馈数量验证与本月逾期统计

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 在首页“待办重控”展示时增加实时逾期校验逻辑，并展示“本月累计逾期”数量，确保数据的及时性与准确性。

**Architecture:** 
1. **云函数增强**：修改 `client/feedback/kh/getTodoCount`。
    - **实时清算**：在统计“待办”前，先遍历当前用户所有 `status: 0` 的任务，根据班次配置判断其物理时间是否已过截止点。若已过，立即更新数据库状态为 `status: 2`（逾期）。
    - **累计统计**：统计当前自然月内，状态为 `status: 2` 的任务总数。
2. **前端展示**：修改 `index.vue`。
    - 在“待办重控”数值下方，增加一行辅助文字，展示“本月逾期 X 条”。
    - 增加视觉反馈：如果存在即时逾期清算，首页数值将动态更新，确保用户看到的“待办”均在有效窗口期内。

**Tech Stack:** UniCloud (Cloud Functions), MongoDB (JQL), Vue.js (Uniapp).

---

### Task 1: 升级 getTodoCount 逾期清算与统计逻辑

**Files:**
- Modify: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/feedback/kh/getTodoCount.js`

**Step 1: 实现惰性逾期清算**
从 `getTodoList.js` 移植物理时间计算逻辑：
1. 拉取所有 `status: 0` 任务。
2. 匹配 `key-point-cron-config` 中的班次起止时间。
3. 计算 `endTimeObj`。
4. 对 `currentTime > endTime` 的记录执行批量 `update(status: 2)`。

**Step 2: 统计本月累计逾期数量**
获取当前自然月的起始时间戳，查询 `status: 2` 且归属日期（或添加时间）在范围内的记录数。

```javascript
// 本月起始时间
let now = new Date();
let startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
let monthOverdueCount = await vk.baseDao.count({
    dbName: "key-point-feedback",
    whereJson: {
        assignee_ids: uid,
        status: 2,
        _add_time: _.gte(startOfMonth)
    }
});
res.monthOverdueCount = monthOverdueCount;
```

---

### Task 2: 首页 UI 适配

**Files:**
- Modify: `mp-client/pages/index/index.vue`

**Step 1: 定义数据变量**
在 `data` 中增加 `monthOverdueCount: 0`。

**Step 2: 更新 fetchTodoCount 方法**
接收云函数返回的 `monthOverdueCount` 并赋值。

**Step 3: 修改模板展示**
在“待办重控”数据项下增加备注。
```html
<view class="data-item" @tap="navToTodo">
  <text class="data-num text-orange headline-font">{{ feedbackTodoCount }}</text>
  <text class="data-label">待办重控</text>
  <text v-if="monthOverdueCount > 0" class="overdue-note">本月逾期 {{ monthOverdueCount }} 条</text>
</view>
```

**Step 4: 样式优化**
添加 `.overdue-note` 样式：字体缩小、颜色置灰/深红、边距调整，确保不破坏 Bento 网格布局。

---

### Task 3: 任务追踪更新

**Files:**
- Modify: `docs/plans/task.md`

**Step 1: 加入新任务行**
记录“首页逾期验证与本月统计”任务。
