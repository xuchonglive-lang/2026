<template>
  <view
    class="header no-user-select"
    :class="showMenuTabs ? 'show-menu-tabs' : 'hide-menu-tabs'"
    v-loading="!vk.getVuex('$app.inited')"
    :style="'--textColor' + textColor"
  >
    <!-- 左侧 -->
    <view class="left">
      <!-- 模式一：纯图片 -->
      <navigator
        class="logo-mode-1"
        open-type="reLaunch"
        url="/"
        v-if="mode === 1"
      >
        <image
          :src="vk.getVuex('$app.staticUrl.navBar.logo1')"
          mode="aspectFill"
          class="logo-image"
          v-show="vk.getVuex('$app.leftCollapse')"
        ></image>
        <image
          :src="vk.getVuex('$app.staticUrl.navBar.logo2')"
          mode="aspectFill"
          class="logo-image"
          v-show="!vk.getVuex('$app.leftCollapse')"
        ></image>
      </navigator>

      <!-- 模式二：图片+文字 -->
      <navigator class="logo-mode-2" open-type="reLaunch" url="/" v-else>
        <view class="logo-box" v-show="!vk.getVuex('$app.leftCollapse')">
          <image
            class="logo-image"
            :src="vk.getVuex('$app.staticUrl.navBar.logo')"
            mode="scaleToFill"
          ></image>
          <view class="app-name">{{ title }}</view>
        </view>
        <view class="logo-box" v-show="vk.getVuex('$app.leftCollapse')">
          <image
            class="logo-image"
            :src="vk.getVuex('$app.staticUrl.navBar.logo')"
            mode="aspectFit"
          ></image>
        </view>
      </navigator>
    </view>
    <!-- 右侧 -->
    <view class="right">
      <!-- 右上 -->
      <view class="right-top" :style="topMenuStyle">
        <view
          class="navbar"
          :class="{
            'navbar-mini': !matchLeftWindow,
            'popup-menu': popupMenuOpened,
          }"
        >
          <vk-data-icon
            class="menu-collapse"
            :name="
              vk.getVuex('$app.leftCollapse')
                ? 'vk-icon-zhankaicaidan'
                : 'vk-icon-shouqicaidan'
            "
            size="17"
            :color="textColor"
            :pointer="true"
            @click="menuCollapse"
          ></vk-data-icon>
          <!-- 面包屑 -->
          <breadcrumb></breadcrumb>

          <view class="navbar-left pointer">
            <vk-data-icon
              @click="toggleSidebar"
              class="menu-icon"
              name="vk-icon-sortlight"
              size="30"
              :color="textColor"
            ></vk-data-icon>
          </view>
          <view class="navbar-middle">
            <text class="title-text">{{ navigationBarTitleText }}</text>
          </view>
          <view class="navbar-right pointer">
            <view @click="togglePopupMenu" class="navbar-user">
              <view class="username">
                <text>{{ vk.getVuex("$user.userInfo.username") }}</text>
              </view>
              <vk-data-icon
                class="arrowdown"
                name="vk-icon-unfold"
                :color="textColor"
                size="13"
              ></vk-data-icon>
            </view>
            <view class="vk-mask" @click="togglePopupMenu"></view>
            <view class="navbar-menu">
              <!-- #ifdef H5 -->
              <view
                v-if="vk.getVuex('$error.logs').length"
                @click="openForm('errorLog')"
                class="menu-item debug pointer"
              >
                <el-badge
                  :value="vk.getVuex('$error.logs').length"
                  class="item"
                >
                  <vk-data-icon
                    name="el-icon-message-solid"
                    size="22"
                    :color="textColor"
                  ></vk-data-icon>
                </el-badge>
              </view>
              <!-- #endif -->
              <template v-if="vk.getVuex('$app.width') >= 1100 && debug">
                <view
                  v-for="link in links"
                  :key="link.url"
                  class="menu-item text-overflow"
                >
                  <vk-data-link :href="link.url" :text="link.text" />
                </view>
              </template>
              <view class="menu-item text-overflow">
                <text>{{ vk.getVuex("$user.userInfo.username") }}</text>
              </view>
              <view class="menu-item" @click="openForm('updatePassword')">
                <text class="text-overflow">修改密码</text>
              </view>
              <view class="menu-item">
                <text class="logout pointer text-overflow" @click="logout"
                  >退出</text
                >
              </view>
              <view class="popup-menu__arrow"></view>
            </view>
          </view>
        </view>
      </view>
      <!-- 右下 -->
      <view class="right-bottom" v-show="showMenuTabs">
        <!-- tabs标签组 -->
        <vk-data-menu-tabs
          v-if="vk.getVuex('$app.inited')"
          ref="menuTabs"
        ></vk-data-menu-tabs>
      </view>
    </view>
    <!-- 弹窗 - 错误日志 -->
    <errorLog v-model="formDatas.errorLog"></errorLog>
    <!-- 弹窗 - 修改密码 -->
    <updatePassword v-model="formDatas.updatePassword"></updatePassword>
  </view>
