# Google Stitch 提示词集 — 专业办公管理平台前端落地页

> **项目名称**: 生产专业管理平台  
> **设计体系**: shadcn/ui  
> **参考风格**: https://shadcn-landing-page.vercel.app  
> **设备类型**: DESKTOP（响应式适配移动端）

---

## 🎨 全局设计系统声明（所有页面共用前缀）

以下是所有 Stitch 提示词的**通用前缀**，请在每个页面提示词前注入：

```
Global Design System:
- Design framework: shadcn/ui (React-based component library aesthetic)
- Color palette: Slate-based minimal SaaS theme
  - Primary: #0F172A (Slate 900), Hover: #1E293B, Active: #020617
  - Primary Light Background: #F1F5F9
  - Secondary text: #64748B (Slate 500)
  - Page background: #F8FAFC, Card background: #FFFFFF
  - Border: #E2E8F0
  - Success: #10B981, Warning: #F59E0B, Danger: #EF4444, Info: #3B82F6
- Typography: Inter font family, -apple-system fallback
  - h1: 32px/600, h2: 24px/600, h3: 18px/500, body: 14px/400, helper: 12px
  - Title letter-spacing: -0.02em, body line-height: 1.6
  - Monospace: JetBrains Mono for code blocks
- Corner radius: 4px (buttons/inputs), 6px (cards), 8px (modals), 12px (large containers)
- Shadows: subtle and sharp, max opacity 0.06 for cards
- Spacing grid: 8px base (4/8/16/24/32/48/64)
- Animations: 150ms fast, 250ms base, 400ms slow, cubic-bezier(0.25, 0.8, 0.25, 1)

Layout Framework (strictly NO sidebar, single-column centered):
- Header: full-width 100vw, height 64px (desktop) / 56px (mobile), inner container max-width 1350px centered
  - Left: Logo "生产专业管理平台" (200px width, bold text with icon)
  - Center: 6 nav links (平台首页/工作推进/专业管理/专业信息/培训管理/个人中心), each 80px wide, 24px gap between
  - Right: CTA button "登录/进入平台" 120px wide
  - Mobile: hamburger menu, drawer slides from left
  - Background: rgba(255,255,255,0.85) glassmorphism with backdrop-blur(12px), border-bottom: 1px solid #E2E8F0
- Main content: NOT full-width
  - Desktop (≥1024px): max-width 1350px, margin: 0 auto
  - Tablet (768px-1023px): max-width 960px
  - Mobile (<768px): width 100%, padding: 0 16px
- Footer: full-width 100vw, auto height (~180px), inner container max-width 1350px centered
  - Upper section: 4-column link groups (平台导航/功能模块/技术支持/关于我们), gap 24px
  - Lower section: copyright "冀ICP备2024077622号-1 | 冀公网安备130283020002355号 | © 2024 xuchong"
  - Upper-lower gap: 24px, top border: 1px solid #E2E8F0
```

---

## 📄 页面提示词

---

### 1. 平台首页 — `pages/index/index.vue`

```
Design a professional enterprise management platform landing page (desktop, 1440px wide viewport).

[Inject Global Design System]

Page structure (vertical, single column, no sidebar):

=== HERO SECTION ===
- Top badge: pill-shaped tag "v2.0 Professional Platform" with #F1F5F9 background, #0F172A text, uppercase, 12px
- Main headline: "The Infrastructure for Modern Enterprises." font-size 56px, weight 700, line-height 1.1, letter-spacing -0.04em, #0F172A color, centered
- Subheadline: "Build, scale, and secure your workflows with our next-generation office platform. Engineered for speed and precision." 18px, #475569 color, max-width 560px, centered
- Two CTA buttons centered:
  - Primary: "Start Building" — #0F172A background, white text, 12px 24px padding, 6px radius, shadow 0 4px 14px rgba(15,23,42,0.2)
  - Secondary: "Read Documentation" — white background, #0F172A text, 1px #E2E8F0 border
- Fade-in-up animation on load

=== DASHBOARD PREVIEW GRID ===
- 2-column CSS grid, 24px gap
- Card 1 (spans 2 columns): "Integration Code Preview" — dark code block (#0F172A background) with syntax-highlighted TypeScript code, macOS-style traffic light dots (red/yellow/green), filename "api/connect.ts"
- Card 2: "Pricing Tiers" — two tier rows (Business $49/mo selected with primary border, Enterprise Custom), clean list layout
- Card 3: "Security" — three certification rows with emoji icons (🔒 SOC 2, 🛡️ ISO 27001, 🔐 GDPR), each with name and description

All cards: white background, 1px #E2E8F0 border, 8px radius, subtle shadow, hover shadow elevation

=== FEATURES SECTION (suggested addition) ===
- Section title "核心功能模块" centered, 24px bold
- 4 feature cards in a row: 工作推进 (task icon), 专业管理 (settings icon), 信息共享 (document icon), 培训管理 (video icon)
- Each card: icon + title + short description, hover lift animation

Mobile responsive: hero title shrinks to 40px, grid becomes single column
```

