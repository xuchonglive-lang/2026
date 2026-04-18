<template>
  <view class="page-container industrial-bg industrial-grid">
    <view class="main-content">
      <!-- Header Title -->
      <view class="header-row">
        <text class="page-title font-headline font-extrabold text-on-surface">重点推进项目</text>
        <view class="notif-btn bg-glass">
          <text class="material-symbols-outlined text-on-surface-variant">notifications</text>
        </view>
      </view>

      <!-- Status Tabs Component -->
      <view class="tab-system">
        <view class="status-tabs">
          <view class="tab active-tab bg-white">进行中</view>
          <view class="tab glass-tab">待验收</view>
          <view class="tab glass-tab">已完成</view>
        </view>

        <!-- Search Panel -->
        <view class="search-panel glass-card-panel">
          <view class="form-group-1">
            <view class="select-wrapper">
              <text class="select-text">全部区域</text>
              <text class="material-symbols-outlined icon">expand_more</text>
            </view>
            <view class="date-pickers">
              <view class="date-wrapper">
                <text class="date-text">2024-01-01</text>
              </view>
              <view class="date-wrapper">
                <text class="date-text">2024-12-31</text>
              </view>
            </view>
          </view>
          
          <view class="btn-group">
            <view class="btn-feedback active-press">
              <text class="material-symbols-outlined icon">chat_bubble_outline</text>
              <text>需要我反馈</text>
            </view>
            <view class="btn-primary active-press">
              <text class="material-symbols-outlined icon">search</text>
              <text>点击查询</text>
            </view>
          </view>
        </view>
      </view>

      <!-- Area Tabs -->
      <view class="area-options">
        <scroll-view scroll-x class="area-scroll" :show-scrollbar="false">
          <view class="area-row">
            <view class="area-tab active">
              <text>全部区域</text>
              <view class="active-indicator"></view>
            </view>
            <view class="area-tab"><text>A区</text></view>
            <view class="area-tab"><text>B区</text></view>
            <view class="area-tab"><text>C区</text></view>
            <view class="area-tab"><text>D区</text></view>
            <view class="area-tab"><text>研发中心</text></view>
          </view>
        </scroll-view>
      </view>

      <!-- Project List -->
      <view class="project-list">
        <!-- List loop -->
        <view v-for="(item, index) in dataList" :key="item._id" class="glass-card project-card">
          <view class="card-header">
            <text class="card-title">{{ item.title }}</text>
            <text class="status-chip" :class="getStatusClass(item.status)">{{ getStatusName(item.status) }}</text>
          </view>
          <view class="card-roles">
            <view class="role-group">
              <text class="role-label">执行人配置数：{{ item.assignee_uids ? item.assignee_uids.length : 0 }}人</text>
              <view class="avatars" v-if="item.assignee_uids && item.assignee_uids.length > 0">
                <view class="avatar-more">👥</view>
              </view>
            </view>
            <view class="role-group" v-if="item.point_info && item.point_info[0]">
              <text class="role-label">点位：{{ item.point_info[0].name }}</text>
            </view>
          </view>
          <view class="card-footer border-t">
            <view class="footer-info">
              <view class="deadline">
                <text class="material-symbols-outlined text-sm">calendar_today</text>
                <text>时限: {{ item.deadline ? vk.pubfn.timeFormat(item.deadline, 'yyyy.MM.dd') : '无限制' }}</text>
              </view>
              <view class="progress-chip" :class="getDelayClass(item.deadline, item.status)">
                <view class="pulse-dot" v-if="!isDelay(item.deadline, item.status)"></view>
                <text class="material-symbols-outlined" v-else>warning</text>
                <text>{{ getDelayText(item.deadline, item.status) }}</text>
              </view>
            </view>
            <view class="view-detail" @click="goToDetail(item._id)">
              <text>查看详情</text>
              <text class="material-symbols-outlined text-sm">chevron_right</text>
            </view>
          </view>
        </view>

        <!-- Empty State -->
        <view v-if="dataList.length === 0 && !loading" style="padding: 40rpx 0;">
          <u-empty text="暂无负责的重点项目" mode="data"></u-empty>
        </view>

        <!-- Place empty block for bottom bar space -->
        <view class="bottom-spacer"></view>
      </view>
    </view>
    <my-tab-bar :current="2"></my-tab-bar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      vk: uni.vk,
      dataList: [],
      pageIndex: 1,
      hasMore: true,
      loading: false
    };
  },
  onLoad() {
    this.getList(true);
  },
  onPullDownRefresh() {
    this.getList(true).then(() => uni.stopPullDownRefresh());
  },
  onReachBottom() {
    if (this.hasMore) {
      this.getList(false);
    }
  },
  methods: {
    getList(isRefresh = false) {
      if (isRefresh) {
        this.pageIndex = 1;
        this.hasMore = true;
        this.dataList = [];
      }
      this.loading = true;
      return new Promise((resolve) => {
        this.vk.callFunction({
          url: 'client/keywork/kh/getProjectList',
          data: {
            pageIndex: this.pageIndex,
            pageSize: 10
          },
          success: (res) => {
            if (res.rows.length < 10) this.hasMore = false;
            this.dataList = this.dataList.concat(res.rows);
            this.pageIndex++;
          },
          complete: () => {
            this.loading = false;
            resolve();
          }
        });
      });
    },
    goToDetail(id) {
      uni.navigateTo({
        url: '/pages/keywork/project/process-feed/index?id=' + id
      });
    },
    getStatusName(status) {
      const map = { 0: '进行中', 1: '待验收', 2: '已完成', 3: '被驳回' };
      return map[status] || '未知';
    },
    getStatusClass(status) {
      if (status === 2) return 'safe';
      if (status === 3) return 'delay';
      return 'in-progress';
    },
    isDelay(deadline, status) {
      if (!deadline || status === 2) return false;
      return new Date().getTime() > deadline;
    },
    getDelayText(deadline, status) {
      if (status === 2) return '已归档';
      if (this.isDelay(deadline, status)) return '严重拖期';
      return '正常推进';
    },
    getDelayClass(deadline, status) {
      if (status === 2) return 'safe';
      if (this.isDelay(deadline, status)) return 'delay';
      return 'safe';
    }
  }
};
</script>

