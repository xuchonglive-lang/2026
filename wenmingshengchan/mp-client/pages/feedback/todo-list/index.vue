<template>
  <view class="feedback-todo-page">
    <view class="industrial-grid"></view>
    
    <view class="main-content">
      <!-- Title -->
      <view class="page-title-wrap">
        <text class="page-title">待反馈点位</text>
      </view>
      
      <!-- Summary Header -->
      <view class="summary-header">
        <view class="summary-info">
          <text class="status-label">状态概览</text>
          <view class="status-value-wrap">
            <text class="status-count">{{ listData.length }}</text>
            <text class="status-suffix">项待处理</text>
          </view>
        </view>
        <view class="preview-btn" @click="goTo('/pages/feedback/history/index')">
          <text class="preview-btn-text">已反馈信息预览</text>
        </view>
      </view>

      <!-- Point Cards Area -->
      <view class="cards-container">
        <!-- 动态渲染真实数据 -->
        <view 
          class="point-card glass-card" 
          v-for="item in listData" 
          :key="item._id"
        >
          <view class="card-top">
            <view class="icon-box">
              <text class="material-symbols-outlined icon-location">location_on</text>
            </view>
            <view class="card-info">
              <view class="card-title-row">
                <text class="card-title">{{ item.point_info && item.point_info[0] ? item.point_info[0].name : "未知重控点" }}</text>
                <view class="status-badge"><text class="badge-text" style="color: #ea580c">紧急待办</text></view>
              </view>
              <view class="card-subtitle-row">
                <text class="material-symbols-outlined icon-domain">domain</text>
                <text class="card-subtitle">{{ item.area_info && item.area_info[0] ? item.area_info[0].name : "" }}</text>
              </view>
            </view>
          </view>
          <view class="card-bottom">
            <view class="time-info-wrap">
              <view class="time-range">
                <text class="material-symbols-outlined icon-schedule">schedule</text>
                <text class="time-text">班次定点快照：{{ item.shift_date || '' }} ({{ item.shift_type === 'day' ? '白班' : '夜班' }})</text>
              </view>
            </view>
            <view class="action-btn" @click="goSubmit(item)">
              <text class="action-btn-text">开始反馈</text>
              <text class="material-symbols-outlined icon-arrow">arrow_forward_ios</text>
            </view>
          </view>
        </view>
        
        <view v-if="!loading && listData.length === 0" style="text-align: center; margin-top: 100rpx; color: #666;">
           暂无需要处理的巡检任务
        </view>
      </view>
    </view>
    
    <my-tab-bar :current="3"></my-tab-bar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      listData: [],
      loading: true
    }
  },
  onShow() {
    this.fetchData();
  },
  onPullDownRefresh() {
    this.fetchData().then(() => {
	   uni.stopPullDownRefresh();
	});
  },
  methods: {
    goTo(url) {
      uni.navigateTo({ url });
    },
    goSubmit(item) {
      // 传递必要信息到提交页
      uni.navigateTo({
         url: `/pages/feedback/submit/index?id=${item._id}&name=${item.point_info && item.point_info[0] ? item.point_info[0].name : ''}`
      });
    },
    async fetchData() {
      this.loading = true;
      try {
        let res = await uni.vk.callFunction({
          url: 'client/feedback/kh/getTodoList',
          data: {}
        });
        if (res.code === 0 && res.rows) {
          this.listData = res.rows;
        }
      } catch (err) {
         uni.vk.toast("获取待办列表失败");
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.feedback-todo-page {
  font-family: 'Inter', sans-serif;
  background-color: #f7f9fb;
  background-image: 
    radial-gradient(at 0% 0%, rgba(0, 80, 203, 0.05) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(0, 80, 203, 0.03) 0px, transparent 50%),
    linear-gradient(to bottom, #f7f9fb, #dae1ff);
  background-attachment: fixed;
  min-height: 100vh;
  position: relative;
}

.industrial-grid {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  background-size: 64rpx 64rpx; /* 32px */
  background-image: 
    linear-gradient(to right, rgba(0, 80, 203, 0.03) 2rpx, transparent 2rpx),
    linear-gradient(to bottom, rgba(0, 80, 203, 0.03) 2rpx, transparent 2rpx);
}

.main-content {
  position: relative;
  z-index: 1;
  padding: 64rpx 32rpx 192rpx 32rpx;
  max-width: 896rpx;
  margin: 0 auto;
}

.page-title-wrap {
  margin-bottom: 48rpx;
}
.page-title {
  font-family: 'Manrope', sans-serif;
  font-size: 60rpx;
  font-weight: 800;
  color: #191c1e;
  letter-spacing: -0.025em;
}

.summary-header {
  padding: 32rpx 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.status-label {
  display: block;
  font-size: 24rpx;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #1d4ed8;
  margin-bottom: 8rpx;
}
.status-value-wrap {
  display: flex;
  align-items: baseline;
}
.status-count {
  font-family: 'Manrope', sans-serif;
  font-size: 60rpx;
  font-weight: 800;
  color: #191c1e;
  margin-right: 12rpx;
}
.status-suffix {
  font-size: 36rpx;
  font-weight: 500;
  color: #424656;
}

.preview-btn {
  padding: 20rpx 32rpx;
  background-color: #0050cb;
  border-radius: 24rpx;
  box-shadow: 0 20rpx 30rpx -6rpx rgba(0, 80, 203, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}
.preview-btn:active {
  transform: scale(0.95);
}
.preview-btn-text {
  color: #ffffff;
  font-size: 24rpx;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.glass-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(40rpx);
  -webkit-backdrop-filter: blur(40rpx);
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08);
  border-radius: 24rpx;
  padding: 40rpx;
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.glass-card:active {
  transform: scale(0.98);
}

.card-top {
  display: flex;
  gap: 32rpx;
  margin-bottom: 32rpx;
}

.icon-box {
  width: 96rpx;
  height: 96rpx;
  flex-shrink: 0;
  border-radius: 24rpx;
  background-color: rgba(0, 80, 203, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-location {
  color: #0050cb;
  font-size: 48rpx;
}

.card-info {
  flex: 1;
  min-width: 0;
}
.card-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.card-title {
  font-family: 'Manrope', sans-serif;
  font-size: 32rpx;
  font-weight: 700;
  color: #191c1e;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.status-badge {
  flex-shrink: 0;
  padding: 4rpx 16rpx;
  background-color: #fef08a;
  border-radius: 16rpx;
  margin-left: 16rpx;
}
.badge-text {
  font-size: 20rpx;
  font-weight: 700;
  text-transform: uppercase;
}

.card-subtitle-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-top: 4rpx;
}
.icon-domain {
  font-size: 28rpx;
  color: #424656;
}
.card-subtitle {
  font-size: 24rpx;
  font-weight: 500;
  color: #424656;
}

.card-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-top: 32rpx;
  border-top: 2rpx solid rgba(255, 255, 255, 0.1);
}

.time-info-wrap {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.time-range {
  display: flex;
  align-items: center;
  gap: 12rpx;
}
.icon-schedule {
  font-size: 28rpx;
  color: #424656;
}
.time-text {
  font-size: 20rpx;
  font-weight: 500;
  color: #424656;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 16rpx 32rpx;
  background-color: rgba(0, 80, 203, 0.05);
  border-radius: 24rpx;
  transition: background-color 0.3s;
}
.action-btn:active {
  background-color: rgba(0, 80, 203, 0.1);
}
.action-btn-text {
  color: #0050cb;
  font-weight: 700;
  font-size: 24rpx;
  text-transform: uppercase;
}
.icon-arrow {
  color: #0050cb;
  font-size: 28rpx;
}
</style>
