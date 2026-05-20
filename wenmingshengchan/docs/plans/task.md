# Task Tracker - UI / UX Premium Refinements

| ID | Task | Status | Notes |
|:---|:---|:---|:---|
| 1 | Fix Area Tabs Reactivity (`u-tabs`) | completed | Bind dynamic keys (`:key`) to u-tabs in project list & report board to force reactivity updates on fetch |
| 2 | Add Area & Point Info to Project Details | completed | Display complete Area - Point information in `process-feed/index.vue` unconditionally and avoid styling overlap |
| 3 | Verification and Quality Check | completed | Build and compile WeChat Mini Program to verify that layout is pixel perfect and clean |
| 4 | Fix `findById` + `foreignDB` Join Bug | completed | Bypassed findById foreignDB limitations by manually associating area_info and point_info in getProjectDetail |
| 5 | Fix "Unknown" Area Bug in Daily Plan List | completed | Added base-area join to getList cloud function & robust double-layered fallback mapping in list.vue |
| 6 | Create Dedicated getAreaPointTree CF for Plan | completed | Created plan/kh/getAreaPointTree cloud function and updated list.vue to use it, enforcing strict modularity |
| 7 | Refactor Area Selector to Single-Column | completed | Refactor area selector in Daily Plan List to single-column display, fetching from getAreaList cloud function |
| 8 | Create Dedicated getAreaList Cloud Function | completed | Created plan/kh/getAreaList cloud function under plan kh folder with standard code 0 return formatting |
| 9 | Fix `getAreaList` Lifecycle Trigger Bug | completed | Fixed async login race condition by implementing double-insurance triggers in `created` and `queryList(1)` |
| 10 | Optimize plan list default avatars | completed | Replaced broken 404 remote avatar link with a premium offline Base64 SVG silhouette and defensive error fallbacks |
| 11 | 优化反馈任务逾期清算与数据获取顺序 | completed | 将 getTodoList 调整为先做逾期状态判定并更新数据库，再进行列表数据查询，确保数量与状态最新 |
| 12 | 调研项目上下文与 uniCloud 云空间切换文档 | completed | 查阅了官方文档，确认了通过动态 init 切换服务空间的可行性与限制 |
| 13 | 提出针对性澄清问题 | completed | 用户确认目的为“审核通过后无感切换数据与功能”（选项 C） |
| 14 | 提出 2-3 种云空间切换与审核过渡技术方案 | completed | 提出了三种切换方案，用户最终选择“方案 1（单空间 + 动态版本审核开关）” |
| 15 | 展示云空间切换方案设计 | completed | 详细展示了架构与数据设计、前端 UI 分流以及数据隔离的方案设计 |
| 16 | 编写并保存设计文档 | completed | 已将设计文档保存至 `docs/plans/2026-05-20-wechat-audit-space-switch-design.md` |
| 17 | 转换至实施规划阶段 | completed | 已保存方案设计，本咨询任务至此圆满结束，无需进一步的实施编码阶段 |
| 18 | [第二轮头脑风暴] 调研 vk-unicloud-router 多环境与 B 端开关机制 | completed | 已研读 vk 官方文档，明确了 `envs` 配置与 `vk.callFunction` 的 `env` 动态入参机制 |
| 19 | [第二轮头脑风暴] 提出针对性澄清问题 | completed | 用户确认了构想：引入第三个“主控云空间”专门用于管理与状态判断 |
| 20 | [第二轮头脑风暴] 提出 2-3 种切换控制架构设计方案 | completed | 提出了三种路由劫持方案，用户确认选择“方案 A（全局 AOP 劫持注入）”并开始详细设计 |
| 21 | [第二轮头脑风暴] 展示多空间切换方案详细设计 | completed | 详细展示了 app.config.js 配置、主控数据库、B 端管理交互与前端 AOP 请求挂起拦截器设计 |
| 22 | [第二轮头脑风暴] 编写并保存第二轮设计文档 | completed | 已将设计文档保存至 `docs/plans/2026-05-20-wechat-three-space-switch-design.md` |
| 23 | [第二轮头脑风暴] 转换至实施规划阶段 | completed | 已保存三云空间动态切换方案，本咨询任务至此圆满结束，无需进一步的实施编码阶段 |
| 24 | [第三轮头脑风暴] 针对多空间切换的可行性与性能痛点进行风暴 | completed | 分析了双空间方案中 auto-login 和冷启动性能，提出了本地缓存过审状态优化方案，用户确认选择方案 1 |
| 25 | [第三轮头脑风暴] 形成双空间动态路由切换设计与实施文档 | completed | 编写并保存了最新的设计和实施计划文件，准备进入单流实施阶段 |
| 26 | [实施阶段] 任务1：空间 A 数据库初始化 | completed | 创建 sys_config schema 文件并手动录入 app_audit_config 配置记录 |
| 27 | [实施阶段] 任务2：创建 checkAuditStatus 云函数 | completed | 部署 client/pub/checkAuditStatus 到空间 A 以检测版本过审状态 |
| 28 | [实施阶段] 任务3：客户端 app.config.js 配置更新 | completed | 在 app.config.js 中配置 envs，将 default 指向空间 A，prod 指向空间 B |
| 29 | [实施阶段] 任务4：客户端 AOP 拦截器与缓存层实现 | completed | 实现 main.js 中的 AOP 拦截器和本地缓存逻辑，并全局 Mixin 注入 currentEnv 变量 |
| 30 | [实施阶段] 任务5：main.js Vue2 全局拦截 Mixin 实现 | pending | 在 main.js 中为 Vue2 环境的全局 Mixin 添加 onShow 页面审计拦截 |
| 31 | [实施阶段] 任务6：main.js Vue3 全局拦截 Mixin 实现 | pending | 在 main.js 中为 Vue3 环境的全局 Mixin 添加 onShow 页面审计拦截 |
| 32 | [实施阶段] 任务7：login/index.vue 授权流程控制优化 | pending | 在登录页 handleWechatAuth 和 onAuthAccept 中分离 login 与 register 请求逻辑 |
