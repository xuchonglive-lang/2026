<template>

	<view class="addfankui">
		<!-- #ifdef MP-WEIXIN -->
		<cu-custom bgColor="bg-gradual-orange" :isCustom="true">
			<block slot="backText"></block>
			<block slot="content">添加注浆反馈信息</block>
		</cu-custom>
		<!-- #endif -->
		<!-- 消息提示 -->
		<cl-toast ref="toast"></cl-toast>

		<!-- 提示气泡组件https://ext.dcloud.net.cn/plugin?id=801 -->
		<chunLei-popups v-model="value5" :popData="data2" @tapPopup="tapPopup" :x="x" :y="y" direction="row"
			theme="dark" placement="bottom-start" dynamic>
		</chunLei-popups>

		<u-form :model.sync="form" :rules="rules" ref="uForm" :errorType="errorType">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-blue"></text>添加探水注浆写实信息
				</view>
			</view>

			<view class="block">

				<u-form-item :label-position="labelPosition" label="日期" prop="g_date">
					<cl-select mode="date" placeholder="请选择施工日期" v-model="form.g_date"></cl-select>
				</u-form-item>

				<u-form-item label="钻孔" prop="drill_ids">
						<cl-select-region placeholder="请选择注浆孔号" v-model="form.drill_ids" @change="selectDrillsChange"></cl-select-region>
				
				</u-form-item>
					

					<u-form-item :label-position="labelPosition" label="班次" prop="g_shift">
						<cl-radio-group v-model="form.g_shift">
							<cl-radio :label="1">白班8:00-16:00</cl-radio>
							<cl-radio :label="2">夜班16:00-8:00</cl-radio>
						</cl-radio-group>
					</u-form-item>

			</view>


			<view class="cu-bar light bg-blue solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>钻孔数据
				</view>
			</view>

			<view class="block">



				<u-form-item :label-position="labelPosition" label="钻孔" prop="depth90_drill">
					<input @tap="tapOut($event,5,'depth90_drill')" id="depth90_drill" placeholder="请填写钻进深度(单位:m)"
						v-model="form.depth90_drill">
				</u-form-item>



				<u-form-item :label-position="labelPosition" label="扫孔" prop="depth90_drill_sao">
					<input @tap="tapOut($event,5,'depth90_drill_sao')" id="depth90_drill_sao"
						placeholder="请填写扫孔钻进深度(单位:m)" v-model="form.depth90_drill_sao">
					</input>
				</u-form-item>

			</view>

			<view class="cu-bar light bg-green solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>钻孔测水数据
				</view>
			</view>

			<view class="block">

				<u-form-item label-width="120" :label-position="labelPosition" label="涌水量" prop="water_shift">
					<input @tap="tapOut($event,5,'water_shift')" id="water_shift" placeholder="请填写当班涌水量(单位:m³/h)"
						v-model="form.water_shift">
					</input>
				</u-form-item>

				<u-form-item label-width="120" :label-position="labelPosition" label="破碎带" prop="duanceng">
					<input @tap="tapOut($event,5,'duanceng')" id="duanceng" placeholder="请填写断层破碎点深孔(单位:m)"
						v-model.number="form.duanceng">
					</input>
				</u-form-item>

				<u-form-item label-width="120" :label-position="labelPosition" label="出水点" prop="chushui">
					<input @tap="tapOut($event,5,'chushui')" id="chushui" placeholder="请填写出水点深孔(单位:m)"
						v-model="form.chushui">
					</input>
				</u-form-item>

			</view>



			<view class="cu-bar light bg-orange solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>材料消耗数据
				</view>
			</view>

			<view class="block">

				<u-form-item label-width="120" :label-position="labelPosition" label="水泥" prop="cement_sdone">
					<input @tap="tapOut($event,5,'cement_sdone')" id="cement_sdone" placeholder="请填写水泥消耗量(单位:t)"
						v-model="form.cement_sdone">
					</input>
				</u-form-item>

				<u-form-item label-width="120" :label-position="labelPosition" label="水玻璃" prop="waterglass_sdone">
					<input @tap="tapOut($event,5,'waterglass_sdone')" id="waterglass_sdone"
						placeholder="请填写水玻璃消耗量(单位:t)" v-model="form.waterglass_sdone"></input>
				</u-form-item>

				<!-- 		<u-form-item label-width="140" :label-position="labelPosition" label="注浆时间" prop="grouting_time">
					<input  placeholder="请填写注浆所用时长(如注浆必填,单位:h)" v-model="form.grouting_time"></input>
				</u-form-item> -->

			</view>




			<view class="cu-bar light bg-yellow solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>单液浆配比
				</view>
			</view>

			<view class="block">

				<u-form-item label-width="120" :label-position="labelPosition" label="水灰比" prop="single_ratio">
					<input placeholder="请填写水灰比(例如 1:1)" v-model="form.single_ratio"></input>
				</u-form-item>

				<!-- 	<u-form-item label-width="120" :label-position="labelPosition" label="水泥浆" prop="single_amount">
					<input  placeholder="请填写水泥浆消耗量(单位:m³)" v-model="form.single_amount">
					</input>
				</u-form-item> -->



			</view>

			<view class="cu-bar light bg-red solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>双液浆配比
				</view>
			</view>

			<view class="block">

				<u-form-item label-width="210" :label-position="labelPosition" label="泥浆与水玻璃比" prop="double_ratio">
					<input placeholder="请填写泥浆与水玻璃比(例如 1:1)" v-model="form.double_ratio"></input>
				</u-form-item>

				<!-- 				<u-form-item label-width="120" :label-position="labelPosition" label="水玻璃" prop="double_wgamount">
					<input  placeholder="请填写水玻璃消耗量(单位:t)" v-model="form.double_wgamount"></input>
				</u-form-item>

				<u-form-item label-width="140" :label-position="labelPosition" label="双液浆量" prop="double_dwamount">
					<input  placeholder="请填写双液浆消耗量(单位:m³)" v-model="form.double_dwamount"></input>
				</u-form-item> -->

			</view>






			<view class="cu-bar light bg-mauve solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>注浆压力当班终值
				</view>
			</view>

			<view class="block">

				<!-- 		<u-form-item :label-position="labelPosition" label="初压" prop="pressure_start">
					<input   placeholder="请填写接班注浆压力(单位:Mpa)"
						v-model.number="form.pressure_start">
					</input>
				</u-form-item> -->

				<u-form-item :label-position="labelPosition" label="终压" prop="pressure_end">
					<input @tap="tapOut($event,5,'pressure_end')" id="pressure_end" placeholder="请填写交班注浆压力(单位:Mpa)"
						v-model="form.pressure_end">
					</input>
				</u-form-item>

			</view>


			<view class="cu-bar light bg-red solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>施工写实说明
				</view>
			</view>

			<view class="block">

				<view class="border">
					<robin-editor ref="RichText" class="editor" v-model="html" :imageUploader="uploadImg"
						:muiltImage="true" :autoHideToolbar="false" :tools="tool">
						<!-- :imageUploader="uploadImg" 这个是可以去掉的，因为是通过setImageUplode 这个方法注入的上传函数-->
					</robin-editor>
				</view>



			</view>
		</u-form>




		<view class="footer">
			<cl-row :gutter="20">
				<cl-col :span="12">
					<cl-button type="primary" fill @tap="onSubmit" :disabled="flag">提交反馈</cl-button>
				</cl-col>

				<cl-col :span="12">
					<cl-button fill @tap="onReset">重置</cl-button>
				</cl-col>
			</cl-row>
		</view>
	</view>
