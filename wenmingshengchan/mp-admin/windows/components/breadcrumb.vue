<template>
  <view class="mini-none breadcrumb-view">
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <!-- 首页项 -->
      <el-breadcrumb-item>
        <text class="breadcrumb-link" @click="pageTo({ url: '/' })">首页</text>
      </el-breadcrumb-item>
      <!-- 当前路径 -->
      <el-breadcrumb-item v-for="(item, index) in menuMapList" :key="index">
        <text
          v-if="index === menuMapList.length - 1"
          class="breadcrumb-no-redirect"
          >{{ item.name }}</text
        >
        <text v-else class="breadcrumb-link" @click="pageTo(item)">{{
          item.name
        }}</text>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </view>
</template>

<script>
export default {
  props: {},
  data: function () {
    return {};
  },
  mounted() {},
  methods: {
    pageTo(item = {}) {
      let { vk } = this;
      if (item.url) {
        vk.navigateTo(item.url);
      }
    },
  },
  watch: {},
  filters: {},
  computed: {
    menuMapList() {
      let list = this.vk.getVuex("$app.menuMap") || [];
      // 过滤掉没有name的项
      return list.filter((item) => item.name);
    },
    isHome() {
      // 当没有menuMap或只有一个空项时，认为是首页
      let list = this.menuMapList;
      if (list.length === 0) return true;
      // 当路径就是首页时
      let route = this.vk.getVuex("$app.route") || {};
      if (route.path === "/" || route.path === "/pages/index/index")
        return true;
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb-view {
  display: flex;
  align-items: center;
}
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
}
.breadcrumb-link {
  color: #606266;
  cursor: pointer;
  &:hover {
    color: #409eff;
  }
}
.breadcrumb-no-redirect {
  color: #97a8be;
  cursor: text;
}
</style>
