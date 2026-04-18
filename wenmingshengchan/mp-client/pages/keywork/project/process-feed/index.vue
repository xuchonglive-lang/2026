<template>
  <view class="page-container industrial-bg industrial-grid">
    <view class="main-content" v-if="projectInfo">
      <!-- Page Title Header -->
      <view class="header-row">
        <view class="back-btn active-press" @click="goBack">
          <text class="material-symbols-outlined">arrow_back</text>
        </view>
        <text class="page-title font-headline font-extrabold text-industrial-primary tracking-tight">重点项目推进详情</text>
      </view>

      <!-- Section 1: 项目推进标准 -->
      <view class="section">
        <view class="section-header">
          <text class="section-title font-headline font-extrabold heavy-underline">项目推进标准</text>
        </view>
        <view class="glass-card standard-card">
          <view class="card-top">
            <view class="title-group">
              <text class="project-id font-headline font-bold text-industrial-primary">{{ projectInfo.title }}</text>
              <view class="location-group" v-if="projectInfo.point_info && projectInfo.point_info[0]">
                <text class="material-symbols-outlined location-icon">location_on</text>
                <text class="location-text">{{ projectInfo.point_info[0].name }}</text>
              </view>
            </view>
            <view class="status-badge">{{ getStatusName(projectInfo.status) }}</view>
          </view>
          
          <view class="standard-desc">
            {{ projectInfo.standard_desc || '暂无详细标准说明' }}
          </view>

          <view class="people-grid">
            <view class="people-col">
              <text class="people-label">执行人配置数</text>
              <view class="people-info">
                <view class="avatar-stack">
                  <view class="avatar-more">👥</view>
                </view>
                <text class="people-name">{{ projectInfo.assignee_uids ? projectInfo.assignee_uids.length : 0 }} 人</text>
              </view>
            </view>
            <view class="people-col">
              <text class="people-label">验收方</text>
              <view class="people-info">
                <text class="people-name bold">系统后台管理员</text>
              </view>
            </view>
          </view>

          <view class="progress-section">
            <view class="progress-meta">
              <text class="deadline-label">完成时限：{{ projectInfo.deadline ? vk.pubfn.timeFormat(projectInfo.deadline, 'yyyy.MM.dd') : '无限制' }}</text>
              <view class="progress-stat">
                <text class="progress-label" v-if="projectInfo.status===2">已完成</text>
                <text class="progress-label" v-else>执行中</text>
              </view>
            </view>
            <view class="progress-track">
              <view class="progress-bar" :style="{ width: projectInfo.status===2 ? '100%' : '50%' }"></view>
            </view>
          </view>
        </view>
      </view>

      <!-- Section 2: 项目推进过程反馈 -->
      <view class="section">
        <view class="section-header">
          <text class="section-title font-headline font-extrabold heavy-underline">项目推进流转记录</text>
        </view>
        <view class="timeline-container">
          <view class="timeline-track"></view>
          
          <view v-if="projectInfo.process_list && projectInfo.process_list.length === 0" style="padding:40rpx; text-align:center; color:#999; font-size:24rpx;">
            暂无流转反馈记录
          </view>
          
          <view class="timeline-item" v-for="(item, index) in projectInfo.process_list" :key="item._id">
            <view class="timeline-dot" :class="index === 0 ? 'active' : 'inactive'"></view>
            <view class="glass-card feedback-card">
              <view class="feedback-header">
                <view class="user-info">
                  <text class="username">{{ item.user_info && item.user_info[0] ? item.user_info[0].nickname || item.user_info[0].real_name : '系统' }}</text>
                  <text class="type-badge" :class="getBadgeClass(item.type)">{{ getProcessTypeName(item.type) }}</text>
                </view>
                <text class="time-stamp">{{ vk.pubfn.timeFormat(item.create_time, 'MM-dd hh:mm') }}</text>
              </view>
              <text class="feedback-text">{{ item.desc_content }}</text>
              <view class="feedback-images" v-if="item.attachment_imgs && item.attachment_imgs.length > 0">
                <image v-for="(img, i) in item.attachment_imgs" :key="i" class="feedback-img" :src="img" mode="aspectFill" @click="vk.pubfn.previewImage({ current: i, urls: item.attachment_imgs })"></image>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- Section 3: 项目推进验收结论 -->
      <view class="section" v-if="projectInfo.status === 2">
        <view class="section-header">
          <text class="section-title font-headline font-extrabold heavy-underline">项目归档结论</text>
        </view>
        <view class="conclusion-gradient-border">
          <view class="conclusion-inner bg-glass">
            <view class="acceptor-header">
              <view class="acceptor-info">
                <text class="conclusion-title font-headline font-bold">最终验收结论</text>
                <text class="status-subtitle font-bold">VERIFIED COMPLETION STATUS</text>
              </view>
            </view>
            <view class="conclusion-box">
              <text class="conclusion-content">{{ projectInfo.audit_remark || '已通过验收并归档。' }}</text>
            </view>
            <view class="conclusion-footer">
              <text class="acceptance-status-tag">验收已通过</text>
            </view>
          </view>
        </view>
      </view>

      <!-- FAB Buttons -->
      <view class="fab-bar bg-glass-blur" v-if="projectInfo.status === 0 || projectInfo.status === 3">
        <view class="fab-container">
          <view class="fab-btn primary active-press" @click="goToFeedback">
            <text class="material-symbols-outlined fab-icon">history_edu</text>
            <text>阶段进度上报</text>
          </view>
          <view class="fab-btn error active-press" @click="goToApplyClose">
            <text class="material-symbols-outlined fab-icon">fact_check</text>
            <text>申请结案验收</text>
          </view>
        </view>
      </view>
      <u-toast ref="uToast" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      vk: uni.vk,
      projectId: '',
      projectInfo: null
    };
  },
  onLoad(options) {
    if (options.id) {
      this.projectId = options.id;
      this.getDetail();
    }
  },
  onShow() {
    if (this.projectId) {
      this.getDetail(); // refresh after returning
    }
  },
  methods: {
    getDetail() {
      this.vk.callFunction({
        url: 'client/keywork/kh/getProjectDetail',
        data: { project_id: this.projectId },
        success: (res) => {
          this.projectInfo = res.data;
        }
      });
    },
    getStatusName(status) {
      const map = { 0: '执行中', 1: '待验收', 2: '已归档', 3: '被驳回退修' };
      return map[status] || '未知';
    },
    getProcessTypeName(type) {
      const map = { 1: '进度反馈', 2: '结项申请', 3: '审核驳回' };
      return map[type] || '记录';
    },
    getBadgeClass(type) {
      if (type === 1) return 'primary';
      if (type === 2) return 'tertiary';
      if (type === 3) return 'tertiary'; // Error-ish color
      return 'primary';
    },
    goToFeedback() {
      // 携带参数跳转至新页面或共用 apply-finish 控制
      uni.navigateTo({
        url: '/pages/keywork/project/apply-finish/index?id=' + this.projectId + '&mode=feedback'
      });
    },
    goToApplyClose() {
      uni.navigateTo({
        url: '/pages/keywork/project/apply-finish/index?id=' + this.projectId + '&mode=close'
      });
    },
    goBack() {
      uni.navigateBack();
    }
  }
};
</script>

