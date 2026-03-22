<template>
	<view class="page-body">
		<el-row :gutter="16">
			<!-- 左侧：大盘部门树 -->
			<el-col :span="5">
				<el-card class="dept-tree-card" shadow="never">
					<div slot="header" class="dept-tree-header">
						<span>部门列表</span>
					</div>
					<el-input
						v-model="searchKeyword"
						placeholder="搜索部门"
						size="small"
						prefix-icon="el-icon-search"
						clearable
						style="margin-bottom: 12px;"
					></el-input>
					<el-tree
						ref="deptTree"
						:data="deptTreeData"
						:props="treeProps"
						node-key="_id"
						:expand-on-click-node="false"
						:highlight-current="true"
						:filter-node-method="filterNode"
						default-expand-all
						@current-change="handleNodeClick"
					>
						<span class="dept-tree-node" slot-scope="{ node, data }">
							<span :class="{ 'is-disabled': data.status === 0 }">{{ data.name }}</span>
							<el-tag v-if="data.dept_level === 0" size="mini" type="warning">集团</el-tag>
							<el-tag v-else-if="data.dept_level === 10" size="mini" type="primary">部室</el-tag>
							<el-tag v-else-if="data.dept_level === 20" size="mini">车间</el-tag>
						</span>
					</el-tree>
				</el-card>
			</el-col>

			<!-- 右侧：用户列表 -->
			<el-col :span="19">
				<!-- 搜索栏 -->
				<vk-data-table-query
					v-model="queryForm1.formData"
					:columns="queryForm1.columns"
					@search="search"
				></vk-data-table-query>

				<!-- 操作按钮 -->
				<view class="vk-table-button-box">
					<el-button type="primary" size="small" icon="el-icon-s-tools"
						:disabled="!table1.selectItem"
						@click="bindRoleBtn"
					>角色绑定</el-button>
					<el-button type="success" size="small" icon="el-icon-user"
						:disabled="!table1.selectItem"
						@click="setTenantAdminBtn"
					>设为租户管理员</el-button>
					<el-button type="warning" size="small" icon="el-icon-switch-button"
						:disabled="!table1.selectItem"
						@click="changeDeptBtn"
					>调整部门</el-button>
				</view>

				<!-- 用户表格 -->
				<vk-data-table
					ref="table1"
					:action="table1.action"
					:columns="table1.columns"
					:query-form-param="queryForm1"
					:right-btns="['detail_auto']"
					:selection="false"
					:row-no="true"
					:pagination="true"
					@current-change="currentChange"
				></vk-data-table>
			</el-col>
		</el-row>

		<!-- 角色绑定弹窗（复用系统组件） -->
		<vk-data-dialog
			v-model="bindRoleDialog.show"
			title="角色绑定"
			width="500px"
			mode="form"
		>
			<vk-data-form
				ref="bindRoleForm"
				v-model="bindRoleDialog.data"
				:action="bindRoleDialog.action"
				:form-type="'update'"
				:columns="bindRoleDialog.columns"
				label-width="100px"
				@success="bindRoleDialog.show = false; refresh();"
			></vk-data-form>
		</vk-data-dialog>

		<!-- 调整部门弹窗 -->
		<vk-data-dialog
			v-model="changeDeptDialog.show"
			title="调整用户部门"
			width="500px"
			mode="form"
		>
			<vk-data-form
				ref="changeDeptForm"
				v-model="changeDeptDialog.data"
				:action="changeDeptDialog.action"
				:form-type="'update'"
				:columns="changeDeptDialog.columns"
				label-width="100px"
				@success="changeDeptDialog.show = false; refresh();"
			></vk-data-form>
		</vk-data-dialog>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// ========== 部门树 ==========
			searchKeyword: '',
			deptTreeData: [],
			treeProps: { children: 'children', label: 'name' },
			selectedDeptId: '',

			// ========== 查询表单 ==========
			queryForm1: {
				formData: {},
				columns: [
					{ key: 'tenant_id', title: '部门', type: 'text', hidden: true, mode: '=' },
					{ key: 'real_name', title: '真实姓名', type: 'text', placeholder: '搜索姓名' },
					{ key: 'mobile', title: '手机号', type: 'text', placeholder: '搜索手机号' },
					{
						key: 'status',
						title: '状态',
						type: 'select',
						data: [
							{ value: '', label: '全部' },
							{ value: 0, label: '正常' },
							{ value: 1, label: '禁用' },
							{ value: 2, label: '审核中' }
						]
					}
				]
			},

			// ========== 用户数据表格 ==========
			table1: {
				action: 'admin/system/user/sys/getList',
				selectItem: null,
				columns: [
					{ key: 'wx_avatar', title: '头像', type: 'avatar', width: 60 },
					{ key: 'wx_nickname', title: '微信昵称', type: 'text', width: 120 },
					{ key: 'real_name', title: '真实姓名', type: 'text', width: 100 },
					{ key: 'mobile', title: '手机号', type: 'text', width: 120 },
					{ key: 'tenant_name', title: '所属部门', type: 'text', width: 120 },
					{ key: 'group_name', title: '内部小组', type: 'text', width: 100 },
					{
						key: 'role',
						title: '角色',
						type: 'tag',
						width: 120
					},
					{
						key: 'status',
						title: '状态',
						type: 'tag',
						width: 80,
						data: [
							{ value: 0, label: '正常', type: 'success' },
							{ value: 1, label: '禁用', type: 'danger' },
							{ value: 2, label: '审核中', type: 'warning' }
						]
					},
					{ key: '_add_time', title: '注册时间', type: 'time', width: 160, sortable: 'custom' }
				]
			},

			// ========== 角色绑定弹窗 ==========
			bindRoleDialog: {
				show: false,
				data: {},
				action: 'admin/system/user/sys/bindRole',
				columns: [
					{
						key: 'roleList',
						title: '角色',
						type: 'checkbox',
						action: 'admin/system/role/sys/getList',
						props: { list: 'rows', value: 'role_id', label: 'role_name' }
					},
					{ key: 'reset', title: '', type: 'hidden' }
				]
			},

			// ========== 调整部门弹窗 ==========
			changeDeptDialog: {
				show: false,
				data: {},
				action: 'admin/system/user/sys/update',
				columns: [
					{
						key: 'tenant_id',
						title: '目标部门',
						type: 'select',
						action: 'admin/system/dept/sys/getList',
						props: { list: 'rows', value: '_id', label: 'name' }
					}
				]
			}
		};
	},
	watch: {
		searchKeyword(val) {
			this.$refs.deptTree.filter(val);
		}
	},
	mounted() {
		this.loadDeptTree();
	},
	methods: {
		// 加载部门树
		loadDeptTree() {
			let that = this;
			this.vk.callFunction({
				url: 'admin/system/dept/sys/getList',
				data: {},
				success: (data) => {
					let rows = data.rows || [];
					// 手动构建树（与 dept/list.vue 一致）
					let roots = rows.filter(d => !d.parent_id);
					roots.forEach(root => {
						root.children = rows
							.filter(d => d.parent_id === root._id)
							.sort((a, b) => (a.sort_num || 0) - (b.sort_num || 0));
					});
					that.deptTreeData = roots;
				}
			});
		},
		// 树节点过滤
		filterNode(value, data) {
			if (!value) return true;
			return data.name.indexOf(value) !== -1;
		},
		// 点击部门节点
		handleNodeClick(data) {
			this.selectedDeptId = data._id;
			// 将部门 ID 注入查询条件
			this.queryForm1.formData.tenant_id = data.dept_level === 0 ? '' : data._id;
			this.search();
		},
		// 搜索
		search() {
			this.$refs.table1.search();
		},
		// 刷新
		refresh() {
			this.$refs.table1.refresh();
		},
		// 选中行
		currentChange(row) {
			this.table1.selectItem = row;
		},
		// 角色绑定
		bindRoleBtn() {
			let item = this.table1.selectItem;
			if (!item) return this.vk.toast('请先选择用户');
			this.bindRoleDialog.data = {
				user_id: item._id,
				roleList: item.role || [],
				reset: true
			};
			this.bindRoleDialog.show = true;
		},
		// 快捷设为租户管理员
		async setTenantAdminBtn() {
			let item = this.table1.selectItem;
			if (!item) return this.vk.toast('请先选择用户');
			if (!item.tenant_id) return this.vk.toast('该用户尚未归属任何部门，请先调整部门', 'warning');
			let currentRoles = item.role || [];
			if (currentRoles.includes('tenant_admin')) {
				// 已经是租户管理员，询问是否取消
				try {
					await this.$confirm(`用户 ${item.real_name || item.username} 已经是租户管理员，是否取消？`, '提示', { type: 'warning' });
					let newRoles = currentRoles.filter(r => r !== 'tenant_admin');
					await this.vk.callFunction({
						url: 'admin/system/user/sys/bindRole',
						data: { user_id: item._id, roleList: newRoles, reset: true }
					});
					this.vk.toast('已取消租户管理员角色', 'success');
					this.refresh();
				} catch (e) { /* 取消 */ }
			} else {
				// 添加租户管理员角色
				try {
					await this.$confirm(`确认将用户 ${item.real_name || item.username} 设为其所在部门 (${item.tenant_name || item.tenant_id}) 的租户管理员？`, '设为租户管理员');
					let newRoles = [...currentRoles, 'tenant_admin'];
					await this.vk.callFunction({
						url: 'admin/system/user/sys/bindRole',
						data: { user_id: item._id, roleList: newRoles, reset: true }
					});
					this.vk.toast('已设为租户管理员', 'success');
					this.refresh();
				} catch (e) { /* 取消 */ }
			}
		},
		// 调整部门
		changeDeptBtn() {
			let item = this.table1.selectItem;
			if (!item) return this.vk.toast('请先选择用户');
			this.changeDeptDialog.data = {
				_id: item._id,
				tenant_id: item.tenant_id || ''
			};
			this.changeDeptDialog.show = true;
		}
	}
};
</script>

<style lang="scss" scoped>
.dept-tree-card {
	min-height: calc(100vh - 120px);
}
.dept-tree-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.dept-tree-node {
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: 13px;
}
.dept-tree-node .is-disabled {
	color: #C0C4CC;
	text-decoration: line-through;
}
</style>
