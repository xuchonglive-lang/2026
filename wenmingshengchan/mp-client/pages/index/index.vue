<template>
  <view class="page-index grid-texture">
    <cu-custom bgColor="bg-gradual-blue" :isCustom="true">
      <block slot="backText"></block>
      <block slot="content">首页</block>
    </cu-custom>
    
    
    <!-- #ifdef MP-WEIXIN -->
    
    <!-- #endif -->
    <view class="main-content">
      <!-- 轮播图组件 -->
      <view class="swiper-box" v-if="swiperList.length > 0">
        <u-swiper :list="swiperList" :title="true" mode="round" indicator-pos="bottomCenter" height="320"
          @click="navToLiveStatus"></u-swiper>
      </view>
      
      <!-- 操作控制台 -->
      <view class="glass-card console-card">
        <text class="console-title headline-font">操作控制台</text>
        <text class="console-subtitle">尊敬的{{ userInfo.nickname || '用户' }}，以下是需要您执行的任务。</text>

        <view class="stats-row">
          <view class="stat-item" @tap="navToTodo">
            <text class="stat-number headline-font">{{ todoCount }}</text>
            <view class="stat-desc">
              <u-icon name="map-fill" color="#0050cb" size="24"></u-icon>
              <text class="stat-label">待反馈\n重控点位</text>
            </view>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item" @tap="navToProjectTodo">
            <text class="stat-number headline-font">0</text>
            <view class="stat-desc">
              <u-icon name="star-fill" color="#0050cb" size="24"></u-icon>
              <text class="stat-label">待反馈\n重点工作</text>
            </view>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item" @tap="navToPlanTodo">
            <text class="stat-number headline-font">0</text>
            <view class="stat-desc">
              <u-icon name="calendar-fill" color="#0050cb" size="24"></u-icon>
              <text class="stat-label">待反馈\n日计划</text>
            </view>
          </view>
        </view>

        <view class="action-btn" hover-class="action-btn-hover" @tap="navToLiveStatus">
          <u-icon name="eye-fill" color="#ffffff" size="36"></u-icon>
          <text class="action-btn-text headline-font">现场实时状态查看</text>
        </view>
      </view>

      <!-- Bento Grid Dashboard -->
      <view class="bento-grid">
        <!-- Task List Card (专业信息告知) -->
        <view class="glass-card list-card span-2">
          <view class="list-header" @tap="navToInfo">
            <text class="list-title headline-font">专业信息告知</text>
            <view class="list-more">
              <text>更多</text>
              <u-icon name="arrow-right" size="24"></u-icon>
            </view>
          </view>
          <view class="list-body">
            <view class="list-item" v-for="(item, index) in infoList" :key="index" @tap="navToInfoDetail(item._id)">
              <u-icon :name="item._iconName" color="#0050cb" size="40"></u-icon>
              <view class="item-content">
                <text class="item-title u-line-1">{{ item.title }}</text>
                <view class="item-desc">
                  <text>{{ vk.pubfn.timeFormat(item.publish_time, 'yyyy-MM-dd') }}</text>
                  <text class="item-tag" :class="item._tagClass">{{ item.category_info && item.category_info[0] ?
                    item.category_info[0].name : '综合信息' }}</text>
                </view>
              </view>
              <u-icon name="arrow-right" color="#424656" size="28"></u-icon>
            </view>
            <view v-if="infoList.length === 0"
              style="text-align: center; color: #999; font-size: 24rpx; padding: 20rpx;">暂无最新信息</view>
          </view>
        </view>

        <!-- 现场问题公示模块 -->
        <view class="glass-card list-card span-2">
          <view class="list-header" @tap="navToPublicBoard">
            <text class="list-title headline-font">现场问题公示</text>
            <view class="list-more">
              <text>更多</text>
              <u-icon name="arrow-right" size="24"></u-icon>
            </view>
          </view>
          <view class="list-body">
            <view class="list-item" v-for="(item, index) in reportList" :key="item._id" @tap="navToPublicBoard">
              <u-icon :name="item._iconName" :color="item._iconColor" size="40"></u-icon>
              <view class="item-content">
                <text class="item-title u-line-1">{{ item.title }}</text>
                <view class="item-desc">
                  <text>{{ vk.pubfn.timeFormat(item._add_time, 'MM-dd hh:mm') }} · {{ item.publisher || '匿名' }}</text>
                  <text class="item-tag" :class="item._tagClass">{{ item._statusText }}</text>
                </view>
              </view>
              <u-icon name="arrow-right" color="#424656" size="28"></u-icon>
            </view>
            <view v-if="reportList.length === 0"
              style="text-align: center; color: #999; font-size: 24rpx; padding: 20rpx;">暂无报备信息</view>
          </view>
        </view>
      </view>
    </view>

    <my-tab-bar :current="0"></my-tab-bar>
  </view>
