<template>
  <view class="page-mine">
    <!-- Industrial Grid Background -->
    <view class="grid-floor"></view>

    <view class="main-content">
      <!-- Profile Section -->
      <view class="profile-card">
        <view class="profile-avatar-wrap">
          <image class="profile-avatar" :src="userInfo.avatar || '/static/default-avatar.png'" mode="aspectFill" />
          <view class="verified-badge">
            <text class="verified-icon">✓</text>
          </view>
        </view>

        <view class="profile-info">
          <view class="profile-top-row">
            <text class="profile-name">{{ userInfo.nickname || '未验证终端' }}</text>
            <view class="status-chip">
              <text class="status-text">{{ userInfo.audit_status === 3 ? '已审核' : '待处理' }}</text>
            </view>
          </view>
          <text class="profile-dept">{{ userInfo.department_name || '未分配挂靠点' }}</text>

          <view class="profile-meta-row">
            <view class="meta-item">
              <text class="meta-label">工号</text>
              <text class="meta-value">{{ userInfo._id ? userInfo._id.substring(0,8).toUpperCase() : 'UNKNOWN' }}</text>
            </view>
            <view class="meta-divider"></view>
            <view class="meta-item">
              <text class="meta-label">职级</text>
              <text class="meta-value">L1</text>
            </view>
          </view>
        </view>
      </view>

      <!-- Stats Quick Look -->
      <view class="stats-row">
        <view class="stat-card">
          <text class="stat-label">本月完成率</text>
          <text class="stat-value stat-primary">0.0%</text>
        </view>
        <view class="stat-card">
          <text class="stat-label">安全天数</text>
          <text class="stat-value stat-tertiary">0</text>
        </view>
      </view>

      <!-- Action Items List -->
      <view class="action-list">
        <view class="action-item" @click="handleNavigate('/pages/feedback/index')">
          <view class="action-icon-wrap action-icon-primary">
            <text class="action-icon-text">📝</text>
          </view>
          <view class="action-text-wrap">
            <text class="action-title">现场反馈信息</text>
            <text class="action-subtitle">Real-time Field Feedback</text>
          </view>
          <text class="action-arrow">›</text>
        </view>

        <view class="action-item" @click="handleNavigate('/pages/project/index')">
          <view class="action-icon-wrap action-icon-secondary">
            <text class="action-icon-text">🏗</text>
          </view>
          <view class="action-text-wrap">
            <text class="action-title">重点工作记录</text>
            <text class="action-subtitle">Key Task Documentation</text>
          </view>
          <text class="action-arrow">›</text>
        </view>

        <view class="action-item" @click="handleNavigate('/pages/plan/index')">
          <view class="action-icon-wrap action-icon-tertiary">
            <text class="action-icon-text">📅</text>
          </view>
          <view class="action-text-wrap">
            <text class="action-title">计划执行历史</text>
            <text class="action-subtitle">Execution Performance History</text>
          </view>
          <text class="action-arrow">›</text>
        </view>

        <view class="action-item" @click="handleNavigate('/pages/issue/index')">
          <view class="action-icon-wrap action-icon-error">
            <text class="action-icon-text">⚠️</text>
          </view>
          <view class="action-text-wrap">
            <text class="action-title">问题报备记录</text>
            <text class="action-subtitle">Incident Reporting Logs</text>
          </view>
          <text class="action-arrow">›</text>
        </view>
      </view>

      <!-- Logout Button -->
      <button class="btn-logout" @click="logout">
        <text class="logout-icon">🔓</text>
        <text class="logout-text">退出登录</text>
      </button>

      <!-- Version -->
      <text class="version-text">CIVILIZED PRODUCTION SYSTEM V2.4.0</text>
    </view>
    <my-tab-bar :current="4"></my-tab-bar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  onShow() {
    this.userInfo = this.vk.getVuex('$user.userInfo') || {};
    this.refreshUserInfo();
  },
  onPullDownRefresh() {
    this.refreshUserInfo();
  },
  methods: {
    async refreshUserInfo() {
      try {
        let res = await uni.vk.callFunction({
          url: 'client/user/kh/getMineProfile'
        });
        uni.stopPullDownRefresh();
        if(res.code === 0 && res.userInfo) {
          this.vk.setVuex('$user.userInfo', res.userInfo);
          this.userInfo = res.userInfo;
        }
      } catch(e) {
        uni.stopPullDownRefresh();
      }
    },
    handleNavigate(url) {
      uni.showToast({ title: '模块尚未上线', icon: 'none' });
    },
    async logout() {
      try {
        uni.showLoading({ title: '正在退出...' });
        await uni.vk.callFunction({
          url: 'client/user/pub/loginByWeixin',
        });
      } catch (e) {}

      uni.hideLoading();
      this.vk.setVuex('$user.userInfo', {});
      uni.removeStorageSync('uni_id_token');
      uni.removeStorageSync('uni_id_token_expired');
      uni.reLaunch({ url: '/pages/index/index' });
    }
  }
}
</script>

