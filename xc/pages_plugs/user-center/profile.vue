<template>
  <app-layout page-title="个人信息" :show-tab-bar="false">
    <view class="profile-page">
      <!-- 头部用户卡片 -->
      <view class="profile-header">
        <image
          class="profile-avatar"
          :src="userInfo.avatar || userInfo.wx_avatar || '/static/avatar-default.png'"
          mode="aspectFill"
        />
        <view class="profile-header-info">
          <text class="profile-name">{{ userInfo.real_name || userInfo.wx_nickname || '未设置' }}</text>
          <text class="profile-wx-name" v-if="userInfo.wx_nickname">
            <text class="profile-wx-icon">微信</text> {{ userInfo.wx_nickname }}
          </text>
        </view>
      </view>

      <!-- 基本信息 -->
      <view class="profile-section">
        <text class="profile-section-title">基本信息</text>
        <view class="profile-cell" @click="editRealName">
          <text class="profile-cell-label">真实姓名</text>
          <view class="profile-cell-value">
            <text>{{ userInfo.real_name || '未设置' }}</text>
            <text class="profile-cell-arrow">›</text>
          </view>
        </view>
        <view class="profile-cell" @click="editMobile">
          <text class="profile-cell-label">手机号码</text>
          <view class="profile-cell-value">
            <text>{{ maskedMobile || '未绑定' }}</text>
            <text class="profile-cell-arrow">›</text>
          </view>
        </view>
      </view>

      <!-- 企业组织 -->
      <view class="profile-section">
        <text class="profile-section-title">企业组织</text>
        <view class="profile-cell">
          <text class="profile-cell-label">所属部门</text>
          <view class="profile-cell-value">
            <text>{{ userInfo.tenant_name || '未分配' }}</text>
          </view>
        </view>
        <view class="profile-cell" v-if="userInfo.group_name">
          <text class="profile-cell-label">内部小组</text>
          <view class="profile-cell-value">
            <text>{{ userInfo.group_name }}</text>
          </view>
        </view>
        <view class="profile-cell">
          <text class="profile-cell-label">角色</text>
          <view class="profile-cell-value">
            <text>{{ roleText }}</text>
          </view>
        </view>
      </view>

      <!-- 退出登录 -->
      <view class="profile-logout" @click="logout">
        <text class="profile-logout-text">退出登录</text>
      </view>
    </view>

    <!-- 编辑真实姓名弹窗 -->
    <uni-popup ref="namePopup" type="dialog">
      <view class="edit-popup">
        <text class="edit-popup-title">修改真实姓名</text>
        <input
          class="edit-popup-input"
          v-model="editForm.real_name"
          placeholder="请输入真实姓名"
          maxlength="20"
        />
        <view class="edit-popup-btns">
          <button class="edit-popup-cancel" @click="$refs.namePopup.close()">取消</button>
          <button class="edit-popup-confirm" :loading="saving" @click="saveRealName">保存</button>
        </view>
      </view>
    </uni-popup>

    <!-- 编辑手机号弹窗 -->
    <uni-popup ref="mobilePopup" type="dialog">
      <view class="edit-popup">
        <text class="edit-popup-title">修改手机号码</text>
        <input
          class="edit-popup-input"
          v-model="editForm.mobile"
          placeholder="请输入手机号码"
          type="number"
          maxlength="11"
        />
        <view class="edit-popup-btns">
          <button class="edit-popup-cancel" @click="$refs.mobilePopup.close()">取消</button>
          <button class="edit-popup-confirm" :loading="saving" @click="saveMobile">保存</button>
        </view>
      </view>
    </uni-popup>
  </app-layout>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      editForm: {
        real_name: '',
        mobile: ''
      },
      saving: false
    }
  },
  computed: {
    maskedMobile() {
      let m = this.userInfo.mobile
      if (!m || m.length < 7) return m
      return m.substring(0, 3) + '****' + m.substring(7)
    },
    roleText() {
      let role = this.userInfo.role
      if (!role || role.length === 0) return '普通用户'
      return role.join('、')
    }
  },
  onShow() {
    this.loadUserInfo()
  },
  methods: {
    loadUserInfo() {
      this.userInfo = this.vk.getVuex('$user.userInfo') || {}
    },
    editRealName() {
      this.editForm.real_name = this.userInfo.real_name || ''
      this.$refs.namePopup.open()
    },
    editMobile() {
      this.editForm.mobile = this.userInfo.mobile || ''
      this.$refs.mobilePopup.open()
    },
    async saveRealName() {
      let val = this.editForm.real_name
      if (!val || !val.trim()) {
        return this.vk.toast('请输入真实姓名')
      }
      this.saving = true
      try {
        let res = await this.vk.callFunction({
          url: 'user/kh/updateInfo',
          data: { real_name: val.trim(), mobile: this.userInfo.mobile }
        })
        if (res.code === 0) {
          this.vk.toast(res.msg, 'success')
          // 刷新 Vuex 用户信息
          this.vk.setVuex('$user.userInfo.real_name', val.trim())
          this.loadUserInfo()
          this.$refs.namePopup.close()
        }
      } catch (e) {
        // vk 框架已自动处理
      } finally {
        this.saving = false
      }
    },
    async saveMobile() {
      let val = this.editForm.mobile
      if (!val || !this.vk.pubfn.test(val, 'mobile')) {
        return this.vk.toast('请输入正确的手机号码')
      }
      this.saving = true
      try {
        let res = await this.vk.callFunction({
          url: 'user/kh/updateInfo',
          data: { real_name: this.userInfo.real_name, mobile: val }
        })
        if (res.code === 0) {
          this.vk.toast(res.msg, 'success')
          this.vk.setVuex('$user.userInfo.mobile', val)
          this.loadUserInfo()
          this.$refs.mobilePopup.close()
        }
      } catch (e) {
        // vk 框架已自动处理
      } finally {
        this.saving = false
      }
    },
    async logout() {
      try {
        await this.vk.userCenter.loginOut()
        this.vk.navigateTo('/pages/login/index')
      } catch (e) {
        this.vk.toast('退出失败，请重试')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-page {
  padding: var(--spacing-md, 16px);
  max-width: 600px;
  margin: 0 auto;
}

/* 头部卡片 */
.profile-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md, 16px);
  padding: var(--spacing-lg, 24px);
  background: var(--color-bg-card, #fff);
  border-radius: var(--radius-base, 6px);
  box-shadow: var(--shadow-sm, 0 1px 2px 0 rgba(15,23,42,0.04));
  margin-bottom: var(--spacing-md, 16px);
}
.profile-avatar {
  width: 64px;
  height: 64px;
  border-radius: 9999px;
  object-fit: cover;
  border: 2px solid var(--color-border, #E2E8F0);
}
.profile-header-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.profile-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary, #0F172A);
  letter-spacing: -0.02em;
}
.profile-wx-name {
  font-size: 13px;
  color: var(--color-text-secondary, #475569);
}
.profile-wx-icon {
  display: inline-block;
  padding: 1px 6px;
  border-radius: 3px;
  background: #07c160;
  color: #fff;
  font-size: 10px;
  margin-right: 4px;
}

/* 分节 */
.profile-section {
  background: var(--color-bg-card, #fff);
  border-radius: var(--radius-base, 6px);
  box-shadow: var(--shadow-sm, 0 1px 2px 0 rgba(15,23,42,0.04));
  margin-bottom: var(--spacing-md, 16px);
  overflow: hidden;
}
.profile-section-title {
  display: block;
  padding: 12px 16px 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-secondary, #475569);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.profile-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-top: 1px solid var(--color-border, #E2E8F0);
  cursor: pointer;
  transition: background 150ms;
}
.profile-cell:hover {
  background: var(--color-bg-page, #F8FAFC);
}
.profile-cell-label {
  font-size: 14px;
  color: var(--color-text-primary, #0F172A);
}
.profile-cell-value {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--color-text-secondary, #475569);
}
.profile-cell-arrow {
  font-size: 16px;
  color: var(--color-text-placeholder, #94A3B8);
}

/* 退出 */
.profile-logout {
  margin-top: var(--spacing-xl, 32px);
  text-align: center;
  padding: 14px;
  background: var(--color-bg-card, #fff);
  border-radius: var(--radius-base, 6px);
  box-shadow: var(--shadow-sm, 0 1px 2px 0 rgba(15,23,42,0.04));
  cursor: pointer;
  transition: background 150ms;
}
.profile-logout:hover {
  background: var(--color-bg-page, #F8FAFC);
}
.profile-logout-text {
  color: var(--color-danger, #EF4444);
  font-size: 15px;
  font-weight: 500;
}

/* 编辑弹窗 */
.edit-popup {
  background: var(--color-bg-card, #fff);
  border-radius: var(--radius-lg, 8px);
  padding: 24px;
  width: 80vw;
  max-width: 360px;
}
.edit-popup-title {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary, #0F172A);
  margin-bottom: 16px;
}
.edit-popup-input {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--color-border, #E2E8F0);
  border-radius: var(--radius-sm, 4px);
  font-size: 14px;
  box-sizing: border-box;
}
.edit-popup-btns {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}
.edit-popup-cancel,
.edit-popup-confirm {
  flex: 1;
  height: 38px;
  border-radius: var(--radius-sm, 4px);
  font-size: 14px;
  font-weight: 500;
  border: none;
}
.edit-popup-cancel {
  background: var(--color-bg-page, #F8FAFC);
  color: var(--color-text-secondary, #475569);
}
.edit-popup-confirm {
  background: var(--color-primary, #0F172A);
  color: #fff;
}
</style>
