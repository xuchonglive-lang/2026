# 基础数据管理 Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 实现公共核心数据管理体系，包括组织架构表的设计、基于微信原生能力的登录与身份认证拦截，以及全局死锁守卫中间件。

**Architecture:** B 端/C 端分层设计，底层通过 uni-id-users 和 base-dept 连结。采用 TDD 开发，逐步实现数据库结构定义、服务端鉴权网关、前端隐私登录组件以及后端穿透业务。

**Tech Stack:** Vue 2, uni-app, vk-unicloud, vk-fun

---

### Task 1: 建立核心数据库表结构 (Schema Definitions)

**Files:**
- Create: `mp-admin/uniCloud-aliyun/database/base-dept.schema.json`
- Create: `mp-admin/uniCloud-aliyun/database/base-area.schema.json`
- Create: `mp-admin/uniCloud-aliyun/database/base-point.schema.json`

**Step 1: Write schemas**
由于是Schema直接生效无单元测试，此处直接编写Schema声明文件。
*在`base-dept.schema.json`中填写基本树结构：*
```json
{
  "bsonType": "object",
  "required": ["name", "status"],
  "permission": { "read": true, "create": false, "update": false, "delete": false },
  "properties": {
    "_id": { "description": "ID，系统自动生成" },
    "parent_id": { "bsonType": "string", "description": "父级ID，为空时表示顶层公司" },
    "name": { "bsonType": "string", "description": "部门/小组名称" },
    "manager": { "bsonType": "string", "description": "负责人姓名" },
    "sort": { "bsonType": "int", "description": "排序" },
    "status": { "bsonType": "int", "description": "状态 (1启/0禁)" }
  }
}
```
*在`base-area.schema.json`与`base-point.schema.json`编写类似结构以符合提案字段。*

**Step 2: Commit**
```bash
git add mp-admin/uniCloud-aliyun/database/
git commit -m "feat: define base-dept, base-area, base-point schema structures"
```

---

### Task 2: 扩展 uni-id-users 表结构

**Files:**
- Modify: `mp-admin/uniCloud-aliyun/database/uni-id-users.schema.json`

**Step 1: Modify Schema properties**
追加自定字段：`real_name`, `department_id`, `audit_status`
```json
// 在 "properties" 下追加
"real_name": { "bsonType": "string", "description": "真实姓名" },
"department_id": { "bsonType": "string", "description": "绑定组织架构层级ID" },
"audit_status": { "bsonType": "int", "description": "认证状态 0未交 1待审 2被拒 3通过", "defaultValue": 0 }
```

**Step 2: Commit**
```bash
git add mp-admin/uniCloud-aliyun/database/uni-id-users.schema.json
git commit -m "feat: extend uni-id-users schema with custom business fields"
```

---

### Task 3: 实现客户端全局状态拦截网关 (Client loginFilter)

**Files:**
- Modify: `mp-client/uniCloud-aliyun/cloudfunctions/router/middleware/modules/loginFilter.js`

**Step 1: Write gateway interception code**
在 `loginFilter.js` 的 `main` 方法内拦截非白名单URL并且判断用户状态。
```javascript
module.exports = [
  {
    id: 'loginFilter',
    // ... regExp 配置
    main: async function (event) {
      let { url, util, filterResponse } = event;
      let { vk } = util;
      // ... 略过白名单 ...
      
      let userInfo = filterResponse.userInfo || {};
      // 如果不在白名单且 audit_status !== 3，直接抛出业务错误代码 (死锁防护)
      if(userInfo.audit_status !== 3) {
        return {
          code: -1002,
          msg: '您的账号未通过认证，无法进行系统操作！',
          audit_status: userInfo.audit_status || 0
        }
      }
      return { code: 0, msg: '' };
    }
  }
]
```

**Step 2: Run & Verify (Manually/Locally via mock event)**
通过创建临时云函数脚本测试拦截器拦截未审核用户。

**Step 3: Commit**
```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/middleware/modules/loginFilter.js
git commit -m "feat: add audit_status isolation logic in client loginFilter"
```

---

### Task 4: 开发微信原生隐私授权组件 AuthDialog

**Files:**
- Create: `mp-client/components/AuthDialog/AuthDialog.vue`

