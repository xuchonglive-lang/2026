<template>
  <app-layout page-title="消息中心">
    <!-- Tab 分类栏 -->
    <view class="msg-tabs">
      <view
        v-for="tab in tabs"
        :key="tab.value"
        class="msg-tabs__item"
        :class="{ 'is-active': currentTab === tab.value }"
        @click="switchTab(tab.value)"
      >
        <text>{{ tab.label }}</text>
      </view>
    </view>

    <!-- 全部已读按钮 -->
    <view class="msg-toolbar" v-if="list.length > 0">
      <view class="msg-toolbar__action" @click="markAllRead">
        <text class="msg-toolbar__text">全部已读</text>
      </view>
    </view>

    <!-- 消息列表 -->
    <view class="msg-list">
      <view
        v-for="item in list"
        :key="item._id"
        class="msg-item"
        :class="{ 'is-unread': !item.is_read }"
        @click="goDetail(item)"
      >
        <view class="msg-item__dot" v-if="!item.is_read"></view>
        <view class="msg-item__body">
          <view class="msg-item__header">
            <text class="msg-item__title" :class="{ 'is-bold': !item.is_read }">{{ item.title }}</text>
            <text class="msg-item__time">{{ formatTime(item.created_at) }}</text>
          </view>
          <text class="msg-item__summary">{{ item.summary }}</text>
          <view class="msg-item__tag" v-if="item.msg_type">
            <text class="msg-item__tag-text">{{ item.msg_type }}</text>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-if="list.length === 0 && !loading" class="msg-empty">
        <text class="msg-empty__text">暂无消息</text>
      </view>

      <!-- 加载更多 -->
      <view v-if="hasMore" class="msg-loadmore" @click="loadMore">
        <text class="msg-loadmore__text">{{ loading ? '加载中...' : '加载更多' }}</text>
      </view>
      <view v-if="!hasMore && list.length > 0" class="msg-loadmore">
        <text class="msg-loadmore__text">没有更多消息了</text>
      </view>
    </view>
  </app-layout>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      tabs: [{ value: '', label: '全部' }],
      currentTab: '',
      pageIndex: 1,
      pageSize: 20,
      hasMore: true,
      loading: false
    }
  },
  onShow() {
    this.refresh()
    uni.$emit('refreshUnreadCount')
  },
  onPullDownRefresh() {
    this.refresh()
    uni.stopPullDownRefresh()
  },
  onReachBottom() {
    this.loadMore()
  },
  methods: {
    refresh() {
      this.pageIndex = 1
      this.hasMore = true
      this.list = []
      this.loadList()
      this.loadTabs()
    },
    loadList() {
      if (this.loading) return
      this.loading = true
      let vk = this.vk
      vk.callFunction({
        url: 'client/message/kh/getList',
        data: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          msg_type: this.currentTab || undefined
        },
        success: (data) => {
          let rows = data.rows || []
          if (this.pageIndex === 1) {
            this.list = rows
          } else {
            this.list = this.list.concat(rows)
          }
          this.hasMore = data.hasMore !== false && rows.length >= this.pageSize
          this.loading = false
        },
        fail: () => {
          this.loading = false
        }
      })
    },
    loadTabs() {
      // 动态聚合消息类型（从模板表）
      let vk = this.vk
      vk.callFunction({
        url: 'client/message/kh/getList',
        data: { pageIndex: 1, pageSize: 200 },
        success: (data) => {
          let rows = data.rows || []
          let types = [...new Set(rows.map(r => r.msg_type).filter(Boolean))]
          this.tabs = [{ value: '', label: '全部' }]
          types.forEach(t => {
            this.tabs.push({ value: t, label: t })
          })
        }
      })
    },
    loadMore() {
      if (!this.hasMore || this.loading) return
      this.pageIndex++
      this.loadList()
    },
    switchTab(value) {
      this.currentTab = value
      this.pageIndex = 1
      this.list = []
      this.hasMore = true
      this.loadList()
    },
    goDetail(item) {
      uni.vk.navigateTo('/pages/message/detail?id=' + item._id)
    },
    markAllRead() {
      let vk = this.vk
      vk.callFunction({
        url: 'client/message/kh/markAllRead',
        data: {},
        success: () => {
          this.list.forEach(item => { item.is_read = true })
          uni.$emit('refreshUnreadCount')
          vk.toast('已全部标记为已读')
        }
      })
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
.msg-tabs {
  display: flex;
  padding: 12px 16px 0;
  border-bottom: 1px solid var(--color-border-light, #f0f0f0);
  overflow-x: auto;
  &__item {
    padding: 8px 16px;
    font-size: 14px;
    color: var(--color-text-secondary, #999);
    white-space: nowrap;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    &.is-active {
      color: var(--color-primary, #165DFF);
      border-bottom-color: var(--color-primary, #165DFF);
      font-weight: 600;
    }
  }
}
.msg-toolbar {
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px;
  &__action { cursor: pointer; }
  &__text { font-size: 13px; color: var(--color-primary, #165DFF); }
}
.msg-list { padding: 0 16px; }
.msg-item {
  display: flex;
  align-items: flex-start;
  padding: 14px 0;
  border-bottom: 1px solid var(--color-border-light, #f0f0f0);
  cursor: pointer;
  &__dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--color-primary, #165DFF);
    margin-top: 8px; margin-right: 10px;
    flex-shrink: 0;
  }
  &__body { flex: 1; min-width: 0; }
  &__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
  &__title { font-size: 15px; color: #333; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
  &__title.is-bold { font-weight: 600; }
  &__time { font-size: 12px; color: #bbb; margin-left: 12px; white-space: nowrap; }
  &__summary { font-size: 13px; color: #999; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  &__tag { margin-top: 6px; }
  &__tag-text { font-size: 11px; color: #fff; background: var(--color-primary, #165DFF); padding: 1px 6px; border-radius: 3px; }
}
.msg-empty {
  text-align: center; padding: 60px 0;
  &__text { font-size: 14px; color: #ccc; }
}
.msg-loadmore {
  text-align: center; padding: 16px 0;
  &__text { font-size: 13px; color: #bbb; }
}
</style>
