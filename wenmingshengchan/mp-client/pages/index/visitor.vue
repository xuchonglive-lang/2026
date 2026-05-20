<template>
	<view class="app page-container industrial-grid">
		<!-- Custom Navigation Bar -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">文明生产管理系统</block>
		</cu-custom>

		<!-- Hero Section / Branding -->
		<view class="hero-section">
			<view class="hero-card glass-card">
				<view class="brand-info">
					<view class="logo-box">
						<u-icon name="grid-fill" color="#ffffff" size="48"></u-icon>
					</view>
					<view class="text-box">
						<text class="brand-name">优秀的管理工具</text>
						<text class="brand-tagline">TECHNICAL MINIMALISM • PRECISION</text>
					</view>
				</view>
				<view class="hero-stats">
					<view class="stat-item">
						<text class="stat-num">SAFE</text>
						<text class="stat-label">安全可靠</text>
					</view>
					<view class="stat-divider"></view>
					<view class="stat-item">
						<text class="stat-num">FAST</text>
						<text class="stat-label">实时响应</text>
					</view>
				</view>
			</view>
		</view>

		<!-- Main Bento Grid -->
		<view class="main-content">
			<view class="section-title">
				<view class="title-left">
					<view class="blue-block"></view>
					<text>核心功能模块</text>
				</view>
				<u-icon name="arrow-right" size="24" color="#94a3b8"></u-icon>
			</view>

			<view class="bento-grid">
				<!-- Big Card: Daily Plan -->
				<view class="bento-item big-item glass-card" hover-class="card-hover" @tap="handleVisitorClick('plan')">
					<view class="item-header">
						<view class="icon-circle bg-blue">
							<u-icon name="calendar-fill" color="#ffffff" size="36"></u-icon>
						</view>
						<u-badge value="NEW" type="error" :offset="[20, 20]"></u-badge>
					</view>
					<view class="item-body">
						<text class="item-title">计划执行</text>
						<text class="item-desc">每日生产计划实时追踪与反馈</text>
					</view>
					<view class="item-footer">
						<text class="footer-btn">查看详情</text>
						<u-icon name="arrow-right" size="20" color="#0050cb"></u-icon>
					</view>
				</view>

				<!-- Small Card: Safety Reporting -->
				<view class="bento-item small-item glass-card" hover-class="card-hover" @tap="handleVisitorClick('report')">
					<view class="icon-circle bg-orange">
						<u-icon name="camera-fill" color="#ffffff" size="32"></u-icon>
					</view>
					<text class="item-title-sm">工序互保报备</text>
					<text class="item-desc-sm">发现异常即刻上报</text>
				</view>

				<!-- Small Card: Key Work -->
				<view class="bento-item small-item glass-card" hover-class="card-hover" @tap="handleVisitorClick('keywork')">
					<view class="icon-circle bg-purple">
						<u-icon name="list-dot" color="#ffffff" size="32"></u-icon>
					</view>
					<text class="item-title-sm">重点问题推进</text>
					<text class="item-desc-sm">节点管控闭环管理</text>
				</view>
			</view>

			<!-- Live Feed Section -->
			<view class="section-title mt-40">
				<view class="title-left">
					<view class="blue-block"></view>
					<text>现场信息展示</text>
				</view>
				<text class="title-more" @tap="handleVisitorClick('more')">更多公示</text>
			</view>

			<view class="swiper-box glass-card">
				<u-swiper :list="swiperList" height="340" border-radius="16" mode="rect" indicator-pos="bottomCenter"
					@click="handleVisitorClick('photo')"></u-swiper>
			</view>

			<!-- Info List Section -->
			<view class="section-title mt-40">
				<view class="title-left">
					<view class="blue-block"></view>
					<text>专业信息告知</text>
				</view>
			</view>

			<view class="info-list">
				<view class="info-item glass-card" v-for="(item, index) in infoList" :key="index" hover-class="card-hover"
					@tap="handleVisitorClick('info', item._id)">
					<view class="info-icon" :class="item._tagClass">
						<u-icon :name="item._iconName" size="32"></u-icon>
					</view>
					<view class="info-body">
						<text class="info-title u-line-1">{{ item.title }}</text>
						<text class="info-time">{{ vk.pubfn.timeFormat(item.publish_time, 'yyyy-MM-dd') }}</text>
					</view>
					<u-icon name="arrow-right" size="24" color="#cbd5e1"></u-icon>
				</view>
			</view>
		</view>

		<!-- Bottom CTA -->
		<view class="bottom-cta">
			<button class="btn-login" @tap="navToLogin">
				<text>立即登录开启权限</text>
				<u-icon name="arrow-right" size="28" color="#ffffff" style="margin-left: 8rpx;"></u-icon>
			</button>
		</view>
	</view>
</template>

