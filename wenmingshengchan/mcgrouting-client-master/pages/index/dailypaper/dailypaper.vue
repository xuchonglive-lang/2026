<template>
	<view class="gen">

		<!-- #ifdef MP-WEIXIN -->
		<cu-custom bgColor="bg-gradual-orange" :isCustom="true">
			<block slot="backText"></block>
			<block slot="content">探水注浆写实日报</block>
		</cu-custom>
		<!-- #endif -->
		<view class="container">
			<view class="select">
				<view class="label">选择日期：</view>
				<input v-model="date" border @click="showTimePicker" disabled />
				<time-picker ref="timePic" :hourBegin="hourBegin" :hourEnd="hourEnd" :defaultTime="date"
					@confirm="timeConfirm" startYear="2020" endYear="2030" beginMonthDay="01-01" endMonthDay="12-30"
					:params="params" />
			</view>

			<view class="loading" v-if="loading">
				<u-loading :show="loading" size="45" mode="flower"></u-loading>
			</view>

			<!-- 这里显示一个报表区域 -->
			<view class="report">

				<view class="cu-bar shadow-blur light bg-blue solid-bottom height">
					<view class="action">
						<text class='cuIcon-post text-black'></text>探水注浆写实反馈
					</view>
				</view>










				<view class="content" v-for="(is,indx) in rockList" :key="indx">


					<!-- list有连个对象，分别是白班和夜班 -->

					<!-- 一个白班*********************************** -->
	

						<view v-for="(items,indexs) in is.list" :key="indexs" v-if="items.havePoint&&items.groutingtest">
								<view class="fankuicontent">
							<view class="cu-bar light bg-brown solid-bottom height2" v-if="JSON.stringify(items.groutingtest)!='{}'">
								<view class="action">
									<text class="cuIcon-titles text-orange margintitle"></text> 一、{{date}}
									{{is.shift==1?'白班':'夜班'}}
								</view>
								<view class="action">
									<image class="avatar" :src="(items.groutingtest.avatar||'')" mode="aspectFill"></image>
									{{items.groutingtest.realName}}
								</view>
							</view>

							<view class="what" v-if="JSON.stringify(items.groutingtest)!='{}'">
								<view class="what_item">
									<text
										class="text-black text-bold cuIcon-playfill text-xxxl">1.</text>写实地点:{{items.rock_name}}
									<!-- is.usergrouting.rlp_string -->
								</view>
								<view class="what_item">
									<text
										class="text-black text-bold cuIcon-playfill text-xxxl">2.</text>探水注浆点位:{{items.pointList.length}}处,分别为
									<text v-for="(pointItem,indexOfpoint) in items.pointList"
										:key="indexOfpoint">{{pointItem.lp_string}},</text>
								</view>
								<view class="what_item">
									<text
										class="text-black text-bold cuIcon-playfill text-xxxl">3.</text>本班共计钻进{{items.sumzuanjinAllpoint.toFixed(1)}}米，
										消耗水泥{{items.sumshuiniAllpoint.toFixed(2)}}吨，水玻璃{{items.sumshuiboliAllpoint.toFixed(3)}}吨，具体明细如下:
								</view>
							</view>
							<view class="biaotou" v-if="JSON.stringify(items.groutingtest)!='{}'">
								<!-- 表头 -->
								<view class="line">
									<view class="dian light bg-blue">点位</view>
									<view class="zuanjin light  bg-blue">钻进</view>
									<view class="shuini light  bg-blue">水泥</view>
									<view class="shuiboli light  bg-blue">水玻璃</view>
								</view>
								<!-- 表头结束 -->

								<!-- 表体 -->
								<view v-for="(pointlist,indexpoinlist) in items.pointList" :key="indexpoinlist">
									<view class="line">
										<view class="dian border">{{pointlist.lp_string}}</view>
										<view class="zuanjin border">{{pointlist.sumzuanjin.toFixed(1)}}m</view>
										<view class="shuini border">{{pointlist.sumshuini.toFixed(2)}}t</view>
										<view class="shuiboli border">{{pointlist.sumshuiboli.toFixed(3)}}t</view>
									</view>

								</view>
								<!-- 表体结束 -->

							</view>

							<view class="what" v-if="JSON.stringify(items.groutingtest)!='{}'">

								<view class="what_item">
									<text class="text-black text-bold cuIcon-playfill text-xxxl">4.</text>施工明细
								</view>



								<!-- 表体 -->
								<view v-for="(pointlist,indexpoinlist) in items.pointList" :key="indexpoinlist" v-if="pointlist.groutingList.length">
									<!-- 第一个点位明细 -->
									<view class="what_item">
										<text
											class="text-black text-bold cuIcon-titles text-xxxl">({{indexpoinlist+1}}).</text>{{pointlist.lp_string}}
									</view>
									<!-- <view class="subitem">
										施工人数:3人;
									</view> -->

									<view class="subitem border"
										v-for="(grouting,indexofgrouting) in pointlist.groutingList"
										:key="indexofgrouting">
										{{grouting.drill.drill_name}}:
										<text v-if="grouting.depth90_drill">钻进{{grouting.depth90_drill}}米. </text>
										<text v-if="grouting.depth90_drill_sao">扫孔{{grouting.depth90_drill_sao}}米. </text>
										<text v-if="grouting.water_shift">当班涌水量为{{grouting.water_shift}}立方米每小时. </text>
										<text v-if="grouting.cement_sdone">注浆用水泥{{grouting.cement_sdone}}吨. </text>
										<text v-if="grouting.waterglass_sdone">注浆用水玻璃{{grouting.waterglass_sdone}}吨. </text>
										<text v-if="grouting.single_ratio">单液浆水灰比为{{grouting.single_ratio}}. </text>
										<text v-if="grouting.double_ratio">双液浆水灰比为{{grouting.double_ratio}}. </text>
										<text v-if="grouting.pressure_end">注浆终压{{grouting.pressure_end}}兆帕. </text>
										<text v-if="grouting.duanceng">一处破碎带，深度为{{grouting.duanceng}}米. </text>
										<text v-if="grouting.chushui">一处出水点，深度为{{grouting.chushui}}米. </text>
									</view>

									<!-- 结束 第一个点位明细 -->


								</view>



							</view>


					 </view>
						<!--<view v-for="(items,indexs) in is.list" :key="indexs"> 循环结束  -->

					</view>






					<!-- 一个白班结束********************************** -->




					<!-- ********************************* -->








				</view>



















			</view>

		</view>



		<!-- 上面显示一个报表区域 -->

		<view class="cu-bar shadow-blur light bg-blue solid-bottom height">
			<view class="action">
				<text class='cuIcon-post text-black'></text>探水注浆写实明细
			</view>
		</view>

		<view class="content" v-for="(its,indexx) in rockList" :key="indexx">

		<!-- 	<view class="cu-bar bg-white solid-bottom" v-if="its.usergrouting">
				<view class="action">
					<text class="cuIcon-titles text-orange"></text>{{date}} {{its.shift==1?'白班':'夜班'}}
				</view>
				<view class="action">
					<image class="zerenren" :src="(its.usergrouting.avatar||'')" mode="aspectFill"></image>
					{{its.usergrouting.realName}}
				</view>
			</view> -->

			<view v-for="(item,index0) in its.list" :key="index0" v-if="item.havePoint&&item.groutingtest">
				
			<!-- 	<view class="cu-bar light bg-brown solid-bottom height2" v-if="JSON.stringify(items.groutingtest)!='{}'">
					<view class="action">
						<text class="cuIcon-titles text-orange margintitle"></text> 一、{{date}}
						{{is.shift==1?'白班':'夜班'}}
					</view>
					<view class="action">
						<image class="avatar" :src="(items.groutingtest.avatar||'')" mode="aspectFill"></image>
						{{items.groutingtest.realName}}
					</view>
				</view> -->
				
				
				
					<view class="cu-bar bg-white solid-bottom" v-if="JSON.stringify(item.groutingtest)!='{}'">
						<view class="action">
							<text class="cuIcon-titles text-orange"></text>{{date}} {{its.shift==1?'白班':'夜班'}}
						</view>
						<view class="action">
							<image class="zerenren" :src="(item.groutingtest.avatar||'')" mode="aspectFill"></image>
							{{item.groutingtest.realName}}
						</view>
					</view>
				
				
				

				<view class="jing" v-if="JSON.stringify(item.groutingtest)!='{}'">
					<view class="action">
						<text class="lg text-red cuIcon-locationfill"></text>{{item.rock_name}}
					</view>
				</view>



				<view class="dianwei bg-gradual-green" v-if="item.entryMaterialList.length">
					<text class="lg text-white cuIcon-deliver"></text>材料进场
				</view>
				<!-- 材料进场开始 -->




				<view class="xieshi_content">
					<view class="xieshi_item">

						<view
							class="xieshi_item_content padding solid padding-xl radius  bg-white margin-top light bg-olive"
							v-if="item.entryMaterialList.length">
							<view class="kong" v-for="(it0,index00) in item.entryMaterialList" :key="index00"
								v-if="item.entryMaterialList.length">
								<view class="name  bg-gradual-pink"><text
										class="lg text-white cuIcon-location"></text>到场井点:{{it0.rock_name}}</view>
								<view class="dowhat">
									<view class="what">
										<view class="what_item">材料类型：{{it0.material_name}}</view>
										<view class="what_item">采购单位：{{it0.team_name}}</view>
										<view class="what_item">进场量：{{it0.num}}t</view>
										<view class="what_item_content">

											<u-parse :html="unescapefun(it0.remark)" v-if="it0.remark"></u-parse>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>

				</view>




				<!-- 材料进场结束 -->











				<view v-for="(it,index) in item.pointList" :key="index" v-if="it.groutingList.length">




					<view class="dianwei bg-gradual-purple">
						<text class="lg text-green cuIcon-titles"></text>{{it.lp_string}}

					</view>
					<view class="xieshi_content">
						<view class="xieshi_item">
							<view class="xieshi_title bg-gradual-blue"><text
									class="lg text-white cuIcon-forwardfill"></text>探水注浆
							</view>
							<view
								class="xieshi_item_content padding solid padding-xl radius  bg-white margin-top light bg-blue">
								<view class="kong" v-for="(it2,index1) in it.groutingList" :key="index1">
									<view class="name bg-gradual-orange"><text
											class="lg text-white cuIcon-flashlightclose"></text>孔号：{{it2.drill.drill_name}}
									</view>
									<view class="dowhat">
										<view class="what">
											<view class="what_item" v-if="it2.depth90_drill>0">
												钻进：{{it2.depth90_drill}}m</view>
											<view class="what_item" v-if="it2.depth90_drill_sao>0">
												扫孔：{{it2.depth90_drill_sao}}m</view>
											<view class="what_item" v-if="it2.cement_sdone>0">
												水泥消耗：{{it2.cement_sdone}}t</view>
											<view class="what_item" v-if="it2.waterglass_sdone>0">
												水玻璃消耗：{{it2.waterglass_sdone}}t</view>
											<view class="what_item" v-if="it2.single_ratio">
												单液浆配比：{{it2.single_ratio}}</view>
											<view class="what_item" v-if="it2.double_ratio">
												双液浆配比：{{it2.double_ratio}}</view>
											<view class="what_item" v-if="it2.water_shift>0">
												当班涌水量：{{it2.water_shift}}m³/h</view>
											<view class="what_item" v-if="it2.pressure_end>0">
												注浆终压：{{it2.pressure_end}}MPa</view>
											<view class="what_item" v-if="it2.duanceng>0">断层深度：{{it2.duanceng}}m
											</view>
											<view class="what_item" v-if="it2.chushui>0">出水深度：{{it2.chushui}}m
											</view>
											<view class="what_item_content">
												<u-parse :html="unescapefun(it2.remark)" v-if="it2.remark">
												</u-parse>
											</view>
										</view>
									</view>
								</view>

							</view>



							<view class="xieshi_title bg-gradual-blue" v-if="it.descentMaterialList.length"><text
									class="lg text-white cuIcon-down"></text>材料下井
							</view>
							<view
								class="xieshi_item_content padding solid padding-xl radius  bg-white margin-top light bg-blue"
								v-if="it.descentMaterialList.length">
								<view class="kong" v-for="(it3,indexss) in it.descentMaterialList" :key="indexss"
									v-if="it.descentMaterialList.length">
									<view class="name  bg-gradual-orange"><text
											class="lg text-white cuIcon-location"></text>点位:{{it3.point_name}}
									</view>
									<view class="dowhat">
										<view class="what">
											<view class="what_item">材料类型：{{it3.material_name}}</view>
											<view class="what_item">使用单位：{{it3.team_name}}</view>
											<view class="what_item">下井量：{{it3.num}}t</view>
											<view class="what_item_content">

												<u-parse :html="unescapefun(it3.remark)" v-if="it3.remark">
												</u-parse>
											</view>
										</view>
									</view>
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
	import timePicker from '@/components/time-picker/time-picker.vue'
	export default {
		components: {
			timePicker,
		},
		onLoad(options = {}) {

			that = this;
			vk = that.vk;
			that.options = options;
			this.date = vk.pubfn.timeFormat(new Date(), "yyyy-MM-dd");
			that.getAllRock();



		},
		filters: {
			tofixed: function(value) {
				if (!value) return 0

				return value.toFixed(2)
			},

			splice: function(str) {
				return str.split('-')[0]
			},


		},
		data() {
			return {
				test: '克拉斯-大姐夫-啊水电费-水电费水电费',
				loading: true,
				date: '',
				params: {
					year: true,
					month: true,
					day: true,

				},

				rockList: [],

				rockList_bai: [], //这种四五层的嵌套是不可能通过后台一次读取出来的，因此用到了拼凑法
				rockList_ye: [],





			}

		},



		methods: {


			//显示picker
			showTimePicker() {
				this.$refs.timePic.open()
			},
			timeConfirm(e) {
				console.log(e)
				this.date = `${e.year}-${e.month}-${e.day}`
				that.getAllRock();

			},

			unescapefun(text) {

				return unescape(text)

			},
			// 得到该点位所有的钻孔数据，并给图表赋值
			async getAllRock() {

				let data_bai = await vk.callFunction({
					url: 'client/user/kh/report/getRockList',
					data: {
						date: that.date,
						shift: 1
					}
				});
				let data_ye = await vk.callFunction({
					url: 'client/user/kh/report/getRockList',
					data: {
						date: that.date,
						shift: 2
					}
				});
				that.rockList_bai = data_bai.rows;
				that.rockList_ye = data_ye.rows;
				that.usergrouting_bai = data_bai.grouting
				that.usergrouting_ye = data_ye.grouting
				
				if (!that.usergrouting_bai && !that.usergrouting_ye) {
					that.date = that.$util.getBeforeDate(1)
					that.getAllRock2()
					return
				}
				
				that.rockList[0] = {}
				that.rockList[0].list = that.rockList_bai
				that.rockList[0].usergrouting = that.usergrouting_bai
				that.rockList[0].shift = 1
				that.rockList[1] = {}
				that.rockList[1].list = that.rockList_ye
				that.rockList[1].usergrouting = that.usergrouting_ye
				that.rockList[1].shift = 2
				this.loading = false;
			},
			// 得到该点位所有的钻孔数据，并给图表赋值
			async getAllRock2() {

				let data_bai = await vk.callFunction({
					url: 'client/user/kh/report/getRockList',
					data: {
						date: that.date,
						shift: 1
					}
				});
				let data_ye = await vk.callFunction({
					url: 'client/user/kh/report/getRockList',
					data: {
						date: that.date,
						shift: 2
					}
				});
				that.rockList_bai = data_bai.rows;
				that.rockList_ye = data_ye.rows;
				that.usergrouting_bai = data_bai.grouting
				that.usergrouting_ye = data_ye.grouting
				that.rockList[0] = {}
				that.rockList[0].list = that.rockList_bai
				that.rockList[0].usergrouting = that.usergrouting_bai
				that.rockList[0].shift = 1
				that.rockList[1] = {}
				that.rockList[1].list = that.rockList_ye
				that.rockList[1].usergrouting = that.usergrouting_ye
				that.rockList[1].shift = 2
				this.loading = false;
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

			selectChange(e) {
				this.point_id = e.value;
				// 需要对钻孔id进行清空，用于更新 钻孔的涌水量图表
				that.drill_id = '';
				this.reloadContent();
				// 选择变更后，就是一系列的数据更新读取的骚操作，第一是 得到point对象

				// 回调形式 success fail complete
			},


		}
	}
</script>

<style lang="scss">
	@import "./dailypaper.scss";
</style>

<!--<view v-if="vk.getVuex('$user.userInfo')" style="color: red;margin-top: 10rpx;font-size: 36rpx;">-->
<!--当前登录用户：{{ vk.getVuex('$user.userInfo.nickname') || vk.getVuex('$user.userInfo.username') }}-->
<!--<u-avatar :src="vk.getVuex('$user.userInfo.avatar')" size="70"></u-avatar>-->
<!--</view>-->
