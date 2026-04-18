<template>
	<view>
		
		<!-- #ifdef MP-WEIXIN -->
			<cu-custom bgColor="bg-gradual-orange" :isCustom="true">
				<block slot="backText"></block>
				<block slot="content">管理注浆数据</block>
			</cu-custom>
		<!-- #endif -->

		<view class="searchbox">
			<view class="point">
				<view class="select">
					<view class="label">日期范围：</view>
					<view @tap="calendarOpen()" class="text">{{ daterange.join('~') }}</view>
					<cl-calendar class="cl-calendar" ref="calendar" type="daterange" v-model="daterange" @change="daterangeChange" />
				</view>
			</view>
		</view>

		<cl-toast ref="toast"></cl-toast>
		<!--
							@init="mescrollInit" @down="downCallback"
							 @up="upCallback"为固定值,不可删改(与mescroll-mixins保持一致)
						 :down="downOption" :up="upOption" 绝大部分情况无需配置 
						 :top="顶部偏移量" :bottom="底部偏移量" :topbar="状态栏" :safearea="安全区" (常用)
						 字节跳动小程序 ref="mescrollRef" 必须配置 
						 此处支持写入原生组件 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<mark-slide-list :list="groutingList" :button="buttonList" :border="true" @click="clickMethod" @change="changeMethod"></mark-slide-list>
		</mescroll-body>
	</view>
</template>

