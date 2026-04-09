<template>
  <view class="min-h-screen bg-base-200/50" :class="{ 'is-pc': isPc, 'is-h5': !isPc }">
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
    <view class="flex max-w-[1350px] mx-auto w-full px-0 min-h-[calc(100vh-65px)]" :style="bodyStyle">
      <!-- PC 端可选左侧菜单 -->
      <view v-if="isPc && showSideMenu" class="flex-shrink-0 relative z-10 w-64 shadow-sm">
        <side-menu :menu-items="sideMenuItems" />
      </view>

      <!-- 内容插槽 -->
      <view class="flex-1 w-full relative z-0 animate-[contentFadeInUp_0.6s_ease-out]">
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
      // TopNavBar 使用了 sticky 定位，自然占位，无需再额外加 paddingTop 造成顶部断层翻倍空白
      let bottomH = '0px'
      if (this.isPc && this.showFooter) {
        bottomH = 'var(--footer-height)'
      } else if (!this.isPc && this.showTabBar) {
        bottomH = 'var(--tabbar-height)'
      }
      return {
        paddingTop: '0px',
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
</style>
