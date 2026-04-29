<template>
	<view>
		<view v-if="swiperImgs.length" style="position: relative">
			<!-- 这里单独开一层，用于处理底层轮播图，需要定位位置、根据下面的轮播来处理对应的数据 -->
			<view class="qm-banner-underImg uperUderImg">
				<view class="aaaa" v-for="(item,index) in underImgList" :style="{'opacity':item.opacity }">
					<image lazy-load :src="item.underImg" style="width: 100%;height:400px"></image>
				</view>
			</view>
			<swiper class="v-qm-banner" style="height:400px" :autoplay="true" circular :current="currentIndex" @transition="ontransition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(item2,index2) in swiperImgs">
					<view catchtap="bindLink" :data-item="item2" :style="{'height':'200px'}">
						<image lazy-load mode="widthFix" class="image" :src="item2.textImg"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		swiperImgs: {
			type: Array,
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
	computed: {},
	mounted() {
		var that = this
		// 过滤当前可显示的数据
		that.underImgList = []
		that.swiperImgs.forEach((item, index) => {
			if (index == 0) item.opacity = 1
			else item.opacity = 0
			that.underImgList.push({ index: index, underImg: item.underImg, opacity: item.opacity })
		})
		//
		uni.getSystemInfo({
			success: function(info) {
				console.log('屏幕宽度：' + info.windowWidth);
				that.windowWidth = info.windowWidth;
			}
		});
	},
	methods: {
		animationfinish(data) {
			var that = this
			this.currentIndex = data.detail.current
			console.log(data.detail.current)
			that.underImgList.forEach((item, index) => {
				if (index == that.currentIndex) {
					item.opacity = 1
				} else {
					item.opacity = 0
				}
			})
		},
		ontransition(data) {
			var that = this
			that.dx = data.detail.dx
			//调节渐变切换速度
			var per1 = 1.7
			var per2 = 1.7
			if (that.dx >= 0) {
				if (that.currentIndex + 1 == that.underImgList.length) {
					that.underImgList[that.currentIndex].opacity = (1 - (that.dx / that.windowWidth) * per1)
					that.underImgList[0].opacity = (that.dx / that.windowWidth) * per2
				} else {
					that.underImgList[that.currentIndex].opacity = (1 - (that.dx / that.windowWidth) * per1)
					that.underImgList[that.currentIndex + 1].opacity = (that.dx / that.windowWidth) * per2
				}
			} else {
				if (that.currentIndex == 0) {
					that.underImgList[that.currentIndex].opacity = (1 - (-that.dx / that.windowWidth) * per1)
					that.underImgList[that.underImgList.length - 1].opacity = (-that.dx / that.windowWidth) * per2
				} else {
					that.underImgList[that.currentIndex].opacity = (1 - (-that.dx / that.windowWidth) * per1)
					that.underImgList[that.currentIndex - 1].opacity = (-that.dx / that.windowWidth) * per2
				}
			}
		},
	}
}
</script>

<style lang="scss">
// banner
.v-qm-banner {
	z-index: 999;
	background: transparent;

	.image {
		width: 100%;
	}

	.qm-banner-swiper-item {
		position: relative;
	}

	.underImg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 390rpx;
	}

	.qm-banner-swiper-item-box {
		background-size: cover;
		opacity: 0;
		transition-property: opacity;
	}
}

.qm-banner-underImg {
	position: absolute;
	left: 50%;
	transform: translate(-50%);
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
	transition: 1s;
}
</style>