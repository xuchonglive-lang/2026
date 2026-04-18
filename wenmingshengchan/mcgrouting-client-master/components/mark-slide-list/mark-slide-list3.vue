<template>
	<view>
		<view class="container">
			<view class="slide-box" v-for="(item, index) in listData" :key="index">
				<view class="slide-list" @touchstart="touchStart($event, index)" @touchend="touchEnd($event, index)"
					@touchmove="touchMove($event, index)" @tap="recover(index)"
					:style="{ transform: 'translate3d(' + item.slide_x + 'px, 0, 0)' }">



					<view class=" now-message-info" hover-class="uni-item--hover" :style="{ width: windowWidth + 'px' }"
						@click="clickItemMethod(item)">
						<!--start 在这里修改成自己的样式  -->
						<view class="order">
							<!-- 标题  start-->
							<view class="top">
								<view class="left">
									<uni-text class="cuIcon-titles text-blue"></uni-text>
									<view class="store">
										<view class="title fontsize">
											使用点位：{{item.point_name}}
										</view>

									</view>
								</view>
							</view>
							<!-- 标题  end-->



							<view class="padding bg-white closer" >
								<view class="cu-capsule radius">
									<view class='cu-tag bg-red '>
										下井单位及材料类型
									</view>
									<view class="cu-tag line-red">
										单位:{{item.team_name}}
									</view>
									<view class="cu-tag line-red">
										类型:{{item.material_name}}
									</view>
								</view>
							</view>

							<view class="padding bg-white closer" >
								<view class="cu-capsule radius">
									<view class='cu-tag bg-grey '>
										进场数量
									</view>
									<view class="cu-tag line-grey">
										水泥:{{item.num}}t
									</view>
									
								</view>
							</view>

							<view class="bottom">
								<view class="btn">现场写实人:</view>
								<view class="showZerenren">
									<image class="zerenren" :src="(item.avatar||'')" mode="aspectFill"></image>
									{{item.realName}}
								</view>
								<view class="duty"><text class="text">{{item.d_date.slice(0,10)}} {{item.shift}}</text>
								</view> 
							</view>


							<!-- 没有数据时显示 -->


						</view>

						<!--end 在这里修改成自己的样式 -->
					</view>



					<view class="group-btn">
						<view class="btn-div" v-for="(value, key) in button" :key="key"
							@click="clickMethod(item, value, index)" :style="{background: value.background}">
							{{value.title}}</view>
					</view>
					<view style="clear:both"></view>
				</view>
				<view class="list-item-border" v-if="border"></view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * m-slide-list 滑动操作列表
	 * @description 滑动操作列表组件
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=209
	 * @property {Array} list 数据源，格式为：[{title: 'xxx', image:'xxx', surname: 'xxx',detail:'xxx', rightDetail: 'xxx', slide_x: 0},{title: 'xxx', image:'xxx', surname: 'xxx',detail:'xxx', rightDetail: 'xxx', slide_x: 0}]
	 * @property {Array} button 按钮数据源，格式为：[{title: 'xxx', background:'xxx'},{title: 'xxx', background:'xxx'}]
	 * @property {Boolean} border 边框
	 */
	export default {
		name: 'mark-slide-list',
		props: {
			list: { //数据list
				type: Array,
				default () {
					return [];
				}
			},
			button: { //按钮数据list
				type: Array,
				default () {
					return [];
				}
			},
			border: { //边框
				type: Boolean,
				default: false
			}
		},
		computed: {
			windowWidth() {
				return uni.getSystemInfoSync().windowWidth;
			}
		},
		data() {
			return {
				listData: [],
				start_slide_x: 0,
				btnWidth: 0,
				startX: 0,
				LastX: 0,
				startTime: 0,
				itemIndex: 0
			};
		},
		mounted() {
			this.listData = this.clone(this.list)
		},
		watch: {
			list: {
				handler: function(val, oldval) {
					this.listData = this.clone(this.list)
				},
				deep: true
			}
		},
		methods: {
			clone(data) {
				const type = typeof data
				let obj;
				if (type === 'array') {
					obj = [];
				} else if (type === 'object') {
					obj = {};
				} else {
					// 不再具有下一层次
					return data;
				}
				if (type === 'array') {
					for (let i = 0, len = data.length; i < len; i++) {
						obj.push(this.clone(data[i]));
					}
				} else if (type === 'object') {
					// 对原型上的方法也拷贝了....
					for (const key in data) {
						obj[key] = this.clone(data[key]);
					}
				}
				return obj;
			},

			// 滑动开始
			touchStart(e, index) {
				if (this.itemIndex == index) {
					this.itemIndex = index
				}
				//记录手指放上去的时间
				this.startTime = e.timeStamp;
				//记录滑块的初始位置
				this.start_slide_x = this.listData[index].slide_x;
				// 按钮宽度
				//#ifdef MP-WEIXIN
				uni.createSelectorQuery().in(this).selectAll('.group-btn').boundingClientRect(res => {
					if (res != null) {
						this.btnWidth = res[index].width * -1;
					}
				}).exec();
				//#endif
				//#ifdef H5 || APP-PLUS
				uni.createSelectorQuery()
					.selectAll('.group-btn')
					.boundingClientRect()
					.exec(res => {
						if (res[0] != null) {
							this.btnWidth = res[0][index].width * -1;
						}
					});
				//#endif
				// 记录上一次开始时手指所处位置
				this.startX = e.touches[0].pageX;
				// 记录上一次手指位置
				this.lastX = this.startX;
				//初始化非当前滑动消息列的位置			
				for (var i in this.listData) {
					if (index != i) {
						this.listData[i].slide_x = 0;
					}
				}
			},
			// 滑动中
			touchMove(e, index) {
				const endX = e.touches[0].pageX;
				const distance = endX - this.lastX;
				// 预测滑块所处位置
				const duang = this.listData[index].slide_x + distance;
				// 如果在可行区域内
				if (duang <= 0 && duang >= this.btnWidth) {
					this.listData[index].slide_x = duang;
				}
				// 此处手指所处位置将成为下次手指移动时的上一次位置
				this.lastX = endX;
			},
			// 滑动结束
			touchEnd(e, index) {
				let distance = 10;
				const endTime = e.timeStamp;
				const x_end_distance = this.startX - this.lastX;
				if (Math.abs(endTime - this.startTime) > 200) {
					distance = this.btnWidth / -2;
				}
				// 判断手指最终位置与手指开始位置的位置差距
				if (x_end_distance > distance) {
					this.listData[index].slide_x = this.btnWidth;
				} else if (x_end_distance < distance * -1) {
					this.listData[index].slide_x = 0;
				} else {
					this.listData[index].slide_x = this.start_slide_x;
				}
			},
			// 点击回复原状
			recover(index) {
				this.listData[index].slide_x = 0;
			},
			/** 
			 * 点击按钮触发事件
			 * @param {Object} item 列表数据 
			 * @param {Object} buttonItem 按钮数据
			 * @param {Object} index 列表数据key
			 */
			clickMethod(item, buttonItem, index) {
				this.$emit("change", item, buttonItem, index)
			},
			/**
			 * 点击按钮触发事件
			 * @param {Object} item 列表数据 
			 */
			clickItemMethod(item) {
				this.$emit("click", item)
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {

		// padding: 20rpx 0;
		.slide-box {
			width: 100%;
			overflow: hidden;

			.list-item-border {
				width: 100%;
				border-bottom: 1px solid #f2f2f2;
			}

			.slide-list {
				transition: all 100ms;
				transition-timing-function: ease-out;
				min-width: 200%;
				height: 350rpx;

				.uni-item--hover {
					background-color: #f1f1f1 !important;
				}

				.now-message-info {
					position: relative;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					/* justify-content: space-between; */
					font-size: 16px;
					clear: both;
					height: 350rpx;
					padding: 0 30rpx;
					// margin-bottom: 20rpx;
					background: #ffffff;
					float: left;

					.icon-image {
						border-radius: 10rpx;
						width: 100rpx;
						height: 100rpx;
						float: left;
					}

					.icon-circle {
						background: #3396fb;
						border-radius: 100%;
						width: 100rpx;
						height: 100rpx;
						line-height: 100rpx;
						text-align: center;
						color: #ffffff;
						font-weight: bold;
						font-size: 20px;
						float: left;
					}

					.list-right {
						float: left;
						margin-left: 25rpx;
						margin-right: 30rpx;

						.list-title {
							width: 350rpx;
							line-height: 1.5;
							overflow: hidden;
							margin-bottom: 10rpx;
							color: #333;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
						}

						.list-detail {
							width: 350rpx;
							font-size: 14px;
							color: #a9a9a9;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
						}
					}

					.list-right-1 {
						float: right;
						position: absolute;
						right: 30rpx;
						color: #a9a9a9;
					}
				}

				.group-btn {
					float: left;
					display: flex;
					flex-direction: row;
					height: 350rpx;
					min-width: 100rpx;
					align-items: center;

					.btn-div {
						height: 350rpx;
						color: #fff;
						text-align: center;
						padding: 0 50rpx;
						font-size: 34rpx;
						line-height: 350rpx;
					}

					.top {
						background-color: #c4c7cd;
					}

					.removeM {
						background-color: #ff3b32;
					}
				}
			}
		}
	}

	.fontsize {
		font-size: 28rpx;
		color: #666666;
	}

	.closer {
		margin-bottom: -40rpx;


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
