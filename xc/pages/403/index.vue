<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-zinc-900 font-sans">
    <div class="text-[120px] md:text-[160px] font-black tracking-tighter text-zinc-100 leading-none mb-4 selection:bg-transparent">403</div>
    <h1 class="text-2xl md:text-3xl font-bold tracking-tight mb-2">访问受限</h1>
    <p class="text-zinc-500 text-[14px] mb-8 text-center max-w-sm">您没有访问此区域的权限，<br/>请联系系统管理员获取相关授权。</p>
    <button class="h-10 px-6 rounded-md bg-zinc-900 text-white text-[13px] font-semibold hover:bg-zinc-800 transition-colors shadow-sm inline-flex items-center gap-2" @click="goHome">
      <span class="material-symbols-outlined text-[16px]">home</span>
      返回工作台
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      uni.reLaunch({ url: '/pages/workbench/index' })
    },
  },
}
</script>
