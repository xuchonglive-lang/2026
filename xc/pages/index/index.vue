<template>
  <app-layout page-title="首页">
    <view class="home-page">
      <!-- Hero Section -->
      <view class="home-hero">
        <text class="home-hero__badge">v2.0 Minimal Experience</text>
        <text class="home-hero__title">The Infrastructure for\nModern Enterpises.</text>
        <text class="home-hero__desc">Build, scale, and secure your workflows with our next-generation office platform. Engineered for speed and precision.</text>
        <view class="home-hero__actions">
          <view class="btn btn--primary" @click="navigateTo('/pages/key-work/list')">Start Building</view>
          <view class="btn btn--secondary" @click="navigateTo('/pages/pro-mgmt/my-docs')">Read Documentation</view>
        </view>
      </view>

      <!-- Dashboard Sections -->
      <view class="home-grid">
        
        <!-- integration Code Preview -->
        <view class="grid-card col-span-2">
          <view class="card-header">
            <text class="card-title">Integration Code Preview</text>
            <text class="card-subtitle">Connect via unified API</text>
          </view>
          <view class="code-block">
            <view class="code-header">
              <view class="code-dots">
                <view class="dot dot-r"></view>
                <view class="dot dot-y"></view>
                <view class="dot dot-g"></view>
              </view>
              <text class="code-filename">api/connect.ts</text>
            </view>
            <text class="code-content">
<text class="token-keyword">import</text> { PlatformClient } <text class="token-keyword">from</text> <text class="token-string">'@xc/cloud-sdk'</text>;

<text class="token-keyword">const</text> client = <text class="token-keyword">new</text> PlatformClient({
  <text class="token-property">apiKey</text>: process.env.XC_SECRET_KEY,
  <text class="token-property">region</text>: <text class="token-string">'cn-hangzhou'</text>
});

<text class="token-keyword">await</text> client.connect();
<text class="token-comment">// Ready to dispatch intelligent workflows.</text>
            </text>
          </view>
        </view>

        <!-- Pricing Tiers -->
        <view class="grid-card">
          <view class="card-header">
            <text class="card-title">Pricing Tiers</text>
            <text class="card-subtitle">Scale as you grow</text>
          </view>
          <view class="pricing-list">
            <view class="pricing-tier selected">
              <view class="tier-info">
                <text class="tier-name">Business</text>
                <text class="tier-desc">Advanced security & SLA</text>
              </view>
              <text class="tier-price">$49<text class="tier-period">/mo</text></text>
            </view>
             <view class="pricing-tier">
              <view class="tier-info">
                <text class="tier-name">Enterprise</text>
                <text class="tier-desc">Custom deployment</text>
              </view>
              <text class="tier-price">Custom</text>
            </view>
          </view>
        </view>

        <!-- Security Certifications -->
        <view class="grid-card">
          <view class="card-header">
            <text class="card-title">Security</text>
            <text class="card-subtitle">Enterprise-grade compliance</text>
          </view>
          <view class="cert-list">
            <view class="cert-item">
               <text class="cert-icon">🔒</text>
               <view class="cert-text">
                 <text class="cert-name">SOC 2 Type II</text>
                 <text class="cert-desc">Audited & Certified</text>
               </view>
            </view>
            <view class="cert-item">
               <text class="cert-icon">🛡️</text>
               <view class="cert-text">
                 <text class="cert-name">ISO 27001</text>
                 <text class="cert-desc">Information Security</text>
               </view>
            </view>
            <view class="cert-item">
               <text class="cert-icon">🔐</text>
               <view class="cert-text">
                 <text class="cert-name">GDPR Compliant</text>
                 <text class="cert-desc">Data Privacy</text>
               </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </app-layout>
</template>

<script>
export default {
  methods: {
    navigateTo(path) {
      uni.vk.navigateTo(path);
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  padding: var(--spacing-xl) 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxxl);
  font-family: var(--font-family);
  animation: contentFadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes contentFadeInUp {
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* --- Hero Section --- */
.home-hero {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.home-hero__badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: var(--font-size-helper);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: var(--spacing-sm);
}

.home-hero__title {
  font-size: 56px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.04em;
  color: var(--color-primary);
  white-space: pre-line;
}

.home-hero__desc {
  font-size: 18px;
  color: var(--color-text-secondary);
  max-width: 560px;
  line-height: 1.6;
  margin-top: var(--spacing-sm);
}

.home-hero__actions {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.btn {
  padding: 12px 24px;
  border-radius: var(--radius-base);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn--primary {
  background: var(--color-primary);
  color: #fff;
  border: 1px solid var(--color-primary);
  box-shadow: 0 4px 14px 0 rgba(15, 23, 42, 0.2);
}

.btn--primary:hover {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
}

.btn--secondary {
  background: var(--color-bg-card);
  color: var(--color-primary);
  border: 1px solid var(--color-border);
}

.btn--secondary:hover {
  border-color: var(--color-primary);
  background: var(--color-bg-page);
}

/* --- Grid Section --- */
.home-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
}

.grid-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-all);
}

.grid-card:hover {
  box-shadow: var(--shadow-md);
}

.col-span-2 {
  grid-column: span 2;
}

.card-header {
  margin-bottom: var(--spacing-lg);
}

.card-title {
  display: block;
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-primary);
  margin-bottom: 4px;
}

.card-subtitle {
  display: block;
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
}

/* --- Code Preview --- */
.code-block {
  background: var(--color-code-bg);
  border-radius: var(--radius-base);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.code-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.code-dots {
  display: flex;
  gap: 6px;
  margin-right: 16px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot-r { background: #FF5F56; }
.dot-y { background: #FFBD2E; }
.dot-g { background: #27C93F; }

.code-filename {
  font-family: var(--font-mono);
  font-size: 12px;
  color: #8B949E;
}

.code-content {
  display: block;
  padding: var(--spacing-lg) var(--spacing-xl);
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-code-text);
  white-space: pre-wrap;
}

.token-keyword { color: #FF7B72; }
.token-string { color: #A5D6FF; }
.token-property { color: #79C0FF; }
.token-comment { color: #8B949E; font-style: italic; }

/* --- Pricing Tiers --- */
.pricing-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.pricing-tier {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-base);
  background: var(--color-bg-page);
  transition: var(--transition-all);
}

.pricing-tier.selected {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
  box-shadow: 0 0 0 1px var(--color-primary) inset;
}

.tier-name {
  display: block;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-body);
  color: var(--color-primary);
}

.tier-desc {
  display: block;
  font-size: var(--font-size-helper);
  color: var(--color-text-secondary);
  margin-top: 2px;
}

.tier-price {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.tier-period {
  font-size: var(--font-size-helper);
  font-weight: normal;
  color: var(--color-text-secondary);
}

/* --- Certifications --- */
.cert-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.cert-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border);
}

.cert-item:last-child {
  border-bottom: none;
}

.cert-icon {
  font-size: 24px;
}

.cert-name {
  display: block;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-body);
  color: var(--color-primary);
}

.cert-desc {
  display: block;
  font-size: var(--font-size-helper);
  color: var(--color-text-secondary);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .home-hero__title { font-size: 40px; }
  .home-grid { grid-template-columns: 1fr; }
  .col-span-2 { grid-column: span 1; }
  .code-content { font-size: 11px; padding: var(--spacing-md); }
}
</style>