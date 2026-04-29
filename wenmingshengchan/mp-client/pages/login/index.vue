<template>
  <view class="precision-page min-h-screen relative overflow-hidden flex items-center justify-center p-6">

    
    <!-- Level 0 (Floor): Grid Texture Background -->
    <view class="absolute inset-0 z-0 industrial-grid pointer-events-none"></view>
    
    <!-- Level 2 (Active Glass): The Login Card -->
    <view class="relative z-10 w-full max-w-sm flex-col items-center bg-glass rounded-xl ambient-glow p-10 pt-12 pb-8">
      
      <!-- Brand Logo -->
      <view class="w-24 h-24 rounded-xl bg-surface-highest flex items-center justify-center border-glass mb-6 shadow-inner overflow-hidden">
        <image class="w-full h-full object-cover mix-blend-multiply opacity-80" src="/static/logo.png" mode="aspectFill" />
      </view>
      
      <!-- System Title -->
      <view class="flex-col items-center mb-10 w-full text-center">
        <text class="font-headline text-2xl font-bold leading-tight tracking-widest text-on-surface">文明生产</text>
        <text class="font-headline text-2xl font-bold leading-tight tracking-widest text-on-surface mt-1">专业管理系统</text>
      </view>

      <!-- Primary Action: WeChat Login Button -->
      <!-- Button in miniprogram needs open-type for getPhoneNumber/getUserInfo if needed, or just regular click -->
      <button class="w-full flex items-center justify-center gap-3 h-12 px-6 rounded-xl bg-primary-container text-white btn-inner-glow transition-industrial active-scale mb-8 border-none" @click="handleLogin">
        <text class="material-symbols-outlined text-white text-xl">fingerprint</text>
        <text class="font-label text-base font-semibold tracking-wide truncate text-white">微信授权登录</text>
      </button>

      <!-- Privacy Policy Disclaimer -->
      <text class="font-label text-xs font-medium text-on-surface-variant text-center underline tracking-wide opacity-80 mt-auto">登录即代表您同意我们的服务协议和隐私政策</text>
      
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleLogin() {
      // 触发真实登录业务等逻辑
      uni.navigateTo({
        url: '/pages/user/login/index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* Industrial Clarity / The Precision Lens CSS Variables */
.precision-page {
  background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
}

.text-on-surface { color: #191c1e; }
.text-on-surface-variant { color: #424656; }
.bg-primary-container { background-color: #0066ff; color: #ffffff; }

.font-headline { font-family: 'Manrope', sans-serif; }
.font-label { font-family: 'Inter', sans-serif; }

/* Industrial Grid Pattern */
.industrial-grid {
  background-image: 
    linear-gradient(to right, rgba(0, 80, 203, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 80, 203, 0.03) 1px, transparent 1px);
  background-size: 8px 8px;
}

.bg-glass {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.ambient-glow {
  box-shadow: 0 8px 32px 0 rgba(0, 80, 203, 0.08);
}

.bg-surface-highest {
  background: rgba(224, 227, 229, 0.5);
}

.border-glass {
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.btn-inner-glow {
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.2), 0 4px 10px rgba(0, 102, 255, 0.2);
}

.active-scale:active {
  transform: scale(0.98);
  box-shadow: 0 2px 6px rgba(0, 102, 255, 0.2);
}

.flex-col { display: flex; flex-direction: column; }
.gap-3 { gap: 12px; }

button::after { border: none; }
</style>
