<template>
  <view class="page-container industrial-grid">
    <cu-custom bgColor="bg-gradual-blue" :isCustom="true">
      <block slot="backText"></block>
      <block slot="content">待反馈点位</block>
    </cu-custom>
    
    
    
    <view class="main-content">
      <!-- Title -->
      <view class="page-title-wrap">
        <text class="page-title">待反馈点位</text>
      </view>
      
      <!-- Summary Header -->
      <view class="summary-header mb-4">
        <view class="summary-info">
          <text class="status-label">待处理数量</text>
          <view class="status-value-wrap">
            <text class="status-count">{{ listData.length }}</text>
            <text class="status-suffix">项</text>
          </view>
        </view>
        <view class="preview-btn" @click="goTo('/pages/feedback/history/index')">
          <text class="material-symbols-outlined" style="margin-right: 8rpx; font-size: 32rpx; color: #0050cb;">history</text>
          <text class="preview-btn-text">历史足迹</text>
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
                <text class="card-title">{{ getPointName(item) }}</text>
                <u-tag v-if="item._feedback_status === 'waiting'" text="未到时间" type="info" mode="light" size="mini" />
                <u-tag v-else-if="item._feedback_status === 'expired'" text="已逾期" type="error" mode="dark" size="mini" />
                <u-tag v-else text="未反馈" type="error" mode="light" size="mini" />
              </view>
              <view class="card-subtitle-row">
                <text class="material-symbols-outlined icon-domain">domain</text>
                <text class="card-subtitle">{{ getDeptName(item) }} · {{ getAreaName(item) }}</text>
              </view>
            </view>
          </view>
          
          <!-- Roles Row (反馈人员) -->
          <view class="roles-row mb-3">
            <view class="role-executors">
              <text class="role-label">反馈人员：</text>
              <text class="role-names">{{ getAssigneeNames(item) }}</text>
            </view>
            <view class="avatar-group" v-if="item.assignee_info && item.assignee_info.length > 0">
              <image class="avatar" :src="getAvatar(item.assignee_info, 0)" mode="aspectFill"></image>
              <view v-if="item.assignee_info.length > 1" class="avatar-more">+{{ item.assignee_info.length - 1 }}</view>
            </view>
          </view>
          
          <view class="card-bottom">
            <view class="time-info-wrap">
              <!-- Time Range -->
              <view class="time-range">
                <text class="material-symbols-outlined icon-schedule">schedule</text>
                <text class="time-text">可反馈区间：{{ getTimeRange(item) }}</text>
              </view>
            </view>
            
            <view class="action-btn" :class="{'disabled-btn': item._feedback_status && item._feedback_status !== 'active'}" @click="item._feedback_status && item._feedback_status !== 'active' ? null : goSubmit(item)">
              <text class="action-btn-text">{{ item._feedback_status === 'waiting' ? '未到时间' : (item._feedback_status === 'expired' ? '已逾期' : '开始反馈') }}</text>
              <text class="material-symbols-outlined icon-arrow">chevron_right</text>
            </view>
          </view>
        </view>
        
        <u-empty v-if="!loading && listData.length === 0" mode="list" margin-top="80"></u-empty>
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
         url: `/pages/feedback/submit/index?id=${item._id}&name=${item.point_info && item.point_info[0] ? item.point_info[0].name : ''}&status=${item._feedback_status || 'active'}`
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
    },
    getAssigneeNames(item) {
      if (!item.assignee_info || item.assignee_info.length === 0) return '未分配';
      return item.assignee_info.map(u => u.real_name || u.nickname || '未知').join('、');
    },
    getDeptName(item) {
      if (item.dept_info) {
        let info = Array.isArray(item.dept_info) ? item.dept_info[0] : item.dept_info;
        if (info && info.name) return info.name;
      }
      return "未知部门";
    },
    getAreaName(item) {
      if (item.area_info) {
        let info = Array.isArray(item.area_info) ? item.area_info[0] : item.area_info;
        if (info && info.name) return info.name;
      }
      return "未知区域";
    },
    getPointName(item) {
      if (item.point_info) {
        let info = Array.isArray(item.point_info) ? item.point_info[0] : item.point_info;
        if (info && info.name) return info.name;
      }
      return "未知重控点";
    },
    getAvatar(assignees, index) {
      if (assignees && assignees[index] && assignees[index].avatar) {
        return assignees[index].avatar;
      }
      return "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/41235688-6615-4672-88f5-46f041ff3dbb.png";
    },
    getTimeRange(item) {
      if (item._feedback_start && item._feedback_end) {
        return `${item._feedback_start} - ${item._feedback_end}`;
      }
      if (item.shift_type === 'day') return "08:00 - 18:00";
      if (item.shift_type === 'night') return "20:00 - 06:00";
      return "00:00 - 23:59";
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

.page-container {
  min-height: 100vh;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
  position: relative;
}

.industrial-grid {
  background-image: radial-gradient(rgba(0, 80, 203, 0.05) 1px, transparent 1px);
  background-size: 40rpx 40rpx;
}

.main-content {
  position: relative;
  z-index: 1;
  padding: 64rpx 32rpx 192rpx 32rpx;
  max-width: 896rpx;
  margin: 0 auto;
}

.page-title-wrap {
  margin-bottom: 24rpx;
}
.page-title {
  font-family: 'Manrope', sans-serif;
  font-size: 56rpx;
  font-weight: 800;
  color: #191c1e;
  letter-spacing: -0.025em;
}

.summary-header {
  padding: 16rpx 0 32rpx;
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
  color: #0050cb;
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
  font-size: 32rpx;
  font-weight: 500;
  color: #424656;
}

.preview-btn {
  padding: 16rpx 28rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  border: 1px solid rgba(0, 80, 203, 0.1);
  box-shadow: 0 4rpx 12rpx rgba(0, 80, 203, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}
.preview-btn:active {
  transform: scale(0.95);
}
.preview-btn-text {
  color: #0050cb;
  font-size: 24rpx;
  font-weight: 700;
  text-transform: uppercase;
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.glass-card {
  background: #ffffff;
  border: 1px solid rgba(0, 80, 203, 0.05);
  box-shadow: 0 8rpx 32rpx rgba(0, 80, 203, 0.04);
  border-radius: 24rpx;
  padding: 32rpx;
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.glass-card:active {
  transform: scale(0.99);
}

.card-top {
  display: flex;
  gap: 24rpx;
  margin-bottom: 24rpx;
}

.icon-box {
  width: 96rpx;
  height: 96rpx;
  flex-shrink: 0;
  border-radius: 20rpx;
  background-color: #eef5fc;
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
  margin-bottom: 8rpx;
}
.card-title {
  font-family: 'Manrope', sans-serif;
  font-size: 34rpx;
  font-weight: 800;
  color: #1e293b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-subtitle-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-top: 4rpx;
}
.icon-domain {
  font-size: 28rpx;
  color: #64748b;
}
.card-subtitle {
  font-size: 24rpx;
  font-weight: 500;
  color: #64748b;
}

.card-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-top: 24rpx;
  border-top: 1px dashed #e2e8f0;
  margin-top: 16rpx;
}

.time-info-wrap {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.roles-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f8fafc;
  border-radius: 12rpx;
  padding: 16rpx 24rpx;
  margin-bottom: 24rpx;
}
.role-executors {
  display: flex;
  align-items: center;
  flex: 1;
}
.role-label {
  font-size: 26rpx;
  color: #94a3b8;
  margin-right: 8rpx;
}
.role-names {
  font-size: 26rpx;
  color: #334155;
  font-weight: 700;
  margin-right: 16rpx;
}
.avatar-group {
  display: flex;
  align-items: center;
}
.avatar {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  border: 2px solid #ffffff;
  background-color: #f1f5f9;
}
.avatar-more {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background-color: #e2e8f0;
  color: #475569;
  font-size: 20rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffffff;
  margin-left: -16rpx;
}

.time-range {
  display: flex;
  align-items: center;
  gap: 8rpx;
}
.icon-schedule {
  font-size: 28rpx;
  color: #475569;
}
.time-text {
  font-size: 22rpx;
  font-weight: 500;
  color: #475569;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
  padding: 16rpx 28rpx;
  background-color: #f0f5fa;
  border-radius: 16rpx;
  transition: background-color 0.3s;
}
.action-btn:active {
  background-color: #e2eaf4;
}
.action-btn-text {
  color: #0050cb;
  font-weight: 700;
  font-size: 26rpx;
}
.icon-arrow {
  color: #0050cb;
  font-size: 32rpx;
}

.disabled-btn {
  background-color: #f1f5f9;
  opacity: 0.7;
}
.disabled-btn .action-btn-text,
.disabled-btn .icon-arrow {
  color: #94a3b8;
}
</style>
