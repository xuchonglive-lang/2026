# XC 前端页面框架 实施计划

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 搭建 xc 前台应用的完整页面框架，包含设计系统、6 个布局组件、pages.json 路由和 28 个占位页面。

**Architecture:** 使用自定义布局组件替代原生导航和 TabBar。`AppLayout.vue` 作为页面容器，内部通过 `window.matchMedia` 检测 PC/H5 模式，自动切换 TopNavBar/PageFooter（PC）或简化 TopNavBar/BottomTabBar（H5）。设计系统通过 SCSS 变量 + CSS 自定义属性沉淀宪法 UI/UX 规范。

**Tech Stack:** Vue 2, uni-app, VK UniCloud Router v2.18.15, SCSS, Vuex

**参考文档:**
- 设计文档: `docs/plans/2026-03-13-xc-frontend-framework-design.md`
- 宪法: `.specify/memory/constitution.md` 第四/五章
- 公共技术组件约定: `specs/公共技术组件约定.md`

---

### Task 1: 设计系统 SCSS 变量文件

**Files:**
- Create: `xc/common/css/design-system.scss`
- Modify: `xc/App.vue` (引入 design-system.scss)

**Step 1: 创建设计系统文件**

创建 `xc/common/css/design-system.scss`：

```scss
/* ============================================
   XC 设计系统 - UI/UX Pro Max 全局规范
   基于项目宪法第五章定义
   ============================================ */

/* === 色彩体系 === */
:root {
  --color-primary: #165DFF;
  --color-secondary: #FF7D00;
  --color-success: #00B42A;
  --color-warning: #FF7D00;
  --color-danger: #F53F3F;
  --color-info: #86909C;
  --color-bg-page: #F5F7FA;
  --color-bg-card: #FFFFFF;
  --color-border: #E5E6EB;
  --color-text-primary: #1D2129;
  --color-text-secondary: #86909C;
  --color-text-placeholder: #C9CDD4;
}

/* SCSS 变量（用于 SCSS 文件内引用） */
$color-primary: #165DFF;
$color-secondary: #FF7D00;
$color-success: #00B42A;
$color-warning: #FF7D00;
$color-danger: #F53F3F;
$color-info: #86909C;
$color-bg-page: #F5F7FA;
$color-bg-card: #FFFFFF;
$color-border: #E5E6EB;
$color-text-primary: #1D2129;
$color-text-secondary: #86909C;
$color-text-placeholder: #C9CDD4;

/* === 字体规范 === */
:root {
  --font-family: 'Inter', 'SF Pro', '微软雅黑', 'PingFang SC', sans-serif;
  --font-size-h1: 24px;
  --font-size-h2: 20px;
  --font-size-h3: 18px;
  --font-size-h4: 16px;
  --font-size-body: 14px;
  --font-size-helper: 12px;
  --font-size-caption: 10px;
  --font-weight-bold: 600;
  --font-weight-semibold: 500;
  --font-weight-regular: 400;
  --line-height-title: 1.2;
  --line-height-body: 1.5;
}

$font-size-h1: 24px;
$font-size-h2: 20px;
$font-size-h3: 18px;
$font-size-h4: 16px;
$font-size-body: 14px;
$font-size-helper: 12px;
$font-size-caption: 10px;

/* === 间距规范（8px 栅格） === */
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
  --spacing-xxxl: 64px;
}

$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;
$spacing-xxl: 48px;
$spacing-xxxl: 64px;

/* === 圆角 === */
:root {
  --radius-sm: 4px;
  --radius-base: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}

/* === 阴影 === */
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-base: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 4px 20px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 8px 30px rgba(0, 0, 0, 0.12);
}

/* === 动效 === */
:root {
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
}

/* === 布局尺寸 === */
:root {
  --topnav-height-pc: 65px;
  --topnav-height-h5: 44px;
  --tabbar-height: 50px;
  --footer-height: 48px;
  --content-max-width: 1200px;
  --content-padding-pc: 24px;
  --content-padding-h5: 12px 16px;
  --drawer-width: 75vw;
  --drawer-max-width: 300px;
}

/* === 响应式断点 === */
$breakpoint-xs: 0px;
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1200px;
$breakpoint-xxl: 1440px;

/* === 全局基础样式 === */
page {
  background-color: var(--color-bg-page);
  font-family: var(--font-family);
  font-size: var(--font-size-body);
  color: var(--color-text-primary);
  line-height: var(--line-height-body);
}
```

