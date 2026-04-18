<template>
  <view class="page-body">
    <!-- 搜索部分 -->
    <vk-data-table-query
      v-model="queryForm1.formData"
      :columns="queryForm1.columns"
      @search="search"
      size="small"
    ></vk-data-table-query>

    <!-- 按钮区域 -->
    <view>
      <el-row class="vk-table-button-box">
        <!-- 为了稳妥执行防线，由后端负责外键聚合，目前本配置仅供阅读和基础添加 -->
        <el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addBtn">增设点位监督要求</el-button>
      </el-row>
    </view>

    <!-- 表格 -->
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

    <!-- 表单弹窗 -->
    <vk-data-dialog
      v-model="form1.props.show"
      :title="form1.props.title"
      width="600px"
      mode="form"
      :close-on-click-modal="false"
    >
      <vk-data-form
        v-model="form1.data"
        :rules="form1.props.rules"
        :action="form1.props.action"
        :form-type="form1.props.formType"
        :columns="form1.props.columns"
        label-width="120px"
        @success="
          form1.props.show = false;
          refresh();
        "
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
      queryForm1: {
        formData: {},
        columns: [
          { key: "point_id", title: "点位名称", type: "text", mode: "%%" }
        ]
      },
      table1: {
        action: "admin/feedback/sys/getConfigList",
        columns: [
          { key: "_id", title: "配置ID", type: "text", width: 180 },
          { key: "area_info.name", title: "属地网格", type: "text", width: 120 },
          { key: "point_info.name", title: "重控点名", type: "text", width: 140 },
          { key: "dept_info.name", title: "核签部门", type: "text", width: 140 },
          { 
            key: "require_shifts", 
            title: "要求的班次", 
            type: "html", 
            width: 120,
            formatter: (val) => {
               if(!val || val.length === 0) return "无";
               return val.map(s => s==='day'?"白班":"夜班").join(" / ");
            }
          },
          { 
            key: "status", 
            title: "启停状态", 
            type: "tag", 
            width: 80,
            dict: { 1: { label: "开启", type: "success" }, 0: { label: "停用", type: "danger" } }
          }
        ]
      },
      form1: {
        data: {},
        props: {
          action: "admin/feedback/sys/update", // 如果是编辑，将提交至通用的update
          columns: [
            { 
              key: "point_id", 
              title: "点位", 
              type: "table-select", 
              action: "template/db_api/sys/getList", // 应对应真实的点位列表
              columns: [{key: "name", title: "点名", nameKey:true}, {key: "_id", title: "ID", idKey:true}] 
            },
            { key: "area_id", title: "区域名", type: "text" },
            { key: "dept_id", title: "所属考勤部门", type: "text" },
            { key: "feedback_standard", title: "填报标准", type: "textarea", placeholder: "明确需要几张照片，哪些角度" },
            { 
              key: "require_shifts", 
              title: "生效班次", 
              type: "checkbox", 
              data: [ {value: "day", label: "白班"}, {value: "night", label: "夜班"} ] 
            },
            { 
              key: "status", 
              title: "状态", 
              type: "radio", 
              data: [ {value: 1, label: "开启"}, {value: 0, label: "作废"} ]
            }
          ],
          rules: {
            point_id: [{ required: true, message: "重控点必选", trigger: "blur" }],
            feedback_standard: [{ required: true, message: "标准不能缺席", trigger: "blur" }]
          },
          formType: "update",
          show: false,
          title: "配置重控点位"
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
    search() {
      that.$refs.table1.search();
    },
    refresh() {
      that.$refs.table1.refresh();
    },
    addBtn() {
      that.resetForm();
      // 这里必须依照避坑指南，如果表单有默认值或者空数组，在此强制下拨防止 resetForm 后坍塌
      that.form1.data.status = 1;
      that.form1.data.require_shifts = ["day", "night"];

      that.form1.props.action = "template/db_api/sys/add"; 
      // 实际上建议在后端提供真实的 admin/feedback/config/add
      that.form1.props.formType = "add";
      that.form1.props.title = "增配监控点位";
      that.form1.props.show = true;
    },
    updateBtn({ item }) {
      that.form1.props.action = "template/db_api/sys/update";
      that.form1.props.formType = "update";
      that.form1.props.title = "修定监督配置";
      that.form1.data = vk.pubfn.copyObject(item);
      that.form1.props.show = true;
    },
    deleteBtn({ item, deleteFn }) {
      // 坚守软删戒律！把表面的 delete 转为以 update 修改 is_del 标识
      that.vk.callFunction({
          url: "template/db_api/sys/update", // 走后端通用的update接口软封锁
          data: {
              dbName: "key-point-config",
              whereJson: { _id: item._id },
              dataJson: { is_del: 1 }
          },
          success: (res) => { that.refresh(); vk.toast("封停软删成功"); }
      });
    }
  }
};
</script>
