<template>
  <app-layout page-title="我的工作">
    <div class="max-w-[1000px] mx-auto px-6 py-8">
      
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-h2 text-on-surface tracking-tight">我的个人工作例历</h1>
        <button class="btn-primary h-9 flex items-center gap-1">
          <span class="material-symbols-outlined text-[18px]">add</span> 添加备忘
        </button>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap items-center gap-4 mb-6">
        <select v-model="filterStatus" class="input-base h-9 text-sm w-36">
          <option value="all">所有状态</option>
          <option value="todo">待处理</option>
          <option value="doing">进行中</option>
          <option value="done">已完成</option>
        </select>
        <select v-model="filterRange" class="input-base h-9 text-sm w-36">
           <option value="week">本周内</option>
           <option value="month">本月内</option>
           <option value="all">全部历史</option>
        </select>
      </div>

      <!-- List -->
      <div class="card overflow-hidden">
        <div class="divide-y divide-slate-100">
           
           <div v-for="work in items" :key="work.id" class="px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group" @click="goToCalendar">
             
             <!-- Info -->
             <div class="flex-1 min-w-0">
               <div class="flex items-center gap-2 mb-1.5">
                  <span class="w-2.5 h-2.5 rounded-full mt-0.5" :class="work.dotColor"></span>
                  <span class="text-xs font-semibold text-slate-500 whitespace-nowrap">{{ work.source }}</span>
                  <span class="text-sm font-medium text-slate-400 px-2">|</span>
                  <span class="badge" :class="work.statusClass">{{ work.status }}</span>
               </div>
               <h3 class="text-[15px] font-semibold text-on-surface group-hover:text-blue-600 transition-colors leading-snug pl-[18px]">
                 {{ work.title }}
               </h3>
             </div>
             
             <!-- Time & Action -->
             <div class="flex flex-col sm:items-end flex-shrink-0 sm:pl-6 border-transparent sm:border-slate-100">
                <span class="text-xs font-medium text-slate-500 mb-0.5">登记于 {{ work.createDate }}</span>
                <span class="text-sm font-semibold text-slate-700 flex items-center gap-1" :class="{ 'text-red-500': work.isUrgent }">
                  <span class="material-symbols-outlined text-[16px]">schedule</span> 
                  截止: {{ work.deadline }}
                </span>
             </div>

           </div>
           
           <div v-if="items.length === 0" class="py-20 text-center">
             <span class="material-symbols-outlined text-4xl text-slate-300 mb-2">event_busy</span>
             <p class="text-sm text-slate-500">没有查找到工作记录</p>
           </div>
        </div>
        
        <div v-if="items.length > 0" class="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <button class="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">加载全部历史数据</button>
        </div>
      </div>

    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'MyWork',
  data() {
    return {
      filterStatus: 'all',
      filterRange: 'week',
      items: [
        { id: '1', title: '撰写部门周度总结与隐患排查整改周报', source: '自己添加', dotColor: 'bg-blue-400', status: '待处理', statusClass: 'bg-slate-100 text-slate-600', createDate: '12-25', deadline: '今天 17:00', isUrgent: true },
        { id: '2', title: '配合完成特种设备安全大检查准备工作', source: '领导分配', dotColor: 'bg-orange-500', status: '进行中', statusClass: 'bg-blue-50 text-blue-600', createDate: '12-24', deadline: '明天', isUrgent: false },
        { id: '3', title: '参与新上岗员工的三级安全教育培训(车间级)', source: '上级专业分配', dotColor: 'bg-red-500', status: '已完成', statusClass: 'bg-emerald-50 text-emerald-600', createDate: '12-22', deadline: '12-23(已结)', isUrgent: false },
        { id: '4', title: '更新个人主张隐患排查台账记录', source: '自己添加', dotColor: 'bg-blue-400', status: '已完成', statusClass: 'bg-emerald-50 text-emerald-600', createDate: '12-20', deadline: '12-20(已结)', isUrgent: false },
      ]
    }
  },
  methods: {
    goToCalendar() {
       uni.navigateTo({ url: '/pages/pro-mgmt/calendar' })
    }
  }
}
</script>
