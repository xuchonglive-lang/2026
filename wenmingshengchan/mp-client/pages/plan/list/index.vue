<template>
  <view class="page-container industrial-bg industrial-grid">
    <view class="main-content">
      <!-- Header Section -->
      <view class="header-row">
        <text class="page-title font-headline font-extrabold text-on-surface">计划管理</text>
        <view class="icon-btn active-press">
          <text class="material-symbols-outlined text-primary text-xl">precision_manufacturing</text>
        </view>
      </view>
      <text class="subtitle">Industrial Management Console</text>

      <!-- Search Panel -->
      <view class="search-panel glass-card">
        <view class="search-grid">
          <view class="search-item">
            <text class="label text-primary">日期</text>
            <view class="input-wrapper" @click="openDatePicker">
              <text class="input-field">{{ queryDate }}</text>
              <text class="material-symbols-outlined icon text-primary">calendar_today</text>
            </view>
          </view>
          <view class="search-item">
            <text class="label text-primary">视图</text>
            <view class="input-wrapper" @click="switchTab">
              <text class="input-field">{{ currentTab === 'all' ? '全部计划' : '我的任务' }}</text>
              <text class="material-symbols-outlined icon text-primary">swap_horiz</text>
            </view>
          </view>
        </view>
        <view class="btn-primary active-press flex center" style="margin-top:24rpx" @click="loadList">
          <text class="material-symbols-outlined icon" style="font-size:36rpx;margin-right:8rpx">search</text>
          <text>搜索</text>
        </view>
      </view>

      <!-- Tab Indicator -->
      <view class="tab-bar">
        <view :class="['tab-item', currentTab === 'all' ? 'tab-active' : '']" @click="currentTab = 'all'; loadList()">
          <text>全部计划</text>
        </view>
        <view :class="['tab-item', currentTab === 'mine' ? 'tab-active' : '']" @click="currentTab = 'mine'; loadList()">
          <text>我的任务</text>
          <text v-if="myCount > 0" class="tab-badge">{{ myCount }}</text>
        </view>
      </view>

      <!-- Loading -->
      <view v-if="loading" class="loading-box">
        <text class="text-on-surface-variant text-xs">加载中...</text>
      </view>

      <!-- Empty State -->
      <view v-else-if="groupedList.length === 0" class="empty-box glass-card">
        <text class="material-symbols-outlined text-on-surface-variant" style="font-size:80rpx">inbox</text>
        <text class="text-on-surface-variant text-sm" style="margin-top:16rpx">暂无计划数据</text>
      </view>

      <!-- Grouped List -->
      <view v-else class="group-list">
        <view class="group-section" v-for="(group, gIdx) in groupedList" :key="gIdx">
          <view class="group-header">
            <view class="indicator"></view>
            <text class="group-title font-headline font-extrabold text-on-surface">{{ group.dept_name }}</text>
            <text class="group-count text-primary">({{ group.items.length }})</text>
            <view class="divider flex-1"></view>
          </view>

          <view class="glass-card plan-card" hover-class="card-hover" v-for="item in group.items" :key="item._id" @click="goToFeedback(item)">
            <view class="card-header">
              <text class="card-title text-on-surface font-bold text-sm">{{ item.title }}</text>
              <text :class="['status-badge', getStatusClass(item.display_status)]">{{ getStatusText(item.display_status) }}</text>
            </view>
            <view class="card-meta text-on-surface-variant font-medium text-xs">
              <view class="meta-item">
                <text class="material-symbols-outlined icon">event</text>
                <text>{{ item.plan_date }}</text>
              </view>
              <view class="meta-item">
                <text class="material-symbols-outlined icon">location_on</text>
                <text>{{ item.area_name || '未指定' }}</text>
              </view>
            </view>
            <view class="card-footer border-t">
              <view class="publisher text-on-surface-variant text-xs font-bold uppercase">发布人: {{ item.issuer_name }}</view>
              <view v-if="item.feedback_count > 0" class="fb-count text-primary text-xs font-bold">
                反馈{{ item.feedback_count }}条
              </view>
            </view>
            <view class="action-btn active-press">
              <text>查看详情</text>
            </view>
          </view>
        </view>

        <!-- Place empty block for bottom bar space -->
        <view class="bottom-spacer"></view>
      </view>
    </view>
    <my-tab-bar :current="3"></my-tab-bar>

    <!-- Date Picker（使用 uni 的 picker） -->
    <picker mode="date" :value="queryDate" @change="onDateChange" style="display:none" ref="datePicker"></picker>
  </view>
