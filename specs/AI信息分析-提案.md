# 功能说明书：AI信息分析模块（仅后台）

**功能分支**: `ai-analysis-module`
**创建日期**: 2026-03-13
**状态**: 草案
**优先级**: P5
**输入**: 办公应用平台需求文档 - 第9章 AI信息分析模块
**依赖模块**: 租户管理（tenant）、权限管理（permission）

> **宪法合规声明**: 本提案严格遵守项目宪法。云函数遵循 `vk-fun` 技能规范。本模块仅后台使用，不涉及前台页面。

---

## 用户场景与测试 *(必填)*

### 用户故事 1 - AI项目配置管理 (优先级: P1)

管理员在后台创建和管理AI分析项目。每个项目定义：接受的文档类型、AI服务配置（API地址/Key/模型）、提示词模板（支持 `{{文档内容}}` 等变量）、输出格式配置。

**验收场景**:

1. **假设** 管理员进入AI项目列表页（`xc-admin/pages/ai-analysis/list.vue`），**当** 页面加载，**那么** `vk-data-table` 显示项目列表（名称、文档类型标签组、AI模型名称、创建时间、分析次数）
2. **假设** 管理员点击"新建项目"进入编辑页，**当** 表单加载，**那么** 包含：项目名称（必填）、项目描述（文本域）、接受的文档类型（多选标签：PDF/Word/Excel/图片/TXT）、AI服务配置区域（API地址输入框、API Key输入框（密码模式+查看按钮）、模型选择下拉（如 gpt-4/claude-3 等，可自定义）、温度/最大token等参数滑块）
3. **假设** 管理员编辑提示词模板，**当** 打开模板编辑器，**那么** 显示代码编辑器（monaco-editor 或 codemirror），支持变量高亮（`{{变量名}}` 以蓝色背景标示），右侧显示可用变量列表（`{{文档内容}}`、`{{文档名称}}`、`{{文档类型}}`、`{{当前日期}}`），点击变量可插入到光标位置

---

### 用户故事 2 - 执行AI分析 (优先级: P1)

授权用户选择已配置的AI项目→上传文档（支持批量）→预览填充后的提示词→确认执行→显示分析进度→分析完成后生成PDF报告。

**验收场景**:

1. **假设** 用户进入AI执行页面（`xc-admin/pages/ai-analysis/execute.vue`），**当** 页面加载，**那么** 步骤导航：选择项目→上传文档→预览提示词→确认执行
2. **假设** 用户选择"政策分析"项目并上传一个PDF文件，**当** 文件上传完成，**那么** 右侧预览区自动显示提取的文档文本内容（PDF解析）
3. **假设** 用户进入"预览提示词"步骤，**当** 页面渲染，**那么** 将文档内容填入模板的 `{{文档内容}}` 变量，完整提示词以代码块形式展示，变量部分高亮
4. **假设** 用户确认执行，**当** 分析开始，**那么** 页面显示进度指示（旋转loading + 耗时计时器 + 当前阶段文字："正在解析文档..."/"正在调用AI接口..."/"正在生成报告..."）
5. **假设** 分析完成，**当** 结果返回，**那么** 页面显示AI分析结果（Markdown格式渲染），底部两个按钮："下载PDF报告"+"保存到分析记录"

---

### 用户故事 3 - 分析记录管理 (优先级: P2)

管理员在分析记录页（`xc-admin/pages/ai-analysis/records.vue`）按项目/时间/状态查询历史分析记录。每条记录可查看原始文档和生成的PDF报告。

**验收场景**:

1. **假设** 管理员进入分析记录页，**当** 页面加载，**那么** `vk-data-table` 显示记录列表（项目名称、文档名称、状态标签、耗时、token消耗、操作列）
2. **假设** 管理员点击记录的"查看报告"，**当** 弹窗打开，**那么** 内嵌 PDF.js 预览生成的PDF报告，底部有"下载"按钮
3. **假设** 记录筛选区域按时间范围+项目下拉+状态下拉组合筛选，**当** 筛选条件变化，**那么** 列表自动刷新

---

### 用户故事 4 - API Key管理 (优先级: P2)

管理员管理多个AI服务商的API Key，Key加密存储，支持余额/用量查询。

**验收场景**:

