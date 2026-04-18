<script>
	import config from '@/app.config.js'
	export default {
		methods: {

		},
		// 监听 - 页面404
		onPageNotFound: function(e) {
			uni.redirectTo({
				url: config.error.url
			})
		},
		onLaunch: function() {
		

			// 获取系统状态栏信息
	        let self = this
			uni.getSystemInfo({
				success: e => {
					self.globalData.StatusBar = e.statusBarHeight;
					//这里qq小程序getMenuButtonBoundingClientRect获取到的值都是空的
					let custom = {
						width: 80,
						height: 30,
						left: e.windowWidth - 12 - 80,
						right: e.windowWidth - 12,
						top: e.statusBarHeight + 10,
						bottom: e.statusBarHeight + 10 + 30
					};
					// #ifdef MP-WEIXIN && MP-TOUTIAO
					custom = uni.getMenuButtonBoundingClientRect();
					// #endif
					self.globalData.Custom = custom;
					self.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
				}
			});
			// #ifdef MP-WEIXIN
			const miniProgram = uni.getAccountInfoSync();
			console.log(miniProgram);
			self.globalData.miniProgram = miniProgram.miniProgram; // 获取小程序更新机制兼容
			if (uni.canIUse('getUpdateManager')) {
				const updateManager = uni.getUpdateManager();
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					if (res.hasUpdate) {
						updateManager.onUpdateReady(function() {
							uni.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启应用？',
								success: function(res) {
									if (res.confirm) {
										// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
										updateManager.applyUpdate();
									}
								}
							});
						});
						updateManager.onUpdateFailed(function() {
							// 新的版本下载失败
							uni.showModal({
								title: '已经有新版本了哟~',
								content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
							});
						});
					}
				});
			} else {
				// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
				uni.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				});
			}
			// #endif
		},
		globalData: {
			// userInfo: null,
			// statusHeight: '20', //状态栏高度
			toBar: '44', //标题栏高度
			newColor: '#0081ff', //小程序主题颜色
			// config: myconfig.themeList,  //主题图标
			windowHeight: uni.getSystemInfoSync().windowHeight,
			windowWidth: uni.getSystemInfoSync().windowWidth,
			//全局变量
			userInfo: null,
			openid: '',
			openId: '',
			skin: null,
			roleFlag: false,
			jrscurl: "https://v2.jinrishici.com",
			//http://localhost:8090
			BlogName: "代码改变生活",
			highlightStyle: "dracula",
			//代码高亮样式，可用值default,darcula,dracula,tomorrow
			adminOpenid: "",
			homeImg: '/static/image/cat.png',
			bannerimglist: [
				'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/a93bb8b0-50dd-11eb-a16f-5b3e54966275.jpg',
				'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/a8638120-50dd-11eb-a16f-5b3e54966275.jpg',
				'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/aa0fd190-50dd-11eb-bd01-97bc1429a9ff.jpg',
				'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/aade6c30-50dd-11eb-a16f-5b3e54966275.jpg',
				'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/ab9d7670-50dd-11eb-a16f-5b3e54966275.jpg',
				'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/ac5a36c0-50dd-11eb-a16f-5b3e54966275.jpg', //竖版
				'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/ad03bd30-50dd-11eb-bd01-97bc1429a9ff.jpg',
				'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/ada57b70-50dd-11eb-a16f-5b3e54966275.jpg',
				'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/ae5ac1b0-50dd-11eb-a16f-5b3e54966275.jpg',
				'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/af0643f0-50dd-11eb-a16f-5b3e54966275.jpg',
				'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/afb3e910-50dd-11eb-a16f-5b3e54966275.jpg',
				'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/b055ce60-50dd-11eb-a16f-5b3e54966275.jpg',
				'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/b0f89e10-50dd-11eb-b997-9918a5dda011.jpg',
				'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-6rawjgd8tdtl4007ee/b1a0ec00-50dd-11eb-a16f-5b3e54966275.jpg',
			]
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "cl-uni/index.scss";
	@import "uview-ui/index.scss";
	@import "./common/css/app.scss";
	// colorui 样式引入    三步 导入包，  配置app样式， 配置page.json样式
	@import "colorui/main.css";
	/*每个页面公共css */
	@import url("xuchong-iconfont.css");
	@import "colorui/icon.css";
</style>
