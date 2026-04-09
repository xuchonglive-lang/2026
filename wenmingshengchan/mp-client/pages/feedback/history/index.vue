<template>
  <view class="feedback-history-page">
    <view class="industrial-grid pointer-events-none"></view>
    
    <view class="main-content">
      <!-- Title Section -->
      <view class="header-wrap">
        <text class="page-title">现场反馈查询</text>
        <text class="page-subtitle">Industrial Ether Systems</text>
      </view>

      <!-- Filter Section -->
      <view class="glass-panel search-panel mb-24">
        <view class="filter-row">
          <view class="filter-item">
            <text class="filter-label">筛选日期</text>
            <view class="filter-input-box">
              <text class="filter-value">2024-05-23</text>
              <text class="material-symbols-outlined icon-xs text-on-surface-variant">expand_more</text>
            </view>
          </view>
          <view class="filter-item">
            <text class="filter-label">所属班次</text>
            <view class="filter-input-box">
              <text class="filter-value">白班 8:00-20:00</text>
              <text class="material-symbols-outlined icon-xs text-on-surface-variant">expand_more</text>
            </view>
          </view>
        </view>
        <view class="search-btn-wrap">
          <button class="search-btn">
            <text class="material-symbols-outlined icon-sm">search</text>
            <text class="search-btn-text">点击查询</text>
          </button>
        </view>
      </view>

      <!-- History Cards List -->
      <view class="cards-list">
        
        <!-- Card 1 -->
        <view class="history-card glass-panel">
          <view class="card-header">
            <text class="card-title">A2区-组装流水线-042</text>
            <view class="status-badge status-running">
              <text class="status-text text-running">运行中</text>
            </view>
          </view>
          
          <view class="card-user-info">
            <view class="user-avatar-wrap">
              <image class="avatar-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1zZ7moh6O98tLsTwYzKKxlJDiaV6cwryc6c2s32o0tq18fKxLrMzRG5q5YBEYYJw7ueLdnLJRhlAFqf45q8yPihSom7SiWHvr4UNB6xdI2cYD6X_vmFP0wArtJNAlW2bsC7gpGUC6we5_Yj79Bt3UHh-b5UDSfg7aFgfNSlWiBgRFH2_EmzmRfMxZAm8AeYbKyW0LLOFr6KMOBBxN1mtMANaCS_bstZS7B8TpAGJ4LAbmw_cp7_it7zScJJbMts-BYxyCmr46Fec" mode="aspectFill"></image>
            </view>
            <view class="user-details">
              <view class="user-name-row">
                <text class="user-name">张建国</text>
                <text class="user-dept">生产部 · 维修二组</text>
              </view>
              <view class="time-row">
                <text class="material-symbols-outlined icon-12 text-outline">schedule</text>
                <text class="time-text">2024-05-23 14:30</text>
              </view>
            </view>
          </view>
          
          <scroll-view scroll-x="true" class="photo-scroll">
            <view class="photo-list">
              <view class="photo-item border-highlight">
                <image class="photo-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1q4XdQEzaf_VmQH9skDKQnMZS8JjVmBI3OdZI02Cj25XPoCIRcPC9i8hSS9F3jvqjbYmWuqUpQYAV-6oL1ZZI7AuIYG7tFfXMPz7Gfcz7W_L7wGk5VuOu4hkU3F1TlZhBnCK10H1IV9J56UNVZXGzlPhlzPl8SgicKRZ3uBhZKAP0uO6cn9YOF6kbb7C-gCgFxNr5lo1Ptnzw2lyG1hr1evKVEGu9acJXTfcwgDwvrsVH9YTpw0UyfaG53-GeQnZmlI98uUCmt-Y" mode="aspectFill"></image>
              </view>
              <view class="photo-item border-highlight">
                <image class="photo-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYcbvAAJ2BaI_LOCc6HywWBz2uQX4Vuw-eYC9l7GCBIFxykHOKqzNg51yP3Cy0cykBDZDCO6ShXrYpiq4yINRltmK5mv7XfynUaOhSoXjL3OjAKWmm5F6ONEULyBtDybSmlMQvHbtPqoQ-FcIt75ensyffq4pbJd4lLiI7FY8RC4SwHDDJEbvvA_Xu-Ke_NwzlScZaGI8Ex80eTf9m8YMdU6YYcNruTSNVcoL8jp_3pGdueZSYP1VQ862f6GHwzda1-U3y_eOdKss" mode="aspectFill"></image>
              </view>
            </view>
          </scroll-view>
          
          <view class="desc-box">
            <text class="desc-text">在进行例行巡检时发现，该工位传送带驱动电机外壳温度异常（约65℃），并伴随轻微高频振动。已通知维护班组，建议在下一轮班次间隙进行润滑检查。</text>
          </view>
        </view>

        <!-- Card 2 -->
        <view class="history-card glass-panel">
          <view class="card-header border-b-none">
            <text class="card-title">C5区-物料中转站-B02</text>
            <view class="status-badge status-error">
              <text class="status-text text-error">未按要求反馈</text>
            </view>
          </view>
          
          <view class="error-info-section">
            <text class="error-label">要求反馈责任人：</text>
            
            <view class="error-person-list">
              <view class="error-person-item">
                <view class="person-avatar">
                  <image class="avatar-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClt0avl1khEhVdCbfjo6czMTRA9SuCwUF5fn3-UzId3Q7f7C0b3GScaiEBRovP5Md-60XOWNlGTcNGAlTjSZQhTJkK5BorMwUDrOAbIE8wTowzYYVq6ZzQVK5YaQVqrXZvBjY6EmE4FurPfGqDCC6lT6UGiRzgLuJQypqyZE9ExlcZJILnYzYVayC0dzYkluK3wiVVtcn-JWkB3C6x-rMQ94FredQqt45k43Hw4niA6LRLqp9lvF30uXAvAzuyV13cnDYCR_WEOc4" mode="aspectFill"></image>
                </view>
                <view class="person-details">
                  <text class="person-name">王晓梅</text>
                  <text class="person-dept">质检部 · 品控A组</text>
                </view>
              </view>
              <view class="error-person-item">
                <view class="person-avatar">
                  <image class="avatar-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzzs5wPZLxcKRCoYJ7SYuQaSs2ZSe5IJFmB1N5i0N1mHf4pKLQLZMey0dCO0t6u4GrG5DMRTKKZK4s_z88gDEWH4loKdzGdswXSaCHh3HUg6bIR7Ub6JNiAzEOIPNvjRcWaBkY1KGnzjViAfkUko7qgAe6MDlqKZ3SSoS-auUQAbygHjPbSZgIr70CmbFsKjcRTtGl3NrlJEvJ0j8tgOwalzsv9-edVRLMPbx4miGfHWKwPT7SVYGT3xhGROz30Wo7ZdLV7pDodwg" mode="aspectFill"></image>
                </view>
                <view class="person-details">
                  <text class="person-name">刘强</text>
                  <text class="person-dept">动力科 · 运行三班</text>
                </view>
              </view>
              <view class="error-person-item">
                <view class="person-avatar person-avatar-placeholder">
                  <text class="material-symbols-outlined icon-sm text-outline">person</text>
                </view>
                <view class="person-details">
                  <text class="person-name">李明</text>
                  <text class="person-dept">生产部 · 调度组</text>
                </view>
              </view>
            </view>
          </view>
          
          <view class="empty-state">
            <view class="empty-icon-wrap">
              <text class="material-symbols-outlined icon-xl text-outline-variant">inventory_2</text>
            </view>
            <text class="empty-text">暂无反馈信息</text>
          </view>
        </view>

        <!-- Card 3 -->
        <view class="history-card glass-panel">
          <view class="card-header">
            <text class="card-title">D1-液压泵组-H04</text>
            <view class="status-badge status-running">
              <text class="status-text text-running">运行中</text>
            </view>
          </view>
          
          <view class="card-user-info">
            <view class="user-avatar-wrap">
              <image class="avatar-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzzs5wPZLxcKRCoYJ7SYuQaSs2ZSe5IJFmB1N5i0N1mHf4pKLQLZMey0dCO0t6u4GrG5DMRTKKZK4s_z88gDEWH4loKdzGdswXSaCHh3HUg6bIR7Ub6JNiAzEOIPNvjRcWaBkY1KGnzjViAfkUko7qgAe6MDlqKZ3SSoS-auUQAbygHjPbSZgIr70CmbFsKjcRTtGl3NrlJEvJ0j8tgOwalzsv9-edVRLMPbx4miGfHWKwPT7SVYGT3xhGROz30Wo7ZdLV7pDodwg" mode="aspectFill"></image>
            </view>
            <view class="user-details">
              <view class="user-name-row">
                <text class="user-name">刘强</text>
                <text class="user-dept">动力科 · 运行三班</text>
              </view>
              <view class="time-row">
                <text class="material-symbols-outlined icon-12 text-outline">schedule</text>
                <text class="time-text">2024-05-23 09:45</text>
              </view>
            </view>
          </view>
          
          <scroll-view scroll-x="true" class="photo-scroll">
            <view class="photo-list">
              <view class="photo-item border-highlight">
                <image class="photo-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAReUvx6nyZ7Q7RNUCqQm_wnC-wWEcfuOTxejMIYHQepz1UEoWSPKdSvNKxRqgpBDkPcmgAZpEPGMPdk7WwBtnjSbhiO-PRU2M8dqj3lSoM06Qwekgd5YPGGf-yW28j_mqX-t2ODfsMhnGKKqKB4wZlOoLh9ny21Y9QJOYw7zITfFfnxmJFqhJX6KZEasuXFPeTSrbU2G6QUyOo5AKsVKOjl7QzK6RxoWmbwlzEWedJIY4rpQcjkc8XxsUyUR7wjJ0FuPq_4BWAIJw" mode="aspectFill"></image>
              </view>
            </view>
          </scroll-view>
          
          <view class="desc-box">
            <text class="desc-text">4号泵组出口压力表数值波动频率超过阈值（±0.5MPa），已现场调整反馈灵敏度。目前压力稳定在4.2MPa。</text>
          </view>
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
    return {}
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
  background-color: #f7f9fb; /* surface */
  min-height: 100vh;
  position: relative;
  /* account for my-tab-bar and pb-24 */
  padding-bottom: 320rpx; 
}