</template>

<script>
let vk = uni.vk;
export default {
  data() {
    return {
      vk,
      userInfo: {},
      todoCount: 0,
      infoList: [],
      reportList: [],
      swiperList: []
    };
  },
  onLoad(options = {}) {
    vk = uni.vk;
    this.options = options;
  },
  onShow() {
    this.userInfo = vk.getVuex('$user.userInfo') || {};
    this.fetchTodoCount();
    this.fetchInfoList();
    this.fetchReportList();
    this.fetchSwiperList();
  },
  methods: {
    navToInfo() { uni.switchTab({ url: '/pages/info/index' }); },
    navToInfoDetail(id) { uni.navigateTo({ url: `/pages/info/detail/index?id=${id}` }); },
    navToTodo() { uni.switchTab({ url: '/pages/feedback/todo-list/index' }); },
    navToProjectTodo() {
      uni.setStorageSync('projectListFilter', 'needMyFeedback');
      uni.switchTab({ url: '/pages/keywork/project/list/index' });
    },
    navToPlanTodo() {
      uni.setStorageSync('planListFilter', 'needMyExecute');
      uni.switchTab({ url: '/pages/plan/list' });
    },
    navToLiveStatus() { uni.navigateTo({ url: '/pages/showpoint/showpoint' }); },
    navToPublicBoard() { uni.navigateTo({ url: '/pages/report/public-board/index' }); },
    async fetchTodoCount() {
      try {
        let res = await vk.callFunction({
          url: 'client/feedback/kh/getTodoCount',
          data: {}
        });
        if (res.code === 0) {
          this.todoCount = res.count || 0;
        }
      } catch (err) {
        console.log("获取工单红点数失败", err);
      }
    },
    async fetchInfoList() {
      try {
        let res = await vk.callFunction({
          url: 'client/info/kh/getListByCategory',
          data: {
            pageIndex: 1,
            pageSize: 4
          }
        });
        if (res.code === 0 && res.rows) {
          const icons = ['file-text-fill', 'volume-fill', 'info-circle-fill', 'list-dot'];
          const classes = [
            'bg-blue-sub text-primary',
            'bg-orange-sub text-orange',
            'bg-purple-sub text-purple',
            'bg-teal-sub text-teal'
          ];
          this.infoList = res.rows.map((item, index) => {
            item._iconName = icons[index % icons.length];
            item._tagClass = classes[index % classes.length];
            return item;
          });
        }
      } catch (err) {
        console.log("获取最新信息失败", err);
      }
    },
    async fetchReportList() {
      try {
        let res = await vk.callFunction({
          url: 'client/report/kh/getPublicList',
          data: {
            pageIndex: 1,
            pageSize: 4,
            whereJson: {}
          }
        });
        if (res.code === 0 && res.rows) {
          this.reportList = res.rows.map(item => {
            if (item.status === 2) {
              item._iconName = 'checkmark-circle-fill';
              item._iconColor = '#15803d'; // green
              item._tagClass = 'bg-green-sub text-green';
              item._statusText = '已解决';
            } else if (item.status === 1) {
              item._iconName = 'error-circle-fill';
              item._iconColor = '#b45309'; // amber
              item._tagClass = 'bg-amber-sub text-amber';
              item._statusText = '处理中';
            } else {
              item._iconName = 'setting-fill';
              item._iconColor = '#b91c1c'; // red
              item._tagClass = 'bg-red-sub text-red';
              item._statusText = '待处理';
            }
            return item;
          });
        }
      } catch (err) {
        console.log("获取报备信息失败", err);
      }
    },
    async fetchSwiperList() {
      try {
        let res = await vk.callFunction({
          url: 'client/feedback/kh/getLatestPhotos',
          data: {}
        });
        if (res.code === 0 && res.rows) {
          this.swiperList = res.rows;
        }
      } catch (err) {
        console.log("获取轮播图失败", err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/* Typography */
.headline-font {
  font-family: 'Manrope', sans-serif;
}

.font-bold {
  font-weight: bold;
}

.font-black {
  font-weight: 900;
}

.font-semibold {
  font-weight: 600;
}

.page-index {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
  min-height: 100vh;
  padding-bottom: 240rpx;
  /* Leave space for tab bar */
}

.grid-texture {
  background-image: radial-gradient(rgba(0, 80, 203, 0.05) 1px, transparent 1px);
  background-size: 40rpx 40rpx;
}

.main-content {
  padding: 32rpx 32rpx 0;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.swiper-box {
  margin-bottom: 8rpx;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 12rpx 32rpx rgba(0, 80, 203, 0.15);
}

.glass-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(40rpx);
  -webkit-backdrop-filter: blur(40rpx);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08);
  border-radius: 24rpx;
}

/* Console Card */
.console-card {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.console-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #191c1e;
}

.console-subtitle {
  font-size: 24rpx;
  font-weight: 600;
  color: #191c1e;
  margin-top: -16rpx;
}

.stats-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.3);
  padding: 16rpx;
  border-radius: 16rpx;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.stat-number {
  font-size: 52rpx;
  font-weight: 900;
  color: #FF6B00;
  line-height: 1;
  letter-spacing: -2rpx;
}

.stat-desc {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rpx;
}

.stat-label {
  font-size: 20rpx;
  font-weight: bold;
  color: #191c1e;
  text-align: center;
  line-height: 1.2;
  margin-top: 4rpx;
}

.stat-divider {
  width: 2rpx;
  height: 48rpx;
  background: rgba(0, 0, 0, 0.08);
}

.action-btn {
  width: 100%;
  padding: 16rpx 0;
  background-color: #0050cb;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 80, 203, 0.25);
  transition: all 0.3s;
}

.action-btn-hover {
  transform: scale(0.95);
}

.action-btn-text {
  color: #ffffff;
  font-size: 28rpx;
  font-weight: bold;
}

/* Bento Grid */
.bento-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32rpx;
  margin-bottom: 32rpx;
}

.span-2 {
  grid-column: span 2;
}

/* List Cards */
.list-card {
  padding: 24rpx;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.list-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #191c1e;
}

.list-more {
  display: flex;
  align-items: center;
  gap: 4rpx;
  color: rgba(0, 80, 203, 0.8);
  font-size: 24rpx;
  font-weight: 600;
  cursor: pointer;
}

.list-body {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 24rpx;
  padding: 12rpx 16rpx;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 16rpx;
  cursor: pointer;
}

.item-content {
  flex: 1;
}

.item-title {
  font-size: 24rpx;
  font-weight: bold;
  color: #191c1e;
}

.item-desc {
  display: flex;
  align-items: center;
  font-size: 20rpx;
  color: #424656;
  margin-top: 8rpx;
}

.item-tag {
  margin-left: 16rpx;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
  font-size: 18rpx;
  font-weight: bold;
}

.bg-blue-sub {
  background: rgba(219, 234, 254, 0.5);
}

.text-primary {
  color: #0050cb;
}

.bg-orange-sub {
  background: rgba(255, 237, 213, 0.5);
}

.text-orange {
  color: #ea580c;
}

.bg-purple-sub {
  background: rgba(243, 232, 255, 0.5);
}

.text-purple {
  color: #7e22ce;
}

.bg-teal-sub {
  background: rgba(204, 251, 241, 0.5);
}

.text-teal {
  color: #0f766e;
}

.bg-amber-sub {
  background: rgba(254, 243, 199, 0.5);
}

.text-amber {
  color: #b45309;
}

.bg-green-sub {
  background: rgba(220, 252, 231, 0.5);
}

.text-green {
  color: #15803d;
}

.bg-red-sub {
  background: rgba(254, 226, 226, 0.5);
}

.text-red {
  color: #b91c1c;
}
</style>