---

### 2. 登录页 — `pages/login/index.vue`

```
Design a clean enterprise login page (desktop 1440px viewport).

[Inject Global Design System]

Page structure (full-height centered, NO header/footer):

=== SPLIT LAYOUT ===
- Left panel (55% width): #0F172A dark background
  - Centered content: Platform logo + "生产专业管理平台" in white, large (32px)
  - Tagline: "专业化办公管理，智能化工作推进" in #94A3B8, 16px
  - Decorative: subtle geometric grid pattern or abstract mesh gradient overlay (very subtle, 5% opacity)

- Right panel (45% width): #FFFFFF background, vertically and horizontally centered
  - Card container: max-width 400px
  - Title: "欢迎登录" 24px bold #0F172A
  - Subtitle: "请选择登录方式" 14px #475569
  - Tab selector: "微信扫码登录" / "账号密码登录" (underline animated tab)
  
  === WeChat QR Tab ===
  - QR code placeholder: 200x200px bordered box, centered
  - Helper text: "请使用微信扫描二维码登录" 12px #94A3B8

  === Password Tab ===
  - Input: "用户名/手机号" — full-width, 40px height, 4px radius, #E2E8F0 border, focus: #0F172A border
  - Input: "密码" — full-width, same style, with eye toggle icon
  - "记住我" checkbox + "忘记密码?" link on same row
  - Login button: full-width "登 录", #0F172A background, white text, 40px height, 4px radius
  
  - Footer: "© 2024 xuchong | 冀ICP备2024077622号-1" 11px #94A3B8

Mobile: stacked vertically, left panel becomes top banner 200px, right panel full width
```

---

### 3. 工作推进 — 首页列表 `pages/key-work/list.vue`

```
Design a task management list page for an enterprise platform (desktop 1440px viewport).

[Inject Global Design System]

=== HEADER (64px, as defined in global) ===
Current active nav: "工作推进" highlighted with underline indicator and bold text

=== MAIN CONTENT (max-width 1350px, centered) ===

--- Top Bar ---
- Page title: "工作查询" with search icon, 24px bold, left-aligned
- Right: total count badge "共 10 项任务"

--- Search Filter Bar ---
- Horizontal row: 
  - "工作名称" label + text input (placeholder "请输入工作名称", 200px)
  - "工作集" label + dropdown select (placeholder "选择工作集", 160px)
  - "工作分类" label + dropdown select (placeholder "选择工作分类", 160px)
  - "搜索" button (#3B82F6 blue background, white text, icon)
  - "重置" text button

--- Tab Bar ---
- Horizontal tabs with count badges: 领导交办(0) | 重点工作(0) | 文明生产及三不次(10) | 四防工作(0) | 安全管理(0)
- Active tab: underline style, #3B82F6 color
- Tab content area below

--- Accordion Task List ---
- Expand/collapse header: "第三周文明生产大治理周计划" with count badge (10), progress "0% 完成"
- Task items: vertical list, each row contains:
  - Left: status dot (colored circle — red for 紧急, blue for 进行中, green for 已完成)
  - Task title (bold if urgent)
  - Status badge: pill tag (紧急=red, 进行中=blue, 已完成=green)
  - Assignee avatar (circular, 24px) + assignee name
  - "超级管理员" label in #64748B
  - Date: "2025-12-15" in #94A3B8
  - Right side: action buttons (编辑/查看) with subtle icons
- Divider: 1px #E2E8F0 between items
- Hover: light #F8FAFC background

=== FOOTER (as defined in global) ===

Mobile: tabs become horizontally scrollable, single column layout, filter inputs stack vertically
```

