# 日治理计划管理 实现计划

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 实现日治理计划模块的全部云函数接口（C端4个+B端5个）和前端页面（C端2个+B端1个），支持计划派发→多人反馈→验收闭环的完整业务流程。

**Architecture:** 基于 VK UniCloud Router 的云函数分层架构。C端云函数位于 `service/client/plan/`，B端位于 `service/admin/plan/sys/`。前端 C端使用 Vue 2 小程序页面，B端使用 VK Admin `vk-data-table` + `vk-data-form`。状态机采用4物理态+2被动感知计算态设计。

**Tech Stack:** Vue 2 + VK UniCloud Router + 阿里云 UniCloud + `vk.baseDao` / `_.push()` / `foreignDB`

**Design Doc:** `specs/日治理计划管理-提案.md`

---

## Task 1: 数据库集合与公共工具函数

**Files:**
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/common/plan-utils.js`
- Reference: `specs/日治理计划管理-提案.md` (五、数据与字段设计)

**Step 1: 创建数据库集合 `daily-plan`**

在 UniCloud 控制台（或本地 db_init.json）创建集合 `daily-plan`，添加以下索引：

| 索引名称 | 字段 | 类型 |
| --- | --- | --- |
| `idx_date_status` | `{ plan_date: 1, status: 1 }` | 普通 |
| `idx_dept_date` | `{ dept_id: 1, plan_date: 1 }` | 普通 |
| `idx_assignee_date` | `{ assignee_target: 1, plan_date: 1 }` | 普通 |
| `idx_issuer_date` | `{ issuer_uid: 1, plan_date: 1 }` | 普通 |

**Step 2: 创建公共工具函数 `plan-utils.js`**

```javascript
// mp-client/uniCloud-aliyun/cloudfunctions/router/service/common/plan-utils.js
'use strict';

/**
 * 日治理计划模块 - 公共工具函数
 */
module.exports = {
  /**
   * 计算计划的展示状态（被动感知逾期/超时）
   * @param {Object} plan - 计划记录，需包含 status 和 plan_date
   * @returns {Number} 展示状态: 1/2/3/4/5/6
   */
  getDisplayStatus(plan) {
    const deadline = new Date(plan.plan_date + ' 23:59:59').getTime();
    const now = Date.now();
    const isExpired = now > deadline;
    // 物理终态直接返回
    if (plan.status === 5) return 5;
    // 被动感知
    if (isExpired) {
      if (plan.status === 2) return 4; // 超时未验收
      if (plan.status === 1 || plan.status === 3) return 6; // 已逾期
    }
    return plan.status;
  },

  /**
   * 判断计划是否允许提交反馈
   * @param {Object} plan - 计划记录
   * @param {String} uid - 当前用户ID
   * @param {String} userDeptId - 当前用户部门ID
   * @returns {{ allowed: Boolean, code: Number, msg: String }}
   */
  checkCanSubmit(plan, uid, userDeptId) {
    // 1. 身份校验：用户是否在执行人范围中
    let isAssignee = false;
    if (plan.assignee_type === 'users') {
      isAssignee = plan.assignee_target && plan.assignee_target.includes(uid);
    } else if (plan.assignee_type === 'group') {
      isAssignee = plan.assignee_target && plan.assignee_target.includes(userDeptId);
    }
    if (!isAssignee) {
      return { allowed: false, code: 71003, msg: '您不是该任务的指定执行人' };
    }
    // 2. 状态校验
    if (plan.status === 5) {
      return { allowed: false, code: 71004, msg: '该任务已完成，不可再操作' };
    }
    if (![1, 2, 3].includes(plan.status)) {
      return { allowed: false, code: 71004, msg: '该任务当前状态不允许提交反馈' };
    }
    // 3. 时限校验
    const deadline = new Date(plan.plan_date + ' 23:59:59').getTime();
    if (Date.now() > deadline) {
      return { allowed: false, code: 71001, msg: '已逾期，不能提交' };
    }
    return { allowed: true };
  },

  /**
   * 状态字典映射
   */
  statusDict: {
    1: '执行中',
    2: '已提交',
    3: '未达标',
    4: '超时未验收',
    5: '已完成',
    6: '已逾期'
  }
};
```

**Step 3: 验证文件创建成功**

确认文件路径和语法正确。

**Step 4: Commit**

```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/common/plan-utils.js
git commit -m "feat(daily-plan): add database collection and utility functions"
```

---

## Task 2: C端云函数 — getTodoCount

**Files:**
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/plan/kh/getTodoCount.js`

