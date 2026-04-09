<template>
  <view class="page-container industrial-bg industrial-grid">
    <view class="main-content">
      <!-- Loading -->
      <view v-if="loading" class="loading-box">
        <text class="text-on-surface-variant text-sm">加载中...</text>
      </view>

      <template v-else-if="plan">
        <!-- Section 1: 日计划内容 -->
        <view class="section-container">
          <view class="section-header">
            <text class="section-title text-on-surface font-extrabold font-headline">日计划内容</text>
            <view class="title-underline"></view>
          </view>
          <view class="glass-card detail-card">
            <view class="mb-4">
              <text class="sup-title text-primary font-bold uppercase tracking-widest text-xs display-block mb-1">计划标题</text>
              <text class="title text-on-surface font-bold text-xl leading-tight">{{ plan.title }}</text>
            </view>

            <view class="grid-2 gap-4">
              <view class="info-item">
                <text class="label text-on-surface-variant font-medium uppercase tracking-wider text-xs">执行区域</text>
                <view class="val font-semibold text-sm flex mt-1 items-center">
                  <text class="material-symbols-outlined icon text-primary mr-1" style="font-size:32rpx">location_on</text>
                  <text>{{ plan.area_name || '未指定' }}</text>
                </view>
              </view>
              <view class="info-item">
                <text class="label text-on-surface-variant font-medium uppercase tracking-wider text-xs">计划下达人</text>
                <view class="val font-semibold text-sm flex mt-1 items-center">
                  <text class="material-symbols-outlined icon text-primary mr-1" style="font-size:32rpx">person</text>
                  <text>{{ plan.issuer_name || '未知' }}</text>
                </view>
              </view>
            </view>

            <view class="requirement-box border-t pt-4 mt-4">
              <text class="label text-on-surface-variant font-medium uppercase tracking-wider text-xs display-block mb-2">详细要求</text>
              <text class="content-text text-sm text-on-surface leading-relaxed">{{ plan.content_standard }}</text>
            </view>

            <view class="executor-box active-press flex justify-between rounded-xl bg-white-40 border border-white-60 p-3 mt-4">
              <view class="executor-left flex items-center">
                <view class="executor-info ml-3 flex-col justify-center">
                  <text class="label text-on-surface-variant font-medium uppercase tracking-wider" style="font-size:20rpx">执行人</text>
                  <text class="name font-bold text-sm">{{ assigneeText }}</text>
                </view>
              </view>
              <view :class="['status-badge-lg', 'bg-status-' + plan.display_status]">{{ displayStatusText }}</view>
            </view>
          </view>
        </view>

        <!-- Section 2: 完成反馈（按时间轴展示） -->
        <view class="section-container mt-8" v-if="plan.feedbacks && plan.feedbacks.length > 0">
          <view class="section-header">
            <text class="section-title text-on-surface font-extrabold font-headline">完成反馈</text>
            <view class="title-underline"></view>
          </view>
          <view class="glass-card detail-card" v-for="(fb, fbIdx) in plan.feedbacks" :key="fbIdx" style="margin-bottom:24rpx">
            <view class="feedback-header flex items-center mb-3">
              <text class="material-symbols-outlined text-primary" style="font-size:40rpx;margin-right:16rpx">account_circle</text>
              <text class="fb-name font-bold text-sm">反馈人: {{ fb.user_name }}</text>
              <text class="fb-time font-mono text-on-surface-variant font-medium ml-auto" style="font-size:20rpx">{{ formatTime(fb.time) }}</text>
            </view>
            <view class="rich-content min-h-auto p-4 border border-white-50 bg-white-30 rounded-xl">
              <text v-if="fb.remark" class="content-text text-sm leading-relaxed text-on-surface display-block mb-3">{{ fb.remark }}</text>
              <view v-if="fb.imgs && fb.imgs.length > 0" class="photo-grid gap-3">
                <view class="photo-box relative rounded-lg overflow-hidden aspect-video" v-for="(img, imgIdx) in fb.imgs" :key="imgIdx" @click="previewImage(fb.imgs, imgIdx)">
                  <image class="photo w-full h-full object-cover" :src="img" mode="aspectFill"></image>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- Section 3: 验收意见 -->
        <view class="section-container mt-8" v-if="plan.verify_result">
          <view class="section-header">
            <text class="section-title text-on-surface font-extrabold font-headline">日计划确认意见</text>
            <view class="title-underline"></view>
          </view>
          <view class="glass-card detail-card">
            <view class="comment-box">
              <text class="label font-bold text-on-surface-variant px-1 display-block mb-3 text-xs">
                {{ plan.verify_result.passed ? '✅ 验收通过' : '❌ 验收驳回' }} · {{ plan.verify_result.user_name || '验收人' }}
              </text>
              <view class="inner-box border border-white-80 bg-white-60 rounded-2xl p-5 shadow-inner">
                <text class="content-text font-medium text-sm leading-relaxed text-on-surface display-block">{{ plan.verify_result.remark || '无备注' }}</text>
                <view class="border-t border-white-40 mt-3 pt-3">
                  <text class="text-xs text-on-surface-variant">验收时间: {{ formatTime(plan.verify_result.time) }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="bottom-spacer"></view>
      </template>
    </view>

    <!-- 底部操作栏 -->
    <!-- 可提交反馈 -->
    <view v-if="plan && plan.can_submit" class="bottom-footer glass-panel rounded-t-32px p-6 fixed bottom-0 left-0 right-0 z-50 px-6">
      <view class="btn-primary active-press group flex center w-full h-14 bg-primary rounded-2xl shadow-primary-btn" @click="showFeedbackForm = true">
        <text class="material-symbols-outlined mr-3 text-white" style="font-size:36rpx">add_a_photo</text>
        <text class="font-headline font-bold text-white tracking-wider font-lg">提交执行反馈</text>
      </view>
    </view>
    <!-- 可验收 -->
    <view v-else-if="plan && plan.can_verify" class="bottom-footer glass-panel rounded-t-32px p-6 fixed bottom-0 left-0 right-0 z-50 px-6">
      <view class="verify-btns flex gap-3">
        <view class="btn-reject active-press flex-1 flex center h-14 rounded-2xl" @click="handleVerify(false)">
          <text class="material-symbols-outlined mr-2" style="font-size:36rpx">close</text>
          <text class="font-headline font-bold tracking-wider">驳回</text>
        </view>
        <view class="btn-pass active-press flex-1 flex center h-14 rounded-2xl shadow-primary-btn" @click="handleVerify(true)">
          <text class="material-symbols-outlined mr-2 text-white" style="font-size:36rpx">task_alt</text>
          <text class="font-headline font-bold text-white tracking-wider">通过</text>
        </view>
      </view>
    </view>

    <!-- 反馈弹窗 -->
    <view v-if="showFeedbackForm" class="modal-mask" @click.self="showFeedbackForm = false">
      <view class="modal-content glass-card">
        <text class="modal-title font-headline font-bold text-on-surface">提交执行反馈</text>
        <view class="form-group">
          <text class="form-label text-on-surface-variant text-xs font-bold uppercase">现场照片 *</text>
          <view class="upload-area">
            <view class="photo-grid gap-3">
              <view class="photo-box relative rounded-lg overflow-hidden aspect-video" v-for="(img, idx) in feedbackImgs" :key="idx">
                <image class="photo w-full h-full object-cover" :src="img" mode="aspectFill"></image>
                <view class="photo-del" @click="feedbackImgs.splice(idx, 1)">
                  <text class="material-symbols-outlined text-white" style="font-size:28rpx">close</text>
                </view>
              </view>
              <view v-if="feedbackImgs.length < 9" class="photo-add rounded-lg flex center" @click="chooseImages">
                <text class="material-symbols-outlined text-on-surface-variant" style="font-size:48rpx">add_photo_alternate</text>
              </view>
            </view>
          </view>
        </view>
        <view class="form-group">
          <text class="form-label text-on-surface-variant text-xs font-bold uppercase">备注说明</text>
          <textarea class="form-textarea" v-model="feedbackRemark" placeholder="请输入完成情况说明..." maxlength="500"></textarea>
        </view>
        <view class="modal-footer flex gap-3">
          <view class="btn-cancel flex-1 flex center h-14 rounded-2xl" @click="showFeedbackForm = false">
            <text>取消</text>
          </view>
          <view class="btn-primary flex-1 flex center h-14 rounded-2xl shadow-primary-btn" @click="submitFeedback">
            <text class="text-white font-bold">提交</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
const statusMap = {
  1: '执行中', 2: '已提交', 3: '未达标',
  4: '超时未验收', 5: '已完成', 6: '已逾期'
};

export default {
  data() {
    return {
      plan_id: '',
      loading: true,
      plan: null,
      showFeedbackForm: false,
      feedbackImgs: [],
      feedbackRemark: '',
      submitLoading: false
    };
  },
  computed: {
    assigneeText() {
      if (!this.plan) return '';
      let names = this.plan.assignee_names || [];
      if (names.length === 0) return '未指定';
      if (names.length <= 2) return names.join('、');
      return names[0] + ' 等' + names.length + '人';
    },
    displayStatusText() {
      if (!this.plan) return '';
      return statusMap[this.plan.display_status] || '未知';
    }
  },
  onLoad(options) {
    this.plan_id = options.plan_id || '';
    if (this.plan_id) {
      this.loadDetail();
    } else {
      this.loading = false;
    }
  },
  methods: {
    formatTime(ts) {
      if (!ts) return '';
      let d = new Date(ts);
      let month = String(d.getMonth() + 1).padStart(2, '0');
      let day = String(d.getDate()).padStart(2, '0');
      let hour = String(d.getHours()).padStart(2, '0');
      let min = String(d.getMinutes()).padStart(2, '0');
      return `${month}-${day} ${hour}:${min}`;
    },
    loadDetail() {
      this.loading = true;
      vk.callFunction({
        url: 'client/plan/kh/getDetail',
        data: { plan_id: this.plan_id },
        success: (data) => {
          this.plan = data.data || data;
        },
        fail: (err) => {
          vk.alert(err.msg || '加载失败');
        },
        complete: () => {
          this.loading = false;
        }
      });
    },
    chooseImages() {
      let remaining = 9 - this.feedbackImgs.length;
      uni.chooseImage({
        count: remaining,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          // 上传到云存储
          res.tempFilePaths.forEach(filePath => {
            vk.callFunction({
              url: 'client/common/kh/uploadFile',
              title: '上传中...',
              file: filePath,
              success: (uploadRes) => {
                this.feedbackImgs.push(uploadRes.url || uploadRes.fileID || filePath);
              }
            });
          });
        }
      });
    },
    previewImage(imgs, idx) {
      uni.previewImage({
        urls: imgs,
        current: imgs[idx]
      });
    },
    submitFeedback() {
      if (this.feedbackImgs.length === 0) {
        return vk.alert('请至少上传一张照片');
      }
      if (this.submitLoading) return;
      vk.callFunction({
        url: 'client/plan/kh/submitFeedback',
        title: '提交中...',
        loading: { that: this, name: 'submitLoading' },
        data: {
          plan_id: this.plan_id,
          imgs: this.feedbackImgs,
          remark: this.feedbackRemark
        },
        success: () => {
          vk.alert('反馈提交成功');
          this.showFeedbackForm = false;
          this.feedbackImgs = [];
          this.feedbackRemark = '';
          this.loadDetail(); // 刷新详情
        }
      });
    },
    handleVerify(passed) {
      if (passed) {
        uni.showModal({
          title: '确认通过',
          content: '确定验收通过该计划？',
          success: (res) => {
            if (res.confirm) this.doVerify(true, '');
          }
        });
      } else {
        uni.showModal({
          title: '驳回理由',
          editable: true,
          placeholderText: '请输入驳回理由...',
          success: (res) => {
            if (res.confirm && res.content) {
              this.doVerify(false, res.content);
            } else if (res.confirm && !res.content) {
              vk.alert('驳回时必须填写理由');
            }
          }
        });
      }
    },
    doVerify(passed, remark) {
      vk.callFunction({
        url: 'client/plan/kh/verifyTask',
        title: '提交中...',
        data: { plan_id: this.plan_id, passed, remark },
        success: () => {
          vk.alert(passed ? '验收通过' : '已驳回');
          this.loadDetail();
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
$primary: #0050cb;
$on-surface: #191c1e;
$on-surface-variant: #424656;

.page-container {
  min-height: 100vh;
  box-sizing: border-box;
  font-family: Inter, sans-serif;
  padding-bottom: 250rpx;
}

.main-content {
  padding: 48rpx 32rpx;
  max-width: 896rpx;
  margin: 0 auto;
}

.font-headline { font-family: Manrope, sans-serif; }
.font-extrabold { font-weight: 800; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }
.uppercase { text-transform: uppercase; }
.tracking-widest { letter-spacing: 0.1em; }
.tracking-wider { letter-spacing: 0.05em; }

.loading-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;
}

.section-container { margin-bottom: 48rpx; }
.section-header {
  margin-bottom: 32rpx;
  padding: 0 8rpx;
  display: inline-block;
  position: relative;
}
.section-title {
  font-size: 48rpx;
  letter-spacing: -0.02em;
}
.title-underline {
  position: absolute;
  left: 0; bottom: -4rpx;
  width: 100%; height: 8rpx;
  background-color: $primary;
  border-radius: 4rpx;
}
.detail-card {
  padding: 48rpx;
  border-radius: 32rpx;
  display: flex;
  flex-direction: column;
}

.grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
.gap-3 { gap: 24rpx; }
.gap-4 { gap: 32rpx; }

.rounded-full { border-radius: 50%; }
.rounded-xl { border-radius: 24rpx; }
.rounded-2xl { border-radius: 32rpx; }
.rounded-lg { border-radius: 16rpx; }

.border-t { border-top: 1px solid rgba(255,255,255,0.4); }
.border-white-40 { border-color: rgba(255,255,255,0.4)!important; }
.border-white-50 { border-color: rgba(255,255,255,0.5)!important; }
.border-white-60 { border-color: rgba(255,255,255,0.6)!important; }
.border-white-80 { border-color: rgba(255,255,255,0.8)!important; border-width: 1px; border-style: solid; }
.border { border-width: 1px; border-style: solid; }

.bg-white-30 { background-color: rgba(255,255,255,0.3); }
.bg-white-40 { background-color: rgba(255,255,255,0.4); }
.bg-white-60 { background-color: rgba(255,255,255,0.6); }

.pt-3 { padding-top: 24rpx; }
.mt-1 { margin-top: 8rpx; }
.mt-3 { margin-top: 24rpx; }
.pt-4 { padding-top: 32rpx; }
.mt-4 { margin-top: 32rpx; }
.mt-8 { margin-top: 64rpx; }
.p-3 { padding: 24rpx; }
.p-4 { padding: 32rpx; }
.p-5 { padding: 40rpx; }
.p-6 { padding: 48rpx; }
.px-1 { padding-left: 8rpx; padding-right: 8rpx; }
.px-6 { padding-left: 48rpx; padding-right: 48rpx; }

.mb-1 { margin-bottom: 8rpx; }
.mb-2 { margin-bottom: 16rpx; }
.mb-3 { margin-bottom: 24rpx; }
.mb-4 { margin-bottom: 32rpx; }
.mr-1 { margin-right: 8rpx; }
.mr-2 { margin-right: 16rpx; }
.mr-3 { margin-right: 24rpx; }
.ml-3 { margin-left: 24rpx; }
.ml-auto { margin-left: auto; }

.display-block { display: block; }
.leading-tight { line-height: 1.2; }
.leading-relaxed { line-height: 1.625; }

.flex { display: flex; }
.flex-col { display: flex; flex-direction: column; }
.flex-1 { flex: 1; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.items-center { align-items: center; }
.center { align-items: center; justify-content: center; }

.text-sm { font-size: 28rpx; }
.text-xs { font-size: 24rpx; }
.text-xl { font-size: 40rpx; }
.font-lg { font-size: 36rpx; }
.text-primary { color: $primary; }
.text-on-surface { color: $on-surface; }
.text-on-surface-variant { color: $on-surface-variant; }
.text-white { color: #fff; }

// Status badges
.status-badge-lg {
  font-weight: 700;
  border-radius: 999rpx;
  padding: 8rpx 24rpx;
  font-size: 20rpx;
}
.bg-status-1 { background: $primary; color: #fff; }
.bg-status-2 { background: #3b82f6; color: #fff; }
.bg-status-3 { background: #f59e0b; color: #fff; }
.bg-status-4 { background: #f97316; color: #fff; }
.bg-status-5 { background: #10b981; color: #fff; }
.bg-status-6 { background: #ef4444; color: #fff; }

// Photo grid
.photo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16rpx;
}
.photo-box {
  position: relative;
  border-radius: 16rpx;
  overflow: hidden;
}
.aspect-video {
  width: 100%;
  height: 160rpx;
}
.photo {
  width: 100%; height: 100%;
  position: absolute;
  top: 0; left: 0;
}
.photo-del {
  position: absolute;
  top: 8rpx; right: 8rpx;
  width: 40rpx; height: 40rpx;
  background: rgba(0,0,0,0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.photo-add {
  width: 100%; height: 160rpx;
  background: rgba(224,227,229,0.5);
  border: 2rpx dashed rgba(0,80,203,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

// Bottom footer
.fixed { position: fixed; }
.bottom-0 { bottom: 0; }
.left-0 { left: 0; }
.right-0 { right: 0; }
.z-50 { z-index: 50; }
.rounded-t-32px { border-radius: 64rpx 64rpx 0 0; }
.h-14 { height: 112rpx; }
.w-full { width: 100%; }
.bg-primary { background-color: $primary; }

.shadow-primary-btn { box-shadow: 0 16rpx 48rpx rgba(0,80,203,0.3); }
.shadow-inner { box-shadow: inset 0 4rpx 8rpx rgba(0,0,0,0.05); }

.btn-primary {
  background: $primary;
  color: #fff;
  font-weight: 700;
}
.btn-reject {
  background: rgba(239,68,68,0.1);
  border: 1px solid rgba(239,68,68,0.3);
  color: #dc2626;
}
.btn-pass {
  background: $primary;
  color: #fff;
}
.btn-cancel {
  background: rgba(224,227,229,0.5);
  border: 1px solid rgba(0,0,0,0.1);
  color: $on-surface;
  font-weight: 600;
}

.verify-btns {
  display: flex;
  gap: 24rpx;
}

// Modal
.modal-mask {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 100;
}
.modal-content {
  width: 100%;
  max-height: 85vh;
  padding: 48rpx;
  border-radius: 48rpx 48rpx 0 0;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  overflow-y: auto;
}
.modal-title {
  font-size: 40rpx;
  text-align: center;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
.form-label {
  margin-left: 8rpx;
  letter-spacing: 0.05em;
}
.form-textarea {
  background: rgba(224,227,229,0.5);
  border-radius: 16rpx;
  padding: 24rpx;
  font-size: 28rpx;
  min-height: 160rpx;
  color: $on-surface;
}
.modal-footer {
  display: flex;
  gap: 24rpx;
}

.bottom-spacer { height: 250rpx; }

.min-h-auto { min-height: auto; }
</style>
