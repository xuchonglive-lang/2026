(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/baseinfo/dept/list"],{

/***/ 50:
/*!******************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/main.js?{"page":"pages%2Fbaseinfo%2Fdept%2Flist"} ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 5);
__webpack_require__(/*! uni-pages */ 31);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 32);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 26));
var _list = _interopRequireDefault(__webpack_require__(/*! ./pages/baseinfo/dept/list.vue */ 51));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_list.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 3)["createPage"]))

/***/ }),

/***/ 51:
/*!*********************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages/baseinfo/dept/list.vue ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _list_vue_vue_type_template_id_31ba615e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list.vue?vue&type=template&id=31ba615e&scoped=true& */ 52);
/* harmony import */ var _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list.vue?vue&type=script&lang=js& */ 54);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 49);

var renderjs




/* normalize component */

var component = Object(_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _list_vue_vue_type_template_id_31ba615e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _list_vue_vue_type_template_id_31ba615e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "31ba615e",
  null,
  false,
  _list_vue_vue_type_template_id_31ba615e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/baseinfo/dept/list.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 52:
/*!****************************************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages/baseinfo/dept/list.vue?vue&type=template&id=31ba615e&scoped=true& ***!
  \****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_31ba615e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./list.vue?vue&type=template&id=31ba615e&scoped=true& */ 53);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_31ba615e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_31ba615e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_31ba615e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_31ba615e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 53:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/AI project/2026/wenmingshengchan/mp-admin/pages/baseinfo/dept/list.vue?vue&type=template&id=31ba615e&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 54:
