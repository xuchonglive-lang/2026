<template>
  <app-layout page-title="消息中心">
    <div class="mt-8 mb-16 w-full max-w-[1350px] mx-auto flex-grow px-4 md:px-0">
      <!-- Title -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-extrabold text-zinc-900 tracking-tight">消息中心</h1>
          <p class="text-[14px] text-zinc-500 mt-1">查看和管理您的系统通知与业务消息</p>
        </div>
        <button class="flex items-center gap-2 text-[13px] font-semibold text-zinc-600 hover:text-zinc-900 transition-colors bg-white border border-zinc-200 px-4 py-2 rounded-md shadow-sm" @click="markAllRead">
          <span class="material-symbols-outlined text-[16px]">done_all</span>
          全部已读
        </button>
      </div>

      <!-- Tabs -->
      <div class="flex items-center gap-8 border-b border-zinc-200 mb-6">
        <button v-for="tab in tabs" :key="tab.name"
                class="pb-3 text-[14px] font-medium transition-colors relative"
                :class="activeTab === tab.name ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'"
                @click="activeTab = tab.name">
          {{ tab.label }}
          <div v-if="activeTab === tab.name" class="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-900"></div>
        </button>
      </div>

      <!-- Message List -->
      <div class="bg-white rounded-xl overflow-hidden border border-zinc-200 shadow-sm">
        <div v-for="(msg, idx) in filteredMessages" :key="idx"
             class="group flex items-center px-6 py-5 hover:bg-zinc-50 transition-all border-b border-zinc-100 last:border-0 relative cursor-pointer"
             :class="msg.read ? 'opacity-70' : ''"
             @click="goTo('/pages/message/detail?id=' + msg.id)">
          
          <div class="absolute left-0 top-0 bottom-0 w-[3px] bg-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="mr-4 flex-shrink-0 w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200">
            <span class="material-symbols-outlined text-[16px]" :class="msg.read ? 'text-zinc-400' : 'text-zinc-900'">
              {{ msg.type === 'system' ? 'settings' : msg.type === 'training' ? 'school' : msg.type === 'work' ? 'work' : 'info' }}
            </span>
          </div>
          
          <div class="flex-grow min-w-0">
            <div class="flex items-center gap-3 mb-1">
              <h3 class="text-[15px] truncate text-zinc-900 decoration-zinc-400 group-hover:underline underline-offset-4" :class="msg.read ? 'font-medium' : 'font-bold'">{{ msg.title }}</h3>
              <span v-if="!msg.read" class="w-1.5 h-1.5 rounded-full bg-red-500 box-shadow-sm flex-shrink-0"></span>
            </div>
            <p class="text-[13px] text-zinc-500 truncate pr-6">{{ msg.summary }}</p>
          </div>
          
          <div class="ml-4 flex-shrink-0 text-right flex flex-col items-end gap-2">
            <span class="text-[12px] font-mono text-zinc-400 tracking-wider">{{ msg.time }}</span>
            <span class="text-[11px] font-semibold px-2 py-0.5 rounded border" :class="getBadgeClass(msg.type)">{{ msg.tag }}</span>
          </div>
        </div>
      </div>
      
      <div class="mt-12 text-center pb-8">
        <p class="text-[13px] text-zinc-400 font-medium tracking-wide">没有更多消息了</p>
      </div>
    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'MessageList',
  data() {
    return {
      activeTab: 'all',
      tabs: [
        { name: 'all', label: '全部' },
        { name: 'system', label: '系统通知' },
        { name: 'training', label: '培训通知' },
        { name: 'work', label: '工作通知' },
        { name: 'info', label: '信息传达' },
      ],
      messages: [
        { id: '1', title: '新功能发布：数字化编校系统正式上线', summary: '尊敬的用户，我们的全新数字化编校系统已于今日凌晨完成部署，请前往工作台体验最新功能...', tag: 'System', time: '2小时前', read: false, type: 'system' },
        { id: '2', title: '关于2024年度专业技术资格评审的通知', summary: '请符合条件的编辑人员于本周五前提交初审材料，逾期将视为自动放弃本次评审机会...', tag: 'Training', time: '3小时前', read: false, type: 'training' },
        { id: '3', title: '季度选题会会议纪要已上传', summary: '上周五举行的春季选题策划会会议记录已整理完毕，相关附件已同步至云端共享文件夹...', tag: 'Work', time: '5小时前', read: true, type: 'work' },
        { id: '4', title: '紧急：数据库维护公告', summary: '核心数据库将于今日22:00进行例行安全加固维护，预计耗时30分钟，届时检索功能可能受阻...', tag: 'System', time: '7小时前', read: false, type: 'system' },
        { id: '5', title: '全员网络安全培训课程学习提醒', summary: '请尚未完成本季度网络安全课程的同事务必在本月底前登录培训系统完成学习并考取证书...', tag: 'Training', time: '1天前', read: true, type: 'training' },
        { id: '6', title: '下周周报提交提醒', summary: '请各位组长在周一上午10点前将部门周报发送至内刊编辑室公共邮箱，请注明日期...', tag: 'Work', time: '1天前', read: false, type: 'work' },
        { id: '7', title: '版权管理系统升级完毕', summary: '版权管理系统已完成2.4版本更新，新增了海外授权追踪及版税自动结算模块...', tag: 'Info', time: '2天前', read: true, type: 'info' },
        { id: '8', title: '社内优秀编辑评选投票开始', summary: '年度优秀编辑评选活动现已进入公众投票阶段，请通过内网门户进入投票页面支持您的同事...', tag: 'Info', time: '3天前', read: true, type: 'info' },
      ],
    }
  },
  computed: {
    filteredMessages() {
      if (this.activeTab === 'all') return this.messages
      return this.messages.filter(m => m.type === this.activeTab)
    },
  },
  methods: {
    markAllRead() { this.messages.forEach(m => m.read = true) },
    goTo(path) { uni.navigateTo({ url: path }) },
    getBadgeClass(type) {
      switch(type) {
        case 'system': return 'bg-zinc-100/50 text-zinc-600 border-zinc-200'
        case 'training': return 'bg-orange-50 text-orange-600 border-orange-200/50'
        case 'work': return 'bg-blue-50 text-blue-600 border-blue-200/50'
        case 'info': return 'bg-emerald-50 text-emerald-600 border-emerald-200/50'
        default: return 'bg-zinc-100 text-zinc-600 border-zinc-200'
      }
    }
  }
}
</script>
