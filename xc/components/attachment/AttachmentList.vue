<template>
  <section class="mb-12" v-if="attachments && attachments.length > 0">
    <div class="flex flex-col gap-3">
      <div v-for="(file, index) in attachments" :key="index"
           class="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-zinc-50 border border-zinc-200 rounded-xl hover:bg-zinc-100 transition-colors gap-4">
        <div class="flex items-start sm:items-center gap-4 min-w-0">
          <div class="w-10 h-10 rounded bg-white border border-zinc-200 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-zinc-500 font-light">{{ getIcon(file) }}</span>
          </div>
          <div class="min-w-0">
            <p class="text-[14px] font-bold text-zinc-900 truncate">{{ file.name || file.url.substring(file.url.lastIndexOf('/') + 1) }}</p>
            <p class="text-[12px] font-mono text-zinc-500 mt-1">
              <template v-if="file.size">{{ formatSize(file.size) }}</template>
              <template v-if="file.upload_time"> · {{ formatDate(file.upload_time) }}</template>
            </p>
          </div>
        </div>
        <button @click="downloadFile(file)" class="shrink-0 flex items-center justify-center px-4 py-2 bg-white text-zinc-900 border border-zinc-200 font-semibold text-[13px] rounded-md shadow-sm hover:bg-zinc-50 transition-colors w-full sm:w-auto">
           <span class="material-symbols-outlined text-[16px] mr-1.5">download</span> 下载
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AttachmentList',
  props: {
    attachments: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getIcon(file) {
      if (!file) return 'insert_drive_file';
      const name = (file.name || file.url || '').toLowerCase();
      if (name.endsWith('.pdf')) return 'picture_as_pdf';
      if (name.endsWith('.doc') || name.endsWith('.docx')) return 'description';
      if (name.endsWith('.xls') || name.endsWith('.xlsx')) return 'table_view';
      if (name.endsWith('.jpg') || name.endsWith('.png') || name.endsWith('.jpeg')) return 'image';
      if (name.endsWith('.mp4')) return 'play_circle';
      if (name.endsWith('.zip') || name.endsWith('.rar')) return 'folder_zip';
      return 'insert_drive_file';
    },
    formatSize(bytes) {
      if (!bytes) return '未知大小';
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / 1048576).toFixed(1) + ' MB';
    },
    formatDate(timestamp) {
        if (!timestamp) return '';
        const d = new Date(timestamp);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    },
    downloadFile(file) {
      if (!file.url) {
        uni.showToast({ title: '附件地址不存在', icon: 'none' });
        return;
      }
      uni.showLoading({ title: '准备下载...' });
      // H5 可以直接打开 url，小程序/App则使用 downloadFile 管理
      // #ifdef H5
      window.open(file.url, '_blank');
      uni.hideLoading();
      // #endif
      // #ifndef H5
      uni.downloadFile({
        url: file.url,
        success: (res) => {
          if (res.statusCode === 200) {
            uni.openDocument({
              filePath: res.tempFilePath,
              showMenu: true,
              success: function () {
                console.log('打开文档成功');
              }
            });
          }
        },
        complete: () => {
          uni.hideLoading();
        }
      });
      // #endif
    }
  }
}
</script>
