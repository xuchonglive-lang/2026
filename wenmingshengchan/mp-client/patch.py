# -*- coding: utf-8 -*-
import re, codecs

path = r'd:\AI project\2026\wenmingshengchan\mp-client\uni_modules\um-rich-editor\components\um-rich-editor\um-rich-editor.vue'
with codecs.open(path, 'r', 'utf-8') as f:
    text = f.read()

new_func = """insertImage() {
    uni.chooseImage({
        count: 1,
        success: (res) => {
            let file = res.tempFilePaths[0];
            uni.showLoading({ title: '上传中...', mask: true });
            uni.vk.callFunctionUtil.uploadFile({
                title: "富文本插图",
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

# Replace from insertImage() { up to the end of the success object
text = re.sub(r'insertImage\(\)\s*\{[\s\S]*?upload img catch error[\s\S]*?\}\)\s*\}\s*\n\s*\w*\s*\}\s*\}\)\s*\}', new_func, text)

with codecs.open(path, 'w', 'utf-8') as f:
    f.write(text)
print('Patch applied')
