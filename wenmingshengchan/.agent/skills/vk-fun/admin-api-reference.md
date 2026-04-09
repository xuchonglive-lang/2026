# Admin 后台组件规范

## 万能表格 vk-data-table

### 核心思想：通过 JSON 配置渲染规则

### 基础用法

```html
<vk-data-table
  ref="table1"
  :action="'admin/模块名/sys/getList'"
  :columns="table1.columns"
  :query-form-param="queryForm1"
  :right-btns="['detail_auto','update','delete']"
  :pagination="true"
  @detail="onDetail"
  @update="onUpdate"
  @delete="onDelete"
></vk-data-table>
```

```js
export default {
  data() {
    return {
      queryForm1: {},
      table1: {
        columns: [
          { key: '_id', title: 'ID', type: 'text', width: 200 },
          { key: 'nickname', title: '昵称', type: 'text', width: 200 },
          { key: 'avatar', title: '头像', type: 'avatar', width: 80, shape: 'circle' },
          { key: '_add_time', title: '添加时间', type: 'time', width: 160, valueFormat: 'yyyy-MM-dd hh:mm:ss' },
        ],
      },
    };
  },
};
```

### 表格属性

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| action | String/Function | - | 云函数地址 或 http 地址 或 自定义 function |
| auto-action | Boolean | - | 组件加载后自动请求 |
| columns | Array | [] | 字段显示规则 |
| query-form-param | Object | {} | 查询参数 |
| data | Array | - | 静态模式数据 |
| pagination | Boolean | false | 显示分页器 |
| page-size | Number | 10 | 每页显示数量 |
| selection | Boolean | false | 显示多选框 |
| rowNo | Boolean | false | 显示序号 |
| right-btns | Array | [] | 右侧按钮列表 |
| right-btns-more | Array | [] | 更多按钮列表 |
| custom-right-btns | Array | [] | 自定义右侧按钮 |
| default-sort | Object | - | 默认排序 `{ name:'_add_time', type:'desc' }` |
| expand | Boolean | false | 展开行 |
| border | Boolean | false | 纵向边框（可拖动改变列宽） |
| stripe | Boolean | false | 斑马纹 |
| show-summary | Boolean | false | 显示合计行 |
| retry-count | Number | 0 | 异常重试次数 |
| encrypt-action | Boolean | false | 加密请求 |
| data-preprocess | Function | - | 数据预处理 |

### columns 字段类型 (type)

| type | 说明 | 特有属性 |
|------|------|----------|
| text | 文本 | defaultValue |
| avatar | 头像 | imageWidth, shape(circle/square) |
| image | 图片 | imageWidth |
| tag | 标签 | data, size |
| time | 时间 | valueFormat |
| dateDiff | 距现在 | - |
| switch | 开关 | activeValue, inactiveValue |
| rate | 评分 | - |
| icon | 图标 | data |
| progress | 进度条 | - |
| money | 金额(分→元) | - |
| percentage | 百分比 | - |
| discount | 折扣 | - |
| link | 链接 | - |
| element | element 组件 | - |

### columns 属性

| 参数 | 类型 | 说明 |
|------|------|------|
| key | String | 键名 |
| title | String | 标题 |
| type | String | 类型 |
| width | Number | 宽度 |
| minWidth | Number | 最小宽度（自动填充） |
| align | String | 对齐（center/left/right） |
| sortable | String | 排序（custom/true/false） |
| fixed | String/Boolean | 列固定（true/left/right） |
| show | Array | 显示规则（detail/row/expand/none） |
| defaultValue | String | 默认值 |
| formatter | Function | 自定义格式化 `(val, row, column, index)` |
| buttons | Array | 扩展按钮 |

### right-btns 可选值

| 值 | 说明 |
|----|------|
| detail | 触发 detail 事件 |
| detail_auto | 自动弹出详情页 |
| update | 触发 update 事件 |
| delete | 触发 delete 事件 |
| more | 搭配 right-btns-more |

### 自定义按钮（带权限控制）

```js
rightBtns: [
  'detail_auto',
  {
    mode: 'update', title: '编辑',
    disabled: (item) => !this.$hasRole('admin') && !this.$hasPermission('user-update'),
  },
  {
    mode: 'delete', title: '删除',
    show: (item) => this.$hasRole('admin') || this.$hasPermission('user-delete'),
  },
  'more'
],
```

