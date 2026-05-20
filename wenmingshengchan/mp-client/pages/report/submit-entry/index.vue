<template>
	<view class="page-container">
    <cu-custom bgColor="bg-gradual-blue" :isCustom="true">
      <block slot="backText"></block>
      <block slot="content">报表提交</block>
    </cu-custom>
    
    <!-- Industrial Grid Background -->
    <view class="grid-floor"></view>

		<view class="main-content">
			<!-- Header -->
			<view class="header-section">
				<view class="header-left">
					<text class="header-icon">📝</text>
					<text class="title">现场问题报备</text>
				</view>
				<text class="subtitle">发现异常及时反馈，共创文明生产环境</text>
			</view>

			<view class="form-section">
				<!-- Title -->
				<view class="form-card">
					<text class="form-label">ISSUE TITLE</text>
					<view class="form-row">
						<text class="form-icon">📌</text>
						<input class="form-input" placeholder="简述异常核心点 (如：3号泵压异常)" type="text" v-model="form.title" />
					</view>
				</view>

				<!-- Location -->
				<view class="form-card" @click="showLocationSelect = true">
					<text class="form-label">LOCATION & POINT</text>
					<view class="form-row-dept">
						<view class="dept-left">
							<text class="form-icon">📍</text>
							<text class="dept-text" :class="{'placeholder': !locationName}">{{ locationName || '请选择作业区域与点位' }}</text>
						</view>
						<text class="dept-arrow">›</text>
					</view>
				</view>
				
				<!-- Responsible Dept -->
				<view class="form-card" @click="handleOpenDept">
					<text class="form-label">RESPONSIBLE UNIT</text>
					<view class="form-row-dept">
						<view class="dept-left">
							<text class="form-icon">🏭</text>
							<text class="dept-text" :class="{'placeholder': !form.handle_dept_name}">{{ form.handle_dept_name || '请选择责任单位' }}</text>
						</view>
						<text class="dept-arrow">›</text>
					</view>
				</view>

				<!-- Description -->
				<view class="form-card editor-card">
					<text class="form-label">DESCRIPTION</text>
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
			</view>
			
			<view class="hint-box">
				<text class="hint-text">提交后该报备将同步至公示板，责任单位会及时跟进处理。</text>
			</view>
		</view>

		<!-- Bottom Action -->
		<view class="bottom-action">
			<button class="btn-submit" hover-class="btn-submit-hover" @click="submit">
				<text class="btn-submit-text">立即提交报备</text>
				<text class="btn-submit-arrow">→</text>
			</button>
		</view>

		<u-select 
			v-model="showLocationSelect" 
			:list="locationTree" 
			mode="mutil-column-auto"
			@confirm="onLocationConfirm"
		></u-select>
		
		<u-select 
			v-model="showDeptSelect" 
			:list="deptList" 
			@confirm="onDeptConfirm"
		></u-select>
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
				point_id: '',
				handle_dept_id: '',
				handle_dept_name: ''
			},
			locationName: '',
			locationTree: [],
			showLocationSelect: false,
			showDeptSelect: false,
			deptList: [],
			isEdit: false,
			recordId: ''
		}
	},
	onLoad(options) {
		vk = uni.vk;
		this.isEdit = options.isEdit == '1';
		this.recordId = options.id || '';
		
		this.getLocationTree();
		this.fetchDeptTree();
		
		if (this.isEdit && this.recordId) {
			this.fetchDetail();
		}
	},
	onReady() {
		if (this.$refs.editor) {
			this.$refs.editor.setImageUploader(this.uploadEditorImage);
		}
	},
	methods: {
		async fetchDetail() {
			try {
				let res = await vk.callFunction({
					url: 'client/report/kh/getIssueDetail',
					data: { id: this.recordId }
				});
				if (res.code === 0 && res.data) {
					let d = res.data;
					this.form.title = d.title;
					this.form.anonymous = d.is_anonymous;
					this.form.urgency = d.urgency === 1;
					this.form.area_id = d.area_id;
					this.form.point_id = d.point_id;
					this.form.handle_dept_id = d.handle_dept_id;
					this.form.handle_dept_name = d.handle_dept_name;
					
					if (d.area_info && d.area_info[0] && d.point_info && d.point_info[0]) {
						this.locationName = `${d.area_info[0].name} / ${d.point_info[0].name}`;
					}
					
					// 延迟给编辑器设值，确保就绪
					setTimeout(() => {
						if (this.$refs.editor) {
							this.$refs.editor.editorCtx.setContents({
								html: d.content
							});
						}
					}, 300);
				}
			} catch (e) {}
		},
		async getLocationTree() {
			let res = await vk.callFunction({
				url: 'client/report/kh/getAreaPointTree'
			});
			if (res.tree) {
				this.locationTree = res.tree;
			}
		},
		async fetchDeptTree() {
			try {
				let res = await vk.callFunction({
					url: 'client/user/kh/getDeptList'
				});
				if (res.code === 0 && res.deptList) {
					// 仅提取一级部门数据，不保留小组（children）
					this.deptList = res.deptList.map(dept => {
						return {
							value: dept.value,
							label: dept.label
						};
					});
				}
			} catch (e) {}
		},
		handleOpenDept() {
			if (!this.deptList || this.deptList.length === 0) {
				return uni.showToast({ title: '机构数据拉取中，请稍后再试', icon: 'none' });
			}
			this.showDeptSelect = true;
		},
		onDeptConfirm(e) {
			if (!e || e.length === 0) return;
			let node = e[0];
			if (node && node.value) {
				this.form.handle_dept_id = node.value;
				this.form.handle_dept_name = node.label;
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
			let { title, anonymous, urgency, area_id, point_id, handle_dept_id, handle_dept_name } = this.form;
			
			if (!title) return vk.toast('请输入问题标题');
			if (!area_id || !point_id) return vk.toast('请选择区域与点位');
			if (!handle_dept_id) return vk.toast('请选择责任单位');
			
			this.$refs.editor.editorCtx.getContents({
				success: (res) => {
					let desc = res.html;
					
					if (!res.text.trim() && !desc.includes('<img')) {
						desc = '';
					}
					
					if (!desc) return vk.toast('详细描述不能为空');
					
					let url = this.isEdit ? 'client/user/kh/manageMyRecord' : 'client/report/kh/submitIssue';
					let reqData = {
						title,
						content: desc, 
						is_anonymous: anonymous,
						urgency: urgency ? 1 : 0,
						area_id,
						point_id,
						handle_dept_id,
						handle_dept_name,
						images: [] 
					};
					
					if (this.isEdit) {
						reqData = {
							action: 'update',
							type: 'issue',
							id: this.recordId,
							updateData: {
								title,
								content: desc,
								is_anonymous: anonymous,
								urgency: urgency ? 1 : 0,
								area_id,
								point_id,
								handle_dept_id,
								handle_dept_name
							}
						};
					}
					
					vk.callFunction({
						url: url,
						title: '正在处理...',
						data: reqData,
						success: (data) => {
							vk.toast(this.isEdit ? '修改成功' : '报备成功');
							setTimeout(() => {
								if (this.isEdit) {
									uni.navigateBack();
								} else {
									vk.reLaunch({ url: '/pages/report/public-board/index' });
								}
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
/* ====================================================================
   SUBMIT ENTRY PAGE — Industrial Clarity / Glassmorphism
   ==================================================================== */
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
  background-image: radial-gradient(rgba(0, 80, 203, 0.05) 1px, transparent 1px), linear-gradient(135deg, #f7f9fb 0%, #dae1ff 100%);
  background-size: 48rpx 48rpx, 100% 100%;
  position: relative;
  color: #191c1e;
  padding-bottom: 240rpx;
}

.grid-floor {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 0;
  pointer-events: none;
}

/* Header */
.main-content {
  padding: 48rpx 40rpx 40rpx;
  max-width: 1200rpx;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.header-section {
  margin-bottom: 48rpx;
}

.header-left {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
}

.header-icon {
  font-size: 40rpx;
  margin-right: 12rpx;
}

.title {
  font-family: 'Manrope', sans-serif;
  font-size: 48rpx;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.01em;
}

.subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 28rpx;
  color: #64748b;
  font-weight: 500;
  padding-left: 8rpx;
}

/* Form Section */
.form-section {
  display: flex;
  flex-direction: column;
}

.form-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 80, 203, 0.08);
  border-radius: 24rpx;
  padding: 32rpx 40rpx;
  margin-bottom: 24rpx;
}

.form-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 20rpx;
  font-weight: 700;
  color: #0050cb;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 12rpx;
}

.form-row {
  display: flex;
  align-items: center;
}

.form-icon {
  font-size: 36rpx;
  color: #424656;
  margin-right: 20rpx;
  width: 40rpx;
  text-align: center;
}

.form-input {
  flex: 1;
  font-family: 'Inter', sans-serif;
  font-size: 30rpx;
  font-weight: 600;
  color: #191c1e;
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
}

/* Department / Location Selector */
.form-row-dept {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dept-left {
  display: flex;
  align-items: center;
  overflow: hidden;
  flex: 1;
}

.dept-text {
  font-family: 'Inter', sans-serif;
  font-size: 30rpx;
  font-weight: 600;
  color: #191c1e;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dept-text.placeholder {
  color: #94a3b8;
  font-weight: 500;
}

.dept-arrow {
  font-size: 40rpx;
  color: #94a3b8;
  margin-left: 16rpx;
}

/* Editor Style inside Glass Card */
.editor-card {
  padding-bottom: 32rpx;
}

.editor-wrap {
  margin-top: 16rpx;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 16rpx;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.5);
  
  ::v-deep .wrapper {
    padding: 0 !important;
  }
  ::v-deep .toolbar {
    background-color: transparent !important;
    border-top: none !important;
    border-bottom: 1px solid rgba(255,255,255,0.4) !important;
    padding: 10rpx 0 !important;
  }
  ::v-deep .container {
    background-color: transparent !important;
    min-height: 240rpx;
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

.mb-4 {
  margin-bottom: 32rpx;
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
    
    &.danger-box { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); }
    &.primary-box { background: rgba(0, 102, 255, 0.1); border: 1px solid rgba(0, 102, 255, 0.2); }
    
    .danger-icon { color: #ef4444; font-size: 40rpx; }
    .primary-icon { color: #0066ff; font-size: 40rpx; }
  }
  
  .toggle-text {
    display: flex;
    flex-direction: column;
    
    .main-text {
      font-size: 30rpx;
      font-weight: 700;
      color: #0f172a;
    }
    .sub-text {
      font-size: 22rpx;
      color: #64748b;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-top: 4rpx;
    }
  }
}

/* Hint */
.hint-box {
  padding: 32rpx 16rpx;
}

.hint-text {
  font-family: 'Inter', sans-serif;
  font-size: 24rpx;
  color: #424656;
  line-height: 1.6;
  text-align: center;
  opacity: 0.7;
}

/* Bottom Action */
.bottom-action {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 48rpx;
  padding-bottom: env(safe-area-inset-bottom);
  background: linear-gradient(to top, #f7f9fb 0%, rgba(247,249,251,0.9) 60%, transparent 100%);
  z-index: 20;
}

.btn-submit {
  width: calc(100% - 64rpx);
  max-width: 750rpx;
  margin: 0 auto;
  margin-bottom: 24rpx;
  height: 112rpx;
  background-color: #0066ff;
  color: #ffffff;
  border-radius: 24rpx;
  font-weight: 700;
  font-size: 32rpx;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 16rpx 40rpx -8rpx rgba(0, 102, 255, 0.4);
  position: relative;
  overflow: hidden;
  transition: all 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.btn-submit-hover {
  transform: scale(0.98);
}

.btn-submit-text {
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 700;
}

.btn-submit-arrow {
  color: #ffffff;
  font-size: 36rpx;
  margin-left: 12rpx;
}

button::after { border: none; }

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
