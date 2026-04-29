<template>
  <view class="page-container industrial-grid pb-32">
    <cu-custom bgColor="bg-gradual-blue" :isCustom="true">
      <block slot="backText"></block>
      <block slot="content">计划管理</block>
    </cu-custom>
    
    
    <!-- Header Section -->
    <view class="header-row px-5 pt-10px">
      <view class="section-title-wrap">
        <text class="page-title display-block">计划管理</text>
        <text class="page-subtitle display-block mt-1">INDUSTRIAL MANAGEMENT CONSOLE</text>
      </view>
      <view class="notif-btn bg-glass">
        <text class="material-symbols-outlined text-on-surface-variant">precision_manufacturing</text>
      </view>
    </view>

    <!-- Tab System & Search Panel -->
    <view class="px-5 mb-3">
      <view class="tab-system">
        <view class="status-tabs">
          <view class="tab" v-for="(tab, index) in tabList" :key="index"
            :class="currentTab === index ? 'active-tab bg-white' : 'glass-tab'" @click="tabChange(index)">{{ tab.name }}
          </view>
        </view>

        <view class="search-panel glass-card-panel">
          <view class="grid-2 gap-4 mb-4">
            <view @click="showCalendar = true">
              <text class="input-label display-block mb-2">日期</text>
              <view class="date-wrapper">
                <text class="date-text" :class="{ 'placeholder': searchForm.date === '所有日期' }">{{ searchForm.date
                  }}</text>
                <text class="material-symbols-outlined icon">calendar_today</text>
              </view>
            </view>
            <view @click="showAreaSelect = true">
              <text class="input-label display-block mb-2">区域</text>
              <view class="select-wrapper">
                <text class="select-text">{{ searchForm.areaName }}</text>
                <text class="material-symbols-outlined icon">expand_more</text>
              </view>
            </view>
          </view>
          <view class="btn-primary active-press w-full" @click="onSearch">
            <text class="material-symbols-outlined icon mr-2" style="font-size: 36rpx;">search</text>
            <text>搜索</text>
          </view>
        </view>
      </view>
    </view>

    <!-- Plan List Items -->
    <view class="px-5 mb-6" style="min-height: 400rpx;">

      <u-empty v-if="!loading && planList.length === 0" mode="list" margin-top="80"></u-empty>

      <!-- Plan List Grouped by Area -->
      <view class="plan-list">
        <view class="area-group" v-for="(group, gIndex) in groupedPlanList" :key="gIndex">
          <!-- Area Group Header -->
          <view class="area-group-header flex row center-y">
            <view class="area-group-line"></view>
            <text class="area-group-title">{{ group.areaName }}</text>
            <text class="area-group-count">({{ group.list.length }})</text>
          </view>

          <view class="card-panel p-4 mb-3" v-for="(item, index) in group.list" :key="index">
            <view class="flex justify-between items-center mb-3">
              <text class="card-title font-bold">{{ item.title }}</text>
              <view class="tag-pill" :class="[item._statusClass]">
                <text>{{ item._statusText }}</text>
              </view>
            </view>
            
            <view class="flex items-center gap-4 mb-4">
              <view class="flex items-center gap-1 icon-text border-right pr-3" v-if="item._deadlineShow">
                <text class="material-symbols-outlined" style="font-size:28rpx;">event</text>
                <text>{{ item._deadlineShow }}</text>
              </view>
              <view class="flex items-center gap-1 icon-text" v-if="item._areaNameText">
                <text class="material-symbols-outlined" style="font-size:28rpx;">location_on</text>
                <text>{{ item._areaNameText }}</text>
              </view>
            </view>

            <view class="roles-row mb-4">
              <!-- 执行人区域 -->
              <view class="role-executors">
                <text class="role-label">执行人：</text>
                <text class="role-names">{{ item._executorName }}</text>
                <image class="verifier-avatar" :src="item._executorAvatar" mode="aspectFill"></image>
              </view>

              <!-- 验收人区域 -->
              <view class="role-verifier">
                <text class="role-label">验收人：</text>
                <text class="role-names">{{ item._issuerName }}</text>
                <image class="verifier-avatar" :src="item._issuerAvatar" mode="aspectFill"></image>
              </view>
            </view>

            <!-- Actions -->
            <view class="card-action flex row space-between center-y">
              <view class="dept-info flex row center-y">
                <text class="vk-icon vk-icon-shop dept-icon"></text>
                <text class="dept-text">计划下达部门: {{ item._deptName }}</text>
              </view>
              <view class="action-btn-small flex center" hover-class="hover-opacity" @click="goToFeedback(gIndex, index)">
                <text class="action-text">查看跟进</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 加载提示 -->
      <view v-if="planList.length > 0" class="flex center mt-4">
        <u-loadmore :status="loadStatus" bg-color="#f8fafc" margin-top="20" margin-bottom="40" />
      </view>
    </view>

    <!-- Bottom Tab Bar -->
    <my-tab-bar :current="3" />

    <!-- 隐藏原生的 Uview 选择弹窗组件 -->
    <u-calendar v-model="showCalendar" mode="date" max-date="2099-12-31" @change="onDateChange"></u-calendar>
    <u-select v-model="showAreaSelect" :list="areaList" value-name="_id" label-name="name"
      @confirm="onAreaConfirm"></u-select>

  </view>
