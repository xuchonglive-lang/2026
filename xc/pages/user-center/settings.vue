<template>
  <app-layout page-title="个人设置">
    <div class="py-12 w-full max-w-[1350px] mx-auto min-h-screen px-6 md:px-0 flex justify-center">
      
      <div class="w-full max-w-2xl bg-white border border-zinc-200 shadow-sm rounded-2xl p-8 md:p-12 animate-fade-in relative overflow-hidden">
        <!-- Top decorative thin line -->
        <div class="absolute top-0 left-0 w-full h-1 bg-zinc-900"></div>

        <h1 class="text-[28px] md:text-[32px] font-extrabold text-zinc-900 mb-8 tracking-tight">个人设置</h1>
        
        <!-- Section 1: Notification Settings -->
        <section class="mb-10">
          <h2 class="text-[16px] font-bold text-zinc-900 mb-6 flex items-center gap-2">
             <span class="material-symbols-outlined text-[20px] text-zinc-500">notifications</span> 消息通知
          </h2>
          
          <div class="bg-zinc-50 border border-zinc-200 rounded-xl p-6 shadow-sm">
            <!-- Master Toggle -->
            <div class="flex items-center justify-between pb-6 border-b border-zinc-200 mb-6">
              <div>
                <label class="text-[15px] font-bold text-zinc-900 block mb-1">接收所有通知</label>
                <span class="text-[12px] text-zinc-500">开启后将接收所有系统级和业务级消息推送</span>
              </div>
              <button class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
                      :class="settings.masterNotification ? 'bg-zinc-900' : 'bg-zinc-200'"
                      @click="settings.masterNotification = !settings.masterNotification">
                <span class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      :class="settings.masterNotification ? 'translate-x-5' : 'translate-x-0'"></span>
              </button>
            </div>
            
            <!-- Sub Toggles -->
            <div class="space-y-5">
              <div v-for="toggle in subToggles" :key="toggle.key" class="flex items-center justify-between group">
                <span class="text-[14px] font-medium text-zinc-700 transition-colors" :class="settings[toggle.key] ? 'text-zinc-900 font-bold' : ''">{{ toggle.label }}</span>
                <button class="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors focus:outline-none"
                        :class="settings[toggle.key] ? 'bg-zinc-900' : 'bg-zinc-200'"
                        @click="settings[toggle.key] = !settings[toggle.key]">
                  <span class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                        :class="settings[toggle.key] ? 'translate-x-4' : 'translate-x-0'"></span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 2: Interface Preferences -->
        <section class="mb-10">
          <h2 class="text-[16px] font-bold text-zinc-900 mb-6 flex items-center gap-2">
             <span class="material-symbols-outlined text-[20px] text-zinc-500">palette</span> 界面偏好
          </h2>
          <div class="py-16 flex flex-col items-center justify-center bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-xl hover:bg-zinc-100 transition-colors">
            <span class="material-symbols-outlined text-[32px] text-zinc-300 mb-2">construction</span>
            <span class="text-[14px] font-bold text-zinc-400">此功能模块即将开放</span>
          </div>
        </section>

        <div class="w-full h-px bg-zinc-200 my-8"></div>

        <!-- Save Button -->
        <div class="flex justify-end gap-4">
          <button class="px-6 py-2.5 bg-white border border-zinc-200 text-zinc-700 text-[14px] font-semibold rounded-md shadow-sm hover:bg-zinc-50 transition-colors" @click="goBack">取消</button>
          <button class="px-6 py-2.5 bg-zinc-900 text-white text-[14px] font-semibold rounded-md shadow-sm hover:bg-zinc-800 transition-colors">保存设置</button>
        </div>
      </div>

    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'UserCenterSettings',
  data() {
    return {
      settings: {
        masterNotification: true,
        systemNotification: true,
        trainingNotification: true,
        workNotification: true,
        infoNotification: false,
      },
      subToggles: [
        { key: 'systemNotification', label: '系统通知' },
        { key: 'trainingNotification', label: '培训提醒' },
        { key: 'workNotification', label: '工作派发与流转' },
        { key: 'infoNotification', label: '信息发布动态' },
      ],
    }
  },
  methods: {
    goBack() { uni.navigateBack() }
  }
}
</script>