</template>

<script>
	var that; // 当前页面对象
	var vk; // vk依赖
	import chunLeiPopups from "@/components/chunLei-popups/chunLei-popups.vue";
	export default {
		components: {
			chunLeiPopups
		},

		data() {
			return {
			

				value5: false,
				x: 0,
				y: 0,

				data2: [{ title: '', disabled: true }],
				drill: {},

				// 当_id有值得时候，就是更新，没有值得时候，就是新增。
				grouting_id: '',


				// 这里是编辑的内容
				html: "",
				tool: ['bold', 'italic', 'underline', 'align-left', 'align-center', 'align-right', 'remove',
					'font', 'color', 'backgroundColor', 'image', 'clear', 'preview'
				],



				form: {

					g_date: "",
					g_shift: 1,
					drill_ids: [],
					drill_id: "",
					depth90_drill: "",
					depth90_drill_sao: "",
					water_shift: "",
					cement_sdone: "",
					waterglass_sdone: "",
					pressure_start: 1,
					pressure_end: "",
					single_ratio: "",
					single_amount: 0,
					double_ratio: "",
					double_wgamount: 0,
					double_dwamount: 0,
					grouting_time: 1,
					chushui: "",
					duanceng: ""
				},
				flag: false, //按钮的可操作状态
				errorType: ['message'],
				rules: {
					g_date: [{
						required: true,
						message: '请选择写实日期',
						trigger: 'blur',
					}],
					depth90_drill: [{
						type: 'number',
						message: '只能为数字',
						trigger: ['change', 'blur'],
					}],
					depth90_drill_sao: [{
						type: 'number',
						message: '只能为数字',
						trigger: ['change', 'blur'],
					}],
					water_shift: [{
						type: 'number',
						message: '只能为数字',
						trigger: ['change', 'blur'],
					}],
					cement_sdone: [{
						type: 'number',
						message: '只能为数字',
						trigger: ['change', 'blur'],
					}],
					waterglass_sdone: [{
						type: 'number',
						message: '只能为数字',
						trigger: ['change', 'blur'],
					}],
					pressure_start: [{
						type: 'number',
						message: '只能为数字',
						trigger: ['change', 'blur'],
					}],
					pressure_end: [{
						type: 'number',
						message: '只能为数字',
						trigger: ['change', 'blur'],
					}],
					single_amount: [{
						type: 'number',
						message: '只能为数字',
						trigger: ['change', 'blur'],
					}],
					double_wgamount: [{
						type: 'number',
						message: '只能为数字',
						trigger: ['change', 'blur'],
					}],
					chushui: [{
						type: 'number',
						message: '只能为数字',
						trigger: ['change', 'blur'],
					}],
					duanceng: [{
						type: 'number',
						message: '只能为数字',
						trigger: ['change', 'blur'],
					}],
					grouting_time: [{
						type: 'number',
						message: '只能为数字',
						trigger: ['change', 'blur'],
					}],

				},
				labelAlign: "right",
				labelWidth: "220rpx",
				isRule: true,
				showMessage: true,
				disabled: false
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		//监听滚动隐藏
		onPageScroll() {
			for (let i = 0; i < 6; i++) {
				this[`value${i}`] = false
			}
		},
		mounted() {},
		// 监听 - 页面每次【加载时】执行(如：前进)
		onLoad(options = {}) {
			that = this;
			vk = that.vk;
			that.options = options;
			let id = that.options.id
			if (id) {
				that.initFormData(id)
			}
			that.init(options);
			// 因为uniapp的vue3bug，我不能直接通过props传递函数，因为函数在template中是undefined，等待官方解决...
			this.$refs.RichText.setImageUploader(this.uploadImage);
		},
		methods: {
			tapOut(e, index, id) {

				if (!that.drill) {
					return
				}

				if (id == 'depth90_drill') {

					if (that.drill.depth_drillsum) {
						that.data2[0].title = "该孔设计" + that.drill.depth_design + "m,已累计钻进" + that.drill.depth_drillsum +
							"m"
					} else {
						return
					}


				}
				if (id == 'depth90_drill_sao') {

					if (that.drill.depth_drillsaosum) {
						that.data2[0].title = "该孔已累计扫孔" + that.drill.depth_drillsaosum + "m"
					} else {
						return
					}

				}



				if (id == 'cement_sdone') {
					if (that.drill.cement_sum) {
						that.data2[0].title = "该孔已累计消耗水泥" + that.drill.cement_sum + "t"
					} else {
						return
					}

				}
				if (id == 'waterglass_sdone') {
					if (that.drill.waterglass_sum) {
						that.data2[0].title = "该孔已累计消耗水玻璃" + that.drill.waterglass_sum + "t"
					} else {
						return
					}

				}

				if (id == 'water_shift') {
					if (that.drill.water_sum) {
						that.data2[0].title = "该孔已累计涌水" + that.drill.water_sum + "m³"
					} else {
						return
					}

				}

				if (id == 'duanceng') {
					let temp1 = ""
					if (that.drill.duanceng) {


						that.drill.duanceng.forEach((it2, index2) => {

							temp1 += "第" + (index2 + 1) + "处深度为" + it2.depth + 'm，反馈人' + it2.reporter + ",于" + it2
								.date + it2.shift + "反馈;"
						});
						that.data2[0].title = "该孔共计断层" + that.drill.duanceng.length + "处。" + temp1;
					} else {
						that.data2[0].title = "该孔目前没有断层点位信息";
					}


				}
				if (id == 'chushui') {
					let temp1 = ""
					if (that.drill.chushui) {


						that.drill.chushui.forEach((it2, index2) => {

							temp1 += "第" + (index2 + 1) + "处深度为" + it2.depth + 'm，反馈人' + it2.reporter + ",于" + it2
								.date + it2.shift + "反馈;"
						});
						that.data2[0].title = "该孔已有出水点" + that.drill.chushui.length + "处。" + temp1;
					} else {
						that.data2[0].title = "该孔目前没有出水点位信息";
					}



				}

				if (id == 'pressure_end') {
					if (that.drill.pressure_end) {
						that.data2[0].title = "上次注浆终压为" + that.drill.pressure_end + "Mpa";
					} else {
						that.data2[0].title = "第一次注浆，核准当班终压";
					}
				}

				let dom = uni.createSelectorQuery().in(this)

				dom.select('#' + `${id}`).boundingClientRect()
				dom.exec((data) => {
					this.x = (data[0].left + data[0].right) / 2
					this.y = data[0].top
					this[`value${index}`] = !this[`value${index}`]
				})

			},
			async selectDrillsChange(e) {
				console.log("这里是什么值？", e)
				let drill_id = e[2];
				let xuchong = await vk.callFunction({
					url: 'client/user/kh/common/getDrillById',
					data: {
						_id: drill_id
					},
				});
				that.drill = xuchong.item

			},



			/* 如果传过来的id有值，那么充填所有数据，用于更新用 */
			async initFormData(id) {
				// async/await方式
				let res = await vk.callFunction({
					url: 'client/user/kh/common/getGroutingById',
					title: '请求中...',
					data: {
						_id: id
					},
				});

				that.form = res.item
				that.html = unescape(res.item.remark)
				that.grouting_id = res.item._id
				// // 给编辑器赋值    (不用怎么复杂，robin 给封装了，直接用html就行)
				// const editor = this.$refs['RichText'];

				// uni.createSelectorQuery().select('#RichText').context(function(res) {
				// 	that.editorCtx = editor;
				// 	//一进入页面就初始化富文本编辑器，此时还未发送请求获取不到数据，编辑器内容html为空（that.data.articleContent为空）
				// 	      //请求完数据后再调用这个方法，才能取到数据写入编辑器')
				// 	      that.editorCtx.setContents({
				// 	        html: '这操'  //将数据写入编辑器内
				// 	      })

				// 	      //在这里用event.on注册onEditorReady方法
				// 	      //当event.emit执行时，就会调用onEditorReady方法，重新渲染富文本编辑器
				// 	      //此时就能获取到数据，写入编辑器中（即给that.data.articleContent赋值后，他不再为空）
				// 	      // event.on('resetEditor', _self, _self.onEditorReady.bind(_self))
				// }).exec();


				// editor.editorCtx.setContents({
				//   html: res.item.remark  //将数据写入编辑器内
				// })

			},



			// 页面数据初始化函数
			init(options) {
				console.log("init: ", options);
			},
			// changeMode(e) {
			// 	// console.log(JSON.stringify(e))
			// 	let s = e.pop();
			// 	this.drill_id = s;
			// },
			uploadImg: function(img, callback) {
				//上传图片逻辑,将图片链接传给回调函数
				callback(img)
			},
			uploadImage: function(img, callback) {
				// 上传至 unicloud云储存
				vk.callFunctionUtil.uploadFile({
					title: "上传中...",
					filePath: img,
					suffix: "png", // 不传suffix会自动获取，但H5环境下获取不到后缀，但可以通过file.name 获取
					provider: "unicloud",
					success(res) {
						// 上传成功
						let dataURL = res.fileID;
						callback ? callback(dataURL) : null; //调用回调函数

					}
				});
			},

			// 提交操作，有一个验证的过程
			onSubmit() {


				that.flag = true //按钮不可操作 防止重复提交
				if (this.form.drill_ids.length < 1) {
					that.$refs["toast"].open({
						message: "钻孔编号必须选择",
						position: 'middle ',
						type: 'error',
						iconSize: 50
					})
					that.flag = false //回复按钮可用状态
					return

				}



				that.$refs.uForm.validate(valid => {
					if (valid) {
						// 在这里提交到数据库中------------开始
						// 回调形式 success fail complete
						let data = that.form
						// 在提交前判断是否为空值，如果是，就将其赋值为0
						for (let key in data) {
							if (data[key] == null || data[key] == undefined || data[key] == '') {
								data[key] = 0;
							}
						}

						let drill_id = that.form.drill_ids[that.form.drill_ids.length - 1]
						// 在提交前判断是否为空值，如果是，就将其赋值为0
						const editor = that.$refs['RichText'];
						console.log(editor)


						/* ***********这里进行判断是否新增还是更新，动态的给url 进行赋值*************** */
						let url
						if (that.grouting_id) {
							url = 'client/user/kh/operate/manageInfo/update/updateGrouting'
						} else {
							url = 'client/user/kh/operate/addInfo/addGrouting'
						}

						editor.editorCtx.getContents({
							success: (res) => {
								console.log(res.html)
								let remark = escape(res.html)
								console.log(remark)
								vk.callFunction({
									url: url,
									title: '反馈信息添加中...',
									data: {
										grouting_id: that.grouting_id,
										remark: remark,
										g_date: that.form.g_date,
										g_shift: that.form.g_shift,
										drill_ids: that.form.drill_ids,
										drill_id: drill_id,
										depth90_drill: parseFloat(that.form.depth90_drill),
										depth90_drill_sao: parseFloat(that.form
											.depth90_drill_sao),
										water_shift: parseFloat(that.form.water_shift),
										cement_sdone: parseFloat(that.form.cement_sdone),
										waterglass_sdone: parseFloat(that.form
											.waterglass_sdone),
										pressure_start: parseFloat(that.form.pressure_start),
										pressure_end: parseFloat(that.form.pressure_end),
										single_ratio: that.form.single_ratio,
										single_amount: parseFloat(that.form.single_amount),
										double_ratio: that.form.double_ratio,
										double_wgamount: parseFloat(that.form.double_wgamount),
										double_dwamount: parseFloat(that.form.double_dwamount),
										chushui: that.form.chushui,
										duanceng: that.form.duanceng,
										grouting_time: parseFloat(that.form.grouting_time)
									},
									success: function(res) {
										console.log("这里能够捕捉到这个错误码？", res);
										if (res.code == 0) {
											console.log(res);
											that.$refs["toast"].open({
												message: res.msg,
												position: 'middle ',
												type: 'success ',
												iconSize: 50

											});
											that.flag = false //回复按钮可用状态
											uni.navigateBack({})
										} else {
											console.log("这里能够捕捉到这个错误码？", res);
											that.$refs["toast"].open({
												message: res.msg,
												position: 'middle ',
												type: 'error',
												iconSize: 50
											})
											that.flag = false //回复按钮可用状态

										}

									}
								});

							},
							fail: (res) => {
								console.log("fail：", res);
								that.flag = false //回复按钮可用状态
								uni.navigateBack({})
							}
						});
						// 在这里提交到数据库中------------结束

					} else {
						that.flag = false //回复按钮可用状态
						that.$refs["toast"].open(errors[0].message);
					}
				});
			},
			onReset() {
				that.$refs["uForm"].resetFields();
			}
		}
	};
</script>

<style lang="scss" scoped>
	.border {
		border: 1rpx solid #DCDFE6;

	}


	.block {
		background-color: #FFFFFF;
		box-shadow: $box-shadow;
		margin: 8rpx 0rpx;
	}

	.cl-select {
		font-size: 22rpx;
		padding: 0;
		margin: 0;
	}

	.addfankui {
		padding-bottom: calc(90rpx + env(safe-area-inset-bottom));

		.footer {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: #fff;
			z-index: 9;
			padding: 10rpx 20rpx;
			box-sizing: border-box;
			border-top: 1rpx solid #eee;
			padding-bottom: calc(env(safe-area-inset-bottom) + 10rpx);
		}
	}

	.text {
		font-size: 20rpx;
	}

	.rr {
		border: 1rpx solid red;
	}

	.dark {
		margin-bottom: 150rpx;
		size: 22rpx;

		padding: 50rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 200rpx;
		width: 80%;

		view {
			display: flex;
			justify-content: space-between;
		}
	}
</style>
