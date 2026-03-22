<template>
	<view class="page-body">
		<el-row :gutter="24">
			<!-- 左侧：iPhone 15 Pro Max 模拟器 -->
			<el-col :span="10">
				<div class="iphone-wrapper">
					<div class="iphone-frame">
						<!-- 状态栏（时间+灵动岛+信号 同一行） -->
					<div class="status-bar">
						<span class="status-time">15:52</span>
						<div class="dynamic-island"></div>
						<div class="status-icons">
							<svg class="status-icon" viewBox="0 0 18 12" width="18" height="12"><path d="M1 4.5C3.5 1.5 7 0 9 0s5.5 1.5 8 4.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 7C5.2 5 7 4 9 4s3.8 1 5.5 3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="10" r="1.5" fill="currentColor"/></svg>
							<svg class="status-icon" viewBox="0 0 24 12" width="24" height="12"><rect x="0" y="1" width="20" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.2"/><rect x="2" y="3" width="14" height="6" rx="1" fill="currentColor"/><rect x="21" y="4" width="2" height="4" rx="0.5" fill="currentColor"/></svg>
						</div>
					</div>
						<!-- 导航栏 -->
						<div class="wx-nav-bar">
							<svg class="nav-back" viewBox="0 0 24 24" width="20" height="20"><path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
							<span class="nav-title">公众号</span>
							<svg class="nav-more" viewBox="0 0 24 24" width="20" height="20"><circle cx="6" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="18" cy="12" r="1.5" fill="currentColor"/></svg>
						</div>
						<!-- 聊天区域 -->
						<div class="chat-area">
							<div class="chat-empty">
								<div class="chat-empty-icon">
									<svg viewBox="0 0 48 48" width="40" height="40"><path d="M24 4C12.95 4 4 11.16 4 20c0 5.08 3.04 9.6 7.78 12.54L10 40l8.73-4.36C20.44 35.88 22.18 36 24 36c11.05 0 20-7.16 20-16S35.05 4 24 4z" fill="none" stroke="#c8c8c8" stroke-width="2"/></svg>
								</div>
								<p class="chat-empty-text">菜单预览</p>
							</div>
						</div>
						<!-- 底部菜单栏 -->
						<div class="wx-menu-bar">
							<div
								class="menu-col"
								v-for="(item, i) in menu.buttons"
								:key="i"
							>
								<!-- 二级菜单弹出 -->
								<transition name="sub-pop">
									<div class="sub-popup" v-if="expandedIndex === i && item.subButtons && item.subButtons.length > 0">
										<div
											class="sub-item"
											v-for="(sub, k) in item.subButtons"
											:key="k"
											:class="{ 'is-selected': activeKey === i + '-' + k }"
											@click.stop="selectSubMenu(item, sub, i, k)"
										>{{ sub.name }}</div>
										<div class="sub-item sub-item--add" v-if="item.subButtons.length < 5" @click.stop="addSubMenu(item)">
											<i class="el-icon-plus"></i>
										</div>
									</div>
								</transition>
								<!-- 一级菜单 -->
								<div
									class="menu-item"
									:class="{ 'is-selected': activeKey === String(i) }"
									@click="selectMenu(i, item)"
								>{{ item.name }}</div>
							</div>
							<!-- 加号 -->
							<div class="menu-col" v-if="menu.buttons.length < 3">
								<div class="menu-item menu-item--add" @click="addMenu"><i class="el-icon-plus"></i></div>
							</div>
						</div>
						<!-- Home Indicator -->
						<div class="home-indicator-area">
							<div class="home-indicator"></div>
						</div>
					</div>
					<!-- 发布按钮 -->
					<div class="publish-bar">
						<el-button type="success" icon="el-icon-upload2" :loading="saving" @click="saveAndPublish" round>保存并发布至微信</el-button>
					</div>
				</div>
			</el-col>

			<!-- 右侧：配置面板 -->
			<el-col :span="14">
				<el-card shadow="never" class="config-card" v-if="tempObj">
					<div slot="header" class="config-header">
						<span class="config-title">{{ tempSelf.grand === '2' ? '编辑子菜单' : '编辑菜单' }}</span>
						<el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteCurrentMenu">删除当前菜单</el-button>
					</div>
					<el-form label-width="120px" size="small">
						<el-form-item label="菜单名称">
							<el-input v-model="tempObj.name" placeholder="请输入菜单名称" clearable maxlength="8" show-word-limit></el-input>
						</el-form-item>
						<el-form-item label="菜单内容">
							<el-radio-group v-model="tempObj.type">
								<el-radio label="view">跳转链接</el-radio>
								<el-radio label="click">发送关键词</el-radio>
								<el-radio label="miniprogram">小程序</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="跳转链接" v-if="tempObj.type === 'view'">
							<el-input v-model="tempObj.url" placeholder="请输入链接地址" clearable></el-input>
							<div class="form-tip">请输入完整 URL，如 https://example.com</div>
						</el-form-item>
						<el-form-item label="关键词" v-if="tempObj.type === 'click'">
							<el-input v-model="tempObj.key" placeholder="请输入关键词" clearable></el-input>
							<div class="form-tip">配合关键词自动回复消息使用</div>
						</el-form-item>
						<template v-if="tempObj.type === 'miniprogram'">
							<el-form-item label="小程序AppID">
								<el-input v-model="tempObj.appid" placeholder="请输入小程序的AppID" clearable></el-input>
							</el-form-item>
							<el-form-item label="页面路径">
								<el-input v-model="tempObj.pagepath" placeholder="如 pages/index/index" clearable></el-input>
							</el-form-item>
							<el-form-item label="备用链接">
								<el-input v-model="tempObj.url" placeholder="不支持小程序的旧版客户端将打开此链接" clearable></el-input>
							</el-form-item>
						</template>
					</el-form>
				</el-card>
				<el-card shadow="never" class="config-card config-card--empty" v-else>
					<div class="empty-hint">
						<i class="el-icon-s-operation"></i>
						<p>点击左侧菜单进行配置</p>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</view>
