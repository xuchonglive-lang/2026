<template>
	<view class="content">
		<image class="logo" src="/static/logo.png" @click="auth"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<AuthDialog ref="AuthDialog" @accept="accept"></AuthDialog>
	</view>
</template>

<script>
	import AuthDialog from '@/components/AuthDialog.vue'
	export default {
		components: {
			AuthDialog
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			auth() {
				this.$refs.AuthDialog.show()
			},
			accept(data) {
				this.title = 'Hello，' + data.nickname
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
