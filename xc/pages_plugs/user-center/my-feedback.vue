<template>
  <app-layout page-title="我的反馈">
    <div class="max-w-content mx-auto px-6 py-8">
      
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-h2 text-on-surface tracking-tight mb-2">我提交的工作反馈</h1>
        <p class="text-sm text-on-surface-variant">在此查看您在督办、重点任务和例行工作中的所有节点填报记录。</p>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-slate-200">
         <button v-for="t in types" :key="t" 
                 class="px-4 py-1.5 text-sm rounded-md transition-colors font-medium border"
                 :class="activeType === t ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'"
                 @click="activeType = t">
           {{ t }}
         </button>
      </div>

      <!-- Feedback List (Cards) -->
      <div class="space-y-4">
         <div v-for="item in filteredFeedbacks" :key="item.id" 
              class="card p-5 cursor-pointer hover:shadow-card-hover transition-shadow group relative pr-12"
              @click="goToWork(item.workId)">
           
           <span class="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-blue-500 transition-colors">navigate_next</span>
           
           <div class="flex items-center justify-between mb-3">
             <div class="flex items-center gap-2">
               <span class="badge" :class="item.typeClass">{{ item.type }}</span>
               <span class="text-xs text-slate-500 font-medium">所属工作：{{ item.workTitle }}</span>
             </div>
             <span class="text-xs font-medium text-slate-400 flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">schedule</span> {{ item.date }}
             </span>
           </div>
           
           <h3 class="text-sm font-semibold text-on-surface mb-2 line-clamp-2">
             “{{ item.summary }}”
           </h3>
           
           <div v-if="item.attachments" class="flex items-center gap-1.5 mt-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded w-max">
              <span class="material-symbols-outlined text-[14px]">attachment</span> 已附 {{ item.attachments }} 个证明文件
           </div>
         </div>
         
         <div v-if="filteredFeedbacks.length === 0" class="py-20 text-center">
            <span class="material-symbols-outlined text-4xl text-slate-300 mb-2">forum</span>
            <p class="text-sm text-slate-500">该分类下暂无反馈记录</p>
         </div>
      </div>

    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'MyFeedback',
  data() {
    return {
      activeType: '全部反馈',
      types: ['全部反馈', '过程汇报', '验收申请', '延期申请', '异常预警'],
      feedbacks: [
        { id: '1', workId: 't3', workTitle: '厂区供热管网更新改造工程', type: '过程汇报', typeClass: 'bg-blue-50 text-blue-600', summary: '一标段（办公区至东车间段）聚氨酯保温材料已进场，但受限极寒天气目前无法进行无损探伤。进度较原计划迟滞1周。', date: '昨天 15:30', attachments: 2 },
        { id: '2', workId: 't1', workTitle: '安全通道标识更新', type: '验收申请', typeClass: 'bg-emerald-50 text-emerald-600', summary: '全厂12条主要安全通道的78处夜光指示牌及划线工作已全部完工。经动力车间自检合格，请验收。', date: '2025-12-22 10:15', attachments: 4 },
        { id: '3', workId: 't4', workTitle: '环保脱硫塔双回路技改', type: '异常预警', typeClass: 'bg-red-50 text-red-600', summary: '脱硫系统DCS控制柜到货验收不合格，供应商承认发错型号。正在紧急协调退换货，预计影响总体工期15天。', date: '2025-12-18 09:00', attachments: 1 },
        { id: '4', workId: 't2', workTitle: '变电站维护检修', type: '过程汇报', typeClass: 'bg-blue-50 text-blue-600', summary: '2号主变日常停电清扫完成。绝缘电阻测试合格，符合送电要求。', date: '2025-12-15 16:45', attachments: 0 },
      ]
    }
  },
  computed: {
    filteredFeedbacks() {
      if (this.activeType === '全部反馈') return this.feedbacks;
      return this.feedbacks.filter(f => f.type === this.activeType);
    }
  },
  methods: {
    goToWork(id) {
      uni.navigateTo({ url: `/pages/key-work/task-detail?id=${id}` })
    }
  }
}
</script>
