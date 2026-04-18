<template>
	<view>
		<!-- #ifndef MP-ALIPAY -->
				<cu-custom bgColor="bg-gradual-orange" :isCustom="true">
					<block slot="backText">返回</block>
					<block slot="content">写实列表</block>
				</cu-custom>
				<!-- #endif -->
		
		<!-- 当设置tab-width,指定每个tab宽度时,则不使用flex布局,改用水平滑动 -->
		<me-tabs v-model="tabIndex" :tabs="tabs" :fixed="true" :tab-width="250" :height="80"></me-tabs>
		<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
			<swiper-item v-for="(tab,i) in tabs" :key="i">
			
				<mescroll-item ref="mescrollItem" :i="i" :index="tabIndex" :tabs="tabs"></mescroll-item>
				
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import MescrollItem from "./mescroll-swiper-item.vue";
	
	export default {
		components: {
			MescrollItem
		},
		data() {
			return {
				height: "400px", // 需要固定swiper的高度
				tabs: [{name:'探水注浆'}, {name:'材料进场'}, {name:'材料下井'}],
				tabIndex: 0 // 当前tab的下标
			}
		},
		methods: {
			// 轮播菜单
			swiperChange(e){
				this.tabIndex = e.detail.current
			},
		},
		onLoad() {
			// 需要固定swiper的高度
			this.height = uni.getSystemInfoSync().windowHeight + 'px'
		},
		onShow() {
			
		}
	}
</script>

<style>
</style>
