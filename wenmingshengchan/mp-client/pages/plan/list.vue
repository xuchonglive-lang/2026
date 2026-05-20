<template>
  <view class="page-container industrial-grid">
    <z-paging ref="paging" v-model="planList" @query="queryList" :fixed="true" bg-color="transparent" :safe-area-inset-bottom="true">
      <template slot="top">
        <cu-custom bgColor="bg-gradual-blue" :isCustom="true">
          <block slot="backText"></block>
          <block slot="content">计划管理</block>
        </cu-custom>

        <!-- Tab System & Search Panel (固定在顶部) -->
        <view class="px-5 mb-3 pt-4">
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
                    <u-icon name="calendar" color="#0050cb" size="28"></u-icon>
                  </view>
                </view>
                <view @click="showLocationSelect = true">
                  <text class="input-label display-block mb-2">区域</text>
                  <view class="select-wrapper">
                    <text class="select-text">{{ searchForm.areaName }}</text>
                    <u-icon name="arrow-down" color="#0050cb" size="28"></u-icon>
                  </view>
                </view>
              </view>
              <view class="btn-primary active-press w-full" @click="onSearch">
                <u-icon name="search" color="#ffffff" size="36" style="margin-right: 16rpx;"></u-icon>
                <text>搜索</text>
              </view>
            </view>
          </view>
        </view>
      </template>

      <!-- Plan List Grouped by Area -->
      <view class="px-5 mb-6">
        <view class="plan-list">
          <view class="area-group" v-for="(group, gIndex) in groupedPlanList" :key="gIndex">
            <!-- Area Group Header -->
            <view class="area-group-header">
              <view class="action sub-title">
                <text class="text-lg text-bold text-black">{{ group.areaName }}（{{ group.list.length }}）</text>
                <text class="bg-blue"></text>
              </view>
            </view>

            <view class="card-panel p-4 mb-3" v-for="(item, index) in group.list" :key="item._id">
              <view class="flex justify-between items-start mb-3">
                <view class="title-row-plan">
                  <view class="blue-block-plan"></view>
                  <text class="card-title font-bold u-line-2">{{ item.title }}</text>
                </view>
                <view class="tag-pill flex-shrink" :class="[item._statusClass]">
                  <text>{{ item._statusText }}</text>
                </view>
              </view>
              
              <view class="flex items-center gap-4 mb-4">
                <view class="flex items-center gap-1 icon-text border-right pr-3" v-if="item._deadlineShow">
                  <u-icon name="calendar-fill" color="#64748b" size="28"></u-icon>
                  <text>{{ item._deadlineShow }}</text>
                </view>
                <view class="flex items-center gap-1 icon-text" v-if="item._areaNameText">
                  <u-icon name="map-fill" color="#64748b" size="28"></u-icon>
                  <text>{{ item._areaNameText }}</text>
                </view>
              </view>

              <view class="roles-row mb-4">
                <!-- 执行人区域 -->
                <view class="role-executors">
                  <text class="role-label">执行人：</text>
                  <view class="avatar-stack" v-if="item.assignee_info && item.assignee_info.length > 0">
                    <image class="stack-avatar" v-for="(user, idx) in item.assignee_info.slice(0, 2)" :key="idx"
                      :src="user.avatar || defaultAvatar" @error="onStackAvatarError(item, idx)" mode="aspectFill"></image>
                    <view class="stack-more" v-if="item.assignee_info.length > 2">
                      +{{ item.assignee_info.length - 2 }}
                    </view>
                  </view>
                  <text class="role-names">{{ item._executorName }}</text>
                </view>

                <!-- 验收人区域 -->
                <view class="role-verifier">
                  <text class="role-label">验收人：</text>
                  <text class="role-names">{{ item._issuerName }}</text>
                  <image class="verifier-avatar" :src="item._issuerAvatar" @error="onVerifierAvatarError(item)" mode="aspectFill"></image>
                </view>
              </view>

              <!-- Actions -->
              <view class="card-action flex row space-between center-y">
                <view class="dept-info flex row center-y">
                  <u-icon name="home" color="#64748b" size="28" style="margin-right: 8rpx;"></u-icon>
                  <text class="dept-text">计划下达部门: {{ item._deptName }}</text>
                </view>
                <view class="action-btn-small flex center" hover-class="hover-opacity" @click="goToFeedbackById(item._id)">
                  <text class="action-text">查看跟进</text>
                </view>
              </view>
            </view>
          </view>
        </view>
        <!-- 底部占位，防止被 TabBar 遮挡 -->
        <view style="height: 120rpx;"></view>
      </view>

      <template #bottom>
        <my-tab-bar :current="3" />
      </template>
    </z-paging>

    <!-- 隐藏原生的 Uview 选择弹窗组件 -->
    <u-calendar v-model="showCalendar" mode="date" max-date="2099-12-31" @change="onDateChange"></u-calendar>
    <u-select :key="selectKey" v-model="showLocationSelect" :list="selectAreaList" mode="single-column"
      @confirm="onLocationConfirm"></u-select>
  </view>
