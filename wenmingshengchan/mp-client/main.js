import App from './App';
import store from './store';
import config from '@/app.config.js';

// 引入 uView UI
import uView from './uni_modules/vk-uview-ui';
// 引入 vk框架前端
import vk from './uni_modules/vk-unicloud';

// 环境路由器初始化函数（支持 AOP 劫持与挂起）
const initEnvRouter = () => {
  let isConfigLoaded = false;
  const requestQueue = [];
  uni.$app = uni.$app || {};

  // 1. 获取小程序版本信息
  const accountInfo = uni.getAccountInfoSync ? uni.getAccountInfoSync() : null;
  const currentVersion = (accountInfo && accountInfo.miniProgram && accountInfo.miniProgram.version) || 'develop';
  const cachedPassedVersion = uni.getStorageSync('app_env_passed_version');

  // 2. 本地缓存优先判定，过审版本实现零延迟启动
  if (cachedPassedVersion === currentVersion) {
    uni.$app.currentEnv = 'prod';
    isConfigLoaded = true;
  } else {
    uni.$app.currentEnv = 'default';
    isConfigLoaded = false;
  }

  // 3. 异步拉取最新审核状态
  vk.callFunction({
    url: 'client/pub/checkAuditStatus',
    data: { version: currentVersion },
    success: (res) => {
      if (res.code === 0 && res.isPassed) {
        uni.$app.currentEnv = 'prod';
        uni.setStorageSync('app_env_passed_version', currentVersion);
      } else {
        uni.$app.currentEnv = 'default';
        uni.removeStorageSync('app_env_passed_version');
      }
      releaseQueue();
    },
    fail: () => {
      uni.$app.currentEnv = 'default'; // 异常安全兜底，默认保留在审核态
      releaseQueue();
    }
  });

  // 4. AOP 劫持 vk.callFunction
  const originalCallFunction = vk.callFunction;
  vk.callFunction = function(options) {
    if (options.url === 'client/pub/checkAuditStatus' || options.env) {
      return originalCallFunction.call(this, options);
    }

    if (isConfigLoaded) {
      options.env = uni.$app.currentEnv;
      return originalCallFunction.call(this, options);
    }

    return new Promise((resolve, reject) => {
      requestQueue.push({
        options,
        resolve,
        reject,
        context: this
      });
    });
  };

  // 5. 释放队列
  function releaseQueue() {
    isConfigLoaded = true;
    while (requestQueue.length > 0) {
      const { options, resolve, reject, context } = requestQueue.shift();
      options.env = uni.$app.currentEnv;
      originalCallFunction.call(context || vk, options)
        .then(resolve)
        .catch(reject);
    }
  }
};

// #ifdef VUE2
import Vue from 'vue';

// 引入 uView UI
Vue.use(uView);

// 引入 vk框架前端
Vue.use(vk, config);

// 执行环境路由劫持
initEnvRouter();

// 全局计算属性与 onShow 路由守卫注入 Vue2
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
    if (whitelist.indexOf(route) > -1) return;
    // 拦截非通过状态的已登录用户
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

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
  store,
  ...App,
});

app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue';

export function createApp() {
  const app = createSSRApp(App);

  // 引入vuex
  app.use(store);

  // 引入 uView UI
  app.use(uView)

  // 引入 vk框架前端
  app.use(vk, config);

  // 执行环境路由劫持
  initEnvRouter();

  // 全局计算属性与 onShow 路由守卫注入 Vue3
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
      if (whitelist.indexOf(route) > -1) return;
      // 拦截非通过状态的已登录用户
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

  return { app };
}
// #endif