</template>

<script>
let vk = uni.vk;
export default {
  data() {
    return {
      vk: uni.vk,
      scrollTop: 0,

      // -- UI States --
      showCalendar: false,
      showAreaSelect: false,

      // -- Form & Filters --
      searchForm: {
        date: '所有日期',
        dateTimestamp: null,
        areaId: '',
        areaName: '所有区域'
      },

      // -- Tabs --
      tabList: [
        { name: '全部计划', value: 'all' },
        { name: '需我执行', value: 'todo' },
        { name: '需我验收', value: 'audit' }
      ],
      currentTab: 0,

      // -- Base Data --
      areaList: [],

      // -- Pagination & List Data --
      loading: true,
      planList: [],
      page: {
        pageIndex: 1,
        pageSize: 15,
        total: 0
      },
      loadStatus: 'loadmore'
    };
  },
  computed: {
    groupedPlanList() {
      let groupsMap = {};
      let result = [];
      
      this.planList.forEach(item => {
        let areaId = item.area_id || 'unknown';
        let areaName = item._areaNameText || '未分配区域';
        
        if (!groupsMap[areaId]) {
          let newGroup = {
            areaId: areaId,
            areaName: areaName,
            list: []
          };
          groupsMap[areaId] = newGroup;
          result.push(newGroup);
        }
        groupsMap[areaId].list.push(item);
      });
      
      return result;
    }
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  onLoad(options = {}) {
    vk = uni.vk;
    this.options = options;
    this.init(options);
  },
  onShow() {
    let filter = uni.getStorageSync('planListFilter');
    if (filter === 'needMyExecute') {
      this.currentTab = 1; // 需我执行
      uni.removeStorageSync('planListFilter');
      this.onSearch();
    }
  },
  onReachBottom() {
    if (this.loadStatus === 'nomore' || this.loadStatus === 'loading') return;
    this.page.pageIndex++;
    this.loadData();
  },
  onPullDownRefresh() {
    this.resetData();
    this.loadData().then(() => {
      setTimeout(() => {
        uni.stopPullDownRefresh();
      }, 800);
    });
  },
  onShareAppMessage(options) { },
  methods: {
    async init(options = {}) {
      try {
        let areaRes = await vk.callFunction({
          url: 'client/plan/kh/getAreaList',
          data: {}
        });
        if (areaRes.code === 0 && areaRes.rows) {
          this.areaList = [
            { _id: '', name: '所有区域' },
            ...areaRes.rows
          ];
        }
      } catch (err) {
        console.error('Failed to load area list', err);
      }
      this.loadData();
    },

    tabChange(index) {
      if (this.currentTab === index) return;
      this.currentTab = index;
      this.onSearch();
    },
    onDateChange(e) {
      this.searchForm.date = e.result;
      this.searchForm.dateTimestamp = new Date(e.result.replace(/-/g, '/')).getTime();
    },
    onAreaConfirm(e) {
      let item = e[0];
      this.searchForm.areaId = item.value;
      this.searchForm.areaName = item.label;
    },
    onSearch() {
      this.resetData();
      this.loadData();
    },
    resetData() {
      this.page.pageIndex = 1;
      this.planList = [];
      this.loadStatus = 'loading';
    },

    async loadData() {
      this.loading = true;
      this.loadStatus = 'loading';

      let { vk } = this;
      let whereJson = {};

      if (this.searchForm.areaId) {
        whereJson.area_id = this.searchForm.areaId;
      }

      let tabValue = this.tabList[this.currentTab].value;
      let myUid = vk.getVuex('$user.userInfo._id');

      if (tabValue === 'todo') {
        if (myUid) whereJson.assignee_ids = myUid;
      } else if (tabValue === 'audit') {
        if (myUid) {
          whereJson.uid = myUid;
          whereJson.status = 1;
        }
      }

      let res = await vk.callFunction({
        url: 'client/plan/kh/getList',
        data: {
          pageIndex: this.page.pageIndex,
          pageSize: this.page.pageSize,
          searchTimestamp: this.searchForm.dateTimestamp || null,
          whereJson
        }
      });

      this.loading = false;
      if (res.code === 0) {
        let list = res.rows || [];
        this.page.total = res.total || 0;

        list = list.map(item => {
          item._statusClass = this.getStatusClass(item.status);
          item._statusText = this.getStatusText(item.status);
          item._deadlineShow = item.deadline_time ? vk.pubfn.timeFormat(item.deadline_time, 'yyyy-MM-dd') : '';
          item._areaNameText = this.getAreaName(item.area_id);
          item._issuerName = this.getIssuerName(item);
          item._issuerAvatar = this.getIssuerAvatar(item);
          item._executorName = this.getExecutorName(item);
          item._executorAvatar = this.getExecutorAvatar(item);
          item._deptName = this.getDeptName(item);
          return item;
        });

        if (this.page.pageIndex === 1) {
          this.planList = list;
        } else {
          this.planList = this.planList.concat(list);
        }

        if (list.length < this.page.pageSize) {
          this.loadStatus = 'nomore';
        } else {
          this.loadStatus = 'loadmore';
        }
      } else {
        this.loadStatus = 'loadmore';
      }
    },

    getAreaName(areaId) {
      if (!areaId) return '';
      let match = this.areaList.find(x => x._id === areaId);
      return match ? match.name : '未知';
    },
    getIssuerName(item) {
      if (item.issuer_info) {
        let info = Array.isArray(item.issuer_info) ? item.issuer_info[0] : item.issuer_info;
        if (info) return info.real_name || info.nickname || '管理员';
      }
      return '管理员';
    },
    getIssuerAvatar(item) {
      const defaultAvatar = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/41235688-6615-4672-88f5-46f041ff3dbb.png';
      if (item.issuer_info) {
        let info = Array.isArray(item.issuer_info) ? item.issuer_info[0] : item.issuer_info;
        if (info && info.avatar) return info.avatar;
      }
      return defaultAvatar;
    },
    getExecutorName(item) {
      if (item.assignee_info) {
        let info = Array.isArray(item.assignee_info) ? item.assignee_info[0] : item.assignee_info;
        if (info) return info.real_name || info.nickname || '未分配';
      }
      return '未分配';
    },
    getExecutorAvatar(item) {
      const defaultAvatar = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/41235688-6615-4672-88f5-46f041ff3dbb.png';
      if (item.assignee_info) {
        let info = Array.isArray(item.assignee_info) ? item.assignee_info[0] : item.assignee_info;
        if (info && info.avatar) return info.avatar;
      }
      return defaultAvatar;
    },
    getDeptName(item) {
      if (item.dept_info) {
        let info = Array.isArray(item.dept_info) ? item.dept_info[0] : item.dept_info;
        if (info && info.name) return info.name;
      }
      return '未分配部门';
    },
    getStatusClass(status) {
      const dict = {
        0: 'tag-blue',
        1: 'tag-blue',
        2: 'tag-green',
        3: 'tag-red',
        4: 'tag-red',
        5: 'tag-red'
      };
      return dict[status] || 'tag-blue';
    },
    getStatusText(status) {
      const texts = ['执行中', '已待验', '已完成', '未达标', '已逾期', '超时未验收'];
      return texts[status] || '解析中';
    },

    goToFeedback(gIndex, index) {
      let item = this.groupedPlanList[gIndex].list[index];
      if (!item || !item._id) {
        return uni.showToast({ title: '无法获取单据ID', icon: 'none' });
      }
      uni.navigateTo({
        url: '/pages/plan/feedback?id=' + item._id
      });
    }
  }
};
</script>

<style scoped>
/* Base Styles */
.page-container {
  min-height: 100vh;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
}

.industrial-grid {
  background-image: radial-gradient(rgba(0, 80, 203, 0.05) 1px, transparent 1px);
  background-size: 40rpx 40rpx;
}

/* Typography */
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16rpx;
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
  color: #424656;
  font-weight: 500;
  letter-spacing: 4rpx;
  text-transform: uppercase;
}

