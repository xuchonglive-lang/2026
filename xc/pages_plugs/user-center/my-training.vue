<template>
  <app-layout page-title="我的培训">
    <div class="max-w-content mx-auto px-6 py-8">
      
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-h2 text-on-surface tracking-tight">我的学习与培训</h1>
        <button class="btn-secondary h-9 w-9 p-0 flex items-center justify-center rounded-full" @click="goTo('/pages/training/list')">
          <span class="material-symbols-outlined text-[18px]">add</span>
        </button>
      </div>
      
      <!-- Progress Summary -->
      <div class="card p-6 mb-8 flex flex-wrap gap-8 items-center bg-emerald-50 border border-emerald-100">
         <div class="flex items-center gap-4 border-r border-emerald-200 pr-8">
           <div class="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <span class="material-symbols-outlined text-[28px]">workspace_premium</span>
           </div>
           <div>
             <p class="text-xs font-semibold text-emerald-700 mb-1">本年度学时任务进度</p>
             <p class="text-[22px] font-bold text-emerald-800">12.5 <span class="text-sm font-medium">/ 24 学时</span></p>
           </div>
         </div>
         <div class="flex-1 min-w-[200px]">
           <div class="flex items-center justify-between mb-2">
             <span class="text-xs font-medium text-emerald-700">完成率 52%</span>
             <span class="text-xs text-emerald-600">差 11.5 学时</span>
           </div>
           <div class="w-full h-2 rounded-full bg-emerald-100 overflow-hidden">
             <div class="h-full bg-emerald-500 rounded-full" style="width: 52%"></div>
           </div>
         </div>
      </div>

      <!-- Tabs -->
      <div class="flex items-center gap-6 border-b border-slate-200 mb-6 pb-3">
        <button class="text-sm font-semibold text-primary border-b-2 border-primary -mb-[14px]">学习中 (3)</button>
        <button class="text-sm font-medium text-slate-500 hover:text-primary transition-colors">已完成 (12)</button>
        <button class="text-sm font-medium text-slate-500 hover:text-primary transition-colors">我的证书</button>
      </div>

      <!-- Course Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="course in courses" :key="course.id" class="card overflow-hidden cursor-pointer group flex flex-col" @click="goTo('/pages/training/video-detail?id='+course.id)">
          <!-- Thumbnail -->
          <div class="aspect-video bg-slate-100 relative shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]">
            <img v-if="course.img" :src="course.img" class="w-full h-full object-cover">
            <div v-else class="w-full h-full flex items-center justify-center text-slate-300">
               <span class="material-symbols-outlined text-4xl">play_circle</span>
            </div>
            <div class="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-sm" :class="course.type === '视频' ? 'bg-blue-500' : 'bg-emerald-500'">
               {{ course.type }}
            </div>
          </div>
          <!-- Info -->
          <div class="p-5 flex-1 flex flex-col justify-between">
             <h3 class="text-[15px] font-semibold text-on-surface line-clamp-2 leading-snug mb-4 group-hover:text-blue-600 transition-colors">{{ course.title }}</h3>
             
             <div>
               <div class="flex items-center justify-between mb-2">
                 <span class="text-xs font-medium text-slate-500" :class="{ 'text-emerald-600': course.progress === 100 }">
                   {{ course.progress === 100 ? '已学完' : `已学习 ${course.progress}%` }}
                 </span>
                 <span class="material-symbols-outlined text-[16px] text-emerald-500" v-if="course.progress === 100">check_circle</span>
               </div>
               <div class="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                 <div class="h-full rounded-full transition-all" :class="course.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'" :style="{ width: course.progress + '%' }"></div>
               </div>
             </div>
          </div>
        </div>
      </div>

    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'MyTraining',
  data() {
    return {
      courses: [
        { id: 'c1', title: '《安全生产法》重点解读与企业责任落实', type: '视频', progress: 45 },
        { id: 'c2', title: '特殊作业管理制度宣贯（2025版）', type: '图稿', progress: 85 },
        { id: 'c3', title: '现场心肺复苏及外伤急救实操标准', type: '视频', progress: 12 },
        { id: 'c4', title: '化工厂安全隐患排查治理100例', type: '视频', progress: 100 },
        { id: 'c5', title: '消防安全知识：灭火器与消火栓实操示范', type: '视频', progress: 100 },
      ]
    }
  },
  methods: {
    goTo(path) { uni.navigateTo({ url: path }) }
  }
}
</script>
