(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages_plugs/system_uni/vk-error-log"],{

/***/ 219:
/*!***************************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/main.js?{"page":"pages_plugs%2Fsystem_uni%2Fvk-error-log"} ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 5);
__webpack_require__(/*! uni-pages */ 31);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 32);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 26));
var _vkErrorLog = _interopRequireDefault(__webpack_require__(/*! ./pages_plugs/system_uni/vk-error-log.vue */ 220));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_vkErrorLog.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 3)["createPage"]))

/***/ }),

/***/ 220:
/*!********************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages_plugs/system_uni/vk-error-log.vue ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vk_error_log_vue_vue_type_template_id_12271e73_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vk-error-log.vue?vue&type=template&id=12271e73&scoped=true& */ 221);
/* harmony import */ var _vk_error_log_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vk-error-log.vue?vue&type=script&lang=js& */ 223);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _vk_error_log_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _vk_error_log_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _vk_error_log_vue_vue_type_style_index_0_id_12271e73_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vk-error-log.vue?vue&type=style&index=0&id=12271e73&lang=scss&scoped=true& */ 225);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 49);

var renderjs





/* normalize component */

var component = Object(_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _vk_error_log_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _vk_error_log_vue_vue_type_template_id_12271e73_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _vk_error_log_vue_vue_type_template_id_12271e73_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "12271e73",
  null,
  false,
  _vk_error_log_vue_vue_type_template_id_12271e73_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages_plugs/system_uni/vk-error-log.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 221:
/*!***************************************************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages_plugs/system_uni/vk-error-log.vue?vue&type=template&id=12271e73&scoped=true& ***!
  \***************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_error_log_vue_vue_type_template_id_12271e73_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./vk-error-log.vue?vue&type=template&id=12271e73&scoped=true& */ 222);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_error_log_vue_vue_type_template_id_12271e73_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_error_log_vue_vue_type_template_id_12271e73_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_error_log_vue_vue_type_template_id_12271e73_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_error_log_vue_vue_type_template_id_12271e73_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 222:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/AI project/2026/wenmingshengchan/mp-admin/pages_plugs/system_uni/vk-error-log.vue?vue&type=template&id=12271e73&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ 223:
/*!*********************************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages_plugs/system_uni/vk-error-log.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_error_log_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./vk-error-log.vue?vue&type=script&lang=js& */ 224);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_error_log_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_error_log_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_error_log_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_error_log_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_error_log_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 224:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/AI project/2026/wenmingshengchan/mp-admin/pages_plugs/system_uni/vk-error-log.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

