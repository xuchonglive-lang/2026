# Configurable Cron Trigger and Feedback Window Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Make the cron trigger time and feedback submission window configurable per shift, replacing hardcoded rules.

**Architecture:** Extend the `key-point-cron-config` schema and admin interfaces to manage `feedback_start` and `feedback_end` times. Update client cloud functions (`getTodoList`, `submitFeedback`) to enforce these windows dynamically and inject status (`waiting`, `active`, `expired`) for frontend rendering.

**Tech Stack:** uni-app, uniCloud (vk-unicloud-router), Vue 2

---

### Task 1: Database Schema & Init Data

**Files:**
- Modify: `mp-client/uniCloud-aliyun/database/key-point-cron-config.schema.json`
- Modify: `mp-client/uniCloud-aliyun/database/key-point-cron-config.init_data.json`

**Step 1: Update schema**
Add `feedback_start` and `feedback_end` to the required list and properties in `key-point-cron-config.schema.json`.
```json
  "required": ["shift_type", "trigger_time", "feedback_start", "feedback_end"],
  "properties": {
    "_id": { "description": "ID，系统自动生成" },
    "shift_type": { "bsonType": "string", "description": "day (白班) 或 night (夜班)" },
    "trigger_time": { "bsonType": "string", "description": "设定的触发卡点，如 07:30 或 19:30" },
    "feedback_start": { "bsonType": "string", "description": "反馈窗口开始时间(HH:mm)" },
    "feedback_end": { "bsonType": "string", "description": "反馈窗口结束时间(HH:mm)" },
    "updator_uid": { "bsonType": "string", "description": "最后做此设置修改的管理员ID" },
    "update_time": { "bsonType": "timestamp", "description": "设置留档时间戳" }
  }
```

**Step 2: Update init data**
Add the new fields to `key-point-cron-config.init_data.json`.
```json
[
  {
    "shift_type": "day",
    "trigger_time": "14:00",
    "feedback_start": "19:00",
    "feedback_end": "21:00"
  },
  {
    "shift_type": "night",
    "trigger_time": "05:00",
    "feedback_start": "07:00",
    "feedback_end": "09:00"
  }
]
```

**Step 3: Commit**
```bash
git add mp-client/uniCloud-aliyun/database/key-point-cron-config.schema.json mp-client/uniCloud-aliyun/database/key-point-cron-config.init_data.json
git commit -m "feat(db): add feedback_start and feedback_end to cron config schema"
```

---

### Task 2: Admin Cloud Functions

**Files:**
- Modify: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/feedback/sys/addCronConfig.js`
- Modify: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/feedback/sys/updateCronConfig.js`
- Modify: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/feedback/cron/setCronConfig.js`

**Step 1: Update addCronConfig.js**
Add validation for `feedback_start` and `feedback_end`.
```javascript
// Add to validation section
if (!data.feedback_start) return { code: -1, msg: "反馈开始时间不能为空" };
if (!data.feedback_end) return { code: -1, msg: "反馈截止时间不能为空" };
if (!timeRegex.test(data.feedback_start) || !timeRegex.test(data.feedback_end)) {
  return { code: -1, msg: "反馈时间格式错误，需为 HH:mm" };
}
if (data.feedback_start >= data.feedback_end) {
  return { code: -1, msg: "反馈开始时间必须早于截止时间" };
}

// Add to db add
feedback_start: data.feedback_start,
feedback_end: data.feedback_end,
```

**Step 2: Update updateCronConfig.js**
Ensure validation is added before updating.
```javascript
// Add to validation section (after data._id check)
let timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
if (data.feedback_start && !timeRegex.test(data.feedback_start)) return { code: -1, msg: "时间格式错误" };
if (data.feedback_end && !timeRegex.test(data.feedback_end)) return { code: -1, msg: "时间格式错误" };
if (data.feedback_start && data.feedback_end && data.feedback_start >= data.feedback_end) {
  return { code: -1, msg: "反馈开始时间必须早于截止时间" };
}
```

**Step 3: Update setCronConfig.js**
Handle the new fields.
```javascript
let { _id, trigger_time, feedback_start, feedback_end } = data;
if (!_id || !trigger_time || !feedback_start || !feedback_end) return { code: -1, msg: "配置载体和时间缺失" };

// In dataJson
trigger_time: trigger_time,
feedback_start: feedback_start,
feedback_end: feedback_end,
```

**Step 4: Commit**
```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/feedback/
git commit -m "feat(admin-api): handle feedback window fields in cron config"
```

---

### Task 3: Admin UI

**Files:**
- Modify: `mp-admin/pages/feedback/cron-config.vue`

**Step 1: Update Table Columns**
Add `feedback_start` and `feedback_end` to `table1.columns`.
```javascript
{ key: "trigger_time", title: "每日触发卡点(HH:mm)", type: "text", width: 200 },
{ key: "feedback_start", title: "反馈开始时间", type: "text", width: 150 },
{ key: "feedback_end", title: "反馈截止时间", type: "text", width: 150 },
```

**Step 2: Update Form Props**
Add the new fields to `form1.props.columns` and `form1.props.rules`.
```javascript
// Columns
{ 
  key: "feedback_start", 
  title: "反馈开始时间", 
  type: "time", 
  format: "HH:mm",
  valueFormat: "HH:mm",
  placeholder: "请选择开始时间" 
},
{ 
  key: "feedback_end", 
  title: "反馈截止时间", 
  type: "time", 
  format: "HH:mm",
  valueFormat: "HH:mm",
  placeholder: "请选择截止时间" 
}

