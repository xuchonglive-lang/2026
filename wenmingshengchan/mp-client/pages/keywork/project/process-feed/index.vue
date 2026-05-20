<template>
  <view class="page-container industrial-bg industrial-grid">
    <cu-custom bgColor="bg-gradual-blue" :isCustom="true">
      <block slot="backText"></block>
      <block slot="content">进度反馈</block>
    </cu-custom>


    <view class="main-content" v-if="projectInfo">

      <!-- Section 1: 项目推进标准 -->
      <view class="section">
        <view class="list-header">
          <view class="action sub-title">
            <text class="text-lg text-bold text-black">项目推进标准</text>
            <text class="bg-blue"></text>
          </view>
        </view>
        <view class="glass-card standard-card">
          <view class="title-wrap-ui4">
            <view class="title-row">
              <view class="title-left">
                <view class="blue-block"></view>
                <text class="item-title u-line-2">标题：{{ projectInfo.title }}</text>
              </view>
              <view class="right-tag-wrap">
                <u-tag :text="projectInfo._statusName" :type="projectInfo._tagType" mode="light" shape="circle"
                  size="mini" class="status-u-tag" />
              </view>
            </view>
            <view class="location-group" style="margin-top: 20rpx; display: flex; align-items: center; gap: 8rpx;">
              <u-icon name="map-fill" color="#0050cb" size="32"></u-icon>
              <text style="font-size: 24rpx; font-weight: 800; color: #4b5563;">涉及区域：</text>
              <text style="font-size: 24rpx; font-weight: 700; color: #1f2937;">
                {{ (projectInfo.area_info && projectInfo.area_info[0] && projectInfo.area_info[0].name) ? projectInfo.area_info[0].name : '全部区域' }} - {{ (projectInfo.point_info && projectInfo.point_info[0] && projectInfo.point_info[0].name) ? projectInfo.point_info[0].name : '全部点位' }}
              </text>
            </view>
          </view>

          <view class="standard-desc">
            <u-parse v-if="projectInfo.standard_desc" :html="projectInfo.standard_desc"></u-parse>
            <text v-else>暂无详细标准说明</text>
          </view>

          <view class="roles-grid-ui4">
            <!-- 执行人区域 -->
            <view class="role-col-ui4">
              <text class="role-label-ui4">执行人：</text>
              <view class="role-value-row-ui4">
                <view class="avatar-stack" v-if="projectInfo.assignee_info && projectInfo.assignee_info.length > 0">
                  <image class="stack-avatar" v-for="(user, idx) in projectInfo.assignee_info.slice(0, 3)" :key="idx"
                    :src="user.avatar || 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/41235688-6615-4672-88f5-46f041ff3dbb.png'"
                    mode="aspectFill" @error="onAssigneeAvatarError(idx)"></image>
                  <view class="stack-more" v-if="projectInfo.assignee_info.length > 3">
                    +{{ projectInfo.assignee_info.length - 3 }}
                  </view>
                </view>
                <view v-else class="default-avatar-ui4"></view>
                <text class="role-text-ui4 assignee-names-truncate"
                  :class="{ 'bold-text': projectInfo.assignee_info && projectInfo.assignee_info.length > 0 }">{{
                    getAssigneeNames(projectInfo.assignee_info) }}</text>
              </view>
            </view>

            <!-- 验收人区域 -->
            <view class="role-col-ui4">
              <text class="role-label-ui4">验收人：</text>
              <view class="role-value-row-ui4">
                <image
                  v-if="projectInfo.create_user_info && (Array.isArray(projectInfo.create_user_info) ? projectInfo.create_user_info[0] : projectInfo.create_user_info).avatar"
                  class="single-avatar-ui4" :src="getVerifierAvatar(projectInfo.create_user_info)" mode="aspectFill"
                  @error="onVerifierAvatarError">
                </image>
                <view v-else class="default-avatar-ui4"></view>
                <text class="role-text-ui4" style="font-weight: 700; color: #111;">{{
                  getVerifierName(projectInfo.create_user_info) }}</text>
              </view>
            </view>
          </view>

          <view class="progress-section">
            <view class="progress-meta">
              <text class="deadline-label" style="font-size: 24rpx;">完成时限：{{ projectInfo.deadline ?
                vk.pubfn.timeFormat(projectInfo.deadline, 'yyyy.MM.dd') : '无限制' }}</text>
              <view class="progress-stat">
                <text class="progress-label-text" style="font-size: 24rpx;">反馈次数：</text>
                <text class="progress-percent" style="font-size: 32rpx;">{{ projectInfo.process_list ?
                  projectInfo.process_list.length : 0 }}次</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- Section 2: 项目推进过程反馈 -->
      <view class="section">
        <view class="list-header">
          <view class="action sub-title">
            <text class="text-lg text-bold text-black">项目推进过程反馈</text>
            <text class="bg-blue"></text>
          </view>
        </view>
        <view class="timeline-container">
          <view class="timeline-track"></view>

          <view v-if="projectInfo.process_list && projectInfo.process_list.length === 0"
            style="padding:40rpx; text-align:center; color:#999; font-size:24rpx;">
            暂无流转反馈记录
          </view>

          <view class="timeline-item" v-for="(item, index) in projectInfo.process_list" :key="item._id">
            <view class="timeline-dot" :class="index === 0 ? 'active' : 'inactive'"></view>
            <view class="glass-card feedback-card">
              <view class="feedback-header">
                <view class="user-info">
                  <image class="avatar-sm" :src="item._avatar" @error="onProcessAvatarError(index)"></image>
                  <text class="username">{{ item._username }}</text>
                  <text class="type-badge" :class="item._badgeClass">{{ item._processTypeName }}</text>
                </view>
                <text class="time-stamp">{{ vk.pubfn.timeFormat(item.create_time, 'MM-dd hh:mm') }}</text>
              </view>
              <view :class="item.type === 2 ? 'feedback-content-box' : 'feedback-content-default'">
                <view class="feedback-text">
                  <u-parse v-if="item.desc_content" :html="item.desc_content"></u-parse>
                </view>
                <view class="feedback-images" v-if="item.attachment_imgs && item.attachment_imgs.length > 0">
                  <image v-for="(img, i) in item.attachment_imgs" :key="i" class="feedback-img" :src="img"
                    mode="aspectFill" @click="vk.pubfn.previewImage({ current: i, urls: item.attachment_imgs })"
                    @error="onAttachmentError(index, i)">
                  </image>
                </view>
              </view>

              <!-- Threaded Replies (Comment-Reply Structure) -->
              <view class="thread-replies" v-if="item._replies && item._replies.length > 0">
                <view class="thread-reply-item" v-for="reply in item._replies" :key="reply._id">
                  <!-- Industrial Connector Elbow -->
                  <view class="reply-connector">
                    <view class="connector-elbow"></view>
                  </view>

                  <!-- Reply Content Block -->
                  <view class="reply-content" :class="{ 'rejection-reply': reply.type === 3 }">
                    <view class="feedback-header reply-header">
                      <view class="user-info">
                        <image class="avatar-sm reply-avatar" :src="reply._avatar"
                          @error="onReplyAvatarError(index, reply._id)"></image>
                        <text class="username reply-username">{{ reply._username }}</text>
                        <text class="type-badge reply-badge" :class="reply._badgeClass">{{ reply._processTypeName
                        }}</text>
                      </view>
                      <text class="time-stamp">{{ vk.pubfn.timeFormat(reply.create_time, 'MM-dd hh:mm') }}</text>
                    </view>
                    <view class="feedback-text reply-text">
                      <u-parse v-if="reply.desc_content" :html="reply.desc_content"></u-parse>
                    </view>
                    <view class="feedback-images" v-if="reply.attachment_imgs && reply.attachment_imgs.length > 0">
                      <image v-for="(img, i) in reply.attachment_imgs" :key="i" class="feedback-img reply-img"
                        :src="img" mode="aspectFill"
                        @click="vk.pubfn.previewImage({ current: i, urls: reply.attachment_imgs })"
                        @error="onReplyAttachmentError(index, reply._id, i)"></image>
                    </view>
                  </view>
                </view>
              </view>

            </view>
          </view>
        </view>
      </view>

      <!-- Section 3: 项目推进验收结论 -->
      <view class="section" v-if="projectInfo.status === 2">
        <view class="list-header">
          <view class="action sub-title">
            <text class="text-lg text-bold text-black">项目推进验收意见</text>
            <text class="bg-blue"></text>
          </view>
        </view>
        <view class="conclusion-gradient-border">
          <view class="conclusion-inner bg-glass">
            <view class="acceptor-header">
              <image class="acceptor-avatar-lg" :src="getVerifierAvatar(projectInfo.create_user_info)" mode="aspectFill"
                @error="onVerifierAvatarError"></image>
              <view class="acceptor-info">
                <text class="conclusion-title font-headline font-bold">最终验收结论·{{
                  getVerifierName(projectInfo.create_user_info) }}</text>
                <text class="status-subtitle font-bold">VERIFIED COMPLETION STATUS</text>
              </view>
            </view>
            <view class="conclusion-box">
              <text class="conclusion-content">{{ projectInfo.audit_remark || '已通过验收并归档。' }}</text>
            </view>
            <view class="conclusion-footer">
              <text class="acceptance-status-tag">验收已通过</text>
              <text class="acceptance-date">验收时间：{{ projectInfo.audit_time ? vk.pubfn.timeFormat(projectInfo.audit_time,
                'yyyy年MM月dd日') : '' }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- FAB Buttons -->
      <view class="fab-bar bg-glass-blur" v-if="(projectInfo.status === 0 || projectInfo.status === 3) && isAssignee">
        <view class="fab-container">
          <view class="fab-btn primary active-press" @click="goToFeedback">
            <u-icon name="edit-pen" color="#fff" size="32"></u-icon>
            <text>过程反馈</text>
          </view>
          <view class="fab-btn error active-press" @click="goToApplyClose">
            <u-icon name="file-text" color="#fff" size="32"></u-icon>
            <text>验收申请反馈</text>
          </view>
        </view>
      </view>
      <u-toast ref="uToast" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      vk: uni.vk,
      projectId: '',
      projectInfo: null
    };
  },
  computed: {
    isAssignee() {
      if (!this.projectInfo || !this.projectInfo.assignee_info || !Array.isArray(this.projectInfo.assignee_info)) return false;
      let uid = this.vk.getVuex('$user.userInfo._id');
      if (!uid) return false;
      return this.projectInfo.assignee_info.some(u => u._id === uid);
    }
  },
  onLoad(options) {
    if (options.id) {
      this.projectId = options.id;
      this.getDetail();
    }
  },
  onShow() {
    if (this.projectId) {
      this.getDetail(); // refresh after returning
    }
  },
  methods: {
    getDetail() {
      this.vk.callFunction({
        url: 'client/keywork/kh/getProjectDetail',
        data: { project_id: this.projectId },
        success: (res) => {
          let data = res.data;
          if (data) {
            data._statusName = this.getStatusName(data.status);
            data._tagType = this.getTagType(data.status);
            if (data.process_list) {
              data.process_list = data.process_list.map(item => {
                item._badgeClass = this.getBadgeClass(item.type);
                item._processTypeName = this.getProcessTypeName(item.type);
                let u = Array.isArray(item.user_info) ? item.user_info[0] : item.user_info;
                item._avatar = (u && u.avatar) ? u.avatar : 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/41235688-6615-4672-88f5-46f041ff3dbb.png';
                item._username = (u && (u.nickname || u.real_name || u.username)) ? (u.nickname || u.real_name || u.username) : '系统';
                return item;
              });

              // Apply Thread Grouping (Nest Rejections inside Applications)
              let threadedList = [];
              let i = 0;
              while (i < data.process_list.length) {
                let item = data.process_list[i];
                // Type 3 is rejection, Type 2 is application. Rejection naturally comes before (is newer than) application in the array.
                if (item.type === 3 && i + 1 < data.process_list.length && data.process_list[i + 1].type === 2) {
                  if (!data.process_list[i + 1]._replies) data.process_list[i + 1]._replies = [];
                  data.process_list[i + 1]._replies.unshift(item);
                } else {
                  threadedList.push(item);
                }
                i++;
              }
              data.process_list = threadedList;
            }
          }
          this.projectInfo = data;
        }
      });
    },
    getStatusName(status) {
      const map = { 0: '执行中', 1: '待验收', 2: '已归档', 3: '被驳回修改' };
      return map[status] || '未知';
    },
    getTagType(status) {
      const map = { 0: 'primary', 1: 'warning', 2: 'success', 3: 'error' };
      return map[status] || 'info';
    },
    getProcessTypeName(type) {
      const map = { 1: '进度反馈', 2: '结项申请', 3: '审核驳回' };
      return map[type] || '记录';
    },
    getBadgeClass(type) {
      if (type === 1) return 'primary';
      if (type === 2) return 'tertiary';
      if (type === 3) return 'tertiary'; // Error-ish color
      return 'primary';
    },
    goToFeedback() {
      // 携带参数跳转至新页面或共用 apply-finish 控制
      uni.navigateTo({
        url: '/pages/keywork/project/apply-finish/index?id=' + this.projectId + '&mode=feedback'
      });
    },
    goToApplyClose() {
      uni.navigateTo({
        url: '/pages/keywork/project/apply-finish/index?id=' + this.projectId + '&mode=close'
      });
    },
    goBack() {
      uni.navigateBack();
    },
    getAssigneeNames(assigneeInfo) {
      if (!assigneeInfo || assigneeInfo.length === 0) return '未指派';
      let first = assigneeInfo[0];
      let name = first.nickname || first.real_name || first.username || '匿名';
      if (assigneeInfo.length > 1) {
        return name + '…';
      }
      return name;
    },
    getVerifierName(creatorInfo) {
      if (!creatorInfo) return '未指派';
      let u = Array.isArray(creatorInfo) ? creatorInfo[0] : creatorInfo;
      if (!u) return '未指派';
      return u.nickname || u.real_name || u.username || '管理员';
    },
    getVerifierAvatar(creatorInfo) {
      let u = Array.isArray(creatorInfo) ? creatorInfo[0] : creatorInfo;
      return (u && u.avatar) ? u.avatar : 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/41235688-6615-4672-88f5-46f041ff3dbb.png';
    },
    getProgressText() {
      if (!this.projectInfo) return '0%';
      if (this.projectInfo.status === 2) return '100%';
      if (this.projectInfo.progress != null) return this.projectInfo.progress + '%';
      // 根据流转记录数估算进度
      let count = (this.projectInfo.process_list && this.projectInfo.process_list.length) || 0;
      if (this.projectInfo.status === 1) return '90%';
      if (count === 0) return this.projectInfo._statusName;
      let pct = Math.min(Math.round(count * 20), 85);
      return pct + '%';
    },
    getProgressWidth() {
      if (!this.projectInfo) return '0%';
      if (this.projectInfo.status === 2) return '100%';
      if (this.projectInfo.progress != null) return this.projectInfo.progress + '%';
      let count = (this.projectInfo.process_list && this.projectInfo.process_list.length) || 0;
      if (this.projectInfo.status === 1) return '90%';
      if (count === 0) return '5%';
      return Math.min(Math.round(count * 20), 85) + '%';
    },
    onAssigneeAvatarError(idx) {
      if (this.projectInfo && this.projectInfo.assignee_info[idx]) {
        this.$set(this.projectInfo.assignee_info[idx], 'avatar', 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/41235688-6615-4672-88f5-46f041ff3dbb.png');
      }
    },
    onVerifierAvatarError() {
      let u = Array.isArray(this.projectInfo.create_user_info) ? this.projectInfo.create_user_info[0] : this.projectInfo.create_user_info;
      if (u) {
        this.$set(u, 'avatar', 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/41235688-6615-4672-88f5-46f041ff3dbb.png');
      }
    },
    onProcessAvatarError(idx) {
      if (this.projectInfo.process_list[idx]) {
        this.$set(this.projectInfo.process_list[idx], '_avatar', 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/41235688-6615-4672-88f5-46f041ff3dbb.png');
      }
    },
    onAttachmentError(pIdx, iIdx) {
      if (this.projectInfo.process_list[pIdx] && this.projectInfo.process_list[pIdx].attachment_imgs) {
        this.$set(this.projectInfo.process_list[pIdx].attachment_imgs, iIdx, 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/41235688-6615-4672-88f5-46f041ff3dbb.png');
      }
    },
    onReplyAvatarError(pIdx, replyId) {
      let process = this.projectInfo.process_list[pIdx];
      if (process && process._replies) {
        let reply = process._replies.find(r => r._id === replyId);
        if (reply) {
          this.$set(reply, '_avatar', 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/41235688-6615-4672-88f5-46f041ff3dbb.png');
        }
      }
    },
    onReplyAttachmentError(pIdx, replyId, iIdx) {
      let process = this.projectInfo.process_list[pIdx];
      if (process && process._replies) {
        let reply = process._replies.find(r => r._id === replyId);
        if (reply && reply.attachment_imgs) {
          this.$set(reply.attachment_imgs, iIdx, 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/41235688-6615-4672-88f5-46f041ff3dbb.png');
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
// Project Colors
$primary: #0050cb;
$secondary: #425ca0;
$tertiary: #a33200;
$error: #ba1a1a;
$on-surface: #191c1e;
$on-surface-variant: #424656;
$outline: #727687;

.page-container {
  min-height: 100vh;
  padding-bottom: 240rpx;
  overflow-x: hidden;
  width: 100vw;
  box-sizing: border-box;
}

.main-content {
  padding: 40rpx 32rpx 32rpx;
  max-width: 1300rpx; // 2xl is wide, but constrained to mobile feel usually
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

// 统一大标题样式
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8rpx;
  margin-top: 16rpx;
  margin-bottom: 16rpx;
}

// Sections
.section {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-bottom: 48rpx;
}

// Card Style
.glass-card {
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 16rpx 48rpx rgba(0, 32, 90, 0.12), inset 0 2rpx 0 rgba(255, 255, 255, 0.9);
}

.standard-card {
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  border-radius: 24rpx;
}

.title-wrap-ui4 {
  margin-bottom: 24rpx;
}

// 统一小标题样式
.title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16rpx;
  gap: 16rpx;
}

.title-left {
  display: flex;
  align-items: flex-start;
  flex: 1;
  overflow: hidden;

  .blue-block {
    width: 8rpx;
    height: 28rpx;
    background-color: #0050cb;
    border-radius: 4rpx;
    margin-right: 16rpx;
    margin-top: 6rpx;
    flex-shrink: 0;
  }
}

.item-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #191c1e;
  line-height: 1.4;
  flex: 1;
}

.right-tag-wrap {
  flex-shrink: 0;
  margin-top: 0;
}

.status-u-tag {
  flex-shrink: 0;
  margin-top: 4rpx;
}

.location-group {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.location-icon {
  font-size: 32rpx;
  color: $on-surface-variant;
}

.location-text {
  font-size: 24rpx;
  color: $on-surface-variant;
}

.status-badge {
  background: #dae1ff;
  color: #001849;
  padding: 8rpx 24rpx;
  border-radius: 99rpx;
  font-size: 20rpx;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.standard-desc {
  background: rgba(242, 244, 246, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12rpx;
  padding: 16rpx;
  margin: 0 -8rpx;
  font-size: 26rpx;
  line-height: 1.6;
  color: $on-surface-variant;
  width: auto;
  box-sizing: border-box;
  overflow-x: auto;
}

.roles-grid-ui4 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32rpx;
  margin-top: 40rpx;
  margin-bottom: 40rpx;
}

.role-col-ui4 {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.role-label-ui4 {
  font-size: 22rpx;
  font-weight: 800;
  color: #8c939d;
}

.role-value-row-ui4 {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.role-text-ui4 {
  font-size: 26rpx;
  color: #5c6370;
}

.role-text-ui4.bold-text {
  font-weight: 700;
  color: #111;
}

.assignee-names-truncate {
  max-width: 160rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.default-avatar-ui4 {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background-color: #f2f3f5;
  flex-shrink: 0;
}

.single-avatar-ui4 {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  flex-shrink: 0;
}

.avatar-stack {
  display: flex;
  align-items: center;
}

.stack-avatar {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  border: 4rpx solid #fff;
  margin-left: -16rpx;
  background-color: #f3f4f6;
  flex-shrink: 0;
}

.stack-avatar:first-child {
  margin-left: 0;
}

.stack-more {
  background: rgba(0, 80, 203, 0.1);
  color: $primary;
  font-weight: 700;
  font-size: 22rpx;
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  border: 4rpx solid #fff;
  margin-left: -16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.progress-section {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.progress-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.deadline-label {
  font-size: 20rpx;
  font-weight: 800;
  color: $outline;
}

.progress-stat {
  display: flex;
  align-items: baseline;
  gap: 4rpx;
}

.progress-label-text {
  font-size: 22rpx;
  color: $outline;
  font-weight: 700;
}

.progress-percent {
  color: $primary;
  font-size: 28rpx;
  font-weight: 800;
}

.progress-value {
  color: $primary;
  font-size: 28rpx;
}

.progress-track {
  height: 12rpx;
  background: #e0e3e5;
  border-radius: 99rpx;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #0066ff;
  border-radius: 99rpx;
}

// Timeline
.timeline-container {
  position: relative;
  padding-left: 48rpx;
  display: flex;
  flex-direction: column;
  gap: 64rpx;
}

.timeline-track {
  position: absolute;
  left: 22rpx;
  top: 16rpx;
  bottom: 16rpx;
  width: 4rpx;
  background: rgba(194, 198, 216, 0.3);
}

.timeline-item {
  position: relative;
}

.timeline-dot {
  position: absolute;
  left: -38rpx;
  top: 8rpx;
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  border: 8rpx solid #fff;
  z-index: 2;
}

.timeline-dot.active {
  background: #0066ff;
}

.timeline-dot.inactive {
  background: $outline;
}

.feedback-card {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;

  // Industrial Aesthetic: Border & Glass Profile
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.45));
  border: 1px solid rgba(0, 80, 203, 0.15);
  border-radius: 24rpx;
  box-shadow: 0 16rpx 48rpx rgba(0, 32, 90, 0.04), inset 0 2rpx 0 rgba(255, 255, 255, 0.9);
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.avatar-sm {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.username {
  font-size: 24rpx;
  font-weight: 800;
  color: $on-surface;
}

.type-badge {
  font-size: 20rpx;
  padding: 4rpx 16rpx;
  border-radius: 8rpx;
  font-weight: 800;
}

.type-badge.primary {
  background: rgba(0, 80, 203, 0.1);
  color: $primary;
}

.type-badge.tertiary {
  background: #ffdbd0;
  color: #832600;
}

.time-stamp {
  font-size: 20rpx;
  color: $outline;
}

.feedback-content-box {
  background: rgba(248, 250, 252, 0.4);
  border: 1px solid rgba(194, 198, 216, 0.6);
  border-radius: 16rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.feedback-content-default {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.feedback-text {
  font-size: 28rpx;
  color: $on-surface-variant;
  line-height: 1.5;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
}

.feedback-images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
}

.feedback-img {
  width: 100%;
  height: 180rpx;
  border-radius: 16rpx;
}

// Threaded Replies (Comment Structure)
.thread-replies {
  margin-top: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  position: relative;
}

.thread-reply-item {
  display: flex;
  gap: 24rpx;
  position: relative;
}

.reply-connector {
  width: 48rpx;
  position: relative;
  flex-shrink: 0;
}

.connector-elbow {
  position: absolute;
  top: -32rpx;
  left: 20rpx;
  width: 28rpx;
  height: 72rpx;
  border-left: 4rpx solid rgba(194, 198, 216, 0.6);
  border-bottom: 4rpx solid rgba(194, 198, 216, 0.6);
  border-bottom-left-radius: 16rpx;
}

.reply-content {
  flex: 1;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  padding: 24rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

// Special theme for Rejection Reply
.reply-content.rejection-reply {
  background: linear-gradient(145deg, rgba(254, 242, 242, 0.8), rgba(254, 226, 226, 0.4));
  border: 1px solid rgba(254, 202, 202, 0.6);
  box-shadow: inset 0 2rpx 0 rgba(255, 255, 255, 0.8);
}

.rejection-reply .reply-text {
  color: #7f1d1d;
  font-weight: 500;
}

.rejection-reply .reply-badge {
  background: rgba(254, 226, 226, 0.8);
  color: #991b1b;
  border: 1px solid rgba(254, 202, 202, 0.8);
}


.inspector-comment {
  margin-top: 24rpx;
  padding: 24rpx 32rpx;
  background: rgba(254, 242, 242, 0.5); // red-50/50
  backdrop-filter: blur(8px);
  border-radius: 16rpx;
  border-top: 1px solid rgba(254, 202, 202, 0.3); // red-200/30
}

.comment-user {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 16rpx;
}

.avatar-mini {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
}

.comment-title-box {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.comment-name {
  font-size: 20rpx;
  font-weight: 800;
  color: #7f1d1d;
}

.comment-tag {
  font-size: 20rpx;
  font-weight: 800;
  color: #b91c1c;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.comment-body {
  font-size: 24rpx;
  color: #991b1b;
  font-style: italic;
}

// Conclusion
.conclusion-gradient-border {
  padding: 4rpx;
  border-radius: 32rpx;
  background: linear-gradient(135deg, #0066ff, #9bb4fe);
  box-shadow: 0 16rpx 48rpx rgba(0, 80, 203, 0.15);
}

.conclusion-inner {
  padding: 48rpx;
  border-radius: 28rpx;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}

.acceptor-header {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.acceptor-avatar-lg {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(0, 80, 203, 0.2);
}

.conclusion-title {
  font-size: 28rpx;
  color: $on-surface;
}

.status-subtitle {
  font-size: 20rpx;
  color: $primary;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

.conclusion-box {
  background: rgba(0, 80, 203, 0.05);
  border: 1px solid rgba(0, 80, 203, 0.1);
  padding: 32rpx;
  border-radius: 24rpx;
}

.conclusion-content {
  font-size: 28rpx;
  color: $on-surface;
  line-height: 1.6;
  font-weight: 500;
}

.conclusion-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.acceptance-status-tag {
  background: rgba(0, 80, 203, 0.1);
  color: $primary;
  padding: 8rpx 24rpx;
  border-radius: 99rpx;
  font-size: 20rpx;
  font-weight: 800;
}

.acceptance-date {
  font-size: 20rpx;
  color: $outline;
}

// FAB
.fab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24rpx 48rpx 48rpx;
  z-index: 100;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.fab-container {
  display: flex;
  gap: 24rpx;
  max-width: 1300rpx;
  margin: 0 auto;
}

.fab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  padding: 0 24rpx;
  border-radius: 99rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 80, 203, 0.1);
  height: 88rpx;
  box-sizing: border-box;
}

.fab-btn.primary {
  background: rgba(0, 80, 203, 0.85);
  color: #fff;
}

.fab-btn.error {
  background: rgba(186, 26, 26, 0.85);
  color: #fff;
}

.fab-icon {
  font-size: 32rpx;
}

.fab-btn text {
  font-family: Manrope, sans-serif;
  font-weight: 700;
  font-size: 26rpx;
}

// Helper classes
.tracking-tight {
  letter-spacing: -0.025em;
}

.bg-glass {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(20px);
}

.bg-glass-blur {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
}
</style>
