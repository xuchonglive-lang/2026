<template>
	<!-- 
	swiper中的transfrom会使fixed失效,此时用height="100%"固定高度; 
	swiper中无法触发mescroll-mixins.js的onPageScroll和onReachBottom方法,只能用mescroll-uni,不能用mescroll-body
	-->
	<!-- ref动态生成: 字节跳动小程序编辑器不支持一个页面存在相同的ref (如不考虑字节跳动小程序可固定值为 ref="mescrollRef") -->
	<mescroll-uni :ref="'mescrollRef'+i" @init="mescrollInit" height="100%" top="60" :down="downOption"
		@down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick">
		<!-- 数据列表   如果样式一样，可以直接根据i 值配置数据源，如果不一样，就通过i 与游标值分别配置，通过v-for会生成不同的item vue 组件-->
		<grouting :groutingList="groutingList" v-if="index==0"></grouting>
		<entryofmaterial :entryofmaterialList="entryofmaterialList" v-if="index==1"></entryofmaterial>
		<descentofmaterial :descentofmaterialList="descentofmaterialList" v-if="index==2"></descentofmaterial>

	</mescroll-uni>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/components/mescroll-uni/mixins/mescroll-more-item.js";
	import grouting from './item/grouting.vue'
	import entryofmaterial from './item/entryofmaterial.vue'
	import descentofmaterial from './item/descentofmaterial.vue'
	var that; // 当前页面对象
	var vk; // vk依赖
	export default {
		components: {
			grouting: grouting,
			entryofmaterial: entryofmaterial,
			descentofmaterial: descentofmaterial,
		},
		mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		// 监听 - 组件被创建时就执行！！！！
		created() {
			that = this;
			vk = that.vk;
			
		},
		data() {
			return {
				downOption: {
					auto: false ,// 不自动加载 (mixin已处理第一个tab触发downCallback)
					offset: 50, // 下拉大于50px,松手即可触发下拉刷新的回调
					textLoading: '玩命加载中...'
				},
				upOption: {
					auto: false, // 不自动加载
					textLoading: '卯足劲从数据库中读取数据...',
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 2 // 每页数据的数量
					// },
					textNoMore: '-- 我是有底线的 --',
					noMoreSize: 3, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 暂无相关数据~' // 提示
						
					}
				},
				groutingList: [],
				entryofmaterialList: [],
				descentofmaterialList: [],
			}
		},
		props: {
			i: { // // 每个tab页的专属下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
				type: Number,
				default:0
			},

			index: { // 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
				type: Number,
				default () {
					return 0
				}
			},
			tabs: { // 为了请求数据,演示用,可根据自己的项目判断是否要传
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				//联网加载数据
				if(this.index==0){
					// async/await方式
					// let data = await vk.callFunction({
					// 	url:'client/user/kh/list/getAllGroutingList',
					// 	data: {
					// 		pageIndex: page.num, // 查询第几页
					// 		pageSize: page.size, // 每页多少条数据
					
					// 	}
					
					// });
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					// this.mescroll.endSuccess(data.rows.length);
					// //设置列表数据
					// if (page.num == 1) this.groutingList = []; //如果是第一页需手动制空列表
					// this.groutingList = this.groutingList.concat(data.rows); //追加新数据
					
				
					
					// if (data.rows.length < 1) {
					// 	//联网失败, 结束加载
					// 	this.mescroll.endErr();
					// }
				
				// async/await方式
				let data = await vk.callFunction({
					url:'client/user/kh/list/getAllGroutingList',
					
					data: {
						pageIndex: page.num, // 查询第几页
						pageSize: page.size, // 每页多少条数据
				
					}
				
				});
				//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
				this.mescroll.endSuccess(data.rows.length);
				//设置列表数据
				if (page.num == 1) this.groutingList = []; //如果是第一页需手动制空列表
				this.groutingList = this.groutingList.concat(data.rows); //追加新数据
				this.groutingList.forEach(item=>{
					console.log("---",item._id)
				});
				if (data.rows.length < 1) {
					//联网失败, 结束加载
					this.mescroll.endErr();
				}
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
				}

				

				if (this.index == 1) {
					// async/await方式
					let data = await vk.callFunction({
						url:'client/user/kh/list/getAllEntryofmaterialList',
						
						data: {
							pageIndex: page.num, // 查询第几页
							pageSize: page.size, // 每页多少条数据

						}

					});
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endSuccess(data.rows.length);
					//设置列表数据
					if (page.num == 1) this.entryofmaterialList = []; //如果是第一页需手动制空列表
					this.entryofmaterialList = this.entryofmaterialList.concat(data.rows); //追加新数据
					if (data.rows.length < 1) {
						//联网失败, 结束加载
						this.mescroll.endErr()
					}

				}
				if (this.index == 2) {
					// async/await方式
					let data = await vk.callFunction({
						url:'client/user/kh/list/getAllDescentofmaterialList',
						
						data: {
							pageIndex: page.num, // 查询第几页
							pageSize: page.size, // 每页多少条数据

						}

					});
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endSuccess(data.rows.length);
					//设置列表数据
					if (page.num == 1) this.descentofmaterialList = []; //如果是第一页需手动制空列表
					this.descentofmaterialList = this.descentofmaterialList.concat(data.rows); //追加新数据
					this.descentofmaterialList.forEach(item=>{
						console.log("---",item._id)
					});
					if (data.rows.length < 1) {
						//联网失败, 结束加载
						this.mescroll.endErr();
					}

				}
				
			},
			//点击空布局按钮的回调
			emptyClick() {
				uni.showToast({
					title: '点击了按钮,具体逻辑自行实现'
				})
			}
		}
	}
</script>
