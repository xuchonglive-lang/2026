# Keypoint Photo Titles Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Implement a configurable, title-designated photo upload requirement for the keypoint supervision module.

**Architecture:** We will replace the static integer `required_photo_count` with a string array `photo_requirements` in the B-side `key-point-config`. The C-side `key-point-feedback` table will store an array of snapshot objects `[{title, url}]` instead of just an array of strings. The C-side upload interface will dynamically render dedicated upload slots based on the required titles.

**Tech Stack:** Vue 2 (uni-app), uniCloud, vk-unicloud.

---

### Task 1: Update B-side Admin Form Component

**Files:**
- Modify: `d:\AI project\2026\wenmingshengchan\mp-admin\pages\feedback\point-config.vue`

**Step 1: Modify form columns definition**
Update the form schema in `data().form1.props.columns` to remove the old radio button for `required_photo_count` (if any) and add a new dynamic list/tags input for `photo_requirements`. Since `vk-data-form` may not have a native dynamic array input, we can use a custom slot or a comma-separated string input that parses into an array, or a `checkbox`/`tag` group if the titles are from a predefined set. *Assumption: The simplest robust UI without a custom component is a text input with a tip to separate by commas, or we can use a custom scoped slot for dynamic add/remove.*
For robustness and simplicity, we can use `type: "textarea"` or `type: "tag"` if supported by vk. Let's assume we modify the `columns` configuration to include a `photo_requirements` array field.

### Task 2: Update B-side Admin Cloud Functions

**Files:**
- Modify: `d:\AI project\2026\wenmingshengchan\uniCloud-aliyun\cloudfunctions\addConfig\index.js` (or the equivalent router function handling `addConfig` for keypoint)
- Modify: `d:\AI project\2026\wenmingshengchan\uniCloud-aliyun\cloudfunctions\updateConfig\index.js` (or equivalent)

**Step 1: Update backend parameter acceptance**
Ensure the backend accepts `photo_requirements` (Array) and removes any references to `required_photo_count`.

### Task 3: Update B-side Admin List Rendering

**Files:**
- Modify: `d:\AI project\2026\wenmingshengchan\mp-admin\pages\feedback\feedback-list.vue`

**Step 1: Update the detail dialog image rendering**
In the detail view where `item.images` is rendered, change the `v-for` to iterate over an array of objects.
```vue
<!-- Modify the template to render title above/below the image -->
<view v-for="(imgItem, index) in item.images" :key="index" class="image-box">
  <text class="image-title">{{ typeof imgItem === 'object' ? imgItem.title : '现场照片' }}</text>
  <image :src="typeof imgItem === 'object' ? imgItem.url : imgItem" mode="aspectFill"></image>
</view>
```

### Task 4: Update C-side Client Upload Component

**Files:**
- Modify: `d:\AI project\2026\wenmingshengchan\mp-client\pages\feedback\submit\index.vue`

**Step 1: Fetch and render dynamic upload slots**
In the `data` function, ensure we store `photo_requirements` loaded from the point configuration.
In the `<template>`, replace the single `uni-file-picker` with a `v-for`:
```vue
<view class="photo-requirement-item" v-for="(title, index) in photo_requirements" :key="index">
  <view class="requirement-title"><text style="color:red">*</text>{{ title }}</view>
  <uni-file-picker :limit="1" v-model="uploadImages[index]"></uni-file-picker>
</view>
```
*(Note: v-model bindings need to be mapped properly in the component state)*

**Step 2: Update submission logic**
Modify the submit handler to validate that each slot has an image, and construct the payload as `images: [{title: '...', url: '...'}]`.

### Task 5: Update C-side Client Cloud Function

**Files:**
- Modify: `d:\AI project\2026\wenmingshengchan\uniCloud-aliyun\cloudfunctions\submitFeedback\index.js` (or equivalent router action)

**Step 1: Update database schema acceptance**
Ensure the backend accepts `images` as an array of objects and stores it directly. Remove legacy `EXIF` extractions and field assignments if they haven't been removed yet.
