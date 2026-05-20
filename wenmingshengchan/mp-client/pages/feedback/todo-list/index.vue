<template>
  <view class="page-container industrial-grid">
    <cu-custom bgColor="bg-gradual-blue" :isCustom="true">
      <block slot="backText"></block>
      <block slot="content">本班需参与现场反馈任务</block>
    </cu-custom>
    
    
    
    <view class="main-content">
      <!-- Title -->
      <view class="page-title-wrap">
        <view class="action sub-title">
          <text class="text-lg text-bold text-black">本班需参与现场反馈任务</text>
          <text class="bg-blue"></text>
        </view>
      </view>
      
      <!-- Summary Header -->
      <view class="summary-header-inline mb-4">
        <view class="summary-info-inline">
          <text class="status-label-inline">需参与（负责）数量 </text>
          <text class="status-count-inline">{{ listData.length }}</text>
          <text class="status-suffix-inline"> 项</text>
        </view>
        <view class="preview-link" @click="goTo('/pages/feedback/history/index')">
          <text class="preview-link-text">我负责的反馈任务历史</text>
          <u-icon name="arrow-right" size="24" color="#0050cb"></u-icon>
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
            <view class="card-info">
              <view class="card-title-row">
                <view class="title-left">
                  <view class="blue-block"></view>
                  <text class="card-title">{{ getPointName(item) }}</text>
                </view>
                <view class="right-tags">
                  <u-tag v-if="item._feedback_status === 'waiting'" text="未到时间" type="info" mode="light" size="mini" />
                  <u-tag v-else-if="item._feedback_status === 'expired'" text="已逾期" type="error" mode="dark" size="mini" />
                  <u-tag v-else text="未反馈" type="error" mode="light" size="mini" />
                </view>
              </view>
              <view class="card-subtitle-row">
                <u-icon name="home-fill" size="28" color="#64748b"></u-icon>
                <text class="card-subtitle">{{ getDeptName(item) }} · {{ getAreaName(item) }}</text>
              </view>
            </view>
          </view>
          
          <!-- Roles Row (反馈人员) -->
          <view class="roles-row mb-3">
            <view class="role-executors">
              <text class="role-label">参与反馈人员：</text>
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
                <u-icon name="clock-fill" size="28" color="#475569"></u-icon>
                <text class="time-text">可反馈区间：{{ getJoinDate(item) }} {{ getTimeRange(item) }}</text>
              </view>
            </view>
            
            <view class="action-btn" :class="{'disabled-btn': item._feedback_status && item._feedback_status !== 'active'}" @click="item._feedback_status && item._feedback_status !== 'active' ? null : goSubmit(item)">
              <text class="action-btn-text">{{ item._feedback_status === 'waiting' ? '未到时间' : (item._feedback_status === 'expired' ? '已逾期' : '开始反馈') }}</text>
              <u-icon name="arrow-right" size="32" color="#0050cb"></u-icon>
            </view>
          </view>
        </view>
        
        <u-empty v-if="!loading && listData.length === 0" mode="list" margin-top="80"></u-empty>
      </view>
    </view>
    
    
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
      // 强化时间窗口校验：非 active 状态严禁进入提交页
      if (item._feedback_status === 'waiting') {
        uni.vk.toast("尚未到反馈开始时间", "none");
        return;
      }
      if (item._feedback_status === 'expired') {
        uni.vk.toast("该任务已逾期，不可反馈", "none");
        return;
      }
      
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
        let avatar = assignees[index].avatar;
        return typeof avatar === 'string' ? avatar : (avatar.url || avatar);
      }
      return "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/41235688-6615-4672-88f5-46f041ff3dbb.png";
    },
    getJoinDate(item) {
      if (item._feedback_display_date) {
        return item._feedback_display_date;
      }
      if (item._add_time) {
        return uni.vk.pubfn.timeFormat(item._add_time, 'yyyy-MM-dd');
      }
      return '未知日期';
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
  padding: 64rpx 32rpx 64rpx 32rpx;
  max-width: 896rpx;
  margin: 0 auto;
}

/* ====== 引入 ColorUI 示例标题3 (sub-title) 精髓样式 ====== */
.action.sub-title {
  position: relative;
  display: inline-block;
  margin-left: 0;
}

.action.sub-title .text-lg {
  position: relative;
  z-index: 1;
  font-size: 40rpx;
  font-weight: 800;
  color: #1a1d20 !important;
  letter-spacing: -0.5rpx;
}

.action.sub-title .bg-blue {
  position: absolute;
  display: inline-block;
  bottom: 4rpx;
  border-radius: 4rpx;
  width: 100%;
  height: 14rpx;
  left: 16rpx;
  opacity: 0.4;
  z-index: 0;
  background-color: #0062ff !important;
}

.page-title-wrap {
  margin-bottom: 32rpx;
}

/* Inline Summary Header */
.summary-header-inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx 0 32rpx;
  border-bottom: 1px dashed rgba(0,0,0,0.05);
  margin-bottom: 32rpx;
}

.summary-info-inline {
  display: flex;
  align-items: baseline;
  font-size: 28rpx;
  color: #475569;
}

.status-label-inline {
  font-weight: 500;
}

.status-count-inline {
  font-size: 36rpx;
  font-weight: 800;
  color: #ea580c;
  margin: 0 8rpx;
  font-family: 'Manrope', sans-serif;
}

.status-suffix-inline {
  font-size: 24rpx;
}

.preview-link {
  display: flex;
  align-items: center;
  gap: 4rpx;
  cursor: pointer;
  padding: 8rpx 0;
}

.preview-link-text {
  color: #0050cb;
  font-size: 26rpx;
  font-weight: 700;
}

/* Small Title Style with Blue Block */
.title-left {
  display: flex;
  align-items: flex-start;
  flex: 1;
  overflow: hidden;
}

.blue-block {
  width: 8rpx;
  height: 32rpx;
  background-color: #0050cb;
  border-radius: 4rpx;
  margin-right: 16rpx;
  margin-top: 6rpx;
  flex-shrink: 0;
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

.card-info {
  flex: 1;
  min-width: 0;
}
.card-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8rpx;
  gap: 16rpx;
}
.right-tags {
  flex-shrink: 0;
}
.card-title {
  font-family: 'Manrope', sans-serif;
  font-size: 34rpx;
  font-weight: 800;
  color: #1e293b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
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
  align-items: center;
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
