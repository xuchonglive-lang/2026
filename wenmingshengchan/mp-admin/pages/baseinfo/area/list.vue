<template>
  <view class="page-body">
    <view class="vk-list-view">
      <view class="vk-list-view-box">
        <vk-data-table-query v-model="queryForm1.formData" :columns="queryForm1.columns"
          @search="search"></vk-data-table-query>

        <view class="vk-table-button-box">
          <el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addBtn">添加业务区域</el-button>
        </view>

        <vk-data-table ref="table1" :action="table1.action" :columns="table1.columns" :query-form-param="queryForm1"
          :right-btns="['detail_auto', 'update', 'delete']" :selection="true" :row-no="true" :pagination="true"
          @update="updateBtn" @delete="deleteBtn"></vk-data-table>
      </view>
    </view>

    <!-- 弹窗 -->
    <vk-data-dialog v-model="form1.props.show" :title="form1.props.title" width="500px" mode="form">
      <vk-data-form v-model="form1.data" :rules="form1.props.rules" :action="form1.props.action"
        :form-type="form1.props.formType" :columns="form1.props.columns" label-width="110px"
        @success="onFormSuccess"></vk-data-form>
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
      table1: {
        action: "admin/base-area/sys/getList",
        columns: [

          { key: "name", title: "区域名称", type: "text", width: 140 },
          { key: "dept_info.name", title: "管辖部门", type: "text", width: 220, defaultValue: "未指派" },
          { key: "sort", title: "排序码", type: "number", width: 100, sortable: "custom" },
          {
            key: "status",
            title: "状态",
            type: "tag",
            width: 80,
            data: [
              { value: 1, label: '正常', tagType: 'success' },
              { value: 0, label: '禁用', tagType: 'danger' }
            ]
          }
        ]
      },
      queryForm1: {
        formData: {},
        columns: [
          { key: "name", title: "区域名称", type: "text", mode: "%%", width: 180 }
        ]
      },
      form1: {
        data: {},
        props: {
          action: "",
          title: "表单",
          formType: "",
          show: false,
          columns: [
            { key: "name", title: "区域名称", type: "text", placeholder: "请填入区域名称" },
            { key: "sort", title: "排序码", type: "number", placeholder: "数字越小越靠前", defaultValue: 0 },
            {
              key: "manager_dept_id",
              title: "管辖部门",
              type: "cascader",
              action: "admin/base-dept/sys/getTree",
              props: { value: "_id", label: "name", children: "children", checkStrictly: true, emitPath: false },
              placeholder: "请选择管辖部门"
            },
            { key: "status", title: "运营状态", type: "radio", data: [{ value: 1, label: '正常' }, { value: 0, label: '禁用' }], defaultValue: 1 },
            { key: "remark", title: "区域简述", type: "textarea" }
          ],
          rules: {
            name: [{ required: true, message: "区域名称不能为空", trigger: "blur" }]
          }
        }
      }
    };
  },
  onLoad(options = {}) {
    that = this;
    vk = that.vk;
    that.init();
  },
  methods: {
    init() {
      originalForms["form1"] = vk.pubfn.copyObject(that.form1);
    },
    search() {
      that.$refs.table1.search();
    },
    refresh() {
      that.$refs.table1.refresh();
    },
    addBtn() {
      vk.pubfn.resetForm(originalForms, that);
      that.form1.data.status = 1;
      that.form1.data.sort = 0;
      that.form1.props.action = "admin/base-area/sys/add";
      that.form1.props.formType = "add";
      that.form1.props.title = "添加操作";
      that.form1.props.show = true;
    },
    updateBtn({ item }) {
      that.form1.props.action = "admin/base-area/sys/update";
      that.form1.props.formType = "update";
      that.form1.props.title = "变更数据";
      that.form1.data = vk.pubfn.copyObject(item);
      that.form1.props.show = true;
    },
    deleteBtn({ item, deleteFn }) {
      deleteFn({
        action: "admin/base-area/sys/delete",
        data: { _id: item._id }
      });
    },
    onFormSuccess() {
      that.form1.props.show = false;
      that.refresh();
    }
  }
};
</script>
<style scoped></style>
