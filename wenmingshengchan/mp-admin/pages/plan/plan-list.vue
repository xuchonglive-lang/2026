<template>
  <view class="page-body">
    <!-- 页面内容开始 -->

    <!-- 表格搜索组件开始 -->
    <!-- 独立封装的搜索区域，与 table1.query-form-param 进行数据的双向绑定 -->
    <vk-data-table-query
      v-model="queryForm1.formData"
      :columns="queryForm1.columns"
      @search="search"
      size="small"
    ></vk-data-table-query>
    <!-- 表格搜索组件结束 -->

    <!-- 自定义按钮区域开始 -->
    <view>
      <el-row class="vk-table-button-box">
        <el-button
          type="success"
          size="small"
          icon="el-icon-circle-plus-outline"
          @click="addBtn"
        >新增日计划下达</el-button>
      </el-row>
    </view>
    <!-- 自定义按钮区域结束 -->

    <!-- 万能表格组件开始 -->
    <vk-data-table
      ref="table1"
      size="small"
      :action="table1.action"
      :columns="table1.columns"
      :query-form-param="queryForm1"
      :right-btns="['detail_auto', 'update', 'delete']"
      :selection="true"
      :row-no="true"
      :pagination="true"
      @update="updateBtn"
      @delete="deleteBtn"
      @current-change="currentChange"
      @selection-change="selectionChange"
    ></vk-data-table>
    <!-- 万能表格组件结束 -->

    <!-- 添加或编辑的弹窗开始 -->
    <!-- 使用弹窗包裹万能表单，提升后台操作体验 -->
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
    <!-- 添加或编辑的弹窗结束 -->

    <!-- 页面内容结束 -->
  </view>
</template>

<script>
let that; // 缓存当前页面 Vue 对象的引用
let vk = uni.vk; // vk-unicloud 核心实例
let originalForms = {}; // 保存表单初始数据，方便后续重置

