<template>
  <view class="page-body">
    <!-- 表格搜索组件开始 -->
    <vk-data-table-query v-model="queryForm1.formData" :columns="queryForm1.columns" @search="search"
      size="small"></vk-data-table-query>
    <!-- 表格搜索组件结束 -->

    <!-- 表格组件开始 -->
    <vk-data-table ref="table1" size="small" :action="table1.action" :columns="table1.columns"
      :query-form-param="queryForm1" :right-btns="['detail']" :custom-right-btns="table1.customRightBtns" :row-no="true"
      :pagination="true" @detail="showDetail" @current-change="currentChange"
      @custom-right-btns="customRightBtns"></vk-data-table>
    <!-- 表格组件结束 -->

    <!-- 处理/回复抽屉 -->
    <el-drawer :title="form1.props.title" :visible.sync="form1.props.show" size="70%" direction="rtl"
      :destroy-on-close="true" :wrapperClosable="false">
      <div style="padding: 20px; overflow-y: auto;">
        <vk-data-form v-model="form1.data" :rules="form1.props.rules" :action="form1.props.action"
          :form-type="form1.props.formType" :columns="form1.props.columns" label-width="120px"
          @success="form1.props.show = false; refresh();"></vk-data-form>
      </div>
    </el-drawer>

    <!-- 转派弹窗 -->
    <vk-data-dialog v-model="form2.props.show" :title="form2.props.title" width="500px" mode="form"
      :close-on-click-modal="false">
      <vk-data-form v-model="form2.data" :rules="form2.props.rules" :action="form2.props.action"
        :form-type="form2.props.formType" :columns="form2.props.columns" label-width="120px"
        @success="form2.props.show = false; refresh();"></vk-data-form>
    </vk-data-dialog>

    <!-- 自定义详情和时间轴抽屉 -->
    <el-drawer title="工单处理详情" :visible.sync="detailDialog.show" size="70%" direction="rtl" append-to-body
      :destroy-on-close="true" :wrapperClosable="false">
      <div v-if="detailDialog.data"
        style="height: calc(100vh - 80px); overflow-y: auto; overflow-x: hidden; padding: 20px;">
        <h3 style="margin-bottom: 15px; color: #1f2937; border-left: 4px solid #3b82f6; padding-left: 10px;">基本信息</h3>
        <div
          style="background: #f3f4f6; border-radius: 8px; padding: 15px 20px 5px 20px; margin-bottom: 20px; font-size: 14px; color: #374151;">
          <el-row :gutter="20">
            <el-col :span="24" style="margin-bottom: 10px;">
              <span style="color: #6b7280; margin-right: 8px;">工单标题:</span>
              <span style="font-weight: bold; font-size: 16px; color: #111827;">{{ detailDialog.data.title }}</span>
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px;">
              <span style="color: #6b7280; margin-right: 8px;">当前状态:</span>
              <el-tag size="mini"
                :type="detailDialog.data.status === 0 ? 'danger' : (detailDialog.data.status === 1 ? 'primary' : (detailDialog.data.status === 2 ? 'info' : 'warning'))">
                {{ detailDialog.data.status === 0 ? '待处理' : (detailDialog.data.status === 1 ? '处理中' :
                  (detailDialog.data.status === 2 ? '已处置完成' : '已驳回')) }}
              </el-tag>
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px;">
              <span style="color: #6b7280; margin-right: 8px;">紧急程度:</span>
              <el-tag size="mini" :type="detailDialog.data.urgency === 1 ? 'danger' : 'info'" effect="plain">
                {{ detailDialog.data.urgency === 1 ? '紧急' : '常规' }}
              </el-tag>
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px;">
              <span style="color: #6b7280; margin-right: 8px;">提报人员:</span>
              <span style="color: #111827;">{{ detailDialog.data.user_name || '匿名' }}</span>
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px;">
              <span style="color: #6b7280; margin-right: 8px;">报备时间:</span>
              <span style="color: #111827;">{{ vk.pubfn.timeFormat(detailDialog.data._add_time, 'yyyy-MM-dd hh:mm:ss')
              }}</span>
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px;">
              <span style="color: #6b7280; margin-right: 8px;">所属部门:</span>
              <span style="color: #111827;">{{ detailDialog.data.dept_name || '未关联' }}</span>
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px;">
              <span style="color: #6b7280; margin-right: 8px;">作业区域:</span>
              <span style="color: #111827;">{{ detailDialog.data.area_name || '无' }}</span>
            </el-col>
            <el-col :span="12" style="margin-bottom: 10px;">
              <span style="color: #6b7280; margin-right: 8px;">作业点位:</span>
              <span style="color: #111827;">{{ detailDialog.data.point_name || '无' }}</span>
            </el-col>
          </el-row>
        </div>

        <div
          style="margin-bottom: 30px; padding: 20px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
          <div
            style="margin-bottom: 12px; font-weight: bold; color: #4b5563; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
            报备内容与图片：</div>
          <div v-html="detailDialog.data.content" class="rich-text-content"
            style="line-height: 1.8; color: #374151; overflow: hidden; width: 100%;"></div>
        </div>

        <div style="font-weight: bold; margin-bottom: 20px; color: #4b5563; font-size: 16px;">处理时间轴：</div>
        <el-timeline>
          <el-timeline-item :timestamp="vk.pubfn.timeFormat(detailDialog.data._add_time, 'yyyy-MM-dd hh:mm:ss')"
            placement="top" type="primary">
            <el-card shadow="hover">
              <h4 style="margin: 0 0 10px 0; color: #1f2937;">工单已提报</h4>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                用户 <span style="font-weight:bold;">{{ detailDialog.data.user_name }}</span> 提交了该隐患记录。
              </p>
            </el-card>
          </el-timeline-item>

          <el-timeline-item v-if="detailDialog.data.status !== 0 && detailDialog.data.reply_time"
            :timestamp="vk.pubfn.timeFormat(detailDialog.data.reply_time, 'yyyy-MM-dd hh:mm:ss')" placement="top"
            :type="detailDialog.data.status === 2 ? 'success' : (detailDialog.data.status === 3 ? 'danger' : 'warning')">
            <el-card shadow="hover">
              <h4 style="margin: 0 0 10px 0; color: #1f2937;">
                {{ detailDialog.data.status === 1 ? '工单正在处理中' : (detailDialog.data.status === 2 ? '报备已处置完成' :
                  '工单已被驳回/作废') }}
              </h4>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                管理员回复/批注：<span style="color: #111827;">{{ detailDialog.data.reply_content || '暂无批注' }}</span>
              </p>
            </el-card>
          </el-timeline-item>
        </el-timeline>

        <div style="margin-top: 30px; text-align: right; margin-bottom: 20px;">
          <el-button type="primary" @click="detailDialog.show = false">关 闭</el-button>
        </div>
      </div>
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
      queryForm1: {
        formData: {},
        columns: [
          { key: "title", title: "报备问题", type: "text", mode: "%%" },
          {
            key: "status", title: "当前状态", type: "select",
            data: [
              { value: 0, label: "待处理" },
              { value: 1, label: "处理中" },
              { value: 2, label: "已处置完成" },
              { value: 3, label: "已驳回" }
            ]
          },
          { key: "_add_time", title: "报备时间", type: "datetimerange", width: 400, mode: "[]" },
        ],
      },
      table1: {
        action: "admin/report/sys/getList",
        columns: [
          { key: "title", title: "报备问题", type: "text", width: 160 },
          {
            key: "urgency", title: "紧急度", type: "html", width: 80,
            formatter: (val, item) => {
              return val === 1 ? '<span style="color:red;font-weight:bold;">紧急</span>' : '<span style="color:#666;">常规</span>';
            }
          },
          { key: "area_name", title: "问题区域", type: "text", width: 120 },
          { key: "point_name", title: "问题点位", type: "text", width: 200 },
          { key: "dept_name", title: "用户部门", type: "text", width: 120 },
          { key: "user_name", title: "提报人", type: "text", width: 100, defaultValue: "匿名" },
          { key: "_add_time", title: "报备时间", type: "time", width: 160, valueFormat: "yyyy-MM-dd hh:mm:ss" },
          { key: "handle_dept_name", title: "责任单位", type: "text", width: 120, defaultValue: "-" },
          {
            key: "status", title: "状态", type: "tag", width: 100,
            data: [
              { value: 0, label: "待处理", type: "danger" },
              { value: 1, label: "处理中", type: "warning" },
              { value: 2, label: "已处置完成", type: "primary" },
              { value: 3, label: "已驳回", type: "info" }
            ]
          },

        ],
        customRightBtns: [
          {
            title: "处置",
            type: "success"
          }
        ],
      },
      form1: {
        data: {},
        props: {
          action: "admin/report/sys/replyAndFix",
          title: "处理与回复报备工单",
          formType: "update",
          columns: [
            { key: "_id", title: "工单ID", type: "text", show: false },
            {
              key: "status", title: "处理状态", type: "radio",
              data: [
                { value: 1, label: "纳入处理阶段" },
                { value: 2, label: "已解决(结案)" },
                { value: 3, label: "无法处理(驳回)" }
              ]
            },
            { key: "reply_content", title: "回复内容", type: "editor", placeholder: "请输入回复内容" }
          ],
          rules: {
            reply_content: [{ required: true, message: "回复内容不能为空", trigger: "blur" }],
            status: [{ required: true, message: "请选择变更状态", trigger: "change" }]
          },
          show: false,
        },
      },
      form2: {
        data: {},
        props: {
          action: "admin/report/sys/transferIssue",
          title: "报备工单跨部门转派",
          formType: "update",
          columns: [
            { key: "_id", title: "工单ID", type: "text", show: false },
            {
              key: "new_dept_id",
              title: "接收部门",
              type: "table-select",
              placeholder: "请选择接管部门",
              action: "template/db_api/sys/getList",
              data: { dbName: "base-dept" },
              columns: [
                { key: "name", title: "部门名称", type: "text", nameKey: true },
                { key: "_id", title: "部门ID", type: "text", idKey: true }
              ]
            }
          ],
          rules: {
            new_dept_id: [{ required: true, message: "接收部门不能为空", trigger: "change" }]
          },
          show: false,
        },
      },
      detailDialog: {
        show: false,
        data: null
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
      originalForms["form2"] = vk.pubfn.copyObject(that.form2);
    },
    search() {
      that.$refs.table1.search();
    },
    refresh() {
      that.$refs.table1.refresh();
    },
    currentChange(val) {
      that.table1.selectItem = val;
    },
    showDetail({ item }) {
      that.detailDialog.show = true;
      vk.callFunction({
        url: "admin/report/sys/getDetail",
        title: "加载详情中...",
        data: { report_id: item._id },
        success: (res) => {
          that.detailDialog.data = Object.assign({}, item, res.item);
        }
      });
    },
    customRightBtns(row, btn) {
      if (btn.title === "处置") {
        if (row.status === 2 || row.status === 3) {
          vk.toast('该工单已完结/作废，无法再处理');
          return;
        }
        that.form1.props.show = true;
        that.form1.data = {
          _id: row._id,
          status: 1
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page-body {}

/* 限制富文本内部图片宽度，防止被撑爆 */
::v-deep .rich-text-content img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}
</style>
