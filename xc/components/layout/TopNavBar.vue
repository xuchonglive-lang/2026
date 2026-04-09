<template>
  <view class="navbar flex flex-row items-center justify-between bg-base-100/95 shadow-sm sticky top-0 w-full z-50 backdrop-blur-md tracking-tight border-b border-base-200">
    <!-- PC 端导航 -->
    <template v-if="isPc">
      <view class="max-w-[1350px] mx-auto flex items-center justify-between w-full px-0">
        <view class="flex-none flex items-center gap-2">
          <image class="w-8 h-8" src="/static/logo.png" mode="aspectFit" />
          <text class="text-xl font-bold ml-1 text-base-content">办公应用平台</text>
          <view class="divider divider-horizontal mx-1"></view>
        </view>
        <view class="flex-1 hidden lg:flex justify-start ml-8">
          <ul class="flex flex-row items-center px-1 gap-2">
            <li v-for="item in navMenu" :key="item.path" class="list-none">
              <a class="flex items-center justify-center cursor-pointer transition-all duration-200 text-[16px] px-3 py-2"
                 :class="{'text-zinc-900': isActive(item.path), 'text-zinc-500 hover:text-zinc-900': !isActive(item.path)}" 
                 @click="navigateTo(item.path)">
                <span class="relative font-bold">
                  {{ item.title }}
                  <div v-if="isActive(item.path)" class="absolute -bottom-1 left-0 w-full h-[3px] bg-zinc-900 rounded-full"></div>
                </span>
              </a>
            </li>
          </ul>
        </view>
        <view class="flex-none flex justify-end items-center gap-3">
          <a class="btn btn-ghost btn-sm text-base-content/60 hover:text-base-content rounded-md" @click="navigateTo('/pages/pro-mgmt/my-docs')">
            Documentation <span class="text-[10px] ml-1">↗</span>
          </a>
          <button class="btn btn-ghost btn-circle" @click="navigateTo('/pages/message/list')">
            <view class="indicator">
              <text class="text-xl">🔔</text>
              <span v-if="unreadCount > 0" class="badge badge-sm badge-error indicator-item text-white">
                {{ unreadCount > 99 ? '99+' : unreadCount }}
              </span>
            </view>
          </button>
          <text class="text-xs text-base-content/60">{{ deptName }}</text>
          <view class="avatar cursor-pointer transition-transform hover:scale-105" @click="handleAvatarClick">
            <div class="w-9 h-9 rounded-full ring ring-transparent hover:ring-primary ring-offset-base-100 ring-offset-2 duration-300">
              <image :src="userAvatar || '/static/logo.png'" mode="aspectFill" />
            </div>
          </view>
        </view>
      </view>
    </template>

    <!-- H5 端导航 -->
    <template v-else>
      <view class="navbar-start">
        <button class="btn btn-ghost btn-circle" @click="$emit('toggle-drawer')">
          <text class="text-2xl">☰</text>
        </button>
      </view>
      <view class="navbar-center">
        <text class="text-lg font-bold">{{ pageTitle || '办公应用平台' }}</text>
      </view>
      <view class="navbar-end gap-1 px-2">
        <button class="btn btn-ghost btn-circle btn-sm" @click="navigateTo('/pages/message/list')">
          <view class="indicator">
            <text class="text-lg">🔔</text>
            <span v-if="unreadCount > 0" class="badge badge-[10px] badge-error indicator-item text-white px-1">
              {{ unreadCount > 99 ? '99+' : unreadCount }}
            </span>
          </view>
        </button>
        <view class="avatar cursor-pointer" @click="handleAvatarClick">
          <div class="w-7 h-7 rounded-full">
            <image :src="userAvatar || '/static/logo.png'" mode="aspectFill" />
          </div>
        </view>
      </view>
    </template>
  </view>
</template>

<script>
import { mainNavMenu } from '@/common/config/nav-menu.js'

export default {
  name: 'TopNavBar',
  props: {
    isPc: { type: Boolean, default: true },
    pageTitle: { type: String, default: '' },
  },
  data() {
    return {
      navMenu: mainNavMenu,
      currentPath: '',
      unreadCount: 0,
    }
  },
  computed: {
    userInfo() {
      return uni.vk.getVuex('$user.userInfo') || {}
    },
    userAvatar() {
      return this.userInfo.avatar || this.userInfo.wx_avatar || ''
    },
    deptName() {
      return this.userInfo.tenant_name || ''
    },
  },
  mounted() {
    this.updateCurrentPath()
    this.loadUnreadCount()
    uni.$on('refreshUnreadCount', this.loadUnreadCount)
  },
  beforeDestroy() {
    uni.$off('refreshUnreadCount', this.loadUnreadCount)
  },
  methods: {
    loadUnreadCount() {
      let vk = uni.vk
      if (!vk) return
      let userInfo = vk.getVuex('$user.userInfo')
      if (!userInfo || !userInfo._id) return
      vk.callFunction({
        url: 'client/message/kh/getUnreadCount',
        data: {},
        success: (data) => {
          this.unreadCount = data.count || 0
        }
      })
    },
    handleAvatarClick() {
      uni.showActionSheet({
        itemList: ['个人中心', '退出登录'],
        success: (res) => {
          if (res.tapIndex === 0) {
            this.navigateTo('/pages_plugs/user-center/index')
          } else if (res.tapIndex === 1) {
            uni.vk.userCenter.logout({
              success: () => {
                uni.vk.toast('已安全退出')
                setTimeout(() => {
                  uni.reLaunch({ url: '/pages_plugs/system/login/index' })
                }, 500)
              }
            })
          }
        }
      })
    },
    navigateTo(path) {
      if (this.currentPath === path) return
      uni.vk.navigateTo(path)
    },
    updateCurrentPath() {
      const pages = getCurrentPages()
      if (pages.length > 0) {
        let route = pages[pages.length - 1].route
        // 修正 uni-app 获取到的路径前缀
        if (!route.startsWith('/')) {
          route = '/' + route
        }
        this.currentPath = route
      } else {
        // H5 初始化/刷新瞬间，pages 可能为空，默认给首页
        this.currentPath = '/pages/index/index'
      }
    },
    isActive(itemPath) {
      // 简单相等的匹配
      if (this.currentPath === itemPath) return true
      // 模块级的前缀模糊匹配（例如 current 是 /pages/key-work/detail，高亮 /pages/key-work/list）
      const itemBase = itemPath.split('/').slice(0, 3).join('/')
      const currentBase = this.currentPath.split('/').slice(0, 3).join('/')
      
      return itemBase === currentBase && currentBase !== '/pages'
    }
  },
}
</script>

<style lang="scss" scoped>
/* Scoped styles removed in favor of Tailwind CSS / DaisyUI utility classes */
</style>
