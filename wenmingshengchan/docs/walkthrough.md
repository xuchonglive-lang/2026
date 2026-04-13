# 日治理计划管理模块 — 完工总结

## 概述

完成了日治理计划模块的全部云函数（C端5个 + B端5个）、公共工具函数、前端页面数据对接（C端2个 + B端1个），以及2个辅助下拉数据源接口。

---

## 交付物清单

### 公共层（1个文件）

| 文件 | 说明 |
|------|------|
| `service/common/plan-utils.js` | 被动感知状态计算 `getDisplayStatus()` + 过期判断 `isExpired()` + 状态字典 |

### C端云函数（5个文件）

| 文件 | URL | 说明 |
|------|-----|------|
| `client/plan/kh/getTodoCount.js` | `client/plan/kh/getTodoCount` | 首页待办数量，今日+status∈{1,3}+我是执行人 |
| `client/plan/kh/getList.js` | `client/plan/kh/getList` | 双Tab列表，tab=all/mine，foreignDB关联区域/部门/下达人 |
| `client/plan/kh/getDetail.js` | `client/plan/kh/getDetail` | 详情页，批量关联反馈人/验收人姓名，计算 can_submit/can_verify |
| `client/plan/kh/submitFeedback.js` | `client/plan/kh/submitFeedback` | 3层防护栈(状态→时限→身份)，`_.push()` 原子追加 |
| `client/plan/kh/verifyTask.js` | `client/plan/kh/verifyTask` | 验收操作，角色+部门+状态三重校验，通过→5/驳回→3 |

### B端云函数（5个文件）

| 文件 | URL | 说明 |
|------|-----|------|
| `admin/plan/sys/add.js` | `admin/plan/sys/add` | 创建计划，安全重组数据，自动注入dept_id/issuer_uid |
| `admin/plan/sys/update.js` | `admin/plan/sys/update` | 修改计划，白名单字段+feedbacks非空保护 |
| `admin/plan/sys/delete.js` | `admin/plan/sys/delete` | 软删除(is_del=1)，feedbacks非空保护 |
| `admin/plan/sys/getList.js` | `admin/plan/sys/getList` | 多维筛选+权限隔离+foreignDB+被动感知 |
| `admin/plan/sys/getStatistics.js` | `admin/plan/sys/getStatistics` | 日期范围统计：完成/逾期/驳回/超时/完成率 |

### 辅助接口（2个文件）

| 文件 | 说明 |
|------|------|
| `admin/base-dept/sys/getAll.js` | 部门下拉选择数据源 |
| `admin/user/sys/getAll.js` | 用户下拉选择数据源(status=0) |

### 前端页面（3个文件）

| 文件 | 改动类型 | 说明 |
|------|----------|------|
| `mp-client/pages/plan/list/index.vue` | 数据整合 | 双Tab切换、日期搜索、按部门分组、状态标签着色 |
| `mp-client/pages/plan/feedback/index.vue` | 数据整合 | getDetail 动态渲染、反馈表单弹窗、验收按钮、照片上传+预览 |
| `mp-admin/pages/plan/plan-list.vue` | 全新实现 | vk-data-table + vk-data-form，showRule 动态切换派发方式 |

---

## 关键设计决策与避坑措施

| 坑点 | 对策 | 参照 |
|------|------|------|
| `db.command` 解构 | 从 `util` 解构 `_` 即 db.command | gotchas 2.4 |
| 物理删除 | 全部使用软删除 `is_del=1` | gotchas 2.3 |
| `select()` 返回对象 | 一律取 `.rows` | vk-fun skill |
| foreignDB 外键黑洞 | 后端 getTableData 内 foreignDB 联表 | gotchas 2.2 |
| `defaultValue` 失效 | addBtn 中手动赋值 `form1.data.status = 1` | gotchas 1.4 |
| `require` 相对路径 | 从 `kh/` 到 `common/` 需3级 `../../../` | 执行时修复 |
| `getTableData` 分页 | 传 `data: data` 让底层自动处理翻页参数 | cloud-function-guide |

---

## 状态机流转验证清单

```
创建 → status=1(执行中)
提交反馈 → status=2(已提交)  [_.push() 原子追加]
验收驳回 → status=3(未达标)  [可再次提交]
验收通过 → status=5(已完成)  [终态]
逾期(被动感知) → display_status=6  [status仍为1/3]
超时未验收(被动感知) → display_status=4  [status仍为2]
```

## 待用户手动执行

1. **UniCloud 控制台** 创建 `daily-plan` 集合并建立索引
2. **上传云函数** 到阿里云服务空间
3. **角色配置** 在用户管理中为相关人员添加 `plan_admin` 角色
