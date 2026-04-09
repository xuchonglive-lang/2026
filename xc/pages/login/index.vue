<template>
  <div class="min-h-screen bg-zinc-50 text-zinc-900 antialiased flex flex-col md:flex-row shadow-2xl overflow-hidden font-sans selection:bg-zinc-900 selection:text-white">
    
    <!-- Left Panel: Premium Branding -->
    <section class="hidden md:flex w-full md:w-[45%] lg:w-1/2 bg-zinc-950 text-zinc-50 relative flex-col justify-between p-12 lg:p-16 overflow-hidden items-start border-r border-zinc-800/50">
      <!-- Sophisticated Background -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-zinc-500 opacity-[0.15] blur-[100px]"></div>
      <div class="absolute bottom-[-20%] left-[-10%] z-0 h-[500px] w-[500px] rounded-full bg-zinc-400 opacity-[0.1] blur-[120px]"></div>
      
      <!-- Logo Branding -->
      <div class="z-10 flex items-center gap-4 group cursor-default">
        <div class="w-12 h-12 bg-white text-zinc-950 rounded-xl flex items-center justify-center font-black text-2xl shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">XC</div>
        <div class="flex flex-col">
           <span class="font-extrabold tracking-tight text-xl leading-none">XC Platform</span>
           <span class="text-zinc-500 text-xs font-semibold tracking-widest uppercase mt-1">Enterprise Core</span>
        </div>
      </div>

      <!-- Hero Message -->
      <div class="z-10 max-w-lg mt-12">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-md mb-8">
           <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
           <span class="text-xs font-medium text-zinc-300 tracking-wide">System Online & Secured</span>
        </div>
        <h1 class="text-[40px] lg:text-[56px] font-black tracking-tighter leading-[1.1] mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500">
          数字化转型底座<br/>赋能高效协作.
        </h1>
        <p class="text-zinc-400 text-[16px] lg:text-[18px] leading-relaxed font-medium max-w-md">
          The ultimate platform for enterprise management, bridging the gap between traditional processes and modern digital workflows with pixel-perfect precision.
        </p>
      </div>

      <!-- Footer / Social Proof -->
      <div class="z-10 mt-auto pt-16 w-full">
        <div class="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent mb-8"></div>
        <div class="flex items-center justify-between">
           <p class="text-zinc-500 font-semibold text-[13px] tracking-wider uppercase">© 2026 XC Platform</p>
           <div class="flex gap-2">
              <div class="w-2 h-2 rounded-full bg-zinc-700"></div>
              <div class="w-2 h-2 rounded-full bg-zinc-700"></div>
              <div class="w-2 h-2 rounded-full bg-zinc-300"></div>
           </div>
        </div>
      </div>
    </section>

    <!-- Right Panel: Login Interface -->
    <section class="w-full md:w-[55%] lg:w-1/2 bg-white flex flex-col justify-center items-center relative p-8 md:p-16 min-h-screen">
      <!-- Abstract subtle top-right glow -->
      <div class="absolute top-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-zinc-100 opacity-50 blur-[80px]"></div>

      <div class="w-full max-w-[380px] flex flex-col mx-auto my-auto relative z-10">
        <!-- Mobile Header (hidden on desktop) -->
        <div class="md:hidden flex items-center gap-4 mb-16 justify-center">
           <div class="w-12 h-12 bg-zinc-950 text-white rounded-xl flex items-center justify-center font-black text-2xl shadow-xl">XC</div>
           <div class="flex flex-col items-start">
             <span class="font-black tracking-tight text-2xl text-zinc-900 leading-none">XC Platform</span>
             <span class="text-zinc-500 text-xs font-bold tracking-widest uppercase mt-1">Enterprise Core</span>
           </div>
        </div>

        <!-- Header -->
        <div class="mb-10 text-center md:text-left">
          <h2 class="text-[32px] font-black text-zinc-900 tracking-tight mb-3">欢迎回来</h2>
          <p class="text-zinc-500 text-[15px] font-medium block">输入您的凭证以访问安全管控空间</p>
        </div>

        <!-- Sleek Tabs -->
        <div class="flex items-center w-full mb-10 bg-zinc-100/80 p-1.5 rounded-xl shadow-inner border border-zinc-200/50">
          <button class="flex-1 py-2.5 text-[14px] font-bold rounded-lg transition-all duration-300 relative overflow-hidden focus:outline-none" 
                  :class="activeLoginTab === 'wechat' ? 'bg-white text-zinc-950 shadow-[0_2px_10px_rgba(0,0,0,0.06)]' : 'text-zinc-500 hover:text-zinc-900'" 
                  @click="activeLoginTab = 'wechat'">
             微信免密
          </button>
          <button class="flex-1 py-2.5 text-[14px] font-bold rounded-lg transition-all duration-300 relative overflow-hidden focus:outline-none" 
                  :class="activeLoginTab === 'account' ? 'bg-white text-zinc-950 shadow-[0_2px_10px_rgba(0,0,0,0.06)]' : 'text-zinc-500 hover:text-zinc-900'" 
                  @click="activeLoginTab = 'account'">
             账号密码
          </button>
        </div>

        <!-- Tab Content: WeChat -->
        <div v-show="activeLoginTab === 'wechat'" class="flex flex-col items-center animate-slide-up w-full">
          <div class="border border-zinc-200 shadow-xl shadow-zinc-200/40 rounded-2xl p-4 bg-white w-full max-w-[280px] aspect-square flex items-center justify-center relative group cursor-pointer mb-8 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-300/50 hover:-translate-y-1">
            <img class="w-full h-full object-contain opacity-95 transition-opacity duration-300 group-hover:opacity-20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM_CEFP5aQNBCzAg-i_qlpFGU3ybZDJlgIHtbLRvwFhnpmQRATJl8jXD31YiP3DIevxA8hNVTOWzP4GWWsOzDodl2qIQRJhu3oEL2qpWVU2Srv_a1eIjq26M4fcGDaSpMjoVfr14Md5I-Qdqj1KiTjOlSPPLLHy5hO0QHi_TbQBsNSyuDgougIUzBtEa-qw0aDc1m6HbHQN5Jq8GPShTpyNzJSZLS8mOfVytcCKi-2ISOOjbE_2DHh4J4S_2n80U-p-7RF3lBi68k"/>
            <div class="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100">
              <span class="material-symbols-outlined text-[40px] text-zinc-950 mb-3 animate-spin-slow">refresh</span>
              <span class="text-[14px] font-bold text-zinc-950 tracking-wide px-4 py-2 bg-zinc-100 rounded-full">点击刷新二维码</span>
            </div>
          </div>
          <p class="text-[14px] text-zinc-500 font-semibold flex items-center gap-2 justify-center bg-zinc-50 px-5 py-2.5 rounded-full border border-zinc-200/60">
            <span class="material-symbols-outlined text-[18px] text-emerald-500">verified_user</span>
            企业微信安全接入
          </p>
        </div>

        <!-- Tab Content: Account -->
        <div v-show="activeLoginTab === 'account'" class="space-y-5 w-full animate-slide-up">
          <div class="space-y-2 relative group focus-within:z-10">
             <label class="text-[14px] font-bold text-zinc-900 block transition-colors group-focus-within:text-zinc-950">账号</label>
             <div class="relative flex items-center">
               <span class="material-symbols-outlined absolute left-3.5 text-zinc-400 group-focus-within:text-zinc-950 transition-colors text-[20px]">person</span>
               <input v-model="loginForm.username" type="text" 
                      class="w-full h-12 pl-11 pr-4 bg-zinc-50 border border-zinc-200 rounded-xl text-[15px] font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 focus:bg-white transition-all shadow-sm" 
                      placeholder="邮箱 或 员工编号" @keyup.enter="handleLogin" />
             </div>
          </div>
          
          <div class="space-y-2 relative group focus-within:z-10 mt-6">
             <div class="flex items-center justify-between">
               <label class="text-[14px] font-bold text-zinc-900 block transition-colors group-focus-within:text-zinc-950">密码</label>
               <a href="#" class="text-[13px] font-semibold text-zinc-500 hover:text-zinc-900 transition-colors underline-offset-4 hover:underline">忘记密码?</a>
             </div>
             <div class="relative flex items-center">
               <span class="material-symbols-outlined absolute left-3.5 text-zinc-400 group-focus-within:text-zinc-950 transition-colors text-[20px]">lock</span>
               <input v-model="loginForm.password" :type="showPassword ? 'text' : 'password'" 
                      class="w-full h-12 pl-11 pr-12 bg-zinc-50 border border-zinc-200 rounded-xl text-[15px] font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 focus:bg-white transition-all shadow-sm" 
                      placeholder="请输入凭证" @keyup.enter="handleLogin" />
               <button type="button" class="absolute right-3 text-zinc-400 hover:text-zinc-900 transition-colors flex items-center justify-center p-1.5 rounded-md hover:bg-zinc-100 focus:outline-none" @click="showPassword = !showPassword">
                 <span class="material-symbols-outlined text-[20px]">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
               </button>
             </div>
          </div>

          <!-- Changed from form @submit to simple @click to ensure compatibility with uni-app platforms -->
          <button class="w-full h-12 bg-zinc-950 text-white rounded-xl text-[15px] font-bold shadow-[0_4px_14px_0_rgba(24,24,27,0.39)] hover:shadow-[0_6px_20px_rgba(24,24,27,0.23)] hover:bg-zinc-800 hover:-translate-y-0.5 transition-all duration-300 mt-8 flex justify-center items-center gap-2 group relative overflow-hidden" 
                  @click="handleLogin"
                  :disabled="isLoggingIn">
            <span class="relative z-10 flex items-center gap-2">
              {{ isLoggingIn ? '验证中...' : '安全登录' }}
              <span v-if="!isLoggingIn" class="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-emerald-400">arrow_right_alt</span>
              <span v-if="isLoggingIn" class="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
            </span>
          </button>
        </div>
        
        <div class="relative w-full my-10 flex items-center justify-center">
           <div class="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent"></div>
           <span class="bg-white px-4 relative z-10 text-[12px] font-bold text-zinc-400 uppercase tracking-[0.2em]">支持认证方式</span>
        </div>

        <!-- Social / Additional Authentication -->
        <div class="flex items-center justify-center gap-5">
          <button class="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 bg-zinc-50 hover:bg-white hover:text-zinc-900 hover:border-zinc-300 hover:shadow-md transition-all duration-300 focus:outline-none group" title="生物特征认证">
            <span class="material-symbols-outlined text-[22px] transition-transform group-hover:scale-110">fingerprint</span>
          </button>
          <button class="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 bg-zinc-50 hover:bg-white hover:text-zinc-900 hover:border-zinc-300 hover:shadow-md transition-all duration-300 focus:outline-none group" title="SSO 单点登录">
            <span class="material-symbols-outlined text-[22px] transition-transform group-hover:scale-110">key</span>
          </button>
          <button class="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 bg-zinc-50 hover:bg-white hover:text-zinc-900 hover:border-zinc-300 hover:shadow-md transition-all duration-300 focus:outline-none group" title="企业微信授权">
            <span class="material-symbols-outlined text-[22px] transition-transform group-hover:scale-110">domain</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      activeLoginTab: 'account', // Changed default to account for easier testing
      showPassword: false,
      isLoggingIn: false,
      loginForm: { username: 'admin', password: '' }, // Pre-filled 'admin' for convenience
    }
  },
  methods: {
    handleLogin() {
      if (this.isLoggingIn) return;
      
      const vk = uni.vk;
      
      if (!this.loginForm.username) {
        vk.toast('请输入账号安全标识', "none");
        return;
      }
      if (!this.loginForm.password) {
        vk.toast('请输入访问验证凭证', "none");
        return;
      }
      
      this.isLoggingIn = true;
      
      vk.userCenter.login({
        data: this.loginForm,
        success: (data) => {
          vk.toast("安全认证成功", "success");
          setTimeout(() => {
            uni.reLaunch({ url: '/pages/workbench/index' });
          }, 600);
        },
        fail: (err) => {
          this.isLoggingIn = false;
          // err structure handles vk API fails automatically via global interceptor, 
          // but we can add specific handlers if needed.
          if (err && err.msg) {
             vk.toast(err.msg, "none");
          } else {
             vk.toast("认证中心离线，请重试", "none");
          }
        }
      });
    },
  }
}
</script>

<style scoped>
@keyframes slideUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-up {
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-spin-slow {
  animation: spin 3s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
