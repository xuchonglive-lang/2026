<template>
	<view class="">
		<view v-if="showPopup" class="remark"></view>
		<view class="dialog" :class="{show: showPopup}">
			<view class="dialog-content">
				<view class="flex bold">
					<image class="logo" mode="" src="@/static/logo.png" />
					<text class="name">xxx小程序</text>
					<text class="tip">申请</text>
				</view>
				<view class="subtitle">获取您的头像、昵称</view>
				<view class="flex avatar-box bottom_link">
					<text class="label">头像</text>
					<view class="flex_1 flex">
						<image class="avatar" mode="" :src="avatar || '/static/avatar.png'" />
					</view>
					<image class="right-arrow" mode="" src="@/static/right-arrow.png" />
					<button class="author-btn" open-type="chooseAvatar" @chooseavatar="chooseavatar" />
				</view>
				<view class="form-item flex bottom_link">
					<text class="label">昵称</text>
					<input
						v-model="nickname"
						class="flex_1"
						:disabled="!nicknameFocus"
						:focus="nicknameFocus"
						:maxlength="16"
						placeholder="点击填写"
						placeholder-class="color_7"
						type="nickname"
						@change="nicknameInput"
						@touchstart="requirePrivacyAuthorize"
					>
					<image class="right-arrow" mode="" src="@/static/right-arrow.png" />
				</view>
				<view class="accept center bold" @click="accept">
					允许
				</view>
				<view class="refuse center" @click="showPopup=false">
					拒绝
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showPopup: false,
			avatar: '',
			nickname: '',
			// 昵称输入框焦点
			nicknameFocus: false
		}
	},
	methods: {
		show() {
			this.showPopup = true
		},
		
		chooseavatar(v) {
			this.avatar = v.detail.avatarUrl
		},
		
		nicknameInput(e) {
			this.nickname = e.detail.value
		},
		
		async accept() {
			if(!this.avatar) {
				uni.showToast({
					title: '请授权头像',
					icon: 'none'
				})
				return
			}
			if(!this.nickname) {
				uni.showToast({
					title: '请授权昵称',
					icon: 'none'
				})
				return
			}
			
			uni.showLoading({
				title: '请稍后'
			})
			
			// 模拟请求接口，提交数据
			setTimeout(()=>{
				console.log('数据已提交', '头像：', this.avatar, '昵称：', this.nickname);
				this.showPopup = false
				uni.hideLoading()
				this.$emit('accept', {
					avatar: this.avatar,
					nickname: this.nickname
				})
			}, 1500)
		},

		requirePrivacyAuthorize() {
			// 此方法需要在小程序开放平台配置【用户隐私保护指引】并审核通过后生效。 https://mp.weixin.qq.com/wxamp/basicprofile/index
			if (uni.requirePrivacyAuthorize) {
				uni.requirePrivacyAuthorize({
					success: ()=> {
						this.nicknameFocus = true
					},
					fail: ()=> {
						this.nicknameFocus = false
					}
				})
			} else {
				// 不支持隐私协议接口，会自动降级为text输入框
				this.nicknameFocus = true
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.flex {
		display: flex;
		align-items: center;
	}
	
	.flex_center {
		@extend .flex;
		justify-content: center;
	}
	
	.flex_1 {
		flex: 1;
	}
	
	.bold {
		font-weight: bold;
	}

	view {
		box-sizing: border-box;
		font-size: 28rpx;
	}
	
	.remark {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .3);
		z-index: 202401;
	}
	.dialog {
		border-radius: 40rpx 40rpx 0 0;
		background: #fff;
		min-height: 680rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 202402;
		transform: translateY(200%);
		transition: transform 0.3s ease-out;
		&.show {
			transform: translateY(0);
			transition: transform 0.3s ease-in;
		}
	}
	.dialog-content {
		padding: 42rpx;
		.subtitle {
			font-weight: bold;
			font-size: 34rpx;
			margin-top: 40rpx;
		}
		.logo {
			width: 46rpx;
			height: 46rpx;
			border-radius: 50%;
			margin-right: 10rpx;
		}
		.label {
			font-size: 30rpx;
			margin-right: 30rpx;
		}
		.name {
			margin-right: 20rpx;
		}
		.avatar-box {
			margin-top: 40rpx;
			height: 110rpx;
			position: relative;
			.avatar {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
			}
		}
		.author-btn {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 3;
			top: 0;
			left: 0;
			opacity: 0;
		}
		.form-item {
			position: relative;
			height: 110rpx;
			background: #FFFFFF;
			border-radius: 32rpx;
			margin-bottom: 60rpx;

			input {
				padding: 0 10rpx;
			}
		}
		.right-arrow {
			width: 30rpx;
			height: 30rpx;
		}
		.accept {
			color: #2a63c2;
			background: #e8efff;
			border-radius: 8rpx;
			padding: 20rpx;
			text-align: center;
		}
		.refuse {
			color: #555;
			padding: 20rpx;
			margin-top: 20rpx;
			text-align: center;
		}
	}
	.bottom_link {
		position: relative;
		&::after {
			content: '';
			background-color: #EAEEFC;
			width: 100%;
			height: 2rpx;
			display: block;
			position: absolute;
			right: 0;
			bottom: 0;
			transform: scaleY(0.6);
		}
	}
	
</style>