**Step 2: 在 App.vue 中引入**

修改 `xc/App.vue` 的 `<style>` 部分，在 `@import "./common/css/app.scss";` 之前添加：

```scss
@import "./common/css/design-system.scss";
```

**Step 3: 提交**

```bash
git add xc/common/css/design-system.scss xc/App.vue
git commit -m "feat(xc): 添加设计系统 SCSS 变量文件"
```

---

### Task 2: 导航菜单配置

**Files:**
- Create: `xc/common/config/nav-menu.js`

**Step 1: 创建导航菜单配置文件**

创建 `xc/common/config/nav-menu.js`：

```js
/**
 * XC 前台导航菜单配置
 * PC 端 TopNavBar 主导航 + H5 端 BottomTabBar + H5 DrawerMenu
 */

// PC 端顶部主导航菜单
export const mainNavMenu = [
  { title: '首页', path: '/pages/index/index', icon: 'home' },
  { title: '培训学习', path: '/pages/training/list', icon: 'book-open' },
  { title: '信息传达', path: '/pages/info-publish/list', icon: 'file-text' },
  { title: '重点工作', path: '/pages/key-work/list', icon: 'target' },
  { title: '专业管理', path: '/pages/pro-mgmt/index', icon: 'layers' },
]

// H5 端底部 TabBar 配置
export const tabBarItems = [
  { title: '首页', path: '/pages/index/index', icon: 'home', iconActive: 'home-fill' },
  { title: '工作', path: '/pages/workbench/index', icon: 'briefcase', iconActive: 'briefcase-fill' },
  { title: '消息', path: '/pages/message/list', icon: 'bell', iconActive: 'bell-fill', badge: true },
  { title: '我的', path: '/pages_plugs/user-center/index', icon: 'user', iconActive: 'user-fill' },
]

// H5 端抽屉菜单导航
export const drawerMenuItems = [
  { title: '培训学习', path: '/pages/training/list', icon: 'book-open' },
  { title: '信息传达', path: '/pages/info-publish/list', icon: 'file-text' },
  { title: '重点工作', path: '/pages/key-work/list', icon: 'target' },
  { title: '专业管理', path: '/pages/pro-mgmt/index', icon: 'layers' },
  { title: '消息中心', path: '/pages/message/list', icon: 'bell' },
  { title: '个人中心', path: '/pages_plugs/user-center/index', icon: 'user' },
  { title: '个人设置', path: '/pages_plugs/user-center/settings', icon: 'settings' },
]
```

**Step 2: 提交**

```bash
git add xc/common/config/nav-menu.js
git commit -m "feat(xc): 添加导航菜单配置文件"
```

---

### Task 3: AppLayout 主布局组件

**Files:**
- Create: `xc/components/layout/AppLayout.vue`

**Step 1: 创建 AppLayout 组件**

创建 `xc/components/layout/AppLayout.vue`：

```vue
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
  </view>
</template>

<script>
import TopNavBar from './TopNavBar.vue'
import DrawerMenu from './DrawerMenu.vue'
import BottomTabBar from './BottomTabBar.vue'
import PageFooter from './PageFooter.vue'
import SideMenu from './SideMenu.vue'

export default {
  name: 'AppLayout',
  components: { TopNavBar, DrawerMenu, BottomTabBar, PageFooter, SideMenu },
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
    // #ifdef WEB
    this.mediaQuery = window.matchMedia('(min-width: 768px)')
    this.isPc = this.mediaQuery.matches
    this.mediaQuery.addEventListener('change', this.onMediaChange)
    // #endif
    // #ifndef WEB
    this.isPc = false
    // #endif
  },
  beforeDestroy() {
    // #ifdef WEB
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
```

