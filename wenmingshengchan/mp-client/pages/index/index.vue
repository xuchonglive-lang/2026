<template>
  <view class="page-index industrial-grid">
    <cu-custom bgColor="bg-gradual-blue" :isCustom="true">
      <block slot="backText"></block>
      <block slot="content">首页</block>
    </cu-custom>


    <!-- #ifdef MP-WEIXIN -->

    <!-- #endif -->
    <view class="main-content">
      <!-- 现场信息展示标题 -->
      <view v-if="swiperList.length > 0" class="list-header">
        <view class="action sub-title">
          <text class="text-lg text-bold text-black">现场信息展示</text>
          <text class="bg-blue"></text>
        </view>
      </view>
      <!-- 轮播图组件 -->
      <view class="swiper-box" v-if="swiperList.length > 0">
        <u-swiper :list="swiperList" :title="true" mode="round" indicator-pos="bottomCenter" height="420"
          :title-style="{ fontSize: '24rpx', padding: '10rpx 24rpx', backgroundColor: 'rgba(0,0,0,0.45)' }"
          @click="navToLiveStatus" @error="onSwiperError"></u-swiper>
      </view>

      <!-- 1. 顶部展示区：根据登录状态切换 -->
      <view v-if="!isLogin" class="hero-section">
        <view class="brand-box">
          <text class="brand-title">优秀的管理工具</text>
          <text class="brand-sub">Industrial Management Assistant</text>
        </view>
        <view class="visitor-badge" @tap="navToLogin">
          <u-icon name="account-fill" size="24" color="#fff"></u-icon>
          <text>点击登录解锁完整功能</text>
        </view>
      </view>

      <!-- 2. 核心功能支柱 (仅未登录时显示，满足审核要求) -->
      <view v-if="!isLogin" class="bento-grid" style="margin-top: 20rpx;">
        <view class="pillar-card daily-plan" @tap="handleVisitorClick('计划执行')">
          <view class="card-header">
            <u-icon name="calendar-fill" color="#16a34a" size="48"></u-icon>
            <text class="pillar-title">计划执行</text>
          </view>
          <text class="pillar-desc">任务精细化分配，每日施工节点一目了然。</text>
        </view>
        <view class="pillar-card half-card" @tap="handleVisitorClick('问题报备')">
          <view class="card-header">
            <u-icon name="camera-fill" color="#dc2626" size="48"></u-icon>
            <text class="pillar-title">工序互保报备</text>
          </view>
          <text class="pillar-desc">问题随时拍，即刻办。</text>
        </view>
        <view class="pillar-card half-card" @tap="handleVisitorClick('重点推进')">
          <view class="card-header">
            <u-icon name="grid-fill" color="#0050cb" size="48"></u-icon>
            <text class="pillar-title">重点问题推进</text>
          </view>
          <text class="pillar-desc">关键点位全方位跟踪。</text>
        </view>
      </view>

      <!-- 3. 操作控制台 (仅登录后显示) -->
      <block v-if="isLogin">
        <view class="list-header">
          <view class="action sub-title">
            <text class="text-lg text-bold text-black">操作控制台</text>
            <text class="bg-blue"></text>
          </view>
        </view>
        <view class="premium-console-card">
          <!-- 顶部个人信息与欢迎语 -->
          <view class="console-header">
            <view class="user-meta">
              <text class="greet-text">你好，{{ userInfo.nickname || '用户' }}</text>
              <text class="status-text">今天有 <text class="text-accent">{{ todoCount }}</text> 个任务待办</text>
            </view>
            <view class="avatar-ring">
              <u-avatar :src="userInfo.avatar" size="72" bg-color="#f0f7ff"></u-avatar>
            </view>
          </view>

          <!-- 任务看板：数据概览 -->
          <view class="dashboard-panel">
            <view class="panel-tag">任务明细</view>
            <view class="data-row">
              <view class="data-item" @tap="navToTodo">
                <text class="data-num text-orange headline-font">{{ feedbackTodoCount }}</text>
                <text class="data-label">待办重控</text>
                <text v-if="monthOverdueCount > 0" class="overdue-note">本月逾期 {{ monthOverdueCount }} 条</text>
              </view>
              <view class="data-divider"></view>
              <view class="data-item" @tap="navToProjectTodo">
                <text class="data-num headline-font">{{ projectTodoCount }}</text>
                <text class="data-label">重点工作</text>
              </view>
              <view class="data-divider"></view>
              <view class="data-item" @tap="navToPlanTodo">
                <text class="data-num headline-font">{{ planTodoCount }}</text>
                <text class="data-label">日计划</text>
              </view>
            </view>
          </view>

          <!-- 操作导航：快捷功能 -->
          <view class="nav-grid">
            <view class="nav-btn" @tap="navToTodo">
              <view class="icon-wrapper glass-blue">
                <u-icon name="edit-pen-fill" color="#2563eb" size="44"></u-icon>
              </view>
              <text class="nav-text">现场反馈</text>
            </view>
            <view class="nav-btn" @tap="navToProjectTodo">
              <view class="icon-wrapper glass-orange">
                <u-icon name="star-fill" color="#ea580c" size="44"></u-icon>
              </view>
              <text class="nav-text">重点反馈</text>
            </view>
            <view class="nav-btn" @tap="navToPlanTodo">
              <view class="icon-wrapper glass-purple">
                <u-icon name="calendar-fill" color="#9333ea" size="44"></u-icon>
              </view>
              <text class="nav-text">计划反馈</text>
            </view>
            <view class="nav-btn" @tap="navToReportAdd">
              <view class="icon-wrapper glass-red">
                <u-icon name="warning-fill" color="#dc2626" size="44"></u-icon>
              </view>
              <text class="nav-text">问题报备</text>
            </view>
            <view class="nav-btn" @tap="navToLiveStatus">
              <view class="icon-wrapper solid-primary">
                <u-icon name="eye-fill" color="#ffffff" size="44"></u-icon>
              </view>
              <text class="nav-text highlight-text">状态查看</text>
            </view>
          </view>
        </view>
      </block>

      <!-- Bento Grid Dashboard -->
      <view class="bento-grid">
        <!-- Task List Card (专业信息告知) -->
        <view class="span-2">
          <view class="list-header" @tap="navToInfo">
            <view class="action sub-title">
              <text class="text-lg text-bold text-black">专业信息告知</text>
              <text class="bg-blue"></text>
            </view>
            <view class="list-more">
              <text>更多</text>
              <u-icon name="arrow-right" size="24"></u-icon>
            </view>
          </view>
          <view class="glass-card list-card">
            <view class="list-body">
              <view class="list-item" v-for="(item, index) in infoList" :key="index" @tap="navToInfoDetail(item._id)">
                <u-icon :name="item._iconName" color="#0050cb" size="40"></u-icon>
                <view class="item-content">
                  <text class="item-title u-line-1">{{ item.title }}</text>
                  <view class="item-desc">
                    <text>{{ vk.pubfn.timeFormat(item.publish_time, 'yyyy-MM-dd hh:mm') }}</text>
                    <text class="item-tag" :class="item._tagClass">{{ item.category_info && item.category_info[0] ?
                      item.category_info[0].name : '综合信息' }}</text>
                  </view>
                </view>
                <u-icon name="arrow-right" color="#424656" size="28"></u-icon>
              </view>
              <view v-if="infoList.length === 0"
                style="text-align: center; color: #999; font-size: 24rpx; padding: 20rpx;">暂无最新信息</view>
            </view>
          </view>
        </view>

        <!-- 现场问题公示模块 -->
        <view class="span-2">
          <view class="list-header" @tap="navToPublicBoard">
            <view class="action sub-title">
              <text class="text-lg text-bold text-black">现场问题公示</text>
              <text class="bg-blue"></text>
            </view>
            <view class="list-more">
              <text>更多</text>
              <u-icon name="arrow-right" size="24"></u-icon>
            </view>
          </view>
          <view class="glass-card list-card">
            <view class="list-body">
              <view class="list-item" v-for="(item, index) in reportList" :key="item._id" @tap="navToPublicBoard">
                <u-icon :name="item._iconName" :color="item._iconColor" size="40"></u-icon>
                <view class="item-content">
                  <text class="item-title u-line-1">{{ item.title }}</text>
                  <view class="item-desc">
                    <text>{{ vk.pubfn.timeFormat(item._add_time, 'yyyy-MM-dd hh:mm') }} · {{ item.publisher || '匿名' }}</text>
                    <text class="item-tag" :class="item._tagClass">{{ item._statusText }}</text>
                  </view>
                </view>
                <u-icon name="arrow-right" color="#424656" size="28"></u-icon>
              </view>
              <view v-if="reportList.length === 0"
                style="text-align: center; color: #999; font-size: 24rpx; padding: 20rpx;">暂无报备信息</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <my-tab-bar :current="0"></my-tab-bar>
  </view>
