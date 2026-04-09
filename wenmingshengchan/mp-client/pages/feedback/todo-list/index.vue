<template>
  <view class="feedback-todo-page">
    <view class="industrial-grid"></view>
    
    <view class="main-content">
      <!-- Title -->
      <view class="page-title-wrap">
        <text class="page-title">待反馈点位</text>
      </view>
      
      <!-- Summary Header -->
      <view class="summary-header">
        <view class="summary-info">
          <text class="status-label">状态概览</text>
          <view class="status-value-wrap">
            <text class="status-count">5</text>
            <text class="status-suffix">项待处理</text>
          </view>
        </view>
        <view class="preview-btn" @click="goTo('/pages/feedback/history/index')">
          <text class="preview-btn-text">已反馈信息预览</text>
        </view>
      </view>

      <!-- Point Cards Area -->
      <view class="cards-container">
        <!-- Point Card 1 -->
        <view class="point-card glass-card">
          <view class="card-top">
            <view class="icon-box">
              <text class="material-symbols-outlined icon-location">location_on</text>
            </view>
            <view class="card-info">
              <view class="card-title-row">
                <text class="card-title">锅炉房1号点</text>
                <view class="status-badge"><text class="badge-text">未反馈</text></view>
              </view>
              <view class="card-subtitle-row">
                <text class="material-symbols-outlined icon-domain">domain</text>
                <text class="card-subtitle">一车间 · 动力区</text>
              </view>
            </view>
          </view>
          <view class="card-bottom">
            <view class="time-info-wrap">
              <view class="user-avatars">
                <image class="avatar-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa1faYZbhS_jZBdmg1Aw_pae9gmWZsbLjBFZioTOYjMop2Dxm8ZnsayMQ98fOdt2lC-zFAVls5S2khR0--FIAT49K_Flq_WEN5kH89mz7m-htqsxrCGKsNVeAIxyeb3WDOgk2Z_PrB9iLsVA4UjUI5yEkgx5z6z-aS9uilmyDnVJYmQ8zcrkDG533ifej8fkaiCn3ECzDC56u0wYFKzZ6-SlF4qQc59JlrVsnea1sX3PsbDutlFsuIp1URBNadGRRN-wDSlYmnVek" mode="aspectFill"></image>
                <view class="avatar-count"><text class="count-text">+2</text></view>
              </view>
              <view class="time-range">
                <text class="material-symbols-outlined icon-schedule">schedule</text>
                <text class="time-text">可反馈时间区间：09:00 - 18:00</text>
              </view>
            </view>
            <view class="action-btn" @click="goTo('/pages/feedback/submit/index')">
              <text class="action-btn-text">开始反馈</text>
              <text class="material-symbols-outlined icon-arrow">arrow_forward_ios</text>
            </view>
          </view>
        </view>

        <!-- Point Card 2 -->
        <view class="point-card glass-card">
          <view class="card-top">
            <view class="icon-box">
              <text class="material-symbols-outlined icon-location">location_on</text>
            </view>
            <view class="card-info">
              <view class="card-title-row">
                <text class="card-title">冲压线检修口</text>
                <view class="status-badge"><text class="badge-text">未反馈</text></view>
              </view>
              <view class="card-subtitle-row">
                <text class="material-symbols-outlined icon-domain">domain</text>
                <text class="card-subtitle">二车间 · 生产线</text>
              </view>
            </view>
          </view>
          <view class="card-bottom">
            <view class="time-info-wrap">
              <view class="user-avatars">
                <image class="avatar-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa1faYZbhS_jZBdmg1Aw_pae9gmWZsbLjBFZioTOYjMop2Dxm8ZnsayMQ98fOdt2lC-zFAVls5S2khR0--FIAT49K_Flq_WEN5kH89mz7m-htqsxrCGKsNVeAIxyeb3WDOgk2Z_PrB9iLsVA4UjUI5yEkgx5z6z-aS9uilmyDnVJYmQ8zcrkDG533ifej8fkaiCn3ECzDC56u0wYFKzZ6-SlF4qQc59JlrVsnea1sX3PsbDutlFsuIp1URBNadGRRN-wDSlYmnVek" mode="aspectFill"></image>
              </view>
              <view class="time-range">
                <text class="material-symbols-outlined icon-schedule">schedule</text>
                <text class="time-text">可反馈时间区间：09:00 - 18:00</text>
              </view>
            </view>
            <view class="action-btn" @click="goTo('/pages/feedback/submit/index')">
              <text class="action-btn-text">开始反馈</text>
              <text class="material-symbols-outlined icon-arrow">arrow_forward_ios</text>
            </view>
          </view>
        </view>

        <!-- Point Card 3 -->
        <view class="point-card glass-card">
          <view class="card-top">
            <view class="icon-box">
              <text class="material-symbols-outlined icon-location">location_on</text>
            </view>
            <view class="card-info">
              <view class="card-title-row">
                <text class="card-title">成品仓库B区</text>
                <view class="status-badge"><text class="badge-text">未反馈</text></view>
              </view>
              <view class="card-subtitle-row">
                <text class="material-symbols-outlined icon-domain">domain</text>
                <text class="card-subtitle">物流中心</text>
              </view>
            </view>
          </view>
          <view class="card-bottom">
            <view class="time-info-wrap">
              <view class="user-avatars">
                <image class="avatar-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa1faYZbhS_jZBdmg1Aw_pae9gmWZsbLjBFZioTOYjMop2Dxm8ZnsayMQ98fOdt2lC-zFAVls5S2khR0--FIAT49K_Flq_WEN5kH89mz7m-htqsxrCGKsNVeAIxyeb3WDOgk2Z_PrB9iLsVA4UjUI5yEkgx5z6z-aS9uilmyDnVJYmQ8zcrkDG533ifej8fkaiCn3ECzDC56u0wYFKzZ6-SlF4qQc59JlrVsnea1sX3PsbDutlFsuIp1URBNadGRRN-wDSlYmnVek" mode="aspectFill"></image>
              </view>
              <view class="time-range">
                <text class="material-symbols-outlined icon-schedule text-tertiary">assignment_late</text>
                <text class="time-text text-tertiary">可反馈时间区间：08:30 - 09:00</text>
              </view>
            </view>
            <view class="action-btn" @click="goTo('/pages/feedback/submit/index')">
              <text class="action-btn-text">开始反馈</text>
              <text class="material-symbols-outlined icon-arrow">arrow_forward_ios</text>
            </view>
          </view>
        </view>

        <!-- Point Card 4 -->
        <view class="point-card glass-card">
          <view class="card-top">
            <view class="icon-box">
              <text class="material-symbols-outlined icon-location">location_on</text>
            </view>
            <view class="card-info">
              <view class="card-title-row">
                <text class="card-title">变压器房</text>
                <view class="status-badge"><text class="badge-text">未反馈</text></view>
              </view>
              <view class="card-subtitle-row">
                <text class="material-symbols-outlined icon-domain">domain</text>
                <text class="card-subtitle">配电中心</text>
              </view>
            </view>
          </view>
          <view class="card-bottom">
            <view class="time-info-wrap">
              <view class="user-avatars">
                <image class="avatar-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa1faYZbhS_jZBdmg1Aw_pae9gmWZsbLjBFZioTOYjMop2Dxm8ZnsayMQ98fOdt2lC-zFAVls5S2khR0--FIAT49K_Flq_WEN5kH89mz7m-htqsxrCGKsNVeAIxyeb3WDOgk2Z_PrB9iLsVA4UjUI5yEkgx5z6z-aS9uilmyDnVJYmQ8zcrkDG533ifej8fkaiCn3ECzDC56u0wYFKzZ6-SlF4qQc59JlrVsnea1sX3PsbDutlFsuIp1URBNadGRRN-wDSlYmnVek" mode="aspectFill"></image>
              </view>
              <view class="time-range">
                <text class="material-symbols-outlined icon-schedule">schedule</text>
                <text class="time-text">可反馈时间区间：09:00 - 17:30</text>
              </view>
            </view>
            <view class="action-btn" @click="goTo('/pages/feedback/submit/index')">
              <text class="action-btn-text">开始反馈</text>
              <text class="material-symbols-outlined icon-arrow">arrow_forward_ios</text>
            </view>
          </view>
        </view>

        <!-- Point Card 5 -->
        <view class="point-card glass-card">
          <view class="card-top">
            <view class="icon-box">
              <text class="material-symbols-outlined icon-location">location_on</text>
            </view>
            <view class="card-info">
              <view class="card-title-row">
                <text class="card-title">污水处理池</text>
                <view class="status-badge"><text class="badge-text">未反馈</text></view>
              </view>
              <view class="card-subtitle-row">
                <text class="material-symbols-outlined icon-domain">domain</text>
                <text class="card-subtitle">环保监测站</text>
              </view>
            </view>
          </view>
          <view class="card-bottom">
            <view class="time-info-wrap">
              <view class="user-avatars">
                <image class="avatar-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa1faYZbhS_jZBdmg1Aw_pae9gmWZsbLjBFZioTOYjMop2Dxm8ZnsayMQ98fOdt2lC-zFAVls5S2khR0--FIAT49K_Flq_WEN5kH89mz7m-htqsxrCGKsNVeAIxyeb3WDOgk2Z_PrB9iLsVA4UjUI5yEkgx5z6z-aS9uilmyDnVJYmQ8zcrkDG533ifej8fkaiCn3ECzDC56u0wYFKzZ6-SlF4qQc59JlrVsnea1sX3PsbDutlFsuIp1URBNadGRRN-wDSlYmnVek" mode="aspectFill"></image>
              </view>
              <view class="time-range">
                <text class="material-symbols-outlined icon-schedule">schedule</text>
                <text class="time-text">可反馈时间区间：08:00 - 20:00</text>
              </view>
            </view>
            <view class="action-btn" @click="goTo('/pages/feedback/submit/index')">
              <text class="action-btn-text">开始反馈</text>
              <text class="material-symbols-outlined icon-arrow">arrow_forward_ios</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <my-tab-bar :current="3"></my-tab-bar>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    goTo(url) {
      uni.navigateTo({
        url: url
      });
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

.feedback-todo-page {
  font-family: 'Inter', sans-serif;
  background-color: #f7f9fb;
  background-image: 
    radial-gradient(at 0% 0%, rgba(0, 80, 203, 0.05) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(0, 80, 203, 0.03) 0px, transparent 50%),
    linear-gradient(to bottom, #f7f9fb, #dae1ff);
  background-attachment: fixed;
  min-height: 100vh;
  position: relative;
  /* Let my-tab-bar float over the extra padding */
}

.industrial-grid {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  background-size: 64rpx 64rpx; /* 32px */
  background-image: 
    linear-gradient(to right, rgba(0, 80, 203, 0.03) 2rpx, transparent 2rpx),
    linear-gradient(to bottom, rgba(0, 80, 203, 0.03) 2rpx, transparent 2rpx);
}

.main-content {
  position: relative;
  z-index: 1;
  /* pt-8 pb-24 px-4 */
  padding: 64rpx 32rpx 192rpx 32rpx;
  max-width: 896rpx; /* max-w-md */
  margin: 0 auto;
}

.page-title-wrap {
  margin-bottom: 48rpx; /* mb-6 */
}
.page-title {
  /* text-3xl */
  font-family: 'Manrope', sans-serif;
  font-size: 60rpx;
  font-weight: 800;
  color: #191c1e;
  letter-spacing: -0.025em;
}

.summary-header {
  padding: 32rpx 0; /* py-4 */
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.status-label {
  display: block;
  font-size: 24rpx; /* text-xs */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #1d4ed8;
  margin-bottom: 8rpx; /* mb-1 */
  font-family: 'Inter', sans-serif;
}
.status-value-wrap {
  display: flex;
  align-items: baseline;
}
.status-count {
  font-family: 'Manrope', sans-serif;
  font-size: 60rpx; /* text-3xl */
  font-weight: 800;
  color: #191c1e;
  letter-spacing: -0.025em;
  margin-right: 12rpx;
}
.status-suffix {
  font-size: 36rpx; /* text-lg */
  font-weight: 500;
  color: #424656;
}

.preview-btn {
  /* px-4 py-2.5 */
  padding: 20rpx 32rpx;
  background-color: #0050cb;
  border-radius: 24rpx; /* rounded-xl */
  box-shadow: 0 20rpx 30rpx -6rpx rgba(0, 80, 203, 0.2); /* shadow-lg */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}
.preview-btn:active {
  transform: scale(0.95);
}
.preview-btn-text {
  color: #ffffff;
  font-size: 24rpx; /* text-xs */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 32rpx; /* space-y-4 */
}

.glass-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(40rpx);
  -webkit-backdrop-filter: blur(40rpx);
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08); /* 0 8px 32px 0 */
  border-radius: 24rpx; /* rounded-xl */
  padding: 40rpx; /* p-5 */
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.glass-card:active {
  transform: scale(0.98);
}

.card-top {
  display: flex;
  gap: 32rpx; /* gap-4 */
  margin-bottom: 32rpx; /* mb-4 */
}

.icon-box {
  width: 96rpx; /* w-12 */
  height: 96rpx; /* h-12 */
  flex-shrink: 0;
  border-radius: 24rpx; /* rounded-xl */
  background-color: rgba(0, 80, 203, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-location {
  color: #0050cb;
  font-size: 48rpx; /* text-2xl */
}

.card-info {
  flex: 1;
  min-width: 0;
}
.card-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.card-title {
  font-family: 'Manrope', sans-serif;
  font-size: 32rpx; /* text-base */
  font-weight: 700;
  color: #191c1e;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.status-badge {
  flex-shrink: 0;
  padding: 4rpx 16rpx; /* py-0.5 px-2 */
  background-color: #e0e3e5;
  border-radius: 16rpx; /* rounded-lg */
  margin-left: 16rpx;
}
.badge-text {
  color: #424656;
  font-size: 20rpx; /* text-[10px] */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-subtitle-row {
  display: flex;
  align-items: center;
  gap: 8rpx; /* gap-1 */
  margin-top: 4rpx; /* mt-0.5 */
}
.icon-domain {
  font-size: 28rpx; /* text-[14px] */
  color: #424656;
}
.card-subtitle {
  font-size: 24rpx; /* text-xs */
  font-weight: 500;
  color: #424656;
}

.card-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-top: 32rpx; /* pt-4 */
  border-top: 2rpx solid rgba(255, 255, 255, 0.1); /* border-white/10 */
}

.time-info-wrap {
  display: flex;
  flex-direction: column;
  gap: 16rpx; /* gap-2 */
}

.user-avatars {
  display: flex;
  align-items: center;
}
.avatar-img {
  width: 48rpx; /* w-6 */
  height: 48rpx; /* h-6 */
  border-radius: 50%;
  border: 4rpx solid #ffffff; /* border-2 */
  background-color: #e2e8f0;
}
.avatar-count {
  width: 48rpx; /* w-6 */
  height: 48rpx; /* h-6 */
  border-radius: 50%;
  border: 4rpx solid #ffffff; /* border-2 */
  background-color: #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -16rpx; /* -space-x-2 */
}
.count-text {
  font-size: 16rpx; /* text-[8px] */
  font-weight: 700;
  color: #191c1e;
}

.time-range {
  display: flex;
  align-items: center;
  gap: 12rpx; /* gap-1.5 */
}
.icon-schedule {
  font-size: 28rpx; /* text-[14px] */
  color: #424656;
}
.time-text {
  font-size: 20rpx; /* text-[10px] */
  font-weight: 500;
  color: #424656;
}
.text-tertiary {
  color: #a33200 !important;
  font-weight: 700 !important;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 16rpx; /* gap-2 */
  padding: 16rpx 32rpx; /* px-4 py-2 */
  background-color: rgba(0, 80, 203, 0.05); /* bg-primary/5 */
  border-radius: 24rpx; /* rounded-xl */
  transition: background-color 0.3s;
}
.action-btn:active {
  background-color: rgba(0, 80, 203, 0.1);
}
.action-btn-text {
  color: #0050cb;
  font-weight: 700;
  font-size: 24rpx; /* text-xs */
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.icon-arrow {
  color: #0050cb;
  font-size: 28rpx; /* text-sm */
}

</style>
