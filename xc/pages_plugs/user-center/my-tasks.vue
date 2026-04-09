<template>
  <app-layout page-title="我的任务">
    <div class="max-w-content mx-auto px-6 py-8">
      
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <h1 class="text-h2 text-on-surface tracking-tight">我的任务</h1>
        <button class="btn-primary flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">add</span> 安排新任务
        </button>
      </div>

      <!-- Tab Bar -->
      <div class="flex items-center gap-6 border-b border-slate-200 mb-6">
        <button v-for="tab in tabs" :key="tab.id"
                class="pb-3 text-sm transition-colors border-b-2"
                :class="activeTab === tab.id ? 'border-primary text-primary font-semibold' : 'border-transparent text-slate-500 hover:text-primary'"
                @click="activeTab = tab.id">
          {{ tab.label }}
        </button>
      </div>

      <!-- Task Card List -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="task in filteredTasks" :key="task.id"
             class="card p-5 cursor-pointer hover:shadow-card-hover transition-all duration-200 flex flex-col group"
             @click="goToDetail(task.id)">
             
          <!-- Header: Status + Badge -->
          <div class="flex items-start justify-between mb-3">
            <span class="badge" :class="task.statusClass">{{ task.status }}</span>
            <span class="material-symbols-outlined text-slate-300 group-hover:text-blue-500 transition-colors pointer-events-none">open_in_new</span>
          </div>

          <!-- Title -->
          <h3 class="text-base font-medium text-on-surface line-clamp-2 leading-snug mb-4 group-hover:text-blue-600 transition-colors">
            {{ task.title }}
          </h3>

          <div class="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
            <!-- Assignee Heads -->
            <div class="flex -space-x-2 overflow-hidden">
              <div class="w-7 h-7 rounded-full bg-slate-200 ring-2 ring-white flex items-center justify-center text-[10px] font-bold text-slate-600 z-10">{{ task.assignee[0] }}</div>
              <div v-if="task.assistants" class="w-7 h-7 rounded-full bg-slate-100 ring-2 ring-white flex items-center justify-center text-[10px] font-bold text-slate-500 z-0">+{{ task.assistants }}</div>
            </div>

            <!-- Deadline -->
            <div class="flex items-center gap-1 text-sm font-medium" :class="getDeadlineClass(task.daysLeft)">
              <span class="material-symbols-outlined text-[16px]">schedule</span>
              {{ task.deadline }}
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredTasks.length === 0" class="py-20 text-center col-span-full">
        <span class="material-symbols-outlined text-4xl text-slate-300 mb-2">task</span>
        <p class="text-sm text-slate-500">暂无相关任务</p>
      </div>

    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'MyTasks',
  data() {
    return {
      activeTab: 'received',
      tabs: [
        { id: 'assigned', label: '我安排的任务' },
        { id: 'received', label: '我接收的任务' },
      ],
      tasks: [
        { 
          id: 't1', title: '车间东侧走廊卫生清理与杂物移库', status: '待验收', statusClass: 'bg-orange-50 text-orange-600 ring-1 ring-inset ring-orange-600/20',
          assignee: '张工', assistants: null, deadline: '今天 18:00', daysLeft: 0, type: 'received' 
        },
        { 
          id: 't2', title: '变电站维护检修年度终检阶段总结', status: '进行中', statusClass: 'bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-600/20',
          assignee: '李明', assistants: 2, deadline: '明天 12:00', daysLeft: 1, type: 'received' 
        },
        { 
          id: 't3', title: '消防设施操作指南编写与修订培训材料', status: '进行中', statusClass: 'bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-600/20',
          assignee: '王建国', assistants: null, deadline: '12-28', daysLeft: 4, type: 'assigned' 
        },
        { 
          id: 't4', title: '配电室温湿度监测设备全厂巡回校准', status: '已完成', statusClass: 'bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-600/20',
          assignee: '赵海', assistants: 1, deadline: '12-20', daysLeft: -1, type: 'assigned' 
        },
      ]
    }
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(t => t.type === this.activeTab);
    }
  },
  methods: {
    getDeadlineClass(days) {
      if (days < 0) return 'text-slate-400 line-through'; // Past deadline / completed
      if (days <= 3) return 'text-red-500'; // Urgent
      return 'text-slate-500'; // Normal
    },
    goToDetail(id) {
      uni.navigateTo({ url: '/pages/key-work/task-detail?id=' + id })
    }
  }
}
</script>