</template>

<script>
let vk = uni.vk;
export default {
  data() {
    return {
      vk,
      userInfo: {},
      isLogin: false,
      todoCount: 0,
      feedbackTodoCount: 0,
      planTodoCount: 0,
      projectTodoCount: 0,
      monthOverdueCount: 0,
      infoList: [],
      reportList: [],
      swiperList: []
    };
  },
  onLoad(options = {}) {
    vk = uni.vk;
    this.options = options;
  },
  onShow() {
    this.userInfo = vk.getVuex('$user.userInfo') || {};
    this.isLogin = !!(this.userInfo && this.userInfo._id);
    if (this.isLogin) {
      this.fetchTodoCount();
      this.fetchInfoList();
      this.fetchReportList();
      this.fetchSwiperList();
    } else {
      this.fetchHomeData();
    }
  },
  methods: {
    navToInfo() { vk.switchTab({ url: '/pages/info/index' }); },
    navToInfoDetail(id) { vk.navigateTo({ url: `/pages/info/detail/index?id=${id}` }); },
    navToTodo() { vk.navigateTo({ url: '/pages/feedback/todo-list/index' }); },
    navToProjectTodo() {
      uni.setStorageSync('projectListFilter', 'needMyFeedback');
      vk.switchTab({ url: '/pages/keywork/project/list/index' });
    },
    navToPlanTodo() {
      uni.setStorageSync('planListFilter', 'needMyExecute');
      vk.switchTab({ url: '/pages/plan/list' });
    },
    navToLiveStatus() { vk.navigateTo({ url: '/pages/showpoint/showpoint' }); },
    navToPublicBoard() { vk.navigateTo({ url: '/pages/report/public-board/index' }); },
    navToReportAdd() { vk.navigateTo({ url: '/pages/report/submit-entry/index' }); },
    navToLogin() { vk.navigateTo({ url: '/pages/user/login/index' }); },
    handleVisitorClick(name) {
      vk.pubfn.checkLogin({
        isPrompt: true,
        title: '提示',
        content: `您当前处于访客模式，查看“${name}”详情需登录身份。`,
        success: () => {
          this.navToLogin();
        }
      });
    },
    async fetchTodoCount() {
      try {
        let res = await vk.callFunction({
          url: 'client/feedback/kh/getTodoCount',
          data: {}
        });
        if (res.code === 0) {
          this.todoCount = res.count || 0;
          this.feedbackTodoCount = res.feedbackCount || 0;
          this.planTodoCount = res.planCount || 0;
          this.projectTodoCount = res.projectCount || 0;
          this.monthOverdueCount = res.monthOverdueCount || 0;
        }
      } catch (err) {
        console.log("获取工单红点数失败", err);
      }
    },
    async fetchInfoList() {
      if (!this.isLogin) return; // 访客态由 fetchHomeData 处理
      try {
        let res = await vk.callFunction({
          url: 'client/info/kh/getListByCategory',
          data: { pageIndex: 1, pageSize: 4 }
        });
        if (res.code === 0 && res.rows) {
          this.processInfoList(res.rows);
        }
      } catch (err) { console.log("获取信息失败", err); }
    },
    async fetchReportList() {
      if (!this.isLogin) return; // 访客态由 fetchHomeData 处理
      try {
        let res = await vk.callFunction({
          url: 'client/report/kh/getPublicList',
          data: { pageIndex: 1, pageSize: 4, whereJson: {} }
        });
        if (res.code === 0 && res.rows) {
          this.processReportList(res.rows);
        }
      } catch (err) { console.log("获取报备信息失败", err); }
    },
    async fetchSwiperList() {
      if (!this.isLogin) return; // 访客态由 fetchHomeData 处理
      try {
        let res = await vk.callFunction({
          url: 'client/feedback/kh/getLatestPhotos',
          data: {}
        });
        if (res.code === 0 && res.rows && res.rows.length > 0) {
          this.swiperList = res.rows;
        } else {
          // 如果没有数据，则显示默认兜底图，避免整个模块消失
          this.swiperList = [{
            image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/41235688-6615-4672-88f5-46f041ff3dbb.png',
            title: '暂无最新现场动态'
          }];
        }
      } catch (err) { 
        console.log("获取轮播图失败", err);
        // 出错时也显示兜底图
        this.swiperList = [{
          image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/41235688-6615-4672-88f5-46f041ff3dbb.png',
          title: '动态加载失败，请检查网络或重新登录'
        }];
      }
    },
    async fetchHomeData() {
      try {
        let res = await vk.callFunction({
          url: 'client/visitor/pub/getHomeData',
          data: {}
        });
        if (res.code === 0) {
          this.swiperList = res.swiperList || [];
          if (res.infoList) this.processInfoList(res.infoList);
          if (res.lastReport) this.processReportList([res.lastReport]);
        }
      } catch (err) { console.log("获取聚合数据失败", err); }
    },
    processInfoList(rows) {
      const icons = ['file-text-fill', 'volume-fill', 'info-circle-fill', 'list-dot'];
      const classes = ['bg-blue-sub text-primary', 'bg-orange-sub text-orange', 'bg-purple-sub text-purple', 'bg-teal-sub text-teal'];
      this.infoList = rows.map((item, index) => {
        item._iconName = icons[index % icons.length];
        item._tagClass = classes[index % classes.length];
        return item;
      });
    },
    processReportList(rows) {
      this.reportList = rows.map(item => {
        if (item.status === 2) {
          item._iconName = 'checkmark-circle-fill';
          item._iconColor = '#15803d';
          item._tagClass = 'bg-green-sub text-green';
          item._statusText = '已解决';
        } else if (item.status === 1) {
          item._iconName = 'error-circle-fill';
          item._iconColor = '#b45309';
          item._tagClass = 'bg-amber-sub text-amber';
          item._statusText = '处理中';
        } else {
          item._iconName = 'setting-fill';
          item._iconColor = '#b91c1c';
          item._tagClass = 'bg-red-sub text-red';
          item._statusText = '待处理';
        }
        return item;
      });
    },
    onSwiperError(index) {
      if (this.swiperList[index]) {
        this.$set(this.swiperList, index, {
          ...this.swiperList[index],
          image: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/41235688-6615-4672-88f5-46f041ff3dbb.png',
          title: '图片资源已失效'
        });
      }
    }
	
  }
};
</script>

