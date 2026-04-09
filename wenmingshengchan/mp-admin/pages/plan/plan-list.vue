<template>
  <view class="page-body">
    <!-- 表格搜索组件开始 -->
    <vk-data-table-query
      v-model="queryForm1.formData"
      :columns="queryForm1.columns"
      @search="search"
      size="small"
    ></vk-data-table-query>
    <!-- 表格搜索组件结束 -->

    <!-- 自定义按钮区域开始 -->
    <view>
      <el-row class="vk-table-button-box">
        <el-button
          type="success"
          size="small"
          icon="el-icon-circle-plus-outline"
          @click="addBtn"
        >新增日计划</el-button>
      </el-row>
    </view>
    <!-- 自定义按钮区域结束 -->

    <!-- 表格组件开始 -->
    <vk-data-table
      ref="table1"
      size="small"
      :action="table1.action"
      :columns="table1.columns"
      :query-form-param="queryForm1"
      :right-btns="['detail_auto', 'update', 'delete']"
      :selection="true"
      :row-no="true"
      :pagination="true"
      :default-sort="{ name: 'create_time', type: 'desc' }"
      @update="updateBtn"
      @delete="deleteBtn"
    ></vk-data-table>
    <!-- 表格组件结束 -->

    <!-- 添加或编辑的弹窗开始 -->
    <vk-data-dialog
      v-model="form1.props.show"
      :title="form1.props.title"
      width="700px"
      mode="form"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <vk-data-form
        v-model="form1.data"
        :rules="form1.props.rules"
        :action="form1.props.action"
        :form-type="form1.props.formType"
        :columns="form1.props.columns"
        label-width="100px"
        @success="form1.props.show = false; refresh();"
      ></vk-data-form>
    </vk-data-dialog>
    <!-- 添加或编辑的弹窗结束 -->
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
        action: "admin/plan/sys/getList",
        columns: [
          { key: "plan_date", title: "计划日期", type: "text", width: 110 },
          { key: "title", title: "计划标题", type: "text", minWidth: 200 },
          { key: "area_name", title: "执行区域", type: "text", width: 130 },
          { key: "dept_name", title: "所属部门", type: "text", width: 130 },
          { key: "issuer_name", title: "下达人", type: "text", width: 100 },
          {
            key: "display_status", title: "状态", type: "tag", width: 120,
            data: [
              { value: 1, label: "执行中", type: "" },
              { value: 2, label: "已提交", type: "info" },
              { value: 3, label: "未达标", type: "warning" },
              { value: 4, label: "超时未验收", type: "warning" },
              { value: 5, label: "已完成", type: "success" },
              { value: 6, label: "已逾期", type: "danger" }
            ]
          },
          { key: "feedback_count", title: "反馈数", type: "number", width: 80 },
          {
            key: "assignee_type", title: "派发方式", type: "tag", width: 100,
            data: [
              { value: "group", label: "按班组", type: "info" },
              { value: "users", label: "按个人", type: "" }
            ]
          },
          { key: "_add_time", title: "创建时间", type: "time", width: 160, valueFormat: "yyyy-MM-dd hh:mm:ss", sortable: "custom" }
        ]
      },
      queryForm1: {
        formData: {},
        columns: [
          { key: "plan_date", title: "计划日期", type: "date", width: 160, dateType: "date", valueFormat: "yyyy-MM-dd" },
          {
            key: "plan_date_start", title: "开始日期", type: "date", width: 140, dateType: "date", valueFormat: "yyyy-MM-dd"
          },
          {
            key: "plan_date_end", title: "结束日期", type: "date", width: 140, dateType: "date", valueFormat: "yyyy-MM-dd"
          },
          {
            key: "area_id", title: "执行区域", type: "remote-select", width: 160,
            action: "admin/base-area/sys/getAll",
            props: { list: "rows", value: "_id", label: "name" }
          },
          {
            key: "status", title: "状态", type: "select", width: 140,
            data: [
              { value: 1, label: "执行中" },
              { value: 2, label: "已提交" },
              { value: 3, label: "未达标" },
              { value: 5, label: "已完成" }
            ]
          }
        ]
      },
      form1: {
        data: { status: 1, assignee_type: "group", assignee_target: [] },
        props: {
          action: "",
          title: "",
          columns: [
            { key: "title", title: "计划标题", type: "text", placeholder: "请输入计划标题" },
            { key: "content_standard", title: "执行标准", type: "textarea", placeholder: "请输入具体执行要求与标准", maxlength: 1000, showWordLimit: true },
            {
              key: "area_id", title: "执行区域", type: "remote-select", placeholder: "请选择",
              action: "admin/base-area/sys/getAll",
              props: { list: "rows", value: "_id", label: "name" }
            },
            { key: "plan_date", title: "计划日期", type: "date", dateType: "date", valueFormat: "yyyy-MM-dd", placeholder: "请选择日期" },
            {
              key: "assignee_type", title: "派发方式", type: "radio",
              data: [
                { value: "group", label: "按班组" },
                { value: "users", label: "按个人" }
              ]
            },
            {
              key: "assignee_target", title: "执行班组", type: "remote-select", placeholder: "请选择班组",
              action: "admin/base-dept/sys/getAll",
              props: { list: "rows", value: "_id", label: "name" },
              multiple: true,
              showRule: "assignee_type==group"
            },
            {
              key: "assignee_target", title: "执行人", type: "remote-select", placeholder: "请选择人员",
              action: "admin/user/sys/getAll",
              props: { list: "rows", value: "_id", label: "real_name" },
              multiple: true,
              showRule: "assignee_type==users"
            }
          ],
          rules: {
            title: [{ required: true, message: "计划标题不能为空", trigger: "blur" }],
            content_standard: [{ required: true, message: "执行标准不能为空", trigger: "blur" }],
            area_id: [{ required: true, message: "请选择执行区域", trigger: "change" }],
            plan_date: [{ required: true, message: "请选择计划日期", trigger: "change" }],
            assignee_type: [{ required: true, message: "请选择派发方式", trigger: "change" }],
            assignee_target: [{ required: true, message: "请指定执行人", trigger: "change" }]
          },
          formType: "",
          show: false
        }
      }
    };
  },
  onLoad(options = {}) {
    that = this;
    vk = that.vk;
    originalForms["form1"] = vk.pubfn.copyObject(that.form1);
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
      that.form1.props.action = "admin/plan/sys/add";
      that.form1.props.formType = "add";
      that.form1.props.title = "新增日计划";
      // 防空洞：手动下发默认值（参照 development-gotchas.md 1.4）
      that.form1.data.status = 1;
      that.form1.data.assignee_type = "group";
      that.form1.data.assignee_target = [];
      that.form1.props.show = true;
    },
    updateBtn({ item }) {
      // 事实数据保护检查
      if (item.feedbacks && item.feedbacks.length > 0) {
        return vk.alert("该计划已有反馈数据，不可修改");
      }
      that.form1.props.action = "admin/plan/sys/update";
      that.form1.props.formType = "update";
      that.form1.props.title = "编辑日计划";
      that.form1.props.show = true;
      that.form1.data = vk.pubfn.copyObject(item);
    },
    deleteBtn({ item, deleteFn }) {
      if (item.feedbacks && item.feedbacks.length > 0) {
        return vk.alert("该计划已有反馈数据，不可删除");
      }
      deleteFn({
        action: "admin/plan/sys/delete",
        data: { _id: item._id },
        refresh: true
      });
    }
  }
};
</script>
