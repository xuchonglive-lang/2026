(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/custom-editor-tinymce/custom-editor-tinymce"],{

/***/ 744:
/*!***************************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/components/custom-editor-tinymce/custom-editor-tinymce.vue ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _custom_editor_tinymce_vue_vue_type_template_id_05c2e8c8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./custom-editor-tinymce.vue?vue&type=template&id=05c2e8c8&scoped=true& */ 745);
/* harmony import */ var _custom_editor_tinymce_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-editor-tinymce.vue?vue&type=script&lang=js& */ 747);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _custom_editor_tinymce_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _custom_editor_tinymce_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _custom_editor_tinymce_vue_vue_type_style_index_0_id_05c2e8c8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom-editor-tinymce.vue?vue&type=style&index=0&id=05c2e8c8&scoped=true&lang=scss& */ 755);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 49);

var renderjs





/* normalize component */

var component = Object(_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _custom_editor_tinymce_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _custom_editor_tinymce_vue_vue_type_template_id_05c2e8c8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _custom_editor_tinymce_vue_vue_type_template_id_05c2e8c8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "05c2e8c8",
  null,
  false,
  _custom_editor_tinymce_vue_vue_type_template_id_05c2e8c8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/custom-editor-tinymce/custom-editor-tinymce.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 745:
/*!**********************************************************************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/components/custom-editor-tinymce/custom-editor-tinymce.vue?vue&type=template&id=05c2e8c8&scoped=true& ***!
  \**********************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_custom_editor_tinymce_vue_vue_type_template_id_05c2e8c8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./custom-editor-tinymce.vue?vue&type=template&id=05c2e8c8&scoped=true& */ 746);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_custom_editor_tinymce_vue_vue_type_template_id_05c2e8c8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_custom_editor_tinymce_vue_vue_type_template_id_05c2e8c8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_custom_editor_tinymce_vue_vue_type_template_id_05c2e8c8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_custom_editor_tinymce_vue_vue_type_template_id_05c2e8c8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 746:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/AI project/2026/wenmingshengchan/mp-admin/components/custom-editor-tinymce/custom-editor-tinymce.vue?vue&type=template&id=05c2e8c8&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var m0 =
    _vm.scene === "form" && _vm.fileSelect.fileType
      ? _vm._getProp("category_id")
      : null
  var m1 =
    _vm.scene === "form" && _vm.fileSelect.fileType
      ? _vm._getProp("cloudDirectory")
      : null
  var m2 =
    _vm.scene === "form" && _vm.fileSelect.fileType ? _vm._getProp("env") : null
  var m3 =
    _vm.scene === "form" && _vm.fileSelect.fileType
      ? _vm._getProp("cloudPathRemoveChinese")
      : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        m1: m1,
        m2: m2,
        m3: m3,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 747:
/*!****************************************************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/components/custom-editor-tinymce/custom-editor-tinymce.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_custom_editor_tinymce_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./custom-editor-tinymce.vue?vue&type=script&lang=js& */ 748);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_custom_editor_tinymce_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_custom_editor_tinymce_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_custom_editor_tinymce_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_custom_editor_tinymce_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_custom_editor_tinymce_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 748:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/AI project/2026/wenmingshengchan/mp-admin/components/custom-editor-tinymce/custom-editor-tinymce.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 5);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 33));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 14));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 12));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 36));
var _config = _interopRequireDefault(__webpack_require__(/*! ./config.js */ 749));
var _popup = __webpack_require__(/*! element-ui/lib/utils/popup */ 750);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * custom-editor-tinymce 富文本编辑器 - tinymce
 * 作者: VK
 * 基于 tinymce 实现的富文本编辑器，仅支持PC端，移动版H5只支持部分浏览器，微信浏览器不支持
 * vk-admin 文档：https://www.tiny.cloud
 * tinymce 官方文档：https://www.tiny.cloud
 * @property {String} value 双向绑定的值
 * @property {Object} column 万能表单或万能表格里的columns对应的字段规则
 * @property {String} scene 当前场景 form 万能表单 table 万能表格 detail 表格详情页
 * 	@value form					万能表单
 * 	@value table 				万能表格
 * 	@value detail 			表格详情页
 * @property {String} id 编辑器id
 * @property {String} placeholder 输入前的提示
 * @property {Array} toolbar 工具栏
 * @property {String} menubar 菜单栏
 * @property {Number String} width 宽度
 * @property {Number String} height 高度
 * @property {Object} editorConfig 编辑器其他配置透传 配置参考 https://www.tiny.cloud/docs/tinymce/latest/basic-setup/
 * @property {String} language 多语言
 * 	@value zh-Hans          中文简体
 * 	@value zh-Hant          中文繁体
 * 	@value en               英语
 * @property {Boolean} disabled 是否禁止编辑
 * @property {Boolean} needSave 上传的图片是否需要保存到素材库
 * @property {String} category_id 当 needSave 为true时，上传的分类id
 * @property {String} cloudDirectory 上传的目录
 * @property {String} env 上传文件使用的uniCloud环境
 * @property {Boolean} cloudPathRemoveChinese 上传后的文件名是否需要删除中文
 * @property {Boolean} showLoading 初始化时是否显示loading
 * @event {Function} input
 * @event {Function} change
 * @example <custom-editor-tinymce  seconds="60" :mobile="form1.mobile" type="register" custom-style="font-size: 28rpx;"></custom-editor-tinymce>
 */
