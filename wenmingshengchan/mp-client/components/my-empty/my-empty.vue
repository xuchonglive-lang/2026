<template>
	<view class="my-empty-wrap">
		<u-empty
			:mode="mode"
			:text="text"
			:icon="icon"
			width="300"
			height="300"
		>
			<slot></slot>
		</u-empty>
	</view>
</template>

<script>
	/**
	 * 全局通用空状态组件 (用于 z-paging 及其他场景)
	 */
	export default {
		name: "my-empty",
		props: {
			mode: {
				type: String,
				default: 'data'
			},
			text: {
				type: String,
				default: '这里什么都没有呢~'
			},
			icon: {
				type: String,
				default: 'http://cdn.uviewui.com/uview/empty/data.png'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-empty-wrap {
		width: 100%;
		min-height: 400rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 60rpx 0;
	}
</style>
