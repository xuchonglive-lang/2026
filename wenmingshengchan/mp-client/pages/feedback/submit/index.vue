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
            <text class="target-location">A2区-组装流水线-042</text>
          </view>
          <text class="material-symbols-outlined text-primary">location_on</text>
        </view>
        <view class="info-grid">
          <view class="info-item">
            <text class="info-label">负责人</text>
            <text class="info-value">张建国 (工号: 8812)</text>
          </view>
          <view class="info-item">
            <text class="info-label">部门及小组</text>
            <text class="info-value">采一作业区 运转甲班</text>
          </view>
        </view>
      </view>

      <!-- Standard Check Button -->
      <view class="mb-24 flex-center">
        <view class="standard-btn">
          <text class="material-symbols-outlined icon-small">info</text>
          <text class="standard-btn-text">该点位上传标准[必看]</text>
        </view>
      </view>

      <!-- Media Section -->
      <view class="section-wrap mb-24">
        <view class="section-header">
          <view class="section-title-wrap">
            <text class="material-symbols-outlined">photo_camera</text>
            <text class="section-title">现场影像资料</text>
          </view>
          <text class="section-hint">支持 JPG, PNG</text>
        </view>
        
        <view class="glass-card flex-col-gap16">
          <view class="upload-mainbox">
            <text class="material-symbols-outlined icon-large text-primary-40">add_a_photo</text>
            <text class="upload-main-text">点击上传主现场照片</text>
            <text class="upload-sub-text">该照片将作为报告封面</text>
          </view>
          
          <scroll-view class="scroll-view-horizontal" scroll-x="true">
            <view class="thumb-list">
              <view class="thumb-add flex-center">
                <text class="material-symbols-outlined text-primary-50">add</text>
              </view>
              <view class="thumb-item">
                <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPq94hN8IzumNlRdASxYyIciN6sBRmG_2uwP7gP8ZLiK_048zoUl2e5nMaoCTrHsQEUSEHppRV5DA2zb95nVCkzEAjXIt35nV7kZJgR2g8SAf82Iuec5UFyu953HTFXbdn32JYUKNmH--VnazvKEpDkattAV4-tSvvZeLxaheUUBl14zBSJraE9dafwNFn14iqMvqKvhhrVErNsY3Ecz5MaIVR8J0cEe9kD8idt1FPsdfzE9DQ6QELZjcCvfrduoS2b5eNLwPutZw" mode="aspectFill" class="thumb-img"></image>
                <view class="delete-btn flex-center">
                  <text class="material-symbols-outlined icon-xs">close</text>
                </view>
              </view>
              <view class="thumb-item">
                <image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPrJ8w8Gd1UjcJ4oR8wRFC4Y3McarrZvCD2UbD4NeA-f1ngVqaxkiYu-w4KUTAf6dmNFboYkUfidrsK9p2DsxuwF5SbRVNNuKmfvv56lAEzINx-upks8ud2P2aQJOkVbx2YmJCu5QVcTo-2xYDv6lo_ZVnb66uwe8bGsPo1EYrbAdDvg4RM7ooykc7PMfh63o7gLs75A4y5VLTiiP41QD1q24SEuoeRqeGcUyLCmYHt4V9zpb-0aR1FXuaNtzQduLhiKcXmJnmMm4" mode="aspectFill" class="thumb-img"></image>
                <view class="delete-btn flex-center">
                  <text class="material-symbols-outlined icon-xs">close</text>
                </view>
              </view>
              <view class="thumb-placeholder flex-center">
                <text class="material-symbols-outlined text-outline-variant">image</text>
              </view>
              <view class="thumb-placeholder flex-center">
                <text class="material-symbols-outlined text-outline-variant">image</text>
              </view>
            </view>
          </scroll-view>
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
          <scroll-view scroll-x="true" class="editor-toolbar-scroll">
            <view class="editor-toolbar">
              <view class="tool-btn"><text class="material-symbols-outlined">format_bold</text></view>
              <view class="tool-btn"><text class="material-symbols-outlined">format_italic</text></view>
              <view class="tool-btn"><text class="material-symbols-outlined">format_list_bulleted</text></view>
              <view class="tool-btn"><text class="material-symbols-outlined">format_quote</text></view>
              <view class="tool-btn tool-pull-right"><text class="material-symbols-outlined">undo</text></view>
            </view>
          </scroll-view>
          <view class="editor-content">
            <textarea class="textarea-input" placeholder="在此详细描述现场文明生产执行情况，包括但不限于：物料堆放、地面清洁度、员工合规状态等..." placeholder-class="placeholder-style" :maxlength="-1"></textarea>
          </view>
        </view>
      </view>
      
      <!-- Space for bottom action bar & tab-bar -->
      <view class="h-32"></view>
    </view>

    <!-- Bottom Action Bar -->
    <view class="bottom-action-bar">
      <button class="submit-btn">
        <text class="material-symbols-outlined label-fill-icon">send</text>
        <text class="submit-btn-text">提交反馈报告</text>
      </button>
      <text class="action-hint">您的反馈将实时同步至文明生产管理后台</text>
    </view>
    
    <my-tab-bar :current="3"></my-tab-bar>
  </view>
