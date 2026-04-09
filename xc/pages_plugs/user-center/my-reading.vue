<template>
  <app-layout page-title="我的阅读">
    <div class="max-w-content mx-auto px-6 py-8">
      
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <h1 class="text-h2 text-on-surface tracking-tight">我的阅读记录</h1>
        <button class="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">清空记录</button>
      </div>
      
      <!-- List -->
      <div class="card overflow-hidden">
        <div class="divide-y divide-slate-100">
          
          <div v-for="item in readingList" :key="item.id" 
               class="px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
               @click="goToDetail(item.id)">
            <div class="flex-1 min-w-0 flex items-center gap-3">
              <span class="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">history</span>
              <span class="badge" :class="getBadgeClass(item.type)">{{ item.type }}</span>
              <h3 class="text-[15px] font-medium text-on-surface group-hover:text-blue-600 transition-colors truncate w-full">
                {{ item.title }}
              </h3>
            </div>
            
            <div class="flex items-center gap-4 text-xs font-medium text-slate-500 sm:ml-6 flex-shrink-0">
               <span>阅读于 {{ item.readTime }}</span>
               <button class="material-symbols-outlined text-[16px] text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">delete</button>
            </div>
          </div>
          
          <div v-if="readingList.length === 0" class="py-20 text-center">
            <span class="material-symbols-outlined text-4xl text-slate-300 mb-2">menu_book</span>
            <p class="text-sm text-slate-500">暂无阅读记录</p>
          </div>
          
        </div>
      </div>

    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'MyReading',
  data() {
    return {
      readingList: [
        { id: '1', title: '关于印发《2026年度安全生产工作指导意见》的通知', type: '公司公文', readTime: '2025-12-25 10:30' },
        { id: '2', title: '电气设备安全操作规程V3.0（2025版）', type: '操作规程', readTime: '2025-12-24 16:15' },
        { id: '3', title: '12月份安委会扩大会议通报', type: '安委办通报', readTime: '2025-12-23 09:20' },
        { id: '4', title: '《员工带薪休假实施细则》补充规定', type: '规章制度', readTime: '2025-12-15 11:45' },
        { id: '5', title: '第十二次总经理办公会议纪要', type: '会议纪要', readTime: '2025-12-10 14:00' },
      ]
    }
  },
  methods: {
    getBadgeClass(type) {
      if (type === '操作规程' || type === '规章制度') return 'bg-emerald-50 text-emerald-600';
      if (type === '公司公文') return 'bg-red-50 text-red-600';
      if (type === '安委办通报') return 'bg-orange-50 text-orange-600';
      if (type === '会议纪要') return 'bg-blue-50 text-blue-600';
      return 'bg-slate-100 text-slate-600';
    },
    goToDetail(id) {
       uni.navigateTo({ url: `/pages/info-publish/detail?id=${id}` })
    }
  }
}
</script>
