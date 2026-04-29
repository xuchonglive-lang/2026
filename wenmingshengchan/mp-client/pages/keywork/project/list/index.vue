<template>
  <view class="page-container industrial-bg industrial-grid">
    <cu-custom bgColor="bg-gradual-blue" :isCustom="true">
      <block slot="backText"></block>
      <block slot="content">重点项目</block>
    </cu-custom>
    
    
    <z-paging ref="paging" v-model="dataList" @query="queryList" default-page-size="10" empty-view-text="暂无负责的重点项目"
      :fixed="true">
      <template slot="top">
        <view class="main-content top-content">
          <!-- Header Title -->
          <view class="header-row">
            <view class="section-title-wrap">
              <text class="page-title">重点推进项目</text>
              <text class="page-subtitle">KEY PROJECTS</text>
            </view>
            <view class="notif-btn bg-glass">
              <text class="material-symbols-outlined text-on-surface-variant">notifications</text>
            </view>
          </view>

          <!-- Status Tabs Component -->
          <view class="tab-system">
            <view class="status-tabs">
              <view class="tab" :class="currentStatus === 0 ? 'active-tab bg-white' : 'glass-tab'"
                @click="changeStatus(0)">进行中</view>
              <view class="tab" :class="currentStatus === 1 ? 'active-tab bg-white' : 'glass-tab'"
                @click="changeStatus(1)">待验收</view>
              <view class="tab" :class="currentStatus === 2 ? 'active-tab bg-white' : 'glass-tab'"
                @click="changeStatus(2)">已完成</view>
            </view>

            <!-- Search Panel -->
            <view class="search-panel glass-card-panel">
              <view class="form-group-1">
                <view class="select-wrapper" @click="showLocationSelect = true">
                  <text class="select-text">{{ locationName }}</text>
                  <text class="material-symbols-outlined icon">expand_more</text>
                </view>
                <view class="date-pickers" @click="showCalendar = true">
                  <view class="date-wrapper">
                    <text class="date-text" :class="{ 'placeholder': !startDate }">{{ startDate || '开始日期' }}</text>
                  </view>
                  <view class="date-wrapper">
                    <text class="date-text" :class="{ 'placeholder': !endDate }">{{ endDate || '结束日期' }}</text>
                  </view>
                </view>
              </view>

              <view class="btn-group">
                <view class="btn-feedback active-press" :class="{ 'active-filter': needMyFeedback }"
                  @click="toggleMyFeedback">
                  <text class="material-symbols-outlined icon">{{ needMyFeedback ? 'check_box' :
                    'check_box_outline_blank' }}</text>
                  <text>需要我反馈</text>
                </view>
                <view class="btn-primary active-press" @click="doSearch">
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
                <view class="area-tab" :class="{ active: currentAreaId === '' }" @click="changeArea('', '全部区域')">
                  <text>全部区域</text>
                  <view class="active-indicator" v-if="currentAreaId === ''"></view>
                </view>
                <view class="area-tab" v-for="area in locationTree" :key="area.value"
                  :class="{ active: currentAreaId === area.value }" @click="changeArea(area.value, area.label)">
                  <text>{{ area.label }}</text>
                  <view class="active-indicator" v-if="currentAreaId === area.value"></view>
                </view>
              </view>
            </scroll-view>
          </view>
        </view>
      </template>

      <view class="main-content list-content">
        <!-- Project List -->
        <view class="project-list">
          <!-- List loop -->
          <view v-for="(item, index) in dataList" :key="item._id" class="glass-card project-card">
            <view class="card-header">
              <text class="card-title">{{ item.title }}</text>
              <u-tag :text="item._statusName" :type="item._tagType" mode="light" shape="circle" size="mini" />
            </view>
            <view class="roles-row">
              <!-- 执行人区域 -->
              <view class="role-executors">
                <text class="role-label">执行人：</text>
                <text class="role-names">{{ getAssigneeNames(item.assignee_info) }}</text>
                <view class="avatar-stack" v-if="item.assignee_info && item.assignee_info.length > 0">
                  <image class="stack-avatar" v-for="(user, idx) in item.assignee_info.slice(0, 2)" :key="idx"
                    :src="user.avatar || 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8e65bd20-00f7-41a4-969c-2f223f04473b/38890db3-1dce-4467-bc22-b2f56b50937c.png'"
                    mode="aspectFill"></image>
                  <view class="stack-more" v-if="item.assignee_info.length > 2">
                    +{{ item.assignee_info.length - 2 }}
                  </view>
                </view>
              </view>

              <!-- 验收人区域 -->
              <view class="role-verifier">
                <text class="role-label">验收人：</text>
                <text class="role-names">{{ getVerifierName(item.create_user_info) }}</text>
                <image class="verifier-avatar" :src="getVerifierAvatar(item.create_user_info)" mode="aspectFill">
                </image>
              </view>
            </view>
            <view class="card-footer border-t">
              <view class="footer-info">
                <view class="deadline">
                  <text class="material-symbols-outlined text-sm">calendar_today</text>
                  <text>时限: {{ item.deadline ? vk.pubfn.timeFormat(item.deadline, 'yyyy.MM.dd') : '无限制' }}</text>
                </view>
                <view class="progress-chip" :class="item._delayClass">
                  <view class="pulse-dot" v-if="!item._isDelay"></view>
                  <text class="material-symbols-outlined" v-else>warning</text>
                  <text>{{ item._delayText }}</text>
                </view>
              </view>
              <view class="view-detail" @click="goToDetail(item._id)">
                <text>查看详情</text>
                <text class="material-symbols-outlined text-sm">chevron_right</text>
              </view>
            </view>
          </view>

          <!-- 底部安全缓冲层：专门用于垫高防止自拟定固定位的 TabBar 吞卡数据 -->
          <view class="safe-padding-gap" style="height: 180rpx; width: 100%; flex-shrink: 0;"></view>
        </view>
      </view>

      <template #bottom>
        <my-tab-bar :current="2"></my-tab-bar>
      </template>
    </z-paging>

    <u-select v-model="showLocationSelect" :list="locationTree" mode="mutil-column-auto"
      @confirm="onLocationConfirm"></u-select>

    <u-calendar v-model="showCalendar" mode="range" @change="onDateChange" active-bg-color="#0050cb"></u-calendar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      vk: uni.vk,
      dataList: [],
      currentStatus: 0,
      currentAreaId: '',
      currentPointId: '',
      locationTree: [],
      showLocationSelect: false,
      locationName: '全部区域',
      showCalendar: false,
      startDate: '',
      endDate: '',
      needMyFeedback: false
    };
  },
  onLoad() {
    this.getLocationTree();
  },
  onShow() {
    let filter = uni.getStorageSync('projectListFilter');
    if (filter === 'needMyFeedback') {
      this.needMyFeedback = true;
      uni.removeStorageSync('projectListFilter');
      if (this.$refs.paging) {
        this.doSearch();
      }
    }
  },
  methods: {
    doSearch() {
      if (this.$refs.paging) {
        this.$refs.paging.reload();
      }
    },
    toggleMyFeedback() {
      this.needMyFeedback = !this.needMyFeedback;
      this.doSearch();
    },
    queryList(pageNo, pageSize) {
      let startTime = undefined;
      let endTime = undefined;
      if (this.startDate) {
        startTime = new Date(this.startDate + ' 00:00:00').getTime();
      }
      if (this.endDate) {
        endTime = new Date(this.endDate + ' 23:59:59').getTime();
      }

      this.vk.callFunction({
        url: 'client/keywork/kh/getProjectList',
        data: {
          pageIndex: pageNo,
          pageSize: pageSize,
          status: this.currentStatus === 0 ? [0, 3] : this.currentStatus,
          area_id: this.currentAreaId || undefined,
          point_id: this.currentPointId || undefined,
          startTime: startTime,
          endTime: endTime,
          needMyFeedback: this.needMyFeedback
        },
        success: (res) => {
          let rows = res.rows.map(item => {
            item._statusName = this.getStatusName(item.status);
            item._tagType = this.getTagType(item.status);
            item._isDelay = this.isDelay(item.deadline, item.status);
            item._delayText = this.getDelayText(item.deadline, item.status);
            item._delayClass = this.getDelayClass(item.deadline, item.status);
            return item;
          });
          this.$refs.paging.complete(rows);
        },
        fail: () => {
          this.$refs.paging.complete(false);
        }
      });
    },
    goToDetail(id) {
      uni.navigateTo({
        url: '/pages/keywork/project/process-feed/index?id=' + id
      });
    },
    changeStatus(status) {
      if (this.currentStatus === status) return;
      this.currentStatus = status;
      this.doSearch();
    },
    changeArea(areaId, areaName) {
      if (this.currentAreaId === areaId) return;
      this.currentAreaId = areaId;
      this.currentPointId = '';
      this.locationName = areaName || '全部区域';
      this.doSearch();
    },
    onDateChange(e) {
      this.startDate = e.startDate;
      this.endDate = e.endDate;
      this.doSearch();
    },
    async getLocationTree() {
      let res = await this.vk.callFunction({ url: 'client/report/kh/getAreaPointTree' });
      if (res.tree) {
        this.locationTree = res.tree;
      }
    },
    onLocationConfirm(arr) {
      let area = arr[0];
      let point = arr[1];
      if (area && area.value) {
        this.currentAreaId = area.value;
        this.currentPointId = point && point.value ? point.value : '';
        this.locationName = (point && point.value) ? `${area.label} / ${point.label}` : area.label;
      } else {
        this.currentAreaId = '';
        this.currentPointId = '';
        this.locationName = '全部区域';
      }
      this.doSearch();
    },
    getStatusName(status) {
      const map = { 0: '进行中', 1: '待验收', 2: '已完成', 3: '被驳回' };
      return map[status] || '未知';
    },
    getTagType(status) {
      if (status === 2) return 'success';
      if (status === 3) return 'error';
      if (status === 1) return 'warning';
      return 'primary';
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
    },
    getAssigneeNames(info) {
      if (!info || info.length === 0) return '未指派';
      let names = info.map(u => u.real_name || u.nickname || '用户');
      let str = names.join('、');
      if (str.length > 7) {
        return str.substring(0, 6) + '...';
      }
      return str;
    },
    getVerifierName(info) {
      if (!info) return '管理员';
      let user = Array.isArray(info) ? info[0] : info;
      if (!user) return '管理员';
      return user.real_name || user.nickname || '管理员';
    },
    getVerifierAvatar(info) {
      const defaultAvatar = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8e65bd20-00f7-41a4-969c-2f223f04473b/38890db3-1dce-4467-bc22-b2f56b50937c.png';
      if (!info) return defaultAvatar;
      let user = Array.isArray(info) ? info[0] : info;
      if (!user) return defaultAvatar;
      return user.avatar || defaultAvatar;
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
  height: 100vh;
  box-sizing: border-box;
  font-family: Inter, sans-serif;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
}

.industrial-grid {
  background-image: radial-gradient(rgba(0, 80, 203, 0.05) 1px, transparent 1px) !important;
  background-size: 40rpx 40rpx !important;
}

.top-content {
  padding: 10rpx 30rpx 0;
  max-width: 896rpx;
  margin: 0 auto;
}

.list-content {
  padding: 0 16rpx 16rpx;
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

.border-t {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

// Header
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8rpx;
  margin-bottom: 16rpx;
}

.section-title-wrap {
  display: flex;
  flex-direction: column;
}

.page-title {
  display: block;
  font-family: Manrope, sans-serif;
  font-size: 40rpx;
  font-weight: 800;
  color: #191c1e;
  margin-bottom: 8rpx;
  letter-spacing: -1rpx;
}

.page-subtitle {
  display: block;
  font-size: 20rpx;
  color: $on-surface-variant;
  font-weight: 500;
  letter-spacing: 4rpx;
  text-transform: uppercase;
}

.notif-btn {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
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
  border: 1px solid rgba(255, 255, 255, 0.6);
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
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(12px);
  color: $outline;
  font-weight: 500;
  opacity: 0.8;
  border-color: rgba(255, 255, 255, 0.4);
}

.tab:nth-child(3) {
  z-index: 10;
}

// Search Panel
.search-panel {
  position: relative;
  z-index: 40;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(24px);
  border-radius: 0 24rpx 24rpx 24rpx;
  padding: 24rpx;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 16rpx 48rpx -16rpx rgba(0, 80, 203, 0.12);
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.form-group-1 {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.select-wrapper,
.date-wrapper {
  position: relative;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 16rpx;
  padding: 12rpx 20rpx;
  font-size: 26rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.date-pickers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12rpx;
}

.date-text.placeholder {
  color: #9ca3af;
}

.btn-group {
  display: flex;
  gap: 12rpx;
}

.btn-feedback,
.btn-primary {
  flex: 1;
  padding: 16rpx 20rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  font-size: 26rpx;
  font-weight: 700;
  height: 64rpx;
  transition: all 0.3s ease;
}

.btn-feedback {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 80, 203, 0.2);
  color: $primary;
}

.btn-feedback.active-filter {
  background: rgba(0, 80, 203, 0.1);
  border-color: $primary;
}

.btn-primary {
  background: $primary;
  color: #fff;
  box-shadow: 0 8rpx 16rpx rgba(0, 80, 203, 0.2);
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
  box-shadow: 0 8rpx 32rpx 0 rgba(0, 80, 203, 0.04);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16rpx;
}

.card-title {
  font-weight: 700;
  font-size: 32rpx;
  line-height: 1.4;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.roles-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 0;
}

.role-executors,
.role-verifier {
  display: flex;
  align-items: center;
}

.role-label {
  font-size: 26rpx;
  color: $outline;
}

.role-names {
  font-size: 26rpx;
  color: $on-surface-variant;
  margin-right: 12rpx;
  max-width: 140rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.avatar-stack {
  display: flex;
  align-items: center;
}

.stack-avatar {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  border: 2rpx solid #fff;
  margin-left: -12rpx;
  background-color: #f3f4f6;
}

.stack-avatar:first-child {
  margin-left: 0;
}

.stack-more {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  background: #e5e7eb;
  border: 2rpx solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20rpx;
  font-weight: 700;
  margin-left: -12rpx;
  color: #4b5563;
}

.verifier-avatar {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  background-color: #f3f4f6;
  border: 2rpx solid #fff;
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
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(5, 150, 105, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 12rpx rgba(5, 150, 105, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(5, 150, 105, 0);
  }
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
