<template>
  <view class="page-login">



    <!-- Level 0: Industrial Grid Floor -->
    <view class="grid-floor"></view>

    <!-- Level 2: Active Glass Login Card -->
    <view class="login-card">
      <!-- Brand Logo -->
      <view class="logo-box">
        <image class="logo-img" src="/static/logo.png" mode="aspectFill" />
      </view>

      <!-- System Title -->
      <text class="sys-title">文明生产专业管理系统</text>

      <!-- Primary Action: WeChat Login Button -->
      <button class="btn-wechat" @click="handleWechatAuth">
        <text class="btn-icon">💬</text>
        <text class="btn-text">微信授权登录</text>
      </button>

      <!-- Privacy Policy Disclaimer -->
      <text class="privacy-text">登录即代表您同意我们的服务协议和隐私政策</text>
    </view>

    <!-- Privacy authorization Native Component -->
    <AuthDialog ref="authDialog" @accept="onAuthAccept"></AuthDialog>
  </view>
</template>

<script>
import AuthDialog from '@/components/AuthDialog/AuthDialog.vue'

export default {
  components: {
    AuthDialog
  },
  data() {
    return {}
  },
  methods: {
    async handleWechatAuth() {
      // 第一阶段：发起 type: 'login' 的纯静默通讯，不自动注册
      uni.showLoading({ title: '安全信道建立中...' });

      try {
        const [loginErr, loginRes] = await uni.login({ provider: 'weixin' });
        if (loginErr || !loginRes.code) throw new Error('微信通信链路异常');

        let res;
        try {
          // 仅登录，若用户不存在则直接报错，不自动建档
          // needAlert: false 禁止 vk 框架自动弹出错误弹窗，由我们自己处理
          res = await uni.vk.callFunction({
            url: 'client/user/pub/loginByWeixin',
            needAlert: false,
            data: {
              code: loginRes.code,
              type: 'login'
            }
          });
        } catch (errRes) {
          // 当 code !== 0 时，vk.callFunction 会执行 reject，在此捕获并将响应赋给 res
          res = errRes;
        }

        uni.hideLoading();

        if (res && res.code === 0) {
          if (res.userInfo) {
            this.vk.setVuex('$user.userInfo', res.userInfo);
          }

          // 核心拦截：已存在用户是否有头像和昵称？
          let hasAvatarAndNickname = res.userInfo && res.userInfo.nickname && res.userInfo.avatar;

          if (!hasAvatarAndNickname) {
            // 已建档但信息缺失，唤醒授权组件补充信息
            this.$refs.authDialog.show();
            return;
          }

          // 信息完整，直接路由分发
          this.routeUser(res.userInfo);
        } else if (res && typeof res.code !== 'undefined') {
          // 判断是否为新用户未注册错误 (包含业务错误 -1: 账号未注册)
          const unregisteredCodes = [10001, -1, 90001, 30201, 30202, 30203, 30204];
          const isUnregistered = unregisteredCodes.indexOf(res.code) > -1 ||
            (res.msg && (res.msg.indexOf('未注册') > -1 || res.msg.indexOf('不存在') > -1 || res.msg.indexOf('未绑定') > -1));

          if (isUnregistered) {
            // 新用户：数据库无任何记录，直接拉起头像昵称授权框
            this.$refs.authDialog.show();
          } else {
            uni.showToast({ title: res.msg || '鉴权被系统拒绝', icon: 'none' });
          }
        } else {
          throw new Error((res && res.msg) || '请求发生未知异常');
        }
      } catch (e) {
        uni.hideLoading();
        uni.showToast({ title: e.message || '网络断开无响应', icon: 'none' });
      }
    },

    // 路由自动分发中心，根据审查进度跃迁不同页面
    routeUser(userInfo) {
      let status = userInfo.audit_status || 0;
      if (status === 0) {
        // 白板/待完善用户 -> 强制跳明细完善页
        uni.reLaunch({ url: '/pages/user/register/index' });
      } else if (status === 1 || status === 2) {
        // 待审批/被拒绝 -> 锁在黑屋听候发落
        uni.reLaunch({ url: '/pages/user/audit-status/index' });
      } else if (status === 3) {
        // 持牌放行用户 -> 进入生产系统控制主台
        uni.reLaunch({ url: '/pages/index/index' });
      }
    },

    async onAuthAccept(userInfoForm) {
      uni.showLoading({ title: '凭据构建与入库中...' });

      try {
        let finalAvatar = userInfoForm.avatar;
        let finalNickname = userInfoForm.nickname;

        // 如果头像是本地沙盒图片，抢先转存上云兑换公网永久 URL
        if (finalAvatar && (finalAvatar.startsWith('http://tmp') || finalAvatar.startsWith('wxfile://') || finalAvatar.startsWith('file://'))) {
          try {
            let uploadRes = await uni.vk.callFunctionUtil.uploadFile({
              filePath: finalAvatar,
              fileType: "image",
              needSave: false
            });
            if (uploadRes && uploadRes.url) {
              finalAvatar = uploadRes.url;
            }
          } catch (uploadErr) {
            console.error("头像上云失败，已采用默认头像兜底:", uploadErr);
            // 采用项目内建的 premium 灰度剪影 base64 占位图
            finalAvatar = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgMTIwIj4KICA8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2YxZjVmOSIvPgogIDxjaXJjbGUgY3g9IjYwIiBjeT0iNDgiIHI9IjI0IiBmaWxsPSIjY2JkNWUxIi8+CiAgPHBhdGggZD0iTTYwIDgwYy0yNSAwLTQwIDE1LTQwIDI0aDgwYzAtOS0xNS0yNC00MC0yNHoiIGZpbGw9IiNjYmQ1ZTEiLz4KPC9zdmc+';
            
            uni.showToast({
              title: '头像服务受限，已使用系统默认头像',
              icon: 'none',
              duration: 2000
            });
            // 延迟以确保用户看到提示
            await new Promise(resolve => setTimeout(resolve, 800));
          }
        }

        // 之前那个 code 已被消耗，重新申请一枚新 code 用于正式建档
        const [loginErr, loginRes] = await uni.login({ provider: 'weixin' });
        if (loginErr || !loginRes.code) throw new Error('通信链路异常');

        let res;
        try {
          // 第二阶段：确认授权后才正式建档，传入 type: 'register'
          res = await uni.vk.callFunction({
            url: 'client/user/pub/loginByWeixin',
            needAlert: false,
            data: {
              code: loginRes.code,
              type: 'register',
              avatar: finalAvatar,
              nickname: finalNickname
            }
          });
        } catch (errRes) {
          res = errRes;
        }

        uni.hideLoading();

        if (res && res.code === 0) {
          if (res.userInfo) {
            this.vk.setVuex('$user.userInfo', res.userInfo);
          }
          this.$refs.authDialog.hide();
          uni.showToast({ title: '身份烙印成功', icon: 'none', duration: 1500 });

          setTimeout(() => {
            this.routeUser(res.userInfo);
          }, 1000);
        } else {
          uni.showToast({ title: (res && res.msg) || '入库发生阻断', icon: 'none' });
        }
      } catch (e) {
        uni.hideLoading();
        uni.showToast({ title: e.message || '网络断开无响应', icon: 'none' });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* ====================================================================
   LOGIN PAGE — Industrial Clarity / Precision Lens 1:1
   ==================================================================== */
.page-login {
  min-height: 100vh;
  background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48rpx;
  position: relative;
  overflow: hidden;
}

/* Level 0: Grid */
.grid-floor {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background-image:
    linear-gradient(to right, rgba(0, 80, 203, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 80, 203, 0.03) 1px, transparent 1px);
  background-size: 16rpx 16rpx;
  pointer-events: none;
}

/* Level 2: Login Card */
.login-card {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 720rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 24rpx;
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08);
  padding: 96rpx 80rpx 64rpx;
}

/* Logo */
.logo-box {
  width: 192rpx;
  height: 192rpx;
  border-radius: 24rpx;
  background: rgba(224, 227, 229, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.5);
  overflow: hidden;
  margin-bottom: 48rpx;
  box-shadow: inset 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}

.logo-img {
  width: 100%;
  height: 100%;
}

/* Title */
.sys-title {
  font-family: 'Manrope', sans-serif;
  font-size: 44rpx;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.05em;
  color: #191c1e;
  text-align: center;
  margin-bottom: 80rpx;
}

/* WeChat Login Button */
.btn-wechat {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 96rpx;
  padding: 0 48rpx;
  border-radius: 24rpx;
  background-color: #0066ff;
  color: #ffffff;
  border: none;
  margin-bottom: 64rpx;
  box-shadow: inset 0 4rpx 8rpx rgba(255, 255, 255, 0.2), 0 8rpx 20rpx rgba(0, 102, 255, 0.2);
  transition: all 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.btn-wechat:active {
  transform: scale(0.98);
  box-shadow: 0 4rpx 12rpx rgba(0, 102, 255, 0.2);
}

.btn-icon {
  font-size: 40rpx;
  margin-right: 16rpx;
}

.btn-text {
  font-family: 'Inter', sans-serif;
  font-size: 32rpx;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #ffffff;
}

/* Privacy */
.privacy-text {
  font-family: 'Inter', sans-serif;
  font-size: 24rpx;
  font-weight: 500;
  color: #424656;
  text-align: center;
  text-decoration: underline;
  text-underline-offset: 6rpx;
  letter-spacing: 0.05em;
  opacity: 0.8;
}

/* uniapp button reset */
button::after {
  border: none;
}
</style>
