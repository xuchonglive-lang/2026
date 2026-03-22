<template>
	<view class="login-page">
		<view class="login-card">
			<!-- Logo + 标题 -->
			<image class="login-logo" src="/static/logo.png" mode="aspectFit" />
			<text class="login-title">办公应用平台</text>
			<text class="login-subtitle">账号密码登录</text>

			<!-- 表单 -->
			<view class="login-form">
				<view class="input-group">
					<text class="input-label">用户名</text>
					<input
						class="input-field"
						v-model="form.username"
						placeholder="请输入用户名"
						placeholder-class="input-placeholder"
						:maxlength="30"
						@confirm="onLogin"
					/>
				</view>
				<view class="input-group">
					<text class="input-label">密码</text>
					<input
						class="input-field"
						v-model="form.password"
						type="password"
						placeholder="请输入密码"
						placeholder-class="input-placeholder"
						:maxlength="30"
						@confirm="onLogin"
					/>
				</view>
				<button
					class="login-btn"
					:class="{ 'is-loading': loading }"
					:disabled="loading"
					@click="onLogin"
				>
					<text v-if="loading" class="btn-text">登录中...</text>
					<text v-else class="btn-text">登 录</text>
				</button>
			</view>

			<!-- 提示 -->
			<text class="login-hint">测试账号：admin / 123456</text>
		</view>
	</view>
</template>

<script>
let vk;
export default {
	data() {
		return {
			form: {
				username: '',
				password: ''
			},
			loading: false
		};
	},
	onLoad() {
		vk = this.vk;
	},
	methods: {
		onLogin() {
			let that = this;
			let { username, password } = that.form;

			if (!username) {
				vk.toast('请输入用户名');
				return;
			}
			if (!password) {
				vk.toast('请输入密码');
				return;
			}

			that.loading = true;
			vk.userCenter.login({
				data: {
					username,
					password
				},
				success: (data) => {
					vk.toast('登录成功', 'success');
					// 通知打开登录页的页面（如有 eventChannel）
					try {
						const eventChannel = that.getOpenerEventChannel && that.getOpenerEventChannel();
						if (eventChannel) {
							eventChannel.emit('loginSuccess', data);
						}
					} catch (e) {}
					// 跳转首页
					setTimeout(() => {
						vk.navigateTo('/pages/index/index');
					}, 500);
				},
				fail: (err) => {
					vk.toast(err.msg || '登录失败');
				},
				complete: () => {
					that.loading = false;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.login-page {
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--color-bg-page);
	/* 极简底纹：微弱网格 */
	background-image:
		linear-gradient(rgba(15, 23, 42, 0.02) 1px, transparent 1px),
		linear-gradient(90deg, rgba(15, 23, 42, 0.02) 1px, transparent 1px);
	background-size: 48px 48px;
}

.login-card {
	background-color: var(--color-bg-card);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-lg);
	padding: 48px 40px 40px;
	box-shadow: var(--shadow-base);
	text-align: center;
	width: 380px;
	max-width: 90vw;
	animation: contentFadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes contentFadeInUp {
	0% { opacity: 0; transform: translateY(16px); }
	100% { opacity: 1; transform: translateY(0); }
}

.login-logo {
	width: 48px;
	height: 48px;
	margin-bottom: 16px;
}

.login-title {
	display: block;
	font-size: 22px;
	font-weight: 600;
	color: var(--color-text-primary);
	letter-spacing: -0.02em;
	margin-bottom: 4px;
}

.login-subtitle {
	display: block;
	font-size: 13px;
	color: var(--color-text-placeholder);
	margin-bottom: 32px;
}

/* === 表单 === */
.login-form {
	text-align: left;
}

.input-group {
	margin-bottom: 20px;
}

.input-label {
	display: block;
	font-size: 13px;
	font-weight: 500;
	color: var(--color-text-secondary);
	margin-bottom: 6px;
}

.input-field {
	width: 100%;
	height: 42px;
	padding: 0 14px;
	font-size: 14px;
	color: var(--color-text-primary);
	background-color: var(--color-bg-page);
	border: 1px solid var(--color-border);
	border-radius: var(--radius-sm);
	transition: border-color 0.2s, box-shadow 0.2s;
	box-sizing: border-box;
}

.input-field:focus {
	border-color: var(--color-primary);
	box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.06);
	outline: none;
}

.input-placeholder {
	color: var(--color-text-placeholder);
	font-size: 14px;
}

/* === 按钮 === */
.login-btn {
	width: 100%;
	height: 44px;
	margin-top: 8px;
	background-color: var(--color-primary);
	border: none;
	border-radius: var(--radius-sm);
	cursor: pointer;
	transition: all 0.15s ease;
	display: flex;
	align-items: center;
	justify-content: center;
}

.login-btn::after {
	border: none;
}

.login-btn:active {
	background-color: var(--color-primary-active);
	transform: scale(0.98);
}

.login-btn.is-loading {
	opacity: 0.7;
	cursor: not-allowed;
}

.btn-text {
	color: #FFFFFF;
	font-size: 15px;
	font-weight: 500;
	letter-spacing: 0.05em;
}

/* === 提示 === */
.login-hint {
	display: block;
	margin-top: 24px;
	font-size: 12px;
	color: var(--color-text-placeholder);
}
</style>
