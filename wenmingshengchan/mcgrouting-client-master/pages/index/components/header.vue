<template>
<view class="header" :style="{background: colors}">
  <!-- 头部 -->
	<!-- #ifdef APP-PLUS -->
	<div class="status-bar" :style="{height:statusBarHeight+'px'}"></div>
	<!-- #endif -->
	<view class="place">
	</view>
   <view>
	   <view class="left">
	     
	     <view></view>
	   </view>
	   <view class="right" v-if="weatherName && weatherName!==''">
		 
	     <text></text>
	   </view>
   </view>
    <!-- 搜索 -->
    <!-- <search></search> -->
    <!-- 轮播图 -->
    <view class="swiper">
			<view class="swiper-box">
				<swiper circular="true" @change="swiperChange" previous-margin="25px" next-margin="25px">
					<swiper-item v-for="(item, index) in swiperList" :key="index"><image :src="item.img" mode="aspectFill" :class="currentSwiper !== index ?'swiper-item-side':''" lazy-load="true" ></image></swiper-item>
				</swiper>
				<view class="indicator">
          <view v-for="(item, index) in swiperList" :key="index" :class="currentSwiper >= index ? 'on' : 'dots'" :style="'width: ' + (currentSwiper >= index ? 100 / swiperList.length + '%' : '' )"></view>
        </view>
			</view>
		</view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      currentSwiper: 0,
      city: '北京',
     
      high: '',
      weatherName: '',
      latitude: '',
      longitude: '',
      todyWeather: {},
	  statusBarHeight: 20
    };
  },

  props: {
    colors: {
      type: String,
	  default:'red'
    },
	
	swiperList:{
		type:Array
	}
  },
  created() {
	
  },
  watch:{
	
  },
  methods: {
    swiperChange(e) {
      this.setData({
        currentSwiper: e.detail.current,
      });
    }
  }
};
</script>
<style scoped lang="scss">
	.header {
	  padding: 0 3%;
	  line-height: 80upx;
	  overflow: hidden;
	  height: 450upx;
	  color: #fff;
	  position: relative;
	}
	.place{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,.3), rgba(255,255,255,.5),#ffffff);
	}
	.left {
	  font-size: 26upx;
	  color: #333;
	  float: left;
	  height: 80upx;
	  color: #fff;
	  display: flex;
	  align-items: center;
	  align-items: center;
	  z-index: 800;
	}
	
	.left image {
	  width: 30upx;
	  height: 30upx;
	  float: left;
	  margin-right: 6upx;
	}
	.left view{
		width: 60vw;
		height: 30upx;
		line-height: 30upx;
		position: relative;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.right {
	  height: 80upx;
	  float: right;
	  font-size: 26upx;
	  display: flex;
	  align-items: center;
	}
	
	.right image {
	  width: 40upx;
	  height: 40upx;
	}
	
	.right text {
	  margin-left: 10upx;
	}
	
	.swiper {
	  width: 100%;
	  margin-top: 10upx;
	  display: flex;
	  justify-content: center;
	}
	
	.swiper-box {
	  width: 100%;
	  height: 45vw;
	  overflow: hidden;
	  /* border-radius: 15upx; */
	  /* box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2); */
	  position: relative;
	  z-index: 1;
	}
	
	.swiper-box swiper {
	  width: 100%;
	  height: 45vw;
	}
	.swiper-box swiper swiper-item{
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
	.swiper-box swiper swiper-item image {
	  width: 95%;
	  height: 45vw;
	  margin: 0 auto;
	  display: block;
	  border-radius: 10px;
	  transition: height .3s;
	}
	.swiper-item-side {
	  width: 95%;
	  height: 40vw!important;
	  transition: height .3s;
	}
	.indicator {
	  position: absolute;
	  bottom: 20upx;
	  left: 20upx;
	  background-color: rgba(255, 255, 255, 0.4);
	  width: 150upx;
	  height: 5upx;
	  border-radius: 3upx;
	  overflow: hidden;
	  display: flex;
	}
	
	.dots {
	  width: 0upx;
	  background-color: rgba(255, 255, 255, 1);
	  transition: all 0.3s ease-out;
	}
	
	.on {
	  width: 30%;
	  background-color: rgba(255, 255, 255, 1);
	  transition: all 0.3s ease-out;
	}
</style>