var _default2 = {
  props: {
    // 双向绑定的值
    value: {
      type: String,
      default: ''
    },
    // 字段规则
    column: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    // 当前场景 form 万能表单 table 万能表格 detail 表格详情页
    scene: {
      type: String,
      default: 'form'
    },
    // 其他属性
    // id
    id: {
      type: String,
      default: function _default() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '');
      }
    },
    placeholder: {
      type: String,
      default: '开始输入...'
    },
    // 工具栏
    toolbar: {
      type: Array
    },
    menubar: {
      type: String
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    },
    height: {
      type: [Number, String]
    },
    // 编辑器其他配置参考 http://tinymce.ax-z.cn/configure/integration-and-setup.php
    editorConfig: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    language: {
      type: String,
      default: 'zh-Hans'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    needSave: {
      type: Boolean
    },
    category_id: {
      type: String
    },
    cloudDirectory: {
      type: String
    },
    env: {
      type: String
    },
    cloudPathRemoveChinese: {
      type: Boolean,
      default: false
    },
    showLoading: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    var editorId = this._getProp('id');
    return {
      editorData: '',
      // 编辑器数据
      hasInit: false,
      // 是否已完成初始化
      editorId: editorId,
      // 编辑器id
      fullscreen: false,
      // 是否全屏
      // 多语言
      languageTypeList: {
        en: 'en',
        'zh-Hans': 'zh_CN',
        'zh-Hant': 'zh_HK'
      },
      // 文件选择弹窗
      fileSelect: {
        fileType: '',
        multipleLimit: 1
      }
    };
  },
  mounted: function mounted() {
    this._updateValue(this.value || '');
    this.init();
  },
  destroyed: function destroyed() {
    this.destroyEditor();
  },
  activated: function activated() {
    this.init();
  },
  deactivated: function deactivated() {
    this.destroyEditor();
  },
  methods: {
    // 初始化
    init: function init() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var i;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (window.tinymce) {
                  _context.next = 10;
                  break;
                }
                i = 0;
              case 2:
                if (!(i < 50)) {
                  _context.next = 10;
                  break;
                }
                _context.next = 5;
                return vk.pubfn.sleep(100);
              case 5:
                if (!window.tinymce) {
                  _context.next = 7;
                  break;
                }
                return _context.abrupt("break", 10);
              case 7:
                i++;
                _context.next = 2;
                break;
              case 10:
                // 销毁编辑器
                if (_this.hasInit) {
                  _this.destroyEditor();
                }
                _this.initEditor();
              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    // 初始化 editor
    initEditor: function initEditor() {
      var _this2 = this;
      var that = this;
      var editorConfig = that._getProp('editorConfig') || {};
      var toolbar = that._getProp('toolbar') || _config.default.toolbar;
      var menubar = that._getProp('menubar') || _config.default.menubar;
      var language = that.languageTypeList[that._getProp('language')] || 'zh_CN';
      window.tinymce.init(_objectSpread(_objectSpread(_objectSpread({
        selector: "#".concat(that.editorId)
      }, _config.default), {}, {
        placeholder: that._getProp('placeholder'),
        language: language,
        height: that._getProp('height') || 600,
        readonly: that._getProp('disabled'),
        toolbar: toolbar,
        menubar: menubar,
        init_instance_callback: function init_instance_callback(editor) {
          editor.setContent(that.value || '');
          that.hasInit = true;
          editor.on('input change', function (e) {
            var content = editor.getContent();
            if (content !== that.editorData) {
              that.editorData = content;
              that._updateValue(content);
            }
          });
          // 处理弹窗z-index问题
          var zIndex = _popup.PopupManager.nextZIndex();
          var body = document.querySelector('body');
          body.style.setProperty('--el-zindex', zIndex);
        },
        // 没有用到images_upload_handler方法上传文件用的是下面的file_picker_callback方法
        images_upload_handler: function images_upload_handler(blobInfo, progress) {
          return new Promise( /*#__PURE__*/function () {
            var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(resolve, reject) {
              var file, filePath;
              return _regenerator.default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      progress(0);
                      file = blobInfo.blob();
                      filePath = blobInfo.blobUri();
                      uni.vk.uploadFile({
                        file: file,
                        filePath: filePath,
                        needSave: _this2._getProp('needSave'),
                        category_id: _this2._getProp('category_id'),
                        cloudDirectory: _this2._getProp('cloudDirectory'),
                        env: _this2._getProp('env'),
                        cloudPathRemoveChinese: _this2._getProp('cloudPathRemoveChinese'),
                        onUploadProgress: function onUploadProgress(progressEvent) {
                          progress(Math.round(progressEvent.loaded * 100 / progressEvent.total));
                        },
                        success: function success(res) {
                          // 上传成功
                          resolve(res.fileURL);
                        },
                        fail: function fail(err) {
                          // 上传失败
                          var errMsg = err.msg || err.errMsg || err.message;
                          reject('上传失败: ' + errMsg);
                        }
                      });
                    case 4:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));
            return function (_x, _x2) {
              return _ref.apply(this, arguments);
            };
          }());
        },
        // 文件上传
        file_picker_callback: function () {
          var _file_picker_callback = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(callback, value, meta) {
            var filetype, fileSelectType;
            return _regenerator.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    //文件分类
                    filetype = '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4';
                    fileSelectType = 'other';
                    _context3.t0 = meta.filetype;
                    _context3.next = _context3.t0 === 'image' ? 5 : _context3.t0 === 'media' ? 8 : _context3.t0 === 'file' ? 11 : 12;
                    break;
                  case 5:
                    filetype = '.jpg, .jpeg, .png, .gif';
                    fileSelectType = 'image';
                    return _context3.abrupt("break", 12);
                  case 8:
                    filetype = '.mp3, .mp4';
                    fileSelectType = 'video';
                    return _context3.abrupt("break", 12);
                  case 11:
                    fileSelectType = 'other';
                  case 12:
                    if (fileSelectType !== _this2.fileSelect.fileType) {
                      _this2.fileSelect.fileType = fileSelectType;
                    }
                    _this2.fileSelect.multipleLimit = 1;
                    _this2._openFileSelectDialog();
                    _this2.callback = callback;

                    //模拟出一个input用于添加本地文件
                    // const input = document.createElement('input');
                    // input.setAttribute('type', 'file');
                    // input.setAttribute('accept', filetype);
                    // input.click();
                    // input.onchange = function() {
                    // 	let file = this.files[0];
                    // 	let xhr, formData;
                    // 	console.log(file.name);
                    // 	if (meta.filetype == 'file') {
                    // 		callback('mypage.html', {text: 'My text'});
                    // 	}
                    // 	if (meta.filetype == 'image') {
                    // 		callback('myimage.jpg', {alt: 'My alt text'});
                    // 	}
                    // 	if (meta.filetype == 'media') {
                    // 		callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
                    // 	}
                    // };
                  case 16:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));
          function file_picker_callback(_x3, _x4, _x5) {
            return _file_picker_callback.apply(this, arguments);
          }
          return file_picker_callback;
        }(),
        video_template_callback: function video_template_callback(data) {
          var htmlStr = '';
          if (data.source.indexOf('.html') > -1) {
            htmlStr = "<iframe height=750 width=375 src=\"".concat(data.source, "\" frameborder=0 'allowfullscreen' style=\"max-width:100%;\"></iframe>");
          } else {
            var width = 750;
            var height = Math.round(width / data.width * data.height);
            htmlStr = "\n          <video controls width=\"".concat(width, "\" height=\"").concat(height, "\" class=\"editor-video\" style=\"max-width:100%;\">\n            <source src=\"").concat(data.source, "\" :type=\"").concat(data.sourcemime, "\">\n            \u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u64AD\u653E\u6B64\u89C6\u9891\n          </video>\n          ");
          }
          return htmlStr;
        }
      }, editorConfig), {}, {
        setup: function setup(editor) {
          editor.on('FullscreenStateChanged', function (e) {
            that.fullscreen = e.state;
          });
          // 注册多图上传按钮
          editor.ui.registry.addButton('images', {
            icon: 'images',
            tooltip: '多图上传',
            enabled: true,
            onAction: function onAction() {
              that.fileSelect.fileType = 'image';
              that.fileSelect.multipleLimit = 99;
              that._openFileSelectDialog();
            }
          });
        }
      }));
    },
    // 销毁 editor 实例
    destroyEditor: function destroyEditor() {
      var editor = this.getEditor();
      if (this.fullscreen) {
        editor.execCommand('mceFullScreen');
      }
      if (editor) {
        editor.destroy();
        this.hasInit = false;
      }
    },
    // 获取 editor 实例
    getEditor: function getEditor() {
      return window.tinymce.get(this.editorId);
    },
    // 设置内容
    setContent: function setContent(value) {
      this._updateValue(value);
      //this.getEditor().setContent(value);
    },
    // 获取内容
    getContent: function getContent() {
      return this.getEditor().getContent();
    },
    // 保存草稿
    save: function save() {
      var page = uni.vk.pubfn.getCurrentPageRoute();
      uni.vk.setStorageSync("editor-draft-".concat(page), this.getContent());
    },
    // 从草稿恢复
    restore: function restore() {
      var page = vk.pubfn.getCurrentPageRoute();
      var content = vk.getStorageSync("editor-draft-".concat(page));
      this.setContent(content);
    },
    // 清空内容
    clean: function clean() {
      this.setContent('');
    },
    // 插入单张图片
    insertImage: function insertImage(image) {
      var url = image.url,
        _image$width = image.width,
        width = _image$width === void 0 ? 0 : _image$width;
      var styleStr = 'max-width:100%;';
      if (width > 500) {
        styleStr += 'display: block;';
      }
      this.getEditor().insertContent("<img class=\"editor-image\" src=\"".concat(url, "\" style=\"").concat(styleStr, "\">"));
    },
    // 插入多张图片
    insertImages: function insertImages(arr) {
      var _this3 = this;
      arr.forEach(function (item) {
        _this3.insertImage(item);
      });
    },
    // 插入单个视频
    insertVideo: function insertVideo(data) {
      var width = data.width,
        height = data.height,
        url = data.url,
        type = data.type;
      var htmlStr = "\n    <video controls width=\"".concat(width, "\" height=\"").concat(height, "\" class=\"editor-video\" style=\"max-width:100%;\">\n      <source src=\"").concat(url, "\" :type=\"").concat(type, "\">\n      \u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u64AD\u653E\u6B64\u89C6\u9891\n    </video>\n    ");
      this.getEditor().insertContent(htmlStr);
    },
    // 插入多个视频
    insertVideos: function insertVideos(arr) {
      var _this4 = this;
      arr.forEach(function (item) {
        _this4.insertVideo(item);
      });
    },
    // 触发修改双向绑定的值
    _updateValue: function _updateValue(value) {
      this.$emit('input', value);
      this.$emit('change', value);
    },
    // 获取属性值
    _getProp: function _getProp(name) {
      return typeof this.column[name] !== 'undefined' && this.column[name] !== '' ? this.column[name] : this[name];
    },
    // 打开素材库弹窗
    _openFileSelectDialog: function _openFileSelectDialog() {
      var _this5 = this;
      setTimeout(function () {
        _this5.$refs.fileSelectDialog.open();
      }, 50);
    },
    // 素材库选择结束事件
    _selected: function _selected(url) {
      var file = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if ((0, _typeof2.default)(url) === 'object' && url.length > 0) {
        // 多图上传
        this.insertImages(file);
      } else {
        var _file$display_name = file.display_name,
          display_name = _file$display_name === void 0 ? '附件' : _file$display_name;
        this.callback(url, {
          text: display_name
        });
      }
    }
  },
  watch: {
    value: function value() {
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      if (this.hasInit && (this.editorData !== val || val == '')) {
        this.getEditor().setContent(val);
      }
    },
    language: function language(val) {
      this.init();
    }
  },
  computed: {
    widthCom: function widthCom() {
      var width = this._getProp('width');
      if (/^[\d]+(\.[\d]+)?$/.test(width)) {
        return "".concat(width, "px");
      }
      return width;
    }
  }
};
exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 3)["default"]))

