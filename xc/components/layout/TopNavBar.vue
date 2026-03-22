<template>
  <view class="top-nav" :class="{ 'top-nav--pc': isPc, 'top-nav--h5': !isPc }">
    <!-- PC 端导航 -->
    <template v-if="isPc">
      <view class="top-nav__container">
        <view class="top-nav__left">
          <image class="top-nav__logo" src="/static/logo.png" mode="aspectFit" />
          <text class="top-nav__app-name">办公应用平台</text>
          <view class="top-nav__divider"></view>
        </view>
        <view class="top-nav__center">
          <view
            v-for="item in navMenu"
            :key="item.path"
            class="top-nav__menu-item"
            :class="{ 'is-active': isActive(item.path) }"
            @click="navigateTo(item.path)"
          >
            <text>{{ item.title }}</text>
          </view>
        </view>
        <view class="top-nav__right">
          <view class="top-nav__doc-link" @click="navigateTo('/pages/pro-mgmt/my-docs')">
            <text>Documentation</text>
            <text class="top-nav__external-icon">↗</text>
          </view>
          <view class="top-nav__icon-btn" @click="navigateTo('/pages/message/list')">
            <text class="top-nav__icon">🔔</text>
            <view v-if="unreadCount > 0" class="top-nav__badge">
              {{ unreadCount > 99 ? '99+' : unreadCount }}
            </view>
          </view>
          <text class="top-nav__dept-name">{{ deptName }}</text>
          <view class="top-nav__avatar-wrap" @click="navigateTo('/pages_plugs/user-center/index')">
            <image
              class="top-nav__avatar"
              :src="userAvatar || '/static/logo.png'"
              mode="aspectFill"
            />
          </view>
        </view>
      </view>
    </template>

    <!-- H5 端导航 -->
    <template v-else>
      <view class="top-nav__left" @click="$emit('toggle-drawer')">
        <text class="top-nav__hamburger">☰</text>
      </view>
      <view class="top-nav__center">
        <text class="top-nav__title">{{ pageTitle || '办公应用平台' }}</text>
      </view>
      <view class="top-nav__right">
        <view class="top-nav__icon-btn" @click="navigateTo('/pages/message/list')">
          <text class="top-nav__icon">🔔</text>
          <view v-if="unreadCount > 0" class="top-nav__badge top-nav__badge--sm">
            {{ unreadCount > 99 ? '99+' : unreadCount }}
          </view>
        </view>
        <view class="top-nav__avatar-wrap" @click="navigateTo('/pages_plugs/user-center/index')">
          <image
            class="top-nav__avatar top-nav__avatar--sm"
            :src="userAvatar || '/static/logo.png'"
            mode="aspectFill"
          />
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
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--color-bg-glass);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid var(--color-border-glass);
}

.top-nav__container {
  max-width: var(--content-max-width, 1200px);
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.top-nav--pc {
  height: var(--topnav-height-pc);
  /* pc不再需要左右padding，由container定宽限制 */
}

.top-nav--h5 {
  height: var(--topnav-height-h5);
  padding: 0 var(--spacing-md);
  display: flex; /* H5保持外层flex */
  align-items: center;
}

.top-nav__left {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.top-nav__logo {
  width: 32px;
  height: 32px;
}

.top-nav__app-name {
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  white-space: nowrap;
}

.top-nav__center {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.top-nav__divider {
  width: 1px;
  height: 20px;
  background-color: var(--color-border);
  margin: 0 var(--spacing-sm);
}

.top-nav__menu-item {
  position: relative;
  padding: var(--spacing-sm) 0;
  margin: 0 var(--spacing-sm);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text-secondary);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: var(--transition-all);
}

.top-nav__menu-item:hover,
.top-nav__menu-item.is-active {
  color: var(--color-primary);
}

.top-nav__menu-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  border-radius: 2px 2px 0 0;
  background-color: var(--color-primary);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform var(--duration-fast) ease-out;
}

.top-nav__menu-item.is-active::after {
  transform: scaleX(1);
}

.top-nav__right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-md);
  flex: 1; /* 右侧占 1 份，配合左侧强制中心区域绝对居中 */
}

.top-nav__doc-link {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  transition: var(--transition-all);
}

.top-nav__doc-link:hover {
  color: var(--color-primary);
  background: var(--color-bg-page);
}

.top-nav__external-icon {
  font-size: 10px;
}

.top-nav__icon-btn {
  position: relative;
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: var(--radius-full);
  transition: var(--transition-all);
}

.top-nav__icon-btn:hover {
  background-color: var(--color-border-glass);
  transform: scale(1.05);
}

.top-nav__icon {
  font-size: 20px;
}

.top-nav__badge {
  position: absolute;
  top: -4px;
  right: -8px;
  min-width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  font-size: var(--font-size-caption);
  color: #fff;
  background-color: var(--color-danger);
  border-radius: var(--radius-full);
  padding: 0 4px;
}

.top-nav__badge--sm {
  min-width: 14px;
  height: 14px;
  line-height: 14px;
  font-size: 8px;
  top: -2px;
  right: -6px;
}

.top-nav__dept-name {
  font-size: var(--font-size-helper);
  color: var(--color-text-secondary);
}

.top-nav__avatar-wrap {
  cursor: pointer;
}

.top-nav__avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  border: 2px solid transparent;
  transition: var(--transition-all);
}

.top-nav__avatar:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-primary);
  transform: scale(1.05);
}

.top-nav__avatar--sm {
  width: 28px;
  height: 28px;
}

.top-nav__hamburger {
  font-size: 22px;
  cursor: pointer;
  color: var(--color-text-primary);
}

.top-nav__title {
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}
</style>