<style lang="scss" scoped>
/* ====================================================================
   MINE PAGE — Industrial Clarity / Precision Lens 1:1
   ==================================================================== */
.page-mine {
  min-height: 100vh;
  background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
  color: #191c1e;
  padding-bottom: 160rpx;
  position: relative;
}

.grid-floor {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 0;
  background-image: radial-gradient(rgba(0, 80, 203, 0.05) 1px, transparent 1px);
  background-size: 48rpx 48rpx;
  pointer-events: none;
}


/* Main Content */
.main-content {
  padding: 48rpx 32rpx 64rpx;
  max-width: 750rpx;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Profile Card */
.profile-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08);
  border-radius: 24rpx;
  padding: 40rpx;
  margin-bottom: 24rpx;
  display: flex;
  align-items: center;
}
.profile-avatar-wrap {
  position: relative;
  margin-right: 32rpx;
  flex-shrink: 0;
}
.profile-avatar {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.5);
  background: #eceef0;
}
.verified-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background-color: #9bb4fe;
  border: 4rpx solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.verified-icon {
  font-size: 20rpx;
  color: #294487;
  font-weight: 700;
}
.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.profile-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.profile-name {
  font-family: 'Manrope', sans-serif;
  font-size: 42rpx;
  font-weight: 700;
  color: #191c1e;
  letter-spacing: -0.01em;
}
.status-chip {
  background-color: rgba(155, 180, 254, 0.5);
  border-radius: 24rpx;
  padding: 4rpx 16rpx;
  flex-shrink: 0;
}
.status-text {
  font-family: 'Inter', sans-serif;
  font-size: 20rpx;
  font-weight: 700;
  color: #294487;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.profile-dept {
  font-family: 'Inter', sans-serif;
  font-size: 28rpx;
  color: #424656;
  margin-top: 8rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.profile-meta-row {
  display: flex;
  align-items: flex-end;
  margin-top: 24rpx;
}
.meta-item {
  display: flex;
  flex-direction: column;
}
.meta-label {
  font-family: 'Inter', sans-serif;
  font-size: 20rpx;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #727687;
}
.meta-value {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 28rpx;
  color: #191c1e;
}
.meta-divider {
  width: 2rpx;
  height: 56rpx;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0 32rpx;
}

/* Stats */
.stats-row {
  display: flex;
  gap: 24rpx;
  margin-bottom: 24rpx;
}
.stat-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08);
  border-radius: 24rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
}
.stat-label {
  font-family: 'Inter', sans-serif;
  font-size: 20rpx;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #727687;
  margin-bottom: 8rpx;
}
.stat-value {
  font-family: 'Manrope', sans-serif;
  font-size: 42rpx;
  font-weight: 800;
}
.stat-primary { color: #0050cb; }
.stat-tertiary { color: #a33200; }

/* Action List */
.action-list {
  display: flex;
  flex-direction: column;
}
.action-item {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08);
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  display: flex;
  align-items: center;
  transition: all 300ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.action-item:active {
  transform: scale(0.96);
}
.action-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 32rpx;
  flex-shrink: 0;
}
.action-icon-primary { background-color: rgba(0, 80, 203, 0.1); }
.action-icon-secondary { background-color: rgba(155, 180, 254, 0.2); }
.action-icon-tertiary { background-color: rgba(204, 66, 4, 0.1); }
.action-icon-error { background-color: rgba(186, 26, 26, 0.1); }
.action-icon-text {
  font-size: 36rpx;
}
.action-text-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.action-title {
  font-family: 'Inter', sans-serif;
  font-size: 28rpx;
  font-weight: 600;
  color: #191c1e;
}
.action-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 20rpx;
  color: #424656;
  margin-top: 4rpx;
}
.action-arrow {
  font-size: 40rpx;
  color: #727687;
  flex-shrink: 0;
}

/* Logout */
.btn-logout {
  margin-top: 80rpx;
  width: 100%;
  background: rgba(242, 244, 246, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24rpx;
  padding: 32rpx 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 32rpx rgba(186, 26, 26, 0.1);
  transition: all 300ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.btn-logout:active {
  transform: scale(0.96);
}
.logout-icon {
  font-size: 36rpx;
  margin-right: 12rpx;
}
.logout-text {
  font-family: 'Manrope', sans-serif;
  font-size: 30rpx;
  font-weight: 700;
  color: #ba1a1a;
  letter-spacing: 0.05em;
}

/* Version */
.version-text {
  display: block;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 20rpx;
  color: #727687;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-top: 64rpx;
  padding-bottom: 32rpx;
}

/* uniapp button reset */
button::after { border: none; }
</style>
