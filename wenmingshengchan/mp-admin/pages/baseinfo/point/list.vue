<template>
  <view class="page-body">
    <view class="vk-list-view">
      <view class="vk-list-view-box">
        <!-- 搜索域 -->
        <vk-data-table-query
          v-model="queryForm1.formData"
          :columns="queryForm1.columns"
          @search="search"
        ></vk-data-table-query>
        
        <!-- 核心操作 -->
        <view class="vk-table-button-box">
          <el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addBtn">添加作业点</el-button>
        </view>

        <!-- 主表展示 -->
        <vk-data-table
          ref="table1"
          :action="table1.action"
          :columns="table1.columns"
          :query-form-param="queryForm1"
          :right-btns="['detail_auto', 'update', 'delete']"
          :selection="true"
          :row-no="true"
          :pagination="true"
          @update="updateBtn"
          @delete="deleteBtn"
        ></vk-data-table>
      </view>
    </view>

    <!-- 增改弹窗 -->
    <vk-data-dialog
      v-model="form1.props.show"
      :title="form1.props.title"
      width="600px"
      mode="form"
    >
      <vk-data-form
        v-model="form1.data"
        :rules="form1.props.rules"
        :action="form1.props.action"
        :form-type="form1.props.formType"
        :columns="form1.props.columns"
        label-width="120px"
        @success="onFormSuccess"
      ></vk-data-form>
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
          { key: "_id", title: "识别码", type: "text", width: 220 },
          { key: "name", title: "点位名称", type: "text", width: 140 },
          { key: "area_info.name", title: "所属区域", type: "text", width: 160, defaultValue: "未选区域" },
          { key: "dept_info.name", title: "网格责任小队", type: "text", width: 160, defaultValue: "按区域继承" },
          { 
            key: "status", 
            title: "状态", 
            type: "tag", 
            width: 80, 
            data: [
              {value:1, label:'正常', tagType: 'success'},
              {value:0, label:'禁用', tagType: 'danger'}
            ] 
          }
        ]
      },
      queryForm1: {
        formData: {},
        columns: [
          { key: "name", title: "搜点位名", type: "text", mode: "%%", width: 180 }
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
            { key: "name", title: "点位名称", type: "text", placeholder: "请填入精准定位物标识" },
            { 
              key: "area_id", 
              title: "业务区域", 
              type: "select", 
              data: [], 
              props: { value: "_id", label: "name" },
              placeholder: "请选择其所属的物理作业区" 
            },
            { 
              key: "manager_dept_id", 
              title: "网格责任组", 
              type: "cascader", 
              action: "admin/base-dept/sys/getTree",
              props: { value: "_id", label: "name", children: "children", checkStrictly: true, emitPath: false },
              placeholder: "强制绑定组织内小队"
            },
            { key: "status", title: "活跃状态", type: "radio", data: [{value:1, label:'正常'},{value:0, label:'禁用'}], defaultValue: 1 },
            { key: "remark", title: "防患提示指令", type: "textarea", placeholder: "安全防患作业提醒标准" }
          ],
          rules: {
            name: [{ required: true, message: "定位名不可为空", trigger: "blur" }],
            area_id: [{ required: true, message: "必须绑定到物理区域基地", trigger: "change" }]
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
      that.loadAreaDict();
    },
    loadAreaDict() {
      // 拉取系统内区域字典并强插至静态数组支撑 select 渲染
      vk.callFunction({
        url: "admin/base-area/sys/getAll",
        success: (data) => {
          let areaColIndex = vk.pubfn.getListIndex(that.form1.props.columns, "key", "area_id");
          if (areaColIndex > -1) {
            that.form1.props.columns[areaColIndex].data = data.rows || [];
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
<style scoped>
</style>
