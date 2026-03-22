<template>
	<view class="page-body">
		<!-- 搜索栏 -->
		<vk-data-table-query
			v-model="queryForm1.formData"
			:columns="queryForm1.columns"
			@search="search"
		></vk-data-table-query>

		<!-- 操作栏 -->
		<div style="margin-bottom: 12px; text-align: right;">
			<el-button type="primary" size="small" icon="el-icon-s-promotion" @click="openSendDialog">手动推送</el-button>
		</div>

		<!-- 表格 -->
		<vk-data-table
			ref="table1"
			:action="table1.action"
			:columns="table1.columns"
			:query-form-param="queryForm1"
			:row-no="true"
			:pagination="true"
		></vk-data-table>

		<!-- 手动发送消息弹窗 -->
		<vk-data-dialog
			v-model="sendDialog.show"
			title="手动发送消息"
			width="800px"
			mode="form"
		>
			<el-form ref="sendForm" :model="sendForm" :rules="sendFormRules" label-width="100px">
				<el-form-item label="消息标题" prop="title">
					<el-input v-model="sendForm.title" placeholder="请输入消息标题"></el-input>
				</el-form-item>
				<el-form-item label="消息内容" prop="content">
					<el-input type="textarea" v-model="sendForm.content" :rows="6" placeholder="请输入消息内容（纯文本）"></el-input>
				</el-form-item>
				<el-form-item label="推送目标">
					<el-row :gutter="16">
						<el-col :span="12">
							<el-card shadow="never" class="dept-tree-card">
								<div slot="header"><span>选择部门/人员</span></div>
								<el-tree
									ref="deptTree"
									:data="deptTreeData"
									:props="{ label: 'name', children: 'children' }"
									node-key="_id"
									show-checkbox
									default-expand-all
									@check-change="handleDeptCheck"
								></el-tree>
							</el-card>
						</el-col>
						<el-col :span="12">
							<el-card shadow="never">
								<div slot="header"><span>已选用户（{{ sendForm.receiver_ids.length }}人）</span></div>
								<div class="selected-users">
									<el-tag
										v-for="user in selectedUsers"
										:key="user._id"
										closable
										size="small"
										style="margin: 2px;"
										@close="removeUser(user._id)"
									>{{ user.nickname || user.username }}</el-tag>
									<div v-if="selectedUsers.length === 0" style="color: #999; text-align:center; padding:20px;">
										请在左侧勾选部门
									</div>
								</div>
							</el-card>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<div style="text-align: right; margin-top: 16px;">
				<el-button size="small" @click="sendDialog.show = false">取消</el-button>
				<el-button type="primary" size="small" :loading="sendDialog.loading" @click="submitSend">确认发送</el-button>
			</div>
		</vk-data-dialog>
	</view>
</template>

<script>
export default {
	data() {
		return {
			queryForm1: {
				formData: {},
				columns: [
					{ key: 'title', title: '标题', type: 'text', placeholder: '搜索消息标题' },
					{ key: 'msg_type', title: '类型', type: 'text', placeholder: '搜索类型' },
					{
						key: 'push_status', title: '推送状态', type: 'select',
						data: [
							{ value: '', label: '全部' },
							{ value: 'success', label: '成功' },
							{ value: 'failed', label: '失败' },
							{ value: 'pending', label: '待推送' }
						]
					}
				]
			},
			table1: {
				action: 'admin/message/sys/getList',
				columns: [
					{ key: 'title', title: '消息标题', type: 'text', width: 200 },
					{ key: 'msg_type', title: '类型', type: 'text', width: 100 },
					{
						key: 'receiver_info', title: '接收人', type: 'text', width: 120,
						formatter: (val) => val ? (val.nickname || val.username) : '-'
					},
					{
						key: 'is_read', title: '已读', type: 'tag', width: 80,
						data: [
							{ value: true, label: '已读', type: 'success' },
							{ value: false, label: '未读', type: 'warning' }
						]
					},
					{
						key: 'push_status', title: '推送状态', type: 'tag', width: 100,
						data: [
							{ value: 'success', label: '成功', type: 'success' },
							{ value: 'failed', label: '失败', type: 'danger' },
							{ value: 'pending', label: '待推送', type: 'info' }
						]
					},
					{ key: 'push_error', title: '推送错误', type: 'text', showOverflowTooltip: true },
					{ key: 'created_at', title: '发送时间', type: 'time', width: 160 }
				]
			},
			sendDialog: { show: false, loading: false },
			sendForm: {
				title: '',
				content: '',
				receiver_ids: []
			},
			sendFormRules: {
				title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
				content: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
			},
			deptTreeData: [],
			selectedUsers: []
		};
	},
	mounted() {
		this.loadDeptTree();
	},
	methods: {
		search() {
			this.$refs.table1.search();
		},
		openSendDialog() {
			this.sendForm = { title: '', content: '', receiver_ids: [] };
			this.selectedUsers = [];
			this.sendDialog.show = true;
		},
		loadDeptTree() {
			this.vk.callFunction({
				url: 'admin/system/dept/sys/getList',
				data: {},
				success: (data) => {
					let rows = data.rows || [];
					let roots = rows.filter(d => !d.parent_id);
					roots.forEach(r => {
						r.children = rows.filter(d => d.parent_id === r._id);
					});
					this.deptTreeData = roots;
				}
			});
		},
		handleDeptCheck() {
			let checkedNodes = this.$refs.deptTree.getCheckedNodes(true);
			let deptIds = checkedNodes.map(n => n._id);
			if (deptIds.length === 0) {
				this.selectedUsers = [];
				this.sendForm.receiver_ids = [];
				return;
			}
			this.vk.callFunction({
				url: 'admin/system/user/sys/getList',
				data: {
					pageIndex: 1,
					pageSize: 500,
					formData: {
						tenant_id: { value: deptIds, mode: 'in' }
					}
				},
				success: (data) => {
					let users = data.rows || [];
					this.selectedUsers = users;
					this.sendForm.receiver_ids = users.map(u => u._id);
				}
			});
		},
		removeUser(userId) {
			this.selectedUsers = this.selectedUsers.filter(u => u._id !== userId);
			this.sendForm.receiver_ids = this.sendForm.receiver_ids.filter(id => id !== userId);
		},
		submitSend() {
			this.$refs.sendForm.validate((valid) => {
				if (!valid) return;
				if (this.sendForm.receiver_ids.length === 0) {
					return this.vk.alert('请选择推送目标');
				}
				this.sendDialog.loading = true;
				this.vk.callFunction({
					url: 'admin/message/sys/send',
					data: this.sendForm,
					success: (data) => {
						this.vk.toast(data.msg || '发送成功', 'success');
						this.sendDialog.show = false;
						this.$refs.table1.refresh();
					},
					complete: () => {
						this.sendDialog.loading = false;
					}
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.dept-tree-card {
	max-height: 400px;
	overflow-y: auto;
}
.selected-users {
	max-height: 350px;
	overflow-y: auto;
}
</style>
