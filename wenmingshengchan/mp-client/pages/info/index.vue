<template>
	<view class="app page-container industrial-grid">
		<z-paging ref="paging" v-model="dataList" @query="getList" :fixed="true">
			<!-- 顶部固定区域 -->
			<template #top>
				<cu-custom bgColor="bg-gradual-blue" :isCustom="true">
					<block slot="backText"></block>
					<block slot="content">信息中心</block>
				</cu-custom>
				<view class="main-content">
					<!-- Search Bar (加边框) -->
					<view class="search-wrap" style="padding: 10rpx 0;">
						<u-search placeholder="搜索相关资讯/通知" v-model="keyword" @search="onSearch" @clear="onSearch"
							:show-action="false" bg-color="rgba(255,255,255,0.8)" border-color="#0050cb" placeholder-color="#94a3b8"
							search-icon-color="#0050cb" height="64"></u-search>
					</view>
				</view>

				<!-- Tabs (高度调小，滑块加粗加长) -->
				<view style="padding: 0 30rpx; margin-bottom: 16rpx;">
					<u-tabs 
						:list="uTabList" 
						:current="currentTabIndex" 
						@change="onTabChange" 
						active-color="#0050cb" 
						inactive-color="#64748b"
						font-size="28"
						:bold="true"
						bar-width="60"
						bar-height="8"
						height="70"
						bg-color="transparent"
					></u-tabs>
				</view>
			</template>

			<view class="main-content list-content">
				<!-- Feature Bento News -->
				<view class="featured-news-card" v-if="topArticle" hover-class="card-hover"
					@tap="viewDetail(topArticle._id)">
					<image class="cover-img"
						:src="topArticle.cover_img || 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-b05423f7-920b-4aa1-8ca6-cdeac4c000bd/c6e3b56a-1e68-45be-a4fa-38fb50d9db89.jpg'"
						mode="aspectFill"></image>
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
						<view class="glass-card news-item" hover-class="card-hover" v-if="item.cover_img"
							@tap="viewDetail(item._id)">
							<!-- 标题行独占顶部 -->
							<view class="title-row">
								<view class="title-left">
									<view class="blue-block"></view>
									<text class="item-title u-line-2">{{ item.title }}</text>
								</view>
								<view class="right-tag-wrap">
									<u-tag :text="getCategoryName(item.category_id)" type="primary" mode="light" size="mini"></u-tag>
								</view>
							</view>
							<!-- 内容区：摘要与图片水平排列 -->
							<view class="content-row">
								<view class="item-left">
									<text class="item-desc u-line-2">{{ item.summary || '暂无内容摘要...' }}</text>
									<view class="item-footer">
										<view class="item-meta">
											<view class="meta-block"><u-icon name="clock" size="24"></u-icon><text>{{ vk.pubfn.timeFormat(item.publish_time, 'yyyy-MM-dd') }}</text></view>
											<view class="meta-block"><u-icon name="eye" size="24"></u-icon><text>{{ item.view_count || 0 }}</text></view>
										</view>
									</view>
								</view>
								<image class="item-img" :src="item.cover_img" mode="aspectFill"></image>
							</view>
						</view>

						<!-- 无图纯文本降级情况 -->
						<view class="glass-card news-item col-text" hover-class="card-hover" v-else
							@tap="viewDetail(item._id)">
							<!-- 标题行独占顶部 -->
							<view class="title-row">
								<view class="title-left">
									<view class="blue-block"></view>
									<text class="item-title u-line-1">{{ item.title }}</text>
								</view>
								<view class="right-tag-wrap">
									<u-tag :text="getCategoryName(item.category_id)" type="primary" mode="light" size="mini"></u-tag>
								</view>
							</view>
							<view class="content-row">
								<view class="item-left">
									<text class="item-desc u-line-2">{{ item.summary || '暂无内容摘要...' }}</text>
									<view class="item-footer">
										<view class="item-meta">
											<view class="meta-block"><u-icon name="clock" size="24"></u-icon><text>{{ vk.pubfn.timeFormat(item.publish_time, 'yyyy-MM-dd') }}</text></view>
											<view class="meta-block"><u-icon name="eye" size="24"></u-icon><text>{{ item.view_count || 0 }}</text></view>
										</view>
									</view>
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
	computed: {
		uTabList() {
			return [{ name: '全部信息', _id: '' }, ...this.categoryList];
		},
		currentTabIndex() {
			return this.uTabList.findIndex(item => item._id === this.currentCategoryId);
		}
	},
	onLoad(options = {}) {
		vk = uni.vk;
		if (vk.pubfn.checkLogin()) {
			this.options = options;
			this.getCategoryList();
		}
	},
	methods: {
		onTabChange(index) {
			let id = this.uTabList[index]._id;
			this.changeTab(id);
		},
		getCategoryList() {
			vk.callFunction({
				url: 'client/info/kh/getCategory',
				success: (data) => {
					this.categoryList = data.rows || [];
				}
			});
		},
		changeTab(id) {
			if (this.currentCategoryId === id) return;
			this.currentCategoryId = id;
			this.$refs.paging.reload();
		},
		getCategoryName(id) {
			if (!id) return '综合资讯';
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
						// 放宽置顶判断条件，兼容 boolean 的 true、数字 1、以及字符串的 'true'/'1'
						if (!this.keyword && rows.length > 0 && (rows[0].is_top === 1 || rows[0].is_top === true || rows[0].is_top === '1' || rows[0].is_top === 'true')) {
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
			if (!id) return;
			vk.navigateTo({
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
	background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));
	backdrop-filter: blur(20px);
	border: 1px solid rgba(255, 255, 255, 0.8);
	box-shadow: 
		0 4rpx 16rpx -4rpx rgba(0, 80, 203, 0.08),
		0 16rpx 48rpx -8rpx rgba(0, 80, 203, 0.15),
		inset 0 2rpx 0 rgba(255, 255, 255, 0.9);
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

/* Search Wrap */
.search-wrap {
	margin-bottom: 24rpx;
	border-radius: 40rpx;
	backdrop-filter: blur(10px);
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
	gap: 20rpx;

	.news-item {
		display: flex;
		flex-direction: column;
		padding: 24rpx;

		.title-row {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			margin-bottom: 16rpx;
			gap: 16rpx;

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

				.item-title {
					font-size: 30rpx;
					font-weight: bold;
					color: #191c1e;
					line-height: 1.4;
					flex: 1;
				}
			}

			.right-tag-wrap {
				flex-shrink: 0;
				margin-top: 0;
			}
		}

		.content-row {
			display: flex;
			align-items: stretch;
			gap: 20rpx;
			min-height: 140rpx;

			.item-left {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}

			.item-desc {
				font-size: 26rpx;
				color: #424656;
				line-height: 1.5;
				margin-bottom: 16rpx;
			}

			.item-footer {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				margin-top: auto;

				.item-meta {
					display: flex;
					align-items: center;
					gap: 30rpx;
					font-size: 22rpx;
					color: #424656;
					font-weight: 500;

					.meta-block {
						display: flex;
						align-items: center;
						gap: 8rpx;
					}
				}
			}

			.item-img {
				width: 140rpx;
				height: 140rpx;
				border-radius: 12rpx;
				flex-shrink: 0;

				&.img-gray {
					filter: grayscale(100%);
					transition: filter 0.5s ease;
				}
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
