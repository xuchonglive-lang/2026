# Info Publish Management Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Implement a comprehensive professional info transmission module equipped with Tinymce for rich-text publishing, u-parse for reading, robust read-receipt logs with anti-spam, and top-pinned capabilities.

**Architecture:** 
- Backend operates via vk-unicloud routing with atomic operations (`_.inc`) and transactional verification for read logs. 
- The admin leverages `custom-editor-tinymce` in `vk-data-form` for complex HTML structure inputs.
- The client-side interacts with `info`, `info-category` and logs history in `info-read-log`, displaying via `u-parse`.
- Following the Strict TDD rule outlined in the project Constitution, every cloud function will be accompanied by an invoked test script before its integration.

**Tech Stack:** Vue 2, VK-UniCloud (BaseDao), custom-editor-tinymce, uView (u-parse), z-paging (Ext 3935)

---

### Task 1: Initialize Database Collections

**Files:**
- Create: `uniCloud-aliyun/database/info-category.schema.json`
- Create: `uniCloud-aliyun/database/info.schema.json`
- Create: `uniCloud-aliyun/database/info-read-log.schema.json`

**Step 1: Write DB Schema Definition**
Design the schema strictly following the specification details:
`info` includes: `category_id`, `title`, `content`, `view_count`, `is_top`, `status`, `publish_time`
`info-read-log` includes: `info_id`, `user_id`, `read_time`

**Step 2: Sync to DB**
Upload schemas to UniCloud Web console or create the DB tables securely.

---

### Task 2: Category Management Cloud Functions (Admin)

**Files:**
- Create: `uniCloud-aliyun/cloudfunctions/router/service/admin/info/category/sys/add.js`
- Create: `uniCloud-aliyun/cloudfunctions/router/service/admin/info/category/sys/getList.js`

**Step 1: Write Cloud Function (add, getList)**
Implement basic BaseDao API functions using DB interactions for `info-category`.

---

### Task 3: Info Publish & List Cloud Functions (Admin)

**Files:**
- Create: `uniCloud-aliyun/cloudfunctions/router/service/admin/info/detail/sys/add.js`
- Create: `uniCloud-aliyun/cloudfunctions/router/service/admin/info/detail/sys/getList.js`
- Create: `uniCloud-aliyun/cloudfunctions/router/service/admin/info/detail/sys/update.js`

**Step 1: Implement Server Logic**
Ensure `is_top` handling and initialization of `view_count = 0` during `add.js`.

---

### Task 4: Anti-Spam Read Log Cloud Functions (Client)

**Files:**
- Create: `uniCloud-aliyun/cloudfunctions/router/service/client/info/pub/getListByCategory.js`
- Create: `uniCloud-aliyun/cloudfunctions/router/service/client/info/kh/getDetailAndRecord.js`

**Step 1: Write the Anti-Spam Logic `getDetailAndRecord`**
```javascript
// 1. Get info details
// 2. Count existing info-read-log for user in last 60 seconds
let limitTime = Date.now() - 60000;
let spamCount = await vk.baseDao.count({ ... });
if (spamCount === 0) {
   // Insert into info-read-log
   // updateById using _.inc({ view_count: 1 })
}
```

---

### Task 5: User Read History (Client)

**Files:**
- Create: `uniCloud-aliyun/cloudfunctions/router/service/client/info/kh/getMyReadHistory.js`

**Step 1: Write the query**
Join `info-read-log` with `info` table using `foreignDB` to attach titles and statuses. Add standard pagination logic.

---

### Task 6: B-End Admin UI (mp-admin)

**Files:**
- Create: `mp-admin/pages/info/category-list.vue`
- Create: `mp-admin/pages/info/info-list.vue`
- Modify: `mp-admin/pages.json`

**Step 1: Assemble the Tinymce UI**
In `info-list.vue`, map `form1.props.columns` to include the `custom-editor-tinymce` type for the `content` field. Map the `is_top` as a radio or switch.

---

### Task 6.5: Integrate Global z-paging Pagination (mp-client)

**Files:**
- Modify: `mp-client/pages.json` (for easycom verification if needed)
- Create: `mp-client/uni_modules/z-paging/` (Install from plugin ID 3935)
- Create: `mp-client/components/my-empty/my-empty.vue` (Custom global empty state for z-paging)

**Step 1: Install z-paging**
Fetch the plugin from DCloud plugin market or implement via uni_modules ensuring it integrates natively into the project struct. Configure default props specifying the custom empty view.

---

### Task 7: C-End Client UI (mp-client)

**Files:**
- Create: `mp-client/pages/info/index.vue`
- Create: `mp-client/pages/info/detail.vue`
- Create: `mp-client/pages/user/read-history/index.vue`
- Modify: `mp-client/pages.json`

**Step 1: Info Plaza (index.vue)**
Iterate over categories into tabs. Implement `z-paging` as the primary scroll container bounding the list. Intercept `@query` to fetch `getListByCategory`. Display top tags securely if `is_top` is true.

**Step 2: Rich Text Detail (detail.vue)**
Render `u-parse` efficiently inside a full-screen view.

**Step 3: Read History Viewer**
Develop UI using another instance of `z-paging` for history timeline retrieving data from `getMyReadHistory`.

---
