<template>
  <view class="page-container industrial-bg industrial-grid pb-32">
    <cu-custom bgColor="bg-gradual-blue" :isCustom="true">
      <block slot="backText"></block>
      <block slot="content">计划反馈</block>
    </cu-custom>


    <view class="main-content" v-if="planInfo">

      <!-- 2. 日计划内容板块 -->
      <view class="section">
        <view class="list-header">
          <view class="action sub-title">
            <text class="text-lg text-bold text-black">日计划内容</text>
            <text class="bg-blue"></text>
          </view>
        </view>
        <view class="glass-card standard-card">
          <view class="title-wrap-ui4">
            <view class="title-row">
              <view class="title-left">
                <view class="blue-block"></view>
                <text class="item-title u-line-2">标题：{{ planInfo.title || '加载中...' }}</text>
              </view>
              <view class="right-tag-wrap">
                <u-tag :text="getStatusText(planInfo.status)" :type="getStatusTagType(planInfo.status)" mode="light"
                  shape="circle" size="mini" class="status-u-tag" />
              </view>
            </view>

            <!-- 3. 执行区域、单位、下达人 -->
            <view class="info-grid-row">
              <view class="info-item">
                <text class="label-grey display-block mb-1">执行区域</text>
                <view class="flex items-center gap-1">
                  <text class="material-symbols-outlined location-icon" style="font-size: 28rpx;">location_on</text>
                  <text class="info-text font-bold">{{ (planInfo.area_info && planInfo.area_info.length > 0) ?
                    planInfo.area_info[0].name : '全部区域' }}</text>
                </view>
              </view>
              <view class="info-item">
                <text class="label-grey display-block mb-1">计划下达单位</text>
                <view class="flex items-center gap-1">
                  <text class="material-symbols-outlined location-icon" style="font-size: 28rpx;">corporate_fare</text>
                  <text class="info-text font-bold" style="color: #0066ff;">{{ (planInfo.dept_info &&
                    planInfo.dept_info.length > 0) ? planInfo.dept_info[0].name : '未设置单位' }}</text>
                </view>
              </view>
              <view class="info-item">
                <text class="label-grey display-block mb-1">计划下达人</text>
                <view class="flex items-center gap-1">
                  <image class="avatar-mini"
                    :src="(planInfo.issuer_info && planInfo.issuer_info[0] && planInfo.issuer_info[0].avatar) ? planInfo.issuer_info[0].avatar : defaultAvatar"
                    mode="aspectFill"></image>
                  <text class="info-text font-bold">{{ getIssuerName(planInfo.issuer_info) }}</text>
                </view>
              </view>
            </view>
          </view>

          <view class="standard-desc">
            <text class="label-grey display-block mb-2" style="font-size: 20rpx; font-weight: 800;">详细要求</text>
            <view v-if="!planInfo.content" style="color: #94a3b8; font-size: 24rpx; padding: 20rpx 0;">暂无详细内容要求</view>
            <mp-html v-else :content="planInfo.content"></mp-html>
          </view>

          <!-- 执行人堆叠 -->
          <view class="roles-grid-ui4">
            <view class="role-col-ui4">
              <text class="role-label-ui4">执行人：</text>
              <view class="role-value-row-ui4">
                <view class="avatar-stack" v-if="planInfo.assignee_list && planInfo.assignee_list.length > 0">
                  <image class="stack-avatar" v-for="(user, idx) in planInfo.assignee_list.slice(0, 3)" :key="idx"
                    :src="user.avatar || defaultAvatar" mode="aspectFill"></image>
                  <view class="stack-more" v-if="planInfo.assignee_list.length > 3">
                    +{{ planInfo.assignee_list.length - 3 }}
                  </view>
                </view>
                <view v-else class="default-avatar-ui4"></view>
                <text class="role-text-ui4 assignee-names-truncate"
                  :class="{ 'bold-text': planInfo.assignee_list && planInfo.assignee_list.length > 0 }">{{
                    getAssigneeNames(planInfo.assignee_list) }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 5. 反馈与批示记录 (时间轴) -->
      <view class="section">
        <view class="list-header">
          <view class="action sub-title">
            <text class="text-lg text-bold text-black">反馈与批示记录</text>
            <text class="bg-blue"></text>
          </view>
        </view>
        <view class="timeline-container" v-if="planInfo.feedbacks && planInfo.feedbacks.length > 0">
          <view class="timeline-track"></view>

          <view class="timeline-item" v-for="(item, index) in planInfo.feedbacks" :key="index">
            <view class="timeline-dot" :class="index === 0 ? 'active' : 'inactive'"></view>
            <view class="glass-card feedback-card" :class="{ 'rejection-card': item.audit_result === 'reject' }">
              <view class="feedback-header">
                <view class="user-info">
                  <image class="avatar-sm" :src="item.avatar || defaultAvatar"></image>
                  <text class="username">{{ item.nickname }}</text>
                  <text class="type-badge"
                    :class="item.type === 'audit' ? (item.audit_result === 'pass' ? 'primary' : 'tertiary') : 'secondary'">{{
                      item.type === 'audit' ? (item.audit_result === 'pass' ? '验收通过' : '打回整改') : '进度反馈' }}</text>
                </view>
                <text class="time-stamp">{{ vk.pubfn.timeFormat(item.time, 'yyyy-MM-dd hh:mm') }}</text>
              </view>
              <view :class="item.type === 'audit' ? 'feedback-content-box' : 'feedback-content-default'">
                <view class="feedback-text" :class="{ 'rejection-text': item.audit_result === 'reject' }">
                  <mp-html :content="item.content || ''"></mp-html>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view v-else class="glass-card p-5" style="text-align: center; border-radius: 24rpx;">
          <text class="label-grey">暂无流转反馈记录</text>
        </view>
      </view>

      <!-- 6. 底部缩小版按钮 -->
      <view class="fab-bar bg-glass-blur" v-if="(planInfo.status === 0 && isAssignee) || (planInfo.status === 1 && isIssuer)">
        <view class="fab-container">
          <view class="fab-btn-sm primary active-press" @click="handleExecute" v-if="planInfo.status === 0 && isAssignee">
            <text class="material-symbols-outlined" style="font-size: 32rpx;">task_alt</text>
            <text>添加执行反馈</text>
          </view>
          <view class="fab-btn-sm warning active-press" @click="handleAudit" v-if="planInfo.status === 1 && isIssuer">
            <text class="material-symbols-outlined" style="font-size: 32rpx;">fact_check</text>
            <text>进行主管验收</text>
          </view>
        </view>
      </view>

      <!-- Popups -->
      <u-popup v-model="showFeedbackPopup" mode="bottom" border-radius="24" :closeable="true">
        <view class="p-5" style="padding-bottom: 80rpx; min-height: 50vh;">
          <view class="font-bold text-xl mb-4" style="color: #0f172a;">添加执行反馈</view>
          <view class="editor-container mb-6">
            <robin-editor ref="feedbackEditorRef" v-model="feedbackContent" :header="false" :height="270"
              :muiltImage="true"
              :tools="['bold', 'italic', 'underline', 'align-left', 'align-center', 'align-right', 'remove', 'font', 'image', 'clear']"></robin-editor>
          </view>
          <view class="primary-btn-lg flex center w-full" @click="submitFeedback">
            <text>提交执行反馈</text>
          </view>
        </view>
      </u-popup>

      <u-popup v-model="showAuditPopup" mode="bottom" border-radius="24" :closeable="true">
        <view class="p-5" style="padding-bottom: 80rpx; min-height: 50vh;">
          <view class="font-bold text-xl mb-4" style="color: #0f172a;">进行主管验收</view>
          <text class="label-grey display-block mb-2">审核批示意见</text>
          <view class="editor-container mb-6">
            <robin-editor ref="auditEditorRef" v-model="auditContent" :header="false" :height="270" :muiltImage="true"
              :tools="['bold', 'italic', 'underline', 'align-left', 'align-center', 'align-right', 'remove', 'font', 'image', 'clear']"></robin-editor>
          </view>
          <view class="grid-2 gap-4">
            <view class="primary-btn-lg flex center" style="background-color: #ef4444;" @click="submitAudit('reject')">
              <text>打回整改</text>
            </view>
            <view class="primary-btn-lg flex center" style="background-color: #10b981;" @click="submitAudit('pass')">
              <text>验收合格</text>
            </view>
          </view>
        </view>
      </u-popup>
    </view>
  </view>
</template>

<script>
let vk = uni.vk;
export default {
  data() {
    return {
      scrollTop: 0,
      plan_id: '',
      recordId: '',
      isEdit: false,
      // 主体响应式数据结构：包含表头内容、执行信息以及混合 feedbacks (执行记录和验收批复)
      planInfo: {
        title: '',
        status: 0,
        content: '',
        feedbacks: [],
        issuer_info: [],
        assignee_list: [],
        area_info: [],
        dept_info: []
      },
      defaultAvatar: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/41235688-6615-4672-88f5-46f041ff3dbb.png',
      showFeedbackPopup: false,
      feedbackContent: '',
      showAuditPopup: false,
      auditContent: ''
    };
  },
  computed: {
    myUid() {
      return vk.getVuex('$user.userInfo._id');
    },
    // 是否为执行人
    isAssignee() {
      if (!this.planInfo.assignee_ids || !this.myUid) return false;
      return this.planInfo.assignee_ids.indexOf(this.myUid) > -1;
    },
    // 是否为验收人（下达人）
    isIssuer() {
      if (!this.planInfo.uid || !this.myUid) return false;
      return this.planInfo.uid === this.myUid;
    }
  },
  onLoad(options = {}) {
    vk = uni.vk;
    this.plan_id = options.id || '';
    this.recordId = options.recordId || '';
    this.isEdit = options.isEdit == '1';
    
    if (this.plan_id) this.loadData();
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  methods: {
    async loadData() {
      let res = await vk.callFunction({
        url: 'client/plan/kh/getDetail',
        data: { plan_id: this.plan_id }
      });
      if (res && res.item) {
        // 使用对象扩展，避免后端缺失某些字段覆盖初始数组骨架
        this.planInfo = { ...this.planInfo, ...res.item };
        
        // 如果是编辑模式，自动打开并回显
        if (this.isEdit && this.recordId) {
          let target = (this.planInfo.feedbacks || []).find(f => f.time == this.recordId);
          if (target) {
            this.feedbackContent = target.content;
            this.handleExecute();
            // 延迟给编辑器设值
            setTimeout(() => {
              if (this.$refs.feedbackEditorRef) {
                this.$refs.feedbackEditorRef.editorCtx.setContents({
                  html: target.content
                });
              }
            }, 300);
          }
        }
      }
    },
    getAssigneeNames(list) {
      if (!list || list.length === 0) return '待定';
      let name = list[0].real_name || list[0].nickname || list[0].username || '匿名';
      return list.length > 1 ? name + ' 等' + list.length + '人' : name;
    },
    getIssuerName(info) {
      if (!info || info.length === 0) return '管理员';
      let u = info[0];
      return u.real_name || u.nickname || u.username || '管理员';
    },
    getStatusText(status) {
      if (status === null || status === undefined) return '执行中';
      const map = ['执行中', '待验收', '已完成', '已终止', '已逾期', '超时未验收'];
      return map[status] || '执行中';
    },
    getStatusTagType(status) {
      if (status === null || status === undefined) return 'primary';
      const map = ['primary', 'warning', 'success', 'error', 'info', 'info'];
      return map[status] || 'primary';
    },
    handleExecute() {
      this.showFeedbackPopup = true;
      this.$nextTick(() => {
        if (this.$refs.feedbackEditorRef && this.$refs.feedbackEditorRef.setImageUploader) {
          this.$refs.feedbackEditorRef.setImageUploader(this.uploadImageForRobin);
        }
      });
    },
    handleAudit() {
      this.showAuditPopup = true;
      this.$nextTick(() => {
        if (this.$refs.auditEditorRef && this.$refs.auditEditorRef.setImageUploader) {
          this.$refs.auditEditorRef.setImageUploader(this.uploadImageForRobin);
        }
      });
    },
    uploadImageForRobin(img, callback) {
      vk.callFunctionUtil.uploadFile({
        title: "上传中...",
        filePath: img,
        suffix: "png",
        provider: "unicloud",
        success(res) {
          callback ? callback(res.fileID || res.url) : null;
        }
      });
    },
    async getEditorContent(refName) {
      return new Promise((resolve) => {
        let editorRef = refName === 'feedbackEditor' ? this.$refs.feedbackEditorRef : this.$refs.auditEditorRef;
        if (!editorRef || !editorRef.editorCtx) {
          resolve('');
          return;
        }
        editorRef.editorCtx.getContents({
          success: (res) => resolve(res.html),
          fail: () => resolve('')
        });
      });
    },
    async submitFeedback() {
      let html = await this.getEditorContent('feedbackEditor');
      if (!html.replace(/<[^>]+>/g, '').trim() && !html.includes('<img')) {
        return uni.showToast({ title: '请输入反馈内容', icon: 'none' });
      }
      uni.showLoading({ title: '提交中', mask: true });
      
      let url = this.isEdit ? 'client/user/kh/manageMyRecord' : 'client/plan/kh/submitFeedback';
      let reqData = { plan_id: this.plan_id, content: html };
      
      if (this.isEdit) {
        reqData = {
          action: 'update',
          type: 'plan',
          id: this.plan_id,
          timeKey: Number(this.recordId),
          updateData: {
            content: html,
            images: []
          }
        };
      }
      
      let res = await vk.callFunction({
        url: url,
        data: reqData
      });
      uni.hideLoading();
      if (res.code === 0) {
        uni.showToast({ title: this.isEdit ? '修改成功' : '反馈成功' });
        this.showFeedbackPopup = false;
        this.isEdit = false; // 重置
        this.loadData();
      } else {
        vk.toast(res.msg || '操作失败');
      }
    },
    async submitAudit(auditResult) {
      let html = await this.getEditorContent('auditEditor');
      if (!html.replace(/<[^>]+>/g, '').trim() && !html.includes('<img')) {
        return uni.showToast({ title: '请填写审核意见', icon: 'none' });
      }
      uni.showLoading({ title: '处理中', mask: true });
      let res = await vk.callFunction({
        url: 'client/plan/kh/auditPlan',
        data: { plan_id: this.plan_id, content: html, audit_result: auditResult }
      });
      uni.hideLoading();
      if (res.code === 0) {
        uni.showToast({ title: '验收成功' });
        this.showAuditPopup = false;
        this.loadData();
      }
    }
  }
};
</script>

<style scoped lang="scss">
$primary: #0050cb;
$secondary: #425ca0;
$tertiary: #a33200;
$error: #ba1a1a;
$on-surface: #191c1e;
$on-surface-variant: #424656;
$outline: #727687;

.page-container {
  min-height: 100vh;
  box-sizing: border-box;
}

.main-content {
  padding: 40rpx 32rpx;
  width: 100%;
  box-sizing: border-box;
}

.header-row {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
}

.page-title {
  display: block;
  font-size: 40rpx;
  font-weight: 800;
  color: $on-surface;
  margin-bottom: 4rpx;
}

.page-subtitle {
  display: block;
  font-size: 20rpx;
  color: $on-surface-variant;
  font-weight: 500;
  letter-spacing: 4rpx;
  text-transform: uppercase;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-bottom: 48rpx;
}

.section-header {
  margin-bottom: 8rpx;
}

.section-title {
  font-size: 32rpx;
  color: $on-surface;
  position: relative;
  display: inline-block;
}

.heavy-underline::after {
  content: '';
  position: absolute;
  bottom: -8rpx;
  left: 0;
  width: 100%;
  height: 8rpx;
  background: #004dc0; // 更加浓郁的深蓝色
  border-radius: 4rpx;
}

.glass-card {
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  // 加重阴影以突出块的范围
  box-shadow: 0 16rpx 48rpx rgba(0, 32, 90, 0.12), inset 0 2rpx 0 rgba(255, 255, 255, 0.9);
}

.standard-card {
  padding: 40rpx;
  border-radius: 28rpx;
}

.project-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24rpx;
  margin-bottom: 24rpx;
}

.project-id {
  font-size: 34rpx;
  font-weight: 900;
  color: #1a1a1a;
  flex: 1;
  line-height: 1.4;
}

.title-slider-bar {
  width: 10rpx;
  background: $primary;
  border-radius: 6rpx;
}

.info-grid-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 16rpx;
  margin-top: 24rpx;
  padding: 24rpx 0;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.location-icon {
  font-size: 32rpx;
  color: $primary;
}

.info-text {
  font-size: 24rpx;
  color: #1a1a1a;
}

.avatar-mini {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
}

.standard-desc {
  background: rgba(242, 244, 246, 0.6);
  border-radius: 16rpx;
  padding: 32rpx;
  margin: 16rpx 0;
  font-size: 26rpx;
  color: $on-surface-variant;
}

.roles-grid-ui4 {
  margin-top: 32rpx;
  padding-top: 24rpx;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
}

.role-col-ui4 {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.role-label-ui4 {
  font-size: 22rpx;
  font-weight: 800;
  color: #8c939d;
}

.role-value-row-ui4 {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.role-text-ui4 {
  font-size: 26rpx;
  color: #5c6370;
}

.role-text-ui4.bold-text {
  font-weight: 700;
  color: #111;
}

.assignee-names-truncate {
  max-width: 300rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.default-avatar-ui4 {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background-color: #f2f3f5;
  flex-shrink: 0;
}

.single-avatar-ui4 {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  flex-shrink: 0;
}

.avatar-stack {
  display: flex;
  align-items: center;
}

.stack-avatar {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  border: 4rpx solid #fff;
  margin-left: -16rpx;
}

.stack-avatar:first-child {
  margin-left: 0;
}

.stack-more {
  background: rgba(0, 80, 203, 0.1);
  color: $primary;
  font-weight: 700;
  font-size: 20rpx;
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  border: 4rpx solid #fff;
  margin-left: -16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-container {
  position: relative;
  padding-left: 48rpx;
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}

.timeline-track {
  position: absolute;
  left: 22rpx;
  top: 16rpx;
  bottom: 16rpx;
  width: 4rpx;
  background: rgba(194, 198, 216, 0.3);
}

.timeline-item {
  position: relative;
}

.timeline-dot {
  position: absolute;
  left: -38rpx;
  top: 12rpx;
  width: 28rpx;
  height: 28rpx;
  border-radius: 50%;
  border: 6rpx solid #fff;
  z-index: 2;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.timeline-dot.active {
  background: $primary;
}

.timeline-dot.inactive {
  background: #cbd5e1;
}

.feedback-card {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  border-radius: 20rpx;
  border: 1px solid rgba(0, 80, 203, 0.08);
}

.rejection-card {
  background: linear-gradient(145deg, rgba(254, 242, 242, 0.95), rgba(254, 226, 226, 0.8));
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.avatar-sm {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
}

.username {
  font-size: 24rpx;
  font-weight: 800;
  color: $on-surface;
}

.type-badge {
  font-size: 20rpx;
  padding: 4rpx 16rpx;
  border-radius: 8rpx;
  font-weight: 800;
}

.type-badge.primary {
  background: rgba(0, 80, 203, 0.1);
  color: $primary;
}

.type-badge.secondary {
  background: rgba(66, 92, 160, 0.1);
  color: $secondary;
}

.type-badge.tertiary {
  background: #fee2e2;
  color: #b91c1c;
}

.time-stamp {
  font-size: 20rpx;
  color: $outline;
}

.feedback-content-box {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 12rpx;
  padding: 24rpx;
}

.rejection-text {
  color: #991b1b;
}

.feedback-text {
  font-size: 28rpx;
  color: $on-surface-variant;
  line-height: 1.6;
}

/* 统一大标题样式 (参照 index.vue) */
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8rpx;
  margin-top: 16rpx;
  margin-bottom: 16rpx;
}

/* 统一小标题样式 (参照 info/index.vue) */
.title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16rpx;
  gap: 16rpx;
}
.title-left {
  display: flex;
  align-items: flex-start;
  flex: 1;
  overflow: hidden;
}
.title-left .blue-block {
  width: 8rpx;
  height: 28rpx;
  background-color: #0050cb;
  border-radius: 4rpx;
  margin-right: 16rpx;
  margin-top: 6rpx;
  flex-shrink: 0;
}
.item-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #191c1e;
  line-height: 1.4;
  flex: 1;
}
.right-tag-wrap {
  flex-shrink: 0;
  margin-top: 0;
}

/* 6. 缩小版操作按钮 */
.fab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 32rpx 40rpx calc(32rpx + env(safe-area-inset-bottom));
  box-sizing: border-box;
  z-index: 100;
}

.bg-glass-blur {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.fab-container {
  display: flex;
  gap: 24rpx;
}

.fab-btn-sm {
  flex: 1;
  height: 84rpx; // 缩小尺寸
  border-radius: 42rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  color: #fff;
  font-weight: 700;
  font-size: 26rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
}

.fab-btn-sm.primary {
  background: $primary;
}

.fab-btn-sm.warning {
  background: #f59e0b;
}

.editor-container {
  min-height: 400rpx;
  border: 1px solid #e2e8f0;
  border-radius: 16rpx;
  overflow: hidden;
}

.primary-btn-lg {
  height: 96rpx;
  background: $primary;
  color: #fff;
  border-radius: 48rpx;
  font-weight: 700;
}

.label-grey {
  color: #94a3b8;
  font-size: 22rpx;
}

.text-xl {
  font-size: 36rpx;
}

.mb-1 {
  margin-bottom: 8rpx;
}

.mb-2 {
  margin-bottom: 16rpx;
}

.mb-4 {
  margin-bottom: 32rpx;
}

.p-5 {
  padding: 40rpx;
}

.flex {
  display: flex;
}

.center {
  align-items: center;
  justify-content: center;
}

.w-full {
  width: 100%;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.gap-4 {
  gap: 32rpx;
}
</style>
