<template>
	<div class="dept-selector" v-if="showSelector">
		<el-select
			v-model="selectedValue"
			:placeholder="placeholder"
			size="small"
			clearable
			@change="handleChange"
		>
			<el-option-group
				v-for="group in groupedDepts"
				:key="group.label"
				:label="group.label"
			>
				<el-option
					v-for="dept in group.items"
					:key="dept._id"
					:label="dept.name"
					:value="dept._id"
				></el-option>
			</el-option-group>
		</el-select>
	</div>
</template>

<script>
/**
 * DeptSelector - 后台部门切换选择器
 * 权限判断完全在服务端（getMyLevel 返回 canSwitchView）
 */
export default {
	name: 'DeptSelector',
	props: {
		placeholder: {
			type: String,
			default: '切换部门视角'
		}
	},
	data() {
		return {
			showSelector: false,
			selectedValue: '',
			allDepts: [],
			loading: false,
			inited: false
		};
	},
	computed: {
		appInited() {
			return this.vk.getVuex('$app.inited');
		},
		// 监听当前登录用户变化
		currentUserId() {
			let info = this.vk.getVuex('$user.userInfo');
			return info ? info._id : '';
		},
		groupedDepts() {
			let levelMap = { 10: '部室', 20: '车间' };
			let groups = {};
			this.allDepts.forEach(d => {
				if (d.dept_level === 0) return;
				let label = levelMap[d.dept_level] || '其他';
				if (!groups[label]) groups[label] = { label, items: [] };
				groups[label].items.push(d);
			});
			return Object.values(groups);
		}
	},
	watch: {
		appInited: {
			handler(val) {
				if (val && !this.inited) {
					this.inited = true;
					this.init();
				}
			},
			immediate: true
		},
		// 用户切换登录后重新初始化
		currentUserId(newVal, oldVal) {
			if (oldVal && newVal !== oldVal) {
				this.showSelector = false;
				this.selectedValue = '';
				this.allDepts = [];
				this.inited = false;
				if (newVal) {
					this.inited = true;
					this.init();
				}
			}
		}
	},
	methods: {
		init() {
			let that = this;
			that.vk.callFunction({
				url: 'admin/system/dept/sys/getMyLevel',
				data: {},
				success: function(data) {
					// 服务端返回明确的 canSwitchView 布尔值
					if (data.canSwitchView === true) {
						that.showSelector = true;
						that.selectedValue = data.selected_view_tenant_id || '';
						that.loadDepts();
					}
				}
			});
		},

		loadDepts() {
			let that = this;
			that.vk.callFunction({
				url: 'admin/system/dept/sys/getList',
				data: {},
				success: function(data) {
					that.allDepts = data.rows || [];
				}
			});
		},

		handleChange(value) {
			let that = this;
			if (that.loading) return;
			that.loading = true;
			that.vk.callFunction({
				url: 'admin/system/dept/sys/switchView',
				title: '切换中...',
				data: { tenant_id: value || '' },
				success: function(data) {
					that.$notify({ message: data.msg, type: 'success' });
				},
				complete: function() {
					that.loading = false;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.dept-selector {
	display: inline-flex;
	align-items: center;
	margin-left: 12px;
}
</style>
