<template>
  <app-layout page-title="个人资料">
    <div class="max-w-[800px] mx-auto px-6 py-10">
      
      <!-- Top Action -->
      <button class="flex items-center gap-1 text-sm text-slate-500 hover:text-on-surface mb-8 font-medium transition-colors" @click="goBack">
        <span class="material-symbols-outlined text-[18px]">arrow_back</span>
        返回主页
      </button>

      <!-- Headings -->
      <header class="mb-8 border-b border-slate-200 pb-6 flex items-end justify-between">
        <div>
          <h1 class="text-[32px] leading-snug font-bold text-on-surface mb-2 tracking-tight">个人资料与账户</h1>
          <p class="text-sm text-slate-500">更新并管理您在安环一体化平台上的工作身份与基本联系信息。</p>
        </div>
        <button class="text-sm font-semibold text-blue-600 px-4 py-2 hover:bg-blue-50 rounded-md transition-colors">
          修改密码
        </button>
      </header>

      <!-- Profile Avatar -->
      <div class="card p-8 mb-8 flex flex-col sm:flex-row items-center gap-8 bg-slate-50 border border-slate-100">
         <div class="relative group cursor-pointer group">
            <div class="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-[36px] font-bold text-blue-700 shadow-sm border-2 border-white overflow-hidden">
              <span v-if="!user.avatar">张</span>
              <img v-else :src="user.avatar" class="w-full h-full object-cover">
              
              <div class="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span class="material-symbols-outlined text-white text-[28px] mb-1">photo_camera</span>
              </div>
            </div>
            
            <div class="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <span class="material-symbols-outlined text-white text-[14px]">done</span>
            </div>
         </div>
         
         <div class="text-center sm:text-left flex-1 min-w-0">
           <h2 class="text-xl font-bold text-on-surface mb-1">{{ user.name }}</h2>
           <p class="text-sm text-slate-500 mb-4">{{ user.dept }} - {{ user.post }}</p>
           
           <div class="flex flex-wrap items-center justify-center sm:justify-start gap-3">
             <button class="btn-secondary h-8 px-4 text-xs font-semibold shadow-sm">更换当前头像</button>
             <button class="text-xs font-medium text-slate-400 hover:text-red-500 transition-colors">移除图标</button>
           </div>
           <p class="text-[11px] text-slate-400 mt-3 hidden sm:block">支持 JPG, PNG 或 GIF 格式。最大文件体积 2MB。</p>
         </div>
      </div>

      <!-- Form Setup -->
      <form class="space-y-6" @submit.prevent="saveProfile">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-on-surface">真实姓名 <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.name" class="input-base h-11" placeholder="您的名字" required>
          </div>
          <div class="space-y-2 relative">
            <label class="block text-sm font-semibold text-slate-500">员工编号 (ERP认证只读)</label>
            <input type="text" v-model="form.id" class="input-base h-11 bg-slate-50 text-slate-500 font-mono cursor-not-allowed" readonly>
            <span class="material-symbols-outlined absolute right-3 top-[34px] text-emerald-500 text-[18px]" title="实名认证已绑定">verified_user</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-slate-500">归属组织 / 机构</label>
            <input type="text" v-model="form.dept" class="input-base h-11 bg-slate-50 cursor-not-allowed text-slate-600" readonly>
            <p class="text-xs text-slate-400 mt-1">组织架构信息由人事系统自动同步，如需变更请联系主数据专员。</p>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-slate-500">岗位头衔</label>
            <input type="text" v-model="form.post" class="input-base h-11 bg-slate-50 cursor-not-allowed text-slate-600" readonly>
          </div>
        </div>

        <div class="w-full h-px bg-slate-200 my-8"></div>
        
        <h3 class="text-base font-bold text-on-surface mb-6">联系方式信息</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2 relative">
            <label class="block text-sm font-semibold text-on-surface">工作手机号码 <span class="text-red-500">*</span></label>
            <div class="relative flex">
               <span class="inline-flex items-center justify-center px-3 border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm rounded-l-md">+86</span>
               <input type="tel" v-model="form.phone" class="input-base h-11 rounded-l-none pl-3 flex-1" placeholder="11位手机号" required>
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-on-surface">企业邮箱地址</label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">mail</span>
              <input type="email" v-model="form.email" class="input-base h-11 pl-10" placeholder="zhangsan@company.com">
            </div>
          </div>
        </div>
        
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-on-surface">简短的工作介绍 (签名)</label>
          <textarea v-model="form.bio" rows="3" class="input-base py-3 w-full resize-none text-sm placeholder-slate-400" placeholder="一句话描述你的主要工作范围或职责..."></textarea>
        </div>

        <!-- Submit actions -->
        <div class="pt-8 border-t border-slate-200 flex items-center justify-end gap-4 mt-12">
          <button type="button" class="btn-secondary px-6" @click="goBack">取消修改</button>
          <button type="submit" class="btn-primary px-8 flex items-center gap-2">
             <span class="material-symbols-outlined text-[18px]">save</span> 
             保存修改提交
          </button>
        </div>

      </form>

    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      user: {
        name: '张三',
        dept: '生产技术部-电气组',
        post: '主任工程师',
        avatar: ''
      },
      form: {
        name: '张三',
        id: 'EMP-2018-40331',
        dept: '运行体系 / 生产技术部 / 电气维护中心',
        post: '高低压配网主任工程师 (资深技师岗)',
        phone: '13800138000',
        email: 'zhangsan@xuchong.com',
        bio: '主要负责全场供配电设施的改造升级与防雷接地安全管理。'
      }
    }
  },
  methods: {
    goBack() { uni.navigateBack() },
    saveProfile() {
      uni.showToast({ title: '资料已成功更新', icon: 'success' })
    }
  }
}
</script>
