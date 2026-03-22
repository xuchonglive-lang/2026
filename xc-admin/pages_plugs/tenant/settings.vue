<template>
	<view class="page-body">
		<el-card shadow="never">
			<div slot="header">
				<span>租户信息</span>
			</div>
			<el-descriptions :column="2" border size="medium" v-if="tenantInfo">
				<el-descriptions-item label="部门名称">{{ tenantInfo.name }}</el-descriptions-item>
				<el-descriptions-item label="部门编码">{{ tenantInfo.code }}</el-descriptions-item>
				<el-descriptions-item label="层级">
					<el-tag v-if="tenantInfo.dept_level === 10" size="small" type="primary">部室</el-tag>
					<el-tag v-else-if="tenantInfo.dept_level === 20" size="small">车间</el-tag>
					<el-tag v-else size="small" type="info">{{ tenantInfo.dept_level }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="状态">
					<el-tag :type="tenantInfo.status === 1 ? 'success' : 'danger'" size="small">
						{{ tenantInfo.status === 1 ? '启用' : '停用' }}
					</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="简介" :span="2">{{ tenantInfo.description || '暂无' }}</el-descriptions-item>
			</el-descriptions>
			<el-empty v-else description="加载中..."></el-empty>
		</el-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tenantInfo: null
		};
	},
	mounted() {
		this.loadTenantInfo();
	},
	methods: {
		async loadTenantInfo() {
			let userInfo = this.vk.getVuex('$user.userInfo');
			if (!userInfo || !userInfo.tenant_id) {
				return this.vk.toast('无法获取租户信息', 'error');
			}
			let res = await this.vk.callFunction({
				url: 'admin/system/dept/sys/getDetail',
				data: { _id: userInfo.tenant_id }
			});
			if (res.code === 0) {
				this.tenantInfo = res.data || res;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