export default {
  data() {
    return {
      // 页面是否请求中或加载中
      loading: false,
      
      // 表格相关开始 -----------------------------------------------------------
      table1: {
        // 请求后台云函数的路由地址（支持函数重写完成复合条件查询）
        action: (obj = {}) => {
            // 合并外部传递的查询条件
            obj.whereJson = obj.whereJson || {};
            // 如果查询条件包含标题
            if (this.queryForm1.formData.title) {
                obj.whereJson.title = new RegExp(this.queryForm1.formData.title);
            }
            // 如果查询条件包含状态
            if (typeof this.queryForm1.formData.status === 'number') {
                obj.whereJson.status = this.queryForm1.formData.status;
            }
            // 调用服务端接口获取列表
            vk.callFunction({
              url: 'admin/plan/sys/getList',
              data: obj,
              success: (res) => { if (typeof obj.success === 'function') obj.success({ rows: res.rows || [], total: res.total || 0}); },
              fail: (err) => { if (typeof obj.fail === 'function') obj.fail(err); },
              complete: () => { if (typeof obj.complete === 'function') obj.complete(); }
            });
        },
        // 表格展示数据列规则定义
        columns: [
          { key: "_id", title: "计划系统ID", type: "text", width: 220 },
          { key: "title", title: "日计划标题", type: "text", width: 140 },
          { key: "dept_info.name", title: "分配执行部室", type: "text", width: 140 },
          { key: "deadline_time", title: "要求完成时限", type: "time", width: 140 },
          { 
            key: "status", 
            title: "流转状态", 
            type: "dict", 
            width: 100, 
            dictData: [
              { label: "执行中", value: 0, tagType: "info" },
              { label: "已提交", value: 1, tagType: "primary" },
              { label: "已完成", value: 2, tagType: "success" },
              { label: "未达标", value: 3, tagType: "danger" },
              { label: "已逾期", value: 4, tagType: "info" },
              { label: "超时未验收", value: 5, tagType: "warning" }
            ]
          },
          { key: "create_time", title: "任务下达时间", type: "time", width: 160 }
        ],
        multipleSelection: [], // 多选框选中的记录
        selectItem: "", // 当前高亮的行
      },
      // 表格相关结束 -----------------------------------------------------------

      // 查询表单相关开始 -------------------------------------------------------
      queryForm1: {
        // 表单所绑定的底层请求数据源
        formData: {},
        // 配置搜索栏字段显示规则
        columns: [
          {
            key: "title",
            title: "计划名称",
            type: "text",
            width: 200,
            placeholder: "模糊搜索标题关键字",
            mode: "%%"
          },
          {
            key: "status",
            title: "当前状态",
            type: "select",
            width: 160,
            placeholder: "请选择",
            data: [
              { label: "执行中", value: 0 },
              { label: "已提交", value: 1 },
              { label: "已完成", value: 2 },
              { label: "未达标", value: 3 },
              { label: "已逾期", value: 4 },
              { label: "超时未验收", value: 5 }
            ]
          }
        ]
      },
      // 查询表单相关结束 -------------------------------------------------------

      // 编辑弹窗万能表单相关开始 -----------------------------------------------
      form1: {
        data: {}, // 万能表单双向绑定的核心数据模型
        props: {
          action: "", // 表单提交的对应后端接口地址
          formType: "", // 弹窗类型: add 或 update
          title: "日计划管理", // 弹窗标题
          show: false, // 控制弹窗开合的标志位
          // 提交数据前的硬性规则校验，防止脏数据注入数据库
          rules: {
            title: [{ required: true, message: "标题必填", trigger: "blur" }],
            assignee_ids: [{ required: true, message: "执行工人必选", trigger: "change" }],
            deadline_time: [{ required: true, message: "截止时限必选", trigger: "change" }]
          },
          // 规定表单每一项的显示组件类型、属性及远程获取联调结构
          columns: [
            {
                key: "title", title: "日计划标题", type: "text", placeholder: "例如: 厂区巡检规划"
            },
            {
                key: "content", title: "执行标准说明", type: "editor",
                placeholder: "请输入此计划的详尽执行要求..."
            },
            {
                key: "assignee_ids", title: "实际执行人", type: "table-select",
                placeholder: "展开面板搜索系统职工",
                multiple: true, // 支持指派多人
                action: "admin/plan/sys/getAssigneeList", // 调用同组筛选专属云函数
                searchColumns: [
                     { key: "department_id", title: "选择小组", type: "cascader", action: "admin/base-dept/sys/getTree", props: { value: "_id", label: "name", children: "children", checkStrictly: true } },
                     { key: "real_name", title: "姓名", type: "text", mode: "%%" }
                ],
                columns: [
                    { key: "_id", title: "用户全局ID", type: "text", width: 220, idKey: true },
                    { key: "real_name", title: "员工姓名", type: "text", width: 120, nameKey: true },
                    { key: "mobile", title: "预留手机号", type: "text", width: 120 }
                ],
                props: {
                    value: "_id",
                    label: "real_name" // 使用真实姓名渲染入输入栏
                }
            },
            {
                key: "deadline_time", title: "强制完成时限", type: "date", dateType: "datetime",
                valueFormat: "timestamp"
            },
            {
                key: "area_id", title: "相关作业区域", type: "remote-select",
                placeholder: "可选则为空",
                action: "admin/base-area/sys/getList",
                props: { list: "rows", value: "_id", label: "name" },
                showAll: true
            }
          ]
        }
      }
      // 编辑弹窗万能表单相关结束 -----------------------------------------------
    };
  },

  // 生命周期函数：页面生命周期入口（如执行带参过滤打开）
  onLoad(options = {}) {
    that = this;
    vk = that.vk;
    that.options = options;
    that.init(options);
  },
  
  // 页面首次渲染完成时执行
  onReady() {},
  
  // 每次页面获得焦点或显示时执行
  onShow() {},
  
  // 页面在后台挂起或被隐藏时执行
  onHide() {},

  methods: {
    /**
     * 页面级数据初始化函数
     */
    init(options) {
      // 深度拷贝表单默认结构信息，便于清空和重置
      originalForms["form1"] = vk.pubfn.copyObject(that.form1);
    },

    /**
     * 路由：跳转新页面
     */
    pageTo(path) {
      vk.navigateTo(path);
    },

    /**
     * 重置表单组件至最初声明时的默认状态
     */
    resetForm() {
      vk.pubfn.resetForm(originalForms, that);
    },

    /**
     * 触发万能表格进行过滤检索
     */
    search() {
      that.$refs.table1.search();
    },

    /**
     * 数据变更后，静默刷新当前列表页保留分页进度
     */
    refresh() {
      that.$refs.table1.refresh();
    },

    /**
     * 获取当前选中行对象信息
     */
    getCurrentRow() {
      return that.$refs.table1.getCurrentRow();
    },

    /**
     * 表格高亮记录改变时触发
     */
    currentChange(val) {
      that.table1.selectItem = val;
    },

    /**
     * 批量选择状态改变时触发
     */
    selectionChange(list) {
      that.table1.multipleSelection = list;
    },

    /**
     * 呼出新增日计划的模态框
     */
    addBtn() {
      that.resetForm();
      that.form1.props.action = "admin/plan/sys/add";
      that.form1.props.formType = "add";
      that.form1.props.title = "新增日计划下达";
      
      // 手动附带初始值，避免覆盖或取不到状态
      that.form1.data = {
          status: 0
      };
      
      that.form1.props.show = true; // 唤起弹窗
    },

    /**
     * 点击表格行级操作：呼出编辑日计划弹窗，并携带回显数据
     */
    updateBtn({ item }) {
      that.form1.props.action = "admin/plan/sys/update";
      that.form1.props.formType = "update";
      that.form1.props.title = "重新指配修整：日计划";
      that.form1.data = item;
      that.form1.props.show = true; // 唤起弹窗
    },

    /**
     * 表格安全删除方法调用软删除云函数
     */
    deleteBtn({ item }) {
      vk.callFunction({
        url: "admin/plan/sys/delete",
        data: { _id: item._id },
        success: (res) => {
           that.refresh(); // 删除成功后自动调用刷新函数
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-body {
  padding: 20rpx;
}
</style>
