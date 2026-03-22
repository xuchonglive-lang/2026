<template>
  <AppLayout>
    <view class="dept-info-page">
      <!-- 面包屑 -->
      <view class="dept-breadcrumb" v-if="deptPath.length > 0">
        <text
          v-for="(item, index) in deptPath"
          :key="item._id"
          class="breadcrumb-item"
        >
          <text v-if="index > 0" class="breadcrumb-sep">/</text>
          <text :class="{ 'is-current': index === deptPath.length - 1 }">{{ item.name }}</text>
        </text>
      </view>

      <!-- 部门信息卡片 -->
      <view class="dept-card" v-if="deptInfo">
        <view class="dept-card__header">
          <text class="dept-card__name">{{ deptInfo.name }}</text>
          <view class="dept-card__tags">
            <text class="dept-tag" v-if="deptInfo.dept_level === 10">部室</text>
            <text class="dept-tag dept-tag--workshop" v-else-if="deptInfo.dept_level === 20">车间</text>
            <text class="dept-tag dept-tag--group" v-else-if="deptInfo.dept_level === 0">集团</text>
          </view>
        </view>

        <view class="dept-card__body">
          <view class="dept-info-row" v-if="deptInfo.code">
            <text class="dept-info-label">部门编码</text>
            <text class="dept-info-value">{{ deptInfo.code }}</text>
          </view>

          <view class="dept-info-row" v-if="deptInfo.leader_info">
            <text class="dept-info-label">负责人</text>
            <view class="dept-info-value leader-info">
              <image
                v-if="deptInfo.leader_info.avatar"
                :src="deptInfo.leader_info.avatar"
                class="leader-avatar"
                mode="aspectFill"
              />
              <text>{{ deptInfo.leader_info.nickname || '未设置' }}</text>
            </view>
          </view>

          <view class="dept-info-row" v-if="deptInfo.description">
            <text class="dept-info-label">部门简介</text>
            <text class="dept-info-value">{{ deptInfo.description }}</text>
          </view>
        </view>
      </view>

      <!-- 无部门提示 -->
      <view class="no-dept" v-else-if="!loading">
        <text class="no-dept-icon">🏢</text>
        <text class="no-dept-text">您暂未分配部门，请联系管理员</text>
      </view>
    </view>
  </AppLayout>
</template>

<script>
import AppLayout from '@/components/layout/AppLayout.vue';

export default {
  components: { AppLayout },
  data() {
    return {
      loading: true,
      deptInfo: null,
      deptPath: []
    };
  },
  onLoad() {
    this.loadDeptInfo();
    this.loadDeptPath();
  },
  methods: {
    async loadDeptInfo() {
      this.loading = true;
      try {
        let res = await uni.vk.callFunction({
          url: 'user/kh/dept/getMyDept',
          data: {}
        });
        this.deptInfo = res.data || null;
      } catch (err) {
        console.error('loadDeptInfo error:', err);
      }
      this.loading = false;
    },

    async loadDeptPath() {
      try {
        let res = await uni.vk.callFunction({
          url: 'user/kh/dept/getDeptPath',
          data: {}
        });
        this.deptPath = res.data || [];
      } catch (err) {
        console.error('loadDeptPath error:', err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dept-info-page {
  padding: var(--spacing-lg) 0;
}

.dept-breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.breadcrumb-sep {
  margin: 0 var(--spacing-xs);
  color: var(--color-text-placeholder);
}

.breadcrumb-item .is-current {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

.dept-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.dept-card__header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg) var(--spacing-xl);
  border-bottom: 1px solid var(--color-border);
}

.dept-card__name {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.dept-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.dept-tag--workshop {
  background: #e6f7ff;
  color: #1890ff;
}

.dept-tag--group {
  background: #fff7e6;
  color: #fa8c16;
}

.dept-card__body {
  padding: var(--spacing-lg) var(--spacing-xl);
}

.dept-info-row {
  display: flex;
  align-items: flex-start;
  padding: var(--spacing-sm) 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-border-light);
  }
}

.dept-info-label {
  flex: 0 0 80px;
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
}

.dept-info-value {
  flex: 1;
  font-size: var(--font-size-body);
  color: var(--color-text-primary);
}

.leader-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.leader-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.no-dept {
  text-align: center;
  padding: var(--spacing-xxxl) 0;
}

.no-dept-icon {
  display: block;
  font-size: 48px;
  margin-bottom: var(--spacing-md);
}

.no-dept-text {
  font-size: var(--font-size-body);
  color: var(--color-text-placeholder);
}
</style>
