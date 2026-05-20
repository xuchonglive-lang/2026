<template>
  <view class="page-container industrial-grid pb-32">
    <cu-custom bgColor="bg-gradual-blue" :isCustom="true">
      <block slot="backText"></block>
      <block slot="content">个人中心</block>
    </cu-custom>

    <view class="main-content">
      <!-- Profile Section -->
      <view class="profile-card" @click="handleProfileClick">
        <view class="profile-avatar-wrap">
          <image class="profile-avatar" :src="avatarUrl" mode="aspectFill" @error="onAvatarError" />
          <view class="verified-badge">
            <text class="verified-icon">✓</text>
          </view>
        </view>

        <view class="profile-info">
          <view class="profile-top-row">
            <text class="profile-name">{{ userInfo.real_name || userInfo.nickname || '未验证终端' }}</text>
            <view class="status-chip">
              <text class="status-text">{{ userInfo.audit_status === 3 ? '已审核' : '待处理' }}</text>
            </view>
          </view>
          <text class="profile-dept">{{ userInfo.department_name || '未分配挂靠点' }}</text>
        </view>
      </view>

      <!-- Feedback Stats Quick Look -->
      <view class="feedback-stats">
        <view class="stat-item" @tap="navToTodo">
          <text class="stat-number">{{ statData.pointCount || 0 }}</text>
          <view class="stat-desc">
            <text class="stat-label">重点点位\n反馈</text>
          </view>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item" @tap="navToProjectTodo">
          <text class="stat-number">{{ statData.projectCount || 0 }}</text>
          <view class="stat-desc">
            <text class="stat-label">重点项目\n反馈</text>
          </view>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item" @tap="navToPlanTodo">
          <text class="stat-number">{{ statData.planCount || 0 }}</text>
          <view class="stat-desc">
            <text class="stat-label">日计划\n反馈</text>
          </view>
        </view>
      </view>

      <!-- Action Items List -->
      <view class="action-list">
        <view class="action-item" @click="openRecordPopup('point')">
          <view class="action-icon-wrap action-icon-primary">
            <text class="action-icon-text">📝</text>
          </view>
          <view class="action-text-wrap">
            <text class="action-title">现场反馈信息</text>
            <text class="action-subtitle">Real-time Field Feedback</text>
          </view>
          <text class="action-arrow">›</text>
        </view>

        <view class="action-item" @click="openRecordPopup('project')">
          <view class="action-icon-wrap action-icon-secondary">
            <text class="action-icon-text">🏗</text>
          </view>
          <view class="action-text-wrap">
            <text class="action-title">重点工作记录</text>
            <text class="action-subtitle">Key Task Documentation</text>
          </view>
          <text class="action-arrow">›</text>
        </view>

        <view class="action-item" @click="openRecordPopup('plan')">
          <view class="action-icon-wrap action-icon-tertiary">
            <text class="action-icon-text">📅</text>
          </view>
          <view class="action-text-wrap">
            <text class="action-title">计划执行历史</text>
            <text class="action-subtitle">Execution Performance History</text>
          </view>
          <text class="action-arrow">›</text>
        </view>

        <view class="action-item" @click="openRecordPopup('issue')">
          <view class="action-icon-wrap action-icon-error">
            <text class="action-icon-text">⚠️</text>
          </view>
          <view class="action-text-wrap">
            <text class="action-title">问题报备记录</text>
            <text class="action-subtitle">Incident Reporting Logs</text>
          </view>
          <text class="action-arrow">›</text>
        </view>
      </view>

      <!-- Logout Button -->
      <button class="btn-logout" @click="logout">
        <text class="logout-icon">🔓</text>
        <text class="logout-text">退出登录</text>
      </button>

      <!-- Version -->
      <text class="version-text">CIVILIZED PRODUCTION SYSTEM V2.4.0</text>
    </view>

    <!-- 记录明细弹出层 -->
    <u-popup v-model="showPopup" mode="bottom" border-radius="24" height="80%">
      <view class="popup-container">
        <view class="popup-header">
          <view class="header-title-wrap">
            <view class="blue-indicator"></view>
            <text class="popup-title">{{ popupTitle }}</text>
          </view>
          <u-icon name="close" size="32" color="#191c1e" @click="showPopup = false"></u-icon>
        </view>

        <view class="popup-body">
          <z-paging ref="paging" v-model="currentRecordList" @query="fetchPopupData" :fixed="false" height="100%"
            :auto="false" :use-chat-record-mode="false">
            <!-- 现场反馈记录 (point) -->
            <block v-if="popupType === 'point'">
              <view class="industrial-card glass-card" v-for="(item, index) in currentRecordList" :key="index">
                <view class="card-main">
                  <view class="card-title-row">
                    <view class="title-left">
                      <view class="card-blue-block"></view>
                      <text class="card-name">{{ item.point_info && item.point_info[0] ? item.point_info[0].name :
                        '未知点位' }}</text>
                    </view>
                    <view class="tag-pill tag-blue">已反馈</view>
                  </view>

                  <view class="card-meta-row">
                    <view class="meta-item">
                      <u-icon name="clock" color="#64748b" size="24"></u-icon>
                      <text class="meta-text">{{ vk.pubfn.timeFormat(item.submit_time, 'yyyy-MM-dd hh:mm') }}</text>
                    </view>
                  </view>

                  <view class="card-content-box">
                    <view class="card-desc">
                      <u-parse :html="item.content || '未填写文字描述'"></u-parse>
                    </view>
                  </view>

                  <view class="image-grid" v-if="item.images && item.images.length > 0">
                    <image v-for="(img, imgIdx) in item.images.slice(0, 3)" :key="imgIdx" :src="img.url || img" mode="aspectFill"
                      class="grid-img" @click="vk.pubfn.previewImage(item.images.map(i => i.url || i), imgIdx)"
                      @error="onGridImageError(index, imgIdx)"></image>
                  </view>
                </view>

                <view class="card-footer border-t">
                  <view class="record-actions">
                    <view class="btn-action btn-modify" @click="handleEditRecord(item)">修改内容</view>
                    <view class="btn-action btn-remove" @click="handleDeleteRecord(item, index)">删除记录</view>
                  </view>
                </view>
              </view>
            </block>

            <!-- 重点项目记录 (project) -->
            <block v-if="popupType === 'project'">
              <view class="industrial-card glass-card" v-for="(item, index) in currentRecordList" :key="index">
                <view class="card-main">
                  <view class="card-title-row">
                    <view class="title-left">
                      <view class="card-blue-block"></view>
                      <text class="card-name u-line-1">{{ item.project_info && item.project_info[0] ?
                        item.project_info[0].title : '未知项目' }}</text>
                    </view>
                    <view class="tag-pill tag-blue">过程汇报</view>
                  </view>

                  <view class="card-meta-row">
                    <view class="meta-item">
                      <u-icon name="calendar" color="#64748b" size="24"></u-icon>
                      <text class="meta-text">{{ vk.pubfn.timeFormat(item.create_time, 'yyyy-MM-dd hh:mm') }}</text>
                    </view>
                  </view>

                  <view class="card-content-box">
                    <view class="content-label">【进展描述】</view>
                    <view class="card-desc">
                      <u-parse :html="item.desc_content"></u-parse>
                    </view>
                  </view>

                  <view class="image-grid" v-if="item.images && item.images.length > 0">
                    <image v-for="(img, imgIdx) in item.images.slice(0, 3)" :key="imgIdx" :src="img.url || img" mode="aspectFill"
                      class="grid-img" @click="vk.pubfn.previewImage(item.images.map(i => i.url || i), imgIdx)"
                      @error="onGridImageError(index, imgIdx)"></image>
                  </view>
                </view>

                <view class="card-footer border-t">
                  <view class="record-actions">
                    <view class="btn-action btn-modify" @click="handleEditRecord(item)">编辑进展</view>
                    <view class="btn-action btn-remove" @click="handleDeleteRecord(item, index)">撤回汇报</view>
                  </view>
                </view>
              </view>
            </block>

            <!-- 日计划历史 (plan) -->
            <block v-if="popupType === 'plan'">
              <view class="industrial-card glass-card" v-for="(item, index) in currentRecordList" :key="index">
                <view class="card-main">
                  <view class="card-title-row">
                    <view class="title-left">
                      <view class="card-blue-block"></view>
                      <text class="card-name u-line-1">{{ item.plan_title }}</text>
                    </view>
                    <view class="tag-pill tag-green">已执行</view>
                  </view>

                  <view class="card-meta-row">
                    <view class="meta-item">
                      <u-icon name="calendar-fill" color="#64748b" size="24"></u-icon>
                      <text class="meta-text">{{ vk.pubfn.timeFormat(item.create_time, 'yyyy-MM-dd hh:mm') }}</text>
                    </view>
                  </view>

                  <view class="card-content-box">
                    <view class="content-label">【执行证明】</view>
                    <view class="card-desc">
                      <u-parse :html="item.content"></u-parse>
                    </view>
                  </view>

                  <view class="image-grid" v-if="item.images && item.images.length > 0">
                    <image v-for="(img, imgIdx) in item.images.slice(0, 3)" :key="imgIdx" :src="img.url || img" mode="aspectFill"
                      class="grid-img" @click="vk.pubfn.previewImage(item.images.map(i => i.url || i), imgIdx)"
                      @error="onGridImageError(index, imgIdx)"></image>
                  </view>
                </view>

                <view class="card-footer border-t">
                  <view class="record-actions">
                    <view class="btn-action btn-modify" @click="handleEditRecord(item)">编辑反馈</view>
                    <view class="btn-action btn-remove" @click="handleDeleteRecord(item, index)">删除反馈</view>
                  </view>
                </view>
              </view>
            </block>

            <!-- 问题报备记录 (issue) -->
            <block v-if="popupType === 'issue'">
              <view class="industrial-card glass-card faded-bg" v-for="(item, index) in currentRecordList" :key="index">
                <view class="card-main">
                  <view class="card-title-row">
                    <view class="title-left">
                      <view class="card-blue-block"></view>
                      <text class="card-name u-line-1">{{ item.title }}</text>
                    </view>
                    <u-tag :text="item.status === 0 ? '待处理' : (item.status === 1 ? '处理中' : '已跟进')"
                      :type="item.status === 0 ? 'warning' : 'success'" mode="light" size="mini" />
                  </view>

                  <view class="letter-meta-grid">
                    <view class="meta-item-inline">
                      <text class="m-value">{{ vk.pubfn.timeFormat(item.create_time, 'yyyy-MM-dd hh:mm') }}</text>
                    </view>
                    <view class="meta-item-inline">
                      <text class="m-label">隐患等级：</text>
                      <text class="m-value font-bold" :class="item.urgency === 1 ? 'text-danger' : 'text-primary'">
                        {{ item.urgency === 1 ? '🚨 紧急隐患' : '📌 常规报备' }}
                      </text>
                    </view>
                    <view class="meta-item-inline" v-if="item.area_info && item.area_info.length > 0">
                      <text class="m-label">涉及区域：</text>
                      <text class="m-value">{{ item.area_info[0].name }} / {{ item.point_info[0].name }}</text>
                    </view>
                    <view class="meta-item-inline" v-if="item.handle_dept_name">
                      <text class="m-label">责任单位：</text>
                      <text class="m-value">{{ item.handle_dept_name }}</text>
                    </view>
                  </view>

                  <view class="card-content-box mt-3">
                    <view class="content-label">【报备描述】</view>
                    <view class="card-desc">
                      <u-parse :html="item.content"></u-parse>
                    </view>
                  </view>

                  <view class="image-grid" v-if="item.images && item.images.length > 0">
                    <image v-for="(img, imgIdx) in item.images.slice(0, 3)" :key="imgIdx" :src="img.url || img" mode="aspectFill"
                      class="grid-img" @click="vk.pubfn.previewImage(item.images.map(i => i.url || i), imgIdx)"
                      @error="onGridImageError(index, imgIdx)"></image>
                  </view>
                </view>

                <view class="card-footer border-t">
                  <view class="record-actions">
                    <view class="btn-action btn-modify" @click="handleEditRecord(item)">修改详情</view>
                    <view class="btn-action btn-remove" @click="handleDeleteRecord(item, index)">撤销报备</view>
                  </view>
                </view>
              </view>
            </block>
          </z-paging>
        </view>
      </view>
    </u-popup>

    <u-modal v-model="showConfirmModal" :content="confirmContent" :show-cancel-button="true" @confirm="onConfirmManage"
      confirm-color="#ba1a1a"></u-modal>

    <my-tab-bar :current="4"></my-tab-bar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      statData: {
        pointCount: 0,
        projectCount: 0,
        planCount: 0
      },
      showPopup: false,
      popupTitle: '',
      popupType: '',
      currentRecordList: [],

      showConfirmModal: false,
      confirmContent: '',
      manageItem: null,
      manageIndex: -1,
      manageAction: '',
      defaultAvatar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgMTIwIj4KICA8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2YxZjVmOSIvPgogIDxjaXJjbGUgY3g9IjYwIiBjeT0iNDgiIHI9IjI0IiBmaWxsPSIjY2JkNWUxIi8+CiAgPHBhdGggZD0iTTYwIDgwYy0yNSAwLTQwIDE1LTQwIDI0aDgwYzAtOS0xNS0yNC00MC0yNHoiIGZpbGw9IiNjYmQ1ZTEiLz4KPC9zdmc+',
    }
  },
  computed: {
    avatarUrl() {
      const avatar = this.userInfo.avatar;
      if (!avatar) return this.defaultAvatar;
      if (typeof avatar === 'string') return avatar;
      return avatar.url || this.defaultAvatar;
    }
  },
  onLoad() {
    this.vk.pubfn.checkLogin();
  },
  onShow() {
    this.vk.pubfn.checkLogin();
    this.userInfo = this.vk.getVuex('$user.userInfo') || {};
    this.refreshUserInfo();
    this.fetchStatData();
    // 如果记录弹窗已开启，则刷新列表
    if (this.showPopup && this.$refs.paging) {
      this.$refs.paging.reload();
    }
  },
  onPullDownRefresh() {
    this.refreshUserInfo();
    this.fetchStatData();
  },
  methods: {
    async refreshUserInfo() {
      try {
        let res = await uni.vk.callFunction({
          url: 'client/user/kh/getMineProfile'
        });
        uni.stopPullDownRefresh();
        if (res.code === 0 && res.userInfo) {
          this.vk.setVuex('$user.userInfo', res.userInfo);
          this.userInfo = res.userInfo;
        }
      } catch (e) {
        uni.stopPullDownRefresh();
      }
    },
    async fetchStatData() {
      try {
        let res = await uni.vk.callFunction({
          url: 'client/feedback/kh/getTodoCount',
          data: {}
        });
        if (res.code === 0) {
          this.statData.pointCount = res.feedbackCount || 0;
          this.statData.projectCount = res.projectCount || 0;
          this.statData.planCount = res.planCount || 0;
        }
      } catch (err) { }
    },
    navToTodo() { vk.switchTab({ url: '/pages/feedback/todo-list/index' }); },
    navToProjectTodo() {
      uni.setStorageSync('projectListFilter', 'needMyFeedback');
      vk.switchTab({ url: '/pages/keywork/project/list/index' });
    },
    navToPlanTodo() {
      uni.setStorageSync('planListFilter', 'needMyExecute');
      vk.switchTab({ url: '/pages/plan/list' });
    },

    openRecordPopup(type) {
      this.popupType = type;
      this.currentRecordList = [];

      const titles = {
        'point': '现场反馈历史明细',
        'project': '重点项目过程汇报历史',
        'plan': '日计划执行证明历史',
        'issue': '我提交的问题报备'
      };
      this.popupTitle = titles[type] || '记录明细';
      this.showPopup = true;
      this.$nextTick(() => {
        if (this.$refs.paging) {
          this.$refs.paging.reload();
        }
      });
    },

    async fetchPopupData(pageNo, pageSize) {
      try {
        let res = await uni.vk.callFunction({
          url: 'client/user/kh/getMyRecords',
          data: {
            type: this.popupType,
            pageIndex: pageNo,
            pageSize: pageSize
          }
        });
        if (res.code === 0) {
          this.$refs.paging.complete(res.rows || []);
        } else {
          this.$refs.paging.complete(false);
        }
      } catch (err) {
        console.error(err);
        this.$refs.paging.complete(false);
      }
    },


    checkTimeLimit(item) {
      let time = item.create_time || item.submit_time || item.time;
      let now = Date.now();
      if (now - time > 24 * 60 * 60 * 1000) {
        uni.showModal({
          title: '操作受限',
          content: '出于合规性考虑，超过24小时的执行记录已归档锁定，不可再进行修改或撤销。',
          showCancel: false,
          confirmText: '我知道了'
        });
        return false;
      }
      return true;
    },

    handleEditRecord(item) {
      if (!this.checkTimeLimit(item)) return;

      let url = '';
      if (this.popupType === 'point') {
        url = `/pages/feedback/submit/index?id=${item._id}&isEdit=1`;
      } else if (this.popupType === 'project') {
        url = `/pages/keywork/project/apply-finish/index?id=${item.project_id || item.project_info[0]._id}&recordId=${item._id}&isEdit=1&mode=feedback`;
      } else if (this.popupType === 'plan') {
        url = `/pages/plan/feedback?id=${item._id}&recordId=${item.time || item.create_time}&isEdit=1`;
      } else if (this.popupType === 'issue') {
        url = `/pages/report/submit-entry/index?id=${item._id}&isEdit=1`;
      }

      if (url) vk.navigateTo({ url });
    },

    handleDeleteRecord(item, index) {
      if (!this.checkTimeLimit(item)) return;

      this.manageItem = item;
      this.manageIndex = index;
      this.manageAction = 'delete';
      this.confirmContent = '确定要撤销并删除该条记录吗？操作后数据将不可恢复。';
      this.showConfirmModal = true;
    },

    async onConfirmManage() {
      if (this.manageAction === 'delete') {
        try {
          uni.showLoading({ title: '处理中...' });
          let res = await uni.vk.callFunction({
            url: 'client/user/kh/manageMyRecord',
            data: {
              action: 'delete',
              type: this.popupType,
              id: this.manageItem._id,
              timeKey: this.popupType === 'plan' ? this.manageItem.create_time : null
            }
          });
          uni.hideLoading();
          if (res.code === 0) {
            this.currentRecordList.splice(this.manageIndex, 1);
            uni.showToast({ title: '已成功撤销' });
          } else {
            uni.showToast({ title: res.msg || '操作失败', icon: 'none' });
          }
        } catch (e) {
          uni.hideLoading();
          uni.showToast({ title: '网络异常', icon: 'none' });
        }
      }
    },

    async logout() {
      try {
        uni.showLoading({ title: '正在退出...' });
        // 清理缓存并登出
        this.vk.setVuex('$user.userInfo', {});
        uni.removeStorageSync('uni_id_token');
        uni.removeStorageSync('uni_id_token_expired');
        vk.reLaunch({ url: '/pages/index/index' });
      } catch (e) { }
      uni.hideLoading();
    },
    handleProfileClick() {
      if (this.userInfo.audit_status !== 3) {
        uni.navigateTo({
          url: '/pages/user/register/index'
        });
      }
    },
    onAvatarError() {
      this.userInfo.avatar = this.defaultAvatar;
    },
    onGridImageError(recordIndex, imgIndex) {
      const item = this.currentRecordList[recordIndex];
      if (item && item.images && item.images[imgIndex]) {
        if (typeof item.images[imgIndex] === 'string') {
          this.$set(item.images, imgIndex, this.defaultAvatar);
        } else {
          this.$set(item.images[imgIndex], 'url', this.defaultAvatar);
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* ====================================================================
   MINE PAGE — Industrial Clarity / Precision Lens 1:1
   ==================================================================== */
.page-container {
  min-height: 100vh;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
  color: #191c1e;
}

.industrial-grid {
  background-image: radial-gradient(rgba(0, 80, 203, 0.05) 1px, transparent 1px);
  background-size: 40rpx 40rpx;
}

.pb-32 {
  padding-bottom: 256rpx;
}


/* Main Content */
.main-content {
  padding: 48rpx 32rpx 64rpx;
  max-width: 750rpx;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Profile Card */
.profile-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08);
  border-radius: 24rpx;
  padding: 40rpx;
  margin-bottom: 24rpx;
  display: flex;
  align-items: center;
}

.profile-avatar-wrap {
  position: relative;
  margin-right: 32rpx;
  flex-shrink: 0;
}

.profile-avatar {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.5);
  background: #eceef0;
}

.verified-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background-color: #9bb4fe;
  border: 4rpx solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.verified-icon {
  font-size: 20rpx;
  color: #294487;
  font-weight: 700;
}

.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.profile-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.profile-name {
  font-family: 'Manrope', sans-serif;
  font-size: 42rpx;
  font-weight: 700;
  color: #191c1e;
  letter-spacing: -0.01em;
}

.status-chip {
  background-color: rgba(155, 180, 254, 0.5);
  border-radius: 24rpx;
  padding: 4rpx 16rpx;
  flex-shrink: 0;
}

.status-text {
  font-family: 'Inter', sans-serif;
  font-size: 20rpx;
  font-weight: 700;
  color: #294487;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.profile-dept {
  font-family: 'Inter', sans-serif;
  font-size: 28rpx;
  color: #424656;
  margin-top: 8rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Feedback Stats */
.feedback-stats {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08);
  border-radius: 24rpx;
  padding: 32rpx 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.stat-number {
  font-size: 56rpx;
  font-weight: 900;
  color: #0050cb;
  line-height: 1;
  letter-spacing: -2rpx;
  font-family: 'Manrope', sans-serif;
}

.stat-desc {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12rpx;
}

.stat-label {
  font-size: 22rpx;
  font-weight: bold;
  color: #191c1e;
  text-align: center;
  line-height: 1.3;
}

.stat-divider {
  width: 2rpx;
  height: 64rpx;
  background: rgba(194, 198, 216, 0.4);
}

/* Action List */
.action-list {
  display: flex;
  flex-direction: column;
}

.action-item {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08);
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  display: flex;
  align-items: center;
  transition: all 300ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.action-item:active {
  transform: scale(0.96);
}

.action-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 32rpx;
  flex-shrink: 0;
}

.action-icon-primary {
  background-color: rgba(0, 80, 203, 0.1);
}

.action-icon-secondary {
  background-color: rgba(155, 180, 254, 0.2);
}

.action-icon-tertiary {
  background-color: rgba(204, 66, 4, 0.1);
}

.action-icon-error {
  background-color: rgba(186, 26, 26, 0.1);
}

.action-icon-text {
  font-size: 36rpx;
}

.action-text-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.action-title {
  font-family: 'Inter', sans-serif;
  font-size: 28rpx;
  font-weight: 600;
  color: #191c1e;
}

.action-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 20rpx;
  color: #424656;
  margin-top: 4rpx;
}

.action-arrow {
  font-size: 40rpx;
  color: #727687;
  flex-shrink: 0;
}

/* Logout */
.btn-logout {
  margin-top: 80rpx;
  width: 100%;
  background: rgba(242, 244, 246, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24rpx;
  padding: 32rpx 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 32rpx rgba(186, 26, 26, 0.1);
  transition: all 300ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.btn-logout:active {
  transform: scale(0.96);
}

.logout-icon {
  font-size: 36rpx;
  margin-right: 12rpx;
}

.logout-text {
  font-family: 'Manrope', sans-serif;
  font-size: 30rpx;
  font-weight: 700;
  color: #ba1a1a;
  letter-spacing: 0.05em;
}

/* Version */
.version-text {
  display: block;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 20rpx;
  color: #727687;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-top: 64rpx;
  padding-bottom: 32rpx;
}

/* ====================================================================
   POPUP & RECORD LIST STYLES
   ==================================================================== */
.popup-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f7f9fb;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx 40rpx;
  background: #ffffff;
  border-bottom: 1px solid #eceef0;
}

.header-title-wrap {
  display: flex;
  align-items: center;
}

.blue-indicator {
  width: 12rpx;
  height: 36rpx;
  background: #0050cb;
  border-radius: 4rpx;
  margin-right: 20rpx;
}

.popup-title {
  font-size: 34rpx;
  font-weight: 800;
  color: #0f172a;
  font-family: 'Manrope', sans-serif;
}

.popup-body {
  flex: 1;
  padding: 32rpx;
  height: 0;
  overflow: hidden;
}

/* Industrial Record Card Style */
.industrial-card {
  background: #ffffff;
  border-radius: 24rpx;
  margin-bottom: 32rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0, 80, 203, 0.04);
  border: 1px solid rgba(0, 80, 203, 0.03);
  transition: all 0.3s ease;
}

.glass-card {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow:
    0 4rpx 16rpx -4rpx rgba(0, 80, 203, 0.08),
    0 16rpx 48rpx -8rpx rgba(0, 80, 203, 0.15);
}

.faded-bg {
  background-image: repeating-linear-gradient(transparent, transparent 62rpx, rgba(0, 80, 203, 0.01) 62rpx, rgba(0, 80, 203, 0.01) 64rpx);
}

.card-main {
  padding: 32rpx;
}

.card-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16rpx;
}

