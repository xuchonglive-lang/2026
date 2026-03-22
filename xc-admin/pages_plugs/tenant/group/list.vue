<template>
	<view class="page-body">
		<el-row :gutter="16">
			<!-- 左侧：小组树 -->
			<el-col :span="7">
				<el-card class="group-tree-card" shadow="never">
					<div slot="header" class="tree-header">
						<span>小组列表</span>
						<el-button type="primary" size="mini" icon="el-icon-plus" @click="addGroupBtn">新增</el-button>
					</div>
					<el-input
						v-model="searchKeyword"
						placeholder="搜索小组"
						size="small"
						prefix-icon="el-icon-search"
						clearable
						style="margin-bottom: 12px;"
					></el-input>
					<el-tree
						ref="groupTree"
						:data="groupTreeData"
						:props="treeProps"
						node-key="_id"
						:expand-on-click-node="false"
						:highlight-current="true"
						:filter-node-method="filterNode"
						default-expand-all
						@current-change="handleNodeClick"
					>
						<span class="group-tree-node" slot-scope="{ node, data }">
							<span :class="{ 'is-disabled': data.status === 0 }">{{ data.name }}</span>
							<el-tag v-if="data._isRoot" size="mini" type="warning">租户</el-tag>
							<el-tag v-if="data.status === 0" size="mini" type="info">停用</el-tag>
						</span>
					</el-tree>
				</el-card>
			</el-col>

			<!-- 右侧：小组详情编辑 -->
			<el-col :span="17">
				<template v-if="selectedGroup && !selectedGroup._isRoot">
					<el-card shadow="never">
						<div slot="header" class="detail-header">
							<span>编辑小组：{{ selectedGroup.name }}</span>
							<el-button type="danger" size="mini" @click="deleteGroupBtn">删除</el-button>
						</div>
						<el-form ref="editForm" :model="groupFormData" label-width="100px" size="small">
							<el-form-item label="小组名称" prop="name" :rules="[{required: true, message: '请输入小组名称'}]">
								<el-input v-model="groupFormData.name" placeholder="请输入小组名称"></el-input>
							</el-form-item>
							<el-form-item label="组长">
								<el-select
									v-model="groupFormData.leader_id"
									filterable
									remote
									clearable
									placeholder="搜索姓名或手机号"
									:remote-method="searchUsers"
									:loading="userSearchLoading"
									style="width: 100%;"
								>
									<el-option
										v-for="u in userOptions"
										:key="u._id"
										:label="(u.real_name || u.nickname || u.username) + (u.mobile ? ' (' + u.mobile + ')' : '')"
										:value="u._id"
									></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="排序号">
								<el-input-number v-model="groupFormData.sort_num" :min="0" :max="999"></el-input-number>
							</el-form-item>
							<el-form-item label="状态">
								<el-radio-group v-model="groupFormData.status">
									<el-radio :label="1">启用</el-radio>
									<el-radio :label="0">停用</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="简介">
								<el-input v-model="groupFormData.description" type="textarea" :rows="3" placeholder="可选"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitEdit">保存</el-button>
							</el-form-item>
						</el-form>
					</el-card>
				</template>
				<template v-else>
					<el-card shadow="never" class="empty-hint">
						<div class="empty-hint-content">
							<i class="el-icon-s-operation" style="font-size: 48px; color: #ddd;"></i>
							<p style="color: #999; margin-top: 12px;">请在左侧选择一个小组，或点击"新增"创建小组</p>
						</div>
					</el-card>
				</template>
			</el-col>
		</el-row>

		<!-- 新增小组弹窗 -->
		<vk-data-dialog
			v-model="addDialog.show"
			title="新增小组"
			width="560px"
		>
			<el-form ref="addForm" :model="addDialog.data" label-width="100px" size="small">
				<el-form-item label="小组名称" prop="name" :rules="[{required: true, message: '请输入小组名称'}]">
					<el-input v-model="addDialog.data.name" placeholder="请输入小组名称"></el-input>
				</el-form-item>
				<el-form-item label="上级小组">
					<div class="parent-tree-box">
						<el-tree
							ref="parentTree"
							:data="parentTreeData"
							:props="treeProps"
							node-key="_id"
							:expand-on-click-node="false"
							:highlight-current="true"
							default-expand-all
							@current-change="onSelectParent"
						>
							<span class="group-tree-node" slot-scope="{ node, data }">
								<span>{{ data.name }}</span>
								<el-tag v-if="data._isRoot" size="mini" type="warning">租户</el-tag>
							</span>
						</el-tree>
					</div>
					<div style="margin-top: 6px; color: #909399; font-size: 12px;">
						已选：<el-tag v-if="addDialog.selectedParentName" size="small">{{ addDialog.selectedParentName }}</el-tag>
						<span v-else>根小组（不选则为租户下一级）</span>
						<el-button v-if="addDialog.data.parent_id" type="text" size="mini" @click="clearParent" style="margin-left: 8px;">清除</el-button>
					</div>
				</el-form-item>
				<el-form-item label="组长">
					<el-select
						v-model="addDialog.data.leader_id"
						filterable
						remote
						clearable
						placeholder="搜索姓名或手机号"
						:remote-method="searchUsers"
						:loading="userSearchLoading"
						style="width: 100%;"
					>
						<el-option
							v-for="u in userOptions"
							:key="u._id"
							:label="(u.real_name || u.nickname || u.username) + (u.mobile ? ' (' + u.mobile + ')' : '')"
							:value="u._id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="排序号">
					<el-input-number v-model="addDialog.data.sort_num" :min="0" :max="999"></el-input-number>
				</el-form-item>
				<el-form-item label="简介">
					<el-input v-model="addDialog.data.description" type="textarea" :rows="3" placeholder="可选"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" :loading="addDialog.loading" @click="submitAdd">确认新增</el-button>
					<el-button @click="addDialog.show = false">取消</el-button>
				</el-form-item>
			</el-form>
		</vk-data-dialog>
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchKeyword: '',
			groupTreeData: [],
			parentTreeData: [],
			groupFlatList: [],
			treeProps: { children: 'children', label: 'name' },
			selectedGroup: null,
			groupFormData: {},

			// 用户搜索
			userSearchLoading: false,
			userOptions: [],

			// 新增弹窗
			addDialog: {
				show: false,
				loading: false,
				data: { name: '', parent_id: '', leader_id: '', sort_num: 0, description: '' },
				selectedParentName: ''
			}
		};
	},
	watch: {
		searchKeyword(val) {
			this.$refs.groupTree.filter(val);
		}
	},
	mounted() {
		this.loadGroupTree();
	},
	methods: {
		// 加载小组树
		loadGroupTree() {
			let that = this;
			this.vk.callFunction({
				url: 'admin/tenant/group/sys/getList',
				data: {},
				success: (data) => {
					let rows = data.rows || [];
					that.groupFlatList = rows;

					// 构建带"租户根节点"的树
					let userInfo = that.vk.getVuex('$user.userInfo') || {};
					let rootNode = {
						_id: '__root__',
						_isRoot: true,
						name: userInfo.tenant_name || '本租户',
						children: []
					};

					let roots = rows.filter(d => !d.parent_id);
					roots.forEach(root => {
						root.children = rows
							.filter(d => d.parent_id === root._id)
							.sort((a, b) => (a.sort_num || 0) - (b.sort_num || 0));
					});

					rootNode.children = roots;
					that.groupTreeData = [rootNode];
					that.parentTreeData = [rootNode];
				}
			});
		},

		filterNode(value, data) {
			if (!value) return true;
			if (data._isRoot) return true;
			return data.name.indexOf(value) !== -1;
		},

		handleNodeClick(data) {
			this.selectedGroup = data;
			if (!data._isRoot) {
				this.groupFormData = { ...data };
				// 预加载组长信息
				if (data.leader_id) {
					this.loadUserById(data.leader_id);
				}
			}
		},

		// 搜索本租户内用户（远程）
		searchUsers(keyword) {
			if (!keyword || keyword.length < 1) {
				this.userOptions = [];
				return;
			}
			this.userSearchLoading = true;
			let that = this;
			this.vk.callFunction({
				url: 'admin/tenant/member/sys/getList',
				data: {
					pageIndex: 1,
					pageSize: 20,
					formData: { real_name: keyword }
				},
				success: (data) => {
					that.userOptions = data.rows || [];
				},
				complete: () => {
					that.userSearchLoading = false;
				}
			});
		},

		// 加载单个用户信息（编辑时回显组长）
		loadUserById(userId) {
			let that = this;
			this.vk.callFunction({
				url: 'admin/tenant/member/sys/getList',
				data: {
					pageIndex: 1,
					pageSize: 1,
					whereJson: { _id: userId }
				},
				success: (data) => {
					let rows = data.rows || [];
					if (rows.length > 0) {
						// 将用户加入选项列表以便 el-select 显示
						let exists = that.userOptions.find(u => u._id === userId);
						if (!exists) {
							that.userOptions = [...that.userOptions, ...rows];
						}
					}
				}
			});
		},

		// ========== 新增小组 ==========
		addGroupBtn() {
			this.addDialog.data = { name: '', parent_id: '', leader_id: '', sort_num: 0, description: '' };
			this.addDialog.selectedParentName = '';
			this.addDialog.show = true;
			this.$nextTick(() => {
				if (this.$refs.parentTree) {
					this.$refs.parentTree.setCurrentKey(null);
				}
			});
		},

		onSelectParent(data) {
			if (data._isRoot) {
				// 选了租户根节点 = 不设上级
				this.addDialog.data.parent_id = '';
				this.addDialog.selectedParentName = '';
			} else {
				this.addDialog.data.parent_id = data._id;
				this.addDialog.selectedParentName = data.name;
			}
		},

		clearParent() {
			this.addDialog.data.parent_id = '';
			this.addDialog.selectedParentName = '';
			if (this.$refs.parentTree) {
				this.$refs.parentTree.setCurrentKey(null);
			}
		},

		async submitAdd() {
			this.$refs.addForm.validate(async (valid) => {
				if (!valid) return;
				this.addDialog.loading = true;
				try {
					let res = await this.vk.callFunction({
						url: 'admin/tenant/group/sys/add',
						data: this.addDialog.data
					});
					if (res.code === 0) {
						this.vk.toast(res.msg || '创建成功', 'success');
						this.addDialog.show = false;
						this.loadGroupTree();
					}
				} catch (e) {
					// vk 框架已自动处理
				} finally {
					this.addDialog.loading = false;
				}
			});
		},

		// ========== 编辑小组 ==========
		async submitEdit() {
			this.$refs.editForm.validate(async (valid) => {
				if (!valid) return;
				try {
					let res = await this.vk.callFunction({
						url: 'admin/tenant/group/sys/update',
						data: {
							_id: this.groupFormData._id,
							name: this.groupFormData.name,
							leader_id: this.groupFormData.leader_id || '',
							sort_num: this.groupFormData.sort_num || 0,
							status: this.groupFormData.status,
							description: this.groupFormData.description || ''
						}
					});
					if (res.code === 0) {
						this.vk.toast('修改成功', 'success');
						this.loadGroupTree();
					}
				} catch (e) {}
			});
		},

		// ========== 删除 ==========
		async deleteGroupBtn() {
			if (!this.selectedGroup) return;
			try {
				await this.$confirm('确认删除该小组？需保证无子级和成员', '提示', { type: 'warning' });
				let res = await this.vk.callFunction({
					url: 'admin/tenant/group/sys/delete',
					data: { _id: this.selectedGroup._id }
				});
				if (res.code === 0) {
					this.vk.toast(res.msg, 'success');
					this.selectedGroup = null;
					this.loadGroupTree();
				}
			} catch (e) {}
		}
	}
};
</script>

<style lang="scss" scoped>
.group-tree-card {
	min-height: calc(100vh - 120px);
}
.tree-header, .detail-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.group-tree-node {
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: 13px;
}
.group-tree-node .is-disabled {
	color: #C0C4CC;
	text-decoration: line-through;
}
.empty-hint {
	min-height: 300px;
}
.empty-hint-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 260px;
}
.parent-tree-box {
	max-height: 200px;
	overflow-y: auto;
	border: 1px solid #DCDFE6;
	border-radius: 4px;
	padding: 8px;
}
</style>
