<template>
	<view class="container">

		<!-- <view class=""> -->
		<!-- #ifndef MP-ALIPAY -->
		<cu-custom bgColor="bg-gradual-orange" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">注浆数据采集</block>
		</cu-custom>
		<!-- #endif -->

		<!-- 消息提示 -->
		<cl-toast ref="toast"></cl-toast>

		<view class="head">
			<view class="head-picture">
				<open-data type="userAvatarUrl"></open-data>
			</view>
			<view class="column xc">
				<view class="nickname">昵称：<open-data type="userNickName"></open-data>
				</view>
				<view class="nickname2">
					姓名：
					<text v-if="vk.getVuex('$user.userInfo.realName')">{{vk.getVuex('$user.userInfo.realName')}}</text>


					<view v-if="!vk.getVuex('$user.userInfo.realName')" class="input_name">
						<input class="input" placeholder="真实姓名" v-model="realName"
							placeholder-class="text-color-assist" />
						<button class="cu-btn round bg-olive sm" :disabled="flag" @click="addRealName()">确定</button>
					</view>
				</view>
			</view>

			<view class="logout" v-if="vk.getVuex('$user.userInfo')">
				<view class="cu-btn round bg-olive sm" @click="logout">注销</view>
			</view>
			<!-- <view class="logout" v-if="isLogin">
				<view class="cu-btn round bg-olive sm" @click="dingyue">dingyu</view>
			</view>
			<view class="logout" v-if="isLogin">
				<view class="cu-btn round bg-olive sm" @click="send">发送</view>
			</view> -->
		</view>



		<view class="section">
			<view class="section-top">
				<text class="section-text">信息录入面板</text>
			</view>
			<!-- <button @tap="openAddDia" :data-id="'center'">添加工作</button>
 -->
		</view>
		<uni-view class="cu-list grid col-3 no-border showFlex">
			<uni-view class="cu-item" @tap="openAddGroutingDialog">
				<uni-view class="cuIcon-post text-red text-xsl">
				</uni-view>
				<uni-text><span>钻孔注浆反馈</span></uni-text>
			</uni-view>
			<uni-view class="cu-item" @tap="openAddEntryofmaterialDialog">
				<uni-view class="cuIcon-deliver_fill text-red text-xsl">
				</uni-view>
				<uni-text><span>材料进场反馈</span></uni-text>
			</uni-view>
			<uni-view class="cu-item" @tap="openAddDescentofmaterialDialog">
				<uni-view class="cuIcon-down text-red text-xsl">
				</uni-view>
				<uni-text><span>材料下井反馈</span></uni-text>
			</uni-view>
		</uni-view>




		<view class="section">
			<view class="section-top">
				<text class="section-text">信息管理面板</text>
			</view>
			<!-- <button @tap="openAddDia" :data-id="'center'">添加工作</button>
 -->
		</view>
		<uni-view class="cu-list grid col-3 no-border showFlex">
			<uni-view class="cu-item" @tap="openManageGroutingDialog">
				<uni-view class="cuIcon-post text-blue text-xsl">
				</uni-view>
				<uni-text><span>钻孔注浆信息管理</span></uni-text>
			</uni-view>
			<uni-view class="cu-item" @tap="openManageEntrymaterialDialog">
				<uni-view class="cuIcon-deliver_fill text-blue text-xsl">
				</uni-view>
				<uni-text><span>材料进场信息管理</span></uni-text>
			</uni-view>
			<uni-view class="cu-item" @tap="openManageDescentmaterialDialog">
				<uni-view class="cuIcon-down text-blue text-xsl">
				</uni-view>
				<uni-text><span>材料下井信息管理</span></uni-text>
			</uni-view>
		</uni-view>


		<view class="others">

			<view class="item">
				<image class="icon" src="/static/images/user_share.png"></image>
				<button class="content share" open-type="share">
					<view>分享程序给好友</view>
					<image class="right" src="/static/images/right_h.png"></image>
				</button>
			</view>
			<view class="item">
				<image class="icon" src="/static/images/user_hezuo.png"></image>
				<button class="content share"
					@click="goToImage('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-696bea48-0666-46a5-a113-0e3fd17caa88/9654de5a-ba5c-4d98-b494-4a411ac37e80.jpg')">
					<view>联系小程序作者</view>
					<image class="right" src="/static/images/right_h.png"></image>
				</button>
			</view>
			<view class="item">
				<image class="icon" src="/static/images/user_kefu.png"></image>
				<button class="content share" open-type="contact">
					<view>小程序问题反馈</view>
					<image class="right" src="/static/images/right_h.png"></image>
				</button>
			</view>
		</view>
		<view class="version">
			v1.6
		</view>

		<u-toast ref="uToast" />

	</view>