</template>

<script>
import config from "@/app.config.js";
import breadcrumb from "./components/breadcrumb";
import errorLog from "./components/errorLog";
import updatePassword from "./components/updatePassword";
export default {
  components: {
    breadcrumb,
    errorLog,
    updatePassword,
  },
  props: {
    navigationBarTitleText: {
      type: String,
    },
    matchLeftWindow: {
      type: Boolean,
    },
    showLeftWindow: {
      type: Boolean,
    },
  },
  data() {
    return {
      debug: config.debug,
      // 主题配置
      theme: config.theme,
      // 右侧链接，只在开发模式时显示
      links: [
        {
          text: "Admin框架文档",
          url: "https://vkdoc.fsq.pub/admin/",
        },
        {
          text: "浏览更多VK插件",
          url: "https://ext.dcloud.net.cn/search?q=vk",
        },
      ],
      popupMenuOpened: false,
      tabCheck: "",
      title: config.topBar.logoTitle,
      mode: config.topBar.logoMode,
      showMenuTabs: true,
      formDatas: {},
    };
  },
  // 组件挂载完毕时
  mounted() {
    this.vk.menuTabs = this.$refs.menuTabs;
    this.checkMenuCollapse();
    this.checkMenuTabs();
    this.initHomeTab();
  },
  methods: {
    // 退出登录
    logout() {
      let that = this;
      let { vk } = that;
      vk.userCenter.logout({
        success: function (data) {
          if (typeof that.$refs.menuTabs.clear === "function")
            that.$refs.menuTabs.clear();
          uni.reLaunch({
            url: config.login.url,
          });
        },
      });
    },
    // 左侧菜单显示和隐藏
    toggleSidebar() {
      let that = this;
      if (!that.showLeftWindow) {
        uni.showLeftWindow();
      } else {
        uni.hideLeftWindow();
      }
    },
    // 右上方菜单显示和隐藏
    togglePopupMenu() {
      let that = this;
      that.popupMenuOpened = !that.popupMenuOpened;
    },
    // 打开表单
    openForm(name) {
      let that = this;
      let { vk } = that;
      that.formDatas[name] = {
        show: true,
      };
    },
    // pc状态下菜单折叠
    menuCollapse() {
      let { vk } = this;
      let leftCollapse = vk.getVuex("$app.leftCollapse");
      vk.setVuex("$app.leftCollapse", !leftCollapse);
    },
    checkMenuCollapse() {
      let { vk } = this;
      let leftCollapse = vk.getVuex("$app.leftCollapse");
      if (!leftCollapse) {
        // 打开
        uni.setLeftWindowStyle({
          width: this.leftWidth,
        });
      } else {
        // 折叠
        uni.setLeftWindowStyle({
          width: "64px",
        });
      }
    },
    checkMenuTabs() {
      if (config.topBar.showMenuTabs === false) {
        this.showMenuTabs = false;
        uni.setTopWindowStyle({
          height: "50px",
        });
      }
    },
    // 初始化首页标签（尝试锁定）
    initHomeTab() {
      let app = this.vk.getVuex("$app");
      let { route, menuList } = app;
      let homeMenu = menuList.find((item) => item.url === "/");
      if (homeMenu && this.$refs.menuTabs) {
        let tabsList = this.$refs.menuTabs.tabs.list;
        let homeIndex = tabsList.findIndex((item) => item.path === "/");
        if (homeIndex > 0) {
          // 如果首页在，但不在首位，则移至首位
          let homeTab = tabsList.splice(homeIndex, 1)[0];
          tabsList.unshift(homeTab);
        } else if (homeIndex === -1) {
          // 如果不存在，则插入到首位
          this.$refs.menuTabs.tabs.list.unshift({
            name: homeMenu.name || "首页",
            path: "/",
            url: "/",
            fixed: true,
          });
        }
      }
    },
  },
  // 监听属性
  watch: {
    leftCollapseCom() {
      this.checkMenuCollapse();
    },
    // 监听菜单列表加载，确保首页标签能正确初始化（解决首页标签缺失问题）
    "$app.menuList": {
      handler(val) {
        if (val && val.length > 0) {
          this.initHomeTab();
        }
      },
      immediate: true,
    },
  },
  // 计算属性
  computed: {
    leftCollapseCom() {
      return this.vk.getVuex("$app.leftCollapse");
    },
    topMenuStyle() {
      let theme = this.theme;
      if (theme && theme.use) {
        let topMenu = theme[theme.use].topMenu;
        let { backgroundColor, textColor } = topMenu;
        return {
          backgroundColor,
          color: textColor,
        };
      } else {
        return {};
      }
    },
    textColor() {
      let theme = this.theme;
      if (theme && theme.use) {
        return theme[theme.use].topMenu.textColor || "#999";
      } else {
        return "#999";
      }
    },
    leftWidth() {
      let theme = this.theme;
      if (theme && theme.use) {
        return theme[theme.use].leftMenu.width || "240px";
      } else {
        return "240px";
      }
    },
  },
};
</script>

