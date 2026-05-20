<template>
	<view class="page-container industrial-grid">
		<z-paging ref="paging" v-model="listData" @query="getList" :fixed="true" bg-color="transparent">
			<template #top>
				<cu-custom bgColor="bg-gradual-blue" :isCustom="true">
					<block slot="backText"></block>
					<block slot="content">反馈历史</block>
				</cu-custom>

				<view class="main-content" style="padding-bottom: 0;">
					<view class="top-content">
						<!-- Status Tabs Component -->
						<view class="tab-system">
							<view class="status-tabs">
								<view class="tab" :class="currentStatus === -1 ? 'active-tab bg-white' : 'glass-tab'"
									@click="changeStatus(-1)">全部</view>
								<view class="tab" :class="currentStatus === 1 ? 'active-tab bg-white' : 'glass-tab'"
									@click="changeStatus(1)">已完成</view>
								<view class="tab" :class="currentStatus === 2 ? 'active-tab bg-white' : 'glass-tab'"
									@click="changeStatus(2)">已逾期</view>
							</view>

							<!-- Search Panel -->
							<view class="search-panel">
								<view class="form-group-1">
									<view class="select-wrapper" @click="showLocationSelect = true">
										<text class="select-text">{{ locationName }}</text>
										<u-icon name="arrow-down" size="24" color="#727687"></u-icon>
									</view>
									<view class="date-pickers" @click="showCalendar = true">
										<view class="date-wrapper">
											<text class="date-text" :class="{ 'placeholder': !startDate }">{{ startDate
												|| '开始日期' }}</text>
										</view>
										<view class="date-wrapper">
											<text class="date-text" :class="{ 'placeholder': !endDate }">{{ endDate ||
												'结束日期' }}</text>
										</view>
									</view>
								</view>

								<view class="btn-group">
									<view class="btn-primary active-press" @click="doSearch">
										<u-icon name="search" size="28" color="#ffffff"></u-icon>
										<text style="margin-left: 8rpx;">点击查询</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</template>

			<view class="main-content" style="padding-top: 0; padding-bottom: 40rpx;">
				<!-- Point Cards Area -->
				<view class="cards-container">
					<view class="point-card glass-card" v-for="item in listData" :key="item._id">
						<view class="card-top">
							<view class="card-info">
								<view class="card-title-row">
									<view class="title-left">
										<view class="blue-block"></view>
										<text class="card-title">{{ getPointName(item) }}</text>
									</view>
									<view class="right-tags">
										<u-tag v-if="item.status === 1" text="已完成" type="success" mode="light"
											size="mini" />
										<u-tag v-else-if="item.status === 2" text="已逾期" type="error" mode="dark"
											size="mini" />
									</view>
								</view>
								<view class="card-subtitle-row">
									<u-icon name="home-fill" size="28" color="#64748b"></u-icon>
									<text class="card-subtitle" style="margin-left: 8rpx;">{{ getAreaName(item)
										}}</text>
								</view>
							</view>
						</view>

						<!-- Roles Row (反馈人员) -->
						<view class="roles-row mb-3" v-if="item.status === 1">
							<view class="role-executors">
								<text class="role-label">实际反馈人：</text>
								<text class="role-names">{{ getSubmitUserName(item) }}</text>
							</view>
							<view class="avatar-group" v-if="item.submit_user_info">
								<image class="avatar" :src="getAvatar(item.submit_user_info, 0)" mode="aspectFill">
								</image>
								<view v-if="Array.isArray(item.submit_user_info) && item.submit_user_info.length > 1"
									class="avatar-more">+{{ item.submit_user_info.length - 1 }}</view>
							</view>
						</view>

						<!-- 若为异常/未反馈的情况容错 -->
						<view v-if="item.status === 2" class="empty-state">
							<text class="empty-text">该班次逾期未反馈</text>
						</view>

						<view class="card-bottom">
							<view class="time-info-wrap">
								<!-- Time Range -->
								<view class="time-range">
									<u-icon name="clock-fill" size="28" color="#475569"></u-icon>
									<text class="time-text" style="margin-left: 8rpx;">{{ item.status === 1 ? '反馈时间' :
										'记录生成时间' }}：{{ formatTime(item._add_time) }}</text>
								</view>
							</view>

							<view class="action-btn" @click="goDetail(item)">
								<text class="action-btn-text">点击详情</text>
								<u-icon name="arrow-right" size="32" color="#0050cb"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
		</z-paging>

		<!-- Pickers -->
		<u-select v-model="showLocationSelect" :list="locationTree" mode="mutil-column-auto"
			@confirm="onLocationConfirm"></u-select>
		<u-calendar v-model="showCalendar" mode="range" @change="onDateChange" active-bg-color="#0050cb"></u-calendar>
	</view>
