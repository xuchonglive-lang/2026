<template>
  <view v-if="visible" class="fixed inset-0 z-[2000] bg-black/40 backdrop-blur-sm transition-opacity" @click="$emit('close')">
    <view class="absolute top-0 left-0 bottom-0 w-72 max-w-[80vw] bg-base-100 flex flex-col shadow-2xl drawer-slide-in" @click.stop>
      <!-- 用户信息卡片 -->
      <view class="bg-gradient-to-br from-primary to-secondary text-primary-content p-6 flex items-center gap-4">
        <div class="avatar">
          <div class="w-12 h-12 rounded-full ring ring-white/60">
            <image :src="userInfo.avatar || userInfo.wx_avatar || '/static/logo.png'" mode="aspectFill" />
          </div>
        </div>
        <view class="flex flex-col">
          <text class="text-lg font-bold">{{ userInfo.real_name || userInfo.wx_nickname || '未登录' }}</text>
          <text class="text-sm opacity-80 mt-0.5">{{ userInfo.tenant_name || '' }}</text>
        </view>
      </view>

      <!-- 导航菜单 -->
      <view class="flex-1 overflow-y-auto pt-4 px-2">
        <ul class="menu w-full gap-1">
          <li v-for="item in menuItems" :key="item.path">
            <a @click="navigateTo(item.path)" class="text-base font-medium rounded-lg hover:bg-primary/10 hover:text-primary hover:translate-x-1 transition-all duration-200 active:bg-base-200">
              {{ item.title }}
            </a>
          </li>
        </ul>
      </view>

      <!-- 退出登录 -->
      <view class="p-4 border-t border-base-200">
        <button class="btn btn-outline btn-error w-full gap-2" @click="logout">
          退出登录
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import { drawerMenuItems } from '@/common/config/nav-menu.js'

export default {
  name: 'DrawerMenu',
  props: {
    visible: { type: Boolean, default: false },
  },
  data() {
    return {
      menuItems: drawerMenuItems,
    }
  },
  computed: {
    userInfo() {
      return uni.vk.getVuex('$user.userInfo') || {}
    },
  },
  methods: {
    navigateTo(path) {
      this.$emit('close')
      setTimeout(() => {
        uni.vk.navigateTo(path)
      }, 100)
    },
    logout() {
      this.$emit('close')
      uni.vk.userCenter.logout({
        success: () => {
          uni.vk.toast('已退出登录')
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.drawer-slide-in {
  animation: slideInLeft 0.3s ease-out forwards;
}
@keyframes slideInLeft {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
</style>
