<template>
	<view>

		<!--有内容时开始-->


		<view class="order" v-for="(item, index) in groutingList" :key="item._id" @tap="toDetail(item._id)">

			<!-- 标题  start-->
			<view class="top">
				<view class="left">
					<uni-text class="cuIcon-titles text-blue"></uni-text>
					<view class="store">
						<view class="title fontsize">
							{{item.rlp_string}} {{item.drill.drill_name}}
						</view>

					</view>
				</view>
			</view>
			<!-- 标题  end-->
			
			


			<view class="padding bg-white closer" v-if="item.chushui>0">
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						出水点
					</view>
					<view class="cu-tag line-blue">
						深度:{{item.chushui}}m
					</view>

				</view>
			</view>
			
			<view class="padding bg-white closer" v-if="item.water_shift>0">
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						当班涌水量
					</view>
					<view class="cu-tag line-blue">
						单班水量:{{item.water_shift}}m³/h
					</view>
			
				</view>
			</view>


			<view class="padding bg-white closer" v-if="item.duanceng>0">
				<view class="cu-capsule radius">
					<view class='cu-tag bg-cyan '>
						断层破碎点
					</view>
					<view class="cu-tag line-cyan">
						深度:{{item.duanceng}}m
					</view>

				</view>
			</view>

			<view class="padding bg-white closer" v-if="item.depth90_drill>0||item.depth90_drill_sao>0">
				<view class="cu-capsule radius">
					<view class='cu-tag bg-red '>
						探水钻进
					</view>
					<view class="cu-tag line-red">
						钻孔完成:{{item.depth90_drill}}m
					</view>
					<view class="cu-tag line-red">
						扫孔完成:{{item.depth90_drill_sao}}m
					</view>
				</view>
			</view>

			<view class="padding bg-white closer" v-if="item.cement_sdone>0||item.waterglass_sdone>0">
				<view class="cu-capsule radius">
					<view class='cu-tag bg-grey '>
						材料消耗
					</view>
					<view class="cu-tag line-grey">
						水泥:{{item.cement_sdone}}t
					</view>
					<view class="cu-tag line-grey">
						水玻璃:{{item.waterglass_sdone}}t
					</view>
				</view>
			</view>

			<view class="padding bg-white closer" v-if="item.single_ratio">
				<view class="cu-capsule radius">
					<view class='cu-tag bg-mauve'>
						单液浆
					</view>
					<view class="cu-tag line-mauve">
						水灰比:{{item.single_ratio}}
					</view>
					<!-- <view class="cu-tag line-mauve">
						水泥浆:{{item.single_amount}}m³
					</view> -->
				</view>
			</view>

			<view class="padding bg-white closer" v-if="item.double_ratio">
				<view class="cu-capsule radius">
					<view class='cu-tag bg-olive '>
						双液浆
					</view>
					<view class="cu-tag line-olive">
						泥浆与水玻璃比:{{item.double_ratio}}
					</view>
					<!-- <view class="cu-tag line-olive">
						水玻璃:{{item.double_wgamount}}t
					</view>
					<view class="cu-tag line-olive">
						双液浆:{{item.double_dwamount}}m³
					</view> -->
				</view>
			</view>

<view class="padding bg-white closer" v-if="item.pressure_end>0">
				<view class="cu-capsule radius">
					<view class='cu-tag bg-yellow'>
						注浆压力
					</view>
					<!-- <view class="cu-tag line-yellow">
						初压:{{item.pressure_start}}Mpa
					</view> -->
					<view class="cu-tag line-yellow">
						终压:{{item.pressure_end}}Mpa
					</view>
				</view>
			</view>


			<view class="bottom">


				<view class="btn">现场写实人:</view>
				<view class="showZerenren">
					<image class="zerenren" :src="(item.avatar||'')" mode="aspectFill"></image>{{item.realName}}
				</view>
				<view class="duty"><text class="text">{{item.g_date.slice(0,10)}} {{item.shift}}</text></view>
			</view>


			<!-- 没有数据时显示 -->

		</view>



		<!--有内容时结束-->


	</view>
