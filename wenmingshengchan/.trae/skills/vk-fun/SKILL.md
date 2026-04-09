---
name: vk-fun
description: Use when writing cloud functions, calling cloud functions from frontend or admin pages, using vk.pubfn JS API, or working with vk-unicloud-router framework patterns including vk-data-table and vk-data-form components
---

# vk-fun：vk-unicloud-router 云函数开发规范

## 概述

本技能是 `vk-unicloud-router` 框架的完整开发参考指南。`vk-unicloud-router` 是基于 `uniCloud` + `uni-id` 的快速开发框架，采用**云函数路由模式** + `vk.baseDao` 进行数据库操作（主要在后端），内置大量前后端通用 API。

**核心理念**：数据库操作主要在后端（云函数），前端通过 `vk.callFunction` 调用云函数路由。

## 触发时机

- 编写云函数（router/service/ 目录下的 js 文件）
- 前端页面调用云函数（`vk.callFunction`）
- 使用 `vk.pubfn.*` 系列 JS API
- 后台 admin 页面使用万能表格（`vk-data-table`）或万能表单（`vk-data-form`）
- 配置代码格式化（Prettier）

## 核心规范索引

| 场景 | 参考文件 |
|------|----------|
| 云函数编写 | `.agent/skills/vk-fun/cloud-function-guide.md` |
| 前端调用云函数 | `.agent/skills/vk-fun/client-api-reference.md` |
| Admin 后台组件 | `.agent/skills/vk-fun/admin-api-reference.md` |
| JS API 速查 | `.agent/skills/vk-fun/jsapi-reference.md` |
| 代码格式化 | `.agent/skills/vk-fun/code-style.md` |

## 快速参考

### 前端调用云函数（三种方式）

```js
// 1. 回调形式（推荐页面使用）
vk.callFunction({
  url: 'user/kh/getInfo',
  title: '请求中...',
  data: { user_id: '001' },
  success: (data) => {},
  fail: (err) => {},
});

// 2. Promise
vk.callFunction({
  url: 'user/kh/getInfo',
  data: {},
}).then((data) => {}).catch((err) => {});

// 3. async/await（也支持云函数内调用）
let data = await vk.callFunction({
  url: 'user/kh/getInfo',
  data: {},
});
```

### 云函数标准模板

```js
// 路径: router/service/模块名/权限级别/函数名.js
// 权限级别: pub(公开) / kh(需登录) / sys(需管理员)
module.exports = {
  /**
   * 函数描述
   * @url 模块名/权限级别/函数名 
   * @description 功能说明
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };
    // 业务逻辑开始-----------------------------------------------------------

    // 业务逻辑结束-----------------------------------------------------------
    return res;
  },
};
```

### 防重复提交

表单提交请求**必须**加 `title` 或 `loading` 参数防止重复点击：

```js
// 方式1: title（显示遮罩层）
vk.callFunction({ url: '...', title: '提交中...', data: {} });

// 方式2: loading（控制按钮状态，体验更好）
vk.callFunction({ url: '...', loading: { that: this, name: 'submitLoading' }, data: {} });
```

### 常用 vk.pubfn API

| API | 说明 |
|-----|------|
| `vk.pubfn.timeFormat(date, format)` | 日期时间格式化 |
| `vk.pubfn.isNull(value)` | 判空（undefined/null/{}/[]/""均为空） |
| `vk.pubfn.isNotNull(value)` | 判非空 |
| `vk.pubfn.test(str, type)` | 格式检测（mobile/email/card等） |
| `vk.pubfn.copyObject(obj)` | 深拷贝（不含函数） |
| `vk.pubfn.deepClone(obj)` | 深度克隆（含函数） |
| `vk.pubfn.random(length, range)` | 生成随机数 |
| `vk.pubfn.arrayToTree(arr, props)` | 数组转树 |
| `vk.pubfn.treeToArray(tree, props)` | 树转数组 |
| `vk.pubfn.getCommonTime(date)` | 获取时间范围（今日/本月/本年等） |
| `vk.pubfn.debounce(fn, time)` | 防抖 |
| `vk.pubfn.throttle(fn, time)` | 节流 |

### Admin 万能表格/表单速查

```js
// 万能表格核心配置
<vk-data-table
  ref="table1"
  :action="'admin/模块/sys/getList'"
  :columns="table1.columns"
  :right-btns="['detail_auto','update','delete']"
  :pagination="true"
/>

// 万能表单核心配置
<vk-data-form
  ref="form1"
  v-model="form1.data"
  :action="form1.props.action"
  :columns="form1.props.columns"
  :rules="form1.props.rules"
  :form-type="form1.props.formType"
  @success="onFormSuccess"
/>
```

## 平台差异注意

| 平台 | `vk` 对象引用方式 |
|------|-------------------|
| H5/App(vue) | 直接使用 `vk` |
| 支付宝/百度/抖音小程序 | 使用 `uni.vk` 或在 `<script>` 首行 `let vk = uni.vk;` |
| NVUE 页面 | 使用 `uni.vk` |
| Vue3 setup | 使用 `const vk = uni.vk;` |
| template 模板中 | `vk.pubfn.xxx` 或简写 `$fn.xxx` |

## ⚠️ 常见致命陷阱

### `vk.baseDao.select()` 返回对象，不是数组！

这是**最常见的 bug 来源**，已多次导致页面显示空数据：

```js
// ❌ 错误写法：select 返回的是 { rows, total, pagination } 对象
let list = await vk.baseDao.select({ dbName: '表名', whereJson: {} });
vk.pubfn.arrayToTree(list, { ... }); // list 不是数组，返回空树！

// ✅ 正确写法：必须取 .rows
let result = await vk.baseDao.select({ dbName: '表名', whereJson: {}, pageSize: 500 });
let list = result.rows || [];
```

> **规则**：凡是使用 `select()` 或 `selects()` 的地方，**一律取 `.rows`**。
> `getTableData()` 同样返回对象，但通常直接 `return` 给前端，不需要手动取 `.rows`。

## 错误处理规范

- 默认 `code !== 0` 时进入 `fail` 回调并自动弹窗 `err.msg`
- 如果写了 `fail` 回调，则不会自动弹窗，需手动 `vk.alert(err.msg)`
- 如果 `fail` 内只是 `vk.alert(err.msg)`，则不需要写 `fail` 回调
