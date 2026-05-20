<template>
  <view class="feedback-submit-page">
    <cu-custom bgColor="bg-gradual-blue" :isCustom="true">
      <block slot="backText"></block>
      <block slot="content">提交反馈</block>
    </cu-custom>


    <view class="industrial-grid pointer-events-none"></view>

    <view class="main-content">
      <!-- Header -->
      <view class="header-wrap">
        <view class="action sub-title">
          <text class="text-lg">反馈录入</text>
          <text class="bg-blue"></text>
        </view>
        <text class="page-subtitle">请按标准上传规定点位现场信息</text>
      </view>

      <!-- Location Info -->
      <view class="glass-card mb-24" style="padding: 24rpx;">
        <view class="location-header" style="margin-bottom: 12rpx;">
          <view class="location-titles">
            <text class="tag-label" style="font-size: 18rpx; padding: 2rpx 12rpx;">需反馈点位</text>
            <text class="target-location" style="margin-top: 4rpx; font-size: 30rpx;">{{ getPointName(feedbackData) || pointName || '加载中...' }}</text>
          </view>
          <u-icon name="map-fill" size="32" color="#0050cb"></u-icon>
        </view>
        <view class="info-grid" style="padding-top: 12rpx;">
          <view class="info-item">
            <text class="info-label" style="font-size: 18rpx;">反馈人</text>
            <text class="info-value" style="font-size: 26rpx;">{{ getUserName() }}</text>
          </view>
          <view class="info-item">
            <text class="info-label" style="font-size: 18rpx;">用户部门/小组</text>
            <text class="info-value" style="font-size: 26rpx;">{{ getDeptName(feedbackData) }}</text>
          </view>
        </view>
        <!-- Standard Button -->
        <view class="standard-btn-wrap" v-if="getFeedbackStandard(feedbackData)" style="margin-top: 24rpx;">
          <button class="standard-btn" @click="showStandardPopup = true" style="padding: 12rpx 0; border-radius: 16rpx;">
            <u-icon name="info-circle-fill" size="28" color="#ffffff" style="margin-right: 8rpx;"></u-icon>
            <text style="font-size: 26rpx;">该点位巡检执行标准[必看]</text>
          </button>
        </view>
      </view>

      <!-- Media Section (Only show upload slots if NOT expired) -->
      <view class="section-wrap mb-24" v-if="feedbackStatus !== 'expired'">
        <view class="section-header">
          <view class="section-title-wrap">
            <u-icon name="camera-fill" size="36" color="#191c1e"></u-icon>
            <text class="section-title">现场影像资料</text>
          </view>
          <text class="section-hint" v-if="feedbackStatus === 'active'">支持 JPG, PNG，将提取EXIF防伪信息</text>
          <text class="section-hint" v-else>历史影像存证</text>
        </view>

        <view class="glass-card flex-col-gap16" style="padding: 20rpx;">
          <view class="upload-container" style="background: transparent; border: none; padding: 0;">
            <view class="image-grid" style="display: flex; flex-direction: column; gap: 16rpx;">
              <view v-for="(title, idx) in photoRequirements" :key="idx" class="requirement-slot"
                style="background: #f8fafc; border: 2rpx dashed #cbd5e1; border-radius: 12rpx; padding: 12rpx 20rpx; display: flex; align-items: center; justify-content: space-between;">
                <view class="slot-info" style="flex: 1; padding-right: 16rpx;">
                  <text style="color: #ef4444; margin-right: 4rpx;">*</text>
                  <text style="font-weight: 700; font-size: 25rpx; color: #191c1e;">{{ title }}</text>
                </view>
                <view class="slot-image" style="width: 100rpx; height: 100rpx;">
                  <view v-if="images[idx] && images[idx].url" class="image-item"
                    style="width: 100%; height: 100%; position: relative; border-radius: 8rpx; overflow: visible;">
                    <image :src="images[idx].url" mode="aspectFill" class="preview-img"
                      style="width: 100%; height: 100%; border-radius: 8rpx;" @click="previewImage(idx)"
                      @error="onImageError(idx)"></image>
                    <view v-if="feedbackStatus === 'active' || isEdit" class="delete-btn" @click.stop="deleteImage(idx)"
                      style="position: absolute; top: -12rpx; right: -12rpx; width: 36rpx; height: 36rpx; background: rgba(0,0,0,0.6); border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 10;">
                      <u-icon name="close" size="20" color="#ffffff"></u-icon>
                    </view>
                  </view>
                  <view v-else-if="feedbackStatus === 'active' || isEdit" class="upload-add-btn" @click="chooseImageForSlot(idx, title)"
                    style="width: 100%; height: 100%; background: #f1f5f9; border: 2rpx dashed #cbd5e1; border-radius: 8rpx; display: flex; align-items: center; justify-content: center;">
                    <u-icon name="plus" size="48" color="#94a3b8"></u-icon>
                  </view>
                  <view v-else class="upload-empty-btn"
                    style="width: 100%; height: 100%; background: #f1f5f9; border: 2rpx solid #e2e8f0; border-radius: 8rpx; display: flex; align-items: center; justify-content: center;">
                    <text style="font-size: 20rpx; color: #94a3b8;">未上传</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- Description Section -->
      <view class="section-wrap mb-40">
        <view class="section-header">
          <view class="section-title-wrap">
            <u-icon name="edit-pen-fill" size="36" color="#191c1e"></u-icon>
            <text class="section-title">现场情况说明</text>
          </view>
        </view>

        <view class="editor-wrap">
          <view class="editor-content">
            <textarea v-model="content" class="textarea-input" 
              :placeholder="feedbackStatus === 'expired' ? '该任务已逾期，无现场情况说明记录' : '可以录入现场异常问题的情况说明......'"
              placeholder-class="placeholder-style" :maxlength="-1"
              :disabled="feedbackStatus === 'expired' || (feedbackStatus === 'completed' && !isEdit)"></textarea>
          </view>
        </view>
      </view>

      <!-- Space for bottom action bar & tab-bar -->
      <view class="h-32"></view>
    </view>

    <!-- Bottom Action Bar -->
    <view class="bottom-action-bar">
      <button class="submit-btn" @click="submit" :disabled="submitting || feedbackStatus !== 'active'">
        <u-icon name="checkmark-circle-fill" size="32" color="#ffffff" style="margin-right: 8rpx;"></u-icon>
        <text class="submit-btn-text">{{ submitting ? '提交中...' : (feedbackStatus === 'waiting' ? '未到提交时间' :
          (feedbackStatus === 'expired' ? '已逾期' : '提交反馈报告')) }}</text>
      </button>
      <text class="action-hint">提交反馈后，本条记录其他人员任务自动取消</text>
    </view>

    <!-- Standard Popup -->
    <u-popup v-model="showStandardPopup" mode="center" border-radius="24" width="85%" closeable>
      <view class="popup-container">
        <view class="popup-header">
          <text class="popup-title">巡检执行标准</text>
        </view>
        <scroll-view scroll-y class="popup-scroll">
          <u-parse :html="getFeedbackStandard(feedbackData)"></u-parse>
        </scroll-view>
      </view>
    </u-popup>

  </view>
