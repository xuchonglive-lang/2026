# -*- coding: utf-8 -*-
import codecs, re

path = r'd:\AI project\2026\wenmingshengchan\mp-client\uni_modules\um-rich-editor\components\um-rich-editor\um-rich-editor.vue'
with codecs.open(path, 'r', 'utf-8') as f:
    text = f.read()

new_func = """uni.chooseImage({
					count: 1,
					success: (res) => {
						let file = res.tempFilePaths[0];
						uni.showLoading({ title: '上传中...', mask: true });
						uni.vk.callFunctionUtil.uploadFile({
							title: '富文本插图',
							file: file,
							needSave: true,
							success: (uploadRes) => {
								uni.hideLoading();
								this.editorCtx.insertImage({
									src: uploadRes.url,
									alt: '图像',
									width: '100%',
									height: 'auto',
									success: function() {}
								})
							},
							fail: () => {
								uni.hideLoading();
								uni.showToast({ title: '图片上传失败', icon: 'none' });
							}
						});
					}
				})
			}"""

text = re.sub(r'uni\.chooseImage\(\{[\s\S]*?upload img catch error[\s\S]*?\}\s*\)\s*\}\s*\)\s*\}', new_func, text)

with codecs.open(path, 'w', 'utf-8') as f:
    f.write(text)
print('Patch applied')
