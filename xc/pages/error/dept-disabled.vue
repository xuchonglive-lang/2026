<template>
  <view class="dept-disabled-page">
    <view class="dept-disabled-card">
      <text class="dept-disabled-icon">🏢</text>
      <text class="dept-disabled-title">部门已停用</text>
      <text class="dept-disabled-desc">
        您所属的部门已被管理员停用，暂时无法使用业务功能。
        请联系管理员恢复部门状态或重新分配部门。
      </text>
      <view class="dept-disabled-btn" @click="handleLogout">
        <text>退出登录</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      uni.vk.callFunction({
        url: 'user/kh/logoutSafe',
        success: () => {
          uni.reLaunch({ url: '/pages/login/index' });
        },
        fail: () => {
          uni.reLaunch({ url: '/pages/login/index' });
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.dept-disabled-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-page);
}

.dept-disabled-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-base);
  padding: var(--spacing-xxxl) var(--spacing-xxl);
  text-align: center;
  max-width: 400px;
  margin: 0 var(--spacing-md);
}

.dept-disabled-icon {
  font-size: 48px;
  display: block;
  margin-bottom: var(--spacing-lg);
}

.dept-disabled-title {
  display: block;
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}

.dept-disabled-desc {
  display: block;
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-xl);
}

.dept-disabled-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-xl);
  background: var(--color-primary);
  color: #fff;
  border-radius: var(--radius-base);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: var(--transition-all);
}

.dept-disabled-btn:hover {
  opacity: 0.9;
  transform: scale(0.98);
}
</style>