<style lang="scss">
.header {
  height: 84px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  border-bottom: 1px solid darken($top-window-bg-color, 3%);
  color: $top-window-text-color;
  background-color: #f5f5f5;

  &.hide-menu-tabs {
    height: 50px;
  }

  /* 左侧 */
  .left {
    width: calc(var(--window-left));
  }

  /* 右侧 */
  .right {
    width: calc(100% - var(--window-left));

    .navbar {
      font-size: 13px;
      position: relative;
      height: 100%;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .menu-icon {
      width: 30px;
      height: 30px;
      line-height: 30px;
    }

    .menu-collapse {
      width: 30px;
      height: 30px;
      line-height: 30px;
      margin-right: 12px;
    }

    .navbar-left,
    .navbar-middle,
    .navbar-right {
      flex: 1;
    }

    .navbar-middle,
    .username {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .navbar-middle {
      text-align: center;
    }

    .username {
      max-width: 150px;
    }

    .text-overflow {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .text-overflow {
      max-width: 150px;
    }

    .title-text {
      font-size: 13px;
      line-height: 30px;
    }

    .navbar-menu {
      display: flex;
    }

    .menu-item {
      padding: 5px;
    }

    .debug {
      display: inline-block;
      position: relative;
    }

    .debug-badge {
      position: absolute;
      top: 5px;
      right: 13px;
      transform: translateY(-50%) translateX(100%) scale(0.8);
    }

    .arrowdown {
      margin-top: 4px;
      margin-left: 3px;
    }

    .navbar-right {
      display: flex;
      justify-content: flex-end;
    }

    .navbar-right .vk-mask {
      background-color: rgba(255, 255, 255, 0);
    }

    .popup-menu__arrow {
      position: absolute;
      top: -6px;
      right: 20px;
      border-width: 6px;
      margin-right: 3px;
      border-top-width: 0;
      border-bottom-color: #ebeef5;
      filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
    }

    .popup-menu__arrow::after {
      content: " ";
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      border-width: 6px;
      top: 1px;
      margin-left: -6px;
      border-top-width: 0;
      border-bottom-color: #fff;
    }

    /* 大屏时，隐藏的内容 */
    .menu-icon,
    .navbar-middle,
    .navbar-user,
    .popup-menu__arrow,
    .navbar-right .vk-mask {
      display: none;
    }

    /* 小屏，显示的内容 */
    .navbar-mini .menu-icon,
    .navbar-mini .navbar-middle {
      display: block;
    }

    .navbar-mini .navbar-user {
      display: flex;
    }

    /* 小屏时，隐藏的内容 */
    .navbar-mini .menu-collapse,
    .navbar-mini .logo,
    .navbar-mini .debug,
    .navbar-mini .navbar-menu,
    .navbar-mini .navbar-menu .username,
    .navbar-mini .breadcrumb-view,
    .navbar-mini .mini-none {
      display: none;
    }

    .navbar-mini .navbar-menu {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: fixed;
      right: 20px;
      top: 50px;
      background-color: #fff;
      z-index: 999;
      padding: 0px 15px;
      margin: 5px 0;
      background-color: #fff;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    /* 小屏时，弹出下拉菜单 */
    .navbar-mini.popup-menu .navbar-menu {
      display: flex;
    }

    .navbar-mini.popup-menu .popup-menu__arrow,
    .navbar-mini.popup-menu .navbar-right .vk-mask {
      display: block;
    }

    .logout:hover {
      color: $menu-text-color-actived;
    }
  }

  /* 右上 */
  .right-top {
    height: 50px;
  }

  /* 右下 - 标签页区域（若依风格）*/
  .right-bottom {
    padding: 0px 0px;
    height: 34px;
    background-color: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  }

  ::v-deep .navbar .top-bar .item-content {
    color: var(--textColor);
  }

  /* vk-data-menu-tabs 样式覆盖 - 若依TagsView风格 */
  ::v-deep .right-bottom {
    .vk-data-menu-tabs {
      height: 34px;
      line-height: 34px;
    }
    .el-tabs {
      height: 34px;
    }
    .el-tabs__header {
      margin: 0 !important;
      border-bottom: none !important;
      height: 34px !important; // 强制高度
    }
    .el-tabs__nav-wrap {
      padding: 0 15px !important;
      height: 34px !important; // 强制高度
      &::after {
        display: none !important; // 移除底部灰色长线
      }
    }
    .el-tabs__nav-scroll {
      height: 34px !important;
      line-height: 34px !important;
    }
    .el-tabs__nav {
      border: none !important; // 移除默认边框，由 item 自理
      height: 34px !important;
      display: flex !important;
      align-items: center !important; // 强制子项居中
    }
    .el-tabs__active-bar {
      display: none !important;
    }
    .el-tabs__item {
      height: 26px !important;
      line-height: 24px !important; // 配合 border 实现视觉居中
      border: 1px solid #d8dce5 !important;
      color: #495060 !important;
      background: #fff !important;
      padding: 0 8px !important;
      font-size: 12px !important;
      margin-left: 5px;
      margin-top: 0px !important; // 移除 margin-top
      border-radius: 0 !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;

      &:first-of-type {
        margin-left: 15px !important;
      }

      // 覆盖关闭图标样式，确保严格居中
      .el-icon-close {
        width: 14px !important;
        height: 14px !important;
        line-height: 14px !important;
        vertical-align: middle !important;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        font-size: 10px; // 稍微调小图标字号
        transform: scale(0.9);
        margin-left: 5px;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        position: relative;
        top: 0px;

        &:before {
          display: inline-block;
          transform: scale(0.8);
          margin-top: 1px; // 修正叉号在圆圈内的微量偏位
        }

        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }

      &.is-active {
        background-color: #42b983;
        color: #fff !important;
        border-color: #42b983 !important;

        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 5px;
          vertical-align: middle;
        }

        // 激活状态颜色改为若依蓝
        background-color: #1890ff !important;
        border-color: #1890ff !important;
      }
    }
  }

  /* logo模式一一开始 纯图片 */
  .logo-mode-1 {
    display: flex;
    align-items: center;
    justify-content: center;

    .logo-image {
      width: 100%;
      height: 50px;
      display: block;
    }
  }

  /* logo模式一结束 */

  /* logo模式二开始 logo+文字 */
  .logo-mode-2 {
    .logo-box {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #191a23;
      height: 50px;

      .logo-image {
        width: 38px;
        height: 38px;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 50%;
      }

      .app-name {
        width: 100%;
        text-align: left;
        flex: 1;
        line-height: 50px;
        font-size: 20px;
        background-image: -webkit-linear-gradient(
          left,
          #147b96,
          #e6d205 25%,
          #147b96 50%,
          #e6d205 75%,
          #147b96
        );
        background-image: linear-gradient(
          to right,
          #147b96,
          #e6d205 25%,
          #147b96 50%,
          #e6d205 75%,
          #147b96
        );
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-background-size: 200% 100%;
        background-size: 200% 100%;
        -webkit-animation: masked-animation 4s infinite linear;
        animation: masked-animation 4s infinite linear;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      @-webkit-keyframes masked-animation {
        0% {
          background-position: 0 0;
        }

        100% {
          background-position: -100% 0;
        }
      }
      @keyframes masked-animation {
        0% {
          background-position: 0 0;
        }

        100% {
          background-position: -100% 0;
        }
      }
    }
  }

  /* logo模式二结束 */
}
</style>
