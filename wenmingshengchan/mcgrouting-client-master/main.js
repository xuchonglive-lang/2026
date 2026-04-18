// main.js



import App from './App'
import store from './store'
import config from '@/app.config.js'

// 引入方法工具方法   并绑定为原型  在页面中使用的时候只用  this.$ultl.方法
import * as util from './utils/util.js'
// 挂载到Vue原型上，在组件页面中，直接通过 this.$util.throttle
Vue.prototype.$util = util



// 上拉下拉 插件注册在main.js注册全局组件 (mescroll-uni 遵循 easycom 规范, 可自动引入, 而mescroll-body需注册全局组件)
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
Vue.component('mescroll-body', MescrollBody)

// 引入 uView UI
import uView from 'uview-ui';
// 引入 vk框架前端
import vk from './uni_modules/vk-unicloud/vk_modules/vk-unicloud-page';

// #ifndef VUE3
import Vue from 'vue'

// 引入 uView UI
Vue.use(uView);

// 引入 vk框架前端
Vue.use(vk);

// 初始化 vk框架
Vue.prototype.vk.init({
  Vue,               // Vue实例
  config,	           // 配置
});

Vue.config.productionTip = false

App.mpType = 'app'

// 引入colorui的导航栏
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)



// 引入全局混入方法，全局可以直接利用this 进行引用使用
Vue.mixin({
	methods: {
		setData: function(obj, callback) {
			let that = this;
			const handleData = (tepData, tepKey, afterKey) => {
				tepKey = tepKey.split('.');
				tepKey.forEach(item => {
					if (tepData[item] === null || tepData[item] === undefined) {
						let reg = /^[0-9]+$/;
						tepData[item] = reg.test(afterKey) ? [] : {};
						tepData = tepData[item];
					} else {
						tepData = tepData[item];
					}
				});
				return tepData;
			};
			const isFn = function(value) {
				return typeof value == 'function' || false;
			};
			Object.keys(obj).forEach(function(key) {
				let val = obj[key];
				key = key.replace(/\]/g, '').replace(/\[/g, '.');
				let front, after;
				let index_after = key.lastIndexOf('.');
				if (index_after != -1) {
					after = key.slice(index_after + 1);
					front = handleData(that, key.slice(0, index_after), after);
				} else {
					after = key;
					front = that;
				}
				if (front.$data && front.$data[after] === undefined) {
					Object.defineProperty(front, after, {
						get() {
							return front.$data[after];
						},
						set(newValue) {
							front.$data[after] = newValue;
							that.$forceUpdate();
						},
						enumerable: true,
						configurable: true
					});
					front[after] = val;
				} else {
					that.$set(front, after, val);
				}
			});
			isFn(callback) && this.$nextTick(callback);
		}
	}
});



const app = new Vue({
  store,
  ...App
});

app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

import ClUni from "cl-uni";

Vue.use(ClUni, {
	// 进入业务单页时，页面栈只有一个，自定义导航左侧返回按钮跳转的路径
	homePage: "/"
});
export function createApp() {
  const app  = createSSRApp(App)
  
  // 引入vuex
  app.use(store)
  
  // 引入 uView UI
  app.use(uView)
  
  // 引入 vk框架前端
  app.use(vk);
  
  // // 初始化 vk框架
  // app.config.globalProperties.vk.init({
  //   Vue: app,          // Vue实例
  //   config,	           // 配置
  // });
  
  return { app }
}
// #endif