### 表格事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| detail | 详情按钮点击 | row |
| update | 修改按钮点击 | row |
| delete | 删除按钮点击 | row |
| selection-change | 多选改变 | rows |
| page-change | 页码改变 | pageIndex |
| success | 请求成功 | data |
| fail | 请求失败 | err |

### 表格方法

```js
this.$refs.table1.refresh();                // 刷新（重新请求）
this.$refs.table1.search(queryFormParam);    // 搜索（重置页码）
this.$refs.table1.getSelectionData();        // 获取多选数据
this.$refs.table1.clearSelection();          // 清空多选
```

### 自定义 function 请求模式

```js
table1: {
  action: (obj = {}) => {
    let { data, success, fail, complete } = obj;
    vk.callFunction({
      url: '云函数路径',
      data: data,
      success: (res) => {
        if (typeof success === 'function') {
          success({
            rows: res.rows,
            total: res.total,
          });
        }
      },
      fail: (res) => { if (typeof fail === 'function') fail(res); },
    });
  },
},
```

---

## 万能表单 vk-data-form

### 核心思想：通过 JSON 配置渲染规则

### 基础用法

```html
<vk-data-dialog v-model="form1.props.show" title="表单标题" width="600px" mode="form">
  <vk-data-form
    ref="form1"
    v-model="form1.data"
    :action="form1.props.action"
    :columns="form1.props.columns"
    :rules="form1.props.rules"
    :form-type="form1.props.formType"
    :loading.sync="form1.props.loading"
    :auto-close="true"
    label-width="140px"
    @success="onFormSuccess"
  ></vk-data-form>
</vk-data-dialog>
```

```js
export default {
  data() {
    return {
      form1: {
        data: {},
        props: {
          action: 'admin/模块名/sys/add',
          columns: [
            { key: 'nickname', title: '昵称', type: 'text' },
            { key: 'gender', title: '性别', type: 'radio',
              data: [
                { value: 1, label: '男' },
                { value: 2, label: '女' },
              ],
            },
          ],
          rules: {
            nickname: [{ required: true, message: '昵称不能为空', trigger: 'change' }],
          },
          formType: '',       // add 或 update
          loading: false,
          show: false,
        },
      },
    };
  },
};
```

### 表单属性

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| v-model | Object | {} | 表单数据源 |
| action | String/Function | - | 提交地址 |
| columns | Array | [] | 字段规则 |
| rules | Object | - | 验证规则 |
| form-type | String | - | 表单类型（add/update） |
| loading | Boolean | false | 请求中 |
| label-width | String | "80px" | label 宽度 |
| auto-close | Boolean | true | 成功后自动关闭 |
| before-action | Function | - | 提交前拦截器 |
| footer-show | Boolean | true | 底部按钮 |
| disabled | Boolean | false | 禁用表单 |
| inline | Boolean | false | 横向表单 |
| columns-number | Number | 2 | 横向每行数量 |
| encrypt-action | Boolean | false | 加密请求 |

### 表单组件类型 (type)

| type | 说明 | 特有属性 |
|------|------|----------|
| text | 单行文本 | prepend, append, prefixIcon |
| textarea | 多行文本 | autosize, maxlength, showWordLimit |
| number | 数字 | precision, min, max, controls |
| money | 金额(分) | - |
| percentage | 百分比 | precision |
| discount | 折扣 | - |
| radio | 单选 | data, optionType(button) |
| checkbox | 复选 | data |
| select | 下拉选择 | data, multiple, filterable |
| switch | 开关 | - |
| rate | 评分 | allowHalf |
| slider | 滑块 | - |
| color | 颜色选择 | showAlpha |
| image | 图片上传 | limit |
| file | 文件上传 | limit |
| date | 日期 | dateType(date/datetime/daterange/datetimerange) |
| time | 时间 | isRange |
| editor | 富文本 | - |
| address | 地址选择 | - |
| cascader | 级联选择 | action, props |
| remote-select | 远程搜索 | action, placeholder |
| table-select | 表格选择 | action, columns, multiple |
| object | 对象类型 | columns（嵌套） |
| group | 横向布局 | columns, justify |
| array\<string\> | 字符串数组 | - |
| bar-title | 分隔标题 | - |
| text-view | 文本展示 | - |
| money-view | 金额展示 | - |
| html | HTML展示 | - |

