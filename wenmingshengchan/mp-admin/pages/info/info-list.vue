<template>
  <view class="page-body">
    <!-- 表格搜索组件开始 -->
    <vk-data-table-query v-model="queryForm1.formData" :columns="queryForm1.columns" @search="search"
      size="small"></vk-data-table-query>
    <!-- 表格搜索组件结束 -->

    <!-- 自定义按钮区域开始 -->
    <view>
      <el-row class="vk-table-button-box">
        <el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addBtn">发布信息</el-button>
      </el-row>
    </view>
    <!-- 自定义按钮区域结束 -->

    <!-- 表格组件开始 -->
    <vk-data-table ref="table1" size="small" :action="table1.action" :columns="table1.columns"
      :query-form-param="queryForm1" :right-btns="['update', 'delete']" :custom-right-btns="table1.customRightBtns"
      :selection="true" :row-no="true" :pagination="true" @update="updateBtn" @delete="deleteBtn"></vk-data-table>
    <!-- 表格组件结束 -->

    <!-- 添加或编辑的抽屉开始 -->
    <el-drawer :visible.sync="form1.props.show" :title="form1.props.title" size="75%" direction="rtl"
      :wrapperClosable="false" :destroy-on-close="true" append-to-body>
      <div style="padding: 20px; height: 100%; overflow-y: auto;">
        <vk-data-form v-model="form1.data" :rules="form1.props.rules" :action="form1.props.action"
          :form-type="form1.props.formType" :columns="form1.props.columns" label-width="100px"
          @success="form1.props.show = false; refresh();" @cancel="form1.props.show = false"></vk-data-form>
      </div>
    </el-drawer>
    <!-- 添加或编辑的抽屉结束 -->

    <!-- [增强功能区] 预览兼足迹监控超级抽屉 -->
    <el-drawer :visible.sync="showPreviewDialog" size="75%" direction="rtl" append-to-body>
      <div slot="title"
        style="text-align: center; font-size: 22px; font-weight: bold; letter-spacing: 1px; color: #1f2937;">
        {{ previewTitle }}
      </div>
      <scroll-view scroll-y style="height: 100%;">
        <!-- 正文呈现区 -->
        <view class="preview-container" v-html="previewContent"
          style="padding: 24px; line-height: 1.8; font-size: 16px; max-width: 900px; margin: 0 auto;"></view>

        <!-- 足迹排查区 -->
        <view
          style="max-width: 900px; margin: 40px auto 40px; padding: 24px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
          <view
            style="font-size: 18px; font-weight: bold; margin-bottom: 20px; display: flex; align-items: center; color: #0f172a;">
            <view style="width: 4px; height: 18px; background: #0050cb; margin-right: 10px; border-radius: 2px;"></view>
            调阅足迹雷达
          </view>

          <view style="margin-bottom: 15px;">
            <vk-data-table-query v-model="queryFormLog.formData" :columns="queryFormLog.columns"
              @search="() => { $refs.tableLogInside.search() }" size="small"></vk-data-table-query>
          </view>
          <vk-data-table v-if="showPreviewDialog" ref="tableLogInside" size="small" :action="tableLog.action"
            :columns="tableLog.columns" :query-form-param="queryFormLog" :right-btns="[]" :selection="false"
            :row-no="true" :pagination="true"></vk-data-table>
        </view>
      </scroll-view>
    </el-drawer>
  </view>
</template>

<script>
let that;
let vk = uni.vk;
let originalForms = {};

