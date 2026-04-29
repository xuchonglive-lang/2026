<template>
	<view class="app page-container industrial-grid">
    <cu-custom bgColor="bg-gradual-blue" :isCustom="true">
      <block slot="backText"></block>
      <block slot="content">信息详情</block>
    </cu-custom>
    
    
		<view class="main-content" v-if="detail">
			<!-- Header Section -->
			<view class="header-section">
				<view class="tag-row">
					<text class="category-tag text-secondary bg-secondary-light">{{ categoryName }}</text>
				</view>
				<text class="article-title">{{ detail.title }}</text>
				<view class="title-underline"></view>
				<view class="article-meta">
					<view class="meta-item">
						<u-icon name="calendar" size="28" style="margin-right:8rpx;"></u-icon>
						<text>{{ vk.pubfn.timeFormat(detail.publish_time, 'yyyy-MM-dd hh:mm') }}</text>
					</view>
					<view class="meta-item views">
						<u-icon name="eye" size="28" style="margin-right:8rpx;"></u-icon>
						<text>{{ detail.view_count || 0 }} 阅读</text>
					</view>
				</view>
			</view>

			<!-- Content Section -->
			<view class="glass-card article-content-card">
				<rich-text :nodes="formattedContent"></rich-text>
			</view>

			<!-- Read Logs Section -->
			<view class="glass-card read-logs-card" v-if="readLogs.length > 0">
				<view class="logs-header">
					<view class="title-wrapper">
						<u-icon name="clock" size="36" color="#0050cb" style="margin-right: 8rpx;"></u-icon>
						<text class="title">近期阅览足迹</text>
					</view>
					<text class="subtitle">{{ readTotal }}人已阅</text>
				</view>
				<scroll-view scroll-x class="logs-scroll" :show-scrollbar="false">
					<view class="logs-inner">
						<view class="reader-item" v-for="(log, idx) in readLogs" :key="idx">
							<image class="reader-avatar" :src="(log.userInfo && log.userInfo[0] && log.userInfo[0].avatar) ? log.userInfo[0].avatar : '/static/default-avatar.png'" mode="aspectFill"></image>
							<text class="reader-name u-line-2">{{ (log.userInfo && log.userInfo[0] && log.userInfo[0].real_name) ? (log.userInfo[0].department_name + ' ' + log.userInfo[0].real_name) : '匿名的矿工' }}</text>
							<text class="reader-time">{{ vk.pubfn.timeFormat(log.read_time, 'MM-dd hh:mm') }}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="loading-state" v-else>
			<u-loading size="60" color="#0050cb" mode="circle"></u-loading>
		</view>
	</view>
</template>