</template>

<script>
const statusMap = {
  1: '执行中', 2: '已提交', 3: '未达标',
  4: '超时未验收', 5: '已完成', 6: '已逾期'
};
const statusClassMap = {
  1: 'status-pending', 2: 'status-info', 3: 'status-warning',
  4: 'status-warning', 5: 'status-success', 6: 'status-error'
};

export default {
  data() {
    return {
      currentTab: 'all',
      queryDate: '',
      loading: false,
      list: [],
      myCount: 0
    };
  },
  computed: {
    // 按部门分组
    groupedList() {
      let groups = {};
      this.list.forEach(item => {
        let deptName = item.dept_name || '未知部门';
        if (!groups[deptName]) {
          groups[deptName] = { dept_name: deptName, items: [] };
        }
        groups[deptName].items.push(item);
      });
      return Object.values(groups);
    }
  },
  onLoad() {
    // 默认今天
    this.queryDate = this.formatDate(new Date());
    this.loadList();
    this.loadMyCount();
  },
  onPullDownRefresh() {
    this.loadList();
    setTimeout(() => { uni.stopPullDownRefresh(); }, 500);
  },
  methods: {
    formatDate(d) {
      let y = d.getFullYear();
      let m = String(d.getMonth() + 1).padStart(2, '0');
      let day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    },
    getStatusText(status) {
      return statusMap[status] || '未知';
    },
    getStatusClass(status) {
      return statusClassMap[status] || 'status-pending';
    },
    switchTab() {
      this.currentTab = this.currentTab === 'all' ? 'mine' : 'all';
      this.loadList();
    },
    openDatePicker() {
      // 使用 uni 日期选择
      uni.showModal({
        title: '选择日期',
        editable: true,
        placeholderText: 'YYYY-MM-DD',
        content: this.queryDate,
        success: (res) => {
          if (res.confirm && res.content) {
            this.queryDate = res.content;
            this.loadList();
          }
        }
      });
    },
    onDateChange(e) {
      this.queryDate = e.detail.value;
      this.loadList();
    },
    loadList() {
      this.loading = true;
      vk.callFunction({
        url: 'client/plan/kh/getList',
        data: {
          tab: this.currentTab,
          plan_date: this.queryDate,
          pageIndex: 1,
          pageSize: 100
        },
        success: (data) => {
          this.list = data.rows || [];
        },
        fail: (err) => {
          vk.alert(err.msg || '加载失败');
        },
        complete: () => {
          this.loading = false;
        }
      });
    },
    loadMyCount() {
      vk.callFunction({
        url: 'client/plan/kh/getTodoCount',
        data: {},
        success: (data) => {
          this.myCount = data.count || 0;
        }
      });
    },
    goToFeedback(item) {
      vk.navigateTo('/pages/plan/feedback/index?plan_id=' + item._id);
    }
  }
}
</script>

<style scoped lang="scss">
// Variables inside style
$primary: #0050cb;
$primary-container: #0066ff;
$surface: #f7f9fb;
$on-surface: #191c1e;
$on-surface-variant: #424656;

.page-container {
  min-height: 100vh;
  box-sizing: border-box;
  font-family: Inter, sans-serif;
  padding-bottom: 64rpx;
}

.main-content {
  padding: 48rpx 32rpx;
  max-width: 896rpx;
  margin: 0 auto;
}

.font-headline { font-family: Manrope, sans-serif; }
.font-extrabold { font-weight: 800; }
.font-bold { font-weight: 700; }
.font-medium { font-weight: 500; }
.uppercase { text-transform: uppercase; }
.tracking-widest { letter-spacing: 0.1em; }
.border-t { border-top: 1px solid rgba(255,255,255,0.1); }

.text-sm { font-size: 28rpx; }
.text-xs { font-size: 22rpx; }
.text-xl { font-size: 40rpx; }
.text-on-surface { color: $on-surface; }
.text-on-surface-variant { color: $on-surface-variant; }
.text-primary { color: $primary; }

