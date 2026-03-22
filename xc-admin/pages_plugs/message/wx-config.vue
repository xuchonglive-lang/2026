<template>
	<view class="page-body">
		<el-card shadow="never">
			<div slot="header"><span>微信服务号配置</span></div>
			<vk-data-form
				ref="form1"
				v-model="formData"
				:action="formAction"
				:columns="formColumns"
				:form-rules="formRules"
				label-width="160px"
			></vk-data-form>
		</el-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			formData: {},
			formAction: {
				save: {
					url: 'admin/message/sys/wxConfigSave',
					title: '提交',
					showCancel: false
				}
			},
			formColumns: [
				{ key: 'app_id', title: 'AppID', type: 'text', placeholder: '请输入微信服务号AppID' },
				{ key: 'app_secret', title: 'AppSecret', type: 'text', placeholder: '请输入微信服务号AppSecret' },
				{ key: 'token', title: 'Token', type: 'text', placeholder: '请输入微信服务号Token' },
				{ key: 'encoding_aes_key', title: 'EncodingAESKey', type: 'text', placeholder: '请输入消息加解密密钥（可选）' }
			],
			formRules: {
				app_id: [{ required: true, message: 'AppID不能为空', trigger: 'blur' }],
				app_secret: [{ required: true, message: 'AppSecret不能为空', trigger: 'blur' }]
			}
		};
	},
	mounted() {
		this.loadConfig();
	},
	methods: {
		loadConfig() {
			let vk = this.vk;
			vk.callFunction({
				url: 'admin/message/sys/wxConfigGet',
				data: {},
				success: (data) => {
					if (data && data._id) {
						this.formData = data;
					}
				}
			});
		}
	}
};
</script>

<style scoped>
.page-body {
	padding: 20px;
}
</style>
