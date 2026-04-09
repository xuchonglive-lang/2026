<template>
	<view class="app page-container grid-texture">
		<!-- 页面内容主体 -->
		<view class="main-content">
			<!-- Hero Glass Card -->
			<view class="glass-card hero-card" hover-class="card-hover">
				<view class="hero-content">
					<text class="hero-subtitle">Critical Control Points</text>
					<text class="hero-title">本班待反馈重控点位</text>
					<view class="hero-number-wrap">
						<text class="hero-number">12</text>
						<text class="hero-unit">个</text>
					</view>
				</view>
				<view class="hero-bg-icon">
					<u-icon name="clock" color="rgba(0,0,0,0.05)" size="200"></u-icon>
				</view>
				<view class="hero-footer">
					<text class="hero-action-text">立即处理反馈</text>
					<u-icon name="arrow-right" color="#0050cb" size="24"></u-icon>
				</view>
			</view>

			<!-- Bento Grid Dashboard -->
			<view class="bento-grid">
				<!-- Inspection Card -->
				<view class="glass-card bento-card">
					<view class="icon-wrap bg-primary-light">
						<u-icon name="file-text" color="#0050cb" size="40"></u-icon>
					</view>
					<text class="bento-subtitle">Inspection</text>
					<text class="bento-title">重点项目反馈</text>
					<view class="bento-badge text-primary">5项待反馈</view>
				</view>

				<!-- Analysis Card -->
				<view class="glass-card bento-card">
					<view class="icon-wrap bg-tertiary-light">
						<u-icon name="podium" color="#a33200" size="40"></u-icon>
					</view>
					<text class="bento-subtitle">Analysis</text>
					<text class="bento-title">计划执行反馈</text>
					<view class="bento-badge text-tertiary">8项待反馈</view>
				</view>

				<!-- Task List Card (专业信息告知) -->
				<view class="glass-card list-card span-2">
					<view class="list-header" @tap="navToInfo">
						<text class="list-title">专业信息告知</text>
						<view class="list-more">
							<text>更多</text>
							<u-icon name="arrow-right" size="20"></u-icon>
						</view>
					</view>
					<view class="list-body">
						<view class="list-item">
							<u-icon name="file-text" color="#0050cb" size="40"></u-icon>
							<view class="item-content">
								<text class="item-title u-line-1">2024年度文明生产标准化评估指南发布</text>
								<view class="item-desc">
									<text>2小时前 · 管理部</text>
									<text class="item-tag bg-blue-sub text-primary">政策发布</text>
								</view>
							</view>
							<u-icon name="arrow-right" color="#94a3b8" size="24"></u-icon>
						</view>
						<view class="list-item">
							<u-icon name="volume" color="#0050cb" size="40"></u-icon>
							<view class="item-content">
								<text class="item-title u-line-1">关于开展夏季高温作业安全检查的通知</text>
								<view class="item-desc">
									<text>昨天 · 安全办</text>
									<text class="item-tag bg-orange-sub text-orange">安全通知</text>
								</view>
							</view>
							<u-icon name="arrow-right" color="#94a3b8" size="24"></u-icon>
						</view>
					</view>
				</view>

				<!-- Task List Card (现场问题公示) -->
				<view class="glass-card list-card span-2">
					<view class="list-header">
						<text class="list-title">现场问题公示</text>
						<view class="list-more">
							<text>更多</text>
							<u-icon name="arrow-right" size="20"></u-icon>
						</view>
					</view>
					<view class="list-body">
						<view class="list-item">
							<u-icon name="warning" color="#a33200" size="40"></u-icon>
							<view class="item-content">
								<text class="item-title u-line-1">A区照明灯具老化，亮度不足</text>
								<view class="item-desc">
									<text>4小时前 · 匿名</text>
									<text class="item-tag bg-amber-sub text-amber">进行中</text>
								</view>
							</view>
							<u-icon name="arrow-right" color="#94a3b8" size="24"></u-icon>
						</view>
						<view class="list-item">
							<u-icon name="scan" color="#15803d" size="40"></u-icon>
							<view class="item-content">
								<text class="item-title u-line-1">B2通道地面湿滑，已设置警示牌</text>
								<view class="item-desc">
									<text>6小时前 · 匿名</text>
									<text class="item-tag bg-green-sub text-green">已解决</text>
								</view>
							</view>
							<u-icon name="arrow-right" color="#94a3b8" size="24"></u-icon>
						</view>
					</view>
				</view>
			</view>

			<!-- Featured Image -->
			<view class="featured-img-wrap">
				<image class="featured-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnIPzTjOGboSZXQIlc9JIttv3jspQIx95fexT45emZ3wSID4jHfidLtKyrwc89I8vrvraW2bo8tLJhihpO8ZHqRV3bQhFTtc-vuENeYRoy1t4ixHYD5bSPSi2rp1yAwaTrNcj8oc5K9M81m6XSUi5JuM5tNIMOnrOmZWfBnuULFx_rSlhuK11JQErj2oJ77n6VGp8l2pM_ovYT-MDx8YgIaAwmk9B7fAHTFOzqNlCwc1boVvIzdC1yK4QBHmnruHvl2WQ75NvwFWg" mode="aspectFill"></image>
				<view class="featured-mask">
					<text class="featured-subtitle">Factory Environment Monitor</text>
					<text class="featured-title">数字化文明生产车间</text>
				</view>
			</view>
		</view>

		<my-tab-bar :current="0"></my-tab-bar>
	</view>