---

### 4. 重点任务详情 — `pages/key-work/task-detail.vue`

```
Design a task detail page with three-section layout for an enterprise platform (desktop 1440px viewport).

[Inject Global Design System]

=== HEADER (as global, "工作推进" active) ===

=== MAIN CONTENT (max-width 1350px, centered, vertical layout) ===

--- Section 1: Task Header ---
- Large title: "消防演练专项计划" 32px bold #0F172A
- Metadata row: 
  - Work type badge: "重点任务" pill tag, #3B82F6 background, white text
  - Publisher info: circular avatar (32px) + "超级管理员" name
  - Date icon + "2025-12-15"
  - Eye icon + "30 阅读"
- Divider: 1px #E2E8F0

--- Section 2: Task Content ---
- Markdown rendered content area (clean typography, Inter font, proper heading hierarchy)
- Content fills available width within container
- Below content: Attachment section
  - "附件下载" subtitle, list of files with file-type icons + filename + size + download button
- Special "工作标准" card:
  - Card with left 3px blue (#3B82F6) border, #F8FAFC background
  - Title "工作标准" in bold
  - Markdown content rendered inside

--- Section 3: Feedback Timeline ---
- Title: "工作反馈" with count badge
- Vertical timeline layout, each feedback item:
  - Left: circular avatar (40px) + vertical timeline line
  - Right: 
    - Name + time + feedback type badge (过程反馈=blue pill, 验收申请=orange pill)
    - Rich text content rendered
    - If acceptance: reviewer evaluation card (pass=green, reject=red)
- Bottom: "提交反馈" button, full-width, #0F172A background, white text, 44px height

=== FOOTER ===

Mobile: sections stack vertically, avatars shrink, timeline simplified
```

---

### 5. 重点关注列表 — `pages/key-work/focus-list.vue`

```
Design a focus items list page for an enterprise platform (desktop 1440px viewport).

[Inject Global Design System]

=== HEADER (as global, "工作推进" active) ===

=== MAIN CONTENT (1350px centered) ===

--- Tab Bar ---
- Two tabs: "重点任务" | "重点关注" (currently active, underlined)

--- Focus Items List ---
- Similar to task list but with simplified status (进行中/已完成 only, no acceptance flow)
- Each item card:
  - Title + status badge (进行中=blue, 已完成=green)
  - Assignee avatar group (max 3 + "+N" overflow count)
  - Deadline date, red if overdue or within 3 days
  - Click navigates to focus-detail page
- Accordion grouping by work category (same three-level: type → collection → item)

=== FOOTER ===
```

---

### 6. 重点关注详情 — `pages/key-work/focus-detail.vue`

```
Design a focus item detail page (desktop 1440px viewport). Similar to task-detail but WITHOUT acceptance workflow.

[Inject Global Design System]

=== HEADER (as global, "工作推进" active) ===

=== MAIN CONTENT (1350px centered, three-section layout) ===

Same three-section layout as task-detail with these differences:
- Section 1: Badge shows "重点关注" instead of "重点任务" (orange/amber background)
- Section 3: Feedback type fixed to "过程反馈" only (no acceptance option)
- Publisher has "完成确认" button (only visible to publisher)
- If status is "已完成": green banner at top "该工作已完成", feedback input replaced with gray read-only card "该工作已完成，不可再提交反馈"

=== FOOTER ===
```

---

### 7. 信息共享首页 — `pages/info-publish/list.vue`

