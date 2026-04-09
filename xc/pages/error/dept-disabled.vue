<template>
  <div class="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 text-zinc-900 font-sans">
    <div class="bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-zinc-200 max-w-md w-full text-center flex flex-col items-center">
      <div class="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6">
        <span class="material-symbols-outlined text-3xl">domain_disabled</span>
      </div>
      <h1 class="text-2xl font-bold tracking-tight mb-3">部门已停用</h1>
      <p class="text-zinc-500 text-[14px] mb-8 leading-relaxed">
        您所属的部门已被管理员停用，暂时无法使用业务功能。请联系企业管理员恢复部门状态或重新分配部门。
      </p>
      <button class="w-full h-10 rounded-md bg-zinc-900 text-white text-[14px] font-semibold hover:bg-zinc-800 transition-colors shadow-sm inline-flex items-center justify-center gap-2" @click="handleLogout">
        退出当前账号
        <span class="material-symbols-outlined text-[16px]">logout</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      // 容错处理
      uni.reLaunch({ url: '/pages/login/index' });
    }
  }
}
</script>
