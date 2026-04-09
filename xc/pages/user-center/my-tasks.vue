<template>
  <app-layout page-title="我的任务">
    <div class="pt-16 pb-20 max-w-[1350px] mx-auto">
      <div class="">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 class="text-[24px] font-bold text-slate-900 tracking-tight">我的任务</h1>
            <p class="text-slate-500 text-sm mt-1">管理并跟进您的日常生产任务与安全指标</p>
          </div>
          <button class="bg-primary hover:bg-primary-dim text-white px-5 py-2.5 rounded-md text-sm font-medium shadow-sm flex items-center space-x-2 transition-all active:scale-95">
            <span class="material-symbols-outlined text-sm">add</span>
            <span>新建任务</span>
          </button>
        </div>
        <!-- Tabs -->
        <div class="flex border-b border-slate-200 mb-8 overflow-x-auto whitespace-nowrap">
          <button class="px-6 py-3 text-sm font-medium text-slate-500 hover:text-slate-900 transition-all" @click="activeTab = 'arranged'">我安排的任务</button>
          <button class="px-6 py-3 text-sm font-semibold text-blue-600 relative" @click="activeTab = 'received'">
            我接收的任务
            <div class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></div>
          </button>
        </div>
        <!-- Task List -->
        <div class="flex flex-col gap-4">
          <div v-for="task in tasks" :key="task.id"
               class="bg-white border border-slate-200 rounded-[6px] p-5 flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer group shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
               @click="goTo('/pages/key-work/focus-detail')">
            <div class="flex items-center space-x-6">
              <div class="w-1.5 h-1.5 rounded-full" :class="task.dotColor"></div>
              <div class="space-y-1">
                <h3 class="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{{ task.title }}</h3>
                <div class="flex items-center space-x-3">
                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase" :class="task.statusClass">{{ task.status }}</span>
                  <span class="text-xs text-slate-400">ID: {{ task.id }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-12">
              <div class="flex items-center space-x-3">
                <div class="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
                  <span class="material-symbols-outlined text-sm text-slate-400">person</span>
                </div>
                <span class="text-sm font-medium text-slate-700">{{ task.assignee }}</span>
              </div>
              <div class="flex items-center space-x-2 min-w-[120px]" :class="task.deadlineClass">
                <span class="material-symbols-outlined text-sm">{{ task.deadlineIcon }}</span>
                <span class="text-sm font-medium tracking-tight">{{ task.deadline }}</span>
              </div>
              <span class="material-symbols-outlined text-slate-300 group-hover:text-slate-400">chevron_right</span>
            </div>
          </div>
        </div>
        <!-- Pagination -->
        <div class="mt-8 flex items-center justify-between text-sm text-slate-500 font-medium">
          <span>显示 1 到 {{ tasks.length }} 条，共 24 条任务</span>
          <div class="flex space-x-2">
            <button class="px-4 py-2 bg-white border border-slate-200 rounded-[6px] hover:bg-slate-50 disabled:opacity-50" disabled>上一页</button>
            <button class="px-4 py-2 bg-white border border-slate-200 rounded-[6px] hover:bg-slate-50">下一页</button>
          </div>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'UserCenterMyTasks',
  data() {
    return {
      activeTab: 'received',
      tasks: [
        { title: '消防演练计划', id: 'TSK-2024-089', status: '进行中', statusClass: 'bg-blue-50 text-[#3B82F6]', dotColor: 'bg-blue-500', assignee: '张三', deadline: '2025-12-28', deadlineClass: 'text-slate-500', deadlineIcon: 'calendar_today' },
        { title: '安全检查整改', id: 'TSK-2024-092', status: '待验收', statusClass: 'bg-amber-50 text-[#F59E0B]', dotColor: 'bg-amber-500', assignee: '李四', deadline: '2025-12-22', deadlineClass: 'text-[#EF4444]', deadlineIcon: 'priority_high' },
        { title: '设备维护排查', id: 'TSK-2024-075', status: '已完成', statusClass: 'bg-emerald-50 text-[#10B981]', dotColor: 'bg-emerald-500', assignee: '王五', deadline: '2025-12-15', deadlineClass: 'text-slate-400', deadlineIcon: 'check_circle' },
        { title: '月度安全报告', id: 'TSK-2024-098', status: '进行中', statusClass: 'bg-blue-50 text-[#3B82F6]', dotColor: 'bg-blue-500', assignee: '赵六', deadline: '2025-12-25', deadlineClass: 'text-slate-500', deadlineIcon: 'calendar_today' },
        { title: '培训材料更新', id: 'TSK-2024-102', status: '进行中', statusClass: 'bg-blue-50 text-[#3B82F6]', dotColor: 'bg-blue-500', assignee: '', deadline: '2025-12-30', deadlineClass: 'text-slate-500', deadlineIcon: 'calendar_today' },
      ],
    }
  },
  methods: {
    goTo(path) { uni.navigateTo({ url: path }) },
  }
}
</script>
