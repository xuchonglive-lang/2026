<template>
  <app-layout :page-title="content.title">
    <div class="max-w-[760px] mx-auto py-10 px-4 md:px-0 mb-12">
      
      <!-- Top Action -->
      <button class="flex items-center gap-1 text-[13px] font-medium text-zinc-500 hover:text-zinc-900 mb-8 transition-colors" @click="goBack">
        <span class="material-symbols-outlined text-[16px]">arrow_back</span>
        返回培训中心
      </button>

      <!-- Headings -->
      <header class="text-center mb-10">
        <h1 class="text-[32px] md:text-[36px] leading-[1.2] font-black text-zinc-900 mb-6 tracking-tight">{{ content.title }}</h1>
        <div class="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-[13px] text-zinc-500 font-medium">
          <span class="px-2.5 py-1 bg-zinc-100/80 text-zinc-700 rounded-md uppercase tracking-wider text-[11px] font-bold border border-zinc-200/50">{{ content.category }}</span>
          <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">person</span> {{ content.author }}</span>
          <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">event</span> {{ content.date }}</span>
          <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">visibility</span> {{ content.views }} 次阅读</span>
        </div>
      </header>

      <!-- Divider -->
      <div class="w-16 h-1 bg-zinc-900 mx-auto mb-10 rounded-full"></div>

      <!-- Prose Content (Mock Rich Text) -->
      <article class="prose prose-zinc prose-sm md:prose-base max-w-none text-zinc-700 leading-loose mb-16 prose-headings:text-zinc-900 prose-headings:font-bold prose-strong:text-zinc-900 prose-blockquote:border-zinc-900 prose-blockquote:bg-zinc-50 prose-blockquote:font-medium prose-blockquote:not-italic prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg">
        <p>本《规程》旨在进一步规范生产现场电气设备的安全操作流程，预防因误操作引发的人身触电及设备损坏事故。其适用范围涵盖全厂所有涉及电气操作、检修、试验的人员及相关配合管理人员。</p>
        
        <h3>第一章 总则与基本要求</h3>
        <p>任何人在进行电气设备操作前，必须严格遵守"停电、验电、装设接地线、悬挂标示牌和装设遮栏"的组织技术措施。不得在未明确带电状态前盲目接触设备裸露导体部分。</p>
        
        <blockquote>
          <p class="m-0 text-zinc-900">严禁无证上岗，严禁酒后作业，严禁疲劳作业。违者将依据《工厂员工违纪处理办法》予以顶格处罚。</p>
        </blockquote>
        
        <h3>第二章 倒闸操作安全规范</h3>
        <ul>
          <li>倒闸操作必须由两人执行，其中一人对设备比较熟悉者担任监护；</li>
          <li>操作应填写操作票，操作票必须使用统一格式的三联打印或手写表单；</li>
          <li>执行操作时，应按票面顺序逐项进行，严禁跳项或漏项；</li>
          <li>雷雨天气、大风天等恶劣气象条件下，原则上禁止室外高压设备倒闸。</li>
        </ul>
        
        <p class="text-zinc-400 italic">（以上为核心条款摘录，最新补充规定请下载完整附件查阅）</p>
      </article>

      <!-- Attachments block -->
      <section v-if="content.attachments.length" class="bg-white rounded-xl border border-zinc-200 p-6 md:p-8 shadow-sm">
        <h3 class="text-[15px] font-bold text-zinc-900 mb-5 flex items-center gap-2">
          <span class="material-symbols-outlined text-zinc-500">attachment</span>
          相关培训资料下载
        </h3>
        <div class="space-y-3">
          <div v-for="file in content.attachments" :key="file.name" 
               class="group bg-zinc-50 border border-zinc-100 px-5 py-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between hover:border-zinc-300 transition-colors gap-4">
            <div class="flex items-center gap-3">
               <div class="w-10 h-10 rounded bg-white border border-zinc-200 flex items-center justify-center shrink-0 shadow-sm">
                  <span class="material-symbols-outlined text-zinc-500">description</span>
               </div>
              <div class="min-w-0">
                <p class="text-[14px] font-semibold text-zinc-900 truncate mb-1">{{ file.name }}</p>
                <p class="text-[12px] text-zinc-500 font-mono">{{ file.size }}</p>
              </div>
            </div>
            <button class="h-9 px-5 bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-50 text-[13px] font-semibold rounded-md shadow-sm transition-colors whitespace-nowrap">
              下载文件
            </button>
          </div>
        </div>
      </section>

    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'ArticleDetail',
  data() {
    return {
      content: {
        title: '电气设备安全操作规程V3.0（2025版）',
        category: '操作规程',
        author: '安监部',
        date: '2025-12-12',
        views: 890,
        attachments: [
          { name: '电气设备安全操作规程v3.0.pdf', size: '4.2MB' },
          { name: '倒闸操作考题库(内部参阅).docx', size: '1.5MB' },
        ]
      }
    }
  },
  methods: {
    goBack() { uni.navigateBack() }
  }
}
</script>
