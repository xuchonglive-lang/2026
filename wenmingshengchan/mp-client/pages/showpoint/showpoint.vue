<template>
	<view class="app page-container industrial-grid">
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isCustom="true">
			<block slot="backText"></block>
			<block slot="content">现场实时状态</block>
		</cu-custom>

		<!-- 页面内容开始 -->
		<view class="main-content">
			<!-- u-tabs -->
			<view class="tabs-container">
				<u-tabs :list="tabList" :is-scroll="false" :current="currentTab" @change="tabChange" active-color="#0050cb" inactive-color="#424656" :bold="true" bg-color="transparent"></u-tabs>
			</view>

			<!-- Tab 1: 全局总览 -->
			<view v-if="currentTab === 0">
				<!-- Controls Area (Glassmorphism Card) -->
				<view class="glass-panel controls-card">
				<!-- Row 1: Date -->
				<view class="control-row">
					<text class="label">日期：</text>
					<view class="control-box flex-1">
						<view class="flex items-center flex-1" @click="showGlobalDate = true">
							<text class="material-symbols-outlined icon-primary">calendar_today</text>
							<text class="value-text font-headline">{{ globalDate }}</text>
						</view>
						<text class="material-symbols-outlined icon-secondary">arrow_drop_down</text>
					</view>
				</view>
				
				<!-- Row 2: Shift -->
				<view class="control-row">
					<text class="label">班次：</text>
					<view class="shift-toggle flex-1">
						<view class="toggle-btn" :class="globalShiftType === 'day' ? 'active' : 'inactive'" @click="globalShiftType = 'day'">白班</view>
						<view class="toggle-btn" :class="globalShiftType === 'night' ? 'active' : 'inactive'" @click="globalShiftType = 'night'">夜班</view>
					</view>
				</view>

				<!-- Row 3: View Mode -->
				<view class="control-row">
					<text class="label">视图模式：</text>
					<view class="view-mode-toggle flex-1">
						<view class="mode-btn" :class="viewMode === 'grid' ? 'active' : 'inactive'" @click="viewMode = 'grid'">
							<text class="material-symbols-outlined icon-fill">grid_view</text>
							<text>网格视图</text>
						</view>
						<view class="mode-btn" :class="viewMode === 'carousel' ? 'active' : 'inactive'" @click="viewMode = 'carousel'">
							<text class="material-symbols-outlined">view_carousel</text>
							<text>轮播图</text>
						</view>
					</view>
				</view>
				
				<!-- Action Row -->
				<view class="action-row">
					<button class="action-btn btn-clear" @click="handleClear(0)">清空</button>
					<button class="action-btn btn-query" @click="handleQuery(0)">查询</button>
				</view>
			</view>

			<!-- Photo Display Area -->
			<view class="photo-section">
				<!-- 网格视图 -->
				<view v-if="viewMode === 'grid'">
					<!-- Area Item -->
					<view class="area-group" v-for="(area, aIdx) in globalData" :key="aIdx">
					<text class="area-title">{{ area.area_name }}</text>
					
					<!-- Point Card -->
					<view class="point-card" :class="{'mt-4': pIdx > 0}" v-for="(point, pIdx) in area.points" :key="pIdx">
						<view class="point-header">
							<text class="material-symbols-outlined icon-fill">location_on</text>
							<text class="point-name">{{ point.point_name }}</text>
						</view>
						<view class="photo-grid-3">
							<view class="photo-item" v-for="(photo, p2Idx) in point.photos" :key="p2Idx">
								<view class="photo-wrapper">
									<image :src="photo.url" mode="aspectFill" @click="vk.pubfn.previewImage(point.photos.map(p=>p.url), p2Idx)"></image>
								</view>
								<view class="photo-meta">
									<text class="meta-title">{{ photo.title || point.point_name }}</text>
									<text class="meta-time">{{ photo.time }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="globalData.length === 0" style="text-align: center; color: #999; padding: 40rpx 0;">暂无数据</view>
				</view>

				<!-- 轮播图视图 -->
				<view v-else-if="viewMode === 'carousel'">
					<live-status-carousel :swiperImgs="carouselPhotos"></live-status-carousel>
				</view>
			</view>
			</view> <!-- End of Tab 1 -->

			<!-- Tab 2: 单点位分析 -->
			<view v-if="currentTab === 1">
				<view class="glass-panel controls-card">
					<!-- 选择点位 -->
					<view class="control-row" @click="showPointSelect = true">
						<text class="label">选择点位：</text>
						<view class="control-box flex-1">
							<view class="flex items-center flex-1">
								<text class="material-symbols-outlined icon-primary">location_on</text>
								<text class="value-text font-headline">{{ selectedPointName || '请选择区域和点位' }}</text>
							</view>
							<text class="material-symbols-outlined icon-secondary">arrow_drop_down</text>
						</view>
					</view>
					
					<!-- 日期范围 -->
					<view class="control-row" @click="showDateRange = true">
						<text class="label">日期范围：</text>
						<view class="control-box flex-1">
							<view class="flex items-center flex-1">
								<text class="material-symbols-outlined icon-primary">calendar_month</text>
								<text class="value-text font-headline">{{ dateRangeText || '请选择日期范围' }}</text>
							</view>
							<text class="material-symbols-outlined icon-secondary">arrow_drop_down</text>
						</view>
					</view>
					
					<!-- Action Row -->
					<view class="action-row">
						<button class="action-btn btn-clear" @click="handleClear(1)">清空</button>
						<button class="action-btn btn-query" @click="handleQuery(1)">查询</button>
					</view>
				</view>

				<!-- 按日期倒序排列的选定点位的照片 -->
				<view class="photo-section">
					<view class="point-card" v-for="(day, index) in pointPhotosList" :key="index">
						<view class="point-header">
							<text class="material-symbols-outlined icon-fill">calendar_today</text>
							<text class="point-name">{{ day.date }}</text>
						</view>
						<view class="photo-grid-3">
							<view class="photo-item" v-for="(photo, pIndex) in day.photos" :key="pIndex">
								<view class="photo-wrapper">
									<image :src="photo.url" mode="aspectFill" @click="vk.pubfn.previewImage(day.photos.map(p=>p.url), pIndex)"></image>
								</view>
								<view class="photo-meta">
									<text class="meta-time">{{ photo.time }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view> <!-- End of Tab 2 -->

		</view>
		<!-- 页面内容结束 -->
		
		<!-- 弹出层组件 -->
		<u-select v-model="showPointSelect" mode="mutil-column-auto" :list="pointOptions" @confirm="confirmPointSelect" confirm-color="#0050cb"></u-select>
		<u-calendar v-model="showDateRange" mode="range" @change="confirmDateRange" @confirm="confirmDateRange" active-bg-color="#0050cb" range-bg-color="rgba(0, 80, 203, 0.1)" range-color="#0050cb"></u-calendar>
		<u-calendar v-model="showGlobalDate" mode="date" @change="confirmGlobalDate" @confirm="confirmGlobalDate" active-bg-color="#0050cb"></u-calendar>
	</view>
</template>

<script>
	let vk = uni.vk;
	export default {
		data() {
			return {
				vk,
				data: {},
				form1: {},
				scrollTop: 0,
				
				// Tabs配置
				tabList: [
					{ name: '全局总览' },
					{ name: '单点位分析' }
				],
				currentTab: 0,
				
				// 全局总览相关状态
				globalDate: vk.pubfn.timeFormat(new Date(), "yyyy-MM-dd"),
				globalShiftType: 'day', // day 或 night
				showGlobalDate: false,
				globalData: [],
				
				// 单点位分析相关状态
				showPointSelect: false,
				showDateRange: false,
				selectedPointId: '',
				selectedPointName: '',
				startDate: '',
				endDate: '',
				dateRangeText: '',
				
				pointOptions: [],
				pointPhotosList: [],
				
				viewMode: 'grid', // grid 或 carousel
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad(options = {}) {
			vk = uni.vk;
			this.options = options;
			this.init(options);
		},
		onReady() {},
		onShow() {},
		onHide() {},
		onUnload() {},
		onPullDownRefresh() {
			setTimeout(() => {
				this.init(this.options);
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onShareAppMessage(options) {},
		methods: {
			init(options = {}) {
				this.getRegionAndPositionList();
				this.getGlobalData();
			},
			async getRegionAndPositionList() {
				let res = await vk.callFunction({
					url: 'client/report/kh/getAreaPointTree',
					data: {}
				});
				if(res.code === 0) {
					this.pointOptions = res.tree;
				}
			},
			async getGlobalData() {
				uni.showLoading({ title: '加载中' });
				let res = await vk.callFunction({
					url: 'client/feedback/kh/getLiveStatus',
					data: {
						mode: 'global',
						date: this.globalDate,
						shiftType: this.globalShiftType
					}
				});
				if(res.code === 0) {
					this.globalData = res.data || [];
				}
				uni.hideLoading();
			},
			async getSingleData() {
				if (!this.selectedPointId) {
					uni.showToast({ title: '请至少选择一个点位', icon: 'none' });
					return;
				}
				uni.showLoading({ title: '加载中' });
				let res = await vk.callFunction({
					url: 'client/feedback/kh/getLiveStatus',
					data: {
						mode: 'single',
						pointId: this.selectedPointId,
						startDate: this.startDate,
						endDate: this.endDate
					}
				});
				if(res.code === 0) {
					this.pointPhotosList = res.data || [];
				}
				uni.hideLoading();
			},
			tabChange(index) {
				this.currentTab = index;
			},
			confirmPointSelect(e) {
				// u-select 返回的 e 是一个数组，如：[{value: 'q1', label: '选矿主厂房'}, {value: 'p1', label: '破碎机进料口'}]
				if (e && e.length >= 2) {
					let region = e[0].label;
					let point = e[1].label;
					this.selectedPointId = e[1].value;
					this.selectedPointName = `${region} - ${point}`;
				} else if (e && e.length === 1) {
					this.selectedPointId = e[0].value;
					this.selectedPointName = e[0].label;
				}
			},
			confirmDateRange(e) {
				// u-calendar mode="range" 返回 { startDate, endDate } 等信息
				if (e.startDate && e.endDate) {
					this.startDate = e.startDate;
					this.endDate = e.endDate;
					this.dateRangeText = `${e.startDate} 至 ${e.endDate}`;
					// 选择后自动查询
					this.getSingleData();
				}
			},
			confirmGlobalDate(e) {
				this.globalDate = e.result;
				this.getGlobalData();
			},
			handleClear(tabIndex) {
				if (tabIndex === 0) {
					this.globalDate = vk.pubfn.timeFormat(new Date(), "yyyy-MM-dd");
					this.globalShiftType = 'day';
					uni.showToast({ title: '条件已重置', icon: 'none' });
					this.getGlobalData();
				} else {
					this.selectedPointId = '';
					this.selectedPointName = '';
					this.startDate = '';
					this.endDate = '';
					this.dateRangeText = '';
					this.pointPhotosList = [];
					uni.showToast({ title: '条件已清空', icon: 'none' });
				}
			},
			handleQuery(tabIndex) {
				if (tabIndex === 0) {
					this.getGlobalData();
				} else {
					this.getSingleData();
				}
			}
		},
		watch: {
			globalShiftType() {
				this.getGlobalData();
			},
			globalDate() {
				this.getGlobalData();
			},
			selectedPointId() {
				if (this.selectedPointId && this.startDate && this.endDate) {
					this.getSingleData();
				}
			}
		},
		computed: {
			carouselPhotos() {
				let list = [];
				this.globalData.forEach(area => {
					area.points.forEach(point => {
						point.photos.forEach(photo => {
							list.push({
								underImg: photo.url,
								area_name: area.area_name,
								point_name: point.point_name,
								date: this.globalDate,
								shift: this.globalShiftType
							});
						});
					});
				});
				return list;
			}
		},
	};
</script>

<style lang="scss" scoped>
.page-container {
	min-height: 100vh;
	font-family: 'Inter', sans-serif;
	background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
	padding-bottom: 60rpx;
}

.industrial-grid {
	background-image: radial-gradient(rgba(0, 80, 203, 0.05) 1px, transparent 1px);
	background-size: 40rpx 40rpx;
}

.main-content {
	padding: 32rpx;
}

.tabs-container {
	margin-bottom: 32rpx;
	border-radius: 24rpx;
	background: rgba(255, 255, 255, 0.4);
	backdrop-filter: blur(20px);
	border: 1px solid rgba(255, 255, 255, 0.4);
	box-shadow: 0 8rpx 24rpx rgba(0, 80, 203, 0.05);
	overflow: hidden;
}

/* Glass Panel */
.glass-panel {
	background: rgba(255, 255, 255, 0.25);
	backdrop-filter: blur(20px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08);
	border-radius: 24rpx;
}

/* Controls Card */
.controls-card {
	padding: 32rpx;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
	margin-bottom: 48rpx;
}

.control-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8rpx 0;
	
	.label {
		font-size: 24rpx;
		font-weight: 600;
		color: #191c1e;
		white-space: nowrap;
	}
	
	.flex-1 {
		flex: 1;
		margin-left: 32rpx;
	}
}

.control-box {
	display: flex;
	align-items: center;
	background-color: #e0e3e5;
	padding: 12rpx 24rpx;
	border-radius: 8rpx;
	border: 1px solid rgba(194, 198, 216, 0.3);
	
	.flex {
		display: flex;
		align-items: center;
		gap: 16rpx;
	}
	
	.icon-primary {
		font-size: 32rpx;
		color: #0050cb;
	}
	
	.value-text {
		font-size: 24rpx;
		font-weight: 500;
		letter-spacing: 0.05em;
		color: #191c1e;
		font-family: 'Manrope', sans-serif;
	}
	
	.icon-secondary {
		font-size: 32rpx;
		color: #424656;
	}
}

/* Shift Toggle */
.shift-toggle {
	display: flex;
	background-color: #f2f4f6;
	padding: 8rpx;
	border-radius: 8rpx;
	border: 1px solid rgba(194, 198, 216, 0.2);
	
	.toggle-btn {
		flex: 1;
		text-align: center;
		padding: 8rpx 0;
		font-size: 22rpx;
		border-radius: 8rpx;
		transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
		
		&.active {
			font-weight: 700;
			color: #ffffff;
			background-color: #0050cb;
			box-shadow: 0 2rpx 4rpx rgba(0,0,0,0.1);
		}
		
		&.inactive {
			font-weight: 500;
			color: #424656;
		}
	}
}

/* View Mode Toggle */
.view-mode-toggle {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 16rpx;
	
	.mode-btn {
		display: flex;
		align-items: center;
		gap: 12rpx;
		padding: 12rpx 24rpx;
		border-radius: 8rpx;
		transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
		
		&.active {
			background-color: #ffffff;
			box-shadow: 0 2rpx 4rpx rgba(0,0,0,0.05);
			border: 1px solid rgba(0, 80, 203, 0.2);
			color: #0050cb;
			
			text {
				font-size: 22rpx;
				font-weight: 700;
			}
			.material-symbols-outlined {
				font-size: 35rpx;
			}
		}
		
		&.inactive {
			color: #424656;
			
			text {
				font-size: 22rpx;
				font-weight: 500;
			}
			.material-symbols-outlined {
				font-size: 35rpx;
			}
		}
	}
}

/* Action Row */
.action-row {
	display: flex;
	justify-content: flex-end;
	gap: 24rpx;
	margin-top: 16rpx;
	padding-top: 24rpx;
	border-top: 1px dashed rgba(194, 198, 216, 0.4);
}

.action-btn {
	margin: 0;
	padding: 0 48rpx;
	height: 64rpx;
	line-height: 64rpx;
	font-size: 26rpx;
	border-radius: 32rpx;
	font-weight: 600;
	transition: all 0.3s ease;
	
	&::after {
		border: none;
	}
	
	&.btn-clear {
		background-color: rgba(255, 255, 255, 0.5);
		color: #424656;
		border: 1px solid rgba(194, 198, 216, 0.6);
	}
	
	&.btn-query {
		background-color: #0050cb;
		color: #ffffff;
		box-shadow: 0 4rpx 12rpx rgba(0, 80, 203, 0.3);
	}
	
	&:active {
		transform: scale(0.96);
		opacity: 0.8;
	}
}

/* Photo Section */
.photo-section {
	display: flex;
	flex-direction: column;
	gap: 48rpx;
}

.area-group {
	display: flex;
	flex-direction: column;
	gap: 32rpx;
}

.area-title {
	font-family: 'Manrope', sans-serif;
	font-size: 36rpx;
	font-weight: 800;
	color: #191c1e;
	border-bottom: 4rpx solid rgba(0, 80, 203, 0.3);
	padding-bottom: 16rpx;
	display: inline-block;
	align-self: flex-start;
}

.point-card {
	background-color: #f2f4f6;
	border-radius: 24rpx;
	padding: 32rpx;
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}
.mt-4 {
	margin-top: 32rpx;
}

.point-header {
	display: flex;
	align-items: center;
	gap: 16rpx;
	
	.icon-fill {
		font-size: 40rpx;
		color: #0050cb;
		font-variation-settings: 'FILL' 1;
	}
	
	.point-name {
		font-family: 'Inter', sans-serif;
		font-size: 28rpx;
		font-weight: 600;
		color: #0050cb;
	}
}

/* Photo Grid */
.photo-grid-3 {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 24rpx;
}

.photo-item {
	display: flex;
	flex-direction: column;
	gap: 8rpx;
	
	.photo-wrapper {
		aspect-ratio: 1 / 1;
		border-radius: 24rpx;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 8rpx 24rpx rgba(0, 80, 203, 0.05);
		position: relative;
		
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.photo-wrapper-full {
		width: 100%;
		height: 384rpx;
		border-radius: 24rpx;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 8rpx 24rpx rgba(0, 80, 203, 0.05);
		position: relative;
		
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.photo-meta {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4rpx;
		margin-top: 8rpx;
		
		.meta-title {
			font-size: 22rpx;
			font-weight: 700;
			color: #0050cb;
			text-align: center;
		}
		
		.meta-time {
			font-size: 22rpx;
			font-weight: 500;
			color: #424656;
			letter-spacing: 0.05em;
		}
	}
}

.icon-fill {
	font-variation-settings: 'FILL' 1;
}
</style>
