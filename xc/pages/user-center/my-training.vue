<template>
  <app-layout page-title="我的培训">
    <div class="pt-8 pb-24 max-w-[1350px] mx-auto">
      <!-- Hero Header -->
      <section class="mb-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 class="text-[24px] font-bold tracking-tight text-slate-900 mb-2">我的培训</h1>
            <p class="text-on-surface-variant max-w-2xl">持续提升专业技能，记录你的每一个学习里程碑。</p>
          </div>
          <div class="flex gap-3">
            <div class="bg-surface-container-lowest px-4 py-3 rounded-xl shadow-sm border border-slate-200/15 flex items-center gap-3">
              <span class="material-symbols-outlined text-secondary">trending_up</span>
              <div>
                <p class="text-[10px] uppercase tracking-wider text-slate-400 font-bold">本月进度</p>
                <p class="text-lg font-bold text-slate-900 leading-tight">72%</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div class="md:col-span-2 bg-gradient-to-br from-primary to-primary-dim p-8 rounded-xl text-on-primary flex flex-col justify-between h-48 relative overflow-hidden">
          <div class="relative z-10">
            <h3 class="font-semibold opacity-90">学习总时长</h3>
            <p class="text-4xl font-extrabold mt-2 tracking-tighter">128 <span class="text-lg font-normal opacity-70">小时</span></p>
          </div>
          <div class="relative z-10 flex items-center gap-2 text-sm">
            <span class="material-symbols-outlined text-[16px]">verified</span>
            <span>已超越 85% 的同级学员</span>
          </div>
          <div class="absolute -right-8 -bottom-8 opacity-10">
            <span class="material-symbols-outlined text-[160px]" style="font-variation-settings: 'FILL' 1;">analytics</span>
          </div>
        </div>
        <div class="bg-surface-container-lowest p-6 rounded-xl border border-slate-200/15 flex flex-col justify-between h-48">
          <div>
            <span class="material-symbols-outlined text-secondary text-3xl">school</span>
            <h3 class="text-slate-900 font-bold mt-4">进行中</h3>
          </div>
          <p class="text-3xl font-bold text-slate-900">12</p>
        </div>
        <div class="bg-surface-container-lowest p-6 rounded-xl border border-slate-200/15 flex flex-col justify-between h-48">
          <div>
            <span class="material-symbols-outlined text-green-600 text-3xl">task_alt</span>
            <h3 class="text-slate-900 font-bold mt-4">已完成</h3>
          </div>
          <p class="text-3xl font-bold text-slate-900">45</p>
        </div>
      </div>
      <!-- Course Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="course in courses" :key="course.title"
             class="bg-surface-container-lowest rounded-[6px] p-6 border border-slate-200/15 hover:shadow-[0_12px_30px_-10px_rgba(15,23,42,0.08)] transition-all duration-300 group">
          <div class="flex justify-between items-start mb-6">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase" :class="course.tagClass">{{ course.tag }}</span>
            <span v-if="course.completed" class="material-symbols-outlined text-green-600">check_circle</span>
            <span v-else class="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors cursor-pointer">bookmark</span>
          </div>
          <h3 class="text-[14px] font-bold text-slate-900 mb-8 leading-snug">{{ course.title }}</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center text-xs text-on-surface-variant font-medium">
              <span v-if="course.completed" class="flex items-center gap-1 text-green-600">
                <span class="material-symbols-outlined text-[14px]">done_all</span> 完成于 {{ course.completedDate }}
              </span>
              <span v-else>学习进度</span>
              <span :class="course.completed ? 'text-green-600 font-bold' : 'text-slate-900 font-bold'">{{ course.completed ? '已完成' : '已学习 ' + course.progress + '%' }}</span>
            </div>
            <div class="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div class="h-full transition-all duration-500" :class="course.completed ? 'bg-[#10B981]' : 'bg-[#3B82F6]'" :style="'width:' + course.progress + '%'"></div>
            </div>
          </div>
          <button class="mt-8 w-full py-3 bg-surface-container-high hover:bg-surface-container-highest text-slate-900 text-sm font-bold rounded-md transition-all active:scale-[0.98]">
            {{ course.btnText }}
          </button>
        </div>
        <!-- Empty Placeholder -->
        <div class="bg-surface-container-low rounded-[6px] border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-slate-300 transition-colors" @click="goTo('/pages/training/list')">
          <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
            <span class="material-symbols-outlined text-slate-300">add</span>
          </div>
          <p class="text-slate-400 font-bold text-sm tracking-tight">浏览更多课程</p>
          <p class="text-slate-400 text-xs mt-1">发现为你定制的技能路径</p>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'UserCenterMyTraining',
  data() {
    return {
      courses: [
        { title: '安全管理基础', tag: '视频', tagClass: 'bg-blue-100 text-blue-700', progress: 60, completed: false, btnText: '继续学习' },
        { title: '消防应急知识', tag: '视频', tagClass: 'bg-blue-100 text-blue-700', progress: 100, completed: true, completedDate: '2024.03.12', btnText: '查看证书' },
        { title: '设备操作手册', tag: '文章', tagClass: 'bg-green-100 text-green-700', progress: 30, completed: false, btnText: '继续阅读' },
        { title: '四防安全规范', tag: '文章', tagClass: 'bg-green-100 text-green-700', progress: 80, completed: false, btnText: '继续阅读' },
      ],
    }
  },
  methods: {
    goTo(path) { uni.navigateTo({ url: path }) },
  }
}
</script>
