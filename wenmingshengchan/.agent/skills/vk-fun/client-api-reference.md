# 前端调用云函数规范

## vk.callFunction

在前端页面调用云函数时，**必须使用 `vk.callFunction`**，不使用 `uniCloud.callFunction`。

### 三种调用方式

```js
// 1. 回调形式（页面中推荐使用）
vk.callFunction({
  url: '云函数路径',
  title: '请求中...',
  data: {},
  success: (data) => {},
  fail: (err) => {},
  complete: (res) => {},
});

// 2. Promise
vk.callFunction({
  url: '云函数路径',
  title: '请求中...',
  data: {},
}).then((data) => {}).catch((err) => {});

// 3. async/await（也可在云函数内使用）
let data = await vk.callFunction({
  url: '云函数路径',
  title: '请求中...',
  data: {},
});
```

### 完整参数列表

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | String | router | 路由云函数名 |
| url | String | - | 请求路径（service 目录下的路径） |
| data | Object | - | 请求参数 |
| title | String | - | 遮罩层提示语（空则不显示。与 loading 二选一） |
| loading | Boolean/Object | - | 自定义 loading 控制 |
| isRequest | Boolean | false | 是否使用 URL 化方式调用 |
| needAlert | Boolean | true | 错误时是否弹窗 |
| timeout | Number | - | 超时时间(ms) |
| retryCount | Number | 0 | 异常重试次数（仅查询请求使用） |
| encrypt | Boolean | false | 是否加密通信 |
| secretType | String | none | 安全网络类型（none/request/response/both） |

### loading 参数详解

```js
// false：不显示遮罩
loading: false

// true：自动控制 this.loading 变量
loading: true

// Object：自定义控制变量
loading: { that: this, name: 'submitLoading' }

// 支持路径
loading: { that: this, name: 'page.loading' }

// Vue3 setup 模式
const loading = reactive({ a: false });
loading: { that: loading, name: 'a' }
```

### 防重复提交规范

> **必须规则**：表单提交请求必须加 `title` 或 `loading` 参数防止重复点击。

```js
// ❌ 错误：表单提交没有防重复
vk.callFunction({
  url: 'order/kh/create',
  data: { goods_id: '001' },
  success: (data) => {},
});

// ✅ 正确：使用 title 防重复
vk.callFunction({
  url: 'order/kh/create',
  title: '提交中...',
  data: { goods_id: '001' },
  success: (data) => {},
});

// ✅ 正确：使用 loading 防重复（体验更好）
vk.callFunction({
  url: 'order/kh/create',
  loading: { that: this, name: 'submitLoading' },
  data: { goods_id: '001' },
  success: (data) => {},
});
```

### 错误处理

- 默认 `code !== 0` 时进入 `fail` 回调，自动弹窗 `err.msg`
- 写了 `fail` 回调后不会自动弹窗，需手动 `vk.alert(err.msg)`
- 若 `fail` 内只有 `vk.alert(err.msg)`，则不需要写 `fail` 回调

### 加密通信

```js
// 单独指定某个请求加密
vk.callFunction({
  url: 'template/test/pub/testEncryptRequest',
  encrypt: true,
  data: { a: 1 },
  success: (data) => {},
});
```

### URL 化调用

```js
// isRequest: true 使用 URL 化调用
vk.callFunction({
  url: 'user/kh/setAvatar',
  title: '请求中...',
  isRequest: true,
  data: { avatar: 'https://xxx.jpg' },
  success: (data) => {},
});
```

### 请求拦截器

```js
// 写在 App.vue 的 onLaunch 中
uniCloud.addInterceptor('callFunction', {
  invoke: (res) => {
    // 请求发出前
    res.data.data.a = 1; // 新增请求参数
  },
  success: (res) => {
    // 请求成功后
  },
  fail: (err) => {},
  complete: (res) => {},
});
```

## 弹窗 API

