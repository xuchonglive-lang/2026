<template>
  <app-layout page-title="我的文档">
    <div class="py-12 max-w-[1350px] w-full mx-auto min-h-screen">
      <div class="w-full px-6 md:px-0">
        
        <!-- Top Action Area (Selector + Tabs) -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <!-- Tabs -->
          <section class="w-full md:w-auto order-2 md:order-1 border-b border-zinc-200 overflow-x-auto scrollbar-hide">
            <div role="tablist" class="flex gap-6 min-w-max">
              <button role="tab" class="pb-3 text-sm transition-all border-b-2 border-transparent text-zinc-500 hover:text-zinc-700" @click="goTo('/pages/pro-mgmt/index')">制度规范</button>
              <button role="tab" class="pb-3 text-sm transition-all border-b-2 border-transparent text-zinc-500 hover:text-zinc-700" @click="goTo('/pages/pro-mgmt/network')">管理网络</button>
              <button role="tab" class="pb-3 text-sm transition-all border-b-2 border-transparent text-zinc-500 hover:text-zinc-700" @click="goTo('/pages/pro-mgmt/calendar')">例行工作</button>
              <button role="tab" class="pb-3 text-sm transition-all border-b-2 border-zinc-900 text-zinc-900 font-bold">我的文档</button>
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

        <!-- Row 3: Content Area -->
        <div class="flex flex-col lg:flex-row gap-6 mt-6 items-start">
          
          <!-- Left: Folder Tree -->
          <aside class="w-full lg:w-[240px] shrink-0 bg-white border border-zinc-200 rounded-xl shadow-sm p-4 animate-fade-in">
            <ul class="flex flex-col gap-1 w-full text-sm font-medium text-zinc-600">
              <li class="px-2 py-1 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">文件夹</li>
              <li>
                <button class="w-full flex items-center gap-2 px-3 py-2 bg-zinc-100 text-zinc-900 font-semibold rounded-md border border-zinc-200 transition-colors text-left">
                  <span class="material-symbols-outlined text-lg font-light">folder_open</span> 我的文档
                </button>
                <ul class="mt-1 flex flex-col gap-0.5 ml-3 border-l px-2 border-zinc-200">
                  <li v-for="folder in subFolders" :key="folder">
                    <button class="w-full flex items-center gap-2 px-3 py-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-md transition-colors text-left text-[13px]">
                      <span class="material-symbols-outlined text-[16px] font-light">folder</span> {{ folder }}
                    </button>
                  </li>
                </ul>
              </li>
              <li class="mt-4">
                <button class="w-full flex items-center gap-2 px-3 py-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-md transition-colors text-left">
                  <span class="material-symbols-outlined text-lg font-light">folder_shared</span> 共享给我的
                </button>
              </li>
            </ul>
          </aside>

          <!-- Right: File Table -->
          <section class="flex-1 min-w-0 w-full animate-fade-in" style="animation-delay: 50ms;">
            <div class="bg-white border border-zinc-200 shadow-sm rounded-xl overflow-hidden">
              <!-- Toolbar -->
              <div class="p-4 flex flex-col sm:flex-row items-center justify-between border-b border-zinc-100 gap-4 bg-white">
                <div class="flex gap-3 w-full sm:w-auto">
                  <button class="flex items-center gap-2 px-4 py-1.5 bg-zinc-900 text-white hover:bg-zinc-800 text-sm font-semibold rounded-md shadow-sm transition-colors w-full sm:w-auto justify-center">
                    <span class="material-symbols-outlined text-[18px]">upload</span> 上传文件
                  </button>
                  <button class="flex items-center gap-2 px-4 py-1.5 bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 text-sm font-medium rounded-md shadow-sm transition-colors w-full sm:w-auto justify-center">
                    <span class="material-symbols-outlined text-[18px]">create_new_folder</span> 新建文件夹
                  </button>
                </div>
                <div class="relative w-full sm:w-auto">
                  <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[18px]">search</span>
                  <input class="w-full sm:w-[240px] pl-9 pr-3 py-1.5 bg-white border border-zinc-200 rounded-md text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 shadow-sm transition-colors" placeholder="搜索文件..." type="text"/>
                </div>
              </div>

              <!-- File Table -->
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-left whitespace-nowrap">
                  <thead class="text-xs text-zinc-500 uppercase bg-zinc-50 border-b border-zinc-100">
                    <tr>
                      <th class="w-12 px-6 py-4">
                        <input type="checkbox" class="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"/>
                      </th>
                      <th class="px-6 py-4 font-medium">文件名</th>
                      <th class="px-6 py-4 font-medium">大小</th>
                      <th class="px-6 py-4 font-medium">类型</th>
                      <th class="px-6 py-4 font-medium">上传时间</th>
                      <th class="px-6 py-4 font-medium text-right w-32">操作</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-zinc-100 bg-white">
                    <tr v-for="file in files" :key="file.name" class="hover:bg-zinc-50 transition-colors group">
                      <td class="px-6 py-3">
                        <input type="checkbox" class="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"/>
                      </td>
                      <td class="px-6 py-3">
                        <div class="flex items-center gap-3">
                          <!-- Neutral icons for technical minimalist feel -->
                          <div class="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0">
                             <span class="material-symbols-outlined text-[20px] text-zinc-600 font-light">{{ file.icon }}</span>
                          </div>
                          <span class="text-[14px] font-semibold text-zinc-900 group-hover:underline transition-colors line-clamp-1 truncate max-w-[200px] lg:max-w-xs">{{ file.name }}</span>
                        </div>
                      </td>
                      <td class="px-6 py-3 font-mono text-sm text-zinc-500">{{ file.size }}</td>
                      <td class="px-6 py-3 text-sm text-zinc-500">{{ file.type }}</td>
                      <td class="px-6 py-3 font-mono text-sm text-zinc-500">{{ file.date }}</td>
                      <td class="px-6 py-3 text-right">
                        <div class="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button class="w-8 h-8 rounded-md inline-flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"><span class="material-symbols-outlined text-[18px]">download</span></button>
                          <button class="w-8 h-8 rounded-md inline-flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"><span class="material-symbols-outlined text-[18px]">share</span></button>
                          <button class="w-8 h-8 rounded-md inline-flex items-center justify-center text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors"><span class="material-symbols-outlined text-[18px]">delete</span></button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Pagination -->
              <div class="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between text-sm text-zinc-500 gap-4">
                <span class="font-medium">显示 {{ files.length }} / {{ files.length }} 个项目</span>
                <div class="join shadow-sm border border-zinc-200 rounded-md">
                  <button class="join-item btn btn-sm bg-white border-none shadow-none font-medium text-zinc-300" disabled>
                    <span class="material-symbols-outlined text-[18px]">chevron_left</span>
                  </button>
                  <button class="join-item btn btn-sm border-x border-y-0 border-zinc-200 bg-zinc-900 text-white shadow-none font-medium px-4">1</button>
                  <button class="join-item btn btn-sm bg-white border-none hover:bg-zinc-100 shadow-none font-medium text-zinc-300" disabled>
                    <span class="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'ProMgmtMyDocs',
  data() {
    return {
      subFolders: ['安全检查记录', '月度报告', '培训材料'],
      files: [
        { name: '2024年第一季度安全评估报告.pdf', size: '2.4 MB', type: 'PDF 文档', date: '2024-03-15 14:20', icon: 'picture_as_pdf' },
        { name: '设备维护标准作业程序(SOP).docx', size: '856 KB', type: 'Word 文档', date: '2024-03-12 09:45', icon: 'description' },
        { name: '安全隐患排查整改清单_v2.xlsx', size: '1.2 MB', type: 'Excel 表格', date: '2024-03-10 16:30', icon: 'table_chart' },
        { name: '新员工入职安全培训.pptx', size: '15.8 MB', type: 'PPT 演示文稿', date: '2024-03-05 11:15', icon: 'present_to_all' },
        { name: '生产车间安全出口示意图.jpg', size: '4.1 MB', type: 'JPG 图片', date: '2024-03-01 10:00', icon: 'image' },
      ],
    }
  },
  methods: {
    goTo(path) { uni.navigateTo({ url: path }) },
  }
}
</script>