.font-bold {
  font-weight: 700;
}

/* Layout Helpers */
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.row {
  flex-direction: row;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.center {
  align-items: center;
  justify-content: center;
}

.center-y {
  align-items: center;
}

.space-between {
  justify-content: space-between;
}

.w-full {
  width: 100%;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.gap-1 {
  gap: 8rpx;
}

.gap-4 {
  gap: 32rpx;
}

/* Spacing */
.px-5 {
  padding-left: 30rpx;
  padding-right: 30rpx;
}

.pt-10px {
  padding-top: 10rpx;
}

.pr-3 {
  padding-right: 24rpx;
}

.pb-32 {
  padding-bottom: 256rpx;
}

.p-4 {
  padding: 32rpx;
}

.mb-3 {
  margin-bottom: 24rpx;
}

.mb-4 {
  margin-bottom: 32rpx;
}

.mb-6 {
  margin-bottom: 48rpx;
}

.mt-1 {
  margin-top: 8rpx;
}

.mt-4 {
  margin-top: 32rpx;
}

.mr-2 {
  margin-right: 16rpx;
}

.display-block {
  display: block;
}

/* Theme Components */
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
  box-shadow:
    0 4rpx 12rpx rgba(0, 80, 203, 0.15),
    inset 0 2rpx 0 rgba(255, 255, 255, 0.6);
}

.text-on-surface-variant {
  color: #5c6370;
}

.card-panel {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));
  border-radius: 24rpx;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 
    0 4rpx 16rpx -4rpx rgba(0, 80, 203, 0.08),
    0 16rpx 48rpx -8rpx rgba(0, 80, 203, 0.15),
    inset 0 2rpx 0 rgba(255, 255, 255, 0.9);
}