// Rules
feedback_start: [{ required: true, message: "开始时间不能为空", trigger: "change" }],
feedback_end: [{ required: true, message: "截止时间不能为空", trigger: "change" }]
```

**Step 3: Commit**
```bash
git add mp-admin/pages/feedback/cron-config.vue
git commit -m "feat(admin-ui): add feedback window config fields"
```

---

### Task 4: Client Cloud Functions

**Files:**
- Modify: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/feedback/kh/getTodoList.js`
- Modify: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/feedback/kh/submitFeedback.js`

**Step 1: Update getTodoList.js**
Fetch configs and inject status. Add this logic after `selectRes`.
```javascript
let configs = await vk.baseDao.selects({ dbName: "key-point-cron-config" });
let shiftMap = {};
if (configs.rows) {
  configs.rows.forEach(c => shiftMap[c.shift_type] = c);
}

let currentTimeStr = pubFun.timeFormat(new Date(), "hh:mm");

if (selectRes.rows) {
  for (let row of selectRes.rows) {
    let conf = shiftMap[row.shift_type];
    if (conf && conf.feedback_start && conf.feedback_end) {
      row._feedback_start = conf.feedback_start;
      row._feedback_end = conf.feedback_end;
      
      if (currentTimeStr < conf.feedback_start) {
        row._feedback_status = 'waiting';
      } else if (currentTimeStr > conf.feedback_end) {
        row._feedback_status = 'expired';
        row.status = 2; // Dynamic expiration
      } else {
        row._feedback_status = 'active';
      }
    } else {
       // Fallback
       row._feedback_status = 'active';
    }
  }
}
```

**Step 2: Update submitFeedback.js**
Add window validation logic.
```javascript
// After formattedImages

// Fetch task info to get shift_type
let taskInfo = await vk.baseDao.findById({
  dbName: "key-point-feedback",
  id: _id
});
if (!taskInfo || taskInfo.status !== 0) return { code: -1, msg: "任务不存在或状态异常" };

let configList = await vk.baseDao.selects({
  dbName: "key-point-cron-config",
  whereJson: { shift_type: taskInfo.shift_type }
});
if (configList.rows && configList.rows.length > 0) {
  let conf = configList.rows[0];
  if (conf.feedback_start && conf.feedback_end) {
    let currentTimeStr = pubFun.timeFormat(new Date(), "hh:mm");
    if (currentTimeStr < conf.feedback_start) {
      return { code: -1, msg: `未到反馈时间，请在 ${conf.feedback_start} 之后提交` };
    }
    if (currentTimeStr > conf.feedback_end) {
      return { code: -1, msg: "反馈窗口已关闭，任务已逾期" };
    }
  }
}

// Then proceed with vk.baseDao.update
```

**Step 3: Commit**
```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/feedback/
git commit -m "feat(client-api): enforce feedback window and inject status"
```

---

### Task 5: Client Frontend

**Files:**
- Modify: `mp-client/pages/feedback/todo-list/index.vue`
- Modify: `mp-client/pages/feedback/submit/index.vue`

**Step 1: Update todo-list UI**
Pass `_feedback_status` in `goSubmit`.
```javascript
goSubmit(item) {
  uni.navigateTo({
     url: `/pages/feedback/submit/index?id=${item._id}&name=${item.point_info && item.point_info[0] ? item.point_info[0].name : ''}&status=${item._feedback_status || 'active'}`
  });
}
```
Update `getTimeRange`.
```javascript
getTimeRange(item) {
  if (item._feedback_start && item._feedback_end) {
    return `${item._feedback_start} - ${item._feedback_end}`;
  }
  if (item.shift_type === 'day') return "08:00 - 18:00";
  // ... fallback logic
}
```
Update `u-tag` status display.
```html
<view class="card-title-row">
  <text class="card-title">{{ getPointName(item) }}</text>
  <u-tag v-if="item._feedback_status === 'waiting'" text="未到时间" type="info" mode="light" size="mini" />
  <u-tag v-else-if="item._feedback_status === 'expired'" text="已逾期" type="error" mode="dark" size="mini" />
  <u-tag v-else text="未反馈" type="error" mode="light" size="mini" />
</view>
```
Disable action button if not active.
```html
<view class="action-btn" :class="{'disabled-btn': item._feedback_status && item._feedback_status !== 'active'}" @click="item._feedback_status && item._feedback_status !== 'active' ? null : goSubmit(item)">
```
Add CSS.
```css
.disabled-btn { background-color: #f1f5f9; cursor: not-allowed; opacity: 0.7; }
.disabled-btn .action-btn-text, .disabled-btn .icon-arrow { color: #94a3b8; }
```

**Step 2: Update submit UI**
Read status from options.
```javascript
// data
feedbackStatus: 'active'

// onLoad
this.feedbackStatus = options.status || 'active';
```
Disable button.
```html
<button class="submit-btn" @click="submit" :disabled="submitting || feedbackStatus !== 'active'">
  <text class="material-symbols-outlined label-fill-icon">send</text>
  <text class="submit-btn-text">{{ submitting ? '提交中...' : (feedbackStatus === 'waiting' ? '未到提交时间' : (feedbackStatus === 'expired' ? '已逾期' : '提交反馈报告')) }}</text>
</button>
```

**Step 3: Commit**
```bash
git add mp-client/pages/feedback/
git commit -m "feat(client-ui): show feedback window status and block submission"
```
