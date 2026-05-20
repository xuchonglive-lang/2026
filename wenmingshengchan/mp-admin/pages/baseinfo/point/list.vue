<template>
  <view class="page-body">
    <view class="vk-list-view">
      <view class="vk-list-view-box">
        <!-- 搜索域 -->
        <vk-data-table-query v-model="queryForm1.formData" :columns="queryForm1.columns"
          @search="search"></vk-data-table-query>

        <!-- 核心操作 -->
        <view class="vk-table-button-box">
          <el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addBtn">添加作业点</el-button>
        </view>

        <!-- 主表展示 -->
        <vk-data-table ref="table1" :action="table1.action" :columns="table1.columns" :query-form-param="queryForm1"
          :right-btns="['detail_auto', 'update', 'delete']" :selection="true" :row-no="true" :pagination="true"
          @update="updateBtn" @delete="deleteBtn"></vk-data-table>
      </view>
    </view>

    <!-- 增改弹窗 -->
    <vk-data-dialog v-model="form1.props.show" :title="form1.props.title" width="600px" mode="form">
      <vk-data-form v-model="form1.data" :rules="form1.props.rules" :action="form1.props.action"
        :form-type="form1.props.formType" :columns="form1.props.columns" label-width="120px"
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
        action: "admin/base-point/sys/getList",
        columns: [

          { key: "name", title: "点位名称", type: "text", width: 250 },
          { key: "area_info.name", title: "所属区域", type: "text", width: 160, defaultValue: "未选区域" },
          { key: "dept_info.name", title: "责任小组", type: "text", width: 200, defaultValue: "未选小组" },
          {
            key: "status",
            title: "状态",
            type: "tag",
            width: 80,
            data: [
              { value: 1, label: '正常', tagType: 'success' },
              { value: 0, label: '禁用', tagType: 'danger' }
            ]
          },
          { key: "sort", title: "排序码", type: "number", width: 100, sortable: "custom" },
        ]
      },
      queryForm1: {
        formData: {},
        columns: [
          { key: "name", title: "点位名称", type: "text", mode: "%%", width: 180 },
          { key: "area_id", title: "按区域筛选", type: "select", mode: "=", data: [], props: { value: "_id", label: "name" }, width: 180 }
        ]
      },
      form1: {
        data: {},
        props: {
          action: "",
          title: "配置表单",
          formType: "",
          show: false,
          columns: [
            { key: "name", title: "点位名称", type: "text", placeholder: "请输入点位名称" },
            { key: "sort", title: "排序码", type: "number", placeholder: "数字越小越靠前", defaultValue: 0 },
            {
              key: "area_id",
              title: "业务区域",
              type: "select",
              data: [],
              props: { value: "_id", label: "name" },
              placeholder: "请选择所属的区域"
            },
            {
              key: "manager_dept_id",
              title: "责任小组",
              type: "cascader",
              data: [],
              props: { value: "_id", label: "name", children: "children", checkStrictly: true, emitPath: false },
              placeholder: "请选择责任小组"
            },
            { key: "status", title: "状  态", type: "radio", data: [{ value: 1, label: '正常' }, { value: 0, label: '禁用' }], defaultValue: 1 },
            { key: "remark", title: "备注信息", type: "textarea", placeholder: "备注信息" }
          ],
          rules: {
            name: [{ required: true, message: "点位名字不能为空", trigger: "blur" }],
            area_id: [{ required: true, message: "点位必须绑定到区域", trigger: "change" }]
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
      that.loadDict();
    },
    loadDict() {
      // 拉取系统内区域字典并强插至静态数组支撑 select 渲染
      vk.callFunction({
        url: "admin/base-area/sys/getAll",
        success: (data) => {
          let areaColIndex = vk.pubfn.getListIndex(that.form1.props.columns, "key", "area_id");
          if (areaColIndex > -1) {
            that.form1.props.columns[areaColIndex].data = data.rows || [];
          }
          let queryAreaColIndex = vk.pubfn.getListIndex(that.queryForm1.columns, "key", "area_id");
          if (queryAreaColIndex > -1) {
            that.queryForm1.columns[queryAreaColIndex].data = data.rows || [];
          }
        }
      });
      // 拉取组织架构级联树
      vk.callFunction({
        url: "admin/base-dept/sys/getTree",
        success: (data) => {
          let treeData = data.rows || [];
          let deptColIndex = vk.pubfn.getListIndex(that.form1.props.columns, "key", "manager_dept_id");
          if (deptColIndex > -1) {
            that.form1.props.columns[deptColIndex].data = treeData;
          }
        }
      });
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
      that.form1.props.action = "admin/base-point/sys/add";
      that.form1.props.formType = "add";
      that.form1.props.title = "录入作业点位";
      that.form1.props.show = true;
    },
    updateBtn({ item }) {
      that.form1.props.action = "admin/base-point/sys/update";
      that.form1.props.formType = "update";
      that.form1.props.title = "点位属性编辑";
      that.form1.data = vk.pubfn.copyObject(item);
      that.form1.props.show = true;
    },
    deleteBtn({ item, deleteFn }) {
      deleteFn({
        action: "admin/base-point/sys/delete",
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
