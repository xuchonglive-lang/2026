<template>
	<view class="page-body dept-manage">
		<el-row :gutter="16">
			<!-- 左侧：部门列表 -->
			<el-col :span="6">
				<el-card class="dept-tree-card" shadow="never">
					<div slot="header" class="dept-tree-header">
						<span>部门列表</span>
						<el-button type="primary" size="mini" icon="el-icon-plus" @click="addDeptBtn" v-if="hasGroupPermission">新增</el-button>
					</div>
					<el-input
						v-model="searchKeyword"
						placeholder="搜索部门名称"
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
							<el-tag v-if="data.status === 0" size="mini" type="info">停用</el-tag>
						</span>
					</el-tree>
				</el-card>
			</el-col>

			<!-- 右侧：详情和成员 -->
			<el-col :span="18">
				<template v-if="selectedDept">
					<el-tabs v-model="activeTab">
						<!-- Tab 1: 部门信息 -->
						<el-tab-pane label="部门信息" name="info">
							<el-card shadow="never">
								<vk-data-form
									ref="deptForm"
									v-model="deptFormData"
									:rules="deptFormRules"
									:action="deptFormAction"
									:form-type="deptFormType"
									:columns="deptFormColumns"
									label-width="100px"
									:disabled="!hasGroupPermission"
									@success="onDeptFormSuccess"
								></vk-data-form>
								<div style="text-align: right; margin-top: 16px;" v-if="hasGroupPermission && selectedDept.dept_level > 0">
									<el-button type="danger" size="small" @click="deleteDeptBtn">删除部门</el-button>
								</div>
							</el-card>
						</el-tab-pane>

						<!-- Tab 2: 成员管理 -->
						<el-tab-pane label="成员管理" name="members">
							<el-card shadow="never">
								<div class="member-toolbar">
									<el-button type="success" size="small" icon="el-icon-plus" @click="addMemberBtn" v-if="hasGroupPermission">添加成员</el-button>
									<el-input
										v-model="memberKeyword"
										placeholder="搜索成员"
										size="small"
										prefix-icon="el-icon-search"
										clearable
										style="width: 200px; margin-left: 12px;"
										@change="loadMembers"
									></el-input>
								</div>
								<vk-data-table
									ref="memberTable"
									:action="memberTable.action"
									:columns="memberTable.columns"
									:query-form-param="memberQueryForm"
									:right-btns="hasGroupPermission ? ['delete'] : []"
									:row-no="true"
									:pagination="true"
									:manual="true"
									@delete="removeMemberBtn"
								></vk-data-table>
							</el-card>
						</el-tab-pane>
					</el-tabs>
				</template>
				<template v-else>
					<el-card shadow="never" class="empty-hint">
						<div class="empty-hint-content">
							<i class="el-icon-office-building" style="font-size: 48px; color: #ddd;"></i>
							<p style="color: #999; margin-top: 12px;">请在左侧选择一个部门</p>
						</div>
					</el-card>
				</template>
			</el-col>
		</el-row>

		<!-- 添加部门弹窗 -->
		<vk-data-dialog
			v-model="addDeptDialog.show"
			:title="addDeptDialog.title"
			width="500px"
			mode="form"
		>
			<vk-data-form
				ref="addDeptForm"
				v-model="addDeptDialog.data"
				:rules="deptFormRules"
				:action="addDeptDialog.action"
				:form-type="'add'"
				:columns="addDeptFormColumns"
				label-width="100px"
				@success="onAddDeptSuccess"
			></vk-data-form>
		</vk-data-dialog>

		<!-- 添加成员弹窗 -->
		<vk-data-dialog
			v-model="addMemberDialog.show"
			title="添加成员到部门"
			width="600px"
			mode="form"
		>
			<el-form label-width="100px">
				<el-form-item label="搜索用户">
					<el-input
						v-model="addMemberDialog.keyword"
						placeholder="输入用户名或手机号搜索"
						size="small"
						@change="searchUnassignedUsers"
					></el-input>
				</el-form-item>
				<el-form-item label="选择用户">
					<el-table :data="addMemberDialog.users" size="small" max-height="300px">
						<el-table-column prop="nickname" label="昵称"></el-table-column>
						<el-table-column prop="username" label="用户名"></el-table-column>
						<el-table-column prop="mobile" label="手机号"></el-table-column>
						<el-table-column prop="tenant_name" label="当前部门">
							<template slot-scope="scope">
								<span>{{ scope.row.tenant_name || '未分配' }}</span>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="80">
							<template slot-scope="scope">
								<el-button type="text" size="mini" @click="confirmAddMember(scope.row)">添加</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-form-item>
			</el-form>
		</vk-data-dialog>

	</view>
