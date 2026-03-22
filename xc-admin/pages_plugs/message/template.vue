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
			<el-button type="primary" size="small" icon="el-icon-plus" @click="addTemplate">新增模板</el-button>
		</div>

		<!-- 表格 -->
		<vk-data-table
			ref="table1"
			:action="table1.action"
			:columns="table1.columns"
			:query-form-param="queryForm1"
			:right-btns="['update', 'delete']"
			:row-no="true"
			:pagination="true"
			@update="editTemplate"
		></vk-data-table>

		<!-- 新增/编辑弹窗 -->
		<vk-data-dialog
			v-model="formDialog.show"
			:title="formDialog.mode === 'add' ? '新增模板' : '编辑模板'"
			width="600px"
			mode="form"
		>
			<el-form ref="templateForm" :model="formDialog.data" :rules="formRules" label-width="120px">
				<el-form-item label="模板名称" prop="name">
					<el-input v-model="formDialog.data.name" placeholder="如：新课程发布通知"></el-input>
				</el-form-item>
				<el-form-item label="业务类型" prop="biz_type">
					<el-input v-model="formDialog.data.biz_type" placeholder="如：training/work/info/system"></el-input>
				</el-form-item>
				<el-form-item label="微信模板ID">
					<el-input v-model="formDialog.data.wx_template_id" placeholder="在微信公众号后台获取"></el-input>
				</el-form-item>
				<el-form-item label="标题模板">
					<el-input v-model="formDialog.data.title_template" :placeholder="'支持{{变量名}}，如：新课程：{{course_name}}'"></el-input>
				</el-form-item>
				<el-form-item label="内容模板">
					<el-input type="textarea" v-model="formDialog.data.content_template" :rows="4" :placeholder="'支持{{变量名}}占位符'"></el-input>
				</el-form-item>
				<el-form-item label="跳转URL模板">
					<el-input v-model="formDialog.data.url_template" :placeholder="'如：/pages/training/video-detail?id={{course_id}}'"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="formDialog.data.status">
						<el-radio :label="1">启用</el-radio>
						<el-radio :label="0">停用</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div style="text-align: right; margin-top: 16px;">
				<el-button size="small" @click="formDialog.show = false">取消</el-button>
				<el-button type="primary" size="small" :loading="formDialog.loading" @click="submitTemplate">确认</el-button>
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
					{ key: 'name', title: '模板名称', type: 'text', placeholder: '搜索模板名称' },
					{ key: 'biz_type', title: '业务类型', type: 'text', placeholder: '搜索业务类型' }
				]
			},
			table1: {
				action: 'admin/message/sys/templateGetList',
				columns: [
					{ key: 'name', title: '模板名称', type: 'text', width: 200 },
					{ key: 'biz_type', title: '业务类型', type: 'text', width: 120 },
					{ key: 'wx_template_id', title: '微信模板ID', type: 'text', width: 200 },
					{ key: 'title_template', title: '标题模板', type: 'text', width: 200 },
					{ key: 'content_template', title: '内容模板', type: 'text', showOverflowTooltip: true },
					{
						key: 'status', title: '状态', type: 'tag', width: 80,
						data: [
							{ value: 1, label: '启用', type: 'success' },
							{ value: 0, label: '停用', type: 'info' }
						]
					},
					{ key: 'created_at', title: '创建时间', type: 'time', width: 160 }
				]
			},
			formDialog: {
				show: false,
				loading: false,
				mode: 'add',
				data: {
					name: '',
					biz_type: '',
					wx_template_id: '',
					title_template: '',
					content_template: '',
					url_template: '',
					status: 1
				}
			},
			formRules: {
				name: [{ required: true, message: '模板名称不能为空', trigger: 'blur' }],
				biz_type: [{ required: true, message: '业务类型不能为空', trigger: 'blur' }]
			}
		};
	},
	methods: {
		search() {
			this.$refs.table1.search();
		},
		addTemplate() {
			this.formDialog.mode = 'add';
			this.formDialog.data = {
				name: '', biz_type: '', wx_template_id: '',
				title_template: '', content_template: '', url_template: '', status: 1
			};
			this.formDialog.show = true;
		},
		editTemplate(row) {
			this.formDialog.mode = 'update';
			this.formDialog.data = { ...row };
			this.formDialog.show = true;
		},
		submitTemplate() {
			this.$refs.templateForm.validate((valid) => {
				if (!valid) return;
				this.formDialog.loading = true;
				let url = this.formDialog.mode === 'add'
					? 'admin/message/sys/templateAdd'
					: 'admin/message/sys/templateUpdate';

				this.vk.callFunction({
					url,
					data: this.formDialog.data,
					success: (data) => {
						this.vk.toast(data.msg || '操作成功', 'success');
						this.formDialog.show = false;
						this.$refs.table1.refresh();
					},
					complete: () => {
						this.formDialog.loading = false;
					}
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