</template>

<script>
export default {
	data() {
		return {
			menu: {
				buttons: []
			},
			tempObj: null,
			tempSelf: {
				grand: '',
				index: -1,
				secondIndex: -1
			},
			activeKey: '',
			expandedIndex: -1,
			saving: false
		};
	},
	mounted() {
		this.loadMenu();
	},
	methods: {
		loadMenu() {
			this.vk.callFunction({
				url: 'admin/wx-push/sys/getMenuData',
				data: {},
				success: (data) => {
					if (data && data.selfmenu_info && data.selfmenu_info.button) {
						this.menu.buttons = data.selfmenu_info.button.map(btn => ({
							name: btn.name || '',
							type: btn.type || 'view',
							url: btn.url || '',
							key: btn.key || '',
							appid: btn.appid || '',
							pagepath: btn.pagepath || '',
							subButtons: (btn.sub_button && btn.sub_button.list || []).map(sub => ({
								name: sub.name || '',
								type: sub.type || 'view',
								url: sub.url || '',
								key: sub.key || '',
								appid: sub.appid || '',
								pagepath: sub.pagepath || ''
							}))
						}));
					}
				}
			});
		},
		selectMenu(index, item) {
			this.tempObj = item;
			this.tempSelf = { grand: '1', index, secondIndex: -1 };
			this.activeKey = String(index);
			this.expandedIndex = index;
		},
		selectSubMenu(parent, sub, parentIndex, subIndex) {
			this.tempObj = sub;
			this.tempSelf = { grand: '2', index: parentIndex, secondIndex: subIndex };
			this.activeKey = parentIndex + '-' + subIndex;
		},
		addMenu() {
			let idx = this.menu.buttons.length;
			this.menu.buttons.push({
				name: '菜单' + (idx + 1),
				type: 'view',
				url: '', key: '', appid: '', pagepath: '',
				subButtons: []
			});
		},
		addSubMenu(parentItem) {
			let idx = parentItem.subButtons.length;
			parentItem.subButtons.push({
				name: '子菜单' + (idx + 1),
				type: 'view',
				url: '', key: '', appid: '', pagepath: ''
			});
		},
		deleteCurrentMenu() {
			this.$confirm('确定删除当前菜单？', '提示', { type: 'warning' }).then(() => {
				if (this.tempSelf.grand === '1') {
					this.menu.buttons.splice(this.tempSelf.index, 1);
				} else if (this.tempSelf.grand === '2') {
					this.menu.buttons[this.tempSelf.index].subButtons.splice(this.tempSelf.secondIndex, 1);
				}
				this.tempObj = null;
				this.activeKey = '';
				this.expandedIndex = -1;
				this.$message({ type: 'success', message: '删除成功' });
			}).catch(() => {});
		},
		saveAndPublish() {
			let wxMenu = {
				button: this.menu.buttons.map(btn => {
					let item = { name: btn.name };
					if (btn.subButtons && btn.subButtons.length > 0) {
						item.sub_button = btn.subButtons.map(sub => {
							let subItem = { name: sub.name, type: sub.type || 'view' };
							if (sub.type === 'view') subItem.url = sub.url;
							if (sub.type === 'click') subItem.key = sub.key;
							if (sub.type === 'miniprogram') {
								subItem.appid = sub.appid;
								subItem.pagepath = sub.pagepath;
								subItem.url = sub.url;
							}
							return subItem;
						});
					} else {
						item.type = btn.type || 'view';
						if (btn.type === 'view') item.url = btn.url;
						if (btn.type === 'click') item.key = btn.key;
						if (btn.type === 'miniprogram') {
							item.appid = btn.appid;
							item.pagepath = btn.pagepath;
							item.url = btn.url;
						}
					}
					return item;
				})
			};
			this.saving = true;
			this.vk.callFunction({
				url: 'admin/wx-push/sys/updateMenuData',
				data: { menuData: wxMenu },
				success: (data) => {
					this.$message({ type: 'success', message: data.msg || '菜单发布成功' });
				},
				complete: () => {
					this.saving = false;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.page-body { padding: 20px; }

/* ====================================================
   iPhone 15 Pro Max — Pure CSS Mockup
   钛金属色边框 · Dynamic Island · Home Indicator
   ==================================================== */

.iphone-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.iphone-frame {
	position: relative;
	width: 320px;
	/* 顶部区域灰色，减轻视觉头重感 */
	background: #ededed;
	border-radius: 54px;
	padding: 12px;
	box-shadow:
		0 0 0 2px #8a8886,
		0 0 0 4px #a8a6a3,
		0 0 0 5px #c4c2bf,
		0 0 0 6px #78767380,
		0 20px 60px rgba(0,0,0,.25),
		0 8px 24px rgba(0,0,0,.15);

	&::before {
		content: '';
		position: absolute;
		top: 12px; left: 12px; right: 12px; bottom: 12px;
		border-radius: 44px;
		background: #ededed;
		z-index: 0;
	}
	> * { position: relative; z-index: 1; }
}

/* Dynamic Island */
.dynamic-island {
	width: 100px;
	height: 28px;
	background: #1a1a1a;
	border-radius: 20px;
	margin: 0;
	position: relative;
	z-index: 20;
	flex-shrink: 0;
	&::before {
		content: '';
		position: absolute;
		right: 28px; top: 50%;
		transform: translateY(-50%);
		width: 10px; height: 10px;
		border-radius: 50%;
		background: radial-gradient(circle at 35% 35%, #3a3a4e 0%, #2a2a32 60%);
		box-shadow: inset 0 0 2px rgba(255,255,255,.08);
	}
}

/* 状态栏 — 时间 | 灵动岛 | 信号电量 同一行 */
.status-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 20px 4px;
	height: 32px;
}
.status-time {
	font-size: 14px; font-weight: 600; color: #fff;
	color: #333;
	font-family: -apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif;
	letter-spacing: 0.5px;
}
.status-icons {
	display: flex; align-items: center; gap: 6px; color: #333;
}
.status-icon { display: block; }

/* 微信导航栏 */
.wx-nav-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 6px 16px 10px;
	background: #ededed;
	color: #333;
}
.nav-title {
	font-size: 17px; font-weight: 600; color: #333;
	letter-spacing: 0.5px;
	font-family: -apple-system, 'SF Pro Display', 'PingFang SC', sans-serif;
}
.nav-back, .nav-more { opacity: .7; cursor: default; }

/* 聊天区域 */
.chat-area {
	height: 510px;
	background: #ededed;
	border-radius: 2px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.chat-empty { text-align: center; }
.chat-empty-icon {
	width: 64px; height: 64px;
	margin: 0 auto 12px;
	background: rgba(0,0,0,.04);
	border-radius: 50%;
	display: flex; align-items: center; justify-content: center;
}
.chat-empty-text {
	font-size: 13px; color: #b0b0b0;
	font-family: -apple-system, 'PingFang SC', sans-serif;
}

/* 底部菜单栏 */
.wx-menu-bar {
	display: flex;
	background: #f7f7f7;
	border-top: 0.5px solid #d6d6d6;
}
.menu-col {
	flex: 1; position: relative;
	&::after {
		content: '';
		position: absolute; right: 0; top: 8px; bottom: 8px;
		width: 0.5px; background: #d6d6d6;
	}
	&:last-child::after { display: none; }
}
.menu-item {
	height: 50px; line-height: 50px;
	text-align: center; font-size: 14px; color: #333;
	cursor: pointer; user-select: none;
	font-family: -apple-system, 'PingFang SC', sans-serif;
	transition: all .2s cubic-bezier(.4,0,.2,1);
	overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
	padding: 0 4px;
	&:active { background: #e0e0e0; }
	&.is-selected {
		color: #07c160; font-weight: 600;
		background: rgba(7, 193, 96, .08);
		box-shadow: inset 0 -2.5px 0 #07c160;
	}
	&--add { color: #07c160; font-size: 20px; }
}

/* 二级菜单弹出 */
.sub-popup {
	position: absolute;
	bottom: 51px; left: -0.5px; right: -0.5px;
	background: rgba(247, 247, 247, .96);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border: 0.5px solid #d6d6d6;
	border-bottom: none;
	border-radius: 8px 8px 0 0;
	box-shadow: 0 -6px 20px rgba(0,0,0,.06);
	z-index: 10; overflow: hidden;
}
.sub-item {
	height: 44px; line-height: 44px;
	text-align: center; font-size: 13px; color: #444;
	border-bottom: 0.5px solid #e5e5e5;
	cursor: pointer;
	font-family: -apple-system, 'PingFang SC', sans-serif;
	transition: all .15s;
	&:last-child { border-bottom: none; }
	&:active { background: #e0e0e0; }
	&.is-selected {
		color: #07c160; font-weight: 600;
		background: rgba(7, 193, 96, .08);
	}
	&--add { color: #07c160; font-size: 16px; }
}

/* Home Indicator */
.home-indicator-area {
	height: 28px;
	background: #f7f7f7;
	display: flex; align-items: flex-end; justify-content: center;
	padding-bottom: 8px;
	border-radius: 0 0 34px 34px;
}
.home-indicator {
	width: 134px; height: 5px;
	border-radius: 3px; background: #333;
}

/* 弹出动画 */
.sub-pop-enter-active, .sub-pop-leave-active {
	transition: opacity .25s cubic-bezier(.4,0,.2,1), transform .25s cubic-bezier(.4,0,.2,1);
}
.sub-pop-enter, .sub-pop-leave-to {
	opacity: 0; transform: translateY(10px) scale(.98);
}

/* 发布按钮 */
.publish-bar { margin-top: 28px; text-align: center; }

/* 右侧配置面板 */
.config-card { min-height: 500px; border-radius: 12px; }
.config-header {
	display: flex; justify-content: space-between; align-items: center;
}
.config-title { font-size: 15px; font-weight: 600; }
.config-card--empty {
	display: flex; align-items: center; justify-content: center;
}
.empty-hint {
	text-align: center; color: #c0c0c0;
	i { font-size: 56px; }
	p { margin-top: 16px; font-size: 14px; }
}
.form-tip { font-size: 12px; color: #999; margin-top: 4px; }
</style>