```
Design an information sharing / news portal page for an enterprise platform (desktop 1440px viewport).

[Inject Global Design System]

=== HEADER (as global, "专业信息" active) ===

=== MAIN CONTENT (1350px centered, three-column layout within single container) ===

--- Search Bar (full container width) ---
- Search input with icon, placeholder "搜索您感兴趣的资讯...", full container width, 44px height, 4px radius, right side #3B82F6 "搜索" button

--- Three-Column Layout ---
Left sidebar (180px width):
  - "信息分类" title header, #3B82F6 accent background
  - Category list: "全部信息" (active, #3B82F6 text + left 3px border), "工作动态", "重点工作"
  - Each item has icon + label, 44px height, hover #F1F5F9 background

Center content (flexible width):
  - Tab bar: "全部信息" | "热门浏览" (active tab underlined)
  - Article list (vertical):
    Each article card:
    - Title: 18px bold #0F172A, clickable (hover underline)
    - Summary: 14px #475569, max 2 lines, ellipsis
    - Metadata row: author avatar (24px) + "超级管理员" + calendar icon + "2025-12-21" + eye icon + "30"
    - Divider between cards
  - Load more / pagination at bottom

Right sidebar (260px width):
  - "重要交办" card:
    - Title header with orange/red indicator
    - List of urgent items: title link + date, max 4 items
  - "领导交办" card:
    - Similar layout with deadline dates
    - Each item: title + "截止: 2025-12-28" in #64748B

=== FOOTER ===

Mobile: left sidebar collapses to dropdown selector, right sidebar moves below content, single column
```

---

### 8. 信息详情页 — `pages/info-publish/detail.vue`

```
Design an article detail page with left TOC navigation for an enterprise platform (desktop 1440px viewport).

[Inject Global Design System]

=== HEADER (as global, "专业信息" active) ===

=== MAIN CONTENT (1350px centered, two-column layout) ===

Left sidebar (200px, sticky, top: 80px):
  - Author card:
    - Circular avatar (64px) centered
    - "超级管理员" name, bold
    - "发布人" label in #94A3B8
  - "文章目录" heading, icon ≡ 
  - TOC navigation list:
    - Nested structure matching markdown headings (h2/h3)
    - Active item: #3B82F6 text + left 2px blue border
    - Hover: #F1F5F9 background
    - Click: smooth scroll to corresponding heading
    - Scroll spy: auto-highlight current visible section

Right content area (flexible width):
  - Article title: 28px bold #0F172A
  - Metadata row: category badge "重点工作" (pill, #3B82F6), author "超级管理员", date "2025-12-21", eye icon "30 阅读", comment icon "1 评论"
  - Divider
  - Markdown rendered content:
    - Clean Inter typography
    - Code blocks: #0F172A background, #E2E8F0 text, JetBrains Mono font
    - Headings properly sized (h2: 24px, h3: 18px)
    - Links: #3B82F6 with underline on hover
    - Blockquotes: left 3px #E2E8F0 border, #F8FAFC background
  - Attachment section (if present): file list with download icons
  - Comment section:
    - "评论" heading with count
    - Comment list: avatar + name + time + content, reply button
    - Comment input box at bottom

=== FOOTER ===

Mobile: TOC collapses to "📖 目录" dropdown button at top, single column content
```

---

### 9. 培训首页 — `pages/training/list.vue`

```
Design a training course catalog page for an enterprise platform (desktop 1440px viewport).

[Inject Global Design System]

=== HEADER (as global, "培训管理" active) ===

=== MAIN CONTENT (1350px centered) ===

--- Search Bar ---
- Full-width search input, placeholder "搜索课程...", 44px height, search icon, #F8FAFC background

--- Category Tabs ---
- Left sidebar (180px): "培训分类" title
  - Category tree: "调度..." (active, expanded with arrow), "四防管理", "铲运..." (with sub-items)
  - Active item: #3B82F6 text + icon highlight

--- Content Area ---

- "视频课程" section:
  - Section title with 🎬 icon
  - Sub-category tabs: "调度室指挥" (active, #3B82F6 underline) | "计划管理" | "组织管理"
  - Course card grid (3 columns, 24px gap):
    Each card:
    - Thumbnail: 16:9 aspect ratio placeholder, rounded top 6px
    - Duration badge: bottom-right overlay "11学时" with semi-transparent dark background
    - Title: 16px bold, max 2 lines
    - Metadata: eye icon + view count + date
    - Author: "管理员" in #64748B
  - Card hover: shadow elevation + subtle translateY(-2px)

- "图文培训" section:
  - Section title with 📝 icon
  - Same sub-category tabs
  - Article card list (full width, not grid):
    Each card:
    - Title: 16px bold
    - Summary: 14px #475569, 2 lines max
    - Author + view count + date

=== FOOTER ===

Mobile: grid becomes single column, left sidebar collapses to dropdown
```

