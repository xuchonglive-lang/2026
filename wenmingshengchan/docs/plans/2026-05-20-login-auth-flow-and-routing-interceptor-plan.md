# 微信授权登录与全局路由拦截实施计划

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 优化新用户授权登录流程，实现先确认授权再云端建档，同时使用全局 mixin onShow 拦截未完善/未审核用户，确保账号安全性。

**Architecture:** 前端登录触发 `type: 'login'` 静默查询，针对未注册新用户拦截并拉起授权框，待确认后调用 `type: 'register'` 写入数据库；全局 mixin 拦截核心页面 onShow 生命周期，凡已登录但审核状态不为 3 的用户重定向到注册/审核展示页。

**Tech Stack:** uni-app, Vue2/Vue3, uniCloud (vk-unicloud-router)

---

### 任务清单表 (用于更新 docs/plans/task.md)
我们需在 `docs/plans/task.md` 底部追加以下任务：
| 编号 | 任务名称 | 状态 | 详细说明 |
| --- | --- | --- | --- |
| 30 | [实施阶段] 任务1：main.js Vue2 全局拦截 Mixin 实现 | pending | 在 main.js 中为 Vue2 环境的全局 Mixin 添加 onShow 页面审计拦截 |
| 31 | [实施阶段] 任务2：main.js Vue3 全局拦截 Mixin 实现 | pending | 在 main.js 中为 Vue3 环境的全局 Mixin 添加 onShow 页面审计拦截 |
| 32 | [实施阶段] 任务3：login/index.vue 授权流程控制优化 | pending | 在登录页 handleWechatAuth 和 onAuthAccept 中分离 login 与 register 请求逻辑 |

---

### Task 1: main.js Vue2 全局拦截 Mixin 实现

**Files:**
* Modify: `d:/AI project/2026/wenmingshengchan/mp-client/main.js:97-104`

**Step 1: 代码实现**
替换 Vue2 全局 Mixin 注入块为带有 `onShow` 拦截的逻辑：
```javascript
// 全局计算属性与生命周期注入 Vue2
Vue.mixin({
  computed: {
    currentEnv() {
      return uni.$app.currentEnv || 'default';
    }
  },
  onShow() {
    const pages = getCurrentPages();
    if (pages.length === 0) return;
    const currentPage = pages[pages.length - 1];
    const route = currentPage.route;

    // 白名单页面直接放行
    const whitelist = [
      'pages/user/login/index',
      'pages/user/register/index',
      'pages/user/audit-status/index',
      'pages/user/mine/index',
      'pages/index/visitor'
    ];
    if (whitelist.indexOf(route) > -1) {
      return;
    }

    // 拦截非通过状态用户
    const userInfo = (uni.vk && uni.vk.getVuex && uni.vk.getVuex('$user.userInfo')) || {};
    if (userInfo && userInfo._id) {
      const status = userInfo.audit_status;
      if (status !== 3) {
        if (status === 0 || status === undefined) {
          uni.reLaunch({ url: '/pages/user/register/index' });
        } else if (status === 1 || status === 2) {
          uni.reLaunch({ url: '/pages/user/audit-status/index' });
        }
      }
    }
  }
});
```

**Step 2: 编译与代码检查**
检查 `main.js` 文件是否有语法错误。

**Step 3: Commit**
```bash
git add main.js
git commit -m "feat: add Vue2 global onShow navigation interceptor mixin"
```

---

### Task 2: main.js Vue3 全局拦截 Mixin 实现

**Files:**
* Modify: `d:/AI project/2026/wenmingshengchan/mp-client/main.js:136-143`

**Step 1: 代码实现**
替换 Vue3 全局 Mixin 注入块为带有 `onShow` 拦截的逻辑：
```javascript
  // 全局计算属性与生命周期注入 Vue3
  app.mixin({
    computed: {
      currentEnv() {
        return uni.$app.currentEnv || 'default';
      }
    },
    onShow() {
      const pages = getCurrentPages();
      if (pages.length === 0) return;
      const currentPage = pages[pages.length - 1];
      const route = currentPage.route;

      // 白名单页面直接放行
      const whitelist = [
        'pages/user/login/index',
        'pages/user/register/index',
        'pages/user/audit-status/index',
        'pages/user/mine/index',
        'pages/index/visitor'
      ];
      if (whitelist.indexOf(route) > -1) {
        return;
      }

      // 拦截非通过状态用户
      const userInfo = (uni.vk && uni.vk.getVuex && uni.vk.getVuex('$user.userInfo')) || {};
      if (userInfo && userInfo._id) {
        const status = userInfo.audit_status;
        if (status !== 3) {
          if (status === 0 || status === undefined) {
            uni.reLaunch({ url: '/pages/user/register/index' });
          } else if (status === 1 || status === 2) {
            uni.reLaunch({ url: '/pages/user/audit-status/index' });
          }
        }
      }
    }
  });
```

**Step 2: 编译与代码检查**
确保 Vue3 语法无编译报错。

