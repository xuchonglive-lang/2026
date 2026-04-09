<template>
	<view class="app page-container industrial-grid">
		<z-paging ref="paging" v-model="dataList" @query="getList" :fixed="true">
			<!-- 顶部固定区域 -->
			<template #top>
				<view class="main-content">
					<!-- Section Header -->
					<view class="section-title-wrap">
						<text class="page-title">信息中心</text>
						<text class="page-subtitle">Information & Notices</text>
					</view>

					<!-- Search Bar -->
					<view class="search-wrap">
						<u-search placeholder="搜索相关资讯/通知" v-model="keyword" @search="onSearch" @clear="onSearch" :show-action="false" bg-color="rgba(255,255,255,0.6)" placeholder-color="#94a3b8" search-icon-color="#0050cb" height="60"></u-search>
					</view>
				</view>

				<!-- Glassmorphism Tabs -->
				<scroll-view scroll-x class="tabs-scroll" :show-scrollbar="false">
					<view class="tabs-inner">
						<!-- 动态获取的分类列表 -->
						<view class="tab-item" :class="{ active: currentCategoryId === '' }" @tap="changeTab('')">
							<text>全部信息</text>
						</view>
						<view class="tab-item" v-for="cat in categoryList" :key="cat._id" :class="{ active: currentCategoryId === cat._id }" @tap="changeTab(cat._id)">
							<text>{{ cat.name }}</text>
						</view>
					</view>
				</scroll-view>
			</template>

			<view class="main-content list-content">
				<!-- Feature Bento News -->
				<view class="featured-news-card" v-if="topArticle" hover-class="card-hover" @tap="viewDetail(topArticle._id)">
					<image class="cover-img" :src="topArticle.cover_img || 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/c6e3b56a-1e68-45be-a4fa-38fb50d9db89.jpg'" mode="aspectFill"></image>
					<view class="cover-mask"></view>
					<view class="news-content">
						
						<text class="news-title overflow-2">{{ topArticle.title }}</text>
						<view class="news-meta">
							<view class="meta-item">
								<u-icon name="calendar" size="28"></u-icon>
								<text>{{ vk.pubfn.timeFormat(topArticle.publish_time, 'yyyy-MM-dd') }}</text>
							</view>
							<view class="meta-item">
								<u-icon name="eye" size="28"></u-icon>
								<text>{{ topArticle.view_count || 0 }}</text>
							</view>
						</view>
					</view>
				</view>

				<!-- News Grid -->
				<view class="news-grid">
					<block v-for="(item, index) in dataList" :key="index">
						<!-- 有封面的情况 -->
						<view class="glass-card news-item" hover-class="card-hover" v-if="item.cover_img" @tap="viewDetail(item._id)">
							<view class="item-left">
								<view class="tag-row">
									<text class="category-tag text-secondary bg-secondary-light">{{ getCategoryName(item.category_id) }}</text>
								</view>
								<text class="item-title u-line-2">{{ item.title }}</text>
								<text class="item-desc u-line-2">{{ item.summary || '暂无内容摘要...' }}</text>
								<view class="item-meta">
									<text>{{ vk.pubfn.timeFormat(item.publish_time, 'yyyy-MM-dd') }}</text>
									<view class="views"><u-icon name="eye" size="24"></u-icon><text>{{ item.view_count || 0 }}</text></view>
								</view>
							</view>
							<image class="item-img" :src="item.cover_img" mode="aspectFill"></image>
						</view>

						<!-- 无图纯文本降级情况 -->
						<view class="glass-card news-item col-text" hover-class="card-hover" v-else @tap="viewDetail(item._id)">
							<view class="tag-row">
								<text class="category-tag text-slate bg-slate-light">{{ getCategoryName(item.category_id) }}</text>
							</view>
							<text class="item-title u-line-1">{{ item.title }}</text>
							<text class="item-desc u-line-2">{{ item.summary || '暂无内容摘要...' }}</text>
							<view class="item-footer">
								<view class="item-meta">
									<text>{{ vk.pubfn.timeFormat(item.publish_time, 'yyyy-MM-dd') }}</text>
									<view class="views"><u-icon name="eye" size="24"></u-icon><text>{{ item.view_count || 0 }}</text></view>
								</view>
								<view class="read-more">
									<text>阅读全文</text>
									<u-icon name="arrow-right" size="24"></u-icon>
								</view>
							</view>
						</view>
					</block>
				
				<!-- 底部安全缓冲层：专门用于垫高防止自拟定固定位的 TabBar 吞卡数据 -->
				<view class="safe-padding-gap" style="height: 180rpx; width: 100%; flex-shrink: 0;"></view>
			</view>
			</view>
			
			<template #bottom>
				<my-tab-bar :current="1"></my-tab-bar>
			</template>
		</z-paging>
	</view>
