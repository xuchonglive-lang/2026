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
        <text class="page-title">反馈录入</text>
        <text class="page-subtitle">请按标准上传规定点位现场信息</text>
      </view>

      <!-- Location Info -->
      <view class="glass-card mb-24">
        <view class="location-header">
          <view class="location-titles">
            <text class="tag-label">需反馈点位</text>
            <text class="target-location">{{ getPointName(feedbackData) || pointName || '加载中...' }}</text>
          </view>
          <text class="material-symbols-outlined text-primary">location_on</text>
        </view>
        <view class="info-grid">
          <view class="info-item">
            <text class="info-label">反馈人</text>
            <text class="info-value">{{ getUserName() }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">用户部门/小组</text>
            <text class="info-value">{{ getDeptName(feedbackData) }}</text>
          </view>
        </view>
        <!-- Standard Button -->
        <view class="standard-btn-wrap" v-if="getFeedbackStandard(feedbackData)">
          <button class="standard-btn" @click="showStandardPopup = true">
            <text class="material-symbols-outlined icon-info">info</text>
            <text>该点位上传标准[必看]</text>
          </button>
        </view>
      </view>

      <!-- Media Section -->
      <view class="section-wrap mb-24">
        <view class="section-header">
          <view class="section-title-wrap">
            <text class="material-symbols-outlined">photo_camera</text>
            <text class="section-title">现场影像资料</text>
          </view>
          <text class="section-hint">支持 JPG, PNG，将提取EXIF防伪信息</text>
        </view>
        
        <view class="glass-card flex-col-gap16">
          <view class="upload-container" style="background: transparent; border: none; padding: 0;">
            <view class="image-grid" style="display: flex; flex-direction: column; gap: 32rpx;">
              <view v-for="(title, idx) in photoRequirements" :key="idx" class="requirement-slot" style="background: #f8fafc; border: 2rpx dashed #cbd5e1; border-radius: 16rpx; padding: 24rpx; display: flex; align-items: center; justify-content: space-between;">
                <view class="slot-info" style="flex: 1; padding-right: 24rpx;">
                  <text style="color: #ef4444; margin-right: 8rpx;">*</text>
                  <text style="font-weight: 700; font-size: 28rpx; color: #191c1e;">{{ title }}</text>
                </view>
                <view class="slot-image" style="width: 140rpx; height: 140rpx;">
                  <view v-if="images[idx] && images[idx].url" class="image-item" style="width: 100%; height: 100%; position: relative; border-radius: 12rpx; overflow: visible;">
                    <image :src="images[idx].url" mode="aspectFill" class="preview-img" style="width: 100%; height: 100%; border-radius: 12rpx;" @click="previewImage(idx)"></image>
                    <view class="delete-btn" @click.stop="deleteImage(idx)" style="position: absolute; top: -16rpx; right: -16rpx; width: 44rpx; height: 44rpx; background: rgba(0,0,0,0.6); border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 10;">
                      <text class="material-symbols-outlined" style="color: white; font-size: 28rpx;">close</text>
                    </view>
                  </view>
                  <view v-else class="upload-add-btn" @click="chooseImageForSlot(idx, title)" style="width: 100%; height: 100%; background: #f1f5f9; border: 2rpx dashed #cbd5e1; border-radius: 12rpx; display: flex; align-items: center; justify-content: center;">
                    <text class="material-symbols-outlined" style="font-size: 56rpx; color: #94a3b8;">add</text>
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
            <text class="material-symbols-outlined">edit_note</text>
            <text class="section-title">现场情况说明</text>
          </view>
        </view>
        
        <view class="editor-wrap">
          <view class="editor-content">
            <textarea v-model="content" class="textarea-input" placeholder="在此详细描述现场文明生产执行情况，包括但不限于：物料堆放、地面清洁度、员工合规状态等..." placeholder-class="placeholder-style" :maxlength="-1"></textarea>
          </view>
        </view>
      </view>
      
      <!-- Space for bottom action bar & tab-bar -->
      <view class="h-32"></view>
    </view>

    <!-- Bottom Action Bar -->
    <view class="bottom-action-bar">
      <button class="submit-btn" @click="submit" :disabled="submitting || feedbackStatus !== 'active'">
        <text class="material-symbols-outlined label-fill-icon">send</text>
        <text class="submit-btn-text">{{ submitting ? '提交中...' : (feedbackStatus === 'waiting' ? '未到提交时间' : (feedbackStatus === 'expired' ? '已逾期' : '提交反馈报告')) }}</text>
      </button>
      <text class="action-hint">提交即触发原子锁，避免并发踩踏</text>
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
       feedbackStatus: 'active'
    }
  },
  onLoad(options) {
     this.pointName = options.name || '';
     this.feedbackId = options.id || '';
     this.feedbackStatus = options.status || 'active';
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
          } catch(err) {
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
      if(!this.images[idx] || !this.images[idx].url) return;
      uni.previewImage({
        current: 0,
        urls: [this.images[idx].url]
      });
    },
    async submit() {
       if(!this.feedbackId) {
          uni.vk.toast("丢失订单关联基底！");
          return;
       }
       let requiredLen = this.photoRequirements.length;
       let validImages = [];
       for(let i=0; i<requiredLen; i++) {
          if (!this.images[i] || !this.images[i].url) {
             uni.vk.toast(`请上传 [${this.photoRequirements[i]}] 的照片`);
             return;
          }
          validImages.push(this.images[i]);
       }

       this.submitting = true;
       try {
          let res = await uni.vk.callFunction({
             url: 'client/feedback/kh/submitFeedback',
             data: {
                 _id: this.feedbackId,
                 images: validImages,
                 content: this.content || ''
             }
          });
          if(res.code === 0) {
             uni.vk.toast("反馈已确认并挂牌！", "success", 1000);
             setTimeout(()=>{
                 uni.navigateBack();
             }, 1000);
          } else {
             uni.vk.toast(res.msg || "无法完成挂牌，可能是系统或并发问题。");
          }
       } catch (err) {
          uni.vk.toast(err.msg || "提交异常，或单已处于流拍与抢报期外");
       } finally {
          this.submitting = false;
       }
    }
  }
}
</script>

