<template>
  <app-layout page-title="例行工作">
    <div class="py-12 max-w-[1350px] w-full mx-auto min-h-screen">
      <div class="w-full px-6 md:px-0">
        
        <!-- Top Action Area (Selector + Tabs) -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <!-- Tabs -->
          <section class="w-full md:w-auto order-2 md:order-1 border-b border-zinc-200 overflow-x-auto scrollbar-hide">
            <div role="tablist" class="flex gap-6 min-w-max">
              <button role="tab" class="pb-3 text-sm transition-all border-b-2 border-transparent text-zinc-500 hover:text-zinc-700" @click="goTo('/pages/pro-mgmt/index')">制度规范</button>
              <button role="tab" class="pb-3 text-sm transition-all border-b-2 border-transparent text-zinc-500 hover:text-zinc-700" @click="goTo('/pages/pro-mgmt/network')">管理网络</button>
              <button role="tab" class="pb-3 text-sm transition-all border-b-2 border-zinc-900 text-zinc-900 font-bold">例行工作</button>
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

        <!-- ROW 3: Two Column Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 items-start">
          <!-- LEFT: Calendar -->
          <div class="bg-white p-6 shadow-sm border border-zinc-200 rounded-xl overflow-hidden relative z-10 animate-fade-in">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div class="flex items-center gap-2">
                <button class="w-8 h-8 rounded-md inline-flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors" @click="prevMonth">
                  <span class="material-symbols-outlined">chevron_left</span>
                </button>
                <h2 class="text-xl font-bold text-zinc-900 w-32 text-center tracking-tight">{{ currentYear }}年{{ currentMonth }}月</h2>
                <button class="w-8 h-8 rounded-md inline-flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors" @click="nextMonth">
                  <span class="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
              
              <div class="join border border-zinc-200 rounded-md bg-zinc-50 p-0.5 shadow-sm">
                <button class="join-item btn btn-xs bg-white border-none shadow-sm font-medium text-zinc-900 px-4 rounded-sm">月</button>
                <button class="join-item btn btn-xs bg-transparent border-none hover:bg-zinc-200 font-medium text-zinc-500 hover:text-zinc-900 px-4 rounded-sm transition-colors">周</button>
                <button class="join-item btn btn-xs bg-transparent border-none hover:bg-zinc-200 font-medium text-zinc-500 hover:text-zinc-900 px-4 rounded-sm transition-colors">日</button>
              </div>
            </div>
            
            <!-- Legend -->
            <div class="flex flex-wrap items-center gap-5 mb-6">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-zinc-900"></span>
                <span class="text-xs font-semibold text-zinc-600">自己添加</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-zinc-500"></span>
                <span class="text-xs font-semibold text-zinc-600">领导分配</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full border border-zinc-400 bg-zinc-100"></span>
                <span class="text-xs font-semibold text-zinc-600">上级部门分配</span>
              </div>
            </div>
            
            <!-- Calendar Grid -->
            <div class="grid grid-cols-7 border-t border-l border-zinc-200 rounded-tl-lg bg-zinc-200 gap-[1px]">
              <div v-for="day in weekDays" :key="day" class="bg-zinc-50 py-3 text-center text-xs font-bold tracking-widest" :class="['六','日'].includes(day) ? 'text-zinc-900' : 'text-zinc-500'">{{ day }}</div>
              
              <div v-for="(cell, idx) in calendarCells" :key="idx"
                   class="h-28 bg-white p-2 flex flex-col hover:bg-zinc-50 transition-colors group relative cursor-pointer"
                   :class="[cell.isToday ? 'bg-zinc-50/50' : '', cell.isPrev ? 'opacity-40' : '']">
                <span class="text-sm self-end rounded-full w-7 h-7 flex items-center justify-center font-bold" :class="cell.isToday ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-700 group-hover:bg-zinc-100'">{{ cell.day }}</span>
                <div class="mt-1.5 flex-1 overflow-y-auto scrollbar-hide space-y-1.5">
                  <div v-if="cell.event" class="text-[10px] rounded px-1.5 py-1 leading-tight truncate font-bold shadow-sm relative z-10 border" :class="cell.event.bgClass">{{ cell.event.title }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT: Today's Work List -->
          <div class="flex flex-col animate-fade-in" style="animation-delay: 50ms;">
            <div class="flex items-center justify-between border-b border-zinc-200 pb-3 mb-4">
              <h2 class="text-lg font-bold text-zinc-900">今日巡检与工作</h2>
              <span class="text-xs font-medium text-zinc-500 flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">calendar_today</span> 12月15日</span>
            </div>
            
            <div class="space-y-4">
              <div v-for="work in todayWorks" :key="work.title"
                   class="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm hover:shadow hover:border-zinc-300 transition-all cursor-pointer relative overflow-hidden group">
                <!-- status line indicator left side -->
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-zinc-200 group-hover:bg-zinc-400 transition-colors" :class="work.barClass"></div>
                
                <div class="pl-2 flex flex-col gap-3">
                  <div class="flex justify-between items-start">
                    <h3 class="text-base font-semibold text-zinc-900 leading-tight pr-4">{{ work.title }}</h3>
                    <div class="px-2 py-0.5 rounded text-[10px] font-bold border whitespace-nowrap shrink-0" :class="work.tagClass">{{ work.tag }}</div>
                  </div>
                  
                  <p class="text-xs text-zinc-500 font-mono flex items-center gap-1.5 font-medium bg-zinc-50 border border-zinc-100 w-fit px-2 py-1 rounded inline-flex">
                    <span class="material-symbols-outlined text-[14px] text-zinc-400">{{ work.timeIcon }}</span>
                    {{ work.time }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- FAB -->
        <button class="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center shadow-lg hover:shadow-xl fixed bottom-10 right-10 z-50 cursor-pointer group hover:scale-105 active:scale-95 transition-all focus:outline-none">
          <span class="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform duration-300 font-light">add</span>
        </button>
      </div>
    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'ProMgmtCalendar',
  data() {
    return {
      currentYear: 2025,
      currentMonth: 12,
      weekDays: ['一','二','三','四','五','六','日'],
      todayWorks: [
        { title: '安全巡检', time: '10:00 - 11:30', timeIcon: 'schedule', barClass: '!bg-zinc-900', tag: '地点: 生产车间', tagClass: 'bg-zinc-100 text-zinc-800 border-zinc-200' },
        { title: '上级安全审查', time: '14:00 - 16:00', timeIcon: 'schedule', barClass: '!bg-zinc-500', tag: '地点: 会议室 302', tagClass: 'bg-zinc-100 text-zinc-800 border-zinc-200' },
        { title: '月度报告提交', time: '截止: 18:00', timeIcon: 'timer', barClass: '!bg-zinc-300', tag: '待办', tagClass: 'bg-white text-zinc-900 border-zinc-300 shadow-sm' },
      ],
    }
  },
  computed: {
    calendarCells() {
      const cells = []
      // Previous month padding (Week 1: 24-30 Nov)
      for (let d = 24; d <= 30; d++) cells.push({ day: d, isPrev: true })
      // Events map
      const events = {
        2: { title: '安全巡检', bgClass: 'bg-zinc-900 text-white border-zinc-900' },
        5: { title: '月度报告', bgClass: 'bg-white text-zinc-900 border-zinc-300' },
        8: { title: '设备检查', bgClass: 'bg-zinc-900 text-white border-zinc-900' },
        15: { title: '上级安全审查', bgClass: 'bg-zinc-500 text-white border-zinc-500' },
        20: { title: '培训准备', bgClass: 'bg-zinc-900 text-white border-zinc-900' },
        25: { title: '年终总结', bgClass: 'bg-white text-zinc-900 border-zinc-300' },
      }
      for (let d = 1; d <= 28; d++) {
        cells.push({ day: d, isToday: d === 15, event: events[d] || null })
      }
      return cells
    }
  },
  methods: {
    prevMonth() { if (this.currentMonth > 1) this.currentMonth--; else { this.currentMonth = 12; this.currentYear--; } },
    nextMonth() { if (this.currentMonth < 12) this.currentMonth++; else { this.currentMonth = 1; this.currentYear++; } },
    goTo(path) { uni.navigateTo({ url: path }) },
  }
}
</script>
