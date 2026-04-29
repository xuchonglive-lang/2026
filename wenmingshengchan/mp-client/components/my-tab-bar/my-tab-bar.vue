<template>
  <view class="custom-tab-bar">
    <view class="tab-bg glass-card ambient-glow"></view>

    <view class="tab-content">
      <view class="tab-item" v-for="(item, index) in list" :key="index" @click="switchTab(item, index)">
        <view class="icon-box active-press" :class="{ 'active-box': current === index }">
          <u-icon :name="item.icon" :size="current === index ? 48 : 44"
            :color="current === index ? '#0050cb' : '#64748b'"></u-icon>
          <text class="tab-text font-inter" :class="{ 'active-text': current === index }">{{ item.text }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      list: [
        {
          pagePath: "/pages/index/index",
          text: "首页",
          icon: "home"
        },
        {
          pagePath: "/pages/info/index",
          text: "信息传达",
          icon: "file-text"
        },
        // {
        //   pagePath: "/pages/feedback/todo-list/index",
        //   text: "任务执行",
        //   icon: "order"
        // },
        {
          pagePath: "/pages/keywork/project/list/index",
          text: "重点推进",
          icon: "order"
        },
        {
          pagePath: "/pages/plan/list",
          text: "计划执行",
          icon: "calendar"
        },
        {
          pagePath: "/pages/user/mine/index",
          text: "我的",
          icon: "account"
        }
        // {
        //   pagePath: "/pages/user/mine/index",
        //   text: "我的",
        //   icon: "account"
        // }
      ]
    }
  },
  methods: {
    switchTab(item, index) {
      if (this.current !== index) {
        uni.switchTab({
          url: item.pagePath
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 160rpx;
  /* 80px + padding for iphones */
  z-index: 999;

  /* Use absolute div for background to prevent blur inheritance issues */
  .tab-bg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 40rpx 40rpx 0 0;
    border-bottom: none;
    z-index: -1;
  }
}

.tab-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 120rpx;
  padding: 0 16rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
}

.icon-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8rpx 16rpx;
  border-radius: 24rpx;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.active-box {
  background-color: rgba(0, 80, 203, 0.1);
  transform: scale(1.05);
}

.tab-text {
  font-size: 20rpx;
  margin-top: 8rpx;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2rpx;
  transition: all 0.3s ease;
}

.active-text {
  color: #0050cb;
}
</style>
