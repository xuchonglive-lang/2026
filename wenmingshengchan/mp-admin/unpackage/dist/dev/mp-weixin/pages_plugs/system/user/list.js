(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages_plugs/system/user/list"],{

/***/ 130:
/*!**********************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/main.js?{"page":"pages_plugs%2Fsystem%2Fuser%2Flist"} ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 5);
__webpack_require__(/*! uni-pages */ 31);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 32);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 26));
var _list = _interopRequireDefault(__webpack_require__(/*! ./pages_plugs/system/user/list.vue */ 131));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_list.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 3)["createPage"]))

/***/ }),

/***/ 131:
/*!*************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages_plugs/system/user/list.vue ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _list_vue_vue_type_template_id_214b42d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list.vue?vue&type=template&id=214b42d6&scoped=true& */ 132);
/* harmony import */ var _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list.vue?vue&type=script&lang=js& */ 134);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 49);

var renderjs




/* normalize component */

var component = Object(_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _list_vue_vue_type_template_id_214b42d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _list_vue_vue_type_template_id_214b42d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "214b42d6",
  null,
  false,
  _list_vue_vue_type_template_id_214b42d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages_plugs/system/user/list.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 132:
/*!********************************************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages_plugs/system/user/list.vue?vue&type=template&id=214b42d6&scoped=true& ***!
  \********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_214b42d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./list.vue?vue&type=template&id=214b42d6&scoped=true& */ 133);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_214b42d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_214b42d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_214b42d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_template_id_214b42d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 133:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/AI project/2026/wenmingshengchan/mp-admin/pages_plugs/system/user/list.vue?vue&type=template&id=214b42d6&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var g0 = _vm.table1.multipleSelection
    ? _vm.table1.multipleSelection.length
    : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.form1.props.show = false
      _vm.refresh()
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 134:
/*!**************************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages_plugs/system/user/list.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./list.vue?vue&type=script&lang=js& */ 135);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 135:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/AI project/2026/wenmingshengchan/mp-admin/pages_plugs/system/user/list.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