/* Industrial Grid explicitly redefined to match UI3 css for history */
.industrial-grid {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  background-image: 
    linear-gradient(rgba(0, 80, 203, 0.03) 2rpx, transparent 2rpx),
    linear-gradient(90deg, rgba(0, 80, 203, 0.03) 2rpx, transparent 2rpx);
  background-size: 40rpx 40rpx; /* approx 20px */
}

.main-content {
  position: relative;
  z-index: 1;
  padding: 64rpx 32rpx; /* pt-8 px-4 */
  max-width: 1344rpx; /* max-w-2xl equivalent */
  margin: 0 auto;
}

.header-wrap {
  padding: 0 16rpx; /* px-2 */
  margin-bottom: 48rpx; /* mb-6 equivalent */
}
.page-title {
  font-family: 'Manrope', sans-serif;
  font-size: 60rpx; /* text-3xl */
  font-weight: 800;
  color: #191c1e;
  letter-spacing: -0.05em; /* tracking-tighter */
  display: block;
}
.page-subtitle {
  font-size: 20rpx; /* text-[10px] */
  font-weight: 700;
  color: #0050cb;
  text-transform: uppercase;
  letter-spacing: 0.2em; /* tracking-[0.2em] */
  margin-top: 8rpx; /* mt-1 */
  opacity: 0.8;
  display: block;
}

