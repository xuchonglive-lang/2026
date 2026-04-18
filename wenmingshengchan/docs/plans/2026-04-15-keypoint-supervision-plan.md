# 重控点位监督管理 Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 落地完成重控点位监督管理模块，涵盖基于时效卡点的自动派发、防止高并发踩踏的C端无锁抢答及 EXIF 防伪，以及B端的高效统括质检。

**Architecture:** 严格按照 ` constitution.md ` 与 Dao 2.0 规范，以 `key-point-cron-config` 跨接 `key-point-config` 作为规则层，结合高频 Cron 定时器抓取快照至 `key-point-feedback`。前端在 C 端解耦独立闭环链路（高度整合待办、提交和历史），在 B 端实施部门树状归属鉴权并配合软拦截实现 DDL 逾期零容忍过滤。

**Tech Stack:** Vue 2 (mp-client & mp-admin), UniCloud (`vk-fun` router), EXIF.js (C 侧防伪).

---

### Task 1: 数据库与 Cron 配置初始化

**Files:**
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\database\key-point-cron-config.schema.json`
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\database\key-point-config.schema.json`
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\database\key-point-feedback.schema.json`

**Step 1: 构建 Schema 描述及防并行索引**
```javascript
// 在 key-point-feedback.schema.json 中补充如下索引阵列：
"bsonType": "object",
"required": ["config_id", "point_id", "shift_date", "shift_type"],
// 必须配置外层 _id 及索引
/* 增加复合唯一索引 */
```

**Step 2: Commit**
```bash
git add mp-client/uniCloud-aliyun/database/*.json
git commit -m "feat(db): 确立重控点位数据底层及唯一防并发索引"
```

---

### Task 2: 云函数 - 定时任务引擎 (Crontab)

**Files:**
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\cloudfunctions\router\service\crontab\feedback\generateFeedbackTasks.js`

**Step 1: 编写 Cron 动态卡点下发脚本**
读取 DB 中的时刻设定与当前对比，采用 `vk.baseDao.adds` 一次性推送快照至事实表。
**Step 2: 本地云函数联机运行验证幂等拦截**
Run: 右键云函数执行该逻辑两次。
Expected: 第一次新增成功，第二次抛出 Duplicate Key 冲突被拦截捕获，数据仅保留一份。
**Step 3: Commit**
```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/crontab/feedback/
git commit -m "feat(cloud): 增加定时快照卡点派发引擎"
```

---

### Task 3: 云函数 - B端接口 (Admin)

**Files:**
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\cloudfunctions\router\service\admin\feedback\cron\setCronConfig.js`
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\cloudfunctions\router\service\admin\feedback\sys\getConfigList.js`
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\cloudfunctions\router\service\admin\feedback\sys\getFeedbackList.js`
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\cloudfunctions\router\service\admin\feedback\sys\auditFeedback.js`

**Step 1: 实现配置与追责逻辑**
利用 `vk.baseDao.update` 增加轻量级追责记录 (`audit_time`,`audit_mark`)，不退回 `status`。
**Step 2: Commit**
```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/feedback/
git commit -m "feat(cloud): 实现 B 端配管与闭环质留痕"
```

---

### Task 4: 云函数 - C端业务 (Client)

**Files:**
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\cloudfunctions\router\service\client\feedback\kh\getTodoList.js`
- Create: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\cloudfunctions\router\service\client\feedback\kh\submitFeedback.js`

**Step 1: 实现抢答式无锁录入**
```javascript
// submitFeedback.js 中心核：
const res = await vk.baseDao.update({
  dbName: "key-point-feedback",
  whereJson: { _id, status: 0 }, // 必须依然为挂起态
  dataJson: { status: 1, submit_uid, photo_shoot_time, device_model, ... }
});
if(res === 0) return { code:-1, msg: "该任务已被同组工友提交" };
```
**Step 2: Commit**
```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/feedback/
git commit -m "feat(cloud): 实装抢答防伪与惰性洗单云拦截"
```

---

### Task 5: B端页面装配 (Vue Admin)

**Files:**
- Create: `d:\AI project\2026\wenmingshengchan\mp-admin\pages\feedback\cron-config.vue`
- Create: `d:\AI project\2026\wenmingshengchan\mp-admin\pages\feedback\point-config.vue`
- Create: `d:\AI project\2026\wenmingshengchan\mp-admin\pages\feedback\feedback-list.vue`

**Step 1: 配置管理流水线 UI (vk-data-table)**
针对上述接口开发 B端后台界面，嵌入照片画廊查看审核。
**Step 2: Commit**
```bash
git add mp-admin/pages/feedback/
git commit -m "feat(b-end): 构建定时管控与流水质检业务页面"
```

---

### Task 6: C端整合集束页与 EXIF 防伪落地 (Vue Client)

**Files:**
- Modify: `d:\AI project\2026\wenmingshengchan\mp-client\pages\index\index.vue`
- Modify: `d:\AI project\2026\wenmingshengchan\mp-client\pages\feedback\todo-list\index.vue`
- Modify: `d:\AI project\2026\wenmingshengchan\mp-client\pages\feedback\submit\index.vue`
- Modify: `d:\AI project\2026\wenmingshengchan\mp-client\pages\feedback\history\index.vue`

**Step 1: 安装依赖库**
Run: `npm install exif-js` (位于 `mp-client` 根目录)

**Step 2: 注入业务路由与 EXIF 卡点流**
在 `todo-list` 将接口从伪造切为正式，点击卡片透传进入 `submit`；在 `submit` 使用 `sp-editor` 上传相片节点截取二进制并用 `exif.js` 获取原始标签发送；在 `history` 反显提取特征，形成全闭环整合（只专注于重控点位业务）。
**Step 3: Commit**
```bash
git add mp-client/pages/feedback/ mp-client/pages/index/ mp-client/package.json
git commit -m "feat(c-end): 整合打卡链路，植入 EXIF 反虚假拍照校验核心代码"
```
