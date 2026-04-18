<template>
	<view class="container">
		<view class="intro">
			<view class="solids-bottom padding-xs flex align-center">
				
				<view class="flex-sub text-center">
					<view class="solid-bottom text-xxl padding">
						<text class="text-red">使用须知</text>
					</view>
					<view class="padding text-left">系统数据为私有数据，管理员会对微信号进行审核，因此需要您使用微信登录系统，如拒绝登录，请您点击拒绝登录按钮返回系统首页，谢谢您的配合。</view>
				</view>
			</view>

		</view>
		<view class="bottom">
			
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-grey lg"  @tap="toIndex">拒绝登录</button>
				<button class="cu-btn bg-green margin-tb-sm lg" @tap="login_weixin" :disabled="flag">微信登录</button>
			</view>
			
			
			
		
		
			<view class="d-flex flex-column justify-content-evenly align-items-center text-center"
				style="height: 30vh;">
				<view class="w-100 font-size-base text-color-assist">微信登录仅获取用户头像、昵称信息</view>
				<view class="w-100 row d-flex just-content-around align-items-center font-size-sm text-color-assist">

				</view>

			</view>
		</view>
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

				},


			}
		},
		onPageScroll(e) {
			that.scrollTop = e.scrollTop;
		},
		// 监听 - 页面每次【加载时】执行(如：前进)
		onLoad(options) {
			that = this;
			vk = that.vk;
		
		},
		// 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
		onReady() {

		},
		// 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
		onShow() {


		},
		// 监听 - 页面每次【隐藏时】执行(如：返回)
		onHide() {


		},
		// 监听 - 页面下拉刷新
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		// 监听 - 页面触底部
		onReachBottom() {

		},
		// 监听 - 窗口尺寸变化(仅限:App、微信小程序)
		onResize() {

		},
		// 监听 - 点击右上角转发时
		onShareAppMessage(options) {

		},
		// 监听 - 页面创建时
		created() {

		},
		// 函数
		methods: {
			toIndex(){
				// 进入首页			
				vk.navigateTo('/pages/index/index');
			
			},
			// 页面数据初始化函数
			init(options = {}) {
				console.log("init: ", options);
			},
			pageTo(path) {
				vk.navigateTo(path);
			},
			//登录成功后跳转，是否往回跳转还是是否跳转到主页
			login_success(data) {
				// 检查是否有指定跳转的页面
				if (vk.navigate.originalPage) {
					vk.navigate.originalTo();
					return false;
				}
				// 跳转到首页,或页面返回
				var pages = getCurrentPages();
				console.log(pages.length, pages[pages.length - 1].route);
				if (pages.length > 1 &&
					pages[pages.length - 2] &&
					pages[pages.length - 2].route &&
					pages[pages.length - 2].route.indexOf('login/index') == -1
				) {
					const eventChannel = that.getOpenerEventChannel();
					eventChannel.emit('loginSuccess', {});
					vk.navigateBack();
				} else {
					// 进入首页
					vk.reLaunch("../../index/index");
				}
			},
			// 第三方登录 - 微信
			login_weixin() {
				vk.userCenter.loginByWeixin({
					success: function(data) {

					}
				});

				uni.getUserProfile({
					desc: "用于快速设置昵称头像",
					success: function(res) {
						let { userInfo } = res;
						vk.userCenter.updateUser({
							data: {
								nickname: userInfo.nickName,
								avatar: userInfo.avatarUrl,
								gender: userInfo.gender
							},
							success: function(data) {
								vk.toast("登陆成功!");
								setTimeout(function() {
									// 跳转到首页,或页面返回	
									that.login_success(data);
								}, 1000);
							}
						});
					}
				});
			},

		},
		// 过滤器
		filters: {

		},
		// 计算属性
		computed: {

		}
	}
</script>
<style lang="scss" scoped>
	.intro {
		width: 100%;
		height: 60vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		font-size: $font-size-base;
		color: $text-color-assist;

		image {
			width: 165rpx;
			height: 165rpx;
		}

		.tips {
			line-height: 72rpx;
			text-align: center;
		}
	}

	.bottom {
		height: 40vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0 40rpx;

		.login-btn {
			width: 100%;
			border-radius: 50rem !important;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 10rpx 0;

			image {
				width: 36rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}
		}

		.row {
			.grid {
				width: 20%;

				image {
					width: 60rpx;
					height: 60rpx;
					margin-bottom: 10rpx;
				}
			}
		}
	}
</style>
