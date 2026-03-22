<template>
  <view
    v-if="scene === 'form'"
    :style="{ width: widthCom }"
    class="cherry-editor-container"
  >
    <view v-if="!hasInit" v-loading="!hasInit" class="loading-box"></view>
    <view :id="editorId" class="cherry-editor-el"></view>
  </view>
  <view v-else-if="scene === 'table'" class="cherry-editor-table">
    {{ value }}
  </view>
  <view v-else-if="scene === 'detail'" class="cherry-editor-detail">
    <div v-html="previewHtml" :style="{ width: widthCom }"></div>
  </view>
</template>

<script>
/**
 * custom-editor-cherry Markdown 编辑器 - Cherry Markdown
 * 基于 Cherry Markdown 实现的 Markdown 编辑器
 * 从参考项目 xuchong-admin 移植，使用 window.Cherry（静态文件引入）
 */
export default {
  props: {
    value: { type: String, default: "" },
    column: { type: Object, default: () => ({}) },
    scene: { type: String, default: "form" },
    id: {
      type: String,
      default() {
        return (
          "cherry-editor-" +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + "")
        );
      },
    },
    placeholder: { type: String, default: "开始输入..." },
    width: { type: [Number, String], default: "auto" },
    height: { type: [Number, String], default: 500 },
    editorConfig: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      hasInit: false,
      editorId: this.id,
      cherry: null,
      previewHtml: "",
    };
  },
  mounted() {
    if (this.scene === "form") {
      this.init();
    }
  },
  destroyed() {
    if (this.cherry) {
      this.cherry.destroy();
    }
  },
  methods: {
    async init() {
      if (!window.Cherry) {
        for (let i = 0; i < 50; i++) {
          await uni.vk.pubfn.sleep(100);
          if (window.Cherry) break;
        }
      }
      if (!window.Cherry) {
        console.error("Cherry Markdown 未能加载");
        return;
      }
      this.$nextTick(() => {
        this.initEditor();
      });
    },
    initEditor() {
      const that = this;
      const el = document.getElementById(this.editorId);
      if (!el) {
        console.warn("未找到编辑器容器元素", this.editorId);
        return;
      }
      this.cherry = new window.Cherry({
        id: this.editorId,
        value: this.value,
        editor: {
          height: this.height + "px",
          defaultModel: "edit&preview",
        },
        callback: {
          afterChange: (markdown, html) => {
            if (markdown !== that.value) {
              that.$emit("input", markdown);
              that.$emit("change", markdown);
            }
          },
        },
        fileUpload: (file, type) => {
          return new Promise((resolve, reject) => {
            uni.vk.uploadFile({
              file,
              success: (res) => {
                resolve(res.fileURL);
              },
              fail: (err) => {
                reject(err.msg || "上传失败");
              },
            });
          });
        },
        ...this.editorConfig,
      });
      this.hasInit = true;
    },
  },
  watch: {
    value(val) {
      if (this.cherry && this.hasInit && val !== this.cherry.getValue()) {
        this.cherry.setValue(val || "");
      }
    },
  },
  computed: {
    widthCom() {
      const width = this.width;
      if (/^[\d]+(\.[\d]+)?$/.test(width)) {
        return `${width}px`;
      }
      return width;
    },
  },
};
</script>

<style scoped lang="scss">
.cherry-editor-container {
  position: relative;
}
.cherry-editor-el {
  min-height: 500px;
}
.loading-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #999999;
}
</style>