**Step 2: 提交**

```bash
git add xc/components/layout/AppLayout.vue
git commit -m "feat(xc): 添加 AppLayout 主布局容器组件"
```

---

### Task 4: TopNavBar 顶部导航组件

**Files:**
- Create: `xc/components/layout/TopNavBar.vue`

**Step 1: 创建 TopNavBar 组件**

创建 `xc/components/layout/TopNavBar.vue`：

```vue
<template>
  <view class="top-nav" :class="{ 'top-nav--pc': isPc, 'top-nav--h5': !isPc }">
    <!-- PC 端导航 -->
    <template v-if="isPc">
      <view class="top-nav__left">
        <image class="top-nav__logo" src="/static/logo.png" mode="aspectFit" />
        <text class="top-nav__app-name">办公应用平台</text>
      </view>
      <view class="top-nav__center">
        <view
          v-for="item in navMenu"
          :key="item.path"
          class="top-nav__menu-item"
          :class="{ 'is-active': currentPath === item.path }"
          @click="navigateTo(item.path)"
        >
          <text>{{ item.title }}</text>
        </view>
      </view>
      <view class="top-nav__right">
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
  },
  methods: {
    navigateTo(path) {
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
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  background-color: var(--color-bg-card);
  box-shadow: var(--shadow-sm);
}

.top-nav--pc {
  height: var(--topnav-height-pc);
  padding: 0 var(--spacing-lg);
}

.top-nav--h5 {
  height: var(--topnav-height-h5);
  padding: 0 var(--spacing-md);
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
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xl);
}

.top-nav__menu-item {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all var(--duration-fast);
}

.top-nav__menu-item:hover,
.top-nav__menu-item.is-active {
  color: var(--color-primary);
  background-color: rgba(22, 93, 255, 0.06);
}

.top-nav__right {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.top-nav__icon-btn {
  position: relative;
  cursor: pointer;
  padding: var(--spacing-xs);
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
  border: 2px solid var(--color-border);
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
```

**Step 2: 提交**

```bash
git add xc/components/layout/TopNavBar.vue
git commit -m "feat(xc): 添加 TopNavBar 顶部导航组件"
```

---

### Task 5: BottomTabBar、DrawerMenu、PageFooter、SideMenu 组件

**Files:**
- Create: `xc/components/layout/BottomTabBar.vue`
- Create: `xc/components/layout/DrawerMenu.vue`
- Create: `xc/components/layout/PageFooter.vue`
- Create: `xc/components/layout/SideMenu.vue`

**Step 1: 创建 BottomTabBar 组件**

创建 `xc/components/layout/BottomTabBar.vue`：

```vue
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
  background-color: var(--color-bg-card);
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.06);
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
  transition: color var(--duration-fast);
  color: var(--color-text-secondary);
}

.tab-bar__item.is-active {
  color: var(--color-primary);
}

.tab-bar__icon-wrap {
  position: relative;
}

.tab-bar__icon {
  font-size: 20px;
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
```

**Step 2: 创建 DrawerMenu 组件**

创建 `xc/components/layout/DrawerMenu.vue`：

```vue
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
  z-index: 2000;
}

.drawer-panel {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--drawer-width);
  max-width: var(--drawer-max-width);
  background-color: var(--color-bg-card);
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
  transition: background-color var(--duration-fast);
}

.drawer-menu-item:active {
  background-color: var(--color-bg-page);
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
}
</style>
```

**Step 3: 创建 PageFooter 组件**

创建 `xc/components/layout/PageFooter.vue`：

```vue
<template>
  <view class="page-footer">
    <text class="page-footer__text">© 2026 办公应用平台 · 技术支持</text>
  </view>
</template>

<script>
export default {
  name: 'PageFooter',
}
</script>

<style lang="scss" scoped>
.page-footer {
  height: var(--footer-height);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-card);
  border-top: 1px solid var(--color-border);
}

.page-footer__text {
  font-size: var(--font-size-helper);
  color: var(--color-text-placeholder);
}
</style>
```

