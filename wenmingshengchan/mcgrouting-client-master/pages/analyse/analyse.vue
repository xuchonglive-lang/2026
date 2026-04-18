<template>
	<view>
		<view>
			<!-- #ifdef MP-WEIXIN -->
			<cu-custom bgColor="bg-gradual-orange" :isCustom="true">
				<block slot="backText"></block>
				<block slot="content">探水注浆分析</block>
			</cu-custom>
			<!-- #endif -->
			<view class="container">
				<view class="select">
					<view class="label">工程点位：</view>
					<cl-select class="cl-select" v-model="point_id" :options="list" :border="true"
						@confirm="selectChange">
					</cl-select>
				</view>

				<view class="content">
					<view class="title">
						<view>{{point.rlp_string}}</view>
						<view>探水注浆工程分析</view>
					</view>
					<view class="section">
						<view class="name">一、施工方案及完成情况</view>
						<view class="text">
							<view class="charpter">
								<view class="headline">1、工程量及工期</view>
								<view class="body">
									<u-parse :html="point.content"></u-parse>
									<view class="table"></view>
									<view class="chart"></view>
								</view>

							</view>
							<view class="charpter">
								<view class="headline">2、完成情况</view>
								<view class="body">
									<p>工期：{{startDate}}开始施工，至{{endDate}}已施工{{workDays+1}}天，探水注浆工程量完成如下:</p>
									<p>(1)、探水孔：累计完成{{(depth_drillsum||0)|tofixed}}m</p>
									<p>(2)、扫孔：累计完成{{(depth_drillsaosum||0)|tofixed}}m</p>
									<!-- <p>(3)、材料进场量：累计</p>
									<p>(3)、材料下井量：累计</p> -->
									<p>(3)、消耗水泥量：累计{{(cement_sum||0)|tofixed}}t</p>
									<p>(4)、消耗水玻璃量：累计{{(waterglass_sum||0)|tofixed}}t</p>
								</view>

							</view>

						</view>
					</view>
					<view class="section">
						<view class="name">二、技术参数完成情况</view>
						<view class="text">
							<view class="charpter">
								<view class="headline">1、探水孔施工情况</view>
								<view class="body">
									探水孔钻孔设计{{(point.depth_design||0)|tofixed}}m，{{startDate}}~{{endDate}}，累计完成钻孔{{(depth_drillsum||'')|tofixed}}m，扫孔{{(depth_drillsaosum||'')|tofixed}}m，各钻孔完成情况见以下表及图表：
									<z-table :tableData='drillList' :columns='columnsForDrill' textAlign="left"
										titleTextAlign="left" stickSide showBottomSum emptyText='数据库中暂无数据'
										:tableHeight='400' @onClick='rowClick' @onSelect='tableSelect'
										showLoading=false>
									</z-table>


									<qiun-data-charts type="column" canvasId="scrollcolumnid0" id="scrollcolumnid0"
										:opts="{enableScroll:true,xAxis:{scrollShow:true,itemCount:4,disableGrid:false}}"
										:ontouch="true" :canvas2d="true" :chartData="chartDataOfDrill" />


									<view class="table">

									</view>
									<view class="chart">

									</view>
								</view>

							</view>

							<!-- start****在charpter之间插入一个模态框，用于显示每个钻孔的历史钻孔信息*************** -->
							<view class="cu-modal" :class="modalName=='showDrillsForZuankong'?'show':''">
								<view class="cu-dialog">
									<view class="cu-bar bg-white justify-end">
										<view class="content">{{title}}</view>
										<view class="action" @tap="hideModal">
											<text class="cuIcon-close text-red"></text>
										</view>
									</view>
									<view class="padding-xl">

										<!-- 这里显示打孔的详细情况 -->
										<z-table :tableData='groutingListForDrill' :columns='columnsForGroutingForDrill'
											textAlign="left" titleTextAlign="left" stickSide showBottomSum
											emptyText='数据库中暂无数据' :tableHeight='400' @onClick='rowClick'
											@onSelect='tableSelect' showLoading=false>
										</z-table>


									</view>
								</view>
							</view>

							<!-- end****在charpter之间插入一个模态框，用于显示每个钻孔的历史钻孔信息*************** -->




							<view class="charpter">
								<view class="headline">2、注浆材料消耗情况</view>
								<view class="body">
									设计使用水泥{{point.cement}}t,使用水玻璃{{point.waterglass}}t,实际消耗水泥{{(cement_sum||'')|tofixed}}t，消耗水玻璃{{(waterglass_sum||'')|tofixed}}t,各钻孔材料情况见下表及图表：
									<z-table :tableData='drillList' :columns='columnsForXiaohao' textAlign="left"
										stickSide showBottomSum emptyText='数据库中暂无数据' :tableHeight='400'
										@onClick='rowClick' @onSelect='tableSelect' showLoading=false>
									</z-table>
									<qiun-data-charts type="column" canvasId="scrollcolumnid2" id="scrollcolumnid2"
										:opts="{enableScroll:true,xAxis:{scrollShow:true,itemCount:4,disableGrid:false}}"
										:ontouch="true" :canvas2d="true" :chartData="chartDataOfXiaohao" />



									<view class="table">

									</view>
									<view class="chart">

									</view>
								</view>

							</view>

							<view class="charpter">
								<view class="headline">3、单孔涌水量检查情况</view>
								<view class="body">
									探水注浆过程中，按照规定对探水孔进行涌水量检查，涌水量检查情况如下图所示(备注：需选择孔号查看)：
									<view class="select2">
										<view class="label">钻孔：</view>
										<cl-select class="cl-select" v-model="drill_id" :options="drillselectList"
											:border="true" @confirm="selectDrillChange">
										</cl-select>
									</view>
									<!-- 	<qiun-data-charts type="column" canvasId="scrollcolumnid3" id="scrollcolumnid3"
										:opts="{enableScroll:true,xAxis:{scrollShow:true,itemCount:4,disableGrid:true}}"
										:ontouch="true" :canvas2d="true" :chartData="chartDataOfWater" /> -->


									<!-- <qiun-data-charts type="column" canvasId="scrollcolumnid" id="scrollcolumnid3"
											:opts="{enableScroll:true,xAxis:{scrollShow:true,itemCount:4,disableGrid:true}}" :ontouch="true"
											:canvas2d="true" :chartData="chartDataOfWater" /> -->

									<qiun-data-charts type="line" canvasId="scrolllineid"
										:opts="{enableScroll:true,xAxis:{scrollShow:true,itemCount:4,disableGrid:false}}"
										:chartData="chartDataOfWater" :ontouch="true" :canvas2d="true" />



									<view class="table">

									</view>
									<view class="chart">

									</view>
								</view>

							</view>


							<view class="charpter">
								<view class="headline">4、钻进注浆描述参数</view>
								<view class="body">
									截止本日，探水注浆过程中，各孔注浆压力及断层点、出水点数据如下表所示：
									<z-table :tableData='drillList' :columns='columnsForPosuijichushui' textAlign="left"
										stickSide showBottomSum emptyText='数据库中暂无数据' :tableHeight='400'
										@onClick='rowClick' @onSelect='tableSelect' showLoading=false>
									</z-table>



									<view class="table">

									</view>
									<view class="chart">

									</view>
								</view>

							</view>





						</view>
					</view>
				</view>



			</view>


		</view>
	</view>
