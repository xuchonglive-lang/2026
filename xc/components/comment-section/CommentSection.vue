<template>
  <section class="mt-8 comment-section">
    <h3 class="font-extrabold text-zinc-900 text-lg mb-6 flex items-center gap-2">
      评论 <span class="bg-zinc-100 text-zinc-600 text-[11px] px-2 py-0.5 rounded-full">{{ totalCount }}</span>
    </h3>
    
    <!-- Top-level comment input -->
    <div class="flex gap-4 mb-8">
      <div class="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 shrink-0 flex items-center justify-center overflow-hidden">
        <span class="material-symbols-outlined text-[18px] text-zinc-400">person</span>
      </div>
      <div class="flex-grow">
        <textarea v-model="newComment" class="w-full h-24 p-4 bg-white border border-zinc-200 rounded-lg focus:border-zinc-400 focus:outline-none transition-all resize-none text-[14px] placeholder:text-zinc-400 shadow-sm" placeholder="分享你的想法..."></textarea>
        <div class="mt-3 flex justify-end">
          <button @click="submitTopComment" class="px-5 py-2 bg-zinc-900 text-white rounded-md text-[13px] font-semibold hover:bg-zinc-800 transition-colors shadow-sm disabled:opacity-50" :disabled="isSubmitting || !newComment.trim()">
            {{ isSubmitting ? '发送中...' : '发表评论' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Comments List -->
    <div class="space-y-6">
      <div v-for="comment in commentTree" :key="comment._id" class="flex flex-col gap-4">
        
        <!-- Main Comment -->
        <div class="flex gap-4 p-4 rounded-xl border border-zinc-100 bg-zinc-50/50">
          <div class="w-8 h-8 rounded-full bg-zinc-200 shrink-0 flex items-center justify-center mt-0.5 overflow-hidden">
            <span class="material-symbols-outlined text-[16px] text-zinc-500 font-light">account_circle</span>
          </div>
          <div class="flex-grow min-w-0">
            <div class="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
              <span class="text-[13px] font-bold text-zinc-900">{{ (comment.user_info && comment.user_info.nickname) || comment.author_nickname || '匿名用户' }}</span>
              <span class="text-[11px] font-mono text-zinc-400">{{ formatDate(comment.created_at) }}</span>
            </div>
            <p class="text-[14px] text-zinc-700 leading-relaxed">{{ comment.content }}</p>
            <div class="mt-3 flex gap-4">
              <button @click="toggleLike(comment)" class="text-[12px] hover:text-zinc-900 transition-colors flex items-center gap-1 font-medium" :class="comment.isLiked ? 'text-zinc-900' : 'text-zinc-400'">
                <span class="material-symbols-outlined text-[16px]">thumb_up</span> 
                {{ comment.likes_count > 0 ? comment.likes_count : '点赞' }}
              </button>
              <button @click="openReplyBox(comment._id, comment)" class="text-[12px] text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1 font-medium">
                <span class="material-symbols-outlined text-[16px]">reply</span> 回复
              </button>
            </div>
          </div>
        </div>

        <!-- Replies List (Nested) -->
        <div v-if="comment.replies && comment.replies.length > 0" class="pl-12 flex flex-col gap-3 -mt-2 relative">
            <div class="absolute left-[24px] top-4 bottom-4 w-[2px] bg-zinc-100 rounded-full"></div>
            <div v-for="reply in comment.replies" :key="reply._id" class="flex gap-3 p-3 rounded-r-xl border-l-[3px] border-zinc-300 border-y border-r border-zinc-100/50 bg-zinc-50 z-10 box-border transition-colors hover:border-zinc-400">
              <div class="w-7 h-7 rounded-full bg-white border border-zinc-200 shrink-0 flex items-center justify-center overflow-hidden">
                <span class="material-symbols-outlined text-[16px] text-zinc-400 font-light">account_circle</span>
              </div>
              <div class="flex-grow min-w-0">
                <div class="flex items-center gap-2 mb-1 flex-wrap">
                  <span class="text-[12px] font-bold text-zinc-900">{{ (reply.user_info && reply.user_info.nickname) || reply.author_nickname || '匿名用户' }}</span>
                  <span class="text-[11px] text-zinc-400 font-medium" v-if="reply.reply_to_uid">
                    回复 <span class="font-bold text-blue-500">@{{ reply.reply_to_nickname || '楼主' }}</span>
                  </span>
                  <span class="text-[10px] font-mono text-zinc-400 ml-auto">{{ formatDate(reply.created_at) }}</span>
                </div>
                <p class="text-[13px] text-zinc-700 leading-relaxed">{{ reply.content }}</p>
                <div class="mt-2 flex gap-4">
                  <button @click="toggleLike(reply)" class="text-[11px] hover:text-zinc-900 transition-colors flex items-center gap-1 font-medium" :class="reply.isLiked ? 'text-zinc-900' : 'text-zinc-400'">
                    点赞 <span v-if="reply.likes_count">{{ reply.likes_count }}</span>
                  </button>
                  <button @click="openReplyBox(comment._id, reply)" class="text-[11px] text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1 font-medium">
                    回复
                  </button>
                </div>
              </div>
            </div>
        </div>
        
        <!-- Reply Input Box -->
        <div v-if="activeReplyId === comment._id" class="pl-12 -mt-1 mb-2 animate-fade-in flex gap-3">
           <div class="flex-grow">
               <textarea v-model="replyCommentText" ref="replyInput" class="w-full h-16 p-3 bg-white border border-zinc-200 rounded-md focus:border-zinc-400 focus:outline-none transition-all resize-none text-[13px] placeholder:text-zinc-400 shadow-sm" :placeholder="'回复 ' + (activeReplyTarget.user_info ? activeReplyTarget.user_info.nickname : '某人') + '...'"></textarea>
               <div class="mt-2 flex justify-end gap-2">
                 <button @click="closeReplyBox" class="px-3 py-1.5 bg-zinc-100 text-zinc-600 rounded-md text-[12px] font-medium hover:bg-zinc-200 transition-colors">取消</button>
                 <button @click="submitReply(comment._id)" class="px-3 py-1.5 bg-zinc-900 text-white rounded-md text-[12px] font-medium hover:bg-zinc-800 transition-colors shadow-sm disabled:opacity-50" :disabled="isSubmitting || !replyCommentText.trim()">{{ isSubmitting ? '发送中...' : '回复' }}</button>
               </div>
           </div>
        </div>

      </div>

      <!-- Loading and Empty States -->
      <div v-if="loading" class="py-10 flex justify-center text-zinc-400 text-sm">
         <span class="material-symbols-outlined animate-spin mr-2">refresh</span> 加载中...
      </div>
      <div v-else-if="commentTree.length === 0" class="py-12 flex flex-col items-center justify-center text-zinc-400">
         <span class="material-symbols-outlined text-[48px] font-light mb-3 opacity-50">forum</span>
         <span class="text-[13px] font-medium">暂无评论，快来抢沙发吧~</span>
      </div>
      
    </div>
  </section>
</template>

<script>
export default {
  name: 'CommentSection',
  props: {
    target_type: {
      type: String,
      required: true
    },
    target_id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      comments: [],
      newComment: '',
      loading: false,
      isSubmitting: false,
      totalCount: 0,
      
      activeReplyId: null,      
      activeReplyTarget: null, 
      replyCommentText: ''
    }
  },
  computed: {
    commentTree() {
      // 后端云函数已经组装好两层子回复结构在 replies 数组中，不需要前端覆写
      return [...this.comments].sort((a, b) => b.created_at - a.created_at);
    }
  },
  watch: {
    target_id: {
      immediate: true,
      handler(val) {
        if (val) {
          this.fetchComments();
        }
      }
    }
  },
  methods: {
    formatDate(timestamp) {
      if (!timestamp) return '';
      const d = new Date(timestamp);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    },
    async fetchComments() {
      if (!this.target_id) return;
      this.loading = true;
      try {
        const res = await vk.callFunction({
          url: 'client/info-publish/kh/getComments',
          data: {
            target_type: this.target_type,
            target_id: this.target_id,
            article_id: this.target_id // for compatibility with backend info-publish getComments
          }
        });
        if (res.code === 0) {
          this.comments = res.rows || [];
          this.totalCount = res.total || this.comments.length;
        }
      } catch (err) {
        console.error('Fetch comments failed:', err);
      } finally {
        this.loading = false;
      }
    },
    openReplyBox(parentId, targetComment) {
       this.activeReplyId = parentId;
       this.activeReplyTarget = targetComment;
       this.replyCommentText = '';
       this.replyNickname = (targetComment.user_info && targetComment.user_info.nickname) || targetComment.author_nickname || '楼主';
       this.$nextTick(() => {
          if (this.$refs.replyInput && this.$refs.replyInput.length > 0) {
             this.$refs.replyInput[0].focus();
          } else if (this.$refs.replyInput) {
             this.$refs.replyInput.focus();
          }
       });
    },
    closeReplyBox() {
       this.activeReplyId = null;
       this.activeReplyTarget = null;
       this.replyCommentText = '';
    },
    async submitTopComment() {
       if (!this.newComment.trim()) return;
       await this.performSubmit(this.newComment, null, null);
       this.newComment = '';
    },
    async submitReply(parentId) {
       if (!this.replyCommentText.trim()) return;
       
       let replyToUser = null;
       if (this.activeReplyTarget._id !== parentId && this.activeReplyTarget.created_by) {
           replyToUser = this.activeReplyTarget.created_by;
       }
       
       await this.performSubmit(this.replyCommentText, parentId, replyToUser);
       this.closeReplyBox();
    },
    async performSubmit(content, parentId, replyToUserId) {
      this.isSubmitting = true;
      // vk.callFunction
      try {
        const res = await vk.callFunction({
          url: 'client/info-publish/kh/addComment',
          data: {
            target_type: this.target_type,
            target_id: this.target_id,
            article_id: this.target_id,
            content: content,
            parent_id: parentId,
            reply_to_uid: replyToUserId,
            reply_to_nickname: this.replyNickname // 如果有的话传入
          }
        });
        if (res.code === 0) {
          uni.showToast({ title: '评论成功', icon: 'success' });
          this.fetchComments(); 
        } else {
           uni.showToast({ title: res.msg || '评论失败', icon: 'none' });
        }
      } catch (err) {
        uni.showToast({ title: '暂时不支持互动哦', icon: 'none' });
      } finally {
         this.isSubmitting = false;
      }
    },
    async toggleLike(comment) {
       // Mock UI update logic only, real DB interaction deferred
       if (comment.isLiked) {
           comment.likes_count = Math.max(0, (comment.likes_count || 0) - 1);
       } else {
           comment.likes_count = (comment.likes_count || 0) + 1;
       }
       // force reactivity
       this.$set(comment, 'isLiked', !comment.isLiked);
    }
  }
}
</script>
