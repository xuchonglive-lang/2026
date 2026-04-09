<template>
  <app-layout page-title="专业管理">
    <div class="py-12 max-w-[1350px] w-full mx-auto min-h-screen">
      <div class="w-full px-6 md:px-0">
        <!-- Row 1: Professional Selector -->
        <section class="mb-8 flex items-center gap-3">
          <label class="text-sm font-semibold text-zinc-900">当前专业:</label>
          <select v-model="currentProfession" class="select select-bordered select-sm w-full max-w-xs bg-white border-zinc-200 text-zinc-900 shadow-sm rounded-md focus:border-zinc-400 focus:outline-none">
            <option v-for="p in professions" :key="p" :value="p">{{ p }}</option>
          </select>
        </section>

        <!-- Row 2: Secondary Navigation Tabs -->
        <section class="mb-8 w-full border-b border-zinc-200">
          <div role="tablist" class="flex gap-6">
            <button v-for="tab in tabs" :key="tab.name"
                    role="tab"
                    class="pb-3 text-sm transition-all border-b-2"
                    :class="activeTab === tab.name ? 'border-zinc-900 text-zinc-900 font-bold' : 'border-transparent text-zinc-500 hover:text-zinc-700'"
                    @click="activeTab = tab.name">{{ tab.label }}
            </button>
          </div>
        </section>

        <!-- Row 3: Tab Content (制度规范) -->
        <section class="space-y-6 animate-fade-in" v-if="activeTab === 'regulations'">
          <!-- Filter/Search Box -->
          <div class="flex flex-col sm:flex-row items-center gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-200 shadow-sm">
            <select class="select select-bordered select-sm w-full sm:w-auto bg-white border-zinc-200 shadow-sm text-zinc-700 rounded-md focus:border-zinc-400 focus:outline-none">
              <option>分类筛选</option>
              <option>国家标准</option>
              <option>行业准则</option>
              <option>企业内规</option>
            </select>
            <div class="join w-full sm:w-auto flex-1 max-w-md shadow-sm rounded-md overflow-hidden border border-zinc-200">
              <input class="input input-sm join-item w-full bg-white text-zinc-900 focus:outline-none placeholder:text-zinc-400 border-none px-3" placeholder="搜索制度文件..." type="text"/>
              <button class="btn btn-sm join-item bg-zinc-900 text-white hover:bg-zinc-800 border-none rounded-r-md px-4">
                <span class="material-symbols-outlined text-[18px]">search</span> 搜索
              </button>
            </div>
          </div>

          <!-- Document List as Table -->
          <div class="bg-white shadow-sm border border-zinc-200 rounded-xl overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left whitespace-nowrap">
                <thead class="text-xs text-zinc-500 uppercase bg-zinc-50 border-b border-zinc-100">
                  <tr>
                    <th class="px-6 py-4 font-medium">文档名称</th>
                    <th class="px-6 py-4 font-medium">发布部门</th>
                    <th class="px-6 py-4 font-medium">更新时间</th>
                    <th class="px-6 py-4 font-medium text-right">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-100 bg-white">
                  <tr v-for="doc in documents" :key="doc.title" class="hover:bg-zinc-50 transition-colors group cursor-pointer" @click="goTo('/pages/pro-mgmt/regulations')">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-md flex items-center justify-center shrink-0 border border-zinc-200 bg-white shadow-sm">
                          <span class="material-symbols-outlined text-lg text-zinc-600 font-light">{{ doc.icon }}</span>
                        </div>
                        <div class="font-medium text-zinc-900 group-hover:underline transition-colors line-clamp-1 text-[15px]">{{ doc.title }}</div>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 text-zinc-800 border border-zinc-200">
                         {{ doc.dept }}
                      </span>
                    </td>
                    <td class="px-6 py-4 font-mono text-zinc-500">{{ doc.date }}</td>
                    <td class="px-6 py-4 text-right">
                      <button class="text-xs font-semibold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors">
                        查看详情
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Pagination -->
          <div class="flex items-center justify-center pt-8 pb-4">
            <div class="join shadow-sm border border-zinc-200 rounded-md">
              <button class="join-item btn btn-sm bg-white border-none text-zinc-500 hover:bg-zinc-100">«</button>
              <button class="join-item btn btn-sm border-x border-y-0 border-zinc-200" :class="currentPage === 1 ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white hover:bg-zinc-100 text-zinc-700'" @click="currentPage = 1">1</button>
              <button class="join-item btn btn-sm border-r border-y-0 border-zinc-200" :class="currentPage === 2 ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white hover:bg-zinc-100 text-zinc-700'" @click="currentPage = 2">2</button>
              <button class="join-item btn btn-sm border-r border-y-0 border-zinc-200" :class="currentPage === 3 ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white hover:bg-zinc-100 text-zinc-700'" @click="currentPage = 3">3</button>
              <button class="join-item btn btn-sm border-r border-y-0 border-zinc-200 bg-white text-zinc-400 btn-disabled">...</button>
              <button class="join-item btn btn-sm border-r border-y-0 border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700">5</button>
              <button class="join-item btn btn-sm bg-white border-none text-zinc-500 hover:bg-zinc-100">»</button>
            </div>
          </div>
        </section>

        <!-- Tab Content empty states -->
        <section v-if="activeTab === 'network'" class="flex flex-col items-center justify-center py-24 animate-fade-in bg-white shadow-sm border border-zinc-200 rounded-xl mt-6">
          <span class="material-symbols-outlined text-6xl mb-4 text-zinc-200 font-light">account_tree</span>
          <h3 class="text-xl font-semibold tracking-tight text-zinc-950 mb-4">管理网络</h3>
          <button class="btn btn-neutral rounded-md shadow-sm" @click="goTo('/pages/pro-mgmt/network')">查看管理网络</button>
        </section>
        
        <section v-if="activeTab === 'calendar'" class="flex flex-col items-center justify-center py-24 animate-fade-in bg-white shadow-sm border border-zinc-200 rounded-xl mt-6">
          <span class="material-symbols-outlined text-6xl mb-4 text-zinc-200 font-light">calendar_month</span>
          <h3 class="text-xl font-semibold tracking-tight text-zinc-950 mb-4">例行工作</h3>
          <button class="btn btn-neutral rounded-md shadow-sm" @click="goTo('/pages/pro-mgmt/calendar')">查看例行工作</button>
        </section>
        
        <section v-if="activeTab === 'docs'" class="flex flex-col items-center justify-center py-24 animate-fade-in bg-white shadow-sm border border-zinc-200 rounded-xl mt-6">
          <span class="material-symbols-outlined text-6xl mb-4 text-zinc-200 font-light">folder_open</span>
          <h3 class="text-xl font-semibold tracking-tight text-zinc-950 mb-4">我的文档</h3>
          <button class="btn btn-neutral rounded-md shadow-sm" @click="goTo('/pages/pro-mgmt/my-docs')">查看我的文档</button>
        </section>
      </div>
    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'ProMgmtIndex',
  data() {
    return {
      currentProfession: '安全管理',
      professions: ['安全管理', '生产运营', '技术研发', '行政办公'],
      activeTab: 'regulations',
      currentPage: 1,
      tabs: [
        { name: 'regulations', label: '制度规范' },
        { name: 'network', label: '管理网络' },
        { name: 'calendar', label: '例行工作' },
        { name: 'docs', label: '我的文档' },
      ],
      documents: [
        { title: '安全生产管理制度', dept: '安全部', date: '2025-12-01', icon: 'article', iconBgClass: 'bg-primary/10', iconTextClass: 'text-primary' },
        { title: '消防安全操作规程', dept: '安全部', date: '2025-11-15', icon: 'description', iconBgClass: 'bg-info/10', iconTextClass: 'text-info' },
        { title: '设备巡检管理规定', dept: '技术部', date: '2025-10-20', icon: 'settings_suggest', iconBgClass: 'bg-base-200', iconTextClass: 'text-base-content/70' },
        { title: '应急预案管理办法', dept: '安全部', date: '2025-09-05', icon: 'warning', iconBgClass: 'bg-error/10', iconTextClass: 'text-error' },
        { title: '危险作业审批制度', dept: '安全部', date: '2025-08-15', icon: 'verified', iconBgClass: 'bg-success/10', iconTextClass: 'text-success' },
      ],
    }
  },
  methods: {
    goTo(path) {
      if (path) {
        uni.navigateTo({ url: path })
      }
    }
  }
}
</script>
<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  vertical-align: middle;
}
</style>
