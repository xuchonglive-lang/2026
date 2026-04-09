# Info-Publish Frontend Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 完全整合前台信息发布模块，实现带 TOC 目录的 Markdown 渲染、自研树形嵌套留言互动组件及附件展示，并彻底替换前台页面的硬编码数据。

**Architecture:** `<detail.vue>` 将作为主要页面总表，统筹分发文章详文与附件；自研评论组件 `<CommentSection.vue>` 高度自治，依靠传入的 `target_id` 独立拉取数据流；所有渲染统一防跨站脚本(XSS)注入。

**Tech Stack:** `vue`, `markdown-it`, `highlight.js`, `markdown-it-toc-done-right`, `Tailwind CSS`.

---

### Task 1: 基础依赖安装与配置准备

**Files:**
- Modify: `package.json`
- Modify: `xc/pages/info-publish/detail.vue`

**Step 1: 安装必要第三方库**

Run: `npm install markdown-it markdown-it-toc-done-right highlight.js`

**Step 2: 创建全局组件的基础目录**

Run: `mkdir -p xc/components/markdown-viewer xc/components/attachment xc/components/comment-section`

---

### Task 2: 实现 AttachmentList.vue 与 MarkdownViewer.vue

**Files:**
- Create: `xc/components/attachment/AttachmentList.vue`
- Create: `xc/components/markdown-viewer/MarkdownViewer.vue`

**Step 1: 编写 AttachmentList 组件**
编写接受 `:attachments` 数组 props 的展示列表结构，循环生成下载按钮。

**Step 2: 编写 MarkdownViewer 组件基础结构**
引入 `markdown-it` 和其余插件，完成 `content` 原文转化为 html 的 `computed` 或者 `watch`。左侧 `DIV` 利用 DOM 选择器将 toc 移动到视口并监听高亮滚动 (PC 端固定展示)。

---

### Task 3: 实现自研自治的 CommentSection.vue 留言组件

**Files:**
- Create: `xc/components/comment-section/CommentSection.vue`

**Step 1: 编写组件基本输入与展示模板**
创建允许用户输入的主留言框区域，并在下方按时间生成级联回复（层级树）。

**Step 2: 打通内部云函数连通**
内部生命周期引入 `vk.callFunction`，分别编写 `fetchComments` 和 `submitComment` 交互。

---

### Task 4: 整合 detail.vue (内容详细页挂载)

**Files:**
- Modify: `xc/pages/info-publish/detail.vue`

**Step 1: 清理测试静态数据并加入 API 获取**
清空 mock 内容。在 `onLoad` 获取 `id` 参数，通过 API 拉取真实数据并写入 `article` 响应式对象，成功后拉取 `markRead`。

**Step 2: 替换并挂载公共组件**
将页面原来的硬编码内容区域全部删除，更换为引入并使用 `<MarkdownViewer>`、`<AttachmentList>` 以及 `<CommentSection>`。

---

### Task 5: 整合 list.vue (前台入口导航及列表展示)

**Files:**
- Modify: `xc/pages/info-publish/list.vue`

**Step 1: 对接动态分类**
清空 mock 内容，引入 `getCategories` 结合本地响应式对象渲染左侧 PC 端菜单。

**Step 2: 实现列表动态分页拉取**
接入 `getList` 获取实际文章分页，在 `onReachBottom` 里增加加载更多事件流。
