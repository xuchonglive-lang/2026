<template>
	<view class="page-container industrial-grid">
		<view class="main-content">
			<!-- Header -->
			<view class="header-section">
				<text class="title">报备公示</text>
				<text class="subtitle">实时追踪反馈，透明化管理流程</text>
			</view>

			<!-- Filter Chips -->
			<view class="filter-row no-scrollbar">
				<view class="chip" :class="{active: statusFilter === -1}" @tap="changeTab(-1)">全部反馈</view>
				<view class="chip" :class="{active: statusFilter === 0}" @tap="changeTab(0)">待处理</view>
				<view class="chip" :class="{active: statusFilter === 1}" @tap="changeTab(1)">处理中</view>
				<view class="chip" :class="{active: statusFilter === 2}" @tap="changeTab(2)">已结案</view>
			</view>

			<!-- Timeline List -->
			<view class="timeline-container">
				<view class="timeline-item" v-for="(item, index) in dataList" :key="item._id">
					<view class="tl-line" :class="{'line-faded': item.status === 2}"></view>
					<view class="tl-dot" :class="{'dot-inactive': item.status === 2}"></view>
					<view class="tl-time" :class="{'text-faded': item.status === 2}">{{ formatTime(item._add_time) }}</view>
					
					<view class="glass-card tl-card" :class="{'fade-card': item.status === 2}">
						<view class="tl-header">
							<view class="icon-wrap bg-secondary">
								<text class="material-symbols-outlined icon-sec">warning</text>
							</view>
							<view class="title-wrap">
								<text class="tl-title">{{ item.title }}</text>
								<view class="tags">
									<text class="tag tag-danger" v-if="item.urgency === 1">紧急</text>
									<text class="tag tag-normal" v-else>常规</text>
									
									<text class="tag tag-primary" v-if="item.status === 1">处理中</text>
									<text class="tag tag-closed" v-else-if="item.status === 2">已结案</text>
									<text class="tag tag-normal" style="color: #e11d48; background-color: rgba(225, 29, 72, 0.1); border-color: rgba(225, 29, 72, 0.2);" v-else>待处理</text>
								</view>
							</view>
						</view>
						
						<view class="tl-desc">
							<u-parse :html="item.content"></u-parse>
						</view>
						
						<!-- Images -->
						<view class="tl-images" v-if="item.images && item.images.length > 0">
							<image v-for="(img, imgIdx) in item.images" :key="imgIdx" class="tl-img" mode="aspectFill" :src="img"></image>
						</view>

						<!-- Reply Box -->
						<view class="reply-box" v-if="item.reply_content">
							<view class="reply-header">
								<text class="material-symbols-outlined icon-success" v-if="item.status === 2">check_circle</text>
								<text class="material-symbols-outlined icon-reply" v-else>forum</text>
								<text class="reply-title">{{item.status === 2 ? '处理结果' : '管理部回复'}}</text>
							</view>
							<view class="reply-content">
								{{ item.reply_content }}
							</view>
							<view class="reply-meta">回复时间: {{ formatTime(item.reply_time) }}</view>
						</view>
					</view>
				</view>
				
				<view style="text-align: center; color: #727687; font-size: 24rpx; padding: 40rpx 0;" v-if="!hasMore && dataList.length > 0">
					没有更多记录了
				</view>
				<view style="text-align: center; color: #727687; font-size: 24rpx; padding: 100rpx 0;" v-if="dataList.length === 0">
					暂无公示记录
				</view>
			</view>
		</view>

		<my-tab-bar :current="1" />
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
			hasMore: true,
			statusFilter: -1
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
			
			let whereJson = {};
			if (this.statusFilter !== -1) {
				whereJson.status = this.statusFilter;
			}
			
			let res = await vk.callFunction({
				url: 'client/report/kh/getPublicList',
				data: {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					whereJson
				}
			});
			
			let list = res.rows || [];
			this.dataList = this.dataList.concat(list);
			this.hasMore = list.length >= this.pageSize;
		},
		changeTab(status) {
			this.statusFilter = status;
			this.getList(1);
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
	padding-top: 64rpx;
	padding-left: 32rpx;
	padding-right: 32rpx;
	max-width: 1344rpx;
	margin: 0 auto;
}