.search-panel {
  position: relative;
  z-index: 40;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(24px);
  border-radius: 0 24rpx 24rpx 24rpx;
  padding: 32rpx;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow:
    0 8rpx 24rpx -8rpx rgba(0, 80, 203, 0.12),
    0 24rpx 64rpx -12rpx rgba(0, 80, 203, 0.20),
    inset 0 2rpx 0 rgba(255, 255, 255, 1);
}

/* Status Tabs System */
.tab-system {
  display: flex;
  flex-direction: column;
}

.status-tabs {
  display: flex;
  align-items: flex-end;
  padding: 0;
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
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab.active-tab {
  z-index: 30;
  background: #fff;
  color: #0050cb;
  font-weight: 700;
  box-shadow:
    0 -12rpx 32rpx -8rpx rgba(0, 80, 203, 0.15),
    inset 0 2rpx 0 rgba(255, 255, 255, 1);
}

.tab.glass-tab {
  z-index: 20;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(12px);
  color: #64748b;
  font-weight: 500;
  opacity: 0.8;
  border-color: rgba(255, 255, 255, 0.4);
}

.input-label {
  font-size: 24rpx;
  font-weight: 800;
  color: #0050cb;
  letter-spacing: 2rpx;
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
  height: 64rpx;
  box-sizing: border-box;
}

.date-text.placeholder {
  color: #9ca3af;
}

.icon {
  color: #0050cb;
}

.btn-primary {
  background: #0050cb;
  color: #fff;
  box-shadow: 0 8rpx 16rpx rgba(0, 80, 203, 0.2);
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  font-size: 26rpx;
  font-weight: 700;
  height: 64rpx;
  padding: 16rpx 20rpx;
  transition: all 0.3s ease;
}

/* Area Group Header */
.area-group {
  margin-bottom: 20rpx;
}
.area-group-header {
  padding: 10rpx 20rpx 20rpx;
}
.area-group-line {
  width: 6rpx;
  height: 28rpx;
  background: #0050cb;
  border-radius: 4rpx;
  margin-right: 12rpx;
}
.area-group-title {
  font-size: 30rpx;
  font-weight: 700;
  color: #1e293b;
  margin-right: 8rpx;
}
.area-group-count {
  font-size: 26rpx;
  color: #64748b;
}

/* Card Elements */
.card-title {
  font-size: 30rpx;
  color: #0f172a;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 16rpx;
  display: block;
}

.border-right {
  border-right: 2rpx solid #e2e8f0;
}

.tag-pill {
  padding: 8rpx 20rpx;
  border-radius: 32rpx;
  font-size: 22rpx;
  font-weight: 700;
}

.tag-blue { background-color: #eff6ff; color: #0066ff; }
.tag-green { background-color: #f0fdf4; color: #16a34a; }
.tag-red { background-color: #fef2f2; color: #dc2626; }

.icon-text {
  color: #64748b;
  font-size: 26rpx;
}

/* Custom Roles Row */
.roles-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f8fafc;
  border-radius: 12rpx;
  padding: 16rpx 24rpx;
}

.role-executors, .role-verifier {
  display: flex;
  align-items: center;
  flex: 1;
}

.role-verifier {
  justify-content: flex-end;
}

.role-label {
  font-size: 26rpx;
  color: #94a3b8;
  margin-right: 8rpx;
}

.role-names {
  font-size: 26rpx;
  color: #334155;
  font-weight: 500;
  margin-right: 16rpx;
}

.verifier-avatar {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  border: 2rpx solid #ffffff;
  box-shadow: 0 2rpx 6rpx rgba(0,0,0,0.06);
}

/* Actions Small */
.card-action {
  margin-top: 24rpx;
  padding-top: 24rpx;
  border-top: 2rpx dashed #e2e8f0;
}

.dept-info {
  flex: 1;
}
.dept-icon {
  font-size: 28rpx;
  color: #64748b;
  margin-right: 8rpx;
}
.dept-text {
  font-size: 24rpx;
  color: #64748b;
}

.action-btn-small {
  padding: 0 32rpx;
  height: 60rpx;
  background: #ffffff;
  border: 2rpx solid #0050cb;
  border-radius: 12rpx;
}
.action-btn-small .action-text {
  color: #0050cb;
  font-size: 26rpx;
  font-weight: 500;
}
</style>
