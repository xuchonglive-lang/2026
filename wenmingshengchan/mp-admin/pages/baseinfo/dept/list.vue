<template>
  <view class="page-body">
    <el-row :gutter="16">
      <!-- 左侧：部门管理树 -->
      <el-col :span="6">
        <el-card shadow="never" style="min-height: calc(100vh - 100px);">
          <div slot="header" style="display: flex; justify-content: space-between; align-items: center;">
            <span>部门列表</span>
            <el-button type="success" size="mini" icon="el-icon-plus" @click="addDeptBtn">新增大部门</el-button>
          </div>
          <el-tree
            ref="deptTree"
            :data="deptTreeData"
            :props="treeProps"
            node-key="_id"
            :expand-on-click-node="false"
            :highlight-current="true"
            default-expand-all
            @current-change="handleNodeClick"
          ></el-tree>
        </el-card>
      </el-col>

      <!-- 右侧：小组管理表格 -->
      <el-col :span="18">
        <el-card shadow="never" style="min-height: calc(100vh - 100px);">
          <template v-if="selectedDept">
            <div slot="header" style="display: flex; justify-content: space-between; align-items: center;">
              <span>【{{ selectedDept.name }}】 {{ selectedDept._id === '' ? '下属部门管理' : '下属小组管理' }}</span>
              <el-button v-if="selectedDept._id !== ''" type="danger" size="mini" icon="el-icon-delete" @click="deleteDeptBtn">删除当前节点</el-button>
            </div>
            
            <!-- 如果是第二级（小组层级，存在非空的 parent_id），则不允许往下添加 -->
            <template v-if="selectedDept.parent_id">
              <div style="text-align: center; color: #999; margin-top: 100px;">
                <i class="el-icon-warning-outline" style="font-size: 48px; color: #E6A23C;"></i>
                <p style="margin-top: 10px;">当前为第二层级（小组），系统强制限制最多两级架构，不可继续添加下属层级。</p>
              </div>
            </template>
            <!-- 根节点或一级部门 -->
            <template v-else>
              <!-- 表格搜索组件 -->
              <vk-data-table-query
                v-model="queryForm1.formData"
                :columns="queryForm1.columns"
                @search="search"
              ></vk-data-table-query>

              <!-- 按钮区域 -->
              <view class="vk-table-button-box">
                <el-button type="primary" size="small" icon="el-icon-plus" @click="addGroupBtn">{{ selectedDept._id === '' ? '新增部门' : '新增下属小组' }}</el-button>
              </view>

              <!-- 表格组件 -->
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
            </template>
          </template>
          
          <template v-else>
            <div style="text-align: center; color: #999; margin-top: 100px;">
              <i class="el-icon-office-building" style="font-size: 48px;"></i>
              <p style="margin-top: 10px;">请在左侧选择一个部门</p>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>

    <!-- 弹窗表单 -->
    <vk-data-dialog
      v-model="form1.props.show"
      :title="form1.props.title"
      width="500px"
      mode="form"
    >
      <vk-data-form
        v-model="form1.data"
        :rules="form1.props.rules"
        :action="form1.props.action"
        :form-type="form1.props.formType"
        :columns="form1.props.columns"
        label-width="100px"
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
      deptTreeData: [],
      treeProps: {
        children: 'children',
        label: 'name'
      },
      selectedDept: null,
      
      table1: {
        action: (obj = {}) => {
          let { data, success, fail, complete } = obj;
          data.parent_id = this.queryForm1.formData.parent_id || "";
          vk.callFunction({
            url: "admin/base-dept/sys/getList",
            data: data,
            success: (res) => {
              if (typeof success === "function") {
                success({ rows: res.rows || [], total: res.total || 0 });
              }
            },
            fail: (err) => {
              if (typeof fail === "function") fail(err);
            },
            complete: () => {
              if (typeof complete === "function") complete();
            }
          });
        },
        columns: [
          { key: "name", title: "小组名称", type: "text", width: 180 },
          { key: "manager", title: "负责人", type: "text", width: 120 },
          { key: "sort", title: "排序", type: "number", width: 80 },
          { 
            key: "status", 
            title: "状态", 
            type: "tag", 
            width: 80, 
            data: [
              {value:1, label:'正常', tagType: 'success'},
              {value:0, label:'禁用', tagType: 'danger'}
            ] 
          },
          { key: "_add_time", title: "创建时间", type: "time", width: 160 }
        ]
      },
      queryForm1: {
        formData: {
          parent_id: "" // 绑定当前的左侧部门ID
        },
        columns: [
          { key: "name", title: "名称搜索", type: "text", mode: "%%", width: 200 }
        ]
      },
      
      form1: {
        data: {},
        props: {
          action: "",
          title: "表单",
          formType: "",
          show: false,
          columns: [
            { key: "name", title: "名称", type: "text", placeholder: "请输入名称" },
            { 
              key: "parent_id", 
              title: "上级归属", 
              type: "cascader", 
              data: [],
              props: { value: "_id", label: "name", children: "children", checkStrictly: true, emitPath: false },
              placeholder: "请选择架构层级"
            },
            { key: "manager", title: "负责人", type: "text", placeholder: "姓名" },
            { key: "sort", title: "排序号", type: "number", defaultValue: 0 },
            { key: "status", title: "状态", type: "radio", data: [{value:1, label:'正常'},{value:0, label:'禁用'}], defaultValue: 1 }
          ],
          rules: {
            name: [{ required: true, message: "名称不能为空", trigger: "blur" }]
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
      that.loadDeptTree();
    },
    loadDeptTree() {
      vk.callFunction({
        url: 'admin/base-dept/sys/getTree',
        success: (data) => {
          that.deptTreeData = [
            { _id: "", name: "马城矿业", children: data.rows || [] }
          ];
          let parentColIndex = vk.pubfn.getListIndex(that.form1.props.columns, "key", "parent_id");
          if (parentColIndex > -1) {
            that.form1.props.columns[parentColIndex].data = that.deptTreeData;
          }
        }
      });
    },
    handleNodeClick(data) {
      that.selectedDept = data;
      that.queryForm1.formData.parent_id = data._id;
      that.$nextTick(() => {
        that.search();
      });
    },
    search() {
      that.$refs.table1 && that.$refs.table1.search();
    },
    refresh() {
      that.$refs.table1 && that.$refs.table1.refresh();
    },
    addDeptBtn() {
      // 在左侧点新增，默认是添加顶级部门
      vk.pubfn.resetForm(originalForms, that);
      that.form1.props.action = "admin/base-dept/sys/add";
      that.form1.props.formType = "add";
      that.form1.props.title = "新增大部门";
      that.form1.data.parent_id = "";
      that.form1.data.status = 1;
      that.form1.props.show = true;
    },
    addGroupBtn() {
      // 在右侧点新增，属于向选中节点添加节点
      vk.pubfn.resetForm(originalForms, that);
      that.form1.props.action = "admin/base-dept/sys/add";
      that.form1.props.formType = "add";
      that.form1.props.title = (that.selectedDept && that.selectedDept._id === '') ? "新增部门" : "新增下属小组";
      if (that.selectedDept) {
        that.form1.data.parent_id = that.selectedDept._id;
      }
      that.form1.data.status = 1;
      that.form1.props.show = true;
    },
    updateBtn({ item }) {
      that.form1.props.action = "admin/base-dept/sys/update";
      that.form1.props.formType = "update";
      that.form1.props.title = "编辑架构";
      that.form1.data = vk.pubfn.copyObject(item);
      that.form1.props.show = true;
    },
    deleteBtn({ item, deleteFn }) {
      deleteFn({
        action: "admin/base-dept/sys/delete",
        data: { _id: item._id },
        success: () => {
          that.loadDeptTree();
          that.refresh();
        }
      });
    },
    deleteDeptBtn() {
      // 删除左侧选中的顶级部门
      if (!that.selectedDept) return;
      that.$confirm('确定要删除当前所选的部门吗？', '重要提示', {
        type: 'warning'
      }).then(() => {
        vk.callFunction({
          url: "admin/base-dept/sys/delete",
          data: { _id: that.selectedDept._id },
          success: () => {
            that.selectedDept = null;
            that.queryForm1.formData.parent_id = "";
            that.loadDeptTree();
            that.$notify({ message: '部门删除成功', type: 'success' });
          }
        });
      }).catch(() => {});
    },
    onFormSuccess() {
      that.form1.props.show = false;
      that.loadDeptTree();
      that.refresh();
    }
  }
};
</script>
<style scoped>
</style>