var vk = uni.vk; // vk实例
var dcloudAppidData = [];
var statusData = [{
  value: 0,
  label: '待处理',
  tagType: 'danger'
}, {
  value: 1,
  label: '已处理',
  tagType: 'success'
}, {
  value: 2,
  label: '不处理',
  tagType: 'info'
}];
var _default = {
  data: function data() {
    var _this = this;
    // 页面数据变量
    return {
      // 页面是否请求中或加载中
      loading: false,
      // init请求返回的数据
      data: {},
      // 表格相关开始 -----------------------------------------------------------
      table1: {
        // 表格数据请求地址
        action: 'admin/system_uni/error-log/sys/getList',
        // 表格字段显示规则
        columns: [{
          key: 'userInfo',
          title: '用户信息',
          type: 'userInfo',
          width: 150
        }, {
          key: 'request_id',
          title: '请求ID',
          type: 'text',
          width: 300
        }, {
          key: 'url',
          title: '请求地址',
          type: 'text',
          width: 300
        }, {
          key: 'data',
          title: '请求参数',
          type: 'json',
          width: 190
        }, {
          key: 'count',
          title: '出现次数',
          type: 'number',
          width: 110,
          sortable: 'custom'
        }, {
          key: 'status',
          title: '当前状态',
          type: 'tag',
          width: 100,
          data: statusData
        }, {
          key: 'err.message',
          title: '错误信息',
          type: 'text',
          width: 300,
          show: ['rows']
        }, {
          key: 'err',
          title: '错误堆栈',
          type: 'html',
          width: 200,
          show: ['detail'],
          formatter: function formatter(val, row, column, index) {
            if (typeof val.stack === 'undefined') {
              return JSON.stringify(val);
            }
            var str = val.stack.replace(/\n/g, '<br>');
            return str;
          }
        }, {
          key: '_add_time',
          title: '添加时间',
          type: 'time',
          width: 160,
          sortable: 'custom'
        }, {
          key: '_add_time',
          title: '距离现在',
          type: 'dateDiff',
          width: 120
        }, {
          key: 'md5',
          title: 'MD5值',
          type: 'text',
          width: 280
        }],
        // 多选框选中的值
        multipleSelection: [],
        // 当前高亮的记录
        selectItem: '',
        customRightBtns: [{
          title: '处理',
          type: 'primary',
          icon: 'el-icon-edit',
          disabled: function disabled(formData) {
            return formData.status === 0 ? false : true;
          },
          onClick: function onClick(item) {
            _this.updateBtn({
              item: vk.pubfn.copyObject(item)
            });
          }
        }]
      },
      // 表格相关结束 -----------------------------------------------------------
      // 表单相关开始 -----------------------------------------------------------
      // 查询表单请求数据
      queryForm1: {
        // 查询表单数据源，可在此设置默认值
        formData: {
          dcloud_appid: '',
          status: 0,
          _add_time: []
        },
        // 查询表单的字段规则 fieldName:指定数据库字段名,不填默认等于key
        columns: [{
          key: 'request_id',
          title: '请求ID',
          type: 'text',
          width: 140,
          mode: '='
        }, {
          key: 'user_id',
          title: '用户ID',
          type: 'text',
          width: 140,
          mode: '='
        }, {
          key: 'url',
          title: '请求地址',
          type: 'text',
          width: 140,
          mode: '='
        }, {
          key: 'status',
          title: '当前状态',
          type: 'select',
          width: 140,
          mode: '=',
          clearable: false,
          data: [{
            value: '',
            label: '全部'
          }].concat(statusData)
        }, {
          key: '_add_time',
          title: '添加时间',
          type: 'datetimerange',
          width: 380,
          mode: '[]',
          clearable: false
        }]
      },
      form1: {
        // 表单请求数据，此处可以设置默认值
        data: {},
        // 表单属性
        props: {
          // 表单请求地址
          action: '',
          // 表单字段显示规则
          columns: [
          // { key: "request_id", title: "请求ID", type: "text-view" },
          {
            key: 'url',
            title: '请求地址',
            type: 'text-view'
          }, {
            key: 'data',
            title: '请求参数',
            type: 'text-view'
          }, {
            key: 'md5',
            title: 'md5',
            type: 'text-view'
          }, {
            key: 'stack',
            title: '错误堆栈',
            type: 'text-view'
          }, {
            key: 'status',
            title: '当前状态',
            type: 'radio',
            optionType: 'button',
            width: 140,
            clearable: false,
            data: statusData
          }, {
            key: 'comment',
            title: '备注',
            type: 'textarea',
            placeholder: '请输入备注',
            autosize: {
              minRows: 4,
              maxRows: 10
            },
            maxlength: 1000,
            showWordLimit: true
          }],
          // 表单验证规则
          rules: {},
          // add 代表添加 update 代表修改
          formType: '',
          // 是否显示表单的弹窗
          show: false
        }
      }
      // 表单相关结束 -----------------------------------------------------------
    };
  },
  // 监听 - 页面每次【加载时】执行(如：前进)
  onLoad: function onLoad() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    vk = this.vk;
    this.options = options;
    this.init(options);
  },
  // 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
  onReady: function onReady() {},
  // 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
  onShow: function onShow() {},
  // 监听 - 页面每次【隐藏时】执行(如：返回)
  onHide: function onHide() {},
  // 函数
  methods: {
    // 页面数据初始化函数
    init: function init(options) {
      // 默认查询近7天的数据
      var _vk$pubfn$getDayOffse = vk.pubfn.getDayOffsetStartAndEnd(-7),
        startTime = _vk$pubfn$getDayOffse.startTime;
      var _vk$pubfn$getDayOffse2 = vk.pubfn.getDayOffsetStartAndEnd(0),
        endTime = _vk$pubfn$getDayOffse2.endTime;
      this.queryForm1.formData._add_time = [startTime, endTime];
    },
    // 搜索
    search: function search(obj) {
      this.$refs.table1.query(obj);
    },
    // 刷新
    refresh: function refresh() {
      this.$refs.table1.refresh();
    },
    // 显示修改页面
    updateBtn: function updateBtn(_ref) {
      var item = _ref.item;
      this.form1.props.action = 'admin/system_uni/error-log/sys/update';
      this.form1.props.formType = 'update';
      this.form1.props.title = '处理';
      this.form1.props.show = true;
      this.form1.data = item;
    },
    updateSuccess: function updateSuccess() {
      this.form1.props.show = false;
      this.$refs.table1.updateRows({
        mode: 'update',
        // update 局部字段更新 set 覆盖字段更新
        rows: [{
          _id: this.form1.data._id,
          status: this.form1.data.status
        }]
      });
    }
  },
  watch: {},
  // 计算属性
  computed: {}
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 3)["default"]))

/***/ }),

/***/ 225:
/*!******************************************************************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages_plugs/system_uni/vk-error-log.vue?vue&type=style&index=0&id=12271e73&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_error_log_vue_vue_type_style_index_0_id_12271e73_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./vk-error-log.vue?vue&type=style&index=0&id=12271e73&lang=scss&scoped=true& */ 226);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_error_log_vue_vue_type_style_index_0_id_12271e73_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_error_log_vue_vue_type_style_index_0_id_12271e73_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_error_log_vue_vue_type_style_index_0_id_12271e73_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_error_log_vue_vue_type_style_index_0_id_12271e73_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_vk_error_log_vue_vue_type_style_index_0_id_12271e73_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 226:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/AI project/2026/wenmingshengchan/mp-admin/pages_plugs/system_uni/vk-error-log.vue?vue&type=style&index=0&id=12271e73&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[219,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages_plugs/system_uni/vk-error-log.js.map