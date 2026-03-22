<template>
  <app-layout page-title="视频课程" :show-tab-bar="false">
    <view class="page-placeholder">
      <text class="page-placeholder__text">视频课程详情 · 即将上线</text>
    </view>
  </app-layout>
</template>

<script>

export default {
}
</script>

<style lang="scss" scoped>
.page-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.page-placeholder__text {
  font-size: var(--font-size-h3);
  color: var(--color-text-placeholder);
}
</style>
