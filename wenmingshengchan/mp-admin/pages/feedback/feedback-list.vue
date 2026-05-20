<template>
  <view class="page-body">
    <!-- 搜索部分 -->
    <vk-data-table-query v-model="queryForm1.formData" :columns="queryForm1.columns" @search="search"
      size="small"></vk-data-table-query>
    <!-- 按钮区域 -->
    <view>
      <el-row class="vk-table-button-box">
        <el-button type="danger" size="small" icon="el-icon-video-play"
          @click="forceGenerateTasks">强制派发测试任务(开发用)</el-button>
      </el-row>
    </view>

    <!-- 表格部分 -->
    <vk-data-table ref="table1" size="small" :action="table1.action" :columns="table1.columns"
      :query-form-param="queryForm1" :right-btns="['more']" :right-btns-more="table1.rightBtnsMore" :selection="true"
      :row-no="true" :pagination="true">
      <template v-slot:images="{ row }">
        <view style="display: flex; flex-wrap: wrap; gap: 4px; justify-content: center;">
          <image v-for="(img, idx) in getFormattedImages(row)" :key="idx" :src="img.url"
            style="width: 24px; height: 24px; border-radius: 4px; cursor: pointer; border: 1px solid #eee;" mode="aspectFill"
            @click.stop="openPreview(row, idx)"></image>
        </view>
      </template>
    </vk-data-table>

    <!-- 督导核查/留痕的弹窗 -->
    <vk-data-dialog v-model="form1.props.show" :title="form1.props.title" width="500px" mode="form"
      :close-on-click-modal="false">
      <vk-data-form v-model="form1.data" :rules="form1.props.rules" :action="form1.props.action"
        :form-type="form1.props.formType" :columns="form1.props.columns" label-width="100px" @success="
          form1.props.show = false;
        refresh();
        ">
        <template v-slot:images="{ form }">
          <view style="display: flex; flex-wrap: wrap; gap: 10px;">
            <view v-for="(imgItem, index) in form.images" :key="index"
              style="text-align: center; border: 1px solid #eee; padding: 4px; border-radius: 4px;">
              <view style="font-size: 12px; color: #666; margin-bottom: 4px; font-weight: bold;">{{ typeof imgItem ===
                'object' && imgItem !== null ? imgItem.title : '现场照片' }}</view>
              <image :src="typeof imgItem === 'object' && imgItem !== null ? imgItem.url : imgItem"
                style="width: 100px; height: 100px; border-radius: 4px;" mode="aspectFill"></image>
            </view>
          </view>
        </template>
      </vk-data-form>
    </vk-data-dialog>

    <!-- 自定义图片预览弹窗 (带文字蒙层) -->
    <el-dialog :visible.sync="previewDialog.show" width="800px" append-to-body :close-on-click-modal="true" title="现场反馈详情预览">
      <view v-if="previewDialog.currentImage" style="position: relative; width: 100%; min-height: 300px; background: #f5f7fa; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 8px;">
        <el-image :src="previewDialog.currentImage.url" 
               style="width: 100%; height: 65vh; display: block;" 
               fit="contain"
               :preview-src-list="previewDialog.images.map(img => img.url)">
        </el-image>
        
        <!-- 蒙版层 -->
        <view v-if="previewDialog.currentImage.content || (previewDialog.currentRow && previewDialog.currentRow.content)" 
              style="position: absolute; bottom: 0; left: 0; width: 100%; background: rgba(0, 0, 0, 0.65); color: #fff; padding: 15px; box-sizing: border-box; font-size: 14px; max-height: 40%; overflow-y: auto; line-height: 1.6;">
          <view style="font-weight: bold; margin-bottom: 5px; color: #409EFF;" v-if="previewDialog.currentImage.title">【{{ previewDialog.currentImage.title }}】</view>
          <view style="white-space: pre-wrap;">{{ previewDialog.currentImage.content || previewDialog.currentRow.content }}</view>
        </view>
      </view>
      
      <!-- 缩略图切换 -->
      <view v-if="previewDialog.images.length > 1" style="display: flex; justify-content: center; gap: 10px; margin-top: 15px; flex-wrap: wrap;">
        <image v-for="(img, idx) in previewDialog.images" :key="idx" :src="img.url" 
               style="width: 60px; height: 60px; border-radius: 4px; cursor: pointer; border: 2px solid transparent; transition: all 0.2s;"
               :style="{ borderColor: previewDialog.currentIndex === idx ? '#409EFF' : '#ddd', transform: previewDialog.currentIndex === idx ? 'scale(1.05)' : 'scale(1)' }"
               mode="aspectFill" @click="changePreview(idx)"></image>
      </view>
    </el-dialog>

  </view>
</template>

<script>
let that;
let vk = uni.vk;
let originalForms = {};

