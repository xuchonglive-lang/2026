<template>
  <app-layout page-title="重点关注">
    <div class="max-w-[1350px] mx-auto py-8">
      
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-h2 text-on-surface tracking-tight">督办/挂牌工作</h1>
        <button class="btn-secondary h-9 flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px]">download</span> 导出报表
        </button>
      </div>

      <!-- Metrics Top Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="card p-5">
          <div class="flex justify-between items-start mb-2">
            <span class="text-sm font-medium text-slate-500">总督办项</span>
            <span class="material-symbols-outlined text-slate-400">flag</span>
          </div>
          <p class="text-3xl font-bold text-on-surface">12 <span class="text-helper font-normal text-slate-500">项</span></p>
        </div>
        <div class="card p-5 border-l-4 border-l-red-500">
          <div class="flex justify-between items-start mb-2">
            <span class="text-sm font-medium text-slate-500">红黄牌警示</span>
            <span class="material-symbols-outlined text-red-500">warning</span>
          </div>
          <p class="text-3xl font-bold text-on-surface text-red-600">2 <span class="text-helper font-normal text-red-400">项红牌</span></p>
        </div>
        <div class="card p-5">
          <div class="flex justify-between items-start mb-2">
            <span class="text-sm font-medium text-slate-500">超期未办</span>
            <span class="material-symbols-outlined text-slate-400">timer_off</span>
          </div>
          <p class="text-3xl font-bold text-on-surface">0 <span class="text-helper font-normal text-slate-500">项</span></p>
        </div>
        <div class="card p-5">
          <div class="flex justify-between items-start mb-2">
            <span class="text-sm font-medium text-slate-500">本周待验收</span>
            <span class="material-symbols-outlined text-slate-400">fact_check</span>
          </div>
          <p class="text-3xl font-bold text-on-surface text-emerald-600">3 <span class="text-helper font-normal text-emerald-500">项</span></p>
        </div>
      </div>

      <!-- Focus List -->
      <div class="card overflow-hidden">
        <!-- Controls -->
        <div class="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center gap-4 bg-slate-50/50">
          <select v-model="filterStatus" class="input-base h-9 text-sm w-36 bg-white">
            <option value="all">所有状态</option>
            <option value="normal">正常推进</option>
            <option value="slow">缓慢需关注</option>
            <option value="stop">停滞预警</option>
          </select>
          <select v-model="filterLevel" class="input-base h-9 text-sm w-36 bg-white">
            <option value="all">所有级别</option>
            <option value="bureau">局级督办</option>
            <option value="company">公司级挂牌</option>
          </select>
          <div class="flex-1"></div>
          <div class="relative w-64">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
            <input type="text" class="input-base h-9 pl-9 text-sm" placeholder="搜索工作名称...">
          </div>
        </div>

        <!-- Table View -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200">
                <th class="py-3 px-6 text-xs font-semibold text-slate-500 w-[40%]">任务名称</th>
                <th class="py-3 px-6 text-xs font-semibold text-slate-500">进度 (节点/总计)</th>
                <th class="py-3 px-6 text-xs font-semibold text-slate-500">健康状态</th>
                <th class="py-3 px-6 text-xs font-semibold text-slate-500">牵头人</th>
                <th class="py-3 px-6 text-xs font-semibold text-slate-500 text-right">考核节点</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="item in focusList" :key="item.id" 
                  class="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                  @click="goTo('/pages/key-work/focus-detail?id=' + item.id)">
                
                <!-- Col 1: Title & Tag -->
                <td class="py-4 px-6">
                  <div class="flex flex-col gap-1.5">
                    <div class="flex items-center gap-2">
                       <span class="badge" :class="item.tagClass">{{ item.tag }}</span>
                       <span v-if="item.isRed" class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    </div>
                    <span class="text-sm font-medium text-on-surface group-hover:text-blue-600 transition-colors">{{ item.title }}</span>
                  </div>
                </td>
                
                <!-- Col 2: Progress -->
                <td class="py-4 px-6">
                  <div class="flex items-center gap-3">
                    <div class="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div class="h-full rounded-full" :class="item.progressColor" :style="{ width: item.progress + '%' }"></div>
                    </div>
                    <span class="text-xs font-medium text-slate-600 w-8 text-right">{{ item.progress }}%</span>
                  </div>
                </td>

                <!-- Col 3: Traffic Light -->
                <td class="py-4 px-6">
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[16px]" :class="item.lightColor">{{ item.lightIcon }}</span>
                    <span class="text-sm font-medium" :class="item.lightTextColor">{{ item.lightText }}</span>
                  </div>
                </td>

                <!-- Col 4: Assignee -->
                <td class="py-4 px-6">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">{{ item.assignee[0] }}</span>
                    <span class="text-sm text-slate-700">{{ item.assignee }}</span>
                  </div>
                </td>

                <!-- Col 5: Deadline -->
                <td class="py-4 px-6 text-right">
                  <span class="text-sm text-slate-600">{{ item.deadline }}</span>
                </td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'FocusList',
  data() {
    return {
      filterStatus: 'all',
      filterLevel: 'all',
      focusList: [
        { 
          id: 'f1', title: '厂区供热管网更新改造工程', tag: '局级督办', tagClass: 'bg-purple-50 text-purple-700', isRed: true,
          progress: 45, progressColor: 'bg-red-500', lightIcon: 'error', lightColor: 'text-red-500', lightText: '停滞预警', lightTextColor: 'text-red-600',
          assignee: '王建国', deadline: '2026-06-30'
        },
        { 
          id: 'f2', title: '生产管理信息系统(MIS)二期上线', tag: '公司级挂牌', tagClass: 'bg-orange-50 text-orange-700', isRed: false,
          progress: 80, progressColor: 'bg-blue-500', lightIcon: 'check_circle', lightColor: 'text-emerald-500', lightText: '正常推进', lightTextColor: 'text-emerald-600',
          assignee: '李明', deadline: '2025-12-31'
        },
        { 
          id: 'f3', title: '#2发电机组A级检修', tag: '公司级挂牌', tagClass: 'bg-orange-50 text-orange-700', isRed: false,
          progress: 20, progressColor: 'bg-amber-500', lightIcon: 'warning', lightColor: 'text-amber-500', lightText: '缓慢需关注', lightTextColor: 'text-amber-600',
          assignee: '张工', deadline: '2026-03-15'
        },
        { 
          id: 'f4', title: '环保脱硫塔双回路技改', tag: '局级督办', tagClass: 'bg-purple-50 text-purple-700', isRed: false,
          progress: 100, progressColor: 'bg-emerald-500', lightIcon: 'verified', lightColor: 'text-slate-400', lightText: '已完结', lightTextColor: 'text-slate-500',
          assignee: '赵海', deadline: '2025-11-20'
        },
      ]
    }
  },
  methods: {
    goTo(path) { uni.navigateTo({ url: path }) }
  }
}
</script>