---

### 10. 视频课程详情 — `pages/training/video-detail.vue`

```
Design a video course detail page for an enterprise platform (desktop 1440px viewport).

[Inject Global Design System]

=== HEADER (as global, "培训管理" active) ===

=== MAIN CONTENT (1350px centered) ===

--- Video Player Area ---
- Split layout:
  - Left: Chapter list sidebar (280px width)
    - "章节目录" heading
    - Numbered chapter list: each item "01 | 章节标题 | 05:30"
    - Active chapter: #3B82F6 text + left 3px border
    - Hover: #F1F5F9 background
  - Right: Video player (flexible width, 16:9 aspect ratio)
    - Black background, centered play button
    - Progress bar at bottom

--- Course Info Bar ---
- Course title: 24px bold
- Metadata: department badge + publisher + date + eye "30 观看" + clock "2h30m 总时长"
- Divider

--- Tab Section ---
- Tabs: "课程简介" | "章节目录" | "附件下载" | "留言互动"
- Active tab: #3B82F6 underline

- 课程简介: Markdown rendered content
- 章节目录: Full chapter list with checkmarks for completed ones
- 附件下载: File list (icon + name + size + download button)
- 留言互动: Comment section (avatar + name + content + time + reply button)
  - Comment input at bottom

=== FOOTER ===

Mobile: video full-width, chapter list moves to tab, no sidebar
```

---

### 11. 文章课程详情 — `pages/training/article-detail.vue`

```
Design an article course detail page with left TOC navigation (desktop 1440px viewport).

[Inject Global Design System]

Same layout structure as info-publish detail page (page 8) with these differences:
- Metadata shows course type badge "文章课程" (green pill)
- Below content: reading progress indicator bar
- Bottom tabs: "附件下载" and "留言互动" sections
- Scroll-to-bottom detection triggers "已阅读" API call
- Progress: if not fully read, shows "继续阅读" floating button at bottom-right

Mobile: TOC folds into "📖 目录" dropdown at top
```

---

### 12. 专业管理首页 — `pages/pro-mgmt/index.vue`

```
Design a professional management hub page with four sub-module tabs (desktop 1440px viewport).

[Inject Global Design System]

=== HEADER (as global, "专业管理" active) ===

=== MAIN CONTENT (1350px centered) ===

--- Top Tab Bar ---
- 4 tabs with icons, horizontally centered:
  - 📋 制度规范 | 🏢 管理网络 | 📅 例行工作 | 📁 我的文档
- Active tab: #3B82F6 text + underline, slide animation 200ms
- Tab indicator slides smoothly when switching

--- Default Content (制度规范) ---
- Document list, cards layout:
  Each card:
  - Document title: 16px bold
  - Department tag: pill badge
  - Last updated date
  - Click → navigate to regulations detail page
- Cards grouped by professional category
- Filter dropdown at top-right: "选择专业类别"

=== FOOTER ===

Mobile: tabs horizontally scrollable, content single column
```

---

### 13. 制度规范页 — `pages/pro-mgmt/regulations.vue`

```
Design a regulations document detail page (desktop 1440px viewport).

[Inject Global Design System]

Same structure as article detail (page 8): left sticky TOC + right Markdown content.
- Title badge: "制度规范" in amber/yellow pill
- "发布部门" metadata
- No comment section, only content + attachments
```

---

### 14. 管理网络 — `pages/pro-mgmt/network.vue`

```
Design an organizational chart page showing professional role hierarchy (desktop 1440px viewport).

[Inject Global Design System]

=== HEADER (as global, "专业管理" active) ===

=== MAIN CONTENT (1350px centered) ===

--- OrgChart Component ---
- Top: current user's role card (centered, highlighted)
  - Card: white background, 1px #3B82F6 border, 8px radius, padding 16px
  - Content: avatar (48px) + name "张三" (16px bold) + department "总部" + role "安全管理" badge
- Connecting lines: straight #E2E8F0 lines, 2px width
- Below: row of subordinate user cards (3-4 cards)
  - Same card style but 1px #E2E8F0 border (not blue)
  - Each card clickable → navigate to that user's professional management page
  - Hover: shadow elevation

--- Role Info ---
- Below chart: "职能说明" expandable section with role description

=== FOOTER ===

Mobile: cards stack vertically, connecting lines become vertical
```