<style scoped lang="scss">
// Project Colors
$primary: #0050cb;
$secondary: #425ca0;
$tertiary: #a33200;
$error: #ba1a1a;
$on-surface: #191c1e;
$on-surface-variant: #424656;
$outline: #727687;

.page-container {
  min-height: 100vh;
  padding-bottom: 240rpx;
}

.main-content {
  padding: 80rpx 32rpx 32rpx;
  max-width: 1300rpx; // 2xl is wide, but constrained to mobile feel usually
  margin: 0 auto;
}

// Header
.header-row {
  display: flex;
  align-items: center;
  gap: 32rpx;
  margin-bottom: 64rpx;
}
.back-btn {
  color: $primary;
  .material-symbols-outlined {
    font-size: 56rpx;
  }
}
.page-title {
  font-size: 48rpx;
  letter-spacing: -0.02em;
}

// Sections
.section {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  margin-bottom: 64rpx;
}
.section-header {
  margin-bottom: 8rpx;
}
.section-title {
  font-size: 36rpx;
  color: $on-surface;
}

// Card Style
.standard-card {
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  border-radius: 24rpx;
}
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.project-id {
  font-size: 32rpx;
  margin-bottom: 8rpx;
  display: block;
}
.location-group {
  display: flex;
  align-items: center;
  gap: 16rpx;
}
.location-icon {
  font-size: 32rpx;
  color: $on-surface-variant;
}
.location-text {
  font-size: 24rpx;
  color: $on-surface-variant;
}
.status-badge {
  background: #dae1ff;
  color: #001849;
  padding: 8rpx 24rpx;
  border-radius: 99rpx;
  font-size: 20rpx;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.standard-desc {
  background: rgba(242, 244, 246, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 24rpx;
  font-size: 28rpx;
  line-height: 1.6;
  color: $on-surface-variant;
}

.people-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32rpx;
}
.people-label {
  font-size: 20rpx;
  font-weight: 800;
  color: $outline;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 8rpx;
  display: block;
}
.people-info {
  display: flex;
  align-items: center;
}
.people-name {
  font-size: 24rpx;
  color: $on-surface;
  font-weight: 500;
  margin-left: 16rpx;
}
.people-name.bold {
  font-weight: 800;
}

.avatar-stack {
  display: flex;
  margin-right: 8rpx;
}
.avatar {
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  border: 4rpx solid #fff;
  margin-left: -16rpx;
}
.avatar:first-child { margin-left: 0; }
.avatar-more {
  width: 56rpx;
  height: 56rpx;
  background: #dae1ff;
  border-radius: 50%;
  border: 4rpx solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20rpx;
  font-weight: 800;
  color: $primary;
  margin-left: -16rpx;
}
.inspector-avatar {
  margin-left: 0;
  border: 1px solid rgba(0, 80, 203, 0.2);
}

.progress-section {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
.progress-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.deadline-label {
  font-size: 20rpx;
  font-weight: 800;
  color: $outline;
  text-transform: uppercase;
}
.progress-value {
  color: $primary;
  font-size: 28rpx;
}
.progress-track {
  height: 12rpx;
  background: #e0e3e5;
  border-radius: 99rpx;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  background: #0066ff;
  border-radius: 99rpx;
}

// Timeline
.timeline-container {
  position: relative;
  padding-left: 48rpx;
  display: flex;
  flex-direction: column;
  gap: 64rpx;
}
.timeline-track {
  position: absolute;
  left: 22rpx;
  top: 16rpx;
  bottom: 16rpx;
  width: 4rpx;
  background: rgba(194, 198, 216, 0.3);
}
.timeline-item {
  position: relative;
}
.timeline-dot {
  position: absolute;
  left: -38rpx;
  top: 8rpx;
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  border: 8rpx solid #fff;
  z-index: 2;
}
.timeline-dot.active {
  background: #0066ff;
}
.timeline-dot.inactive {
  background: $outline;
}

.feedback-card {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}
.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 16rpx;
}
.avatar-sm {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
}
.username {
  font-size: 24rpx;
  font-weight: 800;
  color: $on-surface;
}
.type-badge {
  font-size: 20rpx;
  padding: 4rpx 16rpx;
  border-radius: 8rpx;
  font-weight: 800;
}
.type-badge.primary { background: rgba(0, 80, 203, 0.1); color: $primary; }
.type-badge.tertiary { background: #ffdbd0; color: #832600; }

.time-stamp {
  font-size: 20rpx;
  color: $outline;
}
.feedback-text {
  font-size: 28rpx;
  color: $on-surface-variant;
  line-height: 1.5;
}
.feedback-images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
}
.feedback-img {
  width: 100%;
  height: 180rpx;
  border-radius: 16rpx;
}

.inspector-comment {
  margin-top: 24rpx;
  padding: 24rpx 32rpx;
  background: rgba(254, 242, 242, 0.5); // red-50/50
  backdrop-filter: blur(8px);
  border-radius: 16rpx;
  border-top: 1px solid rgba(254, 202, 202, 0.3); // red-200/30
}
.comment-user {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 16rpx;
}
.avatar-mini {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
}
.comment-title-box {
  display: flex;
  align-items: center;
  gap: 12rpx;
}
.comment-name {
  font-size: 20rpx;
  font-weight: 800;
  color: #7f1d1d;
}
.comment-tag {
  font-size: 20rpx;
  font-weight: 800;
  color: #b91c1c;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.comment-body {
  font-size: 24rpx;
  color: #991b1b;
  font-style: italic;
}

// Conclusion
.conclusion-gradient-border {
  padding: 4rpx;
  border-radius: 32rpx;
  background: linear-gradient(135deg, #0066ff, #9bb4fe);
  box-shadow: 0 16rpx 48rpx rgba(0, 80, 203, 0.15);
}
.conclusion-inner {
  padding: 48rpx;
  border-radius: 28rpx;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}
.acceptor-header {
  display: flex;
  align-items: center;
  gap: 24rpx;
}
.acceptor-avatar-lg {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(0, 80, 203, 0.2);
}
.conclusion-title {
  font-size: 28rpx;
  color: $on-surface;
}
.status-subtitle {
  font-size: 20rpx;
  color: $primary;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}
.conclusion-box {
  background: rgba(0, 80, 203, 0.05);
  border: 1px solid rgba(0, 80, 203, 0.1);
  padding: 32rpx;
  border-radius: 24rpx;
}
.conclusion-content {
  font-size: 28rpx;
  color: $on-surface;
  line-height: 1.6;
  font-weight: 500;
}
.conclusion-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.acceptance-status-tag {
  background: rgba(0, 80, 203, 0.1);
  color: $primary;
  padding: 8rpx 24rpx;
  border-radius: 99rpx;
  font-size: 20rpx;
  font-weight: 800;
}
.acceptance-date {
  font-size: 20rpx;
  color: $outline;
}

// FAB
.fab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32rpx 32rpx 64rpx;
  z-index: 100;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}
.fab-container {
  display: flex;
  gap: 24rpx;
  max-width: 1300rpx;
  margin: 0 auto;
}
.fab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  padding: 32rpx;
  border-radius: 99rpx;
  box-shadow: 0 16rpx 64rpx rgba(0, 80, 203, 0.1);
  height: 112rpx;
  box-sizing: border-box;
}
.fab-btn.primary {
  background: rgba(0, 80, 203, 0.8);
  color: #fff;
}
.fab-btn.error {
  background: rgba(186, 26, 26, 0.8);
  color: #fff;
}
.fab-icon {
  font-size: 36rpx;
}
.fab-btn text {
  font-family: Manrope, sans-serif;
  font-weight: 700;
  font-size: 28rpx;
}

// Helper classes
.tracking-tight { letter-spacing: -0.025em; }
.bg-glass { background: rgba(255, 255, 255, 0.45); backdrop-filter: blur(20px); }
.bg-glass-blur { background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(12px); }

</style>
