<template>
  <view class="page-container industrial-bg industrial-grid">
    <view class="main-content">
      <!-- Page Title Header -->
      <view class="header-row">
        <view class="back-btn active-press" @click="goBack">
          <text class="material-symbols-outlined">arrow_back</text>
        </view>
        <text class="page-title font-headline font-extrabold text-industrial-primary tracking-tight">重点项目推进详情</text>
      </view>

      <!-- Section 1: 项目推进标准 -->
      <view class="section">
        <view class="section-header">
          <text class="section-title font-headline font-extrabold heavy-underline">项目推进标准</text>
        </view>
        <view class="glass-card standard-card">
          <view class="card-top">
            <view class="title-group">
              <text class="project-id font-headline font-bold text-industrial-primary">智能制造产线升级 A-04</text>
              <view class="location-group">
                <text class="material-symbols-outlined location-icon">location_on</text>
                <text class="location-text">华东数字化产业园 3号楼</text>
              </view>
            </view>
            <view class="status-badge">执行中</view>
          </view>
          
          <view class="standard-desc">
            本标准涉及全自动化组装线的软件集成与硬件调试，需满足ISO-9001高精度工业输出要求，确保日产能提升至120%以上。
          </view>

          <view class="people-grid">
            <view class="people-col">
              <text class="people-label">执行人</text>
              <view class="people-info">
                <view class="avatar-stack">
                  <image class="avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPBoAB-xw6DBilDSX_Wjx8WB2hbnnTOH9NlbkOzEaWndddfDK-ZgFwlIfkX2DvXHx4IckvSkqCfq5tt-dA-UWY7cVxKUMg7oqlsA3NwelZJXaADDcOlgVXBB2s_aeZ0CCnRKU7PwegSDa2bubQkOaRmtVTaht_ktjymGxDc4QW0pK5tt_ElcXhiJ2PqsJ1INXR7YqCS17lFMgG9RLY84-4Jwa-gXl80xRcDHvQFDFM3VacYX6qHbFQfGmCkOeNy12hgBSjHo8laX0" mode="aspectFill"></image>
                  <image class="avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnoA1G-Q9SnJ3uxuVtSsjX7INqjog1dpywtjUONAmcyb6bVn5okfhGgdd1X_XuwCGi1T8DDUP-14W97p4xxO31xzSzJx8SvSm1MVco0xXRg2cZ79bLi3_vdkBjYqnWZ_n8iTVNqqN_76JFTIySbrRKL70G2b-AX6Av1LhoFHv8j-io0jMbD_ohSm01bXgiXutmT3O9rp-4x5VJZyLsmOziDSKBiXydgk6ctrL-H1t9vvyagD2HvbXHZO-ZKnJi3gUO_s9mVOWxhFo" mode="aspectFill"></image>
                  <image class="avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFt6z2hfTZLP5MYW9OsfiFsW4r_DIKLhYFkjH7y1z0kEaLmfXJT2AYTejtdPMwTTFUvl_83N5OqFtdftkpAyjT5kcdUOb2AO0z7_1qRtY9cOyFrxfBh7t2qichGRp1cINSuasLrxSOkso-grZBH5uVyGCi7o5qD3DUdqL2FVlgER7QUhn4vrwH2oBh-of9lxzjIKoakO6jdV1YBzQqGpgW6aUi9tposmxVe0FwuvenPPIxcnrMAsKaR3dDWSG_LavOLw37io7-Tmw" mode="aspectFill"></image>
                  <view class="avatar-more">+4</view>
                </view>
                <text class="people-name">王小美...</text>
              </view>
            </view>
            <view class="people-col">
              <text class="people-label">验收人</text>
              <view class="people-info">
                <image class="avatar inspector-avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDf-FnBVNiSY4RAaJSqh3xNiHDoR0lQSblWPIwyUbRLV7b1eanMOLn496jG7hx1U6WOLlkVJTkphUvVHO3DhXQR3lnkzZGzKotWPKx3SoPgZL_lExi_02vV4PESSKxfAwzS5VP4kY6kGGE29LUpUcGtBZSsWJ4uHk-t6qKGBf9gDRXqIUZk0nxNfEIDZGSa3NFMLT519tN3W1UWznOD7qCc4vef1f0K5M-zzGubx5lOPvKTqNhmoXOTJrsgDMhUVCZprOcNImjMmg" mode="aspectFill"></image>
                <text class="people-name bold">王建</text>
              </view>
            </view>
          </view>

          <view class="progress-section">
            <view class="progress-meta">
              <text class="deadline-label">完成时限：2024.12.30</text>
              <view class="progress-stat">
                <text class="progress-label">进度：</text>
                <text class="progress-value font-headline font-bold">75%</text>
              </view>
            </view>
            <view class="progress-track">
              <view class="progress-bar" style="width: 75%"></view>
            </view>
          </view>
        </view>
      </view>

      <!-- Section 2: 项目推进过程反馈 -->
      <view class="section">
        <view class="section-header">
          <text class="section-title font-headline font-extrabold heavy-underline">项目推进过程反馈</text>
        </view>
        <view class="timeline-container">
          <!-- Timeline Line -->
          <view class="timeline-track"></view>
          
          <!-- Feedback Item 1 -->
          <view class="timeline-item">
            <view class="timeline-dot active"></view>
            <view class="glass-card feedback-card">
              <view class="feedback-header">
                <view class="user-info">
                  <image class="avatar-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPBoAB-xw6DBilDSX_Wjx8WB2hbnnTOH9NlbkOzEaWndddfDK-ZgFwlIfkX2DvXHx4IckvSkqCfq5tt-dA-UWY7cVxKUMg7oqlsA3NwelZJXaADDcOlgVXBB2s_aeZ0CCnRKU7PwegSDa2bubQkOaRmtVTaht_ktjymGxDc4QW0pK5tt_ElcXhiJ2PqsJ1INXR7YqCS17lFMgG9RLY84-4Jwa-gXl80xRcDHvQFDFM3VacYX6qHbFQfGmCkOeNy12hgBSjHo8laX0" mode="aspectFill"></image>
                  <text class="username">王小美</text>
                  <text class="type-badge primary">进度反馈</text>
                </view>
                <text class="time-stamp">10-25 14:30</text>
              </view>
              <text class="feedback-text">模块集成测试已完成 80%，目前正在进行压力负载测试，未发现严重溢出。预计下周进入预验收阶段。</text>
              <view class="feedback-images">
                <image class="feedback-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvAeZFAwNFdAEoRyd8-GSAvZb5UMu2Zdrb0dGLPNgXNx32IpGRGQtCcZ-vci-0bHTnay-NixIpq2hP3eLrVnEhhCU-85cPjKXDiJhg1oZUpKIJrvWy3vcLzp0W1JNkyIJfGTO49FQVOws-NyGTrmH3SYzSuMVDsXh7Q8SlivsaV9RByUZSS9J8RxZ4WP1ljVBy2SzA9GeJZd2uZL9s4EelUFD60WL-wECDaN9AaZHpkmMqCeTBkTyhkVybKKOcde8ZQPgZvGSFeVI" mode="aspectFill"></image>
                <image class="feedback-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWTqZJL5bErHOVhnfjfUBGarntuj-w7F4w-T6xT6L8EpL-dOuZ00nxrQEV-hyYyYyzqFRfxTvSUV636G2SKmusD6hIC2K1Bb3oNdpJx52iPCbQ5tvgP5LHNhnmV-GPzKqy5lsYFfHOcxBIX6a4Yht2qmiLXY75V-8ciIe98ec3__nA0MKAyoVY2tHx-d3QJBF1XCZxLt8Wqzwmy5I4u_mb8-Gy0t2tb6uG4fACXDq-LR8zbu5rb0Pqet9O82zJ4zxJJL0RDsGGoY4" mode="aspectFill"></image>
              </view>
              <!-- Inspector Comment -->
              <view class="inspector-comment">
                <view class="comment-user">
                  <image class="avatar-mini" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDf-FnBVNiSY4RAaJSqh3xNiHDoR0lQSblWPIwyUbRLV7b1eanMOLn496jG7hx1U6WOLlkVJTkphUvVHO3DhXQR3lnkzZGzKotWPKx3SoPgZL_lExi_02vV4PESSKxfAwzS5VP4kY6kGGE29LUpUcGtBZSsWJ4uHk-t6qKGBf9gDRXqIUZk0nxNfEIDZGSa3NFMLT519tN3W1UWznOD7qCc4vef1f0K5M-zzGubx5lOPvKTqNhmoXOTJrsgDMhUVCZprOcNImjMmg" mode="aspectFill"></image>
                  <view class="comment-title-box">
                    <text class="comment-name">王建</text>
                    <text class="comment-tag">意见</text>
                  </view>
                </view>
                <text class="comment-body">“进度把握良好，注意关注负载下的能耗波动情况。”</text>
              </view>
            </view>
          </view>
          
          <!-- Feedback Item 2 -->
          <view class="timeline-item">
            <view class="timeline-dot inactive"></view>
            <view class="glass-card feedback-card">
              <view class="feedback-header">
                <view class="user-info">
                  <image class="avatar-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnoA1G-Q9SnJ3uxuVtSsjX7INqjog1dpywtjUONAmcyb6bVn5okfhGgdd1X_XuwCGi1T8DDUP-14W97p4xxO31xzSzJx8SvSm1MVco0xXRg2cZ79bLi3_vdkBjYqnWZ_n8iTVNqqN_76JFTIySbrRKL70G2b-AX6Av1LhoFHv8j-io0jMbD_ohSm01bXgiXutmT3O9rp-4x5VJZyLsmOziDSKBiXydgk6ctrL-H1t9vvyagD2HvbXHZO-ZKnJi3gUO_s9mVOWxhFo" mode="aspectFill"></image>
                  <text class="username">张伟</text>
                  <text class="type-badge tertiary">节点验收</text>
                </view>
                <text class="time-stamp">10-18 09:15</text>
              </view>
              <text class="feedback-text">硬件架构已固定，地脚螺栓加固完毕，传感器支架对中精度通过首检。</text>
            </view>
          </view>
        </view>
      </view>

      <!-- Section 3: 项目推进验收意见 -->
      <view class="section">
        <view class="section-header">
          <text class="section-title font-headline font-extrabold heavy-underline">项目推进验收意见</text>
        </view>
        <view class="conclusion-gradient-border">
          <view class="conclusion-inner bg-glass">
            <view class="acceptor-header">
              <image class="acceptor-avatar-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDf-FnBVNiSY4RAaJSqh3xNiHDoR0lQSblWPIwyUbRLV7b1eanMOLn496jG7hx1U6WOLlkVJTkphUvVHO3DhXQR3lnkzZGzKotWPKx3SoPgZL_lExi_02vV4PESSKxfAwzS5VP4kY6kGGE29LUpUcGtBZSsWJ4uHk-t6qKGBf9gDRXqIUZk0nxNfEIDZGSa3NFMLT519tN3W1UWznOD7qCc4vef1f0K5M-zzGubx5lOPvKTqNhmoXOTJrsgDMhUVCZprOcNImjMmg" mode="aspectFill"></image>
              <view class="acceptor-info">
                <text class="conclusion-title font-headline font-bold">最终验收结论 · 王建</text>
                <text class="status-subtitle font-bold">VERIFIED COMPLETION STATUS</text>
              </view>
            </view>
            <view class="conclusion-box">
              <text class="conclusion-content">经验收组现场核实，本项目产线升级已完全符合设计初衷。传感器响应速度提升15ms，安全防护等级达标。正式批准进入量产测试阶段。</text>
            </view>
            <view class="conclusion-footer">
              <text class="acceptance-status-tag">验收已通过</text>
              <text class="acceptance-date">验收时间：2024年11月01日</text>
            </view>
          </view>
        </view>
      </view>

      <!-- FAB Buttons -->
      <view class="fab-bar bg-glass-blur">
        <view class="fab-container">
          <view class="fab-btn primary active-press">
            <text class="material-symbols-outlined fab-icon">history_edu</text>
            <text>过程反馈</text>
          </view>
          <view class="fab-btn error active-press">
            <text class="material-symbols-outlined fab-icon">fact_check</text>
            <text>验收申请反馈</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    goBack() {
      uni.navigateBack();
    }
  }
};
</script>

