<template>
  <app-layout page-title="消息详情">
    <view class="msg-detail" v-if="info">
      <!-- 标题区 -->
      <view class="msg-detail__header">
        <text class="msg-detail__title">{{ info.title }}</text>
        <view class="msg-detail__meta">
          <text class="msg-detail__type" v-if="info.msg_type">{{ info.msg_type }}</text>
          <text class="msg-detail__time">{{ formatTime(info.created_at) }}</text>
        </view>
      </view>

      <!-- 内容区 -->
      <view class="msg-detail__content">
        <text class="msg-detail__text">{{ info.content }}</text>
      </view>

      <!-- 业务跳转 -->
      <view class="msg-detail__action" v-if="info.target_type && info.target_id">
        <button class="msg-detail__btn" @click="goTarget">去看看</button>
      </view>
    </view>

    <!-- 加载中/错误 -->
    <view v-else class="msg-detail__loading">
      <text>{{ errorMsg || '加载中...' }}</text>
    </view>
  </app-layout>
</template>

<script>
// 业务类型 → 跳转路径映射
const TARGET_URL_MAP = {
  training: '/pages/training/video-detail?id=',
  info: '/pages/info-sharing/detail?id=',
  work: '/pages/key-work/detail?id='
}

export default {
  data() {
    return {
      info: null,
      errorMsg: ''
    }
  },
  onLoad(options) {
    if (options.id) {
      this.loadDetail(options.id)
    } else {
      this.errorMsg = '缺少消息ID'
    }
  },
  methods: {
    loadDetail(id) {
      let vk = this.vk
      vk.callFunction({
        url: 'client/message/kh/getInfo',
        data: { _id: id },
        success: (data) => {
          this.info = data
          // 刷新角标
          uni.$emit('refreshUnreadCount')
        },
        fail: (err) => {
          this.errorMsg = err.msg || '加载失败'
        }
      })
    },
    goTarget() {
      let basePath = TARGET_URL_MAP[this.info.target_type]
      if (basePath) {
        uni.vk.navigateTo(basePath + this.info.target_id)
      }
    },
    formatTime(ts) {
      if (!ts) return ''
      let vk = this.vk
      if (vk && vk.pubfn && vk.pubfn.timeFormat) {
        return vk.pubfn.timeFormat(ts, 'yyyy-MM-dd hh:mm')
      }
      return new Date(ts).toLocaleString()
    }
  }
}
</script>

<style lang="scss" scoped>
.msg-detail {
  padding: 20px 16px;
  &__header {
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--color-border-light, #f0f0f0);
  }
  &__title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    line-height: 1.5;
    display: block;
    margin-bottom: 10px;
  }
  &__meta {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  &__type {
    font-size: 12px;
    color: #fff;
    background: var(--color-primary, #165DFF);
    padding: 2px 8px;
    border-radius: 3px;
  }
  &__time {
    font-size: 13px;
    color: #999;
  }
  &__content {
    padding: 16px 0;
    min-height: 200px;
  }
  &__text {
    font-size: 15px;
    color: #555;
    line-height: 1.8;
    white-space: pre-wrap;
  }
  &__action {
    padding: 24px 0;
    text-align: center;
  }
  &__btn {
    display: inline-block;
    padding: 10px 40px;
    font-size: 15px;
    color: #fff;
    background: var(--color-primary, #165DFF);
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  &__loading {
    text-align: center;
    padding: 60px 0;
    color: #999;
  }
}
</style>