</template>

<script>
export default {
  data() {
    return {}
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
  /* Leave space for bottom bar and tab bar */
}

.industrial-grid {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #0050cb 2rpx, transparent 2rpx);
  background-size: 48rpx 48rpx; /* 24px */
  opacity: 0.03;
}

.main-content {
  position: relative;
  z-index: 1;
  padding: 64rpx 32rpx 256rpx 32rpx; /* pt-8 pb-32 px-4 */
  max-width: 1344rpx; /* max-w-2xl */
  margin: 0 auto;
}

.header-wrap {
  margin-bottom: 48rpx; /* mb-6 */
}
.page-title {
  font-family: 'Manrope', sans-serif;
  font-size: 48rpx; /* text-2xl */
  font-weight: 700;
  color: #191c1e;
  letter-spacing: -0.025em;
  display: block;
  margin-bottom: 8rpx; /* mb-1 */
}
.page-subtitle {
  font-size: 28rpx; /* text-sm */
  color: #424656;
}

.glass-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(40rpx);
  -webkit-backdrop-filter: blur(40rpx);
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08); /* 0 8px 32px 0 */
  border-radius: 24rpx; /* rounded-xl */
  padding: 32rpx; /* p-4 */
}
.mb-24 { margin-bottom: 48rpx; /* mb-6 */ }
.mb-40 { margin-bottom: 80rpx; }