<script>
let inDate;
var that; // 当前页面对象
var vk; // vk依赖
// 引入mescroll-mixins.js   上拉、下拉插件，第二部要在使用的页面引入混合文件，用来重写混合文件的方法
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import markSlideList from '@/components/mark-slide-list/mark-slide-list.vue';
export default {
	mixins: [MescrollMixin], // 使用mixin
	components: {
		markSlideList
	},
	onPageScroll(e) {
		that.scrollTop = e.scrollTop;
	},
	// 监听 - 页面每次【加载时】执行(如：前进)
	onLoad(options = {}) {
		that = this;
		vk = that.vk;
		that.options = options;
	},
	mounted() {},
	onShow() {},
	data() {
		return {
			daterange: [],
			background: {
				// backgroundColor: '#001f3f',

				// 导航栏背景图
				// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
				// 还可以设置背景图size属性
				// backgroundSize: 'cover',

				// 渐变色
				backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
			},
			groutingList: [],
			buttonList: [
				{
					title: '修改',
					background: '#c4c7cd'
				},
				{
					title: '删除',
					background: '#ff3b32'
				}
			],
			grouting: {},
			total: '',
			curList: [],
			downOption: {
				offset: 50, // 下拉大于50px,松手即可触发下拉刷新的回调
				textLoading: '玩命加载中...'
			},
			upOption: {
				textLoading: '我是玩命从数据库中读取数据...',
				// page: {
				// 	num: 1, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
				// 	size: 8, // 每页数据的数量
				// },
				textNoMore: '-- 我是有底线的 --',
				page: {
					// num: 1,  不能写
					size: 10 // 每页数据的数量,默认10
				},
				page2: {
					num: 1,
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				}
			}
		};
	},

	methods: {
		calendarOpen() {
			that.$refs.calendar.open();
		},
		daterangeChange(e) {
			// 日期更新后刷新表格里面的数据
			// console.log("e是什么",e)  通过打印，e是一个数组，每个元素是一个对象，其中有 date index  value三个值
			that.daterange[0] = e[0].date;
			that.daterange[1] = e[1].date;
			that.getList();
		},
		// 日期范围变化后，重新加载数据  groutingList
		async getList() {
			that.upCallback(that.upOption.page2)
		},

		async changeMethod(data, button, index) {
			console.log('滑动按钮回调', JSON.stringify(data));
			console.log('滑动按钮回调', button);
			let self = this;

			if (button.title === '修改') {
				let that = this;
				let today = this.$util.format(new Date(), 'yyyy-MM-dd hh:mm:ss');
				console.log('这里查的是几天？', today);
				// async/await方式
				let res = await vk.callFunction({
					url: 'client/user/kh/common/getGroutingById',
					title: '请求中...',
					data: {
						_id: data._id
					}
				});

				let inday = res.item.g_date;
				let days = this.$util.getDaysBetween(inday, today);
				console.log('这里查的是几天？', days);

				// 只有名字叫徐冲的可以不受到时间限制
				if (vk.getVuex('$user.userInfo.realName') != '徐冲') {
					if (days > 5) {
						console.log('能进来吗', days);
						that.$refs['toast'].open({
							message: '超过5天的信息无法再编辑',
							position: 'middle ',
							type: 'error',
							iconSize: 50
						});
						return;
					}
				}

				let id = data._id;

				uni.navigateTo({
					url: `../addGroutingDialog/addGroutingDialog?id=${id}`
				});
			}
			if (button.title === '删除') {
				let today = this.$util.format(new Date(), 'yyyy-MM-dd hh:mm:ss');

				let res = await vk.callFunction({
					url: 'client/user/kh/common/getGroutingById',
					title: '请求中...',
					data: {
						_id: data._id
					}
				});

				let inday = res.item.g_date;
				let days = this.$util.getDaysBetween(inday, today);
				console.log('这里查的是几天？', days);
				// 只有名字叫徐冲的可以不受到时间限制
				if (vk.getVuex('$user.userInfo.realName') != '徐冲') {
					if (days > 3) {
						console.log('能进来吗', days);
						that.$refs['toast'].open({
							message: '超过3天的信息无法再编辑',
							position: 'middle ',
							type: 'error',
							iconSize: 50
						});
						return;
					}
				}

				uni.showModal({
					cancelText: '取消', // 取消按钮的文字
					confirmText: '确认', // 确认按钮文字
					title: '删除提示',
					content: '警告：是否删除该项信息?',
					confirmColor: '#3B8BFF',
					cancelColor: '#222222',
					success: res => {
						if (res.confirm) {
							// return uniCloud.callFunction({
							// 	name: 'keywork',
							// 	data: {

							// 		_id: data._id,
							// 		action: 'deleteKeywork'
							// 	}
							return vk
								.callFunction({
									url: 'client/user/kh/operate/manageInfo/delete/deleteGrouting',
									title: '请求中...',
									data: {
										grouting_id: data._id
									}
								})
								.then(res => {
									if (res.code === 0) {
										uni.showModal({
											title: '提示',
											content: '删除成功',
											showCancel: false
										});
										this.upCallback(this.upOption.page2);
									} else {
										uni.showModal({
											content: res.msg,
											showCancel: false
										});
									}
								});
						} else if (res.cancel) {
						}
					}
				});
			}
		},
		clickMethod(data) {
			// console.log('点击行回调', data)
		},

		unescape(text) {
			return unescape(text);
		},
		// 从数据库中读取下拉加载数据
		async upCallback(page) {
			let data
			if(that.daterange.length>0){
				// async/await方式
				data = await vk.callFunction({
					url: 'client/user/kh/operate/manageInfo/getList/getAllGroutingByDate',
					data: {
						pageIndex: page.num, // 查询第几页
						pageSize: page.size, // 每页多少条数据
						g_dateStart: that.daterange[0],
						g_dateEnd: that.daterange[1]
					}
				});
			}else{
				data = await vk.callFunction({
					url: 'client/user/kh/operate/manageInfo/getList/getAllGrouting',
					data: {
						pageIndex: page.num, // 查询第几页
						pageSize: page.size // 每页多少条数据
					}
				});
				
			}
			
			
			
			
			//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
			this.mescroll.endSuccess(data.rows.length);
			//设置列表数据
			if (page.num == 1) this.groutingList = []; //如果是第一页需手动制空列表
			this.groutingList = this.groutingList.concat(data.rows); //追加新数据

			if (data.rows.length < 1) {
				//联网失败, 结束加载
				this.mescroll.endErr();
			}
		}
	}
};
</script>

<style lang="scss">
@import './manageGrouting.scss';
</style>
