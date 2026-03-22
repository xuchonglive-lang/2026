<template>
	<div class="visibility-setter">
		<el-form-item :label="label">
			<el-radio-group v-model="formValue.visibility" @change="handleVisibilityChange">
				<el-radio label="public">公开所有部门</el-radio>
				<el-radio label="private">仅本部门</el-radio>
				<el-radio label="targeted">指定部门</el-radio>
			</el-radio-group>
		</el-form-item>

		<!-- targeted 模式：部门多选 -->
		<el-form-item v-if="formValue.visibility === 'targeted'" label="目标部门">
			<el-checkbox-group v-model="formValue.target_dept_ids" @change="handleTargetChange">
				<el-checkbox
					v-for="dept in availableDepts"
					:key="dept._id"
					:label="dept._id"
				>
					{{ dept.name }}
					<el-tag size="mini" :type="dept.dept_level === 10 ? 'primary' : 'info'">
						{{ dept.dept_level === 10 ? '部室' : '车间' }}
					</el-tag>
				</el-checkbox>
			</el-checkbox-group>
			<div v-if="availableDepts.length === 0" class="no-dept-hint">
				暂无可选部门
			</div>
		</el-form-item>
	</div>
</template>

<script>
/**
 * VisibilitySetter - 数据可见性配置组件
 * 用于所有业务表单中嵌入，配置数据的可见范围
 *
 * v-model 绑定格式: { visibility: 'public'|'private'|'targeted', target_dept_ids: [] }
 *
 * 方向约束：发布者只能选择 dept_level >= 自身的部门
 * 集团级(0)创建时默认 public，部门级创建时默认 private
 */
let vk;

export default {
	name: 'VisibilitySetter',
	props: {
		value: {
			type: Object,
			default: () => ({ visibility: 'private', target_dept_ids: [] })
		},
		label: {
			type: String,
			default: '可见范围'
		}
	},
	data() {
		return {
			formValue: {
				visibility: 'private',
				target_dept_ids: []
			},
			availableDepts: [],
			currentDeptLevel: 99
		};
	},
	watch: {
		value: {
			handler(val) {
				if (val) {
					this.formValue = {
						visibility: val.visibility || 'private',
						target_dept_ids: val.target_dept_ids || []
					};
				}
			},
			immediate: true,
			deep: true
		}
	},
	mounted() {
		vk = this.vk;
		this.initUserContext();
	},
	methods: {
		// 初始化用户上下文
		initUserContext() {
			let userInfo = vk.getVuex('$user.userInfo');
			this.currentDeptLevel = userInfo ? (userInfo.dept_level || 99) : 99;

			// 集团级默认 public
			if (this.currentDeptLevel === 0 && !this.value.visibility) {
				this.formValue.visibility = 'public';
				this.emitValue();
			}

			this.loadAvailableDepts();
		},

		// 加载可选部门（仅 dept_level >= 当前用户的部门）
		loadAvailableDepts() {
			let userInfo = vk.getVuex('$user.userInfo');
			let currentTenantId = userInfo ? userInfo.tenant_id : '';

			vk.callFunction({
				url: 'admin/system/dept/sys/getList',
				data: { status: 1 },
				success: (data) => {
					let rows = data.rows || [];
					// 过滤：dept_level >= 当前用户，且排除自身部门和集团级
					this.availableDepts = rows.filter(d =>
						d.dept_level >= this.currentDeptLevel &&
						d.dept_level > 0 &&
						d._id !== currentTenantId
					).sort((a, b) => (a.dept_level - b.dept_level) || (a.sort_num - b.sort_num));
				}
			});
		},

		handleVisibilityChange(val) {
			if (val !== 'targeted') {
				this.formValue.target_dept_ids = [];
			}
			this.emitValue();
		},

		handleTargetChange() {
			this.emitValue();
		},

		emitValue() {
			this.$emit('input', {
				visibility: this.formValue.visibility,
				target_dept_ids: this.formValue.target_dept_ids
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.visibility-setter {
	.el-checkbox-group {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.el-checkbox {
		margin-right: 0;
	}
	.no-dept-hint {
		color: #999;
		font-size: 13px;
		padding: 8px 0;
	}
}
</style>