**Step 4: 创建 SideMenu 组件**

创建 `xc/components/layout/SideMenu.vue`：

```vue
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
  transition: all var(--duration-fast);
  border-left: 3px solid transparent;
}

.side-menu__item:hover {
  background-color: var(--color-bg-page);
}

.side-menu__item.is-active {
  color: var(--color-primary);
  background-color: rgba(22, 93, 255, 0.06);
  border-left-color: var(--color-primary);
}

.side-menu__text {
  font-size: var(--font-size-body);
}
</style>
```

**Step 5: 提交**

```bash
git add xc/components/layout/BottomTabBar.vue xc/components/layout/DrawerMenu.vue xc/components/layout/PageFooter.vue xc/components/layout/SideMenu.vue
git commit -m "feat(xc): 添加 BottomTabBar/DrawerMenu/PageFooter/SideMenu 布局组件"
```

---

### Task 6: 更新 pages.json 路由配置

**Files:**
- Modify: `xc/pages.json`

**Step 1: 重写 pages.json**

将 `xc/pages.json` 替换为以下内容（保留 globalStyle 和 pages_template 子包）：

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": { "navigationBarTitleText": "首页" }
    },
    {
      "path": "pages/workbench/index",
      "style": { "navigationBarTitleText": "工作台" }
    },
    {
      "path": "pages/message/list",
      "style": { "navigationBarTitleText": "消息" }
    },
    {
      "path": "pages/message/detail",
      "style": { "navigationBarTitleText": "消息详情" }
    },
    {
      "path": "pages/login/index",
      "style": { "navigationBarTitleText": "登录" }
    },
    {
      "path": "pages/403/index",
      "style": { "navigationBarTitleText": "无权限" }
    },
    {
      "path": "pages/training/list",
      "style": { "navigationBarTitleText": "培训学习" }
    },
    {
      "path": "pages/training/video-detail",
      "style": { "navigationBarTitleText": "视频课程" }
    },
    {
      "path": "pages/training/article-detail",
      "style": { "navigationBarTitleText": "文章课程" }
    },
    {
      "path": "pages/info-publish/list",
      "style": { "navigationBarTitleText": "信息传达" }
    },
    {
      "path": "pages/info-publish/detail",
      "style": { "navigationBarTitleText": "信息详情" }
    },
    {
      "path": "pages/key-work/list",
      "style": { "navigationBarTitleText": "重点工作" }
    },
    {
      "path": "pages/key-work/focus-list",
      "style": { "navigationBarTitleText": "重点关注" }
    },
    {
      "path": "pages/key-work/task-detail",
      "style": { "navigationBarTitleText": "任务详情" }
    },
    {
      "path": "pages/key-work/focus-detail",
      "style": { "navigationBarTitleText": "关注详情" }
    },
    {
      "path": "pages/pro-mgmt/index",
      "style": { "navigationBarTitleText": "专业管理" }
    },
    {
      "path": "pages/pro-mgmt/regulations",
      "style": { "navigationBarTitleText": "制度规范" }
    },
    {
      "path": "pages/pro-mgmt/network",
      "style": { "navigationBarTitleText": "管理网络" }
    },
    {
      "path": "pages/pro-mgmt/calendar",
      "style": { "navigationBarTitleText": "例行工作" }
    },
    {
      "path": "pages/pro-mgmt/my-docs",
      "style": { "navigationBarTitleText": "我的文档" }
    },
    {
      "path": "pages/test/test",
      "style": { "navigationBarTitleText": "演示页面" }
    }
  ],
  "subPackages": [
    {
      "root": "pages_plugs",
      "pages": [
        {
          "path": "user-center/index",
          "style": { "navigationBarTitleText": "个人中心" }
        },
        {
          "path": "user-center/profile",
          "style": { "navigationBarTitleText": "个人信息" }
        },
        {
          "path": "user-center/my-tasks",
          "style": { "navigationBarTitleText": "我的任务" }
        },
        {
          "path": "user-center/my-feedback",
          "style": { "navigationBarTitleText": "我的反馈" }
        },
        {
          "path": "user-center/my-reading",
          "style": { "navigationBarTitleText": "我的阅读" }
        },
        {
          "path": "user-center/my-training",
          "style": { "navigationBarTitleText": "我的培训" }
        },
        {
          "path": "user-center/my-work",
          "style": { "navigationBarTitleText": "我的工作" }
        },
        {
          "path": "user-center/settings",
          "style": { "navigationBarTitleText": "个人设置" }
        }
      ]
    },
    {
      "root": "pages_template",
      "pages": [
        {
          "path": "db-test/db-test",
          "style": { "navigationBarTitleText": "数据库API演示" }
        },
        {
          "path": "db-test/list/list",
          "style": { "navigationBarTitleText": "列表加载演示" }
        },
        {
          "path": "uni-id/index/index",
          "style": { "navigationBarTitleText": "vk-uniCloud-router 演示" }
        },
        {
          "path": "uni-id/login/index/index",
          "style": { "navigationBarTitleText": "登录" }
        },
        {
          "path": "uni-id/login/register/register",
          "style": { "navigationBarTitleText": "注册" }
        },
        {
          "path": "uni-id/login/forget/forget",
          "style": { "navigationBarTitleText": "找回密码" }
        }
      ]
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "",
    "navigationStyle": "custom",
    "navigationBarBackgroundColor": "#F8F8F8",
    "rpxCalcMaxDeviceWidth": 450,
    "rpxCalcBaseDeviceWidth": 375,
    "rpxCalcIncludeWidth": 750,
    "backgroundColor": "#F8F8F8"
  }
}
```

> **注意**: pages_template 子包仅保留了最核心的演示页面（数据库 API、uni-id 登录）。其他 openapi/plugs 等演示页面如需保留可后续追加。

**Step 2: 提交**

```bash
git add xc/pages.json
git commit -m "feat(xc): 重构 pages.json 路由配置，注册全部业务页面"
```

---

### Task 7: 改造首页 + 创建 TabBar 页面占位

**Files:**
- Modify: `xc/pages/index/index.vue`（改造为空白占位）
- Create: `xc/pages/workbench/index.vue`
- Create: `xc/pages/message/list.vue`
- Create: `xc/pages/message/detail.vue`
- Create: `xc/pages/login/index.vue`
- Create: `xc/pages/403/index.vue`

**Step 1: 改造首页**

将 `xc/pages/index/index.vue` 替换为：

```vue
<template>
  <app-layout page-title="首页">
    <view class="page-placeholder">
      <text class="page-placeholder__text">首页内容即将上线</text>
    </view>
  </app-layout>
