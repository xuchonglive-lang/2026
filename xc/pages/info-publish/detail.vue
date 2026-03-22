<template>
  <app-layout page-title="文章详情" :show-tab-bar="false">
    <!-- Q22: 线性布局 Title/Meta → Content → Attachments → Comments -->
    <view v-if="article" class="detail-page">

      <!-- 标题 & 元信息 -->
      <view class="detail-header">
        <text class="detail-header__title">{{ article.title }}</text>
        <view class="detail-header__meta">
          <view class="detail-header__author" v-if="article.author_info">
            <image
              v-if="article.author_info.avatar"
              class="detail-header__avatar"
              :src="article.author_info.avatar"
              mode="aspectFill"
            ></image>
            <view class="detail-header__avatar-placeholder" v-else>
              <text>{{ (article.author_info.nickname || '?').charAt(0) }}</text>
            </view>
            <text class="detail-header__name">{{ article.author_info.nickname || article.author_info.username }}</text>
          </view>
          <view class="detail-header__info">
            <text class="detail-header__time">{{ formatTime(article.publish_time) }}</text>
            <text class="detail-header__stat">👁 {{ article.view_count || 0 }}</text>
            <text class="detail-header__stat">💬 {{ article.comment_count || 0 }}</text>
          </view>
        </view>
        <view class="detail-header__cat" v-if="article.category_name">
          <text class="detail-header__cat-text">{{ article.category_name }}</text>
        </view>
      </view>

      <!-- Markdown 正文渲染 + 目录导航 -->
      <view class="detail-content-wrapper">
        <!-- PC端左侧悬浮目录 -->
        <view v-if="tocHtml" class="detail-toc" :class="{ 'detail-toc--collapsed': tocCollapsed }">
          <view class="detail-toc__toggle" @click="tocCollapsed = !tocCollapsed">
            <text>{{ tocCollapsed ? '☰ 目录' : '✕ 收起' }}</text>
          </view>
          <view v-show="!tocCollapsed" class="detail-toc__body">
            <rich-text :nodes="tocHtml"></rich-text>
          </view>
        </view>
        <!-- 正文 -->
        <view class="detail-content">
          <rich-text :nodes="renderedContent"></rich-text>
        </view>
      </view>

      <!-- 附件列表 -->
      <view class="detail-attachments" v-if="article.attachments && article.attachments.length > 0">
        <view class="section-title">
          <text class="section-title__text">📎 附件（{{ article.attachments.length }}）</text>
        </view>
        <view
          v-for="(file, idx) in article.attachments"
          :key="idx"
          class="attachment-item"
          @click="previewFile(file)"
        >
          <view class="attachment-item__icon">📄</view>
          <view class="attachment-item__info">
            <text class="attachment-item__name">{{ file.name || '附件' + (idx + 1) }}</text>
            <text class="attachment-item__size" v-if="file.size">{{ formatFileSize(file.size) }}</text>
          </view>
          <text class="attachment-item__action">查看</text>
        </view>
      </view>

      <!-- Q7/Q22: 评论区 -->
      <view class="detail-comments" v-if="article.allow_comment !== false">
        <view class="section-title">
          <text class="section-title__text">💬 评论（{{ article.comment_count || 0 }}）</text>
        </view>

        <!-- 评论输入 -->
        <view class="comment-input">
          <view class="comment-input__row">
            <input
              class="comment-input__field"
              v-model="commentText"
              :placeholder="replyTarget ? '@' + replyTarget.nickname + ' 回复...' : '说点什么...'"
              confirm-type="send"
              @confirm="submitComment"
            />
            <view class="comment-input__btn" @click="submitComment">
              <text class="comment-input__btn-text">发送</text>
            </view>
          </view>
          <view v-if="replyTarget" class="comment-input__reply-tip" @click="cancelReply">
            <text>回复 @{{ replyTarget.nickname }}</text>
            <text class="comment-input__cancel">✕ 取消</text>
          </view>
        </view>

        <!-- Q17: 评论列表（时间正序） -->
        <view class="comment-list">
          <view
            v-for="comment in comments"
            :key="comment._id"
            class="comment-item"
          >
            <!-- 一级评论 -->
            <view class="comment-item__main">
              <image
                v-if="comment.user_info && comment.user_info.avatar"
                class="comment-item__avatar"
                :src="comment.user_info.avatar"
                mode="aspectFill"
              ></image>
              <view class="comment-item__avatar-placeholder" v-else>
                <text>{{ getInitial(comment.user_info) }}</text>
              </view>
              <view class="comment-item__body">
                <view class="comment-item__header">
                  <text class="comment-item__name">{{ getCommentName(comment) }}</text>
                  <text class="comment-item__time">{{ formatTime(comment.created_at) }}</text>
                </view>
                <text class="comment-item__text">{{ comment.content }}</text>
                <view class="comment-item__actions">
                  <view class="comment-item__action" @click="startReply(comment)">
                    <text>回复</text>
                  </view>
                  <view
                    v-if="comment.created_by === currentUid"
                    class="comment-item__action comment-item__action--danger"
                    @click="deleteComment(comment)"
                  >
                    <text>删除</text>
                  </view>
                </view>
              </view>
            </view>

            <!-- Q7: 二级回复 -->
            <view
              v-for="reply in (comment.replies || [])"
              :key="reply._id"
              class="comment-reply"
            >
              <image
                v-if="reply.user_info && reply.user_info.avatar"
                class="comment-reply__avatar"
                :src="reply.user_info.avatar"
                mode="aspectFill"
              ></image>
              <view class="comment-reply__avatar-placeholder" v-else>
                <text>{{ getInitial(reply.user_info) }}</text>
              </view>
              <view class="comment-reply__body">
                <view class="comment-reply__header">
                  <text class="comment-reply__name">{{ getCommentName(reply) }}</text>
                  <text class="comment-reply__reply-to" v-if="reply.reply_to_nickname">
                    → @{{ reply.reply_to_nickname }}
                  </text>
                  <text class="comment-reply__time">{{ formatTime(reply.created_at) }}</text>
                </view>
                <text class="comment-reply__text">{{ reply.content }}</text>
                <view class="comment-reply__actions">
                  <view class="comment-reply__action" @click="startReply(comment, reply)">
                    <text>回复</text>
                  </view>
                  <view
                    v-if="reply.created_by === currentUid"
                    class="comment-reply__action comment-reply__action--danger"
                    @click="deleteComment(reply)"
                  >
                    <text>删除</text>
                  </view>
                </view>
              </view>
            </view>
          </view>

          <!-- 评论分页 -->
          <view v-if="commentHasMore" class="load-more-btn" @click="loadMoreComments">
            <text>{{ commentLoading ? '加载中...' : '查看更多评论' }}</text>
          </view>
          <view v-if="comments.length === 0 && !commentLoading" class="comment-empty">
            <text>暂无评论，来说点什么吧</text>
          </view>
        </view>
      </view>

      <!-- 评论关闭提示 -->
      <view v-else class="comment-closed">
        <text>该文章已关闭评论</text>
      </view>
    </view>

    <!-- 加载状态 -->
    <view v-else class="detail-loading">
      <text>加载中...</text>
    </view>
  </app-layout>
