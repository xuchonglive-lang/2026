<template>
  <view class="page-container">
    <view class="header-nav">
      <u-navbar :title="mode === 'close' ? '申请验收结案' : '提交进度反馈'" :border-bottom="false"></u-navbar>
    </view>
    
    <view class="form-wrapper">
      <view class="tips-box" v-if="mode === 'close'">
        <text class="material-symbols-outlined">info</text>
        <text>您正在发起结案验收流程。提交后，项目将进入「待验收」状态，不可再编辑过程记录。</text>
      </view>
      
      <u-form :model="form" ref="uForm">
        <u-form-item label="情况描述" prop="desc_content" label-position="top" :border-bottom="false">
          <view class="textarea-box">
            <u-input v-model="form.desc_content" type="textarea" placeholder="请详细描述当前进度细节，或写明达到验收标准的依据..." height="200" maxlength="1000" :custom-style="{padding: '24rpx', background: '#f8f9fa', borderRadius: '16rpx'}"/>
          </view>
        </u-form-item>
        
        <u-form-item label="上传佐证照片（最多4张）" label-position="top" :border-bottom="false">
          <!-- 由于此处是客户端提交，建议使用 uni-file-picker 或是项目中已有的组件，如 vk-data-upload -->
          <uni-file-picker 
             v-model="tempImages" 
             limit="4" 
             file-extname="png,jpg,jpeg" 
             @success="uploadSuccess" 
             @delete="uploadDelete"
          ></uni-file-picker>
        </u-form-item>
      </u-form>
      
      <view class="submit-btn-box">
        <u-button type="primary" shape="circle" @click="submit" :loading="loading" :custom-style="{height: '96rpx', fontSize: '32rpx', fontWeight: 'bold', background: '#0050cb'}">
          确认提交
        </u-button>
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
    this.mode = options.mode || 'feedback';
  },
  methods: {
    uploadSuccess(e) {
      // 获取上传后的云端 URL，此处取决于 uni-file-picker 的返回
      let urls = e.tempFilePaths || [];
      if(e.tempFiles && e.tempFiles.length > 0) {
          urls = e.tempFiles.map(f => f.url || f.path);
      }
      this.form.attachment_imgs = this.form.attachment_imgs.concat(urls);
    },
    uploadDelete(e) {
      let index = this.form.attachment_imgs.findIndex(url => url === e.tempFilePath || url === e.tempFile.url);
      if (index > -1) {
        this.form.attachment_imgs.splice(index, 1);
      }
    },
    submit() {
      if (!this.form.desc_content.trim()) {
        this.$refs.uToast.show({ title: '请填写情况描述', type: 'warning' });
        return;
      }
      this.loading = true;
      let url = this.mode === 'close' ? 'client/keywork/kh/applyProjectClose' : 'client/keywork/kh/addProcessRecord';
      
      this.vk.callFunction({
        url: url,
        data: {
          project_id: this.projectId,
          desc_content: this.form.desc_content,
          attachment_imgs: this.form.attachment_imgs
        },
        success: (res) => {
          this.$refs.uToast.show({ title: '提交成功', type: 'success' });
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  min-height: 100vh;
  background: #fff;
}
.form-wrapper {
  padding: 32rpx;
}
.tips-box {
  background: #eef2ff;
  border: 1px solid #c7d2fe;
  padding: 24rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: flex-start;
  gap: 12rpx;
  margin-bottom: 32rpx;
  
  text {
    font-size: 26rpx;
    color: #4f46e5;
    line-height: 1.5;
  }
  .material-symbols-outlined {
    font-size: 32rpx;
    margin-top: 2rpx;
  }
}
.textarea-box {
  width: 100%;
}
.submit-btn-box {
  margin-top: 64rpx;
  padding-bottom: 64rpx;
}
</style>
