# -*- coding: utf-8 -*-
import codecs

path = r'd:\AI project\2026\wenmingshengchan\mp-client\uni_modules\um-rich-editor\components\um-rich-editor\um-rich-editor.vue'
with codecs.open(path, 'r', 'utf-8') as f:
    text = f.read()

start_idx = text.find("insertImage() {")
if start_idx != -1:
    end_idx = text.find("</script>", start_idx)
    
    new_func = """insertImage() {
				uni.showToast({ title: '正在调起相册...', icon: 'none' });
				uni.chooseImage({
					count: 1,
					success: (res) => {
						let file = res.tempFilePaths[0];
						uni.showLoading({ title: '正在上传...', mask: true });
						
						// 兼容判断 vk 对象
						let vkObj = uni.vk || getApp().globalData.vk || this.$vk;
						if (!vkObj) {
							uni.hideLoading();
							return uni.showModal({ content: '严重错误：未找到全局 vk 对象' });
						}

						vkObj.callFunctionUtil.uploadFile({
							title: '执行反馈截图',
							file: file,
							needSave: true,
							success: (uploadRes) => {
								uni.hideLoading();
								this.editorCtx.insertImage({
									src: uploadRes.url,
									alt: '图像',
									width: '100%',
									height: 'auto',
									success: function() {
										uni.showToast({ title: '插入成功', icon: 'success' });
									}
								})
							},
							fail: (err) => {
								uni.hideLoading();
								uni.showModal({ content: '上传失败: ' + JSON.stringify(err) });
							}
						});
					},
					fail: (err) => {
						uni.hideLoading();
						if (err.errMsg && (err.errMsg.indexOf('cancel') === -1)) {
							uni.showModal({ title: '相册唤起失败', content: JSON.stringify(err) });
						}
					}
				})
			}
		}
	}
"""
    patched_text = text[:start_idx] + new_func + text[end_idx:]
    with codecs.open(path, 'w', 'utf-8') as f:
        f.write(patched_text)
    print("Replaced insertImage with extreme diagnostics!")
