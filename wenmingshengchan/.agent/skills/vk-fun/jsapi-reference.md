# vk.pubfn JS API 完整参考

## 平台差异

| 平台 | 引用方式 |
|------|----------|
| H5/App(vue) | 直接 `vk.pubfn.xxx` |
| 小程序/NVUE | `uni.vk.pubfn.xxx` |
| Vue3 setup | `const vk = uni.vk; vk.pubfn.xxx` |
| template 模板 | `vk.pubfn.xxx` 或 `$fn.xxx` |

---

## 前后端通用 API

### 防抖与节流

```js
// 防抖：用户停止操作 time(ms) 后才执行
vk.pubfn.debounce(fn, time, key);
// fn: 回调函数, time: 延迟毫秒, key: 标识(可无)

// 节流：每 time(ms) 最多执行一次
vk.pubfn.throttle(fn, time, key);
```

### 数组与树互转

```js
// 数组转树
let tree = vk.pubfn.arrayToTree(arr, {
  id: '_id',
  parent_id: 'parent_id',
  children: 'children',
  need_field: [],
  root_value: 0,
});

// 树转数组
let arr = vk.pubfn.treeToArray(tree, {
  children: 'children',
});
```

### 延迟

```js
await vk.pubfn.sleep(1000); // 等待1秒
```

### 时间格式化

```js
// 格式化时间
vk.pubfn.timeFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
// 可选格式: yyyy MM dd hh mm ss S(毫秒) q(季度)
// 支持参数: timeZone(时区偏移小时)
```

### 获取日期信息

```js
let info = vk.pubfn.getDateInfo(new Date());
// 返回: { year, month, day, hour, minute, second, week, yearDay }
```

### 获取时间范围

```js
let time = vk.pubfn.getCommonTime(new Date());
/*  返回:
  todayStart/todayEnd          今日起止
  weekStart/weekEnd            本周起止
  monthStart/monthEnd          本月起止
  quarterStart/quarterEnd      本季起止
  yearStart/yearEnd            本年起止
  today0/today24               今日0点/24点
  now                          当前时间戳
*/
```

### 时间偏移

```js
// 获取偏移后的时间戳
let ts = vk.pubfn.getOffsetTime(new Date(), {
  type: 'day',    // year/month/day/hour/minute/second
  mode: -1,       // 1:向后偏移 -1:向前偏移
  value: 7,       // 偏移量
});

// 快捷偏移函数（返回 { startTime, endTime }）
vk.pubfn.getDayOffsetStartAndEnd(offset);     // 日偏移
vk.pubfn.getWeekOffsetStartAndEnd(offset);    // 周偏移
vk.pubfn.getMonthOffsetStartAndEnd(offset);   // 月偏移
vk.pubfn.getQuarterOffsetStartAndEnd(offset); // 季偏移
vk.pubfn.getYearOffsetStartAndEnd(offset);    // 年偏移
vk.pubfn.getHourOffsetStartAndEnd(offset);    // 时偏移
// offset: 0=本期, -1=上期, 1=下期
```

### 格式检测

```js
// 检测字符串是否满足指定格式
vk.pubfn.test(str, type);
// type: mobile, email, card, url, ip, date, time, dateTime, english, chinese,
//       lower, upper, HTML, QQ, postal, username, password/pwd, payPwd,
//       english+number, english+number+_, amount
// 第三个参数可设为 true 允许空值通过

// 结合表单验证使用
{ validator: vk.pubfn.validator('mobile'), message: '手机号格式错误', trigger: 'blur' }
```

### 对象操作

```js
// 浅拷贝（覆盖目标属性）
vk.pubfn.objectAssign(target, source);

// 浅拷贝（断开引用，不含函数）
let copy = vk.pubfn.copyObject(obj);

// 深度克隆（含函数）
let clone = vk.pubfn.deepClone(obj);

// 安全取值（支持.和[]语法）
let val = vk.pubfn.getData(obj, 'a.b.c', defaultValue);

// 安全赋值
vk.pubfn.setData(obj, 'a.b.c', value);

// 提取指定字段
let newObj = vk.pubfn.getNewObject(obj, ['name', 'age']);

// 删除指定字段
vk.pubfn.deleteObjectKeys(obj, ['password', 'token']);
```

### 判空系列

```js
vk.pubfn.isNull(value);            // 判空（undefined/null/""/[]/{}均为空）
vk.pubfn.isNotNull(value);         // 判非空
vk.pubfn.isNullOne(a, b, c);       // 任一为空返回true
vk.pubfn.isNullAll(a, b, c);       // 全部为空返回true
vk.pubfn.isNotNullAll(a, b, c);    // 全部非空返回true
vk.pubfn.isNullOneByObject(obj);   // 返回第一个空属性的key（或undefined）
```

### 数组操作

```js
// 合并数组去重（根据key去重，默认_id）
let merged = vk.pubfn.arr_concat(arr1, arr2, key);

// 查找元素
let item = vk.pubfn.getListItem(arr, key, value);        // 返回对象
let index = vk.pubfn.getListIndex(arr, key, value);       // 返回索引
let { item, index } = vk.pubfn.getListItemIndex(arr, key, value); // 返回两者

// 数组转对象（以某个字段为key）
let json = vk.pubfn.arrayToJson(arr, key);

// 提取数组内对象的指定字段
let values = vk.pubfn.arrayObjectGetArray(arr, key);
// 如: [{a:1},{a:2}] → [1, 2]

// 检测两数组是否有交集
let has = vk.pubfn.checkArrayIntersection(arr1, arr2);
```

