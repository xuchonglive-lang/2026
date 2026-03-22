<template>
  <view class="forbidden-page">
    <view class="forbidden-card">
      <text class="forbidden-code">403</text>
      <text class="forbidden-title">您没有访问此页面的权限</text>
      <text class="forbidden-desc">请联系管理员获取权限</text>
      <view class="forbidden-btn" @click="goHome">
        <text>返回首页</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    goHome() {
      uni.vk.navigateTo('/pages/index/index')
    },
  },
}
</script>

<style lang="scss" scoped>
.forbidden-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-page);
}

.forbidden-card {
  text-align: center;
  padding: var(--spacing-xxl);
}

.forbidden-code {
  display: block;
  font-size: 72px;
  font-weight: var(--font-weight-bold);
  color: var(--color-border);
  line-height: 1;
  margin-bottom: var(--spacing-md);
}

.forbidden-title {
  display: block;
  font-size: var(--font-size-h3);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.forbidden-desc {
  display: block;
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
}

.forbidden-btn {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-xl);
  background-color: var(--color-primary);
  color: #fff;
  border-radius: var(--radius-base);
  font-size: var(--font-size-body);
  cursor: pointer;
  transition: opacity var(--duration-fast);
}

.forbidden-btn:active {
  opacity: 0.8;
}
</style>
