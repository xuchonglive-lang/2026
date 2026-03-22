<template>
	<view class="page-body">
		<!-- 搜索栏 -->
		<vk-data-table-query
			v-model="queryForm1.formData"
			:columns="queryForm1.columns"
			@search="search"
		></vk-data-table-query>

		<!-- 操作栏 -->
		<div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
			<div>
				<el-button type="danger" size="small" icon="el-icon-delete" :disabled="!hasSelection" @click="batchDelete">批量删除</el-button>
			</div>
			<div>
				<el-button type="primary" size="small" icon="el-icon-plus" @click="openDrawer()">新建文章</el-button>
			</div>
		</div>

		<!-- 表格 -->
		<vk-data-table
			ref="table1"
			:action="table1.action"
			:columns="table1.columns"
			:query-form-param="queryForm1"
			:right-btns="table1.rightBtns"
			:custom-right-btns="table1.customRightBtns"
			:pagination="true"
			:selection="true"
			:row-no="true"
			@selection-change="onSelectionChange"
		></vk-data-table>

		<!-- 阅读记录弹窗 -->
		<vk-data-dialog v-model="viewRecordDialog.show" title="阅读记录" width="700px">
			<vk-data-table
				ref="viewTable"
				:action="viewRecordDialog.action"
				:columns="viewRecordDialog.columns"
				:pagination="true"
				:page-size="10"
				:row-no="true"
			></vk-data-table>
		</vk-data-dialog>

		<!-- ========== 编辑抽屉 ========== -->
		<el-drawer
			:visible.sync="drawer.visible"
			:title="drawer.isEdit ? '编辑文章' : '新建文章'"
			size="75%"
			direction="rtl"
			:destroy-on-close="true"
			:wrapper-closable="false"
			@opened="onDrawerOpened"
			@close="onDrawerClose"
		>
			<div class="drawer-body">
				<el-form ref="editForm" :model="drawer.formData" :rules="drawer.formRules" label-width="100px">
					<!-- 基础信息 -->
					<el-card shadow="never" style="margin-bottom: 16px;">
						<div slot="header"><span>基础信息</span></div>
						<el-form-item label="文章标题" prop="title">
							<el-input v-model="drawer.formData.title" placeholder="请输入文章标题" maxlength="100" show-word-limit></el-input>
						</el-form-item>

						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="所属分类" prop="category_id">
									<el-cascader
										v-model="drawer.formData.category_path"
										:options="categoryTree"
										:props="{ value: '_id', label: 'name', children: 'children', emitPath: true, checkStrictly: true }"
										placeholder="请选择分类"
										style="width: 100%;"
										@change="onCategoryChange"
									></el-cascader>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="封面图">
									<vk-data-upload
										v-model="drawer.formData.cover_image"
										:limit="1"
										list-type="picture-card"
										provider="unicloud"
									></vk-data-upload>
								</el-form-item>
							</el-col>
						</el-row>

						<el-form-item label="文章摘要">
							<el-input
								type="textarea"
								v-model="drawer.formData.summary"
								:rows="3"
								placeholder="不填则自动提取正文前100字"
								maxlength="200"
								show-word-limit
							></el-input>
						</el-form-item>
					</el-card>

					<!-- Markdown 编辑器 -->
					<el-card shadow="never" style="margin-bottom: 16px;">
						<div slot="header"><span>正文内容</span></div>
						<custom-editor-cherry
							v-model="drawer.formData.content"
							:height="500"
						></custom-editor-cherry>
					</el-card>

					<!-- 可见性配置 -->
					<el-card shadow="never" style="margin-bottom: 16px;">
						<div slot="header"><span>可见性与推送</span></div>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="可见性">
									<el-radio-group v-model="drawer.formData.visibility">
										<el-radio label="public">公开（所有部门）</el-radio>
										<el-radio label="private">内部（仅本部门）</el-radio>
										<el-radio label="targeted">指定部门</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="允许评论">
									<el-switch v-model="drawer.formData.allow_comment"></el-switch>
								</el-form-item>
							</el-col>
						</el-row>

						<el-form-item v-if="drawer.formData.visibility === 'targeted'" label="目标部门">
							<el-tree
								ref="deptTree"
								:data="deptTreeData"
								:props="{ label: 'name', children: 'children' }"
								node-key="_id"
								show-checkbox
								default-expand-all
							></el-tree>
						</el-form-item>
					</el-card>

					<!-- 附件 -->
					<el-card shadow="never" style="margin-bottom: 16px;">
						<div slot="header"><span>附件</span></div>
						<vk-data-upload
							v-model="drawer.formData.attachments"
							:limit="10"
							list-type="text"
							provider="unicloud"
							multiple
						></vk-data-upload>
					</el-card>

					<!-- 操作按钮 -->
					<div class="drawer-footer">
						<el-button @click="drawer.visible = false">取消</el-button>
						<el-button type="info" :loading="drawer.saving" @click="saveDraft">保存草稿</el-button>
						<el-button type="primary" :loading="drawer.publishing" @click="saveAndPublish">保存并发布</el-button>
					</div>
				</el-form>
			</div>
		</el-drawer>
	</view>