</template>

<script>
import AppLayout from '@/components/layout/AppLayout.vue'

export default {
  components: { AppLayout },
}
</script>

<style lang="scss" scoped>
.page-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.page-placeholder__text {
  font-size: var(--font-size-h3);
  color: var(--color-text-placeholder);
}
</style>
```

**Step 2: 创建工作台页面**

创建 `xc/pages/workbench/index.vue`：

```vue
<template>
  <app-layout page-title="工作台">
    <view class="page-placeholder">
      <text class="page-placeholder__text">工作台 · 即将上线</text>
    </view>
  </app-layout>
</template>

<script>
import AppLayout from '@/components/layout/AppLayout.vue'

export default {
  components: { AppLayout },
}
</script>

<style lang="scss" scoped>
.page-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.page-placeholder__text {
  font-size: var(--font-size-h3);
  color: var(--color-text-placeholder);
}
</style>
```

**Step 3: 创建消息列表页**

创建 `xc/pages/message/list.vue`（同模式，pageTitle="消息中心"）

**Step 4: 创建消息详情页**

创建 `xc/pages/message/detail.vue`（同模式，pageTitle="消息详情"，`showTabBar: false`）

**Step 5: 创建登录页**

创建 `xc/pages/login/index.vue`（不使用 AppLayout，独立布局，占位文案"登录页 · 即将上线"）

**Step 6: 创建 403 页面**

创建 `xc/pages/403/index.vue`（不使用 AppLayout，独立布局，显示"您没有访问此页面的权限"和返回首页按钮）

**Step 7: 提交**

```bash
git add xc/pages/index/index.vue xc/pages/workbench/ xc/pages/message/ xc/pages/login/ xc/pages/403/
git commit -m "feat(xc): 改造首页 + 创建 TabBar/登录/403 页面占位"
```

---

### Task 8: 创建培训模块占位页面

**Files:**
- Create: `xc/pages/training/list.vue`
- Create: `xc/pages/training/video-detail.vue`
- Create: `xc/pages/training/article-detail.vue`

**Step 1: 批量创建**

每个文件使用统一的占位模板（参考 Task 7 Step 2），仅修改 `pageTitle` 和占位文案：

| 文件 | pageTitle | 占位文案 |
|------|-----------|---------|
| `training/list.vue` | 培训学习 | 培训学习 · 即将上线 |
| `training/video-detail.vue` | 视频课程 | 视频课程详情 · 即将上线，`showTabBar: false` |
| `training/article-detail.vue` | 文章课程 | 文章课程详情 · 即将上线，`showTabBar: false` |

**Step 2: 提交**

```bash
git add xc/pages/training/
git commit -m "feat(xc): 创建培训模块占位页面"
```

---

### Task 9: 创建信息共享模块占位页面

**Files:**
- Create: `xc/pages/info-publish/list.vue`
- Create: `xc/pages/info-publish/detail.vue`

**Step 1: 批量创建**

| 文件 | pageTitle | 占位文案 |
|------|-----------|---------|
| `info-publish/list.vue` | 信息传达 | 信息传达 · 即将上线 |
| `info-publish/detail.vue` | 信息详情 | 信息详情 · 即将上线，`showTabBar: false` |

**Step 2: 提交**

```bash
git add xc/pages/info-publish/
git commit -m "feat(xc): 创建信息共享模块占位页面"
```

---

### Task 10: 创建重点工作模块占位页面

**Files:**
- Create: `xc/pages/key-work/list.vue`
- Create: `xc/pages/key-work/focus-list.vue`
- Create: `xc/pages/key-work/task-detail.vue`
- Create: `xc/pages/key-work/focus-detail.vue`

**Step 1: 批量创建**

| 文件 | pageTitle | 占位文案 |
|------|-----------|---------|
| `key-work/list.vue` | 重点工作 | 重点工作 · 即将上线 |
| `key-work/focus-list.vue` | 重点关注 | 重点关注 · 即将上线 |
| `key-work/task-detail.vue` | 任务详情 | 任务详情 · 即将上线，`showTabBar: false` |
| `key-work/focus-detail.vue` | 关注详情 | 关注详情 · 即将上线，`showTabBar: false` |

**Step 2: 提交**

```bash
git add xc/pages/key-work/
git commit -m "feat(xc): 创建重点工作模块占位页面"
```

---

### Task 11: 创建专业管理模块占位页面

**Files:**
- Create: `xc/pages/pro-mgmt/index.vue`
- Create: `xc/pages/pro-mgmt/regulations.vue`
- Create: `xc/pages/pro-mgmt/network.vue`
- Create: `xc/pages/pro-mgmt/calendar.vue`
- Create: `xc/pages/pro-mgmt/my-docs.vue`

**Step 1: 批量创建**

| 文件 | pageTitle | 占位文案 |
|------|-----------|---------|
| `pro-mgmt/index.vue` | 专业管理 | 专业管理 · 即将上线 |
| `pro-mgmt/regulations.vue` | 制度规范 | 制度规范 · 即将上线 |
| `pro-mgmt/network.vue` | 管理网络 | 管理网络 · 即将上线 |
| `pro-mgmt/calendar.vue` | 例行工作 | 例行工作 · 即将上线 |
| `pro-mgmt/my-docs.vue` | 我的文档 | 我的文档 · 即将上线 |

**Step 2: 提交**

```bash
git add xc/pages/pro-mgmt/
git commit -m "feat(xc): 创建专业管理模块占位页面"
```

---

### Task 12: 创建个人中心子包占位页面

**Files:**
- Create: `xc/pages_plugs/user-center/index.vue`
- Create: `xc/pages_plugs/user-center/profile.vue`
- Create: `xc/pages_plugs/user-center/my-tasks.vue`
- Create: `xc/pages_plugs/user-center/my-feedback.vue`
- Create: `xc/pages_plugs/user-center/my-reading.vue`
- Create: `xc/pages_plugs/user-center/my-training.vue`
- Create: `xc/pages_plugs/user-center/my-work.vue`
- Create: `xc/pages_plugs/user-center/settings.vue`

**Step 1: 批量创建**

| 文件 | pageTitle | 占位文案 |
|------|-----------|---------|
| `user-center/index.vue` | 个人中心 | 个人中心 · 即将上线 |
| `user-center/profile.vue` | 个人信息 | 个人信息 · 即将上线，`showTabBar: false` |
| `user-center/my-tasks.vue` | 我的任务 | 我的任务 · 即将上线，`showTabBar: false` |
| `user-center/my-feedback.vue` | 我的反馈 | 我的反馈 · 即将上线，`showTabBar: false` |
| `user-center/my-reading.vue` | 我的阅读 | 我的阅读 · 即将上线，`showTabBar: false` |
| `user-center/my-training.vue` | 我的培训 | 我的培训 · 即将上线，`showTabBar: false` |
| `user-center/my-work.vue` | 我的工作 | 我的工作 · 即将上线，`showTabBar: false` |
| `user-center/settings.vue` | 个人设置 | 个人设置 · 即将上线，`showTabBar: false` |

**Step 2: 提交**

```bash
git add xc/pages_plugs/user-center/
git commit -m "feat(xc): 创建个人中心子包占位页面"
```

---

### Task 13: 更新 app.config.js 配置

**Files:**
- Modify: `xc/app.config.js`

**Step 1: 更新登录页和免登录路径列表**

修改 `xc/app.config.js` 中以下字段：

```js
// 登录页面路径（修改为新登录页）
login: {
  url: '/pages/login/index'
},
// checkTokenPages.list 中添加新的免登录路径
checkTokenPages: {
  mode: 2,
  list: [
    "/pages_template/*",
    "/pages/login/*",
    "/pages/index/*",
    "/pages/error/*",
    "/pages/403/*"
  ]
},
```

**Step 2: 更新主题色为设计规范色**

```js
color: {
  main: "#165DFF",
  secondary: "#FF7D00"
},
```

**Step 3: 提交**

```bash
git add xc/app.config.js
git commit -m "feat(xc): 更新 app.config.js 登录路径和主题色"
```

---

### Task 14: 验证

**Step 1: 在 HBuilderX 中运行**

1. 打开 HBuilderX
2. 打开 `xc` 项目
3. 点击菜单「运行 → 运行到浏览器 → Chrome」
4. 等待编译完成

**Step 2: 验证检查清单**

| 检查项 | 预期结果 |
|--------|---------|
| 首页加载 | 显示 TopNavBar + 空白占位 + PageFooter/BottomTabBar |
| PC 端布局（≥768px） | TopNavBar(65px) + 主内容区 + PageFooter(48px) |
| H5 端布局（<768px） | TopNavBar(44px) + 主内容区 + BottomTabBar(50px) |
| PC 端导航菜单 | 5 个菜单项（首页/培训学习/信息传达/重点工作/专业管理） |
| H5 端汉堡菜单 | 点击左上角 ☰ 弹出 DrawerMenu |
| TabBar 导航 | 4 个标签顺利切换（首页/工作/消息/我的） |
| 业务页面路由 | 各模块页面均可通过 URL 直接访问，显示占位 |
| 窗口缩放 | 缩放窗口跨越 768px 断点时，布局自动切换 |

**Step 3: 提交最终状态**

```bash
git add -A
git commit -m "feat(xc): XC 前端页面框架搭建完成（Phase 0）"
```
