# -*- coding: utf-8 -*-
import codecs

path = r'd:\AI project\2026\wenmingshengchan\mp-client\uni_modules\um-rich-editor\components\um-rich-editor\um-rich-editor.vue'
with codecs.open(path, 'r', 'utf-8') as f:
    text = f.read()

# Find the start index of insertImage() {
start_idx = text.find("insertImage() {")
if start_idx != -1:
    # Find the end of the method, which is followed by } \n } \n </script>
    end_idx = text.find("</script>", start_idx)
    
    new_func = """insertImage() {
				uni.chooseImage({
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
			}
		}
	}
"""
    # Replace
    patched_text = text[:start_idx] + new_func + text[end_idx:]
    with codecs.open(path, 'w', 'utf-8') as f:
        f.write(patched_text)
    print("Replaced successfully via precise indexing!")
else:
    print("Failed to find insertImage")
