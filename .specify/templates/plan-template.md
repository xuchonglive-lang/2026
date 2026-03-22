# 实施方案：[FEATURE]

**分支**: `[###-feature-name]` | **日期**: [DATE] | **需求文档**: [link]
**输入**: 来自 `/specs/[###-feature-name]/spec.md` 的功能详细说明

**注意**: 此模板由 `/speckit.plan` 命令填充。有关执行工作流，详见 `.specify/templates/plan-template.md`。

## 摘要

[从功能说明中提取：主要需求 + 调研得出的技术方案]

## 技术背景

<!--
  操作指南：请将此章节中的内容替换为项目的具体技术细节。
  此处提供的结构仅作为指导迭代过程的参考建议。
-->

**语言/版本**: [例如：Python 3.11, Swift 5.9, Rust 1.75 或 需澄清]  
**主要依赖**: [例如：FastAPI, UIKit, LLVM 或 需澄清]  
**存储**: [如果适用，例如：PostgreSQL, CoreData, 文件 或 不适用]  
**测试**: [例如：pytest, XCTest, cargo test 或 需澄清]  
**目标平台**: [例如：Linux 服务器, iOS 15+, WASM 或 需澄清]
**项目类型**: [例如：库/CLI/Web 服务/移动应用/编译器/桌面应用 或 需澄清]  
**性能目标**: [领域特定，例如：1000 req/s, 10k lines/sec, 60 fps 或 需澄清]  
**约束条件**: [领域特定，例如：<200ms p95, <100MB 内存, 支持离线 或 需澄清]  
**规模/范围**: [领域特定，例如：1万用户, 100万行代码, 50个页面 或 需澄清]

## 宪法核查 (Constitution Check)

*准入点：必须在第0阶段调研前通过。在第1阶段设计后重新检查。*

[根据宪法文件确定的检查项]

## 项目结构

### 辅助文档 (本功能)

```text
specs/[###-feature]/
├── plan.md              # 本文件（/speckit.plan 命令输出）
├── research.md          # 第0阶段输出（/speckit.plan 命令）
├── data-model.md        # 第1阶段输出（/speckit.plan 命令）
├── quickstart.md        # 第1阶段输出（/speckit.plan 命令）
├── contracts/           # 第1阶段输出（/speckit.plan 命令）
└── tasks.md             # 第2阶段输出（/speckit.tasks 命令 - 非 /speckit.plan 创建）
```

### 源代码 (存储库根目录)
<!--
  操作指南：请将下方的占位树替换为此功能的具体布局。
  删除未使用的选项，并使用真实路径（例如：apps/admin, packages/something）扩展所选结构。
  交付的方案中不应包含“选项”标签。
-->

```text
# [如未使用则删除] 选项 1: 单个项目 (默认)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [如未使用则删除] 选项 2: Web 应用程序 (当检测到 "frontend" + "backend" 时)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [如未使用则删除] 选项 3: 移动端 + API (当检测到 "iOS/Android" 时)
api/
└── [同上方 backend]

ios/ 或 android/
└── [平台特定结构：功能模块、UI 流、平台测试]
```

**结构决策**: [记录所选结构并引用上方捕获的真实目录]

## 复杂度追踪

> **仅当“宪法核查”存在必须辩护的违规项时填写**

| 违规项 | 必要性说明 | 拒绝简单替代方案的原因 |
|-----------|------------|-------------------------------------|
| [例如：第4个项目] | [当前需求] | [为什么3个项目不够] |
| [例如：存储库模式] | [特定问题] | [为什么直接访问数据库不够] |
