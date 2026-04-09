<template>
  <app-layout page-title="个人中心">
    <div class="py-12 max-w-[1350px] w-full mx-auto min-h-screen px-6 md:px-0">
      
      <!-- User Profile Section -->
      <section class="max-w-3xl mx-auto bg-white border border-zinc-200 shadow-sm rounded-2xl p-10 mb-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 animate-fade-in relative overflow-hidden">
        <div class="absolute top-0 left-0 w-2 h-full bg-zinc-900"></div>
        <div class="w-24 h-24 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-[40px] text-zinc-300 font-light">person</span>
        </div>
        <div class="flex flex-col items-center md:items-start text-center md:text-left flex-grow">
          <h1 class="text-[28px] font-extrabold text-zinc-900 mb-2 tracking-tight">{{ userName }}</h1>
          <span class="px-3 py-1 bg-zinc-100 text-zinc-600 border border-zinc-200 text-[12px] font-bold tracking-wider rounded-sm uppercase mb-4">{{ userDept }}</span>
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6">
            <span v-for="role in userRoles" :key="role.label" class="px-2.5 py-1 text-[11px] font-bold tracking-wider rounded-sm border" :class="role.class">{{ role.label }}</span>
          </div>
          <button class="px-6 py-2 bg-zinc-900 text-white text-[13px] font-semibold rounded-md shadow-sm hover:bg-zinc-800 transition-colors w-full md:w-auto" @click="goTo('/pages/user-center/settings')">
            编辑个人资料
          </button>
        </div>
      </section>

      <!-- Function Grid -->
      <section class="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 animate-fade-in" style="animation-delay: 50ms;">
        <button v-for="item in menuItems" :key="item.label"
                class="bg-white border border-zinc-200 shadow-sm rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:border-zinc-400 hover:shadow-md transition-all group relative focus:outline-none"
                @click="goTo(item.path)">
          <div class="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-50 border border-zinc-200 group-hover:bg-zinc-900 group-hover:border-zinc-900 transition-colors shrink-0">
            <span class="material-symbols-outlined text-zinc-600 group-hover:text-white transition-colors">{{ item.icon }}</span>
          </div>
          <span class="text-[14px] font-bold text-zinc-900">{{ item.label }}</span>
          <span v-if="item.badge" class="absolute top-4 right-4 w-5 h-5 bg-zinc-900 text-white text-[11px] font-bold flex items-center justify-center rounded-full shadow-sm">{{ item.badge }}</span>
        </button>
      </section>

    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'UserCenter',
  data() {
    return {
      userName: '超级管理员',
      userDept: '信息技术部',
      userRoles: [
        { label: '系统管理员', class: 'bg-zinc-900 text-white border-zinc-900' },
        { label: '安全审计', class: 'bg-zinc-50 text-zinc-600 border-zinc-200' },
      ],
      menuItems: [
        { label: '我的消息', icon: 'mail', badge: 5, path: '/pages/message/list' },
        { label: '我的任务', icon: 'assignment', badge: 2, path: '/pages/key-work/list' },
        { label: '我的反馈', icon: 'chat', badge: null, path: '' },
        { label: '我的阅读', icon: 'menu_book', badge: null, path: '' },
        { label: '我的培训', icon: 'school', badge: null, path: '' },
        { label: '我的工作', icon: 'work', badge: null, path: '' },
        { label: '个人设置', icon: 'settings', badge: null, path: '/pages/user-center/settings' },
      ],
    }
  },
  methods: {
    goTo(path) { if (path) uni.navigateTo({ url: path }) },
  }
}
</script>