</template>

<script>
	let vk = uni.vk;
	export default {
		data() {
			return {
				vk,
				keyword: '',
				categoryList: [],        // 真实的选修卡分类池
				currentCategoryId: '',   // 当前激活的分类
				topArticle: null,        // 抽离出来的置顶位大图文章
				dataList: [],
				pageIndex: 1,
				pageSize: 10,
				hasMore: true,
				loading: false
			};
		},
		onLoad(options = {}) {
			vk = uni.vk;
			this.options = options;
			this.getCategoryList();
		},
		methods: {
			getCategoryList() {
				vk.callFunction({
					url: 'client/info/pub/getCategory',
					success: (data) => {
						this.categoryList = data.rows || [];
					}
				});
			},
			changeTab(id) {
				if(this.currentCategoryId === id) return;
				this.currentCategoryId = id;
				this.$refs.paging.reload();
			},
			getCategoryName(id) {
				if(!id) return '综合资讯';
				let cat = this.categoryList.find(c => c._id === id);
				return cat ? cat.name : '综合资讯';
			},
			onSearch() {
				this.$refs.paging.reload();
			},
			getList(pageNo, pageSize) {
				vk.callFunction({
					url: 'client/info/kh/getListByCategory',
					title: pageNo === 1 ? '' : '加载中...',
					data: {
						pageIndex: pageNo,
						pageSize: pageSize,
						category_id: this.currentCategoryId,
						keyword: this.keyword
					},
					success: (data) => {
						let rows = data.rows || [];
						if (pageNo === 1) {
							// 刷新重置，并实施首位抽出策略（条件：无关键字搜索的常规态、且首篇确为 is_top，解开单独频道的封印)
							this.topArticle = null;
							if (!this.keyword && rows.length > 0 && (rows[0].is_top === 1 || rows[0].is_top === true)) {
								this.topArticle = rows.shift(); // 抽出顶层赋予画报
							}
						}
						// 交由 z-paging 接管数据追加及状态判定
						this.$refs.paging.complete(rows);
					},
					fail: (err) => {
						this.$refs.paging.complete(false);
					}
				});
			},
			viewDetail(id) {
				if(!id) return;
				uni.navigateTo({
					url: `/pages/info/detail/index?id=${id}`
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.page-container {
		font-family: 'Inter', sans-serif;
		background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
		min-height: 100vh;
		padding-bottom: 240rpx;
	}

	.industrial-grid {
		background-image: radial-gradient(rgba(0, 80, 203, 0.05) 1px, transparent 1px);
		background-size: 40rpx 40rpx;
	}

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

	.main-content {
		padding-top: 10rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}
	
	.list-content {
		padding-top: 0;
	}

	/* Section Header */
	.section-title-wrap {
		margin-bottom: 16rpx;
		.page-title {
			display: block;
			font-size: 40rpx;
			font-weight: 800;
			color: #191c1e;
			margin-bottom: 8rpx;
			letter-spacing: -1rpx;
		}
		.page-subtitle {
			display: block;
			font-size: 20rpx;
			color: #424656;
			font-weight: 500;
			letter-spacing: 4rpx;
			text-transform: uppercase;
		}
	}

	/* Search Wrap */
	.search-wrap {
		margin-bottom: 24rpx;
		border-radius: 40rpx;
		backdrop-filter: blur(10px);
	}

	/* Tabs */
	.tabs-scroll {
		width: 100%;
		margin-bottom: 24rpx;
		background: rgba(255,255,255,0.1);
		border-bottom: 1px solid rgba(255,255,255,0.2);
		backdrop-filter: blur(10px);
		white-space: nowrap;
		position: sticky;
		top: calc(env(safe-area-inset-top));
		z-index: 40;
		box-sizing: border-box;

		.tabs-inner {
			display: inline-flex;
			padding: 0 30rpx;
			gap: 40rpx;
			box-sizing: border-box;

			.tab-item {
				padding: 24rpx 10rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #424656;
				
				&.active {
					font-weight: bold;
					color: #0050cb;
					border-bottom: 4rpx solid #0050cb;
				}
			}
		}
	}

	/* Feature Bento */
	.featured-news-card {
		height: 460rpx;
		border-radius: 24rpx;
		position: relative;
		overflow: hidden;
		box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.1);
		margin-bottom: 32rpx;
		z-index: 30;

		.cover-img {
			width: 100%;
			height: 100%;
		}

		.cover-mask {
			position: absolute;
			inset: 0;
			background: linear-gradient(to top, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.2), transparent);
			z-index: 10;
		}

		.news-content {
			position: absolute;
			z-index: 20;
			bottom: 0;
			left: 0;
			width: 100%;
			padding: 40rpx 30rpx;
			box-sizing: border-box;

			.badge-headline {
				display: inline-block;
				padding: 8rpx 16rpx;
				background: #2563eb;
				color: #fff;
				font-size: 20rpx;
				font-weight: bold;
				letter-spacing: 2rpx;
				border-radius: 8rpx;
				margin-bottom: 20rpx;
			}

			.news-title {
				font-size: 38rpx;
				font-weight: bold;
				color: #fff;
				line-height: 1.3;
				margin-bottom: 16rpx;
			}

			.news-meta {
				display: flex;
				align-items: center;
				gap: 30rpx;
				font-size: 24rpx;
				color: #cbd5e1;
				font-weight: 500;

				.meta-item {
					display: flex;
					align-items: center;
					gap: 8rpx;
				}
			}
		}
	}

	/* News Grid */
	.news-grid {
		display: flex;
		flex-direction: column;
		gap: 30rpx;

		.news-item {
			display: flex;
			padding: 30rpx;
			gap: 30rpx;

			&.col-text {
				flex-direction: column;
				gap: 16rpx;
			}

			.item-left {
				flex: 1;
				display: flex;
				flex-direction: column;
			}

			.tag-row {
				margin-bottom: 16rpx;

				.category-tag {
					padding: 6rpx 16rpx;
					border-radius: 30rpx;
					font-size: 20rpx;
					font-weight: bold;
					letter-spacing: 2rpx;

					&.text-tertiary { color: #a33200; }
					&.bg-tertiary-light { background: rgba(204, 66, 4, 0.1); }

					&.text-secondary { color: #294487; }
					&.bg-secondary-light { background: rgba(155, 180, 254, 0.2); }

					&.text-primary { color: #0066ff; }
					&.bg-primary-light { background: rgba(0, 102, 255, 0.1); }

					&.text-slate { color: #475569; }
					&.bg-slate-light { background: #e2e8f0; }
				}
			}

			.item-title {
				font-size: 30rpx;
				font-weight: bold;
				color: #191c1e;
				line-height: 1.4;
				margin-bottom: 24rpx;
			}

			.item-desc {
				font-size: 26rpx;
				color: #424656;
				line-height: 1.6;
				margin-bottom: 30rpx;
			}

			.item-footer {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.read-more {
					display: flex;
					align-items: center;
					gap: 8rpx;
					font-size: 24rpx;
					font-weight: bold;
					color: #0050cb;
				}
			}

			.item-meta {
				display: flex;
				align-items: center;
				gap: 30rpx;
				font-size: 22rpx;
				color: #424656;
				font-weight: 500;
				margin-top: auto;

				.views {
					display: flex;
					align-items: center;
					gap: 8rpx;
				}
			}

			.item-img {
				width: 160rpx;
				height: 160rpx;
				border-radius: 16rpx;
				flex-shrink: 0;

				&.img-gray {
					filter: grayscale(100%);
					transition: filter 0.5s ease;
				}
			}
		}
	}

	/* FAB */
	.fab-btn {
		position: fixed;
		right: 40rpx;
		bottom: 180rpx;
		width: 110rpx;
		height: 110rpx;
		background: #0050cb;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 16rpx 48rpx rgba(0, 80, 203, 0.3);
		z-index: 40;
		
		&:active {
			transform: scale(0.9);
		}
	}
</style>
