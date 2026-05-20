<template>
  <view class="page-body">
    <view>
      <el-row class="vk-table-button-box">
        <el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addBtn">新增班次配置</el-button>
      </el-row>
    </view>
    <vk-data-table ref="table1" size="small" :action="table1.action" :columns="table1.columns"
      :query-form-param="queryForm1" :right-btns="['update', 'delete']" :selection="false" :row-no="true"
      :pagination="true" @update="updateBtn" @delete="deleteBtn"></vk-data-table>

    <!-- 编辑卡点时间的弹窗 -->
    <vk-data-dialog v-model="form1.props.show" :title="form1.props.title" width="450px" mode="form"
      :close-on-click-modal="false">
      <vk-data-form v-model="form1.data" :rules="form1.props.rules" :action="form1.props.action"
        :form-type="form1.props.formType" :columns="form1.props.columns" label-width="120px" @success="
          form1.props.show = false;
        refresh();
        "></vk-data-form>
    </vk-data-dialog>

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
        columns: []
      },
      table1: {
        action: "admin/feedback/sys/getCronConfigList",
        columns: [
          {
            key: "shift_type", 
            title: "班次类型", 
            type: "tag", 
            width: 150,
            data: [
              { value: "day", label: "白班", tagType: "primary" },
              { value: "night", label: "夜班", tagType: "info" }
            ]
          },
          { key: "trigger_time", title: "任务自动派发时间", type: "text", width: 200 },
          { key: "feedback_start", title: "可反馈开始时间", type: "text", width: 150 },
          { key: "feedback_end", title: "可反馈截止时间", type: "text", width: 150 },
          { key: "update_time", title: "最近调整时间", type: "time", width: 200, valueFormat: "yyyy-MM-dd hh:mm:ss" }
        ]
      },
      form1: {
        data: {},
        props: {
          action: "admin/feedback/sys/updateCronConfig",
          columns: [
            {
              key: "shift_type",
              title: "班次",
              type: "select",
              data: [
                { value: "day", label: "白班 (day)" },
                { value: "night", label: "夜班 (night)" }
              ],
              placeholder: "请选择班次"
            },
            {
              key: "trigger_time",
              title: "派发时点",
              type: "time",
              format: "HH:mm",
              valueFormat: "HH:mm",
              placeholder: "请选择派发时点"
            },
            {
              key: "feedback_start",
              title: "反馈开始时间",
              type: "time",
              format: "HH:mm",
              valueFormat: "HH:mm",
              placeholder: "请选择开始时间"
            },
            {
              key: "feedback_end",
              title: "反馈截止时间",
              type: "time",
              format: "HH:mm",
              valueFormat: "HH:mm",
              placeholder: "请选择截止时间"
            }
          ],
          rules: {
            shift_type: [{ required: true, message: "请选择班次", trigger: "change" }],
            trigger_time: [{ required: true, message: "时点不能为空", trigger: "change" }],
            feedback_start: [{ required: true, message: "开始时间不能为空", trigger: "change" }],
            feedback_end: [{ required: true, message: "截止时间不能为空", trigger: "change" }]
          },
          formType: "update",
          show: false,
          title: "调整自动派发时点"
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
    resetForm() {
      vk.pubfn.resetForm(originalForms, that);
    },
    refresh() {
      that.$refs.table1.refresh();
    },
    addBtn() {
      that.resetForm();
      that.form1.props.action = "admin/feedback/sys/addCronConfig";
      that.form1.props.formType = "add";
      that.form1.props.title = "新增自动派发时点";
      // 对于新增，我们允许输入班次标识
      that.form1.props.columns[0].disabled = false;
      that.form1.props.show = true;
    },
    updateBtn({ item }) {
      // 打开弹窗前硬注入防穿透
      that.form1.props.action = "admin/feedback/sys/updateCronConfig";
      that.form1.props.formType = "update";
      that.form1.props.title = "调整自动派发时点";
      that.form1.data = vk.pubfn.copyObject(item);
      // 编辑时禁用班次标识的修改
      that.form1.props.columns[0].disabled = true;
      that.form1.props.show = true;
    },
    deleteBtn({ item }) {
      vk.callFunction({
        url: "admin/feedback/sys/deleteCronConfig",
        data: { _id: item._id },
        success: (res) => { that.refresh(); vk.toast("删除成功"); }
      });
    }
  }
};
</script>
