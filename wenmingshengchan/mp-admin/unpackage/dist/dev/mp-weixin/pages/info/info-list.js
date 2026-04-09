(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/info/info-list"],{

/***/ 82:
/*!************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/main.js?{"page":"pages%2Finfo%2Finfo-list"} ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 5);
__webpack_require__(/*! uni-pages */ 31);
__webpack_require__(/*! @dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 32);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 26));
var _infoList = _interopRequireDefault(__webpack_require__(/*! ./pages/info/info-list.vue */ 83));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_infoList.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 3)["createPage"]))

/***/ }),

/***/ 83:
/*!*****************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages/info/info-list.vue ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _info_list_vue_vue_type_template_id_f1055616___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./info-list.vue?vue&type=template&id=f1055616& */ 84);
/* harmony import */ var _info_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./info-list.vue?vue&type=script&lang=js& */ 86);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _info_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _info_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 49);

var renderjs




/* normalize component */

var component = Object(_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _info_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _info_list_vue_vue_type_template_id_f1055616___WEBPACK_IMPORTED_MODULE_0__["render"],
  _info_list_vue_vue_type_template_id_f1055616___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _info_list_vue_vue_type_template_id_f1055616___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/info/info-list.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 84:
/*!************************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages/info/info-list.vue?vue&type=template&id=f1055616& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_info_list_vue_vue_type_template_id_f1055616___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./info-list.vue?vue&type=template&id=f1055616& */ 85);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_info_list_vue_vue_type_template_id_f1055616___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_info_list_vue_vue_type_template_id_f1055616___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_info_list_vue_vue_type_template_id_f1055616___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_info_list_vue_vue_type_template_id_f1055616___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 85:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/AI project/2026/wenmingshengchan/mp-admin/pages/info/info-list.vue?vue&type=template&id=f1055616& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.form1.props.show = false
      _vm.refresh()
    }
  }
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 86:
/*!******************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages/info/info-list.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_info_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../APP/Hbuilderx/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./info-list.vue?vue&type=script&lang=js& */ 87);
/* harmony import */ var _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_info_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_info_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_info_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_info_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_APP_Hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_info_list_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 87:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/AI project/2026/wenmingshengchan/mp-admin/pages/info/info-list.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

