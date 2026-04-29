<!-- 滑动无渐变效果 -->
<template>
	<view>
		<xichaSwipeV1 :swiperImgs="swiperImgs"></xichaSwipeV1>
	</view>
</template>

<script>
import { data1 } from "@/components/xichaSwipe/imageData.js"
import xichaSwipeV1 from '@/components/xichaSwipe/xichaSwipeV1.vue'
export default {
	components: {
		xichaSwipeV1
	},
	data() {
		return {
			swiperImgs: data1
		}
	},
	onLoad() {},
	methods: {}
}
</script>

<style lang="scss">
</style>