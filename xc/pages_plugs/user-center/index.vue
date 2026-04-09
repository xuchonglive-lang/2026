<template>
  <app-layout page-title="个人中心">
    <div class="max-w-content mx-auto px-6 py-8">
      
      <!-- Layout: Profile + Sections -->
      <div class="flex flex-col lg:flex-row gap-6">
        
        <!-- Left Profile Card (300px) -->
        <div class="w-full lg:w-[300px] flex-shrink-0">
          <div class="card p-6 flex flex-col items-center text-center">
            <!-- Avatar -->
            <div class="w-20 h-20 rounded-full bg-slate-200 border-4 border-white shadow-sm flex items-center justify-center mb-4 relative">
              <span class="text-2xl font-bold text-slate-500">{{ user.name[0] }}</span>
              <div class="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
            </div>
            <!-- Info -->
            <h2 class="text-xl font-bold text-on-surface mb-1">{{ user.name }}</h2>
            <p class="text-sm text-on-surface-variant mb-4">{{ user.role }} | {{ user.dept }}</p>
            <button class="btn-secondary w-full mb-6" @click="goTo('/pages_plugs/user-center/profile')">完善个人信息</button>
            
            <!-- Stats -->
            <div class="w-full flex justify-between px-4 py-4 bg-slate-50 rounded-lg">
              <div class="text-center">
                <p class="text-[20px] font-bold text-on-surface">5</p>
                <p class="text-[11px] text-slate-500 font-medium">待办</p>
              </div>
              <div class="w-px bg-slate-200"></div>
              <div class="text-center">
                <p class="text-[20px] font-bold text-on-surface">128</p>
                <p class="text-[11px] text-slate-500 font-medium">已办</p>
              </div>
              <div class="w-px bg-slate-200"></div>
              <div class="text-center">
                <p class="text-[20px] font-bold text-on-surface text-amber-600">1200</p>
                <p class="text-[11px] text-slate-500 font-medium">积分</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Sections -->
        <div class="flex-1 min-w-0 space-y-6">
          
          <!-- Common Functions Grid -->
          <div class="card p-6">
            <h3 class="text-h3 text-on-surface mb-6">常用功能</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div v-for="menu in menus" :key="menu.title"
                   class="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer group"
                   @click="goTo(menu.path)">
                <div class="w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110" :class="menu.bgClass">
                  <span class="material-symbols-outlined text-xl" :class="menu.iconClass">{{ menu.icon }}</span>
                </div>
                <span class="text-sm font-medium text-on-surface">{{ menu.title }}</span>
                <span class="text-helper text-slate-400 mt-1">{{ menu.desc }}</span>
              </div>
            </div>
          </div>

          <!-- Recent Activity Timeline -->
          <div class="card p-6">
            <h3 class="text-h3 text-on-surface mb-6 flex items-center justify-between">
              最近动态
              <button class="text-sm text-secondary font-medium">全部</button>
            </h3>
            <div class="space-y-0">
              <div v-for="(act, idx) in activities" :key="idx" class="flex gap-4 pb-6 relative">
                <!-- Line -->
                <div v-if="idx < activities.length - 1" class="absolute left-4 top-8 bottom-0 w-px bg-slate-100"></div>
                <!-- Node Marker -->
                <div class="w-8 h-8 rounded-full flex items-center justify-center z-10 flex-shrink-0 bg-slate-50 ring-2 ring-white" :class="act.statusBg">
                  <span class="material-symbols-outlined text-[14px]" :class="act.statusIconColor">{{ act.icon }}</span>
                </div>
                <!-- Content -->
                <div class="flex-1 min-w-0 pt-1">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <p class="text-sm text-on-surface font-medium">{{ act.desc }} 
                      <span class="text-blue-600 cursor-pointer hover:underline">{{ act.target }}</span>
                    </p>
                    <span class="text-helper text-slate-400 flex-shrink-0">{{ act.time }}</span>
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
  name: 'UserCenterIndex',
  data() {
    return {
      user: { name: '张三', role: '超级管理员', dept: '技术部' },
      menus: [
        { title: '我的任务', desc: '查看待办事项', icon: 'task_alt', bgClass: 'bg-blue-50', iconClass: 'text-blue-600', path: '/pages_plugs/user-center/my-tasks' },
        { title: '我的工作', desc: '例行工作管理', icon: 'work', bgClass: 'bg-indigo-50', iconClass: 'text-indigo-600', path: '/pages_plugs/user-center/my-work' },
        { title: '我的培训', desc: '课程学习进度', icon: 'school', bgClass: 'bg-emerald-50', iconClass: 'text-emerald-600', path: '/pages_plugs/user-center/my-training' },
        { title: '我的阅读', desc: '文章浏览历史', icon: 'menu_book', bgClass: 'bg-amber-50', iconClass: 'text-amber-600', path: '/pages_plugs/user-center/my-reading' },
        { title: '我的反馈', desc: '反馈处理记录', icon: 'forum', bgClass: 'bg-rose-50', iconClass: 'text-rose-600', path: '/pages_plugs/user-center/my-feedback' },
        { title: '个人设置', desc: '系统偏好设置', icon: 'settings', bgClass: 'bg-slate-100', iconClass: 'text-slate-600', path: '/pages_plugs/user-center/settings' },
      ],
      activities: [
        { desc: '完成了任务', target: '变电站维护检修', time: '今天 10:30', icon: 'check', statusBg: 'bg-emerald-50', statusIconColor: 'text-emerald-600' },
        { desc: '阅读了规章制度', target: '电气设备安全操作规程V3.0', time: '昨天 15:45', icon: 'visibility', statusBg: 'bg-blue-50', statusIconColor: 'text-blue-600' },
        { desc: '提交了过程反馈于', target: '消防演练专项计划', time: '昨天 09:15', icon: 'edit', statusBg: 'bg-amber-50', statusIconColor: 'text-amber-600' },
        { desc: '开始学习课程', target: '急救知识与心肺复苏实操', time: '12-25 14:00', icon: 'play_arrow', statusBg: 'bg-purple-50', statusIconColor: 'text-purple-600' },
      ]
    }
  },
  methods: {
    goTo(path) { uni.navigateTo({ url: path }) }
  }
}
</script>