.header-section {
	margin-bottom: 48rpx;
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

.filter-row {
	display: flex;
	gap: 16rpx;
	margin-bottom: 48rpx;
	overflow-x: auto;
	padding-bottom: 8rpx;
	
	.chip {
		padding: 16rpx 32rpx;
		border-radius: 9999px;
		background-color: rgba(255, 255, 255, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.4);
		color: $on-surface-variant;
		font-size: 24rpx;
		font-weight: 500;
		white-space: nowrap;
		
		&.active {
			background-color: $primary-container;
			color: $on-primary;
			font-weight: 600;
			border: none;
			box-shadow: 0 8rpx 32rpx 0 rgba(0, 102, 255, 0.2);
		}
	}
}

.no-scrollbar::-webkit-scrollbar {
	display: none;
}

.timeline-container {
	display: flex;
	flex-direction: column;
	gap: 32rpx;
}

.timeline-item {
	position: relative;
	padding-left: 48rpx;
}

.tl-line {
	position: absolute;
	left: 0;
	top: 0;
	bottom: -32rpx;
	width: 2px;
	background-color: $primary-fixed;
	
	&.line-faded {
		opacity: 0.5;
	}
}

.tl-dot {
	position: absolute;
	left: -6rpx;
	top: 16rpx;
	width: 16rpx;
	height: 16rpx;
	border-radius: 50%;
	background-color: $primary;
	box-shadow: 0 0 0 8rpx #ffffff;
	
	&.dot-inactive {
		background-color: $outline;
	}
}

.tl-time {
	font-size: 22rpx;
	font-family: 'Manrope', sans-serif;
	font-weight: 800;
	color: $primary;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	margin-bottom: 16rpx;
	
	&.text-faded {
		color: $outline;
	}
}

.glass-card {
	background: rgba(255, 255, 255, 0.25);
	backdrop-filter: blur(20px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.05);
	border-radius: 24rpx;
}

.tl-card {
	padding: 32rpx;
	transition: all 0.3s;
	
	&:active {
		transform: scale(0.99);
	}
	
	&.fade-card {
		opacity: 0.8;
	}
}

.tl-header {
	display: flex;
	align-items: flex-start;
	gap: 24rpx;
	margin-bottom: 24rpx;
	
	.icon-wrap {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(155, 180, 254, 0.2); // secondary-container/20
		flex-shrink: 0;
		
		.icon-sec {
			color: $primary;
		}
	}
	
	.tl-title {
		font-size: 28rpx;
		font-weight: 700;
		color: $on-surface;
	}
}

.tags {
	display: flex;
	gap: 16rpx;
	margin-top: 8rpx;
	
	.tag {
		padding: 4rpx 16rpx;
		border-radius: 9999px;
		font-size: 20rpx;
		font-weight: 700;
		
		&.tag-danger {
			background-color: rgba(204, 66, 4, 0.1); 
			color: #cc4204;
			border: 1px solid rgba(204, 66, 4, 0.2);
		}
		&.tag-primary {
			background-color: $primary-fixed;
			color: $primary;
		}
		&.tag-normal {
			background-color: rgba(155, 180, 254, 0.2);
			color: #294487;
			border: 1px solid rgba(155, 180, 254, 0.3);
		}
		&.tag-closed {
			background-color: $surface-container-highest;
			color: $on-surface-variant;
		}
	}
}

.tl-desc {
	font-size: 24rpx;
	color: $on-surface-variant;
	line-height: 1.6;
	margin-bottom: 32rpx;
}

.tl-images {
	display: flex;
	gap: 16rpx;
	margin-bottom: 32rpx;
	
	.tl-img {
		width: 128rpx;
		height: 128rpx;
		border-radius: 16rpx;
		border: 1px solid rgba(255, 255, 255, 0.4);
	}
}

.reply-box {
	padding: 24rpx;
	background-color: $surface-container-low;
	border-radius: 16rpx;
	border: 1px solid rgba(255, 255, 255, 0.6);
	
	.reply-header {
		display: flex;
		align-items: center;
		gap: 16rpx;
		margin-bottom: 16rpx;
		
		.icon-reply {
			color: $primary;
			font-size: 28rpx;
		}
		.icon-success {
			color: #059669; // emerald-600 approx for check_circle
			font-size: 28rpx;
		}
		
		.reply-title {
			font-size: 20rpx;
			font-weight: 700;
			color: $on-surface-variant;
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}
	}
	
	.reply-content {
		font-size: 24rpx;
		color: $on-surface;
		line-height: 1.6;
	}
	
	.reply-meta {
		margin-top: 16rpx;
		font-size: 20rpx;
		color: $on-surface-variant;
		text-align: right;
	}
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
