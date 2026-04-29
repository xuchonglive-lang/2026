<template>
  <view class="page-container industrial-grid pb-32">
    <cu-custom bgColor="bg-gradual-blue" :isCustom="true">
      <block slot="backText"></block>
      <block slot="content">个人中心</block>
    </cu-custom>
    
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
        </view>
      </view>

      <!-- Feedback Stats Quick Look -->
      <view class="feedback-stats">
        <view class="stat-item" @tap="navToTodo">
          <text class="stat-number">{{ statData.pointCount || 0 }}</text>
          <view class="stat-desc">
            <text class="stat-label">重点点位\n反馈</text>
          </view>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item" @tap="navToProjectTodo">
          <text class="stat-number">{{ statData.projectCount || 0 }}</text>
          <view class="stat-desc">
            <text class="stat-label">重点项目\n反馈</text>
          </view>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item" @tap="navToPlanTodo">
          <text class="stat-number">{{ statData.planCount || 0 }}</text>
          <view class="stat-desc">
            <text class="stat-label">日计划\n反馈</text>
          </view>
        </view>
      </view>

      <!-- Action Items List -->
      <view class="action-list">
        <view class="action-item" @click="openRecordPopup('point')">
          <view class="action-icon-wrap action-icon-primary">
            <text class="action-icon-text">📝</text>
          </view>
          <view class="action-text-wrap">
            <text class="action-title">现场反馈信息</text>
            <text class="action-subtitle">Real-time Field Feedback</text>
          </view>
          <text class="action-arrow">›</text>
        </view>

        <view class="action-item" @click="openRecordPopup('project')">
          <view class="action-icon-wrap action-icon-secondary">
            <text class="action-icon-text">🏗</text>
          </view>
          <view class="action-text-wrap">
            <text class="action-title">重点工作记录</text>
            <text class="action-subtitle">Key Task Documentation</text>
          </view>
          <text class="action-arrow">›</text>
        </view>

        <view class="action-item" @click="openRecordPopup('plan')">
          <view class="action-icon-wrap action-icon-tertiary">
            <text class="action-icon-text">📅</text>
          </view>
          <view class="action-text-wrap">
            <text class="action-title">计划执行历史</text>
            <text class="action-subtitle">Execution Performance History</text>
          </view>
          <text class="action-arrow">›</text>
        </view>

        <view class="action-item" @click="openRecordPopup('issue')">
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
    
    <!-- 记录明细弹出层 -->
    <u-popup v-model="showPopup" mode="bottom" border-radius="24" height="70%">
      <view class="popup-container">
        <view class="popup-header">
          <text class="popup-title">{{ popupTitle }}</text>
          <u-icon name="close" size="32" color="#191c1e" @click="showPopup = false"></u-icon>
        </view>
        <scroll-view scroll-y class="popup-body">
          <view class="record-item" v-for="(item, index) in currentRecordList" :key="index">
            <view class="record-content">
              <text class="record-title">{{ item.title }}</text>
              <text class="record-time">{{ item.time }}</text>
            </view>
            <view class="record-actions">
              <view class="btn-edit" @click="handleEditRecord(item)">修改</view>
              <view class="btn-delete" @click="handleDeleteRecord(item, index)">删除</view>
            </view>
          </view>
          <view v-if="currentRecordList.length === 0" class="empty-tip">暂无记录</view>
        </scroll-view>
      </view>
    </u-popup>

    <my-tab-bar :current="4"></my-tab-bar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      statData: {
        pointCount: 0,
        projectCount: 0,
        planCount: 0
      },
      showPopup: false,
      popupTitle: '',
      popupType: '',
      currentRecordList: []
    }
  },
  onShow() {
    this.userInfo = this.vk.getVuex('$user.userInfo') || {};
    this.refreshUserInfo();
    this.fetchStatData();
  },
  onPullDownRefresh() {
    this.refreshUserInfo();
    this.fetchStatData();
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
    async fetchStatData() {
      // 模拟获取待反馈数据
      this.statData = {
        pointCount: 0,
        projectCount: 0,
        planCount: 0
      };
      try {
        let res = await uni.vk.callFunction({
          url: 'client/feedback/kh/getTodoCount',
          data: {}
        });
        if (res.code === 0) {
          this.statData.pointCount = res.count || 0;
        }
      } catch (err) {}
    },
    navToTodo() { uni.switchTab({ url: '/pages/feedback/todo-list/index' }); },
    navToProjectTodo() {
      uni.setStorageSync('projectListFilter', 'needMyFeedback');
      uni.switchTab({ url: '/pages/keywork/project/list/index' });
    },
    navToPlanTodo() {
      uni.setStorageSync('planListFilter', 'needMyExecute');
      uni.switchTab({ url: '/pages/plan/list' });
    },
    openRecordPopup(type) {
      this.popupType = type;
      if (type === 'point') {
        this.popupTitle = '现场反馈信息明细';
        this.currentRecordList = [
          { id: 1, title: '主厂房设备巡检记录', time: '2023-10-27 10:00' },
          { id: 2, title: '传送带A区维护反馈', time: '2023-10-26 14:30' }
        ];
      } else if (type === 'project') {
        this.popupTitle = '重点工作记录明细';
        this.currentRecordList = [
          { id: 3, title: '二期工程进度汇报', time: '2023-10-25 09:15' }
        ];
      } else if (type === 'plan') {
        this.popupTitle = '计划执行历史明细';
        this.currentRecordList = [
          { id: 4, title: '10月份设备大修执行情况', time: '2023-10-20 08:00' }
        ];
      } else if (type === 'issue') {
        this.popupTitle = '问题报备记录明细';
        this.currentRecordList = [
          { id: 5, title: '水泵异常噪音报备', time: '2023-10-21 16:45' }
        ];
      }
      this.showPopup = true;
    },
    handleEditRecord(item) {
      uni.showToast({ title: '修改功能待接入接口', icon: 'none' });
    },
    handleDeleteRecord(item, index) {
      uni.showModal({
        title: '提示',
        content: `确定要删除 "${item.title}" 吗？`,
        success: (res) => {
          if (res.confirm) {
            this.currentRecordList.splice(index, 1);
            uni.showToast({ title: '已删除' });
          }
        }
      });
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
.page-container {
  min-height: 100vh;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
  color: #191c1e;
}

.industrial-grid {
  background-image: radial-gradient(rgba(0, 80, 203, 0.05) 1px, transparent 1px);
  background-size: 40rpx 40rpx;
}

.pb-32 {
  padding-bottom: 256rpx;
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

/* Feedback Stats */
.feedback-stats {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08);
  border-radius: 24rpx;
  padding: 32rpx 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.stat-number {
  font-size: 56rpx;
  font-weight: 900;
  color: #0050cb;
  line-height: 1;
  letter-spacing: -2rpx;
  font-family: 'Manrope', sans-serif;
}

.stat-desc {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12rpx;
}

.stat-label {
  font-size: 22rpx;
  font-weight: bold;
  color: #191c1e;
  text-align: center;
  line-height: 1.3;
}

.stat-divider {
  width: 2rpx;
  height: 64rpx;
  background: rgba(194, 198, 216, 0.4);
}

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

/* Popup Styles */
.popup-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f7f9fb;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx;
  background: #ffffff;
  border-bottom: 1px solid #eceef0;
}

.popup-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #191c1e;
  font-family: 'Inter', sans-serif;
}

.popup-body {
  flex: 1;
  padding: 24rpx 32rpx;
}

.record-item {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);
}

.record-content {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  flex: 1;
}

.record-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #191c1e;
}

.record-time {
  font-size: 22rpx;
  color: #727687;
}

.record-actions {
  display: flex;
  gap: 16rpx;
  margin-left: 24rpx;
}

.btn-edit, .btn-delete {
  padding: 12rpx 24rpx;
  border-radius: 8rpx;
  font-size: 24rpx;
  font-weight: bold;
}

.btn-edit {
  background-color: rgba(0, 80, 203, 0.1);
  color: #0050cb;
}

.btn-delete {
  background-color: rgba(186, 26, 26, 0.1);
  color: #ba1a1a;
}

.empty-tip {
  text-align: center;
  color: #999;
  font-size: 24rpx;
  padding: 40rpx;
}

/* uniapp button reset */
button::after { border: none; }
</style>
