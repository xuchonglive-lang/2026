# 信息共享前台整合设计文档

**创建日期**: 2026-03-30
**主题**: 信息共享模块前台页面整合与其全局组件设计
**基于方案**: 页面级统管（单向数据流）及自研组件自治

## 1. 架构与数据流设计（页面级统管）

- `detail.vue` 承担数据的“总线”作用，进行页面初始化加载。
- 页面加载（`onLoad`）时，通过调用 `client/info-publish/getInfo` 拉取包含文章内容、点赞信息及附件的基础实体数据。
- 全局自研交互组件（如 `CommentSection.vue`）虽嵌入页面，但通过传入的 `target_type` 和 `target_id`，独立完成组件内部数据的拉取、分页与用户交互行为，与 `detail.vue` 的主拉取流解耦。

## 2. 全局组件开发规范

### 2.1 MarkdownViewer.vue
- **路径**: `xc/components/markdown-viewer/MarkdownViewer.vue`
- **引擎配置**: 基于 `markdown-it` 渲染引擎。
- **安全配置**: 严格应用 `{ html: false, linkify: true, typographer: true }` 防止 XSS 注入。
- **高亮处理**: 结合 `highlight.js` 实现代码块高亮。
- **目录导航**: 整合 `markdown-it-toc-done-right` 插件，自动提取目录。PC端通过相对定位实现左侧悬浮，H5端通过独立按钮触发弹出的目录结构，点击实现平滑滚动至对应锚点。

### 2.2 CommentSection.vue（自研留言互动版）
- **路径**: `xc/components/comment-section/CommentSection.vue`
- **数据结构约定**: 使用 `xc-info-comments` 集合，核心字段包括内容 (`content`)、关联实体 (`target_type`, `target_id`)、创建者 (`user_id`) 以及层级关系（`parent_id`, `reply_to_user_id`）和 `likes_count`。
- **互动特性**:
  - 支持提交主留言。
  - 支持点对点或针对主留言的二级嵌套回复（前端展示为清晰的树形结构/二级折叠对话）。
  - 支持单条留言的点赞/取消点赞。
- **组件自治**: 组件在挂载后自动调用内部定义的云函数（如 `getComments`）拉取分页数据，用户发表评论即触发 `addComment`。父组件仅需提供文章/实体的上下文。

### 2.3 AttachmentList.vue
- **路径**: `xc/components/attachment/AttachmentList.vue`
- **主要逻辑**: 纯展示型组件，接收 `attachments` 数组 prop，渲染列表，提供文件的安全下载入口链接提取。

## 3. 页面整合工作流

- **`xc/pages/info-publish/list.vue`（列表页）**
  - 使用 `getCategories` 接口渲染前端导航标签（PC端左侧边栏，H5端顶部滑动栏）。
  - 根据选定分类触发 `getList` 进行数据加载和分页。
  - 动态反馈已读/未读状态的视觉提示。

- **`xc/pages/info-publish/detail.vue`（详情页）**
  - 并发加载文章基础数据并在成功后调用 `markRead` 接口实现浏览记录追踪。
  - 主渲染槽口挂载 `<MarkdownViewer :content="article.content">`。
  - 文末区域顺序挂载 `<AttachmentList>` 和 `<CommentSection>`。