1. **假设** 管理员添加一个API Key，**当** 保存时，**那么** Key以 AES-256 加密存储到 `xc-ai-api-keys` 集合，列表中Key显示为 `sk-...xxxx`（仅末4位）
2. **假设** 管理员点击"查询余额"，**当** 调用AI服务商的余额查询接口，**那么** 实时显示当前余额和本月用量

---

### 边界情况

- AI接口超时（>120秒）：返回超时错误，记录状态为"失败"
- API Key余额不足：分析前预检余额，不足时阻止执行并提示
- 文档过大（>10MB）：提示用户缩减文档或分段上传
- PDF生成失败：回退为Markdown格式报告，记录错误日志
- 并发分析请求：同一项目最多同时执行3个分析任务（队列控制）

---

## 需求 *(必填)*

### 功能需求

- **FR-001**: 后台必须支持AI项目CRUD，包含文档类型配置、API服务配置和提示词模板编辑
- **FR-002**: 提示词编辑器必须支持变量高亮和变量插入
- **FR-003**: 执行分析流程必须支持：文档上传→文档解析→提示词预览→AI调用→结果展示→PDF生成
- **FR-004**: 分析过程中必须显示实时进度和阶段提示
- **FR-005**: 生成的PDF报告必须自动上传至阿里云OSS并记录URL
- **FR-006**: 分析记录必须持久化，包含token消耗和耗时统计
- **FR-007**: API Key必须加密存储（AES-256），列表展示脱敏
- **FR-008**: 云函数中AI接口调用必须使用 `vk.request` 并设置合理超时

### 关键实体

- **xc-ai-projects（AI项目表）**: `_id`、`name`、`description`、`doc_types`（接受的文档类型数组）、`api_url`、`api_key_id`（关联API Key）、`model`（模型名称）、`params`（温度/max_tokens等JSON）、`prompt_template`（提示词模板）、`output_config`（输出配置JSON）、`analysis_count`（分析次数）、`tenant_id`、通用字段
- **xc-ai-records（分析记录表）**: `_id`、`project_id`、`doc_name`（文档名称）、`doc_url`（文档OSS地址）、`report_url`（PDF报告OSS地址）、`result_markdown`（Markdown格式结果）、`status`（pending/running/success/failed）、`error_msg`、`token_usage`、`duration_ms`（耗时毫秒）、`tenant_id`、`created_by`、通用字段
- **xc-ai-api-keys（API Key表）**: `_id`、`name`（显示名称）、`provider`（服务商）、`encrypted_key`（加密存储的Key）、`status`（1=正常/0=停用）、`tenant_id`、通用字段

---

## 路径约束（宪法规定）

| 维度 | 路径 |
|------|------|
| 后台AI项目列表 | `xc-admin/pages/ai-analysis/list.vue` |
| 后台AI项目编辑 | `xc-admin/pages/ai-analysis/edit.vue` |
| 后台AI执行分析 | `xc-admin/pages/ai-analysis/execute.vue` |
| 后台分析记录 | `xc-admin/pages/ai-analysis/records.vue` |
| 后台云函数 | `service/admin/ai-analysis/` |

---

## 云函数接口清单

| 接口URL | 方法 | 说明 |
|---------|------|------|
| `admin/ai-analysis/sys/projectAdd` | POST | 新增AI项目 |
| `admin/ai-analysis/sys/projectUpdate` | POST | 修改AI项目 |
| `admin/ai-analysis/sys/projectDel` | POST | 删除AI项目 |
| `admin/ai-analysis/sys/projectGetList` | POST | AI项目列表 |
| `admin/ai-analysis/sys/projectGetInfo` | POST | AI项目详情 |
| `admin/ai-analysis/sys/execute` | POST | 执行AI分析 |
| `admin/ai-analysis/sys/getProgress` | POST | 查询分析进度 |
| `admin/ai-analysis/sys/recordGetList` | POST | 分析记录列表 |
| `admin/ai-analysis/sys/recordGetInfo` | POST | 分析记录详情 |
| `admin/ai-analysis/sys/apiKeyAdd` | POST | 新增API Key |
| `admin/ai-analysis/sys/apiKeyUpdate` | POST | 修改API Key |
| `admin/ai-analysis/sys/apiKeyDel` | POST | 删除API Key |
| `admin/ai-analysis/sys/apiKeyGetList` | POST | API Key列表 |
| `admin/ai-analysis/sys/checkBalance` | POST | 查询余额 |
