<template>
	<view class="page-body">
		<!-- Q26: 左侧一级分类树 + 右侧子分类列表 -->
		<el-row :gutter="20">
			<!-- 左侧：一级分类树 -->
			<el-col :span="8">
				<el-card shadow="never">
					<div slot="header" class="card-header">
						<span>一级分类</span>
						<el-button type="primary" size="mini" icon="el-icon-plus" @click="onAddTopCategory">新增</el-button>
					</div>
					<div class="category-tree-wrap">
						<div
							v-for="item in categoryTree"
							:key="item._id"
							class="tree-item"
							:class="{ active: selectedParentId === item._id }"
							@click="selectParent(item)"
						>
							<span class="tree-item-name">{{ item.name }}</span>
							<span class="tree-item-actions">
								<el-button type="text" size="mini" icon="el-icon-edit" @click.stop="onEditCategory(item)"></el-button>
								<el-button type="text" size="mini" icon="el-icon-delete" class="danger-btn" @click.stop="onDeleteCategory(item)"></el-button>
							</span>
						</div>
						<div v-if="categoryTree.length === 0" class="empty-tip">暂无分类</div>
					</div>
				</el-card>
			</el-col>

			<!-- 右侧：子分类列表 -->
			<el-col :span="16">
				<el-card shadow="never">
					<div slot="header" class="card-header">
						<span>{{ selectedParentName ? selectedParentName + ' - 子分类' : '请选择一级分类' }}</span>
						<el-button
							v-if="selectedParentId"
							type="primary"
							size="mini"
							icon="el-icon-plus"
							@click="onAddSubCategory"
						>新增子分类</el-button>
					</div>
					<vk-data-table
						ref="subTable"
						:data="subCategories"
						:columns="subTable.columns"
						:right-btns="subTable.rightBtns"
						:pagination="false"
						:row-no="true"
						@update="onEditCategory"
						@delete="onDeleteCategory"
					></vk-data-table>
				</el-card>
			</el-col>
		</el-row>

		<!-- 分类编辑弹窗 -->
		<vk-data-dialog v-model="form1.props.show" :title="form1.props.formType === 'add' ? '新增分类' : '编辑分类'" width="500px" mode="form">
			<vk-data-form
				ref="form1"
				v-model="form1.data"
				:action="form1.props.action"
				:columns="form1.props.columns"
				:rules="form1.props.rules"
				:form-type="form1.props.formType"
				:loading.sync="form1.props.loading"
				:auto-close="true"
				label-width="100px"
				@success="onFormSuccess"
			></vk-data-form>
		</vk-data-dialog>
	</view>
</template>

<script>
export default {
	data() {
		return {
			categoryTree: [],
			subCategories: [],
			selectedParentId: '',
			selectedParentName: '',
			subTable: {
				columns: [
					{ key: 'name', title: '分类名称', type: 'text', minWidth: 200 },
					{ key: 'sort', title: '排序', type: 'text', width: 80, align: 'center' },
					{
						key: 'status', title: '状态', type: 'tag', width: 80,
						data: [
							{ value: 1, label: '启用', type: 'success' },
							{ value: 0, label: '禁用', type: 'info' },
						],
					},
					{ key: 'created_at', title: '创建时间', type: 'time', width: 160 },
				],
				rightBtns: ['update', 'delete'],
			},
			form1: {
				data: {},
				props: {
					action: '',
					formType: '',
					loading: false,
					show: false,
					columns: [
						{ key: 'name', title: '分类名称', type: 'text', placeholder: '请输入分类名称' },
						{ key: 'sort', title: '排序号', type: 'number', placeholder: '数字越小越靠前', min: 0 },
						{
							key: 'status', title: '状态', type: 'radio',
							showRule: (formData) => this.form1.props.formType === 'update',
							data: [
								{ value: 1, label: '启用' },
								{ value: 0, label: '禁用' },
							],
						},
					],
					rules: {
						name: [{ required: true, message: '分类名称不能为空', trigger: ['blur', 'change'] }],
					},
				},
			},
		};
	},
	mounted() {
		this.loadCategoryTree();
	},
	methods: {
		// 加载分类树
		loadCategoryTree() {
			vk.callFunction({
				url: 'admin/info-publish/sys/categoryGetTree',
				data: {},
				success: (data) => {
					this.categoryTree = data.rows || [];
					// 如果有选中的一级分类，刷新子分类
					if (this.selectedParentId) {
						let parent = this.categoryTree.find(c => c._id === this.selectedParentId);
						this.subCategories = parent ? (parent.children || []) : [];
					}
				},
			});
		},
		// 选中一级分类
		selectParent(item) {
			this.selectedParentId = item._id;
			this.selectedParentName = item.name;
			this.subCategories = item.children || [];
		},
		// 新增一级分类
		onAddTopCategory() {
			this.form1.props.formType = 'add';
			this.form1.props.action = 'admin/info-publish/sys/categoryAdd';
			this.form1.data = { parent_id: '', sort: 0 };
			this.form1.props.show = true;
		},
		// 新增子分类
		onAddSubCategory() {
			this.form1.props.formType = 'add';
			this.form1.props.action = 'admin/info-publish/sys/categoryAdd';
			this.form1.data = { parent_id: this.selectedParentId, sort: 0 };
			this.form1.props.show = true;
		},
		// 编辑分类
		onEditCategory(row) {
			this.form1.props.formType = 'update';
			this.form1.props.action = 'admin/info-publish/sys/categoryUpdate';
			this.form1.data = vk.pubfn.copyObject(row);
			this.form1.props.show = true;
		},
		// 删除分类
		onDeleteCategory(row) {
			vk.callFunction({
				url: 'admin/info-publish/sys/categoryDel',
				title: '删除中...',
				data: { _id: row._id },
				success: () => {
					vk.toast('删除成功', 'success');
					this.loadCategoryTree();
				},
			});
		},
		// 表单提交成功
		onFormSuccess() {
			this.loadCategoryTree();
		},
	},
};
</script>

<style lang="scss" scoped>
.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.category-tree-wrap {
	max-height: 600px;
	overflow-y: auto;
}

.tree-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 12px;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.2s;
	margin-bottom: 4px;

	&:hover {
		background-color: #f5f7fa;
	}

	&.active {
		background-color: #ecf5ff;
		color: #409eff;
		font-weight: 500;
	}
}

.tree-item-name {
	flex: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.tree-item-actions {
	flex-shrink: 0;
	opacity: 0;
	transition: opacity 0.2s;
}

.tree-item:hover .tree-item-actions {
	opacity: 1;
}

.danger-btn {
	color: #f56c6c;
}

.empty-tip {
	text-align: center;
	color: #999;
	padding: 40px 0;
}
</style>
