<template>
	<view class="page-container">
		<view class="main-content">
			<!-- Header -->
			<view class="header-section">
				<text class="title">现场问题报备</text>
				<text class="subtitle">现场问题反馈，共创美好环境</text>
			</view>

			<view class="form-section">
				<!-- Title Input -->
				<view class="form-card">
					<view class="card-title">问题标题</view>
					<view class="input-box">
						<u-input 
							v-model="form.title" 
							placeholder="简述异常核心点 (如：3号泵压异常)" 
							:clearable="false" 
							:custom-style="inputStyle"
						/>
					</view>
				</view>

				<!-- Location Selection -->
				<view class="form-card">
					<view class="card-title">作业区域与点位</view>
					<view class="input-box">
						<u-input 
							v-model="locationName" 
							type="select" 
							placeholder="请选择作业区域与点位" 
							:custom-style="inputStyle" 
							@click="showLocationSelect = true"
						/>
					</view>
					<u-select 
						v-model="showLocationSelect" 
						:list="locationTree" 
						mode="mutil-column-auto"
						@confirm="onLocationConfirm"
					></u-select>
				</view>

				<!-- Detailed Description with robin-editor -->
				<view class="form-card">
					<view class="card-title">详细描述</view>
					<view class="editor-wrap">
						<robin-editor 
							ref="editor"
							v-model="form.desc"
							:header="false"
							:autoHideToolbar="false"
							:muiltImage="true"
							:compressImage="true"
							:height="120"
							:tools="['bold', 'italic', 'underline', 'align-left', 'align-center', 'align-right', 'image', 'clear']"
						></robin-editor>
					</view>
				</view>

				<!-- Toggles -->
				<view class="form-card toggles-card">
					<view class="toggle-row mb-4">
						<view class="toggle-info">
							<view class="icon-box danger-box">
								<text class="material-symbols-outlined danger-icon">priority_high</text>
							</view>
							<view class="toggle-text">
								<text class="main-text">紧急情况</text>
								<text class="sub-text">URGENT ISSUE</text>
							</view>
						</view>
						<u-switch v-model="form.urgency" active-color="#0066ff" size="48"></u-switch>
					</view>

					<view class="toggle-row">
						<view class="toggle-info">
							<view class="icon-box primary-box">
								<text class="material-symbols-outlined primary-icon">visibility_off</text>
							</view>
							<view class="toggle-text">
								<text class="main-text">匿名提交</text>
								<text class="sub-text">IDENTITY PROTECTED</text>
							</view>
						</view>
						<u-switch v-model="form.anonymous" active-color="#0066ff" size="48"></u-switch>
					</view>
				</view>

				<!-- Submit Button -->
				<view class="btn-wrap">
					<button class="submit-btn" hover-class="submit-btn-hover" @tap="submit">
						<text class="material-symbols-outlined">send</text>
						<text class="btn-text">立即提交报备</text>
					</button>
				</view>
			</view>
		</view>

		<my-tab-bar :current="1" />
	</view>
</template>

<script>
let vk = uni.vk;
export default {
	data() {
		return {
			form: {
				title: '',
				desc: '',
				anonymous: true,
				urgency: false,
				area_id: '',
				point_id: ''
			},
			locationName: '',
			locationTree: [],
			showLocationSelect: false,
			inputStyle: {
				backgroundColor: '#f2f3f5',
				borderRadius: '16rpx',
				padding: '24rpx 32rpx',
				fontSize: '30rpx',
				color: '#1a1d2e',
				height: 'auto',
				minHeight: '88rpx'
			}
		}
	},
	onLoad() {
		vk = uni.vk;
		this.getLocationTree();
	},
	onReady() {
		// Set custom image uploader for robin-editor
		if (this.$refs.editor) {
			this.$refs.editor.setImageUploader(this.uploadEditorImage);
		}
	},
	methods: {
		async getLocationTree() {
			let res = await vk.callFunction({
				url: 'client/report/kh/getAreaPointTree'
			});
			if (res.tree) {
				this.locationTree = res.tree;
			}
		},
		onLocationConfirm(arr) {
			let area = arr[0];
			let point = arr[1];
			
			if (!point || !point.value) {
			  vk.toast('该区域下暂无可选点位');
			  return;
			}
			
			this.locationName = `${area.label} / ${point.label}`;
			this.form.area_id = area.value;
			this.form.point_id = point.value;
		},
		uploadEditorImage(path, callback) {
			// upload single image
			uni.compressImage({
				src: path,
				quality: 80,
				success: async (compressRes) => {
					uni.showLoading({ title: '上传中...' });
					let fileRes = await vk.callFunctionUtil.uploadFile({
						filePath: compressRes.tempFilePath,
						fileType: "image"
					});
					uni.hideLoading();
					if (fileRes && fileRes.url) {
						callback(fileRes.url);
					} else {
						vk.toast('图片上传失败');
					}
				},
				fail: () => {
					vk.toast('图片压缩失败');
				}
			});
		},
		async submit() {
			let { title, anonymous, urgency, area_id, point_id } = this.form;
			
			if (!title) return vk.toast('请输入问题标题');
			if (!area_id || !point_id) return vk.toast('请选择区域与点位');
			
			// 手动获取 robin-editor 内置 editorCtx 的内容
			this.$refs.editor.editorCtx.getContents({
				success: (res) => {
					let desc = res.html;
					
					// 过滤初始空标签
					if (!res.text.trim() && !desc.includes('<img')) {
						desc = '';
					}
					
					if (!desc) return vk.toast('描述不能为空');
					
					vk.callFunction({
						url: 'client/report/kh/submitIssue',
						title: '提交中...',
						data: {
							title,
							content: desc, 
							is_anonymous: anonymous,
							urgency: urgency ? 1 : 0,
							area_id,
							point_id,
							images: [] 
						},
						success: (data) => {
							vk.toast('报备成功');
							setTimeout(() => {
								vk.reLaunch({ url: '/pages/report/public-board/index' });
							}, 1500);
						}
					});
				}
			});
		}
	}
}
</script>

