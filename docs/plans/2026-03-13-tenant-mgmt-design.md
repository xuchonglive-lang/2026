# 设计文档：租户管理系统（v2）

**日期**: 2026-03-13
**状态**: 待审阅

---

## 1. 核心架构

**租户 = 部门**，统一用 `xc-tenants` 一张表。超级管理员归属集团级节点，`dept_level` 决定数据可见范围。

```
集团（dept_level=0）── 超管在此，可创建全平台公告
├── 技术部（dept_level=10, 部室级）
├── 生产部（dept_level=10, 部室级）
├── 设备部（dept_level=10, 部室级）
├── 采矿车间（dept_level=20, 车间级）
└── 选矿车间（dept_level=20, 车间级）
```

### 数据可见性矩阵

| 创建者 dept_level | visibility | 谁能看到 |
|-------------------|-----------|----------|
| 0（集团） | `public`（默认） | 所有部门 |
| 10（部室） | `private` | 仅本部门 |
| 10（部室） | `targeted` | 本部门 + 选中的车间 |
| 20（车间） | `private` | 仅本车间 |
| 20（车间） | `targeted` | 本车间 + 选中的**同级或更低级**部门 |
| 任意 | `public` | 所有部门 |

**方向约束**：`targeted` 只能选择 `dept_level` ≥ 自身的部门。

---

## 2. 数据模型

### 2.1 `xc-tenants`

| 字段 | 类型 | 说明 |
|------|------|------|
| `_id` | String | 主键 |
| `name` | String | 部门名称（必填） |
| `code` | String | 部门编码（必填唯一） |
| `parent_id` | String | 上级ID，集团为 `null` |
| `dept_path` | String | 自动生成：`/集团ID/部门ID` |
| `dept_level` | Number | 0=集团, 10=部室, 20=车间 |
| `leader_id` | String | 负责人用户ID |
| `sort_num` | Number | 排序号，默认 0 |
| `status` | Number | 0=停用, 1=启用 |
| `description` | String | 简介 |

**索引**: `code`（唯一）、`parent_id`、`status`、`dept_level`

### 2.2 `uni-id-users` 扩展字段

| 字段 | 说明 |
|------|------|
| `tenant_id` | 所属部门ID。**所有用户必有值**，超管指向集团 |
| `dept_path` | 冗余 |
| `tenant_name` | 冗余 |
| `dept_level` | 冗余，用于 tenantFilter 快速判断 |

### 2.3 业务集合通用字段

| 字段 | 说明 |
|------|------|
| `tenant_id` | 创建者部门ID（创建时锁定） |
| `visibility` | `public`/`private`/`targeted`。集团级创建默认 `public`，其他默认 `private` |
| `target_dept_ids` | `targeted` 时的目标部门ID数组 |
| `creator_dept_level` | 创建者 dept_level |

---

## 3. tenantFilter 中间件

```
请求 → tenantFilter
  ├─ user.dept_level === 0（集团级）
  │   ├─ 后台有 selected_tenant_id → 按该部门过滤
  │   └─ 无 → 不过滤，返回全部
  └─ user.dept_level > 0（部门级）
       → 注入 $or:
         ├─ { tenant_id: user.tenant_id }
         ├─ { visibility: 'public' }
         └─ { visibility: 'targeted',
              target_dept_ids: { $in: [user.tenant_id] },
              creator_dept_level: { $lte: user.dept_level } }
```

> [!IMPORTANT]
> 不再需要判断"是否超级管理员角色"，**dept_level === 0 即集团级**，天然看全部。

---

## 4. 登录流程

```
登录成功 → 查 uni-id-users.tenant_id
  ├─ tenant_id 为空 → 登录成功，提示"未分配部门，请联系管理员"
  ├─ 查 xc-tenants.status === 0 → 阻止登录，跳转提示页
  └─ status === 1 → Vuex 写入 tenant_id, dept_path, tenant_name, dept_level
```

---

## 5. 后台部门管理

路径: `xc-admin/pages_plugs/system/dept/list.vue`

- 左侧：按集团分组的部门列表（搜索、同级排序）
- 右侧：编辑表单 + 成员管理 tab
- 表单：名称、编码（唯一）、上级、层级下拉（部室/车间）、负责人、排序、状态、简介

---

## 6. 组件 & 接口

### 组件

| 组件 | 路径 | 用途 |
|------|------|------|
| `DeptSelector` | `xc-admin/components/dept-selector/` | 后台 el-cascader 部门切换 |
| `VisibilitySetter` | `xc-admin/components/visibility-setter/` | 业务表单可见性配置 |

### 云函数

| 接口 | 说明 |
|------|------|
| `admin/system/dept/sys/add` | 新增部门 |
| `admin/system/dept/sys/update` | 修改部门 |
| `admin/system/dept/sys/del` | 删除（有成员时阻止） |
| `admin/system/dept/sys/getList` | 部门列表（按集团分组） |
| `admin/system/dept/sys/getInfo` | 部门详情 |
| `admin/system/dept/sys/sort` | 同级排序 |
| `admin/system/dept/sys/addMember` | 添加成员 |
| `admin/system/dept/sys/removeMember` | 移除成员 |
| `admin/system/dept/sys/getMembers` | 部门成员列表 |
| `user/kh/dept/getMyDept` | 前台获取用户部门信息 |
| `user/kh/dept/getDeptPath` | 前台获取层级路径 |

---

## 7. 已确认决策汇总

| # | 决策 | 结论 |
|---|------|------|
| Q1 | 停用拦截 | 登录时阻止 |
| Q2 | dept_path 格式 | _id 路径，固定两级 |
| Q3 | 调动后数据归属 | 留旧部门 |
| Q4 | 管理员参数注入 | 中间件自动 |
| Q5 | target_dept_ids 匹配 | 精确匹配 + dept_level 方向 |
| Q6 | 过滤范围 | dept_level=0 免过滤 |
| Q7 | 层级建模 | dept_level 数值字段 |
| Q8 | 集团级创建数据 | 可以，默认 public |
