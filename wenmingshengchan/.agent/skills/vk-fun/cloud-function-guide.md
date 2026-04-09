# 云函数编写规范

## 目录结构约定

云函数使用**路由模式**，所有业务逻辑写在 `router/service/` 目录下：

```
uniCloud/
  cloudfunctions/
    router/                    # 路由云函数（主入口）
      service/                 # 业务逻辑目录
        模块名/                # 按业务模块划分
          pub/                 # 公开接口（无需登录）
            函数名.js
          kh/                  # 需登录接口（kh = 客户）
            函数名.js
          sys/                 # 需管理员权限接口
            函数名.js
      middleware/              # 中间件目录
        modules/
          过滤器名.js
      dao/                     # 数据访问层
        modules/
          表名Dao.js
```

### 权限级别说明

| 目录 | 权限 | 说明 |
|------|------|------|
| `pub/` | 公开 | 任何人可调用，无需登录 |
| `kh/` | 需登录 | 需要用户登录后才能调用，自动获取 `userInfo` |
| `sys/` | 管理员 | 需要管理员权限才能调用 |

## 云函数标准模板

```js
'use strict';

module.exports = {
  /**
   * 获取用户信息
   * @url user/kh/getInfo
   * @description 根据用户ID获取用户详细信息
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

### event 对象解构

| 属性 | 说明 |
|------|------|
| `data` | 前端传过来的请求参数 |
| `userInfo` | 当前登录用户信息（kh/sys 目录下自动获取） |
| `util` | 工具集合对象 |
| `filterResponse` | 中间件过滤后的数据 |
| `originalParam` | 前端原始请求参数 |

### util 工具对象

| 属性 | 说明 |
|------|------|
| `vk` | vk 框架实例（含 `vk.pubfn.*`、`vk.baseDao.*` 等） |
| `db` | 数据库实例 |
| `_` | 数据库查询指令（如 `_.gt(0)`、`_.inc(1)`） |
| `uniID` | uni-id 实例 |
| `config` | 全局配置 |
| `pubFun` | 公共函数 |
| `customUtil` | 自定义工具 |

## 返回值规范

```js
// 成功返回
return { code: 0, msg: '操作成功', ...其他数据 };

// 失败返回
return { code: -1, msg: '错误提示信息' };
```

- `code: 0` 表示成功，进入前端 `success` 回调
- `code` 非 `0` 表示失败，进入前端 `fail` 回调

## 数据库操作 (vk.baseDao)

> **⚠️ 致命陷阱：`select()` / `selects()` 返回的不是数组！**
>
> `vk.baseDao.select()` 和 `vk.baseDao.selects()` 返回的是 **对象** `{ rows: [...], total, hasMore, pagination }`，**不是数组**。
> 必须用 `.rows` 取出实际数据数组，否则传给 `arrayToTree()` 等函数会静默返回空结果。
>
> ```js
> // ❌ 错误：allCategories 是对象，.length 为 undefined
> let allCategories = await vk.baseDao.select({ dbName: '表名', whereJson: {} });
> let tree = vk.pubfn.arrayToTree(allCategories, { ... }); // 永远返回空数组！
>
> // ✅ 正确：取 .rows
> let result = await vk.baseDao.select({ dbName: '表名', whereJson: {} });
> let allCategories = result.rows || [];
> let tree = vk.pubfn.arrayToTree(allCategories, { ... }); // 正常工作
> ```
>
> **对比其他 API 的返回值**：
> | API | 返回值 |
> |-----|--------|
> | `select()` / `selects()` | **对象** `{ rows, total, pagination }` — 必须取 `.rows` |
> | `getTableData()` | **对象** `{ rows, ... }` — 通常直接 return 给前端 |
> | `findById()` / `findByWhereJson()` | **单条记录对象** 或 `null` |
> | `add()` | **字符串** `_id` |
> | `count()` | **数字** |

### 增删改查

```js
// 添加
let id = await vk.baseDao.add({
  dbName: '表名',
  dataJson: { name: '张三', age: 18 },
});

// 删除
await vk.baseDao.del({
  dbName: '表名',
  whereJson: { _id: 'xxx' },
});

// 修改
await vk.baseDao.update({
  dbName: '表名',
  whereJson: { _id: 'xxx' },
  dataJson: { name: '李四' },
});

// 查询单条
let info = await vk.baseDao.findById({
  dbName: '表名',
  id: 'xxx',
});

