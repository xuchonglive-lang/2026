<template>
  <app-layout page-title="工作查询">
    <div class="py-12 max-w-[1350px] w-full mx-auto min-h-screen">
      <div class="w-full px-6 md:px-0">
        <!-- Header -->
        <div class="flex items-end justify-between mb-8">
          <div class="flex items-center gap-4">
            <span class="material-symbols-outlined text-zinc-900 text-3xl font-light">search</span>
            <h1 class="text-3xl font-bold tracking-tight text-zinc-950">工作查询</h1>
            <span class="px-3 py-1 bg-zinc-100 text-zinc-600 border border-zinc-200 text-xs font-semibold rounded-full tracking-wider">共 {{ tasks.length }} 项任务</span>
          </div>
        </div>
        
        <!-- Filter Bar -->
        <div class="bg-zinc-50 p-6 rounded-xl border border-zinc-200 shadow-sm mb-6 flex flex-wrap items-center gap-6">
          <div class="flex flex-col gap-1.5 min-w-[240px]">
            <label class="text-xs font-semibold uppercase tracking-widest text-zinc-500">工作名称</label>
            <input v-model="searchName" class="bg-white border text-zinc-900 border-zinc-200 shadow-sm focus:border-zinc-400 focus:outline-none rounded-md text-sm px-4 py-2" placeholder="请输入工作名称..." type="text"/>
          </div>
          <div class="flex flex-col gap-1.5 min-w-[200px]">
            <label class="text-xs font-semibold uppercase tracking-widest text-zinc-500">工作集</label>
            <select class="select select-sm select-bordered bg-white border-zinc-200 shadow-sm focus:border-zinc-400 focus:outline-none rounded-md text-zinc-700 w-full px-4 font-normal h-9">
              <option>全部工作集</option>
              <option>生产计划 A</option>
              <option>维护任务 B</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5 min-w-[200px]">
            <label class="text-xs font-semibold uppercase tracking-widest text-zinc-500">工作分类</label>
            <select class="select select-sm select-bordered bg-white border-zinc-200 shadow-sm focus:border-zinc-400 focus:outline-none rounded-md text-zinc-700 w-full px-4 font-normal h-9">
              <option>全部分类</option>
              <option>紧急处理</option>
              <option>常规检查</option>
            </select>
          </div>
          <div class="flex items-end gap-4 ml-auto pt-5">
            <button class="btn btn-sm h-9 bg-zinc-900 text-white hover:bg-zinc-800 border-none rounded-md px-8 font-semibold shadow-sm">搜索</button>
            <button class="text-zinc-500 font-medium text-sm hover:text-zinc-900 transition-colors px-4">重置</button>
          </div>
        </div>
        
        <!-- Tabs -->
        <div class="flex items-center gap-8 border-b border-zinc-200 mb-8 w-full overflow-x-auto">
          <button v-for="tab in workTabs" :key="tab.name"
                  class="pb-3 text-sm transition-all border-b-2 whitespace-nowrap"
                  :class="activeTab === tab.name ? 'border-zinc-900 text-zinc-900 font-bold' : 'border-transparent text-zinc-500 hover:text-zinc-700'"
                  @click="activeTab = tab.name">
            {{ tab.label }} <span class="text-xs" :class="activeTab === tab.name ? '' : 'text-zinc-400 font-normal'">({{ tab.count }})</span>
          </button>
        </div>
        
        <!-- Task Group Header -->
        <div class="bg-zinc-50 border border-zinc-200 border-b-0 rounded-t-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <span class="material-symbols-outlined text-zinc-400">keyboard_arrow_down</span>
            <h3 class="font-bold text-zinc-900">第三周文明生产大治理周计划</h3>
            <span class="px-2 py-0.5 bg-zinc-200 text-zinc-700 text-[10px] font-bold rounded">{{ tasks.length }}</span>
          </div>
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-3">
              <div class="w-32 h-1.5 bg-zinc-200 rounded-full overflow-hidden shadow-inner">
                <div class="bg-zinc-900 h-full w-[0%]"></div>
              </div>
              <span class="text-xs font-bold text-zinc-500">0% 完成</span>
            </div>
            <span class="material-symbols-outlined text-zinc-400 hover:text-zinc-700 cursor-pointer transition-colors">more_vert</span>
          </div>
        </div>
        
        <!-- Task Items -->
        <div class="bg-white border border-zinc-200 rounded-b-xl shadow-sm overflow-hidden mb-12 divide-y divide-zinc-100">
          <div v-for="(task, idx) in tasks" :key="idx"
               class="flex flex-col lg:flex-row lg:items-center px-6 py-4 hover:bg-zinc-50 transition-colors group gap-4">
            
            <div class="flex items-center flex-1 gap-4">
               <div class="w-2 h-2 rounded-full shrink-0" :class="task.dotClass"></div>
               <h4 class="text-sm font-medium text-zinc-900">{{ task.title }}</h4>
            </div>

            <div class="flex items-center gap-6 text-sm flex-wrap lg:flex-nowrap">
              <span class="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-tight rounded border" :class="task.badgeClass">{{ task.status }}</span>
              <div class="flex items-center gap-2 lg:w-32">
                <div class="w-6 h-6 rounded-full border border-zinc-200 bg-white shadow-sm flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[14px] text-zinc-600">person</span>
                </div>
                <span class="text-zinc-600 font-medium truncate text-xs">{{ task.assignee }}</span>
              </div>
              <span class="text-zinc-500 font-mono text-xs w-24">{{ task.deadline }}</span>
              <div class="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity justify-end lg:w-20">
                <button class="text-zinc-500 hover:text-zinc-900 font-medium text-xs">编辑</button>
                <button class="text-zinc-900 font-bold text-xs" @click="goTo('/pages/key-work/focus-detail')">查看</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <div class="flex items-center justify-center pt-2 pb-8">
          <div class="join shadow-sm border border-zinc-200 rounded-md">
            <button class="join-item btn btn-sm bg-white border-none text-zinc-500 hover:bg-zinc-100">«</button>
            <button class="join-item btn btn-sm border-x border-y-0 border-zinc-200 bg-zinc-900 text-white hover:bg-zinc-800">1</button>
            <button class="join-item btn btn-sm border-r border-y-0 border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700">2</button>
            <button class="join-item btn btn-sm border-r border-y-0 border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700">3</button>
            <button class="join-item btn btn-sm border-r border-y-0 border-zinc-200 bg-white text-zinc-400 btn-disabled">...</button>
            <button class="join-item btn btn-sm bg-white border-none text-zinc-500 hover:bg-zinc-100">»</button>
          </div>
        </div>

      </div>
    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'KeyWorkList',
  data() {
    return {
      searchName: '',
      activeTab: 'civilized',
      workTabs: [
        { name: 'leader', label: '领导交办', count: 0 },
        { name: 'focus', label: '重点工作', count: 0 },
        { name: 'civilized', label: '文明生产及三不次', count: 10 },
        { name: 'fourPrevention', label: '四防工作', count: 0 },
        { name: 'safety', label: '安全管理', count: 0 },
      ],
      tasks: [
        { title: '车间东侧走廊卫生清理与杂物移库', status: '紧急', dotClass: 'bg-red-500', badgeClass: 'bg-red-50 border-red-200 text-red-700', assignee: '超级管理员', deadline: '2025-12-15' },
        { title: '二号机组巡检设备标识牌更换更新', status: '进行中', dotClass: 'bg-zinc-400', badgeClass: 'bg-zinc-100 border-zinc-200 text-zinc-700', assignee: '超级管理员', deadline: '2025-12-15' },
        { title: '库房消防通道障碍物排查与清理', status: '紧急', dotClass: 'bg-red-500', badgeClass: 'bg-red-50 border-red-200 text-red-700', assignee: '超级管理员', deadline: '2025-12-15' },
        { title: '外围绿化带冬季养护与防冻处理', status: '进行中', dotClass: 'bg-zinc-400', badgeClass: 'bg-zinc-100 border-zinc-200 text-zinc-700', assignee: '超级管理员', deadline: '2025-12-15' },
        { title: '员工休息区5S标准化提升专项行动', status: '进行中', dotClass: 'bg-zinc-400', badgeClass: 'bg-zinc-100 border-zinc-200 text-zinc-700', assignee: '超级管理员', deadline: '2025-12-15' },
        { title: '生产辅助用具定置化摆放区划线', status: '进行中', dotClass: 'bg-zinc-400', badgeClass: 'bg-zinc-100 border-zinc-200 text-zinc-700', assignee: '超级管理员', deadline: '2025-12-15' },
        { title: '配电室绝缘垫铺设完整性检查', status: '进行中', dotClass: 'bg-zinc-400', badgeClass: 'bg-zinc-100 border-zinc-200 text-zinc-700', assignee: '超级管理员', deadline: '2025-12-15' },
        { title: '废水处理站药剂存放间通风系统检修', status: '进行中', dotClass: 'bg-zinc-400', badgeClass: 'bg-zinc-100 border-zinc-200 text-zinc-700', assignee: '超级管理员', deadline: '2025-12-15' },
        { title: '主厂房窗户密封性检查与五金件涂油', status: '进行中', dotClass: 'bg-zinc-400', badgeClass: 'bg-zinc-100 border-zinc-200 text-zinc-700', assignee: '超级管理员', deadline: '2025-12-15' },
        { title: '备品备件库货位电子标签校核', status: '进行中', dotClass: 'bg-zinc-400', badgeClass: 'bg-zinc-100 border-zinc-200 text-zinc-700', assignee: '超级管理员', deadline: '2025-12-15' },
      ],
    }
  },
  methods: {
    goTo(path) { uni.navigateTo({ url: path }) },
  }
}
</script>