.location-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32rpx; /* mb-4 */
}
.tag-label {
  font-size: 20rpx; /* text-[10px] */
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #0050cb;
  font-weight: 700;
  background-color: rgba(0, 80, 203, 0.1);
  padding: 4rpx 16rpx; /* px-2 py-0.5 */
  border-radius: 9999rpx; /* rounded-full */
  margin-bottom: 16rpx; /* mb-2 */
  display: inline-block;
}
.target-location {
  font-family: 'Manrope', sans-serif;
  font-size: 36rpx; /* text-lg */
  font-weight: 600;
  color: #191c1e;
  display: block;
}
.text-primary { color: #0050cb; }

.info-grid {
  display: flex;
  justify-content: space-between;
  border-top: 2rpx solid rgba(255, 255, 255, 0.2); /* border-t border-white/20 */
  padding-top: 32rpx; /* pt-4 */
}
.info-item {
  flex: 1;
}
.info-label {
  font-size: 20rpx; /* text-[10px] */
  color: #424656;
  margin-bottom: 4rpx; /* mb-0.5 */
  display: block;
}
.info-value {
  font-size: 28rpx; /* text-sm */
  font-weight: 500;
  color: #191c1e;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.standard-btn {
  width: 40%; /* w-[40%] */
  background-color: #ba1a1a; /* bg-error */
  padding: 20rpx 0; /* py-2.5 */
  border-radius: 16rpx; /* rounded-lg */
  box-shadow: 0 20rpx 30rpx -6rpx rgba(0, 0, 0, 0.1); /* shadow-lg */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx; /* gap-1.5 */
  transition: transform 0.2s;
  margin: 0 auto; /* mx-auto */
}
.standard-btn:active {
  transform: scale(0.95);
}
.standard-btn-text {
  color: #ffffff;
  font-size: 24rpx; /* text-xs */
  font-weight: 700;
}
.icon-small { font-size: 32rpx; /* text-[16px] */ color: #ffffff; }

.section-wrap {
  margin-bottom: 48rpx; /* mb-6 */
}
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24rpx; /* mb-3 */
  padding: 0 8rpx; /* px-1 */
}
.section-title-wrap {
  display: flex;
  align-items: center;
  gap: 8rpx; /* gap-1 */
  color: #191c1e;
}
.section-title {
  font-size: 28rpx; /* text-sm */
  font-weight: 700;
}
.section-title-wrap .material-symbols-outlined {
  font-size: 36rpx; /* text-[18px] */
}
.section-hint {
  font-size: 20rpx; /* text-[10px] */
  color: #424656;
}

.flex-col-gap16 {
  display: flex;
  flex-direction: column;
  gap: 32rpx; /* gap-4 */
}

.upload-mainbox {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9; /* aspect-video */
  border-radius: 16rpx; /* rounded-lg */
  border: 4rpx dashed rgba(194, 198, 216, 1); /* border-2 border-outline-variant */
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}
.upload-mainbox:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
.icon-large { font-size: 72rpx; /* text-4xl */ }
.text-primary-40 { color: rgba(0, 80, 203, 0.4); }
.upload-main-text {
  margin-top: 16rpx; /* mt-2 */
  font-size: 28rpx; /* text-sm */
  font-weight: 500;
  color: #424656;
}
.upload-sub-text {
  font-size: 20rpx; /* text-[10px] */
  color: rgba(66, 70, 86, 0.6);
}

.scroll-view-horizontal {
  width: 100%;
  white-space: nowrap;
}
.thumb-list {
  display: flex;
  gap: 16rpx; /* gap-2 */
  padding-bottom: 16rpx; /* pb-2 */
}
.thumb-add, .thumb-item, .thumb-placeholder {
  display: inline-flex;
  flex-shrink: 0;
  width: 160rpx; /* w-20 */
  height: 160rpx; /* h-20 */
  border-radius: 16rpx; /* rounded-lg */
  position: relative;
}
.thumb-add {
  border: 2rpx solid rgba(255, 255, 255, 0.3); /* border */
  background-color: rgba(255, 255, 255, 0.1);
}
.thumb-add:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
.text-primary-50 {
  color: rgba(0, 80, 203, 0.5);
  font-size: 48rpx;
}
.thumb-item {
  overflow: hidden;
  border: 2rpx solid rgba(255, 255, 255, 0.3);
}
.thumb-img {
  width: 100%;
  height: 100%;
}
.delete-btn {
  position: absolute;
  top: 8rpx; /* top-1 bg-error/80 */
  right: 8rpx; /* right-1 */
  background-color: rgba(186, 26, 26, 0.8);
  border-radius: 50%;
  width: 36rpx; 
  height: 36rpx;
}
.icon-xs {
  font-size: 28rpx; /* text-[14px] */
  color: #fff;
}
.thumb-placeholder {
  border: 4rpx dashed rgba(194, 198, 216, 0.5);
  background-color: rgba(255, 255, 255, 0.05);
}
.text-outline-variant {
  color: #c2c6d8;
  font-size: 40rpx;
}

.editor-wrap {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(40rpx);
  -webkit-backdrop-filter: blur(40rpx);
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 24rpx; /* rounded-xl */
  overflow: hidden;
}
.editor-toolbar-scroll {
  background-color: rgba(255, 255, 255, 0.4);
  border-bottom: 2rpx solid rgba(255, 255, 255, 0.2);
}
.editor-toolbar {
  display: flex;
  gap: 32rpx; /* gap-4 */
  padding: 16rpx;
}
.tool-btn {
  padding: 8rpx;
  color: #424656;
  border-radius: 8rpx;
}
.tool-pull-right {
  margin-left: auto;
}

.editor-content {
  padding: 32rpx; /* p-4 */
  background-color: rgba(255, 255, 255, 0.1);
  min-height: 360rpx;
}
.textarea-input {
  width: 100%;
  height: 320rpx; /* min-h-[320rpx] */
  background: transparent;
  border: none;
  font-size: 28rpx; /* text-sm */
  color: #191c1e;
  line-height: 1.6;
}
.placeholder-style {
  color: rgba(66, 70, 86, 0.6);
}

.h-32 { height: 64rpx; }

.bottom-action-bar {
  position: fixed;
  bottom: 0; 
  /* It is recommended to use padding-bottom calculated with safe-area-inset-bottom */
  padding-bottom: 160rpx; /* 160rpx to push it exactly over my-tab-bar */
  left: 0;
  right: 0;
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(80rpx);
  -webkit-backdrop-filter: blur(80rpx);
  border-top: 2rpx solid rgba(255, 255, 255, 0.2);
  padding: 32rpx 48rpx 160rpx; /* p-4 px-6 */
  display: flex;
  flex-direction: column;
  align-items: center;
}
.submit-btn {
  width: 100%;
  max-width: 1344rpx; /* max-w-2xl */
  background-color: #0066ff; /* primary-container */
  padding: 32rpx 0; /* py-4 */
  border-radius: 24rpx; /* rounded-xl */
  box-shadow: 0 16rpx 64rpx rgba(0, 80, 203, 0.3); /* shadow-2xl */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx; /* gap-2 */
  border: none;
  line-height: 1;
}
.submit-btn::after {
  border: none;
}
.submit-btn-text {
  color: #ffffff;
  font-weight: 700;
  font-size: 32rpx; /* text-base */
}
.action-hint {
  margin-top: 16rpx; /* mt-2 */
  font-size: 20rpx; /* text-[10px] */
  color: rgba(66, 70, 86, 0.6);
  font-weight: 500;
}
</style>
