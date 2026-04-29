<template>


	<view class="cu-custom" :style="'height:' + CustomBar+ 'px;'">
		<view :class="'cu-bar fixed '  + (bgImage!=''?' none-bg text-white bg-img ':'')+ bgColor"
			:style="'height:' + CustomBar+ 'px;padding-top:' + StatusBar + 'px;' + (bgImage?'background-image:url(' + bgImage+')':'')"
			style="width: 100%;">
			<view v-if="bgColor.indexOf('bg-gradual')!=-1" class="wave-bg"></view>
			
			<view class="action" @tap="backPage" v-if="isBack">
				<view class="icon-svg-back"></view>
				<text>{{backText}}</text>
			</view>

			<view class="action border-custom" v-if="isCustom" :style="'width:' + Custom.width + 'px;height:' + Custom.height + 'px;margin-left:calc(750rpx - ' + Custom.right + 'px)'">
				<view class="icon-svg-back" @tap="backPage"></view>
				<view class="icon-svg-home" @tap="toHome"></view>
			</view>

			<view class="content " :style="'top:'+(StatusBar)+'px;'">
				{{title}}
				<slot name="title"></slot>
				<slot name="content"></slot>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="flex flex-wrap align-end" style="margin-right: 150rpx;">
				<view class="margin-left-xs cuIcon-scan" :class="scanBg" style="font-size: 50rpx;" v-if="showScan"
					@tap="scan"></view>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5||APP-PLUS -->
			<view class="flex flex-wrap align-end">
				<view class=" margin-left-xs cuIcon-scan" :class="scanBg" style="font-size: 50rpx;color: #0081ff;" v-if="showScan"
					@tap="scan"></view>
				<view class="text-blue margin-left margin-right  q5 icon-q5hongwaixian" style="font-size: 50rpx;" v-if="showScanApp"
					@tap="scanApp"></view>
			</view>

			<!-- #endif -->




		</view>

	</view>
</template>

<script>
	export default {
		data() {
			let statusBar = this.StatusBar;
			let customBar = this.CustomBar;
			let custom = this.Custom;
			if (!statusBar) {
				let e = uni.getSystemInfoSync();
				statusBar = e.statusBarHeight;
				// #ifndef MP
				customBar = statusBar + 50;
				// #endif
				// #ifdef MP-WEIXIN
				let customObj = uni.getMenuButtonBoundingClientRect();
				custom = customObj;
				customBar = customObj.bottom + customObj.top - e.statusBarHeight;
				// #endif
				// #ifdef MP-ALIPAY
				customBar = statusBar + e.titleBarHeight;
				// #endif
			}
			return {
				StatusBar: statusBar,
				CustomBar: customBar,
				Custom: custom,
			};
		},
		props: {
			bgColor: { type: String, default: '' },
			isCustom: { type: [Boolean, String], default: false },
			isBack: { type: [Boolean, String], default: false },
			bgImage: { type: String, default: '' },
			backText: { type: String, default: '返回' },
			title: { type: String, default: '' },
			showScan: { type: Boolean, default: false },
			showScanApp: { type: Boolean, default: false },
			scanBg: { type: String, default: 'text-gray' }
		},
		methods: {
			scan() { this.$emit('scan', {}); },
			scanApp() { this.$emit('scanApp', {}, 1, 2); },
			backPage() {
				uni.navigateBack({ delta: 1 });
			},
			toHome() {
				uni.reLaunch({ url: '/pages/index/index' });
			}
		}
	};
</script>
<style scoped lang="scss">
	.cu-custom {
		display: block;
		position: relative;
	}
	.cu-bar {
		display: flex;
		position: relative;
		align-items: center;
		min-height: 100rpx;
		justify-content: space-between;
	}
	.cu-bar.fixed {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 1024;
		box-shadow: 0 1rpx 6rpx rgba(0, 0, 0, 0.1);
	}
	.cu-bar .action {
		display: flex;
		align-items: center;
		height: 100%;
		justify-content: center;
		max-width: 100%;
		padding: 0 30rpx;
	}
	.cu-bar .content {
		position: absolute;
		text-align: center;
		width: calc(100% - 340rpx);
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		height: 60rpx;
		font-size: 32rpx;
		line-height: 60rpx;
		cursor: none;
		pointer-events: none;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		font-weight: bold;
	}
	.bg-white {
		background-color: #ffffff;
		color: #333333;
	}
	.bg-gradual-orange {
		background-image: linear-gradient(45deg, #ff9700, #ed1c24);
		color: #ffffff;
	}
	.bg-gradual-blue {
		background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
		color: #ffffff;
	}
	.gif-black {
		display: block;
		mix-blend-mode: screen;
	}
	.wave-bg {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 80rpx;
		background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 100' preserveAspectRatio='none'%3E%3Cpath fill='rgba(255,255,255,0.3)' d='M0 50 Q 250 0, 500 50 T 1000 50 L 1000 100 L 0 100 Z' /%3E%3Cpath fill='rgba(255,255,255,0.5)' d='M0 70 Q 250 20, 500 70 T 1000 70 L 1000 100 L 0 100 Z' /%3E%3C/svg%3E") repeat-x;
		background-size: 750rpx 100%;
		animation: wave-animation 4s linear infinite;
	}
	@keyframes wave-animation {
		0% { background-position: 0 0; }
		100% { background-position: -750rpx 0; }
	}
	.cu-bar .border-custom {
		position: relative;
		background: rgba(0, 0, 0, 0.15);
		border-radius: 1000rpx;
		height: 30px;
		display: flex !important;
		align-items: center;
		justify-content: space-between;
		padding: 0 !important;
	}
	.cu-bar .border-custom::after {
		content: " ";
		width: 200%;
		height: 200%;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: inherit;
		transform: scale(0.5);
		transform-origin: 0 0;
		pointer-events: none;
		box-sizing: border-box;
		border: 1rpx solid #ffffff;
		opacity: 0.5;
	}
	.cu-bar .border-custom::before {
		content: " ";
		width: 1rpx;
		height: 110%;
		position: absolute;
		top: 22.5%;
		left: 0;
		right: 0;
		margin: auto;
		transform: scale(0.5);
		transform-origin: 0 0;
		pointer-events: none;
		box-sizing: border-box;
		opacity: 0.6;
		background-color: #ffffff;
	}
	.cu-bar .border-custom view, .cu-bar .border-custom text {
		display: block;
		flex: 1;
		margin: auto !important;
		text-align: center;
		font-size: 34rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon-svg-back {
		width: 36rpx;
		height: 36rpx;
		background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath fill='white' d='M669.568 141.056l-371.2 370.944 371.2 370.944 33.92-33.92-337.28-337.024 337.28-337.024z'%3E%3C/path%3E%3C/svg%3E") no-repeat center;
		background-size: contain;
	}
	.icon-svg-home {
		width: 36rpx;
		height: 36rpx;
		background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath fill='white' d='M512 128L128 447.904V896h256V640h256v256h256V447.904L512 128z'%3E%3C/path%3E%3C/svg%3E") no-repeat center;
		background-size: contain;
	}
</style>