/*!**********************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages/baseinfo/dept/list.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./list.vue?vue&type=script&lang=js& */ 55);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 55:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/AI project/2026/wenmingshengchan/mp-admin/pages/baseinfo/dept/list.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var that;
var vk = uni.vk;
var originalForms = {};
var _default = {
  data: function data() {
    var _this = this;
    return {
      deptTreeData: [],
      treeProps: {
        children: 'children',
        label: 'name'
      },
      selectedDept: null,
      table1: {
        action: function action() {
          var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var data = obj.data,
            _success = obj.success,
            _fail = obj.fail,
            _complete = obj.complete;
          data.parent_id = _this.queryForm1.formData.parent_id || "";
          vk.callFunction({
            url: "admin/base-dept/sys/getList",
            data: data,
            success: function success(res) {
              if (typeof _success === "function") {
                _success({
                  rows: res.rows || [],
                  total: res.total || 0
                });
              }
            },
            fail: function fail(err) {
              if (typeof _fail === "function") _fail(err);
            },
            complete: function complete() {
              if (typeof _complete === "function") _complete();
            }
          });
        },
        columns: [{
          key: "name",
          title: "小组名称",
          type: "text",
          width: 180
        }, {
          key: "manager",
          title: "负责人",
          type: "text",
          width: 120
        }, {
          key: "sort",
          title: "排序",
          type: "number",
          width: 80
        }, {
          key: "status",
          title: "状态",
          type: "tag",
          width: 80,
          data: [{
            value: 1,
            label: '正常',
            tagType: 'success'
          }, {
            value: 0,
            label: '禁用',
            tagType: 'danger'
          }]
        }, {
          key: "_add_time",
          title: "创建时间",
          type: "time",
          width: 160
        }]
      },
      queryForm1: {
        formData: {
          parent_id: "" // 绑定当前的左侧部门ID
        },

        columns: [{
          key: "name",
          title: "名称搜索",
          type: "text",
          mode: "%%",
          width: 200
        }]
      },
      form1: {
        data: {},
        props: {
          action: "",
          title: "表单",
          formType: "",
          show: false,
          columns: [{
            key: "name",
            title: "名称",
            type: "text",
            placeholder: "请输入名称"
          }, {
            key: "parent_id",
            title: "上级归属",
            type: "cascader",
            data: [],
            props: {
              value: "_id",
              label: "name",
              children: "children",
              checkStrictly: true,
              emitPath: false
            },
            placeholder: "请选择架构层级"
          }, {
            key: "manager",
            title: "负责人",
            type: "text",
            placeholder: "姓名"
          }, {
            key: "sort",
            title: "排序号",
            type: "number",
            defaultValue: 0
          }, {
            key: "status",
            title: "状态",
            type: "radio",
            data: [{
              value: 1,
              label: '正常'
            }, {
              value: 0,
              label: '禁用'
            }],
            defaultValue: 1
          }],
          rules: {
            name: [{
              required: true,
              message: "名称不能为空",
              trigger: "blur"
            }]
          }
        }
      }
    };
  },
  onLoad: function onLoad() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    that = this;
    vk = that.vk;
    that.init();
  },
  methods: {
    init: function init() {
      originalForms["form1"] = vk.pubfn.copyObject(that.form1);
      that.loadDeptTree();
    },
    loadDeptTree: function loadDeptTree() {
      vk.callFunction({
        url: 'admin/base-dept/sys/getTree',
        success: function success(data) {
          that.deptTreeData = [{
            _id: "",
            name: "马城矿业",
            children: data.rows || []
          }];
          var parentColIndex = vk.pubfn.getListIndex(that.form1.props.columns, "key", "parent_id");
          if (parentColIndex > -1) {
            that.form1.props.columns[parentColIndex].data = that.deptTreeData;
          }
        }
      });
    },
    handleNodeClick: function handleNodeClick(data) {
      that.selectedDept = data;
      that.queryForm1.formData.parent_id = data._id;
      that.$nextTick(function () {
        that.search();
      });
    },
    search: function search() {
      that.$refs.table1 && that.$refs.table1.search();
    },
    refresh: function refresh() {
      that.$refs.table1 && that.$refs.table1.refresh();
    },
    addDeptBtn: function addDeptBtn() {
      // 在左侧点新增，默认是添加顶级部门
      vk.pubfn.resetForm(originalForms, that);
      that.form1.props.action = "admin/base-dept/sys/add";
      that.form1.props.formType = "add";
      that.form1.props.title = "新增大部门";
      that.form1.data.parent_id = "";
      that.form1.data.status = 1;
      that.form1.props.show = true;
    },
    addGroupBtn: function addGroupBtn() {
      // 在右侧点新增，属于向选中节点添加小组
      vk.pubfn.resetForm(originalForms, that);
      that.form1.props.action = "admin/base-dept/sys/add";
      that.form1.props.formType = "add";
      that.form1.props.title = "新增下属小组";
      if (that.selectedDept) {
        that.form1.data.parent_id = that.selectedDept._id;
      }
      that.form1.data.status = 1;
      that.form1.props.show = true;
    },
    updateBtn: function updateBtn(_ref) {
      var item = _ref.item;
      that.form1.props.action = "admin/base-dept/sys/update";
      that.form1.props.formType = "update";
      that.form1.props.title = "编辑架构";
      that.form1.data = vk.pubfn.copyObject(item);
      that.form1.props.show = true;
    },
    deleteBtn: function deleteBtn(_ref2) {
      var item = _ref2.item,
        deleteFn = _ref2.deleteFn;
      deleteFn({
        action: "admin/base-dept/sys/delete",
        data: {
          _id: item._id
        },
        success: function success() {
          that.loadDeptTree();
          that.refresh();
        }
      });
    },
    deleteDeptBtn: function deleteDeptBtn() {
      // 删除左侧选中的顶级部门
      if (!that.selectedDept) return;
      that.$confirm('确定要删除当前所选的部门吗？', '重要提示', {
        type: 'warning'
      }).then(function () {
        vk.callFunction({
          url: "admin/base-dept/sys/delete",
          data: {
            _id: that.selectedDept._id
          },
          success: function success() {
            that.selectedDept = null;
            that.queryForm1.formData.parent_id = "";
            that.loadDeptTree();
            that.$notify({
              message: '部门删除成功',
              type: 'success'
            });
          }
        });
      }).catch(function () {});
    },
    onFormSuccess: function onFormSuccess() {
      that.form1.props.show = false;
      that.loadDeptTree();
      that.refresh();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 3)["default"]))

/***/ })

},[[50,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/baseinfo/dept/list.js.map