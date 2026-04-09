<template>
  <app-layout page-title="任务详情">
    <div class="py-12 w-full max-w-[1350px] mx-auto min-h-screen px-6 md:px-0 flex flex-col items-center">
      
      <!-- Main Content Card -->
      <main class="w-full max-w-4xl bg-white border border-zinc-200 shadow-sm rounded-2xl md:p-12 p-8 animate-fade-in relative overflow-hidden">
        <!-- Top decorative thin line -->
        <div class="absolute top-0 left-0 w-full h-1 bg-zinc-900"></div>

        <!-- Section 1: Task Header -->
        <header class="mb-10">
          <div class="flex items-center gap-3 mb-4">
             <span class="px-2 py-0.5 bg-zinc-900 text-white text-[11px] font-bold tracking-widest rounded-sm uppercase">{{ task.type }}</span>
             <span class="px-2 py-0.5 bg-red-50 text-red-600 border border-red-100 text-[11px] font-bold tracking-widest rounded-sm uppercase">{{ task.priority || '紧急' }}</span>
          </div>
          <h1 class="text-[28px] md:text-[36px] font-extrabold text-zinc-900 leading-[1.2] tracking-tight mb-6">{{ task.title }}</h1>
          
          <div class="flex flex-wrap items-center gap-6 text-[13px] text-zinc-500 font-medium py-4 border-y border-zinc-100">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[10px] font-bold text-zinc-600 shrink-0">{{ task.publisher[0] }}</span>
              <span class="text-zinc-900 font-semibold">{{ task.publisher }}</span>
            </div>
            <div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px] font-light">calendar_today</span> 截止 {{ task.date }}</div>
            <div class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px] font-light">visibility</span> {{ task.views }} 阅读</div>
          </div>
        </header>

        <!-- Section 2: Task Content -->
        <section class="mb-12">
          <div class="prose prose-zinc max-w-none text-zinc-700 leading-relaxed text-[15px] mb-8">
            <p>{{ task.content }}</p>
          </div>
          
          <!-- Work Standard -->
          <div class="mt-8 border-l-2 border-zinc-900 bg-zinc-50 rounded-r-xl p-6">
            <h3 class="text-[14px] font-bold text-zinc-900 mb-3 flex items-center gap-2">
               <span class="material-symbols-outlined text-[18px]">rule</span> 验收标准
            </h3>
            <p class="text-[14px] text-zinc-600 leading-relaxed whitespace-pre-line">{{ task.standard }}</p>
          </div>
          
          <!-- Attachments -->
          <div v-if="task.attachments.length" class="mt-10">
            <h3 class="text-[14px] font-bold text-zinc-900 mb-4 flex items-center gap-2">
               <span class="material-symbols-outlined text-[18px]">attach_file</span> 附件资料
            </h3>
            <div class="space-y-3">
              <div v-for="file in task.attachments" :key="file.name" class="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors gap-4 shadow-sm">
                <div class="flex items-center gap-4 min-w-0">
                  <div class="w-10 h-10 rounded bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-zinc-500 font-light">description</span>
                  </div>
                  <div class="min-w-0">
                    <span class="block text-[14px] font-bold text-zinc-900 truncate">{{ file.name }}</span>
                    <span class="text-[12px] font-mono text-zinc-500 mt-0.5">{{ file.size }}</span>
                  </div>
                </div>
                <button class="shrink-0 flex items-center justify-center px-4 py-2 bg-white text-zinc-900 border border-zinc-200 font-semibold text-[13px] rounded-md shadow-sm hover:bg-zinc-50 transition-colors">
                   <span class="material-symbols-outlined text-[16px] mr-1.5">download</span> 下载
                </button>
              </div>
            </div>
          </div>
        </section>

        <div class="w-full h-px bg-zinc-200 my-12"></div>

        <!-- Section 3: Feedback Timeline -->
        <section>
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-[18px] font-extrabold text-zinc-900 flex items-center gap-2">
              工作反馈 <span class="bg-zinc-100 border border-zinc-200 text-zinc-600 text-[11px] px-2 py-0.5 rounded-full">{{ feedbacks.length }}</span>
            </h2>
            <button class="px-5 py-2 bg-zinc-900 text-white rounded-md text-[13px] font-semibold hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-1.5">
               <span class="material-symbols-outlined text-[16px]">add</span> 新增进展
            </button>
          </div>
          
          <div class="relative pl-4 sm:pl-0">
            <!-- Timeline rendering -->
            <div class="space-y-8">
              <div v-for="(fb, idx) in feedbacks" :key="idx" class="relative pl-8 sm:pl-12">
                <!-- Timeline line -->
                <div v-if="idx < feedbacks.length - 1" class="absolute left-[11px] sm:left-[19px] top-10 bottom-[-32px] w-px bg-zinc-200"></div>
                
                <!-- Avatar Dot -->
                <div class="absolute left-0 sm:left-2 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border-2 flex items-center justify-center z-10"
                     :class="fb.isCompletion ? 'border-zinc-900' : 'border-zinc-300'">
                  <span v-if="fb.isCompletion" class="material-symbols-outlined text-[12px] sm:text-[16px] text-zinc-900 font-bold">check</span>
                  <span v-else class="text-[10px] sm:text-[12px] font-bold text-zinc-600">{{ fb.author[0] }}</span>
                </div>
                
                <!-- Content Box -->
                <div class="bg-zinc-50 border border-zinc-200 rounded-xl p-5 shadow-sm">
                  <div class="flex flex-wrap items-center gap-3 mb-2">
                    <span class="text-[14px] font-bold text-zinc-900">{{ fb.author }}</span>
                    <span class="text-[12px] font-mono text-zinc-500">{{ fb.time }}</span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border ml-auto"
                          :class="fb.isCompletion ? 'bg-green-50 text-green-700 border-green-200' : 'bg-white text-zinc-600 border-zinc-200'">{{ fb.type }}</span>
                  </div>
                  <p class="text-[14px] text-zinc-700 leading-relaxed">{{ fb.content }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'TaskDetail',
  data() {
    return {
      task: {
        title: '消防演练专项计划',
        type: '重点任务',
        priority: '高优先级',
        publisher: '超级管理员',
        date: '2025-12-15',
        views: 30,
        content: '根据公司年度安全生产计划，组织开展第四季度消防综合应急演练。演练内容包括：初起火灾扑救、疏散逃生、消防设施操作等核心科目。各部门应安排人员全程参与，确保演练覆盖率达到100%。演练后需提交总结报告。',
        standard: '1. 演练覆盖率100%\n2. 初起火灾扑救响应时间≤3分钟\n3. 人员疏散完成时间≤5分钟\n4. 消防设施操作合格率≥95%\n5. 演练总结报告于3个工作日内提交',
        attachments: [
          { name: '消防演练方案V2.docx', size: '2.4MB' },
          { name: '消防设施操作指南.pdf', size: '1.8MB' },
        ],
      },
      feedbacks: [
        { author: '张三', time: '12月16日 09:30', type: '进度更新', isCompletion: false, content: '已完成演练方案的初稿编制，正在与各部门确认参演人员名单和时间安排。' },
        { author: '李四', time: '12月17日 14:00', type: '进度更新', isCompletion: false, content: '安全部已审核通过演练方案，建议增加夜间疏散科目的模拟演练。' },
        { author: '王五', time: '12月18日 10:30', type: '验收申请', isCompletion: true, content: '演练已于12月17下午完成，共计参演人员128人，所有科目合格率96%。请验收。' },
      ],
    }
  },
  methods: {
    goTo(path) { uni.navigateTo({ url: path }) },
  }
}
</script>