---

### 15. 例行工作日历 — `pages/pro-mgmt/calendar.vue`

```
Design a calendar-based task management page (desktop 1440px viewport).

[Inject Global Design System]

=== HEADER (as global, "专业管理" active) ===

=== MAIN CONTENT (1350px centered) ===

--- Calendar Header ---
- Left: "< 2025年12月 >" month navigation arrows
- Right: View toggle buttons "月 | 周 | 日"
- Color legend: 🔵 自己添加 🟠 领导分配 🔴 上级专业分配

--- FullCalendar Month View ---
- 7-column grid (周一 to 周日)
- Each day cell:
  - Date number top-left
  - Colored task bars:
    - Blue (#165DFF): self-created tasks
    - Orange (#FF7D00): leader-assigned tasks
    - Red (#F53F3F): superior professional-assigned tasks
  - Task bar: title text, rounded 4px
  - Click → popup detail modal
- Today: highlighted background #F1F5F9

--- Task Detail Modal (on click) ---
- Overlay modal centered:
  - Title, content, source tag (colored), status, deadline
  - Action buttons: "完成反馈" / "标记完成"

--- "+" Button (bottom-right floating) ---
- Circular button, 56px, #0F172A background, white "+" icon
- Click → new task form modal

=== FOOTER ===

Mobile: week view default, horizontal scroll for month view
```

---

### 16. 我的文档 — `pages/pro-mgmt/my-docs.vue`

```
Design a personal document management page with folder tree + file list (desktop 1440px viewport).

[Inject Global Design System]

=== HEADER (as global, "专业管理" active) ===

=== MAIN CONTENT (1350px centered, two-column layout) ===

Left panel (240px):
  - "文件夹" heading
  - Tree view: "我的文档" root node expanded
    - Sub-folders with folder icons, expandable
    - "共享给我的" folder at bottom (with share icon)
  - Bottom: "+ 新建文件夹" text button

Right panel (flexible):
  - Toolbar: "上传文件" button (primary) + "新建文件夹" button (secondary) + search input
  - File list table:
    - Columns: checkbox | file-type icon | 文件名 | 大小 | 类型 | 上传时间 | 操作
    - Rows: alternating subtle background
    - Actions: "共享" | "下载" | "删除" icon buttons
  - Empty state: illustration + "暂无文件" text

=== FOOTER ===
```

---

### 17. 消息列表 — `pages/message/list.vue`

```
Design a message center list page for an enterprise platform (desktop 1440px viewport).

[Inject Global Design System]

=== HEADER (as global, bell icon highlighted with badge count in nav) ===

=== MAIN CONTENT (1350px centered) ===

--- Page Header ---
- Title: "消息中心" 24px bold
- Right: "全部已读" text button with checkmark icon

--- Category Tabs ---
- Tabs: 全部 | 系统通知 | 培训通知 | 工作通知 | 信息传达
- Active: underline #3B82F6

--- Message List ---
- Each message row (vertical list):
  - Left: unread indicator — 6px blue (#3B82F6) dot (hidden if read)
  - Content:
    - Title: 14px, bold if unread, normal weight if read, #0F172A
    - Summary: 12px #64748B, max 1 line, ellipsis at 50 chars
    - Time: relative format "2小时前" / "昨天" / "2025-12-21", 12px #94A3B8
  - Right: message type pill badge (系统=gray, 培训=blue, 工作=orange, 信息=green)
  - Hover: #F8FAFC background
  - 1px #E2E8F0 divider between items

--- Bottom ---
- "没有更多消息了" centered text when all loaded
- Pull-to-refresh indicator at top

=== FOOTER ===

Mobile: full-width cards, larger touch targets, swipe to delete
```

---

### 18. 消息详情 — `pages/message/detail.vue`