/***/ }),

/***/ 755:
/*!*************************************************************************************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/components/custom-editor-tinymce/custom-editor-tinymce.vue?vue&type=style&index=0&id=05c2e8c8&scoped=true&lang=scss& ***!
  \*************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_custom_editor_tinymce_vue_vue_type_style_index_0_id_05c2e8c8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./custom-editor-tinymce.vue?vue&type=style&index=0&id=05c2e8c8&scoped=true&lang=scss& */ 756);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_custom_editor_tinymce_vue_vue_type_style_index_0_id_05c2e8c8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_custom_editor_tinymce_vue_vue_type_style_index_0_id_05c2e8c8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_custom_editor_tinymce_vue_vue_type_style_index_0_id_05c2e8c8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_custom_editor_tinymce_vue_vue_type_style_index_0_id_05c2e8c8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_custom_editor_tinymce_vue_vue_type_style_index_0_id_05c2e8c8_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 756:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/AI project/2026/wenmingshengchan/mp-admin/components/custom-editor-tinymce/custom-editor-tinymce.vue?vue&type=style&index=0&id=05c2e8c8&scoped=true&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/custom-editor-tinymce/custom-editor-tinymce.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/custom-editor-tinymce/custom-editor-tinymce-create-component',
    {
        'components/custom-editor-tinymce/custom-editor-tinymce-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('3')['createComponent'](__webpack_require__(744))
        })
    },
    [['components/custom-editor-tinymce/custom-editor-tinymce-create-component']]
]);
