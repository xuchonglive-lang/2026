<template>
	<view class="home">

		<!-- 顶部 -->
		<headers :colors="colors" :swiperList="swiperList"></headers>
		<!-- 公告 -->
		<view class="container">

			<button class="cu-btn block line-blue lg margin" @tap="toDailypaper()">
				<text class="cuIcon-text icon"></text> 探水注浆写实日报
			</button>



			<view class="items">
				<view class="header">
					<view class="name">
						<cl-icon name="cl-icon-chart-pie" color="#707070"></cl-icon>
						进行中的探水注浆项目
					</view>
					<u-line color="#DCDFE6"></u-line>
				</view>
				<view class="loading" v-if="loading">
					<u-loading :show="loading" size="45" mode="flower"></u-loading>
				</view>
				<!-- *********************一条 开始******************************************* -->
				<view class="content" v-for="(item, index) in completedlist" :key="item._id" @tap="toAnalyse(item._id)">

					<view class="point">
						<u-section :title="item.rlp_string" :right="false"></u-section>
					</view>
					<!-- 行内容  end-->
					<view class="remark">
						<view class="row">
							<view class="label">施工单位</view>
							<view class="value">{{item.team_name}}</view>
						</view>
						<view class="row">
							<view class="label">工期(天)</view>
							<view class="value">{{item.time_limit}}</view>
						</view>
						<view class="row">
							<view class="label">探水孔数(个)</view>
							<view class="value">{{item.drill_num}}</view>
						</view>
						<view class="row">
							<view class="label">探水孔设计深度(m)</view>
							<view class="value">{{item.depth_design}}</view>
						</view>
					</view>
				</view>
				<!-- *********************一条 结束******************************************* -->

			</view>

		</view>


		<view class="container padding-xl radius shadow bg-white">

			<view class="items">
				<view class="header">
					<view class="name">
						<cl-icon name="cl-icon-check" color="#707070"></cl-icon>
						已完成的探水注浆项目
					</view>

					<u-line color="#DCDFE6"></u-line>
				</view>
				<view class="loading" v-if="loading">
					<u-loading :show="loading" size="45" mode="flower"></u-loading>
				</view>
				<!-- *********************一条 开始******************************************* -->
				<view class="content" v-for="(item, index) in nocompletelist" :key="item._id"
					@tap="toAnalyse(item._id)">

					<view class="point">
						<u-section :title="item.rlp_string" :right="false"></u-section>
					</view>
					<!-- 行内容  end-->
					<view class="remark">
						<view class="row">
							<view class="label">施工单位</view>
							<view class="value">{{item.team_name}}</view>
						</view>
						<view class="row">
							<view class="label">工期(天)</view>
							<view class="value">{{item.time_limit}}</view>
						</view>
						<view class="row">
							<view class="label">探水孔数(个)</view>
							<view class="value">{{item.drill_num}}</view>
						</view>
						<view class="row">
							<view class="label">探水孔设计深度(m)</view>
							<view class="value">{{item.depth_design}}</view>
						</view>
					</view>
				</view>
				<!-- *********************一条 结束******************************************* -->

			</view>

		</view>
	</view>
</template>

<script>
	var that; // 当前页面对象
	var vk; // vk依赖
	import headers from './components/header.vue';

	export default {
		data() {
			return {
				loading: true,
				completedlist: [],
				nocompletelist: [],
				colors: '',
				
				swiperList: [{
					img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-696bea48-0666-46a5-a113-0e3fd17caa88/e5ab4e70-f261-4cfc-9fad-b9c1d0d32ca8.png'
				}, {
					img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-696bea48-0666-46a5-a113-0e3fd17caa88/0aa7428c-b42f-4fc7-b223-c36fc641c53e.png'
				}, {
					img: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-696bea48-0666-46a5-a113-0e3fd17caa88/09a62e2f-0f1e-493c-aecc-d6d8f5a02f7e.png'
				}],
				noticeList: []
			};
		},
		components: {
			headers

		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			// #ifdef APP-PLUS
			this.bottoms = '0' //在APP下 规格弹窗的位置发生变化
			// #endif
			that = this;
			vk = that.vk;

			this.getPointList()




		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.setData({
				colors: "#FF4500",
			});
			uni.setNavigationBarColor({ //设置标题栏颜色
				backgroundColor: "#FF4500",
				frontColor: '#ffffff'
			});


		},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			toDailypaper(){
				vk.navigateTo('/pages/index/dailypaper/dailypaper');
			},
			toAnalyse(id) {
				vk.setVuex('$point_id', id);
				vk.navigateTo('/pages/analyse/analyse');


			},
			async getPointList() {
				let data1 = await vk.callFunction({
					url: 'client/user/pub/getPointListForIndex',

					data: {
						complete: 1,
					}

				});

				let data2 = await vk.callFunction({
					url: 'client/user/pub/getPointListForIndex',

					data: {
						complete: 2,
					}

				});

				this.completedlist = data1.rows
				this.nocompletelist = data2.rows
				this.loading = false;

			}
		}

	};
</script>
<style scoped lang="scss">
	.icon {
		font-size: 50rpx;

	}

	.margin {
		margin-bottom: 50rpx;
	}

	.loading {
		margin: 0rpx auto;

	}

	.home {
		margin-bottom: 40rpx;


		.loading {
			height: 80upx;
			line-height: 80upx;
			text-align: center;
			color: #ccc;
			font-size: 24upx;
			width: 100%;
			margin-bottom: 20upx;
		}

		.container {
			width: 98%;
			margin: 35rpx auto;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			padding: 15rpx 10rpx;
			box-shadow: $box-shadow;

			.items {
				.header {

					border-radius: 25rpx;

					.name {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						margin: 5rpx 15rpx;
						font-size: 29rpx;
						color: #707070;
						font-weight: 600;
						text-align: left;
					}
				}


				.content {
					padding: 15rpx 10rpx;
					border: #DCDFE6 solid 1rpx;
					border-radius: 15rpx;
					margin-top: 20rpx;


					.point {
						display: flex;
						justify-content: flex-start;
						padding: 5rpx 10rpx;
					}

					.remark {
						.row {
							display: flex;
							justify-content: space-around;
							margin: 20rpx;

							.label {
								width: 45%;
								text-align: left;
								font-size: 28rpx;
								color: #6e6e6e;
							}

							.value {
								width: 55%;
								text-align: right;
								font-size: 28rpx;
								color: #000000;

							}
						}
					}


				}
			}
		}
	}
</style>
