# 优化反馈模块图标加载速度

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 将 `pages/feedback` 目录下的所有页面（todo-list, submit, history）中的 Google Material Symbols 网络字体图标替换为 uView UI 本地图标，以减少外部资源请求并提高页面加载速度。

**Architecture:** 
1. 遍历 `todo-list/index.vue`, `submit/index.vue`, `history/index.vue`。
2. 识别所有带有 `.material-symbols-outlined` 类或自定义样式的 `<text>` 标签。
3. 替换为 `<u-icon>` 组件，并映射相应的图标名称。
4. 移除相关的 CSS 字体定义和样式类以精简代码。

**Tech Stack:** Uniapp, uView UI.

---

### Task 1: 替换 todo-list/index.vue 中的图标

**Files:**
- Modify: `mp-client/pages/feedback/todo-list/index.vue`

**Step 1: 替换图标标签**
- `domain` -> `home-fill` (或者类似意义的 uView 图标)
- `schedule` -> `clock-fill`
- `chevron_right` -> `arrow-right`

**Step 2: 移除 CSS 样式**
- 移除 `.material-symbols-outlined` 定义。

---

### Task 2: 替换 submit/index.vue 中的图标

**Files:**
- Modify: `mp-client/pages/feedback/submit/index.vue`

**Step 1: 替换图标标签**
- `location_on` -> `map-fill`
- `info` -> `info-circle-fill`
- `photo_camera` -> `camera-fill`
- `close` -> `close`
- `add` -> `plus`
- `edit_note` -> `edit-pen-fill`
- `send` -> `checkmark-circle-fill` (或者 `play-right-fill` 模拟 send)

**Step 2: 移除 CSS 样式**
- 移除 `.material-symbols-outlined` 定义。

---

### Task 3: 替换 history/index.vue 中的图标

**Files:**
- Modify: `mp-client/pages/feedback/history/index.vue`

**Step 1: 替换图标标签**
- `expand_more` -> `arrow-down`
- `search` -> `search`
- `domain` -> `home-fill`
- `schedule` -> `clock-fill`
- `chevron_right` -> `arrow-right`

**Step 2: 移除 CSS 样式**
- 移除 `.material-symbols-outlined` 定义。

---

### Task 4: 更新任务追踪

**Files:**
- Modify: `docs/plans/task.md`

**Step 1: 加入新任务行**
记录“反馈模块图标优化”任务。
