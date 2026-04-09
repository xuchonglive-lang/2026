<template>
  <app-layout page-title="个人设置">
    <div class="max-w-[800px] mx-auto px-6 py-10">
      
      <!-- Top Action -->
      <button class="flex items-center gap-1 text-sm text-slate-500 hover:text-on-surface mb-8 font-medium transition-colors" @click="goBack">
        <span class="material-symbols-outlined text-[18px]">arrow_back</span>
        返回主页
      </button>

      <!-- Headings -->
      <header class="mb-10 border-b border-slate-200 pb-6">
        <h1 class="text-[32px] leading-snug font-bold text-on-surface mb-2 tracking-tight">账户设置与通知</h1>
        <p class="text-sm text-slate-500">管理平台系统如何通过微信、内网及客户端推送信息给您。</p>
      </header>

      <!-- Section: Global Setting -->
      <div class="card p-6 mb-8 bg-blue-50 border border-blue-100 flex items-center justify-between">
         <div>
           <h3 class="text-base font-bold text-blue-900 mb-1">接收所有消息通知 (总开关)</h3>
           <p class="text-sm text-blue-700 w-3/4">如关闭此选项，将暂停除了 "紧急挂牌预警" 和 "异常红色报警" 之外的所有系统通知、邮件和微信推送。请谨慎操作，以免遗漏重要工作。</p>
         </div>
         <label class="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input type="checkbox" v-model="settings.global" class="sr-only peer">
            <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
         </label>
      </div>

      <!-- Section: Detailed Notification Config -->
      <section class="mb-10">
        <h3 class="text-base font-bold text-on-surface mb-4">详细推送设置</h3>
        
        <div class="card overflow-hidden divide-y divide-slate-100 opacity-100 transition-opacity" :class="{'opacity-50 pointer-events-none': !settings.global}">
          
          <!-- Item 1 -->
          <div class="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
             <div class="flex gap-4">
                <span class="material-symbols-outlined mt-0.5 text-slate-400">notifications_active</span>
                <div>
                  <h4 class="text-[15px] font-semibold text-on-surface mb-0.5">系统公告及审核通知</h4>
                  <p class="text-sm text-slate-500">当您的流程审批通过或被驳回、以及发布全服公告时</p>
                </div>
             </div>
             <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.notifySys" class="sr-only peer">
                <div class="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
             </label>
          </div>

          <!-- Item 2 -->
          <div class="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
             <div class="flex gap-4">
                <span class="material-symbols-outlined mt-0.5 text-slate-400">school</span>
                <div>
                  <h4 class="text-[15px] font-semibold text-on-surface mb-0.5">教育培训提醒指标</h4>
                  <p class="text-sm text-slate-500">即将临近学时红线警告、新必修课发布时推送</p>
                </div>
             </div>
             <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.notifyTrain" class="sr-only peer">
                <div class="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
             </label>
          </div>

          <!-- Item 3 -->
           <div class="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
             <div class="flex gap-4">
                <span class="material-symbols-outlined mt-0.5 text-slate-400">assignment_turned_in</span>
                <div>
                  <h4 class="text-[15px] font-semibold text-on-surface mb-0.5">工作任务派发或超期</h4>
                  <p class="text-sm text-slate-500">有新的任务分配，或是到达填报预警日、里程碑变更时</p>
                </div>
             </div>
             <label class="relative inline-flex items-center cursor-not-allowed" title="该选项为管理员强制开启，无法修改">
                <input type="checkbox" checked disabled class="sr-only peer">
                <div class="w-11 h-6 bg-slate-300 rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-400 peer-checked:after:translate-x-full"></div>
             </label>
          </div>

        </div>
      </section>
      
      <!-- Section: Display -->
      <section>
         <h3 class="text-base font-bold text-on-surface mb-4">界面偏好偏好</h3>
         <div class="card p-8 flex flex-col items-center justify-center text-center">
            <span class="material-symbols-outlined text-[48px] text-slate-200 mb-3">dark_mode</span>
            <p class="text-sm font-semibold text-slate-600 mb-1">跟随系统夜间模式 / 黑暗主题</p>
            <p class="text-xs text-slate-400">此功能即将推出，敬请期待...</p>
         </div>
      </section>

      <!-- Action -->
      <div class="mt-12 pt-8 border-t border-slate-200 text-right">
        <button class="btn-primary w-full sm:w-auto px-10 py-2.5 flex items-center justify-center gap-2 max-sm:w-full ml-auto" @click="saveSet">
           <span class="material-symbols-outlined text-[18px]">done</span> 保存设置
        </button>
      </div>

    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'UserSettings',
  data() {
    return {
      settings: {
        global: true,
        notifySys: true,
        notifyTrain: false
      }
    }
  },
  methods: {
    goBack() { uni.navigateBack() },
    saveSet() {
      uni.showToast({ title: '通知偏好已更新', icon: 'success' })
    }
  }
}
</script>
