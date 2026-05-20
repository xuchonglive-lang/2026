<template>
  <view class="page-container industrial-bg">
    <cu-custom bgColor="bg-gradual-blue" :isCustom="true">
      <block slot="backText"></block>
      <block slot="content">{{ isEdit ? '修改反馈' : '申请结项' }}</block>
    </cu-custom>

    <!-- Page Header -->
    <view class="custom-nav-ui">
      <view class="cancel-btn active-press" @click="goBack">
        <text>取消</text>
      </view>
      <text class="nav-title font-headline font-extrabold text-industrial-primary">{{ mode === 'close' ? '申请验收结案' :
        '提交进度反馈' }}</text>
      <view class="nav-placeholder"></view>
    </view>

    <view class="form-wrapper">
      <!-- Banner -->
      <view class="page-banner">
        <text class="banner-en font-bold">{{ mode === 'close' ? 'SUBMIT CLOSURE REQUEST' : 'SUBMIT PROCESS FEEDBACK'
          }}</text>
        <text class="banner-cn">填写详细项目实施信息以推进流程</text>
      </view>

      <!-- Warning Tips for Closure -->
      <view class="tips-box" v-if="mode === 'close' && !isEdit">
        <view class="tips-icon">
          <u-icon name="warning-fill" color="#dc2626" size="40"></u-icon>
        </view>
        <view class="tips-content">
          <text class="tips-title">操作提醒</text>
          <text class="tips-desc">您正在发起结案验收流程。提交后，项目将进入「待验收」状态，不可再编辑过程记录。</text>
        </view>
      </view>

      <u-form :model="form" ref="uForm" class="industrial-form">
        <!-- 富文本区 -->
        <view class="glass-card input-card">
          <view class="field-header">
            <view class="field-icon"><u-icon name="edit-pen" color="#0050cb" size="36"></u-icon></view>
            <view class="field-title-group">
              <text class="field-title font-headline font-bold">情况描述</text>
              <text class="field-subtitle">DESCRIPTION</text>
            </view>
          </view>
          <view class="textarea-box">
            <robin-editor ref="editor" v-model="form.desc_content" :header="false" :autoHideToolbar="false"
              :muiltImage="true" :compressImage="true" :height="300"
              :tools="['bold', 'italic', 'underline', 'align-left', 'align-center', 'align-right', 'image', 'clear']"></robin-editor>
          </view>
        </view>

        <!-- 图片上传区 -->

      </u-form>

      <!-- 提交按钮 -->
      <view class="submit-footer">
        <button class="btn-primary-ui4 active-press" :class="{ 'is-loading': loading }" @click="submit"
          :disabled="loading">
          <u-icon name="checkmark" color="#ffffff" size="40" v-if="!loading"></u-icon>
          <text class="btn-text">{{ loading ? '正在提交同步中...' : (isEdit ? '确认修改' : (mode === 'close' ? '确认提交验收' :
            '确认提交反馈')) }}</text>
        </button>
      </view>
    </view>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      vk: uni.vk,
      projectId: '',
      recordId: '',
      isEdit: false,
      mode: 'feedback', // 'feedback' or 'close'
      loading: false,
      tempImages: [],
      form: {
        desc_content: '',
        attachment_imgs: []
      }
    };
  },
  onLoad(options) {
    this.projectId = options.id;
    this.recordId = options.recordId || '';
    this.isEdit = options.isEdit == '1';
    this.mode = options.mode || 'feedback';

    if (this.isEdit && this.recordId) {
      this.fetchRecordDetail();
    }
  },
  onReady() {
    if (this.$refs.editor) {
      this.$refs.editor.setImageUploader(this.uploadEditorImage);
    }
  },
  methods: {
    async fetchRecordDetail() {
      try {
        let res = await this.vk.callFunction({
          url: 'client/keywork/kh/getProcessRecordDetail',
          data: { record_id: this.recordId }
        });
        if (res.code === 0 && res.data) {
          this.form.desc_content = res.data.desc_content;
          this.form.attachment_imgs = res.data.attachment_imgs || [];

          // 回显富文本
          setTimeout(() => {
            if (this.$refs.editor) {
              this.$refs.editor.editorCtx.setContents({
                html: res.data.desc_content
              });
            }
          }, 300);
        }
      } catch (e) { }
    },
    goBack() {
      uni.navigateBack();
    },
    uploadEditorImage(path, callback) {
      uni.compressImage({
        src: path,
        quality: 80,
        success: async (compressRes) => {
          uni.showLoading({ title: '上传中...' });
          let fileRes = await this.vk.callFunctionUtil.uploadFile({
            filePath: compressRes.tempFilePath,
            fileType: "image"
          });
          uni.hideLoading();
          if (fileRes && fileRes.url) {
            callback(fileRes.url);
          } else {
            this.vk.toast('图片上传失败');
          }
        },
        fail: () => {
          this.vk.toast('图片压缩失败');
        }
      });
    },
    chooseImage() {
      uni.chooseImage({
        count: 4 - this.form.attachment_imgs.length,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: async (res) => {
          uni.showLoading({ title: '上传中...', mask: true });
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            try {
              let fileRes = await this.vk.callFunctionUtil.uploadFile({
                filePath: res.tempFilePaths[i],
                fileType: "image"
              });
              if (fileRes && fileRes.url) {
                this.form.attachment_imgs.push(fileRes.url);
              }
            } catch (err) {
              console.error(err);
              this.vk.toast('部分图片上传失败');
            }
          }
          uni.hideLoading();
        }
      });
    },
    deleteImage(idx) {
      this.form.attachment_imgs.splice(idx, 1);
    },
    previewImage(idx) {
      uni.previewImage({
        current: idx,
        urls: this.form.attachment_imgs
      });
    },
    submit() {
      this.$refs.editor.editorCtx.getContents({
        success: (res) => {
          let desc = res.html;
          if (!res.text.trim() && !desc.includes('<img')) {
            desc = '';
          }
          if (!desc) {
            this.$refs.uToast.show({ title: '请填写情况描述', type: 'warning' });
            return;
          }
          this.loading = true;

          let url = '';
          let reqData = {
            project_id: this.projectId,
            desc_content: desc,
            attachment_imgs: this.form.attachment_imgs
          };

          if (this.isEdit) {
            url = 'client/user/kh/manageMyRecord';
            reqData = {
              action: 'update',
              type: 'project',
              id: this.recordId,
              updateData: {
                desc_content: desc,
                attachment_imgs: this.form.attachment_imgs
              }
            };
          } else {
            url = this.mode === 'close' ? 'client/keywork/kh/applyProjectClose' : 'client/keywork/kh/addProcessRecord';
          }

          this.vk.callFunction({
            url: url,
            data: reqData,
            success: (data) => {
              this.$refs.uToast.show({ title: this.isEdit ? '修改成功' : '提交成功', type: 'success' });
              setTimeout(() => {
                uni.navigateBack();
              }, 1500);
            },
            complete: () => {
              this.loading = false;
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/* Base Theme */
.industrial-bg {
  min-height: 100vh;
  background-color: #f8fafc;
  background-image:
    linear-gradient(rgba(0, 80, 203, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 80, 203, 0.03) 1px, transparent 1px);
  background-size: 40rpx 40rpx;
}

/* Custom Page Header */
.custom-nav-ui {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 32rpx 32rpx 0 32rpx;
}

.cancel-btn {
  font-size: 32rpx;
  color: #e85545;
  /* Red color matching the screenshot */
  font-weight: 800;
  letter-spacing: 2rpx;
  display: flex;
  align-items: center;
  height: 100%;
}

.nav-title {
  font-size: 34rpx;
  color: #111;
  text-align: center;
  font-weight: 800;
}

.nav-placeholder {
  width: 64rpx;
  /* Balance for the title */
}

/* Form Layout */
.form-wrapper {
  padding: 24rpx 16rpx;
}

/* Banner */
.page-banner {
  margin-top: 0;
  margin-bottom: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.banner-en {
  font-size: 24rpx;
  color: #0050cb;
  letter-spacing: 0.1em;
}

.banner-cn {
  font-size: 26rpx;
  color: #64748b;
}

/* Tips Box */
.tips-box {
  background: rgba(220, 38, 38, 0.05);
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: 20rpx;
  padding: 32rpx;
  display: flex;
  align-items: flex-start;
  gap: 20rpx;
  margin-bottom: 40rpx;
}

.tips-icon .material-symbols-outlined {
  color: #dc2626;
  font-size: 40rpx;
}

.tips-content {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.tips-title {
  font-size: 28rpx;
  font-weight: 800;
  color: #dc2626;
  letter-spacing: 2rpx;
}

.tips-desc {
  font-size: 24rpx;
  color: #7f1d1d;
  line-height: 1.6;
}

/* Cards */
.input-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 12rpx 48rpx rgba(0, 0, 0, 0.03);
  border-radius: 24rpx;
  padding: 32rpx 20rpx;
  margin-bottom: 32rpx;
}

.field-header {
  display: flex;
  align-items: center;
  margin-bottom: 32rpx;
  position: relative;
}

.field-icon {
  width: 64rpx;
  height: 64rpx;
  background: rgba(0, 80, 203, 0.08);
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
}

.field-icon .material-symbols-outlined {
  color: #0050cb;
  font-size: 36rpx;
}

.field-title-group {
  display: flex;
  flex-direction: column;
}

.field-title {
  font-size: 32rpx;
  color: #111;
}

.field-subtitle {
  font-size: 18rpx;
  color: #94a3b8;
  letter-spacing: 0.1em;
  margin-top: 4rpx;
}

.limit-badge {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: #f1f5f9;
  color: #475569;
  font-size: 20rpx;
  font-weight: 800;
  padding: 6rpx 16rpx;
  border-radius: 100rpx;
}

/* Textarea Overrides */
.textarea-box {
  border: 2px solid #e2e8f0;
  border-radius: 16rpx;
  overflow: hidden;
  transition: all 0.3s ease;
}

.textarea-box:focus-within {
  border-color: #0050cb;
  box-shadow: 0 0 0 4px rgba(0, 80, 203, 0.1);
}

.textarea-box ::v-deep .wrapper {
  padding: 0 !important;
}

.textarea-box ::v-deep .toolbar {
  background-color: #f8fafc !important;
  border-top: none !important;
  border-bottom: 2px solid #e2e8f0 !important;
  padding: 16rpx 12rpx !important;
}

.textarea-box ::v-deep .container {
  background-color: transparent !important;
  min-height: 300rpx;
  padding: 24rpx !important;
}

/* Upload */
.upload-container {
  background: #f8fafc;
  border: 2px dashed #cbd5e1;
  border-radius: 16rpx;
  padding: 24rpx;
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24rpx;
}

.image-item {
  width: 140rpx;
  height: 140rpx;
  border-radius: 16rpx;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.preview-img {
  width: 100%;
  height: 100%;
}

.delete-btn {
  position: absolute;
  top: 8rpx;
  right: 8rpx;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.delete-btn .material-symbols-outlined {
  color: #fff;
  font-size: 28rpx;
}

.upload-add-btn {
  width: 140rpx;
  height: 140rpx;
  border-radius: 16rpx;
  background: #f1f5f9;
  border: 2rpx dashed #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-add-btn .material-symbols-outlined {
  font-size: 56rpx;
  color: #94a3b8;
}

/* Footer Submit */
.submit-footer {
  margin-top: 64rpx;
  padding-bottom: env(safe-area-inset-bottom);
}

.btn-primary-ui4 {
  width: 100%;
  height: 108rpx;
  background: linear-gradient(135deg, #0050cb, #3b82f6);
  border-radius: 54rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  box-shadow: 0 16rpx 48rpx rgba(0, 80, 203, 0.25);
  color: #ffffff;
  border: none;
}

.btn-primary-ui4::after {
  display: none;
}

.btn-primary-ui4 .btn-text {
  font-size: 34rpx;
  font-weight: 800;
  letter-spacing: 2rpx;
}

.btn-primary-ui4 .material-symbols-outlined {
  font-size: 40rpx;
}

.btn-primary-ui4.is-loading {
  opacity: 0.8;
  pointer-events: none;
}

.active-press:active {
  transform: scale(0.98);
  opacity: 0.9;
}
</style>