.mb-24 { margin-bottom: 32rpx; /* space-y-4 usually, but 32rpx is good */ }

.glass-panel {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(40rpx);
  -webkit-backdrop-filter: blur(40rpx);
  border: 2rpx solid rgba(255, 255, 255, 0.2);
}

.search-panel {
  border-radius: 24rpx; /* rounded-xl */
  padding: 32rpx; /* p-4 */
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08); /* 0 8px 32px 0 */
}
.filter-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24rpx; /* gap-3 */
}
.filter-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx; /* space-y-1 */
}
.filter-label {
  font-size: 20rpx; /* text-[10px] */
  font-weight: 700;
  color: #0050cb;
  text-transform: uppercase;
  letter-spacing: 0.1em; /* tracking-widest */
  font-family: 'Manrope', sans-serif;
}
.filter-input-box {
  background-color: rgba(224, 227, 229, 0.5); /* surface-container-highest */
  border-radius: 16rpx; /* rounded-lg */
  padding: 16rpx 24rpx; /* px-3 py-2 */
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.filter-value {
  font-size: 28rpx; /* text-sm */
  font-weight: 500;
  color: #191c1e;
}
.text-on-surface-variant { color: #424656; }
.icon-xs { font-size: 24rpx; /* text-xs */ }

.search-btn-wrap {
  display: flex;
  justify-content: flex-end;
  margin-top: 32rpx; /* mt-4 */
}
.search-btn {
  display: flex;
  align-items: center;
  gap: 16rpx; /* gap-2 */
  background-color: #0050cb;
  color: #ffffff;
  padding: 16rpx 48rpx; /* px-6 py-2 */
  border-radius: 16rpx; /* rounded-lg */
  box-shadow: 0 20rpx 30rpx -6rpx rgba(0, 80, 203, 0.2); /* shadow-lg */
  margin: 0;
  line-height: normal;
  transition: transform 0.2s;
}
.search-btn::after { border: none; }
.search-btn:active { transform: scale(0.95); }
.search-btn-text {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 28rpx; /* text-sm */
}

.cards-list {
  display: flex;
  flex-direction: column;
  gap: 32rpx; /* space-y-4 */
}

.history-card {
  border-radius: 24rpx; /* rounded-xl */
  overflow: hidden;
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.05); /* shadow-0_8px_32px_0 */
  border: 2rpx solid rgba(255, 255, 255, 0.3); /* border-white/30 */
}

.card-header {
  padding: 32rpx; /* p-4 */
  border-bottom: 2rpx solid rgba(255, 255, 255, 0.1); /* border-white/10 */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.border-b-none { border-bottom: none; }
.card-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 800; /* font-extrabold */
  font-size: 32rpx; /* text-base implicit */
  color: #191c1e;
  letter-spacing: -0.025em; /* tracking-tight */
}

.status-badge {
  padding: 4rpx 16rpx; /* py-0.5 px-2 */
  border-radius: 9999rpx; /* rounded-full */
}
.status-running {
  background-color: rgba(155, 180, 254, 0.3); /* secondary-container/30 */
}
.text-running {
  color: #294487; /* on-secondary-container */
  font-size: 20rpx; /* text-[10px] */
  font-weight: 700; /* font-bold */
}
.status-error {
  background-color: rgba(186, 26, 26, 0.1); /* error/10 */
  border: 2rpx solid rgba(186, 26, 26, 0.2);
}
.text-error {
  color: #ba1a1a;
  font-size: 20rpx;
  font-weight: 700;
}

.card-user-info {
  padding: 32rpx; /* p-4 */
  display: flex;
  align-items: center;
  gap: 24rpx; /* gap-3 */
}
.user-avatar-wrap {
  width: 80rpx; /* w-10 */
  height: 80rpx; /* h-10 */
  border-radius: 50%;
  overflow: hidden;
  border: 2rpx solid rgba(0, 80, 203, 0.2);
}
.avatar-img {
  width: 100%;
  height: 100%;
}
.user-details {
  flex: 1;
}
.user-name-row {
  display: flex;
  align-items: baseline;
  gap: 16rpx; /* gap-2 */
}
.user-name {
  font-size: 28rpx; /* text-sm */
  font-weight: 700;
  color: #191c1e;
}
.user-dept {
  font-size: 20rpx; /* text-[10px] */
  color: #424656;
}
.time-row {
  display: flex;
  align-items: center;
  gap: 8rpx; /* gap-1 */
  margin-top: 4rpx; /* mt-0.5 */
}
.icon-12 { font-size: 20rpx; /* text-[10px] */ }
.text-outline { color: #727687; }
.time-text {
  font-size: 20rpx;
  color: #727687;
}

.photo-scroll {
  width: 100%;
  white-space: nowrap;
}
.photo-list {
  display: flex;
  gap: 24rpx; /* space-x-3 */
  padding: 0 32rpx 32rpx;
}
.photo-item {
  display: inline-flex;
  flex-shrink: 0;
  width: 384rpx; /* w-48 */
  height: 256rpx; /* h-32 */
  border-radius: 16rpx; /* rounded-lg */
  overflow: hidden;
  box-shadow: 0 20rpx 30rpx -6rpx rgba(0, 0, 0, 0.1);
}
.border-highlight {
  border: 2rpx solid rgba(255, 255, 255, 0.2);
}
.photo-img {
  width: 100%;
  height: 100%;
}

.desc-box {
  margin: 0 32rpx 32rpx; /* mx-4 mb-4 */
  padding: 24rpx; /* p-3 */
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 16rpx; /* rounded-lg */
  border: 2rpx solid rgba(255, 255, 255, 0.1);
}
.desc-text {
  font-size: 24rpx; /* text-xs */
  color: #424656;
  line-height: 1.6;
  font-family: 'Inter', sans-serif;
  white-space: normal;
}

.error-info-section {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}
.error-label {
  font-size: 20rpx;
  font-weight: 700;
  color: #0050cb;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: 'Manrope', sans-serif;
}
.error-person-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}
.error-person-item {
  display: flex;
  align-items: center;
  gap: 24rpx;
}
.person-avatar {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  overflow: hidden;
  border: 2rpx solid rgba(0, 80, 203, 0.1);
}
.person-avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e3e5;
}
.avatar-sm { width: 100%; height: 100%; }
.icon-sm { font-size: 28rpx; }
.person-details {
  display: flex;
  flex-direction: column;
}
.person-name {
  font-size: 24rpx;
  font-weight: 700;
  color: #191c1e;
}
.person-dept {
  font-size: 20rpx;
  color: #424656;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48rpx 0;
  opacity: 0.4;
  gap: 16rpx;
}
.empty-icon-wrap {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  background-color: #e0e3e5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-xl { font-size: 48rpx; }
.text-outline-variant { color: #c2c6d8; }
.empty-text {
  font-size: 24rpx;
  font-weight: 500;
  color: #424656;
  letter-spacing: 0.05em;
}

.h-32 { height: 64rpx; }
</style>
