<template>
  <app-layout page-title="任务详情">
    <div class="mt-0 flex-grow w-full max-w-[1350px] mx-auto py-12 flex flex-col gap-10">
      <!-- Task Header -->
      <section class="flex flex-col gap-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex flex-col gap-3">
            <h1 class="text-[32px] font-bold text-on-surface tracking-tight leading-tight">消防演练专项计划</h1>
            <div class="flex items-center gap-4 text-on-surface-variant">
              <span class="px-3 py-1 bg-blue-100 text-blue-700 text-[11px] font-bold tracking-widest uppercase rounded-full">重点任务</span>
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                  <span class="material-symbols-outlined text-sm text-slate-500">person</span>
                </div>
                <span class="text-sm font-medium text-on-surface">超级管理员</span>
              </div>
              <span class="text-sm">2025-12-15</span>
              <div class="flex items-center gap-1.5 ml-2">
                <span class="material-symbols-outlined text-[18px]">visibility</span>
                <span class="text-sm">30 阅读</span>
              </div>
            </div>
          </div>
          <div class="flex gap-3">
            <button class="px-5 py-2.5 rounded-lg border border-outline-variant/15 text-on-surface font-medium text-sm hover:bg-surface-container-low transition-all">编辑任务</button>
            <button class="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-medium text-sm hover:opacity-90 transition-all shadow-[0_40px_40px_-20px_rgba(42,52,57,0.04)]">完成任务</button>
          </div>
        </div>
        <div class="w-full h-px bg-surface-variant/30"></div>
      </section>
      <!-- Content Grid -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div class="lg:col-span-8 flex flex-col gap-8">
          <article class="prose prose-slate max-w-none text-on-surface-variant leading-relaxed">
            <p class="mb-4">根据《2025年度安全生产管理条例》及公司年度安全工作部署，本次消防演练旨在提升全体生产人员在突发状况下的应急反应能力及自救互救技能。</p>
            <p class="mb-4">演练范围涵盖A区生产车间、原材料仓库及行政办公大楼。重点测试火灾报警系统的灵敏度、疏散通道的畅通情况以及微型消防站的集结速度。</p>
            <h4 class="text-on-surface font-bold text-lg mt-6 mb-3">演练核心流程：</h4>
            <ul class="list-disc pl-5 space-y-2">
              <li>模拟火情触发及烟感报警联动（09:00 - 09:15）</li>
              <li>全员按照预定路线进行紧急疏散（09:15 - 09:30）</li>
              <li>现场灭火器使用实操讲解与考核（09:30 - 10:30）</li>
              <li>演练总结及安全隐患排查反馈（10:30 - 11:30）</li>
            </ul>
          </article>
          <!-- Attachments -->
          <div class="flex flex-col gap-4">
            <h3 class="text-sm font-bold text-on-surface-variant uppercase tracking-widest">附件资料</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div v-for="file in attachments" :key="file.name"
                   class="flex items-center gap-4 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/15 hover:bg-surface-container-low transition-colors group cursor-pointer">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="file.bgClass">
                  <span class="material-symbols-outlined" :class="file.iconClass">{{ file.icon }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-on-surface group-hover:text-secondary transition-colors">{{ file.name }}</span>
                  <span class="text-xs text-on-surface-variant">{{ file.size }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Side Rail -->
        <div class="lg:col-span-4">
          <div class="sticky top-24 p-6 rounded-xl bg-surface-container-low border-l-[3px] border-secondary flex flex-col gap-4 shadow-[0_40px_40px_-20px_rgba(42,52,57,0.04)]">
            <h3 class="text-base font-bold text-on-surface flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary">verified</span>
              工作标准
            </h3>
            <div class="text-sm text-on-surface-variant leading-relaxed space-y-3">
              <p class="font-medium text-on-surface">1. 响应时效</p>
              <p>接到警报后，应急小组需在3分钟内完成集结。</p>
              <p class="font-medium text-on-surface">2. 疏散完整率</p>
              <p>应确保区域内人员100%撤离，不得遗漏任何角落。</p>
              <p class="font-medium text-on-surface">3. 文档归档</p>
              <p>演练结束后24小时内须上传现场照片及详细报告。</p>
            </div>
          </div>
        </div>
      </section>
      <!-- Feedback Timeline -->
      <section class="flex flex-col gap-8 mb-12">
        <div class="flex items-center gap-3">
          <h2 class="text-xl font-bold text-on-surface">工作反馈</h2>
          <span class="px-2 py-0.5 bg-surface-variant text-on-surface-variant text-xs font-bold rounded-full">{{ feedbacks.length }}</span>
        </div>
        <div class="flex flex-col gap-8 relative before:content-[''] before:absolute before:left-5 before:top-2 before:bottom-2 before:w-px before:bg-surface-variant/50">
          <div v-for="fb in feedbacks" :key="fb.name" class="flex gap-6 relative">
            <div class="w-10 h-10 rounded-full z-10 bg-surface-container-lowest ring-4 ring-surface flex items-center justify-center">
              <span class="material-symbols-outlined text-on-surface-variant">person</span>
            </div>
            <div class="flex flex-col gap-3 flex-1 pb-8">
              <div class="flex items-center gap-3">
                <span class="text-sm font-bold text-on-surface">{{ fb.name }}</span>
                <span class="px-2 py-0.5 text-[10px] font-bold rounded-full tracking-wider" :class="fb.tagClass">{{ fb.tag }}</span>
                <span class="text-xs text-on-surface-variant">{{ fb.time }}</span>
              </div>
              <div class="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/15">
                <p class="text-sm text-on-surface-variant">{{ fb.content }}</p>
                <div v-if="fb.actions" class="flex items-center gap-3 pt-3">
                  <button class="flex-1 py-2.5 bg-green-500 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-all">
                    <span class="material-symbols-outlined text-[20px]">check_circle</span>通过验收
                  </button>
                  <button class="flex-1 py-2.5 bg-red-500 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition-all">
                    <span class="material-symbols-outlined text-[20px]">cancel</span>驳回申请
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Submit Form -->
        <div class="flex flex-col gap-4 mt-4">
          <textarea v-model="feedbackText" class="w-full p-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-secondary/20 min-h-[120px] text-sm text-on-surface" placeholder="输入您的工作反馈或进度更新..."></textarea>
          <button class="w-full py-4 bg-[#0F172A] text-white rounded-xl font-bold text-sm tracking-widest hover:bg-black transition-all">提交反馈</button>
        </div>
      </section>
    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'KeyWorkDetail',
  data() {
    return {
      feedbackText: '',
      attachments: [
        { name: '消防预案.pdf', size: '1.2 MB', icon: 'picture_as_pdf', bgClass: 'bg-red-50', iconClass: 'text-red-500' },
        { name: '演练记录.doc', size: '856 KB', icon: 'description', bgClass: 'bg-blue-50', iconClass: 'text-blue-500' },
      ],
      feedbacks: [
        { name: '李晓华', tag: '过程反馈', tagClass: 'bg-blue-100 text-blue-700', time: '2025-12-16 10:30', content: '已完成各生产车间的烟感设备检测，目前发现B区3号车间存在一个失效点，已联系维保单位下午进行更换。演练准备工作进度完成80%。', actions: false },
        { name: '张明远', tag: '验收申请', tagClass: 'bg-orange-100 text-orange-700', time: '2025-12-16 16:45', content: '全员演练已按计划圆满结束。所有人员在8分钟内完成紧急疏散，未发生意外损伤。灭火器实操合格率达98%。申请该专项计划完工验收。', actions: true },
      ],
    }
  }
}
</script>