var vk = uni.vk; // vk实例
var originalForms = {}; // 表单初始化数据
var genderData = [{
  value: 1,
  label: '男'
}, {
  value: 2,
  label: '女'
}, {
  value: 0,
  label: '保密'
}];
var dcloudAppidData = [];
var bindRole = function bindRole() {
  __webpack_require__.e(/*! require.ensure | pages_plugs/system/user/form/bindRole */ "pages_plugs/system/user/form/bindRole").then((function () {
    return resolve(__webpack_require__(/*! ./form/bindRole */ 592));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var resetPassword = function resetPassword() {
  __webpack_require__.e(/*! require.ensure | pages_plugs/system/user/form/resetPassword */ "pages_plugs/system/user/form/resetPassword").then((function () {
    return resolve(__webpack_require__(/*! ./form/resetPassword */ 597));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var setAuthorizedAppLogin = function setAuthorizedAppLogin() {
  __webpack_require__.e(/*! require.ensure | pages_plugs/system/user/form/setAuthorizedAppLogin */ "pages_plugs/system/user/form/setAuthorizedAppLogin").then((function () {
    return resolve(__webpack_require__(/*! ./form/setAuthorizedAppLogin */ 602));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    bindRole: bindRole,
    resetPassword: resetPassword,
    setAuthorizedAppLogin: setAuthorizedAppLogin
  },
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
        action: 'admin/system/user/sys/getList',
        // 表格字段显示规则
        columns: [{
          key: 'avatar',
          title: '头像',
          type: 'avatar',
          width: 80
        }, {
          key: 'username',
          title: '用户名',
          type: 'text',
          width: 180,
          defaultValue: '未设置'
        }, {
          key: 'nickname',
          title: '昵称',
          type: 'text',
          width: 180,
          defaultValue: '未设置'
        }, {
          key: 'mobile',
          title: '手机号',
          type: 'text',
          width: 120,
          defaultValue: '未绑定'
        }, {
          key: 'appList',
          title: '可登录的应用',
          type: 'html',
          width: 220,
          formatter: function formatter(val, row, column, index) {
            if (typeof row.dcloud_appid === 'undefined') return '全部应用';
            if (row.dcloud_appid.length === 0) return '未绑定任何应用';
            if (val.length === 0 && row.dcloud_appid.length > 0) return row.dcloud_appid;
            var str = '';
            val.map(function (item, index) {
              str += "\u3001".concat(item.name);
            });
            if (str) str = str.substring(1);
            return str;
          }
        }, {
          key: 'role',
          title: '角色',
          type: 'text',
          width: 120,
          defaultValue: '无'
        }, {
          key: 'comment',
          title: '备注',
          type: 'text',
          width: 160
        }, {
          key: 'allow_login_background',
          title: '允许登录后台',
          type: 'tag',
          width: 140,
          defaultValue: false,
          sortable: 'custom',
          data: [{
            value: true,
            label: '允许',
            tagType: 'success'
          }, {
            value: false,
            label: '禁止',
            tagType: 'danger'
          }]
        }, {
          key: 'status',
          title: '账户状态',
          type: 'tag',
          width: 120,
          defaultValue: 0,
          sortable: 'custom',
          data: [{
            value: 0,
            label: '正常',
            tagType: 'success'
          }, {
            value: 1,
            label: '冻结',
            tagType: 'danger'
          }, {
            value: 2,
            label: '审核中',
            tagType: 'primary'
          }, {
            value: 3,
            label: '审核拒绝',
            tagType: 'info'
          }]
        }, {
          key: 'gender',
          title: '性别',
          type: 'radio',
          width: 80,
          defaultValue: 0,
          sortable: 'custom',
          data: genderData
        }, {
          key: 'register_date',
          title: '注册时间',
          type: 'time',
          width: 160,
          sortable: 'custom'
        }, {
          key: 'last_login_date',
          title: '最后登录时间',
          type: 'dateDiff',
          width: 130,
          defaultValue: '从未登录过',
          sortable: 'custom'
        }, {
          key: 'last_login_ip',
          title: '最后登录ip',
          type: 'text',
          width: 120,
          defaultValue: '从未登录过'
        }, {
          key: '_id',
          title: 'id',
          type: 'text',
          width: 280
        }],
        // 多选框选中的值
        multipleSelection: [],
        // 当前高亮的记录
        selectItem: '',
        customRightBtns: [{
          title: '绑定角色',
          type: 'primary',
          onClick: function onClick(item) {
            _this.bindRoleBtn(item);
          }
        }],
        rightBtnsMore: [{
          title: '重置密码',
          onClick: function onClick(item) {
            _this.resetPasswordBtn(item);
          }
        }]
      },
      // 表格相关结束 -----------------------------------------------------------
      // 表单相关开始-----------------------------------------------------------
      // 查询表单请求数据
      queryForm1: {
        // 查询表单数据源，可在此设置默认值
        formData: {
          dcloud_appid: ''
        },
        // 查询表单的字段规则 fieldName:指定数据库字段名,不填默认等于key
        columns: [{
          key: 'dcloud_appid',
          title: '所属应用',
          type: 'select',
          width: 150,
          mode: 'custom',
          data: [],
          props: {
            value: 'appid',
            label: 'name'
          }
        }, {
          key: 'username',
          title: '用户名',
          type: 'text',
          width: 140,
          mode: '%%'
        }, {
          key: 'nickname',
          title: '昵称',
          type: 'text',
          width: 140,
          mode: '%%'
        }, {
          key: 'mobile',
          title: '手机号',
          type: 'text',
          width: 140,
          mode: '%%'
        }, {
          key: '_id',
          title: 'ID',
          type: 'text',
          width: 140,
          mode: '='
        }, {
          key: 'register_date',
          title: '注册时间',
          type: 'datetimerange',
          width: 360,
          mode: '[]'
        }, {
          key: 'allow_login_background',
          hidden: true,
          mode: '='
        }]
      },
      form1: {
        // 表单请求数据，此处可以设置默认值
        data: {
          gender: 0,
          login_appid_type: 1,
          allow_login_background: false
        },
        // 表单属性
        props: {
          // 表单请求地址
          action: '',
          // 表单字段显示规则
          columns: [{
            key: 'username',
            title: '用户名',
            type: 'text',
            show: ['add']
          }, {
            key: 'nickname',
            title: '昵称',
            type: 'text'
          }, {
            key: 'gender',
            title: '性别',
            type: 'radio',
            data: genderData
          }, {
            key: 'password',
            title: '密码',
            type: 'text',
            tips: '若密码为空，则默认为234567',
            show: ['add']
          }, {
            key: 'mobile',
            title: '手机号',
            type: 'text'
          }, {
            key: 'login_appid_type',
            title: '登录权限',
            type: 'radio',
            optionType: 'button',
            data: [{
              value: 1,
              label: '部分应用'
            }, {
              value: 0,
              label: '全部应用'
            }],
            watch: function watch(_ref) {
              var value = _ref.value,
                formData = _ref.formData,
                column = _ref.column,
                index = _ref.index,
                option = _ref.option,
                $set = _ref.$set;
              if (value === 1) {
                $set('allow_login_background', false);
              } else {
                $set('allow_login_background', true);
              }
            }
          }, {
            key: 'dcloud_appid',
            title: '可登录的应用',
            type: 'checkbox',
            border: true,
            itemWidth: 100,
            data: [],
            props: {
              value: 'appid',
              label: 'name'
            },
            showRule: 'login_appid_type=1',
            watch: function watch(_ref2) {
              var value = _ref2.value,
                formData = _ref2.formData,
                column = _ref2.column,
                index = _ref2.index,
                _ref2$option = _ref2.option,
                option = _ref2$option === void 0 ? [] : _ref2$option,
                $set = _ref2.$set;
              var allow_login_background = false;
              option.map(function () {
                var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var index = arguments.length > 1 ? arguments[1] : undefined;
                if (item.type && item.type.indexOf('admin') > -1) {
                  allow_login_background = true;
                }
              });
              $set('allow_login_background', allow_login_background);
            }
          },
          // {
          //   key:"allow_login_background", title:"允许登录后台?", type:"switch",
          //   tips:"只有同时设置可登录的应用有管理端以及允许登后台，该用户才能登录管理端"
          // },
          {
            key: 'comment',
            title: '备注',
            type: 'textarea',
            maxlength: 99,
            showWordLimit: true,
            autosize: {
              minRows: 2,
              maxRows: 10
            }
          }],
          // 表单对应的验证规则
          rules: {
            username: [{
              required: true,
              validator: vk.pubfn.validator('username'),
              message: '用户名以字母开头，长度在6~18之间，只能包含字母、数字和下划线',
              trigger: 'blur'
            }],
            nickname: [{
              required: true,
              message: '昵称为必填字段',
              trigger: 'blur'
            }, {
              min: 2,
              max: 20,
              message: '昵称长度在 2 到 20 个字符',
              trigger: 'blur'
            }],
            password: [{
              validator: vk.pubfn.validator('password'),
              message: '密码长度在6~18之间，只能包含字母、数字和下划线',
              trigger: 'blur'
            }],
            mobile: [{
              validator: vk.pubfn.validator('mobile'),
              message: '手机号格式错误',
              trigger: 'blur'
            }]
          },
          // add 代表添加 update 代表修改
          formType: '',
          // 是否显示表单1 的弹窗
          show: false
        }
      },
      // 其他表单属性容器(请勿修改)
      formDatas: {}
      // 表单相关结束-----------------------------------------------------------
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
      originalForms['form1'] = vk.pubfn.copyObject(this.form1);
      this.getAppList();
    },
    // 获取应用列表
    getAppList: function getAppList(obj) {
      var _this2 = this;
      // 请在store/modules/$app.js文件里增加代码 appList: lifeData.$app.appList || []
      vk.callFunction({
        url: 'admin/system/app/sys/getList',
        data: {},
        success: function success(data) {
          dcloudAppidData = data.rows;
          var dcloudAppidData1 = vk.pubfn.copyObject(data.rows);
          var dcloudAppidData2 = vk.pubfn.copyObject(data.rows);
          var index1 = vk.pubfn.getListIndex(_this2.form1.props.columns, 'key', 'dcloud_appid');
          _this2.form1.props.columns[index1].data = dcloudAppidData1;
          dcloudAppidData2.unshift({
            appid: '___error___',
            name: '不存在的应用'
          });
          dcloudAppidData2.unshift({
            appid: '___empty-array___',
            name: '未绑定应用'
          });
          dcloudAppidData2.unshift({
            appid: '___non-existent___',
            name: '全部应用'
          });
          var index2 = vk.pubfn.getListIndex(_this2.queryForm1.columns, 'key', 'dcloud_appid');
          _this2.queryForm1.columns[index2].data = dcloudAppidData2;
          var appids = [];
          dcloudAppidData.map(function (item, index) {
            appids.push(item.appid);
          });
          _this2.queryForm1.formData.appids = appids;
        }
      });
    },
    // 页面跳转
    pageTo: function pageTo(path) {
      vk.navigateTo(path);
    },
    // 表单重置
    resetForm: function resetForm() {
      vk.pubfn.resetForm(originalForms, this);
    },
    // 搜索
    search: function search() {
      this.$refs.table1.search();
    },
    // 刷新
    refresh: function refresh() {
      this.$refs.table1.refresh();
    },
    // 获取当前选中的行的数据
    getCurrentRow: function getCurrentRow(key) {
      return this.$refs.table1.getCurrentRow(key);
    },
    // 监听 - 行的选中高亮事件
    currentChange: function currentChange(val) {
      this.table1.selectItem = val;
    },
    // 当选择项发生变化时会触发该事件
    selectionChange: function selectionChange(list) {
      this.table1.multipleSelection = list;
    },
    // 显示添加页面
    addBtn: function addBtn() {
      this.resetForm();
      this.form1.props.action = 'admin/system/user/sys/add';
      this.form1.props.formType = 'add';
      this.form1.props.title = '添加';
      this.form1.props.show = true;
    },
    // 显示修改页面
    updateBtn: function updateBtn(_ref3) {
      var item = _ref3.item;
      this.form1.props.action = 'admin/system/user/sys/update';
      this.form1.props.formType = 'update';
      this.form1.props.title = '编辑';
      this.form1.props.show = true;
      item.login_appid_type = typeof item.dcloud_appid === 'undefined' ? 0 : 1;
      this.form1.data = item;
    },
    // 删除按钮
    deleteBtn: function deleteBtn(_ref4) {
      var item = _ref4.item,
        deleteFn = _ref4.deleteFn;
      deleteFn({
        action: 'admin/system/user/sys/delete',
        data: {
          _id: item._id
        }
      });
    },
    // 监听 - 批量操作的按钮点击事件
    batchBtn: function batchBtn(index) {
      switch (index) {
        case 1:
          this.frozen(0);
          break;
        case 2:
          this.frozen(1);
          break;
        case 3:
          this.setAuthorizedAppLogin();
          break;
        default:
          break;
      }
    },
    // 角色绑定按钮
    bindRoleBtn: function bindRoleBtn(item) {
      vk.pubfn.openForm('bindRole', {
        item: item
      });
    },
    // 重置密码按钮
    resetPasswordBtn: function resetPasswordBtn(item) {
      vk.pubfn.openForm('resetPassword', {
        item: item
      });
    },
    //账户批量冻结/解冻
    frozen: function frozen(status) {
      var _this3 = this;
      var user_ids = [];
      this.table1.multipleSelection.map(function (item, index) {
        user_ids.push(item._id);
      });
      vk.callFunction({
        url: 'admin/system/user/sys/batchUpdateStatus',
        title: '请求中...',
        data: {
          user_ids: user_ids,
          status: status
        },
        success: function success(data) {
          _this3.$notify({
            message: '批量操作成功!',
            type: 'success'
          });
          _this3.refresh();
        }
      });
    },
    // 批量设置允许登录的客户端
    setAuthorizedAppLogin: function setAuthorizedAppLogin() {
      var user_ids = [];
      this.table1.multipleSelection.map(function (item, index) {
        user_ids.push(item._id);
      });
      this.formDatas.setAuthorizedAppLogin = {
        show: true,
        item: {
          user_ids: user_ids,
          dcloudAppidData: dcloudAppidData
        }
      };
    }
  },
  // 监听属性
  watch: {},
  // 计算属性
  computed: {}
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 3)["default"]))

/***/ })

},[[130,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages_plugs/system/user/list.js.map