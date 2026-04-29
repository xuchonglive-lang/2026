<template>
  <view class="page-audit">
    <cu-custom bgColor="bg-gradual-blue" :isCustom="true">
      <block slot="backText"></block>
      <block slot="content">审核状态</block>
    </cu-custom>
    
    
    <!-- Industrial Grid Background -->
    <view class="grid-floor"></view>

    <!-- Ambient Glowing Orbs -->
    <view class="orb orb-top"></view>
    <view class="orb orb-bottom"></view>

    <!-- Top Navigation Bar -->
    <view class="page-header">
      <view class="header-left">
        <text class="header-icon">⚙</text>
        <text class="header-title">文明生产管理系统</text>
      </view>
      <view class="header-action">
        <text class="header-icon-sm">🔔</text>
      </view>
    </view>

    <!-- Main Content -->
    <view class="main-content">
      <view class="center-card-wrap">
        <view class="center-card">

          <!-- Status: Pending (审核中) -->
          <template v-if="auditStatus === 1">
            <view class="status-icon-wrap">
              <view class="status-circle status-circle-pending">
                <text class="status-emoji">⏳</text>
              </view>
              <view class="sync-badge">
                <text class="sync-icon">🔄</text>
              </view>
            </view>
            <text class="status-title">信息审核中</text>
            <text class="status-desc">请耐心等待管理员审核</text>
          </template>

          <!-- Status: Rejected (被拒绝) -->
          <template v-else-if="auditStatus === 2">
            <view class="status-icon-wrap">
              <view class="status-circle status-circle-error">
                <text class="status-emoji">❌</text>
              </view>
            </view>
            <text class="status-title status-title-error">接入请求被驳回</text>
            <text class="status-desc">原因: {{ auditReason || '信息不符或终端未授权' }}</text>
          </template>

          <!-- Status: Syncing -->
          <template v-else>
            <text class="status-syncing">SYNCING STATUS...</text>
          </template>

          <!-- Divider -->
          <view class="status-divider"></view>

          <!-- Footer Actions -->
          <view class="status-footer">
            <view class="info-row">
              <text class="info-icon">ℹ️</text>
              <text class="info-text">如有疑问可联系部门管理员</text>
            </view>

            <template v-if="auditStatus === 1">
              <button class="btn-action" @click="checkStatus">
                <text class="btn-action-text">刷新状态</text>
                <text class="btn-action-arrow">🔄</text>
              </button>
            </template>
            <template v-else-if="auditStatus === 2">
              <button class="btn-action" @click="reRegister">
                <text class="btn-action-text">重新提交</text>
                <text class="btn-action-arrow">→</text>
              </button>
            </template>
          </view>
        </view>

        <!-- Status Meta Info -->
        <view class="meta-row">
          <view class="meta-card">
            <text class="meta-label">身份归属</text>
            <text class="meta-value">{{ userInfo.department_name || 'UNKNOWN' }}</text>
          </view>
          <view class="meta-card">
            <text class="meta-label">EST. TIME</text>
            <text class="meta-value">24 小时内</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      auditStatus: 1, // 0:未提交 1:审核中 2:拒绝 3:通过
      auditReason: '',
      userInfo: {}
    }
  },
  onLoad() {
    this.userInfo = this.vk.getVuex('$user.userInfo') || {};
    this.refreshUserInfo();
  },
  onPullDownRefresh() {
    this.refreshUserInfo();
  },
  methods: {
    checkStatus() {
      uni.showLoading({ title: '查询中...' });
      this.refreshUserInfo();
    },
    reRegister() {
      uni.reLaunch({ url: '/pages/user/register/index' });
    },
    async refreshUserInfo() {
      try {
        let res = await uni.vk.callFunction({
          url: 'client/user/kh/getMineProfile'
        });
        uni.hideLoading();
        uni.stopPullDownRefresh();

        if (res.code === 0 && res.userInfo) {
          const status = res.userInfo.audit_status || 0;
          this.auditStatus = status;
          this.auditReason = res.userInfo.audit_reject_reason || '';
          this.userInfo = res.userInfo;
          this.vk.setVuex('$user.userInfo', res.userInfo);

          if (status === 3) {
            uni.showToast({ title: '审核通过！', icon: 'success' });
            setTimeout(() => {
              uni.reLaunch({ url: '/pages/index/index' });
            }, 1000);
          } else if (status === 0) {
            uni.reLaunch({ url: '/pages/user/register/index' });
          }
        }
      } catch (err) {
        uni.hideLoading();
        uni.stopPullDownRefresh();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* ====================================================================
   AUDIT STATUS PAGE — Industrial Clarity / Precision Lens 1:1
   ==================================================================== */
.page-audit {
  min-height: 100vh;
  background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
  color: #191c1e;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.grid-floor {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 0;
  background-image: radial-gradient(circle, rgba(0, 80, 203, 0.05) 1px, transparent 1px);
  background-size: 48rpx 48rpx;
  pointer-events: none;
}

/* Ambient Orbs */
.orb {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}
.orb-top {
  top: 10%;
  left: 5%;
  width: 400rpx;
  height: 400rpx;
  background: rgba(0, 80, 203, 0.08);
  filter: blur(80px);
}
.orb-bottom {
  bottom: 20%;
  right: 5%;
  width: 300rpx;
  height: 300rpx;
  background: rgba(66, 92, 160, 0.1);
  filter: blur(60px);
}

/* Header */
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32rpx;
  height: 128rpx;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08);
}
.header-left {
  display: flex;
  align-items: center;
}
.header-icon {
  font-size: 40rpx;
  color: #1d4ed8;
  margin-right: 12rpx;
}
.header-title {
  font-family: 'Manrope', sans-serif;
  font-size: 36rpx;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.01em;
}
.header-action {
  display: flex;
  align-items: center;
  padding: 16rpx;
  border-radius: 50%;
}
.header-icon-sm {
  font-size: 36rpx;
  color: #64748b;
}

/* Main Content */
.main-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 128rpx 48rpx 160rpx;
  position: relative;
  z-index: 1;
}

