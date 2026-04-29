<template>
	<view style="position: relative">
		<!-- 这里单独开一层，用于处理底层轮播图，需要定位位置、根据下面的轮播来处理对应的数据 -->
		<view class="qm-banner-underImg uperUderImg">
			<view class="aaaa" v-for="(item,index) in underImgList" :style="{'opacity':index == currentIndex?'1':'0'}">
				<image lazy-load :src="item.underImg" style="width: 100%;height:400px"></image>
			</view>
		</view>
		<swiper class="v-qm-banner" style="height:400px" :autoplay="true" circular :indicator-active-color="indicatorStyle" :data-index="currentIndex" @change="swiperChange">
			<swiper-item class="swiper-item" v-for="(item2,index2) in swiperImgs">
				<view catchtap="bindLink" :data-item="item2" :style="{'height':'200px'}">
					<image lazy-load mode="widthFix" class="image" :src="item2.textImg"></image>
				</view>
			</swiper-item>
		</swiper>
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
			underImgList: []
		}
	},
	mounted() {
		this.handleSwiperData()
	},
	methods: {
		handleSwiperData() {
			var that = this
			// 过滤当前可显示的数据
			that.underImgList = []
			that.swiperImgs.forEach((ele, index) => {
				that.underImgList.push({ index: index, underImg: ele.underImg })
			})

		},
		// 轮播变动
		swiperChange(currnet) {
			this.currentIndex = currnet.detail.current
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