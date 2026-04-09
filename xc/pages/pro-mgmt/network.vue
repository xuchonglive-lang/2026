<template>
  <app-layout page-title="管理网络">
    <div class="py-12 max-w-[1350px] w-full mx-auto min-h-screen">
      <div class="w-full px-6 md:px-0">
        
        <!-- Top Action Area (Selector + Tabs) -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <!-- Tabs -->
          <section class="w-full md:w-auto order-2 md:order-1 border-b border-zinc-200 overflow-x-auto scrollbar-hide">
            <div role="tablist" class="flex gap-6 min-w-max">
              <button role="tab" class="pb-3 text-sm transition-all border-b-2 border-transparent text-zinc-500 hover:text-zinc-700" @click="goTo('/pages/pro-mgmt/index')">制度规范</button>
              <button role="tab" class="pb-3 text-sm transition-all border-b-2 border-zinc-900 text-zinc-900 font-bold">管理网络</button>
              <button role="tab" class="pb-3 text-sm transition-all border-b-2 border-transparent text-zinc-500 hover:text-zinc-700" @click="goTo('/pages/pro-mgmt/calendar')">例行工作</button>
              <button role="tab" class="pb-3 text-sm transition-all border-b-2 border-transparent text-zinc-500 hover:text-zinc-700" @click="goTo('/pages/pro-mgmt/my-docs')">我的文档</button>
            </div>
          </section>

          <!-- Professional Selector -->
          <section class="flex items-center gap-3 order-1 md:order-2">
            <label class="text-sm font-semibold text-zinc-900 whitespace-nowrap">当前专业:</label>
            <select class="select select-sm select-bordered w-full max-w-xs bg-white border-zinc-200 text-zinc-900 shadow-sm rounded-md focus:border-zinc-400 focus:outline-none h-9">
              <option>安全管理</option>
              <option>质量管理</option>
              <option>技术管理</option>
            </select>
          </section>
        </div>

        <!-- Org Chart Canvas -->
        <div class="bg-white shadow-sm border border-zinc-200 rounded-xl overflow-hidden py-16 relative animate-fade-in text-center">
          <!-- Optional dot grid background for technical feel -->
          <div class="absolute inset-0 opacity-[0.05] pointer-events-none" style="background-image: radial-gradient(#09090b 1px, transparent 1px); background-size: 24px 24px;"></div>
          
          <!-- Top Level -->
          <div class="flex justify-center mb-0 relative z-10">
            <div class="relative group bg-white p-5 rounded-2xl border-2 border-zinc-900 shadow-xl shadow-zinc-900/5 w-[280px] flex items-center gap-4 transition-transform duration-300 hover:-translate-y-1">
              <div class="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0 border border-zinc-200">
                <span class="material-symbols-outlined text-zinc-900 text-2xl font-light">person</span>
              </div>
              <div class="flex flex-col text-left">
                <span class="text-lg font-bold text-zinc-950">张三</span>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-xs text-zinc-500 font-medium">总部</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 text-zinc-800 border border-zinc-200 uppercase tracking-widest">安全管理负责人</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Connector -->
          <div class="org-line-vertical bg-zinc-200"></div>
          <div class="relative h-[20px] w-full max-w-4xl mx-auto">
            <div class="org-line-horizontal bg-zinc-200"></div>
          </div>
          
          <!-- Sub-units -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 md:px-12 relative z-10 max-w-4xl mx-auto">
            <div class="hidden md:block absolute top-[-20px] h-[20px] w-[2px] bg-zinc-200" style="left: 16.66%; transform: translateX(-50%);"></div>
            <div class="hidden md:block absolute top-[-20px] left-1/2 h-[20px] w-[2px] bg-zinc-200 transform -translate-x-1/2"></div>
            <div class="hidden md:block absolute top-[-20px] h-[20px] w-[2px] bg-zinc-200" style="left: 83.33%; transform: translateX(-50%);"></div>
            
            <div v-for="member in teamMembers" :key="member.name"
                 class="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm hover:shadow hover:border-zinc-300 transition-all duration-200 group flex items-center justify-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-zinc-50 flex-shrink-0 flex items-center justify-center group-hover:bg-zinc-100 transition-colors border border-zinc-100">
                <span class="material-symbols-outlined text-zinc-400 text-2xl group-hover:text-zinc-600 font-light transition-colors">person</span>
              </div>
              <div class="flex flex-col text-left">
                <span class="text-base font-semibold text-zinc-900">{{ member.name }}</span>
                <div class="flex flex-col mt-0.5">
                  <span class="text-xs text-zinc-500">{{ member.dept }}</span>
                  <span class="text-xs text-zinc-900 font-bold mt-1 tracking-tight">{{ member.role }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Function Description -->
          <div class="mt-24 flex justify-center relative z-10 w-full px-6">
            <button class="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none" @click="showFunctions = !showFunctions">
              <span class="text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 transition-colors">职能说明</span>
              <div class="w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center group-hover:bg-zinc-50 transition-colors shadow-sm">
                <span class="material-symbols-outlined text-zinc-400 group-hover:text-zinc-900 transition-all duration-300" :class="showFunctions ? 'rotate-180' : ''">expand_more</span>
              </div>
            </button>
          </div>
          
          <div v-if="showFunctions" class="mt-6 mx-auto max-w-2xl p-6 bg-zinc-50 rounded-xl border border-zinc-200 shadow-sm relative z-10 animate-fade-in text-left">
            <h3 class="text-sm font-bold text-zinc-900 mb-4 flex items-center gap-2">
               <span class="material-symbols-outlined text-zinc-900 text-lg font-light">info</span>
               安全管理职能说明
            </h3>
            <ul class="space-y-3 text-sm text-zinc-600 font-medium ml-1">
              <li class="flex items-start gap-2"><span class="material-symbols-outlined text-zinc-900 text-[18px] opacity-80 mt-0.5 font-light">check_circle</span> 负责制定和实施安全生产管理制度</li>
              <li class="flex items-start gap-2"><span class="material-symbols-outlined text-zinc-900 text-[18px] opacity-80 mt-0.5 font-light">check_circle</span> 组织开展安全隐患排查治理工作</li>
              <li class="flex items-start gap-2"><span class="material-symbols-outlined text-zinc-900 text-[18px] opacity-80 mt-0.5 font-light">check_circle</span> 监督检查安全生产法律法规的执行情况</li>
              <li class="flex items-start gap-2"><span class="material-symbols-outlined text-zinc-900 text-[18px] opacity-80 mt-0.5 font-light">check_circle</span> 组织安全生产培训和应急演练</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'ProMgmtNetwork',
  data() {
    return {
      showFunctions: false,
      teamMembers: [
        { name: '李四', dept: '分公司A', role: '安全管理员' },
        { name: '王五', dept: '分公司B', role: '安全管理员' },
        { name: '赵六', dept: '分公司C', role: '安全管理员' },
      ],
    }
  },
  methods: {
    goTo(path) { uni.navigateTo({ url: path }) },
  }
}
</script>

<style scoped>
.org-line-vertical { width: 2px; height: 40px; margin: 0 auto; }
.org-line-horizontal { height: 2px; position: absolute; top: 0; left: 16.66%; right: 16.66%; }

@media (max-width: 768px) {
  .org-line-vertical, .org-line-horizontal { display: none; }
}
</style>
