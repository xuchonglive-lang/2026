import App from './App'
import store from './store'
import config from '@/app.config.js'

// 引入 uView UI
// import uView from './uni_modules/vk-uview-ui';
// 引入 vk框架前端
import vk from './uni_modules/vk-unicloud';

// #ifdef VUE2
import Vue from 'vue'

// 引入 uView UI
// Vue.use(uView);

// 引入 vk框架前端
Vue.use(vk, config);

Vue.config.productionTip = false

// 全局注册布局组件
import AppLayout from '@/components/layout/AppLayout.vue'
import TopNavBar from '@/components/layout/TopNavBar.vue'
import BottomTabBar from '@/components/layout/BottomTabBar.vue'
import DrawerMenu from '@/components/layout/DrawerMenu.vue'
import PageFooter from '@/components/layout/PageFooter.vue'
import SideMenu from '@/components/layout/SideMenu.vue'

Vue.component('app-layout', AppLayout)
Vue.component('top-nav-bar', TopNavBar)
Vue.component('bottom-tab-bar', BottomTabBar)
Vue.component('drawer-menu', DrawerMenu)
Vue.component('page-footer', PageFooter)
Vue.component('side-menu', SideMenu)

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
});

app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)

  // 引入vuex
  app.use(store)

  // 引入 uView UI
  // app.use(uView)

  // 引入 vk框架前端
  app.use(vk, config);

  return { app }
}
// #endif