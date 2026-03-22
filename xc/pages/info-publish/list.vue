<template>
  <app-layout page-title="信息共享">
    <!-- Q24: 一级分类水平滚动 Tab -->
    <view class="cat-tabs">
      <scroll-view scroll-x class="cat-tabs__scroll">
        <view
          v-for="tab in topCategories"
          :key="tab._id"
          class="cat-tabs__item"
          :class="{ 'is-active': selectedTopId === tab._id }"
          @click="selectTopCategory(tab)"
        >
          <text>{{ tab.name }}</text>
        </view>
      </scroll-view>
    </view>

    <!-- Q24: 子分类水平滚动 Tab -->
    <view class="sub-tabs" v-if="subCategories.length > 0">
      <scroll-view scroll-x class="sub-tabs__scroll">
        <view
          class="sub-tabs__item"
          :class="{ 'is-active': selectedSubId === '' }"
          @click="selectSubCategory('')"
        >
          <text>全部</text>
        </view>
        <view
          v-for="sub in subCategories"
          :key="sub._id"
          class="sub-tabs__item"
          :class="{ 'is-active': selectedSubId === sub._id }"
          @click="selectSubCategory(sub._id)"
        >
          <text>{{ sub.name }}</text>
        </view>
      </scroll-view>
    </view>

    <!-- Q11: 搜索栏 -->
    <view class="search-bar">
      <view class="search-bar__inner">
        <text class="search-bar__icon">🔍</text>
        <input
          class="search-bar__input"
          v-model="keyword"
          placeholder="搜索文章标题..."
          confirm-type="search"
          @confirm="onSearch"
        />
        <view v-if="keyword" class="search-bar__clear" @click="clearSearch">
          <text>✕</text>
        </view>
      </view>
    </view>

    <!-- Q16: 文章列表 -->
    <view class="article-list">
      <view
        v-for="item in list"
        :key="item._id"
        class="article-card"
        :class="{ 'has-cover': item.cover_image }"
        @click="goDetail(item)"
      >
        <!-- Q29: 未读蓝点 -->
        <view v-if="!item.is_read" class="article-card__unread-dot"></view>

        <!-- Q16: 有封面图 → 左图右文卡片 -->
        <template v-if="item.cover_image">
          <image
            class="article-card__cover"
            :src="item.cover_image"
            mode="aspectFill"
          ></image>
          <view class="article-card__content">
            <text class="article-card__title" :class="{ 'is-unread': !item.is_read }">{{ item.title }}</text>
            <text class="article-card__summary">{{ item.summary }}</text>
            <view class="article-card__meta">
              <text class="article-card__cat">{{ item.category_info ? item.category_info.name : '' }}</text>
              <text class="article-card__time">{{ formatTime(item.publish_time) }}</text>
            </view>
          </view>
        </template>

        <!-- Q16: 无封面图 → 紧凑文本列表 -->
        <template v-else>
          <view class="article-card__text-only">
            <text class="article-card__title" :class="{ 'is-unread': !item.is_read }">{{ item.title }}</text>
            <text class="article-card__summary">{{ item.summary }}</text>
            <view class="article-card__meta">
              <text class="article-card__cat">{{ item.category_info ? item.category_info.name : '' }}</text>
              <view class="article-card__stats">
                <text class="article-card__stat">👁 {{ item.view_count || 0 }}</text>
                <text class="article-card__stat">💬 {{ item.comment_count || 0 }}</text>
              </view>
              <text class="article-card__time">{{ formatTime(item.publish_time) }}</text>
            </view>
          </view>
        </template>
      </view>

      <!-- 空状态 -->
      <view v-if="list.length === 0 && !loading" class="empty-state">
        <view class="empty-state__icon">📄</view>
        <text class="empty-state__text">暂无文章</text>
      </view>

      <!-- Q28: 加载提示 -->
      <view v-if="loading" class="load-tip">
        <text class="load-tip__text">加载中...</text>
      </view>
      <view v-if="!hasMore && list.length > 0" class="load-tip">
        <text class="load-tip__text">— 已经到底了 —</text>
      </view>
    </view>
  </app-layout>
</template>

<script>
export default {
  data() {
    return {
      categoryTree: [],
      topCategories: [],
      subCategories: [],
      selectedTopId: '',
      selectedSubId: '',
      keyword: '',
      list: [],
      pageIndex: 1,
      pageSize: 10,
      hasMore: true,
      loading: false,
    };
  },
  onShow() {
    this.loadCategories();
    this.refresh();
  },
  onPullDownRefresh() {
    this.refresh();
    uni.stopPullDownRefresh();
  },
  // Q28: 上拉无限加载
  onReachBottom() {
    this.loadMore();
  },
  methods: {
    refresh() {
      this.pageIndex = 1;
      this.hasMore = true;
      this.list = [];
      this.loadList();
    },
    loadCategories() {
      let vk = this.vk;
      vk.callFunction({
        url: 'client/info-publish/kh/getCategories',
        data: {},
        success: (data) => {
          this.categoryTree = data.rows || [];
          // 加入 "全部" 选项
          this.topCategories = [{ _id: '', name: '全部', children: [] }, ...this.categoryTree];
        },
      });
    },
    loadList() {
      if (this.loading) return;
      this.loading = true;
      let vk = this.vk;
      let requestData = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      };
      // 分类筛选（优先子分类，否则用一级分类）
      let catId = this.selectedSubId || this.selectedTopId;
      if (catId) requestData.category_id = catId;
      if (this.keyword) requestData.keyword = this.keyword;

      vk.callFunction({
        url: 'client/info-publish/kh/getList',
        data: requestData,
        success: (data) => {
          let rows = data.rows || [];
          if (this.pageIndex === 1) {
            this.list = rows;
          } else {
            this.list = this.list.concat(rows);
          }
          this.hasMore = data.hasMore !== false && rows.length >= this.pageSize;
          this.loading = false;
        },
        fail: () => {
          this.loading = false;
        },
      });
    },
    loadMore() {
      if (!this.hasMore || this.loading) return;
      this.pageIndex++;
      this.loadList();
    },
    selectTopCategory(tab) {
      this.selectedTopId = tab._id;
      this.selectedSubId = '';
      this.subCategories = tab.children || [];
      this.refresh();
    },
    selectSubCategory(subId) {
      this.selectedSubId = subId;
      this.refresh();
    },
    onSearch() {
      this.refresh();
    },
    clearSearch() {
      this.keyword = '';
      this.refresh();
    },
    goDetail(item) {
      // 点击时标记已读
      if (!item.is_read) {
        item.is_read = true;
        this.vk.callFunction({
          url: 'client/info-publish/kh/markRead',
          data: { article_id: item._id },
        });
      }
      uni.navigateTo({
        url: '/pages/info-publish/detail?_id=' + item._id,
      });
    },
    formatTime(ts) {
      if (!ts) return '';
      let vk = this.vk;
      if (vk && vk.pubfn && vk.pubfn.timeFormat) {
        // 智能时间显示
        let now = Date.now();
        let diff = now - ts;
        if (diff < 60000) return '刚刚';
        if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
        if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
        if (diff < 604800000) return Math.floor(diff / 86400000) + '天前';
        return vk.pubfn.timeFormat(ts, 'yyyy-MM-dd');
      }
      return new Date(ts).toLocaleDateString();
    },
  },
};
</script>