</template>

<script>
	var that; // 当前页面对象
	var vk; // vk依赖
	export default {
		props: {
			groutingList: {
				type: Array,
				default: []
			}
		},
		mounted() {
			that = this;
			vk = that.vk;

		},
		methods: {
			toDetail(id) {
				vk.navigateTo(`/pages/list/detail/grouting/groutingDetail?id=${id}`);

			}
		}
	}
</script>
<style lang="scss" scoped>
	page {
		background-color: #f8f8f8;
		min-height: 100vh;
	}

	.fontsize {
		font-size: 28rpx;
		color: #666666;
	}

	.closer {
		margin-bottom: -30rpx;


	}

	/* list 开始 */
	.vk-list-view {
		background-color: #f8f8f8;
	}

	.vk-list-view .list-view {
		padding: 0rpx 0rpx 20rpx 0rpx;
	}

	.vk-list-view .list-search {
		background-color: #ffffff;
		padding: 20rpx 30rpx;
	}

	.vk-list-view .list-head-desc-text {
		font-size: 28rpx;
		color: #999;
		padding: 20rpx 30rpx 0rpx 30rpx;
		padding-bottom: 0;
		line-height: 52rpx;
		width: 100%;
	}

	.vk-list-view .list-head-text-num {
		font-weight: bold;
		color: black;
		font-size: 26rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
	}

	/* list 结束 */



	/* 自定义的模块样式*/
	.showZerenren {
		margin-left: 15rpx;
		display: flex;
		justify-content: flex-start;

		.zerenren {
			width: 60rpx;
			height: 60rpx;
			border-radius: 15rpx;
			margin-right: 15rpx;
		}
	}

	.order {
		border: 1rpx solid #aaaaaa;
		width: 95%;
		background-color: #ffffff;
		margin: 30rpx auto;
		border-radius: 25rpx;
		box-sizing: border-box;
		padding: 10rpx;
		font-size: 28rpx;
		box-shadow: 1px 1px 1px #aaaaaa;

		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				width: 99%;
				display: flex;
				align-items: center;

				.store {
					overflow: hidden;
					text-overflow: ellipsis; //显示省略号
					-webkit-line-clamp: 2; //最多2行
					display: -webkit-box;
					-webkit-box-orient: vertical;
					white-space: normal;
					margin: 0 0rpx;
					font-size: 30rpx;
					font-weight: bold;
				}
			}


		}

		.items {
			display: flex;
			margin: 15rpx 10rpx;
			justify-content: flex-start;

			.left {
				display: flex;
				margin: 10 rpx 5 rpx;
				justify-content: flex-start;
				flex: 1;
			}

			.middle {
				display: flex;
				margin: 10 rpx 5 rpx;
				justify-content: flex-start;
				flex: 1;
			}

			.right {
				display: flex;
				margin: 10 rpx 5 rpx;
				justify-content: flex-start;
				flex: 1;
			}

			.title {
				background-color: red;
			}

			.value {
				background-color: yellow;

			}

		}

		.card-label {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
		}

		.bottom {
			width: 100%;
			display: flex;
			justify-content: space-around;
			line-height: 70rpx;
			margin-top: 20rpx;



			.btn {
				line-height: 60rpx;
				height: 60rpx;
				width: 30%;
				border-radius: 12rpx;
				border: 2rpx solid $u-tips-color;
				font-size: 28rpx;
				text-align: center;
				color: $u-tips-color;
				padding: 2rpx;
				margin-left: 10rpx;
				color: $u-type-primary;
				border-color: $u-type-primary;
			}

			.showZerenren {
				width: 40%;
			}

			.duty {
				width: 40%;
				text-align: right;


			}

			.evaluate {}
		}
	}




	.swiper-item {
		height: 100%;
	}
</style>