var that;
var vk = uni.vk;
var originalForms = {};
var _default = {
  data: function data() {
    return {
      table1: {
        action: "admin/info/detail/sys/getList",
        columns: [{
          key: "_id",
          title: "ID",
          type: "text",
          width: 220
        }, {
          key: "category_info.name",
          title: "所属分类",
          type: "text",
          width: 120
        }, {
          key: "title",
          title: "文章标题",
          type: "text",
          width: 250
        }, {
          key: "view_count",
          title: "阅读量",
          type: "number",
          width: 100
        }, {
          key: "is_top",
          title: "是否置顶",
          type: "switch",
          width: 80,
          onChange: function onChange(item) {
            that.updateTop(item);
          }
        }, {
          key: "status",
          title: "状态",
          type: "tag",
          width: 100,
          data: [{
            value: 1,
            label: "已发布",
            type: "success"
          }, {
            value: 0,
            label: "草稿/下架",
            type: "danger"
          }]
        }, {
          key: "publish_time",
          title: "发布时间",
          type: "time",
          width: 160,
          valueFormat: "yyyy-MM-dd hh:mm:ss"
        }],
        rightBtnsMore: [{
          title: "上移下架",
          onClick: function onClick(item) {
            that.updateStatus(item);
          }
        }]
      },
      queryForm1: {
        formData: {},
        columns: [{
          key: "title",
          title: "标题搜索",
          type: "text",
          width: 160,
          mode: "%%"
        }, {
          key: "category_id",
          title: "筛选分类",
          type: "remote-select",
          width: 160,
          action: "admin/info/category/sys/getSelect",
          showAll: true,
          props: {
            list: "rows",
            value: "value",
            label: "label"
          }
        }, {
          key: "status",
          title: "状态",
          type: "select",
          width: 160,
          data: [{
            value: 1,
            label: "已发布"
          }, {
            value: 0,
            label: "草稿/下架"
          }]
        }]
      },
      form1: {
        data: {
          status: 1,
          is_top: false,
          publish_time: Date.now(),
          cover_img: "",
          content: ""
        },
        props: {
          action: "",
          title: "",
          columns: [{
            key: "category_id",
            title: "选择分类",
            type: "remote-select",
            placeholder: "必选",
            action: "admin/info/category/sys/getSelect",
            showAll: true,
            props: {
              list: "rows",
              value: "value",
              label: "label"
            }
          }, {
            key: "title",
            title: "文章标题",
            type: "text",
            placeholder: "请输入文章标题"
          }, {
            key: "cover_img",
            title: "封面图片",
            type: "image",
            limit: 1,
            tips: "如果不传，系统自动抓取正文第一张图片"
          }, {
            key: "content",
            title: "文章正文",
            // 嵌入高配版 Tinymce 富文本编辑器组件
            type: "custom",
            component: "custom-editor-tinymce",
            width: "100%",
            height: 500,
            placeholder: "开始输入正文..."
          }, {
            key: "is_top",
            title: "置顶显示",
            type: "switch",
            activeText: "开启",
            inactiveText: "关闭"
          }, {
            key: "status",
            title: "发文状态",
            type: "radio",
            data: [{
              value: 1,
              label: "立即发布"
            }, {
              value: 0,
              label: "存为草稿"
            }]
          }],
          rules: {
            title: [{
              required: true,
              message: "标题不可为空",
              trigger: "blur"
            }],
            category_id: [{
              required: true,
              message: "必须指派一个分类归属",
              trigger: "change"
            }]
          },
          formType: "",
          show: false
        }
      }
    };
  },
  onLoad: function onLoad() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    that = this;
    vk = that.vk;
    originalForms["form1"] = vk.pubfn.copyObject(that.form1);
  },
  watch: {
    "form1.data.content": function form1DataContent(newVal) {
      if (newVal && !this.form1.data.cover_img) {
        // 尝试用正则匹配取出正文中插入的第一张带有 src 的图片链接
        var match = newVal.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (match && match[1]) {
          this.$set(this.form1.data, 'cover_img', match[1]);
        }
      }
    }
  },
  methods: {
    resetForm: function resetForm() {
      vk.pubfn.resetForm(originalForms, that);
    },
    search: function search() {
      that.$refs.table1.search();
    },
    refresh: function refresh() {
      that.$refs.table1.refresh();
    },
    addBtn: function addBtn() {
      that.resetForm();
      that.form1.props.action = "admin/info/detail/sys/add";
      that.form1.props.formType = "add";
      that.form1.props.title = "信息发布";
      that.form1.data.publish_time = Date.now(); // 发布时赋默认时间
      that.form1.props.show = true;
    },
    updateBtn: function updateBtn(_ref) {
      var item = _ref.item;
      that.form1.props.action = "admin/info/detail/sys/update";
      that.form1.props.formType = "update";
      that.form1.props.title = "编辑信息";
      that.form1.props.show = true;
      that.form1.data = item;
    },
    deleteBtn: function deleteBtn(_ref2) {
      var item = _ref2.item,
        deleteFn = _ref2.deleteFn;
      deleteFn({
        action: "admin/info/detail/sys/delete",
        data: {
          _id: item._id
        },
        refresh: true
      });
    },
    updateStatus: function updateStatus(item) {
      var newStatus = item.status === 1 ? 0 : 1;
      var msg = newStatus === 1 ? "确定要上架此文章吗？" : "确定要下架此文章吗？";
      vk.confirm(msg, function () {
        vk.callFunction({
          url: "admin/info/detail/sys/updateStatus",
          data: {
            _id: item._id,
            status: newStatus
          },
          success: function success() {
            vk.toast("操作成功");
            that.refresh();
          }
        });
      });
    },
    updateTop: function updateTop(item) {
      vk.callFunction({
        url: "admin/info/detail/sys/update",
        data: {
          _id: item._id,
          is_top: item.is_top
        },
        success: function success(data) {
          vk.toast('操作成功', "success");
        }
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 3)["default"]))

/***/ })

},[[82,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/info/info-list.js.map