<template>
  <view class="page-body">
    <!-- 表格搜索组件开始 -->
    <vk-data-table-query
      v-model="queryForm1.formData"
      :columns="queryForm1.columns"
      @search="search"
      size="small"
    ></vk-data-table-query>

    <!-- 自定义按钮区域开始 -->
    <view>
      <el-row class="vk-table-button-box">
        <el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addBtn">下达重点项目</el-button>
      </el-row>
    </view>

    <!-- 万能表格组件开始 -->
    <vk-data-table
      ref="table1"
      size="small"
      :action="table1.action"
      :columns="table1.columns"
      :query-form-param="queryForm1"
      :right-btns="['detail', 'update']"
      :selection="true"
      :row-no="true"
      :pagination="true"
      @detail="onDetail"
      @update="updateBtn"
    >
      <template v-slot:right-btns="{ item }">
        <el-button 
          v-if="item.status === 1" 
          type="warning" 
          size="mini" 
          plain 
          icon="el-icon-s-check" 
          @click="openAudit(item)"
        >验收审核</el-button>
      </template>
    </vk-data-table>

    <!-- 审核弹窗 -->
    <el-dialog title="重点项目 - 结案验收" :visible.sync="auditDialog.show" width="500px" append-to-body>
      <el-form :model="auditDialog.form" label-width="80px">
        <el-form-item label="项目标题">
          <el-input v-model="auditDialog.data.title" disabled></el-input>
        </el-form-item>
        <el-form-item label="验收结论">
          <el-radio-group v-model="auditDialog.form.is_pass">
            <el-radio :label="true">验收通过 (结案归档)</el-radio>
            <el-radio :label="false">不达标 (发回重做)</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核批注意见" label-width="100px" style="margin-left: -20px;">
          <el-input type="textarea" v-model="auditDialog.form.audit_remark" :rows="3" placeholder="填写验收未通过的具体原因，或通过时的总结意见"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="auditDialog.show = false">取 消</el-button>
        <el-button type="primary" :loading="auditDialog.loading" @click="submitAudit">确 定 提 交</el-button>
      </span>
    </el-dialog>

    <!-- 添加或编辑的弹窗万能表单 -->
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
        @success="form1.props.show = false; refresh();"
      ></vk-data-form>
    </vk-data-dialog>

    <!-- 流转记录详情弹窗 -->
    <el-dialog title="重点项目全生命周期跟踪" :visible.sync="detailDialog.show" width="800px" append-to-body>
      <div v-loading="detailDialog.loading">
        <el-timeline v-if="detailDialog.feedbacks && detailDialog.feedbacks.length > 0">
          <el-timeline-item
            v-for="(fb, idx) in detailDialog.feedbacks"
            :key="idx"
            :timestamp="vk.pubfn.timeFormat(fb.create_time)"
            :type="fb.type === 3 ? 'danger' : (fb.type === 2 ? 'warning' : 'primary')"
          >
            <p><strong>{{ fb.user_info && fb.user_info[0] ? fb.user_info[0].nickname || fb.user_info[0].real_name : '系统' }}:</strong></p>
            <p style="margin-top: 5px; color: #666;">{{ fb.desc_content }}</p>
            <div style="margin-top: 10px;" v-if="fb.attachment_imgs && fb.attachment_imgs.length > 0">
              <el-image 
                v-for="(img, i) in fb.attachment_imgs" 
                :key="i" 
                :src="img" 
                :preview-src-list="fb.attachment_imgs"
                style="width: 80px; height: 80px; margin-right: 10px; border-radius: 4px;"
                fit="cover"
              ></el-image>
            </div>
          </el-timeline-item>
        </el-timeline>
        <div v-else style="text-align:center; color:#999; padding: 20px;">暂无任何流转记录</div>
      </div>
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
      table1: {
        action: "admin/keywork/sys/getAdminProjectList",
        columns: [
          { key: "_id", title: "记录ID", type: "text", width: 200 },
          { key: "title", title: "项目名称", type: "text", width: 160 },
          { key: "area_info[0].name", title: "归属区域", type: "text", width: 120 },
          { key: "point_info[0].name", title: "涉及点位", type: "text", width: 120 },
          { key: "create_user_info[0].real_name", title: "下达人", type: "text", width: 100 },
          { 
            key: "deadline", 
            title: "完成时限", 
            type: "time", 
            width: 140,
            format: "yyyy-MM-dd"
          },
          { 
            key: "status", 
            title: "当前状态", 
            type: "tag", 
            width: 100, 
            data: [
              { label: "进行中", value: 0, tagType: "info" },
              { label: "待验收", value: 1, tagType: "warning" },
              { label: "已归档", value: 2, tagType: "success" },
              { label: "被驳回", value: 3, tagType: "danger" }
            ]
          },
          { key: "_add_time", title: "立项时间", type: "time", width: 160 }
        ]
      },
      queryForm1: {
        formData: {},
        columns: [
          { key: "title", title: "项目名称", type: "text", mode: "%%" },
          { 
            key: "status", 
            title: "状态", 
            type: "select", 
            data: [
              { label: "进行中", value: 0 },
              { label: "待验收", value: 1 },
              { label: "已归档", value: 2 },
              { label: "被驳回", value: 3 }
            ]
          }
        ]
      },
      form1: {
        data: {},
        props: {
          action: "",
          formType: "",
          title: "重点项目",
          show: false,
          rules: {
            title: [{ required: true, message: "项目名称必填", trigger: "blur" }],
            assignee_uids: [{ required: true, message: "执行工人必选", trigger: "change" }]
          },
          columns: [
            { key: "title", title: "项目名称", type: "text" },
            { key: "standard_desc", title: "推进标准及要求", type: "textarea", rows: 4 },
            { 
              key: "area_id", title: "关联区域", type: "remote-select", 
              action: "admin/base-area/sys/getList", props: { list: "rows", value: "_id", label: "name" }, showAll: true 
            },
            { 
              key: "point_id", title: "关联点位", type: "remote-select", 
              action: "admin/base-point/sys/getList", props: { list: "rows", value: "_id", label: "name" }, showAll: true 
            },
            { 
              key: "assignee_uids", title: "指派执行人", type: "table-select", multiple: true,
              action: "admin/plan/sys/getAssigneeList", // 借用已有的选人接口
              searchColumns: [
                { key: "department_id", title: "选择部门", type: "cascader", action: "admin/base-dept/sys/getTree", props: { value: "_id", label: "name", children: "children", checkStrictly: true } },
                { key: "real_name", title: "姓名", type: "text", mode: "%%" }
              ],
              columns: [
                { key: "_id", title: "用户ID", type: "text", width: 220, idKey: true },
                { key: "real_name", title: "姓名", type: "text", width: 120, nameKey: true }
              ],
              props: { value: "_id", label: "real_name" }
            },
            { key: "deadline", title: "强制完成时限", type: "date", dateType: "datetime", valueFormat: "timestamp" }
          ]
        }
      },
      auditDialog: {
        show: false,
        loading: false,
        data: {},
        form: {
          is_pass: true,
          audit_remark: ''
        }
      },
      detailDialog: {
        show: false,
        loading: false,
        feedbacks: []
      }
    };
  },
  onLoad(options) {
    that = this;
    vk = that.vk;
    originalForms["form1"] = vk.pubfn.copyObject(that.form1);
  },
  methods: {
    search() {
      that.$refs.table1.search();
    },
    refresh() {
      that.$refs.table1.refresh();
    },
    resetForm() {
      vk.pubfn.resetForm(originalForms, that);
    },
    addBtn() {
      that.resetForm();
      that.form1.props.action = "admin/keywork/sys/createProject";
      that.form1.props.formType = "add";
      that.form1.props.title = "下达重点项目";
      that.form1.props.show = true;
    },
    updateBtn({ item }) {
      that.form1.props.action = "admin/keywork/sys/updateProject"; // 假设存在或使用框架通用更新
      that.form1.props.formType = "update";
      that.form1.props.title = "编辑重点项目";
      that.form1.data = item;
      that.form1.props.show = true;
    },
    openAudit(item) {
      this.auditDialog.data = item;
      this.auditDialog.form.is_pass = true;
      this.auditDialog.form.audit_remark = '';
      this.auditDialog.show = true;
    },
    submitAudit() {
      this.auditDialog.loading = true;
      vk.callFunction({
        url: "admin/keywork/sys/auditProjectResult",
        data: {
          project_id: this.auditDialog.data._id,
          is_pass: this.auditDialog.form.is_pass,
          audit_remark: this.auditDialog.form.audit_remark
        },
        success: (res) => {
          this.$message.success(res.msg || "审核完成");
          this.auditDialog.show = false;
          this.refresh();
        },
        complete: () => {
          this.auditDialog.loading = false;
        }
      });
    },
    onDetail({ item }) {
      this.detailDialog.show = true;
      this.detailDialog.loading = true;
      // 利用通用 select 查询从表过程记录
      vk.baseDao.selects({
        dbName: "key-project-process",
        whereJson: { project_id: item._id },
        sortArr: [{ name: "create_time", type: "desc" }],
        foreignDB: [
          { dbName: "uni-id-users", localKey: "operate_uid", foreignKey: "_id", as: "user_info", limit: 1 }
        ]
      }).then(res => {
        this.detailDialog.feedbacks = res.rows || [];
      }).finally(() => {
        this.detailDialog.loading = false;
      });
    }
  }
};
</script>

<style scoped>
.page-body {
  padding: 20px;
}
</style>
