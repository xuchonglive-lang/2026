<template>
	<view class="">
		<view v-if="showPopup" class="remark"></view>
		<view class="dialog" :class="{show: showPopup}">
			<view class="dialog-content">
				<view class="flex bold">
					<image class="logo" mode="" src="/static/logo.png" />
					<text class="name font-manrope">文明生产管理系统</text>
					<text class="tip">安全授权</text>
				</view>
				<view class="subtitle font-manrope">获取您的头像、昵称</view>
				
				<view class="flex avatar-box bottom_link">
					<text class="label font-inter">头像</text>
					<view class="flex_1 flex">
						<image v-if="avatar" class="avatar" mode="aspectFill" :src="avatar" />
						<view v-else class="avatar"></view>
					</view>
					<button class="author-btn" open-type="chooseAvatar" @chooseavatar="chooseavatar" />
				</view>

				<view class="form-item flex bottom_link">
					<text class="label font-inter">昵称</text>
					<input
						v-model="nickname"
						class="flex_1 font-inter form-input"
						:disabled="!nicknameFocus"
						:focus="nicknameFocus"
						:maxlength="16"
						placeholder="点击填写昵称"
						placeholder-class="color_7"
						type="nickname"
						@change="nicknameInput"
						@touchstart="requirePrivacyAuthorize"
					>
				</view>
				
				<view class="action-box">
					<view class="accept center bold ambient-glow" @click="accept">
						允许并继续
					</view>
					<view class="refuse center" @click="refuse">
						暂不授权
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'AuthDialog',
	data() {
		return {
			showPopup: false,
			avatar: '',
			nickname: '',
			nicknameFocus: false
		}
	},
	methods: {
		show() {
			this.showPopup = true;
		},
		hide() {
			this.showPopup = false;
		},
		chooseavatar(v) {
			this.avatar = v.detail.avatarUrl;
		},
		nicknameInput(e) {
			this.nickname = e.detail.value;
		},
		async accept() {
			if(!this.avatar) {
				return uni.showToast({ title: '请授权头像', icon: 'none' });
			}
			if(!this.nickname) {
				return uni.showToast({ title: '请授权昵称', icon: 'none' });
			}
			uni.showLoading({ title: '处理中' });
			
			// 触发外部对接
			this.$emit('accept', {
				avatar: this.avatar,
				nickname: this.nickname
			});
		},
		refuse() {
			this.hide();
			this.$emit('refuse');
		},
		requirePrivacyAuthorize() {
			if (uni.requirePrivacyAuthorize) {
				uni.requirePrivacyAuthorize({
					success: () => {
						this.nicknameFocus = true;
					},
					fail: () => {
						this.nicknameFocus = false;
					}
				});
			} else {
				this.nicknameFocus = true;
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.flex { display: flex; align-items: center; }
	.flex_1 { flex: 1; }
	.bold { font-weight: bold; }
	.center { text-align: center; }

	.remark {
		position: fixed;
		top: 0; left: 0; width: 100%; height: 100%;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(4px);
		z-index: 202401;
	}
	
	.dialog {
		box-sizing: border-box;
		font-size: 28rpx;
		border-radius: 40rpx 40rpx 0 0;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		color: #191c1e;
		min-height: 600rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		width: 100%;
		position: fixed;
		left: 0; bottom: 0;
		z-index: 202402;
		transform: translateY(100%);
		transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
		border-top: 1px solid rgba(255,255,255,0.8);
		
		&.show {
			transform: translateY(0);
		}
	}
	
	.dialog-content {
		box-sizing: border-box;
		padding: 50rpx;
		.subtitle {
			font-size: 34rpx;
			margin-top: 40rpx;
			color: #424656;
		}
		.logo { width: 46rpx; height: 46rpx; border-radius: 8rpx; margin-right: 15rpx; }
		.name { margin-right: 20rpx; font-size: 32rpx; color: #191c1e; font-weight: 700; }
		.tip { background: rgba(0, 80, 203, 0.1); color: #0050cb; padding: 4rpx 12rpx; border-radius: 6rpx; font-size: 22rpx;}
		
		.label { font-size: 30rpx; margin-right: 30rpx; width: 80rpx; color: #424656; }
		
		.avatar-box {
			margin-top: 60rpx; height: 120rpx; position: relative;
			.avatar { width: 80rpx; height: 80rpx; border-radius: 12rpx; background: #e0e3e5; }
		}
		.author-btn {
			position: absolute; width: 100%; height: 100%;
			z-index: 3; top: 0; left: 0; opacity: 0;
		}
		
		.form-item {
			position: relative; height: 120rpx; margin-bottom: 60rpx;
			.form-input { padding: 0; font-size: 30rpx; color: #191c1e;}
		}
		
		.action-box {
			margin-top: 80rpx;
		}
		
		.accept {
			color: #ffffff;
			background: #0066ff; 
			border-radius: 12rpx;
			padding: 24rpx;
			font-size: 32rpx;
			text-transform: uppercase;
			letter-spacing: 1px;
			box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.2);
			transition: all 300ms cubic-bezier(0.2, 0.8, 0.2, 1);
			&:active {
				transform: scale(0.95);
			}
		}
		.refuse {
			color: #727687;
			padding: 24rpx;
			margin-top: 20rpx;
		}
	}
	
	.bottom_link {
		position: relative;
		&::after {
			content: '';
			background-color: rgba(0, 0, 0, 0.05);
			width: 100%; height: 2rpx;
			display: block;
			position: absolute; right: 0; bottom: 0;
		}
	}
</style>