.title-left {
  display: flex;
  align-items: flex-start;
  flex: 1;
  margin-right: 20rpx;
  overflow: hidden;
}

.card-blue-block {
  width: 8rpx;
  height: 32rpx;
  background: #0050cb;
  border-radius: 4rpx;
  margin-right: 16rpx;
  margin-top: 6rpx;
  flex-shrink: 0;
}

.card-name {
  font-size: 32rpx;
  font-weight: 800;
  color: #1e293b;
  line-height: 1.4;
}

.tag-pill {
  padding: 4rpx 16rpx;
  border-radius: 8rpx;
  font-size: 20rpx;
  font-weight: 700;
  flex-shrink: 0;
}

.tag-blue {
  background: #eff6ff;
  color: #0066ff;
}

.tag-green {
  background: #f0fdf4;
  color: #16a34a;
}

.card-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24rpx;
  margin-bottom: 20rpx;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.meta-text {
  font-size: 24rpx;
  color: #64748b;
  font-weight: 500;
}

.card-content-box {
  background: #f8fafc;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.content-label {
  font-size: 24rpx;
  font-weight: 800;
  color: #475569;
  margin-bottom: 8rpx;
}

.card-desc {
  font-size: 28rpx;
  color: #334155;
  line-height: 1.6;
  display: block;
}