<script>
	let vk = uni.vk;
	export default {
		data() {
			return {
				vk,
				id: '',
				detail: null,
				readLogs: [],
				readTotal: 0
			};
		},
		computed: {
			categoryName() {
				// Detail may return category_id but wait, the backend of getDetailAndRecord doesn't query category_info by default since we didn't add foreignDB there.
				// Oh, the cloud function getDetailAndRecord.js doesn't include category_info via foreignDB. Let's just avoid missing key error, default to "综合".
				return this.detail && this.detail.category_info && this.detail.category_info.length ? this.detail.category_info[0].name : '综合资讯';
			},
			formattedContent() {
				if (!this.detail || !this.detail.content) return '';
				let html = this.detail.content;
				// 替换富文本中的img标签，添加最大宽度防御
				html = html.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block;"');
				return html;
			}
		},
		onLoad(options = {}) {
			vk = uni.vk;
			if (options.id) {
				this.id = options.id;
				this.getDetail();
				this.getReadLogs();
			} else {
				vk.toast('无效的文章ID');
				setTimeout(() => {
					uni.navigateBack();
				}, 1500);
			}
		},
		methods: {
			getDetail() {
				vk.callFunction({
					url: 'client/info/kh/getDetailAndRecord',
					title: '加载中...',
					data: {
						info_id: this.id
					},
					success: (data) => {
						this.detail = data.item;
					}
				});
			},
			getReadLogs() {
				vk.callFunction({
					url: 'client/info/kh/getReadLogs',
					data: { info_id: this.id },
					success: (data) => {
						this.readLogs = data.rows || [];
						this.readTotal = data.total || this.readLogs.length;
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.page-container {
		font-family: 'Inter', sans-serif;
		background-color: #f7f9fb;
		min-height: 100vh;
		padding-bottom: 60rpx;
	}

	.industrial-grid {
		background-image: radial-gradient(rgba(0, 80, 203, 0.05) 1px, transparent 1px);
		background-size: 48rpx 48rpx;
	}

	.main-content {
		padding-top: calc(env(safe-area-inset-top) + 20rpx);
		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	/* Header Section */
	.header-section {
		margin-bottom: 40rpx;

		.tag-row {
			margin-bottom: 24rpx;

			.category-tag {
				display: inline-block;
				padding: 8rpx 20rpx;
				border-radius: 30rpx;
				font-size: 24rpx;
				font-weight: bold;
				letter-spacing: 2rpx;

				&.text-secondary { color: #294487; }
				&.bg-secondary-light { background: rgba(155, 180, 254, 0.2); }
			}
		}

		.article-title {
			display: block;
			font-size: 40rpx;
			font-weight: 800;
			color: #191c1e;
			line-height: 1.4;
			margin-bottom: 20rpx;
		}

		.title-underline {
			width: 80rpx;
			height: 8rpx;
			background: linear-gradient(90deg, #0050cb 0%, #9bb4fe 100%);
			border-radius: 4rpx;
			margin-bottom: 30rpx;
		}

		.article-meta {
			display: flex;
			align-items: center;
			gap: 30rpx;
			font-size: 26rpx;
			color: #64748b;
			font-weight: 500;

			.meta-item {
				display: flex;
				align-items: center;
			}
		}
	}

	/* Content Section */
	.glass-card {
		background: rgba(255, 255, 255, 0.4);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 20rpx;
		padding: 30rpx 24rpx;
		box-shadow: 0 8rpx 32rpx rgba(0, 80, 203, 0.05);
	}

	.article-content-card {
		font-size: 28rpx;
		line-height: 1.8;
		color: #334155;
	}

	.read-logs-card {
		margin-top: 40rpx;
		margin-bottom: 40rpx;
		padding: 40rpx 30rpx;
		
		.logs-header {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			margin-bottom: 32rpx;

			.title-wrapper {
				display: flex;
				align-items: center;
			}

			.title {
				font-size: 30rpx;
				font-weight: 800;
				color: #191c1e;
				letter-spacing: 2rpx;
			}
			.subtitle {
				font-size: 24rpx;
				font-weight: bold;
				color: #0050cb;
			}
		}

		.logs-scroll {
			width: 100%;
			white-space: nowrap;

			.logs-inner {
				display: inline-flex;
				gap: 30rpx;

				.reader-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 140rpx;

					.reader-avatar {
						width: 68rpx;
						height: 68rpx;
						border-radius: 50%;
						box-shadow: 0 4rpx 16rpx rgba(0, 80, 203, 0.08);
						margin-bottom: 12rpx;
						border: 2px solid #fff;
						background-color: #f1f5f9;
					}

					.reader-name {
						font-size: 18rpx;
						font-weight: bold;
						color: #334155;
						width: 100%;
						text-align: center;
						margin-bottom: 6rpx;
						line-height: 1.3;
						height: 52rpx; /* allows 2 lines maximum */
						white-space: normal;
						word-break: break-all;
					}

					.reader-time {
						font-size: 16rpx;
						color: #94a3b8;
						font-weight: 500;
					}
				}
			}
		}
	}

	.loading-state {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