export default {
  data() {
    return {
      table1: {
        action: "admin/info/detail/sys/getList",
        columns: [
          { key: "category_info.name", title: "所属分类", type: "text", width: 120 },
          { key: "title", title: "文章标题", type: "text", width: 250 },
          { key: "user_info.real_name", title: "发布人", type: "text", width: 100, defaultValue: "系统管理员" },
          { key: "view_count", title: "阅读量", type: "number", width: 100 },
          { key: "is_top", title: "是否置顶", type: "switch", width: 80, onChange: (item) => { that.updateTop(item) } },
          {
            key: "status", title: "状态", type: "tag", width: 100,
            data: [
              { value: 1, label: "已发布", type: "success" },
              { value: 0, label: "草稿/下架", type: "danger" }
            ]
          },
          { key: "publish_time", title: "发布时间", type: "time", width: 160, valueFormat: "yyyy-MM-dd hh:mm:ss" }
        ],
        customRightBtns: [
          {
            title: "浏览文章",
            type: "info",
            onClick: function (item) {
              that.showPreview(item);
            }
          },
          {
            title: "上架下架",
            type: "warning",
            onClick: function (item) {
              that.updateStatus(item);
            }
          }
        ]
      },
      queryForm1: {
        formData: {},
        columns: [
          { key: "title", title: "标题搜索", type: "text", width: 160, mode: "%%" },
          {
            key: "category_id", title: "筛选分类", type: "remote-select", width: 160,
            action: "admin/info/category/sys/getSelect",
            showAll: true,
            props: { list: "rows", value: "value", label: "label" }
          },
          {
            key: "status", title: "状态", type: "select", width: 160,
            data: [
              { value: 1, label: "已发布" },
              { value: 0, label: "草稿/下架" }
            ]
          }
        ]
      },
      form1: {
        data: { status: 1, is_top: false, publish_time: Date.now(), cover_img: "", content: "" },
        props: {
          action: "",
          title: "",
          columns: [
            {
              key: "category_id", title: "选择分类", type: "remote-select", placeholder: "必选",
              action: "admin/info/category/sys/getSelect",
              showAll: true,
              props: { list: "rows", value: "value", label: "label" }
            },
            { key: "title", title: "文章标题", type: "text", placeholder: "请输入文章标题" },
            { key: "cover_img", title: "封面图片", type: "image", limit: 1, tips: "如果不传，系统自动抓取正文第一张图片" },
            {
              key: "summary",
              title: "内容摘要",
              type: "textarea",
              maxlength: 200,
              showWordLimit: true,
              placeholder: "请撰写内容提要（选填。若留空，系统发布时将自动截取正文做摘要）"
            },
            {
              key: "content",
              title: "文章正文",
              type: "custom",
              component: "custom-editor-tinymce",
              width: "100%",
              height: 500,
              placeholder: "开始输入正文..."
            },
            {
              key: "is_top", title: "置顶显示", type: "radio",
              data: [
                { value: true, label: "开启" },
                { value: false, label: "关闭" }
              ]
            },
            {
              key: "status", title: "发文状态", type: "radio",
              data: [
                { value: 1, label: "立即发布" },
                { value: 0, label: "存为草稿" }
              ]
            }
          ],
          rules: {
            title: [{ required: true, message: "标题不可为空", trigger: "blur" }],
            category_id: [{ required: true, message: "必须指派一个分类归属", trigger: "change" }]
          },
          formType: "",
          show: false
        }
      },
      // 增强变量槽
      showPreviewDialog: false,
      previewTitle: "",
      previewContent: "",

      showLogDialog: false,
      curArticleId: "",
      tableLog: {
        action: "admin/info/log/sys/getList",
        columns: [
          { key: "reader_department", title: "工作部室", type: "text", width: 160 },
          { key: "reader_real_name", title: "实际姓名", type: "text", width: 140 },
          { key: "read_time", title: "系统记录时印", type: "time", width: 180, valueFormat: "yyyy-MM-dd hh:mm:ss" }
        ]
      },
      queryFormLog: {
        formData: {},
        columns: [
          { key: "real_name", title: "查找访员(姓名)", type: "text", width: 140 }
        ]
      }
    };
  },
  onLoad(options = {}) {
    that = this;
    vk = that.vk;
    originalForms["form1"] = vk.pubfn.copyObject(that.form1);
  },
  watch: {
    "form1.data.content"(newVal) {
      if (newVal && !this.form1.data.cover_img) {
        // 尝试用正则匹配取出正文中插入的第一张带有 src 的图片链接
        const match = newVal.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (match && match[1]) {
          this.$set(this.form1.data, 'cover_img', match[1]);
        }
      }
    }
  },
  methods: {
    resetForm() {
      vk.pubfn.resetForm(originalForms, that);
    },
    search() {
      that.$refs.table1.search();
    },
    refresh() {
      that.$refs.table1.refresh();
    },
    addBtn() {
      that.resetForm();
      that.form1.props.action = "admin/info/detail/sys/add";
      that.form1.props.formType = "add";
      that.form1.props.title = "信息发布";
      that.form1.data.publish_time = Date.now(); // 发布时赋默认时间
      that.form1.props.show = true;
    },
    updateBtn({ item }) {
      that.form1.props.action = "admin/info/detail/sys/update";
      that.form1.props.formType = "update";
      that.form1.props.title = "编辑信息";
      that.form1.props.show = true;
      that.form1.data = item;
    },
    deleteBtn({ item, deleteFn }) {
      deleteFn({
        action: "admin/info/detail/sys/delete",
        data: { _id: item._id },
        refresh: true
      });
    },
    updateStatus(item) {
      let newStatus = item.status === 1 ? 0 : 1;
      let msg = newStatus === 1 ? "确定要上架此文章吗？" : "确定要下架此文章吗？";
      vk.confirm(msg, () => {
        vk.callFunction({
          url: "admin/info/detail/sys/updateStatus",
          data: { _id: item._id, status: newStatus },
          success: () => {
            vk.toast("操作成功");
            that.refresh();
          }
        });
      });
    },
    updateTop(item) {
      vk.callFunction({
        url: "admin/info/detail/sys/update",
        data: { _id: item._id, is_top: item.is_top },
        success: (data) => {
          vk.toast('操作成功', "success");
        }
      });
    },
    showPreview(item) {
      that.previewTitle = item.title;
      // 设置日志表格挂载参数
      if (!that.queryFormLog.formData) {
        that.$set(that.queryFormLog, 'formData', {});
      }
      that.$set(that.queryFormLog.formData, 'info_id', item._id);

      vk.callFunction({
        url: "admin/info/detail/sys/findById",
        data: { _id: item._id },
        success: (data) => {
          that.previewContent = data.item.content;
          that.showPreviewDialog = true;
          // 同时刷新底部的日志追踪台
          that.$nextTick(() => {
            if (that.$refs.tableLogInside) {
              that.$refs.tableLogInside.search();
            }
          });
        }
      });
    }
  }
};
</script>