</template>

<script>
	var that; // 当前页面对象
	var vk; // vk依赖
	export default {
		data() {
			// 页面数据变量
			return {
				// init请求返回的数据
				data: {
					realName: '',
					flag: false,
				},
				// 表单请求数据
				form1: {

				},
				scrollTop: 0,
			}
		},
		onPageScroll(e) {
			that.scrollTop = e.scrollTop;
		},
		// 监听 - 页面每次【加载时】执行(如：前进)
		onLoad(options = {}) {
			that = this;
			vk = that.vk;
			that.options = options;
			that.init(options);
		},
		// 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
		onReady() {},
		// 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
		onShow() {},
		// 监听 - 页面每次【隐藏时】执行(如：返回)
		onHide() {},
		// 函数
		methods: {
			logout() {
				vk.userCenter.logout({
					success: function(data) {
						// 退出成功后清楚$store的用户信息
						vk.setVuex('$user.userInfo', {});
						vk.alert("注销成功");
					}
				});
			},
			// 页面数据初始化函数
			init(options) {
				console.log("init: ", options);
			},
			pageTo(path) {
				vk.navigateTo(path);
			},
			openAddGroutingDialog() {
				vk.navigateTo('/pages/setting/addGroutingDialog/addGroutingDialog');
			},
			openAddEntryofmaterialDialog() {
				vk.navigateTo('/pages/setting/addEntryofmaterialDialog/addEntryofmaterialDialog');
			},
			openAddDescentofmaterialDialog() {
				vk.navigateTo('/pages/setting/addDescentofmaterialDialog/addDescentofmaterialDialog');
			},
			openManageGroutingDialog() {
				vk.navigateTo('/pages/setting/manageGrouting/manageGrouting');
			},
			openManageEntrymaterialDialog() {
				vk.navigateTo('/pages/setting/manageEntrymaterial/manageEntrymaterial');
			},
			openManageDescentmaterialDialog() {
				vk.navigateTo('/pages/setting/manageDescentmaterial/manageDescentmaterial');
			},
			addRealName() {
				this.flag = true //回复按钮可用状态
				// 真实姓名添加过程中不能为空值
				if (this.realName == '') {
					that.$refs["toast"].open({
						message: '姓名不能为空值！',
						position: 'middle ',
						type: 'error',
						iconSize: 50
					})
					this.flag = false //回复按钮可用状态
					return

				}


				uni.getUserProfile({
					desc: "用于快速设置昵称头像",
					success: function(res) {
						let { userInfo } = res;
						console.log("这里有值吗？-----这里要更新用户信息", that.realName)
						vk.userCenter.updateUser({
							data: {
								nickname: userInfo.nickName,
								avatar: userInfo.avatarUrl,
								gender: userInfo.gender
							},
							success: function(data) {

								that.$refs["toast"].open({
									message: data.msg,
									position: 'middle ',
									type: 'success ',
									iconSize: 50

								});
							}
						});
					}
				});


				// 回调形式 success fail complete
				vk.callFunction({
					url: 'client/user/kh/common/addRealName',
					title: '添加中...',
					data: {
						realName: that.realName
					},
					success: function(data) {
						console.log("这里能够捕捉到这个错误码？", data);
						if (data.code == 0) {

							vk.setVuex('$user.userInfo.realName', that.realName)

						} else {

							that.$refs["toast"].open({
								message: data.msg,
								position: 'middle ',
								type: 'error',
								iconSize: 50
							})
						}

					}
				});


			},
			goToImage: function(imagePath) {
							uni.previewImage({
								urls: [imagePath],
								longPressActions: {
									itemList: ['发送给朋友', '保存图片', '收藏'],
									success: function(data) {
			
									},
									fail: function(err) {
										console.log(err.errMsg);
									}
								}
							});
						},
		
		},
		// 监听器
		watch: {

		},
		// 计算属性
		computed: {

		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		overflow-x: hidden;
		background: #f8f8f8;
	}

	.xc {
		font-size: 5rpx;
	}

	.showFlex {

		justify-content: space-between;



	}

	.cu-item {
		width: 30%;
		height: 120rpx;
	}

	.container {
		padding-bottom: 20rpx;
	}

	.head {
		
		background-color: white;

		padding: 40upx;
		margin-bottom: 30upx;
		display: flex;
		flex-direction: row;
		align-items: center;

		.head-picture {
			width: 150upx;
			height: 150upx;
			background: #fff;
			border: 5upx solid #fff;
			border-radius: 50%;
			overflow: hidden;
			background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
		}

		.xc {
			width: 400rpx;
			// border: 1rpx solid red;

			justify-content: center;

			.nickname {
				margin-left: 10rpx;

				font-size: 30upx;
				font-weight: 500;
				text-align: left;
			}

			.nickname2 {
				margin-left: 10rpx;
				display: flex;
				flex-direction: row;
				align-items: center;


				font-size: 30upx;
				font-weight: 500;
				text-align: left;

				.input_name {

					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;

					input {

						width: 150rpx;
						background-color: #FFFFFF;
						border-radius: 15rpx;
						box-shadow: $box-shadow;
						margin-right: 10rpx;
					}
				}

			}
		}

		.logout {
			display: flex;
			// border: 1rpx dashed green;

		}


	}






	.section {
		width: 100%;
		background-color: white;
		margin-top: 20rpx;
	}

	.section-top {
		width: 100%;
		display: flex;
		align-items: center;
		height: 60rpx;
	}

	.section-text {
		font-size: 30rpx;
		font-weight: bold;
		margin-left: 20rpx;
	}

	.section-bottom {
		width: calc(100vw - 60rpx);
		padding: 30rpx;
		display: flex;
	}

	.section-bottom-item {
		width: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.section-bottom-item image {
		width: 100%;
		height: 10vw;
	}

	.section-bottom-item text {
		color: #707070;
		font-size: 24rpx;
		text-align: center;
	}

	.others {
		margin: 20rpx 0;
		background: #fff;
	}

	.others .item {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0 30rpx;
		border-bottom: 1px solid #ededf0;
	}

	.others .item:last-child {
		border-bottom: none;
	}

	.others .item .icon {
		width: 50rpx;
		height: 50rpx;
		margin-right: 30rpx;
	}

	.others .item .content {
		width: 620rpx;
		padding: 30rpx 0;
		display: flex;
		align-items: center;
		font-size: 34rpx;
		color: #333;
		
	}

	.others .item .content.share {
		background: none;
		text-align: left;
		border: none;
		line-height: normal;
	}

	.others .item .content.share::after {
		border: none;
	}

	.others .item .content .right {
		width: 25rpx;
		height: 25rpx;
		margin-right: 2rpx;
	}

	.version {
		position: fixed;
		bottom: 20rpx;
		display: block;
		width: 100%;
		text-align: center;
		font-size: 28rpx;
		color: #666;
	}

	.form-box {
		width: 100%;
		height: 100%;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		color: $text-color-base;

		.form-input {
			display: flex;
			align-items: center;
			width: 100%;
		}

		.label {
			width: 200rpx;
			font-size: $font-size-lg;
			color: $text-color-base;
			font-weight: 500;
		}

		.input {
			flex: 1;
			display: flex;
			align-items: center;
		}

		.radio-group {
			display: flex;
			justify-content: flex-start;

			.radio {
				padding: 10rpx 30rpx;
				border-radius: 6rpx;
				border: 2rpx solid $text-color-assist;
				color: $text-color-assist;
				font-size: $font-size-base;

				&.checked {
					background-color: $color-primary;
					color: $text-color-white;
					border: 2rpx solid $color-primary;
				}
			}
		}

		.btn-section {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;

			button {
				font-size: $font-size-base;
				height: 90rpx;
				border-radius: 50rem !important;
				width: 85%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