</template>

<script>
let vk = uni.vk;
export default {
	data() {
		return {
			listData: [],
			currentStatus: -1,
			currentAreaId: '',
			currentPointId: '',
			locationTree: [],
			showLocationSelect: false,
			locationName: '全部区域',
			showCalendar: false,
			startDate: '',
			endDate: ''
		};
	},
	onLoad() {
		vk = uni.vk;
		this.getLocationTree();
	},
	methods: {
		async getList(pageNo, pageSize) {
			try {
				let res = await vk.callFunction({
					url: 'client/feedback/kh/getHistoryList',
					data: {
						pageIndex: pageNo,
						pageSize: pageSize,
						status: this.currentStatus,
						area_id: this.currentAreaId || undefined,
						point_id: this.currentPointId || undefined,
						startTime: this.startDate ? new Date(this.startDate.replace(/-/g, '/') + ' 00:00:00').getTime() : undefined,
						endTime: this.endDate ? new Date(this.endDate.replace(/-/g, '/') + ' 23:59:59').getTime() : undefined
					}
				});
				let list = res.rows || [];
				this.$refs.paging.complete(list);
			} catch (e) {
				this.$refs.paging.complete(false);
			}
		},
		doSearch() {
			this.$refs.paging.reload();
		},
		changeStatus(status) {
			if (this.currentStatus === status) return;
			this.currentStatus = status;
			this.doSearch();
		},
		onDateChange(e) {
			this.startDate = e.startDate;
			this.endDate = e.endDate;
			this.doSearch();
		},
		async getLocationTree() {
			try {
				// Reuse the tree from report API as they generally point to the same area/point tree 
				// or we can use admin/base-point/sys/getTree equivalent if needed
				let res = await vk.callFunction({ url: 'client/report/kh/getAreaPointTree' });
				if (res.tree) {
					this.locationTree = res.tree;
				}
			} catch (e) { }
		},
		onLocationConfirm(arr) {
			let area = arr[0];
			let point = arr[1];
			if (area && area.value) {
				this.currentAreaId = area.value;
				this.currentPointId = point && point.value ? point.value : '';
				this.locationName = (point && point.value) ? `${area.label} / ${point.label}` : area.label;
			} else {
				this.currentAreaId = '';
				this.currentPointId = '';
				this.locationName = '全部区域';
			}
			this.doSearch();
		},
		formatTime(timeStr) {
			if (!timeStr) return '';
			return vk.pubfn.timeFormat(timeStr, 'yyyy-MM-dd hh:mm');
		},
		goDetail(item) {
			let pointInfo = item.point_info;
			if (Array.isArray(pointInfo)) {
				pointInfo = pointInfo[0];
			}
			let pointName = pointInfo ? pointInfo.name : '';
			uni.navigateTo({
				url: `/pages/feedback/submit/index?id=${item._id}&name=${pointName}&status=${item.status === 1 ? 'completed' : 'expired'}`
			});
		},
		getSubmitUserName(item) {
			let info = item.submit_user_info;
			if (!info) return '未知';
			if (Array.isArray(info)) {
				if (info.length === 0) return '未知';
				return info.map(u => u.real_name || u.nickname || '未知').join('、');
			}
			return info.real_name || info.nickname || '未知';
		},
		getAreaName(item) {
			if (item.area_info) {
				let info = Array.isArray(item.area_info) ? item.area_info[0] : item.area_info;
				if (info && info.name) return info.name;
			}
			return "未知区域";
		},
		getPointName(item) {
			if (item.point_info) {
				let info = Array.isArray(item.point_info) ? item.point_info[0] : item.point_info;
				if (info && info.name) return info.name;
			}
			return "未知重控点";
		},
		getAvatar(users, index) {
			let user = users;
			if (Array.isArray(users)) {
				user = users[index];
			}
			if (user && user.avatar) {
				return typeof user.avatar === 'string' ? user.avatar : (user.avatar.url || user.avatar);
			}
			return "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/41235688-6615-4672-88f5-46f041ff3dbb.png";
		}
	}
}
</script>