### columns 属性

| 参数 | 类型 | 说明 |
|------|------|------|
| key | String | 字段名 |
| title | String | 显示名称 |
| type | String | 组件类型 |
| width | Number | 宽度(px) |
| placeholder | String | 占位符 |
| tips | String | 下方固定提示（支持HTML） |
| show | Array | 复用时显示规则 |
| showRule | String/Function | 条件显示（如 `"type==1"`） |
| disabled | Boolean/String/Function | 条件禁用 |
| watch | Function | 监听值改变 |
| labelWidth | Number | 单独设置label宽度 |
| showLabel | Boolean | 是否显示label |

### showRule 条件显示

```js
// 字符串形式（支持 = == > >= < <= != {in} {nin} && ||）
{ key: 'mode', title: '模式', type: 'radio', showRule: 'login_appid_type==1' }

// 函数形式
{ key: 'mode', title: '模式', type: 'radio',
  showRule: (formData) => formData.login_appid_type == 1
}

// {in} 和 {nin}
{ key: 'text1', title: 'arr包含1则显示', type: 'text', showRule: 'arr{in}1' }
```

### 表单验证规则

```js
rules: {
  nickname: [
    { required: true, message: '昵称不能为空', trigger: ['blur', 'change'] },
    { min: 2, max: 20, message: '长度在2到20之间', trigger: 'blur' },
  ],
  mobile: [
    { required: true, message: '手机号不能为空', trigger: ['blur', 'change'] },
    { validator: vk.pubfn.validator('mobile'), message: '手机号格式错误', trigger: 'blur' },
  ],
  email: [
    { validator: vk.pubfn.validator('email'), message: '邮箱格式错误', trigger: 'blur' },
  ],
  // 更多内置验证器: mobile, card, username, pwd/password, payPwd, postal, qq, email, url, ip, date, time
}
```

### before-action 拦截器

```js
beforeAction: (formData) => {
  // 修改 formData 后返回
  // return false 可阻止提交
  return formData;
},
```

### 表单事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| success | 提交成功 | { data, formType } |
| fail | 提交失败 | { data, formType } |
| cancel | 取消 | - |

### 表单方法

```js
this.$refs.form1.submit();     // 手动提交
this.$refs.form1.reset();      // 重置表单
```

---

## 弹窗组件 vk-data-dialog

```html
<vk-data-dialog
  v-model="form1.props.show"
  title="弹窗标题"
  width="600px"
  mode="form"
>
  <!-- 放入 vk-data-form 或自定义内容 -->
</vk-data-dialog>
```

| 参数 | 类型 | 说明 |
|------|------|------|
| v-model | Boolean | 控制显示/隐藏 |
| title | String | 弹窗标题 |
| width | String | 弹窗宽度 |
| mode | String | 模式（form 表单模式） |
| top | String | 距顶部距离 |
| fullscreen | Boolean | 是否全屏 |

## 完整 CRUD 页面模板

```js
export default {
  data() {
    return {
      // 查询表单
      queryForm1: {},
      // 表格配置
      table1: {
        columns: [
          { key: 'name', title: '名称', type: 'text', width: 200 },
          { key: '_add_time', title: '添加时间', type: 'time', width: 160, sortable: 'custom' },
        ],
      },
      // 表单配置
      form1: {
        data: {},
        props: {
          action: '',
          formType: '',
          loading: false,
          show: false,
          columns: [
            { key: 'name', title: '名称', type: 'text' },
          ],
          rules: {
            name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
          },
        },
      },
    };
  },
  methods: {
    // 添加
    onAdd() {
      this.form1.props.formType = 'add';
      this.form1.props.action = 'admin/模块/sys/add';
      this.form1.data = {};
      this.form1.props.show = true;
    },
    // 修改
    onUpdate(row) {
      this.form1.props.formType = 'update';
      this.form1.props.action = 'admin/模块/sys/update';
      this.form1.data = vk.pubfn.copyObject(row);
      this.form1.props.show = true;
    },
    // 删除
    onDelete(row) {
      vk.callFunction({
        url: 'admin/模块/sys/delete',
        title: '删除中...',
        data: { _id: row._id },
        success: () => {
          this.$refs.table1.refresh();
        },
      });
    },
    // 表单提交成功
    onFormSuccess() {
      this.$refs.table1.refresh();
    },
  },
};
```
