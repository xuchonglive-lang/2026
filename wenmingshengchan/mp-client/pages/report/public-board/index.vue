<template>
	<view class="page-container industrial-grid">
		<z-paging ref="paging" v-model="dataList" @query="getList" :fixed="true" bg-color="transparent">
			<template #top>
				<cu-custom bgColor="bg-gradual-blue" :isCustom="true">
					<block slot="backText"></block>
					<block slot="content">报备公示</block>
				</cu-custom>

				<view class="main-content" style="padding-bottom: 0;">
					<view class="top-content">
						<!-- Status Tabs Component -->
						<view class="tab-system">
							<view class="status-tabs">
								<view class="tab" :class="currentStatus === -1 ? 'active-tab bg-white' : 'glass-tab'"
									@click="changeStatus(-1)">全部</view>
								<view class="tab" :class="currentStatus === 0 ? 'active-tab bg-white' : 'glass-tab'"
									@click="changeStatus(0)">待处理</view>
								<view class="tab" :class="currentStatus === 1 ? 'active-tab bg-white' : 'glass-tab'"
									@click="changeStatus(1)">处理中</view>
								<view class="tab" :class="currentStatus === 2 ? 'active-tab bg-white' : 'glass-tab'"
									@click="changeStatus(2)">处置完成</view>
							</view>

							<!-- Search Panel -->
							<view class="search-panel glass-card-panel">
								<view class="form-group-1">
									<view class="select-wrapper" @click="showLocationSelect = true">
										<text class="select-text">{{ locationName }}</text>
										<text class="material-symbols-outlined icon">expand_more</text>
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
									<view class="btn-feedback active-press" :class="{ 'active-filter': needMyFeedback }"
										@click="toggleMyFeedback">
										<text class="material-symbols-outlined icon">{{ needMyFeedback ? 'check_box' :
											'check_box_outline_blank' }}</text>
										<text>涉及到我部门</text>
									</view>
									<view class="btn-primary active-press" @click="doSearch">
										<text class="material-symbols-outlined icon">search</text>
										<text>点击查询</text>
									</view>
								</view>
							</view>
						</view>

						<!-- Area Tabs -->
						<view style="padding: 0 8rpx; margin-bottom: 24rpx;">
							<u-tabs :key="uAreaList.map(a => a.value).join(',')" :list="uAreaList" :current="currentAreaIndex" @change="onAreaChange"
								active-color="#0050cb" inactive-color="#64748b" font-size="28" :bold="true"
								bar-width="60" bar-height="8" height="70" bg-color="transparent"></u-tabs>
						</view>
					</view>
				</view>
			</template>

			<!-- Report Letter List -->
			<view class="main-content" style="padding-top: 0;">
				<view class="timeline-container">
					<view class="timeline-item" v-for="(item, index) in dataList" :key="item._id">
						<view class="letter-card" :class="{ 'faded': item.status === 2 }">
							<!-- Official Stamp -->
							<view class="status-stamp" :class="'stamp-' + item.status">
								{{ item.status === 0 ? '待处理' : (item.status === 1 ? '处理中' : (item.status === 2 ? '已处置完成'
									:
									'已驳回')) }}
							</view>

							<view class="letter-header">
								<view class="letter-title">{{ item.title }}</view>

								<view class="letter-meta-grid">
									<view class="meta-item">
										<text class="m-label">提报人员：</text>
										<text class="m-value">{{ item.is_anonymous ? '*** (匿名保护)' :
											(item.create_user_info &&
												item.create_user_info.length ? item.create_user_info[0].nickname : '未知用户')
										}}</text>
									</view>
									<view class="meta-item">
										<text class="m-label">提报时间：</text>
										<text class="m-value">{{ formatTime(item._add_time) }}</text>
									</view>
									<view class="meta-item">
										<text class="m-label">隐患等级：</text>
										<text class="m-value font-bold"
											:class="item.urgency === 1 ? 'text-danger' : 'text-primary'">
											{{ item.urgency === 1 ? '🚨 紧急隐患' : '📌 常规报备' }}
										</text>
									</view>
									<view class="meta-item">
										<text class="m-label">涉及区域：</text>
										<text class="m-value">
											{{ (item.area_info && item.area_info.length > 0) ? item.area_info[0].name :
												(item.area_info && item.area_info.name ? item.area_info.name : '未知区域') }} -
											{{
												(item.point_info && item.point_info.length > 0) ? item.point_info[0].name :
													(item.point_info && item.point_info.name ? item.point_info.name : '未知点位') }}
										</text>
									</view>
									<view class="meta-item">
										<text class="m-label">责任单位：</text>
										<text class="m-value highlight-unit">{{ item.handle_dept_name || '待调度中心分配'
										}}</text>
									</view>
								</view>
							</view>

							<view class="letter-divider"></view>

							<view class="letter-body">
								<view class="body-label">【问题详情描述】</view>
								<view class="body-content">
									<u-parse :html="item.content"></u-parse>
								</view>

								<!-- Images -->
								<view class="letter-images" v-if="item.images && item.images.length > 0">
									<image v-for="(img, imgIdx) in item.images" :key="imgIdx" class="l-img"
										mode="aspectFill" :src="img"></image>
								</view>
							</view>

							<!-- Reply Box -->
							<view class="letter-reply" v-if="item.reply_content">
								<view class="reply-badge">
									<text class="material-symbols-outlined icon-reply">edit_document</text>
									<text>最新处置进度</text>
								</view>
								<view class="reply-content">
									<u-parse :html="item.reply_content"></u-parse>
								</view>
								<view class="reply-meta">处理时间: {{ formatTime(item.reply_time) }}</view>
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
			dataList: [],
			currentStatus: -1,
			currentAreaId: '',
			currentPointId: '',
			locationTree: [],
			showLocationSelect: false,
			locationName: '全部区域',
			showCalendar: false,
			startDate: '',
			endDate: '',
			needMyFeedback: false
		};
	},
	computed: {
		uAreaList() {
			return [{ name: '全部区域', value: '' }, ...this.locationTree.map(a => ({ name: a.label, value: a.value }))];
		},
		currentAreaIndex() {
			let idx = this.uAreaList.findIndex(a => a.value === this.currentAreaId);
			return idx >= 0 ? idx : 0;
		}
	},
	onLoad() {
		vk = uni.vk;
		this.getLocationTree();
	},
	methods: {
		async getList(pageNo, pageSize) {
			try {
				let res = await vk.callFunction({
					url: 'client/report/kh/getReportList',
					data: {
						pageIndex: pageNo,
						pageSize: pageSize,
						status: this.currentStatus === -1 ? [0, 1, 2] : this.currentStatus,
						area_id: this.currentAreaId || undefined,
						point_id: this.currentPointId || undefined,
						startTime: this.startDate ? new Date(this.startDate.replace(/-/g, '/') + ' 00:00:00').getTime() : undefined,
						endTime: this.endDate ? new Date(this.endDate.replace(/-/g, '/') + ' 23:59:59').getTime() : undefined,
						needMyFeedback: this.needMyFeedback
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
		toggleMyFeedback() {
			this.needMyFeedback = !this.needMyFeedback;
			this.doSearch();
		},
		changeStatus(status) {
			if (this.currentStatus === status) return;
			this.currentStatus = status;
			this.doSearch();
		},
		changeArea(areaId, areaName) {
			if (this.currentAreaId === areaId) return;
			this.currentAreaId = areaId;
			this.currentPointId = '';
			this.locationName = areaName || '全部区域';
			this.doSearch();
		},
		onAreaChange(index) {
			let item = this.uAreaList[index];
			this.changeArea(item.value, item.name);
		},
		onDateChange(e) {
			this.startDate = e.startDate;
			this.endDate = e.endDate;
			this.doSearch();
		},
		async getLocationTree() {
			try {
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
$primary-fixed: #dae1ff;
$primary-container: #0066ff;
$on-primary: #ffffff;
$surface-container-low: #f2f4f6;
$surface-container-highest: #e0e3e5;

.page-container {
	min-height: 100vh;
	background-color: $surface;
	color: $on-surface;
	padding-bottom: 240rpx;
	font-family: 'Inter', sans-serif;
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

.tab:nth-child(4) {
	z-index: 10;
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

.date-text.placeholder {
	color: #9ca3af;
}

.btn-group {
	display: flex;
	gap: 12rpx;
}

.btn-feedback,
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
	transition: all 0.3s ease;
}

.btn-feedback {
	background: rgba(255, 255, 255, 0.6);
	border: 1px solid rgba(0, 80, 203, 0.2);
	color: $primary;
}

.btn-feedback.active-filter {
	background: rgba(0, 80, 203, 0.1);
	border-color: $primary;
}

.btn-primary {
	background: $primary;
	color: #fff;
	box-shadow: 0 8rpx 16rpx rgba(0, 80, 203, 0.2);
}

.no-scrollbar::-webkit-scrollbar {
	display: none;
}

.timeline-container {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
	padding-bottom: 40rpx;
}

.letter-card {
	background-color: #ffffff;
	border-radius: 16rpx;
	box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.05);
	position: relative;
	overflow: hidden;
	padding: 32rpx 32rpx;
	border: 1px solid #e2e8f0;
	background-image: repeating-linear-gradient(transparent, transparent 62rpx, rgba(0, 0, 0, 0.03) 62rpx, rgba(0, 0, 0, 0.03) 64rpx);
}

.letter-card.faded {
	opacity: 0.8;
}

.status-stamp {
	position: absolute;
	top: 24rpx;
	right: 24rpx;
	font-size: 28rpx;
	font-weight: 900;
	padding: 4rpx 16rpx;
	border: 4rpx solid;
	border-radius: 8rpx;
	transform: rotate(15deg);
	letter-spacing: 4rpx;
	z-index: 10;
	opacity: 0.8;
	pointer-events: none;
}

.stamp-0 {
	color: #e11d48;
	border-color: #e11d48;
}

.stamp-1 {
	color: #0050cb;
	border-color: #0050cb;
}

.stamp-2 {
	color: #475569;
	border-color: #475569;
	transform: rotate(0deg);
	opacity: 0.5;
}

.stamp-3 {
	color: #ea580c;
	border-color: #ea580c;
}

.letter-title {
	font-size: 32rpx;
	font-weight: 800;
	color: #0f172a;
	margin-bottom: 24rpx;
	padding-right: 120rpx;
	line-height: 1.4;
}

.letter-meta-grid {
	display: grid;
	grid-template-columns: 1fr;
	background: #ffffff;
	border: 1px solid #e2e8f0;
	border-radius: 12rpx;
	overflow: hidden;
}

.meta-item {
	display: flex;
	align-items: flex-start;
	font-size: 24rpx;
	line-height: 1.5;
	padding: 12rpx 16rpx;
	border-bottom: 1px solid #f1f5f9;
}

.meta-item:last-child {
	border-bottom: none;
}

.m-label {
	color: #64748b;
	width: 130rpx;
	flex-shrink: 0;
}

.m-value {
	color: #1e293b;
	font-weight: 500;
	flex: 1;
}

.font-bold {
	font-weight: 700;
}

.text-danger {
	color: #dc2626;
}

.text-primary {
	color: #0050cb;
}

.highlight-unit {
	color: #0f172a;
	font-weight: 700;
	text-decoration: underline;
	text-decoration-color: #cbd5e1;
	text-underline-offset: 4rpx;
}

.letter-divider {
	height: 0;
	border-bottom: 2rpx dashed #cbd5e1;
	margin: 24rpx 0;
}

.letter-body {
	margin-bottom: 24rpx;
}

.body-label {
	font-size: 26rpx;
	font-weight: 800;
	color: #334155;
	margin-bottom: 8rpx;
	margin-left: -12rpx;
}

.body-content {
	font-size: 26rpx;
	color: #334155;
	line-height: 1.6;
}

.letter-images {
	display: flex;
	flex-wrap: wrap;
	gap: 12rpx;
	margin-top: 16rpx;
}

.l-img {
	width: 140rpx;
	height: 140rpx;
	border-radius: 8rpx;
	border: 1px solid #e2e8f0;
	background-color: #f8fafc;
}

.letter-reply {
	background-color: rgba(239, 246, 255, 0.6);
	border: 1px solid #bfdbfe;
	border-radius: 12rpx;
	padding: 24rpx;
	margin-top: 40rpx;
	position: relative;
}

.reply-badge {
	display: inline-flex;
	align-items: center;
	gap: 8rpx;
	background-color: #dbeafe;
	color: #1d4ed8;
	padding: 4rpx 16rpx;
	border-radius: 8rpx;
	font-size: 24rpx;
	font-weight: 700;
	margin-bottom: 16rpx;

	.icon-reply {
		font-size: 32rpx;
	}
}

.reply-content {
	font-size: 28rpx;
	color: #1e293b;
	line-height: 1.6;
	font-weight: 500;
}

.reply-meta {
	text-align: right;
	font-size: 22rpx;
	color: #64748b;
	margin-top: 16rpx;
}

@font-face {
	font-family: 'Material Symbols Outlined';
	font-style: normal;
	font-weight: 400;
	font-display: block;
	src: url("https://fonts.gstatic.com/s/materialsymbolsoutlined/v323/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzazHD_dY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDCvHOem.ttf") format('truetype');
}

.material-symbols-outlined {
	font-family: 'Material Symbols Outlined';
	font-weight: normal;
	font-style: normal;
	font-size: 48rpx;
	line-height: 1;
	letter-spacing: normal;
	text-transform: none;
	display: inline-block;
	white-space: nowrap;
	word-wrap: normal;
	direction: ltr;
	font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