<style lang="scss" scoped>
/* 
  Aesthetic Direction: High-End Utilitarian / Technical Minimalism
  Focus: Crisp typography, pure white layers, engineered shadows, and subtle micro-interactions.
*/

/* Typography Base */
.page-index {
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
  background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
  min-height: 100vh;
  padding-bottom: 240rpx;
  color: #1a1d20;
  /* Deep industrial gray, better contrast than pure black */
}

.industrial-grid {
  background-image: radial-gradient(rgba(0, 80, 203, 0.05) 1px, transparent 1px);
  background-size: 40rpx 40rpx;
}

.headline-font {
  font-family: 'Manrope', sans-serif;
  letter-spacing: -0.5rpx;
  /* Tighter tracking for display text */
}

/* Structural Layout */
.main-content {
  padding: 32rpx 32rpx 0;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

/* Swiper Hero */
.swiper-box {
  margin-bottom: 8rpx;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow:
    0 4rpx 16rpx -4rpx rgba(0, 80, 203, 0.08),
    0 16rpx 48rpx -8rpx rgba(0, 80, 203, 0.15),
    inset 0 2rpx 0 rgba(255, 255, 255, 0.9);
  transform: translateZ(0);
  /* Force hardware acceleration */
}

/* Core Card Component */
.glass-card {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow:
    0 4rpx 16rpx -4rpx rgba(0, 80, 203, 0.08),
    0 16rpx 48rpx -8rpx rgba(0, 80, 203, 0.15),
    inset 0 2rpx 0 rgba(255, 255, 255, 0.9);
  border-radius: 24rpx;
  position: relative;
  overflow: hidden;
}

/* Premium Compact Console */
.premium-console-card {
  padding: 28rpx 24rpx 24rpx;
  border-radius: 32rpx;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8));
  box-shadow:
    0 8rpx 32rpx -8rpx rgba(0, 50, 150, 0.05),
    inset 0 2rpx 0 rgba(255, 255, 255, 1);
  border: 1px solid rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  position: relative;
  overflow: hidden;
  margin-bottom: 32rpx;
}

