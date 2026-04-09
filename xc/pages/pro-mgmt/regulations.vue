<template>
  <app-layout page-title="制度规范">
    <div class="py-12 max-w-[1350px] w-full mx-auto min-h-screen">
      <div class="w-full px-6 md:px-0">
        
        <!-- Top Action -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 class="text-3xl font-bold text-zinc-950 tracking-tight mb-2">制度规范库</h1>
            <p class="text-sm text-zinc-500 flex items-center gap-2">
               <span class="material-symbols-outlined text-[16px]">info</span> 本站共收录公司级制度规范 248 份
            </p>
          </div>
          
          <div class="flex w-full md:w-auto items-center gap-4">
            <div class="join w-full shadow-sm rounded-md border border-zinc-200 overflow-hidden">
              <input type="text" class="input input-sm join-item w-full md:w-80 bg-white border-none focus:outline-none text-zinc-900 placeholder:text-zinc-400 px-3" placeholder="输入文号、标题关键字...">
              <button class="btn btn-sm bg-zinc-900 text-white hover:bg-zinc-800 border-none join-item px-4 rounded-r-md font-semibold">
                <span class="material-symbols-outlined text-[18px]">search</span> 搜索
              </button>
            </div>
          </div>
        </div>

        <!-- Categories Filter -->
        <div class="flex items-center gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          <button class="px-4 py-1.5 text-sm font-medium bg-zinc-900 text-white rounded-md shadow-sm flex-shrink-0 transition-colors">
            全部制度
          </button>
          <button v-for="cat in cats" :key="cat" class="px-4 py-1.5 text-sm font-medium bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300 hover:text-zinc-900 rounded-md shadow-sm flex-shrink-0 transition-colors">
            {{ cat }}
          </button>
        </div>

        <!-- Result List as Table -->
        <div class="bg-white shadow-sm border border-zinc-200 rounded-xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left whitespace-nowrap">
              <thead class="text-xs text-zinc-500 uppercase bg-zinc-50 border-b border-zinc-100">
                <tr>
                  <th class="px-6 py-4 font-medium">标题及基本信息</th>
                  <th class="px-6 py-4 font-medium w-40">发布信息</th>
                  <th class="px-6 py-4 font-medium text-right w-24">操作</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-100 bg-white">
                <tr v-for="doc in docs" :key="doc.id" class="hover:bg-zinc-50 transition-colors group cursor-pointer" @click="goToDetail(doc.id)">
                  <td class="px-6 py-4">
                    <div class="flex flex-col gap-1.5">
                      <h3 class="font-medium text-zinc-900 group-hover:underline transition-colors text-base line-clamp-2 leading-snug">{{ doc.title }}</h3>
                      <div class="flex flex-wrap items-center gap-2 mt-1">
                        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold border border-zinc-200" :class="doc.isValid ? 'bg-zinc-100 text-zinc-800' : 'bg-transparent text-zinc-400'">
                          {{ doc.isValid ? '现行有效' : '已废止' }}
                        </span>
                        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border border-zinc-200 text-zinc-600 bg-white shadow-sm">{{ doc.category }}</span>
                        <span class="text-xs font-mono font-medium text-zinc-400 tracking-wider">{{ doc.code }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex flex-col justify-center gap-1">
                      <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">发布日期</span>
                      <span class="text-sm font-mono text-zinc-700">{{ doc.date }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <button class="w-8 h-8 rounded-md inline-flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors">
                      <span class="material-symbols-outlined text-[20px]">download</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Pagination -->
          <div class="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between text-sm text-zinc-500 gap-4">
             <span class="font-medium">显示 1-5 条，共 248 条</span>
             <div class="join shadow-sm border border-zinc-200 rounded-md">
               <button class="join-item btn btn-sm bg-white border-none shadow-none font-medium text-zinc-400" disabled>上一页</button>
               <button class="join-item btn btn-sm border-x border-y-0 border-zinc-200 bg-zinc-900 text-white shadow-none font-medium">1</button>
               <button class="join-item btn btn-sm bg-white border-none hover:bg-zinc-100 shadow-none font-medium text-zinc-700">下一页</button>
             </div>
          </div>
        </div>

      </div>
    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'RegulationsList',
  data() {
    return {
      cats: ['安全生产', '设备管理', '环境保护', '人力资源', '财务管理', '党群工作'],
      docs: [
        { id: '1', title: '关于印发《动火作业安全管理规范(2025版)》的通知', code: '安规[2025]012号', category: '安全生产', date: '2025-10-15', isValid: true },
        { id: '2', title: '特种设备日常巡检及维护保养制度', code: '设管[2024]005号', category: '设备管理', date: '2024-06-20', isValid: true },
        { id: '3', title: '《员工带薪休假实施细则》补充规定', code: '人资[2025]033号', category: '人力资源', date: '2025-12-01', isValid: true },
        { id: '4', title: '外来施工单位及人员安全告知书', code: '安规[2022]008号', category: '安全生产', date: '2022-03-10', isValid: false },
        { id: '5', title: '废气废水排放监测点网络管理办法', code: '环保[2025]002号', category: '环境保护', date: '2025-05-18', isValid: true },
      ]
    }
  },
  methods: {
    goToDetail(id) {
       uni.navigateTo({ url: `/pages/training/article-detail?id=${id}` })
    }
  }
}
</script>
