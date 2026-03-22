# 项目宪法 (Project Constitution)

## 一、项目结构配置

```yaml
projectStructure:
  modules:
    frontend:
      name: "前台(xc)"
      rootPath: "./xc"
      description:
        "用户前台应用（PC + H5 自适应），基于 Vue 2 + VK UniCloud Router v2.18.15。
        所有的页面路径规则等严格按照以下文档执行：https://vkdoc.fsq.pub/client/changelog.html
        核心目录：
        - pages/            主页面（首页、登录、业务模块页面）
        - pages_plugs/      插件页面（system/ 系统管理）
        - pages_template/   模板页面（组件示例）
        - store/modules/    状态管理（$app、$user、$error）
        - components/       自定义组件 + 全局封装组件
        - windows/          窗口组件（topWindow、leftWindow）"

    admin:
      name: "后台(xc-admin)"
      rootPath: "./xc-admin"
      description: "管理后台（PC Web），基于 Vue 2 + vk-unicloud-admin v1.21.1。
        所有的页面路径规则等严格按照以下文档执行：https://vkdoc.fsq.pub/admin/1/catalogue.html
        核心目录：
        - pages/            主页面（首页、登录、业务模块页面）
        - pages_plugs/      插件页面（system/ 系统管理）
        - pages_template/   模板页面
        - windows/          导航窗口（topWindow、leftWindow）"

    unicloud:
      name: "UniCloud云函数"
      rootPath: "./xc/uniCloud-aliyun/cloudfunctions/router/service"
      description: "云函数与服务端逻辑，基于 UniCloud（阿里云）。
        前后台的云函数都要放在 './xc/uniCloud-aliyun/cloudfunctions/router/service'里面，
        这是一个前后台共用的云函数系统。
        云函数分层：
        - admin/            后台管理端云函数
        - system/         系统管理（user/role/menu/permission/app/dept）
        - training/       培训业务
        - info-publish/   信息共享
        - key-work/       重点工作
        - pro-mgmt/       专业管理
        - ai-analysis/    AI信息分析
        - message/        消息管理
        - wx-push/        微信服务号推送
        - user-center/    个人中心
        - user/             统一用户中心（已集成 uni-id）
        - kh/             登录后才能访问（dept/user-center）
        - pub/            公开访问（loginByWeixin/loginByPassword/weixinScanLogin）
        - sys/            需要角色授权才能访问
        - client/           客户端业务云函数
        - training/       培训业务
        - info-publish/   信息共享
        - key-work/       重点工作
        - pro-mgmt/       专业管理
        - message/        消息
        - plugs/            插件云函数
        - crontab/          定时任务
        中间件：
        - middleware/modules/  过滤器链（loginFilter、errorFilter、tenantFilter、permissionFilter 等）
        数据库：
        - ../../database/      schema 集合
        命名和书写规则参考：https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/catalogue.html"
```
---

## 二、已实现的基础功能

| 功能     | 后台页面                                 | 云函数路径                        | 数据库集合           |
| -------- | ---------------------------------------- | --------------------------------- | -------------------- |
| 用户管理 | `pages_plugs/system/user/list.vue`       | `admin/system/user/` + `user/kh/` | `uni-id-users`       |
| 角色管理 | `pages_plugs/system/role/list.vue`       | `admin/system/role/`              | `uni-id-roles`       |
| 权限管理 | `pages_plugs/system/permission/list.vue` | `admin/system/permission/`        | `uni-id-permissions` |
| 菜单管理 | `pages_plugs/system/menu/list.vue`       | `admin/system/menu/`              | `opendb-admin-menus` |
| 应用管理 | `pages_plugs/system/app/list.vue`        | `admin/system/app/`               | `opendb-app-list`    |

---

## 三、云函数书写规范 (Cloud Function Specs)

> **硬性要求：所有云函数开发必须 100% 遵循 `vk-fun` 技能定义的法典。**