<style scoped lang="scss">
// Project Colors
$primary: #0050cb;
$secondary: #425ca0;
$tertiary: #a33200;
$error: #ba1a1a;
$on-surface: #191c1e;
$on-surface-variant: #424656;
$outline: #727687;

.page-container {
  min-height: 100vh;
  padding-bottom: 240rpx;
}

.main-content {
  padding: 80rpx 32rpx 32rpx;
  max-width: 1300rpx; // 2xl is wide, but constrained to mobile feel usually
  margin: 0 auto;
}

// Header
.header-row {
  display: flex;
  align-items: center;
  gap: 32rpx;
  margin-bottom: 64rpx;
}
.back-btn {
  color: $primary;
  .material-symbols-outlined {
    font-size: 56rpx;
  }
}
.page-title {
  font-size: 48rpx;
  letter-spacing: -0.02em;
}

// Sections
.section {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  margin-bottom: 64rpx;
}
.section-header {
  margin-bottom: 8rpx;
}
.section-title {
  font-size: 36rpx;
  color: $on-surface;
}

// Card Style
.standard-card {
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  border-radius: 24rpx;
}
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.project-id {
  font-size: 32rpx;
  margin-bottom: 8rpx;
  display: block;
}
.location-group {
  display: flex;
  align-items: center;
  gap: 16rpx;
}
.location-icon {
  font-size: 32rpx;
  color: $on-surface-variant;
}
.location-text {
  font-size: 24rpx;
  color: $on-surface-variant;
}
.status-badge {
  background: #dae1ff;
  color: #001849;
  padding: 8rpx 24rpx;
  border-radius: 99rpx;
  font-size: 20rpx;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.standard-desc {
  background: rgba(242, 244, 246, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 24rpx;
  font-size: 28rpx;
  line-height: 1.6;
  color: $on-surface-variant;
}

.people-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32rpx;
}
.people-label {
  font-size: 20rpx;
  font-weight: 800;
  color: $outline;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 8rpx;
  display: block;
}
.people-info {
  display: flex;
  align-items: center;
}
.people-name {
  font-size: 24rpx;
  color: $on-surface;
  font-weight: 500;
  margin-left: 16rpx;
}
.people-name.bold {
  font-weight: 800;
}

.avatar-stack {
  display: flex;
  margin-right: 8rpx;
}
.avatar {
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  border: 4rpx solid #fff;
  margin-left: -16rpx;
}
.avatar:first-child { margin-left: 0; }
.avatar-more {
  width: 56rpx;
  height: 56rpx;
  background: #dae1ff;
  border-radius: 50%;
  border: 4rpx solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20rpx;
  font-weight: 800;
  color: $primary;
  margin-left: -16rpx;
}
.inspector-avatar {
  margin-left: 0;
  border: 1px solid rgba(0, 80, 203, 0.2);
}

.progress-section {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
.progress-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.deadline-label {
  font-size: 20rpx;
  font-weight: 800;
  color: $outline;
  text-transform: uppercase;
}
.progress-value {
  color: $primary;
  font-size: 28rpx;
}
.progress-track {
  height: 12rpx;
  background: #e0e3e5;
  border-radius: 99rpx;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  background: #0066ff;
  border-radius: 99rpx;
}

// Timeline
.timeline-container {
  position: relative;
  padding-left: 48rpx;
  display: flex;
  flex-direction: column;
  gap: 64rpx;
}
.timeline-track {
  position: absolute;
  left: 22rpx;
  top: 16rpx;
  bottom: 16rpx;
  width: 4rpx;
  background: rgba(194, 198, 216, 0.3);
}
.timeline-item {
  position: relative;
}
.timeline-dot {
  position: absolute;
  left: -38rpx;
  top: 8rpx;
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  border: 8rpx solid #fff;
  z-index: 2;
}
.timeline-dot.active {
  background: #0066ff;
}
.timeline-dot.inactive {
  background: $outline;
}

.feedback-card {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}
.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 16rpx;
}
.avatar-sm {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
}
.username {
  font-size: 24rpx;
  font-weight: 800;
  color: $on-surface;
}
.type-badge {
  font-size: 20rpx;
  padding: 4rpx 16rpx;
  border-radius: 8rpx;
  font-weight: 800;
}
.type-badge.primary { background: rgba(0, 80, 203, 0.1); color: $primary; }
.type-badge.tertiary { background: #ffdbd0; color: #832600; }

.time-stamp {
  font-size: 20rpx;
  color: $outline;
}
.feedback-text {
  font-size: 28rpx;
  color: $on-surface-variant;
  line-height: 1.5;
}
.feedback-images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
}
.feedback-img {
  width: 100%;
  height: 180rpx;
  border-radius: 16rpx;
}

.inspector-comment {
  margin-top: 24rpx;
  padding: 24rpx 32rpx;
  background: rgba(254, 242, 242, 0.5); // red-50/50
  backdrop-filter: blur(8px);
  border-radius: 16rpx;
  border-top: 1px solid rgba(254, 202, 202, 0.3); // red-200/30
}
.comment-user {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 16rpx;
}
.avatar-mini {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
}
.comment-title-box {
  display: flex;
  align-items: center;
  gap: 12rpx;
}
.comment-name {
  font-size: 20rpx;
  font-weight: 800;
  color: #7f1d1d;
}
.comment-tag {
  font-size: 20rpx;
  font-weight: 800;
  color: #b91c1c;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.comment-body {
  font-size: 24rpx;
  color: #991b1b;
  font-style: italic;
}

// Conclusion
.conclusion-gradient-border {
  padding: 4rpx;
  border-radius: 32rpx;
  background: linear-gradient(135deg, #0066ff, #9bb4fe);
  box-shadow: 0 16rpx 48rpx rgba(0, 80, 203, 0.15);
}
.conclusion-inner {
  padding: 48rpx;
  border-radius: 28rpx;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}
.acceptor-header {
  display: flex;
  align-items: center;
  gap: 24rpx;
}
.acceptor-avatar-lg {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(0, 80, 203, 0.2);
}
.conclusion-title {
  font-size: 28rpx;
  color: $on-surface;
}
.status-subtitle {
  font-size: 20rpx;
  color: $primary;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}
.conclusion-box {
  background: rgba(0, 80, 203, 0.05);
  border: 1px solid rgba(0, 80, 203, 0.1);
  padding: 32rpx;
  border-radius: 24rpx;
}
.conclusion-content {
  font-size: 28rpx;
  color: $on-surface;
  line-height: 1.6;
  font-weight: 500;
}
.conclusion-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.acceptance-status-tag {
  background: rgba(0, 80, 203, 0.1);
  color: $primary;
  padding: 8rpx 24rpx;
  border-radius: 99rpx;
  font-size: 20rpx;
  font-weight: 800;
}
.acceptance-date {
  font-size: 20rpx;
  color: $outline;
}

// FAB
.fab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32rpx 32rpx 64rpx;
  z-index: 100;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}
.fab-container {
  display: flex;
  gap: 24rpx;
  max-width: 1300rpx;
  margin: 0 auto;
}
.fab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  padding: 32rpx;
  border-radius: 99rpx;
  box-shadow: 0 16rpx 64rpx rgba(0, 80, 203, 0.1);
  height: 112rpx;
  box-sizing: border-box;
}
.fab-btn.primary {
  background: rgba(0, 80, 203, 0.8);
  color: #fff;
}
.fab-btn.error {
  background: rgba(186, 26, 26, 0.8);
  color: #fff;
}
.fab-icon {
  font-size: 36rpx;
}
.fab-btn text {
  font-family: Manrope, sans-serif;
  font-weight: 700;
  font-size: 28rpx;
}

// Helper classes
.tracking-tight { letter-spacing: -0.025em; }
.bg-glass { background: rgba(255, 255, 255, 0.45); backdrop-filter: blur(20px); }
.bg-glass-blur { background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(12px); }

</style>
