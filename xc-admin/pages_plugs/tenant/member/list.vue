<template>
	<view class="page-body">
		<el-row :gutter="16">
			<!-- 左侧：小组树 -->
			<el-col :span="5">
				<el-card class="group-tree-card" shadow="never">
					<div slot="header">
						<span>按小组筛选</span>
					</div>
					<el-tree
						ref="groupTree"
						:data="groupTreeData"
						:props="treeProps"
						node-key="_id"
						:expand-on-click-node="false"
						:highlight-current="true"
						default-expand-all
						@current-change="handleGroupClick"
					>
						<span class="group-tree-node" slot-scope="{ node, data }">
							<span>{{ data.name }}</span>
						</span>
					</el-tree>
					<el-button type="text" size="small" @click="clearGroupFilter" style="margin-top: 8px;">
						<i class="el-icon-close"></i> 清除筛选
					</el-button>
				</el-card>
			</el-col>

			<!-- 右侧：成员列表 -->
			<el-col :span="19">
				<!-- 搜索 -->
				<vk-data-table-query
					v-model="queryForm1.formData"
					:columns="queryForm1.columns"
					@search="search"
				></vk-data-table-query>

				<!-- 操作按钮 -->
				<view class="vk-table-button-box">
					<el-button
						type="primary" size="small" icon="el-icon-s-operation"
						:disabled="multipleSelection.length === 0"
						@click="assignDialog.show = true"
					>批量分配至小组</el-button>
					<el-button
						type="warning" size="small" icon="el-icon-remove-outline"
						:disabled="multipleSelection.length === 0"
						@click="removeFromGroup"
					>移出小组</el-button>
				</view>

				<!-- 成员表格 -->
				<vk-data-table
					ref="table1"
					:action="table1.action"
					:columns="table1.columns"
					:query-form-param="queryForm1"
					:right-btns="[]"
					:selection="true"
					:row-no="true"
					:pagination="true"
					@selection-change="selectionChange"
				></vk-data-table>
			</el-col>
		</el-row>

		<!-- 分配至小组弹窗 -->
		<vk-data-dialog
			v-model="assignDialog.show"
			title="选择目标小组"
			width="400px"
		>
			<el-tree
				:data="groupTreeData"
				:props="treeProps"
				node-key="_id"
				:expand-on-click-node="false"
				:highlight-current="true"
				default-expand-all
				@current-change="selectTargetGroup"
			></el-tree>
			<div style="text-align: right; margin-top: 16px;">
				<el-button size="small" @click="assignDialog.show = false">取消</el-button>
				<el-button type="primary" size="small" :loading="assignDialog.loading"
					:disabled="!assignDialog.target_group_id"
					@click="submitAssign"
				>确认分配</el-button>
			</div>
		</vk-data-dialog>
	</view>
</template>

<script>
export default {
	data() {
		return {
			groupTreeData: [],
			treeProps: { children: 'children', label: 'name' },
			multipleSelection: [],
			queryForm1: {
				formData: {},
				columns: [
					{ key: 'real_name', title: '真实姓名', type: 'text', placeholder: '搜索姓名' }
				]
			},
			table1: {
				action: 'admin/tenant/member/sys/getList',
				columns: [
					{ key: 'wx_avatar', title: '头像', type: 'avatar', width: 60 },
					{ key: 'real_name', title: '真实姓名', type: 'text', width: 120 },
					{ key: 'wx_nickname', title: '微信昵称', type: 'text', width: 120 },
					{ key: 'mobile', title: '手机号', type: 'text', width: 130 },
					{ key: 'group_name', title: '当前小组', type: 'text', width: 120 },
					{ key: '_add_time', title: '注册时间', type: 'time', width: 160 }
				]
			},
			assignDialog: {
				show: false,
				loading: false,
				target_group_id: ''
			}
		};
	},
	mounted() {
		this.loadGroupTree();
	},
	methods: {
		loadGroupTree() {
			let that = this;
			this.vk.callFunction({
				url: 'admin/tenant/group/sys/getList',
				data: {},
				success: (data) => {
					let rows = data.rows || [];
					let roots = rows.filter(d => !d.parent_id);
					roots.forEach(root => {
						root.children = rows
							.filter(d => d.parent_id === root._id)
							.sort((a, b) => (a.sort_num || 0) - (b.sort_num || 0));
					});
					that.groupTreeData = roots;
				}
			});
		},
		handleGroupClick(data) {
			this.queryForm1.formData.group_id = data._id;
			this.search();
		},
		clearGroupFilter() {
			this.queryForm1.formData.group_id = '';
			this.$refs.groupTree.setCurrentKey(null);
			this.search();
		},
		search() {
			this.$refs.table1.search();
		},
		selectionChange(selection) {
			this.multipleSelection = selection;
		},
		selectTargetGroup(data) {
			this.assignDialog.target_group_id = data._id;
		},
		async submitAssign() {
			this.assignDialog.loading = true;
			try {
				let user_ids = this.multipleSelection.map(u => u._id);
				let res = await this.vk.callFunction({
					url: 'admin/tenant/member/sys/assign',
					data: {
						user_ids,
						target_group_id: this.assignDialog.target_group_id
					}
				});
				if (res.code === 0) {
					this.vk.toast(res.msg, 'success');
					this.assignDialog.show = false;
					this.assignDialog.target_group_id = '';
					this.$refs.table1.refresh();
				}
			} catch (e) {
				// vk 框架已自动处理错误
			} finally {
				this.assignDialog.loading = false;
			}
		},
		async removeFromGroup() {
			try {
				await this.$confirm(`确认将 ${this.multipleSelection.length} 名成员移出当前小组？`, '提示', { type: 'warning' });
				let user_ids = this.multipleSelection.map(u => u._id);
				let res = await this.vk.callFunction({
					url: 'admin/tenant/member/sys/assign',
					data: { user_ids, target_group_id: '' }
				});
				if (res.code === 0) {
					this.vk.toast(res.msg, 'success');
					this.$refs.table1.refresh();
				}
			} catch (e) {
				// 取消
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.group-tree-card {
	min-height: calc(100vh - 120px);
}
.group-tree-node {
	font-size: 13px;
}
</style>