<style lang="scss" scoped>
/* Color Palette */
$surface: #f7f9fb;
$on-surface: #191c1e;
$on-surface-variant: #424656;
$outline: #727687;
$primary: #0050cb;

.page-container {
	min-height: 100vh;
	background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
	color: $on-surface;
	font-family: 'Inter', sans-serif;
	box-sizing: border-box;
}

.industrial-grid {
	background-image: radial-gradient(rgba(0, 80, 203, 0.05) 1px, transparent 1px);
	background-size: 48rpx 48rpx;
}

.main-content {
	padding-top: 32rpx;
	padding-left: 24rpx;
	padding-right: 24rpx;
	max-width: 1344rpx;
	margin: 0 auto;
}

.top-content {
	max-width: 896rpx;
	margin: 0 auto;
}

.tab-system {
	margin-bottom: 32rpx;
}

.status-tabs {
	display: flex;
	align-items: flex-end;
	padding: 0 8rpx;
	margin-bottom: -1px;
}

.tab {
	position: relative;
	padding: 20rpx 40rpx;
	font-size: 28rpx;
	border-radius: 24rpx 24rpx 0 0;
	border: 1px solid rgba(255, 255, 255, 0.6);
	border-bottom: none;
	margin-right: -16rpx;
}

.tab.active-tab {
	z-index: 30;
	background: #fff;
	color: $primary;
	font-weight: 700;
	box-shadow: 0 -8rpx 24rpx -4rpx rgba(0, 80, 203, 0.08);
}

.tab.glass-tab {
	z-index: 20;
	background: rgba(255, 255, 255, 0.3);
	backdrop-filter: blur(12px);
	color: $outline;
	font-weight: 500;
	opacity: 0.8;
	border-color: rgba(255, 255, 255, 0.4);
}

.tab:nth-child(3) {
	z-index: 15;
}

