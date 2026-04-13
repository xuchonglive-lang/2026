<template>
  <view class="page-container dot-bg pb-32">
    <!-- Section: 日计划内容 -->
    <view class="px-5 pt-12 mb-8">
      <view class="section-header mb-6">
        <text class="section-title">日计划内容</text>
      </view>

      <view class="card-panel p-5">
        <view class="mb-6">
          <text class="label-blue display-block mb-1">计划标题</text>
          <text class="title-main display-block">{{ planInfo.title || '加载中...' }}</text>
        </view>

        <view class="grid-2 gap-4 mb-6">
          <view>
            <text class="label-grey display-block mb-2">执行区域</text>
            <view class="flex items-center gap-2">
              <text class="material-symbols-outlined text-primary text-xl">location_on</text>
              <text class="info-text font-bold">{{ (planInfo.area_info && planInfo.area_info.length > 0) ? planInfo.area_info[0].name : '全部区域' }}</text>
            </view>
          </view>
          <view>
            <text class="label-grey display-block mb-2">计划下达人</text>
            <view class="flex items-center gap-2">
              <image class="avatar-sm" :src="(planInfo.issuer_info && planInfo.issuer_info[0].avatar) ? planInfo.issuer_info[0].avatar : defaultAvatar" mode="aspectFill"></image>
              <text class="info-text font-bold">{{ (planInfo.issuer_info && planInfo.issuer_info.length > 0) ? planInfo.issuer_info[0].nickname : '管理员' }}</text>
            </view>
          </view>
        </view>

        <view class="mb-6">
          <text class="label-grey display-block mb-3">详细要求</text>
          <view class="content-text space-y-1">
            <text class="display-block" style="white-space: pre-wrap;">{{ planInfo.content || '无详细内容要求' }}</text>
          </view>
        </view>

        <view class="executor-box flex justify-between items-center p-3 pl-4">
          <view class="flex items-center gap-3">
            <view class="avatar-stack flex" v-if="planInfo.assignee_list && planInfo.assignee_list.length > 0">
              <image class="avatar-md" :src="planInfo.assignee_list[0].avatar || defaultAvatar" mode="aspectFill"></image>
              <view class="avatar-more-md flex center text-primary font-bold" v-if="planInfo.assignee_list.length > 1">
                <text>+{{ planInfo.assignee_list.length - 1 }}</text>
              </view>
            </view>
            <view>
              <text class="label-grey display-block mb-1" style="font-size:20rpx">执行人</text>
              <text class="info-text font-bold" v-if="planInfo.assignee_list && planInfo.assignee_list.length > 0">
                {{ planInfo.assignee_list[0].nickname }} 等{{ planInfo.assignee_list.length }}人
              </text>
              <text class="info-text font-bold" v-else>待定</text>
            </view>
          </view>
          <view class="status-btn flex center mr-1" :style="{ backgroundColor: getStatusColor(planInfo.status) }">
            <text>{{ getStatusText(planInfo.status) }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- Section: 历史流转 (Timeline) -->
    <view class="px-5 mb-8" v-if="planInfo.feedbacks && planInfo.feedbacks.length > 0">
      <view class="section-header mb-6">
        <text class="section-title">反馈与批示记录</text>
      </view>

      <view v-for="(item, index) in planInfo.feedbacks" :key="index" class="mb-6">
        <!-- 劳工作业反馈 (Submit) -->
        <view v-if="item.type === 'submit'" class="card-panel p-5">
          <view class="flex justify-between items-center mb-4">
            <view class="flex items-center gap-3">
              <image class="avatar-md no-border" :src="item.avatar || defaultAvatar" mode="aspectFill"></image>
              <text class="info-text font-bold">反馈人: {{ item.nickname }}</text>
            </view>
            <text class="time-text">{{ $fn.timeFormat(item.time, 'yyyy-MM-dd hh:mm') }}</text>
          </view>

          <view class="feedback-box p-4">
            <text class="content-text display-block mb-4">{{ item.content }}</text>
            
            <view class="grid-2 gap-3 mb-4" v-if="item.images && item.images.length > 0">
              <view class="img-wrapper relative" v-for="(img, i) in item.images" :key="i">
                <image class="feedback-img" :src="img" mode="aspectFill"></image>
              </view>
            </view>
          </view>
        </view>

        <!-- 主管验收批示 (Audit) -->
        <view v-if="item.type === 'audit'" class="card-panel p-5">
          <view class="flex justify-between items-center mb-3">
            <text class="info-text font-bold display-block">
              {{ item.action === 'pass' ? '验收通过评语' : '驳回整改评语' }}
            </text>
            <text class="time-text">{{ $fn.timeFormat(item.time, 'yyyy-MM-dd hh:mm') }}</text>
          </view>
          
          <view class="feedback-box p-5 pr-4 pl-4" :style="item.action === 'reject' ? 'background-color: #fef2f2;' : ''">
            <text class="content-text display-block">{{ item.audit_mark }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- Bottom Action Button -->
    <view class="fixed bottom-0 left-0 w-full z-50 p-5 pb-safe action-footer" v-if="planInfo.status === 0">
      <view class="primary-btn-lg flex center w-full" @click="handleExecute">
        <text class="material-symbols-outlined mr-2" style="font-size:44rpx">task_alt</text>
        <text>添加执行反馈</text>
      </view>
    </view>
    
    <view class="fixed bottom-0 left-0 w-full z-50 p-5 pb-safe action-footer" v-if="planInfo.status === 1">
      <view class="primary-btn-lg flex center w-full" style="background-color: #f59e0b;" @click="handleAudit(planInfo)">
        <text class="material-symbols-outlined mr-2" style="font-size:44rpx">fact_check</text>
        <text>进行主管验收</text>
      </view>
    </view>

  </view>
</template>

<script>
let vk = uni.vk; // 获取 uni.vk 核心实例对象
export default {
  data() {
    // 页面数据变量声明区域
    return {
      scrollTop: 0, // 页面滚动高度记录
      form1: {}, // 预留的标准表单对象容器
      data: {}, // 全局列表或基础数据对象
      
      // 当前被加载的具体计划单据 ID
      plan_id: '',
      // 主体响应式数据结构：包含表头内容、执行信息以及混合 feedbacks (执行记录和验收批复)
      planInfo: {
        feedbacks: []
      },
      // 若当前用户的头像或数据库未返回，使用的缺省兜底头像地址
      defaultAvatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    };
  },
  // 监听 - 页面滚动，实时映射高度数据
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  // 监听 - 页面每次【加载时】执行 (获取路由参数等)
  onLoad(options = {}) {
    vk = uni.vk;
    this.options = options;
    // 从路由中抓取 plan_id (单据 ID)
    this.plan_id = options.id || '';
    this.init(options);
  },
  // 监听 - 页面【首次渲染完成时】
  onReady() {},
  // 监听 - 页面每次【显示时】执行 (如后退返回可自动重新获取最新据)
  onShow() {},
  // 监听 - 页面每次【隐藏时】
  onHide() {},
  // 监听 - 页面每次【卸载时】
  onUnload() {},
  // 监听 - 用下拉交互进行刷新，1秒后关闭动画效果
  onPullDownRefresh() {
    setTimeout(() => {
        uni.stopPullDownRefresh();
    }, 1000);
  },
  /**
    * 监听 - 点击右上角分享/转发触发
    */
  onShareAppMessage(options) {},
  // 页面响应的所有的行为方法
  methods: {
    /**
     * 统一规范初始化函数
     */
    init(options = {}) {
      // 存在 ID 时直接在初始化调起数据加载并映射到本页面模型
      if (this.plan_id) {
        this.loadData();
      }
    },
    /**
     * 请求具体计划的详细核心数据
     * 涉及跨表联查发布人 (issuer)，并在云函数层面处理了 feedbacks 数组的人员映射
     */
    async loadData() {
      // 建议均使用 async await 规范并接收返回值
      let res = await vk.callFunction({
        url: 'client/plan/sys/getDetail',
        data: { plan_id: this.plan_id }
      });
      // 将拉取到的包含多态流转记录的 item 填充至本地响应态数据
      this.planInfo = res.item || { feedbacks: [] };
    },
    
    // 工具: 通过状态枚举解析具体颜色
    getStatusColor(status) {
      const map = {
        0: '#0066ff', // 蓝色:待处理/执行中
        1: '#f59e0b', // 橙色:待验收
        2: '#10b981', // 绿色:已完成
        3: '#ef4444', // 红色:终止
        4: '#64748b', // 灰色:已逾期
        5: '#64748b'  // 灰色:超时未验收
      };
      return map[status] || '#94a3b8';
    },

    // 工具: 解析展示文字
    getStatusText(status) {
      const map = {
        0: '执行中', 
        1: '待验收', 
        2: '已完成',
        3: '已终止',
        4: '已逾期',
        5: '超时未验收'
      };
      return map[status] || '未知状态';
    },

    handleExecute() {
      // 携带计划 ID 等前置信息跳转到正式填写反馈的表单页
      // vk.navigateTo({ url: `/pages/plan/submit-feedback?id=${this.plan_id}` })
      uni.showToast({ title: '暂未对接提交反馈界面', icon: 'none' })
    },
    
    handleAudit() {
      uni.showToast({ title: '暂未对接主管验收界面', icon: 'none' })
    }
  },
  // 侦听器映射结构
  watch: {},
  // 计算属性集
  computed: {}
};
</script>

<style scoped>
/* Base Styles */
.page-container {
  min-height: 100vh;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  background-color: #f8fafc;
}

.dot-bg {
  background-image: radial-gradient(#cbd5e1 2rpx, transparent 2rpx);
  background-size: 32rpx 32rpx;
}

/* Typography & Layout */
.font-bold { font-weight: 700; }
.text-xs { font-size: 24rpx; }
.text-xl { font-size: 40rpx; }
.text-primary { color: #0066ff; }
.display-block { display: block; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.center { align-items: center; justify-content: center; }
.w-full { width: 100%; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; }
.bottom-0 { bottom: 0; }
.left-0 { left: 0; }
.z-50 { z-index: 50; }
.space-y-1 > view, .space-y-1 > text { margin-bottom: 8rpx; }
.space-y-1 > view:last-child, .space-y-1 > text:last-child { margin-bottom: 0; }
.space-y-2 > view, .space-y-2 > text { margin-bottom: 16rpx; }
.space-y-2 > view:last-child, .space-y-2 > text:last-child { margin-bottom: 0; }

/* Spacing */
.px-5 { padding-left: 40rpx; padding-right: 40rpx; }
.p-5 { padding: 40rpx; }
.p-4 { padding: 32rpx; }
.p-3 { padding: 24rpx; }
.pl-4 { padding-left: 32rpx; }
.pr-4 { padding-right: 32rpx; }
.pt-12 { padding-top: 96rpx; }
.pb-32 { padding-bottom: 256rpx; }
.mb-1 { margin-bottom: 8rpx; }
.mb-2 { margin-bottom: 16rpx; }
.mb-3 { margin-bottom: 24rpx; }
.mb-4 { margin-bottom: 32rpx; }
.mb-6 { margin-bottom: 48rpx; }
.mb-8 { margin-bottom: 64rpx; }
.mr-1 { margin-right: 8rpx; }
.mr-2 { margin-right: 16rpx; }
.gap-2 { gap: 16rpx; }
.gap-3 { gap: 24rpx; }
.gap-4 { gap: 32rpx; }
.bottom-2 { bottom: 16rpx; }
.left-2 { left: 16rpx; }

/* Section Headers */
.section-header {
  display: inline-block;
  border-bottom: 6rpx solid #0066ff;
  padding-bottom: 12rpx;
}
.section-title {
  font-size: 36rpx;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: 2rpx;
}

/* Cards & Containers */
.card-panel {
  background-color: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.03);
}
.feedback-box {
  background-color: #f8fafc;
  border-radius: 24rpx;
}
.executor-box {
  background-color: #f4f8ff;
  border-radius: 48rpx;
}

/* Text Styles */
.label-blue {
  color: #0066ff;
  font-size: 20rpx;
  font-weight: 700;
  letter-spacing: 2rpx;
}
.label-grey {
  color: #94a3b8;
  font-size: 22rpx;
  font-weight: 600;
}
.title-main {
  font-size: 40rpx;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.4;
}
.info-text {
  font-size: 28rpx;
  color: #0f172a;
}
.content-text {
  font-size: 28rpx;
  color: #334155;
  line-height: 1.8;
}
.time-text {
  font-size: 24rpx;
  color: #94a3b8;
  font-family: monospace;
}
.bullet-item::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #64748b;
  font-size: 28rpx;
}

/* Avatars & Images */
.avatar-sm {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
}
.avatar-md {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  border: 4rpx solid #ffffff;
}
.avatar-md.no-border {
  border: none;
}
.avatar-more-md {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  border: 4rpx solid #ffffff;
  background-color: #dbeafe;
  margin-left: -24rpx;
  font-size: 24rpx;
}
.avatar-stack {
  margin-right: 8rpx;
}
.img-wrapper {
  aspect-ratio: 16/9;
  border-radius: 16rpx;
  overflow: hidden;
}
.feedback-img {
  width: 100%;
  height: 100%;
}
.img-tag {
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  font-size: 20rpx;
  padding: 4rpx 16rpx;
  border-radius: 8rpx;
}

/* Buttons */
.status-btn {
  background-color: #0066ff;
  color: #ffffff;
  font-size: 24rpx;
  font-weight: 700;
  padding: 12rpx 32rpx;
  border-radius: 32rpx;
}
.primary-btn-lg {
  background-color: #0066ff;
  color: #ffffff;
  font-weight: 800;
  font-size: 36rpx;
  height: 112rpx;
  border-radius: 56rpx;
  box-shadow: 0 16rpx 48rpx rgba(0, 102, 255, 0.2);
}
.action-footer {
  background: linear-gradient(to top, #f8fafc 60%, rgba(248, 250, 252, 0));
}
</style>
