<template>
  <view class="page-body dept-manage">
    <el-row :gutter="16">
      <!-- 左侧：部门隔离树 -->
      <el-col :span="4">
        <el-card class="dept-tree-card" shadow="never">
          <div slot="header" class="dept-tree-header">
            <span>按照部门架构索引</span>
          </div>
          <el-tree ref="deptTree" :data="deptTreeData" :props="treeProps" node-key="_id" :expand-on-click-node="false"
            :highlight-current="true" :default-expanded-keys="['']" @current-change="handleNodeClick">
            <span class="dept-tree-node" slot-scope="{ node, data }">
              <i :class="getIcon(data)" :style="{ color: getIconColor(data) }"></i>
              <span style="margin-left: 8px;">{{ node.label }}</span>
            </span>
          </el-tree>
        </el-card>
      </el-col>

      <!-- 右侧：花名册表格 -->
      <el-col :span="20">
        <el-card shadow="never" class="table-card">
          <div class="member-toolbar">
            <vk-data-table-query v-model="queryForm1.formData" :columns="queryForm1.columns"
              @search="search"></vk-data-table-query>
          </div>
          <vk-data-table ref="table1" :action="table1.action" :columns="table1.columns" :query-form-param="queryForm1"
            :right-btns="['detail_auto', { mode: 'update', title: '审核' }]" :selection="true" :row-no="true"
            :pagination="true" @update="updateBtn">
            <!-- 在操作栏最前方插入一个自定义审核按钮 -->
            <template v-slot:right-btns="{ row }">
              <el-button v-if="row.audit_status === 1" type="warning" size="mini" icon="el-icon-s-check" plain
                @click="auditBtn(row)">
                实施审核
              </el-button>
            </template>
          </vk-data-table>
        </el-card>
      </el-col>
    </el-row>

    <!-- 编辑资料弹窗 -->
    <vk-data-dialog v-model="form1.props.show" :title="form1.props.title" width="600px" mode="form">
      <vk-data-form v-model="form1.data" :rules="form1.props.rules" :action="form1.props.action"
        :form-type="form1.props.formType" :columns="form1.props.columns" label-width="100px"
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
      deptTreeData: [],
      treeProps: {
        children: 'children',
        label: 'name'
      },
      selectedDept: null,

      table1: {
        action: "admin/user/sys/getList", // 后续补充对应的云端查询
        columns: [
          { key: "real_name", title: "真实姓名", type: "text", width: 80 },
          { key: "avatar", title: "头像", type: "avatar", width: 50, shape: "circle" },

          { key: "nickname", title: "昵称", type: "text", width: 120 },
          { key: "dept_info.name", title: "所属部门", type: "text", width: 120, defaultValue: "暂无部门" },
          { key: "group_info.name", title: "所属小组", type: "text", width: 140, defaultValue: "暂无小组" },
          { key: "mobile", title: "手机号码", type: "text", width: 120 },

          {
            key: "role",
            title: "系统角色",
            type: "tag",
            width: 120,
            data: [
              { value: 'user', label: '普通用户', tagType: 'info' },
              { value: 'dept_admin', label: '部门管事', tagType: 'primary' },
              { value: 'admin', label: '超级总管', tagType: 'warning' }
            ]
          },
          {
            key: "audit_status",
            title: "审核状态",
            type: "tag",
            width: 90,
            data: [
              { value: 0, label: '待完善', tagType: 'info' },
              { value: 1, label: '待审核', tagType: 'warning' },
              { value: 2, label: '已拒绝', tagType: 'danger' },
              { value: 3, label: '已过审', tagType: 'success' }
            ]
          },
          {
            key: "status",
            title: "账号状态",
            type: "tag",
            width: 80,
            data: [
              { value: 0, label: '正常', tagType: 'success' },
              { value: 1, label: '封禁', tagType: 'danger' }
            ]
          }
        ]
      },
      queryForm1: {
        formData: {
          tree_node_id: ""
        },
        columns: [
          { key: "tree_node_id", title: "隐性过滤", type: "text", mode: "=", hidden: true },
          { key: "real_name", title: "真实姓名搜", type: "text", mode: "%%", width: 160 },
          { key: "mobile", title: "手机号查询", type: "text", mode: "%%", width: 160 }
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
            { key: "real_name", title: "真名背书", type: "text", disabled: true },
            {
              key: "dept_group_path",
              title: "归属组织",
              type: "cascader",
              action: "admin/base-dept/sys/getTree",
              props: { value: "_id", label: "name", children: "children", checkStrictly: true, emitPath: true },
              disabled: true
            },
            {
              key: "role",
              title: "身份矩阵",
              type: "checkbox",
              data: [
                { value: 'user', label: '终端用户' },
                { value: 'dept_admin', label: '基层分管' },
                { value: 'admin', label: '全局大超管' }
              ]
            },
            {
              key: "audit_status",
              title: "入场审核",
              type: "radio",
              data: [
                { value: 1, label: '维持待审' },
                { value: 2, label: '打回驱逐' },
                { value: 3, label: '准入放行' }
              ]
            },
            { key: "status", title: "全服开关", type: "radio", data: [{ value: 0, label: '活跃态' }, { value: 1, label: '拉黑态' }], defaultValue: 0 }
          ],
          rules: {}
        }
      }
    };
  },
  onLoad(options = {}) {
    that = this;
    vk = that.vk;
    that.init();
    that.loadDeptTree();
  },
  methods: {
    init() {
      originalForms["form1"] = vk.pubfn.copyObject(that.form1);
    },
    getIcon(data) {
      if (data._id === "") {
        return "el-icon-office-building"; // 根节点
      } else if (!data.parent_id) {
        return "el-icon-school"; // 部门
      } else {
        return "vk-icon-friendfill"; // 小组：使用多人图标
      }
    },
    getIconColor(data) {
      if (data._id === "") {
        return "#409EFF"; // 根节点蓝色
      } else if (!data.parent_id) {
        return "#67C23A"; // 部门绿色
      } else {
        return "#9C27B0"; // 小组：紫色
      }
    },
    loadDeptTree() {
      vk.callFunction({
        url: 'admin/base-dept/sys/getTree',
        data: {},
        success: (data) => {
          let treeNodes = data.rows || [];
          that.deptTreeData = [
            { _id: "", name: "马城矿业", children: treeNodes }
          ];
        }
      });
    },
    handleNodeClick(data) {
      that.selectedDept = data;
      // 隐形塞入 queryForm1 的提交载荷，改为 tree_node_id 供后端同时查询 department_id 和 group_id
      that.queryForm1.formData.tree_node_id = data._id;
      that.$nextTick(() => {
        that.$refs.table1.search();
      });
    },
    search() {
      that.$refs.table1.search();
    },
    refresh() {
      that.$refs.table1.refresh();
    },
    updateBtn({ item }) {
      let myRoles = vk.getVuex('$user.userInfo.role') || [];
      let isSuper = myRoles.includes("admin") || myRoles.includes("super_admin");

      let cols = that.form1.props.columns;
      let setDisabled = (key, state) => {
        let idx = vk.pubfn.getListIndex(cols, "key", key);
        if (idx > -1) cols[idx].disabled = state;
      };

      setDisabled("role", !isSuper);
      setDisabled("dept_group_path", !isSuper);
      setDisabled("status", !isSuper); // 非全盘总管不能随意拉黑

      that.form1.props.action = "admin/user/sys/updateStatus";
      that.form1.props.formType = "update";
      that.form1.props.title = isSuper ? "超管控制台(全开)" : "基层管事台(仅审)";

      let itemCopy = vk.pubfn.copyObject(item);
      // 将底层的双字段，逆向拼接回一个级联数组供组件显示
      itemCopy.dept_group_path = [];
      if (itemCopy.department_id) itemCopy.dept_group_path.push(itemCopy.department_id);
      if (itemCopy.group_id) itemCopy.dept_group_path.push(itemCopy.group_id);

      that.form1.data = itemCopy;
      that.form1.props.show = true;
    },
    onFormSuccess() {
      that.form1.props.show = false;
      that.refresh();
    },
    auditBtn(row) {
      that.$confirm(`您正在处理用户：【${row.real_name || row.nickname || '未名氏'}】 的加群或入驻申请，请抉择：`, '进场审核', {
        distinguishCancelAndClose: true,
        confirmButtonText: '✅ 准入放行 (Approved)',
        cancelButtonText: '❌ 拒绝进场 (Rejected)',
        type: 'warning'
      }).then(() => {
        // 用户点击了 ✅ 准入放行
        that.submitAudit(row._id, 3);
      }).catch(action => {
        // 用户点击了 ❌ 拒绝进场 (而不是点击右上角X关闭)
        if (action === 'cancel') {
          that.submitAudit(row._id, 2);
        }
      });
    },
    submitAudit(id, targetStatus) {
      vk.callFunction({
        url: 'admin/user/sys/updateStatus',
        title: '指令下发中...',
        data: {
          _id: id,
          audit_status: targetStatus
        },
        success: (data) => {
          that.$message({ type: 'success', message: '审核界定已生效' });
          that.refresh();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.dept-manage {
  .dept-tree-card {
    min-height: calc(100vh - 120px);
  }

  .table-card {
    min-height: calc(100vh - 120px);
  }

  .dept-tree-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
  }

  .dept-tree-node {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;

    i {
      color: #909399;
      margin-right: 5px;
    }
  }
}
</style>