</template>

<script>
	var that; // 当前页面对象
	var vk; // vk依赖
	import zTable from "../../components/z-table/z-table.vue";
	export default {
		onShow() {
			let temp=vk.getVuex('$point_id');
			if (temp) {
				that.getPointListForIndex()
			
				that.point_id = temp
				this.reloadContent()
				vk.setVuex('$point_id',null);
			} 
		},
		onLoad(options = {}) {
			that = this;
			vk = that.vk;
			that.options = options;
			console.log("这里有芝麻", that.options)
			let temp=vk.getVuex('$point_id');
			if (temp) {
				that.getPointListForIndex()

				that.point_id = temp
				this.reloadContent()
				vk.setVuex('$point_id',null);
			} else {
				// 用于加载select 下拉框的值
				console.log("直接到这里来了没有啊啊")
				this.getPointList();
			}


		},
		filters: {
			tofixed: function(value) {
				if (!value) return 0

				return value.toFixed(2)
			}
		},
		data() {
			return {
				title:'',//模态框标题
				modalName: '', //模态框的名字
				groutingListForDrill: [], //模态框中的表格数

				options: {},
				point_id: '',
				list: [],
				point: {}, //每次更新选择后得到的一个注浆点位对象
				startDate: '', //第一次探水注浆的日期
				endDate: '', //最新一次探水注浆的日期
				groutingList: [], //整个点位的所有探水注浆信息
				drillList: [], //整个点位的所有钻孔信息
				drillselectList: [], //钻孔下拉框的钻孔信息‘
				drill_id: '', //钻孔下拉的孔号信息
				workDays: '',
				depth_drillsum: '',
				depth_drillsaosum: '',
				cement_sum: '',
				waterglass_sum: '',
				water_sum: '',
				chartDataArr: [], //所有图表的集合数组
				chartDataOfDrill: {}, //这个是钻孔图表
				chartDataOfXiaohao: {}, //这个是钻孔图表
				chartDataOfWater: {}, //这个是钻孔图表

				// finaleTableData: [],
				columnsForGroutingForDrill: [ //模块框中的钻孔数据
					{
							title: '<span style="vertical-align: middle;">日期[班次]</span>',
							format: {
								template: "<span><span style='vertical-align: middle;'>#g_date#[#shift#]</span>",
								names: ["g_date", "shift"]
							},
							width: 200
						},
					{
						title: "钻孔深度(m)",
						key: "depth90_drill",
						width: 150
					},
					{
						title: "扫孔深度(m)",
						key: "depth90_drill_sao",
						width: 150
					},
					{
						title: "录入",
						key: "realName",
						width: 100
					},

				],
				columnsForDrill: [{
						title: '<span style="vertical-align: middle;">孔号</span>',
						format: {
							template: "<span><span style='vertical-align: middle;'>#drill_name#</span>",
							names: ["drill_name"]
						},
						width: 150,
						listenerClick: true
					},
					{
						title: "设计深度(m)",
						key: "depth_design",
						width: 200
					},
					{
						title: "完成钻进(m)",
						key: "depth_drillsum",
						width: 200
					},
					{
						title: "累计扫孔(m)",
						key: "depth_drillsaosum",
						width: 200
					}
				],
				columnsForXiaohao: [{
						title: '<span style="vertical-align: middle;">孔号</span>',
						format: {
							template: "<span><span style='vertical-align: middle;'>#drill_name#</span>",
							names: ["drill_name"]
						},
						width: 150,
					},
					{
						title: "实际水泥用量(m)",
						key: "cement_sum",
						width: 260
					},
					{
						title: "实际水玻璃用量(t)",
						key: "waterglass_sum",
						width: 260
					}
				],
				columnsForPosuijichushui: [{
						title: '<span style="vertical-align: middle;">孔号</span>',
						format: {
							template: "<span><span style='vertical-align: middle;'>#drill_name#</span>",
							names: ["drill_name"]
						},
						width: 150
					},
					{
						title: "出水点",
						key: "chushuidian",
						width: 1200,
						noSum: true
					},
					{
						title: "破碎断层点",
						key: "duancengdian",
						width: 1200,
						noSum: true
					},
					{
						title: "注浆终压(Mpa)",
						key: "pressure_end",
						width: 220,
						noSum: true
					},
				],


			}
		},



		methods: {
			async rowClick(e) {
				let drill_id = e._id;
				// 得到该钻孔的所有注浆信息（进行筛选，需要钻孔及扫孔的）
				
				// async/await方式
				let data = await vk.callFunction({
					url: 'client/user/kh/analyse/getGroutingForDrill',
					title: '请求中...',
					data: {
						drill_id
					},
				});
				that.title=e.drill_name+'的钻孔数据'
				that.groutingListForDrill=data.rows				
				this.modalName = 'showDrillsForZuankong'
				console.log(e)
			},
			hideModal(e) {
				this.modalName = null
			},
			async reloadContent() {

				// async/await方式
				let data = await vk.callFunction({
					url: 'client/user/kh/common/getPointById',
					title: '请求中...',
					data: {
						_id: that.point_id
					},
				});

				// 得到对应点位的所有钻孔信息
				let drills = await vk.callFunction({
					url: 'client/utils/pub/getDrillTree',
					title: '请求中...',
					data: {
						point_id: that.point_id
					},
				});




				that.point = data.item
				that.drillselectList = drills.rows
				if (that.drill_id == '') {
					that.drill_id = that.drillselectList[0].value
					// 根据钻孔号得到单孔涌水量的曲线图表数据

					let chartdata = await vk.callFunction({
						url: 'client/user/kh/analyse/getChartDataForDrill',
						title: '请求中...',
						data: {
							drill_id: that.drill_id
						},
					});

					that.chartDataOfWater = chartdata.chartDataOfWaterForDrill


				}


				that.getAllGroutingListForPoint()
				that.getAllDrillListForPoint()

				// 对文本进行转义
				// that.point.remark = unescape(data.item.remark)
				// 第一、得到已施工工期（得到对应的点位的所有grouting对象，拿出第一对象和最后一个对象，根据日期得出天数）
				// 第二、得到探水孔、扫孔、已经消耗水泥、水玻璃的使用量、涌水总量


			},
			// 得到对应点位的所有注浆信息
			async getAllGroutingListForPoint() {
				// async/await方式
				let data = await vk.callFunction({
					url: 'client/user/kh/analyse/getAllGroutingForPoint',
					title: '请求中...',
					data: {
						point_id: that.point_id
					},
				});
				that.groutingList = data.rows
				that.startDate = that.groutingList[that.groutingList.length - 1].g_date
				that.endDate = that.groutingList[0].g_date
				that.workDays = this.$util.getDaysBetween(that.startDate, that.endDate)
				
				// 先规零，不然重复累加
				that.depth_drillsaosum=0;
				that.depth_drillsum=0;
				that.cement_sum=0;
				that.waterglass_sum=0;
				that.water_sum=0;
				

				that.groutingList.forEach(function(val, idx, arr) {
					that.depth_drillsaosum = (that.depth_drillsaosum ? that.depth_drillsaosum : 0) + val
						.depth90_drill_sao
					that.depth_drillsum = (that.depth_drillsum ? that.depth_drillsum : 0) + val.depth90_drill
					that.cement_sum = (that.cement_sum ? that.cement_sum : 0) + val.cement_sdone
					that.waterglass_sum = (that.waterglass_sum ? that.waterglass_sum : 0) + val
						.waterglass_sdone
					that.water_sum = (that.water_sum ? that.water_sum : 0) + val.water_shift
				}, 0);

			},
			// 得到该点位所有的钻孔数据，并给图表赋值
			async getAllDrillListForPoint() {
				let data = await vk.callFunction({
					url: 'client/user/kh/analyse/getAllDrillsForPoint',

					data: {
						point_id: that.point_id
					},
				});

				data.rows.forEach(item => {
					item.depth_design = item.depth_design.toFixed(1);
					item.cement_sum = item.cement_sum.toFixed(1);
					item.depth_drillsaosum = item.depth_drillsaosum.toFixed(1);
					item.depth_drillsum = item.depth_drillsum.toFixed(1);
					item.water_sum = item.water_sum.toFixed(3)
					item.waterglass_sum = item.waterglass_sum.toFixed(3);
				})

				that.drillList = data.rows
				that.chartDataArr = data.chartDataArr


				// 初始化时一律 显示注浆和涌水数据
				that.chartDataOfDrill = data.chartDataArr[0];
				that.chartDataOfXiaohao = data.chartDataArr[1];

				// 	that.drillList.forEach(function(val, idx, arr) {
				// 		 that.depth_drillsaosum=(that.depth_drillsaosum?that.depth_drillsaosum:0)+val.depth90_drill_sao
				// 		 that.depth_drillsum=(that.depth_drillsum?that.depth_drillsum:0)+val.depth90_drill

				// 	  }, 0);

				// that.chartsDataColumn5 = JSON.parse(JSON.stringify(that.chartData))

			},

			selectChange(e) {
				this.point_id = e.value;
				// 需要对钻孔id进行清空，用于更新 钻孔的涌水量图表
				that.drill_id = '';
				this.reloadContent();
				// 选择变更后，就是一系列的数据更新读取的骚操作，第一是 得到point对象

				// 回调形式 success fail complete
			},
			// 孔号的选择，只会更新图表的内容
			async selectDrillChange(e) {
				this.drill_id = e.value;
				let chartdata = await vk.callFunction({
					url: 'client/user/kh/analyse/getChartDataForDrill',
					title: '请求中...',
					data: {
						drill_id: that.drill_id
					},
				});

				that.chartDataOfWater = chartdata.chartDataOfWaterForDrill
			},
			async getPointListForIndex(){
				// async/await方式  得到所有的点位信息
				let data = await vk.callFunction({
					url: 'client/utils/pub/getRpTree',
					title: '请求中...',
				
				});
				
				
				// 得到对应的点位的
				
				that.list = data.rows
				
				// that.point_id = that.list[0].value
				
			},
			async getPointList() {
				// async/await方式  得到所有的点位信息
				let data = await vk.callFunction({
					url: 'client/utils/pub/getRpTree',
					title: '请求中...',

				});


				// 得到对应的点位的

				that.list = data.rows

				that.point_id = that.list[0].value

				//得到对应的点位的钻孔信息




				that.reloadContent();
				//加载后立即进行赋值
				// that.getTableList()


			},


			// checkAuthorize() {
			// 	//判断用户是否登录

			// 	let openid=vk.getVuex('$user.userInfo.wx_openid.mp-weixin')
			// 	console.log("这里有值吗？",vk.getVuex('$user.userInfo'))
			// 	console.log("openid？",openid)
			// 	if (!openid) {
			// 		uni.showModal({
			// 			cancelText: "取消", // 取消按钮的文字  
			// 			confirmText: "确认", // 确认按钮文字 
			// 			title: '提示',
			// 			content: '微信未授权，请登录',
			// 			confirmColor: '#3B8BFF',
			// 			cancelColor: '#222222',
			// 			success: res => {
			// 				if (res.confirm) {
			// 					uni.navigateTo({
			// 						url: '../login/login'
			// 					})
			// 				} else if (res.cancel) {
			// 					uni.navigateTo({
			// 						url: '../login/login'
			// 					})

			// 				}
			// 			}
			// 		})
			// 		return
			// 	}

			// },
		}
	}
</script>

<style lang="scss">
	@import "./analyse.scss";
</style>

<!--<view v-if="vk.getVuex('$user.userInfo')" style="color: red;margin-top: 10rpx;font-size: 36rpx;">-->
<!--当前登录用户：{{ vk.getVuex('$user.userInfo.nickname') || vk.getVuex('$user.userInfo.username') }}-->
<!--<u-avatar :src="vk.getVuex('$user.userInfo.avatar')" size="70"></u-avatar>-->
<!--</view>-->