<style scoped lang="scss">
// Common SCSS variables from DESIGN.md
$primary: #0050cb;
$primary-container: #0066ff;
$surface: #f7f9fb;
$on-surface: #191c1e;
$on-surface-variant: #424656;
$outline: #727687;
$bg-safe: #ecfdf5; // green-50
$text-safe: #047857; // green-700
$bg-delay: rgba(255, 218, 214, 0.5); // error-container/20 mapping roughly
$text-delay: #ba1a1a;

.page-container {
  min-height: 100vh;
  box-sizing: border-box;
  font-family: Inter, sans-serif;
  padding-bottom: 96rpx; // pb-24
}

.main-content {
  padding: 32rpx 16rpx;
  max-width: 896rpx;
  margin: 0 auto;
}

// Typography
.font-headline {
  font-family: Manrope, sans-serif;
}
.font-extrabold {
  font-weight: 800;
}
.text-on-surface {
  color: $on-surface;
}
.text-on-surface-variant {
  color: $on-surface-variant;
}
.text-sm {
  font-size: 28rpx;
}
.text-xs {
  font-size: 24rpx;
}
.border-t { border-top: 1px solid rgba(0,0,0,0.05); }

// Header
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8rpx;
  margin-bottom: 48rpx;
}
.page-title {
  font-size: 48rpx;
  letter-spacing: -0.02em;
}
.notif-btn {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 4rpx rgba(0,0,0,0.05);
}

// Status Tabs System
.tab-system {
  margin-bottom: 32rpx;
}
.status-tabs {
  display: flex;
  align-items: flex-end;
  padding: 0 8rpx;
  margin-bottom: -1px;
}
.tab {
  position: relative;
  padding: 20rpx 48rpx;
  font-size: 28rpx;
  border-radius: 24rpx 24rpx 0 0;
  border: 1px solid rgba(255,255,255,0.6);
  border-bottom: none;
  margin-right: -16rpx;
}
.tab.active-tab {
  z-index: 30;
  background: #fff;
  color: $primary;
  font-weight: 700;
  box-shadow: 0 -8rpx 24rpx -4rpx rgba(0, 80, 203, 0.08);
}
.tab.glass-tab {
  z-index: 20;
  background: rgba(255,255,255,0.3);
  backdrop-filter: blur(12px);
  color: $outline;
  font-weight: 500;
  opacity: 0.8;
  border-color: rgba(255,255,255,0.4);
}
.tab:nth-child(3) {
  z-index: 10;
}