</template>

<script>

export default {
  data() {
    return {
      pointName: '',
      feedbackId: '',
      images: [], // 现场照片列表
      content: '',
      userInfo: {},
      submitting: false,
      feedbackData: null,
      showStandardPopup: false,
      feedbackStatus: 'active',
      isEdit: false
    }
  },
  onLoad(options) {
    this.pointName = options.name || '';
    this.feedbackId = options.id || '';
    this.feedbackStatus = options.status || 'active';
    this.isEdit = options.isEdit == '1';

    // 拿本地用户信息
    const uinfo = uni.getStorageSync('uni_id_user_info') || {};
    this.userInfo = uinfo;
    if (this.feedbackId) {
      this.fetchDetail();
    }
  },
  computed: {
    photoRequirements() {
      if (this.feedbackData && this.feedbackData.config_info) {
        let config = Array.isArray(this.feedbackData.config_info) ? this.feedbackData.config_info[0] : this.feedbackData.config_info;
        if (config.photo_requirements && config.photo_requirements.length > 0) {
          return config.photo_requirements;
        }
      }
      return ['现场照片']; // 默认兜底
    }
  },
  methods: {
    async fetchDetail() {
      try {
        let res = await uni.vk.callFunction({
          url: 'client/feedback/kh/getDetail',
          data: { _id: this.feedbackId }
        });
        if (res.code === 0 && res.data) {
          this.feedbackData = res.data;
          if (this.isEdit || this.feedbackStatus === 'completed') {
            this.content = res.data.content || '';
            // 还原图片数组，确保顺序和 slot 对应
            let historyImages = res.data.images || [];
            let reqs = this.photoRequirements;
            let newImages = [];
            reqs.forEach((title, idx) => {
              let found = historyImages.find(img => img.title === title);
              if (found) {
                newImages[idx] = { title: title, url: found.url };
              }
            });
            this.images = newImages;
          }
        }
      } catch (err) {
        console.error("fetch detail err:", err);
      }
    },
    getUserName() {
      let u = this.userInfo || {};
      if (u.real_name || u.nickname || u.username) {
        return u.real_name || u.nickname || u.username;
      }
      if (this.vk) {
        let vuexUser = this.vk.getVuex('$user.userInfo') || {};
        return vuexUser.real_name || vuexUser.nickname || vuexUser.username || '未知用户';
      }
      return '未知用户';
    },
    getPointName(data) {
      if (!data) return '';
      let pInfo = data.point_info;
      if (Array.isArray(pInfo)) pInfo = pInfo[0];
      let aInfo = data.area_info;
      if (Array.isArray(aInfo)) aInfo = aInfo[0];

      let areaName = aInfo && aInfo.name ? aInfo.name : '';
      let pointName = pInfo && pInfo.name ? pInfo.name : data.point_name || '';
      if (areaName && pointName) return areaName + ' ' + pointName;
      return pointName || areaName;
    },
    getDeptName(data) {
      if (!data) return '加载中...';
      let dInfo = data.dept_info;
      if (Array.isArray(dInfo)) dInfo = dInfo[0];
      if (dInfo && dInfo.name) return dInfo.name;
      return '未知部门';
    },
    getFeedbackStandard(data) {
      if (!data) return '';
      let cInfo = data.config_info;
      if (Array.isArray(cInfo)) cInfo = cInfo[0];
      if (cInfo && cInfo.feedback_standard) return cInfo.feedback_standard;
      return '';
    },
    chooseImageForSlot(idx, title) {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: async (res) => {
          uni.showLoading({ title: '上传中...', mask: true });
          try {
            let fileRes = await uni.vk.callFunctionUtil.uploadFile({
              filePath: res.tempFilePaths[0],
              fileType: "image"
            });
            if (fileRes && fileRes.url) {
              this.$set(this.images, idx, { title: title, url: fileRes.url });
            }
          } catch (err) {
            console.error(err);
            uni.vk.toast('图片上传失败');
          }
          uni.hideLoading();
        }
      });
    },
    deleteImage(idx) {
      this.$set(this.images, idx, null);
    },
    previewImage(idx) {
      if (!this.images[idx] || !this.images[idx].url) return;
      uni.previewImage({
        current: 0,
        urls: [this.images[idx].url]
      });
    },
    async submit() {
      if (!this.feedbackId) {
        uni.vk.toast("丢失订单关联基底！");
        return;
      }
      let requiredLen = this.photoRequirements.length;
      let validImages = [];
      for (let i = 0; i < requiredLen; i++) {
        if (!this.images[i] || !this.images[i].url) {
          uni.vk.toast(`请上传 [${this.photoRequirements[i]}] 的照片`);
          return;
        }
        validImages.push(this.images[i]);
      }

      this.submitting = true;
      try {
        let url = this.isEdit ? 'client/user/kh/manageMyRecord' : 'client/feedback/kh/submitFeedback';
        let reqData = {
          _id: this.feedbackId,
          images: validImages,
          content: this.content || ''
        };
        if (this.isEdit) {
          reqData = {
            action: 'update',
            type: 'point',
            id: this.feedbackId,
            updateData: {
              images: validImages,
              content: this.content || ''
            }
          };
        }

        let res = await uni.vk.callFunction({
          url: url,
          data: reqData
        });
        if (res.code === 0) {
          uni.vk.toast(this.isEdit ? "修改成功" : "反馈已确认并挂牌！", "success", 1000);
          setTimeout(() => {
            uni.navigateBack();
          }, 1000);
        } else {
          uni.vk.toast(res.msg || "无法完成操作");
        }
      } catch (err) {
        uni.vk.toast(err.msg || "提交异常");
      } finally {
        this.submitting = false;
      }
    },
    onImageError(idx) {
      if (this.images[idx]) {
        this.$set(this.images[idx], 'url', 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/41235688-6615-4672-88f5-46f041ff3dbb.png');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.feedback-submit-page {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
  background-attachment: fixed;
  min-height: 100vh;
  position: relative;
}

.industrial-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #0050cb 2rpx, transparent 2rpx);
  background-size: 48rpx 48rpx;
  opacity: 0.03;
}

.main-content {
  position: relative;
  z-index: 1;
  padding: 64rpx 32rpx 256rpx 32rpx;
  max-width: 1344rpx;
  margin: 0 auto;
}

.header-wrap {
  margin-bottom: 32rpx;
}

/* ====== 引入首页同款大标题样式 ====== */
.action.sub-title {
  position: relative;
  display: inline-block;
  margin-bottom: 12rpx;
}
.action.sub-title .text-lg {
  position: relative;
  z-index: 1;
  font-size: 44rpx;
  font-weight: 800;
  color: #191c1e;
}
.action.sub-title .bg-blue {
  position: absolute;
  bottom: 4rpx;
  left: 12rpx;
  width: 100%;
  height: 12rpx;
  background-color: #0066ff;
  opacity: 0.3;
  z-index: 0;
  border-radius: 4rpx;
}

.page-subtitle {
  font-size: 26rpx;
  color: #64748b;
  display: block;
}

.glass-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(40rpx);
  -webkit-backdrop-filter: blur(40rpx);
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08);
  border-radius: 24rpx;
  padding: 32rpx;
}