.image-grid {
  display: flex;
  gap: 16rpx;
  margin-top: 16rpx;
}

.grid-img {
  width: 140rpx;
  height: 140rpx;
  border-radius: 12rpx;
  background: #f1f5f9;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* Issue Meta Grid */
.letter-meta-grid {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12rpx;
  overflow: hidden;
  margin-bottom: 16rpx;
}

.meta-item-inline {
  display: flex;
  padding: 12rpx 16rpx;
  border-bottom: 1px solid #f1f5f9;
  font-size: 24rpx;
}

.meta-item-inline:last-child {
  border-bottom: none;
}

.m-label {
  color: #64748b;
  width: 140rpx;
  flex-shrink: 0;
}

.m-value {
  color: #1e293b;
  font-weight: 600;
  flex: 1;
}

.text-danger {
  color: #dc2626;
}

.text-primary {
  color: #0050cb;
}

.font-bold {
  font-weight: 700;
}

.card-footer {
  padding: 24rpx 32rpx;
  background: rgba(255, 255, 255, 0.5);
}

.border-t {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.record-actions {
  display: flex;
  justify-content: flex-end;
  gap: 24rpx;
}

.btn-action {
  padding: 12rpx 32rpx;
  border-radius: 12rpx;
  font-size: 24rpx;
  font-weight: 700;
  transition: all 0.2s ease;
}

.btn-modify {
  background: #eff6ff;
  color: #0050cb;
  border: 1px solid rgba(0, 80, 203, 0.1);
}

.btn-modify:active {
  background: #dbeafe;
}

.btn-remove {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid rgba(220, 38, 38, 0.1);
}

.btn-remove:active {
  background: #fee2e2;
}

/* uniapp button reset */
button::after {
  border: none;
}
</style>
