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
			<view v-show="currentTab === 0">
				<!-- Controls Area (Glassmorphism Card) -->
				<view class="glass-panel controls-card">
				<!-- Row 1: Date -->
				<view class="control-row">
					<text class="label">日期：</text>
					<view class="control-box flex-1">
						<view class="flex items-center flex-1" @click="showGlobalDate = true">
							<u-icon name="calendar-fill" color="#0050cb" size="32" style="margin-right: 12rpx;"></u-icon>
							<text class="value-text font-headline">{{ globalDate }}</text>
						</view>
						<u-icon name="arrow-down" color="#424656" size="32"></u-icon>
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
							<u-icon name="grid-fill" :color="viewMode === 'grid' ? '#0050cb' : '#424656'" size="32" style="margin-right: 12rpx;"></u-icon>
							<text>网格视图</text>
						</view>
						<view class="mode-btn" :class="viewMode === 'carousel' ? 'active' : 'inactive'" @click="viewMode = 'carousel'">
							<u-icon name="photo-fill" :color="viewMode === 'carousel' ? '#0050cb' : '#424656'" size="32" style="margin-right: 12rpx;"></u-icon>
							<text>轮播图</text>
						</view>
					</view>
				</view>
				

			</view>

			<!-- Photo Display Area -->
			<view class="photo-section">
				<!-- 网格视图 -->
				<view v-if="viewMode === 'grid'">
					<!-- Area Item -->
					<view class="area-group" v-for="(area, aIdx) in globalData" :key="aIdx">
					<view class="action sub-title area-title">
						<text class="text-lg">{{ area.area_name }}</text>
						<text class="bg-blue"></text>
					</view>
					
					<!-- Point Card -->
					<view class="point-card" :class="{'mt-4': pIdx > 0}" v-for="(point, pIdx) in area.points" :key="pIdx">
						<view class="point-header">
							<u-icon name="map-fill" color="#0050cb" size="36" style="margin-right: 12rpx;"></u-icon>
							<text class="point-name">{{ point.point_name }}</text>
						</view>
						<view class="photo-grid-3">
							<view class="photo-item" v-for="(photo, p2Idx) in point.photos" :key="p2Idx">
								<view class="photo-wrapper">
									<image 
										:src="photo.url" 
										mode="aspectFill" 
										@click="handlePreview(point.photos, p2Idx)"
										style="background-color: #f0f2f5;"
									></image>
								</view>
								<view class="photo-meta">
									<text class="meta-title">{{ photo.title || point.point_name }}</text>
								</view>
							</view>
						</view>
						
						<view class="feedback-info">
							<text :class="point.has_feedback ? 'feedback-text-normal' : 'feedback-text-overdue'">
								{{ point.footer_text }}
							</text>
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
			<view v-show="currentTab === 1">
				<!-- 按日期倒序排列的选定点位的照片 -->
				<view class="photo-section" style="height: calc(100vh - 220rpx); display: flex; flex-direction: column;">
					<z-paging ref="paging" v-model="pointPhotosList" @query="getSingleData" :auto="false" :fixed="false" style="flex: 1; height: 100%;">
						<!-- 将检索区域移入 z-paging 内部，使其可随列表滚动 -->
						<view class="glass-panel controls-card" style="margin-bottom: 30rpx;">
							<!-- 选择点位 -->
							<view class="control-row">
								<text class="label">选择点位：</text>
								<view class="control-box flex-1" style="z-index: 100; position: relative;" @click.stop="openPointSelect">
									<view class="flex items-center flex-1">
										<u-icon name="map-fill" color="#0062ff" size="36" style="margin-right: 12rpx;"></u-icon>
										<text class="value-text font-headline">{{ selectedPointName || '请选择区域和点位' }}</text>
									</view>
									<u-icon name="arrow-down" color="#94a3b8" size="32"></u-icon>
								</view>
							</view>
							
							<!-- 日期范围 -->
							<view class="control-row">
								<text class="label">日期范围：</text>
								<view class="control-box flex-1" style="z-index: 100; position: relative;" @click.stop="openDateRange">
									<view class="flex items-center flex-1">
										<u-icon name="calendar" color="#0062ff" size="36" style="margin-right: 12rpx;"></u-icon>
										<text class="value-text font-headline">{{ dateRangeText || '请选择日期范围' }}</text>
									</view>
									<u-icon name="arrow-down" color="#94a3b8" size="32"></u-icon>
								</view>
							</view>
						</view>

						<!-- 列表内容 -->
						<view class="point-card" v-for="(item, index) in pointPhotosList" :key="index" style="margin-bottom: 30rpx;">
							<view class="point-header">
								<u-icon name="calendar-fill" color="#0062ff" size="32" style="margin-right: 12rpx;"></u-icon>
								<text class="point-name">{{ item.date_title }}</text>
							</view>
							<view class="photo-grid-3">
								<view class="photo-item" v-for="(photo, pIndex) in item.point_card.photos" :key="pIndex">
									<view class="photo-wrapper">
										<image 
											:src="photo.url" 
											mode="aspectFill" 
											@click="handlePreview(item.point_card.photos, pIndex)"
											style="background-color: #f0f2f5;"
										></image>
									</view>
									<view class="photo-meta">
										<text class="meta-title">{{ photo.title }}</text>
									</view>
								</view>
							</view>
							
							<view class="feedback-info">
								<text class="feedback-text-normal">{{ item.point_card.footer_text }}</text>
							</view>
						</view>
					</z-paging>
				</view>
			</view> <!-- End of Tab 2 -->

		</view>
		<!-- 页面内容结束 -->
		
		<!-- 弹出层组件 -->
		<u-select v-model="showPointSelect" mode="mutil-column-auto" :list="pointOptions" @confirm="confirmPointSelect" confirm-color="#0050cb"></u-select>
		<u-calendar v-model="showDateRange" mode="range" @change="confirmDateRange" active-bg-color="#0050cb" range-bg-color="rgba(0, 80, 203, 0.1)" range-color="#0050cb"></u-calendar>
		<u-calendar v-model="showGlobalDate" mode="date" @change="confirmGlobalDate" active-bg-color="#0050cb"></u-calendar>
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
				carouselPhotos: [], // 修改为直接从后端获取
				
				// 单点位分析相关状态
				pointOptions: [],
				pointPhotosList: [],
				
				viewMode: 'grid', // grid 或 carousel
				
				// 单点位分析状态
				selectedPointId: '',
				selectedPointName: '',
				startDate: '',
				endDate: '',
				dateRangeText: '',

				// 强制变量观察
				showPointSelect: false,
				showDateRange: false,
				showGlobalDate: false
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
			tabChange(index) {
				this.currentTab = index;
				if (index === 1 && this.selectedPointId) {
					this.$nextTick(() => {
						this.$refs.paging && this.$refs.paging.reload();
					});
				}
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
					this.carouselPhotos = res.carouselList || [];
					if (res.queryParam) {
						this.globalDate = res.queryParam.date;
						this.globalShiftType = res.queryParam.shiftType;
					}
				}
				uni.hideLoading();
			},
			async getSingleData(pageIndex, pageSize) {
				console.log('Querying single data...', pageIndex, pageSize);
				if (!this.selectedPointId) {
					console.log('No point selected, skipping query');
					this.$refs.paging && this.$refs.paging.complete([]);
					return;
				}
				let res = await vk.callFunction({
					url: 'client/feedback/kh/getLiveStatus',
					data: {
						mode: 'single',
						pointId: this.selectedPointId,
						startDate: this.startDate,
						endDate: this.endDate,
						pageIndex,
						pageSize
					}
				});
				if (res.code === 0) {
					this.$refs.paging && this.$refs.paging.complete(res.list);
				} else {
					this.$refs.paging && this.$refs.paging.complete(false);
				}
			},
			openPointSelect() {
				console.log('Attempting to open Point Select');
				if (this.pointOptions.length === 0) {
					uni.showToast({ title: '点位列表加载中...', icon: 'none' });
					this.getRegionAndPositionList();
				}
				this.showPointSelect = true;
			},
			openDateRange() {
				console.log('Attempting to open Date Range');
				this.showDateRange = true;
			},
			confirmPointSelect(e) {
				console.log('Point selection confirmed:', e);
				if (e && e.length >= 2) {
					let region = e[0].label;
					let point = e[1].label;
					this.selectedPointId = e[1].value;
					this.selectedPointName = `${region} - ${point}`;
				} else if (e && e.length === 1) {
					this.selectedPointId = e[0].value;
					this.selectedPointName = e[0].label;
				}
				if (this.selectedPointId) {
					this.$nextTick(() => {
						this.$refs.paging && this.$refs.paging.reload();
					});
				}
			},
			confirmDateRange(e) {
				// vk-uview-ui @change 返回 { startDate, endDate } 直接属性
				this.startDate = e.startDate || '';
				this.endDate = e.endDate || '';
				if (this.startDate && this.endDate) {
					this.dateRangeText = `${this.startDate} 至 ${this.endDate}`;
					if (this.selectedPointId) {
						this.$nextTick(() => {
							this.$refs.paging && this.$refs.paging.reload();
						});
					}
				}
			},
			confirmGlobalDate(e) {
				// 日期单选 @change 返回 { result } 字符串
				this.globalDate = e.result || e.startDate || e;
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
					this.$refs.paging && this.$refs.paging.reload();
					uni.showToast({ title: '条件已清空', icon: 'none' });
				}
			},
			handleQuery(tabIndex) {
				if (tabIndex === 0) {
					this.getGlobalData();
				} else {
					this.$refs.paging && this.$refs.paging.reload();
				}
			},
			handlePreview(photos, index) {
				if (!photos || !photos[index]) return;
				uni.previewImage({
					current: photos[index].url,
					urls: photos.map(p => p.url)
				});
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
	cursor: pointer;
	pointer-events: auto;
	&:active {
		opacity: 0.7;
	}
	
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
	margin-bottom: 16rpx;
}

