<template>
  <view class="page-container dot-bg pb-32">
    <!-- Header Section -->
    <view class="px-5 pt-12 pb-6 flex justify-between items-center">
      <view>
        <text class="page-title display-block">计划管理</text>
        <text class="page-subtitle display-block mt-1">INDUSTRIAL MANAGEMENT CONSOLE</text>
      </view>
      <view class="icon-square-btn flex center">
        <text class="material-symbols-outlined text-primary text-xl">precision_manufacturing</text>
      </view>
    </view>

    <!-- Search Panel -->
    <view class="px-5 mb-4">
      <view class="card-panel p-5">
        <view class="grid-2 gap-4 mb-4">
          <view @click="showCalendar = true">
            <text class="input-label display-block mb-2">日期</text>
            <view class="input-box flex items-center relative">
              <text class="input-text">{{ searchForm.date }}</text>
              <text class="material-symbols-outlined text-primary absolute right-3">calendar_today</text>
            </view>
          </view>
          <view @click="showAreaSelect = true">
            <text class="input-label display-block mb-2">区域</text>
            <view class="input-box flex items-center relative">
              <text class="input-text">{{ searchForm.areaName }}</text>
              <text class="material-symbols-outlined text-primary absolute right-3">expand_more</text>
            </view>
          </view>
        </view>
        <view class="primary-btn flex center w-full" @click="onSearch">
          <text class="material-symbols-outlined mr-2" style="font-size: 36rpx;">search</text>
          <text>搜索</text>
        </view>
      </view>
    </view>

    <!-- Tabs Section using uView -->
    <view class="px-5 mb-8">
      <u-subsection :list="tabList" :current="currentTab" @change="tabChange" active-color="#0066ff" mode="subsection" bg-color="#ffffff" button-color="#eff6ff"></u-subsection>
    </view>

    <!-- Plan List Items -->
    <view class="px-5 mb-8" style="min-height: 400rpx;">
      
      <u-empty v-if="!loading && planList.length === 0" mode="list" margin-top="80"></u-empty>

      <view class="card-panel p-4 mb-4" v-for="(item, index) in planList" :key="index">
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

        <view class="flex items-center justify-between mb-4 mt-2">
          <text class="icon-text text-xs">发布人: {{ item._issuerName }}</text>
        </view>

        <view class="action-btn flex center w-full" @click="goToFeedback(item)">
          <text>查看跟进</text>
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
    <u-select v-model="showAreaSelect" :list="areaList" value-name="_id" label-name="name" @confirm="onAreaConfirm"></u-select>

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
        dateTimestamp: null,  // milliseconds to match start of that day
        areaName: '所有区域',
        areaId: ''
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
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  onLoad(options = {}) {
    vk = uni.vk;
    this.options = options;
    this.init(options);
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
  onShareAppMessage(options) {},
  methods: {
    async init(options = {}) {
      // 拉取底层基础区域字典
      try {
        let areaRes = await vk.callFunction({
          url: 'client/plan/sys/getAreaList',
          data: {}
        });
        if (areaRes.code === 0 && areaRes.rows) {
          // 装载"重置"选项
          this.areaList = [
            { _id: '', name: '所有区域' },
            ...areaRes.rows
          ];
        }
      } catch (err) {
        console.error('Failed to load area list', err);
      }
      
      // 拉取初始列表
      this.loadData();
    },
    
    // --- UI Interactions ---
    tabChange(index) {
      if (this.currentTab === index) return;
      this.currentTab = index;
      this.onSearch(); // Switch tab should reset data
    },
    onDateChange(e) {
      this.searchForm.date = e.result;
      // 转换为该日期的0点时间戳
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

    // --- Backend API Fetch ---
    async loadData() {
      this.loading = true;
      this.loadStatus = 'loading';

      let { vk } = this;
      let whereJson = {};

      // 1. 构建区域过滤
      if (this.searchForm.areaId) {
        whereJson.area_id = this.searchForm.areaId;
      }

      // 3. 构建标签栏角色过滤
      let tabValue = this.tabList[this.currentTab].value;
      let myUid = vk.getVuex('$user.userInfo._id');
      
      if (tabValue === 'todo') {
        // 需我执行: 我在 assignees 中
        if (myUid) whereJson.assignee_ids = myUid;
      } else if (tabValue === 'audit') {
        // 需我验收: 我是发布人且状态为待审(1)
        if (myUid) {
           whereJson.issuer_uid = myUid;
           whereJson.status = 1; 
        }
      }

      // 调用专属云端查询服务
      let res = await vk.callFunction({
        url: 'client/plan/sys/getList',
        data: {
          pageIndex: this.page.pageIndex,
          pageSize: this.page.pageSize,
          searchTimestamp: this.searchForm.dateTimestamp || null, // 传给后端云函数解析
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
    
    // --- Data Rendering Parsers ---
    getAreaName(areaId) {
      if(!areaId) return '';
      let match = this.areaList.find(x => x._id === areaId);
      return match ? match.name : '未知';
    },
    getIssuerName(item) {
       if (item.issuer_info && item.issuer_info.length > 0) {
          return item.issuer_info[0].nickname || '管理员';
       }
       return '管理员';
    },
    getStatusClass(status) {
      // 0:执行中 1:已提交 2:已完成 3:未达标 4:已逾期 5:超时未验收
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

    goToFeedback(item) {
      console.log('Clicked feedback link for id: ', item._id);
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
  background-color: #f8fafc;
}

.dot-bg {
  background-image: radial-gradient(#cbd5e1 2rpx, transparent 2rpx);
  background-size: 32rpx 32rpx;
}

/* Typography */
.page-title {
  font-size: 64rpx;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: 2rpx;
}

.page-subtitle {
  font-size: 24rpx;
  font-weight: 500;
  color: #64748b;
  letter-spacing: 4rpx;
}

.font-bold { font-weight: 700; }
.text-xs { font-size: 24rpx; }
.text-primary { color: #0066ff; }

/* Layout Helpers */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
.items-center { align-items: center; }
.center { align-items: center; justify-content: center; }
.w-full { width: 100%; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
.gap-1 { gap: 8rpx; }
.gap-2 { gap: 16rpx; }
.gap-4 { gap: 32rpx; }

/* Spacing */
.px-5 { padding-left: 40rpx; padding-right: 40rpx; }
.pr-3 { padding-right: 24rpx; }
.pt-12 { padding-top: 96rpx; }
.pb-6 { padding-bottom: 48rpx; }
.pb-24 { padding-bottom: 192rpx; }
.pb-32 { padding-bottom: 256rpx; }
.p-4 { padding: 32rpx; }
.p-5 { padding: 40rpx; }
.mb-2 { margin-bottom: 16rpx; }
.mb-3 { margin-bottom: 24rpx; }
.mb-4 { margin-bottom: 32rpx; }
.mb-8 { margin-bottom: 64rpx; }
.mt-1 { margin-top: 8rpx; }
.mt-2 { margin-top: 16rpx; }
.mt-4 { margin-top: 32rpx; }
.mr-2 { margin-right: 16rpx; }

.display-block { display: block; }
.relative { position: relative; }
.absolute { position: absolute; }
.right-3 { right: 24rpx; }
.fixed { position: fixed; }
.bottom-0 { bottom: 0; }
.left-0 { left: 0; }
.z-50 { z-index: 50; }

/* Theme Components */
.icon-square-btn {
  width: 88rpx;
  height: 88rpx;
  background-color: #eef2ff;
  border-radius: 24rpx;
  border: 1px solid #e0e7ff;
}

.card-panel {
  background-color: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.03);
}

.input-label {
  font-size: 24rpx;
  font-weight: 700;
  color: #0066ff;
  letter-spacing: 2rpx;
}

.input-box {
  background-color: #f1f5f9;
  border-radius: 16rpx;
  padding: 24rpx 32rpx;
  height: 88rpx;
  box-sizing: border-box;
}

.input-text {
  font-size: 28rpx;
  font-weight: 600;
  color: #0f172a;
}

.primary-btn {
  background-color: #0066ff;
  color: #ffffff;
  font-weight: 700;
  border-radius: 16rpx;
  height: 96rpx;
  font-size: 32rpx;
}

/* Card Elements */
.card-title {
  font-size: 30rpx;
  color: #0f172a;
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

.action-btn {
  height: 80rpx;
  border: 2rpx solid #e0e7ff;
  border-radius: 16rpx;
  color: #0066ff;
  font-size: 26rpx;
  font-weight: 700;
}
</style>
