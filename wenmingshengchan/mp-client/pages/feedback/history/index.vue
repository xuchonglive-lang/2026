<template>
  <view class="feedback-history-page">
    <view class="industrial-grid pointer-events-none"></view>
    
    <view class="main-content">
      <!-- Title Section -->
      <view class="header-wrap">
        <text class="page-title">现场反馈流水台账</text>
        <text class="page-subtitle">Industrial Ether Systems</text>
      </view>

      <!-- Filter Section (Placeholder, mock functionality) -->
      <view class="glass-panel search-panel mb-24">
        <view class="filter-row">
          <view class="filter-item">
            <text class="filter-label">数据状态</text>
            <view class="filter-input-box">
              <text class="filter-value">近30天</text>
              <text class="material-symbols-outlined icon-xs text-on-surface-variant">expand_more</text>
            </view>
          </view>
        </view>
        <view class="search-btn-wrap">
          <button class="search-btn" @click="fetchData">
            <text class="material-symbols-outlined icon-sm">search</text>
            <text class="search-btn-text">点击刷新</text>
          </button>
        </view>
      </view>

      <!-- History Cards List -->
      <view class="cards-list">
        
        <view class="history-card glass-panel" v-for="item in listData" :key="item._id">
          <view class="card-header" :class="{'border-b-none': item.status === 2 || item.status === 0}">
            <text class="card-title">{{ item.point_info && item.point_info[0] ? item.point_info[0].name : "未知重控点" }}</text>
            <view class="status-badge" :class="item.status === 1 ? 'status-running' : (item.status === 2 ? 'status-error' : 'status-pending')">
              <text class="status-text" :class="item.status === 1 ? 'text-running' : (item.status === 2 ? 'text-error' : 'text-pending')">
                 {{ item.status === 1 ? '已合规上报' : (item.status === 2 ? '流拍/逾期异常' : '竞案抢答中') }}
              </text>
            </view>
          </view>
          
          <view v-if="item.status === 1" class="card-user-info">
            <view class="user-avatar-wrap">
              <image class="avatar-img" :src="item.submit_user_info && item.submit_user_info[0] && item.submit_user_info[0].avatar ? item.submit_user_info[0].avatar : 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1zZ7moh6O98tLsTwYzKKxlJDiaV6cwryc6c2s32o0tq18fKxLrMzRG5q5YBEYYJw7ueLdnLJRhlAFqf45q8yPihSom7SiWHvr4UNB6xdI2cYD6X_vmFP0wArtJNAlW2bsC7gpGUC6we5_Yj79Bt3UHh-b5UDSfg7aFgfNSlWiBgRFH2_EmzmRfMxZAm8AeYbKyW0LLOFr6KMOBBxN1mtMANaCS_bstZS7B8TpAGJ4LAbmw_cp7_it7zScJJbMts-BYxyCmr46Fec'" mode="aspectFill"></image>
            </view>
            <view class="user-details">
              <view class="user-name-row">
                <text class="user-name">{{ item.submit_user_info && item.submit_user_info[0] ? item.submit_user_info[0].nickname : "匿名者" }}</text>
                <text class="user-dept">{{ item.device_model || '标准制成件' }}</text>
              </view>
              <view class="time-row">
                <text class="material-symbols-outlined icon-12 text-outline">schedule</text>
                <text class="time-text">{{ item.photo_shoot_time || item.update_date || '' }} (相机EXIF)</text>
              </view>
            </view>
          </view>
          
          <scroll-view v-if="item.status === 1 && item.main_image" scroll-x="true" class="photo-scroll">
             <view class="photo-list">
               <view class="photo-item border-highlight" @click="previewImg(item.main_image)">
                 <image class="photo-img" :src="item.main_image" mode="aspectFill"></image>
               </view>
             </view>
          </scroll-view>
          
          <view class="desc-box" v-if="item.status === 1 && item.feedback_content">
            <text class="desc-text">{{ item.feedback_content }}</text>
          </view>

          <!-- 若为异常/未反馈的情况容错 -->
          <view v-if="item.status === 2" class="empty-state">
            <view class="empty-icon-wrap">
              <text class="material-symbols-outlined icon-xl text-outline-variant">inventory_2</text>
            </view>
            <text class="empty-text">该班次因工期已逾规，流拍收栈</text>
          </view>

          <!-- 督查结果展示 -->
          <view v-if="item.audit_mark" style="margin: 0 32rpx 32rpx; padding: 20rpx; background: rgba(186,26,26,0.1); border-radius: 12rpx;">
             <text style="color: #ba1a1a; font-size: 24rpx; font-weight: bold;">[违章督查]</text>
             <text style="color: #333; font-size: 24rpx;"> {{ item.audit_mark }}</text>
          </view>

        </view>
        
        <view v-if="!loading && listData.length === 0" style="text-align: center; margin-top: 100rpx; color: #666;">
           暂无流水台账
        </view>
      </view>
      
      <!-- bottom padding for nav -->
      <view class="h-32"></view>
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
    async fetchData() {
      this.loading = true;
      try {
        let res = await uni.vk.callFunction({
          url: 'client/feedback/kh/getHistoryList',
          data: {}
        });
        if (res.code === 0 && res.rows) {
          this.listData = res.rows;
        }
      } catch (err) {
         uni.vk.toast("获取台账列表失败");
      } finally {
        this.loading = false;
      }
    },
    previewImg(url) {
       if(!url) return;
       uni.previewImage({ urls: [url] });
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

.feedback-history-page {
  font-family: 'Inter', sans-serif;
  background-color: #f7f9fb;
  min-height: 100vh;
  position: relative;
  padding-bottom: 320rpx; 
}

.industrial-grid {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none;
  background-image: 
    linear-gradient(rgba(0, 80, 203, 0.03) 2rpx, transparent 2rpx),
    linear-gradient(90deg, rgba(0, 80, 203, 0.03) 2rpx, transparent 2rpx);
  background-size: 40rpx 40rpx;
}

.main-content {
  position: relative; z-index: 1; padding: 64rpx 32rpx; max-width: 1344rpx; margin: 0 auto;
}

.header-wrap { padding: 0 16rpx; margin-bottom: 48rpx; }
.page-title {
  font-family: 'Manrope', sans-serif; font-size: 60rpx; font-weight: 800;
  color: #191c1e; letter-spacing: -0.05em; display: block;
}
.page-subtitle {
  font-size: 20rpx; font-weight: 700; color: #0050cb; text-transform: uppercase;
  letter-spacing: 0.2em; margin-top: 8rpx; opacity: 0.8; display: block;
}

.mb-24 { margin-bottom: 32rpx; }

.glass-panel {
  background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(40rpx);
  -webkit-backdrop-filter: blur(40rpx); border: 2rpx solid rgba(255, 255, 255, 0.2);
}

.search-panel { border-radius: 24rpx; padding: 32rpx; box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08); }
.filter-row { display: flex; align-items: center; justify-content: space-between; gap: 24rpx; }
.filter-item { flex: 1; display: flex; flex-direction: column; gap: 8rpx; }
.filter-label { font-size: 20rpx; font-weight: 700; color: #0050cb; text-transform: uppercase; letter-spacing: 0.1em; font-family: 'Manrope', sans-serif; }
.filter-input-box { background-color: rgba(224, 227, 229, 0.5); border-radius: 16rpx; padding: 16rpx 24rpx; display: flex; align-items: center; justify-content: space-between; }
.filter-value { font-size: 28rpx; font-weight: 500; color: #191c1e; }
.text-on-surface-variant { color: #424656; }
.icon-xs { font-size: 24rpx; }

.search-btn-wrap { display: flex; justify-content: flex-end; margin-top: 32rpx; }
.search-btn {
  display: flex; align-items: center; gap: 16rpx; background-color: #0050cb; color: #ffffff;
  padding: 16rpx 48rpx; border-radius: 16rpx; box-shadow: 0 20rpx 30rpx -6rpx rgba(0, 80, 203, 0.2);
  margin: 0; line-height: normal; transition: transform 0.2s;
}
.search-btn::after { border: none; }
.search-btn:active { transform: scale(0.95); }
.search-btn-text { font-family: 'Manrope', sans-serif; font-weight: 700; font-size: 28rpx; }

.cards-list { display: flex; flex-direction: column; gap: 32rpx; }

.history-card { border-radius: 24rpx; overflow: hidden; box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.05); border: 2rpx solid rgba(255, 255, 255, 0.3); }

.card-header { padding: 32rpx; border-bottom: 2rpx solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: flex-start; }
.border-b-none { border-bottom: none; }
.card-title { font-family: 'Manrope', sans-serif; font-weight: 800; font-size: 32rpx; color: #191c1e; letter-spacing: -0.025em; }

.status-badge { padding: 4rpx 16rpx; border-radius: 9999rpx; }
.status-running { background-color: rgba(155, 180, 254, 0.3); }
.text-running { color: #294487; font-size: 20rpx; font-weight: 700; }
.status-error { background-color: rgba(186, 26, 26, 0.1); border: 2rpx solid rgba(186, 26, 26, 0.2); }
.text-error { color: #ba1a1a; font-size: 20rpx; font-weight: 700; }
.status-pending { background-color: rgba(254, 240, 138, 0.3); border: 2rpx solid rgba(254, 240, 138, 0.5); }
.text-pending { color: #a16207; font-size: 20rpx; font-weight: 700; }

.card-user-info { padding: 32rpx; display: flex; align-items: center; gap: 24rpx; }
.user-avatar-wrap { width: 80rpx; height: 80rpx; border-radius: 50%; overflow: hidden; border: 2rpx solid rgba(0, 80, 203, 0.2); }
.avatar-img { width: 100%; height: 100%; }
.user-details { flex: 1; }
.user-name-row { display: flex; align-items: baseline; gap: 16rpx; }
.user-name { font-size: 28rpx; font-weight: 700; color: #191c1e; }
.user-dept { font-size: 20rpx; color: #424656; }
.time-row { display: flex; align-items: center; gap: 8rpx; margin-top: 4rpx; }
.icon-12 { font-size: 20rpx; }
.text-outline { color: #727687; }
.time-text { font-size: 20rpx; color: #727687; }

.photo-scroll { width: 100%; white-space: nowrap; }
.photo-list { display: flex; gap: 24rpx; padding: 0 32rpx 32rpx; }
.photo-item { display: inline-flex; flex-shrink: 0; width: 384rpx; height: 256rpx; border-radius: 16rpx; overflow: hidden; box-shadow: 0 20rpx 30rpx -6rpx rgba(0, 0, 0, 0.1); }
.border-highlight { border: 2rpx solid rgba(255, 255, 255, 0.2); }
.photo-img { width: 100%; height: 100%; }

.desc-box { margin: 0 32rpx 32rpx; padding: 24rpx; background-color: rgba(255, 255, 255, 0.4); border-radius: 16rpx; border: 2rpx solid rgba(255, 255, 255, 0.1); }
.desc-text { font-size: 24rpx; color: #424656; line-height: 1.6; font-family: 'Inter', sans-serif; white-space: normal; }

.empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48rpx 0; opacity: 0.4; gap: 16rpx; }
.empty-icon-wrap { width: 96rpx; height: 96rpx; border-radius: 50%; background-color: #e0e3e5; display: flex; align-items: center; justify-content: center; }
.icon-xl { font-size: 48rpx; }
.text-outline-variant { color: #c2c6d8; }
.empty-text { font-size: 24rpx; font-weight: 500; color: #424656; letter-spacing: 0.05em; }

.h-32 { height: 64rpx; }
</style>