.premium-console-card::before {
  content: '';
  position: absolute;
  top: -40rpx;
  right: -40rpx;
  width: 200rpx;
  height: 200rpx;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.console-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rpx;
  z-index: 1;
}

.user-meta {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.greet-text {
  font-size: 32rpx;
  font-weight: 800;
  color: #1e293b;
  letter-spacing: -0.5rpx;
}

.status-text {
  font-size: 22rpx;
  color: #64748b;
  font-weight: 500;
}

.text-accent {
  color: #2563eb;
  font-weight: 800;
  margin: 0 4rpx;
}

.avatar-ring {
  padding: 4rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #e0e7ff, #ffffff);
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.dashboard-panel {
  background: rgba(248, 250, 252, 0.7);
  border-radius: 20rpx;
  padding: 24rpx 16rpx 16rpx;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 2rpx 8rpx rgba(0, 0, 0, 0.02);
}

.panel-tag {
  position: absolute;
  top: -14rpx;
  left: 20rpx;
  background: linear-gradient(135deg, #1e293b, #334155);
  color: #fff;
  font-size: 18rpx;
  font-weight: 700;
  padding: 4rpx 16rpx;
  border-radius: 10rpx;
  letter-spacing: 0.5rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
}

.data-row {
  display: flex;
  align-items: center;
  margin-top: 4rpx;
}

.data-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.data-num {
  font-size: 44rpx;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.1;
}

.data-num.text-orange {
  color: #ea580c;
}

.data-label {
  font-size: 20rpx;
  color: #64748b;
  font-weight: 600;
  margin-top: 6rpx;
}

.overdue-note {
  font-size: 18rpx;
  color: #dc2626;
  font-weight: 800;
  margin-top: 6rpx;
  background: rgba(220, 38, 38, 0.08);
  padding: 2rpx 10rpx;
  border-radius: 6rpx;
  letter-spacing: -0.2rpx;
}

.data-divider {
  width: 1px;
  height: 40rpx;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.06), transparent);
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12rpx;
  padding: 0 4rpx;
}

.nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.nav-btn:active {
  transform: scale(0.92);
}

.icon-wrapper {
  width: 88rpx;
  height: 88rpx;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.icon-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px solid rgba(255, 255, 255, 0.9);
  pointer-events: none;
}

.glass-blue {
  background: linear-gradient(135deg, rgba(219, 234, 254, 0.8), rgba(239, 246, 255, 0.4));
  box-shadow: 0 6rpx 16rpx rgba(37, 99, 235, 0.08);
}

.glass-orange {
  background: linear-gradient(135deg, rgba(255, 237, 213, 0.8), rgba(255, 247, 237, 0.4));
  box-shadow: 0 6rpx 16rpx rgba(234, 88, 12, 0.08);
}

.glass-purple {
  background: linear-gradient(135deg, rgba(243, 232, 255, 0.8), rgba(250, 245, 255, 0.4));
  box-shadow: 0 6rpx 16rpx rgba(147, 51, 234, 0.08);
}

.glass-red {
  background: linear-gradient(135deg, rgba(254, 226, 226, 0.8), rgba(254, 242, 242, 0.4));
  box-shadow: 0 6rpx 16rpx rgba(220, 38, 38, 0.08);
}

.solid-primary {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  box-shadow: 0 8rpx 20rpx rgba(37, 99, 235, 0.25);
  border: none !important;
}

.solid-primary::before {
  display: none;
}

.nav-text {
  font-size: 20rpx;
  font-weight: 700;
  color: #475569;
}

.highlight-text {
  color: #1d4ed8;
  font-weight: 800;
}

/* Bento Grid */
.bento-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32rpx;
  margin-bottom: 32rpx;
}