.action.sub-title {
  position: relative;
  display: inline-block;
  margin-left: 0;
  align-self: flex-start;
}

.action.sub-title .text-lg {
  position: relative;
  z-index: 1;
  font-size: 36rpx;
  font-weight: 800;
  color: #1a1d20 !important;
  letter-spacing: -0.5rpx;
  font-family: 'Manrope', sans-serif;
}

.action.sub-title .bg-blue {
  position: absolute;
  display: inline-block;
  bottom: 0rpx;
  border-radius: 4rpx;
  width: 100%;
  height: 14rpx;
  left: 0;
  opacity: 0.4;
  z-index: 0;
  background-color: #0062ff !important;
}

.feedback-info {
	margin-top: 8rpx;
	padding-top: 24rpx;
	border-top: 1px dashed rgba(194, 198, 216, 0.6);
	font-size: 24rpx;
	color: #e53e3e;
	font-weight: 600;
	display: flex;
	justify-content: flex-start;
}

.feedback-text-normal {
	color: #e53e3e;
}

.feedback-text-overdue {
	color: #999999;
	font-weight: 400;
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
		width: 100%;
		height: 190rpx; // 针对 3 列布局的显式高度，兼容性更好
		border-radius: 24rpx;
		overflow: hidden;
		background-color: #f0f2f5;
		border: 1px solid rgba(0, 80, 203, 0.1);
		box-shadow: 0 8rpx 24rpx rgba(0, 80, 203, 0.05);
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		
		image {
			width: 100%;
			height: 100%;
			display: block;
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
