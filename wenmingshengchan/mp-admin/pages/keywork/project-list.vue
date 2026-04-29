<template>
  <view class="page-body">
    <!-- 表格搜索组件开始 -->
    <vk-data-table-query v-model="queryForm1.formData" :columns="queryForm1.columns" @search="search"
      size="small"></vk-data-table-query>

    <!-- 自定义按钮区域开始 -->
    <view>
      <el-row class="vk-table-button-box">
        <el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addBtn">下达重点项目</el-button>
      </el-row>
    </view>

    <!-- 万能表格组件开始 -->
    <vk-data-table ref="table1" size="small" :action="table1.action" :columns="table1.columns"
      :query-form-param="queryForm1" :right-btns="['detail', 'update']" :selection="true" :row-no="true"
      :pagination="true" @detail="onDetail" @update="updateBtn">
      <template v-slot:right-btns="{ row }">
        <el-button v-if="row.status === 1" type="warning" size="mini" plain icon="el-icon-s-check"
          @click="openAudit(row)">验收审核</el-button>
      </template>
    </vk-data-table>

    <!-- 验收审核的高级表单弹窗 -->
    <vk-data-dialog v-model="form2.props.show" :title="form2.props.title" width="1200px" mode="form"
      :close-on-click-modal="false" :destroy-on-close="true">
      <vk-data-form v-model="form2.data" :rules="form2.props.rules" :action="form2.props.action"
        :form-type="form2.props.formType" :columns="form2.props.columns" label-width="120px"
        @success="form2.props.show = false; detailDialog.show = false; refresh();"></vk-data-form>
    </vk-data-dialog>

    <!-- 添加或编辑的弹窗万能表单 -->
    <vk-data-dialog v-model="form1.props.show" :title="form1.props.title" width="1200px" mode="form"
      :close-on-click-modal="false" :destroy-on-close="true">
      <vk-data-form v-model="form1.data" :rules="form1.props.rules" :action="form1.props.action"
        :form-type="form1.props.formType" :columns="form1.props.columns" label-width="120px"
        @success="form1.props.show = false; refresh();"></vk-data-form>
    </vk-data-dialog>

    <!-- 流转记录详情弹窗 -->
    <el-dialog title="重点项目全生命周期跟踪" :visible.sync="detailDialog.show" width="1200px" top="5vh" append-to-body>
      <div v-loading="detailDialog.loading" v-if="detailDialog.data"
        style="max-height: 75vh; overflow-y: auto; overflow-x: hidden; padding-right: 10px;">

        <!-- 进度条可视化区域 -->
        <div
          style="margin-bottom: 25px; padding: 25px 20px; background: #fff; border-radius: 8px; border: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <el-steps
            :active="detailDialog.data.status === 0 ? 1 : (detailDialog.data.status === 1 ? 2 : (detailDialog.data.status === 2 ? 4 : 2))"
            align-center :process-status="detailDialog.data.status === 3 ? 'error' : 'process'">
            <el-step title="立项下达" description="项目创建并指派"></el-step>
            <el-step title="实施推进" description="执行人提交流转"></el-step>
            <el-step title="结案验收" :description="detailDialog.data.status === 3 ? '验收被驳回' : '提交审核验收'"></el-step>
            <el-step title="归档完成" description="项目已达标闭环"></el-step>
          </el-steps>
        </div>

        <h3 style="margin-bottom: 15px; color: #1f2937; border-left: 4px solid #3b82f6; padding-left: 10px;">基本信息</h3>
        <div
          style="background: #f3f4f6; border-radius: 8px; padding: 15px 20px 5px 20px; margin-bottom: 20px; font-size: 14px; color: #374151;">
          <el-row :gutter="20">
            <el-col :span="24" style="margin-bottom: 10px;">
              <span style="color: #6b7280; margin-right: 8px;">项目标题:</span>
              <span style="font-weight: bold; font-size: 16px; color: #111827;">{{ detailDialog.data.title }}</span>
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px;">
              <span style="color: #6b7280; margin-right: 8px;">当前状态:</span>
              <el-tag size="mini"
                :type="detailDialog.data.status === 0 ? 'info' : (detailDialog.data.status === 1 ? 'warning' : (detailDialog.data.status === 2 ? 'success' : 'danger'))">
                {{ detailDialog.data.status === 0 ? '进行中' : (detailDialog.data.status === 1 ? '待验收' :
                  (detailDialog.data.status === 2 ? '已归档' : '被驳回')) }}
              </el-tag>
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px;">
              <span style="color: #6b7280; margin-right: 8px;">下达人:</span>
              <span style="color: #111827;">{{ detailDialog.data.create_user_info ?
                (detailDialog.data.create_user_info.real_name || detailDialog.data.create_user_info.nickname ||
                  detailDialog.data.create_user_info.username) : '管理员' }}</span>
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px;">
              <span style="color: #6b7280; margin-right: 8px;">立项时间:</span>
              <span style="color: #111827;">{{ vk.pubfn.timeFormat(detailDialog.data._add_time, 'yyyy-MM-dd hh:mm:ss')
                }}</span>
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px;">
              <span style="color: #6b7280; margin-right: 8px;">完成时限:</span>
              <span style="color: #111827;">{{ detailDialog.data.deadline ?
                vk.pubfn.timeFormat(detailDialog.data.deadline,
                  'yyyy-MM-dd hh:mm:ss') : '无限制' }}</span>
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px;">
              <span style="color: #6b7280; margin-right: 8px;">归属区域:</span>
              <span style="color: #111827;">{{ detailDialog.data.area_info ? detailDialog.data.area_info.name : '无'
                }}</span>
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px;">
              <span style="color: #6b7280; margin-right: 8px;">涉及点位:</span>
              <span style="color: #111827;">{{ detailDialog.data.point_info ? detailDialog.data.point_info.name : '无'
                }}</span>
            </el-col>
          </el-row>
        </div>

        <div
          style="margin-bottom: 30px; padding: 20px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
          <div
            style="margin-bottom: 12px; font-weight: bold; color: #4b5563; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
            推进标准及要求：</div>
          <div v-html="detailDialog.data.standard_desc || '暂无内容'" class="rich-text-content"
            style="line-height: 1.8; color: #374151; overflow: hidden; width: 100%;"></div>
        </div>

        <div style="font-weight: bold; margin-bottom: 20px; color: #4b5563; font-size: 16px;">处理时间轴：</div>
        <el-timeline>
          <!-- 兼容历史数据：如果流转记录中没有初始的立项记录，则用项目本身的创建时间兜底展示一条 -->
          <el-timeline-item
            v-if="!detailDialog.feedbacks.some(fb => fb.type === 0 || (fb.desc_content && fb.desc_content.includes('项目已下达')))"
            :timestamp="vk.pubfn.timeFormat(detailDialog.data._add_time, 'yyyy-MM-dd hh:mm:ss')" placement="top"
            type="primary">
            <div style="display: flex; align-items: flex-start; gap: 10px;">
              <el-avatar :size="32"
                :src="detailDialog.data.create_user_info ? detailDialog.data.create_user_info.avatar : ''"
                icon="el-icon-user-solid"></el-avatar>
              <div style="flex: 1;">
                <p style="margin: 0;"><strong>{{ detailDialog.data.create_user_info ?
                  (detailDialog.data.create_user_info.real_name || detailDialog.data.create_user_info.nickname ||
                    detailDialog.data.create_user_info.username) : '管理员' }}:</strong></p>
                <div style="margin-top: 8px; padding: 12px; background: #f3f4f6; border-radius: 6px; color: #374151;">
                  重点项目已下达，状态变为：进行中
                </div>
              </div>
            </div>
          </el-timeline-item>

          <el-timeline-item v-for="(fb, idx) in detailDialog.feedbacks" :key="idx"
            :timestamp="vk.pubfn.timeFormat(fb.create_time, 'yyyy-MM-dd hh:mm:ss')"
            :type="fb.type === 3 ? 'danger' : (fb.type === 2 ? 'warning' : 'primary')">
            <div style="display: flex; align-items: flex-start; gap: 10px;">
              <el-avatar :size="32" :src="fb._user_avatar" icon="el-icon-user-solid"></el-avatar>
              <div style="flex: 1;">
                <p style="margin: 0;"><strong>{{ fb._user_name }}:</strong></p>
                <div
                  class="rich-text-content"
                  style="margin-top: 8px; padding: 12px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; color: #374151; line-height: 1.6;"
                  v-html="fb.desc_content || '无文字描述'"></div>
                <div style="margin-top: 10px;" v-if="fb.attachment_imgs && fb.attachment_imgs.length > 0">
                  <el-image v-for="(img, i) in fb.attachment_imgs" :key="i" :src="img"
                    :preview-src-list="fb.attachment_imgs"
                    style="width: 80px; height: 80px; margin-right: 10px; border-radius: 4px;" fit="cover"></el-image>
                </div>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="detailDialog.data && detailDialog.data.status === 1" type="warning"
          @click="openAudit(detailDialog.data)" icon="el-icon-s-check">进入验收审批</el-button>
        <el-button type="primary" @click="detailDialog.show = false">关 闭</el-button>
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
          { key: "title", title: "项目名称", type: "text", width: 160 },
          { key: "area_info.name", title: "归属区域", type: "text", width: 120 },
          { key: "point_info.name", title: "涉及点位", type: "text", width: 120 },
          {
            key: "create_user_info",
            title: "下达人",
            type: "text",
            width: 100,
            formatter: function (val) {
              if (!val) return "-";
              return val.real_name || val.nickname || val.username || "-";
            }
          },
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
            { key: "standard_desc", title: "推进标准及要求", type: "custom", component: "custom-editor-tinymce", height: 600 },
            {
              key: "area_point_path", title: "关联区域点位", type: "cascader",
              action: "admin/base-area/sys/getTreeWithPoint",
              props: { value: "_id", label: "name", children: "children", checkStrictly: false }
            },
            {
              key: "assignee_uids", title: "指派执行人", type: "table-select", multiple: true,
              action: "admin/keywork/sys/getAssigneeList", // 使用重点工作专属选人接口
              queryColumns: [
                { key: "tree_node_id", title: "选择部门/小组", type: "cascader", action: "admin/base-dept/sys/getTree", props: { value: "_id", label: "name", children: "children", checkStrictly: true, emitPath: false } },
                { key: "real_name", title: "姓名", type: "text", mode: "%%" }
              ],
              columns: [
                { key: "mobile", title: "预留手机号", type: "text", width: 120 },
                {
                  key: 'avatar',
                  title: '头像',
                  type: 'avatar',
                  width: 80,
                  imageWidth: 40,
                  shape: 'circle',
                }, // circle 圆形 square 方形
                { key: "real_name", title: "姓名", type: "text", width: 120, nameKey: true }
              ],
              props: { value: "_id", label: "real_name" }
            },
            { key: "deadline", title: "强制完成时限", type: "date", dateType: "datetime", valueFormat: "timestamp" }
          ]
        }
      },
      form2: {
        data: {},
        props: {
          action: "admin/keywork/sys/auditProjectResult",
          title: "结案验收审核与评价",
          formType: "update",
          show: false,
          rules: {
            is_pass: [{ required: true, message: "请选择验收结论", trigger: "change" }],
            audit_remark: [{ required: true, message: "审核意见/情况描述不能为空", trigger: "blur" }]
          },
          columns: [
            { key: "_id", title: "项目ID", type: "text", show: false },
            {
              key: "is_pass", title: "最终验收结论", type: "radio",
              data: [
                { value: true, label: "✅ 验收通过达标 (结案归档)" },
                { value: false, label: "❌ 不达标打回 (发回重做)" }
              ]
            },
            { key: "audit_remark", title: "审核意见描述", type: "textarea", autosize: { minRows: 5, maxRows: 15 }, maxlength: 2000, placeholder: "在此输入验收批语、指导意见，或驳回需要整改的具体原因" },
            { key: "attachment_imgs", title: "上传佐证/截图", type: "image", limit: 6, tips: "可选：上传验收结果截图或文件照片作为归档佐证" }
          ]
        }
      },
      detailDialog: {
        show: false,
        loading: false,
        data: null,
        feedbacks: []
      }
    };
  },
  onLoad(options) {
    that = this;
    vk = that.vk;
    originalForms["form1"] = vk.pubfn.copyObject(that.form1);
    originalForms["form2"] = vk.pubfn.copyObject(that.form2);
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
      that.form1.props.action = "admin/keywork/sys/updateProject";
      that.form1.props.formType = "update";
      that.form1.props.title = "编辑重点项目";

      // 构建级联选择器所需的路径数组
      let editItem = vk.pubfn.copyObject(item);
      editItem.area_point_path = [];
      if (editItem.area_id) editItem.area_point_path.push(editItem.area_id);
      if (editItem.point_id) editItem.area_point_path.push(editItem.point_id);

      that.form1.data = editItem;
      that.form1.props.show = true;
    },
    openAudit(row) {
      this.form2.data = {
        _id: row._id,
        is_pass: true,
        audit_remark: '',
        attachment_imgs: []
      };
      this.form2.props.show = true;
    },
    onDetail({ item }) {
      this.detailDialog.data = item;
      this.detailDialog.show = true;
      this.detailDialog.loading = true;
      // 利用云函数获取流程记录
      vk.callFunction({
        url: "admin/keywork/sys/getProcessList",
        data: { project_id: item._id },
        success: (res) => {
          let rows = res.rows || [];
          rows = rows.map(fb => {
            let u = Array.isArray(fb.user_info) ? fb.user_info[0] : fb.user_info;
            fb._user_avatar = (u && u.avatar) ? u.avatar : '';
            fb._user_name = (u && (u.real_name || u.nickname || u.username)) ? (u.real_name || u.nickname || u.username) : '管理员';
            return fb;
          });
          this.detailDialog.feedbacks = rows;
        },
        complete: () => {
          this.detailDialog.loading = false;
        }
      });
    }
  }
};
</script>

<style scoped>
.page-body {
  padding: 20px;
}

/* 限制富文本内部图片宽度，防止被撑爆 */
::v-deep .rich-text-content img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}
</style>