// Search Panel
.search-panel {
  position: relative;
  z-index: 40;
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(24px);
  border-radius: 0 32rpx 32rpx 32rpx;
  padding: 32rpx;
  border: 1px solid rgba(255,255,255,0.8);
  box-shadow: 0 24rpx 80rpx -24rpx rgba(0,80,203,0.12);
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}
.form-group-1 {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
.select-wrapper, .date-wrapper {
  position: relative;
  background: rgba(255,255,255,0.8);
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 24rpx;
  padding: 16rpx 24rpx;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.date-pickers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
}
.btn-group {
  display: flex;
  gap: 16rpx;
}
.btn-feedback, .btn-primary {
  flex: 1;
  padding: 20rpx 24rpx;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  font-size: 24rpx;
  font-weight: 700;
}
.btn-feedback {
  background: rgba(255,255,255,0.6);
  border: 1px solid rgba(0,80,203,0.2);
  color: $primary;
}
.btn-primary {
  background: $primary;
  color: #fff;
  box-shadow: 0 8rpx 16rpx rgba(0,80,203,0.2);
}

// Area Tabs
.area-options {
  margin-bottom: 32rpx;
}
.area-scroll {
  white-space: nowrap;
}
.area-row {
  display: flex;
  gap: 48rpx;
  padding: 0 8rpx 8rpx;
}
.area-tab {
  position: relative;
  font-size: 28rpx;
  font-weight: 500;
  color: $outline;
  padding: 8rpx 0;
}
.area-tab.active {
  color: $primary;
  font-weight: 700;
}
.active-indicator {
  position: absolute;
  bottom: -8rpx;
  left: 0;
  right: 0;
  height: 4rpx;
  background: $primary;
  border-radius: 4rpx;
}

// Project List Cards
.project-list {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}
.project-card {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  box-shadow: 0 8rpx 32rpx 0 rgba(0,80,203,0.04);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.card-title {
  font-weight: 700;
  font-size: 32rpx;
  line-height: 1.4;
  padding-right: 32rpx;
}
.status-chip {
  flex-shrink: 0;
  padding: 4rpx 20rpx;
  border-radius: 999rpx;
  font-size: 20rpx;
  font-weight: 700;
}
.status-chip.in-progress {
  background: #eff6ff;
  color: $primary;
  border: 1px solid rgba(0,80,203,0.1);
}

.card-roles {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;
}
.role-group {
  display: flex;
  align-items: center;
  gap: 16rpx;
}
.role-label {
  color: $on-surface-variant;
  font-weight: 500;
}
.avatars {
  display: flex;
  margin-left: 16rpx; // Offset due to neg margin in children
}
.avatar {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  border: 4rpx solid #fff;
  margin-left: -16rpx;
}
.avatar:first-child {
  margin-left: 0; // Fixes layout
}
.avatar.plain {
  border: 1px solid rgba(0,80,203,0.2);
  margin-left: 0;
}
.avatar-more {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background: $surface;
  border: 4rpx solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16rpx;
  font-weight: 700;
  margin-left: -16rpx;
}

// Card Footer
.card-footer {
  padding-top: 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-info {
  display: flex;
  align-items: center;
  gap: 32rpx;
}
.deadline {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: 20rpx;
  font-weight: 500;
  color: $outline;
}
.progress-chip {
  padding: 4rpx 16rpx;
  border-radius: 8rpx;
  font-size: 20rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8rpx;
}
.progress-chip.safe {
  background: $bg-safe;
  color: $text-safe;
}
.progress-chip.delay {
  background: $bg-delay;
  color: $text-delay;
}
.progress-chip .material-symbols-outlined {
  font-size: 24rpx;
}
.pulse-dot {
  width: 8rpx;
  height: 8rpx;
  background: #059669;
  border-radius: 50%;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(5,150,105,0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 12rpx rgba(5,150,105,0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(5,150,105,0); }
}

.view-detail {
  font-size: 22rpx;
  font-weight: 700;
  color: $primary;
  display: flex;
  align-items: center;
  gap: 4rpx;
}
.bottom-spacer {
  height: 48rpx;
}
</style>
