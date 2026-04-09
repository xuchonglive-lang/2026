<template>
  <app-layout page-title="专业信息">
    <div class="pt-4 pb-12 max-w-[1350px] w-full mx-auto min-h-screen px-6 md:px-0">
      
      <!-- Search Section (70% Width) -->
      <section class="w-full mb-8 flex justify-center">
        <div class="w-[70%] flex items-center bg-zinc-100/80 border border-zinc-200/80 rounded-[14px] shadow-sm focus-within:bg-zinc-100 focus-within:border-zinc-300 transition-all h-[60px] p-1.5">
          <span class="material-symbols-outlined text-zinc-400 text-[22px] pl-4 pr-3 shrink-0">search</span>
          <input v-model="searchQuery" @confirm="onSearch" 
                 class="flex-grow h-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-zinc-900 placeholder:text-zinc-400 text-[16px] px-2 min-w-0"
                 placeholder="在全部分类中搜索资讯内容、标题、发文号..." type="text"/>
          <view @click="onSearch" class="flex items-center justify-center h-full px-10 bg-zinc-900 text-white rounded-[10px] text-[15px] font-bold hover:bg-zinc-800 transition-colors cursor-pointer shrink-0 ml-2 shadow-sm">
            搜索
          </view>
        </div>
      </section>

      <!-- Main Layout: Grid 12 Columns -->
      <div class="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left: Categories (Col 2) -->
        <aside class="w-full lg:col-span-2 shrink-0 bg-white border border-zinc-200 rounded-xl shadow-sm animate-fade-in">
          <div class="flex items-center px-4 py-3 border-b border-zinc-100">
             <h2 class="text-xs font-bold tracking-wider text-zinc-400 uppercase">信息分类</h2>
          </div>
          <nav class="flex flex-col py-2 space-y-0.5 relative overflow-hidden">
            <button class="relative flex items-center h-10 px-5 text-sm transition-colors rounded-none text-left"
               :class="activeCategory === '' ? 'text-zinc-900 font-bold bg-transparent' : 'text-zinc-500 hover:text-zinc-900 bg-transparent'"
               @click.prevent="onCategoryChange('')">
               <div v-if="activeCategory === ''" class="absolute left-0 top-[12px] w-[3px] h-[16px] bg-zinc-900 rounded-r-sm"></div>
               <span>全部信息</span>
            </button>
            <button v-for="cat in categories" :key="cat._id"
               class="relative flex items-center h-10 px-5 text-sm transition-colors rounded-none text-left"
               :class="activeCategory === cat._id ? 'text-zinc-900 font-bold bg-transparent' : 'text-zinc-500 hover:text-zinc-900 bg-transparent'"
               @click.prevent="onCategoryChange(cat._id)">
               <div v-if="activeCategory === cat._id" class="absolute left-0 top-[12px] w-[3px] h-[16px] bg-zinc-900 rounded-r-sm"></div>
               <span>{{ cat.name }}</span>
            </button>
          </nav>
        </aside>

        <!-- Center: Content (Col 7) -->
        <main class="w-full lg:col-span-7 space-y-6">
          <!-- Tabs -->
          <div class="flex items-center space-x-6 border-b border-zinc-200">
            <!-- 未选定父类时，显示全局排序 -->
            <template v-if="!activeCategory">
              <button class="pb-3 text-[15px] transition-colors" 
                 :class="!orderByViews ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'"
                 @click="onSortChange(false)">
                 <span class="relative font-bold">
                   最新发布
                   <div v-if="!orderByViews" class="absolute -bottom-[13px] left-0 w-full h-[3px] bg-zinc-900 rounded-t-sm transition-all"></div>
                 </span>
              </button>
              <button class="pb-3 text-[15px] transition-colors"
                 :class="orderByViews ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'"
                 @click="onSortChange(true)">
                 <span class="relative font-bold">
                   热门浏览
                   <div v-if="orderByViews" class="absolute -bottom-[13px] left-0 w-full h-[3px] bg-zinc-900 rounded-t-sm transition-all"></div>
                 </span>
              </button>
            </template>
            <!-- 选定分类后，显示二级分类子标签 -->
            <template v-else>
              <button class="pb-3 text-[15px] transition-colors" 
                 :class="activeSubCategory === '' ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'"
                 @click="onSubCategoryChange('')">
                 <span class="relative font-bold">
                   全部内容
                   <div v-if="activeSubCategory === ''" class="absolute -bottom-[13px] left-0 w-full h-[3px] bg-zinc-900 rounded-t-sm transition-all"></div>
                 </span>
              </button>
              <button v-for="sub in currentChildCategories" :key="sub._id"
                 class="pb-3 text-[15px] transition-colors"
                 :class="activeSubCategory === sub._id ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'"
                 @click="onSubCategoryChange(sub._id)">
                 <span class="relative font-bold">
                   {{ sub.name }}
                   <div v-if="activeSubCategory === sub._id" class="absolute -bottom-[13px] left-0 w-full h-[3px] bg-zinc-900 rounded-t-sm transition-all"></div>
                 </span>
              </button>
            </template>
          </div>

          <!-- Articles List -->
          <div class="space-y-4">
            <template v-if="articles.length > 0">
               <article v-for="article in articles" :key="article._id"
                        class="p-6 bg-white border border-zinc-200 hover:border-zinc-300 shadow-sm hover:shadow-md transition-all cursor-pointer group rounded-xl relative animate-fade-in"
                        @click="goTo('/pages/info-publish/detail?id=' + article._id)">
                 
                 <div class="flex items-start justify-between gap-4">
                    <h3 class="text-lg font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors leading-snug flex-grow">{{ article.title }}</h3>
                    <span v-if="article.is_sticky" class="px-2 py-1 bg-zinc-900 text-white text-[11px] font-bold rounded-md shrink-0">重点</span>
                 </div>
                 
                 <p v-if="article.summary" class="mt-3 text-sm text-zinc-500 line-clamp-2 leading-relaxed">{{ article.summary }}</p>
                 
                 <div class="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
                   <div class="flex items-center space-x-3">
                     <div class="w-6 h-6 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden">
                       <span class="material-symbols-outlined text-zinc-400 text-[14px]">person</span>
                     </div>
                     <span class="text-xs font-semibold text-zinc-700">{{ article.author || '系统管理员' }}</span>
                     <span class="text-xs text-zinc-400 font-mono">{{ formatDate(article.publish_time || article.created_at) }}</span>
                   </div>
                   <div class="flex items-center space-x-1 flex-row text-zinc-400">
                     <span class="material-symbols-outlined text-[16px]">visibility</span>
                     <span class="text-xs font-medium">{{ article.view_count || 0 }}</span>
                   </div>
                 </div>
               </article>
            </template>
            
            <div v-else-if="!loading" class="py-20 flex flex-col items-center justify-center text-zinc-400">
               <span class="material-symbols-outlined text-[48px] font-light mb-4 opacity-50">search_off</span>
               <span class="text-sm font-medium">暂无相关信息记录</span>
            </div>

            <!-- Pagination -->
            <div class="pt-4 pb-8 flex justify-center" v-show="articles.length > 0 || loading">
               <button v-if="hasMore" @click="loadMore" class="px-6 py-2.5 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors shadow-sm flex items-center disabled:opacity-50" :disabled="loading">
                 <span v-if="loading" class="material-symbols-outlined animate-spin mr-2 text-[18px]">refresh</span>
                 {{ loading ? '加载中...' : '加载更多' }}
               </button>
               <span v-else-if="articles.length > 0" class="text-xs font-medium text-zinc-400 flex items-center gap-2">
                 <span class="w-8 h-[1px] bg-zinc-200"></span> 到底了 <span class="w-8 h-[1px] bg-zinc-200"></span>
               </span>
            </div>
          </div>
        </main>

        <!-- Right: Sidebar (Col 3) -->
        <aside class="w-full lg:col-span-3 space-y-6 hidden lg:block">
          <!-- 静态演示：重要交办 -->
          <div class="bg-white border border-zinc-200 shadow-sm rounded-xl p-5">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
              <h2 class="text-xs font-bold tracking-wider text-zinc-400 uppercase">重要交办 / 备忘</h2>
              <span class="material-symbols-outlined text-zinc-400 text-[18px]">more_horiz</span>
            </div>
            <ul class="space-y-4">
              <li v-for="(item, idx) in importantTasks" :key="idx" class="group cursor-pointer flex flex-col gap-1">
                <p class="text-sm font-medium text-zinc-900 group-hover:underline transition-colors line-clamp-2 leading-tight">{{ item.title }}</p>
                <div class="flex items-center text-xs text-zinc-400 font-mono mt-0.5">
                   <span class="material-symbols-outlined text-[14px] mr-1">schedule</span>
                   {{ item.deadline }}
                </div>
              </li>
            </ul>
          </div>

          <!-- 静态演示：领导交办 -->
          <div class="bg-white border border-zinc-200 shadow-sm rounded-xl p-5">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
              <h2 class="text-xs font-bold tracking-wider text-zinc-400 uppercase">专项事务</h2>
              <span class="material-symbols-outlined text-zinc-400 text-[18px]">assignment</span>
            </div>
            <ul class="space-y-3">
              <li v-for="(item, idx) in leaderTasks" :key="idx" class="p-3 bg-zinc-50 rounded-lg border border-zinc-200 flex flex-col gap-2">
                <p class="text-sm font-bold text-zinc-900 leading-snug">{{ item.title }}</p>
                <div class="flex items-center justify-between">
                   <span class="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-sm bg-zinc-200 text-zinc-700">重点跟进</span>
                   <div class="flex items-center text-[11px] font-mono text-zinc-500">
                     <span class="material-symbols-outlined text-[14px] mr-1">{{ item.icon }}</span>
                     {{ item.deadline }}
                   </div>
                </div>
              </li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'InfoPublishList',
  data() {
    return {
      searchQuery: '',
      activeCategory: '', // '' represents all
      activeSubCategory: '',
      orderByViews: false,
      categories: [],
      articles: [],
      pageIndex: 1,
      pageSize: 10,
      hasMore: true,
      loading: false,
      
      // Right sidebar mocked placeholders for aesthetic demonstration
      importantTasks: [
        { title: '完成本季度安全生产自查报告', deadline: '2025-12-25' },
        { title: '更新专业管理系统底层逻辑架构', deadline: '2025-12-26' },
        { title: '组织召开全员质量提升宣贯会', deadline: '2025-12-27' }
      ],
      leaderTasks: [
        { title: '关于提升生产效率的专项调研课题', deadline: '2025-12-28', icon: 'timer' },
        { title: '核对并确认第三季度财务报表数据', deadline: '2025-12-30', icon: 'event_available' },
      ],
    }
  },
  computed: {
    currentChildCategories() {
      if (!this.activeCategory) return [];
      const parent = this.categories.find(c => c._id === this.activeCategory);
      return parent && parent.children ? parent.children : [];
    }
  },
  onLoad() {
    this.fetchCategories();
    this.refreshList();
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.refreshList().then(() => {
      uni.stopPullDownRefresh();
    });
  },
  // 触底加载更多 (Uniapp native lifecycle, though AppLayout might be scroll container, we rely on page scroll or loadMore button)
  onReachBottom() {
    if (this.hasMore && !this.loading) {
      this.loadMore();
    }
  },
  methods: {
    goTo(path) { uni.navigateTo({ url: path }) },
    formatDate(timestamp) {
      if (!timestamp) return '未知时间';
      const d = new Date(timestamp);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    },

    onSearch() {
       this.refreshList();
    },
    onCategoryChange(catId) {
       this.activeCategory = catId;
       this.activeSubCategory = '';
       this.refreshList();
    },
    onSubCategoryChange(subId) {
       this.activeSubCategory = subId;
       this.refreshList();
    },
    onSortChange(byViews) {
       this.orderByViews = byViews;
       this.refreshList();
    },
    async fetchCategories() {
       try {
         const res = await vk.callFunction({
            url: 'client/info-publish/kh/getCategories'
         });
         if (res.code === 0 && res.rows) {
            this.categories = res.rows;
         }
       } catch (err) {
          console.error('Fetch categories failed:', err);
       }
    },
    async refreshList() {
      this.pageIndex = 1;
      this.hasMore = true;
      this.articles = [];
      await this.loadMore();
    },
    async loadMore() {
      if (!this.hasMore || this.loading) return;
      this.loading = true;
      
      let sortArr = [];
      if (this.orderByViews) {
         sortArr = [{ name: 'view_count', type: 'desc' }];
      } else {
         // Default is usually publish_time / created_at desc, and sticky first
         sortArr = [
            { name: 'is_sticky', type: 'desc' },
            { name: 'publish_time', type: 'desc' }
         ];
      }

      try {
         const res = await vk.callFunction({
            url: 'client/info-publish/kh/getList',
            data: {
               pageIndex: this.pageIndex,
               pageSize: this.pageSize,
               keyword: this.searchQuery,
               category_id: this.activeSubCategory ? this.activeSubCategory : 
                            (this.activeCategory ? [this.activeCategory, ...this.currentChildCategories.map(c => c._id)] : undefined),
               sortArr: sortArr
            }
         });
         
         if (res.code === 0 && res.rows) {
            this.articles = this.articles.concat(res.rows);
            // If rows returned is less than page size, it means no more data
            if (res.rows.length < this.pageSize) {
               this.hasMore = false;
            } else {
               this.pageIndex++;
               this.hasMore = true;
            }
         }
      } catch (err) {
         console.error('Fetch list failed:', err);
         uni.showToast({ title: '加载数据失败', icon: 'none' });
      } finally {
         this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
/* Scoped styles */
</style>
