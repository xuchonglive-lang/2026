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
        <!-- Card 1 -->
        <view class="glass-card project-card">
          <view class="card-header">
            <text class="card-title">自动化流水线升级二期工程</text>
            <text class="status-chip in-progress">进行中</text>
          </view>
          <view class="card-roles">
            <view class="role-group">
              <text class="role-label">执行人：王力宏、吴京...</text>
              <view class="avatars">
                <image class="avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7Kz16hMPVnAu0YyK_c2WSOIKZVojjLfOOx9LkKDmHL4VxvTdjtDEBiKgbxz7Cn9CbCrwlAxi2Fix6xk9WAZCqxey3stvpsgKCVzikn-1P2FS3obbbclFE_KuIWZOz2fW8G_NaV2WSXqOdrNoLPeQdSFRJl8IGNr5kawKnFyg01sQ7Pt47EZ04qzMOMh5lUBGS9z8HL6yTetvXY9ArXyvswF-dqJbTc7XfRORquSXlS9TECSs_RnQf6h9D28iK-WeV72lexbUPHRI" mode="aspectFill"></image>
                <image class="avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-l-lBP8zjszV7emiwDn1dqgWeQX6u8oykdt7wGJDRhX9BUR53tsxE_WRHPZirlN-PwKRw2zuuLsRePks-qcwxleoW18YJEYwPKXFQqTliWGzrCcQiIUUB3N9FoKg2OjOGda9QE2dnGXfhaJM_pK8r_YMA9EGpRrOG6F_V70gxC6wO6oNH7nrvaXi6iKElNsh3z8z472quKTzHG8vVpxO8mXpepCPriVjZMbO0ObX7rMlM7nWPbjy2-Pj6EgNVyplMV47SdS14xUA" mode="aspectFill"></image>
                <view class="avatar-more">+3</view>
              </view>
            </view>
            <view class="role-group">
              <text class="role-label">验收人：王建国</text>
              <image class="avatar plain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlt0S2koP8B0Bp23PiaZMUWqH2vXksHkjzvrjRL-kMb5pwd3-MEXBl32_sL9Wqob1BBi6vM11BzO-A_ld6q6H5W6_FhTA0e6uEwk9NRhNsqiwlw68LcV7nBjVvLWMsqUEbAnaEXOvJFJ5nuBWLpKqK_lqcP6Te_INJVwgOXuP33_a_yKndzJnlDU2NPonbhDatRwdb7PP4F6UDOLhFV_piAbkwMm--t_RsTVvBMfSpJ79BRNo40Kekxtg0QfBRbeHbxI-KUBu2oGU" mode="aspectFill"></image>
            </view>
          </view>
          <view class="card-footer border-t">
            <view class="footer-info">
              <view class="deadline">
                <text class="material-symbols-outlined text-sm">calendar_today</text>
                <text>完成节点: 2024.12.31</text>
              </view>
              <view class="progress-chip safe">
                <view class="pulse-dot"></view>
                <text>正常推进</text>
              </view>
            </view>
            <view class="view-detail" @click="goToDetail">
              <text>查看详情</text>
              <text class="material-symbols-outlined text-sm">chevron_right</text>
            </view>
          </view>
        </view>

        <!-- Card 2 -->
        <view class="glass-card project-card">
          <view class="card-header">
            <text class="card-title">传感器灵敏度校准巡检</text>
            <text class="status-chip in-progress">进行中</text>
          </view>
          <view class="card-roles">
            <view class="role-group">
              <text class="role-label">执行人：张小明、赵利...</text>
              <view class="avatars">
                <image class="avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsoCZHZEH1VxLGDhxG5orHnsEm8MBZv_UC9NifMHHX1ETe5f9VcsAeVKqmNA3lytTTnu0RWumYwgPI7EQKB74T9Ky_qnmi68w7CiQu4ukAa77FB915T8i-61bBaODi3IVrdaLn1HmZzJ7JXuJ1ngJP5hXjZ957sury7TdIy74TH8itMyipzLEXSYBZ69kolZuzwfI7fqpm4GmnmOzMkZXlO99IpccXY6X2k4z38RYvMVIf3YMF7cexenCpVVEioBOeQrySb6OHpdw" mode="aspectFill"></image>
                <image class="avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5lxsHk5O_AuHjQPQPqa2HKKeiHvvQsRV8VOFqx1HCFM2LGm3PV0wy_TdDfFLaSMkEXNbXzhSnVVZYTSPlH33lZ8bbktt1qqgOOmfY14sJ6TkDs5L-mTzBUPO513rD8gqwHmLxQcTS595rnMP5LgVHU4-PUy4mAHVR7eiVHUHCPcNBqgddwdOLd4YvRUeALsZgO1w3MD8Ncx2xw0q0I4jboDaCxLbWdlZ3tWFnW2PsMmwHid3YWsAUCG4acJo6oJCHboFzMv2DObE" mode="aspectFill"></image>
              </view>
            </view>
            <view class="role-group">
              <text class="role-label">验收人：李卫东</text>
              <image class="avatar plain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIIbHbHDWQ634JR5z9eEvPa-OZaIpyfZ46Kq7JZh161VaA_sj2OQjst9URN7hkqvMPd-xZoUDeyb85m6eG6wpF8dscPRs80qnxnXIrwgjEc8LEIi-SgUvuSIrzLguc3AeGT5E0aGJxoqrF2lQtdUSlKmHMWOWgkc81ZWIYjCWBShFR7nV9S29Q1HcoQMw1pDz7hEcePRW8RkXpDbQTXMFLnctGNm7vcy5M7amuxpKeT9wgkDstEf5hc_lozB6OmVZ-NStxfU1Uid4" mode="aspectFill"></image>
            </view>
          </view>
          <view class="card-footer border-t">
            <view class="footer-info">
              <view class="deadline">
                <text class="material-symbols-outlined text-sm">calendar_today</text>
                <text>完成节点: 2024.11.15</text>
              </view>
              <view class="progress-chip delay">
                <text class="material-symbols-outlined">warning</text>
                <text>严重拖期</text>
              </view>
            </view>
            <view class="view-detail" @click="goToDetail">
              <text>查看详情</text>
              <text class="material-symbols-outlined text-sm">chevron_right</text>
            </view>
          </view>
        </view>

        <!-- Card 3 -->
        <view class="glass-card project-card">
          <view class="card-header">
            <text class="card-title">环保通风系统滤芯更换</text>
            <text class="status-chip in-progress">进行中</text>
          </view>
          <view class="card-roles">
            <view class="role-group">
              <text class="role-label">执行人：周杰、陈震...</text>
              <view class="avatars">
                <image class="avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwUAgYEHna6C_Nurl3SOCFTWVJklCWuJ455chR5mh4VQL9d0fhQfcWWpLldf8jmX0rVM-wpyOk-nGXeM0zwSdKT0AWNiEv4BKjlmpEqaJzL30dqBWT1XQT9VeiqU05SYZCmueiLqdIZFJK9CCjtXL-czp9g3nvudFe0EYtZeKF_cRg0e1gL_AHvB79s9MInlq4Dpaxv8ELYRbfRWhadoSN0eq36-A2LRsxOeGFCQjsPDunV1mCs2YzWr1hKPntIXi4_RlR63FHYJU" mode="aspectFill"></image>
                <image class="avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArfRwm4OTr2GKDE_mlcHoH1Yxdnd0WCl9b2fGyacjYKw8KTFDJEk09BJebr5NsfCADDYH4YyUyOg1g5U445Eu5DKLfurxjqSJbF-Yd8j77BY1SZptyMonLSNAqilgb7B-hKKC2R5ij2CESt-1Q3BRz5Du1l5seH5Q7XQt86xkufozImFZNIqWVCL31otmIyGTBkYvNO8P1o5l6RMMTrMaza1wbe0QHx0pQnDAFxyjrMJpJueF5-mhz0lO47KpArCJRZWmKn5es9rI" mode="aspectFill"></image>
              </view>
            </view>
            <view class="role-group">
              <text class="role-label">验收人：张华</text>
              <image class="avatar plain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8X4JnuW7izOtNdKrezOAvhKIWJZefpBn1PgyUEfivertuZO7KAZG5AT9bcnCfGQIDXHeRQs5eh5WZAdPUOZh8A3BXjWgOZ5zJ9CymzY2mi5MRnFii6WNzqEYmu4D8l81V6coQTGcLUBtiyKOMaCTogFcZg5LvRkocsl0N2lBpl2gJb_U9u-YUc5HABurlASZNthznaZOakYsSrN0mzcithJmZPoZKmhXBDI97pp70O2_roHkXjXEdX0ZjX3x7VVX_AXsz8B5RpEk" mode="aspectFill"></image>
            </view>
          </view>
          <view class="card-footer border-t">
            <view class="footer-info">
              <view class="deadline">
                <text class="material-symbols-outlined text-sm">calendar_today</text>
                <text>完成节点: 2024.12.01</text>
              </view>
              <view class="progress-chip safe">
                <view class="pulse-dot"></view>
                <text>正常推进</text>
              </view>
            </view>
            <view class="view-detail" @click="goToDetail">
              <text>查看详情</text>
              <text class="material-symbols-outlined text-sm">chevron_right</text>
            </view>
          </view>
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
    };
  },
  methods: {
    goToDetail() {
      uni.navigateTo({
        url: '/pages/keywork/project/process-feed/index'
      })
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
