<template>
	<view class="page-body">
		<!-- 搜索栏 -->
		<vk-data-table-query
			v-model="queryForm1.formData"
			:columns="queryForm1.columns"
			@search="search"
		></vk-data-table-query>

		<!-- 表格 -->
		<vk-data-table
			ref="table1"
			:action="table1.action"
			:columns="table1.columns"
			:query-form-param="queryForm1"
			:right-btns="['update']"
			:row-no="true"
			:pagination="true"
			@update="handleApproval"
		></vk-data-table>

		<!-- 审批操作弹窗 -->
		<vk-data-dialog
			v-model="approveDialog.show"
			title="审批入驻申请"
			width="500px"
			mode="form"
		>
			<el-descriptions :column="1" border size="small" style="margin-bottom: 20px;">
				<el-descriptions-item label="申请人">{{ approveDialog.data.real_name }}</el-descriptions-item>
				<el-descriptions-item label="申请时间">{{ vk.pubfn.timeFormat(approveDialog.data.created_at) }}</el-descriptions-item>
			</el-descriptions>

			<el-form label-width="80px">
				<el-form-item label="审批操作">
					<el-radio-group v-model="approveDialog.action">
						<el-radio label="approve">通过</el-radio>
						<el-radio label="reject">拒绝</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="拒绝原因" v-if="approveDialog.action === 'reject'">
					<el-input v-model="approveDialog.reject_reason" type="textarea" :rows="3" placeholder="可选填写拒绝原因"></el-input>
				</el-form-item>
			</el-form>

			<div style="text-align: right; margin-top: 16px;">
				<el-button size="small" @click="approveDialog.show = false">取消</el-button>
				<el-button type="primary" size="small" :loading="approveDialog.loading" @click="submitApproval">确认</el-button>
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
					{ key: 'real_name', title: '申请人姓名', type: 'text', placeholder: '搜索姓名' },
					{
						key: 'status',
						title: '审批状态',
						type: 'select',
						defaultValue: 0,
						data: [
							{ value: '', label: '全部' },
							{ value: 0, label: '待审批' },
							{ value: 1, label: '已通过' },
							{ value: 2, label: '已拒绝' }
						]
					}
				]
			},
			table1: {
				// tenantFilter 会自动注入 tenant_id，锁定为本租户的申请
				action: 'admin/system/dept/sys/getApplications',
				columns: [
					{ key: 'real_name', title: '申请人姓名', type: 'text', width: 120 },
					{
						key: 'status',
						title: '审批状态',
						type: 'tag',
						width: 100,
						data: [
							{ value: 0, label: '待审批', type: 'warning' },
							{ value: 1, label: '已通过', type: 'success' },
							{ value: 2, label: '已拒绝', type: 'danger' }
						]
					},
					{ key: 'reject_reason', title: '拒绝原因', type: 'text', width: 150 },
					{ key: 'created_at', title: '申请时间', type: 'time', width: 160 },
					{ key: 'approved_at', title: '审批时间', type: 'time', width: 160 }
				]
			},
			approveDialog: {
				show: false,
				loading: false,
				data: {},
				action: 'approve',
				reject_reason: ''
			}
		};
	},
	methods: {
		search() {
			this.$refs.table1.search();
		},
		handleApproval(row) {
			this.approveDialog.data = { ...row };
			this.approveDialog.action = 'approve';
			this.approveDialog.reject_reason = '';
			this.approveDialog.show = true;
		},
		async submitApproval() {
			this.approveDialog.loading = true;
			try {
				let res = await this.vk.callFunction({
					url: 'admin/system/user/sys/approve',
					data: {
						application_id: this.approveDialog.data._id,
						action: this.approveDialog.action,
						reject_reason: this.approveDialog.reject_reason
					}
				});
				if (res.code === 0) {
					this.vk.toast(res.msg, 'success');
					this.approveDialog.show = false;
					this.$refs.table1.refresh();
				}
			} catch (err) {
				// vk 框架已自动处理错误
			} finally {
				this.approveDialog.loading = false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