// 查询单条（条件查询）
let info = await vk.baseDao.findByWhereJson({
  dbName: '表名',
  whereJson: { mobile: '15200000001' },
});
```

### 分页查询

```js
// 分页列表（配合万能表格使用，getTableData 返回对象可直接 return）
let listRes = await vk.baseDao.getTableData({
  dbName: '表名',
  pageIndex: data.pageIndex,
  pageSize: data.pageSize,
  whereJson: {},
  sortArr: [{ name: '_add_time', type: 'desc' }],
  fieldJson: {},           // 只返回指定字段
  foreignDB: [],           // 连表查询
});
return listRes;
```

### 全量查询（⚠️ 注意返回值）

```js
// ⚠️ select() 返回对象，不是数组！必须取 .rows
let result = await vk.baseDao.select({
  dbName: '表名',
  whereJson: { status: 1 },
  pageSize: 500,           // 默认 pageSize=10，查全量务必设大
  sortArr: [{ name: 'sort', type: 'asc' }],
});
let list = result.rows || [];  // ← 取 .rows 才是数组
```

### 常用查询指令

```js
let _ = db.command;

// 大于/小于
whereJson: { age: _.gt(18) }           // 大于18
whereJson: { age: _.gte(18) }          // 大于等于18
whereJson: { age: _.lt(60) }           // 小于60
whereJson: { age: _.lte(60) }          // 小于等于60

// 不等于
whereJson: { status: _.neq(0) }

// 包含/不包含
whereJson: { status: _.in([1, 2, 3]) }
whereJson: { status: _.nin([0]) }

// 模糊搜索
whereJson: { name: new RegExp(keyword) }

// 与/或
whereJson: { age: _.gt(18).and(_.lt(60)) }
whereJson: { _id: _.or(_.eq('001'), _.eq('002')) }

// 数组包含
whereJson: { tags: _.all(['tag1', 'tag2']) }

// 字段存在
whereJson: { avatar: _.exists(true) }

// 自增/自减
dataJson: { count: _.inc(1) }          // 自增1
dataJson: { count: _.inc(-1) }         // 自减1

// 数组追加/移除
dataJson: { tags: _.push('newTag') }
dataJson: { tags: _.pull('oldTag') }
```

### 连表查询 (foreignDB)

```js
let listRes = await vk.baseDao.getTableData({
  dbName: 'order',
  pageIndex: data.pageIndex,
  pageSize: data.pageSize,
  foreignDB: [
    {
      dbName: 'uni-id-users',
      localKey: 'user_id',
      foreignKey: '_id',
      as: 'userInfo',
      limit: 1,
    },
    {
      dbName: 'goods',
      localKey: 'goods_id',
      foreignKey: '_id',
      as: 'goodsInfo',
      limit: 1,
    },
  ],
});
```

### 聚合查询

```js
let count = await vk.baseDao.count({
  dbName: '表名',
  whereJson: { status: 1 },
});

let sum = await vk.baseDao.sum({
  dbName: '表名',
  fieldName: 'money',
  whereJson: { status: 1 },
});
```

## 中间件 (Middleware)

中间件用于在云函数执行前后拦截请求。

```js
// router/middleware/modules/filterName.js
module.exports = [
  {
    id: 'filterName',
    regExp: '^模块名/',          // 正则匹配需要拦截的云函数路径
    description: '拦截器描述',
    index: 100,                  // 执行顺序（越小越先执行）
    mode: 'onActionExecuting',   // onActionExecuting(前置) / onActionExecuted(后置)
    enable: true,
    main: async function (event) {
      let { data = {}, util } = event;
      let { vk } = util;
      // 拦截逻辑
      return { code: 0, msg: 'ok' }; // code:0 通过，其他拦截
    },
  },
];
```

## 云函数内调用另一个云函数

```js
let callRes = await vk.callFunction({
  url: '模块名/权限级别/函数名',
  data: { ... },
});
```

## 云端 HTTP 请求

```js
// 云端请求必须加 await，没有 success/fail 回调
let requestRes = await vk.request({
  url: 'https://www.xxx.com/api/xxxx',
  method: 'POST',
  header: { 'content-type': 'application/json; charset=utf-8' },
  data: {},
});
```

## 云端并发执行 (batchRun)

```js
// 有数据源形式（批量操作）
let batchRunRes = await vk.pubfn.batchRun({
  main: async (item, index) => {
    // 对每个 item 执行操作
    return { code: 0, index };
  },
  concurrency: 50,   // 最大并发量
  data: [{ a: 1 }, { a: 2 }, { a: 3 }],
});

// 无数据源形式（多个不同异步函数并发）
let batchRunRes = await vk.pubfn.batchRun({
  main: [
    async () => { return await someFunc1(); },
    async () => { return await someFunc2(); },
  ],
  concurrency: 10,
});
```

## 云函数加密通信

### 云端强制加密中间件

```js
// router/middleware/modules/encryptFilter.js
module.exports = [
  {
    id: 'encryptFilter',
    regExp: ['^template/encrypt/(.*)'],
    description: '加密函数拦截器',
    index: 10,
    mode: 'onActionExecuting',
    enable: true,
    main: async function (event) {
      if (!event.encrypt) {
        return { code: 413, msg: '请求非法，请求参数未加密' };
      }
      return { code: 0, msg: 'ok' };
    },
  },
];
```