.mb-24 {
  margin-bottom: 24rpx;
}

.mb-40 {
  margin-bottom: 32rpx;
}

.location-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32rpx;
}

.tag-label {
  font-size: 20rpx;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #0050cb;
  font-weight: 700;
  background-color: rgba(0, 80, 203, 0.1);
  padding: 4rpx 16rpx;
  border-radius: 9999rpx;
  margin-bottom: 16rpx;
  display: inline-block;
}

.target-location {
  font-size: 34rpx;
  font-weight: 800;
  color: #191c1e;
  display: block;
  line-height: 1.4;
}

.text-primary {
  color: #0050cb;
}

.info-grid {
  display: flex;
  justify-content: space-between;
  border-top: 2rpx solid rgba(255, 255, 255, 0.2);
  padding-top: 24rpx;
}

.info-item {
  flex: 1;
}

.info-label {
  font-size: 20rpx;
  color: #424656;
  margin-bottom: 4rpx;
  display: block;
}

.info-value {
  font-size: 28rpx;
  font-weight: 600;
  color: #191c1e;
}

.standard-btn-wrap {
  margin-top: 32rpx;
}

.standard-btn {
  background-color: #b91c1c;
  color: #ffffff;
  border-radius: 12rpx;
  padding: 16rpx 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  font-weight: 600;
  line-height: 1;
  border: none;
}