**Step 1: 创建 getTodoCount 云函数**

```javascript
// mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/plan/kh/getTodoCount.js
'use strict';
module.exports = {
  /**
   * 首页我的待办计划数量
   * @url client/plan/kh/getTodoCount
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };

    // 获取当前用户部门ID
    let userDoc = await vk.baseDao.findById({
      dbName: 'uni-id-users',
      id: uid,
      fieldJson: { department_id: 1 }
    });
    if (!userDoc) return { code: -1, msg: '用户信息异常' };
    let deptId = userDoc.department_id;

    // 今日日期
    let today = vk.pubfn.getCommonTime(Date.now()).substring(0, 10);

    // 查询条件：今日 + 可反馈状态(1执行中 or 3未达标) + 我是执行人
    let dbCmd = db.command;
    let count = await db.collection('daily-plan').where(
      dbCmd.and([
        { plan_date: today },
        { status: dbCmd.in([1, 3]) },
        dbCmd.or([
          { assignee_type: 'users', assignee_target: dbCmd.in([uid]) },
          { assignee_type: 'group', assignee_target: dbCmd.in([deptId]) }
        ])
      ])
    ).count();

    res.data = { count: count.total || 0 };
    return res;
  }
};
```

**Step 2: 手动测试**

通过 VK 调试工具或小程序端调用 `client/plan/kh/getTodoCount` 验证返回 `{ code: 0, data: { count: 0 } }` 结构。

**Step 3: Commit**

```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/plan/
git commit -m "feat(daily-plan): add getTodoCount cloud function"
```

---

## Task 3: C端云函数 — getList（双Tab）

