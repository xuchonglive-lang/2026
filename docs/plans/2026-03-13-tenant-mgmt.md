# 租户管理系统 Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 实现固定两级部门（集团→部门）管理系统，包含 tenantFilter 中间件、部门 CRUD 云函数、登录流程改造、后台管理页面和前台展示。

**Architecture:** 租户=部门统一为 `xc-tenants` 一张表，`dept_level` 数值字段控制层级（0=集团/10=部室/20=车间）。超管归属集团级（dept_level=0），中间件自动根据 dept_level 决定数据可见范围。所有业务集合内嵌 `tenant_id/visibility/target_dept_ids/creator_dept_level` 通用字段。

**Tech Stack:** Vue 2 + VK UniCloud Router + UniCloud (阿里云) + Element UI (后台) + vk.baseDao

**Design Doc:** [2026-03-13-tenant-mgmt-design.md](file:///d:/AI%20project/2026/docs/plans/2026-03-13-tenant-mgmt-design.md)

---

## Task 1: 创建 xc-tenants 数据库集合 Schema

**Files:**
- Create: `xc/uniCloud-aliyun/database/xc-tenants.schema.json`

**Step 1: 创建 schema 文件**

```json
{
  "bsonType": "object",
  "required": ["name", "code", "dept_level", "status"],
  "permission": {
    "read": "auth.uid != null",
    "create": "auth.uid != null",
    "update": "auth.uid != null",
    "delete": "auth.uid != null"
  },
  "properties": {
    "_id": { "description": "ID" },
    "name": { "bsonType": "string", "title": "部门名称", "trim": "both" },
    "code": { "bsonType": "string", "title": "部门编码", "trim": "both" },
    "parent_id": { "bsonType": "string", "title": "上级部门ID", "defaultValue": null },
    "dept_path": { "bsonType": "string", "title": "层级路径" },
    "dept_level": { "bsonType": "int", "title": "层级", "description": "0=集团 10=部室 20=车间", "enum": [0, 10, 20] },
    "leader_id": { "bsonType": "string", "title": "负责人ID" },
    "sort_num": { "bsonType": "int", "title": "排序号", "defaultValue": 0 },
    "status": { "bsonType": "int", "title": "状态", "description": "0=停用 1=启用", "defaultValue": 1, "enum": [0, 1] },
    "description": { "bsonType": "string", "title": "简介" },
    "created_by": { "bsonType": "string", "title": "创建人" },
    "created_at": { "bsonType": "timestamp", "title": "创建时间" },
    "updated_by": { "bsonType": "string", "title": "更新人" },
    "updated_at": { "bsonType": "timestamp", "title": "更新时间" }
  }
}
```

**Step 2: 通过 HBuilderX 上传 schema 到云端**

在 HBuilderX 中右键 `xc-tenants.schema.json` → 上传 DB Schema。

**Step 3: 在 UniCloud 控制台手动创建索引**

- `code`：唯一索引
- `parent_id`：普通索引
- `status`：普通索引
- `dept_level`：普通索引

**Step 4: 初始化根部门数据**

在 UniCloud 控制台的 `xc-tenants` 集合中手动插入集团根节点：

```json
{
  "name": "集团总部",
  "code": "root",
  "parent_id": null,
  "dept_path": "/",
  "dept_level": 0,
  "sort_num": 0,
  "status": 1,
  "description": "集团根节点"
}
```

记录此条记录的 `_id`，后续所有二级部门的 `parent_id` 指向它。

**Step 5: Commit**

```bash
git add xc/uniCloud-aliyun/database/xc-tenants.schema.json
git commit -m "feat(tenant): add xc-tenants collection schema"
```

---

## Task 2: 部门 CRUD 云函数 — util 工具模块

**Files:**
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/service/admin/system/dept/util/formRules.js`

**Step 1: 创建 formRules 工具**

参考 `admin/system/user/util/formRules.js` 的模式。

```js
module.exports = {
  /**
   * 新增部门参数校验
   */
  add: async (event) => {
    let { data = {}, util } = event
    let { vk, db } = util
    let { name, code, dept_level } = data
    let res = { code: 0, msg: '' }
    if (!name) return { code: -1, msg: '部门名称不能为空' }
    if (!code) return { code: -1, msg: '部门编码不能为空' }
    if (![0, 10, 20].includes(dept_level)) return { code: -1, msg: '部门层级无效' }
    // 编码唯一性校验
    let num = await vk.baseDao.count({
      dbName: 'xc-tenants',
      whereJson: { code }
    })
    if (num > 0) return { code: -1, msg: `部门编码【${code}】已存在` }
    return res
  },
  /**
   * 修改部门参数校验
   */
  update: async (event) => {
    let { data = {}, util } = event
    let { vk } = util
    let { _id, name, code, dept_level } = data
    if (!_id) return { code: -1, msg: '缺少部门ID' }
    if (!name) return { code: -1, msg: '部门名称不能为空' }
    if (code) {
      let num = await vk.baseDao.count({
        dbName: 'xc-tenants',
        whereJson: { code, _id: vk.db.command.neq(_id) }
      })
      if (num > 0) return { code: -1, msg: `部门编码【${code}】已存在` }
    }
    return { code: 0, msg: '' }
  }
}
```

**Step 2: Commit**

```bash
git add xc/uniCloud-aliyun/cloudfunctions/router/service/admin/system/dept/
git commit -m "feat(tenant): add dept formRules validation util"
```

---

## Task 3: 部门 CRUD 云函数 — sys 核心接口

**Files:**
- Create: `service/admin/system/dept/sys/add.js`
- Create: `service/admin/system/dept/sys/update.js`
- Create: `service/admin/system/dept/sys/del.js`
- Create: `service/admin/system/dept/sys/getList.js`
- Create: `service/admin/system/dept/sys/getInfo.js`
- Create: `service/admin/system/dept/sys/sort.js`

> 注：以下所有路径的根为 `xc/uniCloud-aliyun/cloudfunctions/router/service/`

**Step 1: 创建 add.js**

```js
const formRules = require('../util/formRules.js')
module.exports = {
  /**
   * 新增部门
   * @url admin/system/dept/sys/add
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util
    let res = { code: 0, msg: '' }

    let formRulesRes = await formRules.add(event)
    if (formRulesRes.code !== 0) return formRulesRes

    let { name, code, parent_id, dept_level, leader_id, sort_num = 0, status = 1, description = '' } = data

    // 查询父部门以生成 dept_path
    let dept_path = '/'
    if (parent_id) {
      let parentDept = await vk.baseDao.findByWhereJson({
        dbName: 'xc-tenants',
        whereJson: { _id: parent_id }
      })
      if (!parentDept) return { code: -1, msg: '上级部门不存在' }
      dept_path = parentDept.dept_path === '/' ? `/${parent_id}` : `${parentDept.dept_path}/${parent_id}`
    }

    let addRes = await vk.baseDao.add({
      dbName: 'xc-tenants',
      dataJson: {
        name, code, parent_id: parent_id || null, dept_path, dept_level,
        leader_id: leader_id || null, sort_num, status, description,
        created_by: userInfo._id, created_at: Date.now(),
        updated_by: userInfo._id, updated_at: Date.now()
      }
    })

    // 补充 dept_path（追加自身 _id）
    let newId = addRes.id
    let finalPath = dept_path === '/' ? `/${newId}` : `${dept_path}/${newId}`
    await vk.baseDao.update({
      dbName: 'xc-tenants',
      whereJson: { _id: newId },
      dataJson: { dept_path: finalPath }
    })

    res.id = newId
    return res
  }
}
```

**Step 2: 创建 update.js**

```js
const formRules = require('../util/formRules.js')
module.exports = {
  /**
   * 修改部门
   * @url admin/system/dept/sys/update
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util
    let res = { code: 0, msg: '' }

    let formRulesRes = await formRules.update(event)
    if (formRulesRes.code !== 0) return formRulesRes

    let { _id, name, code, dept_level, leader_id, sort_num, status, description } = data

    let dataJson = { updated_by: userInfo._id, updated_at: Date.now() }
    if (name !== undefined) dataJson.name = name
    if (code !== undefined) dataJson.code = code
    if (dept_level !== undefined) dataJson.dept_level = dept_level
    if (leader_id !== undefined) dataJson.leader_id = leader_id
    if (sort_num !== undefined) dataJson.sort_num = sort_num
    if (status !== undefined) dataJson.status = status
    if (description !== undefined) dataJson.description = description

    await vk.baseDao.update({
      dbName: 'xc-tenants',
      whereJson: { _id },
      dataJson
    })

    return res
  }
}
```

**Step 3: 创建 del.js**

```js
module.exports = {
  /**
   * 删除部门
   * @url admin/system/dept/sys/del
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util
    let { _id } = data
    if (!_id) return { code: -1, msg: '缺少部门ID' }

    // 检查子部门
    let childCount = await vk.baseDao.count({
      dbName: 'xc-tenants',
      whereJson: { parent_id: _id }
    })
    if (childCount > 0) return { code: -1, msg: '该部门下存在子部门，无法删除' }

    // 检查成员
    let memberCount = await vk.baseDao.count({
      dbName: 'uni-id-users',
      whereJson: { tenant_id: _id }
    })
    if (memberCount > 0) return { code: -1, msg: '该部门下存在成员，无法删除' }

    await vk.baseDao.deleteById({
      dbName: 'xc-tenants',
      id: _id
    })

    return { code: 0, msg: '删除成功' }
  }
}
```

**Step 4: 创建 getList.js**

```js
module.exports = {
  /**
   * 获取部门列表（按集团分组）
   * @url admin/system/dept/sys/getList
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util
    let { status, keyword } = data

    let whereJson = {}
    if (status !== undefined && status !== '') whereJson.status = status
    if (keyword) {
      whereJson.name = new RegExp(keyword, 'i')
    }

    let listRes = await vk.baseDao.select({
      dbName: 'xc-tenants',
      whereJson,
      sortArr: [{ name: 'dept_level', type: 'asc' }, { name: 'sort_num', type: 'asc' }],
      fieldJson: {
        name: true, code: true, parent_id: true, dept_path: true,
        dept_level: true, leader_id: true, sort_num: true, status: true, description: true
      }
    })

    return {
      code: 0,
      msg: '',
      rows: listRes.rows || listRes
    }
  }
}
```

**Step 5: 创建 getInfo.js**

```js
module.exports = {
  /**
   * 获取部门详情
   * @url admin/system/dept/sys/getInfo
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util
    let { _id } = data
    if (!_id) return { code: -1, msg: '缺少部门ID' }

    let info = await vk.baseDao.findByWhereJson({
      dbName: 'xc-tenants',
      whereJson: { _id }
    })
    if (!info) return { code: -1, msg: '部门不存在' }

    return { code: 0, msg: '', data: info }
  }
}
```

**Step 6: 创建 sort.js**

```js
module.exports = {
  /**
   * 同级排序
   * @url admin/system/dept/sys/sort
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util
    let { sortList } = data
    // sortList 格式: [{ _id: "xxx", sort_num: 0 }, ...]
    if (!Array.isArray(sortList) || sortList.length === 0) {
      return { code: -1, msg: '排序列表为空' }
    }
    for (let item of sortList) {
      await vk.baseDao.update({
        dbName: 'xc-tenants',
        whereJson: { _id: item._id },
        dataJson: { sort_num: item.sort_num, updated_at: Date.now() }
      })
    }
    return { code: 0, msg: '排序成功' }
  }
}
```

**Step 7: Commit**

```bash
git add xc/uniCloud-aliyun/cloudfunctions/router/service/admin/system/dept/
git commit -m "feat(tenant): add dept CRUD cloud functions (add/update/del/getList/getInfo/sort)"
```

---

## Task 4: 成员管理云函数

**Files:**
- Create: `service/admin/system/dept/sys/addMember.js`
- Create: `service/admin/system/dept/sys/removeMember.js`
- Create: `service/admin/system/dept/sys/getMembers.js`

**Step 1: 创建 addMember.js**

```js
module.exports = {
  /**
   * 添加成员到部门
   * @url admin/system/dept/sys/addMember
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util
    let { dept_id, user_id } = data
    if (!dept_id || !user_id) return { code: -1, msg: '缺少参数' }

    // 查询目标部门
    let dept = await vk.baseDao.findByWhereJson({
      dbName: 'xc-tenants',
      whereJson: { _id: dept_id }
    })
    if (!dept) return { code: -1, msg: '部门不存在' }
    if (dept.status === 0) return { code: -1, msg: '目标部门已停用' }

    // 查询用户当前归属
    let user = await vk.baseDao.findByWhereJson({
      dbName: 'uni-id-users',
      whereJson: { _id: user_id }
    })
    if (!user) return { code: -1, msg: '用户不存在' }

    // 如果用户已有部门，前端应先做确认弹窗
    // 此处直接执行更新

    await vk.baseDao.update({
      dbName: 'uni-id-users',
      whereJson: { _id: user_id },
      dataJson: {
        tenant_id: dept_id,
        dept_path: dept.dept_path,
        tenant_name: dept.name,
        dept_level: dept.dept_level
      }
    })

    return { code: 0, msg: '添加成功' }
  }
}
```

**Step 2: 创建 removeMember.js**

```js
module.exports = {
  /**
   * 从部门移除成员
   * @url admin/system/dept/sys/removeMember
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util
    let { user_id } = data
    if (!user_id) return { code: -1, msg: '缺少用户ID' }

    await vk.baseDao.update({
      dbName: 'uni-id-users',
      whereJson: { _id: user_id },
      dataJson: {
        tenant_id: _.remove(),
        dept_path: _.remove(),
        tenant_name: _.remove(),
        dept_level: _.remove()
      }
    })

    return { code: 0, msg: '移除成功' }
  }
}
```

**Step 3: 创建 getMembers.js**

```js
module.exports = {
  /**
   * 获取部门成员列表
   * @url admin/system/dept/sys/getMembers
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util
    let { dept_id, pageIndex = 1, pageSize = 20, keyword } = data
    if (!dept_id) return { code: -1, msg: '缺少部门ID' }

    let whereJson = { tenant_id: dept_id }
    if (keyword) {
      whereJson.$or = [
        { nickname: new RegExp(keyword, 'i') },
        { mobile: new RegExp(keyword, 'i') }
      ]
    }

    let listRes = await vk.baseDao.getTableData({
      dbName: 'uni-id-users',
      whereJson,
      pageIndex,
      pageSize,
      sortArr: [{ name: 'created_at', type: 'desc' }],
      fieldJson: {
        _id: true, nickname: true, avatar: true, mobile: true,
        role: true, created_at: true, tenant_id: true
      }
    })

    return {
      code: 0,
      msg: '',
      ...listRes
    }
  }
}
```

**Step 4: Commit**

```bash
git add xc/uniCloud-aliyun/cloudfunctions/router/service/admin/system/dept/sys/
git commit -m "feat(tenant): add member management cloud functions (addMember/removeMember/getMembers)"
```

---

## Task 5: tenantFilter 中间件

**Files:**
- Create: `xc/uniCloud-aliyun/cloudfunctions/router/middleware/modules/tenantFilter.js`

**Step 1: 创建中间件**

参考 `loginFilter.js` 的模式（`module.exports = [{ id, regExp, main }]`）。

```js
module.exports = [{
  id: 'tenantFilter',
  regExp: [], // 空数组 = 匹配所有路径
  description: '租户数据隔离过滤器',
  index: 350, // 在 loginFilter(310) 之后执行，确保 userInfo 已可用
  enable: true,
  mode: 'onActionExecuting',
  main: async function(event) {
    let { data = {}, userInfo, util, url } = event
    let { vk, db, _ } = util

    // 不需要登录的接口跳过（pub 目录）
    if (url && url.indexOf('user/pub/') === 0) {
      return { code: 0, msg: '' }
    }

    // 无用户信息则跳过（未登录场景由 loginFilter 处理）
    if (!userInfo || !userInfo._id) {
      return { code: 0, msg: '' }
    }

    let deptLevel = userInfo.dept_level
    let tenantId = userInfo.tenant_id

    // 集团级（dept_level === 0）：超管
    if (deptLevel === 0) {
      // 检查是否后台切换了部门视角
      let selectedTenantId = data._selected_tenant_id
      if (selectedTenantId) {
        // 注入选定部门的过滤条件
        if (!data.whereJson) data.whereJson = {}
        data.whereJson.tenant_id = selectedTenantId
      }
      // 不注入额外过滤，超管看全部
      return { code: 0, msg: '' }
    }

    // 未分配部门的用户：仅看 public
    if (!tenantId) {
      if (!data.whereJson) data.whereJson = {}
      data.whereJson.visibility = 'public'
      return { code: 0, msg: '' }
    }

    // 普通部门用户：注入 $or 条件
    if (!data.whereJson) data.whereJson = {}
    let cmd = db.command
    data.whereJson.$or = [
      { tenant_id: tenantId },
      { visibility: 'public' },
      {
        visibility: 'targeted',
        target_dept_ids: cmd.in([tenantId]),
        creator_dept_level: cmd.lte(deptLevel)
      }
    ]

    return { code: 0, msg: '' }
  }
}]
```

**Step 2: Commit**

```bash
git add xc/uniCloud-aliyun/cloudfunctions/router/middleware/modules/tenantFilter.js
git commit -m "feat(tenant): add tenantFilter middleware for data isolation"
```

---

## Task 6: 前台云函数 — 用户部门查询

**Files:**
- Create: `service/user/kh/dept/getMyDept.js`
- Create: `service/user/kh/dept/getDeptPath.js`

**Step 1: 创建 getMyDept.js**

```js
module.exports = {
  /**
   * 获取当前用户部门信息
   * @url user/kh/dept/getMyDept
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util

    let tenantId = userInfo.tenant_id
    if (!tenantId) {
      return { code: 0, msg: '未分配部门', data: null }
    }

    let dept = await vk.baseDao.findByWhereJson({
      dbName: 'xc-tenants',
      whereJson: { _id: tenantId }
    })

    return { code: 0, msg: '', data: dept }
  }
}
```

**Step 2: 创建 getDeptPath.js**

```js
module.exports = {
  /**
   * 获取部门层级路径（面包屑用）
   * @url user/kh/dept/getDeptPath
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util

    let tenantId = userInfo.tenant_id
    if (!tenantId) return { code: 0, msg: '', data: [] }

    // 查当前部门
    let dept = await vk.baseDao.findByWhereJson({
      dbName: 'xc-tenants',
      whereJson: { _id: tenantId }
    })
    if (!dept) return { code: 0, msg: '', data: [] }

    // 从 dept_path 解析父级 ID 链
    let pathIds = dept.dept_path.split('/').filter(Boolean)
    let pathList = []
    if (pathIds.length > 0) {
      let allDepts = await vk.baseDao.select({
        dbName: 'xc-tenants',
        whereJson: { _id: db.command.in(pathIds) },
        fieldJson: { _id: true, name: true, dept_level: true }
      })
      // 按 dept_path 中的顺序排列
      for (let id of pathIds) {
        let found = (allDepts.rows || allDepts).find(d => d._id === id)
        if (found) pathList.push(found)
      }
    }

    return { code: 0, msg: '', data: pathList }
  }
}
```

**Step 3: Commit**

```bash
git add xc/uniCloud-aliyun/cloudfunctions/router/service/user/kh/dept/
git commit -m "feat(tenant): add frontend dept query cloud functions (getMyDept/getDeptPath)"
```

---

## Task 7: 登录流程改造 — 注入租户上下文

**Files:**
- Modify: `xc/store/modules/$user.js`（或实际存在的 user store 文件）
- 可能 Modify: 登录成功后的回调逻辑

**Step 1: 确认登录回调位置**

检查 `xc/pages/login/` 或 `xc/store/` 中的登录逻辑，找到登录成功后写入 Vuex 的位置。

**Step 2: 在登录回调中追加租户字段**

登录成功后从 `uni-id-users` 读取的 `userInfo` 中提取 `tenant_id`、`dept_path`、`tenant_name`、`dept_level` 写入 Vuex。

**Step 3: 增加部门状态校验**

```js
// 登录成功后
if (userInfo.tenant_id) {
  // 查询部门状态
  let deptRes = await vk.callFunction({
    url: 'user/kh/dept/getMyDept'
  })
  if (deptRes.data && deptRes.data.status === 0) {
    // 部门已停用，跳转提示页
    vk.navigateTo('/pages/error/dept-disabled')
    return
  }
}
```

**Step 4: Commit**

```bash
git add xc/store/ xc/pages/
git commit -m "feat(tenant): inject tenant context on login, check dept status"
```

---

## Task 8: 后台部门管理页面

**Files:**
- Create: `xc-admin/pages_plugs/system/dept/list.vue`

**Step 1: 创建左右分栏管理页面**

- 左侧：`el-tree` 或列表展示所有部门（按 dept_level 分组）
- 右侧：`vk-data-form` 编辑表单
- 下方 tab：成员管理 `vk-data-table`
- 使用 @ui-ux-pro-max 和 @frontend-design 技能美化

**Step 2: 在后台菜单中注册页面路由**

在 `opendb-admin-menus` 集合中添加部门管理菜单项。

**Step 3: Commit**

```bash
git add xc-admin/pages_plugs/system/dept/
git commit -m "feat(tenant): add admin dept management page"
```

---

## Task 9: DeptSelector 后台组件

**Files:**
- Create: `xc-admin/components/dept-selector/DeptSelector.vue`

**Step 1: 创建级联选择器组件**

- 使用 `el-cascader`，数据源为 `admin/system/dept/sys/getList`
- 选择后存入 Vuex + localStorage
- 通过 `$emit('change', selectedDeptId)` 向外广播

**Step 2: 在后台 topWindow 中集成**

**Step 3: Commit**

```bash
git add xc-admin/components/dept-selector/
git commit -m "feat(tenant): add DeptSelector cascader component for admin"
```

---

## Task 10: VisibilitySetter 可见性配置组件

**Files:**
- Create: `xc-admin/components/visibility-setter/VisibilitySetter.vue`

**Step 1: 创建组件**

- 单选组：公开所有部门 / 仅本部门 / 指定部门
- 选择"指定部门"时展开部门多选（仅显示 `dept_level` ≥ 当前用户的部门）
- `v-model` 绑定 `{ visibility, target_dept_ids }`

**Step 2: Commit**

```bash
git add xc-admin/components/visibility-setter/
git commit -m "feat(tenant): add VisibilitySetter reusable component"
```

---

## Task 11: 前台部门信息页

**Files:**
- Create: `xc/pages_plugs/system/dept/info.vue`

**Step 1: 创建页面**

- 面包屑显示层级路径（调用 `user/kh/dept/getDeptPath`）
- 卡片展示部门名称、负责人、简介
- 使用 AppLayout 布局包裹

**Step 2: 在 pages.json 注册路由**

**Step 3: Commit**

```bash
git add xc/pages_plugs/system/dept/
git commit -m "feat(tenant): add frontend dept info page"
```

---

## Task 12: 集成验证

**Step 1: HBuilderX 编译验证**

运行 `npm run dev` 检查前台和后台的编译是否通过。

**Step 2: 手动功能验证**

1. 在 UniCloud 控制台确认 `xc-tenants` 集合和索引已创建
2. 通过后台页面创建 2-3 个部门（部室+车间）
3. 将测试用户分别分配到不同部门
4. 用不同部门用户登录前台，验证导航栏显示正确的部门名称
5. 创建测试业务数据（设置不同 visibility），交叉验证数据隔离

**Step 3: 最终 Commit**

```bash
git add .
git commit -m "feat(tenant): tenant management system - integration complete"
```
