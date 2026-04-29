<!-- 滑动有渐变效果 -->
<template>
	<view>
		<xichaSwipeV2 :swiperImgs="swiperImgs"></xichaSwipeV2>
	</view>
</template>

<script>
import { data2 } from "@/components/xichaSwipe/imageData.js"
import xichaSwipeV2 from '@/components/xichaSwipe/xichaSwipeV2.vue'
export default {
	components: {
		xichaSwipeV2
	},
	data() {
		return {
			swiperImgs: data2
		}
	},
	onLoad() {},
	methods: {}
}
</script>

<style lang="scss">
</style>