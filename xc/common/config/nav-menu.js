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