<style lang="scss" scoped>
/* Q24: 一级分类 Tab */
.cat-tabs {
  background: #fff;
  border-bottom: 1px solid var(--color-border-light, #f0f0f0);
  &__scroll {
    white-space: nowrap;
    padding: 0 12px;
  }
  &__item {
    display: inline-block;
    padding: 12px 16px;
    font-size: 15px;
    color: var(--color-text-secondary, #666);
    border-bottom: 2px solid transparent;
    transition: all 0.25s ease;
    &.is-active {
      color: var(--color-primary, #165DFF);
      border-bottom-color: var(--color-primary, #165DFF);
      font-weight: 600;
    }
  }
}

/* Q24: 子分类 Tab */
.sub-tabs {
  background: var(--color-bg-secondary, #fafafa);
  border-bottom: 1px solid var(--color-border-light, #f0f0f0);
  &__scroll {
    white-space: nowrap;
    padding: 0 12px;
  }
  &__item {
    display: inline-block;
    padding: 8px 14px;
    font-size: 13px;
    color: var(--color-text-secondary, #888);
    border-radius: 16px;
    margin: 6px 4px;
    transition: all 0.2s ease;
    &.is-active {
      color: #fff;
      background: var(--color-primary, #165DFF);
    }
  }
}

/* 搜索栏 */
.search-bar {
  padding: 10px 16px;
  background: #fff;
  &__inner {
    display: flex;
    align-items: center;
    background: var(--color-bg-secondary, #f5f6f7);
    border-radius: 20px;
    padding: 0 14px;
    height: 36px;
  }
  &__icon {
    font-size: 14px;
    margin-right: 8px;
    opacity: 0.5;
  }
  &__input {
    flex: 1;
    font-size: 14px;
    background: transparent;
  }
  &__clear {
    padding: 4px 8px;
    cursor: pointer;
    opacity: 0.4;
  }
}

/* Q16: 文章卡片 */
.article-list {
  padding: 8px 16px;
}

.article-card {
  position: relative;
  background: #fff;
  border-radius: 12px;
  margin-bottom: 12px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s ease, transform 0.15s ease;

  &:active {
    transform: scale(0.985);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  /* 有封面的卡片 → 左图右文 */
  &.has-cover {
    display: flex;
    padding: 14px;
  }

  &__unread-dot {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-primary, #165DFF);
    z-index: 2;
    box-shadow: 0 0 0 2px rgba(22, 93, 255, 0.2);
  }

  &__cover {
    width: 110px;
    height: 80px;
    border-radius: 8px;
    flex-shrink: 0;
    margin-right: 14px;
    background: var(--color-bg-secondary, #f5f6f7);
  }

  &__content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* 无封面的卡片 → 纯文本 */
  &__text-only {
    padding: 16px;
  }

  &__title {
    font-size: 15px;
    color: var(--color-text-primary, #1a1a1a);
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    &.is-unread {
      font-weight: 600;
    }
  }

  &__summary {
    font-size: 13px;
    color: var(--color-text-secondary, #999);
    line-height: 1.5;
    margin-top: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__meta {
    display: flex;
    align-items: center;
    margin-top: 8px;
    gap: 8px;
  }

  &__cat {
    font-size: 11px;
    color: var(--color-primary, #165DFF);
    background: rgba(22, 93, 255, 0.08);
    padding: 2px 8px;
    border-radius: 10px;
  }

  &__stats {
    display: flex;
    gap: 8px;
  }

  &__stat {
    font-size: 12px;
    color: var(--color-text-placeholder, #ccc);
  }

  &__time {
    font-size: 12px;
    color: var(--color-text-placeholder, #bbb);
    margin-left: auto;
  }
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 80px 0 60px;
  &__icon {
    font-size: 48px;
    margin-bottom: 12px;
    opacity: 0.3;
  }
  &__text {
    font-size: 14px;
    color: var(--color-text-placeholder, #ccc);
  }
}

/* 加载提示 */
.load-tip {
  text-align: center;
  padding: 16px 0;
  &__text {
    font-size: 13px;
    color: var(--color-text-placeholder, #ccc);
  }
}
</style>
