# Message System Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 实现一个支持站内免刷新横幅角标、并且与微信公众号模板消息集成的消息管理系统。

**Architecture:** 
1. 采用壳模式（devMode），分离前台业务和微信API直连。
2. 基础配置包含三个核心表：消息记录（单行每人）、系统消息模板、微信公众号凭证单行配置。
3. 提供统一公共工具函数 `service/util/messagePush.js` 给所有业务模块复用。

**Tech Stack:** `vk-unicloud-router`、Vue 2、uni-app、Element UI。

---

### Task 1: 建立数据库集合规则

**Files:**
- Create: `xc/uniCloud-aliyun/database/xc-messages.schema.json`
- Create: `xc/uniCloud-aliyun/database/xc-messages.index.json`
- Create: `xc/uniCloud-aliyun/database/xc-message-templates.schema.json`
- Create: `xc/uniCloud-aliyun/database/xc-wx-config.schema.json`

**Step 1: Write schemas**
定义三张表的数据结构：
- `xc-messages`: `receiver_id`, `sender_id`, `msg_type` (String, 动态聚合), `title`, `content` (纯文本), `target_type`, `target_id`, `is_read`, `is_deleted`, `push_status`.
- `xc-message-templates`: `name`, `biz_type`, `wx_template_id`, `title_template`, `content_template`.
- `xc-wx-config`: `app_id`, `app_secret` (`read: false`, `write: false`), `token`.

**Step 2: Commit schemas**
```bash
git add xc/uniCloud-aliyun/database/
git commit -m "feat(message): create DB schemas for message system"
```

---

### Task 2: 核心推送工具类

**Files:**
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/util/messagePush.js`

**Step 1: Write `messagePush.js`**
封装通用发消息函数 `messagePush.send({ receivers, template_key, variables, util, devMode = true })`
1. 查询 `xc-message-templates` 获取模板
2. 生成纯文本内容并批量写入 `xc-messages`，初始化 `push_status='pending'`
3. 根据 devMode 决定是否实质调用 `vk.openapi.weixin.h5.templateMessage.send`推送
4. 更新回写 `push_status`

**Step 2: Commit push utility**
```bash
git add xc/uniCloud-aliyun/cloudfunctions/router/service/util/messagePush.js
git commit -m "feat(message): add messagePush utils"
```

---

### Task 3: 微信基础设施与后台云函数

**Files:**
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/wx-push/sys/refreshToken.js` (以及 menu CRUD)
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/message/sys/getList.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/message/sys/send.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/message/sys/templateAdd.js` (含 CRUD)

**Step 1: Write sys functions**
包含基础的字典表、配置表的保存获取操作。实现 `admin/message/sys/send.js` 接收前端的人员过滤数组、调用 `messagePush.js` 发送。

**Step 2: Commit admin cloud functions**
```bash
git add xc/uniCloud-aliyun/cloudfunctions/router/service/admin/
git commit -m "feat(message): wx-push and message admin cloud functions"
```

---

### Task 4: 前台消息中心云函数

**Files:**
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/client/message/kh/getUnreadCount.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/client/message/kh/getList.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/client/message/kh/getInfo.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/client/message/kh/markRead.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/client/message/kh/markAllRead.js`

**Step 1: Write kh functions**
业务查询 `xc-messages` 限定条件 `receiver_id == userInfo.uid` 并且 `is_deleted != true`。

**Step 2: Commit kh cloud functions**
```bash
git add xc/uniCloud-aliyun/cloudfunctions/router/service/client/message/kh/
git commit -m "feat(message): message kh API endpoints"
```

---

### Task 5: 后台基础配置页面与菜单

**Files:**
- Create: `xc-admin/pages_plugs/message/wx-config.vue`
- Create: `xc-admin/pages_plugs/message/wx-menu.vue`
- Update: `xc/uniCloud-aliyun/database/opendb-admin-menus.init_data.json`

**Step 1: Write configuration pages**
表单页面实现配置保存，更新 `init_data.json` 加载消息管理相关路由及组件路径。

**Step 2: Commit admin config pages**
```bash
git add xc-admin/pages_plugs/message/ xc/uniCloud-aliyun/database/opendb-admin-menus.init_data.json
git commit -m "feat(message): wx config UI and system menus"
```

---

### Task 6: 后台模板与消息明细管理页

**Files:**
- Create: `xc-admin/pages_plugs/message/template.vue`
- Create: `xc-admin/pages_plugs/message/list.vue`

**Step 1: Implement template and list CRUD**
利用 `vk-data-page` 和带有富文本/纯文本弹窗完成发送手动消息界面，实现部门树多选进行目标下发。

**Step 2: Commit message admin list**
```bash
git add xc-admin/pages_plugs/message/
git commit -m "feat(message): message template and sending logs UI"
```

---

### Task 7: 前台角标接入

**Files:**
- Modify: `xc/components/layout/TopNavBar.vue`

**Step 1: Modify TopNavBar**
在组件中调用 `client/message/kh/getUnreadCount`。监听 uni.$on('refreshUnreadCount') 防止跨页后失去对新数字的响应，避免在 onShow 里过度渲染。或由首页 onShow 时统一下发。

**Step 2: Commit nav bar**
```bash
git add xc/components/layout/TopNavBar.vue
git commit -m "feat(message): badge logic on top navbar"
```

---

### Task 8: 前台消息列表与详情页

**Files:**
- Modify: `xc/pages/message/list.vue`
- Modify: `xc/pages/message/detail.vue`

**Step 1: Implement message inbox UI**
支持渲染分类 Tab（从消息列表聚合去重得来业务类型），纯文本列表展示，未读加粗功能和软删侧滑操作。详情页解析业务参数支持“去看看”。

**Step 2: Commit inbox UI**
```bash
git add xc/pages/message/
git commit -m "feat(message): message client UI pages"
```