```
Design a message detail page for an enterprise platform (desktop 1440px viewport).

[Inject Global Design System]

=== HEADER (as global) ===

=== MAIN CONTENT (1350px centered, max-width 800px for readability) ===

- Back button: "← 返回消息列表"
- Title: 24px bold #0F172A
- Metadata row: sender avatar (32px) + sender name + message type badge + send time
- Divider
- Content area: plain text, 14px, line-height 1.8, #0F172A, padding 24px 0
- If has target: "查看详情 →" button at bottom (#3B82F6 bordered, arrow icon)
  - Links to corresponding business page (training/info-publish/key-work)
- No button if no target_type

=== FOOTER ===
```

---

### 19. 工作台 — `pages/workbench/index.vue`

```
Design a workbench dashboard page for an enterprise platform (desktop 1440px viewport).

[Inject Global Design System]

=== HEADER (as global) ===

=== MAIN CONTENT (1350px centered) ===

--- Welcome Section ---
- "早上好，张三 👋" greeting, 24px bold
- Subtitle: "技术部 · 超级管理员" 14px #64748B

--- Quick Stats Row ---
- 4 stat cards in horizontal row:
  - 待办任务: count "5" large number + "今日新增 2" delta
  - 未读消息: count "12" + arrow up indicator
  - 培训进度: "3/8 门课程" + progress bar
  - 本周反馈: count "7"
- Cards: white background, left colored accent bar (3px), each card with icon

--- Recent Activity Two-Column Grid ---
Left column:
  - "最近任务" card: recent 5 tasks with status badges and dates
  - "快捷入口" card: icon grid for frequent pages

Right column:
  - "未读消息" card: recent 3 unread messages
  - "近期培训" card: currently learning courses with progress

=== FOOTER ===

Mobile: stats in 2x2 grid, activity sections single column
```

---

### 20. 个人中心首页 — `pages_plugs/user-center/index.vue`

```
Design a personal center dashboard page for an enterprise platform (desktop 1440px viewport).

[Inject Global Design System]

=== HEADER (as global, "个人中心" active) ===

=== MAIN CONTENT (1350px centered) ===

--- User Card ---
- Centered card, max-width 600px:
  - Circular avatar: 64px, centered
  - Name: "张三" 18px bold, centered
  - Department badge: "技术部" pill tag
  - Role tags: "培训管理员" tag + "安全管理" tag, horizontal row
  - "编辑资料" text link

--- Function Grid Menu ---
- 3-column grid (desktop), 2-column (mobile), 24px gap
- Each grid item card:
  - Icon (32px, colored circle background): 
    - 📬 我的消息 (blue) + badge "5"
    - 📋 我的任务 (orange) + badge "2"
    - 💬 我的反馈 (purple)
    - 📖 我的阅读 (green)
    - 🎓 我的培训 (teal)
    - 💼 我的工作 (red)
    - ⚙️ 个人设置 (gray)
  - Title below icon, 14px #0F172A
  - Badge: red circle top-right of icon if has unread count
  - Card: white background, 1px border, hover shadow
  - Click navigation to corresponding page

=== FOOTER ===
```

---

### 21. 个人资料 — `pages_plugs/user-center/profile.vue`

```
Design a profile editing page for an enterprise platform (desktop 1440px viewport).

[Inject Global Design System]

=== MAIN CONTENT (1350px centered, max-width 800px form) ===

- Title: "个人信息" 24px bold
- Form sections:
  - Avatar upload: circular preview (80px) + "更换头像" button
  - 姓名: text input (read-only if WeChat-bound)
  - 手机号: text input with verification
  - 部门: display only (managed by admin)
  - 角色: display only, pill badges
  - 邮箱: text input
  - 微信绑定状态: green "已绑定" badge or "去绑定" link
- "保存修改" button at bottom, full-width on mobile
```

---

### 22. 我的任务 — `pages_plugs/user-center/my-tasks.vue`

```
Design a personal task list page (desktop 1440px viewport).

[Inject Global Design System]

=== MAIN CONTENT (1350px centered) ===

- Title: "我的任务" 24px bold
- Two tabs: "我安排的任务" | "我接收的任务"
- Task card list:
  - Each card: title + status badge + assignee avatars + deadline
  - Deadline < 3 days: date text in #EF4444 (red)
  - Status colors: 进行中=#3B82F6, 待验收=#F59E0B, 已完成=#10B981
  - Click → jump to task/focus detail page
```

---

