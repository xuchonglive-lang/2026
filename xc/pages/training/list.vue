<template>
  <app-layout page-title="培训课程">
    <div class="mt-0 mx-auto max-w-[1350px] py-10 flex gap-10 px-4 md:px-0">
      
      <!-- Sidebar -->
      <aside class="w-[200px] shrink-0">
        <h3 class="text-zinc-500 font-bold text-[11px] uppercase tracking-widest mb-4 px-3">培训分类</h3>
        <div class="flex flex-col gap-1">
          <!-- Expanded Category -->
          <div class="group">
            <button class="w-full flex items-center justify-between px-3 py-2 rounded-md bg-zinc-100/80 text-zinc-900 font-semibold text-[13px] transition-colors" @click="expandedCategory = expandedCategory === 'dispatch' ? '' : 'dispatch'">
              <span>调度室指挥</span>
              <span class="material-symbols-outlined text-[16px]">{{ expandedCategory === 'dispatch' ? 'keyboard_arrow_down' : 'keyboard_arrow_right' }}</span>
            </button>
            <div v-if="expandedCategory === 'dispatch'" class="mt-1 ml-4 flex flex-col border-l border-zinc-200">
              <a v-for="sub in ['规章制度','应急流程','设备操作']" :key="sub"
                 class="px-4 py-2 text-[13px] transition-colors cursor-pointer block"
                 :class="activeSubCategory === sub ? 'text-zinc-900 font-bold' : 'text-zinc-500 hover:text-zinc-900 font-medium'"
                 @click.prevent="activeSubCategory = sub">{{ sub }}</a>
            </div>
          </div>
          <a v-for="cat in sideCategories" :key="cat"
             class="flex items-center justify-between px-3 py-2 rounded-md text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 font-medium text-[13px] transition-all cursor-pointer"
             @click.prevent="expandedCategory = cat">
            <span>{{ cat }}</span>
            <span class="material-symbols-outlined text-[16px]">keyboard_arrow_right</span>
          </a>
        </div>
      </aside>

      <!-- Content -->
      <section class="flex-1 min-w-0">
        <!-- Video Courses -->
        <div class="mb-14">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-md bg-zinc-100 flex items-center justify-center">
                <span class="material-symbols-outlined text-[18px] text-zinc-700">movie</span>
              </div>
              <h2 class="text-xl font-extrabold tracking-tight text-zinc-900">视频课程</h2>
            </div>
            <div class="flex border-b border-zinc-200 gap-8">
              <button v-for="tab in courseTabs" :key="tab"
                      class="pb-3 text-[14px] relative transition-colors"
                      :class="activeVideoTab === tab ? 'text-zinc-900 font-bold' : 'text-zinc-500 hover:text-zinc-900 font-medium'"
                      @click="activeVideoTab = tab">
                {{ tab }}
                <div v-if="activeVideoTab === tab" class="absolute bottom-[-1px] left-0 w-full h-[2px] bg-zinc-900"></div>
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="course in videoCourses" :key="course.title"
                 class="group bg-white rounded-xl overflow-hidden border border-zinc-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
                 @click="goTo('/pages/training/video-detail')">
              <div class="relative aspect-video bg-zinc-100 border-b border-zinc-100">
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900/10 backdrop-blur-[1px]">
                  <span class="material-symbols-outlined text-[48px] text-white drop-shadow-md">play_circle</span>
                </div>
                <span class="absolute bottom-2 right-2 px-1.5 py-0.5 bg-zinc-900/80 text-white text-[10px] font-bold tracking-wider rounded backdrop-blur-sm">{{ course.hours }}学时</span>
              </div>
              <div class="p-4 flex flex-col flex-1 justify-between">
                <h4 class="text-zinc-900 font-bold text-[14px] mb-3 leading-snug group-hover:text-zinc-600 transition-colors line-clamp-2">{{ course.title }}</h4>
                <div class="flex items-center justify-between text-zinc-500 text-[12px] font-medium">
                  <div class="flex items-center gap-3">
                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">visibility</span>{{ course.views }}</span>
                    <span>{{ course.date }}</span>
                  </div>
                  <span class="bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded">{{ course.author }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Article Training -->
        <div>
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-md bg-zinc-100 flex items-center justify-center">
                <span class="material-symbols-outlined text-[18px] text-zinc-700">description</span>
              </div>
              <h2 class="text-xl font-extrabold tracking-tight text-zinc-900">图文资料</h2>
            </div>
            <div class="flex border-b border-zinc-200 gap-8">
              <button v-for="tab in courseTabs" :key="tab"
                      class="pb-3 text-[14px] relative transition-colors"
                      :class="activeArticleTab === tab ? 'text-zinc-900 font-bold' : 'text-zinc-500 hover:text-zinc-900 font-medium'"
                      @click="activeArticleTab = tab">
                {{ tab }}
                <div v-if="activeArticleTab === tab" class="absolute bottom-[-1px] left-0 w-full h-[2px] bg-zinc-900"></div>
              </button>
            </div>
          </div>
          <div class="flex flex-col space-y-4">
            <div v-for="article in articleCourses" :key="article.title"
                 class="group bg-white p-5 md:p-6 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 items-start cursor-pointer"
                 @click="goTo('/pages/training/article-detail')">
              <div class="w-full sm:w-[120px] aspect-video sm:aspect-square bg-zinc-50 border border-zinc-100 rounded-lg shrink-0 overflow-hidden flex items-center justify-center group-hover:bg-zinc-100 transition-colors">
                <span class="material-symbols-outlined text-[32px] text-zinc-300 group-hover:text-zinc-400">article</span>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-zinc-900 font-bold text-[16px] mb-2 group-hover:text-zinc-600 transition-colors truncate">{{ article.title }}</h4>
                <p class="text-zinc-500 text-[13px] mb-4 leading-relaxed line-clamp-2">{{ article.summary }}</p>
                <div class="flex flex-wrap items-center gap-4 text-[12px] text-zinc-400 font-medium">
                  <span class="flex items-center gap-1 bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded"><span class="material-symbols-outlined text-[14px]">person</span>{{ article.author }}</span>
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">visibility</span>{{ article.views }} 阅读</span>
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">calendar_today</span>{{ article.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'TrainingList',
  data() {
    return {
      expandedCategory: 'dispatch',
      activeSubCategory: '规章制度',
      activeVideoTab: '调度室指挥',
      activeArticleTab: '调度室指挥',
      sideCategories: ['四防管理', '铲运管理', '安全生产'],
      courseTabs: ['调度室指挥', '计划管理', '组织管理'],
      videoCourses: [
        { title: '调度核心规程培训', hours: 11, views: 0, date: '2025-12-24', author: '管理员' },
        { title: '现场指挥与应急响应', hours: 8, views: 124, date: '2025-12-20', author: '管理员' },
        { title: '安全生产标准化作业指导', hours: 15, views: 45, date: '2025-12-15', author: '管理员' },
      ],
      articleCourses: [
        { title: '关于加强冬季生产安全调度的补充通知', summary: '针对近期极端天气频发，各级调度室需严格执行24小时值班制度，重点监控能源消耗与设备抗寒性能。本文档详细规定了应急预案的启动条件与执行流程...', author: '管理员', views: 312, date: '2025-01-10' },
        { title: '新型智能调度系统的应用指南 (V2.1)', summary: '全新升级的AI辅助调度模块上线，本指南详细介绍了如何利用大数据分析模块进行产能预测，并展示了如何通过三维数字孪生界面进行实时设备管控...', author: '技术部', views: 856, date: '2025-01-05' },
      ],
    }
  },
  methods: {
    goTo(path) { uni.navigateTo({ url: path }) },
  }
}
</script>