<script>
	let vk = uni.vk;
	export default {
		data() {
			return {
				vk,
				swiperList: [],
				infoList: [],
				reportList: []
			};
		},
		onLoad() {
			vk = uni.vk;
			this.fetchHomeData();
		},
		methods: {
			async fetchHomeData() {
				try {
					let res = await vk.callFunction({
						url: 'client/visitor/pub/getHomeData',
						data: {}
					});
					if (res.code === 0) {
						this.swiperList = res.swiperList || [];
						if (res.infoList) {
							const icons = ['file-text-fill', 'volume-fill', 'info-circle-fill', 'list-dot'];
							const classes = ['bg-blue-sub text-primary', 'bg-orange-sub text-orange', 'bg-purple-sub text-purple', 'bg-teal-sub text-teal'];
							this.infoList = res.infoList.map((item, index) => {
								item._iconName = icons[index % icons.length];
								item._tagClass = classes[index % classes.length];
								return item;
							});
						}
					}
				} catch (err) {
					console.log("获取聚合数据失败", err);
				}
			},
			handleVisitorClick(type, id) {
				vk.toast('请先登录');
				setTimeout(() => {
					this.navToLogin();
				}, 800);
			},
			navToLogin() {
				vk.navigateTo({
					url: '/pages/user/login/index'
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.page-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
		padding-bottom: 180rpx;
		font-family: 'Inter', sans-serif;
	}

	.industrial-grid {
		background-image: radial-gradient(rgba(0, 80, 203, 0.05) 1px, transparent 1px);
		background-size: 40rpx 40rpx;
	}

	.glass-card {
		background: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.6);
		border-radius: 24rpx;
		box-shadow: 0 8rpx 32rpx rgba(0, 80, 203, 0.05);
	}

	.hero-section {
		padding: 30rpx;
		margin-top: 20rpx;

		.hero-card {
			padding: 40rpx;
			background: linear-gradient(135deg, #0050cb 0%, #003087 100%);
			color: #ffffff;
			border: none;

			.brand-info {
				display: flex;
				align-items: center;
				margin-bottom: 40rpx;

				.logo-box {
					width: 100rpx;
					height: 100rpx;
					background: rgba(255, 255, 255, 0.15);
					border-radius: 20rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 24rpx;
				}

				.brand-name {
					font-size: 42rpx;
					font-weight: 800;
					display: block;
				}

				.brand-tagline {
					font-size: 18rpx;
					letter-spacing: 4rpx;
					opacity: 0.7;
				}
			}

			.hero-stats {
				display: flex;
				align-items: center;
				justify-content: space-around;
				border-top: 1px solid rgba(255, 255, 255, 0.1);
				padding-top: 30rpx;

				.stat-item {
					text-align: center;

					.stat-num {
						font-size: 32rpx;
						font-weight: 800;
						display: block;
						letter-spacing: 2rpx;
					}

					.stat-label {
						font-size: 20rpx;
						opacity: 0.8;
					}
				}

				.stat-divider {
					width: 1px;
					height: 40rpx;
					background: rgba(255, 255, 255, 0.2);
				}
			}
		}
	}

	.main-content {
		padding: 0 30rpx;
	}

	.section-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24rpx;

		.title-left {
			display: flex;
			align-items: center;
			font-size: 30rpx;
			font-weight: 800;
			color: #1e293b;

			.blue-block {
				width: 8rpx;
				height: 28rpx;
				background: #0050cb;
				border-radius: 4rpx;
				margin-right: 16rpx;
			}
		}

		.title-more {
			font-size: 24rpx;
			color: #0050cb;
			font-weight: 600;
		}
	}

	.bento-grid {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		grid-template-rows: 160rpx 160rpx;
		gap: 20rpx;
		margin-bottom: 40rpx;

		.bento-item {
			padding: 24rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			&.big-item {
				grid-row: span 2;
			}

			.icon-circle {
				width: 72rpx;
				height: 72rpx;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 16rpx;

				&.bg-blue { background: #0050cb; }
				&.bg-orange { background: #ea580c; }
				&.bg-purple { background: #7c3aed; }
			}

			.item-title { font-size: 34rpx; font-weight: 800; color: #1e293b; margin-bottom: 8rpx; }
			.item-desc { font-size: 22rpx; color: #64748b; line-height: 1.3; }
			
			.item-title-sm { font-size: 28rpx; font-weight: 800; color: #1e293b; }
			.item-desc-sm { font-size: 20rpx; color: #64748b; }

			.item-footer {
				display: flex;
				align-items: center;
				margin-top: 10rpx;
				.footer-btn { font-size: 22rpx; color: #0050cb; font-weight: 700; margin-right: 4rpx; }
			}
		}
	}

	.swiper-box {
		margin-bottom: 40rpx;
		padding: 10rpx;
	}

	.info-list {
		display: flex;
		flex-direction: column;
		gap: 20rpx;

		.info-item {
			display: flex;
			align-items: center;
			padding: 24rpx;

			.info-icon {
				width: 80rpx;
				height: 80rpx;
				border-radius: 16rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 24rpx;

				&.bg-blue-sub { background: rgba(0, 80, 203, 0.1); color: #0050cb; }
				&.bg-orange-sub { background: rgba(234, 88, 12, 0.1); color: #ea580c; }
				&.bg-purple-sub { background: rgba(124, 58, 237, 0.1); color: #7c3aed; }
				&.bg-teal-sub { background: rgba(13, 148, 136, 0.1); color: #0d9488; }
			}

			.info-body {
				flex: 1;
				.info-title { font-size: 28rpx; font-weight: 700; color: #1e293b; margin-bottom: 4rpx; }
				.info-time { font-size: 20rpx; color: #94a3b8; }
			}
		}
	}

	.bottom-cta {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 30rpx 40rpx 60rpx;
		background: linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0.9), transparent);
		z-index: 100;

		.btn-login {
			background: #0050cb;
			color: #ffffff;
			border-radius: 50rpx;
			font-weight: 700;
			font-size: 30rpx;
			height: 90rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: 0 16rpx 32rpx rgba(0, 80, 203, 0.2);
		}
	}

	.mt-40 { margin-top: 40rpx; }
	.card-hover { transform: scale(0.98); transition: all 0.2s; }
</style>