</template>

<script>
let that;
let vk;

let deptLevelData = [
	{ value: 0, label: "集团级" },
	{ value: 10, label: "部室级" },
	{ value: 20, label: "车间级" }
];

let statusData = [
	{ value: 1, label: "启用" },
	{ value: 0, label: "停用" }
];

export default {
	data() {
		return {
			// 左侧树
			searchKeyword: '',
			deptTreeData: [],
			treeProps: {
				children: 'children',
				label: 'name'
			},
			selectedDept: null,
			activeTab: 'info',

			// 部门表单
			deptFormData: {},
			deptFormAction: 'admin/system/dept/sys/update',
			deptFormType: 'update',
			deptFormColumns: [
				{ key: "name", title: "部门名称", type: "text" },
				{ key: "code", title: "部门编码", type: "text" },
				{ key: "dept_level", title: "部门层级", type: "select", data: deptLevelData },
				{ key: "leader_id", title: "负责人", type: "text", placeholder: "输入用户ID" },
				{ key: "sort_num", title: "排序号", type: "number" },
				{ key: "status", title: "状态", type: "switch", activeValue: 1, inactiveValue: 0 },
				{ key: "description", title: "简介", type: "textarea",
					autosize: { minRows: 2, maxRows: 5 }
				}
			],
			deptFormRules: {
				name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }],
				code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' }],
				dept_level: [{ required: true, message: '请选择部门层级', trigger: 'change' }]
			},

			// 添加部门弹窗
			addDeptDialog: {
				show: false,
				title: '添加部门',
				action: 'admin/system/dept/sys/add',
				data: {
					dept_level: 10,
					status: 1,
					sort_num: 0
				}
			},
			addDeptFormColumns: [
				{ key: "name", title: "部门名称", type: "text" },
				{ key: "code", title: "部门编码", type: "text" },
				{ key: "parent_id", title: "上级部门", type: "select", data: [],
					props: { value: "_id", label: "name" }
				},
				{ key: "dept_level", title: "部门层级", type: "select", data: deptLevelData },
				{ key: "sort_num", title: "排序号", type: "number" },
				{ key: "status", title: "状态", type: "switch", activeValue: 1, inactiveValue: 0 },
				{ key: "description", title: "简介", type: "textarea",
					autosize: { minRows: 2, maxRows: 5 }
				}
			],

			// 成员管理
			memberKeyword: '',
			memberQueryForm: {
				formData: {
					dept_id: '',
					keyword: ''
				},
				columns: [
					{ key: "dept_id", title: "部门ID", type: "text", hidden: true, mode: "=" },
					{ key: "keyword", title: "关键词", type: "text", hidden: true, mode: "=" }
				]
			},
			memberTable: {
				action: 'admin/system/dept/sys/getMembers',
				columns: [
					{ key: "avatar", title: "头像", type: "avatar", width: 60 },
					{ key: "nickname", title: "昵称", type: "text", width: 120, defaultValue: '未设置' },
					{ key: "username", title: "用户名", type: "text", width: 120 },
					{ key: "mobile", title: "手机号", type: "text", width: 120, defaultValue: "未绑定" },
					{ key: "role", title: "角色", type: "text", width: 100, defaultValue: '无' },
					{ key: "status", title: "状态", type: "tag", width: 80, defaultValue: 0,
						data: [
							{ value: 0, label: "正常", tagType: "success" },
							{ value: 1, label: "冻结", tagType: "danger" }
						]
					}
				]
			},

			// 添加成员弹窗
			addMemberDialog: {
				show: false,
				keyword: '',
				users: []
			}
		};
	},
	onLoad(options = {}) {
		that = this;
		vk = that.vk;
		that.loadDeptList();
	},
	onReady() {},
	onShow() {},
	watch: {
		searchKeyword(val) {
			that.$refs.deptTree.filter(val);
		}
	},
	computed: {
		hasGroupPermission() {
			let userInfo = this.vk.getVuex('$user.userInfo') || {};
			return typeof userInfo.dept_level === 'number' && userInfo.dept_level === 0;
		}
	},
	methods: {
		// 加载部门列表并构建树
		loadDeptList() {
			vk.callFunction({
				url: 'admin/system/dept/sys/getList',
				data: {},
				success: (data) => {
					let rows = data.rows || [];
					// 构建两级树
					let roots = rows.filter(d => !d.parent_id);
					roots.forEach(root => {
						root.children = rows
							.filter(d => d.parent_id === root._id)
							.sort((a, b) => (a.sort_num || 0) - (b.sort_num || 0));
					});
					that.deptTreeData = roots;

					// 更新添加表单的上级部门选项（仅集团级）
					let parentOptions = roots.map(r => ({ _id: r._id, name: r.name }));
					let parentIndex = vk.pubfn.getListIndex(that.addDeptFormColumns, "key", "parent_id");
					if (parentIndex > -1) {
						that.addDeptFormColumns[parentIndex].data = parentOptions;
					}
				}
			});
		},

		// 树节点筛选
		filterNode(value, data) {
			if (!value) return true;
			return data.name.indexOf(value) !== -1;
		},

		// 点击树节点
		handleNodeClick(data) {
			that.selectedDept = data;
			that.deptFormData = vk.pubfn.copyObject(data);
			that.deptFormType = 'update';
			that.activeTab = 'info';
			that.loadMembers();
		},

		// 加载成员列表
		loadMembers() {
			if (!that.selectedDept) return;
			that.memberQueryForm.formData.dept_id = that.selectedDept._id;
			that.memberQueryForm.formData.keyword = that.memberKeyword;
			that.$nextTick(() => {
				that.$refs.memberTable && that.$refs.memberTable.search();
			});
		},

		// 添加部门按钮
		addDeptBtn() {
			that.addDeptDialog.data = {
				dept_level: 10,
				status: 1,
				sort_num: 0,
				parent_id: that.deptTreeData.length > 0 ? that.deptTreeData[0]._id : ''
			};
			that.addDeptDialog.show = true;
		},

		// 添加部门成功
		onAddDeptSuccess() {
			that.addDeptDialog.show = false;
			that.loadDeptList();
			that.$notify({ message: '部门添加成功', type: 'success' });
		},

		// 部门编辑成功
		onDeptFormSuccess() {
			that.loadDeptList();
			that.$notify({ message: '部门信息已更新', type: 'success' });
		},

		// 删除部门
		deleteDeptBtn() {
			if (!that.selectedDept) return;
			that.$confirm('确定要删除该部门吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				vk.callFunction({
					url: 'admin/system/dept/sys/del',
					data: { _id: that.selectedDept._id },
					success: () => {
						that.selectedDept = null;
						that.loadDeptList();
						that.$notify({ message: '删除成功', type: 'success' });
					}
				});
			}).catch(() => {});
		},

		// 添加成员按钮
		addMemberBtn() {
			that.addMemberDialog.keyword = '';
			that.addMemberDialog.users = [];
			that.addMemberDialog.show = true;
		},

		// 搜索未分配用户
		searchUnassignedUsers() {
			let keyword = that.addMemberDialog.keyword;
			if (!keyword) return;
			vk.callFunction({
				url: 'admin/system/user/sys/getList',
				data: {
					pageSize: 20,
					pageIndex: 1,
					keyword
				},
				success: (data) => {
					that.addMemberDialog.users = data.rows || [];
				}
			});
		},

		// 确认添加成员
		confirmAddMember(user) {
			let deptName = that.selectedDept.name;
			let msg = user.tenant_name
				? `该用户当前属于「${user.tenant_name}」，确定调整到「${deptName}」吗？`
				: `确定将该用户添加到「${deptName}」吗？`;

			that.$confirm(msg, '确认', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: user.tenant_name ? 'warning' : 'info'
			}).then(() => {
				vk.callFunction({
					url: 'admin/system/dept/sys/addMember',
					data: {
						dept_id: that.selectedDept._id,
						user_id: user._id
					},
					success: (data) => {
						that.$notify({ message: data.msg || '添加成功', type: 'success' });
						that.loadMembers();
						that.searchUnassignedUsers();
					}
				});
			}).catch(() => {});
		},

		// 移除成员
		removeMemberBtn({ item, deleteFn }) {
			that.$confirm(`确定将「${item.nickname || item.username}」从本部门移除吗？`, '确认', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				vk.callFunction({
					url: 'admin/system/dept/sys/removeMember',
					data: { user_id: item._id },
					success: () => {
						that.$notify({ message: '移除成功', type: 'success' });
						that.loadMembers();
					}
				});
			}).catch(() => {});
		}
	}
};
</script>

<style lang="scss" scoped>
.dept-manage {
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
		.is-disabled {
			color: #c0c4cc;
		}
	}
	.empty-hint {
		min-height: calc(100vh - 120px);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.empty-hint-content {
		text-align: center;
	}
	.member-toolbar {
		display: flex;
		align-items: center;
		margin-bottom: 12px;
	}
}
</style>
