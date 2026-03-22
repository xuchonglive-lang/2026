<template>
  <view
    v-if="showModal"
    class="dept-bind-overlay"
  >
    <view class="dept-bind-modal" :class="{ 'is-pc': isPc }">
      <!-- 标题 -->
      <view class="dept-bind-header">
        <text class="dept-bind-title">完善个人信息</text>
        <text class="dept-bind-subtitle">您的账号还未归属部门，请填写以下信息后提交申请</text>
      </view>

      <!-- 等待审核状态 -->
      <view v-if="pendingApplication" class="dept-bind-pending">
        <i class="el-icon-time" style="font-size: 48px; color: var(--color-warning);"></i>
        <text class="dept-bind-pending-text">您的入驻申请已提交，请等待管理员审核</text>
        <text class="dept-bind-pending-dept">申请部门：{{ pendingApplication._target_dept_name || pendingApplication.target_dept_id }}</text>
        <text class="dept-bind-pending-time">提交时间：{{ formatTime(pendingApplication.created_at) }}</text>
      </view>

      <!-- 申请表单 -->
      <view v-else class="dept-bind-form">
        <view class="form-item">
          <text class="form-label">真实姓名 <text class="form-required">*</text></text>
          <input
            class="form-input"
            v-model="formData.real_name"
            placeholder="请输入您的真实姓名"
            maxlength="20"
          />
        </view>

        <view class="form-item">
          <text class="form-label">所属部室/车间 <text class="form-required">*</text></text>
          <picker
            class="form-picker"
            :range="deptList"
            range-key="name"
            @change="onDeptChange"
          >
            <view class="form-picker-value" :class="{ 'is-placeholder': !selectedDeptName }">
              {{ selectedDeptName || '请选择所属部室/车间' }}
            </view>
          </picker>
        </view>

        <button
          class="dept-bind-submit"
          :loading="submitting"
          :disabled="submitting"
          @click="submitApplication"
        >
          提交申请
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'DeptBindModal',
  data() {
    return {
      showModal: false,
      isPc: true,
      deptList: [],
      formData: {
        real_name: '',
        target_dept_id: ''
      },
      selectedDeptName: '',
      submitting: false,
      pendingApplication: null
    }
  },
  mounted() {
    // #ifdef H5
    this.isPc = window.innerWidth >= 768
    // #endif
    // #ifndef H5
    this.isPc = false
    // #endif
    this.checkUserStatus()
  },
  methods: {
    async checkUserStatus() {
      let userInfo = this.vk.getVuex('$user.userInfo')
      if (!userInfo || !userInfo._id) return
      // 已归属部门的用户不显示弹窗
      if (userInfo.tenant_id) {
        this.showModal = false
        return
      }
      // 裸号用户：检查是否已有待审批的申请
      let res = await this.vk.callFunction({
        url: 'user/kh/getMyApplication',
        data: {}
      })
      if (res.code === 0 && res.data && res.data.status === 0) {
        this.pendingApplication = res.data
      }
      // 加载部门列表
      await this.loadDeptList()
      this.showModal = true
    },
    async loadDeptList() {
      let res = await this.vk.callFunction({
        url: 'client/dept/pub/getList',
        data: {}
      })
      if (res.code === 0 && res.rows) {
        this.deptList = res.rows.filter(d => d.dept_level > 0 && d.status === 1)
      }
    },
    onDeptChange(e) {
      let index = e.detail ? e.detail.value : e.target.value
      if (this.deptList[index]) {
        this.formData.target_dept_id = this.deptList[index]._id
        this.selectedDeptName = this.deptList[index].name
      }
    },
    async submitApplication() {
      if (!this.formData.real_name || !this.formData.real_name.trim()) {
        return this.vk.toast('请填写真实姓名')
      }
      if (!this.formData.target_dept_id) {
        return this.vk.toast('请选择所属部室/车间')
      }
      this.submitting = true
      try {
        let res = await this.vk.callFunction({
          url: 'user/kh/applyDept',
          data: {
            real_name: this.formData.real_name.trim(),
            target_dept_id: this.formData.target_dept_id
          }
        })
        if (res.code === 0) {
          this.vk.toast(res.msg, 'success')
          // 切换到等待审核状态
          this.pendingApplication = {
            target_dept_id: this.formData.target_dept_id,
            _target_dept_name: this.selectedDeptName,
            created_at: Date.now()
          }
        }
      } catch (e) {
        // vk 框架已自动处理错误
      } finally {
        this.submitting = false
      }
    },
    formatTime(ts) {
      if (!ts) return ''
      return this.vk.pubfn.timeFormat(ts, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>

<style lang="scss" scoped>
.dept-bind-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
}
.dept-bind-modal {
  background: var(--color-bg-card, #fff);
  border-radius: var(--radius-lg, 8px);
  box-shadow: var(--shadow-lg, 0 20px 25px -5px rgba(0,0,0,0.1));
  padding: 32px;
  width: 90vw;
  max-width: 420px;
  animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.dept-bind-modal.is-pc {
  padding: 40px;
}
.dept-bind-header {
  text-align: center;
  margin-bottom: 28px;
}
.dept-bind-title {
  display: block;
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-primary, #0F172A);
  letter-spacing: -0.02em;
}
.dept-bind-subtitle {
  display: block;
  font-size: 13px;
  color: var(--color-text-secondary, #475569);
  margin-top: 8px;
  line-height: 1.5;
}
.dept-bind-pending {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px 0;
}
.dept-bind-pending-text {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-primary);
}
.dept-bind-pending-dept,
.dept-bind-pending-time {
  font-size: 13px;
  color: var(--color-text-secondary);
}
.form-item {
  margin-bottom: 20px;
}
.form-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 6px;
}
.form-required {
  color: var(--color-danger, #EF4444);
}
.form-input {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--color-border, #E2E8F0);
  border-radius: var(--radius-sm, 4px);
  font-size: 14px;
  color: var(--color-text-primary);
  background: #fff;
  transition: border-color 150ms;
  box-sizing: border-box;
}
.form-input:focus {
  border-color: var(--color-primary, #0F172A);
  outline: none;
}
.form-picker {
  width: 100%;
}
.form-picker-value {
  height: 40px;
  line-height: 40px;
  padding: 0 12px;
  border: 1px solid var(--color-border, #E2E8F0);
  border-radius: var(--radius-sm, 4px);
  font-size: 14px;
  color: var(--color-text-primary);
  background: #fff;
  cursor: pointer;
}
.form-picker-value.is-placeholder {
  color: var(--color-text-placeholder, #94A3B8);
}
.dept-bind-submit {
  width: 100%;
  height: 44px;
  margin-top: 8px;
  border: none;
  border-radius: var(--radius-sm, 4px);
  background: var(--color-primary, #0F172A);
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 150ms;
}
.dept-bind-submit:hover {
  opacity: 0.9;
  transform: scale(0.98);
}
.dept-bind-submit[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(16px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
