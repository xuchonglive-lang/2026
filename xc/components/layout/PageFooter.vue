<template>
  <view class="page-footer">
    <text class="page-footer__text">© 2026 办公应用平台 · 技术支持</text>
  </view>
</template>

<script>
export default {
  name: 'PageFooter',
}
</script>

<style lang="scss" scoped>
.page-footer {
  height: var(--footer-height);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-glass);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-top: 1px solid var(--color-border-glass);
}

.page-footer__text {
  font-size: var(--font-size-helper);
  color: var(--color-text-placeholder);
}
</style>