.search-panel {
	position: relative;
	z-index: 40;
	background: rgba(255, 255, 255, 0.7);
	backdrop-filter: blur(24px);
	border-radius: 0 24rpx 24rpx 24rpx;
	padding: 24rpx;
	border: 1px solid rgba(255, 255, 255, 0.8);
	box-shadow: 0 16rpx 48rpx -16rpx rgba(0, 80, 203, 0.12);
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.form-group-1 {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.select-wrapper,
.date-wrapper {
	position: relative;
	background: rgba(255, 255, 255, 0.8);
	border: 1px solid rgba(0, 0, 0, 0.05);
	border-radius: 16rpx;
	padding: 12rpx 20rpx;
	font-size: 26rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.date-pickers {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 12rpx;
}

.date-text,
.select-text {
	font-weight: 600;
	color: #1e293b;
}

.date-text.placeholder {
	color: #9ca3af;
	font-weight: 400;
}

.btn-group {
	display: flex;
	gap: 12rpx;
}

.btn-primary {
	flex: 1;
	padding: 16rpx 20rpx;
	border-radius: 16rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
	font-size: 26rpx;
	font-weight: 700;
	height: 64rpx;
	background: $primary;
	color: #fff;
	box-shadow: 0 8rpx 16rpx rgba(0, 80, 203, 0.2);
	transition: all 0.3s ease;
}

.btn-primary:active {
	transform: scale(0.98);
}

/* Cards style from todo-list */
.cards-container {
	display: flex;
	flex-direction: column;
	gap: 32rpx;
	max-width: 896rpx;
	margin: 0 auto;
}

.glass-card {
	background: #ffffff;
	border: 1px solid rgba(0, 80, 203, 0.05);
	box-shadow: 0 8rpx 32rpx rgba(0, 80, 203, 0.04);
	border-radius: 24rpx;
	padding: 32rpx;
	transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.glass-card:active {
	transform: scale(0.99);
}

.card-top {
	display: flex;
	gap: 24rpx;
	margin-bottom: 24rpx;
}

.card-info {
	flex: 1;
	min-width: 0;
}

.card-title-row {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 8rpx;
	gap: 16rpx;
}

.right-tags {
	flex-shrink: 0;
}

.card-title {
	font-family: 'Manrope', sans-serif;
	font-size: 34rpx;
	font-weight: 800;
	color: #1e293b;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	flex: 1;
}

.title-left {
	display: flex;
	align-items: flex-start;
	flex: 1;
	overflow: hidden;
}

.blue-block {
	width: 8rpx;
	height: 32rpx;
	background-color: #0050cb;
	border-radius: 4rpx;
	margin-right: 16rpx;
	margin-top: 6rpx;
	flex-shrink: 0;
}

.card-subtitle-row {
	display: flex;
	align-items: center;
	gap: 8rpx;
	margin-top: 4rpx;
}

.icon-domain {
	font-size: 28rpx;
	color: #64748b;
}

.card-subtitle {
	font-size: 24rpx;
	font-weight: 500;
	color: #64748b;
}

.card-bottom {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 24rpx;
	border-top: 1px dashed #e2e8f0;
	margin-top: 16rpx;
}

.time-info-wrap {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.roles-row {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: #f8fafc;
	border-radius: 12rpx;
	padding: 16rpx 24rpx;
	margin-bottom: 24rpx;
}

.role-executors {
	display: flex;
	align-items: center;
	flex: 1;
}

.role-label {
	font-size: 26rpx;
	color: #94a3b8;
	margin-right: 8rpx;
}

.role-names {
	font-size: 26rpx;
	color: #334155;
	font-weight: 700;
	margin-right: 16rpx;
}

.avatar-group {
	display: flex;
	align-items: center;
}

.avatar {
	width: 48rpx;
	height: 48rpx;
	border-radius: 50%;
	border: 2px solid #ffffff;
	background-color: #f1f5f9;
}

.avatar-more {
	width: 48rpx;
	height: 48rpx;
	border-radius: 50%;
	background-color: #e2e8f0;
	color: #475569;
	font-size: 20rpx;
	font-weight: 700;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2px solid #ffffff;
	margin-left: -16rpx;
}

.time-range {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.icon-schedule {
	font-size: 28rpx;
	color: #475569;
}

.time-text {
	font-size: 22rpx;
	font-weight: 500;
	color: #475569;
}

.action-btn {
	display: flex;
	align-items: center;
	gap: 8rpx;
	padding: 16rpx 28rpx;
	background-color: #f0f5fa;
	border-radius: 16rpx;
	transition: background-color 0.3s;
}

.action-btn:active {
	background-color: #e2eaf4;
}

.action-btn-text {
	color: #0050cb;
	font-weight: 700;
	font-size: 26rpx;
}

.icon-arrow {
	color: #0050cb;
	font-size: 32rpx;
}

.empty-state {
	padding: 16rpx 0;
	opacity: 0.8;
}

.empty-text {
	font-size: 24rpx;
	font-weight: 500;
	color: #ba1a1a;
}
</style>