**Files:**
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/plan/kh/getList.js`

**Step 1: 创建 getList 云函数**

```javascript
// mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/plan/kh/getList.js
'use strict';
const planUtils = require('../../common/plan-utils');
module.exports = {
  /**
   * 日计划列表查询（双Tab）
   * @url client/plan/kh/getList
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };

    let { tab = 'all', plan_date, page_index = 1, page_size = 20 } = data;
    let dbCmd = db.command;

    // 默认今天
    if (!plan_date) {
      plan_date = vk.pubfn.getCommonTime(Date.now()).substring(0, 10);
    }

    let whereJson = { plan_date: plan_date };

    // Tab2: 我的任务，追加身份过滤
    if (tab === 'mine') {
      let userDoc = await vk.baseDao.findById({
        dbName: 'uni-id-users',
        id: uid,
        fieldJson: { department_id: 1 }
      });
      let deptId = userDoc ? userDoc.department_id : '';
      whereJson = dbCmd.and([
        whereJson,
        dbCmd.or([
          { assignee_type: 'users', assignee_target: dbCmd.in([uid]) },
          { assignee_type: 'group', assignee_target: dbCmd.in([deptId]) }
        ])
      ]);
    }

    let listRes = await vk.baseDao.getTableData({
      dbName: 'daily-plan',
      whereJson: whereJson,
      pageIndex: page_index,
      pageSize: page_size,
      sortArr: [{ name: 'create_time', type: 'desc' }],
      foreignDB: [
        {
          dbName: 'base-area',
          localKey: 'area_id',
          foreignKey: '_id',
          as: '_area',
          limit: 1
        },
        {
          dbName: 'base-dept',
          localKey: 'dept_id',
          foreignKey: '_id',
          as: '_dept',
          limit: 1
        },
        {
          dbName: 'uni-id-users',
          localKey: 'issuer_uid',
          foreignKey: '_id',
          as: '_issuer',
          limit: 1
        }
      ]
    });

    // 被动感知计算展示状态
    if (listRes.rows) {
      listRes.rows.forEach(item => {
        item.display_status = planUtils.getDisplayStatus(item);
        item.area_name = item._area && item._area[0] ? item._area[0].name : '';
        item.dept_name = item._dept && item._dept[0] ? item._dept[0].name : '';
        item.issuer_name = item._issuer && item._issuer[0] ? item._issuer[0].real_name : '';
        item.feedback_count = item.feedbacks ? item.feedbacks.length : 0;
      });
    }

    res.data = listRes;
    return res;
  }
};
```

**Step 2: 手动测试**

分别测试 `tab=all` 和 `tab=mine` 两种模式，验证返回结构。

**Step 3: Commit**

```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/plan/kh/getList.js
git commit -m "feat(daily-plan): add getList cloud function with dual-tab support"
```

---

## Task 4: C端云函数 — submitFeedback（3层防护栈）

**Files:**
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/plan/kh/submitFeedback.js`

**Step 1: 创建 submitFeedback 云函数**

```javascript
// mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/plan/kh/submitFeedback.js
'use strict';
const planUtils = require('../../common/plan-utils');
module.exports = {
  /**
   * 执行人提交反馈（3层防护栈）
   * @url client/plan/kh/submitFeedback
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };

    let { plan_id, imgs, remark = '' } = data;

    // 入参校验
    if (!plan_id) return { code: -1, msg: 'plan_id 不能为空' };
    if (!imgs || !Array.isArray(imgs) || imgs.length === 0) {
      return { code: -1, msg: '请至少上传一张照片' };
    }
    if (imgs.length > 9) return { code: -1, msg: '最多上传9张照片' };

    // 查询计划记录
    let plan = await vk.baseDao.findById({
      dbName: 'daily-plan',
      id: plan_id
    });
    if (!plan) return { code: -1, msg: '计划不存在' };

    // 获取用户部门ID
    let userDoc = await vk.baseDao.findById({
      dbName: 'uni-id-users',
      id: uid,
      fieldJson: { department_id: 1 }
    });
    let userDeptId = userDoc ? userDoc.department_id : '';

    // ===== 3层防护栈 =====
    let check = planUtils.checkCanSubmit(plan, uid, userDeptId);
    if (!check.allowed) {
      return { code: check.code, msg: check.msg };
    }

    // 原子性操作：_.push() 追加反馈 + 更新状态为2(已提交)
    let dbCmd = db.command;
    await db.collection('daily-plan').doc(plan_id).update({
      feedbacks: dbCmd.push({
        uid: uid,
        time: Date.now(),
        imgs: imgs,
        remark: remark
      }),
      status: 2
    });

    res.msg = '反馈提交成功';
    return res;
  }
};
```

**Step 2: 测试场景覆盖**

- 正常提交（status=1，未过期）→ 成功
- 重复提交（status=2，未过期）→ 成功（叠加）
- 逾期提交 → code: 71001
- 非执行人提交 → code: 71003
- 已完成后提交 → code: 71004

**Step 3: Commit**

```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/plan/kh/submitFeedback.js
git commit -m "feat(daily-plan): add submitFeedback with 3-layer protection stack"
```

---

## Task 5: C端云函数 — getDetail + verifyTask

**Files:**
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/plan/kh/getDetail.js`
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/plan/kh/verifyTask.js`

**Step 1: 创建 getDetail 云函数**

```javascript
// mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/plan/kh/getDetail.js
'use strict';
const planUtils = require('../../common/plan-utils');
module.exports = {
  /**
   * 计划详情查询
   * @url client/plan/kh/getDetail
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };

    let { plan_id } = data;
    if (!plan_id) return { code: -1, msg: 'plan_id 不能为空' };

    // 查询计划
    let plan = await vk.baseDao.findById({
      dbName: 'daily-plan',
      id: plan_id
    });
    if (!plan) return { code: -1, msg: '计划不存在' };

    // 关联查询区域名称
    if (plan.area_id) {
      let area = await vk.baseDao.findById({ dbName: 'base-area', id: plan.area_id, fieldJson: { name: 1 } });
      plan.area_name = area ? area.name : '';
    }
    // 关联下达人姓名
    if (plan.issuer_uid) {
      let issuer = await vk.baseDao.findById({ dbName: 'uni-id-users', id: plan.issuer_uid, fieldJson: { real_name: 1 } });
      plan.issuer_name = issuer ? issuer.real_name : '';
    }
    // 关联反馈人姓名
    if (plan.feedbacks && plan.feedbacks.length > 0) {
      let feedbackUids = [...new Set(plan.feedbacks.map(f => f.uid))];
      let users = await db.collection('uni-id-users').where({ _id: db.command.in(feedbackUids) }).field({ real_name: 1 }).get();
      let nameMap = {};
      (users.data || []).forEach(u => { nameMap[u._id] = u.real_name; });
      plan.feedbacks.forEach(f => { f.user_name = nameMap[f.uid] || ''; });
    }
    // 关联验收人姓名
    if (plan.verify_result && plan.verify_result.uid) {
      let verifier = await vk.baseDao.findById({ dbName: 'uni-id-users', id: plan.verify_result.uid, fieldJson: { real_name: 1 } });
      plan.verify_result.user_name = verifier ? verifier.real_name : '';
    }
    // 关联执行人显示
    if (plan.assignee_type === 'group' && plan.assignee_target) {
      let depts = await db.collection('base-dept').where({ _id: db.command.in(plan.assignee_target) }).field({ name: 1 }).get();
      plan.assignee_names = (depts.data || []).map(d => d.name);
    } else if (plan.assignee_type === 'users' && plan.assignee_target) {
      let usrs = await db.collection('uni-id-users').where({ _id: db.command.in(plan.assignee_target) }).field({ real_name: 1 }).get();
      plan.assignee_names = (usrs.data || []).map(u => u.real_name);
    }

    // 被动感知
    plan.display_status = planUtils.getDisplayStatus(plan);

    // 计算操作权限
    let userDoc = await vk.baseDao.findById({ dbName: 'uni-id-users', id: uid, fieldJson: { department_id: 1, role: 1 } });
    let userDeptId = userDoc ? userDoc.department_id : '';
    let userRoles = userDoc ? (userDoc.role || []) : [];

    let checkSubmit = planUtils.checkCanSubmit(plan, uid, userDeptId);
    plan.can_submit = checkSubmit.allowed;
    plan.can_verify = userRoles.includes('plan_admin') && plan.status === 2 && plan.dept_id === userDeptId;
    // super_admin 也可验收
    if (userRoles.includes('super_admin') && plan.status === 2) {
      plan.can_verify = true;
    }

    res.data = plan;
    return res;
  }
};
```

**Step 2: 创建 verifyTask 云函数**

```javascript
// mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/plan/kh/verifyTask.js
'use strict';
module.exports = {
  /**
   * 计划员验收操作
   * @url client/plan/kh/verifyTask
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };

    let { plan_id, passed, remark = '' } = data;
    if (!plan_id) return { code: -1, msg: 'plan_id 不能为空' };
    if (typeof passed !== 'boolean') return { code: -1, msg: 'passed 参数必须为布尔值' };
    if (!passed && !remark) return { code: -1, msg: '驳回时必须填写理由' };

    // 获取用户信息
    let userDoc = await vk.baseDao.findById({ dbName: 'uni-id-users', id: uid, fieldJson: { department_id: 1, role: 1 } });
    let userRoles = userDoc ? (userDoc.role || []) : [];
    let userDeptId = userDoc ? userDoc.department_id : '';

    // 角色校验
    if (!userRoles.includes('plan_admin') && !userRoles.includes('super_admin')) {
      return { code: 71005, msg: '您没有验收权限' };
    }

    // 查询计划
    let plan = await vk.baseDao.findById({ dbName: 'daily-plan', id: plan_id });
    if (!plan) return { code: -1, msg: '计划不存在' };

    // 归属校验（plan_admin 仅可验收本部门）
    if (!userRoles.includes('super_admin') && plan.dept_id !== userDeptId) {
      return { code: 71006, msg: '该计划不属于您的部门' };
    }

    // 状态校验
    if (plan.status !== 2) {
      return { code: 71007, msg: '该计划当前状态不可验收' };
    }

    // 写入验收结果
    await db.collection('daily-plan').doc(plan_id).update({
      verify_result: {
        uid: uid,
        time: Date.now(),
        passed: passed,
        remark: remark
      },
      status: passed ? 5 : 3
    });

    res.msg = passed ? '验收通过' : '验收驳回';
    return res;
  }
};
```

**Step 3: Commit**

```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/plan/kh/getDetail.js
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/plan/kh/verifyTask.js
git commit -m "feat(daily-plan): add getDetail and verifyTask cloud functions"
```

---

## Task 6: B端云函数 — createTask / updateTask / deleteTask

**Files:**
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/plan/sys/add.js`
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/plan/sys/update.js`
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/plan/sys/delete.js`

**Step 1: 创建 add.js（createTask）**

```javascript
// mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/plan/sys/add.js
'use strict';
module.exports = {
  /**
   * 创建日计划
   * @url admin/plan/sys/add
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };

    let { title, content_standard, area_id, plan_date, assignee_type, assignee_target } = data;

    // 入参校验
    if (!title) return { code: -1, msg: '计划标题必须填写' };
    if (!content_standard) return { code: -1, msg: '执行标准必须填写' };
    if (!area_id) return { code: -1, msg: '执行区域必须选择' };
    if (!plan_date) return { code: -1, msg: '计划日期必须选择' };
    if (!assignee_type || !['group', 'users'].includes(assignee_type)) {
      return { code: -1, msg: '派发方式不合法' };
    }
    if (!assignee_target || !Array.isArray(assignee_target) || assignee_target.length === 0) {
      return { code: -1, msg: '必须指定执行人' };
    }

    // 获取操作人部门ID
    let userDoc = await vk.baseDao.findById({ dbName: 'uni-id-users', id: uid, fieldJson: { department_id: 1 } });
    let deptId = userDoc ? userDoc.department_id : '';

    res.id = await vk.baseDao.add({
      dbName: 'daily-plan',
      dataJson: {
        dept_id: deptId,
        title: title,
        content_standard: content_standard,
        area_id: area_id,
        plan_date: plan_date,
        issuer_uid: uid,
        assignee_type: assignee_type,
        assignee_target: assignee_target,
        status: 1,
        feedbacks: [],
        verify_result: null
      }
    });

    res.msg = '计划创建成功';
    return res;
  }
};
```

**Step 2: 创建 update.js（updateTask）**

```javascript
// mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/plan/sys/update.js
'use strict';
module.exports = {
  /**
   * 修改日计划（仅无反馈数据时允许）
   * @url admin/plan/sys/update
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    let { _id } = data;
    if (!_id) return { code: -1, msg: '_id 不能为空' };

    // 查询原记录
    let plan = await vk.baseDao.findById({ dbName: 'daily-plan', id: _id });
    if (!plan) return { code: -1, msg: '计划不存在' };

    // 事实数据保护
    if (plan.feedbacks && plan.feedbacks.length > 0) {
      return { code: 71008, msg: '该计划已有反馈数据，不可修改基本信息' };
    }

    // 允许修改的字段
    let updateData = {};
    ['title', 'content_standard', 'area_id', 'plan_date', 'assignee_type', 'assignee_target'].forEach(key => {
      if (data[key] !== undefined) updateData[key] = data[key];
    });

    await vk.baseDao.updateById({
      dbName: 'daily-plan',
      id: _id,
      dataJson: updateData
    });

    res.msg = '修改成功';
    return res;
  }
};
```

**Step 3: 创建 delete.js（deleteTask）**

```javascript
// mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/plan/sys/delete.js
'use strict';
module.exports = {
  /**
   * 删除日计划（仅无反馈数据时允许）
   * @url admin/plan/sys/delete
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    let { _id } = data;
    if (!_id) return { code: -1, msg: '_id 不能为空' };

    let plan = await vk.baseDao.findById({ dbName: 'daily-plan', id: _id });
    if (!plan) return { code: -1, msg: '计划不存在' };

    if (plan.feedbacks && plan.feedbacks.length > 0) {
      return { code: 71009, msg: '该计划已有反馈数据，不可删除' };
    }

    await vk.baseDao.deleteById({
      dbName: 'daily-plan',
      id: _id
    });

    res.msg = '删除成功';
    return res;
  }
};
```

**Step 4: Commit**

```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/plan/
git commit -m "feat(daily-plan): add B-end CRUD cloud functions"
```

---

## Task 7: B端云函数 — getList + getStatistics

**Files:**
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/plan/sys/getList.js`
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/plan/sys/getStatistics.js`

**Step 1: 创建 getList.js（B端管理列表）**

```javascript
// mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/plan/sys/getList.js
'use strict';
const planUtils = require('../../../common/plan-utils');
module.exports = {
  /**
   * B端日计划列表（支持多维筛选+树状下钻隔离）
   * @url admin/plan/sys/getList
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };

    let { page_index = 1, page_size = 20, date_start, date_end, dept_id, area_id, status: queryStatus } = data;
    let dbCmd = db.command;

    // 构建查询条件
    let whereJson = {};
    if (date_start && date_end) {
      whereJson.plan_date = dbCmd.gte(date_start).and(dbCmd.lte(date_end));
    } else if (date_start) {
      whereJson.plan_date = dbCmd.gte(date_start);
    }
    if (area_id) whereJson.area_id = area_id;
    if (queryStatus) whereJson.status = Number(queryStatus);

    // 权限隔离：非 super_admin 自动追加部门过滤
    let userDoc = await vk.baseDao.findById({ dbName: 'uni-id-users', id: uid, fieldJson: { department_id: 1, role: 1 } });
    let userRoles = userDoc ? (userDoc.role || []) : [];
    if (!userRoles.includes('super_admin')) {
      let userDeptId = userDoc ? userDoc.department_id : '';
      // 简化处理：匹配本部门（如需树状下钻可递归 base-dept 获取子部门集）
      whereJson.dept_id = dept_id || userDeptId;
    } else if (dept_id) {
      whereJson.dept_id = dept_id;
    }

    let listRes = await vk.baseDao.getTableData({
      dbName: 'daily-plan',
      whereJson: whereJson,
      pageIndex: page_index,
      pageSize: page_size,
      sortArr: [{ name: 'create_time', type: 'desc' }],
      foreignDB: [
        { dbName: 'base-area', localKey: 'area_id', foreignKey: '_id', as: '_area', limit: 1 },
        { dbName: 'base-dept', localKey: 'dept_id', foreignKey: '_id', as: '_dept', limit: 1 },
        { dbName: 'uni-id-users', localKey: 'issuer_uid', foreignKey: '_id', as: '_issuer', limit: 1 }
      ]
    });

    // 被动感知 + 数据整形
    if (listRes.rows) {
      listRes.rows.forEach(item => {
        item.display_status = planUtils.getDisplayStatus(item);
        item.area_name = item._area && item._area[0] ? item._area[0].name : '';
        item.dept_name = item._dept && item._dept[0] ? item._dept[0].name : '';
        item.issuer_name = item._issuer && item._issuer[0] ? item._issuer[0].real_name : '';
        item.feedback_count = item.feedbacks ? item.feedbacks.length : 0;
      });
    }

    res.data = listRes;
    return res;
  }
};
```

**Step 2: 创建 getStatistics.js**

统计汇总接口（P2优先级，可后置实现，先创建骨架）。

```javascript
// mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/plan/sys/getStatistics.js
'use strict';
const planUtils = require('../../../common/plan-utils');
module.exports = {
  /**
   * 统计汇总与导出
   * @url admin/plan/sys/getStatistics
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let res = { code: 0, msg: '' };

    let { date_start, date_end, dept_id } = data;
    if (!date_start || !date_end) return { code: -1, msg: '日期范围必填' };

    let dbCmd = db.command;
    let whereJson = { plan_date: dbCmd.gte(date_start).and(dbCmd.lte(date_end)) };
    if (dept_id) whereJson.dept_id = dept_id;

    let allPlans = await db.collection('daily-plan').where(whereJson).get();
    let list = allPlans.data || [];

    let total = list.length;
    let completed = 0, overdue = 0, rejected = 0, timeout = 0;

    list.forEach(plan => {
      let ds = planUtils.getDisplayStatus(plan);
      if (ds === 5) completed++;
      else if (ds === 6) overdue++;
      else if (ds === 3) rejected++;
      else if (ds === 4) timeout++;
    });

    res.data = {
      total,
      completed,
      overdue,
      rejected,
      timeout,
      completion_rate: total > 0 ? Math.round(completed / total * 100) : 0
    };
    return res;
  }
};
```

**Step 3: Commit**

```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/plan/sys/getList.js
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin/plan/sys/getStatistics.js
git commit -m "feat(daily-plan): add B-end getList and getStatistics"
```

---

## Task 8: C端页面 — 日计划列表页 (`/pages/plan/list`)

**Files:**
- Modify: `mp-client/pages/plan/list/index.vue`

**Step 1: 实现日计划列表页（含双Tab交互）**

基于提案 4.2 节的页面设计，实现完整的 Vue 2 页面组件，包含：
- 顶部日期选择器
- Tab 栏（全部计划 / 我的任务）
- 列表卡片（点位名称、区域、状态标签等）
- 下拉刷新和点击跳转

> 参考 `specs/日治理计划管理-提案.md` 4.2 节的布局结构和交互细节。

**Step 2: 验证页面渲染效果**

在小程序开发工具中预览页面，确认双Tab切换、日期筛选、列表渲染正常。

**Step 3: Commit**

```bash
git add mp-client/pages/plan/list/index.vue
git commit -m "feat(daily-plan): implement plan list page with dual tabs"
```

---

## Task 9: C端页面 — 详情与操作页 (`/pages/plan/feedback`)

**Files:**
- Modify: `mp-client/pages/plan/feedback/index.vue`

**Step 1: 实现日计划详情与操作页（三合一）**

基于提案 4.3 节的页面设计，实现包含：
- 区域A：计划基础信息展示
- 区域B：反馈流水时间轴
- 区域C：验收意见展示
- 区域D：动态交互（反馈表单 / 验收按钮，按 can_submit / can_verify 条件显隐）
- 照片上传组件、防抖提交

> 参考 `specs/日治理计划管理-提案.md` 4.3 节的布局结构和交互细节。

**Step 2: 验证交互流程**

测试场景：
1. 执行人视角：能看到反馈表单，提交后刷新
2. 计划员视角：能看到验收按钮，验收后刷新
3. 已完成/已逾期：无操作区域

**Step 3: Commit**

```bash
git add mp-client/pages/plan/feedback/index.vue
git commit -m "feat(daily-plan): implement plan detail and feedback page"
```

---

## Task 10: B端页面 — 日计划管理总台 (`/pages/plan/plan-list`)

**Files:**
- Modify: `mp-admin/pages/plan/plan-list.vue`

**Step 1: 实现B端日计划管理总台**

基于提案 4.4 节的页面设计，使用 `vk-data-table` + `vk-data-form` 实现：
- 高级检索面板（日期范围、部门、区域、状态）
- 数据表格（含 foreignDB 关联字段、状态dict标签）
- 新增/编辑弹窗表单
- 详情抽屉（时间轴生命周期视图）
- 导出Excel功能

> 参考 `specs/日治理计划管理-提案.md` 4.4 节的字段定义和交互细节。
> 参考现有模块如 `mp-admin/pages/feedback/point-config.vue` 的 vk-data-table 用法。

**Step 2: 验证功能**

1. 新增计划 → 表格刷新显示
2. 编辑计划（无反馈时可编辑）
3. 删除计划（无反馈时可删除）
4. 检索筛选正常
5. 详情抽屉展示生命周期

**Step 3: Commit**

```bash
git add mp-admin/pages/plan/plan-list.vue
git commit -m "feat(daily-plan): implement B-end plan management console"
```

---

## Task 11: 集成测试与角色更新

**Files:**
- Modify: 用户管理相关配置（追加 `plan_admin` 角色选项）
- Reference: 全部已创建文件

**Step 1: 追加 plan_admin 角色**

在B端用户管理页面的角色选择器配置中追加 `plan_admin` 选项。需检查用户管理模块的角色配置位置（通常在 `user-list.vue` 的 `role` 字段 dict 配置中）。

**Step 2: 端到端集成测试**

完整流程验证：
1. B端：计划员创建一条日计划 → 确认 status=1
2. C端：执行人看到待办 → 提交反馈 → 确认 status=2
3. C端：计划员看到已提交 → 验收驳回 → 确认 status=3
4. C端：执行人再次提交 → 确认 status=2
5. C端：计划员验收通过 → 确认 status=5（终态）
6. C端：尝试再提交 → 确认被拒绝

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat(daily-plan): complete integration and role setup"
```
