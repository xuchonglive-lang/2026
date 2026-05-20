<template>
  <view class="page-register">
    <cu-custom bgColor="bg-gradual-blue" :isCustom="true">
      <block slot="backText"></block>
      <block slot="content">注册</block>
    </cu-custom>
    
    
    <!-- Industrial Grid Background -->
    <view class="grid-floor"></view>

    <!-- Header -->
    <view class="page-header">
      <view class="header-left">
        <text class="header-icon">⚙</text>
        <text class="header-title">文明生产管理系统</text>
      </view>
      <view class="header-action" @click="showHelp">
        <text class="header-icon-sm">❓</text>
      </view>
    </view>

    <!-- Main Content -->
    <view class="main-content">
      <!-- Profile Box -->
      <view class="profile-box">
        <view class="avatar-wrap">
          <view class="avatar-ring">
            <image class="avatar-img" :src="userInfo.avatar || '/static/default-avatar.png'" mode="aspectFill" />
          </view>
          <view class="avatar-badge">
            <text class="badge-icon">✓</text>
          </view>
        </view>
        <text class="profile-name">{{ userInfo.nickname || '未授权终端' }}</text>
        <text class="profile-hint">完善个人信息以开启权限</text>
      </view>

      <!-- Form Section -->
      <view class="form-section">
        <!-- Real Name -->
        <view class="form-card">
          <text class="form-label">REAL NAME</text>
          <view class="form-row">
            <text class="form-icon">👤</text>
            <input class="form-input" placeholder="请输入真实姓名" type="text" v-model="formData.real_name" />
          </view>
        </view>

        <!-- Mobile -->
        <view class="form-card">
          <text class="form-label">MOBILE NUMBER</text>
          <view class="form-row">
            <text class="form-icon">📱</text>
            <input class="form-input" placeholder="请输入手机号" type="number" v-model="formData.mobile" />
          </view>
        </view>

        <!-- Department -->
        <view class="form-card" @click="handleOpenDept">
          <text class="form-label">ORGANIZATION</text>
          <view class="form-row-dept">
            <view class="dept-left">
              <text class="form-icon">🏭</text>
              <text class="dept-text">{{ formData.department_name || '选择部门 - 小组' }}</text>
            </view>
            <text class="dept-arrow">›</text>
          </view>
        </view>
      </view>

      <!-- Hint Text -->
      <view class="hint-box">
        <text class="hint-text">提交后将进入后台审核阶段，审核通过后即可访问生产看板与实时反馈功能。</text>
      </view>
    </view>

    <!-- Bottom Action -->
    <view class="bottom-action">
      <button class="btn-submit" @click="submit">
        <text class="btn-submit-text">立即提交注册</text>
        <text class="btn-submit-arrow">→</text>
      </button>
    </view>

    <!-- uView Picker for Department -->
    <u-select v-model="showDeptSelect" mode="mutil-column-auto" :list="deptList" @confirm="onDeptConfirm"></u-select>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      formData: {
        real_name: '',
        mobile: '',
        department_id: '',
        department_name: ''
      },
      showDeptSelect: false,
      deptList: []
    }
  },
  onLoad() {
    this.userInfo = this.vk.getVuex('$user.userInfo') || {};
    this.fetchDeptTree();
  },
  methods: {
    showHelp() {
      uni.showToast({ title: '如需帮助请联系管理员', icon: 'none' });
    },
    async fetchDeptTree() {
      try {
        let res = await uni.vk.callFunction({
          url: 'client/user/kh/getDeptList'
        });
        if (res.code === 0 && res.deptList) {
          this.deptList = res.deptList;
        }
      } catch (e) {
        uni.showToast({ title: '机构数据拉取异常', icon: 'none' });
      }
    },
    handleOpenDept() {
      if (!this.deptList || this.deptList.length === 0) {
        return uni.showToast({ title: '机构数据为空，请联系管理员', icon: 'none' });
      }
      this.showDeptSelect = true;
    },
    onDeptConfirm(e) {
      if (!e || e.length === 0) return;
      let lastNode = e[e.length - 1];
      if (lastNode && lastNode.value !== undefined) {
        // 过滤空值（例如“无分组”等补齐用的假节点）
        let validNodes = e.filter(item => item.value);
        this.formData.department_id = validNodes.map(item => item.value);
        this.formData.department_name = validNodes.map(item => item.label).join(' - ');
      } else {
        uni.showToast({ title: '层级选择异常', icon: 'none' });
      }
    },
    async submit() {
      if(!this.formData.real_name) return uni.showToast({ title: '请填写真实姓名', icon: 'none' });
      if(!this.formData.mobile) return uni.showToast({ title: '请填写通讯手机号', icon: 'none' });
      if(!this.formData.department_id) return uni.showToast({ title: '请选择归属组织', icon: 'none' });

      uni.showLoading({ title: '请求下发中...' });
      try {
        let res = await uni.vk.callFunction({
          url: 'client/user/kh/updateUserInfo',
          data: this.formData
        });
        uni.hideLoading();

        if(res.code === 0) {
          this.vk.setVuex('$user.userInfo', Object.assign(this.userInfo, res.userInfo));
          uni.showToast({ title: '提交成功，进入核验库', icon: 'none' });
          setTimeout(() => {
            uni.reLaunch({ url: '/pages/user/audit-status/index' });
          }, 1000);
        } else {
          uni.showToast({ title: res.msg || '写入失败', icon: 'none' });
        }
      } catch (err) {
        uni.hideLoading();
        uni.showToast({ title: '网络层脱机', icon: 'none' });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* ====================================================================
   REGISTER PAGE — Industrial Clarity / Precision Lens 1:1
   ==================================================================== */
.page-register {
  min-height: 100vh;
  background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
  background-image: radial-gradient(rgba(0, 80, 203, 0.05) 1px, transparent 1px), linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
  background-size: 48rpx 48rpx, 100% 100%;
  position: relative;
  color: #191c1e;
}

.grid-floor {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 0;
  pointer-events: none;
}

/* Header */
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32rpx;
  height: 128rpx;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08);
}
.header-left {
  display: flex;
  align-items: center;
}
.header-icon {
  font-size: 40rpx;
  color: #1d4ed8;
  margin-right: 12rpx;
}
.header-title {
  font-family: 'Manrope', sans-serif;
  font-size: 36rpx;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.01em;
}
.header-action {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24rpx;
}
.header-icon-sm {
  font-size: 36rpx;
  color: #64748b;
}

/* Main Content */
.main-content {
  padding: 192rpx 48rpx 256rpx;
  max-width: 750rpx;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Profile Box */
.profile-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 64rpx;
}
.avatar-wrap {
  position: relative;
  margin-bottom: 32rpx;
}
.avatar-ring {
  width: 192rpx;
  height: 192rpx;
  border-radius: 50%;
  border: 8rpx solid #ffffff;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
}
.avatar-img {
  width: 100%;
  height: 100%;
}
.avatar-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background-color: #0066ff;
  border: 4rpx solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.15);
}
.badge-icon {
  font-size: 22rpx;
  color: #ffffff;
  font-weight: 700;
}
.profile-name {
  font-family: 'Manrope', sans-serif;
  font-size: 42rpx;
  font-weight: 700;
  color: #191c1e;
}
.profile-hint {
  font-family: 'Inter', sans-serif;
  font-size: 28rpx;
  color: #424656;
  margin-top: 8rpx;
  letter-spacing: 0.05em;
}

