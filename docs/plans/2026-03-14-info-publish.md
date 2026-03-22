# 信息共享模块 Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 实现信息共享模块，包含后台文章管理（cherry-markdown 编辑、分类管理、可见性控制）和前台文章浏览（分类导航、Markdown 渲染、评论互动、阅读记录）。

**Architecture:** 后台使用 `vk-data-table` + cherry-markdown 编辑器，前台使用 `MarkdownViewer` + `CommentSection` 自建留言。数据层依赖 4 个 UniCloud 集合 + `visibilityResolver` 公共工具 + `visibilityFilter` 中间件。消息推送复用已有 `messagePush.send()`。

**Tech Stack:** UniCloud + vk-unicloud-router + cherry-markdown + markdown-it + el-cascader + vk-data-table + Tailwind CSS

**前置依赖:** 7 个公共组件需独立先行实现（应作为单独的 Plan 先执行）

**头脑风暴文档:** [2026-03-14-info-publish-brainstorm.md](file:///C:/Users/xuchong/.gemini/antigravity/brain/9bd664d6-b489-407a-aee7-6e58b801a611/2026-03-14-info-publish-brainstorm.md)

---

## Phase 0: 前置公共组件（独立 Plan）

> ⚠️ 以下 7 个组件应作为独立 Plan 先行实现。本 Plan 假设这些组件已就绪。

| 组件 | 路径 |
|------|------|
| MarkdownViewer | `xc/components/markdown-viewer/MarkdownViewer.vue` |
| MarkdownEditor | `xc-admin/components/markdown-editor/MarkdownEditor.vue` |
| AttachmentUploader | `xc/components/attachment/AttachmentUploader.vue` |
| AttachmentList | `xc/components/attachment/AttachmentList.vue` |
| CommentSection | `xc/components/comment/CommentSection.vue` |
| CategoryNav | `xc/components/category-nav/CategoryNav.vue` |
| VisibilitySetter | `xc-admin/components/visibility-setter/VisibilitySetter.vue` |

---

## Phase 1: 数据层（数据库 + 初始数据 + 公共工具 + 中间件）

### Task 1: 创建数据库集合 Schema

**Files:**
- Create: `xc/uniCloud-aliyun/database/xc-info-articles.schema.json`
- Create: `xc/uniCloud-aliyun/database/xc-info-categories.schema.json`
- Create: `xc/uniCloud-aliyun/database/xc-info-comments.schema.json`
- Create: `xc/uniCloud-aliyun/database/xc-info-views.schema.json`

**Step 1: 创建 `xc-info-articles` Schema**

```json
{
  "bsonType": "object",
  "required": ["tenant_id", "title", "content", "category_id"],
  "properties": {
    "_id": { "description": "主键" },
    "tenant_id": { "bsonType": "string", "description": "租户ID" },
    "title": { "bsonType": "string", "description": "标题" },
    "summary": { "bsonType": "string", "description": "摘要" },
    "content": { "bsonType": "string", "description": "Markdown正文" },
    "cover_image": { "bsonType": "string", "description": "封面图URL" },
    "category_id": { "bsonType": "string", "description": "子分类ID" },
    "attachments": { "bsonType": "array", "description": "附件数组" },
    "visibility": { "bsonType": "string", "enum": ["public", "private", "targeted"], "description": "可见性" },
    "target_dept_ids": { "bsonType": "array", "description": "目标部门ID" },
    "target_user_ids": { "bsonType": "array", "description": "目标用户ID" },
    "allow_comment": { "bsonType": "bool", "description": "允许评论" },
    "view_count": { "bsonType": "int", "description": "阅读数" },
    "comment_count": { "bsonType": "int", "description": "评论数" },
    "status": { "bsonType": "int", "enum": [0, 1, 2], "description": "0草稿1发布2下架" },
    "is_deleted": { "bsonType": "bool", "description": "软删除" },
    "publish_time": { "bsonType": "timestamp", "description": "发布时间" },
    "created_by": { "bsonType": "string", "description": "创建人" },
    "created_at": { "bsonType": "timestamp", "description": "创建时间" },
    "updated_by": { "bsonType": "string", "description": "更新人" },
    "updated_at": { "bsonType": "timestamp", "description": "更新时间" }
  }
}
```

**Step 2: 创建 `xc-info-categories` Schema**

```json
{
  "bsonType": "object",
  "required": ["tenant_id", "name"],
  "properties": {
    "_id": { "description": "主键" },
    "tenant_id": { "bsonType": "string" },
    "name": { "bsonType": "string", "description": "分类名" },
    "parent_id": { "bsonType": "string", "description": "父分类ID(空=一级)" },
    "sort": { "bsonType": "int", "description": "排序号" },
    "status": { "bsonType": "int", "description": "0禁用1启用" },
    "is_deleted": { "bsonType": "bool" },
    "created_by": { "bsonType": "string" },
    "created_at": { "bsonType": "timestamp" },
    "updated_by": { "bsonType": "string" },
    "updated_at": { "bsonType": "timestamp" }
  }
}
```

**Step 3: 创建 `xc-info-comments` Schema**

```json
{
  "bsonType": "object",
  "required": ["tenant_id", "article_id", "content", "created_by"],
  "properties": {
    "_id": { "description": "主键" },
    "tenant_id": { "bsonType": "string" },
    "article_id": { "bsonType": "string", "description": "关联文章ID" },
    "parent_id": { "bsonType": "string", "description": "父评论ID(空=一级)" },
    "reply_to_uid": { "bsonType": "string", "description": "回复目标用户ID" },
    "reply_to_nickname": { "bsonType": "string", "description": "@昵称" },
    "content": { "bsonType": "string", "description": "评论内容" },
    "is_deleted": { "bsonType": "bool" },
    "created_by": { "bsonType": "string" },
    "created_at": { "bsonType": "timestamp" }
  }
}
```

**Step 4: 创建 `xc-info-views` Schema**

```json
{
  "bsonType": "object",
  "required": ["tenant_id", "article_id", "user_id"],
  "properties": {
    "_id": { "description": "主键" },
    "tenant_id": { "bsonType": "string" },
    "article_id": { "bsonType": "string" },
    "user_id": { "bsonType": "string" },
    "read_time": { "bsonType": "timestamp", "description": "最近阅读时间" },
    "created_at": { "bsonType": "timestamp", "description": "首次阅读时间" }
  }
}
```

**Step 5: Commit**

```bash
git add xc/uniCloud-aliyun/database/xc-info-*.schema.json
git commit -m "feat(info-publish): add database schemas for articles, categories, comments, views"
```

---

### Task 2: 创建分类初始数据

**Files:**
- Create: `xc/uniCloud-aliyun/database/xc-info-categories.init_data.json`

**Step 1: 编写初始数据**

3 个一级分类：政策法规、技术标准、通知公告。每个一级分类下预置 2 个子分类示例。

**Step 2: Commit**

```bash
git add xc/uniCloud-aliyun/database/xc-info-categories.init_data.json
git commit -m "feat(info-publish): add initial category data"
```

---

### Task 3: 创建 visibilityResolver 公共工具

**Files:**
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/util/visibilityResolver.js`

**Step 1: 实现 resolve 函数**

输入: `{ visibility, target_dept_ids, target_user_ids, tenant_id, db }`
输出: `uid[]`

逻辑:
- `public` → 查询该租户下所有用户 uid
- `private` → 查询发布者所在部门的所有用户 uid
- `targeted` → 查询 `target_dept_ids` 对应部门的用户 + `target_user_ids` 指定用户，合并去重

参考 `@skill:vk-fun` 的数据库操作规范，查询 `uni-id-users` 表。

**Step 2: Commit**

```bash
git add xc/uniCloud-aliyun/cloudfunctions/router/service/util/visibilityResolver.js
git commit -m "feat(info-publish): add visibilityResolver utility for multi-module reuse"
```

---

### Task 4: 创建 visibilityFilter 中间件

**Files:**
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/middleware/modules/visibilityFilter.js`
- Modify: `xc/uniCloud-aliyun/cloudfunctions/router/middleware/index.js`（注册新中间件）

**Step 1: 实现中间件**

在前台 client 云函数执行前，自动注入可见性过滤条件到 `whereJson`：
- `visibility = 'public'` 的文章所有人可见
- `visibility = 'private'` 的文章仅发布者所在部门可见
- `visibility = 'targeted'` 的文章仅 `target_dept_ids` 包含用户部门的可见

**Step 2: 注册中间件到路由**

在 `middleware/index.js` 中注册，仅对 `client/info-publish/**` 路径生效。

**Step 3: Commit**

```bash
git add xc/uniCloud-aliyun/cloudfunctions/router/middleware/modules/visibilityFilter.js
git add xc/uniCloud-aliyun/cloudfunctions/router/middleware/index.js
git commit -m "feat(info-publish): add visibilityFilter middleware"
```

---

## Phase 2: 后台云函数（11 个）

### Task 5: 后台分类管理云函数（4 个）

**Files:**
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/info-publish/sys/categoryAdd.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/info-publish/sys/categoryUpdate.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/info-publish/sys/categoryDel.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/info-publish/sys/categoryGetTree.js`

**Step 1: categoryAdd** — 新增分类（一级/子分类），写入 `xc-info-categories`

**Step 2: categoryUpdate** — 修改分类名称/排序/状态

**Step 3: categoryDel** — 删除分类（Q15: 禁止删除有文章的分类，先查 `xc-info-articles` 是否有 `category_id` 引用）

**Step 4: categoryGetTree** — 查询分类树（`treeProps` 递归，参考 `@skill:vk-fun` 树形查询）

**Step 5: Commit**

```bash
git add xc/uniCloud-aliyun/cloudfunctions/router/service/admin/info-publish/
git commit -m "feat(info-publish): add admin category CRUD cloud functions"
```

---

### Task 6: 后台文章管理云函数（7 个）

**Files:**
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/info-publish/sys/getList.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/info-publish/sys/add.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/info-publish/sys/update.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/info-publish/sys/publish.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/info-publish/sys/unpublish.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/info-publish/sys/del.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/info-publish/sys/getViewRecords.js`

**Step 1: getList** — 后台文章列表（Q31: 分类+状态+关键词三维筛选，`vk-data-table` 分页格式）

**Step 2: add** — 新建文章（Q20: 摘要为空时正则清洗 content 前 100 字自动生成）

**Step 3: update** — 编辑文章（更新字段 + `updated_by` + `updated_at`）

**Step 4: publish** — 发布文章:
- 设 `status=1`, `publish_time=Date.now()`
- 调用 `visibilityResolver.resolve()` 解析接收人
- 调用 `messagePush.send({ receivers, template_key: 'info-publish', ... })`

**Step 5: unpublish** — 下架文章：设 `status=2`

**Step 6: del** — 删除文章：设 `is_deleted=true`（Q23: 不级联处理评论和阅读记录）

**Step 7: getViewRecords** — 查看文章阅读记录（`foreignDB` 连表 `uni-id-users` 获取用户昵称）

**Step 8: Commit**

```bash
git add xc/uniCloud-aliyun/cloudfunctions/router/service/admin/info-publish/
git commit -m "feat(info-publish): add admin article management cloud functions"
```

---

## Phase 3: 前台云函数（6 个）

### Task 7: 前台信息查询云函数

**Files:**
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/client/info-publish/kh/getList.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/client/info-publish/kh/getInfo.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/client/info-publish/kh/getCategories.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/client/info-publish/kh/markRead.js`

**Step 1: getCategories** — 查询分类树（前台用，`status=1` 且 `is_deleted=false`）

**Step 2: getList** — 前台文章列表:
- `visibilityFilter` 中间件自动注入可见性过滤
- 支持 `category_id` 筛选 + `title` 正则模糊搜索
- `foreignDB` 连表 `xc-info-views` 判断当前用户已读状态（Q29: 蓝色圆点）
- 上拉无限加载分页（Q28: 每页 10 条）

**Step 3: getInfo** — 文章详情（返回完整 `content`、`attachments`、`allow_comment`）

**Step 4: markRead** — 标记已读:
- 先查 `xc-info-views` 是否有该用户+文章记录（Q8: 去重）
- 无记录: 插入 + `view_count` 原子 `_.inc(1)`
- 有记录: 只更新 `read_time`

**Step 5: Commit**

```bash
git add xc/uniCloud-aliyun/cloudfunctions/router/service/client/info-publish/
git commit -m "feat(info-publish): add client article query and read tracking functions"
```

---

### Task 8: 前台评论云函数

**Files:**
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/client/info-publish/kh/addComment.js`
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/client/info-publish/kh/getComments.js`

**Step 1: addComment** — 发表评论:
- 验证文章 `allow_comment=true` 且 `status=1`
- 写入 `xc-info-comments`
- 文章 `comment_count` 原子 `_.inc(1)`
- 回复时填充 `parent_id` + `reply_to_uid` + `reply_to_nickname`

**Step 2: getComments** — 查询评论列表:
- 按 `created_at` 正序（Q17）
- 每批 20 条 + "查看更多"分页
- `foreignDB` 连表 `uni-id-users` 获取头像、昵称、部门名称
- 两层扁平：先查一级评论，再查每条一级评论的回复

**Step 3: Commit**

```bash
git add xc/uniCloud-aliyun/cloudfunctions/router/service/client/info-publish/kh/addComment.js
git add xc/uniCloud-aliyun/cloudfunctions/router/service/client/info-publish/kh/getComments.js
git commit -m "feat(info-publish): add client comment functions"
```

---

## Phase 4: 后台页面（3 个）

### Task 9: 后台分类管理页

**Files:**
- Create: `xc-admin/pages/info-publish/category.vue`

**Step 1: 实现页面**

Q26: 左右分栏布局
- 左侧：一级分类卡片列表（点击选中高亮），底部"新增一级分类"按钮
- 右侧：`vk-data-table` 展示选中一级分类下的子分类（名称、排序、状态、操作）
- CRUD 使用 `vk-data-dialog` 弹窗

**Step 2: Commit**

```bash
git add xc-admin/pages/info-publish/category.vue
git commit -m "feat(info-publish): add admin category management page"
```

---

### Task 10: 后台文章列表页

**Files:**
- Create: `xc-admin/pages/info-publish/list.vue`

**Step 1: 实现页面**

- `vk-data-table` 展示文章列表
- `vk-data-table-query`: 分类级联选择器 + 状态下拉 + 关键词搜索（Q31）
- 表格列: 标题、分类、状态（标签色）、阅读数、评论数、发布时间
- 操作列: 编辑 / 发布 / 下架 / 删除（单条操作）
- 复选框 + 底部批量删除（Q18）

**Step 2: Commit**

```bash
git add xc-admin/pages/info-publish/list.vue
git commit -m "feat(info-publish): add admin article list page"
```

---

### Task 11: 后台文章编辑页

**Files:**
- Create: `xc-admin/pages/info-publish/edit.vue`

**Step 1: 实现页面**

- `vk-data-form` 表单：标题、`el-cascader` 分类选择器（Q32）、封面图上传、摘要（可选）
- `MarkdownEditor` 组件（cherry-markdown）编辑正文，图片上传钩子调用 `uniCloud.uploadFile()`（Q9）
- `AttachmentUploader` 附件上传
- `VisibilitySetter` 可见性配置
- `allow_comment` 开关（Q21）
- 三按钮: 保存草稿 / 预览 / 发布（Q14）
- 预览弹窗: `MarkdownViewer` 渲染效果

**Step 2: Commit**

```bash
git add xc-admin/pages/info-publish/edit.vue
git commit -m "feat(info-publish): add admin article edit page with cherry-markdown"
```

---

### Task 12: 后台菜单注册

**Files:**
- Modify: `xc-admin/uniCloud-aliyun/database/opendb-admin-menus.init_data.json`

**Step 1: 添加信息共享菜单项**

菜单结构:
```
信息管理
├── 文章管理 → /pages/info-publish/list
└── 分类管理 → /pages/info-publish/category
```

**Step 2: Commit**

```bash
git add xc-admin/uniCloud-aliyun/database/opendb-admin-menus.init_data.json
git commit -m "feat(info-publish): register admin menu items"
```

---

## Phase 5: 前台页面（2 个）

### Task 13: 前台信息列表页

**Files:**
- Create: `xc/pages/info-publish/list.vue`

**Step 1: 实现页面**

- `AppLayout` 全局布局
- PC 端: `SideMenu` 左侧分类树（Q3-A）+ 右上子分类 Tab + 搜索框
- H5 端: 顶部两行横向滚动 Tab（Q24-C）+ 搜索框
- 文章卡片: 有封面图时左图右文，无图退化紧凑列表（Q16-A）
- 卡片信息: 标题、摘要、发布部门标签、时间、阅读数图标、蓝色未读圆点（Q29）
- 上拉无限加载，每页 10 条（Q28）

**Step 2: Commit**

```bash
git add xc/pages/info-publish/list.vue
git commit -m "feat(info-publish): add client article list page"
```

---

### Task 14: 前台文章详情页

**Files:**
- Create: `xc/pages/info-publish/detail.vue`

**Step 1: 实现页面**

- URL query 接收 `id` 参数（Q33）
- `onLoad` 时调用 `getInfo` + `markRead`
- 布局顺序（Q22）: 标题/元信息 → `MarkdownViewer` 正文 → `AttachmentList` 附件区 → `CommentSection` 评论区
- `CommentSection` 仅在 `allow_comment=true` 时显示（Q21）
- 评论区: 百家号风格，时间正序，每批 20 条 + "查看更多"（Q17）

**Step 2: Commit**

```bash
git add xc/pages/info-publish/detail.vue
git commit -m "feat(info-publish): add client article detail page"
```

---

### Task 15: 前台路由注册

**Files:**
- Modify: `xc/pages.json`

**Step 1: 添加路由**

```json
{
  "path": "pages/info-publish/list",
  "style": { "navigationBarTitleText": "信息共享" }
},
{
  "path": "pages/info-publish/detail",
  "style": { "navigationBarTitleText": "文章详情" }
}
```

**Step 2: Commit**

```bash
git add xc/pages.json
git commit -m "feat(info-publish): register client routes"
```

---

## Verification Plan

### 手动测试清单

> 由用户在本地开发环境中逐项验证。

#### 后台验证

| # | 测试项 | 操作 | 预期结果 |
|---|--------|------|----------|
| V1 | 分类管理 - 新增一级分类 | 后台 → 信息管理 → 分类管理 → 新增 | 左侧出现新分类卡片 |
| V2 | 分类管理 - 新增子分类 | 选中一级分类 → 右侧新增 | 右侧表格出现新子分类 |
| V3 | 分类管理 - 禁止删除有文章的分类 | 尝试删除已有文章引用的分类 | 弹出错误提示 |
| V4 | 文章管理 - 新建草稿 | 文章管理 → 新增 → 填写内容 → 保存草稿 | 列表出现 status=草稿 的文章 |
| V5 | 文章管理 - 预览 | 编辑页 → 预览按钮 | 弹窗显示 MarkdownViewer 渲染效果 |
| V6 | 文章管理 - 发布 | 编辑页 → 发布按钮 | status 变为已发布，消息推送触发（devMode 下检查 xc-messages 表） |
| V7 | 文章管理 - 筛选 | 分类/状态/关键词三维筛选 | 列表正确过滤 |
| V8 | 文章管理 - 下架 | 操作列 → 下架 | status 变为已下架，前台不可见 |
| V9 | 文章管理 - 批量删除 | 勾选多条 → 批量删除 | 勾选的文章 is_deleted=true |

#### 前台验证

| # | 测试项 | 操作 | 预期结果 |
|---|--------|------|----------|
| V10 | 分类导航 | 进入信息列表页 | PC: 左侧分类树 + 右上 Tab；H5: 两行 Tab |
| V11 | 分类筛选 | 点击不同分类 | 列表按分类过滤 |
| V12 | 标题搜索 | 搜索框输入关键词 | 列表按标题模糊过滤 |
| V13 | 已读/未读标记 | 查看已读和未读文章 | 未读文章标题左侧有蓝色圆点 |
| V14 | 详情页 - 正文渲染 | 点击文章进入详情 | Markdown 正确渲染，TOC 目录可用 |
| V15 | 详情页 - 阅读计数 | 首次进入详情 → 返回列表 | 阅读数 +1，再次进入不重复 +1 |
| V16 | 详情页 - 附件 | 文章有附件时 | 附件区显示文件列表，可下载 |
| V17 | 详情页 - 发表评论 | 输入评论 → 发表 | 评论出现在列表中 |
| V18 | 详情页 - 回复评论 | 点击回复 → 输入 → 发表 | 回复缩进显示，含 @昵称 |
| V19 | 详情页 - 删除自己评论 | 点击自己评论的删除按钮 | 评论被软删，不显示 |
| V20 | 详情页 - 评论关闭 | 编辑文章关闭评论 → 前台详情页 | 评论区不显示 |
| V21 | 可见性过滤 | 用不同部门用户登录 | 只能看到自己有权限的文章 |
| V22 | 上拉加载 | 列表多于 10 条时上拉 | 自动加载下一页 |