export default {
  data() {
    return {
      queryForm1: {
        formData: {},
        columns: [
          { key: "shift_date", title: "反馈记录日期", type: "date", mode: "=" },
          {
            key: "status",
            title: "反馈记录状态",
            type: "select",
            mode: "=",
            data: [
              { label: "待反馈[执行中]", value: 0 },
              { label: "完成反馈", value: 1 },
              { label: "反馈逾期", value: 2 }
            ]
          }
        ]
      },
      previewDialog: {
        show: false,
        images: [],
        currentIndex: 0,
        currentImage: null,
        currentRow: null
      },
      table1: {
        // 调用我们刚刚写好的 B端流水账专用下钻查询
        action: "admin/feedback/sys/getFeedbackList",
        columns: [
          { key: "area_name", title: "区域", type: "text", width: 140, defaultValue: "-", showOverflowTooltip: true, align: "center" },
          { key: "point_name", title: "点位", type: "text", width: 240, showOverflowTooltip: true, align: "center" },
          { key: "shift_date", title: "记录生成日期", type: "text", width: 120, sortable: true, align: "center" },
          {
            key: "shift_type",
            title: "班次",
            type: "tag",
            width: 80,
            align: "center",
            data: [
              { value: "day", label: "白班", tagType: "primary" },
              { value: "night", label: "夜班", tagType: "info" }
            ]
          },
          {
            key: "status",
            title: "反馈记录状态",
            type: "tag",
            width: 120,
            align: "center",
            data: [
              { value: 0, label: "待反馈[执行中]", tagType: "warning" },
              { value: 1, label: "完成反馈", tagType: "success" },
              { value: 2, label: "反馈逾期", tagType: "danger" }
            ]
          },
          { key: "assignee_names", title: "反馈任务责任人", type: "text", width: 180, defaultValue: "-", showOverflowTooltip: true, align: "center" },
          { key: "submit_user_info.real_name", title: "实际反馈人", type: "text", width: 100, defaultValue: "-", showOverflowTooltip: true, align: "center" },
          { key: "submit_time", title: "反馈时间", type: "time", width: 170, valueFormat: "yyyy-MM-dd hh:mm:ss", defaultValue: "-", align: "center" },
          {
            key: "images",
            title: "现场反馈照片",
            type: "text",
            width: 140,
            align: "center"
          },
          { key: "issuer_name", title: "任务安排人", type: "text", width: 100, defaultValue: "-", showOverflowTooltip: true, align: "center" }
        ],
        // 右侧展开操作
        rightBtnsMore: [
          {
            title: "录入定责违章",
            onClick: function (item) {
              if (item.status === 0) {
                vk.toast("尚未有人反馈，无法督导定责");
                return;
              }
              that.auditBtn(item);
            }
          }
        ]
      },
      form1: {
        data: {},
        props: {
          action: "admin/feedback/sys/auditFeedback", // 调用后端的核查微服务
          columns: [
            { key: "point_name_fake", title: "稽查标的", type: "text", disabled: true },
            {
              key: "images",
              title: "留档底单",
              type: "image",
              disabled: true,
              placeholder: "照片勘样"
            },
            {
              key: "audit_mark",
              title: "书面查处",
              type: "textarea",
              placeholder: "不改行原单形态（维持status），仅注入督办印记以供追溯",
              maxlength: 200
            }
          ],
          rules: {
            audit_mark: [{ required: true, message: "督查记号不能为空", trigger: "blur" }]
          },
          formType: "update",
          show: false,
          title: "定责与留痕督办"
        }
      }
    };
  },
  onLoad(options = {}) {
    that = this;
    vk = that.vk;
    that.init(options);
  },
  methods: {
    init(options) {
      originalForms["form1"] = vk.pubfn.copyObject(that.form1);
    },
    search() {
      that.$refs.table1.search();
    },
    refresh() {
      that.$refs.table1.refresh();
    },
    forceGenerateTasks() {
      vk.callFunction({
        url: 'client/timer/pub/generateFeedbackTasks',
        success: (res) => {
          vk.toast(res.msg || "触发完毕");
          console.log("强制触发结果：", res);
          that.refresh();
        }
      });
    },
    auditBtn(item) {
      that.vk.pubfn.resetForm(originalForms, that);
      that.form1.data = vk.pubfn.copyObject(item);
      that.form1.data.point_name_fake = item.point_info && item.point_info.name ? item.point_info.name : "未知重控点";
      let rawImages = item.images && item.images.length > 0 ? item.images : [item.main_image, ...(item.sub_images || [])].filter(Boolean);
      that.form1.data.images = rawImages;
      that.form1.props.show = true;
    },
    getFormattedImages(row) {
      let imgs = row.images && row.images.length > 0 ? row.images : [row.main_image, ...(row.sub_images || [])].filter(Boolean);
      return imgs.map(img => {
        if (typeof img === 'object' && img !== null) {
          return { 
            url: img.url, 
            title: img.title || '',
            content: img.content || '' 
          };
        }
        return { url: img, title: '', content: '' };
      });
    },
    openPreview(row, index) {
      let imgs = this.getFormattedImages(row);
      if (imgs.length === 0) return;
      this.previewDialog.images = imgs;
      this.previewDialog.currentIndex = index;
      this.previewDialog.currentImage = imgs[index];
      this.previewDialog.currentRow = row;
      this.previewDialog.show = true;
    },
    changePreview(index) {
      this.previewDialog.currentIndex = index;
      this.previewDialog.currentImage = this.previewDialog.images[index];
    }
  }
};
</script>

<style lang="scss" scoped>
.page-body {
  padding: 20px;
}

/* 修复 Element UI 表格固定列背景与阴影 */
::v-deep .el-table__fixed,
::v-deep .el-table__fixed-right {
  height: 100% !important;
  bottom: 0 !important;
  box-shadow: -6px 0 6px -4px rgba(0, 0, 0, 0.1);
}

/* 确保单元格内容垂直居中，但不强制行高 */
::v-deep .el-table .cell {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 24px; /* 匹配 24px 缩略图高度 */
}

/* 针对图片列的容器处理 */
::v-deep .el-table .cell .view {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
