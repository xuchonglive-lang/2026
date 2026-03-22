<template>
  <view class="side-menu">
    <view
      v-for="item in menuItems"
      :key="item.path || item.title"
      class="side-menu__item"
      :class="{ 'is-active': currentPath === item.path }"
      @click="navigateTo(item.path)"
    >
      <text class="side-menu__text">{{ item.title }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'SideMenu',
  props: {
    menuItems: { type: Array, default: () => [] },
  },
  data() {
    return {
      currentPath: '',
    }
  },
  mounted() {
    const pages = getCurrentPages()
    if (pages.length > 0) {
      this.currentPath = '/' + pages[pages.length - 1].route
    }
  },
  methods: {
    navigateTo(path) {
      if (!path || this.currentPath === path) return
      uni.vk.navigateTo(path)
    },
  },
}
</script>

<style lang="scss" scoped>
.side-menu {
  width: 200px;
  background-color: var(--color-bg-card);
  border-right: 1px solid var(--color-border);
  padding: var(--spacing-sm) 0;
  min-height: 100%;
}

.side-menu__item {
  padding: var(--spacing-sm) var(--spacing-lg);
  cursor: pointer;
  transition: var(--transition-all);
  border-left: 3px solid transparent;
  margin: 0 var(--spacing-xs) var(--spacing-xs);
  border-radius: var(--radius-sm);
}

.side-menu__item:hover {
  background-color: var(--color-bg-page);
  transform: translateX(4px);
}

.side-menu__item.is-active {
  color: var(--color-primary);
  background-color: var(--color-primary-light);
  border-left-color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

.side-menu__text {
  font-size: var(--font-size-body);
}
</style>
