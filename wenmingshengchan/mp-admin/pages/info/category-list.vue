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
        >添加分类</el-button>
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
      :right-btns="['update', 'delete']"
      :selection="true"
      :row-no="true"
      :pagination="true"
      @update="updateBtn"
      @delete="deleteBtn"
    ></vk-data-table>
    <!-- 表格组件结束 -->

    <!-- 添加或编辑的弹窗开始 -->
    <vk-data-dialog
      v-model="form1.props.show"
      :title="form1.props.title"
      width="500px"
      mode="form"
      :close-on-click-modal="false"
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
        action: "admin/info/category/sys/getList",
        columns: [
          { key: "name", title: "分类名称", type: "text", width: 150 },
          { key: "sort", title: "排序", type: "number", width: 100 },
          {
            key: "status", title: "状态", type: "tag", width: 100, 
            data: [
              { value: 1, label: "正常", type: "success" },
              { value: 0, label: "禁用", type: "danger" }
            ]
          },
          { key: "_add_time", title: "添加时间", type: "time", width: 160, valueFormat: "yyyy-MM-dd hh:mm:ss" }
        ]
      },
      queryForm1: {
        formData: {},
        columns: [
          { key: "name", title: "分类名称", type: "text", width: 160, mode: "%%" },
          {
            key: "status", title: "状态", type: "select", width: 160,
            data: [
              { value: 1, label: "正常" },
              { value: 0, label: "禁用" }
            ]
          }
        ]
      },
      form1: {
        data: { sort: 0, status: 1 },
        props: {
          action: "",
          title: "",
          columns: [
            { key: "name", title: "分类名称", type: "text", placeholder: "请输入分类名称" },
            { key: "sort", title: "排序(越大约靠前)", type: "number", placeholder: "默认为0" },
            {
              key: "status", title: "状态", type: "radio",
              data: [
                { value: 1, label: "正常" },
                { value: 0, label: "禁用" }
              ]
            }
          ],
          rules: {
            name: [{ required: true, message: "分类名称不能为空", trigger: "blur" }]
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
      that.form1.props.action = "admin/info/category/sys/add";
      that.form1.props.formType = "add";
      that.form1.props.title = "添加分类";
      that.form1.props.show = true;
    },
    updateBtn({ item }) {
      that.form1.props.action = "admin/info/category/sys/update";
      that.form1.props.formType = "update";
      that.form1.props.title = "编辑分类";
      that.form1.props.show = true;
      that.form1.data = item;
    },
    deleteBtn({ item, deleteFn }) {
      deleteFn({
        action: "admin/info/category/sys/delete",
        data: { _id: item._id },
        refresh: true
      });
    }
  }
};
</script>