**Step 3: Commit**
```bash
git add main.js
git commit -m "feat: add Vue3 global onShow navigation interceptor mixin"
```

---

### Task 3: login/index.vue 授权流程控制优化

**Files:**
* Modify: `d:/AI project/2026/wenmingshengchan/mp-client/pages/user/login/index.vue`

**Step 1: 代码实现**
修改 `handleWechatAuth` 和 `onAuthAccept` 方法，添加对 `type` 参数的严格逻辑控制，区分静默登录查阅和正式建档。

```javascript
    async handleWechatAuth() {
      // 第一阶段：发起 type: 'login' 不注册的纯代码静默通讯
      uni.showLoading({ title: '安全信道建立中...' });

      try {
        const [loginErr, loginRes] = await uni.login({ provider: 'weixin' });
        if (loginErr || !loginRes.code) throw new Error('微信通信链路异常');

        // 发起静默登录验证，限制仅登录，不进行自动注册
        let res = await uni.vk.callFunction({
          url: 'client/user/pub/loginByWeixin',
          data: {
            code: loginRes.code,
            type: 'login' // 核心：仅尝试登录
          }
        });

        uni.hideLoading();

        if (res.code === 0) {
          if(res.userInfo) {
            this.vk.setVuex('$user.userInfo', res.userInfo);
          }

          // 核心拦截判断：用户是否有过我们为其填充的微信昵称与头像？
          let hasAvatarAndNickname = res.userInfo && res.userInfo.nickname && res.userInfo.avatar;

          if (!hasAvatarAndNickname) {
            // 已建档但信息缺失，唤醒头像昵称授权组件补充
            this.$refs.authDialog.show();
            return;
          }

          // 正常登录放行
          this.routeUser(res.userInfo);
        } else {
          // 判断是否为新用户未注册错误 (10001, 90001, 30201 等，或带有"未注册/不存在/未绑定"字样)
          const unregisteredCodes = [10001, 90001, 30201, 30202, 30203, 30204];
          const isUnregistered = unregisteredCodes.includes(res.code) || 
            (res.msg && (res.msg.indexOf('未注册') > -1 || res.msg.indexOf('不存在') > -1 || res.msg.indexOf('未绑定') > -1));

          if (isUnregistered) {
            // 是新用户，在数据库无任何记录的阶段直接拉起授权组件
            this.$refs.authDialog.show();
          } else {
            uni.showToast({ title: res.msg || '鉴权被系统拒绝', icon: 'none' });
          }
        }
      } catch (e) {
        uni.hideLoading();
        uni.showToast({ title: e.message || '网络断开无响应', icon: 'none' });
      }
    },
```

在 `onAuthAccept` 中，传入 `type: 'register'` 以在确认授权时正式建档：
```javascript
    async onAuthAccept(userInfoForm) {
      uni.showLoading({ title: '凭据构建与入库中...' });

      try {
        let finalAvatar = userInfoForm.avatar;
        let finalNickname = userInfoForm.nickname;

        if (finalAvatar && (finalAvatar.startsWith('http://tmp') || finalAvatar.startsWith('wxfile://') || finalAvatar.startsWith('file://'))) {
          let uploadRes = await uni.vk.callFunctionUtil.uploadFile({
            filePath: finalAvatar,
            fileType: "image",
            needSave: false
          });
          if (uploadRes && uploadRes.url) {
            finalAvatar = uploadRes.url;
          }
        }

        // 因为之前那个 code 已经被消耗掉了，再次为正式提交获取一枚新 code！
        const [loginErr, loginRes] = await uni.login({ provider: 'weixin' });
        if (loginErr || !loginRes.code) throw new Error('通信链路异常');

        // 第二阶段：携带着确认的个人资料和 type: 'register' 执行建档和注册
        let res = await uni.vk.callFunction({
          url: 'client/user/pub/loginByWeixin',
          data: {
            code: loginRes.code,
            type: 'register', // 确认建档注册
            userInfo: {
              avatar: finalAvatar,
              nickname: finalNickname
            }
          }
        });

        uni.hideLoading();

        if (res.code === 0) {
          if(res.userInfo) {
            this.vk.setVuex('$user.userInfo', res.userInfo);
          }
          this.$refs.authDialog.hide();
          uni.showToast({ title: '身份烙印成功', icon: 'none', duration: 1500 });

          setTimeout(() => {
            this.routeUser(res.userInfo);
          }, 1000);
        } else {
          uni.showToast({ title: res.msg || '入库发生阻断', icon: 'none' });
        }
      } catch (e) {
        uni.hideLoading();
        uni.showToast({ title: e.message || '网络断开无响应', icon: 'none' });
      }
    }
```

**Step 2: 编译与代码检查**
确保登录页文件编译正常，不存在遗留的语法或未定义变量问题。

**Step 3: Commit**
```bash
git add pages/user/login/index.vue
git commit -m "feat: enforce confirm authorization before registering user in DB"
```
