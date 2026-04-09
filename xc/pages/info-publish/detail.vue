<template>
  <app-layout page-title="信息详情">
    <div class="pt-6 pb-12 w-full max-w-[1350px] mx-auto px-6 md:px-0 min-h-screen">
      

      <div v-if="loading" class="flex justify-center py-20">
         <div class="flex flex-col items-center gap-4 text-zinc-400">
           <span class="material-symbols-outlined animate-spin text-3xl">refresh</span>
           <span class="text-sm">加载中...</span>
         </div>
      </div>
      
      <div v-else-if="!article" class="flex justify-center py-20">
         <div class="flex flex-col items-center gap-4 text-zinc-400">
           <span class="material-symbols-outlined text-[48px] font-light">find_in_page</span>
           <span class="text-sm">内容不存在或已被删除</span>
         </div>
      </div>

      <div v-else class="flex flex-col lg:flex-row items-start gap-8 w-full">
        <!-- Main Middle Area (TOC + Article) -->
        <div class="flex-grow min-w-0 w-full mt-0">
          <markdown-viewer class="block w-full mt-0" :content="article.content">
             <!-- Sidebar Top: Show Author Avatar -->
             <template #sidebar-top>
               <div class="bg-white border border-zinc-200 shadow-sm p-6 rounded-2xl flex items-center gap-4 mt-0">
                   <div class="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0">
                     <span class="material-symbols-outlined text-[20px] text-zinc-400 font-light">person</span>
                   </div>
                   <div class="flex flex-col">
                      <span class="text-[13px] font-bold text-zinc-900 truncate max-w-[140px]">{{ article.author || '未知发布人' }}</span>
                      <span class="text-[11px] text-zinc-500 font-medium">信息发布方</span>
                   </div>
                </div>
             </template>

             <!-- HEADER SLOT -->
             <template #header>
                <header class="mb-10 lg:pr-10">
                  <h1 class="text-[28px] md:text-[36px] font-extrabold text-zinc-900 leading-[1.2] mb-6 tracking-tight mt-0">{{ article.title }}</h1>
                  <div class="flex flex-wrap items-center gap-4 text-[13px] text-zinc-500 font-medium border-y border-zinc-100 py-3">
                    <span v-if="article.is_sticky" class="px-2 py-0.5 bg-zinc-900 text-white text-[11px] font-bold rounded-sm">重点/置顶</span>
                    <span v-if="article.category_name" class="px-2 py-0.5 bg-zinc-100 text-zinc-700 text-[11px] font-bold rounded-sm">{{ article.category_name }}</span>
                    <div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">person</span><span>{{ article.author || '系统' }}</span></div>
                    <div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">calendar_today</span><span>{{ formatDate(article.publish_time || article.created_at) }}</span></div>
                    <div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">visibility</span><span>{{ article.view_count || 0 }} 阅读</span></div>
                  </div>
                </header>
             </template>

             <!-- FOOTER SLOT -->
             <template #footer>
                <div class="h-[1px] bg-zinc-100 w-full mt-10 mb-8"></div>
                
                <attachment-list :attachments="article.attachments" v-if="article.attachments && article.attachments.length > 0" />
                
                <comment-section :target_type="'info-publish'" :target_id="articleId" />
             </template>
          </markdown-viewer>
        </div>

        <!-- Right Sidebar (Recent Viewers) -->
        <aside class="w-full lg:w-[280px] shrink-0 sticky top-24 mt-0">
          <div class="bg-white border border-zinc-200 shadow-sm rounded-2xl p-6 mt-0">
             <h3 class="text-sm font-bold tracking-wider text-zinc-900 mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px]">visibility</span>
                近期访客足迹
                <span class="text-[10px] bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full ml-auto">{{ article.view_count || 0 }}</span>
             </h3>
             <div class="flex flex-wrap gap-2">
                 <div class="flex mt-1 flex-wrap gap-2" v-if="article.recent_viewers && article.recent_viewers.length > 0">
                    <div v-for="viewer in article.recent_viewers" :key="viewer.user_id" class="group relative flex items-center">
                         <!-- Avatar item -->
                         <div class="w-9 h-9 rounded-full ring-2 ring-white bg-zinc-100 border-zinc-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm transition-transform hover:z-10 hover:scale-110 cursor-pointer">
                            <img v-if="viewer.user_info && viewer.user_info.avatar" :src="viewer.user_info.avatar" class="w-full h-full object-cover" />
                            <span v-else class="text-[11px] font-bold text-zinc-400">{{ (viewer.user_info && viewer.user_info.nickname ? viewer.user_info.nickname.substring(0,1) : '名') }}</span>
                         </div>
                         <!-- Hover tooltip -->
                         <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-20 shadow-md">
                            {{ viewer.user_info && viewer.user_info.nickname ? viewer.user_info.nickname : '匿名访客' }}
                         </div>
                    </div>
                 </div>
                 <p v-else class="text-[13px] text-zinc-400 mt-2">暂无访客记录</p>
             </div>
             <div class="mt-6 pt-4 border-t border-zinc-100 flex justify-center">
                 <div class="text-[11px] text-zinc-400 flex items-center gap-1">
                    <span class="material-symbols-outlined text-[12px]">info</span>
                    系统仅保留最新 8 次阅读足迹
                 </div>
             </div>
          </div>
        </aside>
      </div>
      
    </div>
  </app-layout>
</template>

<script>
import MarkdownViewer from '../../components/markdown-viewer/MarkdownViewer.vue'
import AttachmentList from '../../components/attachment/AttachmentList.vue'
import CommentSection from '../../components/comment-section/CommentSection.vue'

export default {
  name: 'InfoPublishDetail',
  components: {
    MarkdownViewer,
    AttachmentList,
    CommentSection
  },
  data() {
    return {
      articleId: '',
      loading: true,
      article: null
    }
  },
  onLoad(options) {
    if (options.id) {
      this.articleId = options.id;
      this.fetchDetail();
    } else {
      this.loading = false;
    }
  },
  onShareAppMessage() {
     return {
        title: this.article ? this.article.title : '信息共享',
        path: `/pages/info-publish/detail?id=${this.articleId}`
     }
  },
  methods: {
    formatDate(timestamp) {
      if (!timestamp) return '发布于未知时间';
      const d = new Date(timestamp);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    },
    goBack() {
      // #ifdef H5
      if (window.history.length > 1) {
        uni.navigateBack();
      } else {
        uni.redirectTo({ url: '/pages/info-publish/list' });
      }
      // #endif
      // #ifndef H5
      if (getCurrentPages().length > 1) {
        uni.navigateBack();
      } else {
        uni.redirectTo({ url: '/pages/info-publish/list' });
      }
      // #endif
    },
    async fetchDetail() {
      if (!this.articleId) return;
      this.loading = true;
      try {
        const res = await vk.callFunction({
          url: 'client/info-publish/kh/getInfo', 
          data: {
            _id: this.articleId,
            markRead: true // Trigger view count increment and user read history
          }
        });
        if (res.code === 0 && (res.data || res.info)) {
          this.article = res.data || res.info;
        } else {
          uni.showToast({ title: res.msg || '加载失败', icon: 'none' });
        }
      } catch (err) {
        console.error('Fetch detail error:', err);
        uni.showToast({ title: '网络异常获取失败', icon: 'none' });
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style>
/* Base global styles override for robust UI */
</style>
