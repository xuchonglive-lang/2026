<template>
  <view class="tab-bar">
    <view
      v-for="item in tabs"
      :key="item.path"
      class="tab-bar__item"
      :class="{ 'is-active': currentPath === item.path }"
      @click="switchTab(item.path)"
    >
      <view class="tab-bar__icon-wrap">
        <text class="tab-bar__icon">{{ getIcon(item) }}</text>
        <view v-if="item.badge && unreadCount > 0" class="tab-bar__badge">
          {{ unreadCount > 99 ? '99+' : unreadCount }}
        </view>
      </view>
      <text class="tab-bar__label">{{ item.title }}</text>
    </view>
  </view>
</template>

<script>
import { tabBarItems } from '@/common/config/nav-menu.js'

export default {
  name: 'BottomTabBar',
  data() {
    return {
      tabs: tabBarItems,
      currentPath: '',
      unreadCount: 0,
    }
  },
  mounted() {
    this.updateCurrentPath()
  },
  methods: {
    getIcon(item) {
      const icons = {
        home: '🏠', 'home-fill': '🏠',
        briefcase: '💼', 'briefcase-fill': '💼',
        bell: '🔔', 'bell-fill': '🔔',
        user: '👤', 'user-fill': '👤',
      }
      const iconKey = this.currentPath === item.path ? item.iconActive : item.icon
      return icons[iconKey] || '📄'
    },
    switchTab(path) {
      if (this.currentPath === path) return
      uni.vk.navigateTo(path)
    },
    updateCurrentPath() {
      const pages = getCurrentPages()
      if (pages.length > 0) {
        this.currentPath = '/' + pages[pages.length - 1].route
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--tabbar-height);
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: var(--color-bg-glass);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-top: 1px solid var(--color-border-glass);
  z-index: 1000;
}

.tab-bar__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  cursor: pointer;
  transition: var(--transition-all);
  color: var(--color-text-secondary);
}

.tab-bar__item:active {
  transform: scale(0.95);
  opacity: 0.8;
}

.tab-bar__item.is-active {
  color: var(--color-primary);
}

.tab-bar__icon-wrap {
  position: relative;
}

.tab-bar__icon {
  font-size: 20px;
  display: block;
  transition: var(--transition-transform);
}

.tab-bar__item.is-active .tab-bar__icon {
  transform: scale(1.15);
}

.tab-bar__badge {
  position: absolute;
  top: -6px;
  right: -10px;
  min-width: 14px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  font-size: 8px;
  color: #fff;
  background-color: var(--color-danger);
  border-radius: var(--radius-full);
  padding: 0 3px;
}

.tab-bar__label {
  font-size: var(--font-size-caption);
}
</style>
