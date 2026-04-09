<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-zinc-900 font-sans">
    <div class="text-[120px] md:text-[160px] font-black tracking-tighter text-zinc-100 leading-none mb-4 selection:bg-transparent">404</div>
    <h1 class="text-2xl md:text-3xl font-bold tracking-tight mb-2">页面未找到</h1>
    <p class="text-zinc-500 text-[14px] mb-8 text-center max-w-sm">抱歉，您访问的页面不存在或已被移除。<br/>请检查链接是否正确。</p>
    <button class="h-10 px-6 rounded-md bg-zinc-900 text-white text-[13px] font-semibold hover:bg-zinc-800 transition-colors shadow-sm inline-flex items-center gap-2" @click="goHome">
      <span class="material-symbols-outlined text-[16px]">arrow_back</span>
      返回上一页
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      // 尝试返回上一页，如果失败（例如直接输入的链接打开的页面），则返回首页
      const pages = getCurrentPages();
      if (pages.length > 1) {
        uni.navigateBack();
      } else {
        uni.reLaunch({ url: '/pages/workbench/index' })
      }
    },
  },
}
</script>