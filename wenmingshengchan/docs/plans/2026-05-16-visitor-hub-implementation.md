# Visitor Hub (访客大厅) Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Create a high-polish, compliant landing page (Visitor Hub) to resolve WeChat rule 3.4 (Mandatory Login) and showcase core system value.

**Architecture:** 
- A new landing page `pages/index/visitor.vue` serves as the entry point.
- Public data is fetched via new `pub` cloud functions.
- Logged-in users are automatically redirected to the dashboard.
- Features are showcased using a Bento Grid layout with industrial aesthetics.

**Tech Stack:** UniApp, Vue 2, uView UI, vk-unicloud-router.

---

### Task 1: Public Cloud Functions (Backend)

**Files:**
- Create: `uniCloud-aliyun/cloudfunctions/router/service/client/info/pub/getListByCategory.js`
- Create: `uniCloud-aliyun/cloudfunctions/router/service/client/report/pub/getPublicList.js`
- Create: `uniCloud-aliyun/cloudfunctions/router/service/client/feedback/pub/getLatestPhotos.js`

**Step 1: Create public info list function**
```javascript
'use strict';
module.exports = {
  main: async (event) => {
    let { data = {}, util } = event;
    let { vk } = util;
    // 直接复用 kh 的逻辑但移除 userInfo 依赖
    return await vk.callFunction({
      url: 'client/info/kh/getListByCategory',
      data: data,
      internal: true
    });
  }
};
```

**Step 2: Create public report list function**
```javascript
'use strict';
module.exports = {
  main: async (event) => {
    let { data = {}, util } = event;
    let { vk } = util;
    return await vk.callFunction({
      url: 'client/report/kh/getPublicList',
      data: data,
      internal: true
    });
  }
};
```

**Step 3: Create public latest photos function**
```javascript
'use strict';
module.exports = {
  main: async (event) => {
    let { data = {}, util } = event;
    let { vk } = util;
    return await vk.callFunction({
      url: 'client/feedback/kh/getLatestPhotos',
      data: data,
      internal: true
    });
  }
};
```

**Step 4: Commit backend changes**
```bash
git add uniCloud-aliyun/cloudfunctions/router/service/client/
git commit -m "feat: add public cloud functions for visitor hub"
```

---

### Task 2: Visitor Hub Frontend Development

**Files:**
- Create: `pages/index/visitor.vue`

**Step 1: Create the visitor page template**
Implement the Hero banner, Bento Grid (highlighting Daily Plan, Reporting, Key Work), and public streams. Use @frontend-design guidelines.

**Step 2: Implement auto-redirect logic**
In `onLoad`, check if `vk.getVuex('$user.userInfo._id')` exists. If so, `uni.reLaunch({ url: '/pages/index/index' })`.

**Step 3: Implement lazy login prompts**
Wrap function cards with a method that calls `vk.pubfn.checkLogin({ isPrompt: true })` before navigating.

**Step 4: Commit frontend changes**
```bash
git add pages/index/visitor.vue
git commit -m "feat: implement visitor hub page with industrial aesthetics"
```

---

### Task 3: Routing & Global Config

**Files:**
- Modify: `pages.json`
- Modify: `app.config.js`

**Step 1: Set visitor as entry page in pages.json**
Move `pages/index/visitor` to the top of the `pages` array.

**Step 2: Update checkTokenPages in app.config.js**
Add `/pages/index/visitor` to the `list` (mode 2) to ensure it doesn't require login.

**Step 3: Commit routing changes**
```bash
git add pages.json app.config.js
git commit -m "config: set visitor hub as app entry page"
```

---

### Task 4: Verification

**Step 1: Test anonymous access**
Clear storage, open app, ensure visitor hub is displayed and public data is loaded.

**Step 2: Test auto-redirect**
Login, restart app, ensure it goes directly to `pages/index/index`.

**Step 3: Final Commit**
```bash
git commit -m "chore: final verification of visitor hub flow"
```