</template>

<script>
let vk = uni.vk;
export default {
  data() {
    return {
      vk: uni.vk,
      scrollTop: 0,
      defaultAvatar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgMTIwIj4KICA8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2YxZjVmOSIvPgogIDxjaXJjbGUgY3g9IjYwIiBjeT0iNDgiIHI9IjI0IiBmaWxsPSIjY2JkNWUxIi8+CiAgPHBhdGggZD0iTTYwIDgwYy0yNSAwLTQwIDE1LTQwIDI0aDgwYzAtOS0xNS0yNC00MC0yNHoiIGZpbGw9IiNjYmQ1ZTEiLz4KPC9zdmc+',

      // -- UI States --
      showCalendar: false,
      showLocationSelect: false,
      selectKey: Date.now(),
      selectAreaList: [
        { value: '', label: '所有区域' }
      ],

      // -- Form & Filters --
      searchForm: {
        date: '所有日期',
        dateTimestamp: null,
        areaId: '',
        pointId: '',
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
      planList: []
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
  created() {
    console.log('[Plan List] 🟢 created 周期触发：自动加载区域列表');
    this.getAreaList();
  },
  onLoad(options = {}) {
    vk = uni.vk;
    if (vk.pubfn.checkLogin()) {
      this.options = options;
      this.init(options);
    }
  },
  onShow() {
    let filter = uni.getStorageSync('planListFilter');
    if (filter === 'needMyExecute') {
      this.currentTab = 1; // 需我执行
      uni.removeStorageSync('planListFilter');
      this.onSearch();
    }
  },
  onShareAppMessage(options) { },
  methods: {
    init(options = {}) {
      this.getAreaList();
      this.onSearch();
    },

    getAreaList() {
      console.log('[Plan List] 📡 发起云端请求：调用 client/plan/kh/getAreaList');
      this.vk.callFunction({
        url: 'client/plan/kh/getAreaList',
        data: {},
        success: (res) => {
          console.log('[Plan List] 📥 区域数据返回成功：', res);
          if (res.code === 0 && res.rows) {
            this.selectAreaList = [
              { value: '', label: '所有区域' },
              ...res.rows.map(item => ({
                value: item._id,
                label: item.name
              }))
            ];
            this.areaList = [
              { _id: '', name: '所有区域' },
              ...res.rows
            ];
            this.selectKey = Date.now();
            console.log('[Plan List] ✅ 下拉选择数据 selectAreaList 渲染就绪：', this.selectAreaList);
          }
        },
        fail: (err) => {
          console.error('[Plan List] ❌ 加载区域列表云函数失败：', err);
        }
      });
    },

    tabChange(index) {
      if (this.currentTab === index) return;
      this.currentTab = index;
      this.onSearch();
    },
    onDateChange(e) {
      this.searchForm.date = e.result;
      this.searchForm.dateTimestamp = new Date(e.result.replace(/-/g, '/')).getTime();
      this.onSearch();
    },
    onLocationConfirm(arr) {
      let area = arr[0];
      if (area && area.value) {
        this.searchForm.areaId = area.value;
        this.searchForm.pointId = '';
        this.searchForm.areaName = area.label;
      } else {
        this.searchForm.areaId = '';
        this.searchForm.pointId = '';
        this.searchForm.areaName = '所有区域';
      }
      this.onSearch();
    },
    onSearch() {
      if (this.$refs.paging) {
        this.$refs.paging.reload();
      }
    },

    async queryList(pageNo, pageSize) {
      if (pageNo === 1) {
        console.log('[Plan List] 🔄 z-paging 刷新/首屏触发：自动同步区域列表');
        this.getAreaList();
      }
      let { vk } = this;
      let whereJson = {};

      if (this.searchForm.areaId) {
        whereJson.area_id = this.searchForm.areaId;
      }
      if (this.searchForm.pointId) {
        whereJson.point_id = this.searchForm.pointId;
      }

      let tabValue = this.tabList[this.currentTab].value;
      let myUid = vk.getVuex('$user.userInfo._id');

      if (tabValue === 'todo') {
        if (myUid) {
          whereJson.assignee_ids = myUid;
          whereJson.status = 0; // 仅显示执行中的任务
        }
      } else if (tabValue === 'audit') {
        if (myUid) {
          whereJson.uid = myUid;
          whereJson.status = 1;
        }
      }

      vk.callFunction({
        url: 'client/plan/kh/getList',
        data: {
          pageIndex: pageNo,
          pageSize: pageSize,
          searchTimestamp: this.searchForm.dateTimestamp || null,
          whereJson
        },
        success: (res) => {
          if (res.code === 0) {
            let list = res.rows || [];
            list = list.map(item => {
              item._statusClass = this.getStatusClass(item.status);
              item._statusText = this.getStatusText(item.status);
              item._deadlineShow = item.deadline_time ? vk.pubfn.timeFormat(item.deadline_time, 'yyyy-MM-dd') : '';
              item._areaNameText = this.getAreaName(item);
              item._issuerName = this.getIssuerName(item);
              item._issuerAvatar = this.getIssuerAvatar(item);
              item._executorName = this.getExecutorName(item);
              item._executorAvatar = this.getExecutorAvatar(item);
              item._deptName = this.getDeptName(item);
              return item;
            });
            this.$refs.paging.complete(list);
          } else {
            this.$refs.paging.complete(false);
          }
        },
        fail: () => {
          this.$refs.paging.complete(false);
        }
      });
    },

    getAreaName(item) {
      if (item && item.area_info) {
        let info = Array.isArray(item.area_info) ? item.area_info[0] : item.area_info;
        if (info && info.name) return info.name;
      }
      let areaId = item ? (typeof item === 'object' ? item.area_id : item) : '';
      if (!areaId) return '未分配区域';
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
      if (item.issuer_info) {
        let info = Array.isArray(item.issuer_info) ? item.issuer_info[0] : item.issuer_info;
        if (info && info.avatar) return info.avatar;
      }
      return this.defaultAvatar;
    },
    getExecutorName(item) {
      if (item.assignee_info && item.assignee_info.length > 0) {
        let info = item.assignee_info[0];
        let name = info.real_name || info.nickname || '未分配';
        return item.assignee_info.length > 1 ? `${name} 等${item.assignee_info.length}人` : name;
      }
      return '未分配';
    },
    getExecutorAvatar(item) {
      if (item.assignee_info && item.assignee_info.length > 0) {
        let info = item.assignee_info[0];
        if (info && info.avatar) return info.avatar;
      }
      return this.defaultAvatar;
    },
    onStackAvatarError(item, idx) {
      if (item.assignee_info && item.assignee_info[idx]) {
        this.$set(item.assignee_info[idx], 'avatar', this.defaultAvatar);
      }
    },
    onVerifierAvatarError(item) {
      item._issuerAvatar = this.defaultAvatar;
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

    goToFeedbackById(id) {
      if (!id) {
        return uni.showToast({ title: '无法获取单据ID', icon: 'none' });
      }
      uni.navigateTo({
        url: '/pages/plan/feedback?id=' + id
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
  background: #ffffff;
  border-radius: 0 0 32rpx 32rpx; /* 左上角和右上角均为直角 */
  padding: 32rpx;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
}

/* Status Tabs System */
.tab-system {
  display: flex;
  flex-direction: column;
  margin-top: 48rpx; /* 大幅增加上方留白 */
}

.status-tabs {
  display: flex;
  align-items: flex-end;
  padding: 0;
  margin-bottom: -2rpx; /* 往下压 2rpx，刚好盖住下方 search-panel 的 top border */
  position: relative;
  z-index: 50;
}

.tab {
  position: relative;
  padding: 24rpx 48rpx;
  font-size: 28rpx;
  border-radius: 32rpx 32rpx 0 0; /* 增大圆角凸显弧形 */
  border: none;
  margin-right: 0rpx; /* 移除之前的负边距，因为没有边框不需要重叠 */
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab.active-tab {
  z-index: 50;
  background: #ffffff;
  color: #0050cb;
  font-weight: 700;
  /* 移除这里的 shadow 和 clip-path，转交伪元素处理 */
}

/* 提供顶部/左右的阴影，并在底部精准裁切 */
.tab.active-tab::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #ffffff;
  border-radius: 32rpx 32rpx 0 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  z-index: -1;
  clip-path: inset(-20px -20px 0px -20px);
}

/* 强力遮盖桥梁：物理覆盖下方 panel 的 top-border */
.tab.active-tab::after {
  content: '';
  position: absolute;
  bottom: -4rpx; /* 向下延伸盖住边框 */
  left: 0;
  right: 0;
  height: 8rpx;
  background: #ffffff;
  z-index: 10;
}

.tab.glass-tab {
  z-index: 20;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  color: #64748b;
  font-weight: 500;
  /* 没选中的不覆盖边框，让 search-panel 的边框显露 */
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

/* Area Group Header - 大标题（与首页 sub-title 一致） */
.area-group {
  margin-bottom: 20rpx;
}

.area-group-header {
  padding: 10rpx 20rpx 20rpx;
}

.action.sub-title {
  position: relative;
  display: inline-block;
  margin-left: 0;
}

.action.sub-title .text-lg {
  position: relative;
  z-index: 1;
  font-size: 32rpx;
  font-weight: 800;
  color: #1a1d20 !important;
  letter-spacing: -0.5rpx;
}

.action.sub-title .bg-blue {
  position: absolute;
  display: inline-block;
  bottom: 0rpx;
  border-radius: 4rpx;
  width: 100%;
  height: 12rpx;
  left: 12rpx;
  opacity: 0.4;
  z-index: 0;
  background-color: #0062ff !important;
}

/* 卡片小标题 - 与 info 页 title-row 风格一致 */
.title-row-plan {
  display: flex;
  align-items: flex-start;
  flex: 1;
  overflow: hidden;
  margin-right: 16rpx;
}

.blue-block-plan {
  width: 8rpx;
  height: 28rpx;
  background-color: #0050cb;
  border-radius: 4rpx;
  margin-right: 16rpx;
  margin-top: 6rpx;
  flex-shrink: 0;
}

.card-title {
  font-size: 30rpx;
  color: #0f172a;
  flex: 1;
  display: block;
}

.flex-shrink {
  flex-shrink: 0;
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

.role-executors {
  display: flex;
  align-items: center;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
}

.role-verifier {
  display: flex;
  align-items: center;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  justify-content: flex-end;
}

.role-label {
  font-size: 20rpx;
  color: #94a3b8;
  margin-right: 6rpx;
  flex-shrink: 0;
}

.role-names {
  font-size: 20rpx;
  color: #334155;
  font-weight: 500;
  margin-right: 12rpx;
  white-space: nowrap;
}

.verifier-avatar {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  border: 2rpx solid #ffffff;
  box-shadow: 0 2rpx 6rpx rgba(0,0,0,0.06);
}

.avatar-stack {
  display: flex;
  align-items: center;
  margin-right: 8rpx;
}

.stack-avatar {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  border: 2rpx solid #ffffff;
  margin-left: -20rpx;
  box-shadow: 0 2rpx 6rpx rgba(0,0,0,0.1);
}

.stack-avatar:first-child {
  margin-left: 0;
}

.stack-more {
  background: rgba(0, 80, 203, 0.1);
  color: #0050cb;
  font-weight: 700;
  font-size: 16rpx;
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  border: 2rpx solid #ffffff;
  margin-left: -20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
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
