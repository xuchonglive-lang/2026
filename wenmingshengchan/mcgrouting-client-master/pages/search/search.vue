<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<cu-custom bgColor="bg-gradual-orange" :isCustom="true">
			<block slot="backText"></block>
			<block slot="content">探水注浆报表数据查询</block>
		</cu-custom>
		<!-- #endif -->

		<!-- *************************searchbox******************************************************************** -->
		<view class="searchbox">
			<view class="point">
				<view class="select">
					<view class="label">日期范围：</view>
					<view @tap="calendarOpen()" class="text">{{daterange.join('~')}}</view>
					<cl-calendar class="cl-calendar" ref="calendar" type="daterange" v-model="daterange"
						@change="daterangeChange" />
				</view>
			</view>
			<view class="point">
				<view class="select">
					<view class="label">工程点位：</view>
					<cl-select class="cl-select" v-model="point_id" :options="list" :border="true"
						@confirm="selectChange">
					</cl-select>
				</view>
			</view>
		</view>
		<!-- *************************searchbox******************************************************************** -->


		<!-- *************************nav******************************************************************** -->
		<u-sticky offset-top="200">
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''"
						v-for="(item,index) in tabNav" :key="index" @tap="tabSelect" :data-id="index">
						{{tabNav[index]}}
					</view>
				</view>
			</scroll-view>
		</u-sticky>
		<!-- *************************nav******************************************************************** -->



		<!-- *************************第一列******************************************************************************************************************** -->
		<block v-if="TabCur==0">

			<view class="container">
				<view class="title bold">表1.{{title}}探水注浆信息</view>
				<view class="title">时间段：{{(daterange[0]||'').slice(5,11)}}至{{(daterange[1]||'').slice(5,11)}} </view>
				<z-table :tableData='groutingList' :columns='groutingColumns' textAlign="left" stickSide showBottomSum
					emptyText='数据库中暂无数据' :tableHeight='400' @onClick='rowClick' @onSelect='tableSelect'
					showLoading=false>
				</z-table>
				<view class="remark">单位说明：钻孔参数单位均为m,涌水量单位为m³/h,注浆材料消耗量单位均为t,压力单位均为Mpa。</view>

				<view class="item">
					<cl-radio-group v-model="form.val" @change="reload">
						<cl-radio :label="1">钻进量[不区分钻孔]</cl-radio>
						<cl-radio :label="2">注浆量[不区分钻孔]</cl-radio>
						<!-- <cl-radio :label="3">注浆效率</cl-radio> -->
					</cl-radio-group>
				</view>

				<view class="注浆效率分析">
					<qiun-data-charts type="line" canvasId="scrolllineid"
						:opts="{enableScroll:true,xAxis:{scrollShow:true,itemCount:4,disableGrid:true}}"
						:chartData="groutingChartList" :ontouch="true" :canvas2d="true" />
				</view>
			</view>
		</block>
		<!-- *************************第一列******************************************************************************************************************** -->



		<!-- *************************第二列******************************************************************************************************************** -->
		<block v-if="TabCur==1">
			<view class="container">
				<view class="title bold">表2.材料进场信息[单位:{{point.team_name}}]</view>
				<view class="title">时间段：{{(daterange[0]||'').slice(5,11)}}至{{(daterange[1]||'').slice(5,11)}} </view>
				<z-table :tableData='entryMaterialList' :columns='entryMaterialColumns' textAlign="left" stickSide
					showBottomSum emptyText='数据库中暂无数据' :tableHeight='400' @onClick='rowClick' @onSelect='tableSelect'
					showLoading=false>
				</z-table>
				<view class="remark">本次查询只查询[单位:{{point.team_name}}]的材料进场信息，用于对比分析材料使用情况。</view>

				<view class="">
					<qiun-data-charts type="column" canvasId="scrollcolumnid" id="scrollcolumnid"
						:opts="{enableScroll:true,xAxis:{scrollShow:true,itemCount:4,disableGrid:true}}" :ontouch="true"
						:canvas2d="true" :chartData="entryMaterialChartList" />
				</view>
			</view>
		</block>
		<!-- *************************第二列******************************************************************************************************************** -->


		<!-- *************************第三列******************************************************************************************************************** -->
		<block v-if="TabCur==2">
			<view class="container">
				<view class="title bold">表3.材料下井信息[单位:{{point.team_name}}]</view>
				<view class="title">时间段：{{(daterange[0]||'').slice(5,11)}}至{{(daterange[1]||'').slice(5,11)}} </view>
				<z-table :tableData='descentMaterialList' :columns='descentMaterialColumns' textAlign="left" stickSide
					showBottomSum emptyText='数据库中暂无数据' :tableHeight='400' @onClick='rowClick' @onSelect='tableSelect'
					showLoading=false>
				</z-table>
				<view class="remark">本次查询只查询[单位:{{point.team_name}}]的材料进场信息，用于对比分析材料使用情况。</view>

				<view class="注浆效率分析">
					<qiun-data-charts type="column" canvasId="scrollcolumnid" id="scrollcolumnid"
						:opts="{enableScroll:true,xAxis:{scrollShow:true,itemCount:4,disableGrid:true}}" :ontouch="true"
						:canvas2d="true" :chartData="descentMaterialChartList" />
				</view>
			</view>

		</block>
		<!-- *************************第三列******************************************************************************************************************** -->




	</view>
