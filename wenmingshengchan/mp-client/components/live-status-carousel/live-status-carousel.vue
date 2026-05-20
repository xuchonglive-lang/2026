<template>
	<view class="live-carousel-wrapper">
		<view v-if="swiperImgs.length" style="position: relative">
			<!-- 底层背景图（带渐变切换效果） -->
			<view class="qm-banner-underImg uperUderImg">
				<view class="aaaa" v-for="(item, index) in underImgList" :key="index" :style="{ 'opacity': item.opacity }">
					<image lazy-load :src="item.underImg" style="width: 100%; height: 400px" mode="aspectFill"></image>
				</view>
			</view>
			<!-- 顶层轮播（显示文字信息） -->
			<swiper class="v-qm-banner" style="height:400px" :autoplay="true" circular :current="currentIndex"
				@transition="ontransition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(item2, index2) in swiperImgs" :key="index2"
					@click="handlePreview">
					<view class="content-box">
						<view class="glass-text-card">
							<view class="info-item">
								<text class="info-label">点位：</text>
								<text class="info-value">{{ item2.remark }}</text>
							</view>
							<view class="info-item">
								<text class="info-label">信息：</text>
								<text class="info-value">{{ item2.dateText }}</text>
							</view>

						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view v-else class="empty-state">
			<text>暂无实时数据</text>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		swiperImgs: {
			type: Array,
			default: () => []
		},
	},
	data() {
		return {
			currentIndex: 0,
			underImgList: [],
			windowWidth: 0,
			dx: 375,
		}
	},
	watch: {
		swiperImgs: {
			handler(newVal) {
				this.initUnderImgList();
			},
			immediate: true,
			deep: true
		}
	},
	mounted() {
		var that = this;
		uni.getSystemInfo({
			success: function (info) {
				that.windowWidth = info.windowWidth;
			}
		});
	},
	methods: {
		initUnderImgList() {
			var that = this;
			that.underImgList = [];
			if (!this.swiperImgs) return;
			this.swiperImgs.forEach((item, index) => {
				let opacity = (index == 0) ? 1 : 0;
				that.underImgList.push({
					index: index,
					underImg: item.underImg,
					opacity: opacity
				});
			});
		},
		animationfinish(data) {
			var that = this;
			this.currentIndex = data.detail.current;
			that.underImgList.forEach((item, index) => {
				if (index == that.currentIndex) {
					item.opacity = 1;
				} else {
					item.opacity = 0;
				}
			});
		},
		ontransition(data) {
			var that = this;
			if (!that.windowWidth) return;
			that.dx = data.detail.dx;
			// 调节渐变切换速度
			var per1 = 1.7;
			var per2 = 1.7;
			if (that.dx >= 0) {
				if (that.currentIndex + 1 == that.underImgList.length) {
					if (that.underImgList[that.currentIndex]) that.underImgList[that.currentIndex].opacity = (1 - (that.dx / that.windowWidth) * per1);
					if (that.underImgList[0]) that.underImgList[0].opacity = (that.dx / that.windowWidth) * per2;
				} else {
					if (that.underImgList[that.currentIndex]) that.underImgList[that.currentIndex].opacity = (1 - (that.dx / that.windowWidth) * per1);
					if (that.underImgList[that.currentIndex + 1]) that.underImgList[that.currentIndex + 1].opacity = (that.dx / that.windowWidth) * per2;
				}
			} else {
				if (that.currentIndex == 0) {
					if (that.underImgList[that.currentIndex]) that.underImgList[that.currentIndex].opacity = (1 - (-that.dx / that.windowWidth) * per1);
					if (that.underImgList[that.underImgList.length - 1]) that.underImgList[that.underImgList.length - 1].opacity = (-that.dx / that.windowWidth) * per2;
				} else {
					if (that.underImgList[that.currentIndex]) that.underImgList[that.currentIndex].opacity = (1 - (-that.dx / that.windowWidth) * per1);
					if (that.underImgList[that.currentIndex - 1]) that.underImgList[that.currentIndex - 1].opacity = (-that.dx / that.windowWidth) * per2;
				}
			}
		},
		handlePreview() {
			if (!this.swiperImgs || this.swiperImgs.length === 0) return;
			let urls = this.swiperImgs.map(item => item.underImg).filter(u => u);
			uni.previewImage({
				current: this.currentIndex,
				urls: urls
			});
		}
	}
}
</script>

<style lang="scss">
.live-carousel-wrapper {
	width: 100%;
	border-radius: 24rpx;
	overflow: hidden;
	background: #000;
}

.v-qm-banner {
	z-index: 99;
	background: transparent;

	.swiper-item {
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

.content-box {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: 0;
	/* 取消外层间距实现全宽 */
}

.glass-text-card {
	background: rgba(0, 0, 0, 0.45);
	/* 回归暗色透明风格 */
	backdrop-filter: blur(15px);
	border-top: 1px solid rgba(255, 255, 255, 0.1);
	padding: 16rpx 30rpx;
	/* 压缩垂直高度 */
	width: 100%;
	/* 宽度与图片一致 */
	margin-bottom: 0;
	/* 紧贴底部 */
}

.info-item {
	display: flex;
	margin-bottom: 4rpx;

	/* 紧凑排列 */
	&:last-child {
		margin-bottom: 0;
	}

	.info-label {
		color: rgba(255, 255, 255, 0.6);
		font-size: 24rpx;
		width: 80rpx;
	}

	.info-value {
		color: #ffffff;
		font-size: 24rpx;
		font-weight: 500;
		flex: 1;
	}
}

.qm-banner-underImg {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
}

.uperUderImg {
	width: 100%;
	height: 100%;
}

.aaaa {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 0;
	width: 100%;
	height: 100%;
	transform: translate(0%, 0) translateZ(0);
	transition: 0.3s; // 加快基础切换响应
}

.empty-state {
	height: 400px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #666;
	background: #f8f8f8;
}
</style>