</template>

<script>
	let vk = uni.vk;
	export default {
		data() {
			return {
				data: {},
			};
		},
		onLoad(options = {}) {
			vk = uni.vk;
			this.options = options;
			this.init(options);
		},
		methods: {
			init(options = {}) {
				// 业务初始化
			},
			navToInfo() {
				uni.switchTab({ url: '/pages/info/index' });
			}
		}
	};
</script>

<style lang="scss" scoped>
	/* 字体和全局背景 */
	.page-container {
		font-family: 'Inter', sans-serif;
		background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
		min-height: 100vh;
		padding-bottom: 240rpx; /* 留出版权底垫和可能存在的 tabbar 空间 */
	}

	.grid-texture {
		background-image: radial-gradient(rgba(0, 80, 203, 0.05) 1px, transparent 1px);
		background-size: 40rpx 40rpx;
	}

	/* 拟物态卡片核心 */
	.glass-card {
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08);
		border-radius: 24rpx;
	}
	.card-hover {
		transform: scale(0.98);
		transition: transform 0.3s ease;
	}

	/* 主区域修饰 */
	.main-content {
		padding-top: 30rpx; /* 移除 fixed header 后恢复正常边距 */
		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	/* Hero Card */
	.hero-card {
		padding: 40rpx;
		position: relative;
		overflow: hidden;
		margin-bottom: 30rpx;

		.hero-content {
			position: relative;
			z-index: 10;
			display: flex;
			flex-direction: column;

			.hero-subtitle {
				font-size: 20rpx;
				font-weight: 600;
				text-transform: uppercase;
				letter-spacing: 4rpx;
				color: rgba(0, 80, 203, 0.7);
			}

			.hero-title {
				font-size: 34rpx;
				font-weight: bold;
				color: #191c1e;
				margin-top: 10rpx;
			}

			.hero-number-wrap {
				display: flex;
				align-items: baseline;
				gap: 10rpx;
				margin-top: 20rpx;

				.hero-number {
					font-size: 96rpx;
					font-weight: 800;
					color: #0050cb;
					letter-spacing: -2rpx;
				}

				.hero-unit {
					font-size: 32rpx;
					font-weight: 500;
					color: #424656;
				}
			}
		}

		.hero-bg-icon {
			position: absolute;
			right: -30rpx;
			bottom: -30rpx;
			opacity: 0.1;
			z-index: 1;
		}

		.hero-footer {
			margin-top: 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-top: 1px solid rgba(255, 255, 255, 0.2);
			padding-top: 30rpx;
			position: relative;
			z-index: 10;

			.hero-action-text {
				font-size: 28rpx;
				font-weight: 500;
				color: #0050cb;
			}
		}
	}

	/* Bento Grid */
	.bento-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 30rpx;
		margin-bottom: 30rpx;
	}

	.bento-card {
		padding: 30rpx;
		display: flex;
		flex-direction: column;

		.icon-wrap {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 20rpx;
			&.bg-primary-light { background: rgba(155, 180, 254, 0.3); }
			&.bg-tertiary-light { background: rgba(204, 66, 4, 0.2); }
		}

		.bento-subtitle {
			font-size: 20rpx;
			text-transform: uppercase;
			letter-spacing: 2rpx;
			font-weight: bold;
			color: #424656;
		}

		.bento-title {
			font-size: 28rpx;
			font-weight: bold;
			color: #191c1e;
			margin-top: 10rpx;
		}

		.bento-badge {
			margin-top: 16rpx;
			display: inline-block;
			align-self: flex-start;
			padding: 4rpx 16rpx;
			font-size: 20rpx;
			font-weight: bold;
			border-radius: 20rpx;
			&.text-primary { background: rgba(0, 80, 203, 0.1); color: #0050cb; }
			&.text-tertiary { background: rgba(163, 50, 0, 0.1); color: #a33200; }
		}
	}

	.span-2 { grid-column: span 2; }

	/* List Cards */
	.list-card {
		padding: 30rpx;
		
		.list-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 24rpx;

			.list-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #191c1e;
			}

			.list-more {
				display: flex;
				align-items: center;
				color: rgba(0, 80, 203, 0.8);
				font-size: 24rpx;
				font-weight: 600;
			}
		}

		.list-body {
			display: flex;
			flex-direction: column;
			gap: 20rpx;

			.list-item {
				display: flex;
				align-items: center;
				gap: 24rpx;
				padding: 20rpx;
				background: rgba(255, 255, 255, 0.4);
				border-radius: 16rpx;

				.item-content {
					flex: 1;

					.item-title {
						font-size: 26rpx;
						font-weight: bold;
						color: #191c1e;
					}

					.item-desc {
						display: flex;
						align-items: center;
						font-size: 22rpx;
						color: #424656;
						margin-top: 8rpx;

						.item-tag {
							margin-left: 16rpx;
							padding: 4rpx 12rpx;
							border-radius: 8rpx;
							font-size: 20rpx;
							font-weight: bold;
							&.bg-blue-sub { background: rgba(219, 234, 254, 0.5); }
							&.text-primary { color: #0050cb; }
							&.bg-orange-sub { background: rgba(255, 237, 213, 0.5); }
							&.text-orange { color: #ea580c; }
							&.bg-amber-sub { background: rgba(254, 243, 199, 0.5); }
							&.text-amber { color: #b45309; }
							&.bg-green-sub { background: rgba(220, 252, 231, 0.5); }
							&.text-green { color: #15803d; }
						}
					}
				}
			}
		}
	}

	/* Featured Image Area */
	.featured-img-wrap {
		margin-top: 10rpx;
		height: 320rpx;
		border-radius: 24rpx;
		position: relative;
		overflow: hidden;

		.featured-img {
			width: 100%;
			height: 100%;
		}

		.featured-mask {
			position: absolute;
			inset: 0;
			background: linear-gradient(to top, rgba(30, 58, 138, 0.8), transparent);
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			padding: 30rpx;

			.featured-subtitle {
				font-size: 22rpx;
				color: rgba(255, 255, 255, 0.8);
				font-weight: 500;
			}

			.featured-title {
				font-size: 32rpx;
				color: #fff;
				font-weight: bold;
				margin-top: 8rpx;
			}
		}
	}
</style>
