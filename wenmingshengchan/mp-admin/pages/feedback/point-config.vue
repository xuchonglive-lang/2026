<template>
  <view class="page-body">
    <!-- 搜索部分 -->
    <vk-data-table-query v-model="queryForm1.formData" :columns="queryForm1.columns" @search="search"
      size="small"></vk-data-table-query>

    <!-- 按钮区域 -->
    <view>
      <el-row class="vk-table-button-box">
        <!-- 为了稳妥执行防线，由后端负责外键聚合，目前本配置仅供阅读和基础添加 -->
        <el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addBtn">增设点位监督要求</el-button>
      </el-row>
    </view>

    <!-- 表格 -->
    <vk-data-table ref="table1" size="small" :action="table1.action" :columns="table1.columns"
      :query-form-param="queryForm1" :right-btns="['detail', 'update', 'delete']"
      :custom-right-btns="table1.customRightBtns" :selection="true" :row-no="true" :pagination="true" @detail="onDetail"
      @update="updateBtn" @delete="deleteBtn" @custom-right-btns="customRightBtns">

      <template v-slot:assignee_info="{ row }">
        <el-link type="primary" :underline="false" @click="showAssigneeTable(row)" style="font-size: 13px;">
          <template v-if="row.assignee_info && row.assignee_info.length > 0">
            {{row.assignee_info.map(u => u.real_name || u.nickname || '未名').join('、')}}
          </template>
          <template v-else>
            <span style="color: #909399;">暂无人员</span>
          </template>
        </el-link>
      </template>

    </vk-data-table>

    <!-- 表单弹窗 -->
    <vk-data-dialog v-model="form1.props.show" :title="form1.props.title" width="900px" mode="form"
      :close-on-click-modal="false">
      <vk-data-form v-model="form1.data" :rules="form1.props.rules" :action="form1.props.action"
        :form-type="form1.props.formType" :columns="form1.props.columns" label-width="120px" @success="
          form1.props.show = false;
        refresh();
        "></vk-data-form>
    </vk-data-dialog>

    <!-- 配置新增人员弹窗 -->
    <vk-data-dialog v-model="formAddPersonnel.props.show" :title="formAddPersonnel.props.title" width="800px"
      mode="form" :close-on-click-modal="false" :destroy-on-close="true">
      <vk-data-form v-model="formAddPersonnel.data" :rules="formAddPersonnel.props.rules"
        :action="formAddPersonnel.props.action" :form-type="formAddPersonnel.props.formType"
        :columns="formAddPersonnel.props.columns" label-width="120px" @success="
          formAddPersonnel.props.show = false;
        refresh();
        "></vk-data-form>
    </vk-data-dialog>

    <!-- 详情抽屉 -->
    <el-drawer title="重控点位配置详情" :visible.sync="detailDialog.show" size="70%" direction="rtl" append-to-body
      :destroy-on-close="true">
      <div v-if="detailDialog.data" style="padding: 20px; height: 100%; overflow-y: auto; box-sizing: border-box;">
        <el-descriptions border :column="2" class="custom-desc-table">
          <el-descriptions-item label="反馈区域">{{ detailDialog.data.area_info && detailDialog.data.area_info.name ?
            detailDialog.data.area_info.name : '无' }}</el-descriptions-item>
          <el-descriptions-item label="反馈点位">{{ detailDialog.data.point_info && detailDialog.data.point_info.name ?
            detailDialog.data.point_info.name : '无' }}</el-descriptions-item>
          <el-descriptions-item label="负责部门">{{ detailDialog.data.dept_info && detailDialog.data.dept_info.name ?
            detailDialog.data.dept_info.name : '无' }}</el-descriptions-item>
          <el-descriptions-item label="考核班次">{{detailDialog.data.require_shifts ?
            detailDialog.data.require_shifts.map(s => s === 'day' ? '白班' : '夜班').join(' / ') : '无'
            }}</el-descriptions-item>
          <el-descriptions-item label="启停状态"><el-tag :type="detailDialog.data.status === 1 ? 'success' : 'danger'"
              size="small">{{ detailDialog.data.status === 1 ? '开启' : '停用' }}</el-tag></el-descriptions-item>
          <el-descriptions-item label="配置人">{{ detailDialog.data.issuer_info ? (detailDialog.data.issuer_info.real_name
            || detailDialog.data.issuer_info.nickname || detailDialog.data.issuer_info.username || '管理员') : '管理员'
            }}</el-descriptions-item>
          <el-descriptions-item label="配置时间">{{ vk.pubfn.timeFormat(detailDialog.data._add_time, 'yyyy-MM-dd hh:mm:ss')
            }}</el-descriptions-item>
          <el-descriptions-item label="反馈照片数量">{{ detailDialog.data.photo_requirements ?
            detailDialog.data.photo_requirements.length : 0 }}</el-descriptions-item>
          <el-descriptions-item label="反馈人" :span="2">
            <template v-if="detailDialog.data.assignee_info && detailDialog.data.assignee_info.length > 0">
              <el-tag v-for="(u, index) in detailDialog.data.assignee_info" :key="index" size="medium" type="info"
                style="margin-right: 8px; margin-bottom: 5px; border-radius: 12px; padding-left: 5px;">
                <div style="display: inline-flex; align-items: center; gap: 6px;">
                  <el-avatar :size="20" :src="u.avatar" icon="el-icon-user-solid"
                    style="vertical-align: middle;"></el-avatar>
                  <span>{{ u.real_name || u.nickname || u.username || '未名氏' }}</span>
                </div>
              </el-tag>
            </template>
            <template v-else>
              <span style="color: #909399;">暂无配置执行人员</span>
            </template>
          </el-descriptions-item>
          <el-descriptions-item label="必拍照片标题" :span="2">
            <el-tag v-for="(item, index) in detailDialog.data.photo_requirements" :key="index"
              style="margin-right: 5px;">{{
                item }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="任务标准描述" :span="2">
            <div v-html="detailDialog.data.feedback_standard" class="rich-text-content"></div>
          </el-descriptions-item>
        </el-descriptions>

        <div style="margin-top: 25px; border-top: 1px dashed #e5e7eb; padding-top: 15px;">
          <div class="table-title">配置反馈记录集合</div>
          <vk-data-table ref="feedbackTable" size="small" :action="detailDialog.tableAction"
            :columns="detailDialog.tableColumns" :pagination="true"></vk-data-table>
        </div>

        <div style="margin-top: 30px; text-align: right; margin-bottom: 20px;">
          <el-button type="primary" @click="detailDialog.show = false">关 闭</el-button>
        </div>
      </div>
    </el-drawer>

    <!-- 反馈人员名单小弹窗 -->
    <vk-data-dialog v-model="assigneeDialog.show" title="配置执行人员名单" width="750px">
      <el-table :data="assigneeDialog.data" size="small" border stripe max-height="500">
        <el-table-column label="姓名" width="140">
          <template slot-scope="scope">
            <div style="display: flex; align-items: center; gap: 8px;">
              <el-avatar :size="28" :src="scope.row.avatar" icon="el-icon-user-solid"></el-avatar>
              <span>{{ scope.row.real_name || scope.row.nickname || scope.row.username || '未名氏' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="dept_name" label="所属单位" min-width="150"></el-table-column>
        <el-table-column prop="group_name" label="所属小组" min-width="150"></el-table-column>
      </el-table>
    </vk-data-dialog>
  </view>
</template>

<script>
var that;
var vk = uni.vk;

export default {
  data() {
    // 1. 权限与状态提取
    let userInfo = uni.vk.getVuex('$user.userInfo') || {};
    let rawDeptId = userInfo.department_id;
    let strDeptId = Array.isArray(rawDeptId) && rawDeptId.length > 0 ? rawDeptId[0] : (rawDeptId || "");
    let roles = userInfo.role || [];
    let isAdmin = roles.includes('admin') || roles.includes('super_admin');

    return {
      isAdmin,
      currentDeptId: strDeptId,
      currentSelectedGroupId: "", // 保存当前搜索栏选中的部门/小组节点

      // 详情弹窗
      detailDialog: {
        show: false,
        data: null,
        tableAction: (obj = {}) => {
          if (!that.detailDialog.data) {
            if (typeof obj.success === 'function') obj.success({ rows: [], total: 0 });
            return;
          }
          obj.point_id = that.detailDialog.data.point_id;
          obj.dept_id = that.detailDialog.data.dept_id;

          vk.callFunction({
            url: 'admin/feedback/sys/getFeedbackList',
            data: obj,
            success: (res) => { if (typeof obj.success === 'function') obj.success({ rows: res.rows || [], total: res.total || 0 }); },
            fail: (err) => { if (typeof obj.fail === 'function') obj.fail(err); },
            complete: () => { if (typeof obj.complete === 'function') obj.complete(); }
          });
        },
        tableColumns: [
          { key: "shift_date", title: "排班日期", type: "text", width: 120 },
          { key: "shift_type", title: "班次", type: "text", width: 80, formatter: val => val === 'day' ? '白班' : '夜班' },
          { key: "assignee_names", title: "承办人", type: "text", width: 140 },
          {
            key: "submit_user_info", title: "提交人", type: "text", width: 100,
            formatter: (val) => {
              let info = (val && Array.isArray(val)) ? val[0] : val;
              if (info) {
                return info.real_name || info.nickname || info.username || '-';
              }
              return '-';
            }
          },
          {
            key: "status", title: "状态", type: "tag", width: 80,
            data: [
              { value: 0, label: "待反馈", tagType: "info" },
              { value: 1, label: "已反馈", tagType: "success" },
              { value: 2, label: "已逾期", tagType: "danger" }
            ]
          },
          { key: "feedback_time", title: "提交时间", type: "time", width: 160 }
        ]
      },

      // 追加配置人员弹窗
      formAddPersonnel: {
        data: {},
        currentItem: null,
        props: {
          action: (obj = {}) => {
            let originalIds = that.formAddPersonnel.currentItem.original_assignee_ids;
            if (!originalIds || !Array.isArray(originalIds)) {
              originalIds = that.formAddPersonnel.currentItem.assignee_ids || [];
            }
            let extraIds = obj.data.extra_assignee_ids || [];
            let combined = [...new Set([...originalIds, ...extraIds])];

            vk.callFunction({
              url: 'admin/feedback/sys/updateConfig',
              data: {
                _id: that.formAddPersonnel.currentItem._id,
                assignee_ids: combined
              },
              success: (res) => {
                vk.toast('增配人员操作成功', 'success');
                if (typeof obj.success === 'function') obj.success(res);
              },
              fail: (err) => { if (typeof obj.fail === 'function') obj.fail(err); }
            });
          },
          formType: "update",
          show: false,
          title: "配置执行人员 (增配管理)",
          rules: {},
          columns: [
            {
              key: "extra_assignee_ids",
              title: "增配人员",
              type: "table-select",
              placeholder: "请选择需要增配的人员(可修改、删除)",
              multiple: true,
              action: function (obj = {}) {
                obj.locked_dept_id = that.formAddPersonnel.currentItem.dept_id;
                vk.callFunction({
                  url: "admin/feedback/sys/getUserListByGroup",
                  data: obj,
                  success: (res) => {
                    let originalIds = that.formAddPersonnel.currentItem.original_assignee_ids;
                    if (!originalIds || !Array.isArray(originalIds)) {
                      originalIds = that.formAddPersonnel.currentItem.assignee_ids || [];
                    }
                    if (res.rows && originalIds.length > 0) {
                      res.rows = res.rows.filter(user => !originalIds.includes(user._id));
                      res.total = res.rows.length;
                    }
                    if (typeof obj.success === "function") obj.success({ rows: res.rows || [], total: res.total || 0 });
                  },
                  fail: (err) => { if (typeof obj.fail === "function") obj.fail(err); },
                  complete: () => { if (typeof obj.complete === "function") obj.complete(); }
                });
              },
              queryColumns: [
                {
                  key: "tree_node_id", title: "部门/小组", type: "cascader", mode: "==",
                  data: [],
                  props: { value: "_id", label: "name", children: "children", checkStrictly: true, emitPath: false }
                },
                { key: "real_name", title: "姓名", type: "text", mode: "%%" }
              ],
              columns: [
                { key: "_id", title: "用户全局ID", type: "text", width: 220, idKey: true, show: false },
                { key: "real_name", title: "员工姓名", type: "text", width: 120, nameKey: true },
                { key: "group_info.name", title: "所属小组", type: "text", width: 120 },
                { key: "mobile", title: "手机号", type: "text", width: 120 }
              ],
              props: { value: "_id", label: "real_name" }
            }
          ]
        }
      },

      // 搜索配置
      queryForm1: {
        formData: {},
        columns: [
          { key: "point_info.name", title: "点位名称", type: "text", mode: "%%", placeholder: "请输入点位名称" },
          { key: "cascader_point_id", title: "点位", type: "cascader", action: "admin/feedback/sys/getAreaPointTree", props: { value: "_id", label: "name", children: "children", checkStrictly: true, emitPath: false } },
          { key: "dept_id", title: "核签部门", type: "select", action: "admin/base-dept/sys/getAll", props: { list: "rows", value: "_id", label: "name" } },
          { key: "status", title: "有效状态", type: "select", data: [{ value: 1, label: "开启" }, { value: 0, label: "停用" }] }
        ]
      },

      // 表格配置
      table1: {
        action: "admin/feedback/sys/getConfigList",
        columns: [
          { key: "area_info.name", title: "反馈区域", type: "text", width: 140 },
          { key: "point_info.name", title: "反馈点位", type: "text", width: 180 },
          { key: "dept_info.name", title: "负责部门", type: "text", width: 90 },
          {
            key: "require_shifts",
            title: "要求的班次",
            type: "html",
            width: 80,
            formatter: (val) => {
              if (!val || val.length === 0) return "无";
              return val.map(s => s === 'day' ? "白班" : "夜班").join(" / ");
            }
          },
          {
            key: "status",
            title: "启停状态",
            type: "tag",
            width: 80,
            data: [
              { value: 1, label: "开启", tagType: "success" },
              { value: 0, label: "停用", tagType: "danger" }
            ]
          },
          {
            key: "photo_requirements",
            title: "反馈照片数量",
            type: "text",
            width: 100,
            formatter: (val) => {
              return val && Array.isArray(val) ? val.length : 0;
            }
          },
          {
            key: "issuer_info", title: "配置人", type: "text", width: 80,
            formatter: (val) => {
              let info = (val && Array.isArray(val)) ? val[0] : val;
              if (info) {
                return info.real_name || info.nickname || info.username || '管理员';
              }
              return '管理员';
            }
          },
          {
            key: "assignee_info",
            title: "反馈人",
            type: "text",
            minWidth: 140
          },
          { key: "_add_time", title: "配置时间", type: "time", width: 150 }
        ],
        customRightBtns: [
          {
            title: "配置人员",
            type: "warning",
            icon: "el-icon-user"
          }
        ],
        multipleSelection: [], // 多选框选中的记录
        selectItem: "", // 当前高亮的行
      },
      assigneeDialog: {
        show: false,
        data: []
      },

      // 表单弹窗配置
      form1: {
        data: {},
        props: {
          action: (obj = {}) => {
            if (that.form1.props.formType === "update") {
              obj.data.original_assignee_ids = obj.data.assignee_ids;
            }
            let actionUrl = that.form1.props.formType === "add" ? "admin/feedback/sys/addConfig" : "admin/feedback/sys/updateConfig";
            vk.callFunction({
              url: actionUrl,
              data: obj.data,
              success: (res) => { if (typeof obj.success === "function") obj.success(res); },
              fail: (err) => { if (typeof obj.fail === "function") obj.fail(err); }
            });
          },
          formType: "update",
          show: false,
          title: "配置重控点位",
          rules: {
            area_point_ids: [{ required: true, type: "array", message: "区域与重控点必选", trigger: ["change", "blur"] }],
            assignee_ids: [{ required: true, type: "array", message: "执行人员必选", trigger: ["change", "blur"] }],
            feedback_standard: [{ required: true, message: "标准不能缺席", trigger: "blur" }]
          },
          columns: [
            {
              key: "area_point_ids",
              title: "区域点位",
              type: "cascader",
              action: "admin/feedback/sys/getAreaPointTree",
              props: { value: "_id", label: "name", children: "children", emitPath: true }
            },
            {
              key: "dept_id",
              title: "所属考勤部门",
              type: "select",
              data: [], // 初始强置为空，后续由 init() 通过 $set 动态注入
              disabled: !isAdmin, // 非管理员锁定
              placeholder: "请选择考勤部门",
              onChange: (val, formData, column, index, option) => {
                formData.assignee_ids = [];
                that.loadDeptSubTree(val, true);
              }
            },
            {
              key: "assignee_ids",
              title: "执行人员",
              type: "table-select",
              placeholder: "请选择本部门小组内的人员",
              multiple: true,
              action: function (obj = {}) {
                // 注入当前选择的大部门ID，进行初步防泄漏隔离
                obj.locked_dept_id = that.form1.data.dept_id || that.currentDeptId;
                vk.callFunction({
                  url: "admin/feedback/sys/getUserListByGroup",
                  data: obj,
                  success: (res) => { if (typeof obj.success === "function") obj.success({ rows: res.rows || [], total: res.total || 0 }); },
                  fail: (err) => { if (typeof obj.fail === "function") obj.fail(err); },
                  complete: () => { if (typeof obj.complete === "function") obj.complete(); }
                });
              },
              queryColumns: [
                {
                  key: "tree_node_id",
                  title: "部门/小组",
                  type: "cascader",
                  mode: "==",
                  data: [], // 初始强置为空，后续由 loadDeptSubTree 通过 $set 动态注入
                  props: { value: "_id", label: "name", children: "children", checkStrictly: true, emitPath: false },
                  onChange: (val, formData, column, index, option) => {
                    // 获取是否有小组的数据，有就保存下来，供 action 使用
                    that.currentSelectedGroupId = val;
                  }
                },
                { key: "real_name", title: "姓名", type: "text", mode: "%%" }
              ],
              columns: [
                { key: "_id", title: "用户全局ID", type: "text", width: 220, idKey: true },
                { key: "real_name", title: "员工姓名", type: "text", width: 120, nameKey: true },
                { key: "mobile", title: "预留手机号", type: "text", width: 120 }
              ],
              props: { value: "_id", label: "real_name" }
            },
            {
              key: "require_shifts",
              title: "考核班次",
              type: "checkbox",
              data: [{ value: "day", label: "白班" }, { value: "night", label: "夜班" }]
            },
            {
              key: "photo_requirements",
              title: "必拍照片标题",
              type: "tag",
              placeholder: "输入标题后按回车",
              tips: "请添加照片标题（如：现场全貌图），最多添加3项",
            },
            {
              key: "feedback_standard",
              title: "任务标准描述",
              type: "editor",
              placeholder: "请填入检查标准或点位的具体描述要求"
            },
            {
              key: "status",
              title: "状态",
              type: "radio",
              data: [{ value: 1, label: "开启" }, { value: 0, label: "作废" }]
            }
          ]
        }
      }
    };
  },
  onLoad(options = {}) {
    that = this;
    that.init(options);
  },
  methods: {
    init(options) {
      // 1. 预先加载当前归属部门的树结构
      that.loadDeptSubTree(that.currentDeptId);

      // 2. 预先加载顶级部门列表（供 select 组件使用）
      let deptQuery = that.isAdmin ? {} : { _id: that.currentDeptId };
      vk.callFunction({
        url: "admin/base-dept/sys/getAll",
        data: { whereJson: deptQuery },
        success: (res) => {
          if (res.rows && res.rows.length > 0) {
            // 筛选顶级部门数据，过滤掉小组
            let topDepts = that.isAdmin
              ? res.rows.filter(item => !item.parent_id)
              : res.rows;
            let list = topDepts.map(item => ({ value: item._id, label: item.name }));

            // 使用 Vue 的 $set 确保绝对的响应式注入，解决无法回显的 bug
            let deptCol = that.form1.props.columns.find(c => c.key === "dept_id");
            if (deptCol) {
              that.$set(deptCol, 'data', list);
            }
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
    onDetail({ item }) {
      that.detailDialog.data = item;
      that.detailDialog.show = true;
      that.$nextTick(() => {
        if (that.$refs.feedbackTable) {
          that.$refs.feedbackTable.search();
        }
      });
    },
    onAddPersonnel(item) {
      that.formAddPersonnel.currentItem = item;
      let originalIds = item.original_assignee_ids;
      if (!originalIds || !Array.isArray(originalIds)) {
        originalIds = item.assignee_ids || [];
      }
      let currentIds = item.assignee_ids || [];
      let extraIds = currentIds.filter(id => !originalIds.includes(id));
      that.formAddPersonnel.data = { extra_assignee_ids: extraIds };
      that.formAddPersonnel.props.show = true;
      that.loadDeptSubTreeForAddPersonnel(item.dept_id);
    },
    loadDeptSubTreeForAddPersonnel(deptId) {
      if (!deptId) return;
      vk.callFunction({
        url: "admin/base-dept/sys/getTree",
        success: (res) => {
          let fullTree = res.rows || [];
          const findNode = (nodes, targetId) => {
            for (let node of nodes) {
              if (node._id === targetId) return node;
              if (node.children && node.children.length > 0) {
                let found = findNode(node.children, targetId);
                if (found) return found;
              }
            }
            return null;
          };
          let targetNode = findNode(fullTree, deptId);
          let subTree = targetNode ? [targetNode] : [];

          let assignCol = that.formAddPersonnel.props.columns.find(c => c.key === "new_assignee_ids");
          let treeCol = assignCol.queryColumns.find(c => c.key === "tree_node_id");
          treeCol.data = subTree;

          that.$set(assignCol.queryColumns, 0, Object.assign({}, treeCol));

          that.$set(assignCol, 'show', false);
          that.$nextTick(() => {
            that.$set(assignCol, 'show', true);
          });
        }
      });
    },
    addBtn() {
      that.currentSelectedGroupId = ""; // 强行清空级联遗留状态

      // 废弃原有的隐患式 resetForm，改用绝对物理状态覆盖
      that.form1.data = {
        status: 1,
        require_shifts: ["day", "night"],
        dept_id: that.currentDeptId,
        photo_requirements: []
      };

      // 传入 true 强行销毁并重建 table-select，彻底清空上次遗留的搜索数据
      that.loadDeptSubTree(that.currentDeptId, true);

      that.form1.props.formType = "add";
      that.form1.props.title = "增配监控点位";
      that.form1.props.show = true;
    },
    updateBtn({ item }) {
      let uid = uni.vk.getVuex('$user.userInfo._id');
      if (!that.isAdmin && item.issuer_uid !== uid) {
         vk.toast("只有配置添加人或管理员才可以修改基础配置，您可以使用【配置人员】进行增配", "none");
         return;
      }
      that.currentSelectedGroupId = ""; // 强行清空级联遗留状态

      that.form1.props.formType = "update";
      that.form1.props.title = "修定监督配置";

      let clonedItem = vk.pubfn.copyObject(item);

      if (clonedItem.area_id && clonedItem.point_id) {
        clonedItem.area_point_ids = [clonedItem.area_id, clonedItem.point_id];
      }

      let rawDeptId = clonedItem.dept_id || that.currentDeptId;
      clonedItem.dept_id = Array.isArray(rawDeptId) ? rawDeptId[0] : rawDeptId;

      that.form1.data = clonedItem;

      // 传入 true 强行销毁并重建 table-select，彻底清空上次遗留的搜索数据
      that.loadDeptSubTree(clonedItem.dept_id, true);

      that.form1.props.show = true;
    },
    deleteBtn({ item }) {
      let uid = uni.vk.getVuex('$user.userInfo._id');
      if (!that.isAdmin && item.issuer_uid !== uid) {
         vk.toast("只有配置添加人或管理员才可以删除该配置", "none");
         return;
      }
      vk.callFunction({
        url: "admin/feedback/sys/updateConfig",
        data: { _id: item._id, status: 0 },
        success: () => {
          that.refresh();
          vk.toast("封停软删成功");
        }
      });
    },
    /**
     * 加载指定部门及其下属小组的子树，并使用 $set 强注入到 cascader 中
     */
    customRightBtns(row, btn) {
      if (btn.title === "配置人员") {
        that.onAddPersonnel(row);
      }
    },
    showAssigneeTable(row) {
      if (row.assignee_info && row.assignee_info.length > 0) {
        that.assigneeDialog.data = row.assignee_info;
        that.assigneeDialog.show = true;
      } else {
        vk.toast("当前点位暂未配置执行人员", "none");
      }
    },
    loadDeptSubTree(deptId, shouldRemount = false) {
      if (!deptId) {
        that.setCascaderData([]);
        return;
      }
      vk.callFunction({
        url: "admin/base-dept/sys/getTree",
        success: (res) => {
          let fullTree = res.rows || [];
          const findNode = (nodes, targetId) => {
            for (let node of nodes) {
              if (node._id === targetId) return node;
              if (node.children && node.children.length > 0) {
                let found = findNode(node.children, targetId);
                if (found) return found;
              }
            }
            return null;
          };
          let targetNode = findNode(fullTree, deptId);
          let subTree = targetNode ? [targetNode] : [];
          that.setCascaderData(subTree);

          if (shouldRemount) {
            let assignCol = that.form1.props.columns.find(c => c.key === "assignee_ids");
            if (assignCol) {
              that.$set(assignCol, 'show', false);
              that.$nextTick(() => {
                that.$set(assignCol, 'show', true);
              });
            }
          }
        }
      });
    },
    /**
     * 辅助函数：深度克隆强制打通响应式，更新 queryColumns 中的 cascader 字典
     */
    setCascaderData(data) {
      let colIndex = that.form1.props.columns.findIndex(c => c.key === "assignee_ids");
      if (colIndex > -1) {
        let assignCol = that.form1.props.columns[colIndex];
        let qIndex = assignCol.queryColumns.findIndex(c => c.key === "tree_node_id");
        if (qIndex > -1) {
          // 1. 克隆底层对象并更新数据
          let treeCol = Object.assign({}, assignCol.queryColumns[qIndex]);
          treeCol.data = data;

          // 2. 克隆 queryColumns 数组
          let newQueryColumns = [...assignCol.queryColumns];
          newQueryColumns[qIndex] = treeCol;

          // 3. 克隆并替换整个 assignCol
          let newAssignCol = Object.assign({}, assignCol);
          newAssignCol.queryColumns = newQueryColumns;

          // 4. 触发顶层响应式，强迫 table-select 重载配置
          that.$set(that.form1.props.columns, colIndex, newAssignCol);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.rich-text-content {
  line-height: 1.6;
  font-size: 14px;
  color: #333;
}

::v-deep .custom-desc-table .el-descriptions-item__label {
  width: 140px !important;
  text-align: right !important;
  font-weight: bold !important;
  color: #606266 !important;
  background-color: #f8f9fa !important;
}

::v-deep .custom-desc-table .el-descriptions-item__content {
  width: calc(50% - 140px) !important;
  color: #333 !important;
}

.table-title {
  font-weight: bold;
  margin-bottom: 12px;
  font-size: 16px;
  color: #dc2626;
}
</style>
