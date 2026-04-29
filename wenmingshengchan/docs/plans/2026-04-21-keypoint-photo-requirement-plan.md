# Keypoint Configurable Photo Requirement Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Implement dynamic photo count configuration (1-3) for keypoint supervision, unify frontend uploads to a single `images` array, and completely remove EXIF extraction logic to fix the 8.0.38 privacy block.

**Architecture:** 
1. Database schema updates to drop `main_image` / `sub_images` and add `images` and `required_photo_count`.
2. B-End adds `required_photo_count` to the config form and migrates `feedback-list.vue` to render the `images` array.
3. C-End strips out EXIF dependency, uses a single `uni-file-picker` (max 3), and intercepts submission locally if `images.length < required_photo_count`.

**Tech Stack:** uni-app, vk-unicloud-router, uni-file-picker

---

### Task 1: Update Database Schemas

**Files:**
- Modify: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\database\key-point-config.schema.ext.js`
- Modify: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\database\key-point-feedback.schema.ext.js`

**Step 1: Modify schemas**

In `key-point-config.schema.ext.js` (add field):
```javascript
"required_photo_count": {
  "bsonType": "int",
  "description": "要求照片数量(1-3张)",
  "defaultValue": 1
}
```

In `key-point-feedback.schema.ext.js` (delete old, add new):
Remove `main_image`, `sub_images`, `photo_shoot_time`, `device_model`.
Add:
```javascript
"images": {
  "bsonType": "array",
  "description": "现场拍摄照片列表",
  "arrayType": "string",
  "defaultValue": []
}
```

**Step 2: Commit**

```bash
git add mp-client/uniCloud-aliyun/database/*
git commit -m "refactor(db): unify feedback images schema and add required_photo_count"
```

---

### Task 2: B-End Admin Configuration Updates

**Files:**
- Modify: `d:\AI project\2026\wenmingshengchan\mp-admin\pages\feedback\point-config.vue`

**Step 1: Update Vue component**

In `form1.props.columns`, add:
```javascript
{
  key: "required_photo_count",
  title: "必拍照片数",
  type: "radio",
  data: [{ value: 1, label: "1张" }, { value: 2, label: "2张" }, { value: 3, label: "3张" }]
}
```
In `addBtn()`, update initial state:
```javascript
that.form1.data = {
  status: 1,
  require_shifts: ["day", "night"],
  dept_id: that.currentDeptId,
  required_photo_count: 1
};
```

**Step 2: Commit**

```bash
git add mp-admin/pages/feedback/point-config.vue
git commit -m "feat(admin): add required_photo_count to point configuration"
```

---

### Task 3: C-End Frontend Upload Overhaul

**Files:**
- Modify: `d:\AI project\2026\wenmingshengchan\mp-client\pages\feedback\submit\index.vue`

**Step 1: Rewrite template and JS**

1. Remove `#main-image` and `#sub-images` template sections.
2. Replace with a single `<uni-file-picker>` bound to `form.images` with `limit="3"`.
3. In `data()`, change form model to use `images: []`.
4. Drop `EXIF` import and parsing logic (`getExifData`, etc.).
5. Before `vk.callFunction`, validate:
```javascript
let reqCount = detail.required_photo_count || 1; // 需从详情拉取
if (!form.images || form.images.length < reqCount) {
  vk.toast(`该点位要求必须上传至少 ${reqCount} 张照片！`);
  return;
}
```

*(Note: We assume `detail` has `required_photo_count`, if not, we must fetch it in `getTodoList` or `getDetail`)*

**Step 2: Commit**

```bash
git add mp-client/pages/feedback/submit/index.vue
git commit -m "refactor(client): unify upload picker and remove EXIF logic"
```

---

### Task 4: C-End Cloud Function Updates

**Files:**
- Modify: `d:\AI project\2026\wenmingshengchan\mp-client\uniCloud-aliyun\cloudfunctions\router\service\client\feedback\kh\submitFeedback.js`

**Step 1: Modify API param reception**

Remove extraction of `main_image, sub_images, photo_shoot_time, device_model`.
Receive `images` array.
```javascript
let { _id, images, content } = data;
if (!_id || !images || images.length === 0) return { code: -1, msg: "目标单据或核心照片缺失" };

// ... update
dataJson: {
    status: 1,
    submit_uid: uid,
    submit_time: new Date().getTime(),
    images: images,
    content: content || ""
}
```

**Step 2: Commit**

```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/feedback/kh/submitFeedback.js
git commit -m "refactor(api): adapt submitFeedback to new images array schema"
```

---

### Task 5: B-End Admin Rendering Fixes

**Files:**
- Modify: `d:\AI project\2026\wenmingshengchan\mp-admin\pages\feedback\feedback-list.vue`

**Step 1: Fix List UI Rendering**

In the `<vk-data-table>` or dialog view where images are shown:
```javascript
// Render using computed property or directly in template
let displayImgs = item.images || [item.main_image, ...(item.sub_images || [])].filter(Boolean);
```
Ensure `feedback-list.vue` iterates over `displayImgs` rather than `main_image`.

**Step 2: Commit**

```bash
git add mp-admin/pages/feedback/feedback-list.vue
git commit -m "fix(admin): support rendering unified images array in feedback list"
```

---