// Header
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.page-title {
  font-size: 60rpx;
  letter-spacing: -0.02em;
}
.icon-btn {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: rgba(0, 80, 203, 0.1);
  border: 1px solid rgba(0, 80, 203, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.subtitle {
  font-size: 24rpx;
  color: $on-surface-variant;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
  margin-top: 8rpx;
  display: block;
  margin-bottom: 48rpx;
}

// Tab Bar
.tab-bar {
  display: flex;
  gap: 16rpx;
  margin-bottom: 32rpx;
}
.tab-item {
  flex: 1;
  padding: 20rpx;
  text-align: center;
  font-weight: 700;
  font-size: 26rpx;
  color: $on-surface-variant;
  background: rgba(255,255,255,0.3);
  border-radius: 16rpx;
  border: 1px solid rgba(0,80,203,0.1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
}
.tab-active {
  background: $primary;
  color: #fff;
  border-color: $primary;
}
.tab-badge {
  background: #dc2626;
  color: #fff;
  font-size: 18rpx;
  padding: 2rpx 12rpx;
  border-radius: 999rpx;
  font-weight: 800;
}

// Search
.search-panel {
  padding: 32rpx;
  border-radius: 24rpx;
  margin-bottom: 32rpx;
}
.search-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24rpx;
}
.search-item {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}
.label {
  font-size: 20rpx;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-left: 8rpx;
}
.input-wrapper {
  position: relative;
  background: rgba(224, 227, 229, 0.5);
  border-radius: 16rpx;
  padding: 16rpx 24rpx;
  display: flex;
  align-items: center;
}
.input-field {
  font-size: 28rpx;
  font-weight: 500;
  color: $on-surface;
  flex: 1;
}
.input-wrapper .icon {
  font-size: 32rpx;
  margin-left: 16rpx;
}
.btn-primary {
  background: $primary-container;
  color: #fff;
  font-weight: 700;
  padding: 24rpx;
  border-radius: 16rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 102, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
}

// Loading & Empty
.loading-box, .empty-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80rpx 0;
}
.empty-box {
  border-radius: 24rpx;
  padding: 64rpx;
}

// Group List
.group-list {
  display: flex;
  flex-direction: column;
  gap: 48rpx;
}
.group-section {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}
.group-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
}
.indicator {
  height: 40rpx;
  width: 8rpx;
  background: $primary;
  border-radius: 100rpx;
}
.group-title {
  font-size: 28rpx;
}
.group-count {
  font-size: 28rpx;
  opacity: 0.6;
}
.divider {
  height: 2rpx;
  background: linear-gradient(to right, rgba(0,80,203,0.2), transparent);
}

// Cards
.plan-card {
  padding: 32rpx;
  border-radius: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.card-title {
  font-size: 28rpx;
  flex: 1;
  margin-right: 16rpx;
}
.status-badge {
  padding: 4rpx 16rpx;
  border-radius: 999rpx;
  font-size: 20rpx;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  flex-shrink: 0;
}
.status-pending { background: #eff6ff; color: #1d4ed8; border: 1px solid rgba(0,80,203,0.1); }
.status-info { background: #eff6ff; color: #0050cb; border: 1px solid rgba(0,80,203,0.2); }
.status-success { background: #ecfdf5; color: #047857; border: 1px solid rgba(4,120,87,0.1); }
.status-warning { background: #fffbeb; color: #d97706; border: 1px solid rgba(217,119,6,0.1); }
.status-error { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }

.card-meta {
  display: flex;
  align-items: center;
  gap: 32rpx;
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 8rpx;
}
.meta-item .icon {
  font-size: 24rpx;
}

.card-footer {
  padding-top: 16rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.fb-count {
  background: rgba(0,80,203,0.08);
  padding: 4rpx 16rpx;
  border-radius: 999rpx;
}

.action-btn {
  width: 100%;
  padding: 16rpx;
  background: rgba(255,255,255,0.4);
  border: 1px solid rgba(0,80,203,0.1);
  border-radius: 16rpx;
  color: $primary;
  font-size: 22rpx;
  font-weight: 700;
  text-align: center;
}
.action-btn:active {
  background: rgba(255,255,255,0.6);
}

.bottom-spacer {
  height: 180rpx; /* Leave space for bottom bar */
}
</style>