### 随机数

```js
// 生成随机字符串
let str = vk.pubfn.random(length, range);
// length: 位数
// range: 可选字符集，默认数字+大小写字母
// 第三个参数: 已有值数组，确保不重复
```

### 字符串隐藏

```js
// 隐藏中间字符
let hidden = vk.pubfn.hidden(str, start, end, char);
// 如: hidden('15200000001', 3, 7) → '152****0001'
```

### 运费计算

```js
let freight = vk.pubfn.calcFreights({
  weight: 5000,        // 总重量(g)
  firstWeight: 1000,   // 首重(g)
  firstPrice: 12,      // 首重价格(分)
  additionalWeight: 1000, // 续重(g)
  additionalPrice: 6,    // 续重价格(分)
  maxWeight: 50000,    // 最大重量(g)
});
```

### 字符串与数字转换

```js
// 数字金额转中文大写
let cn = vk.pubfn.numToChinese(100.50);
// → "壹佰元伍角"

// 数字转万/亿单位
let str = vk.pubfn.priceFilter(15000);
// → "1.5万"
```

### 对比两个对象差异

```js
let diff = vk.pubfn.getObjectDiff(oldObj, newObj, exclude);
// exclude: 忽略的字段数组
// 返回: { key: { oldValue, newValue } }
```

---

## 前端专属 API

### 弹窗类

```js
vk.alert(msg);
vk.alert(msg, title, confirmText, callback);
vk.confirm(msg, callback);    // callback({ confirm })
vk.prompt(msg, callback);     // callback({ confirm, content })
vk.toast(msg, icon, duration);
vk.showLoading(msg);
vk.hideLoading();
vk.showActionSheet({ title, list, success });  // success({ index })
```

### 页面跳转类

```js
vk.navigateTo(url);        // 跳转（支持tab页）
vk.redirectTo(url);         // 关闭当前页跳转
vk.reLaunch(url);           // 关闭所有重新打开
vk.switchTab(url);          // 跳转tabBar
vk.navigateBack();          // 返回上一页
vk.navigateToHome();        // 跳转首页
vk.navigateToLogin(options); // 跳转登录页
vk.pubfn.checkLogin();      // 检测是否需要登录
```

### HTTP 请求（前端）

```js
// 前端 HTTP 请求
vk.request({
  url: 'https://www.xxx.com/api/xxxx',
  method: 'POST',
  header: { 'content-type': 'application/json' },
  data: {},
  success: (data) => {},
  fail: (err) => {},
});
```

### 手机列表分页

```js
vk.pubfn.getListData({
  that: this,
  url: '云函数路径',
  listName: 'rows',
  data: {},
  dataPreprocess: (list) => list,
});
```

### 当前页面信息

```js
let page = vk.pubfn.getCurrentPage();
// page.fullPath  完整路径（含参数）
// page.route     路径（不含参数）
// page.options   页面参数
// page.$vm       vue实例
```

### 文件与 Base64

```js
// 文件转base64
vk.pubfn.fileToBase64({ file: file, success: (base64) => {} });

// base64转文件
vk.pubfn.base64ToFile({ base64: base64, success: (file) => {} });
```

### Excel 解析（仅 admin H5）

```js
// 解析 xlsx 文件
vk.pubfn.parseXlsxFile({
  file: file,
  mode: 1,  // 1: 对象数组, 2: 二维数组
}).then((result) => {});
```

### 全局配置

```js
let config = vk.getConfig();           // 所有配置
let url = vk.getConfig('login.url');   // 指定配置
```

### 事件函数

```js
vk.notifyEventReady('event', data);           // 通知事件就绪
let data = await vk.awaitEventReady('event');  // 等待事件就绪
vk.checkEventReady('event');                   // 检查是否就绪
vk.getEventReadyData('event');                 // 获取就绪数据
```

---

## 云函数专属 API

### 并发执行

```js
// 有数据源
await vk.pubfn.batchRun({
  main: async (item, index) => { return result; },
  concurrency: 50,
  data: [item1, item2, ...],
});

// 无数据源（多个异步函数并发）
await vk.pubfn.batchRun({
  main: [async () => {}, async () => {}],
  concurrency: 10,
});
```

### 请求 ID

```js
let requestId = vk.pubfn.getUniCloudRequestId();
```

### 异步不重复随机数

```js
let code = await vk.pubfn.randomAsync(
  6,                                    // 长度
  '23456789ABCDEFGHJKLMNPQRSTUVWXYZ',   // 可选字符
  async (val) => {                       // 重复判断函数
    let num = await vk.baseDao.count({
      dbName: 'uni-id-users',
      whereJson: { my_invite_code: val },
    });
    return num === 0;
  },
  10                                     // 最大重试次数
);
```

### 云端 HTTP 请求

```js
// 云端必须 await，无回调
let res = await vk.request({
  url: 'https://www.xxx.com/api/xxxx',
  method: 'POST',
  data: {},
  header: { 'content-type': 'application/json; charset=utf-8' },
});
```
