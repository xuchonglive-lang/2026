<template>
  <app-layout page-title="培训课程详情">
    <div class="pt-8 pb-20 max-w-[1350px] mx-auto px-4 md:px-0">
      
      <div class="mb-6">
        <button class="inline-flex items-center text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors" @click="goBack">
          <span class="material-symbols-outlined text-[16px] mr-1">arrow_back</span>
          返回课程列表
        </button>
      </div>

      <!-- Video Player Section -->
      <section class="flex flex-col lg:flex-row gap-6 mb-8">
        <!-- Playlist Sidebar -->
        <aside class="w-full lg:w-[300px] flex-shrink-0 bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div class="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
            <h3 class="font-bold text-zinc-900 flex items-center gap-2 text-[14px]">
              <span class="material-symbols-outlined text-[18px]">format_list_bulleted</span>
              课程目录
            </h3>
            <span class="text-[12px] font-medium text-zinc-500 bg-white border border-zinc-200 px-2 rounded">{{ chapters.length }} 节</span>
          </div>
          <div class="overflow-y-auto max-h-[400px] lg:max-h-none flex-grow">
            <div v-for="(ch, idx) in chapters" :key="idx"
                 class="px-4 py-3.5 flex items-center justify-between text-[13px] cursor-pointer transition-colors border-b border-zinc-100 last:border-0"
                 :class="activeChapter === idx ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-600 hover:bg-zinc-50'"
                 @click="activeChapter = idx">
              <span class="flex items-center gap-3">
                <span v-if="activeChapter === idx" class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">play_circle</span>
                <span v-else class="text-[12px] font-mono text-zinc-400">{{ String(idx + 1).padStart(2, '0') }}</span>
                <span class="truncate" :class="activeChapter === idx ? 'font-semibold' : 'font-medium'">{{ ch.title }}</span>
              </span>
              <span class="text-[12px] font-mono" :class="activeChapter === idx ? 'text-zinc-300' : 'text-zinc-400'">{{ ch.duration }}</span>
            </div>
          </div>
        </aside>
        
        <!-- Video Player -->
        <div class="flex-grow aspect-video bg-black rounded-xl relative overflow-hidden group shadow-md border border-zinc-200/20">
          <div class="absolute inset-0 flex items-center justify-center">
            <button class="w-20 h-20 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all group-hover:scale-110 border border-white/20">
               <span class="material-symbols-outlined text-white text-[48px] ml-2" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
            </button>
          </div>
          <!-- Video Controls -->
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12 pb-6 px-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div class="w-full h-1.5 bg-white/20 rounded-full mb-5 relative cursor-pointer hover:h-2 transition-all">
              <div class="absolute top-0 left-0 h-full w-1/3 bg-white rounded-full"></div>
              <div class="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
            </div>
            <div class="flex items-center justify-between text-white">
              <div class="flex items-center gap-5">
                <span class="material-symbols-outlined cursor-pointer hover:text-zinc-300 transition-colors text-[24px]" style="font-variation-settings: 'FILL' 1;">pause</span>
                <span class="material-symbols-outlined cursor-pointer hover:text-zinc-300 transition-colors text-[24px]" style="font-variation-settings: 'FILL' 1;">skip_next</span>
                <span class="material-symbols-outlined cursor-pointer hover:text-zinc-300 transition-colors text-[20px]">volume_up</span>
                <span class="text-[13px] font-mono tracking-wide ml-2">04:12 / 12:45</span>
              </div>
              <div class="flex items-center gap-5">
                <span class="text-[12px] font-bold px-2 py-0.5 rounded bg-white/20 hover:bg-white/30 transition-colors cursor-pointer">1.0x</span>
                <span class="material-symbols-outlined cursor-pointer hover:text-zinc-300 transition-colors text-[20px]">settings</span>
                <span class="material-symbols-outlined cursor-pointer hover:text-zinc-300 transition-colors text-[24px]">fullscreen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Course Info -->
      <section class="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div class="p-8 md:p-10">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div class="flex items-center gap-2 mb-3">
                 <span class="px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100 font-bold text-[11px] uppercase tracking-wider">安全管理</span>
              </div>
              <h1 class="text-[28px] font-black text-zinc-900 tracking-tight mb-4">安全管理培训课程</h1>
              <div class="flex flex-wrap items-center gap-4 text-[13px] text-zinc-500 font-medium">
                <div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">person</span>管理员</div>
                <div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">calendar_today</span>2025-12-21</div>
                <div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">visibility</span>30 次观看</div>
                <div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">schedule</span>总计 46 分钟</div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <button class="h-10 px-6 bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-50 rounded-md font-semibold text-[13px] transition-colors shadow-sm flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px]">bookmark_add</span>收藏
              </button>
              <button class="h-10 px-6 bg-zinc-900 border border-zinc-900 text-white hover:bg-zinc-800 rounded-md font-semibold text-[13px] transition-colors shadow-sm flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px]">share</span>分享
              </button>
            </div>
          </div>

          <!-- Tabs -->
          <div class="border-b border-zinc-200 mb-8">
            <div class="flex gap-8">
              <button v-for="tab in infoTabs" :key="tab"
                      class="pb-3 text-[14px] relative transition-colors"
                      :class="activeInfoTab === tab ? 'text-zinc-900 font-bold' : 'text-zinc-500 hover:text-zinc-900 font-medium'"
                      @click="activeInfoTab = tab">
                {{ tab }}
                <div v-if="activeInfoTab === tab" class="absolute bottom-[-1px] left-0 w-full h-[2px] bg-zinc-900"></div>
              </button>
            </div>
          </div>

          <!-- Content -->
          <article class="prose prose-zinc max-w-none text-[14px] leading-loose text-zinc-700">
            <h3 class="text-[18px] font-bold text-zinc-900 mb-4 tracking-tight">关于这门课程</h3>
            <p class="mb-6">这门课程旨在提供全面的安全生产管理知识。包括安全生产规章制度的建立、危险源辨识与风险评估、应急预案的编写与演练等核心板块。</p>
            
            <div class="grid md:grid-cols-2 gap-6 p-6 bg-zinc-50 rounded-xl border border-zinc-100 my-8">
              <div>
                <h4 class="font-bold text-zinc-900 mb-3 flex items-center gap-2">
                  <span class="material-symbols-outlined text-zinc-900 text-[18px]">flag</span>学习目标
                </h4>
                <ul class="list-none space-y-2 m-0 p-0 text-[13px]">
                  <li class="flex items-start gap-2"><span class="material-symbols-outlined text-[16px] text-zinc-400 mt-0.5">check</span>掌握最新的安全生产法律法规</li>
                  <li class="flex items-start gap-2"><span class="material-symbols-outlined text-[16px] text-zinc-400 mt-0.5">check</span>学会科学的风险等级划分方法</li>
                  <li class="flex items-start gap-2"><span class="material-symbols-outlined text-[16px] text-zinc-400 mt-0.5">check</span>熟悉常用特种设备的安全操作流程</li>
                </ul>
              </div>
              <div>
                <h4 class="font-bold text-zinc-900 mb-3 flex items-center gap-2">
                  <span class="material-symbols-outlined text-zinc-900 text-[18px]">groups</span>适用人群
                </h4>
                <ul class="list-none space-y-2 m-0 p-0 text-[13px]">
                  <li class="flex items-start gap-2"><span class="material-symbols-outlined text-[16px] text-zinc-400 mt-0.5">chevron_right</span>各部门安全管理人员</li>
                  <li class="flex items-start gap-2"><span class="material-symbols-outlined text-[16px] text-zinc-400 mt-0.5">chevron_right</span>生产线班组长及核心员工</li>
                  <li class="flex items-start gap-2"><span class="material-symbols-outlined text-[16px] text-zinc-400 mt-0.5">chevron_right</span>新入职员工及安全专员</li>
                </ul>
              </div>
            </div>
            <p>通过本课程的系统学习，学员将能够独立完成所在岗位的风险点排查，并在紧急情况下迅速采取正确措施。课程配套SOP和应急演练模板供下载。</p>
          </article>
        </div>
      </section>
    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'TrainingVideoDetail',
  data() {
    return {
      activeChapter: 0,
      activeInfoTab: '课程简介',
      infoTabs: ['课程简介', '相关资料', '互动讨论'],
      chapters: [
        { title: '安全基础知识框架', duration: '15:30' },
        { title: '消防安全与应急处理流程规范', duration: '12:45' },
        { title: '现场重点设备操作安全', duration: '18:20' },
      ],
    }
  },
  methods: {
    goBack() { uni.navigateBack() }
  }
}
</script>