</template>

<script>
export default {
	data() {
		return {
			selectedRows: [],
			categoryTree: [],
			categoryOptions: [],
			deptTreeData: [],
			// ========== 搜索 ==========
			queryForm1: {
				formData: {},
				columns: [
					{ key: 'keyword', title: '关键词', type: 'text', placeholder: '搜索文章标题' },
					{
						key: 'category_id', title: '分类', type: 'select',
						data: [],
						filterable: true,
						clearable: true,
					},
					{
						key: 'status', title: '状态', type: 'select',
						data: [
							{ value: '', label: '全部' },
							{ value: 0, label: '草稿' },
							{ value: 1, label: '已发布' },
							{ value: 2, label: '已下架' },
						],
					},
				],
			},
			// ========== 表格 ==========
			table1: {
				action: 'admin/info-publish/sys/getList',
				columns: [
					{ key: 'title', title: '文章标题', type: 'text', minWidth: 200 },
					{
						key: 'category_info', title: '分类', type: 'text', width: 120,
						formatter: (val) => val ? val.name : '-',
					},
					{
						key: 'author_info', title: '作者', type: 'text', width: 100,
						formatter: (val) => val ? (val.nickname || val.username) : '-',
					},
					{
						key: 'status', title: '状态', type: 'tag', width: 90,
						data: [
							{ value: 0, label: '草稿', type: 'info' },
							{ value: 1, label: '已发布', type: 'success' },
							{ value: 2, label: '已下架', type: 'warning' },
						],
					},
					{
						key: 'visibility', title: '可见性', type: 'tag', width: 90,
						data: [
							{ value: 'public', label: '公开', type: 'success' },
							{ value: 'private', label: '内部', type: '' },
							{ value: 'targeted', label: '指定', type: 'warning' },
						],
					},
					{ key: 'view_count', title: '阅读', type: 'text', width: 70, align: 'center' },
					{ key: 'comment_count', title: '评论', type: 'text', width: 70, align: 'center' },
					{ key: 'publish_time', title: '发布时间', type: 'time', width: 160, sortable: 'custom' },
					{ key: 'created_at', title: '创建时间', type: 'time', width: 160, sortable: 'custom' },
				],
				rightBtns: ['more'],
				customRightBtns: [
					{
						title: '编辑',
						mode: 'custom',
						onClick: (row) => {
							this.openDrawer(row);
						},
					},
					{
						title: '发布',
						mode: 'custom',
						show: (row) => row.status !== 1,
						onClick: (row) => {
							this.publishArticle(row);
						},
					},
					{
						title: '下架',
						mode: 'custom',
						show: (row) => row.status === 1,
						onClick: (row) => {
							this.unpublishArticle(row);
						},
					},
					{
						title: '阅读记录',
						mode: 'custom',
						onClick: (row) => {
							this.showViewRecords(row);
						},
					},
					{
						title: '删除',
						mode: 'custom',
						type: 'danger',
						onClick: (row) => {
							this.deleteArticle(row);
						},
					},
				],
			},
			// ========== 阅读记录弹窗 ==========
			viewRecordDialog: {
				show: false,
				action: (obj = {}) => {
					let { data, success, fail } = obj;
					vk.callFunction({
						url: 'admin/info-publish/sys/getViewRecords',
						data: {
							...data,
							article_id: this.currentArticleId,
						},
						success: (res) => {
							if (typeof success === 'function') {
								success({ rows: res.rows, total: res.total });
							}
						},
						fail: (res) => { if (typeof fail === 'function') fail(res); },
					});
				},
				columns: [
					{
						key: 'user_info', title: '用户', type: 'text', minWidth: 150,
						formatter: (val) => val ? (val.nickname || val.username) : '-',
					},
					{ key: 'read_time', title: '最近阅读', type: 'time', width: 160 },
					{ key: 'created_at', title: '首次阅读', type: 'time', width: 160 },
				],
			},
			currentArticleId: '',
			// ========== 编辑抽屉 ==========
			drawer: {
				visible: false,
				isEdit: false,
				saving: false,
				publishing: false,
				formData: {},
				formRules: {
					title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
					category_id: [{ required: true, message: '请选择分类', trigger: 'change' }],
				},
			},
		};
	},
	computed: {
		hasSelection() {
			return this.selectedRows.length > 0;
		},
	},
	mounted() {
		this.loadCategories();
		this.loadDeptTree();
	},
	methods: {
		search() {
			this.$refs.table1.search();
		},
		onSelectionChange(rows) {
			this.selectedRows = rows;
		},
		// ========== 数据加载 ==========
		loadCategories() {
			vk.callFunction({
				url: 'admin/info-publish/sys/categoryGetTree',
				data: {},
				success: (data) => {
					this.categoryTree = data.rows || [];
					// 扁平化用于下拉筛选
					let options = [];
					this.categoryTree.forEach(parent => {
						options.push({ value: parent._id, label: parent.name });
						if (parent.children) {
							parent.children.forEach(child => {
								options.push({ value: child._id, label: '  └ ' + child.name });
							});
						}
					});
					let catCol = this.queryForm1.columns.find(c => c.key === 'category_id');
					if (catCol) catCol.data = options;
				},
			});
		},
		loadDeptTree() {
			vk.callFunction({
				url: 'admin/system/dept/sys/getList',
				data: {},
				success: (data) => {
					let rows = data.rows || [];
					this.deptTreeData = vk.pubfn.arrayToTree(rows, {
						id: '_id',
						parent_id: 'parent_id',
						children: 'children',
					});
				},
			});
		},
		// ========== 抽屉操作 ==========
		getDefaultFormData() {
			return {
				_id: '',
				title: '',
				summary: '',
				content: '',
				cover_image: '',
				category_id: '',
				category_path: [],
				attachments: [],
				visibility: 'private',
				target_dept_ids: [],
				allow_comment: true,
			};
		},
		openDrawer(row) {
			this.drawer.formData = this.getDefaultFormData();
			if (row && row._id) {
				this.drawer.isEdit = true;
				this.loadArticle(row._id);
			} else {
				this.drawer.isEdit = false;
			}
			this.drawer.visible = true;
		},
		onDrawerOpened() {
			// cherry 组件自动初始化，无需手动操作
		},
		onDrawerClose() {
			this.drawer.saving = false;
			this.drawer.publishing = false;
		},
		loadArticle(id) {
			vk.callFunction({
				url: 'admin/info-publish/sys/getList',
				data: { pageIndex: 1, pageSize: 1, whereJson: { _id: id } },
				success: (data) => {
					if (data.rows && data.rows.length > 0) {
						let article = data.rows[0];
						this.drawer.formData = {
							...this.getDefaultFormData(),
							...article,
							category_path: [],
						};
					}
				},
			});
		},
		// ========== 表单操作 ==========
		onCategoryChange(val) {
			this.drawer.formData.category_id = val && val.length > 0 ? val[val.length - 1] : '';
		},
		getSelectedDeptIds() {
			if (this.drawer.formData.visibility === 'targeted' && this.$refs.deptTree) {
				return this.$refs.deptTree.getCheckedKeys(true);
			}
			return [];
		},
		buildSubmitData() {
			// content 通过 v-model 自动同步，无需手动取值
			let submitData = vk.pubfn.copyObject(this.drawer.formData);
			delete submitData.category_path;
			submitData.target_dept_ids = this.getSelectedDeptIds();
			return submitData;
		},
		saveDraft() {
			this.$refs.editForm.validate((valid) => {
				if (!valid) return;
				let submitData = this.buildSubmitData();
				this.drawer.saving = true;
				let url = this.drawer.isEdit ? 'admin/info-publish/sys/update' : 'admin/info-publish/sys/add';
				vk.callFunction({
					url,
					data: submitData,
					success: (data) => {
						if (!this.drawer.isEdit && data.id) {
							this.drawer.formData._id = data.id;
							this.drawer.isEdit = true;
						}
						vk.toast('保存成功', 'success');
						this.$refs.table1.refresh();
					},
					complete: () => {
						this.drawer.saving = false;
					},
				});
			});
		},
		saveAndPublish() {
			this.$refs.editForm.validate((valid) => {
				if (!valid) return;
				let submitData = this.buildSubmitData();
				this.drawer.publishing = true;
				let saveUrl = this.drawer.isEdit ? 'admin/info-publish/sys/update' : 'admin/info-publish/sys/add';
				vk.callFunction({
					url: saveUrl,
					data: submitData,
					success: (saveData) => {
						let articleId = this.drawer.isEdit ? this.drawer.formData._id : saveData.id;
						vk.callFunction({
							url: 'admin/info-publish/sys/publish',
							data: { _id: articleId },
							success: () => {
								vk.toast('发布成功', 'success');
								this.drawer.visible = false;
								this.$refs.table1.refresh();
							},
							complete: () => {
								this.drawer.publishing = false;
							},
						});
					},
					fail: () => {
						this.drawer.publishing = false;
					},
				});
			});
		},
		// ========== 表格操作（保留） ==========
		publishArticle(row) {
			vk.callFunction({
				url: 'admin/info-publish/sys/publish',
				title: '发布中...',
				data: { _id: row._id },
				success: () => {
					vk.toast('发布成功', 'success');
					this.$refs.table1.refresh();
				},
			});
		},
		unpublishArticle(row) {
			vk.callFunction({
				url: 'admin/info-publish/sys/unpublish',
				title: '下架中...',
				data: { _id: row._id },
				success: () => {
					vk.toast('已下架', 'success');
					this.$refs.table1.refresh();
				},
			});
		},
		deleteArticle(row) {
			vk.callFunction({
				url: 'admin/info-publish/sys/del',
				title: '删除中...',
				data: { _id: row._id },
				success: () => {
					vk.toast('删除成功', 'success');
					this.$refs.table1.refresh();
				},
			});
		},
		batchDelete() {
			if (this.selectedRows.length === 0) return;
			let ids = this.selectedRows.map(r => r._id);
			vk.callFunction({
				url: 'admin/info-publish/sys/del',
				title: '批量删除中...',
				data: { ids },
				success: () => {
					vk.toast(`已删除 ${ids.length} 篇文章`, 'success');
					this.$refs.table1.refresh();
				},
			});
		},
		showViewRecords(row) {
			this.currentArticleId = row._id;
			this.viewRecordDialog.show = true;
			this.$nextTick(() => {
				if (this.$refs.viewTable) this.$refs.viewTable.refresh();
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.drawer-body {
	padding: 0 20px 20px;
	height: calc(100vh - 60px);
	overflow-y: auto;
}

.drawer-footer {
	text-align: center;
	padding: 20px 0;
	background: #fff;
	position: sticky;
	bottom: 0;
	z-index: 10;
	border-top: 1px solid #ebeef5;
}
</style>