/* Form Section */
.form-section {
  display: flex;
  flex-direction: column;
}
.form-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08);
  border-radius: 24rpx;
  padding: 32rpx 40rpx;
  margin-bottom: 24rpx;
}
.form-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 20rpx;
  font-weight: 700;
  color: #0050cb;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 12rpx;
}
.form-row {
  display: flex;
  align-items: center;
}
.form-icon {
  font-size: 36rpx;
  color: #424656;
  margin-right: 20rpx;
  width: 40rpx;
  text-align: center;
}
.form-input {
  flex: 1;
  font-family: 'Inter', sans-serif;
  font-size: 30rpx;
  font-weight: 500;
  color: #191c1e;
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
}

/* Department Selector */
.form-row-dept {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dept-left {
  display: flex;
  align-items: center;
  overflow: hidden;
  flex: 1;
}
.dept-text {
  font-family: 'Inter', sans-serif;
  font-size: 30rpx;
  font-weight: 500;
  color: #191c1e;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dept-arrow {
  font-size: 40rpx;
  color: #c2c6d8;
  margin-left: 16rpx;
}

/* Hint */
.hint-box {
  padding: 32rpx 16rpx;
}
.hint-text {
  font-family: 'Inter', sans-serif;
  font-size: 22rpx;
  color: #424656;
  line-height: 1.6;
  text-align: center;
  opacity: 0.7;
}

/* Bottom Action */
.bottom-action {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 48rpx;
  padding-bottom: 80rpx;
  background: linear-gradient(to top, #f7f9fb 0%, rgba(247,249,251,0.8) 60%, transparent 100%);
  z-index: 20;
}
.btn-submit {
  width: 100%;
  max-width: 750rpx;
  margin: 0 auto;
  height: 112rpx;
  background-color: #0066ff;
  color: #ffffff;
  border-radius: 24rpx;
  font-weight: 700;
  font-size: 32rpx;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 16rpx 40rpx -8rpx rgba(0, 102, 255, 0.4);
  position: relative;
  overflow: hidden;
  transition: all 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.btn-submit:active {
  transform: scale(0.98);
}
.btn-submit-text {
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 700;
}
.btn-submit-arrow {
  color: #ffffff;
  font-size: 36rpx;
  margin-left: 12rpx;
}

/* uniapp button reset */
button::after { border: none; }
</style>