<style lang="scss" scoped>

.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
.label-fill-icon {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.feedback-submit-page {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
  background-attachment: fixed;
  min-height: 100vh;
  position: relative;
}

.industrial-grid {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
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

.header-wrap { margin-bottom: 48rpx; }
.page-title {
  font-family: 'Manrope', sans-serif;
  font-size: 48rpx; font-weight: 700;
  color: #191c1e; letter-spacing: -0.025em; display: block; margin-bottom: 8rpx;
}
.page-subtitle { font-size: 28rpx; color: #424656; }

.glass-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(40rpx);
  -webkit-backdrop-filter: blur(40rpx);
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08); /* 0 8px 32px 0 */
  border-radius: 24rpx; padding: 32rpx;
}
.mb-24 { margin-bottom: 48rpx; }
.mb-40 { margin-bottom: 80rpx; }

.location-header {
  display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32rpx;
}
.tag-label {
  font-size: 20rpx; text-transform: uppercase; letter-spacing: 0.05em; color: #0050cb;
  font-weight: 700; background-color: rgba(0, 80, 203, 0.1); padding: 4rpx 16rpx;
  border-radius: 9999rpx; margin-bottom: 16rpx; display: inline-block;
}
.target-location {
  font-family: 'Manrope', sans-serif; font-size: 36rpx; font-weight: 600; color: #191c1e; display: block;
}
.text-primary { color: #0050cb; }

.info-grid {
  display: flex; justify-content: space-between; border-top: 2rpx solid rgba(255, 255, 255, 0.2); padding-top: 24rpx;
}
.info-item { flex: 1; }
.info-label { font-size: 20rpx; color: #424656; margin-bottom: 4rpx; display: block; }
.info-value { font-size: 28rpx; font-weight: 600; color: #191c1e; }

.standard-btn-wrap {
  margin-top: 32rpx;
}
.standard-btn {
  background-color: #b91c1c; /* Danger Red */
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
.standard-btn::after { border: none; }
.icon-info {
  font-size: 32rpx;
  margin-right: 8rpx;
}

.popup-container {
  display: flex; flex-direction: column; max-height: 70vh; background-color: #ffffff;
}
.popup-header {
  padding: 32rpx; border-bottom: 2rpx solid #f1f5f9; text-align: center; position: relative;
}
.popup-title {
  font-size: 32rpx; font-weight: 700; color: #191c1e;
}
.popup-scroll {
  padding: 32rpx; height: 50vh;
}

.section-wrap { margin-bottom: 48rpx; }
.section-header {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 24rpx; padding: 0 8rpx;
}
.section-title-wrap { display: flex; align-items: center; gap: 8rpx; color: #191c1e; }
.section-title { font-size: 28rpx; font-weight: 700; }
.section-title-wrap .material-symbols-outlined { font-size: 36rpx; }
.section-hint { font-size: 20rpx; color: #424656; }

.flex-col-gap16 { display: flex; flex-direction: column; gap: 32rpx; }

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
  background: rgba(0,0,0,0.5);
  border-radius: 50%;
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
.delete-btn .material-symbols-outlined {
  color: #fff;
  font-size: 32rpx;
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
.upload-add-btn .material-symbols-outlined {
  font-size: 64rpx;
  color: #94a3b8;
}

.editor-wrap {
  background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(40rpx); -webkit-backdrop-filter: blur(40rpx);
  border: 2rpx solid rgba(255, 255, 255, 0.2); border-radius: 24rpx; overflow: hidden;
}

.editor-content { padding: 32rpx; background-color: rgba(255, 255, 255, 0.1); min-height: 260rpx; }
.textarea-input {
  width: 100%; height: 220rpx; background: transparent; border: none;
  font-size: 28rpx; color: #191c1e; line-height: 1.6;
}
.placeholder-style { color: rgba(66, 70, 86, 0.6); }

.h-32 { height: 64rpx; }

.bottom-action-bar {
  position: fixed; bottom: 0; padding-bottom: 20rpx; left: 0; right: 0; z-index: 50;
  background-color: rgba(255, 255, 255, 0.4); backdrop-filter: blur(80rpx); -webkit-backdrop-filter: blur(80rpx);
  border-top: 2rpx solid rgba(255, 255, 255, 0.2); padding: 32rpx 48rpx 50rpx;
  display: flex; flex-direction: column; align-items: center;
}
.submit-btn {
  width: 100%; max-width: 1344rpx; background-color: #0066ff; padding: 22rpx 0;
  border-radius: 24rpx; box-shadow: 0 16rpx 64rpx rgba(0, 80, 203, 0.3);
  display: flex; align-items: center; justify-content: center; gap: 16rpx; border: none; line-height: 1;
}
.submit-btn::after { border: none; }
.submit-btn-text { color: #ffffff; font-weight: 700; font-size: 32rpx; }
.submit-btn[disabled] { background-color: #999; color: #fff;}
.action-hint { margin-top: 16rpx; font-size: 20rpx; color: rgba(66, 70, 86, 0.6); font-weight: 500; }
</style>
