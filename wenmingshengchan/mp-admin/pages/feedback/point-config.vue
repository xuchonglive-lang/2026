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
      :query-form-param="queryForm1" :right-btns="['update', 'delete']" :selection="true" :row-no="true"
      :pagination="true" @update="updateBtn" @delete="deleteBtn"></vk-data-table>

    <!-- 表单弹窗 -->
    <vk-data-dialog v-model="form1.props.show" :title="form1.props.title" width="900px" mode="form"
      :close-on-click-modal="false">
      <vk-data-form v-model="form1.data" :rules="form1.props.rules" :action="form1.props.action"
        :form-type="form1.props.formType" :columns="form1.props.columns" label-width="120px" @success="
          form1.props.show = false;
        refresh();
        "></vk-data-form>
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

      // 搜索配置
      queryForm1: {
        formData: {},
        columns: [
          { key: "point_id", title: "点位名称", type: "text", mode: "%%" }
        ]
      },

      // 表格配置
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
          { key: "_add_time", title: "配置时间", type: "time", width: 160 }
        ]
      },

      // 表单弹窗配置
      form1: {
        data: {},
        props: {
          action: "admin/feedback/sys/updateConfig",
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

      that.form1.props.action = "admin/feedback/sys/addConfig";
      that.form1.props.formType = "add";
      that.form1.props.title = "增配监控点位";
      that.form1.props.show = true;
    },
    updateBtn({ item }) {
      that.currentSelectedGroupId = ""; // 强行清空级联遗留状态

      that.form1.props.action = "admin/feedback/sys/updateConfig";
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
