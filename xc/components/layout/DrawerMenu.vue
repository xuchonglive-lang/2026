<template>
  <view v-if="visible" class="drawer-overlay" @click="$emit('close')">
    <view class="drawer-panel" :class="{ 'is-open': visible }" @click.stop>
      <!-- 用户信息卡片 -->
      <view class="drawer-user">
        <image
          class="drawer-user__avatar"
          :src="userInfo.avatar || userInfo.wx_avatar || '/static/logo.png'"
          mode="aspectFill"
        />
        <view class="drawer-user__info">
          <text class="drawer-user__name">{{ userInfo.real_name || userInfo.wx_nickname || '未登录' }}</text>
          <text class="drawer-user__dept">{{ userInfo.tenant_name || '' }}</text>
        </view>
      </view>

      <!-- 导航菜单 -->
      <view class="drawer-menu-list">
        <view
          v-for="item in menuItems"
          :key="item.path"
          class="drawer-menu-item"
          @click="navigateTo(item.path)"
        >
          <text class="drawer-menu-item__title">{{ item.title }}</text>
        </view>
      </view>

      <!-- 退出登录 -->
      <view class="drawer-footer">
        <view class="drawer-logout-btn" @click="logout">
          <text>退出登录</text>
        </view>
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
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 2000;
}

.drawer-panel {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--drawer-width);
  max-width: var(--drawer-max-width);
  background-color: var(--color-bg-glass);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  display: flex;
  flex-direction: column;
  animation: slideInLeft var(--duration-slow) ease-out;
}

@keyframes slideInLeft {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.drawer-user {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-xl) var(--spacing-md);
  background: linear-gradient(135deg, var(--color-primary), #4080FF);
  color: #fff;
}

.drawer-user__avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  border: 2px solid rgba(255, 255, 255, 0.6);
}

.drawer-user__name {
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-semibold);
}

.drawer-user__dept {
  font-size: var(--font-size-helper);
  opacity: 0.8;
  margin-top: 2px;
}

.drawer-menu-list {
  flex: 1;
  padding: var(--spacing-sm) 0;
  overflow-y: auto;
}

.drawer-menu-item {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-body);
  color: var(--color-text-primary);
  transition: var(--transition-all);
  margin: 0 var(--spacing-xs) var(--spacing-xs);
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.drawer-menu-item:hover,
.drawer-menu-item:active {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  transform: translateX(4px);
}

.drawer-footer {
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}

.drawer-logout-btn {
  text-align: center;
  padding: var(--spacing-sm);
  color: var(--color-danger);
  font-size: var(--font-size-body);
  transition: var(--transition-all);
  border-radius: var(--radius-sm);
  cursor: pointer;
  margin: 0 var(--spacing-sm);
}

.drawer-logout-btn:hover {
  background-color: rgba(245, 63, 63, 0.1);
}
</style>