.center-card-wrap {
  width: 100%;
  max-width: 750rpx;
}

/* Center Card */
.center-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08);
  border-radius: 48rpx;
  padding: 80rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Status Icon */
.status-icon-wrap {
  position: relative;
  margin-bottom: 64rpx;
}
.status-circle {
  width: 192rpx;
  height: 192rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.status-circle-pending {
  background-color: rgba(0, 80, 203, 0.05);
}
.status-circle-error {
  background-color: rgba(186, 26, 26, 0.1);
}
.status-emoji {
  font-size: 96rpx;
}
.sync-badge {
  position: absolute;
  bottom: -8rpx;
  right: -8rpx;
  background: #ffffff;
  border-radius: 50%;
  padding: 8rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
}
.sync-icon {
  font-size: 36rpx;
}

/* Status Text */
.status-title {
  font-family: 'Manrope', sans-serif;
  font-size: 48rpx;
  font-weight: 700;
  color: #191c1e;
  letter-spacing: -0.01em;
  margin-bottom: 16rpx;
}
.status-title-error {
  color: #ba1a1a;
}
.status-desc {
  font-family: 'Inter', sans-serif;
  font-size: 32rpx;
  font-weight: 500;
  color: #424656;
  margin-bottom: 96rpx;
}
.status-syncing {
  font-family: monospace;
  font-size: 28rpx;
  color: #64748b;
  padding: 80rpx 0;
  text-align: center;
}

/* Divider */
.status-divider {
  width: 100%;
  height: 2rpx;
  background: linear-gradient(to right, transparent, rgba(194, 198, 216, 0.5), transparent);
  margin-bottom: 64rpx;
}

/* Footer */
.status-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 32rpx;
}
.info-icon {
  font-size: 24rpx;
  margin-right: 12rpx;
}
.info-text {
  font-family: 'Inter', sans-serif;
  font-size: 24rpx;
  color: #64748b;
  letter-spacing: 0.05em;
  font-weight: 500;
}

/* Action Button */
.btn-action {
  padding: 24rpx 64rpx;
  background-color: #0066ff;
  color: #ffffff;
  border-radius: 48rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 8rpx 32rpx rgba(0, 102, 255, 0.3);
  transition: all 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.btn-action:active {
  transform: scale(0.96);
}
.btn-action-text {
  font-family: 'Inter', sans-serif;
  font-size: 28rpx;
  color: #ffffff;
  font-weight: 600;
}
.btn-action-arrow {
  font-size: 24rpx;
  color: #ffffff;
  margin-left: 12rpx;
}

/* Meta Row */
.meta-row {
  display: flex;
  gap: 32rpx;
  margin-top: 64rpx;
  padding: 0 16rpx;
}
.meta-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 32rpx;
  padding: 32rpx;
  display: flex;
  flex-direction: column;
}
.meta-label {
  font-family: 'Inter', sans-serif;
  font-size: 20rpx;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 8rpx;
}
.meta-value {
  font-family: 'Manrope', sans-serif;
  font-size: 28rpx;
  font-weight: 600;
  color: #0050cb;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* uniapp button reset */
button::after { border: none; }
</style>
