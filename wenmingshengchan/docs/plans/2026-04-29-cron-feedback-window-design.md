# 设计文档：可配置定时触发与反馈时间窗口

**创建时间**：2026-04-29
**状态**：已审核通过
**关联提案**：`specs/重控点位监督管理-提案.md`、`specs/重控点位监督管理变更-提案.md`

## 一、需求概述

在现有重控点位监督管理模块基础上，将以下两个机制从硬编码升级为**全局可配置**：

1. **定时任务触发时间** (`trigger_time`)：系统管理员可在B端独立配置白班和夜班的任务生成时间。例如白班配置 `14:00`，则每天 `14:00` 触发云函数仅生成白班任务。
2. **反馈时间窗口** (`feedback_start` / `feedback_end`)：系统管理员可配置每个班次允许用户提交反馈的时间区间。窗口外禁止提交，窗口结束时间同时作为逾期判定截止线。

两个机制按班次独立配置，全局统一生效，对所有反馈任务适用。

## 二、数据模型

### `key-point-cron-config` 表（扩展）

表中固定两条记录（白班、夜班），每条记录承载该班次的全部时间配置。

| 字段名称 | 类型 | 必填 | 示例值 | 说明 |
|---------|------|------|-------|------|
| `_id` | ObjectId | 自动 | — | 主键 |
| `shift_type` | String | ✅ | `day` | 班次标识：`day`（白班）或 `night`（夜班） |
| `trigger_time` | String | ✅ | `14:00` | 任务生成触发时间（HH:mm），云函数在此时间点生成该班次的反馈任务 |
| `feedback_start` | String | ✅ | `19:00` | **新增**。反馈窗口开始时间（HH:mm），此时间之前禁止提交 |
| `feedback_end` | String | ✅ | `21:00` | **新增**。反馈窗口结束时间（HH:mm），此时间之后标记为逾期 |
| `updator_uid` | String | ✅ | — | 最后修改的管理员ID |
| `update_time` | Timestamp | ✅ | — | 修改留档时间戳 |

**初始化数据**：

```json
[
  { "shift_type": "day",   "trigger_time": "14:00", "feedback_start": "19:00", "feedback_end": "21:00" },
  { "shift_type": "night", "trigger_time": "05:00", "feedback_start": "07:00", "feedback_end": "09:00" }
]
```

## 三、时间线流程（以白班为例）

```
14:00 ── trigger_time ── 系统自动生成白班反馈任务
  │
  │  [14:00 ~ 19:00] 任务已存在，前端显示"未到反馈时间"，提交按钮禁用
  │
19:00 ── feedback_start ── 反馈窗口打开
  │
  │  [19:00 ~ 21:00] 允许提交反馈，前端显示"可反馈"
  │
21:00 ── feedback_end ── 反馈窗口关闭 = 逾期截止线
  │
  │  [21:00+] 未提交的任务标记为逾期，前端显示"已逾期，不能提交"
```

## 四、影响范围与改动清单

### 4.1 数据库 Schema

- **文件**：`mp-client/uniCloud-aliyun/database/key-point-cron-config.schema.json`
- **改动**：`required` 数组新增 `feedback_start`、`feedback_end`；`properties` 新增对应字段声明。

### 4.2 初始化数据

- **文件**：`mp-client/uniCloud-aliyun/database/key-point-cron-config.init_data.json`
- **改动**：两条记录各新增 `feedback_start`、`feedback_end` 字段值。

### 4.3 B端后台 (mp-admin)

#### cron-config.vue
- **表格列**：新增"反馈开始时间"和"反馈截止时间"两列。
- **表单字段**：新增两个 `time` 类型选择器（格式 `HH:mm`）。
- **表单校验**：新增 `feedback_start`、`feedback_end` 的必填校验规则。

#### setCronConfig.js / addCronConfig.js / updateCronConfig.js
- **入参**：新增接收 `feedback_start`、`feedback_end`。
- **校验**：验证时间格式合法性（`HH:mm`），验证 `feedback_start` 早于 `feedback_end`。
- **存储**：将新字段持久化到数据库。

### 4.4 C端云函数 (核心改动)

#### submitFeedback.js — 新增时间窗口校验

提交反馈时，新增以下逻辑：
1. 根据待提交任务的 `shift_type` 读取对应的 `cron-config` 记录。
2. 获取当前服务器时间（`HH:mm`），与 `feedback_start` 和 `feedback_end` 比对。
3. 若当前时间早于 `feedback_start`：返回 `{ code: -1, msg: "未到反馈时间，请在 XX:XX 之后提交" }`。
4. 若当前时间晚于 `feedback_end`：返回 `{ code: -1, msg: "反馈窗口已关闭，任务已逾期" }`。
5. 窗口内正常执行原有的抢答式提交逻辑。

#### getTodoList.js — 新增窗口状态标注

查询待办列表时，新增以下逻辑：
1. 批量读取 `cron-config` 的两条记录构建 `shiftMap`。
2. 遍历返回数据，根据每条任务的 `shift_type` 匹配对应窗口。
3. 在每条记录中注入 `_feedback_status` 字段：
   - `waiting`：当前时间早于 `feedback_start`
   - `active`：当前时间在 `[feedback_start, feedback_end]` 之间
   - `expired`：当前时间晚于 `feedback_end`
4. 同时注入 `_feedback_start` 和 `_feedback_end` 供前端展示具体时间。

### 4.5 定时任务云函数

#### generateFeedbackTasks.js
- **无逻辑改动**：该函数已通过读取 `trigger_time` 判断是否命中。新字段不影响其派单逻辑。

### 4.6 逾期判定机制

原有的惰性逾期判定（DDL Lazy Status Update）改为基于 `feedback_end` 配置：

- **查询时判定**：`getTodoList` / `getHistoryList` 返回数据时，若 `status === 0` 且当前时间晚于 `feedback_end`，动态注入 `status: 2`（逾期态）展示。
- **提交时落锁**：`submitFeedback` 在窗口关闭后拒绝提交，并可选择将该条记录物理更新为 `status: 2`。

### 4.7 C端前端

#### 待办列表页 (todo-list)
- 根据 `_feedback_status` 渲染不同状态标签：
  - `waiting` → 灰色标签"未到反馈时间 (19:00开始)"
  - `active` → 蓝色标签"可反馈"，允许点击进入提交
  - `expired` → 红色标签"已逾期"

#### 提交页 (submit)
- 进入页面时检查 `_feedback_status`。若非 `active`，显示提示信息并禁用提交按钮。

## 五、边界与风险

| 场景 | 处理策略 |
|------|---------|
| 夜班反馈窗口跨天（如 23:00-01:00） | 当前需求明确窗口不跨天（07:00-09:00），暂不处理跨天场景。若未来需要，在比对逻辑中加入日期偏移即可 |
| 管理员将 feedback_end 设早于 feedback_start | 后端云函数校验拦截，拒绝保存 |
| 管理员在窗口期内修改配置 | 即时生效，正在反馈的用户不受影响（已打开的页面在提交时服务端会重新读取最新配置） |
| 数据库中缺少 cron-config 记录 | 云函数降级为不做窗口校验，允许提交（向后兼容） |