```js
// alert
vk.alert('内容');
vk.alert('内容', '提示', '确定', () => { /* 回调 */ });

// confirm
vk.confirm('内容', (res) => {
  if (res.confirm) { /* 确定 */ }
});

// prompt
vk.prompt('请输入', (res) => {
  if (res.confirm) { console.log(res.content); }
});

// toast
vk.toast('提示内容');
vk.toast('提示内容', 'success');
vk.toast('提示内容', 'none', 1000);

// showLoading / hideLoading
vk.showLoading('加载中...');
vk.hideLoading();

// showActionSheet
vk.showActionSheet({
  title: '',
  list: ['选项1', '选项2'],
  success: (res) => { /* res.index */ },
});
```

## 页面跳转 API

使用 vk 的页面跳转 API（非 `uni.navigateTo`），框架会**自动判断**目标页面是否需要登录：

```js
vk.navigateTo(url);       // 跳转（支持tab页）
vk.redirectTo(url);        // 关闭当前页跳转
vk.reLaunch(url);          // 关闭所有页重新打开
vk.switchTab(url);         // 跳转tabBar页
vk.navigateBack();         // 返回上一页
vk.navigateToHome();       // 跳转首页
vk.navigateToLogin();      // 跳转登录页
```

### 登录页跳转详细用法

```js
// 默认：关闭所有页面跳转登录页
vk.navigateToLogin();

// 不关闭页面，登录成功自动返回
vk.navigateToLogin({ mode: 'navigateTo' });

// 关闭所有，登录成功返回当前页
vk.navigateToLogin({ needBack: true });

// 指定登录成功后跳转的页面
vk.navigateToLogin({ redirectUrl: '页面地址' });
```

### 页面间通信

```js
// A页面跳转B页面并监听返回数据
vk.navigateTo({
  url: '页面地址',
  events: {
    update: (data) => { /* B页面返回时触发 */ },
  },
  success: (res) => {
    res.eventChannel.emit('data', { b: 2 }); // 向B页面传数据
  },
});

// B页面接收数据
const eventChannel = this.getOpenerEventChannel();
if (eventChannel.on) {
  eventChannel.on('data', (data) => { /* 收到A页面数据 */ });
}

// B页面返回时触发A页面逻辑
const eventChannel = this.getOpenerEventChannel();
if (eventChannel.emit) eventChannel.emit('update', { a: 1 });
vk.navigateBack();
```

## 登录检测页面配置

在 `app.config.js` 中配置：

```js
checkTokenPages: {
  // mode=0 自动检测 | mode=1 list内需登录 | mode=2 list内不需登录
  mode: 2,
  list: [
    "/pages_template/*",
    "/pages/login/*",
    "/pages/error/*"
  ]
},
```

## 事件函数

```js
// 通知事件就绪
vk.notifyEventReady('事件名', { a: 1 });

// 等待事件就绪（回调/Promise/async-await 均可）
let data = await vk.awaitEventReady('事件名');

// 检查事件是否就绪
if (vk.checkEventReady('事件名')) { /* ... */ }

// 获取事件就绪数据（不等待）
let data = vk.getEventReadyData('事件名');
```

### 等待 onLaunch 完成后执行 onLoad

```js
// App.vue onLaunch
async onLaunch() {
  setTimeout(() => {
    uni.vk.notifyEventReady('onLaunch', { a: 1 });
  }, 2000);
},

// 页面 onLoad
async onLoad() {
  let data = await vk.awaitEventReady('onLaunch');
  // onLaunch 已就绪，开始执行
},
```

## 角色与权限判断

```js
// js 中
if (this.$hasRole('admin', 'user-manage')) { /* 有角色 */ }
if (this.$hasPermission('user-update')) { /* 有权限 */ }

// template 中
<button v-if="$hasRole('admin')">管理按钮</button>
<button v-if="$hasPermission('user-update')">修改</button>
```

## 全局配置

```js
let config = vk.getConfig();           // 获取所有配置
let url = vk.getConfig('login.url');   // 获取指定配置
```

## 手机端长列表分页

```js
vk.pubfn.getListData({
  that: this,
  url: 'db_test/pub/select',
  listName: 'rows',
  data: { a: 1 },
  dataPreprocess: (list) => { return list; },
});
```
