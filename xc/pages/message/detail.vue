<template>
  <app-layout page-title="消息详情">
    <div class="flex-grow pt-8 pb-24 max-w-[1350px] mx-auto px-4 md:px-0">
      
      <!-- Back Link -->
      <div class="max-w-[760px] mx-auto mb-6">
        <button class="inline-flex items-center text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors" @click="goBack">
          <span class="material-symbols-outlined text-[16px] mr-1">arrow_back</span>
          返回消息列表
        </button>
      </div>

      <!-- Content Card -->
      <article class="max-w-[760px] mx-auto bg-white rounded-xl shadow-sm border border-zinc-200 lg:p-14 p-8">
        
        <!-- Header -->
        <header class="mb-10">
          <div class="flex items-center gap-2 mb-4">
             <span class="px-2.5 py-1 bg-zinc-100 text-zinc-600 border border-zinc-200/50 text-[11px] font-bold tracking-wider rounded-md uppercase">培训通知</span>
             <span class="text-[12px] font-mono text-zinc-400">MSG-2025-0891</span>
          </div>
          <h1 class="text-[28px] md:text-[32px] font-black text-zinc-900 tracking-tight leading-[1.2] mb-6">新课程发布通知：安全管理培训课程</h1>
          
          <div class="flex items-center justify-between border-b border-zinc-100 pb-6">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                <span class="material-symbols-outlined text-[18px] text-zinc-500">campaign</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[14px] font-bold text-zinc-900">系统管理员</span>
                <span class="text-[13px] text-zinc-500 font-medium">2025-12-21 14:30</span>
              </div>
            </div>
            
            <div class="flex gap-2">
              <button class="w-8 h-8 flex items-center justify-center rounded-md border border-transparent hover:border-zinc-200 hover:bg-zinc-50 text-zinc-400 hover:text-zinc-900 transition-all">
                <span class="material-symbols-outlined text-[16px]">print</span>
              </button>
              <button class="w-8 h-8 flex items-center justify-center rounded-md border border-transparent hover:border-zinc-200 hover:bg-zinc-50 text-zinc-400 hover:text-zinc-900 transition-all">
                <span class="material-symbols-outlined text-[16px]">share</span>
              </button>
            </div>
          </div>
        </header>

        <!-- Body -->
        <div class="prose prose-zinc prose-sm md:prose-base max-w-none prose-p:leading-[1.8] prose-p:text-zinc-700 prose-headings:text-zinc-900 prose-strong:text-zinc-900 prose-li:text-zinc-700 marker:text-zinc-300">
          <p>各位同事：</p>
          <p>为了进一步提升生产安全管理水平，增强全员安全意识并规范现场操作流程，平台现已正式上线<strong>《安全管理培训课程》</strong>。</p>
          <p>本课程作为年度重点培训计划的一部分，经过专业教研团队与安全专家的深度打磨，涵盖了以下核心模块：</p>
          <ul>
            <li>最新安全生产法律法规解读</li>
            <li>生产现场风险识别与隐患排查技巧</li>
            <li>应急预案演练与突发事故处置流程</li>
            <li>数字化安全监测系统的标准化使用规范</li>
          </ul>
          <p>请各部门相关负责人及时组织部门人员进行在线学习，并在规定时间内完成课程考核。考核结果将纳入季度绩效评价。</p>
          <p>如有任何系统操作问题或对课程内容的建议，请联系培训管理处。</p>
        </div>

        <!-- Footer Actions -->
        <footer class="mt-12 pt-8 border-t border-zinc-100">
          <button class="flex items-center gap-2 px-6 py-2.5 bg-zinc-900 text-white font-medium text-[13px] rounded-md hover:bg-zinc-800 transition-colors shadow-sm group">
            <span class="material-symbols-outlined text-[18px]">play_circle</span>
            前往培训系统进行学习
            <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform ml-1">arrow_forward</span>
          </button>
        </footer>
      </article>
      
    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'MessageDetail',
  methods: {
    goBack() { uni.navigateBack() },
  }
}
</script>