.standard-btn::after {
  border: none;
}

.popup-container {
  display: flex;
  flex-direction: column;
  max-height: 70vh;
  background-color: #ffffff;
}

.popup-header {
  padding: 32rpx;
  border-bottom: 2rpx solid #f1f5f9;
  text-align: center;
  position: relative;
}

.popup-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #191c1e;
}

.popup-scroll {
  padding: 32rpx;
  height: 50vh;
}

.section-wrap {
  margin-bottom: 48rpx;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24rpx;
  padding: 0 8rpx;
}

.section-title-wrap {
  display: flex;
  align-items: center;
  gap: 8rpx;
  color: #191c1e;
}

.section-title {
  font-size: 28rpx;
  font-weight: 700;
}

.section-hint {
  font-size: 20rpx;
  color: #424656;
}

.flex-col-gap16 {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

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
  width: 200rpx;
  height: 200rpx;
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
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.upload-add-btn {
  width: 200rpx;
  height: 200rpx;
  border-radius: 16rpx;
  background: #f1f5f9;
  border: 2rpx dashed #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editor-wrap {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(40rpx);
  -webkit-backdrop-filter: blur(40rpx);
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 24rpx;
  overflow: hidden;
}

.editor-content {
  padding: 32rpx;
  background-color: rgba(255, 255, 255, 0.1);
  min-height: 260rpx;
}

.textarea-input {
  width: 100%;
  height: 220rpx;
  background: transparent;
  border: none;
  font-size: 28rpx;
  color: #191c1e;
  line-height: 1.6;
}

.placeholder-style {
  color: rgba(66, 70, 86, 0.6);
}

.h-32 {
  height: 64rpx;
}

.bottom-action-bar {
  position: fixed;
  bottom: 0;
  padding-bottom: 20rpx;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(80rpx);
  -webkit-backdrop-filter: blur(80rpx);
  border-top: 2rpx solid rgba(255, 255, 255, 0.2);
  padding: 32rpx 48rpx 50rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.submit-btn {
  width: 100%;
  max-width: 1344rpx;
  background-color: #0066ff;
  padding: 22rpx 0;
  border-radius: 24rpx;
  box-shadow: 0 16rpx 64rpx rgba(0, 80, 203, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  border: none;
  line-height: 1;
}

.submit-btn::after {
  border: none;
}

.submit-btn-text {
  color: #ffffff;
  font-weight: 700;
  font-size: 32rpx;
}

.submit-btn[disabled] {
  background-color: #999;
  color: #fff;
}

.action-hint {
  margin-top: 16rpx;
  font-size: 20rpx;
  color: rgba(66, 70, 86, 0.6);
  font-weight: 500;
}
</style>