所有云函数书写严格按照以下文件夹内的语法书写，且必须对标 `vk-fun` 技能中的 [service-template.js](file:///d:/AI%20project/2026/.agent/skills/vk-fun/service-template.js)：
`./xc/uniCloud-aliyun/cloudfunctions/router/service/template`

核心强制项：

1. **全量解构**：必须完整解构 `data`, `userInfo`, `util`, `filterResponse`, `originalParam`。
2. **工具注入**：必须使用 `util` 中的 `vk`, `db`, `_`, `pubFun` 等对象，严禁跨层调用。
3. **上下文合规**：获取客户端信息必须通过 `originalParam.context`，且严格对标全量枚举值。
4. **用户态核验**：`pub` 目录下需获取用户信息时，强制在 `data` 中传入 `need_user_info: true`。

参考文档：

- 前台：https://vkdoc.fsq.pub/client
- 后台：https://vkdoc.fsq.pub/admin

---

## 四、前端自适应布局规范

前台(xc)所有页面均实现 PC + H5 自适应布局。

### PC 端布局（≥768px）

| 区域     | 规格                                                                                                            |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| 顶部导航 | 高 65px，固定顶部。左: Logo + 应用名称 \| 中: 主导航菜单 \| 右: 搜索 + 消息铃铛(角标) + 部门名称 + 用户头像下拉 |
| 主内容区 | 上方 60px + 下方 60px 留白，内边距 24px，最大宽度 1200px                                                        |
| 底部页脚 | 高 48px，固定底部或页面底部。版权信息 + 技术支持                                                                |

### H5 端布局（<768px）

| 区域        | 规格                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------- |
| 顶部导航    | 高 44px，固定顶部。左: 汉堡菜单按钮 \| 中: 页面标题 \| 右: 消息铃铛 + 用户头像              |
| 抽屉菜单    | 宽 75vw (最大 300px)，左侧弹出，slide-in-left 300ms。用户信息卡片 + 导航菜单列表 + 退出登录 |
| 主内容区    | 内边距 12px 16px，上方留白 44px                                                             |
| 底部 TabBar | 高 50px，固定底部。标签: 首页 / 工作 / 消息 / 我的                                          |

### 全局布局组件

路径: `xc/components/layout/`

| 组件               | 说明                                         |
| ------------------ | -------------------------------------------- |
| `AppLayout.vue`    | 主布局容器，自动判断 PC/H5 切换布局模式      |
| `TopNavBar.vue`    | 顶部导航栏（PC: 完整导航 \| H5: 简化标题栏） |
| `DrawerMenu.vue`   | H5 抽屉式侧边菜单                            |
| `BottomTabBar.vue` | H5 底部 TabBar 导航                          |
| `PageFooter.vue`   | PC 页面底部页脚                              |

### 适配规则

- 使用 CSS `@media` 查询 + JS `window.matchMedia` 双重检测
- 列表页 PC 端网格布局，H5 端单列卡片布局
- 表单页 PC 端横向排列，H5 端纵向堆叠
- 详情页 PC 端左侧 TOC + 右侧内容，H5 端 TOC 折叠为顶部下拉
- 弹窗 PC 端居中弹窗，H5 端全屏 / 底部弹出

---

## 五、UI/UX 全局规范 — Minimal SaaS 极简专业风

> **设计基调**：对标 Vercel / Stripe 级极简 SaaS 美学。**所有页面开发必须遵循 `ui-ux-pro-max` 技能 + `frontend-design` 技能规范。**
>
> **核心原则**：摒弃大圆角、重度模糊与厚重阴影；以 Slate 色系为骨架，留白为节奏，微动效为呼吸。

### 色彩体系（CSS 变量 → `design-system.scss`）

| 用途       | CSS 变量                 | 值                              | 说明              |
| ---------- | ------------------------ | ------------------------------- | ----------------- |
| 主色       | `--color-primary`        | `#0F172A` (Slate 900)           | 深邃专业黑        |
| 主色悬浮   | `--color-primary-hover`  | `#1E293B`                       | —                 |
| 主色激活   | `--color-primary-active` | `#020617`                       | —                 |
| 主色浅底   | `--color-primary-light`  | `#F1F5F9`                       | tag / badge 背景  |
| 辅助色     | `--color-secondary`      | `#64748B` (Slate 500)           | 次要文本          |
| 成功色     | `--color-success`        | `#10B981`                       | —                 |
| 警告色     | `--color-warning`        | `#F59E0B`                       | —                 |
| 危险色     | `--color-danger`         | `#EF4444`                       | —                 |
| 信息色     | `--color-info`           | `#3B82F6`                       | —                 |
| 页面背景   | `--color-bg-page`        | `#F8FAFC`                       | 极浅冷灰          |
| 卡片背景   | `--color-bg-card`        | `#FFFFFF`                       | —                 |
| 毛玻璃背景 | `--color-bg-glass`       | `rgba(255,255,255,0.85)`        | 导航栏等          |
| 边框色     | `--color-border`         | `#E2E8F0`                       | —                 |
| 主文本     | `--color-text-primary`   | `#0F172A`                       | —                 |
| 次文本     | `--color-text-secondary` | `#475569`                       | —                 |
| 占位文本   | `--color-text-placeholder` | `#94A3B8`                     | —                 |
| 代码背景   | `--color-code-bg`        | `#0F172A`                       | 代码块深色背景    |
| 代码文本   | `--color-code-text`      | `#E2E8F0`                       | 代码块高亮文字    |

### 字体规范

- **正文族**: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **等宽族**: `JetBrains Mono, 'Fira Code', Consolas, monospace`
- **字号**: h1=32 / h2=24 / h3=18 / h4=14 / body=14 / helper=12 / caption=11
- **字重**: bold=600 / semibold=500 / medium=500 / regular=400
- **行高**: 标题=1.2 / 正文=1.6
- **字距**: `letter-spacing: -0.02em`（标题紧凑）

### 圆角（Crisp 风格）

| Token | 值    | 用途               |
| ----- | ----- | ------------------ |
| sm    | 4px   | 按钮、输入框       |
| base  | 6px   | 卡片               |
| lg    | 8px   | 弹窗               |
| xl    | 12px  | 大容器             |
| full  | 9999px | 头像、胶囊按钮    |

### 阴影（Subtle & Sharp）

| Token   | 值                                                                | 用途         |
| ------- | ----------------------------------------------------------------- | ------------ |
| sm      | `0 1px 2px 0 rgba(15,23,42,0.04)`                                | 微弱底纹     |
| base    | `0 4px 6px -1px rgba(15,23,42,0.06), 0 2px 4px -1px rgba(…0.04)` | 卡片默认     |
| md      | `0 10px 15px -3px rgba(…0.08), 0 4px 6px -2px rgba(…0.04)`       | 悬浮态       |
| lg      | `0 20px 25px -5px rgba(…0.1), 0 10px 10px -5px rgba(…0.04)`      | 弹窗         |
| xl      | `0 25px 50px -12px rgba(…0.15)`                                  | 全屏遮罩     |
| primary | `0 4px 12px rgba(15,23,42,0.15)`                                 | CTA 按钮聚焦 |

### 间距规范（8px 栅格）

xs=4 / sm=8 / md=16 / lg=24 / xl=32 / xxl=48 / xxxl=64

### 动效规范

| Token | 时长  | 场景                     |
| ----- | ----- | ------------------------ |
| fast  | 150ms | 按钮、输入框响应         |
| base  | 250ms | 卡片、列表过渡           |
| slow  | 400ms | 弹窗、抽屉               |

- **缓动函数**: `cubic-bezier(0.25, 0.8, 0.25, 1)`（默认）/ `cubic-bezier(0.34, 1.56, 0.64, 1)`（弹性）
- **入场动效**: `contentFadeInUp` 0.6s-0.8s 自下而上淡入（各区块依次延迟）
- **悬浮下划线**: 菜单项使用 `scaleX(0→1)` 展开动画
- **按钮悬浮**: `scale(0.97)` + `shadow-primary`

### 组件复用规则

路径: `@/components/ui-ux-pro-max/`

**基础组件**: Button / Input / Select / Checkbox / Radio / Switch
**布局组件**: Card / Layout / Grid / Flex
**交互组件**: Popup / Drawer / Modal / AccordionList / SearchFilter
**业务组件**: OrgChart / Calendar / VideoPlayer / Markdown / RichText / LoadMore

### 响应式断点

xs=0 / sm=640 / md=768 / lg=1024 / xl=1200 / xxl=1440

### 体验闭环

- 成功提示: toast top-center 3s，绿色背景
- 错误提示: toast top-center 5s，红色背景
- 警告提示: toast top-center 4s，橙色背景
- 加载状态: skeleton 骨架屏 + 按钮 loading
- 埋点前缀: `ui_ux_pro_max_`，必加事件: page_view / list_click / button_click / form_submit / feedback_submit / file_upload

---

## 5.5、全局公共组件与第三方组件约定

> **硬性要求：所有功能模块在使用 Markdown 渲染/编辑、附件上传/展示、留言互动、浏览记录、可见性控制等能力时，必须使用本节定义的全局组件，严禁各模块自行实现。**

### 前端 CSS 框架

- **核心框架**: Tailwind CSS
- **适用范围**: 前台(xc) 所有新增页面
- 与已有 Sass 样式兼容共存

### 数据库通用字段约定

> 所有业务数据集合必须包含以下通用字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `_id` | String | 主键（系统自动生成） |
| `tenant_id` | String | 租户ID（必填，关联 `xc-tenants._id`） |
| `created_by` | String | 创建人用户ID |
| `created_at` | Number | 创建时间（时间戳，`Date.now()`） |
| `updated_by` | String | 更新人用户ID |
| `updated_at` | Number | 更新时间（时间戳） |
| `status` | Number | 状态（0=禁用/草稿 1=启用/发布 2=下架/归档） |
| `is_deleted` | Boolean | 软删除标记（false=正常 true=已删除） |

### Markdown 渲染方案

**前台渲染组件**: `xc/components/markdown-viewer/MarkdownViewer.vue`

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `content` | String | — (必填) | Markdown 原文 |
| `showToc` | Boolean | `true` | 是否显示目录导航 |
| `maxTocDepth` | Number | `3` | 目录最大层级 |

- 渲染引擎: `markdown-it`（安全配置 `{ html: false, linkify: true, typographer: true }`）
- 目录导航插件: `markdown-it-toc-done-right`（生成左侧悬浮目录导航）
- 目录导航: PC端（≥768px）左侧悬浮 sticky 目录（top: 80px），H5端折叠为顶部下拉按钮（"📖 目录"）
- 代码高亮: `highlight.js`
- 目录项点击平滑滚动到对应标题位置，滚动时高亮当前可视区域对应目录项

**后台编辑器**: `cherry-markdown`（第三方组件）

- 用于培训文章课程、信息共享文章编辑等后台 Markdown 编辑场景
- 封装为 `xc-admin/components/markdown-editor/MarkdownEditor.vue`

### 附件管理方案

| 组件 | 路径 | 说明 |
|------|------|------|
| `AttachmentUploader.vue` | `xc/components/attachment/` | 基于 `vk-data-upload` 封装，附件上传组件 |
| `AttachmentList.vue` | `xc/components/attachment/` | 附件展示组件（文件名、大小、下载按钮） |

- 存储: 阿里云 OSS
- 单文件限制: 100MB
- 支持类型: `pdf/doc/docx/xls/xlsx/ppt/pptx/zip/rar/jpg/png/mp4`
- 数据库字段约定: 所有含附件的业务数据使用内嵌数组字段 `attachments: [{ name, url, size, type, upload_time }]`

### 留言互动方案

- **组件**: `CommentSection.vue`（自建留言组件，路径 `xc/components/comment/`）
- 两层扁平结构：`parent_id` 为空=一级评论，非空=回复，展平显示 + `@昵称` 标识
- 通过 `target_type` + `target_id` 关联业务数据（如 `info-publish:{article_id}`）
- UI 参考百家号评论区样式：圆形头像 + 昵称 + 正文 + 日期部门 + 回复按钮
- 适用模块: 培训、信息共享
- 备选方案: 如需反垃圾/邮件通知等高级功能，可切换至 `Artalk` 第三方组件

### 浏览记录方案

- **组件**: `history-manager-component`（第三方浏览记录组件）
- 适用模块: 培训、信息共享
- 自动记录用户浏览历史，在详情页底部展示

### 可见性控制方案

所有需要可见性控制的业务数据集合必须包含以下字段：

```js
{
  visibility: 'private',   // public(所有部门) / private(仅本部门,默认) / targeted(指定部门)
  target_dept_ids: [],      // 目标部门ID数组（visibility=targeted 时必填）
  target_user_ids: [],      // 目标用户ID数组（可选精确控制）
}
```

**后台组件**: `xc-admin/components/visibility-setter/VisibilitySetter.vue`

### 全局复用组件清单

| 组件 | 路径 | 使用模块 |
|------|------|----------|
| AppLayout | `xc/components/layout/` | 所有前台页面 |
| TopNavBar | `xc/components/layout/` | 所有前台页面 |
| DrawerMenu | `xc/components/layout/` | 所有前台页面（H5端） |
| BottomTabBar | `xc/components/layout/` | 所有前台页面（H5端） |
| PageFooter | `xc/components/layout/` | 所有前台页面（PC端） |
| SideMenu | `xc/components/layout/` | 信息共享、专业管理等含左侧导航的模块 |
| MarkdownViewer | `xc/components/markdown-viewer/` | 培训、信息共享、重点工作、专业管理 |
| MarkdownEditor | `xc-admin/components/markdown-editor/` | 培训、信息共享（后台编辑） |
| AttachmentUploader | `xc/components/attachment/` | 所有含附件的模块 |
| AttachmentList | `xc/components/attachment/` | 所有含附件的模块 |
| VisibilitySetter | `xc-admin/components/visibility-setter/` | 所有含可见性配置的后台模块 |
| UserPicker | `xc-admin/components/user-picker/` | 重点工作、专业管理、消息管理 |
| DeptSelector | `xc-admin/components/dept-selector/` | 租户管理、用户管理 |
| BadgeIcon | `xc/components/message/` | 消息管理（全局顶栏） |
| CategoryNav | `xc/components/category-nav/` | 信息共享（前台左侧分类导航） |

### 第三方组件约定

> **硬性要求：以下第三方组件已纳入项目技术栈，各模块必须使用指定组件，严禁自行引入同类替代品。**

| 组件 | 用途 | 适用模块 |
|------|------|----------|
| `cherry-markdown` | 后台 Markdown 编辑器 | 培训、信息共享 |
| `Artalk` | 留言回复系统（备选方案） | 需反垃圾/邮件通知时可替代自建 CommentSection |
| `history-manager-component` | 浏览记录组件 | 培训、信息共享 |
| `Video.js` | 视频播放器 | 培训（视频课程） |
| `custom-editor-tinymce` | 后台富文本编辑器 | 重点工作（工作标准） |
| `tiptap` | 前台富文本编辑器（支持图片粘贴上传） | 重点工作（前台反馈提交） |
| `FullCalendar` | 日历组件（月/周/日视图） | 专业管理（例行工作） |
| `ECharts` | 后台统计图表 | 个人中心（后台） |
| `uCharts` | 前台统计图表 | 个人中心（前台） |
| `PDF.js` | PDF 文档预览 | AI信息分析 |
| `el-tree` | 树形组件 | 租户管理、部门选择 |
| `el-cascader` | 级联选择器 | 租户管理、重点工作 |
| `vk-data-table` | 后台数据表格 | 所有后台列表页 |
| `vk-data-form` | 后台数据表单 | 所有后台编辑页 |

## 六、提案配置

- 按「功能模块」拆分提案
- 业务提案命名: `{模块名称}-提案.md`
- 公共提案命名: `公共核心-{模块名称}-提案.md`
- 必须维度: 前台(xc) / 后台(xc-admin) / UniCloud云函数
- 所有提案自动注入 UI/UX 规则（注入位置: 功能描述后、操作要求前）

### 功能模块清单

#### 公共模块

| ID         | 名称         | 优先级 | 说明                                                        | 依赖              |
| ---------- | ------------ | ------ | ----------------------------------------------------------- | ----------------- |
| tenant     | 租户管理系统 | P1     | 按部门为租户的多租户管理，数据隔离与可见性控制              | —                 |
| user-mgmt  | 用户管理     | P1     | 微信服务号绑定、多端登录、用户信息管理                      | tenant            |
| permission | 用户权限管理 | P1     | RBAC 角色绑定、菜单权限、功能操作权限、前台 v-has-perm 指令 | tenant, user-mgmt |
| message    | 消息管理系统 | P2     | 微信服务号模板消息推送、服务号菜单管理、消息记录与历史查询  | tenant, user-mgmt |

#### 业务模块

| ID           | 名称             | 优先级 | 说明                                                               | 依赖                        |
| ------------ | ---------------- | ------ | ------------------------------------------------------------------ | --------------------------- |
| training     | 培训业务模块     | P3     | 视频/文章课件发布、章节管理、附件、Artalk留言、浏览记录            | tenant, permission, message |
| info-publish | 信息共享模块     | P3     | 信息分类发布、文章展示、附件、Artalk留言、浏览记录                 | tenant, permission, message |
| key-work     | 重点工作推进模块 | P4     | 重点任务（互动验收型）与重点关注（持续反馈型），tiptap反馈编辑     | tenant, permission, message |
| pro-mgmt     | 专业管理模块     | P4     | 制度文档、管理网络OrgChart、FullCalendar例行工作日历、个人文档管理 | tenant, permission          |
| ai-analysis  | AI信息分析模块   | P5     | AI分析项目配置、文档上传、AI接口调用、PDF报告生成（仅后台）        | tenant, permission          |
| user-center  | 个人中心模块     | P3     | 个人信息维护、消息中心、任务/工作/培训/信息聚合                    | tenant, user-mgmt, message  |

---

## 七、数据库与 JS API 全量规范 (DB & JS API Specs)

> **硬性要求：数据库操作与前端 JS API 调用必须严格对标 `vk-fun` 技能规格，违规代码 PR 必拒。**

### 1. 数据库操作 (DB Norm)

必须参考 `vk-fun` 技能中的 [database-examples.js](file:///d:/AI%20project/2026/.agent/skills/vk-fun/database-examples.js)：

- **万能连表**：强制使用 `foreignDB` 数组，主表结果整形必须组合 `getMain: true` 与 `getOne: true`。
- **树形查询**：级联数据强制使用 `treeProps` 递归规格。
- **原子操作**：计费、计数、状态变更强制使用 `_.inc` 或 `updateAndReturn` 保证原子性。
- **索引匹配**：数组字段查寻必须符合官方索引格式（如 `'arr.0'`）。
- **Dao 2.0 规范**：Dao 类必须继承 `BaseDao`，业务逻辑内通过 `this.dao` 调用并透传 `db` 事务对象。

### 2. JS API 调用 (JS API Norm)

必须参考 `vk-fun` 技能中的 [js-api-examples.js](file:///d:/AI%20project/2026/.agent/skills/vk-fun/js-api-examples.js)：

- **工具优先**：时间格式化、对象克隆、数组转树等操作强制优先使用 `vk.pubfn`。
- **路由鉴权**：页面跳转强制使用 `vk.navigateTo` 及其内置的登录状态检测逻辑。

---

## 治理规则

- 本宪法高于所有其他实践规范
- 修订须有文档记录、审批流程和迁移计划
- 所有 PR / 评审须验证合规性
- 复杂性必须有充分理由
- 每次生成代码前必须先跑 TDD

**版本**: 1.1.0 | **批准日期**: 2026-03-13 | **最后修订**: 2026-03-14