<style lang="scss" scoped>
/* Modern Elegant Aesthetic */
$bg-color: #f8fafc;
$card-bg: #ffffff;
$primary: #0066ff;
$text-main: #0f172a;
$text-muted: #64748b;
$border: #e2e8f0;

.page-container {
	min-height: 100vh;
	background-color: $bg-color;
	font-family: 'Inter', -apple-system, sans-serif;
	padding-bottom: 240rpx;
}

.main-content {
	padding: 80rpx 40rpx;
	max-width: 1200rpx;
	margin: 0 auto;
}

.header-section {
	margin-bottom: 60rpx;
	padding-left: 10rpx;
	
	.title {
		font-size: 56rpx;
		font-weight: 800;
		color: $text-main;
		letter-spacing: -0.03em;
		display: block;
		margin-bottom: 12rpx;
	}
	.subtitle {
		font-size: 28rpx;
		color: $text-muted;
		font-weight: 500;
	}
}

.form-section {
	display: flex;
	flex-direction: column;
	gap: 40rpx;
}

.form-card {
	background: $card-bg;
	border-radius: 32rpx;
	padding: 40rpx;
	box-shadow: 0 10rpx 40rpx -10rpx rgba(0, 0, 0, 0.04);
	border: 1px solid rgba(255, 255, 255, 0.5);
}

.card-title {
	font-size: 26rpx;
	font-weight: 700;
	color: $text-main;
	margin-bottom: 24rpx;
	display: flex;
	align-items: center;
	gap: 12rpx;
	
	&::before {
		content: '';
		width: 6rpx;
		height: 24rpx;
		background: $primary;
		border-radius: 4rpx;
	}
}

/* uView Input Overrides */
.input-box {
	::v-deep .u-input__input {
		font-size: 30rpx;
		font-weight: 500;
		color: $text-main;
	}
	::v-deep .u-input--border {
		border: none !important;
	}
}
.mb-3 {
	margin-bottom: 24rpx;
}
.mb-4 {
	margin-bottom: 32rpx;
}

/* Editor Styling */
.editor-wrap {
	background-color: #f2f3f5;
	border-radius: 16rpx;
	overflow: hidden;
	
	::v-deep .wrapper {
		padding: 0 !important;
	}
	::v-deep .toolbar {
		background-color: #f8fafc !important;
		border-top: none !important;
		border-bottom: 1px solid #e2e8f0 !important;
		padding: 10rpx 0 !important;
	}
	::v-deep .container {
		background-color: transparent !important;
		min-height: 300rpx;
	}
}

/* Toggles */
.toggles-card {
	padding: 40rpx !important;
}

.toggle-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.toggle-info {
	display: flex;
	align-items: center;
	gap: 24rpx;
	
	.icon-box {
		width: 80rpx;
		height: 80rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		
		&.danger-box { background: rgba(239, 68, 68, 0.1); }
		&.primary-box { background: rgba(0, 102, 255, 0.1); }
		
		.danger-icon { color: #ef4444; font-size: 40rpx; }
		.primary-icon { color: #0066ff; font-size: 40rpx; }
	}
	
	.toggle-text {
		display: flex;
		flex-direction: column;
		
		.main-text {
			font-size: 30rpx;
			font-weight: 700;
			color: $text-main;
		}
		.sub-text {
			font-size: 22rpx;
			color: $text-muted;
			letter-spacing: 0.05em;
			text-transform: uppercase;
			margin-top: 4rpx;
		}
	}
}

.btn-wrap {
	margin-top: 20rpx;
}

.submit-btn {
	width: 100%;
	padding: 36rpx 0;
	background: linear-gradient(135deg, #0066ff 0%, #0044bb 100%);
	color: #ffffff;
	font-family: 'Inter', sans-serif;
	font-weight: 700;
	border-radius: 24rpx;
	box-shadow: 0 20rpx 40rpx -12rpx rgba(0, 102, 255, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 16rpx;
	border: none;
	line-height: 1;
	font-size: 32rpx;
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.submit-btn-hover {
	transform: translateY(4rpx);
	box-shadow: 0 10rpx 20rpx -10rpx rgba(0, 102, 255, 0.4);
}

@font-face {
  font-family: 'Material Symbols Outlined';
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url("https://fonts.gstatic.com/s/materialsymbolsoutlined/v323/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzazHD_dY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDCvHOem.ttf") format('truetype');
}

.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 48rpx;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