**Step 1: Implement Native WeChat Privacy components**
利用 `open-type="chooseAvatar"` 和 `type="nickname"`。
```vue
<template>
  <view v-if="showPopup" class="dialog">
    <button open-type="chooseAvatar" @chooseavatar="onChooseAvatar">获取头像</button>
    <input type="nickname" v-model="nickname" @touchstart="checkPrivacy" placeholder="请输入昵称" />
    <button @click="submit">确认授权</button>
  </view>
</template>
<script>
export default {
  data(){ return { showPopup: false, avatar: '', nickname: '' } },
  methods: {
    checkPrivacy() {
      if(uni.requirePrivacyAuthorize) { uni.requirePrivacyAuthorize({success:()=>{}}) }
    },
    onChooseAvatar(e) { this.avatar = e.detail.avatarUrl; },
    submit() { this.$emit('accept', { avatar: this.avatar, nickname: this.nickname }); this.showPopup = false; }
  }
}
</script>
```

**Step 2: Commit**
```bash
git add mp-client/components/AuthDialog/AuthDialog.vue
git commit -m "feat: create WeChat native privacy compliant AuthDialog component"
```

---

### Task 5: 客户端路由与死锁引导 (Client State Handling)

**Files:**
- Modify: `mp-client/App.vue` 或前端 api 请求拦截器 (`mp-client/common/request.js` etc.)
- Create: `mp-client/pages/user/audit-status.vue`

**Step 1: Implement network interceptor for -1002**
在前端通过 vk-unicloud 的全局异常捕获捕获 `-1002`，强制跳转。
```javascript
// 在配置拦截器时
if (res.code === -1002) {
  let auditStatus = res.audit_status;
  if(auditStatus === 2) {
    uni.reLaunch({ url: '/pages/user/audit-status?type=denied' });
  } else {
    uni.reLaunch({ url: '/pages/user/register' });
  }
}
```

**Step 2: Create lock page**
在 `audit-status.vue` 根据传递参数显示“已被拒绝，请联系各线组长线下清理申请重新录入”。

**Step 3: Commit**
```bash
git add mp-client/pages/user/audit-status.vue mp-client/common/
git commit -m "feat: client route locking and redirection for undocumented users"
```

---

### Task 6: 构建全局UI样式底座 (Global SCSS & Tailwind Config)

**Files:**
- Modify: `mp-client/common/app.scss`
- Modify: `mp-client/tailwind.config.js` (如已接入，或在全局注入原子CSS)

**Step 1: Write styling base**
在 `app.scss` 中复刻并植入 `ui-ux-pro-max` 所得规格与 HTML 页面中给出的样式：
```scss
/* 工业玻璃拟物风与色卡集 */
:root {
  --industrial-bg-start: #f7f9fb;
  --industrial-bg-end: #dae1ff;
  --primary-color: #0050cb;
}
.industrial-grid {
  background-image: radial-gradient(rgba(0, 80, 203, 0.05) 1px, transparent 1px);
  background-size: 24px 24px;
}
.glass-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.ambient-glow { box-shadow: 0 8px 32px 0 rgba(0, 80, 203, 0.08); }
.transition-industrial { transition: all 300ms cubic-bezier(0.2, 0.8, 0.2, 1); }
```

**Step 2: Require Fonts**
确保在主模板 `index.html` 或对应 `App.vue` 环境引入 `Inter`, `Manrope`, 与 `Material Symbols Outlined` 字体系统，并锁定默认 body 字体为 Inter。

**Step 3: Commit**
```bash
git add mp-client/common/app.scss
git commit -m "feat: global UI/UX foundation mapping for industrial glassmorphism design"
```

---

### Task 7: 开发后台(Admin)基础云API守护 (B-End API)

**Files:**
- Create: `mp-admin/uniCloud-aliyun/cloudfunctions/router/service/admin/baseinfo/dept/delete.js`
- Create: `mp-admin/uniCloud-aliyun/cloudfunctions/router/service/admin/baseinfo/dept/update.js`

**Step 1: Implement lifecycle guardian APIs**
在 `delete.js` 钩子中，加入强制阻断拦截。
```javascript
module.exports = {
  main: async (event) => {
    const { _id } = event.data;
    const { vk } = event.util;
    // 强制统计名下是否还有员工或下属子部门
    let userCount = await vk.baseDao.count({ dbName:"uni-id-users", whereJson:{ department_id: _id }});
    let childCount = await vk.baseDao.count({ dbName:"base-dept", whereJson:{ parent_id: _id }});
    if (userCount > 0 || childCount > 0) {
      return { code: -1, msg: "该部门下仍有人员或子部门挂载，禁止删除或操作！" };
    }
    // 允许删除...
  }
}
```

**Step 2: Commit**
```bash
git add mp-admin/uniCloud-aliyun/cloudfunctions/router/service/admin/baseinfo/dept/
git commit -m "feat: add B-end lifecycle defense blocking for baseinfo deletion"
```
