<template>
  <view class="feedback-submit-page">
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
            <text class="target-location">{{ pointName || '加载中...' }}</text>
          </view>
          <text class="material-symbols-outlined text-primary">location_on</text>
        </view>
        <view class="info-grid">
          <view class="info-item">
            <text class="info-label">执勤人</text>
            <text class="info-value">{{ userInfo.nickname || '系统未匹配' }}</text>
          </view>
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
          <view v-if="!mainImage" class="upload-mainbox" @click="uploadImage">
            <text class="material-symbols-outlined icon-large text-primary-40">add_a_photo</text>
            <text class="upload-main-text">点击上传主现场照片</text>
            <text class="upload-sub-text">该照片将提取原图防伪时间</text>
          </view>
          <view v-else class="upload-mainbox" style="padding: 0; overflow: hidden;" @click="uploadImage">
             <image :src="mainImage" style="width: 100%; height: 100%" mode="aspectFill"></image>
             <view class="reupload-layer">
                 <text style="color: #fff">重新上传</text>
             </view>
          </view>
          
          <view v-if="mainImage" style="font-size: 24rpx; color: #666; margin-top: 10rpx">
             <view>设备型号：{{ deviceModel || '未提取到' }}</view>
             <view>拍摄时间：{{ shootTime || '未提取到' }}</view>
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
      <button class="submit-btn" @click="submit" :disabled="submitting">
        <text class="material-symbols-outlined label-fill-icon">send</text>
        <text class="submit-btn-text">{{ submitting ? '提交中...' : '提交反馈报告' }}</text>
      </button>
      <text class="action-hint">提交即触发原子锁，避免并发踩踏</text>
    </view>
    
  </view>
</template>

<script>
// 引入 exif-js 用于提取原图参数
import EXIF from 'exif-js';

export default {
  data() {
    return {
       pointName: '',
       feedbackId: '',
       mainImage: '',
       content: '',
       shootTime: '',
       deviceModel: '',
       userInfo: {},
       submitting: false
    }
  },
  onLoad(options) {
     this.pointName = options.name || '';
     this.feedbackId = options.id || '';
     // 拿本地用户信息
     const uinfo = uni.getStorageSync('uni_id_user_info') || {};
     this.userInfo = uinfo;
  },
  methods: {
    uploadImage() {
       uni.chooseImage({
          count: 1,
          sizeType: ['original'], // 必须要有原图，否则拿不到 exif
          success: (res) => {
             const tempFilePaths = res.tempFilePaths;
             const file = res.tempFiles[0];
             const filePath = tempFilePaths[0];

             // 1. 先进行文件 EXIF 识别提取
             try {
                 const fsm = uni.getFileSystemManager();
                 fsm.readFile({
                     filePath: filePath,
                     success: (fsmRes) => {
                         const arrayBuffer = fsmRes.data;
                         const exifData = EXIF.readFromBinaryFile(arrayBuffer);
                         
                         if(exifData) {
                            this.shootTime = exifData.DateTimeOriginal || exifData.DateTime || '未知(或图片被压缩丢失)';
                            // Apple 等设备型号
                            this.deviceModel = exifData.Model || uni.getSystemInfoSync().model;
                         } else {
                            this.deviceModel = uni.getSystemInfoSync().model;
                            this.shootTime = '未能获取图片EXIF信息';
                         }
                     },
                     fail: () => {
                        this.deviceModel = uni.getSystemInfoSync().model;
                     }
                 });
             } catch(e) {
                 this.deviceModel = uni.getSystemInfoSync().model;
             }

             // 2. 调用标准云上传
             uni.vk.callFunctionUtil.uploadFile({
                 title: "图传解析中",
                 filePath,
                 fileType: "image",
                 success: (uploadRes) => {
                     this.mainImage = uploadRes.url;
                 }
             });
          }
       });
    },
    async submit() {
       if(!this.feedbackId) {
          uni.vk.toast("丢失订单关联基底！");
          return;
       }
       if(!this.mainImage) {
          uni.vk.toast("务必拍摄并上传现场核心勘测图！");
          return;
       }

       this.submitting = true;
       try {
          let res = await uni.vk.callFunction({
             url: 'client/feedback/kh/submitFeedback',
             data: {
                 feedback_id: this.feedbackId,
                 main_image: this.mainImage,
                 feedback_content: this.content || '',
                 photo_shoot_time: this.shootTime || '',
                 device_model: this.deviceModel || ''
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
  display: flex; justify-content: space-between; border-top: 2rpx solid rgba(255, 255, 255, 0.2); padding-top: 32rpx;
}
.info-item { flex: 1; }
.info-label { font-size: 20rpx; color: #424656; margin-bottom: 4rpx; display: block; }
.info-value { font-size: 28rpx; font-weight: 500; color: #191c1e; }

.section-wrap { margin-bottom: 48rpx; }
.section-header {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 24rpx; padding: 0 8rpx;
}
.section-title-wrap { display: flex; align-items: center; gap: 8rpx; color: #191c1e; }
.section-title { font-size: 28rpx; font-weight: 700; }
.section-title-wrap .material-symbols-outlined { font-size: 36rpx; }
.section-hint { font-size: 20rpx; color: #424656; }

.flex-col-gap16 { display: flex; flex-direction: column; gap: 32rpx; }

.upload-mainbox {
  position: relative; width: 100%; aspect-ratio: 16 / 9; border-radius: 16rpx;
  border: 4rpx dashed rgba(194, 198, 216, 1); background-color: rgba(255, 255, 255, 0.1);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  transition: background-color 0.3s;
}
.upload-mainbox:hover { background-color: rgba(255, 255, 255, 0.2); }
.icon-large { font-size: 72rpx; }
.text-primary-40 { color: rgba(0, 80, 203, 0.4); }
.upload-main-text { margin-top: 16rpx; font-size: 28rpx; font-weight: 500; color: #424656; }
.upload-sub-text { font-size: 20rpx; color: rgba(66, 70, 86, 0.6); }
.reupload-layer {
   position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.5); padding: 10rpx 0; text-align: center;
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