### 23. 我的反馈 — `pages_plugs/user-center/my-feedback.vue`

```
Design a personal feedback history page (desktop 1440px viewport).

[Inject Global Design System]

=== MAIN CONTENT (1350px centered) ===

- Title: "我的反馈" 24px bold
- Feedback cards list (time descending):
  - Each card: work item title + latest feedback summary (2 lines max) + feedback type badge + date
  - Click → jump to corresponding work detail page
- Empty state: illustration + "暂无反馈记录"
```

---

### 24. 我的阅读 — `pages_plugs/user-center/my-reading.vue`

```
Design a personal reading history page (desktop 1440px viewport).

[Inject Global Design System]

=== MAIN CONTENT (1350px centered) ===

- Title: "我的阅读" 24px bold
- Article list (read time descending):
  - Each row: article title (clickable) + category badge + "阅读于 2025-12-21 14:30" time
  - Divider between items
  - Click → jump to article detail page
- Empty state: illustration + "暂无阅读记录"
```

---

### 25. 我的培训 — `pages_plugs/user-center/my-training.vue`

```
Design a personal training progress page (desktop 1440px viewport).

[Inject Global Design System]

=== MAIN CONTENT (1350px centered) ===

- Title: "我的培训" 24px bold
- Course cards (3-column grid):
  - Each card:
    - Thumbnail: 16:9, rounded top
    - Title: 14px bold, 2 lines max
    - Course type badge: "视频" blue / "文章" green
    - Progress bar: horizontal, colored fill
      - < 50%: #3B82F6 blue
      - ≥ 80%: #10B981 green
      - 100%: green + ✓ checkmark icon
    - Progress text: "已学习 60%"
  - Click → jump to course detail
- Empty state: illustration + "暂无学习记录"
```

---

### 26. 我的工作 — `pages_plugs/user-center/my-work.vue`

```
Design a personal routine work list page (desktop 1440px viewport).

[Inject Global Design System]

=== MAIN CONTENT (1350px centered) ===

- Title: "我的工作" 24px bold
- Filter: status dropdown + time range selector
- Task list (time descending):
  - Each item:
    - Task title
    - Source badge: 🔵 自己添加 / 🟠 领导分配 / 🔴 上级专业分配 (colored dot + text)
    - Status: 待处理/进行中/已反馈/已完成
    - Date + deadline info
  - Click → jump to calendar page with date focus
```

---

### 27. 个人设置 — `pages_plugs/user-center/settings.vue`

```
Design a personal settings page (desktop 1440px viewport).

[Inject Global Design System]

=== MAIN CONTENT (1350px centered, max-width 800px) ===

- Title: "个人设置" 24px bold

--- Notification Settings Section ---
- Section card:
  - "消息通知" subtitle 18px bold
  - Toggle list:
    - "总开关 — 接收所有通知" toggle switch (on=green)
    - Divider
    - Sub-toggles (indented):
      - "系统通知" toggle
      - "培训通知" toggle
      - "工作通知" toggle
      - "信息传达通知" toggle
  - Each toggle row: label left + switch right, 48px height

--- Interface Preferences Section ---
- Section card:
  - "界面偏好" subtitle
  - "此功能即将推出" placeholder text in #94A3B8

- "保存设置" button at bottom
```

---

## 📐 布局验证检查清单

使用以上提示词生成页面后，请验证：

| 检查项 | 标准 |
|--------|------|
| Header 高度 | 桌面端 64px / 移动端 56px |
| Header 内容对齐 | Logo 左、导航居中、CTA 右 |
| Main 区域宽度 | 桌面端 max-width 1350px |
| Main 居中 | margin: 0 auto |
| 无侧边栏 | 页面级无全局侧边栏（页面内部的分类导航不算） |
| Footer 内容 | 上层链接组 + 下层版权信息 |
| Footer 宽度 | 100vw，内部 1350px 居中 |
| 响应式 | ≥1024px / 768-1023px / <768px 三档 |
| 色彩一致性 | 主色 #0F172A，辅助 #64748B，信息 #3B82F6 |
| 字体 | Inter 字族，无浏览器默认字体 |
| 圆角 | 按钮 4px，卡片 6px，弹窗 8px |
| 阴影 | 最大 0.06 不透明度 |
