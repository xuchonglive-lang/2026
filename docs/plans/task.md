# 信息共享模块 Task Tracker

## Phase 0: 前置公共组件

| # | Task | Status | Notes |
|---|------|--------|-------|
| 0a | MarkdownViewer 组件 | not_started | markdown-it + toc 渲染（detail.vue 有简易实现可过渡） |
| 0b | MarkdownEditor 组件 | not_started | cherry-markdown 封装（edit.vue 已直接集成） |
| 0c | AttachmentUploader 组件 | not_started | 基于 vk-data-upload（edit.vue 已直接集成） |
| 0d | AttachmentList 组件 | not_started | 附件展示（detail.vue 已内嵌实现） |
| 0e | CommentSection 组件 | not_started | 自建留言（detail.vue 已内嵌实现） |
| 0f | CategoryNav 组件 | not_started | 分类导航（list.vue 已内嵌实现） |
| 0g | VisibilitySetter 组件 | not_started | 可见性配置（edit.vue 已内嵌实现） |

## Phase 1-5: 信息共享模块

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1 | 创建数据库集合 Schema | ✅ done | 4 个 schema.json |
| 2 | 创建分类初始数据 | ✅ done | 3 个一级 + 6 个子分类 |
| 3 | 创建 visibilityResolver 公共工具 | ✅ done | util/visibilityResolver.js |
| 4 | 创建 visibilityFilter 中间件 | ✅ done | middleware/modules/visibilityFilter.js |
| 5 | 后台分类管理云函数（4 个） | ✅ done | vk-fun 规范 |
| 6 | 后台文章管理云函数（7 个） | ✅ done | vk-fun 规范 |
| 7 | 前台信息查询云函数（4 个） | ✅ done | vk-fun 规范 |
| 8 | 前台评论云函数（2 个） | ✅ done | vk-fun 规范 |
| 9 | 后台分类管理页 | ✅ done | category.vue (Q26 左右布局) |
| 10 | 后台文章列表页 | ✅ done | list.vue (Q31筛选 + Q18批量删除) |
| 11 | 后台文章编辑页 | ✅ done | edit.vue (cherry-markdown + Q14双按钮) |
| 12 | 后台菜单注册 | ✅ done | 3 条菜单 + pages.json 路由 |
| 13 | 前台信息列表页 | ✅ done | list.vue (Q24+Q11+Q16+Q29+Q28) |
| 14 | 前台文章详情页 | ✅ done | detail.vue (Q22+Q7+Q17+Q21) |
| 15 | 前台路由注册 | ✅ done | 路由已预注册 |
