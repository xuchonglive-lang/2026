<template>
  <view class="app-layout" :class="{ 'is-pc': isPc, 'is-h5': !isPc }">
    <!-- 顶部导航栏 -->
    <top-nav-bar
      :is-pc="isPc"
      :page-title="pageTitle"
      @toggle-drawer="drawerVisible = true"
    />

    <!-- H5 抽屉菜单 -->
    <drawer-menu
      v-if="!isPc"
      :visible="drawerVisible"
      @close="drawerVisible = false"
    />

    <!-- 主内容区 -->
    <view class="app-layout__body" :style="bodyStyle">
      <!-- PC 端可选左侧菜单 -->
      <view v-if="isPc && showSideMenu" class="app-layout__side">
        <side-menu :menu-items="sideMenuItems" />
      </view>

      <!-- 内容插槽 -->
      <view class="app-layout__content" :class="{ 'has-side-menu': isPc && showSideMenu }">
        <slot />
      </view>
    </view>

    <!-- PC 端页脚 -->
    <page-footer v-if="isPc && showFooter" />

    <!-- H5 端底部 TabBar -->
    <bottom-tab-bar v-if="!isPc && showTabBar" />

    <!-- 裸号拦截弹窗（未归属部门的用户强制展示） -->
    <dept-bind-modal />
  </view>
</template>

<script>
import DeptBindModal from '@/components/user/DeptBindModal.vue'

export default {
  name: 'AppLayout',
  components: { DeptBindModal },
  props: {
    pageTitle: { type: String, default: '' },
    showSideMenu: { type: Boolean, default: false },
    showFooter: { type: Boolean, default: true },
    showTabBar: { type: Boolean, default: true },
    sideMenuItems: { type: Array, default: () => [] },
  },
  data() {
    return {
      isPc: true,
      drawerVisible: false,
      mediaQuery: null,
    }
  },
  computed: {
    bodyStyle() {
      const topH = this.isPc ? 'var(--topnav-height-pc)' : 'var(--topnav-height-h5)'
      let bottomH = '0px'
      if (this.isPc && this.showFooter) {
        bottomH = 'var(--footer-height)'
      } else if (!this.isPc && this.showTabBar) {
        bottomH = 'var(--tabbar-height)'
      }
      return {
        paddingTop: topH,
        paddingBottom: bottomH,
      }
    },
  },
  created() {
    // #ifdef H5
    this.mediaQuery = window.matchMedia('(min-width: 768px)')
    this.isPc = this.mediaQuery.matches
    this.mediaQuery.addEventListener('change', this.onMediaChange)
    // #endif
    // #ifndef H5
    this.isPc = false
    // #endif
  },
  beforeDestroy() {
    // #ifdef H5
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener('change', this.onMediaChange)
    }
    // #endif
  },
  methods: {
    onMediaChange(e) {
      this.isPc = e.matches
      if (this.isPc) this.drawerVisible = false
    },
  },
}
</script>

<style lang="scss" scoped>
.app-layout {
  min-height: 100vh;
  background-color: var(--color-bg-page);
}

.app-layout__body {
  display: flex;
  min-height: calc(100vh - var(--topnav-height-pc));
}

.app-layout__side {
  flex-shrink: 0;
}

.app-layout__content {
  flex: 1;
  max-width: var(--content-max-width);
  margin: 0 auto;
  width: 100%;
  animation: contentFadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes contentFadeInUp {
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.is-pc .app-layout__content {
  padding: var(--spacing-lg);
}

.is-h5 .app-layout__content {
  padding: var(--spacing-sm) var(--spacing-md);
}

.is-h5 .app-layout__body {
  min-height: calc(100vh - var(--topnav-height-h5));
}
</style>
