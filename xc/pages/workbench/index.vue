<template>
  <app-layout page-title="工作台">
    <div class="max-w-[1350px] mx-auto py-12 px-0 w-full flex flex-col items-center">
      <div class="w-full px-6 md:px-0">
        <!-- Welcome Header -->
        <section class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 class="text-3xl font-bold text-zinc-950 mb-2 tracking-tight">早上好，{{ user.name }} <span class="text-3xl ml-1 inline-block animate-[wave_2s_infinite]">👋</span></h1>
            <p class="text-sm text-zinc-500 flex items-center gap-2">
              <span class="inline-flex items-center rounded-sm border border-zinc-200 bg-white px-2 py-0.5 font-medium text-zinc-900 shadow-sm">{{ user.dept }}</span>
              <span class="text-zinc-300 mx-1">/</span>
              <span class="font-medium tracking-wide text-zinc-700">{{ user.role }}</span>
            </p>
          </div>
        </section>

        <!-- DaisyUI Stats Row -->
        <div class="stats stats-vertical lg:stats-horizontal shadow-sm w-full mb-12 border border-zinc-200 bg-white rounded-xl">
          <!-- Stat 1 -->
          <div class="stat cursor-pointer hover:bg-zinc-50 transition-colors duration-200 border-b lg:border-b-0 lg:border-r border-zinc-100" @click="goTo('/pages/key-work/list')">
            <div class="stat-figure text-zinc-400">
              <span class="material-symbols-outlined text-4xl font-light">assignment</span>
            </div>
            <div class="stat-title text-zinc-500 text-sm font-medium">待办任务</div>
            <div class="stat-value text-zinc-950 text-4xl tracking-tight my-1">5</div>
            <div class="stat-desc text-zinc-600 flex items-center gap-1 mt-1">
               <span class="material-symbols-outlined text-sm">trending_up</span> 今日新增 2
            </div>
          </div>
          
          <!-- Stat 2 -->
          <div class="stat cursor-pointer hover:bg-zinc-50 transition-colors duration-200 border-b lg:border-b-0 lg:border-r border-zinc-100" @click="goTo('/pages/message/list')">
            <div class="stat-figure text-zinc-400">
              <span class="material-symbols-outlined text-4xl font-light">mail</span>
            </div>
            <div class="stat-title text-zinc-500 text-sm font-medium">未读消息</div>
            <div class="stat-value text-zinc-950 text-4xl tracking-tight my-1">12</div>
            <div class="stat-desc text-zinc-500 font-medium flex items-center mt-1">
              点击处理 <span class="material-symbols-outlined text-[12px] ml-1">arrow_forward</span>
            </div>
          </div>

          <!-- Stat 3 -->
          <div class="stat cursor-pointer hover:bg-zinc-50 transition-colors duration-200 border-b lg:border-b-0 lg:border-r border-zinc-100" @click="goTo('/pages/training/list')">
            <div class="stat-figure text-zinc-400">
              <span class="material-symbols-outlined text-4xl font-light">school</span>
            </div>
            <div class="stat-title text-zinc-500 text-sm font-medium mb-1">培训进度</div>
            <div class="text-2xl font-bold tracking-tight text-zinc-950 mb-1">3 <span class="text-sm font-normal text-zinc-400">/ 8门课程</span></div>
            <div class="flex items-center gap-2 mt-1 w-full max-w-[150px]">
              <div class="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                 <div class="bg-zinc-900 h-full rounded-full" style="width: 37%"></div>
              </div>
              <span class="text-xs font-medium text-zinc-600">37%</span>
            </div>
          </div>

          <!-- Stat 4 -->
          <div class="stat cursor-pointer hover:bg-zinc-50 transition-colors duration-200">
            <div class="stat-figure text-zinc-400">
              <span class="material-symbols-outlined text-4xl font-light">forum</span>
            </div>
            <div class="stat-title text-zinc-500 text-sm font-medium">本周反馈</div>
            <div class="stat-value text-zinc-950 text-4xl tracking-tight my-1">7</div>
            <div class="stat-desc text-zinc-600 flex items-center gap-1 mt-1 font-medium">
              <span class="material-symbols-outlined text-sm">trending_up</span> 上升 12%
            </div>
          </div>
        </div>

        <!-- Dashboard Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Left Column -->
          <div class="lg:col-span-8 space-y-8">
            <!-- Recent Tasks (Table) -->
            <div class="bg-white shadow-sm border border-zinc-200 rounded-xl overflow-hidden">
              <div class="flex justify-between items-center p-6 border-b border-zinc-100 bg-white">
                <h2 class="text-lg font-semibold tracking-tight text-zinc-950">最近任务</h2>
                <button class="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors" @click="goTo('/pages/key-work/list')">查看全部</button>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-left whitespace-nowrap">
                  <thead class="text-xs text-zinc-500 uppercase bg-zinc-50 border-b border-zinc-100">
                    <tr>
                      <th class="px-6 py-3 font-medium">任务名称</th>
                      <th class="px-6 py-3 font-medium">状态</th>
                      <th class="px-6 py-3 font-medium">截至日期</th>
                      <th class="px-6 py-3 font-medium text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-zinc-100 bg-white">
                    <tr v-for="task in recentTasks" :key="task.id"
                        class="hover:bg-zinc-50 transition-colors cursor-pointer group"
                        @click="goTo('/pages/key-work/task-detail?id=' + task.id)">
                      <td class="px-6 py-4 relative">
                        <!-- Striping indicator for highlights -->
                        <div v-if="task.highlight" class="absolute left-0 top-0 bottom-0 w-1 bg-zinc-900"></div>
                        <div class="flex items-center gap-3">
                          <div class="w-2 h-2 rounded-full" :class="task.dotClass"></div>
                          <span class="font-medium text-zinc-900">{{ task.title }}</span>
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 text-zinc-800 border border-zinc-200 line-clamp-1" :class="task.badgeClass">
                           {{ task.status }}
                        </span>
                      </td>
                      <td class="px-6 py-4 font-mono text-zinc-500">{{ task.date }}</td>
                      <td class="px-6 py-4 text-right">
                        <button class="text-zinc-400 hover:text-zinc-900 transition-colors">
                          <span class="material-symbols-outlined text-lg">more_horiz</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Shortcut Grid -->
            <div class="bg-white shadow-sm border border-zinc-200 rounded-xl">
              <div class="p-6 lg:p-8">
                <h2 class="text-lg font-semibold tracking-tight text-zinc-950 mb-6">快捷入口</h2>
                <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <button v-for="sc in shortcuts" :key="sc.label"
                          class="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-zinc-50 transition-all duration-200 group border border-transparent hover:border-zinc-200 hover:shadow-sm"
                          @click="goTo(sc.path)">
                    <div class="w-12 h-12 rounded-md flex items-center justify-center bg-zinc-100 text-zinc-600 transition-transform duration-200 group-hover:scale-105 group-hover:bg-zinc-900 group-hover:text-white" :class="sc.bgClass">
                      <span class="material-symbols-outlined text-2xl font-light" :class="sc.textClass">{{ sc.icon }}</span>
                    </div>
                    <span class="text-xs font-medium text-zinc-600 group-hover:text-zinc-900">{{ sc.label }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="lg:col-span-4 space-y-8">
            <!-- Unread Messages -->
            <div class="bg-white shadow-sm border border-zinc-200 rounded-xl overflow-hidden flex flex-col h-full max-h-[450px]">
              <div class="flex flex-col h-full">
                <div class="px-6 py-4 border-b border-zinc-100 bg-white shrink-0 flex items-center justify-between">
                  <h2 class="text-lg font-semibold tracking-tight text-zinc-950 flex items-center">
                    未读消息 
                    <span class="ml-2 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-zinc-900 rounded-full">12</span>
                  </h2>
                </div>
                <div class="divide-y divide-zinc-100 overflow-y-auto grow">
                  <div v-for="msg in unreadMsgs" :key="msg.id"
                       class="p-5 hover:bg-zinc-50 cursor-pointer transition-colors group"
                       @click="goTo('/pages/message/detail?id=' + msg.id)">
                    <div class="flex justify-between items-start mb-2 gap-2">
                      <h3 class="text-sm font-semibold text-zinc-900 group-hover:underline transition-colors line-clamp-2 leading-tight">{{ msg.title }}</h3>
                      <span class="text-[10px] font-mono text-zinc-500 whitespace-nowrap bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded">{{ msg.time }}</span>
                    </div>
                    <p class="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{{ msg.summary }}</p>
                  </div>
                </div>
                <div class="p-3 bg-zinc-50 border-t border-zinc-100 text-center shrink-0 mt-auto">
                  <button class="text-xs font-semibold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors w-full p-2" @click="goTo('/pages/message/list')">
                    查看全部通知
                  </button>
                </div>
              </div>
            </div>

            <!-- Recent Training -->
            <div class="bg-white shadow-sm border border-zinc-200 rounded-xl">
              <div class="p-6 lg:p-8">
                <h2 class="text-lg font-semibold tracking-tight text-zinc-950 mb-6">近期培训</h2>
                <div class="space-y-6">
                  <!-- Training Items -->
                  <div v-for="course in trainingProgress" :key="course.title" class="group cursor-pointer" @click="goTo('/pages/training/video-detail?id=' + course.id)">
                    <div class="flex justify-between items-center mb-3">
                      <h3 class="text-sm font-semibold text-zinc-900 group-hover:underline transition-colors truncate pr-4">{{ course.title }}</h3>
                      <span class="text-xs font-bold text-zinc-900">{{ course.progress }}%</span>
                    </div>
                    <div class="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                       <div class="bg-zinc-900 h-full rounded-full transition-all duration-500" :style="`width: ${course.progress}%`"></div>
                    </div>
                    <div class="flex justify-between mt-2 pt-1 tracking-wide">
                      <span class="text-[10px] text-zinc-500">{{ course.remaining }}</span>
                      <span class="text-[10px] text-zinc-400 font-mono">{{ course.deadline }}</span>
                    </div>
                  </div>
                </div>
                
                <!-- Banner Container -->
                <div class="mt-8 relative h-32 rounded-xl overflow-hidden border border-zinc-200 group cursor-pointer" @click="goTo('/pages/training/list')">
                  <div class="absolute inset-0 bg-zinc-950 group-hover:bg-zinc-900 transition-colors duration-300"></div>
                  <!-- Abstract placeholder replacement since colorful image is anti-minimal -->
                  <div class="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-500 via-zinc-900 to-black"></div>
                  <div class="absolute inset-0 flex flex-col justify-end p-5">
                    <p class="text-white text-sm font-bold mb-1">查看更多精品课程</p>
                    <p class="text-zinc-400 text-[11px] font-medium">提升专业技术，打造核心竞争力</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'Workbench',
  data() {
    return {
      user: { name: '张三', dept: '技术部', role: '超级管理员' },
      recentTasks: [
        { id: 't1', title: '定期巡检', status: '进行中', date: '2024-05-20', dotClass: 'bg-primary', badgeClass: 'bg-primary/10 text-primary', highlight: false },
        { id: 't2', title: '变电站维护', status: '待办', date: '2024-05-18', dotClass: 'bg-error', badgeClass: 'bg-error/10 text-error', highlight: true },
        { id: 't3', title: '安全检查', status: '进行中', date: '2024-05-22', dotClass: 'bg-base-300', badgeClass: 'bg-base-200 text-base-content/70', highlight: false },
        { id: 't4', title: '工作日报', status: '已完成', date: '2024-05-15', dotClass: 'bg-success', badgeClass: 'bg-success/10 text-success', highlight: false },
        { id: 't5', title: '周度总结', status: '已完成', date: '2024-05-12', dotClass: 'bg-success', badgeClass: 'bg-success/10 text-success', highlight: false },
      ],
      shortcuts: [
        { label: '工作推进', icon: 'trending_up', bgClass: 'bg-primary/10', textClass: 'text-primary', path: '/pages/key-work/list' },
        { label: '专业管理', icon: 'manage_accounts', bgClass: 'bg-secondary/10', textClass: 'text-secondary', path: '/pages/pro-mgmt/index' },
        { label: '数据报表', icon: 'bar_chart', bgClass: 'bg-accent/10', textClass: 'text-accent', path: '/pages/pro-mgmt/index' },
        { label: '系统设置', icon: 'settings_suggest', bgClass: 'bg-info/10', textClass: 'text-info', path: '/pages/pro-mgmt/index' },
        { label: '个人中心', icon: 'person', bgClass: 'bg-success/10', textClass: 'text-success', path: '/pages/workbench/index' },
      ],
      unreadMsgs: [
        { id: 'm1', title: '关于2024年度培训工作的通知', time: '2小时前', summary: '各位同事，现发布2024年度专业技术培训大纲，请查收并认真落实...' },
        { id: 'm2', title: '系统维护重要通知', time: '昨天', summary: '平台将于本周六凌晨2:00进行系统升级与例行维护，预计持续3小时...' },
        { id: 'm3', title: '下周周报提交提醒', time: '2天前', summary: '请各部门负责人在周五下班前，准时提交本周工作重点总结及下周计划。' },
      ],
      trainingProgress: [
        { id: 'c1', title: '安全生产标准化体系（V2.0）', progress: 85, progressClass: 'progress-accent', progressTextClass: 'text-accent', remaining: '剩余 12 课时', deadline: '有效期至 06/30' },
        { id: 'c2', title: '调度自动化平台运维解析', progress: 12, progressClass: 'progress-warning', progressTextClass: 'text-warning', remaining: '尚未开始核心章节', deadline: '有效期至 08/15' },
      ],
    }
  },
  methods: {
    goTo(path) { uni.navigateTo({ url: path }) },
  }
}
</script>

<style scoped>
@keyframes wave {
  0% { transform: rotate( 0.0deg) }
  10% { transform: rotate(14.0deg) }  
  20% { transform: rotate(-8.0deg) }
  30% { transform: rotate(14.0deg) }
  40% { transform: rotate(-4.0deg) }
  50% { transform: rotate(10.0deg) }
  60% { transform: rotate( 0.0deg) }
  100% { transform: rotate( 0.0deg) }
}
.material-symbols-outlined {
  display: inline-block;
  vertical-align: middle;
}
</style>