</template>

<script>
	var that; // 当前页面对象
	var vk; // vk依赖

	import zTable from "../../components/z-table/z-table.vue";
	export default {
		components: {
			zTable
		},
		// 监听 - 页面每次【加载时】执行(如：前进)
		onLoad(options = {}) {
			that = this;
			vk = that.vk;
			that.options = options;
			// 第一次加载，用于初始化本月的第一天和最后一天的日期，
			// 用于加载select 下拉框的值
			
			this.getDateOnload();
			this.getPointList();
		},
		data() {
			return {
				point: {},
				TabCur: 0,
				tabNav: ['探水注浆', '材料进场', '材料下井'],
				scrollLeft: 0,
				chartDataArr: [], //后台传过来的三个图标的数据 数组，
				form: {
					val: 1
				},
				groutingChartList: {},
				chartData: {},
				list: [],
				title: '', //用于表格标题显示，每次确定后自动更新
				daterange: [],
				point_id: '',
				groutingList: [],
				entryMaterialList: [],
				descentMaterialList: [],
				groutingColumns: [{
						title: '<span style="vertical-align: middle;">日期[班次]-孔号</span>',
						format: {
							template: "<span><span style='vertical-align: middle;'>#g_date#[#shift#]-#drill_name#</span>",
							names: ["g_date", "shift", "drill_name"]
						},
						width: 280
					}, {
						title: "写实人",
						key: "realName",
						width: 120,
						noSum: true

					}, {
						title: "设计深度",
						key: "depth_design",
						width: 110,
						noSum: true
					},
					{
						title: "当班钻进",
						key: "depth90_drill",
						width: 110
					},
					{
						title: "当班扫孔",
						key: "depth90_drill_sao",
						width: 110
					},
					{
						title: "涌水量",
						key: "water_shift",
						width: 90
					},

					{
						title: "水泥消耗量",
						key: "cement_sdone",
						width: 135
					},
					{
						title: "水玻璃消耗量",
						key: "waterglass_sdone",
						width: 155
					},
					{
						title: "单液浆水灰比",
						key: "single_ratio",
						width: 155,
						noSum: true
					},
					{
						title: "双液浆配比",
						key: "double_ratio",
						width: 155,
						noSum: true
					},
					{
						title: "注浆后压力",
						key: "pressure_end",
						width: 110,
						noSum: true
					}
				],
				entryMaterialColumns: [{
						title: '<span style="vertical-align: middle;">日期[班次]</span>',
						format: {
							template: "<span><span style='vertical-align: middle;'>#e_date#[#shift#]</span>",
							names: ["e_date", "shift"]
						},
						width: 200
					}, {
						title: "写实人",
						key: "realName",
						width: 120,
						noSum: true

					}, {
						title: "材料类型",
						key: "material_name",
						width: 110,
						noSum: true
					},
					{
						title: "进场数量(t)",
						key: "num",
						width: 140
					},
					{
						title: "使用单位",
						key: "team_name",
						width: 130
					},

					{
						title: "进场井点",
						key: "rock_name",
						width: 135
					}
				],
				entryMaterialChartList: {},
				descentMaterialColumns: [{
						title: '<span style="vertical-align: middle;">日期[班次]</span>',
						format: {
							template: "<span><span style='vertical-align: middle;'>#d_date#[#shift#]</span>",
							names: ["d_date", "shift"]
						},
						width: 200
					}, {
						title: "写实人",
						key: "realName",
						width: 120,
						noSum: true

					}, {
						title: "材料类型",
						key: "material_name",
						width: 110,
						noSum: true
					},
					{
						title: "下井数量(t)",
						key: "num",
						width: 140
					},
					{
						title: "使用单位",
						key: "team_name",
						width: 130
					},

					{
						title: "使用点位",
						key: "point_name",
						width: 600
					}
				],
				descentMaterialChartList: {},

			}
		},
		methods: {

			// 这个是三段tabs的变化
			tabSelect(e) {
				that.TabCur = e.currentTarget.dataset.id;
				that.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			// 刷新函数，每次条件变化后执行一次
			async getTableList() {

				// async/await方式
				
				console.log("这是第一次运行吗",that.point_id)
				let xuchong = await vk.callFunction({
					url: 'client/user/kh/common/getPointById',
					title: '请求中...',
					data: {
						_id: that.point_id
					},
				});




				that.point = xuchong.item



				let rock_id = that.point.rock_id;

				let team_id = that.point.team_id;
				console.log("这里肯定有值了？rock_id", rock_id)
				console.log("这里肯定有值了？team_id", team_id)
				// 因为一个函数中的内容过多，造成函数中出现异常，因此，在这里再新建一个方法，用于解决上述的问题。
				// async/await方式



				// async/await方式
				let data = await vk.callFunction({
					url: 'client/user/kh/getDataForTable/getDataForTable',
					title: '请求中...',
					data: {
						point_id: that.point_id,
						g_dateStart: that.daterange[0],
						g_dateEnd: that.daterange[1]
					}

				});



				let result = await vk.callFunction({
					url: 'client/user/kh/getDataForTable/getDataForTable2',
					data: {
						rock_id: rock_id,
						team_id: team_id,
						point_id: that.point_id,
						g_dateStart: that.daterange[0],
						g_dateEnd: that.daterange[1]
					}

				});


				// 第一个data
				that.groutingList = data.rows;
				that.chartDataArr = data.chartDataArr;


				// // 第二个result
				// that.point=result.point;
				that.entryMaterialList = result.entrys;
				that.descentMaterialList = result.descents;


				// 初始化时一律 显示注浆和涌水数据
				that.groutingChartList = data.chartDataArr[0];
				that.groutingChartList = JSON.parse(JSON.stringify(that.groutingChartList))

				// 材料进场与下井图表数据写入
				that.entryMaterialChartList = result.chartDataArr2[0];
				that.entryMaterialChartList = JSON.parse(JSON.stringify(that.entryMaterialChartList))

				that.descentMaterialChartList = result.chartDataArr2[1];
				that.descentMaterialChartList = JSON.parse(JSON.stringify(that.descentMaterialChartList))
				// 更新标题
				that.getObjFromList();
			},

			// 从当前list中通过point_id 获取label值，用于标题显示
			getObjFromList() {

				var obj = that.list.find(item => item.value == that.point_id);
				console.log("obj是什么值", obj)
				that.title = obj.label
			},
			daterangeChange(e) {
				// 日期更新后刷新表格里面的数据
				// console.log("e是什么",e)  通过打印，e是一个数组，每个元素是一个对象，其中有 date index  value三个值
				that.daterange[0] = e[0].date
				that.daterange[1] = e[1].date
				that.getTableList()
			},
			// 这个函数是在点位变化后触发执行
			selectChange(e) {
				console.log(e.value);
				that.point_id = e.value;
				that.getTableList();
			},
			calendarOpen() {
				that.$refs.calendar.open();
			},
			// 这个函数只在第一次页面加载执行  只执行一次
			getDateOnload() {
				// async/await方式

				that.daterange[0] = vk.pubfn.timeFormat(vk.pubfn.getCommonTime(new Date()).monthStart, "yyyy-MM-dd");
				that.daterange[1] = vk.pubfn.timeFormat(vk.pubfn.getCommonTime(new Date()).monthEnd, "yyyy-MM-dd");
				
			},
			async getPointList() {
				// async/await方式
				let data = await vk.callFunction({
					url: 'client/utils/pub/getRpTree',
					title: '请求中...',

				});

				that.list = data.rows

				that.point_id = that.list[0].value




				//加载后立即进行赋值
				that.getTableList()


			},

			rowClick(item) {
				uni.showToast({
					title: `${JSON.stringify(item)}数据被点击`,
					icon: 'none'
				})
			},
			// 当选择不同类型的图表后，就显示相应的图标类型，只用在这里更换下数据就行了
			reload(e) {
				// this.chartDataArr=data.chartDataArr;（这里已经在刷新的时候已经复制过了，这里不用写）
				// console.log("e值是什么",e)
				// 初始化时一律 显示注浆和涌水数据
				let index = e - 1;
				that.groutingChartList = that.chartDataArr[index];
				console.log("打印图表的数据", JSON.stringify(that.groutingChartList))
				that.groutingChartList = JSON.parse(JSON.stringify(that.groutingChartList))

			},
			doSort(res) {
				uni.showToast({
					title: `点击了${res.key}的排序, 排序方式为${res.type}`,
					icon: "none"
				})
			},
			tableSelect(selectList) {
				uni.showToast({
					title: `选中了TableData中下标为${selectList.join(',')}的元素`,
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
	}

	.container {
		width: 100%;
		overflow: hidden;
		background-color: #FFFFFF;
		margin-top: 1rpx;
		border-radius: 20rpx;
		padding: 10rpx 5rpx;
		box-sizing: border-box;

		.remark {
			font-size: 22rpx;
		}

		.bold {
			font-weight: bold;
		}

		.title {
			font-size: 22rpx;
			text-align: center;
		}

		.item {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin: 5rpx 10rpx;
			padding: 5rpx 5rpx;
		}
	}

	.title {
		display: flex;
		justify-content: center;
		margin: 20rpx 0;
	}

	.searchbox {

		width: 100%;
		height: 165rpx;
		background-color: #FFFFFF;
		padding: 5rpx 5rpx;

		.point {
			.select {
				background-color: #FFFFFF;

				width: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 8rpx 5rpx;
				margin-bottom: -5rpx;

				.label {
					width: 24%;
					font-size: 26rpx;
					line-height: 26rpx;
					text-align: left;
					padding-left: 10rpx;
				}

				.cl-select {

					font-size: 22rpx;
					padding: 0;
					margin: 0;
				}

				.text {
					width: 100%;
					border: 1rpx solid #DCDFE6;
					height: 70rpx;
					border-radius: 9rpx;
					text-align: left;
					line-height: 70rpx;
					font-size: 22rpx;
					padding: 0;
					margin: 0;
				}

			}

		}

	}
</style>
