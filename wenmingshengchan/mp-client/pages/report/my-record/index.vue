<template>
	<view class="page-container industrial-grid">
    <cu-custom bgColor="bg-gradual-blue" :isCustom="true">
      <block slot="backText"></block>
      <block slot="content">提交记录</block>
    </cu-custom>
    
    
		<view class="main-content">
			<!-- Page Header -->
			<view class="header-section">
				<text class="title">我的报备记录</text>
				<text class="subtitle">历史反馈追踪与闭环管理</text>
			</view>

			<view class="list-section">
				<!-- Record Card -->
				<view class="glass-card record-card" v-for="(item, index) in dataList" :key="item._id">
					<view class="card-header">
						<text class="record-title">{{ item.title }}</text>
						<view class="status-chip pending" v-if="item.status === 0">
							<view class="dot"></view>
							<text>待处理</text>
						</view>
						<view class="status-chip" style="background-color: #dae1ff; color: #0050cb;" v-else-if="item.status === 1">
							<view class="dot" style="background-color: #0050cb;"></view>
							<text>处理中</text>
						</view>
						<view class="status-chip" style="background-color: #e0e3e5; color: #424656;" v-else-if="item.status === 2">
							<view class="dot" style="background-color: #424656;"></view>
							<text>已结案</text>
						</view>
						<view class="status-chip" style="background-color: #fce4e4; color: #cc4204;" v-else-if="item.status === 3">
							<view class="dot" style="background-color: #cc4204;"></view>
							<text>已驳回</text>
						</view>
					</view>
					
					<view class="record-desc">
						<u-parse :html="item.content"></u-parse>
					</view>

					<view class="card-footer">
						<view class="footer-item">
							<text class="material-symbols-outlined icon-sm">schedule</text>
							<text class="footer-text">{{ formatTime(item._add_time) }}</text>
						</view>
						<view class="footer-item">
							<text class="material-symbols-outlined icon-sm">{{ item.is_anonymous ? 'visibility_off' : 'visibility' }}</text>
							<text class="footer-text">{{ item.is_anonymous ? '匿名' : '实名' }}</text>
						</view>
						<view class="footer-item" v-if="item.urgency === 1">
							<text class="material-symbols-outlined icon-sm" style="color: #cc4204;">priority_high</text>
							<text class="footer-text" style="color: #cc4204;">紧急</text>
						</view>
					</view>
					<!-- <text class="material-symbols-outlined arrow-icon">chevron_right</text> -->
				</view>
				
				<view style="text-align: center; color: #727687; font-size: 24rpx; padding: 40rpx 0;" v-if="!hasMore && dataList.length > 0">
					没有更多记录了
				</view>
				<view style="text-align: center; color: #727687; font-size: 24rpx; padding: 100rpx 0;" v-if="dataList.length === 0">
					暂无报备记录
				</view>
			</view>
		</view>

		<!-- Bottom Tab Bar -->
		<my-tab-bar :current="4" />
	</view>
</template>

<script>
let vk = uni.vk;
export default {
	data() {
		return {
			dataList: [],
			pageIndex: 1,
			pageSize: 10,
			hasMore: true
		}
	},
	onLoad() {
		vk = uni.vk;
		this.getList(1);
	},
	onPullDownRefresh() {
		this.getList(1);
		setTimeout(() => { uni.stopPullDownRefresh(); }, 1000);
	},
	onReachBottom() {
		if (this.hasMore) {
			this.getList(this.pageIndex + 1);
		}
	},
	methods: {
		async getList(pageIndex = 1) {
			if (pageIndex === 1) {
				this.dataList = [];
			}
			this.pageIndex = pageIndex;
			
			let res = await vk.callFunction({
				url: 'client/report/kh/getMyIssues',
				data: {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}
			});
			
			let list = res.rows || [];
			this.dataList = this.dataList.concat(list);
			this.hasMore = list.length >= this.pageSize;
		},
		formatTime(timeStr) {
			if(!timeStr) return '';
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
$primary-container: #0066ff;

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
	padding-top: 96rpx;
	padding-left: 48rpx;
	padding-right: 48rpx;
	max-width: 1344rpx;
	margin: 0 auto;
}

.header-section {
	margin-bottom: 64rpx;
	display: flex;
	flex-direction: column;
	
	.title {
		font-size: 48rpx;
		font-family: 'Manrope', sans-serif;
		font-weight: 800;
		color: $on-surface;
		letter-spacing: -0.025em;
	}
	.subtitle {
		color: $on-surface-variant;
		font-size: 28rpx;
		margin-top: 8rpx;
	}
}

.list-section {
	display: flex;
	flex-direction: column;
	gap: 32rpx;
}

.glass-card {
	background: rgba(255, 255, 255, 0.25);
	backdrop-filter: blur(20px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08);
	border-radius: 24rpx;
}

.record-card {
	padding: 40rpx;
	position: relative;
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 16rpx;
	/* padding-right: 40rpx; Space for arrow */
}

.record-title {
	font-size: 32rpx;
	font-weight: 700;
	color: $on-surface;
}

.status-chip {
	display: flex;
	align-items: center;
	padding: 8rpx 16rpx;
	border-radius: 9999px;
	font-size: 20rpx;
	font-weight: 600;
	gap: 8rpx;
	flex-shrink: 0;
	
	.dot {
		width: 8rpx;
		height: 8rpx;
		border-radius: 50%;
	}
	
	&.pending {
		background-color: rgba(225, 29, 72, 0.1); 
		color: #e11d48;
		.dot { background-color: #e11d48; }
	}
}

.record-desc {
	font-size: 26rpx;
	color: $on-surface-variant;
	line-height: 1.5;
	margin-bottom: 32rpx;
	/* padding-right: 40rpx; */
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}

.card-footer {
	display: flex;
	flex-wrap: wrap;
	gap: 32rpx;
	border-top: 1px solid rgba(0, 80, 203, 0.05);
	padding-top: 24rpx;
}

.footer-item {
	display: flex;
	align-items: center;
	gap: 8rpx;
	color: $outline;
	
	.icon-sm {
		font-size: 32rpx;
	}
	
	.footer-text {
		font-size: 24rpx;
	}
}

.arrow-icon {
	position: absolute;
	right: 32rpx;
	top: 50%;
	transform: translateY(-50%);
	color: $outline;
	font-size: 48rpx;
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
