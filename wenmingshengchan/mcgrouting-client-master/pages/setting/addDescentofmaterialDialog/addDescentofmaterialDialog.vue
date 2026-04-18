<template>

	<view class="addfankui">
		<!-- #ifdef MP-WEIXIN -->
		<cu-custom bgColor="bg-gradual-orange" :isCustom="true">
			<block slot="backText"></block>
			<block slot="content">添加材料下井信息</block>
		</cu-custom>
		<!-- #endif -->
		<!-- 消息提示 -->
		<cl-toast ref="toast"></cl-toast>

	
	
		<u-form :model.sync="form" :rules="rules" ref="uForm" :errorType="errorType">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-blue"></text>添加材料下井信息
				</view>
			</view>
	
			<view class="block">
				<u-form-item :label-position="labelPosition" label="日期" prop="d_date">
					<cl-select :border="false" mode="date" placeholder="请选择材料下井日期" v-model="form.d_date"></cl-select>
				</u-form-item>
	
				<u-form-item :label-position="labelPosition" label="班次" prop="d_shift">
					<cl-radio-group v-model="form.d_shift">
						<cl-radio :label="1">白班8:00-16:00</cl-radio>
						<cl-radio :label="2">夜班16:00-8:00</cl-radio>
					</cl-radio-group>
				</u-form-item>
	
	
				<u-form-item  label-width="140" label="使用单位" prop="team_id">
					<cl-select :border="false" class="cl-select" v-model="form.team_id" :options="teamlist" 
						@confirm="selectChangeofTeam">
					</cl-select>
				</u-form-item>
	
	
				<u-form-item label-width="140" label="使用点位" prop="point_id">
					<cl-select :border="false" class="cl-select" v-model="form.point_id" :options="pointlist" 
						@confirm="selectChange">
					</cl-select>
				</u-form-item>
				<u-form-item  label-width="140" label="材料类型" prop="material_id">
					<cl-select :border="false" class="cl-select" v-model="form.material_id" :options="materiallist" 
						@confirm="selectChangeofMaterial">
					</cl-select>
				</u-form-item>
				<u-form-item label-width="140" :label-position="labelPosition" label="下井数量" prop="num">
					<cl-input :border="false" placeholder="请填写材料下井数量(单位:t)" v-model="form.num"></cl-input>
				</u-form-item>
	
	
	
			</view>
	
	
	
	
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>现场写实情况说明
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
	export default {
		data() {
			return {
				// 当_id有值得时候，就是更新，没有值得时候，就是新增。
				descentofmaterial_id:'',
				pointlist: [],
				materiallist:[],
				teamlist:[],
				html:'',
				tool: ['bold', 'italic', 'underline', 'align-left', 'align-center', 'align-right', 'remove',
					'font', 'color', 'backgroundColor', 'image', 'clear', 'preview'
				],

				form: {
					point_id:'',
					d_date:'',
					d_shift:1,
					material_id:'',
					team_id:'',
					num:'',
					remark:'',
				},
				flag: false, //按钮的可操作状态
				errorType: ['message'],
				rules: {
					d_date: [{
						required: true,
						message: '下井日期不能为空',
						trigger: 'blur',
					}],
					team_id: [{
						required: true,
						message: '使用单位不能为空',
						trigger: 'blur',
					}],
					point_id: [{
						required: true,
						message: '使用点位不能为空',
						trigger: 'blur',
					}],
					material_id: [{
						required: true,
						message: '材料类型不能为空',
						trigger: 'blur',
					}],
					num: [{
						required: true,
						message: '数量不能为空',
						trigger: 'blur',
					},{
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

		mounted() {},
		// 监听 - 页面每次【加载时】执行(如：前进)
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(options = {}) {
			that = this;
			vk = that.vk;
			that.options = options;
			that.init(options);
			
			// 用于加载select 下拉框的值
			let id = that.options.id
			if (id) {
				that.initFormData(id)
			}
			
			
			// 因为uniapp的vue3bug，我不能直接通过props传递函数，因为函数在template中是undefined，等待官方解决...
			this.$refs.RichText.setImageUploader(this.uploadImage);
			// 用于加载select 下拉框的值
			this.getTeamList();
			this.getMaterialList();
			this.getPointList();
			
		},
		methods: {
			/* 如果传过来的id有值，那么充填所有数据，用于更新用 */
			async initFormData(id) {
				// async/await方式
				let res = await vk.callFunction({
					url: 'client/user/kh/common/getDescentofmaterialById',
					title: '请求中...',
					data: {
						_id: id
					},
				});
			
				that.form = res.item
				that.html = unescape(res.item.remark)
				that.descentofmaterial_id = res.item._id
			
			
			},
			selectChange(e) {
				console.log(e.value);
				this.form.point_id = e.value;
			
			},
			selectChangeofTeam(e){
					this.team_id = e.value;
			},
			selectChangeofMaterial(e){
					this.material_id = e.value;
			},
			//获取注浆材料信息
			async getMaterialList() {
				// async/await方式
				let data = await vk.callFunction({
					url: 'client/utils/pub/getMaterialTree',
					title: '请求中...',
			
				});
			
				that.materiallist = data.rows
			
				that.material_id = that.materiallist[0].value
			
			
			
			
			},
			async getTeamList() {
				// async/await方式
				let data = await vk.callFunction({
					url: 'client/utils/pub/getTeamTree',
					title: '请求中...',
			
				});
			
				that.teamlist = data.rows
			
				that.team_id = that.teamlist[0].value
			
			
			
			
			},
			async getPointList() {
				// async/await方式
				let data = await vk.callFunction({
					url: 'client/utils/pub/getRpTreeNoView',
					title: '请求中...',
			
				});
			
				that.pointlist = data.rows
			
				that.point_id = that.pointlist[0].value
			
			
			
			
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
					that.$refs.uForm.validate(valid => {
					if (valid) {
						// 在这里提交到数据库中------------开始
						// 回调形式 success fail complete
						let data = this.form
						// 在提交前判断是否为空值，如果是，就将其赋值为0
						for (let key in data) {							
							if (data[key] == null || data[key] == undefined || data[key] == '') {
								data[key] = 0;
							}
						}
					
					
					/* ***********这里进行判断是否新增还是更新，动态的给url 进行赋值*************** */
					let url
					if (that.descentofmaterial_id) {
						url = 'client/user/kh/operate/manageInfo/update/updateDescentofmaterial'
					} else {
						url = 'client/user/kh/operate/addInfo/addDescentofmaterial'
					}
					
										
						// 在提交前判断是否为空值，如果是，就将其赋值为0
						const editor = this.$refs['RichText'];
					

						editor.editorCtx.getContents({
							success: (res) => {
								console.log(res.html)
								let remark = escape(res.html)
																					
								vk.callFunction({
									url: url,
									title: '信息添加中...',
									data: {
										descentofmaterial_id:that.descentofmaterial_id,
										point_id:that.form.point_id,
										d_date:that.form.d_date,
										d_shift:that.form.d_shift,
										material_id:that.form.material_id,
										team_id:that.form.team_id,
										num: parseFloat(that.form.num),
										remark:remark
									},
									success: function(res) {
									
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
						this.$refs["toast"].open(errors[0].message);
					}
				});
			},
			onReset() {
				
				this.$refs["uForm"].resetFields();
			}
		}
	};
</script>

<style lang="scss" scoped>
	.block {
		background-color: #FFFFFF;
		box-shadow: $box-shadow;
		margin: 8rpx 0rpx;
	}
	.border {
		border: 1rpx solid #DCDFE6;
		.editor{
			height: 50rpx;
		}
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
</style>