</template>

<script>
import MarkdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';

// 初始化 markdown-it 实例（全局复用）
const md = new MarkdownIt({
  html: false,       // 禁止 HTML 标签，防 XSS
  linkify: true,     // 自动识别 URL
  typographer: true,
  breaks: true,      // 换行符转为 <br>
});
md.use(markdownItAnchor, {
  permalink: false,
  slugify: (s) => encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-')),
});

let tocContent = '';
md.use(markdownItTocDoneRight, {
  containerClass: 'toc-nav',
  listType: 'ul',
  callback: (html) => {
    tocContent = html;
  },
});

export default {
  data() {
    return {
      article: null,
      renderedContent: '',
      tocHtml: '',
      tocCollapsed: true,
      comments: [],
      commentText: '',
      commentPageIndex: 1,
      commentPageSize: 20,
      commentHasMore: true,
      commentLoading: false,
      replyTarget: null,
      replyParentId: '',
      currentUid: '',
    };
  },
  onLoad(options) {
    if (options._id) {
      this.loadArticle(options._id);
      this.loadComments(options._id);
      this.markRead(options._id);
    }
    // 获取当前用户 uid
    let userInfo = uni.getStorageSync('uni_id_token_info') || {};
    this.currentUid = userInfo.uid || '';
  },
  methods: {
    loadArticle(id) {
      let vk = this.vk;
      vk.callFunction({
        url: 'client/info-publish/kh/getInfo',
        data: { _id: id },
        success: (data) => {
          this.article = data.data || data;
          // 简易 Markdown → HTML 渲染（基础版，后续 Phase 0 中 MarkdownViewer 组件替换）
          this.renderedContent = this.renderMarkdown(this.article.content || '');
        },
      });
    },
    markRead(articleId) {
      this.vk.callFunction({
        url: 'client/info-publish/kh/markRead',
        data: { article_id: articleId },
      });
    },
    loadComments(articleId) {
      if (this.commentLoading) return;
      this.commentLoading = true;
      let vk = this.vk;
      vk.callFunction({
        url: 'client/info-publish/kh/getComments',
        data: {
          article_id: articleId || this.article._id,
          pageIndex: this.commentPageIndex,
          pageSize: this.commentPageSize,
        },
        success: (data) => {
          let rows = data.rows || [];
          if (this.commentPageIndex === 1) {
            this.comments = rows;
          } else {
            this.comments = this.comments.concat(rows);
          }
          this.commentHasMore = data.hasMore !== false && rows.length >= this.commentPageSize;
          this.commentLoading = false;
        },
        fail: () => {
          this.commentLoading = false;
        },
      });
    },
    loadMoreComments() {
      if (!this.commentHasMore || this.commentLoading) return;
      this.commentPageIndex++;
      this.loadComments();
    },
    submitComment() {
      if (!this.commentText.trim()) return;
      let vk = this.vk;
      let submitData = {
        article_id: this.article._id,
        content: this.commentText.trim(),
      };
      if (this.replyParentId) {
        submitData.parent_id = this.replyParentId;
      }
      if (this.replyTarget) {
        submitData.reply_to_uid = this.replyTarget.uid;
        submitData.reply_to_nickname = this.replyTarget.nickname;
      }

      vk.callFunction({
        url: 'client/info-publish/kh/addComment',
        title: '发送中...',
        data: submitData,
        success: () => {
          this.commentText = '';
          this.replyTarget = null;
          this.replyParentId = '';
          // 重新加载评论
          this.commentPageIndex = 1;
          this.loadComments();
          // 更新评论计数
          if (this.article) this.article.comment_count = (this.article.comment_count || 0) + 1;
          vk.toast('评论成功');
        },
      });
    },
    startReply(topComment, reply) {
      let target = reply || topComment;
      this.replyParentId = topComment._id;
      this.replyTarget = {
        uid: target.created_by,
        nickname: target.user_info ? (target.user_info.nickname || '用户') : '用户',
      };
    },
    cancelReply() {
      this.replyTarget = null;
      this.replyParentId = '';
    },
    deleteComment(comment) {
      // 软删除（前端标记 is_deleted）
      let vk = this.vk;
      vk.callFunction({
        url: 'client/info-publish/kh/addComment', // 复用——后续可增加 deleteComment 云函数
        title: '删除中...',
        data: { _id: comment._id, action: 'delete' },
        success: () => {
          this.commentPageIndex = 1;
          this.loadComments();
        },
      });
    },
    // Markdown 渲染（使用 markdown-it）
    renderMarkdown(content) {
      if (!content) return '';
      tocContent = '';  // 重置
      let html = md.render(content);
      this.tocHtml = tocContent || '';
      return html;
    },
    formatTime(ts) {
      if (!ts) return '';
      let vk = this.vk;
      if (vk && vk.pubfn && vk.pubfn.timeFormat) {
        let diff = Date.now() - ts;
        if (diff < 60000) return '刚刚';
        if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
        if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
        if (diff < 604800000) return Math.floor(diff / 86400000) + '天前';
        return vk.pubfn.timeFormat(ts, 'yyyy-MM-dd hh:mm');
      }
      return new Date(ts).toLocaleString();
    },
    formatFileSize(bytes) {
      if (!bytes) return '';
      if (bytes < 1024) return bytes + 'B';
      if (bytes < 1048576) return (bytes / 1024).toFixed(1) + 'KB';
      return (bytes / 1048576).toFixed(1) + 'MB';
    },
    previewFile(file) {
      if (file.url) {
        // #ifdef H5
        window.open(file.url);
        // #endif
        // #ifndef H5
        uni.openDocument({ filePath: file.url });
        // #endif
      }
    },
    getInitial(userInfo) {
      if (userInfo && userInfo.nickname) return userInfo.nickname.charAt(0);
      return '?';
    },
    getCommentName(comment) {
      if (comment.user_info) return comment.user_info.nickname || '用户';
      return '用户';
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-page {
  padding-bottom: 40px;
  padding-bottom: calc(40px + env(safe-area-inset-bottom));
}

/* 标题 & 元信息 */
.detail-header {
  background: #fff;
  padding: 24px 20px 16px;
  &__title {
    font-size: 22px;
    font-weight: 700;
    color: var(--color-text-primary, #1a1a1a);
    line-height: 1.4;
  }
  &__meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    flex-wrap: wrap;
    gap: 8px;
  }
  &__author {
    display: flex;
    align-items: center;
  }
  &__avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 8px;
  }
  &__avatar-placeholder {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
  }
  &__name {
    font-size: 14px;
    color: var(--color-text-primary, #333);
    font-weight: 500;
  }
  &__info {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  &__time {
    font-size: 13px;
    color: var(--color-text-placeholder, #bbb);
  }
  &__stat {
    font-size: 13px;
    color: var(--color-text-placeholder, #bbb);
  }
  &__cat {
    margin-top: 12px;
  }
  &__cat-text {
    font-size: 12px;
    color: var(--color-primary, #165DFF);
    background: rgba(22, 93, 255, 0.08);
    padding: 3px 10px;
    border-radius: 12px;
  }
}

/* 正文 + 目录两栏布局 */
.detail-content-wrapper {
  display: flex;
  margin-top: 8px;
  gap: 0;
}

/* 左侧目录导航 */
.detail-toc {
  width: 220px;
  flex-shrink: 0;
  position: sticky;
  top: 84px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  background: #fff;
  border-right: 1px solid #f0f0f0;
  padding: 16px;
  &__toggle {
    display: none;
    padding: 8px 12px;
    font-size: 13px;
    color: var(--color-primary, #165DFF);
    cursor: pointer;
    text-align: center;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }
  &__body {
    font-size: 13px;
    line-height: 1.8;
    color: var(--color-text-secondary, #666);
  }
}

/* 正文 */
.detail-content {
  flex: 1;
  min-width: 0;
  background: #fff;
  padding: 20px;
  font-size: 15px;
  line-height: 1.8;
  color: var(--color-text-primary, #333);
}

/* H5 自适应：目录折叠 */
@media screen and (max-width: 768px) {
  .detail-content-wrapper {
    flex-direction: column;
  }
  .detail-toc {
    width: 100%;
    position: relative;
    top: 0;
    max-height: none;
    border-right: none;
    border-bottom: 1px solid #f0f0f0;
    padding: 0;
    &__toggle {
      display: block;
    }
    &__body {
      padding: 0 16px 12px;
    }
  }
}

/* 附件 */
.section-title {
  margin-bottom: 12px;
  &__text {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-primary, #333);
  }
}

.detail-attachments {
  background: #fff;
  padding: 20px;
  margin-top: 8px;
}

.attachment-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: var(--color-bg-secondary, #f8f9fa);
  border-radius: 8px;
  margin-bottom: 8px;
  transition: background 0.2s;
  &__icon {
    font-size: 24px;
    margin-right: 12px;
    flex-shrink: 0;
  }
  &__info {
    flex: 1;
    min-width: 0;
  }
  &__name {
    font-size: 14px;
    color: var(--color-text-primary, #333);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__size {
    font-size: 12px;
    color: var(--color-text-placeholder, #bbb);
    margin-top: 2px;
  }
  &__action {
    font-size: 13px;
    color: var(--color-primary, #165DFF);
    flex-shrink: 0;
    margin-left: 12px;
  }
}

/* 评论区 */
.detail-comments {
  background: #fff;
  padding: 20px;
  margin-top: 8px;
}

.comment-input {
  margin-bottom: 20px;
  &__row {
    display: flex;
    align-items: center;
    background: var(--color-bg-secondary, #f5f6f7);
    border-radius: 22px;
    padding: 4px 4px 4px 16px;
  }
  &__field {
    flex: 1;
    font-size: 14px;
    background: transparent;
    height: 36px;
    line-height: 36px;
  }
  &__btn {
    background: var(--color-primary, #165DFF);
    color: #fff;
    border-radius: 18px;
    padding: 8px 20px;
    flex-shrink: 0;
    transition: opacity 0.2s;
    &:active {
      opacity: 0.7;
    }
  }
  &__btn-text {
    font-size: 14px;
    color: #fff;
    font-weight: 500;
  }
  &__reply-tip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 16px;
    font-size: 12px;
    color: var(--color-text-secondary, #999);
    cursor: pointer;
  }
  &__cancel {
    color: var(--color-primary, #165DFF);
    margin-left: 8px;
  }
}

.comment-list {
  margin-top: 4px;
}

.comment-item {
  margin-bottom: 4px;
  &__main {
    display: flex;
    padding: 12px 0;
    border-bottom: 1px solid var(--color-border-light, #f0f0f0);
  }
  &__avatar, &__avatar-placeholder {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-right: 12px;
  }
  &__avatar-placeholder {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
  }
  &__body {
    flex: 1;
    min-width: 0;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }
  &__name {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-primary, #333);
  }
  &__time {
    font-size: 12px;
    color: var(--color-text-placeholder, #ccc);
  }
  &__text {
    font-size: 14px;
    color: var(--color-text-primary, #444);
    line-height: 1.6;
  }
  &__actions {
    display: flex;
    gap: 16px;
    margin-top: 6px;
  }
  &__action {
    font-size: 12px;
    color: var(--color-text-secondary, #999);
    cursor: pointer;
    &--danger { color: #f56c6c; }
  }
}

/* 二级回复 */
.comment-reply {
  display: flex;
  padding: 10px 0 10px 48px;
  border-bottom: 1px solid var(--color-border-light, #f5f5f5);
  &__avatar, &__avatar-placeholder {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-right: 10px;
  }
  &__avatar-placeholder {
    background: linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 11px;
    font-weight: 600;
  }
  &__body { flex: 1; min-width: 0; }
  &__header {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 2px;
    flex-wrap: wrap;
  }
  &__name { font-size: 13px; font-weight: 500; color: var(--color-text-primary, #333); }
  &__reply-to { font-size: 12px; color: var(--color-text-secondary, #999); }
  &__time { font-size: 11px; color: var(--color-text-placeholder, #ccc); margin-left: auto; }
  &__text { font-size: 13px; color: var(--color-text-primary, #555); line-height: 1.5; }
  &__actions { display: flex; gap: 12px; margin-top: 4px; }
  &__action {
    font-size: 11px; color: var(--color-text-secondary, #aaa); cursor: pointer;
    &--danger { color: #f56c6c; }
  }
}

.load-more-btn {
  text-align: center;
  padding: 14px 0;
  font-size: 13px;
  color: var(--color-primary, #165DFF);
  cursor: pointer;
}

.comment-empty {
  text-align: center;
  padding: 30px 0;
  font-size: 13px;
  color: var(--color-text-placeholder, #ccc);
}

.comment-closed {
  background: #fff;
  padding: 30px 20px;
  margin-top: 8px;
  text-align: center;
  font-size: 13px;
  color: var(--color-text-placeholder, #ccc);
}

.detail-loading {
  text-align: center;
  padding: 80px 0;
  font-size: 14px;
  color: var(--color-text-placeholder, #ccc);
}
</style>