.span-2 {
  grid-column: span 2;
}

/* List Cards */
.list-card {
  padding: 16rpx 24rpx;
  /* Tighter padding for lists */
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8rpx;
  margin-top: 16rpx;
  margin-bottom: -16rpx;
  /* 抵消 main-content 的 gap，实现 16rpx 的视觉间距 */
}

.bento-grid .list-header {
  margin-top: 0;
  margin-bottom: 16rpx;
  /* bento 内部没有 flex gap，直接设置 16rpx */
}

.list-more {
  display: flex;
  align-items: center;
  gap: 4rpx;
  color: #0050cb;
  font-size: 24rpx;
  font-weight: 700;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.list-more:active {
  opacity: 0.5;
}

.list-body {
  display: flex;
  flex-direction: column;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 16rpx 8rpx;
  background: transparent;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  transition: background-color 0.2s ease;
}

.list-item:active {
  background-color: #f8f9fa;
  border-radius: 8rpx;
}

.list-item:last-child {
  border-bottom: none;
}

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-title {
  font-size: 26rpx;
  font-weight: 700;
  color: #212529;
  line-height: 1.4;
}

.item-desc {
  display: flex;
  align-items: center;
  font-size: 22rpx;
  color: #868e96;
  margin-top: 4rpx;
  font-weight: 500;
}

/* Micro-pills (Tags) */
.item-tag {
  margin-left: 16rpx;
  padding: 4rpx 10rpx;
  border-radius: 6rpx;
  font-size: 18rpx;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5rpx;
}

/* Status Colors - Refined UI Palette */
.bg-blue-sub {
  background: rgba(59, 130, 246, 0.12);
}

.text-primary {
  color: #2563eb;
}

.bg-orange-sub {
  background: rgba(249, 115, 22, 0.12);
}

.text-orange {
  color: #ea580c;
}

.bg-purple-sub {
  background: rgba(168, 85, 247, 0.12);
}

.text-purple {
  color: #9333ea;
}

.bg-teal-sub {
  background: rgba(20, 184, 166, 0.12);
}

.text-teal {
  color: #0d9488;
}

.bg-amber-sub {
  background: rgba(245, 158, 11, 0.12);
}

.text-amber {
  color: #d97706;
}

.bg-green-sub {
  background: rgba(34, 197, 94, 0.12);
}

.text-green {
  color: #16a34a;
}

.bg-red-sub {
  background: rgba(239, 68, 68, 0.12);
}

.text-red {
  color: #dc2626;
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
  font-size: 32rpx;
  font-weight: 800;
  /* Sharp, assertive weight */
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
  /* Crisper, thinner underline */
  left: 12rpx;
  opacity: 0.4;
  z-index: 0;
  background-color: #0062ff !important;
  /* Tech blue */
}

/* 访客模式下的英雄区域与 Bento 卡片 */
.hero-section {
  position: relative;
  padding: 48rpx 40rpx;
  background: linear-gradient(135deg, #0050cb 0%, #003a94 100%);
  border-radius: 32rpx;
  box-shadow: 0 20rpx 40rpx rgba(0, 80, 203, 0.2);
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 300rpx;
    height: 300rpx;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }

  .brand-box {
    position: relative;
    z-index: 2;

    .brand-title {
      display: block;
      font-size: 44rpx;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 2rpx;
      margin-bottom: 8rpx;
    }

    .brand-sub {
      display: block;
      font-size: 20rpx;
      color: rgba(255, 255, 255, 0.7);
      text-transform: uppercase;
      letter-spacing: 1rpx;
    }
  }

  .visitor-badge {
    position: absolute;
    top: 30rpx;
    right: 30rpx;
    display: flex;
    align-items: center;
    gap: 8rpx;
    padding: 8rpx 20rpx;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(4px);
    border-radius: 40rpx;
    font-size: 20rpx;
    color: #ffffff;
    z-index: 2;
  }
}

.bento-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
  margin-bottom: 32rpx;

  .pillar-card {
    background: #ffffff;
    border-radius: 24rpx;
    padding: 24rpx;
    border: 1px solid rgba(0, 80, 203, 0.05);
    box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: column;
    gap: 12rpx;

    &.daily-plan {
      grid-column: span 2;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 16rpx;

      .pillar-title {
        font-size: 30rpx;
        font-weight: 700;
        color: #1e293b;
      }
    }

    .pillar-desc {
      font-size: 22rpx;
      color: #64748b;
      line-height: 1.5;
    }
  }
}
</style>
