(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 10:
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 100:
/*!**************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/common/theme/white.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 纯白主题
var _default = {
  // 左侧菜单样式
  leftMenu: {
    backgroundColor: '#ffffff',
    subBackgroundColor: '#ffffff',
    textColor: '#303133',
    activeTextColor: '#409EFF',
    activeBackgroundColor: '#ecf5ff',
    collapseActiveTextColor: '#409EFF',
    collapseActiveBackgroundColor: '#ecf5ff',
    hoverTextColor: '#303133',
    hoverBackgroundColor: '#efefef',
    boxShadow: '0px 0 0px 0 rgba(29,35,41,0.05)',
    //boxShadow: "2px 0 0px 0 rgba(29,35,41,0.05)",
    borderTop: '1px solid #f8f8f9'
  },
  // 顶部菜单样式
  topMenu: {
    backgroundColor: '#ffffff',
    textColor: '#999999'
  }
};
exports.default = _default;

/***/ }),

/***/ 101:
/*!**************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/common/theme/black.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 纯黑主题
var _default = {
  // 左侧菜单样式
  leftMenu: {
    backgroundColor: '#191a23',
    subBackgroundColor: '#101117',
    textColor: 'rgba(255,255,255,0.9)',
    activeTextColor: '#ffffff',
    activeBackgroundColor: '#2d8cf0',
    collapseActiveTextColor: '#2d8cf0',
    collapseActiveBackgroundColor: '#2c3239',
    hoverTextColor: '#ffffff',
    hoverBackgroundColor: '#545f6c',
    boxShadow: '0px 0 0px rgba(0,21,4,0.2)'
    //boxShadow: "2px 0 2px rgba(0,21,4,0.2)",
    //borderTop: "1px solid #101117"
  },

  // 顶部菜单样式
  topMenu: {
    backgroundColor: '#191a23',
    textColor: '#f0f0f0'
  }
};
exports.default = _default;

/***/ }),

/***/ 102:
/*!*******************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/common/theme/blackWhite.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 黑白主题（左侧菜单黑，顶部白）
var _default = {
  // 左侧菜单样式
  leftMenu: {
    backgroundColor: '#191a23',
    subBackgroundColor: '#101117',
    textColor: 'rgba(255,255,255,0.9)',
    activeTextColor: '#ffffff',
    activeBackgroundColor: '#2d8cf0',
    collapseActiveTextColor: '#2d8cf0',
    collapseActiveBackgroundColor: '#2c3239',
    hoverTextColor: '#ffffff',
    hoverBackgroundColor: '#545f6c',
    boxShadow: '0px 0 0px rgba(0,21,4,0.25)'
    //boxShadow: "2px 0 4px rgba(0,21,4,0.25)",
    //borderTop: "1px solid #101117"
  },

  // 顶部菜单样式
  topMenu: {
    backgroundColor: '#ffffff',
    textColor: '#999999'
  }
};
exports.default = _default;

/***/ }),

/***/ 103:
/*!****************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/common/theme/eladmin.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 黑白主题（左侧菜单黑，顶部白）
var _default = {
  // 左侧菜单样式
  leftMenu: {
    backgroundColor: "#304156",
    subBackgroundColor: "#1F2D3D",
    textColor: "#BFCBD9",
    activeTextColor: "#409EFF",
    activeBackgroundColor: "#1F2D3D",
    hoverTextColor: "#BFCBD9",
    hoverBackgroundColor: "#001528"
  },
  // 顶部菜单样式
  topMenu: {
    backgroundColor: "#ffffff",
    textColor: "#303133"
  }
};
exports.default = _default;

/***/ }),

/***/ 11:
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 12:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 13);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 13:
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 14)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 15);
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 14:
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 15:
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 14)["default"];
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 156:
/*!***********************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages_plugs/system/menu/libs/pluginMenu.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  // 查找插件注册的菜单列表（目前仅在开发模式启用，仅限 admin 角色）
  var pluginMenuJsons = [];
  try {
    if (true) {
      var rootModules = __webpack_require__(157);
      rootModules.keys().forEach(function (key) {
        var json = key.substr(2);
        rootModules(key).forEach(function (item) {
          item._json = json;
          pluginMenuJsons.push(item);
        });
      });
      var pluginModules = __webpack_require__(158);
      pluginModules.keys().forEach(function (key) {
        var json = 'uni_modules' + key.substr(1);
        pluginModules(key).forEach(function (item) {
          item._json = json;
          pluginMenuJsons.push(item);
        });
      });
    }
  } catch (err) {
    console.error('err: ', err);
  }
  return pluginMenuJsons;
}

/***/ }),

/***/ 157:
/*!**********************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin sync nonrecursive -menu.json$ ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 157;

/***/ }),

/***/ 158:
/*!********************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/uni_modules sync menu.json$ ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 158;

/***/ }),

/***/ 16:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 17);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 18);
function _construct(t, e, r) {
  if (isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && setPrototypeOf(p, r.prototype), p;
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 17:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 18:
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (module.exports = _isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 19:
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 20);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 21);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 9);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 22);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 2:
/*!*********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var objectKeys = ['qy', 'env', 'error', 'version', 'lanDebug', 'cloud', 'serviceMarket', 'router', 'worklet', '__webpack_require_UNI_MP_PLUGIN__'];
var singlePageDisableKey = ['lanDebug', 'router', 'worklet'];
var target = typeof globalThis !== 'undefined' ? globalThis : function () {
  return this;
}();
var key = ['w', 'x'].join('');
var oldWx = target[key];
var launchOption = oldWx.getLaunchOptionsSync ? oldWx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof oldWx[key] === 'function';
}
function initWx() {
  var newWx = {};
  for (var _key in oldWx) {
    if (isWxKey(_key)) {
      // TODO wrapper function
      newWx[_key] = oldWx[_key];
    }
  }
  return newWx;
}
target[key] = initWx();
if (!target[key].canIUse('getAppBaseInfo')) {
  target[key].getAppBaseInfo = target[key].getSystemInfoSync;
}
if (!target[key].canIUse('getWindowInfo')) {
  target[key].getWindowInfo = target[key].getSystemInfoSync;
}
if (!target[key].canIUse('getDeviceInfo')) {
  target[key].getDeviceInfo = target[key].getSystemInfoSync;
}
var _default = target[key];
exports.default = _default;

/***/ }),

/***/ 20:
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 10);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 21:
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 22:
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 23:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 5);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 6));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 24));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 25));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 14));
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  var lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (Array.isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 3)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 4)))

/***/ }),

/***/ 233:
/*!*************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages_plugs/system_uni/lucky-draw/image.json ***!
  \*************************************************************************************************/
/*! exports provided: qrcodeKey, qrcodeAdd, qrcodeHelp, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"qrcodeKey\":\"data:image/jpeg;base64,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\",\"qrcodeAdd\":\"data:image/png;base64,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\",\"qrcodeHelp\":\"data:image/png;base64,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\"}");

/***/ }),

/***/ 24:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 242:
/*!***************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages_template/components/icons/js/vk-icons.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ['vk-icon-activityfill', 'vk-icon-crownfill', 'vk-icon-crown', 'vk-icon-goodsfill', 'vk-icon-messagefill', 'vk-icon-profilefill', 'vk-icon-sound', 'vk-icon-sponsorfill', 'vk-icon-sponsor', 'vk-icon-upblock', 'vk-icon-weblock', 'vk-icon-weunblock', 'vk-icon-1111', 'vk-icon-my', 'vk-icon-myfill', 'vk-icon-emojifill', 'vk-icon-emojiflashfill', 'vk-icon-flashbuyfill-copy', 'vk-icon-text', 'vk-icon-goodsfavor', 'vk-icon-musicfill', 'vk-icon-musicforbidfill', 'vk-icon-roundleftfill', 'vk-icon-triangledownfill', 'vk-icon-triangleupfill', 'vk-icon-roundleftfill-copy', 'vk-icon-pulldown1', 'vk-icon-emojilight', 'vk-icon-keyboardlight', 'vk-icon-recordfill', 'vk-icon-recordlight', 'vk-icon-appreciate', 'vk-icon-record', 'vk-icon-check', 'vk-icon-roundaddlight', 'vk-icon-close', 'vk-icon-soundlight', 'vk-icon-edit', 'vk-icon-cardboardfill', 'vk-icon-emoji', 'vk-icon-cardboard', 'vk-icon-favorfill', 'vk-icon-formfill', 'vk-icon-favor', 'vk-icon-coin', 'vk-icon-loading', 'vk-icon-sortlight', 'vk-icon-locationfill', 'vk-icon-cardboardforbid', 'vk-icon-location', 'vk-icon-circlefill', 'vk-icon-phone', 'vk-icon-circle', 'vk-icon-roundcheckfill', 'vk-icon-attentionforbid', 'vk-icon-roundcheck', 'vk-icon-attentionforbidfill', 'vk-icon-roundclosefill', 'vk-icon-attentionfavorfill', 'vk-icon-roundclose', 'vk-icon-attentionfavor', 'vk-icon-roundrightfill', 'vk-icon-piclight', 'vk-icon-roundright', 'vk-icon-shoplight', 'vk-icon-search', 'vk-icon-voicelight', 'vk-icon-taxi', 'vk-icon-attentionfavorfill-copy', 'vk-icon-timefill', 'vk-icon-full', 'vk-icon-time', 'vk-icon-mail', 'vk-icon-unfold', 'vk-icon-peoplelist', 'vk-icon-warnfill', 'vk-icon-goodsnewfill', 'vk-icon-warn', 'vk-icon-goodsnew', 'vk-icon-camerafill', 'vk-icon-medalfill', 'vk-icon-camera', 'vk-icon-medal', 'vk-icon-commentfill', 'vk-icon-newsfill', 'vk-icon-comment', 'vk-icon-newshotfill', 'vk-icon-likefill', 'vk-icon-newshot', 'vk-icon-like', 'vk-icon-news', 'vk-icon-notificationfill', 'vk-icon-videofill', 'vk-icon-notification', 'vk-icon-video', 'vk-icon-order', 'vk-icon-askfill', 'vk-icon-samefill', 'vk-icon-ask', 'vk-icon-same', 'vk-icon-exit', 'vk-icon-deliver', 'vk-icon-skinfill', 'vk-icon-evaluate', 'vk-icon-skin', 'vk-icon-pay', 'vk-icon-moneybagfill', 'vk-icon-send', 'vk-icon-usefullfill', 'vk-icon-shop', 'vk-icon-usefull', 'vk-icon-ticket', 'vk-icon-moneybag', 'vk-icon-wang', 'vk-icon-redpacket_fill', 'vk-icon-back', 'vk-icon-subscription', 'vk-icon-cascades', 'vk-icon-home_light', 'vk-icon-discover', 'vk-icon-my_light', 'vk-icon-list', 'vk-icon-community_light', 'vk-icon-more', 'vk-icon-cart_light', 'vk-icon-scan', 'vk-icon-we_light', 'vk-icon-settings', 'vk-icon-home_fill_light', 'vk-icon-questionfill', 'vk-icon-cart_fill_light', 'vk-icon-question', 'vk-icon-community_fill_light', 'vk-icon-shopfill', 'vk-icon-my_fill_light', 'vk-icon-form', 'vk-icon-we_fill_light', 'vk-icon-wangfill', 'vk-icon-skin_light', 'vk-icon-pic', 'vk-icon-search_light', 'vk-icon-filter', 'vk-icon-scan_light', 'vk-icon-footprint', 'vk-icon-people_list_light', 'vk-icon-top', 'vk-icon-message_light', 'vk-icon-pulldown', 'vk-icon-close_light', 'vk-icon-pullup', 'vk-icon-add_light', 'vk-icon-right', 'vk-icon-profile_light', 'vk-icon-refresh', 'vk-icon-service_light', 'vk-icon-moreandroid', 'vk-icon-friend_add_light', 'vk-icon-deletefill', 'vk-icon-edit_light', 'vk-icon-refund', 'vk-icon-camera_light', 'vk-icon-cart', 'vk-icon-hot_light', 'vk-icon-qrcode', 'vk-icon-refresh_light', 'vk-icon-remind', 'vk-icon-back_light', 'vk-icon-delete', 'vk-icon-share_light', 'vk-icon-profile', 'vk-icon-comment_light', 'vk-icon-home', 'vk-icon-appreciate_light', 'vk-icon-cartfill', 'vk-icon-favor_light', 'vk-icon-discoverfill', 'vk-icon-appreciate_fill_light', 'vk-icon-homefill', 'vk-icon-comment_fill_light', 'vk-icon-message', 'vk-icon-wang_light', 'vk-icon-addressbook', 'vk-icon-more_android_light', 'vk-icon-link', 'vk-icon-friend_light', 'vk-icon-lock', 'vk-icon-more_light', 'vk-icon-unlock', 'vk-icon-goods_favor_light', 'vk-icon-vip', 'vk-icon-goods_new_fill_light', 'vk-icon-weibo', 'vk-icon-goods_new_light', 'vk-icon-activity', 'vk-icon-goods_light', 'vk-icon-big', 'vk-icon-medal_fill_light', 'vk-icon-friendaddfill', 'vk-icon-medal_light', 'vk-icon-friendadd', 'vk-icon-news_fill_light', 'vk-icon-friendfamous', 'vk-icon-news_hot_fill_light', 'vk-icon-friend', 'vk-icon-news_hot_light', 'vk-icon-goods', 'vk-icon-news_light', 'vk-icon-selection', 'vk-icon-video_fill_light', 'vk-icon-tmall', 'vk-icon-message_fill_light', 'vk-icon-explore', 'vk-icon-form_light', 'vk-icon-present', 'vk-icon-video_light', 'vk-icon-squarecheckfill', 'vk-icon-search_list_light', 'vk-icon-square', 'vk-icon-form_fill_light', 'vk-icon-squarecheck', 'vk-icon-global_light', 'vk-icon-round', 'vk-icon-global', 'vk-icon-roundaddfill', 'vk-icon-favor_fill_light', 'vk-icon-roundadd', 'vk-icon-delete_light', 'vk-icon-add', 'vk-icon-back_android', 'vk-icon-notificationforbidfill', 'vk-icon-back_android_light', 'vk-icon-explorefill', 'vk-icon-down_light', 'vk-icon-fold', 'vk-icon-round_close_light', 'vk-icon-game', 'vk-icon-round_close_fill_light', 'vk-icon-redpacket', 'vk-icon-expressman', 'vk-icon-selectionfill', 'vk-icon-punch_light', 'vk-icon-similar', 'vk-icon-evaluate_fill', 'vk-icon-appreciatefill', 'vk-icon-furniture', 'vk-icon-infofill', 'vk-icon-dress', 'vk-icon-info', 'vk-icon-coffee', 'vk-icon-tao', 'vk-icon-sports', 'vk-icon-mobiletao', 'vk-icon-group_light', 'vk-icon-forwardfill', 'vk-icon-location_light', 'vk-icon-forward', 'vk-icon-attention_light', 'vk-icon-rechargefill', 'vk-icon-group_fill_light', 'vk-icon-recharge', 'vk-icon-group_fill', 'vk-icon-vipcard', 'vk-icon-play_forward_fill', 'vk-icon-voice', 'vk-icon-subscription_light', 'vk-icon-voicefill', 'vk-icon-deliver_fill', 'vk-icon-friendfavor', 'vk-icon-notice_forbid_fill', 'vk-icon-wifi', 'vk-icon-qr_code_light', 'vk-icon-share', 'vk-icon-settings_light', 'vk-icon-wefill', 'vk-icon-pick', 'vk-icon-we', 'vk-icon-form_favor_light', 'vk-icon-lightauto', 'vk-icon-round_comment_light', 'vk-icon-lightforbid', 'vk-icon-phone_light', 'vk-icon-lightfill', 'vk-icon-round_down_light', 'vk-icon-camerarotate', 'vk-icon-friend_settings_light', 'vk-icon-light', 'vk-icon-change', 'vk-icon-barcode', 'vk-icon-round_list_light', 'vk-icon-flashlightclose', 'vk-icon-ticket_fill', 'vk-icon-flashlightopen', 'vk-icon-round_friend_fill', 'vk-icon-searchlist', 'vk-icon-round_crown_fill', 'vk-icon-service', 'vk-icon-round_link_fill', 'vk-icon-sort', 'vk-icon-round_light_fill', 'vk-icon-1212', 'vk-icon-round_favor_fill', 'vk-icon-down', 'vk-icon-round_menu_fill', 'vk-icon-mobile', 'vk-icon-round_location_fill', 'vk-icon-mobilefill', 'vk-icon-round_pay_fill', 'vk-icon-copy', 'vk-icon-round_like_fill', 'vk-icon-countdownfill', 'vk-icon-round_people_fill', 'vk-icon-countdown', 'vk-icon-round_pay', 'vk-icon-noticefill', 'vk-icon-round_rank_fill', 'vk-icon-notice', 'vk-icon-round_redpacket_fill', 'vk-icon-qiang', 'vk-icon-round_skin_fill', 'vk-icon-upstagefill', 'vk-icon-round_record_fill', 'vk-icon-upstage', 'vk-icon-round_ticket_fill', 'vk-icon-babyfill', 'vk-icon-round_redpacket', 'vk-icon-baby', 'vk-icon-round_text_fill', 'vk-icon-brandfill', 'vk-icon-round_ticket', 'vk-icon-brand', 'vk-icon-round_transfer_fill', 'vk-icon-choicenessfill', 'vk-icon-subtitle_block_light', 'vk-icon-choiceness', 'vk-icon-warn_light', 'vk-icon-clothesfill', 'vk-icon-round_transfer', 'vk-icon-clothes', 'vk-icon-vip_code_light', 'vk-icon-creativefill', 'vk-icon-subtitle_unblock_light', 'vk-icon-creative', 'vk-icon-round_shop_fill', 'vk-icon-female', 'vk-icon-oppose_fill_light', 'vk-icon-keyboard', 'vk-icon-oppose_light', 'vk-icon-male', 'vk-icon-living', 'vk-icon-newfill', 'vk-icon-goods_hot_fill', 'vk-icon-new', 'vk-icon-ticket_money_fill', 'vk-icon-pullleft', 'vk-icon-arrow_left_fill', 'vk-icon-pullright', 'vk-icon-arrow_up_fill', 'vk-icon-rankfill', 'vk-icon-xiaoheiqun', 'vk-icon-rank', 'vk-icon-auction', 'vk-icon-bad', 'vk-icon-return', 'vk-icon-cameraadd', 'vk-icon-mall_light', 'vk-icon-focus', 'vk-icon-mall_fill_light', 'vk-icon-friendfill', 'vk-icon-broadcast_fill', 'vk-icon-cameraaddfill', 'vk-icon-at', 'vk-icon-apps', 'vk-icon-card_fill', 'vk-icon-paintfill', 'vk-icon-paint', 'vk-icon-picfill', 'vk-icon-refresharrow', 'vk-icon-markfill', 'vk-icon-mark', 'vk-icon-presentfill', 'vk-icon-repeal', 'vk-icon-album', 'vk-icon-peoplefill', 'vk-icon-people', 'vk-icon-servicefill', 'vk-icon-repair', 'vk-icon-file', 'vk-icon-repairfill', 'vk-icon-taoxiaopu', 'vk-icon-attentionfill', 'vk-icon-attention', 'vk-icon-commandfill', 'vk-icon-command', 'vk-icon-communityfill', 'vk-icon-community', 'vk-icon-read', 'vk-icon-suan', 'vk-icon-hua', 'vk-icon-ju', 'vk-icon-tian', 'vk-icon-calendar', 'vk-icon-cut', 'vk-icon-magic', 'vk-icon-backwardfill', 'vk-icon-playfill', 'vk-icon-stop', 'vk-icon-tagfill', 'vk-icon-tag', 'vk-icon-group', 'vk-icon-all', 'vk-icon-backdelete', 'vk-icon-hotfill', 'vk-icon-hot', 'vk-icon-post', 'vk-icon-radiobox', 'vk-icon-rounddown', 'vk-icon-upload', 'vk-icon-writefill', 'vk-icon-write', 'vk-icon-radioboxfill', 'vk-icon-punch', 'vk-icon-shake', 'vk-icon-add1', 'vk-icon-move', 'vk-icon-safe', 'vk-icon-qi', 'vk-icon-ye', 'vk-icon-cangku', 'vk-icon-cangku1', 'vk-icon-percentage', 'vk-icon-select', 'vk-icon-cascader', 'vk-icon-radio1', 'vk-icon-radio2', 'vk-icon-checkbox1', 'vk-icon-checkbox2', 'vk-icon-checkbox3', 'vk-icon-discount', 'vk-icon-number', 'vk-icon-color', 'vk-icon-json', 'vk-icon-text1', 'vk-icon-textarea', 'vk-icon-quyuguanli', 'vk-icon-dengji', 'vk-icon-jiagoufenxiao', 'vk-icon-gudongfenhong', 'vk-icon-tixianguanli', 'vk-icon-miaosha', 'vk-icon-youhuiquan', 'vk-icon-jifen1', 'vk-icon-shouqicaidan', 'vk-icon-zhankaicaidan', 'vk-icon-weixin', 'vk-icon-weixin1', 'vk-icon-zhifubaozhifu', 'vk-icon-zhifubaozhifu1', 'vk-icon-zhifubaozhifu2', 'vk-icon-anzhuo', 'vk-icon-iOS', 'vk-icon-QQ', 'vk-icon-APPku', 'vk-icon-weixingongzhonghao', 'vk-icon-weixinxiaochengxu', 'vk-icon-heading-h5', 'vk-icon-shengji3-xianxing', 'vk-icon-zuanshi', 'vk-icon-vip-plus', 'vk-icon-douyin1', 'vk-icon-douyin'];
exports.default = _default;

/***/ }),

/***/ 25:
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 13);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 259:
/*!********************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages_template/components/icons/js/element-icons.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ['el-icon-platform-eleme', 'el-icon-eleme', 'el-icon-delete-solid', 'el-icon-delete', 'el-icon-s-tools', 'el-icon-setting', 'el-icon-user-solid', 'el-icon-user', 'el-icon-phone', 'el-icon-phone-outline', 'el-icon-more', 'el-icon-more-outline', 'el-icon-star-on', 'el-icon-star-off', 'el-icon-s-goods', 'el-icon-goods', 'el-icon-warning', 'el-icon-warning-outline', 'el-icon-question', 'el-icon-info', 'el-icon-remove', 'el-icon-circle-plus', 'el-icon-success', 'el-icon-error', 'el-icon-zoom-in', 'el-icon-zoom-out', 'el-icon-remove-outline', 'el-icon-circle-plus-outline', 'el-icon-circle-check', 'el-icon-circle-close', 'el-icon-s-help', 'el-icon-help', 'el-icon-minus', 'el-icon-plus', 'el-icon-check', 'el-icon-close', 'el-icon-picture', 'el-icon-picture-outline', 'el-icon-picture-outline-round', 'el-icon-upload', 'el-icon-upload2', 'el-icon-download', 'el-icon-camera-solid', 'el-icon-camera', 'el-icon-video-camera-solid', 'el-icon-video-camera', 'el-icon-message-solid', 'el-icon-bell', 'el-icon-s-cooperation', 'el-icon-s-order', 'el-icon-s-platform', 'el-icon-s-fold', 'el-icon-s-unfold', 'el-icon-s-operation', 'el-icon-s-promotion', 'el-icon-s-home', 'el-icon-s-release', 'el-icon-s-ticket', 'el-icon-s-management', 'el-icon-s-open', 'el-icon-s-shop', 'el-icon-s-marketing', 'el-icon-s-flag', 'el-icon-s-comment', 'el-icon-s-finance', 'el-icon-s-claim', 'el-icon-s-custom', 'el-icon-s-opportunity', 'el-icon-s-data', 'el-icon-s-check', 'el-icon-s-grid', 'el-icon-menu', 'el-icon-share', 'el-icon-d-caret', 'el-icon-caret-left', 'el-icon-caret-right', 'el-icon-caret-bottom', 'el-icon-caret-top', 'el-icon-bottom-left', 'el-icon-bottom-right', 'el-icon-back', 'el-icon-right', 'el-icon-bottom', 'el-icon-top', 'el-icon-top-left', 'el-icon-top-right', 'el-icon-arrow-left', 'el-icon-arrow-right', 'el-icon-arrow-down', 'el-icon-arrow-up', 'el-icon-d-arrow-left', 'el-icon-d-arrow-right', 'el-icon-video-pause', 'el-icon-video-play', 'el-icon-refresh', 'el-icon-refresh-right', 'el-icon-refresh-left', 'el-icon-finished', 'el-icon-sort', 'el-icon-sort-up', 'el-icon-sort-down', 'el-icon-rank', 'el-icon-loading', 'el-icon-view', 'el-icon-c-scale-to-original', 'el-icon-date', 'el-icon-edit', 'el-icon-edit-outline', 'el-icon-folder', 'el-icon-folder-opened', 'el-icon-folder-add', 'el-icon-folder-remove', 'el-icon-folder-delete', 'el-icon-folder-checked', 'el-icon-tickets', 'el-icon-document-remove', 'el-icon-document-delete', 'el-icon-document-copy', 'el-icon-document-checked', 'el-icon-document', 'el-icon-document-add', 'el-icon-printer', 'el-icon-paperclip', 'el-icon-takeaway-box', 'el-icon-search', 'el-icon-monitor', 'el-icon-attract', 'el-icon-mobile', 'el-icon-scissors', 'el-icon-umbrella', 'el-icon-headset', 'el-icon-brush', 'el-icon-mouse', 'el-icon-coordinate', 'el-icon-magic-stick', 'el-icon-reading', 'el-icon-data-line', 'el-icon-data-board', 'el-icon-pie-chart', 'el-icon-data-analysis', 'el-icon-collection-tag', 'el-icon-film', 'el-icon-suitcase', 'el-icon-suitcase-1', 'el-icon-receiving', 'el-icon-collection', 'el-icon-files', 'el-icon-notebook-1', 'el-icon-notebook-2', 'el-icon-toilet-paper', 'el-icon-office-building', 'el-icon-school', 'el-icon-table-lamp', 'el-icon-house', 'el-icon-no-smoking', 'el-icon-smoking', 'el-icon-shopping-cart-full', 'el-icon-shopping-cart-1', 'el-icon-shopping-cart-2', 'el-icon-shopping-bag-1', 'el-icon-shopping-bag-2', 'el-icon-sold-out', 'el-icon-sell', 'el-icon-present', 'el-icon-box', 'el-icon-bank-card', 'el-icon-money', 'el-icon-coin', 'el-icon-wallet', 'el-icon-discount', 'el-icon-price-tag', 'el-icon-news', 'el-icon-guide', 'el-icon-male', 'el-icon-female', 'el-icon-thumb', 'el-icon-cpu', 'el-icon-link', 'el-icon-connection', 'el-icon-open', 'el-icon-turn-off', 'el-icon-set-up', 'el-icon-chat-round', 'el-icon-chat-line-round', 'el-icon-chat-square', 'el-icon-chat-dot-round', 'el-icon-chat-dot-square', 'el-icon-chat-line-square', 'el-icon-message', 'el-icon-postcard', 'el-icon-position', 'el-icon-turn-off-microphone', 'el-icon-microphone', 'el-icon-close-notification', 'el-icon-bangzhu', 'el-icon-time', 'el-icon-odometer', 'el-icon-crop', 'el-icon-aim', 'el-icon-switch-button', 'el-icon-full-screen', 'el-icon-copy-document', 'el-icon-mic', 'el-icon-stopwatch', 'el-icon-medal-1', 'el-icon-medal', 'el-icon-trophy', 'el-icon-trophy-1', 'el-icon-first-aid-kit', 'el-icon-discover', 'el-icon-place', 'el-icon-location', 'el-icon-location-outline', 'el-icon-location-information', 'el-icon-add-location', 'el-icon-delete-location', 'el-icon-map-location', 'el-icon-alarm-clock', 'el-icon-timer', 'el-icon-watch-1', 'el-icon-watch', 'el-icon-lock', 'el-icon-unlock', 'el-icon-key', 'el-icon-service', 'el-icon-mobile-phone', 'el-icon-bicycle', 'el-icon-truck', 'el-icon-ship', 'el-icon-basketball', 'el-icon-football', 'el-icon-soccer', 'el-icon-baseball', 'el-icon-wind-power', 'el-icon-light-rain', 'el-icon-lightning', 'el-icon-heavy-rain', 'el-icon-sunrise', 'el-icon-sunrise-1', 'el-icon-sunset', 'el-icon-sunny', 'el-icon-cloudy', 'el-icon-partly-cloudy', 'el-icon-cloudy-and-sunny', 'el-icon-moon', 'el-icon-moon-night', 'el-icon-dish', 'el-icon-dish-1', 'el-icon-food', 'el-icon-chicken', 'el-icon-fork-spoon', 'el-icon-knife-fork', 'el-icon-burger', 'el-icon-tableware', 'el-icon-sugar', 'el-icon-dessert', 'el-icon-ice-cream', 'el-icon-hot-water', 'el-icon-water-cup', 'el-icon-coffee-cup', 'el-icon-cold-drink', 'el-icon-goblet', 'el-icon-goblet-full', 'el-icon-goblet-square', 'el-icon-goblet-square-full', 'el-icon-refrigerator', 'el-icon-grape', 'el-icon-watermelon', 'el-icon-cherry', 'el-icon-apple', 'el-icon-pear', 'el-icon-orange', 'el-icon-coffee', 'el-icon-ice-tea', 'el-icon-ice-drink', 'el-icon-milk-tea', 'el-icon-potato-strips', 'el-icon-lollipop', 'el-icon-ice-cream-square', 'el-icon-ice-cream-round'];
exports.default = _default;

/***/ }),

/***/ 26:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global, Buffer) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2025 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator && window.navigator.userAgent && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject,
  slotVm
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, slotVm || this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/**
 * rfdc v1.4.1
 * David Mark Clements <david.clements@nearform.com>
 * Really Fast Deep Clone
 * [npm](https://www.npmjs.com/package/rfdc) [homePage](https://github.com/davidmarkclements/rfdc.git)
 */

/**
 * @typedef {{proto?: boolean; circles?: boolean; reviver: (key: string, value: any) => any; constructorHandlers?: any[];}} Options
 */

function copyBuffer(cur) {
  if (cur instanceof Buffer) {
    return Buffer.from(cur)
  }

  return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length)
}

/**
 *
 * @param {Options} opts
 * @returns {(o: any) => any}
 */
function rfdc(opts) {
  opts = opts || {};
  if (opts.circles) { return rfdcCircles(opts) }

  var constructorHandlers = new Map();
  constructorHandlers.set(Date, function (o) { return new Date(o); });
  constructorHandlers.set(Map, function (o, fn) { return new Map(cloneArray(Array.from(o), fn)); });
  constructorHandlers.set(Set, function (o, fn) { return new Set(cloneArray(Array.from(o), fn)); });
  if (opts.constructorHandlers) {
    opts.constructorHandlers.forEach(function (handler) {
      constructorHandlers.set(handler[0], handler[1]);
    });
  }

  var handler = null;

  return opts.proto ? cloneProto : clone

  function cloneArray(a, fn) {
    var keys = Object.keys(a);
    var a2 = new Array(keys.length);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var cur = a[k];
      if (typeof cur !== 'object' || cur === null) {
        a2[k] = cur;
      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
        a2[k] = handler(cur, fn);
      } else if (ArrayBuffer.isView(cur)) {
        a2[k] = copyBuffer(cur);
      } else {
        a2[k] = fn(cur);
      }
    }
    return a2
  }

  function clone(o) {
    if (typeof o !== 'object' || o === null) { return o }
    if (Array.isArray(o)) { return cloneArray(o, clone) }
    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
      return handler(o, clone)
    }
    var o2 = {};
    for (var k in o) {
      if (Object.hasOwnProperty.call(o, k) === false) { continue }
      var cur = o[k];
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur;
      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
        o2[k] = handler(cur, clone);
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur);
      } else {
        o2[k] = clone(opts.reviver ? opts.reviver(k, cur) : cur);
      }
    }
    return o2
  }

  function cloneProto(o) {
    if (typeof o !== 'object' || o === null) { return o }
    if (Array.isArray(o)) { return cloneArray(o, cloneProto) }
    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
      return handler(o, cloneProto)
    }
    var o2 = {};
    for (var k in o) {
      var cur = o[k];
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur;
      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
        o2[k] = handler(cur, cloneProto);
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur);
      } else {
        o2[k] = cloneProto(opts.reviver ? opts.reviver(k, cur) : cur);
      }
    }
    return o2
  }
}

function rfdcCircles(opts) {
  var refs = [];
  var refsNew = [];

  var constructorHandlers = new Map();
  constructorHandlers.set(Date, function (o) { return new Date(o); });
  constructorHandlers.set(Map, function (o, fn) { return new Map(cloneArray(Array.from(o), fn)); });
  constructorHandlers.set(Set, function (o, fn) { return new Set(cloneArray(Array.from(o), fn)); });
  if (opts.constructorHandlers) {
    opts.constructorHandlers.forEach(function (handler) {
      constructorHandlers.set(handler[0], handler[1]);
    });
  }

  var handler = null;
  return opts.proto ? cloneProto : clone

  function cloneArray(a, fn) {
    var keys = Object.keys(a);
    var a2 = new Array(keys.length);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var cur = a[k];
      if (typeof cur !== 'object' || cur === null) {
        a2[k] = cur;
      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
        a2[k] = handler(cur, fn);
      } else if (ArrayBuffer.isView(cur)) {
        a2[k] = copyBuffer(cur);
      } else {
        var index = refs.indexOf(cur);
        if (index !== -1) {
          a2[k] = refsNew[index];
        } else {
          a2[k] = fn(cur);
        }
      }
    }
    return a2
  }

  function clone(o) {
    if (typeof o !== 'object' || o === null) { return o }
    if (Array.isArray(o)) { return cloneArray(o, clone) }
    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
      return handler(o, clone)
    }
    var o2 = {};
    refs.push(o);
    refsNew.push(o2);
    for (var k in o) {
      if (Object.hasOwnProperty.call(o, k) === false) { continue }
      var cur = o[k];
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur;
      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
        o2[k] = handler(cur, clone);
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur);
      } else {
        var i = refs.indexOf(cur);
        if (i !== -1) {
          o2[k] = refsNew[i];
        } else {
          o2[k] = clone(opts.reviver ? opts.reviver(k, cur) : cur);
        }
      }
    }
    refs.pop();
    refsNew.pop();
    return o2
  }

  function cloneProto(o) {
    if (typeof o !== 'object' || o === null) { return o }
    if (Array.isArray(o)) { return cloneArray(o, cloneProto) }
    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
      return handler(o, cloneProto)
    }
    var o2 = {};
    refs.push(o);
    refsNew.push(o2);
    for (var k in o) {
      var cur = o[k];
      if (typeof cur !== 'object' || cur === null) {
        o2[k] = cur;
      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
        o2[k] = handler(cur, cloneProto);
      } else if (ArrayBuffer.isView(cur)) {
        o2[k] = copyBuffer(cur);
      } else {
        var i = refs.indexOf(cur);
        if (i !== -1) {
          o2[k] = refsNew[i];
        } else {
          o2[k] = cloneProto(opts.reviver ? opts.reviver(k, cur) : cur);
        }
      }
    }
    refs.pop();
    refsNew.pop();
    return o2
  }
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"mp-admin","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"mp-admin","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"mp-admin","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

var cloneDeepCircles = rfdc({ circles: true, reviver: clearInstance });

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return cloneDeepCircles(ret)
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"mp-admin","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    'onUploadDouyinVideo',
    'onNFCReadMessage',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 4), __webpack_require__(/*! ./../../../../../buffer/index.js */ 27).Buffer))

/***/ }),

/***/ 27:
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ 28)
var ieee754 = __webpack_require__(/*! ieee754 */ 29)
var isArray = __webpack_require__(/*! isarray */ 30)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ 4)))

/***/ }),

/***/ 28:
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ 29:
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 3:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 5);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 6));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 12));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 16));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 19));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 14));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 23);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 26));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook, params) {
  return function (data) {
    return hook(data, params) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data, params) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      var res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res, options).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        // 重新访问 getApiInterceptorHooks, 允许 invoke 中再次调用 addInterceptor,removeInterceptor
        return api.apply(void 0, [wrapperOptions(getApiInterceptorHooks(method), options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (!res) {
          resolve(res);
          return;
        }
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|__f__|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|rpx2px|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS|getFacialRecognitionMetaInfo/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, Object.assign({}, options)].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var windowWidth, pixelRatio, platform;
  {
    var windowInfo = typeof wx.getWindowInfo === 'function' && wx.getWindowInfo() ? wx.getWindowInfo() : wx.getSystemInfoSync();
    var deviceInfo = typeof wx.getDeviceInfo === 'function' && wx.getDeviceInfo() ? wx.getDeviceInfo() : wx.getSystemInfoSync();
    windowWidth = windowInfo.windowWidth;
    pixelRatio = windowInfo.pixelRatio;
    platform = deviceInfo.platform;
  }
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
function getLocaleLanguage() {
  var localeLanguage = '';
  {
    var appBaseInfo = typeof wx.getAppBaseInfo === 'function' && wx.getAppBaseInfo() ? wx.getAppBaseInfo() : wx.getSystemInfoSync();
    var language = appBaseInfo && appBaseInfo.language ? appBaseInfo.language : LOCALE_EN;
    localeLanguage = normalizeLocale(language) || LOCALE_EN;
  }
  return localeLanguage;
}
var locale;
{
  locale = getLocaleLanguage();
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return getLocaleLanguage();
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  rpx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function getOSInfo(system, platform) {
  var osName = '';
  var osVersion = '';
  if (platform && "mp-weixin" === 'mp-baidu') {
    osName = platform;
    osVersion = system;
  } else {
    osName = system.split(' ')[0] || platform;
    osVersion = system.split(' ')[1] || '';
  }
  osName = osName.toLocaleLowerCase();
  switch (osName) {
    case 'harmony': // alipay
    case 'ohos': // weixin
    case 'openharmony':
      // feishu
      osName = 'harmonyos';
      break;
    case 'iphone os':
      // alipay
      osName = 'ios';
      break;
    case 'mac': // weixin qq
    case 'darwin':
      // feishu
      osName = 'macos';
      break;
    case 'windows_nt':
      // feishu
      osName = 'windows';
      break;
  }
  return {
    osName: osName,
    osVersion: osVersion
  };
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  var extraParam = {};

  // osName osVersion
  var _getOSInfo = getOSInfo(system, platform),
    osName = _getOSInfo.osName,
    osVersion = _getOSInfo.osVersion;
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = (language || '').replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__594BB33",
    appName: "mp-admin",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "5.06",
    uniCompilerVersion: "5.06",
    uniRuntimeVersion: "5.06",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined,
    isUniAppX: false
  };
  Object.assign(result, parameters, extraParam);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var showActionSheet = {
  args: function args(fromArgs) {
    if ((0, _typeof2.default)(fromArgs) === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  }
};
var getAppBaseInfo = {
  returnValue: function returnValue(result) {
    var _result = result,
      version = _result.version,
      language = _result.language,
      SDKVersion = _result.SDKVersion,
      theme = _result.theme;
    var _hostName = getHostName(result);
    var hostLanguage = (language || '').replace('_', '-');
    result = sortObject(Object.assign(result, {
      appId: "__UNI__594BB33",
      appName: "mp-admin",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      isUniAppX: false,
      uniPlatform: undefined || "mp-weixin",
      uniCompileVersion: "5.06",
      uniCompilerVersion: "5.06",
      uniRuntimeVersion: "5.06"
    }));
  }
};
var getDeviceInfo = {
  returnValue: function returnValue(result) {
    var _result2 = result,
      brand = _result2.brand,
      model = _result2.model,
      _result2$system = _result2.system,
      system = _result2$system === void 0 ? '' : _result2$system,
      _result2$platform = _result2.platform,
      platform = _result2$platform === void 0 ? '' : _result2$platform;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);
    var _getOSInfo2 = getOSInfo(system, platform),
      osName = _getOSInfo2.osName,
      osVersion = _getOSInfo2.osVersion;
    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model,
      osName: osName,
      osVersion: osVersion
    }));
  }
};
var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);
    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {
    var locationReducedAccuracy = result.locationReducedAccuracy;
    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  }
};

// import navigateTo from 'uni-helpers/navigate-to'

var compressImage = {
  args: function args(fromArgs) {
    // https://developers.weixin.qq.com/community/develop/doc/000c08940c865011298e0a43256800?highLine=compressHeight
    if (fromArgs.compressedHeight && !fromArgs.compressHeight) {
      fromArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !fromArgs.compressWidth) {
      fromArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting,
  compressImage: compressImage
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
function __f__(type) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }
  console[type].apply(console, args);
}
var baseInfo = wx.getAppBaseInfo && wx.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx.getSystemInfoSync();
}
var host = baseInfo ? baseInfo.host : null;
var shareVideoMessage = host && host.env === 'SAAASDK' ? wx.miniapp.shareVideoMessage : wx.shareVideoMessage;
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  shareVideoMessage: shareVideoMessage,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback,
  __f__: __f__
});
var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function isPage() {
  return !!this.route;
}
function initRelation(detail) {
  this.triggerEvent('__l', detail);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach(function (name) {
      var matches = name.match(WORKLET_RE);
      if (matches) {
        var workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"mp-admin","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: ''
        };
        properties.virtualHostClass = {
          type: null,
          value: ''
        };
      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var eventChannels = {};
function getEventChannel(id) {
  var eventChannel = eventChannels[id];
  delete eventChannels[id];
  return eventChannel;
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  function currentId(fn) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      fn(vueId);
    }
  }
  _vue.default.prototype.$hasSSP = function (vueId) {
    var slot = center[vueId];
    if (!slot) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return slot;
  };
  _vue.default.prototype.$getSSP = function (vueId, name, needAll) {
    var slot = center[vueId];
    if (slot) {
      var params = slot[name] || [];
      if (needAll) {
        return params;
      }
      return params[0];
    }
  };
  _vue.default.prototype.$setSSP = function (name, value) {
    var index = 0;
    currentId.call(this, function (vueId) {
      var slot = center[vueId];
      var params = slot[name] = slot[name] || [];
      params.push(value);
      index = params.length - 1;
    });
    return index;
  };
  _vue.default.prototype.$initSSP = function () {
    currentId.call(this, function (vueId) {
      center[vueId] = {};
    });
  };
  _vue.default.prototype.$callSSP = function () {
    currentId.call(this, function (vueId) {
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    });
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-weixin";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, getLocaleLanguage$1());
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function getLocaleLanguage$1() {
  var localeLanguage = '';
  {
    var appBaseInfo = wx.getAppBaseInfo();
    var language = appBaseInfo && appBaseInfo.language ? appBaseInfo.language : LOCALE_EN;
    localeLanguage = normalizeLocale(language) || LOCALE_EN;
  }
  return localeLanguage;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true
  }, vueOptions.options || {});
  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  {
    initWorkletMethods(pageOptions.methods, vueOptions.methods);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, extraApi[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}
wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 2)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 4)))

/***/ }),

/***/ 30:
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ 31:
/*!***************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages.json ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 32:
/*!************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni, wx) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 5);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uniCloud = exports.default = exports.UniCloudError = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 33));
var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ 35));
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 6));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 14));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 19));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 36));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 12));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ 37));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ 38));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ 39));
var _wrapNativeSuper2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ 40));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 24));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 25));
var _pages = _interopRequireDefault(__webpack_require__(/*! @/pages.json */ 42));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e35) { throw _e35; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e36) { didErr = true; err = _e36; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
function t(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function n(e, t, n) {
  return e(n = {
    path: t,
    exports: {},
    require: function require(e, t) {
      return function () {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
      }(null == t && n.path);
    }
  }, n.exports), n.exports;
}
var s = n(function (e, t) {
    var n;
    e.exports = (n = n || function (e, t) {
      var n = Object.create || function () {
          function e() {}
          return function (t) {
            var n;
            return e.prototype = t, n = new e(), e.prototype = null, n;
          };
        }(),
        s = {},
        r = s.lib = {},
        i = r.Base = {
          extend: function extend(e) {
            var t = n(this);
            return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {
              t.$super.init.apply(this, arguments);
            }), t.init.prototype = t, t.$super = this, t;
          },
          create: function create() {
            var e = this.extend();
            return e.init.apply(e, arguments), e;
          },
          init: function init() {},
          mixIn: function mixIn(e) {
            for (var t in e) {
              e.hasOwnProperty(t) && (this[t] = e[t]);
            }
            e.hasOwnProperty("toString") && (this.toString = e.toString);
          },
          clone: function clone() {
            return this.init.prototype.extend(this);
          }
        },
        o = r.WordArray = i.extend({
          init: function init(e, n) {
            e = this.words = e || [], this.sigBytes = n != t ? n : 4 * e.length;
          },
          toString: function toString(e) {
            return (e || c).stringify(this);
          },
          concat: function concat(e) {
            var t = this.words,
              n = e.words,
              s = this.sigBytes,
              r = e.sigBytes;
            if (this.clamp(), s % 4) for (var i = 0; i < r; i++) {
              var o = n[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              t[s + i >>> 2] |= o << 24 - (s + i) % 4 * 8;
            } else for (i = 0; i < r; i += 4) {
              t[s + i >>> 2] = n[i >>> 2];
            }
            return this.sigBytes += r, this;
          },
          clamp: function clamp() {
            var t = this.words,
              n = this.sigBytes;
            t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4);
          },
          clone: function clone() {
            var e = i.clone.call(this);
            return e.words = this.words.slice(0), e;
          },
          random: function random(t) {
            for (var n, s = [], r = function r(t) {
                t = t;
                var n = 987654321,
                  s = 4294967295;
                return function () {
                  var r = ((n = 36969 * (65535 & n) + (n >> 16) & s) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & s) & s;
                  return r /= 4294967296, (r += .5) * (e.random() > .5 ? 1 : -1);
                };
              }, i = 0; i < t; i += 4) {
              var a = r(4294967296 * (n || e.random()));
              n = 987654071 * a(), s.push(4294967296 * a() | 0);
            }
            return new o.init(s, t);
          }
        }),
        a = s.enc = {},
        c = a.Hex = {
          stringify: function stringify(e) {
            for (var t = e.words, n = e.sigBytes, s = [], r = 0; r < n; r++) {
              var i = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;
              s.push((i >>> 4).toString(16)), s.push((15 & i).toString(16));
            }
            return s.join("");
          },
          parse: function parse(e) {
            for (var t = e.length, n = [], s = 0; s < t; s += 2) {
              n[s >>> 3] |= parseInt(e.substr(s, 2), 16) << 24 - s % 8 * 4;
            }
            return new o.init(n, t / 2);
          }
        },
        u = a.Latin1 = {
          stringify: function stringify(e) {
            for (var t = e.words, n = e.sigBytes, s = [], r = 0; r < n; r++) {
              var i = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;
              s.push(String.fromCharCode(i));
            }
            return s.join("");
          },
          parse: function parse(e) {
            for (var t = e.length, n = [], s = 0; s < t; s++) {
              n[s >>> 2] |= (255 & e.charCodeAt(s)) << 24 - s % 4 * 8;
            }
            return new o.init(n, t);
          }
        },
        l = a.Utf8 = {
          stringify: function stringify(e) {
            try {
              return decodeURIComponent(escape(u.stringify(e)));
            } catch (e) {
              throw new Error("Malformed UTF-8 data");
            }
          },
          parse: function parse(e) {
            return u.parse(unescape(encodeURIComponent(e)));
          }
        },
        h = r.BufferedBlockAlgorithm = i.extend({
          reset: function reset() {
            this._data = new o.init(), this._nDataBytes = 0;
          },
          _append: function _append(e) {
            "string" == typeof e && (e = l.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;
          },
          _process: function _process(t) {
            var n = this._data,
              s = n.words,
              r = n.sigBytes,
              i = this.blockSize,
              a = r / (4 * i),
              c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * i,
              u = e.min(4 * c, r);
            if (c) {
              for (var l = 0; l < c; l += i) {
                this._doProcessBlock(s, l);
              }
              var h = s.splice(0, c);
              n.sigBytes -= u;
            }
            return new o.init(h, u);
          },
          clone: function clone() {
            var e = i.clone.call(this);
            return e._data = this._data.clone(), e;
          },
          _minBufferSize: 0
        });
      r.Hasher = h.extend({
        cfg: i.extend(),
        init: function init(e) {
          this.cfg = this.cfg.extend(e), this.reset();
        },
        reset: function reset() {
          h.reset.call(this), this._doReset();
        },
        update: function update(e) {
          return this._append(e), this._process(), this;
        },
        finalize: function finalize(e) {
          return e && this._append(e), this._doFinalize();
        },
        blockSize: 16,
        _createHelper: function _createHelper(e) {
          return function (t, n) {
            return new e.init(n).finalize(t);
          };
        },
        _createHmacHelper: function _createHmacHelper(e) {
          return function (t, n) {
            return new d.HMAC.init(e, n).finalize(t);
          };
        }
      });
      var d = s.algo = {};
      return s;
    }(Math), n);
  }),
  r = s,
  i = (n(function (e, t) {
    var n;
    e.exports = (n = r, function (e) {
      var t = n,
        s = t.lib,
        r = s.WordArray,
        i = s.Hasher,
        o = t.algo,
        a = [];
      !function () {
        for (var t = 0; t < 64; t++) {
          a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;
        }
      }();
      var c = o.MD5 = i.extend({
        _doReset: function _doReset() {
          this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878]);
        },
        _doProcessBlock: function _doProcessBlock(e, t) {
          for (var n = 0; n < 16; n++) {
            var s = t + n,
              r = e[s];
            e[s] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8);
          }
          var i = this._hash.words,
            o = e[t + 0],
            c = e[t + 1],
            p = e[t + 2],
            f = e[t + 3],
            g = e[t + 4],
            m = e[t + 5],
            y = e[t + 6],
            _ = e[t + 7],
            w = e[t + 8],
            v = e[t + 9],
            I = e[t + 10],
            S = e[t + 11],
            b = e[t + 12],
            k = e[t + 13],
            A = e[t + 14],
            T = e[t + 15],
            C = i[0],
            P = i[1],
            O = i[2],
            E = i[3];
          C = u(C, P, O, E, o, 7, a[0]), E = u(E, C, P, O, c, 12, a[1]), O = u(O, E, C, P, p, 17, a[2]), P = u(P, O, E, C, f, 22, a[3]), C = u(C, P, O, E, g, 7, a[4]), E = u(E, C, P, O, m, 12, a[5]), O = u(O, E, C, P, y, 17, a[6]), P = u(P, O, E, C, _, 22, a[7]), C = u(C, P, O, E, w, 7, a[8]), E = u(E, C, P, O, v, 12, a[9]), O = u(O, E, C, P, I, 17, a[10]), P = u(P, O, E, C, S, 22, a[11]), C = u(C, P, O, E, b, 7, a[12]), E = u(E, C, P, O, k, 12, a[13]), O = u(O, E, C, P, A, 17, a[14]), C = l(C, P = u(P, O, E, C, T, 22, a[15]), O, E, c, 5, a[16]), E = l(E, C, P, O, y, 9, a[17]), O = l(O, E, C, P, S, 14, a[18]), P = l(P, O, E, C, o, 20, a[19]), C = l(C, P, O, E, m, 5, a[20]), E = l(E, C, P, O, I, 9, a[21]), O = l(O, E, C, P, T, 14, a[22]), P = l(P, O, E, C, g, 20, a[23]), C = l(C, P, O, E, v, 5, a[24]), E = l(E, C, P, O, A, 9, a[25]), O = l(O, E, C, P, f, 14, a[26]), P = l(P, O, E, C, w, 20, a[27]), C = l(C, P, O, E, k, 5, a[28]), E = l(E, C, P, O, p, 9, a[29]), O = l(O, E, C, P, _, 14, a[30]), C = h(C, P = l(P, O, E, C, b, 20, a[31]), O, E, m, 4, a[32]), E = h(E, C, P, O, w, 11, a[33]), O = h(O, E, C, P, S, 16, a[34]), P = h(P, O, E, C, A, 23, a[35]), C = h(C, P, O, E, c, 4, a[36]), E = h(E, C, P, O, g, 11, a[37]), O = h(O, E, C, P, _, 16, a[38]), P = h(P, O, E, C, I, 23, a[39]), C = h(C, P, O, E, k, 4, a[40]), E = h(E, C, P, O, o, 11, a[41]), O = h(O, E, C, P, f, 16, a[42]), P = h(P, O, E, C, y, 23, a[43]), C = h(C, P, O, E, v, 4, a[44]), E = h(E, C, P, O, b, 11, a[45]), O = h(O, E, C, P, T, 16, a[46]), C = d(C, P = h(P, O, E, C, p, 23, a[47]), O, E, o, 6, a[48]), E = d(E, C, P, O, _, 10, a[49]), O = d(O, E, C, P, A, 15, a[50]), P = d(P, O, E, C, m, 21, a[51]), C = d(C, P, O, E, b, 6, a[52]), E = d(E, C, P, O, f, 10, a[53]), O = d(O, E, C, P, I, 15, a[54]), P = d(P, O, E, C, c, 21, a[55]), C = d(C, P, O, E, w, 6, a[56]), E = d(E, C, P, O, T, 10, a[57]), O = d(O, E, C, P, y, 15, a[58]), P = d(P, O, E, C, k, 21, a[59]), C = d(C, P, O, E, g, 6, a[60]), E = d(E, C, P, O, S, 10, a[61]), O = d(O, E, C, P, p, 15, a[62]), P = d(P, O, E, C, v, 21, a[63]), i[0] = i[0] + C | 0, i[1] = i[1] + P | 0, i[2] = i[2] + O | 0, i[3] = i[3] + E | 0;
        },
        _doFinalize: function _doFinalize() {
          var t = this._data,
            n = t.words,
            s = 8 * this._nDataBytes,
            r = 8 * t.sigBytes;
          n[r >>> 5] |= 128 << 24 - r % 32;
          var i = e.floor(s / 4294967296),
            o = s;
          n[15 + (r + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), n[14 + (r + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), t.sigBytes = 4 * (n.length + 1), this._process();
          for (var a = this._hash, c = a.words, u = 0; u < 4; u++) {
            var l = c[u];
            c[u] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8);
          }
          return a;
        },
        clone: function clone() {
          var e = i.clone.call(this);
          return e._hash = this._hash.clone(), e;
        }
      });
      function u(e, t, n, s, r, i, o) {
        var a = e + (t & n | ~t & s) + r + o;
        return (a << i | a >>> 32 - i) + t;
      }
      function l(e, t, n, s, r, i, o) {
        var a = e + (t & s | n & ~s) + r + o;
        return (a << i | a >>> 32 - i) + t;
      }
      function h(e, t, n, s, r, i, o) {
        var a = e + (t ^ n ^ s) + r + o;
        return (a << i | a >>> 32 - i) + t;
      }
      function d(e, t, n, s, r, i, o) {
        var a = e + (n ^ (t | ~s)) + r + o;
        return (a << i | a >>> 32 - i) + t;
      }
      t.MD5 = i._createHelper(c), t.HmacMD5 = i._createHmacHelper(c);
    }(Math), n.MD5);
  }), n(function (e, t) {
    var n;
    e.exports = (n = r, void function () {
      var e = n,
        t = e.lib.Base,
        s = e.enc.Utf8;
      e.algo.HMAC = t.extend({
        init: function init(e, t) {
          e = this._hasher = new e.init(), "string" == typeof t && (t = s.parse(t));
          var n = e.blockSize,
            r = 4 * n;
          t.sigBytes > r && (t = e.finalize(t)), t.clamp();
          for (var i = this._oKey = t.clone(), o = this._iKey = t.clone(), a = i.words, c = o.words, u = 0; u < n; u++) {
            a[u] ^= 1549556828, c[u] ^= 909522486;
          }
          i.sigBytes = o.sigBytes = r, this.reset();
        },
        reset: function reset() {
          var e = this._hasher;
          e.reset(), e.update(this._iKey);
        },
        update: function update(e) {
          return this._hasher.update(e), this;
        },
        finalize: function finalize(e) {
          var t = this._hasher,
            n = t.finalize(e);
          return t.reset(), t.finalize(this._oKey.clone().concat(n));
        }
      });
    }());
  }), n(function (e, t) {
    e.exports = r.HmacMD5;
  })),
  o = n(function (e, t) {
    e.exports = r.enc.Utf8;
  }),
  a = n(function (e, t) {
    var n;
    e.exports = (n = r, function () {
      var e = n,
        t = e.lib.WordArray;
      function s(e, n, s) {
        for (var r = [], i = 0, o = 0; o < n; o++) {
          if (o % 4) {
            var a = s[e.charCodeAt(o - 1)] << o % 4 * 2,
              c = s[e.charCodeAt(o)] >>> 6 - o % 4 * 2;
            r[i >>> 2] |= (a | c) << 24 - i % 4 * 8, i++;
          }
        }
        return t.create(r, i);
      }
      e.enc.Base64 = {
        stringify: function stringify(e) {
          var t = e.words,
            n = e.sigBytes,
            s = this._map;
          e.clamp();
          for (var r = [], i = 0; i < n; i += 3) {
            for (var o = (t[i >>> 2] >>> 24 - i % 4 * 8 & 255) << 16 | (t[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255) << 8 | t[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255, a = 0; a < 4 && i + .75 * a < n; a++) {
              r.push(s.charAt(o >>> 6 * (3 - a) & 63));
            }
          }
          var c = s.charAt(64);
          if (c) for (; r.length % 4;) {
            r.push(c);
          }
          return r.join("");
        },
        parse: function parse(e) {
          var t = e.length,
            n = this._map,
            r = this._reverseMap;
          if (!r) {
            r = this._reverseMap = [];
            for (var i = 0; i < n.length; i++) {
              r[n.charCodeAt(i)] = i;
            }
          }
          var o = n.charAt(64);
          if (o) {
            var a = e.indexOf(o);
            -1 !== a && (t = a);
          }
          return s(e, t, r);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
      };
    }(), n.enc.Base64);
  });
var c = "FUNCTION",
  u = "OBJECT",
  l = "CLIENT_DB",
  h = "pending",
  d = "fulfilled",
  p = "rejected";
function f(e) {
  return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
}
function g(e) {
  return "object" === f(e);
}
function m(e) {
  return "function" == typeof e;
}
function y(e) {
  return function () {
    try {
      return e.apply(e, arguments);
    } catch (e) {
      console.error(e);
    }
  };
}
var _ = "REJECTED",
  w = "NOT_PENDING";
var v = /*#__PURE__*/function () {
  function v() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      e = _ref.createPromise,
      _ref$retryRule = _ref.retryRule,
      t = _ref$retryRule === void 0 ? _ : _ref$retryRule;
    (0, _classCallCheck2.default)(this, v);
    this.createPromise = e, this.status = null, this.promise = null, this.retryRule = t;
  }
  (0, _createClass2.default)(v, [{
    key: "needRetry",
    get: function get() {
      if (!this.status) return !0;
      switch (this.retryRule) {
        case _:
          return this.status === p;
        case w:
          return this.status !== h;
      }
    }
  }, {
    key: "exec",
    value: function exec() {
      var _this = this;
      return this.needRetry ? (this.status = h, this.promise = this.createPromise().then(function (e) {
        return _this.status = d, Promise.resolve(e);
      }, function (e) {
        return _this.status = p, Promise.reject(e);
      }), this.promise) : this.promise;
    }
  }]);
  return v;
}();
function I(e) {
  return e && "string" == typeof e ? JSON.parse(e) : e;
}
var S = "development" === "development",
  b = "mp-weixin",
  k = "true" === undefined || !0 === undefined,
  A = I([]),
  T = "h5" === b ? "web" : "app-plus" === b || "app-harmony" === b ? "app" : b,
  C = I({"address":["127.0.0.1","192.168.100.100"],"servePort":7002,"debugPort":9002,"initialLaunchType":"remote","skipFiles":["<node_internals>/**","D:/APP/Hbuilderx/HBuilderX/plugins/unicloud/**/*.js"]}),
  P = I([{"provider":"aliyun","spaceName":"wenmingshengchan","spaceId":"mp-f5dec8e2-6434-4681-934d-fc46f8267fea","clientSecret":"bj1QzvYuni9rWUEMHQYIwg==","endpoint":"https://api.next.bspapp.com","failoverEndpoint":""}]) || [],
  O = true;
var E = "";
try {
  E = (__webpack_require__(/*! uni-stat-config */ 43).default || __webpack_require__(/*! uni-stat-config */ 43)).appid;
} catch (e) {}
var x,
  L = {};
function U(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var n, s;
  return n = L, s = e, Object.prototype.hasOwnProperty.call(n, s) || (L[e] = t), L[e];
}
function R() {
  return x || (x = function () {
    if ("undefined" != typeof globalThis) return globalThis;
    if ("undefined" != typeof self) return self;
    if ("undefined" != typeof window) return window;
    function e() {
      return this;
    }
    return void 0 !== e() ? e() : new Function("return this")();
  }(), x);
}
"app" === T && (L = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {});
var N = ["invoke", "success", "fail", "complete"],
  D = U("_globalUniCloudInterceptor");
function M(e, t) {
  D[e] || (D[e] = {}), g(t) && Object.keys(t).forEach(function (n) {
    N.indexOf(n) > -1 && function (e, t, n) {
      var s = D[e][t];
      s || (s = D[e][t] = []), -1 === s.indexOf(n) && m(n) && s.push(n);
    }(e, n, t[n]);
  });
}
function q(e, t) {
  D[e] || (D[e] = {}), g(t) ? Object.keys(t).forEach(function (n) {
    N.indexOf(n) > -1 && function (e, t, n) {
      var s = D[e][t];
      if (!s) return;
      var r = s.indexOf(n);
      r > -1 && s.splice(r, 1);
    }(e, n, t[n]);
  }) : delete D[e];
}
function F(e, t) {
  return e && 0 !== e.length ? e.reduce(function (e, n) {
    return e.then(function () {
      return n(t);
    });
  }, Promise.resolve()) : Promise.resolve();
}
function K(e, t) {
  return D[e] && D[e][t] || [];
}
function j(e) {
  M("callObject", e);
}
var $ = U("_globalUniCloudListener"),
  B = "response",
  W = "needLogin",
  H = "refreshToken",
  J = "failover",
  z = "clientdb",
  V = "cloudfunction",
  G = "cloudobject";
function Q(e) {
  return $[e] || ($[e] = []), $[e];
}
function Y(e, t) {
  var n = Q(e);
  n.includes(t) || n.push(t);
}
function X(e, t) {
  var n = Q(e),
    s = n.indexOf(t);
  -1 !== s && n.splice(s, 1);
}
function Z(e, t) {
  var n = Q(e);
  for (var _e2 = 0; _e2 < n.length; _e2++) {
    (0, n[_e2])(t);
  }
}
var ee,
  te = !1;
function ne() {
  return ee || (ee = new Promise(function (e) {
    te && e(), function t() {
      if ("function" == typeof getCurrentPages) {
        var _t2 = getCurrentPages();
        _t2 && _t2[0] && (te = !0, e());
      }
      te || setTimeout(function () {
        t();
      }, 30);
    }();
  }), ee);
}
function se(e) {
  var t = {};
  for (var _n2 in e) {
    var _s2 = e[_n2];
    m(_s2) && (t[_n2] = y(_s2));
  }
  return t;
}
var re = /*#__PURE__*/function (_Error) {
  (0, _inherits2.default)(re, _Error);
  var _super = _createSuper(re);
  function re(e) {
    var _this2;
    (0, _classCallCheck2.default)(this, re);
    var t = e.message || e.errMsg || "unknown system error";
    _this2 = _super.call(this, t), _this2.errMsg = t, _this2.code = _this2.errCode = e.code || e.errCode || "SYSTEM_ERROR", _this2.errSubject = _this2.subject = e.subject || e.errSubject, _this2.cause = e.cause, _this2.requestId = e.requestId;
    return _this2;
  }
  (0, _createClass2.default)(re, [{
    key: "toJson",
    value: function toJson() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (!(e >= 10)) return e++, {
        errCode: this.errCode,
        errMsg: this.errMsg,
        errSubject: this.errSubject,
        cause: this.cause && this.cause.toJson ? this.cause.toJson(e) : this.cause
      };
    }
  }]);
  return re;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));
exports.UniCloudError = re;
var ie = {
  request: function request(e) {
    return uni.request(e);
  },
  uploadFile: function uploadFile(e) {
    return uni.uploadFile(e);
  },
  setStorageSync: function setStorageSync(e, t) {
    return uni.setStorageSync(e, t);
  },
  getStorageSync: function getStorageSync(e) {
    return uni.getStorageSync(e);
  },
  removeStorageSync: function removeStorageSync(e) {
    return uni.removeStorageSync(e);
  },
  clearStorageSync: function clearStorageSync() {
    return uni.clearStorageSync();
  },
  connectSocket: function connectSocket(e) {
    return uni.connectSocket(e);
  }
};
function oe() {
  return {
    token: ie.getStorageSync("uni_id_token") || ie.getStorageSync("uniIdToken"),
    tokenExpired: ie.getStorageSync("uni_id_token_expired")
  };
}
function ae() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    e = _ref2.token,
    t = _ref2.tokenExpired;
  e && ie.setStorageSync("uni_id_token", e), t && ie.setStorageSync("uni_id_token_expired", t);
}
var ce, ue;
function le() {
  return ce || (ce = "mp-weixin" === T && wx.canIUse("getAppBaseInfo") && wx.canIUse("getDeviceInfo") ? _objectSpread(_objectSpread({}, uni.getAppBaseInfo()), uni.getDeviceInfo()) : uni.getSystemInfoSync()), ce;
}
function he() {
  var e, t;
  try {
    if (uni.getLaunchOptionsSync) {
      if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1) return;
      var _uni$getLaunchOptions = uni.getLaunchOptionsSync(),
        _n3 = _uni$getLaunchOptions.scene,
        _s3 = _uni$getLaunchOptions.channel;
      e = _s3, t = _n3;
    }
  } catch (e) {}
  return {
    channel: e,
    scene: t
  };
}
var de = {};
function pe() {
  var e = uni.getLocale && uni.getLocale() || "en";
  if (ue) return _objectSpread(_objectSpread(_objectSpread({}, de), ue), {}, {
    locale: e,
    LOCALE: e
  });
  var t = le(),
    n = t.deviceId,
    s = t.osName,
    r = t.uniPlatform,
    i = t.appId,
    o = ["appId", "appLanguage", "appName", "appVersion", "appVersionCode", "appWgtVersion", "browserName", "browserVersion", "deviceBrand", "deviceId", "deviceModel", "deviceType", "osName", "osVersion", "romName", "romVersion", "ua", "hostName", "hostVersion", "uniPlatform", "uniRuntimeVersion", "uniRuntimeVersionCode", "uniCompilerVersion", "uniCompilerVersionCode"];
  for (var _e3 in t) {
    Object.hasOwnProperty.call(t, _e3) && -1 === o.indexOf(_e3) && delete t[_e3];
  }
  return ue = _objectSpread(_objectSpread({
    PLATFORM: r,
    OS: s,
    APPID: i,
    DEVICEID: n
  }, he()), t), _objectSpread(_objectSpread(_objectSpread({}, de), ue), {}, {
    locale: e,
    LOCALE: e
  });
}
var fe = {
  sign: function sign(e, t) {
    var n = "";
    return Object.keys(e).sort().forEach(function (t) {
      e[t] && (n = n + "&" + t + "=" + e[t]);
    }), n = n.slice(1), i(n, t).toString();
  },
  wrappedRequest: function wrappedRequest(e, t) {
    return new Promise(function (n, s) {
      t(Object.assign(e, {
        complete: function complete(e) {
          e || (e = {}), S && "web" === T && e.errMsg && 0 === e.errMsg.indexOf("request:fail") && console.warn("发布H5，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。教程参考：https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5");
          var t = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];
          if (!e.statusCode || e.statusCode >= 400) {
            var _n4 = e.data && e.data.error && e.data.error.code || "SYS_ERR",
              _r = e.data && e.data.error && e.data.error.message || e.errMsg || "request:fail";
            return s(new re({
              code: _n4,
              message: _r,
              requestId: t
            }));
          }
          var r = e.data;
          if (r.error) return s(new re({
            code: r.error.code,
            message: r.error.message,
            requestId: t
          }));
          r.result = r.data, r.requestId = t, delete r.data, n(r);
        }
      }));
    });
  },
  toBase64: function toBase64(e) {
    return a.stringify(o.parse(e));
  }
};
var ge = /*#__PURE__*/function () {
  function ge(e) {
    var _this3 = this;
    (0, _classCallCheck2.default)(this, ge);
    ["spaceId", "clientSecret"].forEach(function (t) {
      if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error("".concat(t, " required"));
    }), this.config = Object.assign({}, {
      endpoint: 0 === e.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com"
    }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = ie, this._getAccessTokenPromiseHub = new v({
      createPromise: function createPromise() {
        return _this3.requestAuth(_this3.setupRequest({
          method: "serverless.auth.user.anonymousAuthorize",
          params: "{}"
        }, "auth")).then(function (e) {
          if (!e.result || !e.result.accessToken) throw new re({
            code: "AUTH_FAILED",
            message: "获取accessToken失败"
          });
          _this3.setAccessToken(e.result.accessToken);
        });
      },
      retryRule: w
    });
  }
  (0, _createClass2.default)(ge, [{
    key: "hasAccessToken",
    get: function get() {
      return !!this.accessToken;
    }
  }, {
    key: "setAccessToken",
    value: function setAccessToken(e) {
      this.accessToken = e;
    }
  }, {
    key: "requestWrapped",
    value: function requestWrapped(e) {
      return fe.wrappedRequest(e, this.adapter.request);
    }
  }, {
    key: "requestAuth",
    value: function requestAuth(e) {
      return this.requestWrapped(e);
    }
  }, {
    key: "request",
    value: function request(e, t) {
      var _this4 = this;
      return Promise.resolve().then(function () {
        return _this4.hasAccessToken ? t ? _this4.requestWrapped(e) : _this4.requestWrapped(e).catch(function (t) {
          return new Promise(function (e, n) {
            !t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? n(t) : e();
          }).then(function () {
            return _this4.getAccessToken();
          }).then(function () {
            var t = _this4.rebuildRequest(e);
            return _this4.request(t, !0);
          });
        }) : _this4.getAccessToken().then(function () {
          var t = _this4.rebuildRequest(e);
          return _this4.request(t, !0);
        });
      });
    }
  }, {
    key: "rebuildRequest",
    value: function rebuildRequest(e) {
      var t = Object.assign({}, e);
      return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = fe.sign(t.data, this.config.clientSecret), t;
    }
  }, {
    key: "setupRequest",
    value: function setupRequest(e, t) {
      var n = Object.assign({}, e, {
          spaceId: this.config.spaceId,
          timestamp: Date.now()
        }),
        s = {
          "Content-Type": "application/json"
        };
      return "auth" !== t && (n.token = this.accessToken, s["x-basement-token"] = this.accessToken), s["x-serverless-sign"] = fe.sign(n, this.config.clientSecret), {
        url: this.config.requestUrl,
        method: "POST",
        data: n,
        dataType: "json",
        header: s
      };
    }
  }, {
    key: "getAccessToken",
    value: function getAccessToken() {
      return this._getAccessTokenPromiseHub.exec();
    }
  }, {
    key: "authorize",
    value: function () {
      var _authorize = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getAccessToken();
              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function authorize() {
        return _authorize.apply(this, arguments);
      }
      return authorize;
    }()
  }, {
    key: "callFunction",
    value: function callFunction(e) {
      var t = {
        method: "serverless.function.runtime.invoke",
        params: JSON.stringify({
          functionTarget: e.name,
          functionArgs: e.data || {}
        })
      };
      return this.request(_objectSpread(_objectSpread({}, this.setupRequest(t)), {}, {
        timeout: e.timeout
      }));
    }
  }, {
    key: "getOSSUploadOptionsFromPath",
    value: function getOSSUploadOptionsFromPath(e) {
      var t = {
        method: "serverless.file.resource.generateProximalSign",
        params: JSON.stringify(e)
      };
      return this.request(this.setupRequest(t));
    }
  }, {
    key: "uploadFileToOSS",
    value: function uploadFileToOSS(_ref3) {
      var _this5 = this;
      var e = _ref3.url,
        t = _ref3.formData,
        n = _ref3.name,
        s = _ref3.filePath,
        r = _ref3.fileType,
        i = _ref3.onUploadProgress;
      return new Promise(function (o, a) {
        var c = _this5.adapter.uploadFile({
          url: e,
          formData: t,
          name: n,
          filePath: s,
          fileType: r,
          header: {
            "X-OSS-server-side-encrpytion": "AES256"
          },
          success: function success(e) {
            e && e.statusCode < 400 ? o(e) : a(new re({
              code: "UPLOAD_FAILED",
              message: "文件上传失败"
            }));
          },
          fail: function fail(e) {
            a(new re({
              code: e.code || "UPLOAD_FAILED",
              message: e.message || e.errMsg || "文件上传失败"
            }));
          }
        });
        "function" == typeof i && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {
          i({
            loaded: e.totalBytesSent,
            total: e.totalBytesExpectedToSend
          });
        });
      });
    }
  }, {
    key: "reportOSSUpload",
    value: function reportOSSUpload(e) {
      var t = {
        method: "serverless.file.resource.report",
        params: JSON.stringify(e)
      };
      return this.request(this.setupRequest(t));
    }
  }, {
    key: "uploadFile",
    value: function () {
      var _uploadFile = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_ref4) {
        var e, t, _ref4$fileType, n, _ref4$cloudPathAsReal, s, r, i, o, a, c, u, l, h, d, p, g, m, y, _, _e4, w;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                e = _ref4.filePath, t = _ref4.cloudPath, _ref4$fileType = _ref4.fileType, n = _ref4$fileType === void 0 ? "image" : _ref4$fileType, _ref4$cloudPathAsReal = _ref4.cloudPathAsRealPath, s = _ref4$cloudPathAsReal === void 0 ? !1 : _ref4$cloudPathAsReal, r = _ref4.onUploadProgress, i = _ref4.config;
                if (!("string" !== f(t))) {
                  _context2.next = 3;
                  break;
                }
                throw new re({
                  code: "INVALID_PARAM",
                  message: "cloudPath必须为字符串类型"
                });
              case 3:
                if (t = t.trim()) {
                  _context2.next = 5;
                  break;
                }
                throw new re({
                  code: "INVALID_PARAM",
                  message: "cloudPath不可为空"
                });
              case 5:
                if (!/:\/\//.test(t)) {
                  _context2.next = 7;
                  break;
                }
                throw new re({
                  code: "INVALID_PARAM",
                  message: "cloudPath不合法"
                });
              case 7:
                o = i && i.envType || this.config.envType;
                if (!(s && ("/" !== t[0] && (t = "/" + t), t.indexOf("\\") > -1))) {
                  _context2.next = 10;
                  break;
                }
                throw new re({
                  code: "INVALID_PARAM",
                  message: "使用cloudPath作为路径时，cloudPath不可包含“\\”"
                });
              case 10:
                _context2.next = 12;
                return this.getOSSUploadOptionsFromPath({
                  env: o,
                  filename: s ? t.split("/").pop() : t,
                  fileId: s ? t : void 0
                });
              case 12:
                a = _context2.sent.result;
                c = "https://" + a.cdnDomain + "/" + a.ossPath;
                u = a.securityToken;
                l = a.accessKeyId;
                h = a.signature;
                d = a.host;
                p = a.ossPath;
                g = a.id;
                m = a.policy;
                y = a.ossCallbackUrl;
                _ = {
                  "Cache-Control": "max-age=2592000",
                  "Content-Disposition": "attachment",
                  OSSAccessKeyId: l,
                  Signature: h,
                  host: d,
                  id: g,
                  key: p,
                  policy: m,
                  success_action_status: 200
                };
                if (u && (_["x-oss-security-token"] = u), y) {
                  _e4 = JSON.stringify({
                    callbackUrl: y,
                    callbackBody: JSON.stringify({
                      fileId: g,
                      spaceId: this.config.spaceId
                    }),
                    callbackBodyType: "application/json"
                  });
                  _.callback = fe.toBase64(_e4);
                }
                w = {
                  url: "https://" + a.host,
                  formData: _,
                  fileName: "file",
                  name: "file",
                  filePath: e,
                  fileType: n
                };
                _context2.next = 27;
                return this.uploadFileToOSS(Object.assign({}, w, {
                  onUploadProgress: r
                }));
              case 27:
                if (!y) {
                  _context2.next = 29;
                  break;
                }
                return _context2.abrupt("return", {
                  success: !0,
                  filePath: e,
                  fileID: c
                });
              case 29:
                _context2.next = 31;
                return this.reportOSSUpload({
                  id: g
                });
              case 31:
                if (!_context2.sent.success) {
                  _context2.next = 33;
                  break;
                }
                return _context2.abrupt("return", {
                  success: !0,
                  filePath: e,
                  fileID: c
                });
              case 33:
                throw new re({
                  code: "UPLOAD_FAILED",
                  message: "文件上传失败"
                });
              case 34:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function uploadFile(_x) {
        return _uploadFile.apply(this, arguments);
      }
      return uploadFile;
    }()
  }, {
    key: "getTempFileURL",
    value: function getTempFileURL() {
      var _this6 = this;
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        e = _ref5.fileList;
      return new Promise(function (t, n) {
        Array.isArray(e) && 0 !== e.length || n(new re({
          code: "INVALID_PARAM",
          message: "fileList的元素必须是非空的字符串"
        })), _this6.getFileInfo({
          fileList: e
        }).then(function (n) {
          t({
            fileList: e.map(function (e, t) {
              var s = n.fileList[t];
              return {
                fileID: e,
                tempFileURL: s && s.url || e
              };
            })
          });
        });
      });
    }
  }, {
    key: "getFileInfo",
    value: function () {
      var _getFileInfo = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var _ref6,
          e,
          t,
          _args3 = arguments;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _ref6 = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {}, e = _ref6.fileList;
                if (!(!Array.isArray(e) || 0 === e.length)) {
                  _context3.next = 3;
                  break;
                }
                throw new re({
                  code: "INVALID_PARAM",
                  message: "fileList的元素必须是非空的字符串"
                });
              case 3:
                t = {
                  method: "serverless.file.resource.info",
                  params: JSON.stringify({
                    id: e.map(function (e) {
                      return e.split("?")[0];
                    }).join(",")
                  })
                };
                _context3.next = 6;
                return this.request(this.setupRequest(t));
              case 6:
                _context3.t0 = _context3.sent.result;
                return _context3.abrupt("return", {
                  fileList: _context3.t0
                });
              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function getFileInfo() {
        return _getFileInfo.apply(this, arguments);
      }
      return getFileInfo;
    }()
  }]);
  return ge;
}();
var me = {
  init: function init(e) {
    var t = new ge(e),
      n = {
        signInAnonymously: function signInAnonymously() {
          return t.authorize();
        },
        getLoginState: function getLoginState() {
          return Promise.resolve(!1);
        }
      };
    return t.auth = function () {
      return n;
    }, t.customAuth = t.auth, t;
  }
};
var ye = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
var _e;
!function (e) {
  e.local = "local", e.none = "none", e.session = "session";
}(_e || (_e = {}));
var we = function we() {},
  ve = n(function (e, t) {
    var n;
    e.exports = (n = r, function (e) {
      var t = n,
        s = t.lib,
        r = s.WordArray,
        i = s.Hasher,
        o = t.algo,
        a = [],
        c = [];
      !function () {
        function t(t) {
          for (var n = e.sqrt(t), s = 2; s <= n; s++) {
            if (!(t % s)) return !1;
          }
          return !0;
        }
        function n(e) {
          return 4294967296 * (e - (0 | e)) | 0;
        }
        for (var s = 2, r = 0; r < 64;) {
          t(s) && (r < 8 && (a[r] = n(e.pow(s, .5))), c[r] = n(e.pow(s, 1 / 3)), r++), s++;
        }
      }();
      var u = [],
        l = o.SHA256 = i.extend({
          _doReset: function _doReset() {
            this._hash = new r.init(a.slice(0));
          },
          _doProcessBlock: function _doProcessBlock(e, t) {
            for (var n = this._hash.words, s = n[0], r = n[1], i = n[2], o = n[3], a = n[4], l = n[5], h = n[6], d = n[7], p = 0; p < 64; p++) {
              if (p < 16) u[p] = 0 | e[t + p];else {
                var f = u[p - 15],
                  g = (f << 25 | f >>> 7) ^ (f << 14 | f >>> 18) ^ f >>> 3,
                  m = u[p - 2],
                  y = (m << 15 | m >>> 17) ^ (m << 13 | m >>> 19) ^ m >>> 10;
                u[p] = g + u[p - 7] + y + u[p - 16];
              }
              var _ = s & r ^ s & i ^ r & i,
                w = (s << 30 | s >>> 2) ^ (s << 19 | s >>> 13) ^ (s << 10 | s >>> 22),
                v = d + ((a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25)) + (a & l ^ ~a & h) + c[p] + u[p];
              d = h, h = l, l = a, a = o + v | 0, o = i, i = r, r = s, s = v + (w + _) | 0;
            }
            n[0] = n[0] + s | 0, n[1] = n[1] + r | 0, n[2] = n[2] + i | 0, n[3] = n[3] + o | 0, n[4] = n[4] + a | 0, n[5] = n[5] + l | 0, n[6] = n[6] + h | 0, n[7] = n[7] + d | 0;
          },
          _doFinalize: function _doFinalize() {
            var t = this._data,
              n = t.words,
              s = 8 * this._nDataBytes,
              r = 8 * t.sigBytes;
            return n[r >>> 5] |= 128 << 24 - r % 32, n[14 + (r + 64 >>> 9 << 4)] = e.floor(s / 4294967296), n[15 + (r + 64 >>> 9 << 4)] = s, t.sigBytes = 4 * n.length, this._process(), this._hash;
          },
          clone: function clone() {
            var e = i.clone.call(this);
            return e._hash = this._hash.clone(), e;
          }
        });
      t.SHA256 = i._createHelper(l), t.HmacSHA256 = i._createHmacHelper(l);
    }(Math), n.SHA256);
  }),
  Ie = ve,
  Se = n(function (e, t) {
    e.exports = r.HmacSHA256;
  });
var be = function be() {
  var e;
  if (!Promise) {
    e = function e() {}, e.promise = {};
    var _t3 = function _t3() {
      throw new re({
        message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.'
      });
    };
    return Object.defineProperty(e.promise, "then", {
      get: _t3
    }), Object.defineProperty(e.promise, "catch", {
      get: _t3
    }), e;
  }
  var t = new Promise(function (t, n) {
    e = function e(_e5, s) {
      return _e5 ? n(_e5) : t(s);
    };
  });
  return e.promise = t, e;
};
function ke(e) {
  return void 0 === e;
}
function Ae(e) {
  return "[object Null]" === Object.prototype.toString.call(e);
}
function Te() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return e.replace(/([\s\S]+)\s+(请前往云开发AI小助手查看问题：.*)/, "$1");
}
function Ce() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
  var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    n = t.length;
  var s = "";
  for (var _r2 = 0; _r2 < e; _r2++) {
    s += t.charAt(Math.floor(Math.random() * n));
  }
  return s;
}
var Pe;
function Oe(e) {
  var t = (n = e, "[object Array]" === Object.prototype.toString.call(n) ? e : [e]);
  var n;
  var _iterator = _createForOfIteratorHelper(t),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _e6 = _step.value;
      var _t4 = _e6.isMatch,
        _n5 = _e6.genAdapter,
        _s4 = _e6.runtime;
      if (_t4()) return {
        adapter: _n5(),
        runtime: _s4
      };
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
!function (e) {
  e.WEB = "web", e.WX_MP = "wx_mp";
}(Pe || (Pe = {}));
var Ee = {
    adapter: null,
    runtime: void 0
  },
  xe = ["anonymousUuidKey"];
var Le = /*#__PURE__*/function (_we) {
  (0, _inherits2.default)(Le, _we);
  var _super2 = _createSuper(Le);
  function Le() {
    var _this7;
    (0, _classCallCheck2.default)(this, Le);
    _this7 = _super2.call(this), Ee.adapter.root.tcbObject || (Ee.adapter.root.tcbObject = {});
    return _this7;
  }
  (0, _createClass2.default)(Le, [{
    key: "setItem",
    value: function setItem(e, t) {
      Ee.adapter.root.tcbObject[e] = t;
    }
  }, {
    key: "getItem",
    value: function getItem(e) {
      return Ee.adapter.root.tcbObject[e];
    }
  }, {
    key: "removeItem",
    value: function removeItem(e) {
      delete Ee.adapter.root.tcbObject[e];
    }
  }, {
    key: "clear",
    value: function clear() {
      delete Ee.adapter.root.tcbObject;
    }
  }]);
  return Le;
}(we);
function Ue(e, t) {
  switch (e) {
    case "local":
      return t.localStorage || new Le();
    case "none":
      return new Le();
    default:
      return t.sessionStorage || new Le();
  }
}
var Re = /*#__PURE__*/function () {
  function Re(e) {
    (0, _classCallCheck2.default)(this, Re);
    if (!this._storage) {
      this._persistence = Ee.adapter.primaryStorage || e.persistence, this._storage = Ue(this._persistence, Ee.adapter);
      var _t5 = "access_token_".concat(e.env),
        _n6 = "access_token_expire_".concat(e.env),
        _s5 = "refresh_token_".concat(e.env),
        _r3 = "anonymous_uuid_".concat(e.env),
        _i = "login_type_".concat(e.env),
        _o = "device_id",
        _a = "token_type_".concat(e.env),
        _c = "user_info_".concat(e.env);
      this.keys = {
        accessTokenKey: _t5,
        accessTokenExpireKey: _n6,
        refreshTokenKey: _s5,
        anonymousUuidKey: _r3,
        loginTypeKey: _i,
        userInfoKey: _c,
        deviceIdKey: _o,
        tokenTypeKey: _a
      };
    }
  }
  (0, _createClass2.default)(Re, [{
    key: "updatePersistence",
    value: function updatePersistence(e) {
      if (e === this._persistence) return;
      var t = "local" === this._persistence;
      this._persistence = e;
      var n = Ue(e, Ee.adapter);
      for (var _e7 in this.keys) {
        var _s6 = this.keys[_e7];
        if (t && xe.includes(_e7)) continue;
        var _r4 = this._storage.getItem(_s6);
        ke(_r4) || Ae(_r4) || (n.setItem(_s6, _r4), this._storage.removeItem(_s6));
      }
      this._storage = n;
    }
  }, {
    key: "setStore",
    value: function setStore(e, t, n) {
      if (!this._storage) return;
      var s = {
          version: n || "localCachev1",
          content: t
        },
        r = JSON.stringify(s);
      try {
        this._storage.setItem(e, r);
      } catch (e) {
        throw e;
      }
    }
  }, {
    key: "getStore",
    value: function getStore(e, t) {
      try {
        if (!this._storage) return;
      } catch (e) {
        return "";
      }
      t = t || "localCachev1";
      var n = this._storage.getItem(e);
      if (!n) return "";
      if (n.indexOf(t) >= 0) {
        return JSON.parse(n).content;
      }
      return "";
    }
  }, {
    key: "removeStore",
    value: function removeStore(e) {
      this._storage.removeItem(e);
    }
  }]);
  return Re;
}();
var Ne = {},
  De = {};
function Me(e) {
  return Ne[e];
}
var qe = /*#__PURE__*/(0, _createClass2.default)(function qe(e, t) {
  (0, _classCallCheck2.default)(this, qe);
  this.data = t || null, this.name = e;
});
var Fe = /*#__PURE__*/function (_qe) {
  (0, _inherits2.default)(Fe, _qe);
  var _super3 = _createSuper(Fe);
  function Fe(e, t) {
    var _this8;
    (0, _classCallCheck2.default)(this, Fe);
    _this8 = _super3.call(this, "error", {
      error: e,
      data: t
    }), _this8.error = e;
    return _this8;
  }
  return (0, _createClass2.default)(Fe);
}(qe);
var Ke = new ( /*#__PURE__*/function () {
  function _class() {
    (0, _classCallCheck2.default)(this, _class);
    this._listeners = {};
  }
  (0, _createClass2.default)(_class, [{
    key: "on",
    value: function on(e, t) {
      return function (e, t, n) {
        n[e] = n[e] || [], n[e].push(t);
      }(e, t, this._listeners), this;
    }
  }, {
    key: "off",
    value: function off(e, t) {
      return function (e, t, n) {
        if (n && n[e]) {
          var _s7 = n[e].indexOf(t);
          -1 !== _s7 && n[e].splice(_s7, 1);
        }
      }(e, t, this._listeners), this;
    }
  }, {
    key: "fire",
    value: function fire(e, t) {
      if (e instanceof Fe) return console.error(e.error), this;
      var n = "string" == typeof e ? new qe(e, t || {}) : e;
      var s = n.name;
      if (this._listens(s)) {
        n.target = this;
        var _e8 = this._listeners[s] ? (0, _toConsumableArray2.default)(this._listeners[s]) : [];
        var _iterator2 = _createForOfIteratorHelper(_e8),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _t6 = _step2.value;
            _t6.call(this, n);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      return this;
    }
  }, {
    key: "_listens",
    value: function _listens(e) {
      return this._listeners[e] && this._listeners[e].length > 0;
    }
  }]);
  return _class;
}())();
function je(e, t) {
  Ke.on(e, t);
}
function $e(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Ke.fire(e, t);
}
function Be(e, t) {
  Ke.off(e, t);
}
var We = "loginStateChanged",
  He = "loginStateExpire",
  Je = "loginTypeChanged",
  ze = "anonymousConverted",
  Ve = "refreshAccessToken";
var Ge;
!function (e) {
  e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";
}(Ge || (Ge = {}));
var Qe = /*#__PURE__*/function () {
  function Qe() {
    (0, _classCallCheck2.default)(this, Qe);
    this._fnPromiseMap = new Map();
  }
  (0, _createClass2.default)(Qe, [{
    key: "run",
    value: function () {
      var _run = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(e, t) {
        var _this9 = this;
        var n;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                n = this._fnPromiseMap.get(e);
                return _context5.abrupt("return", (n || (n = new Promise( /*#__PURE__*/function () {
                  var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(n, s) {
                    var _s8;
                    return _regenerator.default.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.prev = 0;
                            _context4.next = 3;
                            return _this9._runIdlePromise();
                          case 3:
                            _s8 = t();
                            _context4.t0 = n;
                            _context4.next = 7;
                            return _s8;
                          case 7:
                            _context4.t1 = _context4.sent;
                            (0, _context4.t0)(_context4.t1);
                            _context4.next = 14;
                            break;
                          case 11:
                            _context4.prev = 11;
                            _context4.t2 = _context4["catch"](0);
                            s(_context4.t2);
                          case 14:
                            _context4.prev = 14;
                            _this9._fnPromiseMap.delete(e);
                            return _context4.finish(14);
                          case 17:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4, null, [[0, 11, 14, 17]]);
                  }));
                  return function (_x4, _x5) {
                    return _ref7.apply(this, arguments);
                  };
                }()), this._fnPromiseMap.set(e, n)), n));
              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function run(_x2, _x3) {
        return _run.apply(this, arguments);
      }
      return run;
    }()
  }, {
    key: "_runIdlePromise",
    value: function _runIdlePromise() {
      return Promise.resolve();
    }
  }]);
  return Qe;
}();
var Ye = /*#__PURE__*/function () {
  function Ye(e) {
    (0, _classCallCheck2.default)(this, Ye);
    this._singlePromise = new Qe(), this._cache = Me(e.env), this._baseURL = "https://".concat(e.env, ".ap-shanghai.tcb-api.tencentcloudapi.com"), this._reqClass = new Ee.adapter.reqClass({
      timeout: e.timeout,
      timeoutMsg: "\u8BF7\u6C42\u5728".concat(e.timeout / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"),
      restrictedMethods: ["post"]
    });
  }
  (0, _createClass2.default)(Ye, [{
    key: "_getDeviceId",
    value: function _getDeviceId() {
      if (this._deviceID) return this._deviceID;
      var e = this._cache.keys.deviceIdKey;
      var t = this._cache.getStore(e);
      return "string" == typeof t && t.length >= 16 && t.length <= 48 || (t = Ce(), this._cache.setStore(e, t)), this._deviceID = t, t;
    }
  }, {
    key: "_request",
    value: function () {
      var _request2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(e, t) {
        var n,
          s,
          _e9,
          _t7,
          _n7,
          _args6 = arguments;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                n = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
                s = {
                  "x-request-id": Ce(),
                  "x-device-id": this._getDeviceId()
                };
                if (!n.withAccessToken) {
                  _context6.next = 9;
                  break;
                }
                _e9 = this._cache.keys.tokenTypeKey;
                _context6.next = 6;
                return this.getAccessToken();
              case 6:
                _t7 = _context6.sent;
                _n7 = this._cache.getStore(_e9);
                s.authorization = "".concat(_n7, " ").concat(_t7);
              case 9:
                return _context6.abrupt("return", this._reqClass["get" === n.method ? "get" : "post"]({
                  url: "".concat(this._baseURL).concat(e),
                  data: t,
                  headers: s
                }));
              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function _request(_x6, _x7) {
        return _request2.apply(this, arguments);
      }
      return _request;
    }()
  }, {
    key: "_fetchAccessToken",
    value: function () {
      var _fetchAccessToken2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var _this10 = this;
        var _this$_cache$keys, e, t, n, s, r, i, o, a, c;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _this$_cache$keys = this._cache.keys, e = _this$_cache$keys.loginTypeKey, t = _this$_cache$keys.accessTokenKey, n = _this$_cache$keys.accessTokenExpireKey, s = _this$_cache$keys.tokenTypeKey, r = this._cache.getStore(e);
                if (!(r && r !== Ge.ANONYMOUS)) {
                  _context8.next = 3;
                  break;
                }
                throw new re({
                  code: "INVALID_OPERATION",
                  message: "非匿名登录不支持刷新 access token"
                });
              case 3:
                _context8.next = 5;
                return this._singlePromise.run("fetchAccessToken", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
                  return _regenerator.default.wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          _context7.next = 2;
                          return _this10._request("/auth/v1/signin/anonymously", {}, {
                            method: "post"
                          });
                        case 2:
                          return _context7.abrupt("return", _context7.sent.data);
                        case 3:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                })));
              case 5:
                i = _context8.sent;
                o = i.access_token;
                a = i.expires_in;
                c = i.token_type;
                return _context8.abrupt("return", (this._cache.setStore(s, c), this._cache.setStore(t, o), this._cache.setStore(n, Date.now() + 1e3 * a), o));
              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function _fetchAccessToken() {
        return _fetchAccessToken2.apply(this, arguments);
      }
      return _fetchAccessToken;
    }()
  }, {
    key: "isAccessTokenExpired",
    value: function isAccessTokenExpired(e, t) {
      var n = !0;
      return e && t && (n = t < Date.now()), n;
    }
  }, {
    key: "getAccessToken",
    value: function () {
      var _getAccessToken = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var _this$_cache$keys2, e, t, n, s;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _this$_cache$keys2 = this._cache.keys, e = _this$_cache$keys2.accessTokenKey, t = _this$_cache$keys2.accessTokenExpireKey, n = this._cache.getStore(e), s = this._cache.getStore(t);
                return _context9.abrupt("return", this.isAccessTokenExpired(n, s) ? this._fetchAccessToken() : n);
              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
      function getAccessToken() {
        return _getAccessToken.apply(this, arguments);
      }
      return getAccessToken;
    }()
  }, {
    key: "refreshAccessToken",
    value: function () {
      var _refreshAccessToken = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var _this$_cache$keys3, e, t, n;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _this$_cache$keys3 = this._cache.keys, e = _this$_cache$keys3.accessTokenKey, t = _this$_cache$keys3.accessTokenExpireKey, n = _this$_cache$keys3.loginTypeKey;
                return _context10.abrupt("return", (this._cache.removeStore(e), this._cache.removeStore(t), this._cache.setStore(n, Ge.ANONYMOUS), this.getAccessToken()));
              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));
      function refreshAccessToken() {
        return _refreshAccessToken.apply(this, arguments);
      }
      return refreshAccessToken;
    }()
  }, {
    key: "getUserInfo",
    value: function () {
      var _getUserInfo = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
        var _this11 = this;
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                return _context12.abrupt("return", this._singlePromise.run("getUserInfo", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
                  return _regenerator.default.wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:
                          _context11.next = 2;
                          return _this11._request("/auth/v1/user/me", {}, {
                            withAccessToken: !0,
                            method: "get"
                          });
                        case 2:
                          return _context11.abrupt("return", _context11.sent.data);
                        case 3:
                        case "end":
                          return _context11.stop();
                      }
                    }
                  }, _callee11);
                }))));
              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
      function getUserInfo() {
        return _getUserInfo.apply(this, arguments);
      }
      return getUserInfo;
    }()
  }]);
  return Ye;
}();
var Xe = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"],
  Ze = {
    "X-SDK-Version": "1.3.5"
  };
function et(e, t, n) {
  var s = e[t];
  e[t] = function (t) {
    var r = {},
      i = {};
    n.forEach(function (n) {
      var _n$call = n.call(e, t),
        s = _n$call.data,
        o = _n$call.headers;
      Object.assign(r, s), Object.assign(i, o);
    });
    var o = t.data;
    return o && function () {
      var e;
      if (e = o, "[object FormData]" !== Object.prototype.toString.call(e)) t.data = _objectSpread(_objectSpread({}, o), r);else for (var _e10 in r) {
        o.append(_e10, r[_e10]);
      }
    }(), t.headers = _objectSpread(_objectSpread({}, t.headers || {}), i), s.call(e, t);
  };
}
function tt() {
  var e = Math.random().toString(16).slice(2);
  return {
    data: {
      seqId: e
    },
    headers: _objectSpread(_objectSpread({}, Ze), {}, {
      "x-seqid": e
    })
  };
}
var nt = /*#__PURE__*/function () {
  function nt() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, nt);
    var t;
    this.config = e, this._reqClass = new Ee.adapter.reqClass({
      timeout: this.config.timeout,
      timeoutMsg: "\u8BF7\u6C42\u5728".concat(this.config.timeout / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"),
      restrictedMethods: ["post"]
    }), this._cache = Me(this.config.env), this._localCache = (t = this.config.env, De[t]), this.oauth = new Ye(this.config), et(this._reqClass, "post", [tt]), et(this._reqClass, "upload", [tt]), et(this._reqClass, "download", [tt]);
  }
  (0, _createClass2.default)(nt, [{
    key: "post",
    value: function () {
      var _post = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13(e) {
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this._reqClass.post(e);
              case 2:
                return _context13.abrupt("return", _context13.sent);
              case 3:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));
      function post(_x8) {
        return _post.apply(this, arguments);
      }
      return post;
    }()
  }, {
    key: "upload",
    value: function () {
      var _upload = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14(e) {
        return _regenerator.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return this._reqClass.upload(e);
              case 2:
                return _context14.abrupt("return", _context14.sent);
              case 3:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));
      function upload(_x9) {
        return _upload.apply(this, arguments);
      }
      return upload;
    }()
  }, {
    key: "download",
    value: function () {
      var _download = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee15(e) {
        return _regenerator.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return this._reqClass.download(e);
              case 2:
                return _context15.abrupt("return", _context15.sent);
              case 3:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));
      function download(_x10) {
        return _download.apply(this, arguments);
      }
      return download;
    }()
  }, {
    key: "refreshAccessToken",
    value: function () {
      var _refreshAccessToken2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee16() {
        var e, t;
        return _regenerator.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
                _context16.prev = 1;
                _context16.next = 4;
                return this._refreshAccessTokenPromise;
              case 4:
                e = _context16.sent;
                _context16.next = 10;
                break;
              case 7:
                _context16.prev = 7;
                _context16.t0 = _context16["catch"](1);
                t = _context16.t0;
              case 10:
                if (!(this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t)) {
                  _context16.next = 12;
                  break;
                }
                throw t;
              case 12:
                return _context16.abrupt("return", e);
              case 13:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this, [[1, 7]]);
      }));
      function refreshAccessToken() {
        return _refreshAccessToken2.apply(this, arguments);
      }
      return refreshAccessToken;
    }()
  }, {
    key: "_refreshAccessToken",
    value: function () {
      var _refreshAccessToken3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee17() {
        var _this$_cache$keys4, e, t, n, s, r, i, o, a, _e11, _e12, _t8, _s9;
        return _regenerator.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _this$_cache$keys4 = this._cache.keys, e = _this$_cache$keys4.accessTokenKey, t = _this$_cache$keys4.accessTokenExpireKey, n = _this$_cache$keys4.refreshTokenKey, s = _this$_cache$keys4.loginTypeKey, r = _this$_cache$keys4.anonymousUuidKey;
                this._cache.removeStore(e), this._cache.removeStore(t);
                i = this._cache.getStore(n);
                if (i) {
                  _context17.next = 5;
                  break;
                }
                throw new re({
                  message: "未登录CloudBase"
                });
              case 5:
                o = {
                  refresh_token: i
                };
                _context17.next = 8;
                return this.request("auth.fetchAccessTokenWithRefreshToken", o);
              case 8:
                a = _context17.sent;
                if (!a.data.code) {
                  _context17.next = 21;
                  break;
                }
                _e11 = a.data.code;
                if (!("SIGN_PARAM_INVALID" === _e11 || "REFRESH_TOKEN_EXPIRED" === _e11 || "INVALID_REFRESH_TOKEN" === _e11)) {
                  _context17.next = 20;
                  break;
                }
                if (!(this._cache.getStore(s) === Ge.ANONYMOUS && "INVALID_REFRESH_TOKEN" === _e11)) {
                  _context17.next = 19;
                  break;
                }
                _e12 = this._cache.getStore(r);
                _t8 = this._cache.getStore(n);
                _context17.next = 17;
                return this.send("auth.signInAnonymously", {
                  anonymous_uuid: _e12,
                  refresh_token: _t8
                });
              case 17:
                _s9 = _context17.sent;
                return _context17.abrupt("return", (this.setRefreshToken(_s9.refresh_token), this._refreshAccessToken()));
              case 19:
                $e(He), this._cache.removeStore(n);
              case 20:
                throw new re({
                  code: a.data.code,
                  message: "\u5237\u65B0access token\u5931\u8D25\uFF1A".concat(a.data.code)
                });
              case 21:
                if (!a.data.access_token) {
                  _context17.next = 23;
                  break;
                }
                return _context17.abrupt("return", ($e(Ve), this._cache.setStore(e, a.data.access_token), this._cache.setStore(t, a.data.access_token_expire + Date.now()), {
                  accessToken: a.data.access_token,
                  accessTokenExpire: a.data.access_token_expire
                }));
              case 23:
                a.data.refresh_token && (this._cache.removeStore(n), this._cache.setStore(n, a.data.refresh_token), this._refreshAccessToken());
              case 24:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));
      function _refreshAccessToken() {
        return _refreshAccessToken3.apply(this, arguments);
      }
      return _refreshAccessToken;
    }()
  }, {
    key: "getAccessToken",
    value: function () {
      var _getAccessToken2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee18() {
        var _this$_cache$keys5, e, t, n, s, r, i;
        return _regenerator.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _this$_cache$keys5 = this._cache.keys, e = _this$_cache$keys5.accessTokenKey, t = _this$_cache$keys5.accessTokenExpireKey, n = _this$_cache$keys5.refreshTokenKey;
                if (this._cache.getStore(n)) {
                  _context18.next = 3;
                  break;
                }
                throw new re({
                  message: "refresh token不存在，登录状态异常"
                });
              case 3:
                s = this._cache.getStore(e), r = this._cache.getStore(t), i = !0;
                _context18.t0 = this._shouldRefreshAccessTokenHook;
                if (!_context18.t0) {
                  _context18.next = 9;
                  break;
                }
                _context18.next = 8;
                return this._shouldRefreshAccessTokenHook(s, r);
              case 8:
                _context18.t0 = !_context18.sent;
              case 9:
                _context18.t1 = _context18.t0;
                if (!_context18.t1) {
                  _context18.next = 12;
                  break;
                }
                i = !1;
              case 12:
                return _context18.abrupt("return", (!s || !r || r < Date.now()) && i ? this.refreshAccessToken() : {
                  accessToken: s,
                  accessTokenExpire: r
                });
              case 13:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));
      function getAccessToken() {
        return _getAccessToken2.apply(this, arguments);
      }
      return getAccessToken;
    }()
  }, {
    key: "request",
    value: function () {
      var _request3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee19(e, t, n) {
        var s, r, i, o, _e13, _e14, a, c, u, l, h, d, p, f, g;
        return _regenerator.default.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                s = "x-tcb-trace_".concat(this.config.env);
                r = "application/x-www-form-urlencoded";
                i = _objectSpread({
                  action: e,
                  env: this.config.env,
                  dataVersion: "2019-08-16"
                }, t);
                _context19.t0 = -1 === Xe.indexOf(e);
                if (!_context19.t0) {
                  _context19.next = 9;
                  break;
                }
                this._cache.keys;
                _context19.next = 8;
                return this.oauth.getAccessToken();
              case 8:
                i.access_token = _context19.sent;
              case 9:
                if (!("storage.uploadFile" === e)) {
                  _context19.next = 15;
                  break;
                }
                o = new FormData();
                for (_e13 in o) {
                  o.hasOwnProperty(_e13) && void 0 !== o[_e13] && o.append(_e13, i[_e13]);
                }
                r = "multipart/form-data";
                _context19.next = 17;
                break;
              case 15:
                r = "application/json", o = {};
                for (_e14 in i) {
                  void 0 !== i[_e14] && (o[_e14] = i[_e14]);
                }
              case 17:
                a = {
                  headers: {
                    "content-type": r
                  }
                };
                n && n.timeout && (a.timeout = n.timeout), n && n.onUploadProgress && (a.onUploadProgress = n.onUploadProgress);
                c = this._localCache.getStore(s);
                c && (a.headers["X-TCB-Trace"] = c);
                u = t.parse, l = t.inQuery, h = t.search;
                d = {
                  env: this.config.env
                };
                u && (d.parse = !0), l && (d = _objectSpread(_objectSpread({}, l), d));
                p = function (e, t) {
                  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                  var s = /\?/.test(t);
                  var r = "";
                  for (var _e15 in n) {
                    "" === r ? !s && (t += "?") : r += "&", r += "".concat(_e15, "=").concat(encodeURIComponent(n[_e15]));
                  }
                  return /^http(s)?\:\/\//.test(t += r) ? t : "".concat(e).concat(t);
                }(ye, "//tcb-api.tencentcloudapi.com/web", d);
                h && (p += h);
                _context19.next = 28;
                return this.post(_objectSpread({
                  url: p,
                  data: o
                }, a));
              case 28:
                f = _context19.sent;
                g = f.header && f.header["x-tcb-trace"];
                if (!(g && this._localCache.setStore(s, g), 200 !== Number(f.status) && 200 !== Number(f.statusCode) || !f.data)) {
                  _context19.next = 32;
                  break;
                }
                throw new re({
                  code: "NETWORK_ERROR",
                  message: "network request error"
                });
              case 32:
                return _context19.abrupt("return", f);
              case 33:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));
      function request(_x11, _x12, _x13) {
        return _request3.apply(this, arguments);
      }
      return request;
    }()
  }, {
    key: "send",
    value: function () {
      var _send = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee20(e) {
        var t,
          n,
          s,
          _s10,
          _args20 = arguments;
        return _regenerator.default.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                t = _args20.length > 1 && _args20[1] !== undefined ? _args20[1] : {};
                n = _args20.length > 2 && _args20[2] !== undefined ? _args20[2] : {};
                _context20.next = 4;
                return this.request(e, t, _objectSpread(_objectSpread({}, n), {}, {
                  onUploadProgress: t.onUploadProgress
                }));
              case 4:
                s = _context20.sent;
                if (!(("ACCESS_TOKEN_DISABLED" === s.data.code || "ACCESS_TOKEN_EXPIRED" === s.data.code) && -1 === Xe.indexOf(e))) {
                  _context20.next = 14;
                  break;
                }
                _context20.next = 8;
                return this.oauth.refreshAccessToken();
              case 8:
                _context20.next = 10;
                return this.request(e, t, _objectSpread(_objectSpread({}, n), {}, {
                  onUploadProgress: t.onUploadProgress
                }));
              case 10:
                _s10 = _context20.sent;
                if (!_s10.data.code) {
                  _context20.next = 13;
                  break;
                }
                throw new re({
                  code: _s10.data.code,
                  message: Te(_s10.data.message)
                });
              case 13:
                return _context20.abrupt("return", _s10.data);
              case 14:
                if (!s.data.code) {
                  _context20.next = 16;
                  break;
                }
                throw new re({
                  code: s.data.code,
                  message: Te(s.data.message)
                });
              case 16:
                return _context20.abrupt("return", s.data);
              case 17:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));
      function send(_x14) {
        return _send.apply(this, arguments);
      }
      return send;
    }()
  }, {
    key: "setRefreshToken",
    value: function setRefreshToken(e) {
      var _this$_cache$keys6 = this._cache.keys,
        t = _this$_cache$keys6.accessTokenKey,
        n = _this$_cache$keys6.accessTokenExpireKey,
        s = _this$_cache$keys6.refreshTokenKey;
      this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);
    }
  }]);
  return nt;
}();
var st = {};
function rt(e) {
  return st[e];
}
var it = /*#__PURE__*/function () {
  function it(e) {
    (0, _classCallCheck2.default)(this, it);
    this.config = e, this._cache = Me(e.env), this._request = rt(e.env);
  }
  (0, _createClass2.default)(it, [{
    key: "setRefreshToken",
    value: function setRefreshToken(e) {
      var _this$_cache$keys7 = this._cache.keys,
        t = _this$_cache$keys7.accessTokenKey,
        n = _this$_cache$keys7.accessTokenExpireKey,
        s = _this$_cache$keys7.refreshTokenKey;
      this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);
    }
  }, {
    key: "setAccessToken",
    value: function setAccessToken(e, t) {
      var _this$_cache$keys8 = this._cache.keys,
        n = _this$_cache$keys8.accessTokenKey,
        s = _this$_cache$keys8.accessTokenExpireKey;
      this._cache.setStore(n, e), this._cache.setStore(s, t);
    }
  }, {
    key: "refreshUserInfo",
    value: function () {
      var _refreshUserInfo = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee21() {
        var _yield$this$_request$, e;
        return _regenerator.default.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return this._request.send("auth.getUserInfo", {});
              case 2:
                _yield$this$_request$ = _context21.sent;
                e = _yield$this$_request$.data;
                return _context21.abrupt("return", (this.setLocalUserInfo(e), e));
              case 5:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));
      function refreshUserInfo() {
        return _refreshUserInfo.apply(this, arguments);
      }
      return refreshUserInfo;
    }()
  }, {
    key: "setLocalUserInfo",
    value: function setLocalUserInfo(e) {
      var t = this._cache.keys.userInfoKey;
      this._cache.setStore(t, e);
    }
  }]);
  return it;
}();
var ot = /*#__PURE__*/function () {
  function ot(e) {
    (0, _classCallCheck2.default)(this, ot);
    if (!e) throw new re({
      code: "PARAM_ERROR",
      message: "envId is not defined"
    });
    this._envId = e, this._cache = Me(this._envId), this._request = rt(this._envId), this.setUserInfo();
  }
  (0, _createClass2.default)(ot, [{
    key: "linkWithTicket",
    value: function linkWithTicket(e) {
      if ("string" != typeof e) throw new re({
        code: "PARAM_ERROR",
        message: "ticket must be string"
      });
      return this._request.send("auth.linkWithTicket", {
        ticket: e
      });
    }
  }, {
    key: "linkWithRedirect",
    value: function linkWithRedirect(e) {
      e.signInWithRedirect();
    }
  }, {
    key: "updatePassword",
    value: function updatePassword(e, t) {
      return this._request.send("auth.updatePassword", {
        oldPassword: t,
        newPassword: e
      });
    }
  }, {
    key: "updateEmail",
    value: function updateEmail(e) {
      return this._request.send("auth.updateEmail", {
        newEmail: e
      });
    }
  }, {
    key: "updateUsername",
    value: function updateUsername(e) {
      if ("string" != typeof e) throw new re({
        code: "PARAM_ERROR",
        message: "username must be a string"
      });
      return this._request.send("auth.updateUsername", {
        username: e
      });
    }
  }, {
    key: "getLinkedUidList",
    value: function () {
      var _getLinkedUidList = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee22() {
        var _yield$this$_request$2, e, t, n;
        return _regenerator.default.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return this._request.send("auth.getLinkedUidList", {});
              case 2:
                _yield$this$_request$2 = _context22.sent;
                e = _yield$this$_request$2.data;
                t = !1;
                n = e.users;
                return _context22.abrupt("return", (n.forEach(function (e) {
                  e.wxOpenId && e.wxPublicId && (t = !0);
                }), {
                  users: n,
                  hasPrimaryUid: t
                }));
              case 7:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));
      function getLinkedUidList() {
        return _getLinkedUidList.apply(this, arguments);
      }
      return getLinkedUidList;
    }()
  }, {
    key: "setPrimaryUid",
    value: function setPrimaryUid(e) {
      return this._request.send("auth.setPrimaryUid", {
        uid: e
      });
    }
  }, {
    key: "unlink",
    value: function unlink(e) {
      return this._request.send("auth.unlink", {
        platform: e
      });
    }
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee23(e) {
        var t, n, s, r, i, o, _yield$this$_request$3, a;
        return _regenerator.default.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                t = e.nickName;
                n = e.gender;
                s = e.avatarUrl;
                r = e.province;
                i = e.country;
                o = e.city;
                _context23.next = 8;
                return this._request.send("auth.updateUserInfo", {
                  nickName: t,
                  gender: n,
                  avatarUrl: s,
                  province: r,
                  country: i,
                  city: o
                });
              case 8:
                _yield$this$_request$3 = _context23.sent;
                a = _yield$this$_request$3.data;
                this.setLocalUserInfo(a);
              case 11:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));
      function update(_x15) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }, {
    key: "refresh",
    value: function () {
      var _refresh = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee24() {
        var e;
        return _regenerator.default.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.next = 2;
                return this._request.oauth.getUserInfo();
              case 2:
                e = _context24.sent;
                return _context24.abrupt("return", (this.setLocalUserInfo(e), e));
              case 4:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));
      function refresh() {
        return _refresh.apply(this, arguments);
      }
      return refresh;
    }()
  }, {
    key: "setUserInfo",
    value: function setUserInfo() {
      var _this12 = this;
      var e = this._cache.keys.userInfoKey,
        t = this._cache.getStore(e);
      ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach(function (e) {
        _this12[e] = t[e];
      }), this.location = {
        country: t.country,
        province: t.province,
        city: t.city
      };
    }
  }, {
    key: "setLocalUserInfo",
    value: function setLocalUserInfo(e) {
      var t = this._cache.keys.userInfoKey;
      this._cache.setStore(t, e), this.setUserInfo();
    }
  }]);
  return ot;
}();
var at = /*#__PURE__*/function () {
  function at(e) {
    (0, _classCallCheck2.default)(this, at);
    if (!e) throw new re({
      code: "PARAM_ERROR",
      message: "envId is not defined"
    });
    this._cache = Me(e);
    var _this$_cache$keys9 = this._cache.keys,
      t = _this$_cache$keys9.refreshTokenKey,
      n = _this$_cache$keys9.accessTokenKey,
      s = _this$_cache$keys9.accessTokenExpireKey,
      r = this._cache.getStore(t),
      i = this._cache.getStore(n),
      o = this._cache.getStore(s);
    this.credential = {
      refreshToken: r,
      accessToken: i,
      accessTokenExpire: o
    }, this.user = new ot(e);
  }
  (0, _createClass2.default)(at, [{
    key: "isAnonymousAuth",
    get: function get() {
      return this.loginType === Ge.ANONYMOUS;
    }
  }, {
    key: "isCustomAuth",
    get: function get() {
      return this.loginType === Ge.CUSTOM;
    }
  }, {
    key: "isWeixinAuth",
    get: function get() {
      return this.loginType === Ge.WECHAT || this.loginType === Ge.WECHAT_OPEN || this.loginType === Ge.WECHAT_PUBLIC;
    }
  }, {
    key: "loginType",
    get: function get() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
  }]);
  return at;
}();
var ct = /*#__PURE__*/function (_it) {
  (0, _inherits2.default)(ct, _it);
  var _super4 = _createSuper(ct);
  function ct() {
    (0, _classCallCheck2.default)(this, ct);
    return _super4.apply(this, arguments);
  }
  (0, _createClass2.default)(ct, [{
    key: "signIn",
    value: function () {
      var _signIn = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee25() {
        var e;
        return _regenerator.default.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                this._cache.updatePersistence("local");
                _context25.next = 3;
                return this._request.oauth.getAccessToken();
              case 3:
                $e(We);
                $e(Je, {
                  env: this.config.env,
                  loginType: Ge.ANONYMOUS,
                  persistence: "local"
                });
                e = new at(this.config.env);
                _context25.next = 8;
                return e.user.refresh();
              case 8:
                return _context25.abrupt("return", e);
              case 9:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));
      function signIn() {
        return _signIn.apply(this, arguments);
      }
      return signIn;
    }()
  }, {
    key: "linkAndRetrieveDataWithTicket",
    value: function () {
      var _linkAndRetrieveDataWithTicket = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee26(e) {
        var _this$_cache$keys10, t, n, s, r, i;
        return _regenerator.default.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _this$_cache$keys10 = this._cache.keys;
                t = _this$_cache$keys10.anonymousUuidKey;
                n = _this$_cache$keys10.refreshTokenKey;
                s = this._cache.getStore(t);
                r = this._cache.getStore(n);
                _context26.next = 7;
                return this._request.send("auth.linkAndRetrieveDataWithTicket", {
                  anonymous_uuid: s,
                  refresh_token: r,
                  ticket: e
                });
              case 7:
                i = _context26.sent;
                if (!i.refresh_token) {
                  _context26.next = 16;
                  break;
                }
                this._clearAnonymousUUID();
                this.setRefreshToken(i.refresh_token);
                _context26.next = 13;
                return this._request.refreshAccessToken();
              case 13:
                $e(ze, {
                  env: this.config.env
                });
                $e(Je, {
                  loginType: Ge.CUSTOM,
                  persistence: "local"
                });
                return _context26.abrupt("return", {
                  credential: {
                    refreshToken: i.refresh_token
                  }
                });
              case 16:
                throw new re({
                  message: "匿名转化失败"
                });
              case 17:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));
      function linkAndRetrieveDataWithTicket(_x16) {
        return _linkAndRetrieveDataWithTicket.apply(this, arguments);
      }
      return linkAndRetrieveDataWithTicket;
    }()
  }, {
    key: "_setAnonymousUUID",
    value: function _setAnonymousUUID(e) {
      var _this$_cache$keys11 = this._cache.keys,
        t = _this$_cache$keys11.anonymousUuidKey,
        n = _this$_cache$keys11.loginTypeKey;
      this._cache.removeStore(t), this._cache.setStore(t, e), this._cache.setStore(n, Ge.ANONYMOUS);
    }
  }, {
    key: "_clearAnonymousUUID",
    value: function _clearAnonymousUUID() {
      this._cache.removeStore(this._cache.keys.anonymousUuidKey);
    }
  }]);
  return ct;
}(it);
var ut = /*#__PURE__*/function (_it2) {
  (0, _inherits2.default)(ut, _it2);
  var _super5 = _createSuper(ut);
  function ut() {
    (0, _classCallCheck2.default)(this, ut);
    return _super5.apply(this, arguments);
  }
  (0, _createClass2.default)(ut, [{
    key: "signIn",
    value: function () {
      var _signIn2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee27(e) {
        var t, n;
        return _regenerator.default.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                if (!("string" != typeof e)) {
                  _context27.next = 2;
                  break;
                }
                throw new re({
                  code: "PARAM_ERROR",
                  message: "ticket must be a string"
                });
              case 2:
                t = this._cache.keys.refreshTokenKey;
                _context27.next = 5;
                return this._request.send("auth.signInWithTicket", {
                  ticket: e,
                  refresh_token: this._cache.getStore(t) || ""
                });
              case 5:
                n = _context27.sent;
                if (!n.refresh_token) {
                  _context27.next = 15;
                  break;
                }
                this.setRefreshToken(n.refresh_token);
                _context27.next = 10;
                return this._request.refreshAccessToken();
              case 10:
                $e(We);
                $e(Je, {
                  env: this.config.env,
                  loginType: Ge.CUSTOM,
                  persistence: this.config.persistence
                });
                _context27.next = 14;
                return this.refreshUserInfo();
              case 14:
                return _context27.abrupt("return", new at(this.config.env));
              case 15:
                throw new re({
                  message: "自定义登录失败"
                });
              case 16:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));
      function signIn(_x17) {
        return _signIn2.apply(this, arguments);
      }
      return signIn;
    }()
  }]);
  return ut;
}(it);
var lt = /*#__PURE__*/function (_it3) {
  (0, _inherits2.default)(lt, _it3);
  var _super6 = _createSuper(lt);
  function lt() {
    (0, _classCallCheck2.default)(this, lt);
    return _super6.apply(this, arguments);
  }
  (0, _createClass2.default)(lt, [{
    key: "signIn",
    value: function () {
      var _signIn3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee28(e, t) {
        var n, s, r, i, o;
        return _regenerator.default.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                if (!("string" != typeof e)) {
                  _context28.next = 2;
                  break;
                }
                throw new re({
                  code: "PARAM_ERROR",
                  message: "email must be a string"
                });
              case 2:
                n = this._cache.keys.refreshTokenKey;
                _context28.next = 5;
                return this._request.send("auth.signIn", {
                  loginType: "EMAIL",
                  email: e,
                  password: t,
                  refresh_token: this._cache.getStore(n) || ""
                });
              case 5:
                s = _context28.sent;
                r = s.refresh_token;
                i = s.access_token;
                o = s.access_token_expire;
                if (!r) {
                  _context28.next = 22;
                  break;
                }
                this.setRefreshToken(r);
                if (!(i && o)) {
                  _context28.next = 15;
                  break;
                }
                this.setAccessToken(i, o);
                _context28.next = 17;
                break;
              case 15:
                _context28.next = 17;
                return this._request.refreshAccessToken();
              case 17:
                _context28.next = 19;
                return this.refreshUserInfo();
              case 19:
                $e(We);
                $e(Je, {
                  env: this.config.env,
                  loginType: Ge.EMAIL,
                  persistence: this.config.persistence
                });
                return _context28.abrupt("return", new at(this.config.env));
              case 22:
                throw s.code ? new re({
                  code: s.code,
                  message: "\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: ".concat(s.message)
                }) : new re({
                  message: "邮箱登录失败"
                });
              case 23:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));
      function signIn(_x18, _x19) {
        return _signIn3.apply(this, arguments);
      }
      return signIn;
    }()
  }, {
    key: "activate",
    value: function () {
      var _activate = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee29(e) {
        return _regenerator.default.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                return _context29.abrupt("return", this._request.send("auth.activateEndUserMail", {
                  token: e
                }));
              case 1:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this);
      }));
      function activate(_x20) {
        return _activate.apply(this, arguments);
      }
      return activate;
    }()
  }, {
    key: "resetPasswordWithToken",
    value: function () {
      var _resetPasswordWithToken = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee30(e, t) {
        return _regenerator.default.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                return _context30.abrupt("return", this._request.send("auth.resetPasswordWithToken", {
                  token: e,
                  newPassword: t
                }));
              case 1:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this);
      }));
      function resetPasswordWithToken(_x21, _x22) {
        return _resetPasswordWithToken.apply(this, arguments);
      }
      return resetPasswordWithToken;
    }()
  }]);
  return lt;
}(it);
var ht = /*#__PURE__*/function (_it4) {
  (0, _inherits2.default)(ht, _it4);
  var _super7 = _createSuper(ht);
  function ht() {
    (0, _classCallCheck2.default)(this, ht);
    return _super7.apply(this, arguments);
  }
  (0, _createClass2.default)(ht, [{
    key: "signIn",
    value: function () {
      var _signIn4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee31(e, t) {
        var n, s, r, i, o;
        return _regenerator.default.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                if (!("string" != typeof e)) {
                  _context31.next = 2;
                  break;
                }
                throw new re({
                  code: "PARAM_ERROR",
                  message: "username must be a string"
                });
              case 2:
                "string" != typeof t && (t = "", console.warn("password is empty"));
                n = this._cache.keys.refreshTokenKey;
                _context31.next = 6;
                return this._request.send("auth.signIn", {
                  loginType: Ge.USERNAME,
                  username: e,
                  password: t,
                  refresh_token: this._cache.getStore(n) || ""
                });
              case 6:
                s = _context31.sent;
                r = s.refresh_token;
                i = s.access_token_expire;
                o = s.access_token;
                if (!r) {
                  _context31.next = 23;
                  break;
                }
                this.setRefreshToken(r);
                if (!(o && i)) {
                  _context31.next = 16;
                  break;
                }
                this.setAccessToken(o, i);
                _context31.next = 18;
                break;
              case 16:
                _context31.next = 18;
                return this._request.refreshAccessToken();
              case 18:
                _context31.next = 20;
                return this.refreshUserInfo();
              case 20:
                $e(We);
                $e(Je, {
                  env: this.config.env,
                  loginType: Ge.USERNAME,
                  persistence: this.config.persistence
                });
                return _context31.abrupt("return", new at(this.config.env));
              case 23:
                throw s.code ? new re({
                  code: s.code,
                  message: "\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: ".concat(s.message)
                }) : new re({
                  message: "用户名密码登录失败"
                });
              case 24:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this);
      }));
      function signIn(_x23, _x24) {
        return _signIn4.apply(this, arguments);
      }
      return signIn;
    }()
  }]);
  return ht;
}(it);
var dt = /*#__PURE__*/function () {
  function dt(e) {
    (0, _classCallCheck2.default)(this, dt);
    this.config = e, this._cache = Me(e.env), this._request = rt(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), je(Je, this._onLoginTypeChanged);
  }
  (0, _createClass2.default)(dt, [{
    key: "currentUser",
    get: function get() {
      var e = this.hasLoginState();
      return e && e.user || null;
    }
  }, {
    key: "loginType",
    get: function get() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
  }, {
    key: "anonymousAuthProvider",
    value: function anonymousAuthProvider() {
      return new ct(this.config);
    }
  }, {
    key: "customAuthProvider",
    value: function customAuthProvider() {
      return new ut(this.config);
    }
  }, {
    key: "emailAuthProvider",
    value: function emailAuthProvider() {
      return new lt(this.config);
    }
  }, {
    key: "usernameAuthProvider",
    value: function usernameAuthProvider() {
      return new ht(this.config);
    }
  }, {
    key: "signInAnonymously",
    value: function () {
      var _signInAnonymously = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee32() {
        return _regenerator.default.wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                return _context32.abrupt("return", new ct(this.config).signIn());
              case 1:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, this);
      }));
      function signInAnonymously() {
        return _signInAnonymously.apply(this, arguments);
      }
      return signInAnonymously;
    }()
  }, {
    key: "signInWithEmailAndPassword",
    value: function () {
      var _signInWithEmailAndPassword = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee33(e, t) {
        return _regenerator.default.wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                return _context33.abrupt("return", new lt(this.config).signIn(e, t));
              case 1:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, this);
      }));
      function signInWithEmailAndPassword(_x25, _x26) {
        return _signInWithEmailAndPassword.apply(this, arguments);
      }
      return signInWithEmailAndPassword;
    }()
  }, {
    key: "signInWithUsernameAndPassword",
    value: function signInWithUsernameAndPassword(e, t) {
      return new ht(this.config).signIn(e, t);
    }
  }, {
    key: "linkAndRetrieveDataWithTicket",
    value: function () {
      var _linkAndRetrieveDataWithTicket2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee34(e) {
        return _regenerator.default.wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                this._anonymousAuthProvider || (this._anonymousAuthProvider = new ct(this.config)), je(ze, this._onAnonymousConverted);
                _context34.next = 3;
                return this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);
              case 3:
                return _context34.abrupt("return", _context34.sent);
              case 4:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34, this);
      }));
      function linkAndRetrieveDataWithTicket(_x27) {
        return _linkAndRetrieveDataWithTicket2.apply(this, arguments);
      }
      return linkAndRetrieveDataWithTicket;
    }()
  }, {
    key: "signOut",
    value: function () {
      var _signOut = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee35() {
        var _this$_cache$keys12, e, t, n, s, r;
        return _regenerator.default.wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                if (!(this.loginType === Ge.ANONYMOUS)) {
                  _context35.next = 2;
                  break;
                }
                throw new re({
                  message: "匿名用户不支持登出操作"
                });
              case 2:
                _this$_cache$keys12 = this._cache.keys, e = _this$_cache$keys12.refreshTokenKey, t = _this$_cache$keys12.accessTokenKey, n = _this$_cache$keys12.accessTokenExpireKey, s = this._cache.getStore(e);
                if (s) {
                  _context35.next = 5;
                  break;
                }
                return _context35.abrupt("return");
              case 5:
                _context35.next = 7;
                return this._request.send("auth.logout", {
                  refresh_token: s
                });
              case 7:
                r = _context35.sent;
                return _context35.abrupt("return", (this._cache.removeStore(e), this._cache.removeStore(t), this._cache.removeStore(n), $e(We), $e(Je, {
                  env: this.config.env,
                  loginType: Ge.NULL,
                  persistence: this.config.persistence
                }), r));
              case 9:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, this);
      }));
      function signOut() {
        return _signOut.apply(this, arguments);
      }
      return signOut;
    }()
  }, {
    key: "signUpWithEmailAndPassword",
    value: function () {
      var _signUpWithEmailAndPassword = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee36(e, t) {
        return _regenerator.default.wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                return _context36.abrupt("return", this._request.send("auth.signUpWithEmailAndPassword", {
                  email: e,
                  password: t
                }));
              case 1:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36, this);
      }));
      function signUpWithEmailAndPassword(_x28, _x29) {
        return _signUpWithEmailAndPassword.apply(this, arguments);
      }
      return signUpWithEmailAndPassword;
    }()
  }, {
    key: "sendPasswordResetEmail",
    value: function () {
      var _sendPasswordResetEmail = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee37(e) {
        return _regenerator.default.wrap(function _callee37$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                return _context37.abrupt("return", this._request.send("auth.sendPasswordResetEmail", {
                  email: e
                }));
              case 1:
              case "end":
                return _context37.stop();
            }
          }
        }, _callee37, this);
      }));
      function sendPasswordResetEmail(_x30) {
        return _sendPasswordResetEmail.apply(this, arguments);
      }
      return sendPasswordResetEmail;
    }()
  }, {
    key: "onLoginStateChanged",
    value: function onLoginStateChanged(e) {
      var _this13 = this;
      je(We, function () {
        var t = _this13.hasLoginState();
        e.call(_this13, t);
      });
      var t = this.hasLoginState();
      e.call(this, t);
    }
  }, {
    key: "onLoginStateExpired",
    value: function onLoginStateExpired(e) {
      je(He, e.bind(this));
    }
  }, {
    key: "onAccessTokenRefreshed",
    value: function onAccessTokenRefreshed(e) {
      je(Ve, e.bind(this));
    }
  }, {
    key: "onAnonymousConverted",
    value: function onAnonymousConverted(e) {
      je(ze, e.bind(this));
    }
  }, {
    key: "onLoginTypeChanged",
    value: function onLoginTypeChanged(e) {
      var _this14 = this;
      je(Je, function () {
        var t = _this14.hasLoginState();
        e.call(_this14, t);
      });
    }
  }, {
    key: "getAccessToken",
    value: function () {
      var _getAccessToken3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee38() {
        return _regenerator.default.wrap(function _callee38$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                _context38.next = 2;
                return this._request.getAccessToken();
              case 2:
                _context38.t0 = _context38.sent.accessToken;
                _context38.t1 = this.config.env;
                return _context38.abrupt("return", {
                  accessToken: _context38.t0,
                  env: _context38.t1
                });
              case 5:
              case "end":
                return _context38.stop();
            }
          }
        }, _callee38, this);
      }));
      function getAccessToken() {
        return _getAccessToken3.apply(this, arguments);
      }
      return getAccessToken;
    }()
  }, {
    key: "hasLoginState",
    value: function hasLoginState() {
      var _this$_cache$keys13 = this._cache.keys,
        e = _this$_cache$keys13.accessTokenKey,
        t = _this$_cache$keys13.accessTokenExpireKey,
        n = this._cache.getStore(e),
        s = this._cache.getStore(t);
      return this._request.oauth.isAccessTokenExpired(n, s) ? null : new at(this.config.env);
    }
  }, {
    key: "isUsernameRegistered",
    value: function () {
      var _isUsernameRegistered = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee39(e) {
        var _yield$this$_request$4, t;
        return _regenerator.default.wrap(function _callee39$(_context39) {
          while (1) {
            switch (_context39.prev = _context39.next) {
              case 0:
                if (!("string" != typeof e)) {
                  _context39.next = 2;
                  break;
                }
                throw new re({
                  code: "PARAM_ERROR",
                  message: "username must be a string"
                });
              case 2:
                _context39.next = 4;
                return this._request.send("auth.isUsernameRegistered", {
                  username: e
                });
              case 4:
                _yield$this$_request$4 = _context39.sent;
                t = _yield$this$_request$4.data;
                return _context39.abrupt("return", t && t.isRegistered);
              case 7:
              case "end":
                return _context39.stop();
            }
          }
        }, _callee39, this);
      }));
      function isUsernameRegistered(_x31) {
        return _isUsernameRegistered.apply(this, arguments);
      }
      return isUsernameRegistered;
    }()
  }, {
    key: "getLoginState",
    value: function getLoginState() {
      return Promise.resolve(this.hasLoginState());
    }
  }, {
    key: "signInWithTicket",
    value: function () {
      var _signInWithTicket = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee40(e) {
        return _regenerator.default.wrap(function _callee40$(_context40) {
          while (1) {
            switch (_context40.prev = _context40.next) {
              case 0:
                return _context40.abrupt("return", new ut(this.config).signIn(e));
              case 1:
              case "end":
                return _context40.stop();
            }
          }
        }, _callee40, this);
      }));
      function signInWithTicket(_x32) {
        return _signInWithTicket.apply(this, arguments);
      }
      return signInWithTicket;
    }()
  }, {
    key: "shouldRefreshAccessToken",
    value: function shouldRefreshAccessToken(e) {
      this._request._shouldRefreshAccessTokenHook = e.bind(this);
    }
  }, {
    key: "getUserInfo",
    value: function getUserInfo() {
      return this._request.send("auth.getUserInfo", {}).then(function (e) {
        return e.code ? e : _objectSpread(_objectSpread({}, e.data), {}, {
          requestId: e.seqId
        });
      });
    }
  }, {
    key: "getAuthHeader",
    value: function getAuthHeader() {
      var _this$_cache$keys14 = this._cache.keys,
        e = _this$_cache$keys14.refreshTokenKey,
        t = _this$_cache$keys14.accessTokenKey,
        n = this._cache.getStore(e);
      return {
        "x-cloudbase-credentials": this._cache.getStore(t) + "/@@/" + n
      };
    }
  }, {
    key: "_onAnonymousConverted",
    value: function _onAnonymousConverted(e) {
      var t = e.data.env;
      t === this.config.env && this._cache.updatePersistence(this.config.persistence);
    }
  }, {
    key: "_onLoginTypeChanged",
    value: function _onLoginTypeChanged(e) {
      var _e$data = e.data,
        t = _e$data.loginType,
        n = _e$data.persistence,
        s = _e$data.env;
      s === this.config.env && (this._cache.updatePersistence(n), this._cache.setStore(this._cache.keys.loginTypeKey, t));
    }
  }]);
  return dt;
}();
var pt = function pt(e, t) {
    t = t || be();
    var n = rt(this.config.env),
      s = e.cloudPath,
      r = e.filePath,
      i = e.onUploadProgress,
      _e$fileType = e.fileType,
      o = _e$fileType === void 0 ? "image" : _e$fileType;
    return n.send("storage.getUploadMetadata", {
      path: s
    }).then(function (e) {
      var _e$data2 = e.data,
        a = _e$data2.url,
        c = _e$data2.authorization,
        u = _e$data2.token,
        l = _e$data2.fileId,
        h = _e$data2.cosFileId,
        d = e.requestId,
        p = {
          key: s,
          signature: c,
          "x-cos-meta-fileid": h,
          success_action_status: "201",
          "x-cos-security-token": u
        };
      n.upload({
        url: a,
        data: p,
        file: r,
        name: s,
        fileType: o,
        onUploadProgress: i
      }).then(function (e) {
        201 === e.statusCode ? t(null, {
          fileID: l,
          requestId: d
        }) : t(new re({
          code: "STORAGE_REQUEST_FAIL",
          message: "STORAGE_REQUEST_FAIL: ".concat(e.data)
        }));
      }).catch(function (e) {
        t(e);
      });
    }).catch(function (e) {
      t(e);
    }), t.promise;
  },
  ft = function ft(e, t) {
    t = t || be();
    var n = rt(this.config.env),
      s = e.cloudPath;
    return n.send("storage.getUploadMetadata", {
      path: s
    }).then(function (e) {
      t(null, e);
    }).catch(function (e) {
      t(e);
    }), t.promise;
  },
  gt = function gt(_ref10, t) {
    var e = _ref10.fileList;
    if (t = t || be(), !e || !Array.isArray(e)) return {
      code: "INVALID_PARAM",
      message: "fileList必须是非空的数组"
    };
    var _iterator3 = _createForOfIteratorHelper(e),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _t9 = _step3.value;
        if (!_t9 || "string" != typeof _t9) return {
          code: "INVALID_PARAM",
          message: "fileList的元素必须是非空的字符串"
        };
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    var n = {
      fileid_list: e
    };
    return rt(this.config.env).send("storage.batchDeleteFile", n).then(function (e) {
      e.code ? t(null, e) : t(null, {
        fileList: e.data.delete_list,
        requestId: e.requestId
      });
    }).catch(function (e) {
      t(e);
    }), t.promise;
  },
  mt = function mt(_ref11, t) {
    var e = _ref11.fileList;
    t = t || be(), e && Array.isArray(e) || t(null, {
      code: "INVALID_PARAM",
      message: "fileList必须是非空的数组"
    });
    var n = [];
    var _iterator4 = _createForOfIteratorHelper(e),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _s11 = _step4.value;
        "object" == (0, _typeof2.default)(_s11) ? (_s11.hasOwnProperty("fileID") && _s11.hasOwnProperty("maxAge") || t(null, {
          code: "INVALID_PARAM",
          message: "fileList的元素必须是包含fileID和maxAge的对象"
        }), n.push({
          fileid: _s11.fileID,
          max_age: _s11.maxAge
        })) : "string" == typeof _s11 ? n.push({
          fileid: _s11
        }) : t(null, {
          code: "INVALID_PARAM",
          message: "fileList的元素必须是字符串"
        });
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    var s = {
      file_list: n
    };
    return rt(this.config.env).send("storage.batchGetDownloadUrl", s).then(function (e) {
      e.code ? t(null, e) : t(null, {
        fileList: e.data.download_list,
        requestId: e.requestId
      });
    }).catch(function (e) {
      t(e);
    }), t.promise;
  },
  yt = /*#__PURE__*/function () {
    var _ref13 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee41(_ref12, t) {
      var e, n, s, r;
      return _regenerator.default.wrap(function _callee41$(_context41) {
        while (1) {
          switch (_context41.prev = _context41.next) {
            case 0:
              e = _ref12.fileID;
              _context41.next = 3;
              return mt.call(this, {
                fileList: [{
                  fileID: e,
                  maxAge: 600
                }]
              });
            case 3:
              n = _context41.sent.fileList[0];
              if (!("SUCCESS" !== n.code)) {
                _context41.next = 6;
                break;
              }
              return _context41.abrupt("return", t ? t(n) : new Promise(function (e) {
                e(n);
              }));
            case 6:
              s = rt(this.config.env);
              r = n.download_url;
              if (!(r = encodeURI(r), !t)) {
                _context41.next = 10;
                break;
              }
              return _context41.abrupt("return", s.download({
                url: r
              }));
            case 10:
              _context41.t0 = t;
              _context41.next = 13;
              return s.download({
                url: r
              });
            case 13:
              _context41.t1 = _context41.sent;
              (0, _context41.t0)(_context41.t1);
            case 15:
            case "end":
              return _context41.stop();
          }
        }
      }, _callee41, this);
    }));
    return function yt(_x33, _x34) {
      return _ref13.apply(this, arguments);
    };
  }(),
  _t = function _t(_ref14, o) {
    var e = _ref14.name,
      t = _ref14.data,
      n = _ref14.query,
      s = _ref14.parse,
      r = _ref14.search,
      i = _ref14.timeout;
    var a = o || be();
    var c;
    try {
      c = t ? JSON.stringify(t) : "";
    } catch (e) {
      return Promise.reject(e);
    }
    if (!e) return Promise.reject(new re({
      code: "PARAM_ERROR",
      message: "函数名不能为空"
    }));
    var u = {
      inQuery: n,
      parse: s,
      search: r,
      function_name: e,
      request_data: c
    };
    return rt(this.config.env).send("functions.invokeFunction", u, {
      timeout: i
    }).then(function (e) {
      if (e.code) a(null, e);else {
        var _t10 = e.data.response_data;
        if (s) a(null, {
          result: _t10,
          requestId: e.requestId
        });else try {
          _t10 = JSON.parse(e.data.response_data), a(null, {
            result: _t10,
            requestId: e.requestId
          });
        } catch (e) {
          a(new re({
            message: "response data must be json"
          }));
        }
      }
      return a.promise;
    }).catch(function (e) {
      a(e);
    }), a.promise;
  },
  wt = {
    timeout: 15e3,
    persistence: "session"
  },
  vt = {};
var It = /*#__PURE__*/function () {
  function It(e) {
    (0, _classCallCheck2.default)(this, It);
    this.config = e || this.config, this.authObj = void 0;
  }
  (0, _createClass2.default)(It, [{
    key: "init",
    value: function init(e) {
      switch (Ee.adapter || (this.requestClient = new Ee.adapter.reqClass({
        timeout: e.timeout || 5e3,
        timeoutMsg: "\u8BF7\u6C42\u5728".concat((e.timeout || 5e3) / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD")
      })), this.config = _objectSpread(_objectSpread({}, wt), e), !0) {
        case this.config.timeout > 6e5:
          console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
          break;
        case this.config.timeout < 100:
          console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
      }
      return new It(this.config);
    }
  }, {
    key: "auth",
    value: function auth() {
      var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        e = _ref15.persistence;
      if (this.authObj) return this.authObj;
      var t = e || Ee.adapter.primaryStorage || wt.persistence;
      var n;
      return t !== this.config.persistence && (this.config.persistence = t), function (e) {
        var t = e.env;
        Ne[t] = new Re(e), De[t] = new Re(_objectSpread(_objectSpread({}, e), {}, {
          persistence: "local"
        }));
      }(this.config), n = this.config, st[n.env] = new nt(n), this.authObj = new dt(this.config), this.authObj;
    }
  }, {
    key: "on",
    value: function on(e, t) {
      return je.apply(this, [e, t]);
    }
  }, {
    key: "off",
    value: function off(e, t) {
      return Be.apply(this, [e, t]);
    }
  }, {
    key: "callFunction",
    value: function callFunction(e, t) {
      return _t.apply(this, [e, t]);
    }
  }, {
    key: "deleteFile",
    value: function deleteFile(e, t) {
      return gt.apply(this, [e, t]);
    }
  }, {
    key: "getTempFileURL",
    value: function getTempFileURL(e, t) {
      return mt.apply(this, [e, t]);
    }
  }, {
    key: "downloadFile",
    value: function downloadFile(e, t) {
      return yt.apply(this, [e, t]);
    }
  }, {
    key: "uploadFile",
    value: function uploadFile(e, t) {
      return pt.apply(this, [e, t]);
    }
  }, {
    key: "getUploadMetadata",
    value: function getUploadMetadata(e, t) {
      return ft.apply(this, [e, t]);
    }
  }, {
    key: "registerExtension",
    value: function registerExtension(e) {
      vt[e.name] = e;
    }
  }, {
    key: "invokeExtension",
    value: function () {
      var _invokeExtension = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee42(e, t) {
        var n;
        return _regenerator.default.wrap(function _callee42$(_context42) {
          while (1) {
            switch (_context42.prev = _context42.next) {
              case 0:
                n = vt[e];
                if (n) {
                  _context42.next = 3;
                  break;
                }
                throw new re({
                  message: "\u6269\u5C55".concat(e, " \u5FC5\u987B\u5148\u6CE8\u518C")
                });
              case 3:
                _context42.next = 5;
                return n.invoke(t, this);
              case 5:
                return _context42.abrupt("return", _context42.sent);
              case 6:
              case "end":
                return _context42.stop();
            }
          }
        }, _callee42, this);
      }));
      function invokeExtension(_x35, _x36) {
        return _invokeExtension.apply(this, arguments);
      }
      return invokeExtension;
    }()
  }, {
    key: "useAdapters",
    value: function useAdapters(e) {
      var _ref16 = Oe(e) || {},
        t = _ref16.adapter,
        n = _ref16.runtime;
      t && (Ee.adapter = t), n && (Ee.runtime = n);
    }
  }]);
  return It;
}();
var St = new It();
function bt(e, t, n) {
  void 0 === n && (n = {});
  var s = /\?/.test(t),
    r = "";
  for (var i in n) {
    "" === r ? !s && (t += "?") : r += "&", r += i + "=" + encodeURIComponent(n[i]);
  }
  return /^http(s)?:\/\//.test(t += r) ? t : "" + e + t;
}
var kt = /*#__PURE__*/function () {
  function kt() {
    (0, _classCallCheck2.default)(this, kt);
  }
  (0, _createClass2.default)(kt, [{
    key: "get",
    value: function get(e) {
      var t = e.url,
        n = e.data,
        s = e.headers,
        r = e.timeout;
      return new Promise(function (e, i) {
        ie.request({
          url: bt("https:", t),
          data: n,
          method: "GET",
          header: s,
          timeout: r,
          success: function success(t) {
            e(t);
          },
          fail: function fail(e) {
            i(e);
          }
        });
      });
    }
  }, {
    key: "post",
    value: function post(e) {
      var t = e.url,
        n = e.data,
        s = e.headers,
        r = e.timeout;
      return new Promise(function (e, i) {
        ie.request({
          url: bt("https:", t),
          data: n,
          method: "POST",
          header: s,
          timeout: r,
          success: function success(t) {
            e(t);
          },
          fail: function fail(e) {
            i(e);
          }
        });
      });
    }
  }, {
    key: "upload",
    value: function upload(e) {
      return new Promise(function (t, n) {
        var s = e.url,
          r = e.file,
          i = e.data,
          o = e.headers,
          a = e.fileType,
          c = ie.uploadFile({
            url: bt("https:", s),
            name: "file",
            formData: Object.assign({}, i),
            filePath: r,
            fileType: a,
            header: o,
            success: function success(e) {
              var n = {
                statusCode: e.statusCode,
                data: e.data || {}
              };
              200 === e.statusCode && i.success_action_status && (n.statusCode = parseInt(i.success_action_status, 10)), t(n);
            },
            fail: function fail(e) {
              n(new Error(e.errMsg || "uploadFile:fail"));
            }
          });
        "function" == typeof e.onUploadProgress && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (t) {
          e.onUploadProgress({
            loaded: t.totalBytesSent,
            total: t.totalBytesExpectedToSend
          });
        });
      });
    }
  }]);
  return kt;
}();
var At = {
  setItem: function setItem(e, t) {
    ie.setStorageSync(e, t);
  },
  getItem: function getItem(e) {
    return ie.getStorageSync(e);
  },
  removeItem: function removeItem(e) {
    ie.removeStorageSync(e);
  },
  clear: function clear() {
    ie.clearStorageSync();
  }
};
var Tt = {
  genAdapter: function genAdapter() {
    return {
      root: {},
      reqClass: kt,
      localStorage: At,
      primaryStorage: "local"
    };
  },
  isMatch: function isMatch() {
    return !0;
  },
  runtime: "uni_app"
};
St.useAdapters(Tt);
var Ct = St,
  Pt = Ct.init;
Ct.init = function (e) {
  e.env = e.spaceId;
  var t = Pt.call(this, e);
  t.config.provider = "tencent", t.config.spaceId = e.spaceId;
  var n = t.auth;
  return t.auth = function (e) {
    var t = n.call(this, e);
    return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach(function (e) {
      var n;
      t[e] = (n = t[e], function (e) {
        e = e || {};
        var _se = se(e),
          t = _se.success,
          s = _se.fail,
          r = _se.complete;
        if (!(t || s || r)) return n.call(this, e);
        n.call(this, e).then(function (e) {
          t && t(e), r && r(e);
        }, function (e) {
          s && s(e), r && r(e);
        });
      }).bind(t);
    }), t;
  }, t.customAuth = t.auth, t;
};
var Ot = Ct;
function Et(_x37, _x38) {
  return _Et.apply(this, arguments);
}
function _Et() {
  _Et = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee68(e, t) {
    var n, _e31, s;
    return _regenerator.default.wrap(function _callee68$(_context68) {
      while (1) {
        switch (_context68.prev = _context68.next) {
          case 0:
            n = "http://".concat(e, ":").concat(t, "/system/ping");
            _context68.prev = 1;
            _context68.next = 4;
            return s = {
              url: n,
              timeout: 500
            }, new Promise(function (e, t) {
              ie.request(_objectSpread(_objectSpread({}, s), {}, {
                success: function success(t) {
                  e(t);
                },
                fail: function fail(e) {
                  t(e);
                }
              }));
            });
          case 4:
            _e31 = _context68.sent;
            return _context68.abrupt("return", !(!_e31.data || 0 !== _e31.data.code));
          case 8:
            _context68.prev = 8;
            _context68.t0 = _context68["catch"](1);
            return _context68.abrupt("return", !1);
          case 11:
          case "end":
            return _context68.stop();
        }
      }
    }, _callee68, null, [[1, 8]]);
  }));
  return _Et.apply(this, arguments);
}
function xt(_x39, _x40) {
  return _xt.apply(this, arguments);
}
function _xt() {
  _xt = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee69(e, t) {
    var n, s, _r11;
    return _regenerator.default.wrap(function _callee69$(_context69) {
      while (1) {
        switch (_context69.prev = _context69.next) {
          case 0:
            s = 0;
          case 1:
            if (!(s < e.length)) {
              _context69.next = 11;
              break;
            }
            _r11 = e[s];
            _context69.next = 5;
            return Et(_r11, t);
          case 5:
            if (!_context69.sent) {
              _context69.next = 8;
              break;
            }
            n = _r11;
            return _context69.abrupt("break", 11);
          case 8:
            s++;
            _context69.next = 1;
            break;
          case 11:
            return _context69.abrupt("return", {
              address: n,
              port: t
            });
          case 12:
          case "end":
            return _context69.stop();
        }
      }
    }, _callee69);
  }));
  return _xt.apply(this, arguments);
}
var Lt = {
  "serverless.file.resource.generateProximalSign": "storage/generate-proximal-sign",
  "serverless.file.resource.report": "storage/report",
  "serverless.file.resource.delete": "storage/delete",
  "serverless.file.resource.getTempFileURL": "storage/get-temp-file-url"
};
var Ut = /*#__PURE__*/function () {
  function Ut(e) {
    (0, _classCallCheck2.default)(this, Ut);
    if (["spaceId", "clientSecret"].forEach(function (t) {
      if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error("".concat(t, " required"));
    }), !e.endpoint) throw new Error("集群空间未配置ApiEndpoint，配置后需要重新关联服务空间后生效");
    this.config = Object.assign({}, e), this.config.provider = "dcloud", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.adapter = ie;
  }
  (0, _createClass2.default)(Ut, [{
    key: "request",
    value: function () {
      var _request4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee43(e) {
        var _this15 = this;
        var t,
          n,
          _args43 = arguments;
        return _regenerator.default.wrap(function _callee43$(_context43) {
          while (1) {
            switch (_context43.prev = _context43.next) {
              case 0:
                t = _args43.length > 1 && _args43[1] !== undefined ? _args43[1] : !0;
                n = S && t;
                if (!n) {
                  _context43.next = 8;
                  break;
                }
                _context43.next = 5;
                return this.setupLocalRequest(e);
              case 5:
                _context43.t0 = _context43.sent;
                _context43.next = 9;
                break;
              case 8:
                _context43.t0 = this.setupRequest(e);
              case 9:
                e = _context43.t0;
                return _context43.abrupt("return", Promise.resolve().then(function () {
                  return n ? _this15.requestLocal(e) : fe.wrappedRequest(e, _this15.adapter.request);
                }));
              case 11:
              case "end":
                return _context43.stop();
            }
          }
        }, _callee43, this);
      }));
      function request(_x41) {
        return _request4.apply(this, arguments);
      }
      return request;
    }()
  }, {
    key: "requestLocal",
    value: function requestLocal(e) {
      var _this16 = this;
      return new Promise(function (t, n) {
        _this16.adapter.request(Object.assign(e, {
          complete: function complete(e) {
            if (e || (e = {}), !e.statusCode || e.statusCode >= 400) {
              var _t11 = e.data && e.data.code || "SYS_ERR",
                _s12 = e.data && e.data.message || "request:fail";
              return n(new re({
                code: _t11,
                message: _s12
              }));
            }
            t({
              success: !0,
              result: e.data
            });
          }
        }));
      });
    }
  }, {
    key: "setupRequest",
    value: function setupRequest(e) {
      var t = Object.assign({}, e, {
          spaceId: this.config.spaceId,
          timestamp: Date.now()
        }),
        n = {
          "Content-Type": "application/json"
        };
      n["x-serverless-sign"] = fe.sign(t, this.config.clientSecret);
      var s = pe();
      n["x-client-info"] = encodeURIComponent(JSON.stringify(s));
      var _oe = oe(),
        r = _oe.token;
      return n["x-client-token"] = r, {
        url: this.config.requestUrl,
        method: "POST",
        data: t,
        dataType: "json",
        header: JSON.parse(JSON.stringify(n))
      };
    }
  }, {
    key: "setupLocalRequest",
    value: function () {
      var _setupLocalRequest = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee44(e) {
        var t, _oe2, n, s, _ref17, r, i, _yield$xt, o;
        return _regenerator.default.wrap(function _callee44$(_context44) {
          while (1) {
            switch (_context44.prev = _context44.next) {
              case 0:
                t = pe();
                _oe2 = oe();
                n = _oe2.token;
                s = Object.assign({}, e, {
                  spaceId: this.config.spaceId,
                  timestamp: Date.now(),
                  clientInfo: t,
                  token: n
                });
                _ref17 = this.__dev__ && this.__dev__.debugInfo || {};
                r = _ref17.address;
                i = _ref17.servePort;
                _context44.next = 9;
                return xt(r, i);
              case 9:
                _yield$xt = _context44.sent;
                o = _yield$xt.address;
                return _context44.abrupt("return", {
                  url: "http://".concat(o, ":").concat(i, "/").concat(Lt[e.method]),
                  method: "POST",
                  data: s,
                  dataType: "json",
                  header: JSON.parse(JSON.stringify({
                    "Content-Type": "application/json"
                  }))
                });
              case 12:
              case "end":
                return _context44.stop();
            }
          }
        }, _callee44, this);
      }));
      function setupLocalRequest(_x42) {
        return _setupLocalRequest.apply(this, arguments);
      }
      return setupLocalRequest;
    }()
  }, {
    key: "callFunction",
    value: function callFunction(e) {
      var t = {
        method: "serverless.function.runtime.invoke",
        params: JSON.stringify({
          functionTarget: e.name,
          functionArgs: e.data || {}
        })
      };
      return this.request(t, !1);
    }
  }, {
    key: "getUploadFileOptions",
    value: function getUploadFileOptions(e) {
      var t = {
        method: "serverless.file.resource.generateProximalSign",
        params: JSON.stringify(e)
      };
      return this.request(t);
    }
  }, {
    key: "reportUploadFile",
    value: function reportUploadFile(e) {
      var t = {
        method: "serverless.file.resource.report",
        params: JSON.stringify(e)
      };
      return this.request(t);
    }
  }, {
    key: "uploadFile",
    value: function uploadFile(_ref18) {
      var _this17 = this;
      var e = _ref18.filePath,
        t = _ref18.cloudPath,
        _ref18$fileType = _ref18.fileType,
        n = _ref18$fileType === void 0 ? "image" : _ref18$fileType,
        s = _ref18.onUploadProgress;
      if (!t) throw new re({
        code: "CLOUDPATH_REQUIRED",
        message: "cloudPath不可为空"
      });
      var r;
      return this.getUploadFileOptions({
        cloudPath: t
      }).then(function (t) {
        var _t$result = t.result,
          i = _t$result.url,
          o = _t$result.formData,
          a = _t$result.name;
        return r = t.result.fileUrl, new Promise(function (t, r) {
          var c = _this17.adapter.uploadFile({
            url: i,
            formData: o,
            name: a,
            filePath: e,
            fileType: n,
            success: function success(e) {
              e && e.statusCode < 400 ? t(e) : r(new re({
                code: "UPLOAD_FAILED",
                message: "文件上传失败"
              }));
            },
            fail: function fail(e) {
              r(new re({
                code: e.code || "UPLOAD_FAILED",
                message: e.message || e.errMsg || "文件上传失败"
              }));
            }
          });
          "function" == typeof s && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {
            s({
              loaded: e.totalBytesSent,
              total: e.totalBytesExpectedToSend
            });
          });
        });
      }).then(function () {
        return _this17.reportUploadFile({
          cloudPath: t
        });
      }).then(function (t) {
        return new Promise(function (n, s) {
          t.success ? n({
            success: !0,
            filePath: e,
            fileID: r
          }) : s(new re({
            code: "UPLOAD_FAILED",
            message: "文件上传失败"
          }));
        });
      });
    }
  }, {
    key: "deleteFile",
    value: function deleteFile(_ref19) {
      var e = _ref19.fileList;
      var t = {
        method: "serverless.file.resource.delete",
        params: JSON.stringify({
          fileList: e
        })
      };
      return this.request(t).then(function (e) {
        if (e.success) return e.result;
        throw new re({
          code: "DELETE_FILE_FAILED",
          message: "删除文件失败"
        });
      });
    }
  }, {
    key: "getTempFileURL",
    value: function getTempFileURL() {
      var _ref20 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        e = _ref20.fileList,
        t = _ref20.maxAge;
      if (!Array.isArray(e) || 0 === e.length) throw new re({
        code: "INVALID_PARAM",
        message: "fileList的元素必须是非空的字符串"
      });
      var n = {
        method: "serverless.file.resource.getTempFileURL",
        params: JSON.stringify({
          fileList: e,
          maxAge: t
        })
      };
      return this.request(n).then(function (e) {
        if (e.success) return {
          fileList: e.result.fileList.map(function (e) {
            return {
              fileID: e.fileID,
              tempFileURL: e.tempFileURL
            };
          })
        };
        throw new re({
          code: "GET_TEMP_FILE_URL_FAILED",
          message: "获取临时文件链接失败"
        });
      });
    }
  }]);
  return Ut;
}();
var Rt = {
    init: function init(e) {
      var t = new Ut(e),
        n = {
          signInAnonymously: function signInAnonymously() {
            return Promise.resolve();
          },
          getLoginState: function getLoginState() {
            return Promise.resolve(!1);
          }
        };
      return t.auth = function () {
        return n;
      }, t.customAuth = t.auth, t;
    }
  },
  Nt = n(function (e, t) {
    e.exports = r.enc.Hex;
  });
function Dt() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
    var t = 16 * Math.random() | 0;
    return ("x" === e ? t : 3 & t | 8).toString(16);
  });
}
function Mt() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var n = t.data,
    s = t.functionName,
    r = t.method,
    i = t.headers,
    _t$signHeaderKeys = t.signHeaderKeys,
    o = _t$signHeaderKeys === void 0 ? [] : _t$signHeaderKeys,
    a = t.config,
    c = String(Date.now()),
    u = Dt(),
    l = Object.assign({}, i, {
      "x-from-app-id": a.spaceAppId,
      "x-from-env-id": a.spaceId,
      "x-to-env-id": a.spaceId,
      "x-from-instance-id": c,
      "x-from-function-name": s,
      "x-client-timestamp": c,
      "x-alipay-source": "client",
      "x-request-id": u,
      "x-alipay-callid": u,
      "x-trace-id": u
    }),
    h = ["x-from-app-id", "x-from-env-id", "x-to-env-id", "x-from-instance-id", "x-from-function-name", "x-client-timestamp"].concat(o),
    _ref21 = e.split("?") || [],
    _ref22 = (0, _slicedToArray2.default)(_ref21, 2),
    _ref22$ = _ref22[0],
    d = _ref22$ === void 0 ? "" : _ref22$,
    _ref22$2 = _ref22[1],
    p = _ref22$2 === void 0 ? "" : _ref22$2,
    f = function (e) {
      var t = e.signedHeaders.join(";"),
        n = e.signedHeaders.map(function (t) {
          return "".concat(t.toLowerCase(), ":").concat(e.headers[t], "\n");
        }).join(""),
        s = Ie(e.body).toString(Nt),
        r = "".concat(e.method.toUpperCase(), "\n").concat(e.path, "\n").concat(e.query, "\n").concat(n, "\n").concat(t, "\n").concat(s, "\n"),
        i = Ie(r).toString(Nt),
        o = "HMAC-SHA256\n".concat(e.timestamp, "\n").concat(i, "\n"),
        a = Se(o, e.secretKey).toString(Nt);
      return "HMAC-SHA256 Credential=".concat(e.secretId, ", SignedHeaders=").concat(t, ", Signature=").concat(a);
    }({
      path: d,
      query: p,
      method: r,
      headers: l,
      timestamp: c,
      body: JSON.stringify(n),
      secretId: a.accessKey,
      secretKey: a.secretKey,
      signedHeaders: h.sort()
    });
  return {
    url: "".concat(a.endpoint).concat(e),
    headers: Object.assign({}, l, {
      Authorization: f
    })
  };
}
function qt(_ref23) {
  var e = _ref23.url,
    t = _ref23.data,
    _ref23$method = _ref23.method,
    n = _ref23$method === void 0 ? "POST" : _ref23$method,
    _ref23$headers = _ref23.headers,
    s = _ref23$headers === void 0 ? {} : _ref23$headers,
    r = _ref23.timeout;
  return new Promise(function (i, o) {
    ie.request({
      url: e,
      method: n,
      data: "object" == (0, _typeof2.default)(t) ? JSON.stringify(t) : t,
      header: s,
      dataType: "json",
      timeout: r,
      complete: function complete() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var t = s["x-trace-id"] || "";
        if (!e.statusCode || e.statusCode >= 400) {
          var _ref24 = e.data || {},
            _n8 = _ref24.message,
            _s13 = _ref24.errMsg,
            _r5 = _ref24.trace_id;
          return o(new re({
            code: "SYS_ERR",
            message: _n8 || _s13 || "request:fail",
            requestId: _r5 || t
          }));
        }
        i({
          status: e.statusCode,
          data: e.data,
          headers: e.header,
          requestId: t
        });
      }
    });
  });
}
function Ft(e, t) {
  var n = e.path,
    s = e.data,
    _e$method = e.method,
    r = _e$method === void 0 ? "GET" : _e$method,
    _Mt = Mt(n, {
      functionName: "",
      data: s,
      method: r,
      headers: {
        "x-alipay-cloud-mode": "oss",
        "x-data-api-type": "oss",
        "x-expire-timestamp": String(Date.now() + 6e4)
      },
      signHeaderKeys: ["x-data-api-type", "x-expire-timestamp"],
      config: t
    }),
    i = _Mt.url,
    o = _Mt.headers;
  return qt({
    url: i,
    data: s,
    method: r,
    headers: o
  }).then(function (e) {
    var t = e.data || {};
    if (!t.success) throw new re({
      code: e.errCode,
      message: e.errMsg,
      requestId: e.requestId
    });
    return t.data || {};
  }).catch(function (e) {
    throw new re({
      code: e.errCode,
      message: e.errMsg,
      requestId: e.requestId
    });
  });
}
function Kt() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var t = e.trim().replace(/^cloud:\/\//, ""),
    n = t.indexOf("/");
  if (n <= 0) throw new re({
    code: "INVALID_PARAM",
    message: "fileID不合法"
  });
  var s = t.substring(0, n),
    r = t.substring(n + 1);
  return s !== this.config.spaceId && console.warn("file ".concat(e, " does not belong to env ").concat(this.config.spaceId)), r;
}
function jt() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return "cloud://".concat(this.config.spaceId, "/").concat(e.replace(/^\/+/, ""));
}
var $t = /*#__PURE__*/function () {
  function $t(e) {
    (0, _classCallCheck2.default)(this, $t);
    this.config = e;
  }
  (0, _createClass2.default)($t, [{
    key: "signedURL",
    value: function signedURL(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var n = "/ws/function/".concat(e),
        s = this.config.wsEndpoint.replace(/^ws(s)?:\/\//, ""),
        r = Object.assign({}, t, {
          accessKeyId: this.config.accessKey,
          signatureNonce: Dt(),
          timestamp: "" + Date.now()
        }),
        i = [n, ["accessKeyId", "authorization", "signatureNonce", "timestamp"].sort().map(function (e) {
          return r[e] ? "".concat(e, "=").concat(r[e]) : null;
        }).filter(Boolean).join("&"), "host:".concat(s)].join("\n"),
        o = ["HMAC-SHA256", Ie(i).toString(Nt)].join("\n"),
        a = Se(o, this.config.secretKey).toString(Nt),
        c = Object.keys(r).map(function (e) {
          return "".concat(e, "=").concat(encodeURIComponent(r[e]));
        }).join("&");
      return "".concat(this.config.wsEndpoint).concat(n, "?").concat(c, "&signature=").concat(a);
    }
  }]);
  return $t;
}();
var Bt = /*#__PURE__*/function () {
  function Bt(e) {
    (0, _classCallCheck2.default)(this, Bt);
    this.config = e;
  }
  (0, _createClass2.default)(Bt, [{
    key: "signedURL",
    value: function signedURL(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var n = "/ws/sse/function/".concat(e),
        s = this.config.endpoint.replace(/^http(s)?:\/\//, ""),
        r = Object.assign({}, t, {
          accessKeyId: this.config.accessKey,
          signatureNonce: Dt(),
          timestamp: "" + Date.now()
        }),
        i = ["accessKeyId", "authorization", "signatureNonce", "timestamp"].sort().map(function (e) {
          return r[e] ? "".concat(e, "=").concat(r[e]) : null;
        }).filter(Boolean).join("&"),
        o = [n.replace("/ws", ""), i, "host:".concat(s)].join("\n"),
        a = ["HMAC-SHA256", Ie(o).toString(Nt)].join("\n"),
        c = Se(a, this.config.secretKey).toString(Nt),
        u = Object.keys(r).map(function (e) {
          return "".concat(e, "=").concat(encodeURIComponent(r[e]));
        }).join("&");
      return "".concat(this.config.endpoint).concat(n, "?").concat(u, "&signature=").concat(c);
    }
  }]);
  return Bt;
}();
var Wt = /*#__PURE__*/function () {
  function Wt(e) {
    (0, _classCallCheck2.default)(this, Wt);
    if (["spaceId", "spaceAppId", "accessKey", "secretKey"].forEach(function (t) {
      if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error("".concat(t, " required"));
    }), e.endpoint) {
      if ("string" != typeof e.endpoint) throw new Error("endpoint must be string");
      if (!/^https:\/\//.test(e.endpoint)) throw new Error("endpoint must start with https://");
      e.endpoint = e.endpoint.replace(/\/$/, "");
    }
    this.config = Object.assign({}, e, {
      endpoint: e.endpoint || "https://".concat(e.spaceId, ".api-hz.cloudbasefunction.cn"),
      wsEndpoint: e.wsEndpoint || "wss://".concat(e.spaceId, ".api-hz.cloudbasefunction.cn")
    }), this._websocket = new $t(this.config), this._sse = new Bt(this.config);
  }
  (0, _createClass2.default)(Wt, [{
    key: "callFunction",
    value: function callFunction(e) {
      return function (e, t) {
        var n = e.name,
          s = e.data,
          _e$async = e.async,
          r = _e$async === void 0 ? !1 : _e$async,
          i = e.timeout,
          o = "POST",
          a = {
            "x-to-function-name": n
          };
        r && (a["x-function-invoke-type"] = "async");
        var _Mt2 = Mt("/functions/invokeFunction", {
            functionName: n,
            data: s,
            method: o,
            headers: a,
            signHeaderKeys: ["x-to-function-name"],
            config: t
          }),
          c = _Mt2.url,
          u = _Mt2.headers;
        return qt({
          url: c,
          data: s,
          method: o,
          headers: u,
          timeout: i
        }).then(function (e) {
          var t = 0;
          if (r) {
            var _n9 = e.data || {};
            t = "200" === _n9.errCode ? 0 : _n9.errCode, e.data = _n9.data || {}, e.errMsg = _n9.errMsg;
          }
          if (0 !== t) throw new re({
            code: t,
            message: e.errMsg,
            requestId: e.requestId
          });
          return {
            errCode: t,
            success: 0 === t,
            requestId: e.requestId,
            result: e.data
          };
        }).catch(function (e) {
          throw new re({
            code: e.errCode,
            message: e.errMsg,
            requestId: e.requestId
          });
        });
      }(e, this.config);
    }
  }, {
    key: "uploadFileToOSS",
    value: function uploadFileToOSS(_ref25) {
      var e = _ref25.url,
        t = _ref25.filePath,
        n = _ref25.fileType,
        s = _ref25.formData,
        r = _ref25.onUploadProgress;
      return new Promise(function (i, o) {
        var a = ie.uploadFile({
          url: e,
          filePath: t,
          fileType: n,
          formData: s,
          name: "file",
          success: function success(e) {
            e && e.statusCode < 400 ? i(e) : o(new re({
              code: "UPLOAD_FAILED",
              message: "文件上传失败"
            }));
          },
          fail: function fail(e) {
            o(new re({
              code: e.code || "UPLOAD_FAILED",
              message: e.message || e.errMsg || "文件上传失败"
            }));
          }
        });
        "function" == typeof r && a && "function" == typeof a.onProgressUpdate && a.onProgressUpdate(function (e) {
          r({
            loaded: e.totalBytesSent,
            total: e.totalBytesExpectedToSend
          });
        });
      });
    }
  }, {
    key: "uploadFile",
    value: function () {
      var _uploadFile2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee45(_ref26) {
        var e, _ref26$cloudPath, t, _ref26$fileType, n, s, r, i, o, a, c;
        return _regenerator.default.wrap(function _callee45$(_context45) {
          while (1) {
            switch (_context45.prev = _context45.next) {
              case 0:
                e = _ref26.filePath, _ref26$cloudPath = _ref26.cloudPath, t = _ref26$cloudPath === void 0 ? "" : _ref26$cloudPath, _ref26$fileType = _ref26.fileType, n = _ref26$fileType === void 0 ? "image" : _ref26$fileType, s = _ref26.onUploadProgress;
                if (!("string" !== f(t))) {
                  _context45.next = 3;
                  break;
                }
                throw new re({
                  code: "INVALID_PARAM",
                  message: "cloudPath必须为字符串类型"
                });
              case 3:
                if (t = t.trim()) {
                  _context45.next = 5;
                  break;
                }
                throw new re({
                  code: "INVALID_PARAM",
                  message: "cloudPath不可为空"
                });
              case 5:
                if (!/:\/\//.test(t)) {
                  _context45.next = 7;
                  break;
                }
                throw new re({
                  code: "INVALID_PARAM",
                  message: "cloudPath不合法"
                });
              case 7:
                _context45.next = 9;
                return Ft({
                  path: "/".concat(t.replace(/^\//, ""), "?post_url")
                }, this.config);
              case 9:
                r = _context45.sent;
                i = r.file_id;
                o = r.upload_url;
                a = r.form_data;
                c = a && a.reduce(function (e, t) {
                  return e[t.key] = t.value, e;
                }, {});
                return _context45.abrupt("return", this.uploadFileToOSS({
                  url: o,
                  filePath: e,
                  fileType: n,
                  formData: c,
                  onUploadProgress: s
                }).then(function () {
                  return {
                    fileID: i
                  };
                }));
              case 15:
              case "end":
                return _context45.stop();
            }
          }
        }, _callee45, this);
      }));
      function uploadFile(_x43) {
        return _uploadFile2.apply(this, arguments);
      }
      return uploadFile;
    }()
  }, {
    key: "getTempFileURL",
    value: function () {
      var _getTempFileURL = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee46(_ref27) {
        var _this18 = this;
        var e;
        return _regenerator.default.wrap(function _callee46$(_context46) {
          while (1) {
            switch (_context46.prev = _context46.next) {
              case 0:
                e = _ref27.fileList;
                return _context46.abrupt("return", new Promise(function (t, n) {
                  (!e || e.length < 0) && t({
                    code: "INVALID_PARAM",
                    message: "fileList不能为空数组"
                  }), e.length > 50 && t({
                    code: "INVALID_PARAM",
                    message: "fileList数组长度不能超过50"
                  });
                  var s = [];
                  var _iterator5 = _createForOfIteratorHelper(e),
                    _step5;
                  try {
                    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                      var _n10 = _step5.value;
                      var _e16 = void 0;
                      "string" !== f(_n10) && t({
                        code: "INVALID_PARAM",
                        message: "fileList的元素必须是非空的字符串"
                      });
                      try {
                        _e16 = Kt.call(_this18, _n10);
                      } catch (t) {
                        console.warn(t.errCode, t.errMsg), _e16 = _n10;
                      }
                      s.push({
                        file_id: _e16,
                        expire: 600
                      });
                    }
                  } catch (err) {
                    _iterator5.e(err);
                  } finally {
                    _iterator5.f();
                  }
                  Ft({
                    path: "/?download_url",
                    data: {
                      file_list: s
                    },
                    method: "POST"
                  }, _this18.config).then(function (e) {
                    var _e$file_list = e.file_list,
                      n = _e$file_list === void 0 ? [] : _e$file_list;
                    t({
                      fileList: n.map(function (e) {
                        return {
                          fileID: jt.call(_this18, e.file_id),
                          tempFileURL: e.download_url
                        };
                      })
                    });
                  }).catch(function (e) {
                    return n(e);
                  });
                }));
              case 2:
              case "end":
                return _context46.stop();
            }
          }
        }, _callee46);
      }));
      function getTempFileURL(_x44) {
        return _getTempFileURL.apply(this, arguments);
      }
      return getTempFileURL;
    }()
  }, {
    key: "connectWebSocket",
    value: function () {
      var _connectWebSocket = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee47(e) {
        var t, n;
        return _regenerator.default.wrap(function _callee47$(_context47) {
          while (1) {
            switch (_context47.prev = _context47.next) {
              case 0:
                t = e.name, n = e.query;
                return _context47.abrupt("return", ie.connectSocket({
                  url: this._websocket.signedURL(t, n),
                  complete: function complete() {}
                }));
              case 2:
              case "end":
                return _context47.stop();
            }
          }
        }, _callee47, this);
      }));
      function connectWebSocket(_x45) {
        return _connectWebSocket.apply(this, arguments);
      }
      return connectWebSocket;
    }()
  }, {
    key: "requestSSE",
    value: function requestSSE(e) {
      var t = e.name,
        n = e.data;
      return ie.request({
        method: "POST",
        url: this._sse.signedURL(t),
        data: n,
        header: {
          "content-type": "application/json"
        },
        dataType: "json"
      });
    }
  }]);
  return Wt;
}();
var Ht = {
  init: function init(e) {
    e.provider = "alipay";
    var t = new Wt(e);
    return t.auth = function () {
      return {
        signInAnonymously: function signInAnonymously() {
          return Promise.resolve();
        },
        getLoginState: function getLoginState() {
          return Promise.resolve(!0);
        }
      };
    }, t;
  }
};
function Jt(_ref28) {
  var e = _ref28.data;
  var t;
  t = pe();
  var n = JSON.parse(JSON.stringify(e || {}));
  if (Object.assign(n, {
    clientInfo: t
  }), !n.uniIdToken) {
    var _oe3 = oe(),
      _e17 = _oe3.token;
    _e17 && (n.uniIdToken = _e17);
  }
  return n;
}
var zt = {
  enable: !1,
  interval: 0,
  space: {}
};
var Vt = null,
  Gt = 0,
  Qt = !1;
function Yt() {
  return Array.isArray(P) && P.length ? P[0] : {};
}
function Xt(e) {
  return "".concat(e, "_").concat(Yt().spaceId || "default");
}
function Zt() {
  if (Vt) return Vt;
  try {
    var e = ie.getStorageSync(Xt("UNICLOUD_FAILOVER_CONFIG"));
    if (g(e)) return Vt = e, e;
  } catch (e) {}
  return null;
}
function en(e) {
  Gt = e;
  try {
    ie.setStorageSync(Xt("UNICLOUD_FAILOVER_LAST_REQUEST"), e);
  } catch (e) {}
}
function tn(e) {
  if (null === e || e < 0) return !1;
  if (0 === e) return !0;
  var t = function () {
    if (Gt) return Gt;
    try {
      var _e18 = ie.getStorageSync(Xt("UNICLOUD_FAILOVER_LAST_REQUEST"));
      if (_e18 && "number" == typeof _e18) return Gt = _e18, _e18;
    } catch (e) {}
    return 0;
  }();
  if (!t) return !0;
  return Date.now() - t >= e;
}
function nn() {
  return _nn.apply(this, arguments);
}
function _nn() {
  _nn = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee70() {
    var e, t, _e32, n, s, _s$enable, _r12, _s$interval, _i5, _s$space, _o4, _a3, _c3, _u;
    return _regenerator.default.wrap(function _callee70$(_context70) {
      while (1) {
        switch (_context70.prev = _context70.next) {
          case 0:
            e = Yt(), t = e.failoverEndpoint;
            if (t) {
              _context70.next = 3;
              break;
            }
            return _context70.abrupt("return", null);
          case 3:
            if (!Qt) {
              _context70.next = 5;
              break;
            }
            return _context70.abrupt("return", Zt());
          case 5:
            Qt = !0;
            _context70.prev = 6;
            _e32 = "".concat(t, "/.unicloud/failover-cfg.json");
            _context70.next = 10;
            return ie.request({
              url: _e32,
              method: "GET",
              dataType: "json",
              timeout: 5e3
            });
          case 10:
            n = _context70.sent;
            if (!(en(Date.now()), 200 !== n.statusCode || !g(n.data))) {
              _context70.next = 13;
              break;
            }
            return _context70.abrupt("return", null);
          case 13:
            s = _objectSpread(_objectSpread({}, zt), n.data), _s$enable = s.enable, _r12 = _s$enable === void 0 ? !1 : _s$enable, _s$interval = s.interval, _i5 = _s$interval === void 0 ? 0 : _s$interval, _s$space = s.space, _o4 = _s$space === void 0 ? {} : _s$space, _a3 = Zt(), _c3 = _a3 && _a3.enable, _u = function (e, t) {
              if (!e) return t.enable;
              if (e.enable !== t.enable) return !0;
              if (e.interval !== t.interval) return !0;
              if (t._lastModifiedAt && e._lastModifiedAt !== t._lastModifiedAt) return !0;
              if (JSON.stringify(e.space) !== JSON.stringify(t.space)) return !0;
              return !1;
            }(_a3, s);
            return _context70.abrupt("return", (function (e) {
              try {
                Vt = e, e && e.enable ? ie.setStorageSync(Xt("UNICLOUD_FAILOVER_CONFIG"), e) : (ie.removeStorageSync(Xt("UNICLOUD_FAILOVER_CONFIG")), ie.removeStorageSync(Xt("UNICLOUD_FAILOVER_LAST_REQUEST")));
              } catch (e) {}
            }({
              enable: _r12,
              interval: _i5,
              space: _o4,
              _lastModifiedAt: n.data._lastModifiedAt || Date.now()
            }), _u && Z(J, {
              isEnabled: _r12,
              hasStatusChanged: _c3 !== _r12,
              failoverSpace: _o4
            }), s));
          case 17:
            _context70.prev = 17;
            _context70.t0 = _context70["catch"](6);
            return _context70.abrupt("return", Zt());
          case 20:
            _context70.prev = 20;
            Qt = !1;
            return _context70.finish(20);
          case 23:
          case "end":
            return _context70.stop();
        }
      }
    }, _callee70, null, [[6, 17, 20, 23]]);
  }));
  return _nn.apply(this, arguments);
}
function sn() {
  return _sn.apply(this, arguments);
}
function _sn() {
  _sn = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee71() {
    var _this31 = this;
    var e,
      _this$__dev__,
      t,
      n,
      s,
      r,
      i,
      o,
      a,
      _args10 = arguments;
    return _regenerator.default.wrap(function _callee71$(_context71) {
      while (1) {
        switch (_context71.prev = _context71.next) {
          case 0:
            e = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : {};
            _context71.next = 3;
            return this.__dev__.initLocalNetwork();
          case 3:
            _this$__dev__ = this.__dev__, t = _this$__dev__.localAddress, n = _this$__dev__.localPort, s = Yt(), r = {
              aliyun: "aliyun",
              tencent: "tcb",
              alipay: "alipay",
              dcloud: "dcloud"
            }[s.provider], i = s.spaceId, o = "http://".concat(t, ":").concat(n, "/system/check-function"), a = "http://".concat(t, ":").concat(n, "/cloudfunctions/").concat(e.name);
            return _context71.abrupt("return", new Promise(function (t, n) {
              ie.request({
                method: "POST",
                url: o,
                data: {
                  name: e.name,
                  platform: T,
                  provider: r,
                  spaceId: i
                },
                timeout: 3e3,
                success: function success(e) {
                  t(e);
                },
                fail: function fail() {
                  t({
                    data: {
                      code: "NETWORK_ERROR",
                      message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。"
                    }
                  });
                }
              });
            }).then(function () {
              var _ref68 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                e = _ref68.data;
              var _ref69 = e || {},
                t = _ref69.code,
                n = _ref69.message;
              return {
                code: 0 === t ? 0 : t || "SYS_ERR",
                message: n || "SYS_ERR"
              };
            }).then(function (_ref70) {
              var t = _ref70.code,
                n = _ref70.message;
              if (0 !== t) {
                switch (t) {
                  case "MODULE_ENCRYPTED":
                    console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e.name, "\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));
                    break;
                  case "FUNCTION_ENCRYPTED":
                    console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e.name, "\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));
                    break;
                  case "ACTION_ENCRYPTED":
                    console.error(n || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
                    break;
                  case "NETWORK_ERROR":
                    console.error(n || "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下");
                    break;
                  case "SWITCH_TO_CLOUD":
                    break;
                  default:
                    {
                      var _e33 = "\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(n, "\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5");
                      throw console.error(_e33), new Error(_e33);
                    }
                }
                return _this31._callCloudFunction(e);
              }
              return new Promise(function (t, n) {
                var s = Jt.call(_this31, {
                  data: e.data
                });
                ie.request({
                  method: "POST",
                  url: a,
                  data: {
                    provider: r,
                    platform: T,
                    param: s
                  },
                  timeout: e.timeout,
                  success: function success() {
                    var _ref71 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                      e = _ref71.statusCode,
                      s = _ref71.data;
                    return !e || e >= 400 ? n(new re({
                      code: s.code || "SYS_ERR",
                      message: s.message || "request:fail"
                    })) : t({
                      result: s
                    });
                  },
                  fail: function fail(e) {
                    n(new re({
                      code: e.code || e.errCode || "SYS_ERR",
                      message: e.message || e.errMsg || "request:fail"
                    }));
                  }
                });
              });
            }));
          case 5:
          case "end":
            return _context71.stop();
        }
      }
    }, _callee71, this);
  }));
  return _sn.apply(this, arguments);
}
var rn = [{
  rule: /fc_function_not_found|FUNCTION_NOT_FOUND/,
  content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间",
  mode: "append"
}];
var on = /[\\^$.*+?()[\]{}|]/g,
  an = RegExp(on.source);
function cn(e, t, n) {
  return e.replace(new RegExp((s = t) && an.test(s) ? s.replace(on, "\\$&") : s, "g"), n);
  var s;
}
var un = "none",
  ln = "request",
  hn = "response",
  dn = "both",
  pn = {
    code: 2e4,
    message: "System error"
  },
  fn = {
    code: 20101,
    message: "Invalid client"
  },
  gn = {
    code: 20102,
    message: "Get encrypt key failed"
  },
  mn = {
    10001: "Secure network is not supported on current playground or unimpsdk",
    10003: "Config missing in current app. If the problem pesist, please contact DCloud.",
    10009: "Encrypt payload failed",
    10010: "Decrypt response failed"
  };
function yn(e) {
  var _ref29 = e || {},
    t = _ref29.errSubject,
    n = _ref29.subject,
    s = _ref29.errCode,
    r = _ref29.errMsg,
    i = _ref29.code,
    o = _ref29.message,
    a = _ref29.cause;
  return new re({
    subject: t || n || "uni-secure-network",
    code: s || i || pn.code,
    message: r || o,
    cause: a
  });
}
var _n = /*#__PURE__*/function () {
  function _n() {
    var _ref30 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      e = _ref30.secretType,
      t = _ref30.uniCloudIns;
    (0, _classCallCheck2.default)(this, _n);
    this.clientType = "", this.secretType = e || un, this.uniCloudIns = t;
    var _this$uniCloudIns$con = this.uniCloudIns.config,
      n = _this$uniCloudIns$con.provider,
      s = _this$uniCloudIns$con.spaceId;
    var r;
    this.provider = n, this.spaceId = s, this.scopedGlobalCache = (r = this.uniCloudIns, U("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", r.config.spaceId)));
  }
  (0, _createClass2.default)(_n, [{
    key: "getSystemInfo",
    value: function getSystemInfo() {
      return this._systemInfo || (this._systemInfo = le()), this._systemInfo;
    }
  }, {
    key: "appId",
    get: function get() {
      return this.getSystemInfo().appId;
    }
  }, {
    key: "deviceId",
    get: function get() {
      return this.getSystemInfo().deviceId;
    }
  }, {
    key: "encryptData",
    value: function () {
      var _encryptData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee48(e) {
        return _regenerator.default.wrap(function _callee48$(_context48) {
          while (1) {
            switch (_context48.prev = _context48.next) {
              case 0:
                return _context48.abrupt("return", this.secretType === un ? e : this.platformEncryptData(e));
              case 1:
              case "end":
                return _context48.stop();
            }
          }
        }, _callee48, this);
      }));
      function encryptData(_x46) {
        return _encryptData.apply(this, arguments);
      }
      return encryptData;
    }()
  }, {
    key: "decryptResult",
    value: function () {
      var _decryptResult = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee49(e) {
        var _ref31, t, n, s;
        return _regenerator.default.wrap(function _callee49$(_context49) {
          while (1) {
            switch (_context49.prev = _context49.next) {
              case 0:
                if (!(this.secretType === un)) {
                  _context49.next = 2;
                  break;
                }
                return _context49.abrupt("return", e);
              case 2:
                _ref31 = e || {}, t = _ref31.errCode, n = _ref31.errMsg, s = _ref31.content;
                return _context49.abrupt("return", t || !s ? e : this.secretType === ln ? s : this.platformDecryptResult(e));
              case 4:
              case "end":
                return _context49.stop();
            }
          }
        }, _callee49, this);
      }));
      function decryptResult(_x47) {
        return _decryptResult.apply(this, arguments);
      }
      return decryptResult;
    }()
  }, {
    key: "wrapVerifyClientCallFunction",
    value: function wrapVerifyClientCallFunction(e) {
      var t = this;
      return /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee50() {
        var _ref33,
          n,
          _ref33$data,
          s,
          r,
          _args50 = arguments;
        return _regenerator.default.wrap(function _callee50$(_context50) {
          while (1) {
            switch (_context50.prev = _context50.next) {
              case 0:
                _ref33 = _args50.length > 0 && _args50[0] !== undefined ? _args50[0] : {}, n = _ref33.name, _ref33$data = _ref33.data, s = _ref33$data === void 0 ? {} : _ref33$data;
                _context50.next = 3;
                return t.prepare();
              case 3:
                _context50.next = 5;
                return t.platformGetSignOption();
              case 5:
                (s = JSON.parse(JSON.stringify(s)))._uniCloudOptions = _context50.sent;
                _context50.next = 8;
                return e({
                  name: n,
                  data: s
                });
              case 8:
                r = _context50.sent;
                _context50.t0 = t.isClientKeyNotFound(r);
                if (!_context50.t0) {
                  _context50.next = 19;
                  break;
                }
                _context50.next = 13;
                return t.prepare({
                  forceUpdate: !0
                });
              case 13:
                _context50.next = 15;
                return t.platformGetSignOption();
              case 15:
                s._uniCloudOptions = _context50.sent;
                _context50.next = 18;
                return e({
                  name: n,
                  data: s
                });
              case 18:
                r = _context50.sent;
              case 19:
                return _context50.abrupt("return", r);
              case 20:
              case "end":
                return _context50.stop();
            }
          }
        }, _callee50);
      }));
    }
  }, {
    key: "wrapEncryptDataCallFunction",
    value: function wrapEncryptDataCallFunction(e) {
      var t = this;
      return /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee51() {
        var _ref35,
          n,
          _ref35$data,
          s,
          r,
          i,
          _r6,
          _args51 = arguments;
        return _regenerator.default.wrap(function _callee51$(_context51) {
          while (1) {
            switch (_context51.prev = _context51.next) {
              case 0:
                _ref35 = _args51.length > 0 && _args51[0] !== undefined ? _args51[0] : {}, n = _ref35.name, _ref35$data = _ref35.data, s = _ref35$data === void 0 ? {} : _ref35$data;
                _context51.next = 3;
                return t.prepare();
              case 3:
                _context51.next = 5;
                return t.encryptData(s);
              case 5:
                r = _context51.sent;
                _context51.next = 8;
                return e({
                  name: n,
                  data: r
                });
              case 8:
                i = _context51.sent;
                if (!t.isClientKeyNotFound(i)) {
                  _context51.next = 18;
                  break;
                }
                _context51.next = 12;
                return t.prepare({
                  forceUpdate: !0
                });
              case 12:
                _context51.next = 14;
                return t.encryptData(s);
              case 14:
                _r6 = _context51.sent;
                _context51.next = 17;
                return e({
                  name: n,
                  data: _r6
                });
              case 17:
                i = _context51.sent;
              case 18:
                _context51.next = 20;
                return t.decryptResult(i.result);
              case 20:
                i.result = _context51.sent;
                return _context51.abrupt("return", i);
              case 22:
              case "end":
                return _context51.stop();
            }
          }
        }, _callee51);
      }));
    }
  }]);
  return _n;
}();
/*! MIT License. Copyright 2015-2018 Richard Moore <me@ricmoo.com>. See LICENSE.txt. */
function wn(e) {
  return parseInt(e) === e;
}
function vn(e) {
  if (!wn(e.length)) return !1;
  for (var t = 0; t < e.length; t++) {
    if (!wn(e[t]) || e[t] < 0 || e[t] > 255) return !1;
  }
  return !0;
}
function In(e, t) {
  if (e.buffer && "Uint8Array" === e.name) return t && (e = e.slice ? e.slice() : Array.prototype.slice.call(e)), e;
  if (Array.isArray(e)) {
    if (!vn(e)) throw new Error("Array contains invalid value: " + e);
    return new Uint8Array(e);
  }
  if (wn(e.length) && vn(e)) return new Uint8Array(e);
  throw new Error("unsupported array-like object");
}
function Sn(e) {
  return new Uint8Array(e);
}
function bn(e, t, n, s, r) {
  null == s && null == r || (e = e.slice ? e.slice(s, r) : Array.prototype.slice.call(e, s, r)), t.set(e, n);
}
var kn,
  An = {
    toBytes: function toBytes(e) {
      var t = [],
        n = 0;
      for (e = encodeURI(e); n < e.length;) {
        var s = e.charCodeAt(n++);
        37 === s ? (t.push(parseInt(e.substr(n, 2), 16)), n += 2) : t.push(s);
      }
      return In(t);
    },
    fromBytes: function fromBytes(e) {
      for (var t = [], n = 0; n < e.length;) {
        var s = e[n];
        s < 128 ? (t.push(String.fromCharCode(s)), n++) : s > 191 && s < 224 ? (t.push(String.fromCharCode((31 & s) << 6 | 63 & e[n + 1])), n += 2) : (t.push(String.fromCharCode((15 & s) << 12 | (63 & e[n + 1]) << 6 | 63 & e[n + 2])), n += 3);
      }
      return t.join("");
    }
  },
  Tn = (kn = "0123456789abcdef", {
    toBytes: function toBytes(e) {
      for (var t = [], n = 0; n < e.length; n += 2) {
        t.push(parseInt(e.substr(n, 2), 16));
      }
      return t;
    },
    fromBytes: function fromBytes(e) {
      for (var t = [], n = 0; n < e.length; n++) {
        var s = e[n];
        t.push(kn[(240 & s) >> 4] + kn[15 & s]);
      }
      return t.join("");
    }
  }),
  Cn = {
    16: 10,
    24: 12,
    32: 14
  },
  Pn = [1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145],
  On = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22],
  En = [82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125],
  xn = [3328402341, 4168907908, 4000806809, 4135287693, 4294111757, 3597364157, 3731845041, 2445657428, 1613770832, 33620227, 3462883241, 1445669757, 3892248089, 3050821474, 1303096294, 3967186586, 2412431941, 528646813, 2311702848, 4202528135, 4026202645, 2992200171, 2387036105, 4226871307, 1101901292, 3017069671, 1604494077, 1169141738, 597466303, 1403299063, 3832705686, 2613100635, 1974974402, 3791519004, 1033081774, 1277568618, 1815492186, 2118074177, 4126668546, 2211236943, 1748251740, 1369810420, 3521504564, 4193382664, 3799085459, 2883115123, 1647391059, 706024767, 134480908, 2512897874, 1176707941, 2646852446, 806885416, 932615841, 168101135, 798661301, 235341577, 605164086, 461406363, 3756188221, 3454790438, 1311188841, 2142417613, 3933566367, 302582043, 495158174, 1479289972, 874125870, 907746093, 3698224818, 3025820398, 1537253627, 2756858614, 1983593293, 3084310113, 2108928974, 1378429307, 3722699582, 1580150641, 327451799, 2790478837, 3117535592, 0, 3253595436, 1075847264, 3825007647, 2041688520, 3059440621, 3563743934, 2378943302, 1740553945, 1916352843, 2487896798, 2555137236, 2958579944, 2244988746, 3151024235, 3320835882, 1336584933, 3992714006, 2252555205, 2588757463, 1714631509, 293963156, 2319795663, 3925473552, 67240454, 4269768577, 2689618160, 2017213508, 631218106, 1269344483, 2723238387, 1571005438, 2151694528, 93294474, 1066570413, 563977660, 1882732616, 4059428100, 1673313503, 2008463041, 2950355573, 1109467491, 537923632, 3858759450, 4260623118, 3218264685, 2177748300, 403442708, 638784309, 3287084079, 3193921505, 899127202, 2286175436, 773265209, 2479146071, 1437050866, 4236148354, 2050833735, 3362022572, 3126681063, 840505643, 3866325909, 3227541664, 427917720, 2655997905, 2749160575, 1143087718, 1412049534, 999329963, 193497219, 2353415882, 3354324521, 1807268051, 672404540, 2816401017, 3160301282, 369822493, 2916866934, 3688947771, 1681011286, 1949973070, 336202270, 2454276571, 201721354, 1210328172, 3093060836, 2680341085, 3184776046, 1135389935, 3294782118, 965841320, 831886756, 3554993207, 4068047243, 3588745010, 2345191491, 1849112409, 3664604599, 26054028, 2983581028, 2622377682, 1235855840, 3630984372, 2891339514, 4092916743, 3488279077, 3395642799, 4101667470, 1202630377, 268961816, 1874508501, 4034427016, 1243948399, 1546530418, 941366308, 1470539505, 1941222599, 2546386513, 3421038627, 2715671932, 3899946140, 1042226977, 2521517021, 1639824860, 227249030, 260737669, 3765465232, 2084453954, 1907733956, 3429263018, 2420656344, 100860677, 4160157185, 470683154, 3261161891, 1781871967, 2924959737, 1773779408, 394692241, 2579611992, 974986535, 664706745, 3655459128, 3958962195, 731420851, 571543859, 3530123707, 2849626480, 126783113, 865375399, 765172662, 1008606754, 361203602, 3387549984, 2278477385, 2857719295, 1344809080, 2782912378, 59542671, 1503764984, 160008576, 437062935, 1707065306, 3622233649, 2218934982, 3496503480, 2185314755, 697932208, 1512910199, 504303377, 2075177163, 2824099068, 1841019862, 739644986],
  Ln = [2781242211, 2230877308, 2582542199, 2381740923, 234877682, 3184946027, 2984144751, 1418839493, 1348481072, 50462977, 2848876391, 2102799147, 434634494, 1656084439, 3863849899, 2599188086, 1167051466, 2636087938, 1082771913, 2281340285, 368048890, 3954334041, 3381544775, 201060592, 3963727277, 1739838676, 4250903202, 3930435503, 3206782108, 4149453988, 2531553906, 1536934080, 3262494647, 484572669, 2923271059, 1783375398, 1517041206, 1098792767, 49674231, 1334037708, 1550332980, 4098991525, 886171109, 150598129, 2481090929, 1940642008, 1398944049, 1059722517, 201851908, 1385547719, 1699095331, 1587397571, 674240536, 2704774806, 252314885, 3039795866, 151914247, 908333586, 2602270848, 1038082786, 651029483, 1766729511, 3447698098, 2682942837, 454166793, 2652734339, 1951935532, 775166490, 758520603, 3000790638, 4004797018, 4217086112, 4137964114, 1299594043, 1639438038, 3464344499, 2068982057, 1054729187, 1901997871, 2534638724, 4121318227, 1757008337, 0, 750906861, 1614815264, 535035132, 3363418545, 3988151131, 3201591914, 1183697867, 3647454910, 1265776953, 3734260298, 3566750796, 3903871064, 1250283471, 1807470800, 717615087, 3847203498, 384695291, 3313910595, 3617213773, 1432761139, 2484176261, 3481945413, 283769337, 100925954, 2180939647, 4037038160, 1148730428, 3123027871, 3813386408, 4087501137, 4267549603, 3229630528, 2315620239, 2906624658, 3156319645, 1215313976, 82966005, 3747855548, 3245848246, 1974459098, 1665278241, 807407632, 451280895, 251524083, 1841287890, 1283575245, 337120268, 891687699, 801369324, 3787349855, 2721421207, 3431482436, 959321879, 1469301956, 4065699751, 2197585534, 1199193405, 2898814052, 3887750493, 724703513, 2514908019, 2696962144, 2551808385, 3516813135, 2141445340, 1715741218, 2119445034, 2872807568, 2198571144, 3398190662, 700968686, 3547052216, 1009259540, 2041044702, 3803995742, 487983883, 1991105499, 1004265696, 1449407026, 1316239930, 504629770, 3683797321, 168560134, 1816667172, 3837287516, 1570751170, 1857934291, 4014189740, 2797888098, 2822345105, 2754712981, 936633572, 2347923833, 852879335, 1133234376, 1500395319, 3084545389, 2348912013, 1689376213, 3533459022, 3762923945, 3034082412, 4205598294, 133428468, 634383082, 2949277029, 2398386810, 3913789102, 403703816, 3580869306, 2297460856, 1867130149, 1918643758, 607656988, 4049053350, 3346248884, 1368901318, 600565992, 2090982877, 2632479860, 557719327, 3717614411, 3697393085, 2249034635, 2232388234, 2430627952, 1115438654, 3295786421, 2865522278, 3633334344, 84280067, 33027830, 303828494, 2747425121, 1600795957, 4188952407, 3496589753, 2434238086, 1486471617, 658119965, 3106381470, 953803233, 334231800, 3005978776, 857870609, 3151128937, 1890179545, 2298973838, 2805175444, 3056442267, 574365214, 2450884487, 550103529, 1233637070, 4289353045, 2018519080, 2057691103, 2399374476, 4166623649, 2148108681, 387583245, 3664101311, 836232934, 3330556482, 3100665960, 3280093505, 2955516313, 2002398509, 287182607, 3413881008, 4238890068, 3597515707, 975967766],
  Un = [1671808611, 2089089148, 2006576759, 2072901243, 4061003762, 1807603307, 1873927791, 3310653893, 810573872, 16974337, 1739181671, 729634347, 4263110654, 3613570519, 2883997099, 1989864566, 3393556426, 2191335298, 3376449993, 2106063485, 4195741690, 1508618841, 1204391495, 4027317232, 2917941677, 3563566036, 2734514082, 2951366063, 2629772188, 2767672228, 1922491506, 3227229120, 3082974647, 4246528509, 2477669779, 644500518, 911895606, 1061256767, 4144166391, 3427763148, 878471220, 2784252325, 3845444069, 4043897329, 1905517169, 3631459288, 827548209, 356461077, 67897348, 3344078279, 593839651, 3277757891, 405286936, 2527147926, 84871685, 2595565466, 118033927, 305538066, 2157648768, 3795705826, 3945188843, 661212711, 2999812018, 1973414517, 152769033, 2208177539, 745822252, 439235610, 455947803, 1857215598, 1525593178, 2700827552, 1391895634, 994932283, 3596728278, 3016654259, 695947817, 3812548067, 795958831, 2224493444, 1408607827, 3513301457, 0, 3979133421, 543178784, 4229948412, 2982705585, 1542305371, 1790891114, 3410398667, 3201918910, 961245753, 1256100938, 1289001036, 1491644504, 3477767631, 3496721360, 4012557807, 2867154858, 4212583931, 1137018435, 1305975373, 861234739, 2241073541, 1171229253, 4178635257, 33948674, 2139225727, 1357946960, 1011120188, 2679776671, 2833468328, 1374921297, 2751356323, 1086357568, 2408187279, 2460827538, 2646352285, 944271416, 4110742005, 3168756668, 3066132406, 3665145818, 560153121, 271589392, 4279952895, 4077846003, 3530407890, 3444343245, 202643468, 322250259, 3962553324, 1608629855, 2543990167, 1154254916, 389623319, 3294073796, 2817676711, 2122513534, 1028094525, 1689045092, 1575467613, 422261273, 1939203699, 1621147744, 2174228865, 1339137615, 3699352540, 577127458, 712922154, 2427141008, 2290289544, 1187679302, 3995715566, 3100863416, 339486740, 3732514782, 1591917662, 186455563, 3681988059, 3762019296, 844522546, 978220090, 169743370, 1239126601, 101321734, 611076132, 1558493276, 3260915650, 3547250131, 2901361580, 1655096418, 2443721105, 2510565781, 3828863972, 2039214713, 3878868455, 3359869896, 928607799, 1840765549, 2374762893, 3580146133, 1322425422, 2850048425, 1823791212, 1459268694, 4094161908, 3928346602, 1706019429, 2056189050, 2934523822, 135794696, 3134549946, 2022240376, 628050469, 779246638, 472135708, 2800834470, 3032970164, 3327236038, 3894660072, 3715932637, 1956440180, 522272287, 1272813131, 3185336765, 2340818315, 2323976074, 1888542832, 1044544574, 3049550261, 1722469478, 1222152264, 50660867, 4127324150, 236067854, 1638122081, 895445557, 1475980887, 3117443513, 2257655686, 3243809217, 489110045, 2662934430, 3778599393, 4162055160, 2561878936, 288563729, 1773916777, 3648039385, 2391345038, 2493985684, 2612407707, 505560094, 2274497927, 3911240169, 3460925390, 1442818645, 678973480, 3749357023, 2358182796, 2717407649, 2306869641, 219617805, 3218761151, 3862026214, 1120306242, 1756942440, 1103331905, 2578459033, 762796589, 252780047, 2966125488, 1425844308, 3151392187, 372911126],
  Rn = [1667474886, 2088535288, 2004326894, 2071694838, 4075949567, 1802223062, 1869591006, 3318043793, 808472672, 16843522, 1734846926, 724270422, 4278065639, 3621216949, 2880169549, 1987484396, 3402253711, 2189597983, 3385409673, 2105378810, 4210693615, 1499065266, 1195886990, 4042263547, 2913856577, 3570689971, 2728590687, 2947541573, 2627518243, 2762274643, 1920112356, 3233831835, 3082273397, 4261223649, 2475929149, 640051788, 909531756, 1061110142, 4160160501, 3435941763, 875846760, 2779116625, 3857003729, 4059105529, 1903268834, 3638064043, 825316194, 353713962, 67374088, 3351728789, 589522246, 3284360861, 404236336, 2526454071, 84217610, 2593830191, 117901582, 303183396, 2155911963, 3806477791, 3958056653, 656894286, 2998062463, 1970642922, 151591698, 2206440989, 741110872, 437923380, 454765878, 1852748508, 1515908788, 2694904667, 1381168804, 993742198, 3604373943, 3014905469, 690584402, 3823320797, 791638366, 2223281939, 1398011302, 3520161977, 0, 3991743681, 538992704, 4244381667, 2981218425, 1532751286, 1785380564, 3419096717, 3200178535, 960056178, 1246420628, 1280103576, 1482221744, 3486468741, 3503319995, 4025428677, 2863326543, 4227536621, 1128514950, 1296947098, 859002214, 2240123921, 1162203018, 4193849577, 33687044, 2139062782, 1347481760, 1010582648, 2678045221, 2829640523, 1364325282, 2745433693, 1077985408, 2408548869, 2459086143, 2644360225, 943212656, 4126475505, 3166494563, 3065430391, 3671750063, 555836226, 269496352, 4294908645, 4092792573, 3537006015, 3452783745, 202118168, 320025894, 3974901699, 1600119230, 2543297077, 1145359496, 387397934, 3301201811, 2812801621, 2122220284, 1027426170, 1684319432, 1566435258, 421079858, 1936954854, 1616945344, 2172753945, 1330631070, 3705438115, 572679748, 707427924, 2425400123, 2290647819, 1179044492, 4008585671, 3099120491, 336870440, 3739122087, 1583276732, 185277718, 3688593069, 3772791771, 842159716, 976899700, 168435220, 1229577106, 101059084, 606366792, 1549591736, 3267517855, 3553849021, 2897014595, 1650632388, 2442242105, 2509612081, 3840161747, 2038008818, 3890688725, 3368567691, 926374254, 1835907034, 2374863873, 3587531953, 1313788572, 2846482505, 1819063512, 1448540844, 4109633523, 3941213647, 1701162954, 2054852340, 2930698567, 134748176, 3132806511, 2021165296, 623210314, 774795868, 471606328, 2795958615, 3031746419, 3334885783, 3907527627, 3722280097, 1953799400, 522133822, 1263263126, 3183336545, 2341176845, 2324333839, 1886425312, 1044267644, 3048588401, 1718004428, 1212733584, 50529542, 4143317495, 235803164, 1633788866, 892690282, 1465383342, 3115962473, 2256965911, 3250673817, 488449850, 2661202215, 3789633753, 4177007595, 2560144171, 286339874, 1768537042, 3654906025, 2391705863, 2492770099, 2610673197, 505291324, 2273808917, 3924369609, 3469625735, 1431699370, 673740880, 3755965093, 2358021891, 2711746649, 2307489801, 218961690, 3217021541, 3873845719, 1111672452, 1751693520, 1094828930, 2576986153, 757954394, 252645662, 2964376443, 1414855848, 3149649517, 370555436],
  Nn = [1374988112, 2118214995, 437757123, 975658646, 1001089995, 530400753, 2902087851, 1273168787, 540080725, 2910219766, 2295101073, 4110568485, 1340463100, 3307916247, 641025152, 3043140495, 3736164937, 632953703, 1172967064, 1576976609, 3274667266, 2169303058, 2370213795, 1809054150, 59727847, 361929877, 3211623147, 2505202138, 3569255213, 1484005843, 1239443753, 2395588676, 1975683434, 4102977912, 2572697195, 666464733, 3202437046, 4035489047, 3374361702, 2110667444, 1675577880, 3843699074, 2538681184, 1649639237, 2976151520, 3144396420, 4269907996, 4178062228, 1883793496, 2403728665, 2497604743, 1383856311, 2876494627, 1917518562, 3810496343, 1716890410, 3001755655, 800440835, 2261089178, 3543599269, 807962610, 599762354, 33778362, 3977675356, 2328828971, 2809771154, 4077384432, 1315562145, 1708848333, 101039829, 3509871135, 3299278474, 875451293, 2733856160, 92987698, 2767645557, 193195065, 1080094634, 1584504582, 3178106961, 1042385657, 2531067453, 3711829422, 1306967366, 2438237621, 1908694277, 67556463, 1615861247, 429456164, 3602770327, 2302690252, 1742315127, 2968011453, 126454664, 3877198648, 2043211483, 2709260871, 2084704233, 4169408201, 0, 159417987, 841739592, 504459436, 1817866830, 4245618683, 260388950, 1034867998, 908933415, 168810852, 1750902305, 2606453969, 607530554, 202008497, 2472011535, 3035535058, 463180190, 2160117071, 1641816226, 1517767529, 470948374, 3801332234, 3231722213, 1008918595, 303765277, 235474187, 4069246893, 766945465, 337553864, 1475418501, 2943682380, 4003061179, 2743034109, 4144047775, 1551037884, 1147550661, 1543208500, 2336434550, 3408119516, 3069049960, 3102011747, 3610369226, 1113818384, 328671808, 2227573024, 2236228733, 3535486456, 2935566865, 3341394285, 496906059, 3702665459, 226906860, 2009195472, 733156972, 2842737049, 294930682, 1206477858, 2835123396, 2700099354, 1451044056, 573804783, 2269728455, 3644379585, 2362090238, 2564033334, 2801107407, 2776292904, 3669462566, 1068351396, 742039012, 1350078989, 1784663195, 1417561698, 4136440770, 2430122216, 775550814, 2193862645, 2673705150, 1775276924, 1876241833, 3475313331, 3366754619, 270040487, 3902563182, 3678124923, 3441850377, 1851332852, 3969562369, 2203032232, 3868552805, 2868897406, 566021896, 4011190502, 3135740889, 1248802510, 3936291284, 699432150, 832877231, 708780849, 3332740144, 899835584, 1951317047, 4236429990, 3767586992, 866637845, 4043610186, 1106041591, 2144161806, 395441711, 1984812685, 1139781709, 3433712980, 3835036895, 2664543715, 1282050075, 3240894392, 1181045119, 2640243204, 25965917, 4203181171, 4211818798, 3009879386, 2463879762, 3910161971, 1842759443, 2597806476, 933301370, 1509430414, 3943906441, 3467192302, 3076639029, 3776767469, 2051518780, 2631065433, 1441952575, 404016761, 1942435775, 1408749034, 1610459739, 3745345300, 2017778566, 3400528769, 3110650942, 941896748, 3265478751, 371049330, 3168937228, 675039627, 4279080257, 967311729, 135050206, 3635733660, 1683407248, 2076935265, 3576870512, 1215061108, 3501741890],
  Dn = [1347548327, 1400783205, 3273267108, 2520393566, 3409685355, 4045380933, 2880240216, 2471224067, 1428173050, 4138563181, 2441661558, 636813900, 4233094615, 3620022987, 2149987652, 2411029155, 1239331162, 1730525723, 2554718734, 3781033664, 46346101, 310463728, 2743944855, 3328955385, 3875770207, 2501218972, 3955191162, 3667219033, 768917123, 3545789473, 692707433, 1150208456, 1786102409, 2029293177, 1805211710, 3710368113, 3065962831, 401639597, 1724457132, 3028143674, 409198410, 2196052529, 1620529459, 1164071807, 3769721975, 2226875310, 486441376, 2499348523, 1483753576, 428819965, 2274680428, 3075636216, 598438867, 3799141122, 1474502543, 711349675, 129166120, 53458370, 2592523643, 2782082824, 4063242375, 2988687269, 3120694122, 1559041666, 730517276, 2460449204, 4042459122, 2706270690, 3446004468, 3573941694, 533804130, 2328143614, 2637442643, 2695033685, 839224033, 1973745387, 957055980, 2856345839, 106852767, 1371368976, 4181598602, 1033297158, 2933734917, 1179510461, 3046200461, 91341917, 1862534868, 4284502037, 605657339, 2547432937, 3431546947, 2003294622, 3182487618, 2282195339, 954669403, 3682191598, 1201765386, 3917234703, 3388507166, 0, 2198438022, 1211247597, 2887651696, 1315723890, 4227665663, 1443857720, 507358933, 657861945, 1678381017, 560487590, 3516619604, 975451694, 2970356327, 261314535, 3535072918, 2652609425, 1333838021, 2724322336, 1767536459, 370938394, 182621114, 3854606378, 1128014560, 487725847, 185469197, 2918353863, 3106780840, 3356761769, 2237133081, 1286567175, 3152976349, 4255350624, 2683765030, 3160175349, 3309594171, 878443390, 1988838185, 3704300486, 1756818940, 1673061617, 3403100636, 272786309, 1075025698, 545572369, 2105887268, 4174560061, 296679730, 1841768865, 1260232239, 4091327024, 3960309330, 3497509347, 1814803222, 2578018489, 4195456072, 575138148, 3299409036, 446754879, 3629546796, 4011996048, 3347532110, 3252238545, 4270639778, 915985419, 3483825537, 681933534, 651868046, 2755636671, 3828103837, 223377554, 2607439820, 1649704518, 3270937875, 3901806776, 1580087799, 4118987695, 3198115200, 2087309459, 2842678573, 3016697106, 1003007129, 2802849917, 1860738147, 2077965243, 164439672, 4100872472, 32283319, 2827177882, 1709610350, 2125135846, 136428751, 3874428392, 3652904859, 3460984630, 3572145929, 3593056380, 2939266226, 824852259, 818324884, 3224740454, 930369212, 2801566410, 2967507152, 355706840, 1257309336, 4148292826, 243256656, 790073846, 2373340630, 1296297904, 1422699085, 3756299780, 3818836405, 457992840, 3099667487, 2135319889, 77422314, 1560382517, 1945798516, 788204353, 1521706781, 1385356242, 870912086, 325965383, 2358957921, 2050466060, 2388260884, 2313884476, 4006521127, 901210569, 3990953189, 1014646705, 1503449823, 1062597235, 2031621326, 3212035895, 3931371469, 1533017514, 350174575, 2256028891, 2177544179, 1052338372, 741876788, 1606591296, 1914052035, 213705253, 2334669897, 1107234197, 1899603969, 3725069491, 2631447780, 2422494913, 1635502980, 1893020342, 1950903388, 1120974935],
  Mn = [2807058932, 1699970625, 2764249623, 1586903591, 1808481195, 1173430173, 1487645946, 59984867, 4199882800, 1844882806, 1989249228, 1277555970, 3623636965, 3419915562, 1149249077, 2744104290, 1514790577, 459744698, 244860394, 3235995134, 1963115311, 4027744588, 2544078150, 4190530515, 1608975247, 2627016082, 2062270317, 1507497298, 2200818878, 567498868, 1764313568, 3359936201, 2305455554, 2037970062, 1047239e3, 1910319033, 1337376481, 2904027272, 2892417312, 984907214, 1243112415, 830661914, 861968209, 2135253587, 2011214180, 2927934315, 2686254721, 731183368, 1750626376, 4246310725, 1820824798, 4172763771, 3542330227, 48394827, 2404901663, 2871682645, 671593195, 3254988725, 2073724613, 145085239, 2280796200, 2779915199, 1790575107, 2187128086, 472615631, 3029510009, 4075877127, 3802222185, 4107101658, 3201631749, 1646252340, 4270507174, 1402811438, 1436590835, 3778151818, 3950355702, 3963161475, 4020912224, 2667994737, 273792366, 2331590177, 104699613, 95345982, 3175501286, 2377486676, 1560637892, 3564045318, 369057872, 4213447064, 3919042237, 1137477952, 2658625497, 1119727848, 2340947849, 1530455833, 4007360968, 172466556, 266959938, 516552836, 0, 2256734592, 3980931627, 1890328081, 1917742170, 4294704398, 945164165, 3575528878, 958871085, 3647212047, 2787207260, 1423022939, 775562294, 1739656202, 3876557655, 2530391278, 2443058075, 3310321856, 547512796, 1265195639, 437656594, 3121275539, 719700128, 3762502690, 387781147, 218828297, 3350065803, 2830708150, 2848461854, 428169201, 122466165, 3720081049, 1627235199, 648017665, 4122762354, 1002783846, 2117360635, 695634755, 3336358691, 4234721005, 4049844452, 3704280881, 2232435299, 574624663, 287343814, 612205898, 1039717051, 840019705, 2708326185, 793451934, 821288114, 1391201670, 3822090177, 376187827, 3113855344, 1224348052, 1679968233, 2361698556, 1058709744, 752375421, 2431590963, 1321699145, 3519142200, 2734591178, 188127444, 2177869557, 3727205754, 2384911031, 3215212461, 2648976442, 2450346104, 3432737375, 1180849278, 331544205, 3102249176, 4150144569, 2952102595, 2159976285, 2474404304, 766078933, 313773861, 2570832044, 2108100632, 1668212892, 3145456443, 2013908262, 418672217, 3070356634, 2594734927, 1852171925, 3867060991, 3473416636, 3907448597, 2614737639, 919489135, 164948639, 2094410160, 2997825956, 590424639, 2486224549, 1723872674, 3157750862, 3399941250, 3501252752, 3625268135, 2555048196, 3673637356, 1343127501, 4130281361, 3599595085, 2957853679, 1297403050, 81781910, 3051593425, 2283490410, 532201772, 1367295589, 3926170974, 895287692, 1953757831, 1093597963, 492483431, 3528626907, 1446242576, 1192455638, 1636604631, 209336225, 344873464, 1015671571, 669961897, 3375740769, 3857572124, 2973530695, 3747192018, 1933530610, 3464042516, 935293895, 3454686199, 2858115069, 1863638845, 3683022916, 4085369519, 3292445032, 875313188, 1080017571, 3279033885, 621591778, 1233856572, 2504130317, 24197544, 3017672716, 3835484340, 3247465558, 2220981195, 3060847922, 1551124588, 1463996600],
  qn = [4104605777, 1097159550, 396673818, 660510266, 2875968315, 2638606623, 4200115116, 3808662347, 821712160, 1986918061, 3430322568, 38544885, 3856137295, 718002117, 893681702, 1654886325, 2975484382, 3122358053, 3926825029, 4274053469, 796197571, 1290801793, 1184342925, 3556361835, 2405426947, 2459735317, 1836772287, 1381620373, 3196267988, 1948373848, 3764988233, 3385345166, 3263785589, 2390325492, 1480485785, 3111247143, 3780097726, 2293045232, 548169417, 3459953789, 3746175075, 439452389, 1362321559, 1400849762, 1685577905, 1806599355, 2174754046, 137073913, 1214797936, 1174215055, 3731654548, 2079897426, 1943217067, 1258480242, 529487843, 1437280870, 3945269170, 3049390895, 3313212038, 923313619, 679998e3, 3215307299, 57326082, 377642221, 3474729866, 2041877159, 133361907, 1776460110, 3673476453, 96392454, 878845905, 2801699524, 777231668, 4082475170, 2330014213, 4142626212, 2213296395, 1626319424, 1906247262, 1846563261, 562755902, 3708173718, 1040559837, 3871163981, 1418573201, 3294430577, 114585348, 1343618912, 2566595609, 3186202582, 1078185097, 3651041127, 3896688048, 2307622919, 425408743, 3371096953, 2081048481, 1108339068, 2216610296, 0, 2156299017, 736970802, 292596766, 1517440620, 251657213, 2235061775, 2933202493, 758720310, 265905162, 1554391400, 1532285339, 908999204, 174567692, 1474760595, 4002861748, 2610011675, 3234156416, 3693126241, 2001430874, 303699484, 2478443234, 2687165888, 585122620, 454499602, 151849742, 2345119218, 3064510765, 514443284, 4044981591, 1963412655, 2581445614, 2137062819, 19308535, 1928707164, 1715193156, 4219352155, 1126790795, 600235211, 3992742070, 3841024952, 836553431, 1669664834, 2535604243, 3323011204, 1243905413, 3141400786, 4180808110, 698445255, 2653899549, 2989552604, 2253581325, 3252932727, 3004591147, 1891211689, 2487810577, 3915653703, 4237083816, 4030667424, 2100090966, 865136418, 1229899655, 953270745, 3399679628, 3557504664, 4118925222, 2061379749, 3079546586, 2915017791, 983426092, 2022837584, 1607244650, 2118541908, 2366882550, 3635996816, 972512814, 3283088770, 1568718495, 3499326569, 3576539503, 621982671, 2895723464, 410887952, 2623762152, 1002142683, 645401037, 1494807662, 2595684844, 1335535747, 2507040230, 4293295786, 3167684641, 367585007, 3885750714, 1865862730, 2668221674, 2960971305, 2763173681, 1059270954, 2777952454, 2724642869, 1320957812, 2194319100, 2429595872, 2815956275, 77089521, 3973773121, 3444575871, 2448830231, 1305906550, 4021308739, 2857194700, 2516901860, 3518358430, 1787304780, 740276417, 1699839814, 1592394909, 2352307457, 2272556026, 188821243, 1729977011, 3687994002, 274084841, 3594982253, 3613494426, 2701949495, 4162096729, 322734571, 2837966542, 1640576439, 484830689, 1202797690, 3537852828, 4067639125, 349075736, 3342319475, 4157467219, 4255800159, 1030690015, 1155237496, 2951971274, 1757691577, 607398968, 2738905026, 499347990, 3794078908, 1011452712, 227885567, 2818666809, 213114376, 3034881240, 1455525988, 3414450555, 850817237, 1817998408, 3092726480],
  Fn = [0, 235474187, 470948374, 303765277, 941896748, 908933415, 607530554, 708780849, 1883793496, 2118214995, 1817866830, 1649639237, 1215061108, 1181045119, 1417561698, 1517767529, 3767586992, 4003061179, 4236429990, 4069246893, 3635733660, 3602770327, 3299278474, 3400528769, 2430122216, 2664543715, 2362090238, 2193862645, 2835123396, 2801107407, 3035535058, 3135740889, 3678124923, 3576870512, 3341394285, 3374361702, 3810496343, 3977675356, 4279080257, 4043610186, 2876494627, 2776292904, 3076639029, 3110650942, 2472011535, 2640243204, 2403728665, 2169303058, 1001089995, 899835584, 666464733, 699432150, 59727847, 226906860, 530400753, 294930682, 1273168787, 1172967064, 1475418501, 1509430414, 1942435775, 2110667444, 1876241833, 1641816226, 2910219766, 2743034109, 2976151520, 3211623147, 2505202138, 2606453969, 2302690252, 2269728455, 3711829422, 3543599269, 3240894392, 3475313331, 3843699074, 3943906441, 4178062228, 4144047775, 1306967366, 1139781709, 1374988112, 1610459739, 1975683434, 2076935265, 1775276924, 1742315127, 1034867998, 866637845, 566021896, 800440835, 92987698, 193195065, 429456164, 395441711, 1984812685, 2017778566, 1784663195, 1683407248, 1315562145, 1080094634, 1383856311, 1551037884, 101039829, 135050206, 437757123, 337553864, 1042385657, 807962610, 573804783, 742039012, 2531067453, 2564033334, 2328828971, 2227573024, 2935566865, 2700099354, 3001755655, 3168937228, 3868552805, 3902563182, 4203181171, 4102977912, 3736164937, 3501741890, 3265478751, 3433712980, 1106041591, 1340463100, 1576976609, 1408749034, 2043211483, 2009195472, 1708848333, 1809054150, 832877231, 1068351396, 766945465, 599762354, 159417987, 126454664, 361929877, 463180190, 2709260871, 2943682380, 3178106961, 3009879386, 2572697195, 2538681184, 2236228733, 2336434550, 3509871135, 3745345300, 3441850377, 3274667266, 3910161971, 3877198648, 4110568485, 4211818798, 2597806476, 2497604743, 2261089178, 2295101073, 2733856160, 2902087851, 3202437046, 2968011453, 3936291284, 3835036895, 4136440770, 4169408201, 3535486456, 3702665459, 3467192302, 3231722213, 2051518780, 1951317047, 1716890410, 1750902305, 1113818384, 1282050075, 1584504582, 1350078989, 168810852, 67556463, 371049330, 404016761, 841739592, 1008918595, 775550814, 540080725, 3969562369, 3801332234, 4035489047, 4269907996, 3569255213, 3669462566, 3366754619, 3332740144, 2631065433, 2463879762, 2160117071, 2395588676, 2767645557, 2868897406, 3102011747, 3069049960, 202008497, 33778362, 270040487, 504459436, 875451293, 975658646, 675039627, 641025152, 2084704233, 1917518562, 1615861247, 1851332852, 1147550661, 1248802510, 1484005843, 1451044056, 933301370, 967311729, 733156972, 632953703, 260388950, 25965917, 328671808, 496906059, 1206477858, 1239443753, 1543208500, 1441952575, 2144161806, 1908694277, 1675577880, 1842759443, 3610369226, 3644379585, 3408119516, 3307916247, 4011190502, 3776767469, 4077384432, 4245618683, 2809771154, 2842737049, 3144396420, 3043140495, 2673705150, 2438237621, 2203032232, 2370213795],
  Kn = [0, 185469197, 370938394, 487725847, 741876788, 657861945, 975451694, 824852259, 1483753576, 1400783205, 1315723890, 1164071807, 1950903388, 2135319889, 1649704518, 1767536459, 2967507152, 3152976349, 2801566410, 2918353863, 2631447780, 2547432937, 2328143614, 2177544179, 3901806776, 3818836405, 4270639778, 4118987695, 3299409036, 3483825537, 3535072918, 3652904859, 2077965243, 1893020342, 1841768865, 1724457132, 1474502543, 1559041666, 1107234197, 1257309336, 598438867, 681933534, 901210569, 1052338372, 261314535, 77422314, 428819965, 310463728, 3409685355, 3224740454, 3710368113, 3593056380, 3875770207, 3960309330, 4045380933, 4195456072, 2471224067, 2554718734, 2237133081, 2388260884, 3212035895, 3028143674, 2842678573, 2724322336, 4138563181, 4255350624, 3769721975, 3955191162, 3667219033, 3516619604, 3431546947, 3347532110, 2933734917, 2782082824, 3099667487, 3016697106, 2196052529, 2313884476, 2499348523, 2683765030, 1179510461, 1296297904, 1347548327, 1533017514, 1786102409, 1635502980, 2087309459, 2003294622, 507358933, 355706840, 136428751, 53458370, 839224033, 957055980, 605657339, 790073846, 2373340630, 2256028891, 2607439820, 2422494913, 2706270690, 2856345839, 3075636216, 3160175349, 3573941694, 3725069491, 3273267108, 3356761769, 4181598602, 4063242375, 4011996048, 3828103837, 1033297158, 915985419, 730517276, 545572369, 296679730, 446754879, 129166120, 213705253, 1709610350, 1860738147, 1945798516, 2029293177, 1239331162, 1120974935, 1606591296, 1422699085, 4148292826, 4233094615, 3781033664, 3931371469, 3682191598, 3497509347, 3446004468, 3328955385, 2939266226, 2755636671, 3106780840, 2988687269, 2198438022, 2282195339, 2501218972, 2652609425, 1201765386, 1286567175, 1371368976, 1521706781, 1805211710, 1620529459, 2105887268, 1988838185, 533804130, 350174575, 164439672, 46346101, 870912086, 954669403, 636813900, 788204353, 2358957921, 2274680428, 2592523643, 2441661558, 2695033685, 2880240216, 3065962831, 3182487618, 3572145929, 3756299780, 3270937875, 3388507166, 4174560061, 4091327024, 4006521127, 3854606378, 1014646705, 930369212, 711349675, 560487590, 272786309, 457992840, 106852767, 223377554, 1678381017, 1862534868, 1914052035, 2031621326, 1211247597, 1128014560, 1580087799, 1428173050, 32283319, 182621114, 401639597, 486441376, 768917123, 651868046, 1003007129, 818324884, 1503449823, 1385356242, 1333838021, 1150208456, 1973745387, 2125135846, 1673061617, 1756818940, 2970356327, 3120694122, 2802849917, 2887651696, 2637442643, 2520393566, 2334669897, 2149987652, 3917234703, 3799141122, 4284502037, 4100872472, 3309594171, 3460984630, 3545789473, 3629546796, 2050466060, 1899603969, 1814803222, 1730525723, 1443857720, 1560382517, 1075025698, 1260232239, 575138148, 692707433, 878443390, 1062597235, 243256656, 91341917, 409198410, 325965383, 3403100636, 3252238545, 3704300486, 3620022987, 3874428392, 3990953189, 4042459122, 4227665663, 2460449204, 2578018489, 2226875310, 2411029155, 3198115200, 3046200461, 2827177882, 2743944855],
  jn = [0, 218828297, 437656594, 387781147, 875313188, 958871085, 775562294, 590424639, 1750626376, 1699970625, 1917742170, 2135253587, 1551124588, 1367295589, 1180849278, 1265195639, 3501252752, 3720081049, 3399941250, 3350065803, 3835484340, 3919042237, 4270507174, 4085369519, 3102249176, 3051593425, 2734591178, 2952102595, 2361698556, 2177869557, 2530391278, 2614737639, 3145456443, 3060847922, 2708326185, 2892417312, 2404901663, 2187128086, 2504130317, 2555048196, 3542330227, 3727205754, 3375740769, 3292445032, 3876557655, 3926170974, 4246310725, 4027744588, 1808481195, 1723872674, 1910319033, 2094410160, 1608975247, 1391201670, 1173430173, 1224348052, 59984867, 244860394, 428169201, 344873464, 935293895, 984907214, 766078933, 547512796, 1844882806, 1627235199, 2011214180, 2062270317, 1507497298, 1423022939, 1137477952, 1321699145, 95345982, 145085239, 532201772, 313773861, 830661914, 1015671571, 731183368, 648017665, 3175501286, 2957853679, 2807058932, 2858115069, 2305455554, 2220981195, 2474404304, 2658625497, 3575528878, 3625268135, 3473416636, 3254988725, 3778151818, 3963161475, 4213447064, 4130281361, 3599595085, 3683022916, 3432737375, 3247465558, 3802222185, 4020912224, 4172763771, 4122762354, 3201631749, 3017672716, 2764249623, 2848461854, 2331590177, 2280796200, 2431590963, 2648976442, 104699613, 188127444, 472615631, 287343814, 840019705, 1058709744, 671593195, 621591778, 1852171925, 1668212892, 1953757831, 2037970062, 1514790577, 1463996600, 1080017571, 1297403050, 3673637356, 3623636965, 3235995134, 3454686199, 4007360968, 3822090177, 4107101658, 4190530515, 2997825956, 3215212461, 2830708150, 2779915199, 2256734592, 2340947849, 2627016082, 2443058075, 172466556, 122466165, 273792366, 492483431, 1047239e3, 861968209, 612205898, 695634755, 1646252340, 1863638845, 2013908262, 1963115311, 1446242576, 1530455833, 1277555970, 1093597963, 1636604631, 1820824798, 2073724613, 1989249228, 1436590835, 1487645946, 1337376481, 1119727848, 164948639, 81781910, 331544205, 516552836, 1039717051, 821288114, 669961897, 719700128, 2973530695, 3157750862, 2871682645, 2787207260, 2232435299, 2283490410, 2667994737, 2450346104, 3647212047, 3564045318, 3279033885, 3464042516, 3980931627, 3762502690, 4150144569, 4199882800, 3070356634, 3121275539, 2904027272, 2686254721, 2200818878, 2384911031, 2570832044, 2486224549, 3747192018, 3528626907, 3310321856, 3359936201, 3950355702, 3867060991, 4049844452, 4234721005, 1739656202, 1790575107, 2108100632, 1890328081, 1402811438, 1586903591, 1233856572, 1149249077, 266959938, 48394827, 369057872, 418672217, 1002783846, 919489135, 567498868, 752375421, 209336225, 24197544, 376187827, 459744698, 945164165, 895287692, 574624663, 793451934, 1679968233, 1764313568, 2117360635, 1933530610, 1343127501, 1560637892, 1243112415, 1192455638, 3704280881, 3519142200, 3336358691, 3419915562, 3907448597, 3857572124, 4075877127, 4294704398, 3029510009, 3113855344, 2927934315, 2744104290, 2159976285, 2377486676, 2594734927, 2544078150],
  $n = [0, 151849742, 303699484, 454499602, 607398968, 758720310, 908999204, 1059270954, 1214797936, 1097159550, 1517440620, 1400849762, 1817998408, 1699839814, 2118541908, 2001430874, 2429595872, 2581445614, 2194319100, 2345119218, 3034881240, 3186202582, 2801699524, 2951971274, 3635996816, 3518358430, 3399679628, 3283088770, 4237083816, 4118925222, 4002861748, 3885750714, 1002142683, 850817237, 698445255, 548169417, 529487843, 377642221, 227885567, 77089521, 1943217067, 2061379749, 1640576439, 1757691577, 1474760595, 1592394909, 1174215055, 1290801793, 2875968315, 2724642869, 3111247143, 2960971305, 2405426947, 2253581325, 2638606623, 2487810577, 3808662347, 3926825029, 4044981591, 4162096729, 3342319475, 3459953789, 3576539503, 3693126241, 1986918061, 2137062819, 1685577905, 1836772287, 1381620373, 1532285339, 1078185097, 1229899655, 1040559837, 923313619, 740276417, 621982671, 439452389, 322734571, 137073913, 19308535, 3871163981, 4021308739, 4104605777, 4255800159, 3263785589, 3414450555, 3499326569, 3651041127, 2933202493, 2815956275, 3167684641, 3049390895, 2330014213, 2213296395, 2566595609, 2448830231, 1305906550, 1155237496, 1607244650, 1455525988, 1776460110, 1626319424, 2079897426, 1928707164, 96392454, 213114376, 396673818, 514443284, 562755902, 679998e3, 865136418, 983426092, 3708173718, 3557504664, 3474729866, 3323011204, 4180808110, 4030667424, 3945269170, 3794078908, 2507040230, 2623762152, 2272556026, 2390325492, 2975484382, 3092726480, 2738905026, 2857194700, 3973773121, 3856137295, 4274053469, 4157467219, 3371096953, 3252932727, 3673476453, 3556361835, 2763173681, 2915017791, 3064510765, 3215307299, 2156299017, 2307622919, 2459735317, 2610011675, 2081048481, 1963412655, 1846563261, 1729977011, 1480485785, 1362321559, 1243905413, 1126790795, 878845905, 1030690015, 645401037, 796197571, 274084841, 425408743, 38544885, 188821243, 3613494426, 3731654548, 3313212038, 3430322568, 4082475170, 4200115116, 3780097726, 3896688048, 2668221674, 2516901860, 2366882550, 2216610296, 3141400786, 2989552604, 2837966542, 2687165888, 1202797690, 1320957812, 1437280870, 1554391400, 1669664834, 1787304780, 1906247262, 2022837584, 265905162, 114585348, 499347990, 349075736, 736970802, 585122620, 972512814, 821712160, 2595684844, 2478443234, 2293045232, 2174754046, 3196267988, 3079546586, 2895723464, 2777952454, 3537852828, 3687994002, 3234156416, 3385345166, 4142626212, 4293295786, 3841024952, 3992742070, 174567692, 57326082, 410887952, 292596766, 777231668, 660510266, 1011452712, 893681702, 1108339068, 1258480242, 1343618912, 1494807662, 1715193156, 1865862730, 1948373848, 2100090966, 2701949495, 2818666809, 3004591147, 3122358053, 2235061775, 2352307457, 2535604243, 2653899549, 3915653703, 3764988233, 4219352155, 4067639125, 3444575871, 3294430577, 3746175075, 3594982253, 836553431, 953270745, 600235211, 718002117, 367585007, 484830689, 133361907, 251657213, 2041877159, 1891211689, 1806599355, 1654886325, 1568718495, 1418573201, 1335535747, 1184342925];
function Bn(e) {
  for (var t = [], n = 0; n < e.length; n += 4) {
    t.push(e[n] << 24 | e[n + 1] << 16 | e[n + 2] << 8 | e[n + 3]);
  }
  return t;
}
var Wn = /*#__PURE__*/function () {
  function Wn(e) {
    (0, _classCallCheck2.default)(this, Wn);
    if (!(this instanceof Wn)) throw Error("AES must be instanitated with `new`");
    Object.defineProperty(this, "key", {
      value: In(e, !0)
    }), this._prepare();
  }
  (0, _createClass2.default)(Wn, [{
    key: "_prepare",
    value: function _prepare() {
      var e = Cn[this.key.length];
      if (null == e) throw new Error("invalid key size (must be 16, 24 or 32 bytes)");
      this._Ke = [], this._Kd = [];
      for (var t = 0; t <= e; t++) {
        this._Ke.push([0, 0, 0, 0]), this._Kd.push([0, 0, 0, 0]);
      }
      var n,
        s = 4 * (e + 1),
        r = this.key.length / 4,
        i = Bn(this.key);
      for (t = 0; t < r; t++) {
        n = t >> 2, this._Ke[n][t % 4] = i[t], this._Kd[e - n][t % 4] = i[t];
      }
      for (var o, a = 0, c = r; c < s;) {
        if (o = i[r - 1], i[0] ^= On[o >> 16 & 255] << 24 ^ On[o >> 8 & 255] << 16 ^ On[255 & o] << 8 ^ On[o >> 24 & 255] ^ Pn[a] << 24, a += 1, 8 != r) for (t = 1; t < r; t++) {
          i[t] ^= i[t - 1];
        } else {
          for (t = 1; t < r / 2; t++) {
            i[t] ^= i[t - 1];
          }
          o = i[r / 2 - 1], i[r / 2] ^= On[255 & o] ^ On[o >> 8 & 255] << 8 ^ On[o >> 16 & 255] << 16 ^ On[o >> 24 & 255] << 24;
          for (t = r / 2 + 1; t < r; t++) {
            i[t] ^= i[t - 1];
          }
        }
        for (t = 0; t < r && c < s;) {
          u = c >> 2, l = c % 4, this._Ke[u][l] = i[t], this._Kd[e - u][l] = i[t++], c++;
        }
      }
      for (var u = 1; u < e; u++) {
        for (var l = 0; l < 4; l++) {
          o = this._Kd[u][l], this._Kd[u][l] = Fn[o >> 24 & 255] ^ Kn[o >> 16 & 255] ^ jn[o >> 8 & 255] ^ $n[255 & o];
        }
      }
    }
  }, {
    key: "encrypt",
    value: function encrypt(e) {
      if (16 != e.length) throw new Error("invalid plaintext size (must be 16 bytes)");
      for (var t = this._Ke.length - 1, n = [0, 0, 0, 0], s = Bn(e), r = 0; r < 4; r++) {
        s[r] ^= this._Ke[0][r];
      }
      for (var i = 1; i < t; i++) {
        for (r = 0; r < 4; r++) {
          n[r] = xn[s[r] >> 24 & 255] ^ Ln[s[(r + 1) % 4] >> 16 & 255] ^ Un[s[(r + 2) % 4] >> 8 & 255] ^ Rn[255 & s[(r + 3) % 4]] ^ this._Ke[i][r];
        }
        s = n.slice();
      }
      var o,
        a = Sn(16);
      for (r = 0; r < 4; r++) {
        o = this._Ke[t][r], a[4 * r] = 255 & (On[s[r] >> 24 & 255] ^ o >> 24), a[4 * r + 1] = 255 & (On[s[(r + 1) % 4] >> 16 & 255] ^ o >> 16), a[4 * r + 2] = 255 & (On[s[(r + 2) % 4] >> 8 & 255] ^ o >> 8), a[4 * r + 3] = 255 & (On[255 & s[(r + 3) % 4]] ^ o);
      }
      return a;
    }
  }, {
    key: "decrypt",
    value: function decrypt(e) {
      if (16 != e.length) throw new Error("invalid ciphertext size (must be 16 bytes)");
      for (var t = this._Kd.length - 1, n = [0, 0, 0, 0], s = Bn(e), r = 0; r < 4; r++) {
        s[r] ^= this._Kd[0][r];
      }
      for (var i = 1; i < t; i++) {
        for (r = 0; r < 4; r++) {
          n[r] = Nn[s[r] >> 24 & 255] ^ Dn[s[(r + 3) % 4] >> 16 & 255] ^ Mn[s[(r + 2) % 4] >> 8 & 255] ^ qn[255 & s[(r + 1) % 4]] ^ this._Kd[i][r];
        }
        s = n.slice();
      }
      var o,
        a = Sn(16);
      for (r = 0; r < 4; r++) {
        o = this._Kd[t][r], a[4 * r] = 255 & (En[s[r] >> 24 & 255] ^ o >> 24), a[4 * r + 1] = 255 & (En[s[(r + 3) % 4] >> 16 & 255] ^ o >> 16), a[4 * r + 2] = 255 & (En[s[(r + 2) % 4] >> 8 & 255] ^ o >> 8), a[4 * r + 3] = 255 & (En[255 & s[(r + 1) % 4]] ^ o);
      }
      return a;
    }
  }]);
  return Wn;
}();
var Hn = /*#__PURE__*/function () {
  function Hn(e) {
    (0, _classCallCheck2.default)(this, Hn);
    if (!(this instanceof Hn)) throw Error("AES must be instanitated with `new`");
    this.description = "Electronic Code Block", this.name = "ecb", this._aes = new Wn(e);
  }
  (0, _createClass2.default)(Hn, [{
    key: "encrypt",
    value: function encrypt(e) {
      if ((e = In(e)).length % 16 != 0) throw new Error("invalid plaintext size (must be multiple of 16 bytes)");
      for (var t = Sn(e.length), n = Sn(16), s = 0; s < e.length; s += 16) {
        bn(e, n, 0, s, s + 16), bn(n = this._aes.encrypt(n), t, s);
      }
      return t;
    }
  }, {
    key: "decrypt",
    value: function decrypt(e) {
      if ((e = In(e)).length % 16 != 0) throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");
      for (var t = Sn(e.length), n = Sn(16), s = 0; s < e.length; s += 16) {
        bn(e, n, 0, s, s + 16), bn(n = this._aes.decrypt(n), t, s);
      }
      return t;
    }
  }]);
  return Hn;
}();
var Jn = /*#__PURE__*/function () {
  function Jn(e, t) {
    (0, _classCallCheck2.default)(this, Jn);
    if (!(this instanceof Jn)) throw Error("AES must be instanitated with `new`");
    if (this.description = "Cipher Block Chaining", this.name = "cbc", t) {
      if (16 != t.length) throw new Error("invalid initialation vector size (must be 16 bytes)");
    } else t = Sn(16);
    this._lastCipherblock = In(t, !0), this._aes = new Wn(e);
  }
  (0, _createClass2.default)(Jn, [{
    key: "encrypt",
    value: function encrypt(e) {
      if ((e = In(e)).length % 16 != 0) throw new Error("invalid plaintext size (must be multiple of 16 bytes)");
      for (var t = Sn(e.length), n = Sn(16), s = 0; s < e.length; s += 16) {
        bn(e, n, 0, s, s + 16);
        for (var r = 0; r < 16; r++) {
          n[r] ^= this._lastCipherblock[r];
        }
        this._lastCipherblock = this._aes.encrypt(n), bn(this._lastCipherblock, t, s);
      }
      return t;
    }
  }, {
    key: "decrypt",
    value: function decrypt(e) {
      if ((e = In(e)).length % 16 != 0) throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");
      for (var t = Sn(e.length), n = Sn(16), s = 0; s < e.length; s += 16) {
        bn(e, n, 0, s, s + 16), n = this._aes.decrypt(n);
        for (var r = 0; r < 16; r++) {
          t[s + r] = n[r] ^ this._lastCipherblock[r];
        }
        bn(e, this._lastCipherblock, 0, s, s + 16);
      }
      return t;
    }
  }]);
  return Jn;
}();
var zn = /*#__PURE__*/function () {
  function zn(e, t, n) {
    (0, _classCallCheck2.default)(this, zn);
    if (!(this instanceof zn)) throw Error("AES must be instanitated with `new`");
    if (this.description = "Cipher Feedback", this.name = "cfb", t) {
      if (16 != t.length) throw new Error("invalid initialation vector size (must be 16 size)");
    } else t = Sn(16);
    n || (n = 1), this.segmentSize = n, this._shiftRegister = In(t, !0), this._aes = new Wn(e);
  }
  (0, _createClass2.default)(zn, [{
    key: "encrypt",
    value: function encrypt(e) {
      if (e.length % this.segmentSize != 0) throw new Error("invalid plaintext size (must be segmentSize bytes)");
      for (var t, n = In(e, !0), s = 0; s < n.length; s += this.segmentSize) {
        t = this._aes.encrypt(this._shiftRegister);
        for (var r = 0; r < this.segmentSize; r++) {
          n[s + r] ^= t[r];
        }
        bn(this._shiftRegister, this._shiftRegister, 0, this.segmentSize), bn(n, this._shiftRegister, 16 - this.segmentSize, s, s + this.segmentSize);
      }
      return n;
    }
  }, {
    key: "decrypt",
    value: function decrypt(e) {
      if (e.length % this.segmentSize != 0) throw new Error("invalid ciphertext size (must be segmentSize bytes)");
      for (var t, n = In(e, !0), s = 0; s < n.length; s += this.segmentSize) {
        t = this._aes.encrypt(this._shiftRegister);
        for (var r = 0; r < this.segmentSize; r++) {
          n[s + r] ^= t[r];
        }
        bn(this._shiftRegister, this._shiftRegister, 0, this.segmentSize), bn(e, this._shiftRegister, 16 - this.segmentSize, s, s + this.segmentSize);
      }
      return n;
    }
  }]);
  return zn;
}();
var Vn = /*#__PURE__*/function () {
  function Vn(e, t) {
    (0, _classCallCheck2.default)(this, Vn);
    if (!(this instanceof Vn)) throw Error("AES must be instanitated with `new`");
    if (this.description = "Output Feedback", this.name = "ofb", t) {
      if (16 != t.length) throw new Error("invalid initialation vector size (must be 16 bytes)");
    } else t = Sn(16);
    this._lastPrecipher = In(t, !0), this._lastPrecipherIndex = 16, this._aes = new Wn(e);
  }
  (0, _createClass2.default)(Vn, [{
    key: "encrypt",
    value: function encrypt(e) {
      for (var t = In(e, !0), n = 0; n < t.length; n++) {
        16 === this._lastPrecipherIndex && (this._lastPrecipher = this._aes.encrypt(this._lastPrecipher), this._lastPrecipherIndex = 0), t[n] ^= this._lastPrecipher[this._lastPrecipherIndex++];
      }
      return t;
    }
  }, {
    key: "decrypt",
    value: function decrypt(e) {
      return this.encrypt(e);
    }
  }]);
  return Vn;
}();
var Gn = /*#__PURE__*/function () {
  function Gn(e) {
    (0, _classCallCheck2.default)(this, Gn);
    if (!(this instanceof Gn)) throw Error("Counter must be instanitated with `new`");
    0 === e || e || (e = 1), "number" == typeof e ? (this._counter = Sn(16), this.setValue(e)) : this.setBytes(e);
  }
  (0, _createClass2.default)(Gn, [{
    key: "setValue",
    value: function setValue(e) {
      if ("number" != typeof e || parseInt(e) != e) throw new Error("invalid counter value (must be an integer)");
      if (e > Number.MAX_SAFE_INTEGER) throw new Error("integer value out of safe range");
      for (var t = 15; t >= 0; --t) {
        this._counter[t] = e % 256, e = parseInt(e / 256);
      }
    }
  }, {
    key: "setBytes",
    value: function setBytes(e) {
      if (16 != (e = In(e, !0)).length) throw new Error("invalid counter bytes size (must be 16 bytes)");
      this._counter = e;
    }
  }, {
    key: "increment",
    value: function increment() {
      for (var e = 15; e >= 0; e--) {
        if (255 !== this._counter[e]) {
          this._counter[e]++;
          break;
        }
        this._counter[e] = 0;
      }
    }
  }]);
  return Gn;
}();
var Qn = /*#__PURE__*/function () {
  function Qn(e, t) {
    (0, _classCallCheck2.default)(this, Qn);
    if (!(this instanceof Qn)) throw Error("AES must be instanitated with `new`");
    this.description = "Counter", this.name = "ctr", t instanceof Gn || (t = new Gn(t)), this._counter = t, this._remainingCounter = null, this._remainingCounterIndex = 16, this._aes = new Wn(e);
  }
  (0, _createClass2.default)(Qn, [{
    key: "encrypt",
    value: function encrypt(e) {
      for (var t = In(e, !0), n = 0; n < t.length; n++) {
        16 === this._remainingCounterIndex && (this._remainingCounter = this._aes.encrypt(this._counter._counter), this._remainingCounterIndex = 0, this._counter.increment()), t[n] ^= this._remainingCounter[this._remainingCounterIndex++];
      }
      return t;
    }
  }, {
    key: "decrypt",
    value: function decrypt(e) {
      return this.encrypt(e);
    }
  }]);
  return Qn;
}();
var Yn = {
  AES: Wn,
  Counter: Gn,
  ModeOfOperation: {
    ecb: Hn,
    cbc: Jn,
    cfb: zn,
    ofb: Vn,
    ctr: Qn
  },
  utils: {
    hex: Tn,
    utf8: An
  },
  padding: {
    pkcs7: {
      pad: function pad(e) {
        var t = 16 - (e = In(e, !0)).length % 16,
          n = Sn(e.length + t);
        bn(e, n);
        for (var s = e.length; s < n.length; s++) {
          n[s] = t;
        }
        return n;
      },
      strip: function strip(e) {
        if ((e = In(e, !0)).length < 16) throw new Error("PKCS#7 invalid length");
        var t = e[e.length - 1];
        if (t > 16) throw new Error("PKCS#7 padding byte out of range");
        for (var n = e.length - t, s = 0; s < t; s++) {
          if (e[n + s] !== t) throw new Error("PKCS#7 invalid padding byte");
        }
        var r = Sn(n);
        return bn(e, r, 0, 0, n), r;
      }
    }
  },
  _arrayTest: {
    coerceArray: In,
    createArray: Sn,
    copyArray: bn
  }
};
function Xn(e, t, n) {
  var s = new Uint8Array(uni.base64ToArrayBuffer(t)),
    r = Yn.utils.utf8.toBytes(n),
    i = Yn.utils.utf8.toBytes(e),
    o = new Yn.ModeOfOperation.cbc(s, r),
    a = Yn.padding.pkcs7.pad(i),
    c = o.encrypt(a);
  return uni.arrayBufferToBase64(c);
}
var Zn,
  es,
  ts = null;
var ns = /*#__PURE__*/function (_n11) {
  (0, _inherits2.default)(ns, _n11);
  var _super8 = _createSuper(ns);
  function ns(e) {
    var _this19;
    (0, _classCallCheck2.default)(this, ns);
    _this19 = _super8.call(this, e), _this19.clientType = "mp-weixin", _this19.userEncryptKey = null;
    return _this19;
  }
  (0, _createClass2.default)(ns, [{
    key: "isLogin",
    value: function isLogin() {
      return !!this.scopedGlobalCache.mpWeixinCode || !!this.scopedGlobalCache.mpWeixinOpenid;
    }
  }, {
    key: "prepare",
    value: function () {
      var _prepare2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee52() {
        return _regenerator.default.wrap(function _callee52$(_context52) {
          while (1) {
            switch (_context52.prev = _context52.next) {
              case 0:
                if (this.isLogin()) {
                  _context52.next = 7;
                  break;
                }
                if (this.scopedGlobalCache.initPromise) {
                  _context52.next = 3;
                  break;
                }
                throw new Error("`uniCloud.initSecureNetworkByWeixin` has not yet been called");
              case 3:
                _context52.next = 5;
                return this.scopedGlobalCache.initPromise;
              case 5:
                if (this.isLogin()) {
                  _context52.next = 7;
                  break;
                }
                throw new Error("uniCloud.initSecureNetworkByWeixin` has not yet been called or successfully excuted");
              case 7:
              case "end":
                return _context52.stop();
            }
          }
        }, _callee52, this);
      }));
      function prepare() {
        return _prepare2.apply(this, arguments);
      }
      return prepare;
    }()
  }, {
    key: "getUserEncryptKey",
    value: function () {
      var _getUserEncryptKey = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee53() {
        var _this20 = this;
        var e;
        return _regenerator.default.wrap(function _callee53$(_context53) {
          while (1) {
            switch (_context53.prev = _context53.next) {
              case 0:
                if (!this.userEncryptKey) {
                  _context53.next = 2;
                  break;
                }
                return _context53.abrupt("return", this.userEncryptKey);
              case 2:
                if (!(ts && ts.expireTime)) {
                  _context53.next = 6;
                  break;
                }
                e = Date.now();
                if (!(ts.expireTime - e > 0)) {
                  _context53.next = 6;
                  break;
                }
                return _context53.abrupt("return", (this.userEncryptKey = ts, this.userEncryptKey));
              case 6:
                return _context53.abrupt("return", new Promise(function (e, t) {
                  uni.getUserCryptoManager().getLatestUserKey({
                    success: function success(t) {
                      ts = t, _this20.userEncryptKey = t, e(_this20.userEncryptKey);
                    },
                    fail: function fail(e) {
                      t(yn(_objectSpread(_objectSpread({}, gn), {}, {
                        cause: e
                      })));
                    }
                  });
                }));
              case 7:
              case "end":
                return _context53.stop();
            }
          }
        }, _callee53, this);
      }));
      function getUserEncryptKey() {
        return _getUserEncryptKey.apply(this, arguments);
      }
      return getUserEncryptKey;
    }()
  }, {
    key: "getWxAppId",
    value: function getWxAppId() {
      return wx.getAccountInfoSync().miniProgram.appId;
    }
  }, {
    key: "platformGetSignOption",
    value: function () {
      var _platformGetSignOption = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee54() {
        var _yield$this$getUserEn, e, t, n;
        return _regenerator.default.wrap(function _callee54$(_context54) {
          while (1) {
            switch (_context54.prev = _context54.next) {
              case 0:
                _context54.next = 2;
                return this.getUserEncryptKey();
              case 2:
                _yield$this$getUserEn = _context54.sent;
                e = _yield$this$getUserEn.encryptKey;
                t = _yield$this$getUserEn.iv;
                n = _yield$this$getUserEn.version;
                return _context54.abrupt("return", {
                  verifyClientSign: Xn(JSON.stringify({
                    data: JSON.stringify({}),
                    appId: this.appId,
                    deviceId: this.deviceId,
                    wxAppId: this.getWxAppId(),
                    simulator: "devtools" === le().platform,
                    timestamp: Date.now()
                  }), e, t),
                  encryptKeyId: n,
                  mpWeixinCode: this.scopedGlobalCache.mpWeixinCode,
                  mpWeixinOpenid: this.scopedGlobalCache.mpWeixinOpenid
                });
              case 7:
              case "end":
                return _context54.stop();
            }
          }
        }, _callee54, this);
      }));
      function platformGetSignOption() {
        return _platformGetSignOption.apply(this, arguments);
      }
      return platformGetSignOption;
    }()
  }, {
    key: "platformEncryptData",
    value: function () {
      var _platformEncryptData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee55(e) {
        var _yield$this$getUserEn2, t, n, s, r;
        return _regenerator.default.wrap(function _callee55$(_context55) {
          while (1) {
            switch (_context55.prev = _context55.next) {
              case 0:
                _context55.next = 2;
                return this.getUserEncryptKey();
              case 2:
                _yield$this$getUserEn2 = _context55.sent;
                t = _yield$this$getUserEn2.encryptKey;
                n = _yield$this$getUserEn2.iv;
                s = _yield$this$getUserEn2.version;
                r = {
                  secretType: this.secretType,
                  encryptKeyId: s,
                  mpWeixinCode: this.scopedGlobalCache.mpWeixinCode,
                  mpWeixinOpenid: this.scopedGlobalCache.mpWeixinOpenid
                };
                return _context55.abrupt("return", this.secretType === hn ? {
                  content: e,
                  _uniCloudOptions: r
                } : {
                  content: Xn(JSON.stringify({
                    data: JSON.stringify(e),
                    appId: this.appId,
                    deviceId: this.deviceId,
                    wxAppId: this.getWxAppId(),
                    simulator: "devtools" === le().platform,
                    timestamp: Date.now()
                  }), t, n),
                  _uniCloudOptions: r
                });
              case 8:
              case "end":
                return _context55.stop();
            }
          }
        }, _callee55, this);
      }));
      function platformEncryptData(_x48) {
        return _platformEncryptData.apply(this, arguments);
      }
      return platformEncryptData;
    }()
  }, {
    key: "platformDecryptResult",
    value: function () {
      var _platformDecryptResult = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee56(e) {
        var t, _yield$this$getUserEn3, n, s;
        return _regenerator.default.wrap(function _callee56$(_context56) {
          while (1) {
            switch (_context56.prev = _context56.next) {
              case 0:
                t = e.content;
                _context56.next = 3;
                return this.getUserEncryptKey();
              case 3:
                _yield$this$getUserEn3 = _context56.sent;
                n = _yield$this$getUserEn3.encryptKey;
                s = _yield$this$getUserEn3.iv;
                return _context56.abrupt("return", JSON.parse(function (e, t, n) {
                  var s = new Uint8Array(uni.base64ToArrayBuffer(e)),
                    r = new Uint8Array(uni.base64ToArrayBuffer(t)),
                    i = Yn.utils.utf8.toBytes(n),
                    o = new Yn.ModeOfOperation.cbc(r, i),
                    a = Yn.padding.pkcs7.strip(o.decrypt(s));
                  return Yn.utils.utf8.fromBytes(a);
                }(t, n, s)));
              case 7:
              case "end":
                return _context56.stop();
            }
          }
        }, _callee56, this);
      }));
      function platformDecryptResult(_x49) {
        return _platformDecryptResult.apply(this, arguments);
      }
      return platformDecryptResult;
    }()
  }, {
    key: "isClientKeyNotFound",
    value: function isClientKeyNotFound() {
      return !1;
    }
  }]);
  return ns;
}(_n);
function ss(e) {
  var t = ["hasClientKey", "encryptGetClientKeyPayload", "setClientKey", "encrypt", "decrypt"],
    n = {};
  var _loop = function _loop(_s14) {
    var r = t[_s14];
    n[r] = function () {
      for (var _len = arguments.length, t = new Array(_len), _key = 0; _key < _len; _key++) {
        t[_key] = arguments[_key];
      }
      return new Promise(function (n, s) {
        "function" == typeof e[r] ? e[r].apply(e, t.concat([function () {
          var _ref36 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            e = _ref36.type,
            t = _ref36.data,
            r = _ref36.errCode,
            i = _ref36.errMsg,
            o = _ref36.errSubject,
            a = _ref36.message;
          "success" === e ? n(t) : s(yn({
            errCode: r,
            errMsg: mn[r] || i || a,
            errSubject: o
          }));
        }])) : s(yn({
          message: "请检查manifest.json内是否开启安全网络模块，另外注意标准基座不支持安全网络模块"
        }));
      });
    };
  };
  for (var _s14 = 0; _s14 < t.length; _s14++) {
    _loop(_s14);
  }
  return n;
}
var rs = /*#__PURE__*/function (_n12) {
  (0, _inherits2.default)(rs, _n12);
  var _super9 = _createSuper(rs);
  function rs(e) {
    var _this21;
    (0, _classCallCheck2.default)(this, rs);
    _this21 = _super9.call(this, e), _this21.clientType = "app", _this21.appUtils = _objectSpread({}, ss(uni.requireNativePlugin("plus"))), _this21.systemInfo = Zn || (Zn = le());
    return _this21;
  }
  (0, _createClass2.default)(rs, [{
    key: "hasClientKey",
    value: function () {
      var _hasClientKey = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee57() {
        return _regenerator.default.wrap(function _callee57$(_context57) {
          while (1) {
            switch (_context57.prev = _context57.next) {
              case 0:
                _context57.next = 2;
                return this.appUtils.hasClientKey({
                  provider: this.provider,
                  spaceId: this.spaceId
                });
              case 2:
                this._hasClientKey = _context57.sent;
                return _context57.abrupt("return", this._hasClientKey);
              case 4:
              case "end":
                return _context57.stop();
            }
          }
        }, _callee57, this);
      }));
      function hasClientKey() {
        return _hasClientKey.apply(this, arguments);
      }
      return hasClientKey;
    }()
  }, {
    key: "getAppClientKey",
    value: function () {
      var _getAppClientKey = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee58() {
        var _yield$this$appUtils$, e, t, n, s, r;
        return _regenerator.default.wrap(function _callee58$(_context58) {
          while (1) {
            switch (_context58.prev = _context58.next) {
              case 0:
                _context58.next = 2;
                return this.appUtils.encryptGetClientKeyPayload({
                  data: JSON.stringify({})
                });
              case 2:
                _yield$this$appUtils$ = _context58.sent;
                e = _yield$this$appUtils$.data;
                t = _yield$this$appUtils$.key;
                _context58.next = 7;
                return this.uniCloudIns.callFunction({
                  name: "DCloud-clientDB",
                  data: {
                    redirectTo: "encryption",
                    action: "getAppClientKey",
                    data: e,
                    key: t
                  }
                });
              case 7:
                _context58.t0 = _context58.sent.result;
                if (_context58.t0) {
                  _context58.next = 10;
                  break;
                }
                _context58.t0 = {};
              case 10:
                n = _context58.t0;
                if (!(0 !== n.errCode)) {
                  _context58.next = 13;
                  break;
                }
                throw function (e) {
                  return new re({
                    subject: e.errSubject || "uni-secure-network",
                    code: e.errCode || e.code || pn.code,
                    message: e.errMsg || e.message || pn.message
                  });
                }(n);
              case 13:
                s = n.clientKey, r = n.key;
                _context58.next = 16;
                return this.appUtils.setClientKey({
                  provider: this.provider,
                  spaceId: this.spaceId,
                  clientKey: s,
                  key: r
                });
              case 16:
              case "end":
                return _context58.stop();
            }
          }
        }, _callee58, this);
      }));
      function getAppClientKey() {
        return _getAppClientKey.apply(this, arguments);
      }
      return getAppClientKey;
    }()
  }, {
    key: "ensureClientKey",
    value: function () {
      var _ensureClientKey = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee59() {
        var _this22 = this;
        var _ref37,
          _ref37$forceUpdate,
          e,
          _args59 = arguments;
        return _regenerator.default.wrap(function _callee59$(_context59) {
          while (1) {
            switch (_context59.prev = _context59.next) {
              case 0:
                _ref37 = _args59.length > 0 && _args59[0] !== undefined ? _args59[0] : {}, _ref37$forceUpdate = _ref37.forceUpdate, e = _ref37$forceUpdate === void 0 ? !1 : _ref37$forceUpdate;
                _context59.t1 = !0;
                _context59.next = 4;
                return this.hasClientKey();
              case 4:
                _context59.t2 = _context59.sent;
                _context59.t0 = _context59.t1 !== _context59.t2;
                if (_context59.t0) {
                  _context59.next = 8;
                  break;
                }
                _context59.t0 = e;
              case 8:
                if (!_context59.t0) {
                  _context59.next = 10;
                  break;
                }
                return _context59.abrupt("return", (e && this.scopedGlobalCache.initPromise && this.scopedGlobalCache.initStatus === h || !e && this.scopedGlobalCache.initPromise && this.scopedGlobalCache.initStatus !== p || (this.scopedGlobalCache.initPromise = this.getAppClientKey(), this.scopedGlobalCache.initPromise.then(function (e) {
                  _this22.scopedGlobalCache.initStatus = d;
                }).catch(function (e) {
                  throw _this22.scopedGlobalCache.initStatus = p, e;
                }), this.scopedGlobalCache.initStatus = h), this.scopedGlobalCache.initPromise));
              case 10:
              case "end":
                return _context59.stop();
            }
          }
        }, _callee59, this);
      }));
      function ensureClientKey() {
        return _ensureClientKey.apply(this, arguments);
      }
      return ensureClientKey;
    }()
  }, {
    key: "prepare",
    value: function () {
      var _prepare3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee60() {
        var _ref38,
          _ref38$forceUpdate,
          e,
          _args60 = arguments;
        return _regenerator.default.wrap(function _callee60$(_context60) {
          while (1) {
            switch (_context60.prev = _context60.next) {
              case 0:
                _ref38 = _args60.length > 0 && _args60[0] !== undefined ? _args60[0] : {}, _ref38$forceUpdate = _ref38.forceUpdate, e = _ref38$forceUpdate === void 0 ? !1 : _ref38$forceUpdate;
                _context60.next = 3;
                return this.ensureClientKey({
                  forceUpdate: e
                });
              case 3:
              case "end":
                return _context60.stop();
            }
          }
        }, _callee60, this);
      }));
      function prepare() {
        return _prepare3.apply(this, arguments);
      }
      return prepare;
    }()
  }, {
    key: "platformGetSignOption",
    value: function () {
      var _platformGetSignOption2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee61() {
        var _yield$this$appUtils$2, e, t;
        return _regenerator.default.wrap(function _callee61$(_context61) {
          while (1) {
            switch (_context61.prev = _context61.next) {
              case 0:
                _context61.next = 2;
                return this.appUtils.encrypt({
                  provider: this.provider,
                  spaceId: this.spaceId,
                  data: JSON.stringify({})
                });
              case 2:
                _yield$this$appUtils$2 = _context61.sent;
                e = _yield$this$appUtils$2.data;
                t = _yield$this$appUtils$2.key;
                return _context61.abrupt("return", {
                  verifyClientSign: e,
                  encryptKeyId: t
                });
              case 6:
              case "end":
                return _context61.stop();
            }
          }
        }, _callee61, this);
      }));
      function platformGetSignOption() {
        return _platformGetSignOption2.apply(this, arguments);
      }
      return platformGetSignOption;
    }()
  }, {
    key: "platformEncryptData",
    value: function () {
      var _platformEncryptData2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee62(e) {
        var _yield$this$appUtils$3, t, n, s;
        return _regenerator.default.wrap(function _callee62$(_context62) {
          while (1) {
            switch (_context62.prev = _context62.next) {
              case 0:
                _context62.next = 2;
                return this.appUtils.encrypt({
                  provider: this.provider,
                  spaceId: this.spaceId,
                  data: JSON.stringify(e)
                });
              case 2:
                _yield$this$appUtils$3 = _context62.sent;
                t = _yield$this$appUtils$3.data;
                n = _yield$this$appUtils$3.key;
                s = {
                  secretType: this.secretType,
                  encryptKeyId: n
                };
                return _context62.abrupt("return", this.secretType === hn ? {
                  content: e,
                  _uniCloudOptions: s
                } : {
                  content: t,
                  _uniCloudOptions: s
                });
              case 7:
              case "end":
                return _context62.stop();
            }
          }
        }, _callee62, this);
      }));
      function platformEncryptData(_x50) {
        return _platformEncryptData2.apply(this, arguments);
      }
      return platformEncryptData;
    }()
  }, {
    key: "platformDecryptResult",
    value: function () {
      var _platformDecryptResult2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee63(e) {
        var t, _e$_uniCloudOptions, n, s, r;
        return _regenerator.default.wrap(function _callee63$(_context63) {
          while (1) {
            switch (_context63.prev = _context63.next) {
              case 0:
                t = e.content;
                _e$_uniCloudOptions = e._uniCloudOptions;
                n = _e$_uniCloudOptions === void 0 ? {} : _e$_uniCloudOptions;
                s = n.encryptKeyId;
                _context63.next = 6;
                return this.appUtils.decrypt({
                  provider: this.provider,
                  spaceId: this.spaceId,
                  data: t,
                  key: s
                });
              case 6:
                r = _context63.sent;
                return _context63.abrupt("return", JSON.parse(r.data));
              case 8:
              case "end":
                return _context63.stop();
            }
          }
        }, _callee63, this);
      }));
      function platformDecryptResult(_x51) {
        return _platformDecryptResult2.apply(this, arguments);
      }
      return platformDecryptResult;
    }()
  }, {
    key: "isClientKeyNotFound",
    value: function isClientKeyNotFound() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var t = e.result || {};
      return 70009 === t.errCode && "uni-secure-network" === t.errSubject;
    }
  }]);
  return rs;
}(_n);
function is() {
  var _ref39 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    e = _ref39.secretType;
  return e === ln || e === hn || e === dn;
}
function os() {
  var _ref40 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    e = _ref40.name,
    _ref40$data = _ref40.data,
    t = _ref40$data === void 0 ? {} : _ref40$data;
  return "app" === T && "DCloud-clientDB" === e && "encryption" === t.redirectTo && "getAppClientKey" === t.action;
}
function as() {
  var _ref41 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    e = _ref41.provider,
    t = _ref41.spaceId,
    n = _ref41.functionName;
  var _le = le(),
    s = _le.appId,
    r = _le.uniPlatform,
    i = _le.osName;
  var o = r;
  "app" === r && (o = i);
  var a = function () {
    var _ref42 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      e = _ref42.provider,
      t = _ref42.spaceId;
    var n = A;
    if (!n) return {};
    e = function (e) {
      return "tencent" === e ? "tcb" : e;
    }(e);
    var s = n.find(function (n) {
      return n.provider === e && n.spaceId === t;
    });
    return s && s.config;
  }({
    provider: e,
    spaceId: t
  });
  if (!a || !a.accessControl || !a.accessControl.enable) return !1;
  var c = a.accessControl.function || {},
    u = Object.keys(c);
  if (0 === u.length) return !0;
  var l = function (e, t) {
    var n, s, r;
    for (var _i2 = 0; _i2 < e.length; _i2++) {
      var _o2 = e[_i2];
      _o2 !== t ? "*" !== _o2 ? _o2.split(",").map(function (e) {
        return e.trim();
      }).indexOf(t) > -1 && (s = _o2) : r = _o2 : n = _o2;
    }
    return n || s || r;
  }(u, n);
  if (!l) return !1;
  if ((c[l] || []).find(function () {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return e.appId === s && (e.platform || "").toLowerCase() === o.toLowerCase();
  })) return !0;
  throw console.error("\u6B64\u5E94\u7528[appId: ".concat(s, ", platform: ").concat(o, "]\u4E0D\u5728\u4E91\u7AEF\u914D\u7F6E\u7684\u5141\u8BB8\u8BBF\u95EE\u7684\u5E94\u7528\u5217\u8868\u5185\uFF0C\u53C2\u8003\uFF1Ahttps://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client")), yn(fn);
}
function cs(_ref43) {
  var e = _ref43.functionName,
    t = _ref43.result,
    n = _ref43.logPvd;
  if (S && this.__dev__.debugLog && t && t.requestId) {
    var _s15 = JSON.stringify({
      spaceId: this.config.spaceId,
      functionName: e,
      requestId: t.requestId
    });
    console.log("[".concat(n, "-request]").concat(_s15, "[/").concat(n, "-request]"));
  }
}
function us(e) {
  var t = e.callFunction,
    n = function n(_n13) {
      var _this23 = this;
      var s = _n13.name;
      _n13.data = Jt.call(e, {
        data: _n13.data
      });
      var r = {
          aliyun: "aliyun",
          tencent: "tcb",
          tcb: "tcb",
          alipay: "alipay",
          dcloud: "dcloud"
        }[this.config.provider],
        i = is(_n13),
        o = os(_n13),
        a = i || o;
      return t.call(this, _n13).then(function (e) {
        return e.errCode = 0, !a && cs.call(_this23, {
          functionName: s,
          result: e,
          logPvd: r
        }), Promise.resolve(e);
      }, function (e) {
        return !a && cs.call(_this23, {
          functionName: s,
          result: e,
          logPvd: r
        }), e && e.message && (e.message = function () {
          var _ref44 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref44$message = _ref44.message,
            e = _ref44$message === void 0 ? "" : _ref44$message,
            _ref44$extraInfo = _ref44.extraInfo,
            t = _ref44$extraInfo === void 0 ? {} : _ref44$extraInfo,
            _ref44$formatter = _ref44.formatter,
            n = _ref44$formatter === void 0 ? [] : _ref44$formatter;
          for (var _s16 = 0; _s16 < n.length; _s16++) {
            var _n$_s = n[_s16],
              _r7 = _n$_s.rule,
              _i3 = _n$_s.content,
              _o3 = _n$_s.mode,
              _a2 = e.match(_r7);
            if (!_a2) continue;
            var _c2 = _i3;
            for (var _e19 = 1; _e19 < _a2.length; _e19++) {
              _c2 = cn(_c2, "{$".concat(_e19, "}"), _a2[_e19]);
            }
            for (var _e20 in t) {
              _c2 = cn(_c2, "{".concat(_e20, "}"), t[_e20]);
            }
            return "replace" === _o3 ? _c2 : e + _c2;
          }
          return e;
        }({
          message: "[".concat(_n13.name, "]: ").concat(e.message),
          formatter: rn,
          extraInfo: {
            functionName: s
          }
        })), Promise.reject(e);
      });
    };
  e.callFunction = function (t) {
    var _e$config = e.config,
      s = _e$config.provider,
      r = _e$config.spaceId,
      i = t.name;
    var o, a;
    if (t.data = t.data || {}, S && e.__dev__.debugInfo && !e.__dev__.debugInfo.forceRemote && P ? (e._callCloudFunction || (e._callCloudFunction = n, e._callLocalFunction = sn), o = sn) : o = n, o = o.bind(e), os(t)) a = n.call(e, t);else if (function (_ref45) {
      var e = _ref45.name,
        _ref45$data = _ref45.data,
        t = _ref45$data === void 0 ? {} : _ref45$data;
      return "mp-weixin" === T && "uni-id-co" === e && "secureNetworkHandshakeByWeixin" === t.method;
    }(t)) a = o.call(e, t);else if (is(t)) {
      a = new es({
        secretType: t.secretType,
        uniCloudIns: e
      }).wrapEncryptDataCallFunction(n.bind(e))(t);
    } else if (as({
      provider: s,
      spaceId: r,
      functionName: i
    })) {
      a = new es({
        secretType: t.secretType,
        uniCloudIns: e
      }).wrapVerifyClientCallFunction(n.bind(e))(t);
    } else a = o(t);
    return Object.defineProperty(a, "result", {
      get: function get() {
        return console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {};
      }
    }), a.then(function (e) {
      return e;
    });
  };
}
es = "mp-weixin" !== T && "app" !== T ? /*#__PURE__*/function () {
  function _class2() {
    (0, _classCallCheck2.default)(this, _class2);
    throw yn({
      message: "Platform ".concat(T, " is not supported by secure network")
    });
  }
  return (0, _createClass2.default)(_class2);
}() : k ? "mp-weixin" === T ? ns : rs : /*#__PURE__*/function () {
  function _class3() {
    (0, _classCallCheck2.default)(this, _class3);
    throw yn({
      message: "Platform ".concat(T, " is not enabled, please check whether secure network module is enabled in your manifest.json")
    });
  }
  return (0, _createClass2.default)(_class3);
}();
var ls = Symbol("CLIENT_DB_INTERNAL");
function hs(e, t) {
  return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = ls, e.inspect = null, e.__ob__ = void 0, new Proxy(e, {
    get: function get(e, n, s) {
      if ("_uniClient" === n) return null;
      if ("symbol" == (0, _typeof2.default)(n)) return e[n];
      if (n in e || "string" != typeof n) {
        var _t12 = e[n];
        return "function" == typeof _t12 ? _t12.bind(e) : _t12;
      }
      return t.get(e, n, s);
    }
  });
}
function ds(e) {
  return {
    on: function on(t, n) {
      e[t] = e[t] || [], e[t].indexOf(n) > -1 || e[t].push(n);
    },
    off: function off(t, n) {
      e[t] = e[t] || [];
      var s = e[t].indexOf(n);
      -1 !== s && e[t].splice(s, 1);
    }
  };
}
var ps = ["db.Geo", "db.command", "command.aggregate"];
function fs(e, t) {
  return ps.indexOf("".concat(e, ".").concat(t)) > -1;
}
function gs(e) {
  switch (f(e)) {
    case "array":
      return e.map(function (e) {
        return gs(e);
      });
    case "object":
      return e._internalType === ls || Object.keys(e).forEach(function (t) {
        e[t] = gs(e[t]);
      }), e;
    case "regexp":
      return {
        $regexp: {
          source: e.source,
          flags: e.flags
        }
      };
    case "date":
      return {
        $date: e.toISOString()
      };
    default:
      return e;
  }
}
function ms(e) {
  return e && e.content && e.content.$method;
}
var ys = /*#__PURE__*/function () {
  function ys(e, t, n) {
    (0, _classCallCheck2.default)(this, ys);
    this.content = e, this.prevStage = t || null, this.udb = null, this._database = n;
  }
  (0, _createClass2.default)(ys, [{
    key: "toJSON",
    value: function toJSON() {
      var e = this;
      var t = [e.content];
      for (; e.prevStage;) {
        e = e.prevStage, t.push(e.content);
      }
      return {
        $db: t.reverse().map(function (e) {
          return {
            $method: e.$method,
            $param: gs(e.$param)
          };
        })
      };
    }
  }, {
    key: "toString",
    value: function toString() {
      return JSON.stringify(this.toJSON());
    }
  }, {
    key: "getAction",
    value: function getAction() {
      var e = this.toJSON().$db.find(function (e) {
        return "action" === e.$method;
      });
      return e && e.$param && e.$param[0];
    }
  }, {
    key: "getCommand",
    value: function getCommand() {
      return {
        $db: this.toJSON().$db.filter(function (e) {
          return "action" !== e.$method;
        })
      };
    }
  }, {
    key: "isAggregate",
    get: function get() {
      var e = this;
      for (; e;) {
        var t = ms(e),
          _n14 = ms(e.prevStage);
        if ("aggregate" === t && "collection" === _n14 || "pipeline" === t) return !0;
        e = e.prevStage;
      }
      return !1;
    }
  }, {
    key: "isCommand",
    get: function get() {
      var e = this;
      for (; e;) {
        if ("command" === ms(e)) return !0;
        e = e.prevStage;
      }
      return !1;
    }
  }, {
    key: "isAggregateCommand",
    get: function get() {
      var e = this;
      for (; e;) {
        var t = ms(e),
          _n15 = ms(e.prevStage);
        if ("aggregate" === t && "command" === _n15) return !0;
        e = e.prevStage;
      }
      return !1;
    }
  }, {
    key: "getNextStageFn",
    value: function getNextStageFn(e) {
      var t = this;
      return function () {
        return _s({
          $method: e,
          $param: gs(Array.from(arguments))
        }, t, t._database);
      };
    }
  }, {
    key: "count",
    get: function get() {
      return this.isAggregate ? this.getNextStageFn("count") : function () {
        return this._send("count", Array.from(arguments));
      };
    }
  }, {
    key: "remove",
    get: function get() {
      return this.isCommand ? this.getNextStageFn("remove") : function () {
        return this._send("remove", Array.from(arguments));
      };
    }
  }, {
    key: "get",
    value: function get() {
      return this._send("get", Array.from(arguments));
    }
  }, {
    key: "add",
    get: function get() {
      return this.isCommand ? this.getNextStageFn("add") : function () {
        return this._send("add", Array.from(arguments));
      };
    }
  }, {
    key: "update",
    value: function update() {
      return this._send("update", Array.from(arguments));
    }
  }, {
    key: "end",
    value: function end() {
      return this._send("end", Array.from(arguments));
    }
  }, {
    key: "set",
    get: function get() {
      return this.isCommand ? this.getNextStageFn("set") : function () {
        throw new Error("JQL禁止使用set方法");
      };
    }
  }, {
    key: "_send",
    value: function _send(e, t) {
      var n = this.getAction(),
        s = this.getCommand();
      if (s.$db.push({
        $method: e,
        $param: gs(t)
      }), S) {
        var _e21 = s.$db.find(function (e) {
            return "collection" === e.$method;
          }),
          _t13 = _e21 && _e21.$param;
        _t13 && 1 === _t13.length && "string" == typeof _e21.$param[0] && _e21.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
      }
      return this._database._callCloudFunction({
        action: n,
        command: s
      });
    }
  }]);
  return ys;
}();
function _s(e, t, n) {
  return hs(new ys(e, t, n), {
    get: function get(e, t) {
      var s = "db";
      return e && e.content && (s = e.content.$method), fs(s, t) ? _s({
        $method: t
      }, e, n) : function () {
        return _s({
          $method: t,
          $param: gs(Array.from(arguments))
        }, e, n);
      };
    }
  });
}
function ws(_ref46) {
  var e = _ref46.path,
    t = _ref46.method;
  return /*#__PURE__*/function () {
    function _class4() {
      (0, _classCallCheck2.default)(this, _class4);
      this.param = Array.from(arguments);
    }
    (0, _createClass2.default)(_class4, [{
      key: "toJSON",
      value: function toJSON() {
        return {
          $newDb: [].concat((0, _toConsumableArray2.default)(e.map(function (e) {
            return {
              $method: e
            };
          })), [{
            $method: t,
            $param: this.param
          }])
        };
      }
    }, {
      key: "toString",
      value: function toString() {
        return JSON.stringify(this.toJSON());
      }
    }]);
    return _class4;
  }();
}
function vs(e) {
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return hs(new e(t), {
    get: function get(e, t) {
      return fs("db", t) ? _s({
        $method: t
      }, null, e) : function () {
        return _s({
          $method: t,
          $param: gs(Array.from(arguments))
        }, null, e);
      };
    }
  });
}
var Is = /*#__PURE__*/function (_ref47) {
  (0, _inherits2.default)(Is, _ref47);
  var _super10 = _createSuper(Is);
  function Is() {
    (0, _classCallCheck2.default)(this, Is);
    return _super10.apply(this, arguments);
  }
  (0, _createClass2.default)(Is, [{
    key: "_parseResult",
    value: function _parseResult(e) {
      return this._isJQL ? e.result : e;
    }
  }, {
    key: "_callCloudFunction",
    value: function _callCloudFunction(_ref48) {
      var _this24 = this;
      var e = _ref48.action,
        t = _ref48.command,
        n = _ref48.multiCommand,
        s = _ref48.queryList;
      function r(e, t) {
        if (n && s) for (var _n16 = 0; _n16 < s.length; _n16++) {
          var _r8 = s[_n16];
          _r8.udb && "function" == typeof _r8.udb.setResult && (t ? _r8.udb.setResult(t) : _r8.udb.setResult(e.result.dataList[_n16]));
        }
      }
      var i = this,
        o = this._isJQL ? "databaseForJQL" : "database";
      function a(e) {
        return i._callback("error", [e]), F(K(o, "fail"), e).then(function () {
          return F(K(o, "complete"), e);
        }).then(function () {
          return r(null, e), Z(B, {
            type: z,
            content: e
          }), Promise.reject(e);
        });
      }
      var c = F(K(o, "invoke")),
        u = this._uniClient;
      return c.then(function () {
        return u.callFunction({
          name: "DCloud-clientDB",
          type: l,
          data: {
            action: e,
            command: t,
            multiCommand: n
          }
        });
      }).then(function (e) {
        var _e$result = e.result,
          t = _e$result.code,
          n = _e$result.message,
          s = _e$result.token,
          c = _e$result.tokenExpired,
          _e$result$systemInfo = _e$result.systemInfo,
          u = _e$result$systemInfo === void 0 ? [] : _e$result$systemInfo;
        if (u) for (var _e22 = 0; _e22 < u.length; _e22++) {
          var _u$_e = u[_e22],
            _t14 = _u$_e.level,
            _n17 = _u$_e.message,
            _s17 = _u$_e.detail,
            _r9 = console["app" === T && "warn" === _t14 ? "error" : _t14] || console.log;
          var _i4 = "[System Info]" + _n17;
          _s17 && (_i4 = "".concat(_i4, "\n\u8BE6\u7EC6\u4FE1\u606F\uFF1A").concat(_s17)), _r9(_i4);
        }
        if (t) {
          return a(new re({
            code: t,
            message: n,
            requestId: e.requestId
          }));
        }
        e.result.errCode = e.result.errCode || e.result.code, e.result.errMsg = e.result.errMsg || e.result.message, s && c && (ae({
          token: s,
          tokenExpired: c
        }), _this24._callbackAuth("refreshToken", [{
          token: s,
          tokenExpired: c
        }]), _this24._callback("refreshToken", [{
          token: s,
          tokenExpired: c
        }]), Z(H, {
          token: s,
          tokenExpired: c
        }));
        var l = [{
          prop: "affectedDocs",
          tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代"
        }, {
          prop: "code",
          tips: "code不再推荐使用，请使用errCode替代"
        }, {
          prop: "message",
          tips: "message不再推荐使用，请使用errMsg替代"
        }];
        var _loop2 = function _loop2(_t15) {
          var _l$_t = l[_t15],
            n = _l$_t.prop,
            s = _l$_t.tips;
          if (n in e.result) {
            var _t16 = e.result[n];
            Object.defineProperty(e.result, n, {
              get: function get() {
                return console.warn(s), _t16;
              }
            });
          }
        };
        for (var _t15 = 0; _t15 < l.length; _t15++) {
          _loop2(_t15);
        }
        return function (e) {
          return F(K(o, "success"), e).then(function () {
            return F(K(o, "complete"), e);
          }).then(function () {
            r(e, null);
            var t = i._parseResult(e);
            return Z(B, {
              type: z,
              content: t
            }), Promise.resolve(t);
          });
        }(e);
      }, function (e) {
        /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
        return a(new re({
          code: e.code || "SYSTEM_ERROR",
          message: e.message,
          requestId: e.requestId
        }));
      });
    }
  }]);
  return Is;
}( /*#__PURE__*/function () {
  function _class5() {
    var _ref49 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref49$uniClient = _ref49.uniClient,
      e = _ref49$uniClient === void 0 ? {} : _ref49$uniClient,
      _ref49$isJQL = _ref49.isJQL,
      t = _ref49$isJQL === void 0 ? !1 : _ref49$isJQL;
    (0, _classCallCheck2.default)(this, _class5);
    this._uniClient = e, this._authCallBacks = {}, this._dbCallBacks = {}, e._isDefault && (this._dbCallBacks = U("_globalUniCloudDatabaseCallback")), t || (this.auth = ds(this._authCallBacks)), this._isJQL = t, Object.assign(this, ds(this._dbCallBacks)), this.env = hs({}, {
      get: function get(e, t) {
        return {
          $env: t
        };
      }
    }), this.Geo = hs({}, {
      get: function get(e, t) {
        return ws({
          path: ["Geo"],
          method: t
        });
      }
    }), this.serverDate = ws({
      path: [],
      method: "serverDate"
    }), this.RegExp = ws({
      path: [],
      method: "RegExp"
    });
  }
  (0, _createClass2.default)(_class5, [{
    key: "getCloudEnv",
    value: function getCloudEnv(e) {
      if ("string" != typeof e || !e.trim()) throw new Error("getCloudEnv参数错误");
      return {
        $env: e.replace("$cloudEnv_", "")
      };
    }
  }, {
    key: "_callback",
    value: function _callback(e, t) {
      var n = this._dbCallBacks;
      n[e] && n[e].forEach(function (e) {
        e.apply(void 0, (0, _toConsumableArray2.default)(t));
      });
    }
  }, {
    key: "_callbackAuth",
    value: function _callbackAuth(e, t) {
      var n = this._authCallBacks;
      n[e] && n[e].forEach(function (e) {
        e.apply(void 0, (0, _toConsumableArray2.default)(t));
      });
    }
  }, {
    key: "multiSend",
    value: function multiSend() {
      var e = Array.from(arguments),
        t = e.map(function (e) {
          var t = e.getAction(),
            n = e.getCommand();
          if ("getTemp" !== n.$db[n.$db.length - 1].$method) throw new Error("multiSend只支持子命令内使用getTemp");
          return {
            action: t,
            command: n
          };
        });
      return this._callCloudFunction({
        multiCommand: t,
        queryList: e
      });
    }
  }, {
    key: "startTransaction",
    value: function startTransaction() {
      throw new Error("JQL 事务仅支持在云端使用");
    }
  }, {
    key: "commit",
    value: function commit() {
      throw new Error("JQL 事务仅支持在云端使用");
    }
  }, {
    key: "rollback",
    value: function rollback() {
      throw new Error("JQL 事务仅支持在云端使用");
    }
  }]);
  return _class5;
}());
var Ss = "token无效，跳转登录页面",
  bs = "token过期，跳转登录页面",
  ks = {
    TOKEN_INVALID_TOKEN_EXPIRED: bs,
    TOKEN_INVALID_INVALID_CLIENTID: Ss,
    TOKEN_INVALID: Ss,
    TOKEN_INVALID_WRONG_TOKEN: Ss,
    TOKEN_INVALID_ANONYMOUS_USER: Ss
  },
  As = {
    "uni-id-token-expired": bs,
    "uni-id-check-token-failed": Ss,
    "uni-id-token-not-exist": Ss,
    "uni-id-check-device-feature-failed": Ss
  },
  Ts = _objectSpread(_objectSpread(_objectSpread({}, ks), As), {}, {
    default: "用户未登录或登录状态过期，自动跳转登录页面"
  });
function Cs(e, t) {
  var n = "";
  return n = e ? "".concat(e, "/").concat(t) : t, n.replace(/^\//, "");
}
function Ps() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var n = [],
    s = [];
  return e.forEach(function (e) {
    !0 === e.needLogin ? n.push(Cs(t, e.path)) : !1 === e.needLogin && s.push(Cs(t, e.path));
  }), {
    needLoginPage: n,
    notNeedLoginPage: s
  };
}
function Os(e) {
  return e.split("?")[0].replace(/^\//, "");
}
function Es() {
  return function (e) {
    var t = e && e.$page && e.$page.fullPath;
    return t ? ("/" !== t.charAt(0) && (t = "/" + t), t) : "";
  }(function () {
    var e = getCurrentPages();
    return e[e.length - 1];
  }());
}
function xs() {
  return Os(Es());
}
function Ls() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!e) return !1;
  if (!(t && t.list && t.list.length)) return !1;
  var n = t.list,
    s = Os(e);
  return n.some(function (e) {
    return e.pagePath === s;
  });
}
var Us = !!_pages.default.uniIdRouter;
var _ref50 = function () {
    var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _pages.default,
      _ref8$pages = _ref8.pages,
      t = _ref8$pages === void 0 ? [] : _ref8$pages,
      _ref8$subPackages = _ref8.subPackages,
      n = _ref8$subPackages === void 0 ? [] : _ref8$subPackages,
      _ref8$uniIdRouter = _ref8.uniIdRouter,
      s = _ref8$uniIdRouter === void 0 ? {} : _ref8$uniIdRouter,
      _ref8$tabBar = _ref8.tabBar,
      r = _ref8$tabBar === void 0 ? {} : _ref8$tabBar;
    var i = s.loginPage,
      _s$needLogin = s.needLogin,
      o = _s$needLogin === void 0 ? [] : _s$needLogin,
      _s$resToLogin = s.resToLogin,
      a = _s$resToLogin === void 0 ? !0 : _s$resToLogin,
      _Ps = Ps(t),
      c = _Ps.needLoginPage,
      u = _Ps.notNeedLoginPage,
      _ref9 = function () {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var t = [],
          n = [];
        return e.forEach(function (e) {
          var s = e.root,
            _e$pages = e.pages,
            r = _e$pages === void 0 ? [] : _e$pages,
            _Ps2 = Ps(r, s),
            i = _Ps2.needLoginPage,
            o = _Ps2.notNeedLoginPage;
          t.push.apply(t, (0, _toConsumableArray2.default)(i)), n.push.apply(n, (0, _toConsumableArray2.default)(o));
        }), {
          needLoginPage: t,
          notNeedLoginPage: n
        };
      }(n),
      l = _ref9.needLoginPage,
      h = _ref9.notNeedLoginPage;
    return {
      loginPage: i,
      routerNeedLogin: o,
      resToLogin: a,
      needLoginPage: [].concat((0, _toConsumableArray2.default)(c), (0, _toConsumableArray2.default)(l)),
      notNeedLoginPage: [].concat((0, _toConsumableArray2.default)(u), (0, _toConsumableArray2.default)(h)),
      loginPageInTabBar: Ls(i, r)
    };
  }(),
  Rs = _ref50.loginPage,
  Ns = _ref50.routerNeedLogin,
  Ds = _ref50.resToLogin,
  Ms = _ref50.needLoginPage,
  qs = _ref50.notNeedLoginPage,
  Fs = _ref50.loginPageInTabBar;
if (Ms.indexOf(Rs) > -1) throw new Error("Login page [".concat(Rs, "] should not be \"needLogin\", please check your pages.json"));
function Ks(e) {
  var t = xs();
  if ("/" === e.charAt(0)) return e;
  var _e$split = e.split("?"),
    _e$split2 = (0, _slicedToArray2.default)(_e$split, 2),
    n = _e$split2[0],
    s = _e$split2[1],
    r = n.replace(/^\//, "").split("/"),
    i = t.split("/");
  i.pop();
  for (var _e23 = 0; _e23 < r.length; _e23++) {
    var _t17 = r[_e23];
    ".." === _t17 ? i.pop() : "." !== _t17 && i.push(_t17);
  }
  return "" === i[0] && i.shift(), "/" + i.join("/") + (s ? "?" + s : "");
}
function js(e, t) {
  return new RegExp(t).test(e);
}
function $s(_ref32) {
  var e = _ref32.redirect;
  var t = Os(e),
    n = Os(Rs);
  return xs() !== n && t !== n;
}
function Bs() {
  var _ref34 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    e = _ref34.api,
    t = _ref34.redirect;
  if (!t || !$s({
    redirect: t
  })) return;
  var n = function (e, t) {
    return "/" !== e.charAt(0) && (e = "/" + e), t ? e.indexOf("?") > -1 ? e + "&uniIdRedirectUrl=".concat(encodeURIComponent(t)) : e + "?uniIdRedirectUrl=".concat(encodeURIComponent(t)) : e;
  }(Rs, t);
  Fs ? "navigateTo" !== e && "redirectTo" !== e || (e = "switchTab") : "switchTab" === e && (e = "navigateTo");
  var s = {
    navigateTo: uni.navigateTo,
    redirectTo: uni.redirectTo,
    switchTab: uni.switchTab,
    reLaunch: uni.reLaunch
  };
  setTimeout(function () {
    s[e]({
      url: n
    });
  }, 0);
}
function Ws() {
  var _ref51 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    e = _ref51.url;
  var t = {
      abortLoginPageJump: !1,
      autoToLoginPage: !1
    },
    n = function () {
      var _oe4 = oe(),
        e = _oe4.token,
        t = _oe4.tokenExpired;
      var n;
      if (e) {
        if (t < Date.now()) {
          var _e24 = "uni-id-token-expired";
          n = {
            errCode: _e24,
            errMsg: Ts[_e24]
          };
        }
      } else {
        var _e25 = "uni-id-check-token-failed";
        n = {
          errCode: _e25,
          errMsg: Ts[_e25]
        };
      }
      return n;
    }();
  if (function (e) {
    var t = Os(Ks(e));
    return !(qs.indexOf(t) > -1) && (Ms.indexOf(t) > -1 || Ns.some(function (n) {
      return js(t, n) || js(e, n);
    }));
  }(e) && n) {
    n.uniIdRedirectUrl = e;
    if (Q(W).length > 0) return setTimeout(function () {
      Z(W, n);
    }, 0), t.abortLoginPageJump = !0, t;
    t.autoToLoginPage = !0;
  }
  return t;
}
function Hs() {
  var e = Es(),
    _Ws = Ws({
      url: e
    }),
    t = _Ws.abortLoginPageJump,
    n = _Ws.autoToLoginPage;
  t || n && Bs({
    api: "redirectTo",
    redirect: e
  });
}
function Js() {
  Hs();
  var e = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
  var _loop3 = function _loop3(_t18) {
    var n = e[_t18];
    uni.addInterceptor(n, {
      invoke: function invoke(e) {
        var _Ws2 = Ws({
            url: e.url
          }),
          t = _Ws2.abortLoginPageJump,
          s = _Ws2.autoToLoginPage;
        return t ? e : s ? (Bs({
          api: n,
          redirect: Ks(e.url)
        }), !1) : e;
      }
    }), "web" === T && window.addEventListener("popstate", function () {
      (0 === getCurrentPages().length ? (te = !1, ee = null, ne()) : Promise.resolve()).then(function () {
        Hs();
      });
    });
  };
  for (var _t18 = 0; _t18 < e.length; _t18++) {
    _loop3(_t18);
  }
}
function zs() {
  this.onResponse(function (e) {
    var t = e.type,
      n = e.content;
    var s = !1;
    switch (t) {
      case "cloudobject":
        s = function (e) {
          if ("object" != (0, _typeof2.default)(e)) return !1;
          var _ref52 = e || {},
            t = _ref52.errCode;
          return t in Ts;
        }(n);
        break;
      case "clientdb":
        s = function (e) {
          if ("object" != (0, _typeof2.default)(e)) return !1;
          var _ref53 = e || {},
            t = _ref53.errCode;
          return t in ks;
        }(n);
    }
    s && function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var t = Q(W);
      ne().then(function () {
        var n = Es();
        if (n && $s({
          redirect: n
        })) return t.length > 0 ? Z(W, Object.assign({
          uniIdRedirectUrl: n
        }, e)) : void (Rs && Bs({
          api: "navigateTo",
          redirect: n
        }));
      });
    }(n);
  });
}
function Vs(e) {
  e.onNeedLogin = function (e) {
    Y(W, e);
  }, e.offNeedLogin = function (e) {
    X(W, e);
  }, Us && (U("_globalUniCloudStatus").needLoginInit || (U("_globalUniCloudStatus").needLoginInit = !0, ne().then(function () {
    Js.call(e);
  }), Ds && zs.call(e)));
}
function Gs(e) {
  e.onFailover = function (e) {
    Y(J, e);
  }, e.offFailover = function (e) {
    X(J, e);
  }, e.refreshFailoverConfig = function () {
    return e.config, en(0), nn();
  }, e.clearFailoverConfig = function () {
    !function () {
      Vt = null, Gt = 0;
      try {
        ie.removeStorageSync(Xt("UNICLOUD_FAILOVER_CONFIG")), ie.removeStorageSync(Xt("UNICLOUD_FAILOVER_LAST_REQUEST"));
      } catch (e) {}
    }();
  };
}
function Qs(e) {
  !function (e) {
    e.onResponse = function (e) {
      Y(B, e);
    }, e.offResponse = function (e) {
      X(B, e);
    };
  }(e), Vs(e), function (e) {
    e.onRefreshToken = function (e) {
      Y(H, e);
    }, e.offRefreshToken = function (e) {
      X(H, e);
    };
  }(e), Gs(e);
}
var Ys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  Xs = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
function Zs(e) {
  return decodeURIComponent(function (e) {
    if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !Xs.test(e)) throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    var t;
    e += "==".slice(2 - (3 & e.length));
    for (var n, s, r = "", i = 0; i < e.length;) {
      t = Ys.indexOf(e.charAt(i++)) << 18 | Ys.indexOf(e.charAt(i++)) << 12 | (n = Ys.indexOf(e.charAt(i++))) << 6 | (s = Ys.indexOf(e.charAt(i++))), r += 64 === n ? String.fromCharCode(t >> 16 & 255) : 64 === s ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);
    }
    return r;
  }(e).split("").map(function (e) {
    return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function er() {
  var e = oe().token || "",
    t = e.split(".");
  if (!e || 3 !== t.length) return {
    uid: null,
    role: [],
    permission: [],
    tokenExpired: 0
  };
  var n;
  try {
    n = JSON.parse(Zs(t[1]));
  } catch (e) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + e.message);
  }
  return n.tokenExpired = 1e3 * n.exp, delete n.exp, delete n.iat, n;
}
var tr = n(function (e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = "chooseAndUploadFile:ok",
      s = "chooseAndUploadFile:fail";
    function r(e, t) {
      return e.tempFiles.forEach(function (e, n) {
        e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + n + e.name.substring(e.name.lastIndexOf("."));
      }), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map(function (e) {
        return e.path;
      })), e;
    }
    function i(e, t, _ref54) {
      var s = _ref54.onChooseFile,
        r = _ref54.onUploadProgress;
      return t.then(function (e) {
        if (s) {
          var _t19 = s(e);
          if (void 0 !== _t19) return Promise.resolve(_t19).then(function (t) {
            return void 0 === t ? e : t;
          });
        }
        return e;
      }).then(function (t) {
        return !1 === t ? {
          errMsg: n,
          tempFilePaths: [],
          tempFiles: []
        } : function (e, t) {
          var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
          var r = arguments.length > 3 ? arguments[3] : undefined;
          (t = Object.assign({}, t)).errMsg = n;
          var i = t.tempFiles,
            o = i.length;
          var a = 0;
          return new Promise(function (n) {
            for (; a < s;) {
              c();
            }
            function c() {
              var s = a++;
              if (s >= o) return void (!i.find(function (e) {
                return !e.url && !e.errMsg;
              }) && n(t));
              var u = i[s];
              e.uploadFile({
                provider: u.provider,
                filePath: u.path,
                cloudPath: u.cloudPath,
                fileType: u.fileType,
                cloudPathAsRealPath: u.cloudPathAsRealPath,
                onUploadProgress: function onUploadProgress(e) {
                  e.index = s, e.tempFile = u, e.tempFilePath = u.path, r && r(e);
                }
              }).then(function (e) {
                u.url = e.fileID, s < o && c();
              }).catch(function (e) {
                u.errMsg = e.errMsg || e.message, s < o && c();
              });
            }
          });
        }(e, t, 5, r);
      });
    }
    t.initChooseAndUploadFile = function (e) {
      return function () {
        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          type: "all"
        };
        return "image" === t.type ? i(e, function (e) {
          var t = e.count,
            n = e.sizeType,
            _e$sourceType = e.sourceType,
            i = _e$sourceType === void 0 ? ["album", "camera"] : _e$sourceType,
            o = e.extension;
          return new Promise(function (e, a) {
            uni.chooseImage({
              count: t,
              sizeType: n,
              sourceType: i,
              extension: o,
              success: function success(t) {
                e(r(t, "image"));
              },
              fail: function fail(e) {
                a({
                  errMsg: e.errMsg.replace("chooseImage:fail", s)
                });
              }
            });
          });
        }(t), t) : "video" === t.type ? i(e, function (e) {
          var t = e.camera,
            n = e.compressed,
            i = e.maxDuration,
            _e$sourceType2 = e.sourceType,
            o = _e$sourceType2 === void 0 ? ["album", "camera"] : _e$sourceType2,
            a = e.extension;
          return new Promise(function (e, c) {
            uni.chooseVideo({
              camera: t,
              compressed: n,
              maxDuration: i,
              sourceType: o,
              extension: a,
              success: function success(t) {
                var n = t.tempFilePath,
                  s = t.duration,
                  i = t.size,
                  o = t.height,
                  a = t.width;
                e(r({
                  errMsg: "chooseVideo:ok",
                  tempFilePaths: [n],
                  tempFiles: [{
                    name: t.tempFile && t.tempFile.name || "",
                    path: n,
                    size: i,
                    type: t.tempFile && t.tempFile.type || "",
                    width: a,
                    height: o,
                    duration: s,
                    fileType: "video",
                    cloudPath: ""
                  }]
                }, "video"));
              },
              fail: function fail(e) {
                c({
                  errMsg: e.errMsg.replace("chooseVideo:fail", s)
                });
              }
            });
          });
        }(t), t) : i(e, function (e) {
          var t = e.count,
            n = e.extension;
          return new Promise(function (e, i) {
            var o = uni.chooseFile;
            if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (o = wx.chooseMessageFile), "function" != typeof o) return i({
              errMsg: s + " 请指定 type 类型，该平台仅支持选择 image 或 video。"
            });
            o({
              type: "all",
              count: t,
              extension: n,
              success: function success(t) {
                e(r(t));
              },
              fail: function fail(e) {
                i({
                  errMsg: e.errMsg.replace("chooseFile:fail", s)
                });
              }
            });
          });
        }(t), t);
      };
    };
  }),
  nr = t(tr);
var sr = "manual";
function rr(e) {
  return {
    props: {
      localdata: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      options: {
        type: [Object, Array],
        default: function _default() {
          return {};
        }
      },
      spaceInfo: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      collection: {
        type: [String, Array],
        default: ""
      },
      action: {
        type: String,
        default: ""
      },
      field: {
        type: String,
        default: ""
      },
      orderby: {
        type: String,
        default: ""
      },
      where: {
        type: [String, Object],
        default: ""
      },
      pageData: {
        type: String,
        default: "add"
      },
      pageCurrent: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 20
      },
      getcount: {
        type: [Boolean, String],
        default: !1
      },
      gettree: {
        type: [Boolean, String],
        default: !1
      },
      gettreepath: {
        type: [Boolean, String],
        default: !1
      },
      startwith: {
        type: String,
        default: ""
      },
      limitlevel: {
        type: Number,
        default: 10
      },
      groupby: {
        type: String,
        default: ""
      },
      groupField: {
        type: String,
        default: ""
      },
      distinct: {
        type: [Boolean, String],
        default: !1
      },
      foreignKey: {
        type: String,
        default: ""
      },
      loadtime: {
        type: String,
        default: "auto"
      },
      manual: {
        type: Boolean,
        default: !1
      }
    },
    data: function data() {
      return {
        mixinDatacomLoading: !1,
        mixinDatacomHasMore: !1,
        mixinDatacomResData: [],
        mixinDatacomErrorMessage: "",
        mixinDatacomPage: {},
        mixinDatacomError: null
      };
    },
    created: function created() {
      var _this25 = this;
      this.mixinDatacomPage = {
        current: this.pageCurrent,
        size: this.pageSize,
        count: 0
      }, this.$watch(function () {
        var e = [];
        return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach(function (t) {
          e.push(_this25[t]);
        }), e;
      }, function (e, t) {
        if (_this25.loadtime === sr) return;
        var n = !1;
        var s = [];
        for (var _r10 = 2; _r10 < e.length; _r10++) {
          e[_r10] !== t[_r10] && (s.push(e[_r10]), n = !0);
        }
        e[0] !== t[0] && (_this25.mixinDatacomPage.current = _this25.pageCurrent), _this25.mixinDatacomPage.size = _this25.pageSize, _this25.onMixinDatacomPropsChange(n, s);
      });
    },
    methods: {
      onMixinDatacomPropsChange: function onMixinDatacomPropsChange(e, t) {},
      mixinDatacomEasyGet: function mixinDatacomEasyGet() {
        var _this26 = this;
        var _ref55 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref55$getone = _ref55.getone,
          e = _ref55$getone === void 0 ? !1 : _ref55$getone,
          t = _ref55.success,
          n = _ref55.fail;
        this.mixinDatacomLoading || (this.mixinDatacomLoading = !0, this.mixinDatacomErrorMessage = "", this.mixinDatacomError = null, this.mixinDatacomGet().then(function (n) {
          _this26.mixinDatacomLoading = !1;
          var _n$result = n.result,
            s = _n$result.data,
            r = _n$result.count;
          _this26.getcount && (_this26.mixinDatacomPage.count = r), _this26.mixinDatacomHasMore = s.length < _this26.pageSize;
          var i = e ? s.length ? s[0] : void 0 : s;
          _this26.mixinDatacomResData = i, t && t(i);
        }).catch(function (e) {
          _this26.mixinDatacomLoading = !1, _this26.mixinDatacomErrorMessage = e, _this26.mixinDatacomError = e, n && n(e);
        }));
      },
      mixinDatacomGet: function mixinDatacomGet() {
        var _n18;
        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var n;
        t = t || {}, n = "undefined" != typeof __uniX && __uniX ? e.databaseForJQL(this.spaceInfo) : e.database(this.spaceInfo);
        var s = t.action || this.action;
        s && (n = n.action(s));
        var r = t.collection || this.collection;
        n = Array.isArray(r) ? (_n18 = n).collection.apply(_n18, (0, _toConsumableArray2.default)(r)) : n.collection(r);
        var i = t.where || this.where;
        i && Object.keys(i).length && (n = n.where(i));
        var o = t.field || this.field;
        o && (n = n.field(o));
        var a = t.foreignKey || this.foreignKey;
        a && (n = n.foreignKey(a));
        var c = t.groupby || this.groupby;
        c && (n = n.groupBy(c));
        var u = t.groupField || this.groupField;
        u && (n = n.groupField(u));
        !0 === (void 0 !== t.distinct ? t.distinct : this.distinct) && (n = n.distinct());
        var l = t.orderby || this.orderby;
        l && (n = n.orderBy(l));
        var h = void 0 !== t.pageCurrent ? t.pageCurrent : this.mixinDatacomPage.current,
          d = void 0 !== t.pageSize ? t.pageSize : this.mixinDatacomPage.size,
          p = void 0 !== t.getcount ? t.getcount : this.getcount,
          f = void 0 !== t.gettree ? t.gettree : this.gettree,
          g = void 0 !== t.gettreepath ? t.gettreepath : this.gettreepath,
          m = {
            getCount: p
          },
          y = {
            limitLevel: void 0 !== t.limitlevel ? t.limitlevel : this.limitlevel,
            startWith: void 0 !== t.startwith ? t.startwith : this.startwith
          };
        return f && (m.getTree = y), g && (m.getTreePath = y), n = n.skip(d * (h - 1)).limit(d).get(m), n;
      }
    }
  };
}
function ir(e) {
  return function (t) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    n = function (e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return e.customUI = t.customUI || e.customUI, e.parseSystemError = t.parseSystemError || e.parseSystemError, Object.assign(e.loadingOptions, t.loadingOptions), Object.assign(e.errorOptions, t.errorOptions), "object" == (0, _typeof2.default)(t.secretMethods) && (e.secretMethods = t.secretMethods), e;
    }({
      customUI: !1,
      loadingOptions: {
        title: "加载中...",
        mask: !0
      },
      errorOptions: {
        type: "modal",
        retry: !1
      }
    }, n);
    var _n19 = n,
      s = _n19.customUI,
      r = _n19.loadingOptions,
      i = _n19.errorOptions,
      o = _n19.parseSystemError,
      a = !s;
    return new Proxy({}, {
      get: function get(s, c) {
        switch (c) {
          case "toString":
            return "[object UniCloudObject]";
          case "toJSON":
            return {};
        }
        return function () {
          var _ref56 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            e = _ref56.fn,
            t = _ref56.interceptorName,
            n = _ref56.getCallbackArgs;
          return /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee64() {
            var _len2,
              s,
              _key2,
              r,
              i,
              o,
              _args = arguments;
            return _regenerator.default.wrap(function _callee64$(_context64) {
              while (1) {
                switch (_context64.prev = _context64.next) {
                  case 0:
                    for (_len2 = _args.length, s = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                      s[_key2] = _args[_key2];
                    }
                    r = n ? n({
                      params: s
                    }) : {};
                    _context64.prev = 2;
                    _context64.next = 5;
                    return F(K(t, "invoke"), _objectSpread({}, r));
                  case 5:
                    _context64.next = 7;
                    return e.apply(void 0, s);
                  case 7:
                    i = _context64.sent;
                    _context64.next = 10;
                    return F(K(t, "success"), _objectSpread(_objectSpread({}, r), {}, {
                      result: i
                    }));
                  case 10:
                    return _context64.abrupt("return", i);
                  case 13:
                    _context64.prev = 13;
                    _context64.t0 = _context64["catch"](2);
                    o = _context64.t0;
                    _context64.next = 18;
                    return F(K(t, "fail"), _objectSpread(_objectSpread({}, r), {}, {
                      error: o
                    }));
                  case 18:
                    throw o;
                  case 19:
                    _context64.prev = 19;
                    _context64.next = 22;
                    return F(K(t, "complete"), o ? _objectSpread(_objectSpread({}, r), {}, {
                      error: o
                    }) : _objectSpread(_objectSpread({}, r), {}, {
                      result: i
                    }));
                  case 22:
                    return _context64.finish(19);
                  case 23:
                  case "end":
                    return _context64.stop();
                }
              }
            }, _callee64, null, [[2, 13, 19, 23]]);
          }));
        }({
          fn: function () {
            var _s18 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee66() {
              var h,
                _len3,
                l,
                _key3,
                d,
                p,
                _ref58,
                f,
                g,
                m,
                y,
                _e26,
                _yield,
                _t20,
                _n20,
                _args4 = arguments;
              return _regenerator.default.wrap(function _callee66$(_context66) {
                while (1) {
                  switch (_context66.prev = _context66.next) {
                    case 0:
                      a && uni.showLoading({
                        title: r.title,
                        mask: r.mask
                      });
                      for (_len3 = _args4.length, l = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                        l[_key3] = _args4[_key3];
                      }
                      d = {
                        name: t,
                        type: u,
                        data: {
                          method: c,
                          params: l
                        }
                      };
                      "object" == (0, _typeof2.default)(n.secretMethods) && function (e, t) {
                        var n = t.data.method,
                          s = e.secretMethods || {},
                          r = s[n] || s["*"];
                        r && (t.secretType = r);
                      }(n, d);
                      p = !1;
                      _context66.prev = 5;
                      _context66.next = 8;
                      return e.callFunction(d);
                    case 8:
                      h = _context66.sent;
                      _context66.next = 14;
                      break;
                    case 11:
                      _context66.prev = 11;
                      _context66.t0 = _context66["catch"](5);
                      p = !0, h = {
                        result: new re(_context66.t0)
                      };
                    case 14:
                      _ref58 = h.result || {}, f = _ref58.errSubject, g = _ref58.errCode, m = _ref58.errMsg, y = _ref58.newToken;
                      if (!(a && uni.hideLoading(), y && y.token && y.tokenExpired && (ae(y), Z(H, _objectSpread({}, y))), g)) {
                        _context66.next = 39;
                        break;
                      }
                      _e26 = m;
                      if (!(p && o)) {
                        _context66.next = 24;
                        break;
                      }
                      _context66.next = 20;
                      return o({
                        objectName: t,
                        methodName: c,
                        params: l,
                        errSubject: f,
                        errCode: g,
                        errMsg: m
                      });
                    case 20:
                      _context66.t1 = _context66.sent.errMsg;
                      if (_context66.t1) {
                        _context66.next = 23;
                        break;
                      }
                      _context66.t1 = m;
                    case 23:
                      _e26 = _context66.t1;
                    case 24:
                      if (!a) {
                        _context66.next = 37;
                        break;
                      }
                      if (!("toast" === i.type)) {
                        _context66.next = 29;
                        break;
                      }
                      uni.showToast({
                        title: _e26,
                        icon: "none"
                      });
                      _context66.next = 37;
                      break;
                    case 29:
                      if (!("modal" !== i.type)) {
                        _context66.next = 31;
                        break;
                      }
                      throw new Error("Invalid errorOptions.type: ".concat(i.type));
                    case 31:
                      _context66.next = 33;
                      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee65() {
                        var _ref60,
                          e,
                          t,
                          n,
                          s,
                          r,
                          _args2 = arguments;
                        return _regenerator.default.wrap(function _callee65$(_context65) {
                          while (1) {
                            switch (_context65.prev = _context65.next) {
                              case 0:
                                _ref60 = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {}, e = _ref60.title, t = _ref60.content, n = _ref60.showCancel, s = _ref60.cancelText, r = _ref60.confirmText;
                                return _context65.abrupt("return", new Promise(function (i, o) {
                                  uni.showModal({
                                    title: e,
                                    content: t,
                                    showCancel: n,
                                    cancelText: s,
                                    confirmText: r,
                                    success: function success(e) {
                                      i(e);
                                    },
                                    fail: function fail() {
                                      i({
                                        confirm: !1,
                                        cancel: !0
                                      });
                                    }
                                  });
                                }));
                              case 2:
                              case "end":
                                return _context65.stop();
                            }
                          }
                        }, _callee65);
                      }))({
                        title: "提示",
                        content: _e26,
                        showCancel: i.retry,
                        cancelText: "取消",
                        confirmText: i.retry ? "重试" : "确定"
                      });
                    case 33:
                      _yield = _context66.sent;
                      _t20 = _yield.confirm;
                      if (!(i.retry && _t20)) {
                        _context66.next = 37;
                        break;
                      }
                      return _context66.abrupt("return", s.apply(void 0, l));
                    case 37:
                      _n20 = new re({
                        subject: f,
                        code: g,
                        message: m,
                        requestId: h.requestId
                      });
                      throw _n20.detail = h.result, Z(B, {
                        type: G,
                        content: _n20
                      }), _n20;
                    case 39:
                      return _context66.abrupt("return", (Z(B, {
                        type: G,
                        content: h.result
                      }), h.result));
                    case 40:
                    case "end":
                      return _context66.stop();
                  }
                }
              }, _callee66, null, [[5, 11]]);
            }));
            function s() {
              return _s18.apply(this, arguments);
            }
            return s;
          }(),
          interceptorName: "callObject",
          getCallbackArgs: function getCallbackArgs() {
            var _ref61 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              e = _ref61.params;
            return {
              objectName: t,
              methodName: c,
              params: e
            };
          }
        });
      }
    });
  };
}
function or(e) {
  return U("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e.config.spaceId));
}
function ar() {
  return _ar.apply(this, arguments);
}
function _ar() {
  _ar = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee72() {
    var _ref72,
      e,
      _ref72$callLoginByWei,
      t,
      n,
      s,
      r,
      _args11 = arguments;
    return _regenerator.default.wrap(function _callee72$(_context72) {
      while (1) {
        switch (_context72.prev = _context72.next) {
          case 0:
            _ref72 = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : {}, e = _ref72.openid, _ref72$callLoginByWei = _ref72.callLoginByWeixin, t = _ref72$callLoginByWei === void 0 ? !1 : _ref72$callLoginByWei;
            n = or(this);
            if (!("mp-weixin" !== T)) {
              _context72.next = 4;
              break;
            }
            throw new Error("[SecureNetwork] API `initSecureNetworkByWeixin` is not supported on platform `".concat(T, "`"));
          case 4:
            if (!(e && t)) {
              _context72.next = 6;
              break;
            }
            throw new Error("[SecureNetwork] openid and callLoginByWeixin cannot be passed at the same time");
          case 6:
            if (!e) {
              _context72.next = 8;
              break;
            }
            return _context72.abrupt("return", (n.mpWeixinOpenid = e, {}));
          case 8:
            _context72.next = 10;
            return new Promise(function (e, t) {
              uni.login({
                success: function success(t) {
                  e(t.code);
                },
                fail: function fail(e) {
                  t(new Error(e.errMsg));
                }
              });
            });
          case 10:
            s = _context72.sent;
            r = this.importObject("uni-id-co", {
              customUI: !0
            });
            _context72.next = 14;
            return r.secureNetworkHandshakeByWeixin({
              code: s,
              callLoginByWeixin: t
            });
          case 14:
            n.mpWeixinCode = s;
            return _context72.abrupt("return", {
              code: s
            });
          case 16:
          case "end":
            return _context72.stop();
        }
      }
    }, _callee72, this);
  }));
  return _ar.apply(this, arguments);
}
function cr(_x52) {
  return _cr.apply(this, arguments);
}
function _cr() {
  _cr = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee73(e) {
    var t;
    return _regenerator.default.wrap(function _callee73$(_context73) {
      while (1) {
        switch (_context73.prev = _context73.next) {
          case 0:
            t = or(this);
            return _context73.abrupt("return", (t.initPromise || (t.initPromise = ar.call(this, e).then(function (e) {
              return e;
            }).catch(function (e) {
              throw delete t.initPromise, e;
            })), t.initPromise));
          case 2:
          case "end":
            return _context73.stop();
        }
      }
    }, _callee73, this);
  }));
  return _cr.apply(this, arguments);
}
function ur(e) {
  return function () {
    var _ref62 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      t = _ref62.openid,
      _ref62$callLoginByWei = _ref62.callLoginByWeixin,
      n = _ref62$callLoginByWei === void 0 ? !1 : _ref62$callLoginByWei;
    return cr.call(e, {
      openid: t,
      callLoginByWeixin: n
    });
  };
}
function lr(e) {
  !function (e) {
    de = e;
  }(e);
}
function hr(e) {
  var t = "mp-weixin" === T && wx.canIUse("getAppBaseInfo"),
    n = {
      getAppBaseInfo: t ? uni.getAppBaseInfo : uni.getSystemInfo,
      getPushClientId: uni.getPushClientId
    };
  return function (s) {
    return new Promise(function (r, i) {
      t && "getAppBaseInfo" === e ? r(n[e]()) : n[e](_objectSpread(_objectSpread({}, s), {}, {
        success: function success(e) {
          r(e);
        },
        fail: function fail(e) {
          i(e);
        }
      }));
    });
  };
}
var dr = /*#__PURE__*/function (_ref63) {
  (0, _inherits2.default)(dr, _ref63);
  var _super11 = _createSuper(dr);
  function dr() {
    var _this27;
    (0, _classCallCheck2.default)(this, dr);
    _this27 = _super11.call(this), _this27._uniPushMessageCallback = _this27._receivePushMessage.bind((0, _assertThisInitialized2.default)(_this27)), _this27._currentMessageId = -1, _this27._payloadQueue = [];
    return _this27;
  }
  (0, _createClass2.default)(dr, [{
    key: "init",
    value: function init() {
      var _this28 = this;
      return Promise.all([hr("getAppBaseInfo")(), hr("getPushClientId")()]).then(function () {
        var _ref64 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [],
          _ref65 = (0, _slicedToArray2.default)(_ref64, 2),
          _ref65$ = _ref65[0];
        _ref65$ = _ref65$ === void 0 ? {} : _ref65$;
        var e = _ref65$.appId,
          _ref65$2 = _ref65[1];
        _ref65$2 = _ref65$2 === void 0 ? {} : _ref65$2;
        var t = _ref65$2.cid;
        if (!e) throw new Error("Invalid appId, please check the manifest.json file");
        if (!t) throw new Error("Invalid push client id");
        _this28._appId = e, _this28._pushClientId = t, _this28._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), _this28.emit("open"), _this28._initMessageListener();
      }, function (e) {
        throw _this28.emit("error", e), _this28.close(), e;
      });
    }
  }, {
    key: "open",
    value: function () {
      var _open = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee67() {
        return _regenerator.default.wrap(function _callee67$(_context67) {
          while (1) {
            switch (_context67.prev = _context67.next) {
              case 0:
                return _context67.abrupt("return", this.init());
              case 1:
              case "end":
                return _context67.stop();
            }
          }
        }, _callee67, this);
      }));
      function open() {
        return _open.apply(this, arguments);
      }
      return open;
    }()
  }, {
    key: "_isUniCloudSSE",
    value: function _isUniCloudSSE(e) {
      if ("receive" !== e.type) return !1;
      var t = e && e.data && e.data.payload;
      return !(!t || "UNI_CLOUD_SSE" !== t.channel || t.seqId !== this._seqId);
    }
  }, {
    key: "_receivePushMessage",
    value: function _receivePushMessage(e) {
      if (!this._isUniCloudSSE(e)) return;
      var t = e && e.data && e.data.payload,
        n = t.action,
        s = t.messageId,
        r = t.message;
      this._payloadQueue.push({
        action: n,
        messageId: s,
        message: r
      }), this._consumMessage();
    }
  }, {
    key: "_consumMessage",
    value: function _consumMessage() {
      var _this29 = this;
      for (;;) {
        var _e27 = this._payloadQueue.find(function (e) {
          return e.messageId === _this29._currentMessageId + 1;
        });
        if (!_e27) break;
        this._currentMessageId++, this._parseMessagePayload(_e27);
      }
    }
  }, {
    key: "_parseMessagePayload",
    value: function _parseMessagePayload(e) {
      var t = e.action,
        n = e.messageId,
        s = e.message;
      "end" === t ? this._end({
        messageId: n,
        message: s
      }) : "message" === t && this._appendMessage({
        messageId: n,
        message: s
      });
    }
  }, {
    key: "_appendMessage",
    value: function _appendMessage() {
      var _ref66 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        e = _ref66.messageId,
        t = _ref66.message;
      this.emit("message", t);
    }
  }, {
    key: "_end",
    value: function _end() {
      var _ref67 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        e = _ref67.messageId,
        t = _ref67.message;
      this.emit("end", t), this.close();
    }
  }, {
    key: "_initMessageListener",
    value: function _initMessageListener() {
      uni.onPushMessage(this._uniPushMessageCallback);
    }
  }, {
    key: "_destroy",
    value: function _destroy() {
      uni.offPushMessage(this._uniPushMessageCallback);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        appId: this._appId,
        pushClientId: this._pushClientId,
        seqId: this._seqId
      };
    }
  }, {
    key: "close",
    value: function close() {
      this._destroy(), this.emit("close");
    }
  }]);
  return dr;
}( /*#__PURE__*/function () {
  function _class6() {
    (0, _classCallCheck2.default)(this, _class6);
    this._callback = {};
  }
  (0, _createClass2.default)(_class6, [{
    key: "addListener",
    value: function addListener(e, t) {
      this._callback[e] || (this._callback[e] = []), this._callback[e].push(t);
    }
  }, {
    key: "on",
    value: function on(e, t) {
      return this.addListener(e, t);
    }
  }, {
    key: "removeListener",
    value: function removeListener(e, t) {
      if (!t) throw new Error('The "listener" argument must be of type function. Received undefined');
      var n = this._callback[e];
      if (!n) return;
      var s = function (e, t) {
        for (var _n21 = e.length - 1; _n21 >= 0; _n21--) {
          if (e[_n21] === t) return _n21;
        }
        return -1;
      }(n, t);
      n.splice(s, 1);
    }
  }, {
    key: "off",
    value: function off(e, t) {
      return this.removeListener(e, t);
    }
  }, {
    key: "removeAllListener",
    value: function removeAllListener(e) {
      delete this._callback[e];
    }
  }, {
    key: "emit",
    value: function emit(e) {
      var n = this._callback[e];
      for (var _len4 = arguments.length, t = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        t[_key4 - 1] = arguments[_key4];
      }
      if (n) for (var _e28 = 0; _e28 < n.length; _e28++) {
        n[_e28].apply(n, t);
      }
    }
  }]);
  return _class6;
}());
function pr(_x53) {
  return _pr.apply(this, arguments);
}
function _pr() {
  _pr = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee74(e) {
    var _le2, _e34, _t22, t, _t$debugInfo, n, s, _yield$xt2, r, i, o;
    return _regenerator.default.wrap(function _callee74$(_context74) {
      while (1) {
        switch (_context74.prev = _context74.next) {
          case 0:
            if (S) {
              _context74.next = 2;
              break;
            }
            return _context74.abrupt("return", Promise.resolve());
          case 2:
            if ("app" === T) {
              _le2 = le(), _e34 = _le2.osName, _t22 = _le2.osVersion;
              "ios" === _e34 && function (e) {
                if (!e || "string" != typeof e) return 0;
                var t = e.match(/^(\d+)./);
                return t && t[1] ? parseInt(t[1]) : 0;
              }(_t22) >= 14 && console.warn("iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发期间需要，发行后不需要）");
            }
            t = e.__dev__;
            if (t.debugInfo) {
              _context74.next = 6;
              break;
            }
            return _context74.abrupt("return");
          case 6:
            _t$debugInfo = t.debugInfo;
            n = _t$debugInfo.address;
            s = _t$debugInfo.servePort;
            _context74.next = 11;
            return xt(n, s);
          case 11:
            _yield$xt2 = _context74.sent;
            r = _yield$xt2.address;
            if (!r) {
              _context74.next = 15;
              break;
            }
            return _context74.abrupt("return", (t.localAddress = r, void (t.localPort = s)));
          case 15:
            i = console["app" === T ? "error" : "warn"];
            o = "";
            if (!("remote" === t.debugInfo.initialLaunchType ? (t.debugInfo.forceRemote = !0, o = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : o = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", o += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", "web" === T && (o += "\n- 部分浏览器开启节流模式之后访问本地地址受限，请检查是否启用了节流模式"), 0 === T.indexOf("mp-") && (o += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), !t.debugInfo.forceRemote)) {
              _context74.next = 19;
              break;
            }
            throw new Error(o);
          case 19:
            i(o);
          case 20:
          case "end":
            return _context74.stop();
        }
      }
    }, _callee74);
  }));
  return _pr.apply(this, arguments);
}
function fr(e) {
  e._initPromiseHub || (e._initPromiseHub = new v({
    createPromise: function createPromise() {
      var t = Promise.resolve();
      var n;
      n = 1, t = new Promise(function (e) {
        setTimeout(function () {
          e();
        }, n);
      });
      var s = e.auth();
      return t.then(function () {
        return s.getLoginState();
      }).then(function (e) {
        return e ? Promise.resolve() : s.signInAnonymously();
      });
    }
  }));
}
var gr = {
  tcb: Ot,
  tencent: Ot,
  aliyun: me,
  private: Rt,
  dcloud: Rt,
  alipay: Ht
};
var mr = new ( /*#__PURE__*/function () {
  function _class7() {
    (0, _classCallCheck2.default)(this, _class7);
  }
  (0, _createClass2.default)(_class7, [{
    key: "init",
    value: function init(e) {
      var t = {};
      var n = gr[e.provider];
      if (!n) throw new Error("未提供正确的provider参数");
      t = n.init(e), S && function (e) {
        if (!S) return;
        var t = {};
        e.__dev__ = t, t.debugLog = S && ("web" === T && navigator.userAgent.indexOf("HBuilderX") > 0 || "app" === T || "mp-harmony" === T);
        var n = C;
        n && !n.code && (t.debugInfo = n);
        var s = new v({
          createPromise: function createPromise() {
            return pr(e);
          }
        });
        t.initLocalNetwork = function () {
          return s.exec();
        };
      }(t), fr(t), us(t), function (e) {
        var t = e.uploadFile;
        e.uploadFile = function (e) {
          return t.call(this, e);
        };
      }(t), function (e) {
        e.database = function (t) {
          if (t && Object.keys(t).length > 0) return e.init(t).database();
          if (this._database) return this._database;
          var n = vs(Is, {
            uniClient: e
          });
          return this._database = n, n;
        }, e.databaseForJQL = function (t) {
          if (t && Object.keys(t).length > 0) return e.init(t).databaseForJQL();
          if (this._databaseForJQL) return this._databaseForJQL;
          var n = vs(Is, {
            uniClient: e,
            isJQL: !0
          });
          return this._databaseForJQL = n, n;
        };
      }(t), function (e) {
        e.getCurrentUserInfo = er, e.chooseAndUploadFile = nr.initChooseAndUploadFile(e), Object.assign(e, {
          get mixinDatacom() {
            return rr(e);
          }
        }), e.SSEChannel = dr, e.initSecureNetworkByWeixin = ur(e), e.setCustomClientInfo = lr, e.importObject = ir(e);
      }(t);
      return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach(function (e) {
        if (!t[e]) return;
        var n = t[e];
        t[e] = function () {
          return n.apply(t, Array.from(arguments));
        }, t[e] = function (e, t) {
          return function (n) {
            var _this30 = this;
            var s = !1;
            if ("callFunction" === t) {
              var _e29 = n && n.type || c;
              s = _e29 !== c;
            }
            var r = "callFunction" === t && !s,
              i = this._initPromiseHub.exec();
            n = n || {};
            var _se2 = se(n),
              o = _se2.success,
              a = _se2.fail,
              u = _se2.complete,
              l = i.then(function () {
                return s ? Promise.resolve() : F(K(t, "invoke"), n);
              }).then(function () {
                return e.call(_this30, n);
              }).then(function (e) {
                return s ? Promise.resolve(e) : F(K(t, "success"), e).then(function () {
                  return F(K(t, "complete"), e);
                }).then(function () {
                  return r && Z(B, {
                    type: V,
                    content: e
                  }), Promise.resolve(e);
                });
              }, function (e) {
                return s ? Promise.reject(e) : F(K(t, "fail"), e).then(function () {
                  return F(K(t, "complete"), e);
                }).then(function () {
                  return Z(B, {
                    type: V,
                    content: e
                  }), Promise.reject(e);
                });
              });
            if (!(o || a || u)) return l;
            l.then(function (e) {
              o && o(e), u && u(e), r && Z(B, {
                type: V,
                content: e
              });
            }, function (e) {
              a && a(e), u && u(e), r && Z(B, {
                type: V,
                content: e
              });
            });
          };
        }(t[e], e).bind(t);
      }), t.init = this.init, t;
    }
  }]);
  return _class7;
}())();
exports.uniCloud = mr;
(function () {
  var e = Array.isArray(P) ? P.length : 0,
    t = function () {
      var e = Yt(),
        t = Zt();
      return t && t.enable && g(t.space) ? t.space : e;
    }();
  if (1 === e) exports.uniCloud = mr = mr.init(t), mr._isDefault = !0;else {
    var _t21 = ["database", "getCurrentUserInfo", "importObject"];
    var _n22;
    _n22 = e > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : O ? "应用未关联服务空间，请在uniCloud目录右键关联服务空间" : "uni-app cli项目内使用uniCloud需要使用HBuilderX的运行菜单运行项目，且需要在uniCloud目录关联服务空间", ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile"].concat(_t21).forEach(function (e) {
      mr[e] = function () {
        if (console.error(_n22), -1 === _t21.indexOf(e)) return Promise.reject(new re({
          code: "SYS_ERR",
          message: _n22
        }));
        console.error(_n22);
      };
    });
  }
  if (Object.assign(mr, {
    get mixinDatacom() {
      return rr(mr);
    }
  }), Qs(mr), mr.addInterceptor = M, mr.removeInterceptor = q, mr.interceptObject = j, S && "web" === T && (window.uniCloud = mr), "app" === T && (uni.__uniCloud = mr), "app" === T || "web" === T) {
    var _e30 = R();
    _e30.uniCloud = mr, _e30.UniCloudError = re;
  }
  !function () {
    var _Yt = Yt(),
      e = _Yt.failoverEndpoint;
    if (!e) return;
    nn().catch(function (e) {
      console.error("请求故障切换配置失败：", e);
    });
    var t = {
      fail: function fail() {
        var e = Zt();
        tn(e && e.interval || 0) && nn().catch(function (e) {
          console.error("请求故障切换配置失败：", e);
        });
      }
    };
    M("callFunction", t), M("database", t), M("uploadFile", t);
  }();
})();
var yr = mr;
exports.default = yr;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 4), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 3)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 2)["default"]))

/***/ }),

/***/ 33:
/*!************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/@babel/runtime/regenerator/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! @babel/runtime/helpers/regeneratorRuntime */ 34)();
module.exports = runtime;

/***/ }),

/***/ 34:
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 14)["default"];
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) {
              if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            }
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) {
      r.push(n);
    }
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) {
        "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      }
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 35:
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 36:
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 37:
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 17);
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}
module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 38:
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 14)["default"];
var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized.js */ 35);
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return assertThisInitialized(self);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 39:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _getPrototypeOf(o);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 4:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 40:
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/wrapNativeSuper.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf.js */ 39);
var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 17);
var isNativeFunction = __webpack_require__(/*! ./isNativeFunction.js */ 41);
var construct = __webpack_require__(/*! ./construct.js */ 16);
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _wrapNativeSuper(Class);
}
module.exports = _wrapNativeSuper, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 41:
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeFunction.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeFunction(fn) {
  try {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  } catch (e) {
    return typeof fn === "function";
  }
}
module.exports = _isNativeFunction, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 42:
/*!********************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages.json?{"type":"origin-pages-json"} ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "pages": [{
    "path": "pages/index/index"
  }, {
    "path": "pages/baseinfo/dept/list",
    "style": {
      "navigationBarTitleText": "组织架构编排"
    }
  }, {
    "path": "pages/baseinfo/area/list",
    "style": {
      "navigationBarTitleText": "业务区域网络"
    }
  }, {
    "path": "pages/baseinfo/point/list",
    "style": {
      "navigationBarTitleText": "物理作业点位控制"
    }
  }, {
    "path": "pages/baseinfo/user/list",
    "style": {
      "navigationBarTitleText": "人员信息管理"
    }
  }, {
    "path": "pages/info/category-list",
    "style": {
      "navigationBarTitleText": "信息分类管理"
    }
  }, {
    "path": "pages/info/info-list",
    "style": {
      "navigationBarTitleText": "信息内容管理"
    }
  }, {
    "path": "pages/login/index",
    "style": {
      "topWindow": false,
      "leftWindow": false,
      "navigationBarTitleText": "登录"
    }
  }],
  "subPackages": [{
    "root": "pages_plugs",
    "pages": [{
      "path": "error/404",
      "style": {
        "navigationBarTitleText": "页面不存在"
      }
    }, {
      "path": "error/403",
      "style": {
        "navigationBarTitleText": "无权访问"
      }
    }, {
      "path": "error/500",
      "style": {
        "navigationBarTitleText": "服务器出错了"
      }
    }, {
      "path": "system/user/list"
    }, {
      "path": "system/role/list"
    }, {
      "path": "system/permission/list"
    }, {
      "path": "system/menu/list"
    }, {
      "path": "system/app/list"
    }, {
      "path": "system/app-upgrade-center/list"
    }, {
      "path": "system_uni/vk-global-data"
    }, {
      "path": "system_uni/uni-id-log"
    }, {
      "path": "system_uni/opendb-admin-log"
    }, {
      "path": "system_uni/vk-components-dynamic"
    }, {
      "path": "system_uni/uni-id-files/list"
    }, {
      "path": "system_uni/vk-pay-orders"
    }, {
      "path": "system_uni/vk-ws-connection"
    }, {
      "path": "system_uni/vk-error-log"
    }, {
      "path": "system_uni/lucky-draw/list",
      "style": {
        "navigationBarTitleText": "抽奖活动"
      }
    }]
  }, {
    "root": "pages_template/components",
    "pages": [{
      "path": "icons/vk-icons"
    }, {
      "path": "icons/vk-icons-page",
      "style": {
        "topWindow": false,
        "leftWindow": false
      }
    }, {
      "path": "icons/element-icons"
    }, {
      "path": "icons/element-icons-page",
      "style": {
        "topWindow": false,
        "leftWindow": false
      }
    }, {
      "path": "table/table-basic"
    }, {
      "path": "table/table-easy"
    }, {
      "path": "table/table-query"
    }, {
      "path": "table/table-expand"
    }, {
      "path": "form/form-array-object"
    }, {
      "path": "form/form-basic"
    }, {
      "path": "form/form-inline"
    }, {
      "path": "form/form-dialog"
    }, {
      "path": "form/form-pro"
    }, {
      "path": "form/form-dialog-2"
    }, {
      "path": "form/form-slot"
    }, {
      "path": "form/form-cert"
    }, {
      "path": "form/form-pay-cert"
    }, {
      "path": "detail/detail-basic"
    }, {
      "path": "detail/detail-table"
    }, {
      "path": "dialog/dialog-basic"
    }, {
      "path": "dialog/dialog-form"
    }, {
      "path": "dialog/dialog-table"
    }, {
      "path": "upload/upload-basic"
    }, {
      "path": "upload/upload-drag"
    }, {
      "path": "input/input-address"
    }, {
      "path": "input/input-money"
    }, {
      "path": "input/input-number"
    }, {
      "path": "input/input-number-box"
    }, {
      "path": "input/input-percentage"
    }, {
      "path": "input/input-json"
    }, {
      "path": "input/input-province"
    }, {
      "path": "input/input-select"
    }, {
      "path": "input/input-remote-select"
    }, {
      "path": "input/input"
    }, {
      "path": "editor/editor"
    }, {
      "path": "editor/editor-tinymce"
    }]
  }, {
    "root": "pages_template/element",
    "pages": [{
      "path": "detail/detail"
    }, {
      "path": "form/basic-form"
    }, {
      "path": "form/advanced-form"
    }, {
      "path": "form/step-form"
    }, {
      "path": "setting/account"
    }, {
      "path": "popup/alert"
    }, {
      "path": "popup/dialog"
    }, {
      "path": "popup/drawer"
    }, {
      "path": "popup/loading"
    }, {
      "path": "popup/message"
    }, {
      "path": "popup/message-box"
    }, {
      "path": "popup/notification"
    }, {
      "path": "popup/popconfirm"
    }, {
      "path": "popup/popover"
    }, {
      "path": "popup/tooltip"
    }, {
      "path": "result/fail"
    }, {
      "path": "result/success"
    }]
  }],
  "globalStyle": {
    "navigationStyle": "custom",
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "管理后台",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8"
  },
  "topWindow": {
    "path": "windows/topWindow",
    "style": {
      "height": "100px"
    },
    "matchMedia": {
      "minWidth": 0
    }
  },
  "leftWindow": {
    "path": "windows/leftWindow",
    "style": {
      "width": "240px"
    }
  }
};
exports.default = _default;

/***/ }),

/***/ 43:
/*!*******************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/pages.json?{"type":"stat"} ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "appid": "__UNI__594BB33"
};
exports.default = _default;

/***/ }),

/***/ 49:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    if(typeof renderjs.beforeCreate === 'function'){
			renderjs.beforeCreate = [renderjs.beforeCreate]
		}
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 5:
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 6:
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 7);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 8);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 9);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 11);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 7:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 749:
/*!***********************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/components/custom-editor-tinymce/config.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 5);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 12));
var _config;
/**
 * 组件由 VK 进行了二次封装
 * 在这里设置默认配置
 * 完整的配置文档: https://www.tiny.cloud/docs/tinymce/latest/editor-important-options
 */
var config = (_config = {
  // 使用的插件列表（插件需要在 static/plugs/tinymce/plugins/ 目录存在才行）
  plugins: ['advlist', 'autolink',
  //'autosave', // 这个自动保存草稿体验不好
  'code', 'codesample', 'directionality', 'emoticons', 'fullscreen', 'image', 'images', 'insertdatetime', 'link', 'lists', 'media', 'nonbreaking', 'preview', 'save', 'searchreplace', 'table', 'visualblocks', 'visualchars', 'wordcount'],
  // 工具栏
  toolbar: ['bold italic underline strikethrough alignleft aligncenter alignright outdent indent blockquote undo redo removeformat subscript superscript', 'hr bullist numlist image images media link table insertdatetime forecolor backcolor codesample code preview fullscreen'],
  // 菜单栏
  menubar: 'file edit insert view format table tools',
  body_class: 'panel-body',
  object_resizing: false,
  end_container_on_empty_block: true,
  powerpaste_word_import: 'clean',
  code_dialog_height: 450,
  code_dialog_width: 1000,
  advlist_bullet_styles: 'square',
  advlist_number_styles: 'default',
  default_link_target: '_blank',
  font_size_formats: '12px 13px 14px 15px 16px 18px 20px 24px 36px 48px',
  line_height_formats: '1 1.2 1.5 1.6 1.8 2 2.4',
  link_title: false,
  branding: false,
  nonbreaking_force_tab: true,
  // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
  image_advtab: false,
  insertdatetime_element: false,
  insertdatetime_formats: ['%H:%M:%S', '%H时%M分%S秒', '%Y-%m-%d', '%Y年%m月%d日', '%Y-%m-%d %H:%M:%S', '%Y年%m月%d日 %H时%M分%S秒'],
  file_picker_types: 'file image media'
}, (0, _defineProperty2.default)(_config, "object_resizing", true), (0, _defineProperty2.default)(_config, "resize_img_proportional", true), (0, _defineProperty2.default)(_config, "codesample_languages", [{
  text: 'UniApp',
  value: 'markup'
}, {
  text: 'Vue',
  value: 'markup'
}, {
  text: 'HTML/XML',
  value: 'markup'
}, {
  text: 'JavaScript',
  value: 'javascript'
}, {
  text: 'CSS',
  value: 'css'
}, {
  text: 'Java',
  value: 'java'
}, {
  text: 'PHP',
  value: 'php'
}, {
  text: 'Python',
  value: 'python'
}, {
  text: 'Ruby',
  value: 'ruby'
}, {
  text: 'C',
  value: 'c'
}, {
  text: 'C#',
  value: 'csharp'
}, {
  text: 'C++',
  value: 'cpp'
}]), (0, _defineProperty2.default)(_config, "codesample_global_prismjs", true), (0, _defineProperty2.default)(_config, "mobile", {
  menubar: true,
  toolbar_mode: 'floating'
}), _config);
var _default = config;
exports.default = _default;

/***/ }),

/***/ 750:
/*!*****************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/node_modules/element-ui/lib/utils/popup/index.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.PopupManager = undefined;
var _vue = __webpack_require__(/*! vue */ 26);
var _vue2 = _interopRequireDefault(_vue);
var _merge = __webpack_require__(/*! element-ui/lib/utils/merge */ 751);
var _merge2 = _interopRequireDefault(_merge);
var _popupManager = __webpack_require__(/*! element-ui/lib/utils/popup/popup-manager */ 752);
var _popupManager2 = _interopRequireDefault(_popupManager);
var _scrollbarWidth = __webpack_require__(/*! ../scrollbar-width */ 754);
var _scrollbarWidth2 = _interopRequireDefault(_scrollbarWidth);
var _dom = __webpack_require__(/*! ../dom */ 753);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
var idSeed = 1;
var scrollBarWidth = void 0;
exports.default = {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    openDelay: {},
    closeDelay: {},
    zIndex: {},
    modal: {
      type: Boolean,
      default: false
    },
    modalFade: {
      type: Boolean,
      default: true
    },
    modalClass: {},
    modalAppendToBody: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },
  beforeMount: function beforeMount() {
    this._popupId = 'popup-' + idSeed++;
    _popupManager2.default.register(this._popupId, this);
  },
  beforeDestroy: function beforeDestroy() {
    _popupManager2.default.deregister(this._popupId);
    _popupManager2.default.closeModal(this._popupId);
    this.restoreBodyStyle();
  },
  data: function data() {
    return {
      opened: false,
      bodyPaddingRight: null,
      computedBodyPaddingRight: 0,
      withoutHiddenClass: true,
      rendered: false
    };
  },
  watch: {
    visible: function visible(val) {
      var _this = this;
      if (val) {
        if (this._opening) return;
        if (!this.rendered) {
          this.rendered = true;
          _vue2.default.nextTick(function () {
            _this.open();
          });
        } else {
          this.open();
        }
      } else {
        this.close();
      }
    }
  },
  methods: {
    open: function open(options) {
      var _this2 = this;
      if (!this.rendered) {
        this.rendered = true;
      }
      var props = (0, _merge2.default)({}, this.$props || this, options);
      if (this._closeTimer) {
        clearTimeout(this._closeTimer);
        this._closeTimer = null;
      }
      clearTimeout(this._openTimer);
      var openDelay = Number(props.openDelay);
      if (openDelay > 0) {
        this._openTimer = setTimeout(function () {
          _this2._openTimer = null;
          _this2.doOpen(props);
        }, openDelay);
      } else {
        this.doOpen(props);
      }
    },
    doOpen: function doOpen(props) {
      if (this.$isServer) return;
      if (this.willOpen && !this.willOpen()) return;
      if (this.opened) return;
      this._opening = true;
      var dom = this.$el;
      var modal = props.modal;
      var zIndex = props.zIndex;
      if (zIndex) {
        _popupManager2.default.zIndex = zIndex;
      }
      if (modal) {
        if (this._closing) {
          _popupManager2.default.closeModal(this._popupId);
          this._closing = false;
        }
        _popupManager2.default.openModal(this._popupId, _popupManager2.default.nextZIndex(), this.modalAppendToBody ? undefined : dom, props.modalClass, props.modalFade);
        if (props.lockScroll) {
          this.withoutHiddenClass = !(0, _dom.hasClass)(document.body, 'el-popup-parent--hidden');
          if (this.withoutHiddenClass) {
            this.bodyPaddingRight = document.body.style.paddingRight;
            this.computedBodyPaddingRight = parseInt((0, _dom.getStyle)(document.body, 'paddingRight'), 10);
          }
          scrollBarWidth = (0, _scrollbarWidth2.default)();
          var bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
          var bodyOverflowY = (0, _dom.getStyle)(document.body, 'overflowY');
          if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll') && this.withoutHiddenClass) {
            document.body.style.paddingRight = this.computedBodyPaddingRight + scrollBarWidth + 'px';
          }
          (0, _dom.addClass)(document.body, 'el-popup-parent--hidden');
        }
      }
      if (getComputedStyle(dom).position === 'static') {
        dom.style.position = 'absolute';
      }
      dom.style.zIndex = _popupManager2.default.nextZIndex();
      this.opened = true;
      this.onOpen && this.onOpen();
      this.doAfterOpen();
    },
    doAfterOpen: function doAfterOpen() {
      this._opening = false;
    },
    close: function close() {
      var _this3 = this;
      if (this.willClose && !this.willClose()) return;
      if (this._openTimer !== null) {
        clearTimeout(this._openTimer);
        this._openTimer = null;
      }
      clearTimeout(this._closeTimer);
      var closeDelay = Number(this.closeDelay);
      if (closeDelay > 0) {
        this._closeTimer = setTimeout(function () {
          _this3._closeTimer = null;
          _this3.doClose();
        }, closeDelay);
      } else {
        this.doClose();
      }
    },
    doClose: function doClose() {
      this._closing = true;
      this.onClose && this.onClose();
      if (this.lockScroll) {
        setTimeout(this.restoreBodyStyle, 200);
      }
      this.opened = false;
      this.doAfterClose();
    },
    doAfterClose: function doAfterClose() {
      _popupManager2.default.closeModal(this._popupId);
      this._closing = false;
    },
    restoreBodyStyle: function restoreBodyStyle() {
      if (this.modal && this.withoutHiddenClass) {
        document.body.style.paddingRight = this.bodyPaddingRight;
        (0, _dom.removeClass)(document.body, 'el-popup-parent--hidden');
      }
      this.withoutHiddenClass = true;
    }
  }
};
exports.PopupManager = _popupManager2.default;

/***/ }),

/***/ 751:
/*!***********************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/node_modules/element-ui/lib/utils/merge.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = function (target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i] || {};
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
};
;

/***/ }),

/***/ 752:
/*!*************************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/node_modules/element-ui/lib/utils/popup/popup-manager.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var _vue = __webpack_require__(/*! vue */ 26);
var _vue2 = _interopRequireDefault(_vue);
var _dom = __webpack_require__(/*! element-ui/lib/utils/dom */ 753);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
var hasModal = false;
var hasInitZIndex = false;
var zIndex = void 0;
var getModal = function getModal() {
  if (_vue2.default.prototype.$isServer) return;
  var modalDom = PopupManager.modalDom;
  if (modalDom) {
    hasModal = true;
  } else {
    hasModal = false;
    modalDom = document.createElement('div');
    PopupManager.modalDom = modalDom;
    modalDom.addEventListener('touchmove', function (event) {
      event.preventDefault();
      event.stopPropagation();
    });
    modalDom.addEventListener('click', function () {
      PopupManager.doOnModalClick && PopupManager.doOnModalClick();
    });
  }
  return modalDom;
};
var instances = {};
var PopupManager = {
  modalFade: true,
  getInstance: function getInstance(id) {
    return instances[id];
  },
  register: function register(id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },
  deregister: function deregister(id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },
  nextZIndex: function nextZIndex() {
    return PopupManager.zIndex++;
  },
  modalStack: [],
  doOnModalClick: function doOnModalClick() {
    var topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topItem) return;
    var instance = PopupManager.getInstance(topItem.id);
    if (instance && instance.closeOnClickModal) {
      instance.close();
    }
  },
  openModal: function openModal(id, zIndex, dom, modalClass, modalFade) {
    if (_vue2.default.prototype.$isServer) return;
    if (!id || zIndex === undefined) return;
    this.modalFade = modalFade;
    var modalStack = this.modalStack;
    for (var i = 0, j = modalStack.length; i < j; i++) {
      var item = modalStack[i];
      if (item.id === id) {
        return;
      }
    }
    var modalDom = getModal();
    (0, _dom.addClass)(modalDom, 'v-modal');
    if (this.modalFade && !hasModal) {
      (0, _dom.addClass)(modalDom, 'v-modal-enter');
    }
    if (modalClass) {
      var classArr = modalClass.trim().split(/\s+/);
      classArr.forEach(function (item) {
        return (0, _dom.addClass)(modalDom, item);
      });
    }
    setTimeout(function () {
      (0, _dom.removeClass)(modalDom, 'v-modal-enter');
    }, 200);
    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
      dom.parentNode.appendChild(modalDom);
    } else {
      document.body.appendChild(modalDom);
    }
    if (zIndex) {
      modalDom.style.zIndex = zIndex;
    }
    modalDom.tabIndex = 0;
    modalDom.style.display = '';
    this.modalStack.push({
      id: id,
      zIndex: zIndex,
      modalClass: modalClass
    });
  },
  closeModal: function closeModal(id) {
    var modalStack = this.modalStack;
    var modalDom = getModal();
    if (modalStack.length > 0) {
      var topItem = modalStack[modalStack.length - 1];
      if (topItem.id === id) {
        if (topItem.modalClass) {
          var classArr = topItem.modalClass.trim().split(/\s+/);
          classArr.forEach(function (item) {
            return (0, _dom.removeClass)(modalDom, item);
          });
        }
        modalStack.pop();
        if (modalStack.length > 0) {
          modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
        }
      } else {
        for (var i = modalStack.length - 1; i >= 0; i--) {
          if (modalStack[i].id === id) {
            modalStack.splice(i, 1);
            break;
          }
        }
      }
    }
    if (modalStack.length === 0) {
      if (this.modalFade) {
        (0, _dom.addClass)(modalDom, 'v-modal-leave');
      }
      setTimeout(function () {
        if (modalStack.length === 0) {
          if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
          modalDom.style.display = 'none';
          PopupManager.modalDom = undefined;
        }
        (0, _dom.removeClass)(modalDom, 'v-modal-leave');
      }, 200);
    }
  }
};
Object.defineProperty(PopupManager, 'zIndex', {
  configurable: true,
  get: function get() {
    if (!hasInitZIndex) {
      zIndex = zIndex || (_vue2.default.prototype.$ELEMENT || {}).zIndex || 2000;
      hasInitZIndex = true;
    }
    return zIndex;
  },
  set: function set(value) {
    zIndex = value;
  }
});
var getTopPopup = function getTopPopup() {
  if (_vue2.default.prototype.$isServer) return;
  if (PopupManager.modalStack.length > 0) {
    var topPopup = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topPopup) return;
    var instance = PopupManager.getInstance(topPopup.id);
    return instance;
  }
};
if (!_vue2.default.prototype.$isServer) {
  // handle `esc` key when the popup is shown
  window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      var topPopup = getTopPopup();
      if (topPopup && topPopup.closeOnPressEscape) {
        topPopup.handleClose ? topPopup.handleClose() : topPopup.handleAction ? topPopup.handleAction('cancel') : topPopup.close();
      }
    }
  });
}
exports.default = PopupManager;

/***/ }),

/***/ 753:
/*!*********************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/node_modules/element-ui/lib/utils/dom.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 14);
exports.__esModule = true;
exports.isInContainer = exports.getScrollContainer = exports.isScroll = exports.getStyle = exports.once = exports.off = exports.on = undefined;
var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
}; /* istanbul ignore next */

exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.setStyle = setStyle;
var _vue = __webpack_require__(/*! vue */ 26);
var _vue2 = _interopRequireDefault(_vue);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
var isServer = _vue2.default.prototype.$isServer;
var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
var MOZ_HACK_REGEXP = /^moz([A-Z])/;
var ieVersion = isServer ? 0 : Number(document.documentMode);

/* istanbul ignore next */
var trim = function trim(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
/* istanbul ignore next */
var camelCase = function camelCase(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

/* istanbul ignore next */
var on = exports.on = function () {
  if (!isServer && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
}();

/* istanbul ignore next */
var off = exports.off = function () {
  if (!isServer && document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
}();

/* istanbul ignore next */
var once = exports.once = function once(el, event, fn) {
  var listener = function listener() {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};

/* istanbul ignore next */
function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}
;

/* istanbul ignore next */
function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');
  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;
    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.setAttribute('class', curClass);
  }
}
;

/* istanbul ignore next */
function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';
  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;
    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.setAttribute('class', trim(curClass));
  }
}
;

/* istanbul ignore next */
var getStyle = exports.getStyle = ieVersion < 9 ? function (element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'styleFloat';
  }
  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100;
        } catch (e) {
          return 1.0;
        }
      default:
        return element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null;
    }
  } catch (e) {
    return element.style[styleName];
  }
} : function (element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};

/* istanbul ignore next */
function setStyle(element, styleName, value) {
  if (!element || !styleName) return;
  if ((typeof styleName === 'undefined' ? 'undefined' : _typeof(styleName)) === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
}
;
var isScroll = exports.isScroll = function isScroll(el, vertical) {
  if (isServer) return;
  var determinedDirection = vertical !== null && vertical !== undefined;
  var overflow = determinedDirection ? vertical ? getStyle(el, 'overflow-y') : getStyle(el, 'overflow-x') : getStyle(el, 'overflow');
  return overflow.match(/(scroll|auto|overlay)/);
};
var getScrollContainer = exports.getScrollContainer = function getScrollContainer(el, vertical) {
  if (isServer) return;
  var parent = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }
    if (isScroll(parent, vertical)) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return parent;
};
var isInContainer = exports.isInContainer = function isInContainer(el, container) {
  if (isServer || !el || !container) return false;
  var elRect = el.getBoundingClientRect();
  var containerRect = void 0;
  if ([window, document, document.documentElement, null, undefined].includes(container)) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0
    };
  } else {
    containerRect = container.getBoundingClientRect();
  }
  return elRect.top < containerRect.bottom && elRect.bottom > containerRect.top && elRect.right > containerRect.left && elRect.left < containerRect.right;
};

/***/ }),

/***/ 754:
/*!*********************************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/node_modules/element-ui/lib/utils/scrollbar-width.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = function () {
  if (_vue2.default.prototype.$isServer) return 0;
  if (scrollBarWidth !== undefined) return scrollBarWidth;
  var outer = document.createElement('div');
  outer.className = 'el-scrollbar__wrap';
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);
  var widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';
  var inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);
  var widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;
  return scrollBarWidth;
};
var _vue = __webpack_require__(/*! vue */ 26);
var _vue2 = _interopRequireDefault(_vue);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
var scrollBarWidth = void 0;
;

/***/ }),

/***/ 8:
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) {
        ;
      }
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 9:
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 10);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 94:
/*!******************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/app.config.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 5);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 12));
var _myPubFunction = _interopRequireDefault(__webpack_require__(/*! @/common/function/myPubFunction.js */ 95));
var _appConfigMenu = _interopRequireDefault(__webpack_require__(/*! @/app.config.menu.js */ 96));
var _index = _interopRequireDefault(__webpack_require__(/*! @/common/theme/index.js */ 99));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  // 开发模式启用调式模式(请求时会打印日志)
  debug: "development" !== 'production',
  // 主云函数名称
  functionName: 'router',
  // 登录页面路径
  login: {
    url: '/pages/login/index',
    testUser: {
      show: false,
      // 是否显示
      list: [{
        username: 'test11',
        password: '123456',
        nickname: '高级管理员'
      }, {
        username: 'test12',
        password: '123456',
        nickname: '初级管理员'
      }, {
        username: 'test13',
        password: '123456',
        nickname: '无权限用户'
      }]
    }
  },
  // 首页页面路径
  index: {
    url: '/pages/index/index'
  },
  // 404 Not Found 错误页面路径
  error: {
    url: '/pages_plugs/error/404'
  },
  // 前端默认时区（中国为8）
  targetTimezone: 8,
  // 日志风格（注意：只在开发调试模式下生效，正式发布后不会打印日志）
  logger: {
    mode: 0,
    // 0 正常（默认展开） 1 简洁（默认折叠）
    colorArr: ['#0095f8', '#67C23A']
  },
  globalError: true,
  // 是否开启全局错误提示
  // 需要检查是否登录的页面列表
  // let { mode, list } = config.checkTokenPages
  checkTokenPages: {
    /**
     * 如果 mode = 0 则代表自动检测
     * 如果 mode = 1 则代表list内的页面需要登录，不在list内的页面不需要登录
     * 如果 mode = 2 则代表list内的页面不需要登录，不在list内的页面需要登录
     * 注意1: list内是通配符表达式，非正则表达式
     * 在无需登录的页面上执行kh或sys函数，也会自动判断是否登录，未登录会自动跳登录页面，登录成功后会自动返回本来要跳转的页面。
     */
    mode: 2,
    list: ['/pages/login/*', '/pages_template/element/*', '/pages_template/components/form/*', '/pages_template/components/icons/*']
  },
  // 需要检查是否哪些请求需要加密通信
  checkEncryptRequest: {
    /**
     * 如果 mode = 0 则不做处理
     * 如果 mode = 1 则代表list内的云函数或云对象需要加密通信，不在list内的不需要加密通信
     * 注意1: list内是正则表达式，非通配符表达式
     * 注意2: 建议与 router/middleware/modules/encryptFilter.js 内的regExp保持一致
     */
    mode: 1,
    list: ['^template/encrypt/(.*)' // 表示以 template/encrypt/ 开头的云函数或云对象需要加密通信
    ]
  },

  // 静态文件的资源URL地址
  staticUrl: {
    // 顶部导航
    navBar: {
      // 正方形 Logo 160*160
      logo: '/static/logo.png',
      // 长方形 Logo 224*160
      logo1: '/static/logo1.png',
      // 横幅 Logo 480*100
      logo2: '/static/logo2.png'
    }
  },
  // 自定义公共函数，myPubFunction内的函数可通过vk.myfn.xxx() 调用
  myfn: _myPubFunction.default,
  // 第三方服务配置
  service: {
    // 云储存相关配置
    cloudStorage: {
      /**
       * vk.uploadFile 接口默认使用哪个存储
       * unicloud 空间内置存储（默认）
       * extStorage 扩展存储
       * aliyun 阿里云oss
       */
      defaultProvider: 'unicloud',
      // 空间内置存储
      unicloud: {
        // 暂无配置项
      },
      // 扩展存储配置
      extStorage: {
        provider: 'qiniu',
        // qiniu: 扩展存储-七牛云
        // 根目录名称（如果改了这里的dirname，则云函数user/pub/getUploadFileOptionsForExtStorage内判断的目录权限也要改，否则无法上传）
        dirname: 'public',
        // 用于鉴权的云函数地址（一般不需要改这个参数）
        authAction: 'user/pub/getUploadFileOptionsForExtStorage',
        // 自定义域名，如：cdn.example.com（填你在扩展存储绑定的域名，若云端已设置 uni-config-center/vk-unicloud/index.js 内的 vk.service.cloudStorage.extStorage.domain 则此处可不填）
        domain: '',
        // 上传时，是否按用户id进行分组储存
        groupUserId: true
      },
      // 阿里云oss
      // 密钥和签名信息（由于签名的获取比较麻烦,建议初学者使用上传到unicloud或extStorage的方案，上传到阿里云OSS是给有特殊需求的用户使用）
      // 相关文档 : https://help.aliyun.com/document_detail/31925.html?spm=a2c4g.11186623.6.1757.b7987d9czoFCVu
      aliyun: {
        // 密钥和签名信息
        uploadData: {
          OSSAccessKeyId: '',
          policy: '',
          signature: ''
        },
        // oss上传地址
        action: 'https://xxx.oss-cn-hangzhou.aliyuncs.com',
        // 根目录名称
        dirname: 'public',
        // oss外网访问地址，也可以是阿里云cdn地址
        host: 'https://xxx.xxx.com',
        // 上传时，是否按用户id进行分组储存
        groupUserId: true
      }
    }
  },
  // 全局异常码，可以自定义提示结果
  globalErrorCode: {
    // 阿里云10秒非正常超时，其实请求还在执行（且一般已经成功了，但前端接受不到成功结果）
    'cloudfunction-unusual-timeout': '请求超时，但请求还在执行，请重新进入页面。',
    // 请求超时（真正的请求超时）
    'cloudfunction-timeout': '请求超时，请重试！',
    // 不在预期内的异常（如数据库异常、云函数编译异常等）
    'cloudfunction-system-error': '网络开小差了！',
    // 云函数达到并发限制
    'cloudfunction-reaches-burst-limit': '系统繁忙，请稍后再试。',
    // APP未授权网络访问时的异常提示
    'cloudfunction-network-unauthorized': '需要进行网络请求许可，若您已授权，请点击确定'
  },
  // 页面风格
  pageStyle: {
    // 表单组件和表格组件的size
    size: 'auto' // medium / small / mini / auto
  },

  // 左侧菜单
  sideBar: {
    // 配置静态菜单列表
    staticMenu: _appConfigMenu.default,
    defaultOpeneds: ['components-admin'] // 默认展开的菜单项的menu_id
  },

  // 顶部菜单
  topBar: {
    // 是否启用 menuTabs
    showMenuTabs: true,
    // logo显示模式，1 纯图片模式 2 图片+文字模式
    logoMode: 1,
    // logo标题
    logoTitle: 'vk-admin后台管理'
  },
  // 主题配置
  theme: _objectSpread(_objectSpread({
    // 当前使用哪个主题
    use: 'eladmin'
  }, _index.default), {}, {
    // 自定义主题
    custom: {
      // 左侧菜单样式
      leftMenu: {
        backgroundColor: '',
        subBackgroundColor: '',
        textColor: '',
        activeTextColor: '',
        activeBackgroundColor: '',
        collapseActiveTextColor: '',
        collapseActiveBackgroundColor: '',
        hoverTextColor: '',
        hoverBackgroundColor: '',
        boxShadow: '',
        borderTop: ''
      },
      // 顶部菜单样式
      topMenu: {
        backgroundColor: '',
        textColor: ''
      }
    }
  })
};
exports.default = _default;

/***/ }),

/***/ 95:
/*!*************************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/common/function/myPubFunction.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 自定义公共函数
 */
var myfn = {};
/**
 * 测试函数test1
 * vk.myfn.test1();
 */
myfn.test1 = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var vk = uni.vk;
  console.log('执行了自定义公共函数test1');
  return obj;
};
var _default = myfn;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 3)["default"]))

/***/ }),

/***/ 96:
/*!***********************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/app.config.menu.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 5);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _menu = _interopRequireDefault(__webpack_require__(/*! ./static_menu/menu.json */ 97));
var _menuDev = _interopRequireDefault(__webpack_require__(/*! ./static_menu/menu-dev.json */ 98));
var debug = "development" !== 'production';
// 开发环境和正式环境中都会显示的静态菜单

var menusList = [];
if (debug && _menuDev.default) {
  menusList = _menu.default.concat(_menuDev.default);
} else {
  menusList = _menu.default;
}
var _default = menusList;
exports.default = _default;

/***/ }),

/***/ 97:
/*!**************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/static_menu/menu.json ***!
  \**************************************************************************/
/*! exports provided: 0, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"menu_id\":\"vk-in\",\"name\":\"\",\"hidden_menu\":true,\"children\":[{\"menu_id\":\"vk-in-index\",\"name\":\"首页\",\"url\":\"/\",\"fixed\":true},{\"menu_id\":\"vk-login\",\"name\":\"登录注册\",\"children\":[{\"menu_id\":\"vk-login-index\",\"name\":\"登录\",\"url\":\"/pages/login/index\",\"hidden_tab\":true},{\"menu_id\":\"vk-login-register\",\"name\":\"注册\",\"url\":\"/pages/login/register\",\"hidden_tab\":true},{\"menu_id\":\"vk-login-retrieve\",\"name\":\"密码找回\",\"url\":\"/pages/login/retrieve\",\"hidden_tab\":true}]},{\"menu_id\":\"vk-error\",\"name\":\"异常页面\",\"icon\":\"el-icon-warning-outline\",\"children\":[{\"menu_id\":\"vk-error-403\",\"name\":\"403\",\"url\":\"/pages_plugs/error/403\",\"hidden_tab\":true},{\"menu_id\":\"vk-error-404\",\"name\":\"404\",\"url\":\"/pages_plugs/error/404\",\"hidden_tab\":true},{\"menu_id\":\"vk-error-500\",\"name\":\"500\",\"url\":\"/pages_plugs/error/500\",\"hidden_tab\":true}]}]}]");

/***/ }),

/***/ 98:
/*!******************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/static_menu/menu-dev.json ***!
  \******************************************************************************/
/*! exports provided: 0, 1, 2, 3, 4, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"menu_id\":\"components-admin\",\"name\":\"VK框架 组件演示\",\"comment\":\"以下菜单在正式环境不会出现!\",\"icon\":\"el-icon-star-off\",\"url\":\"\",\"sort\":999,\"children\":[{\"menu_id\":\"vk-data-icon\",\"name\":\"Icon 图标\",\"icon\":\"el-icon-picture\",\"children\":[{\"menu_id\":\"vk-data-icon-vk\",\"name\":\"VK框架 图标\",\"icon\":\"\",\"url\":\"/pages_template/components/icons/vk-icons\"},{\"menu_id\":\"vk-data-icon-element\",\"name\":\"Element 图标\",\"icon\":\"\",\"url\":\"/pages_template/components/icons/element-icons\"}]},{\"menu_id\":\"vk-data-table\",\"name\":\"Table 智能表格\",\"icon\":\"el-icon-s-grid\",\"children\":[{\"menu_id\":\"vk-data-table-basic\",\"name\":\"基础用法\",\"icon\":\"\",\"url\":\"/pages_template/components/table/table-basic\"},{\"menu_id\":\"vk-data-table-easy\",\"name\":\"综合用法\",\"icon\":\"\",\"url\":\"/pages_template/components/table/table-easy\"},{\"menu_id\":\"vk-data-table-query\",\"name\":\"搜索折叠\",\"icon\":\"\",\"url\":\"/pages_template/components/table/table-query\"},{\"menu_id\":\"vk-data-table-expand\",\"name\":\"表格行展开\",\"icon\":\"\",\"url\":\"/pages_template/components/table/table-expand\"}]},{\"menu_id\":\"vk-data-form\",\"name\":\"Form 万能表单\",\"icon\":\"vk-icon-edit\",\"children\":[{\"menu_id\":\"vk-data-form-basic\",\"name\":\"基础用法\",\"icon\":\"\",\"url\":\"/pages_template/components/form/form-basic\"},{\"menu_id\":\"vk-data-form-inline\",\"name\":\"行内表单\",\"icon\":\"\",\"url\":\"/pages_template/components/form/form-inline\"},{\"menu_id\":\"vk-data-form-dialog\",\"name\":\"弹窗表单\",\"icon\":\"\",\"url\":\"/pages_template/components/form/form-dialog\"},{\"menu_id\":\"vk-data-form-dialog-2\",\"name\":\"复用表单\",\"icon\":\"\",\"url\":\"/pages_template/components/form/form-dialog-2\"},{\"menu_id\":\"vk-data-form-slot\",\"name\":\"插槽用法\",\"icon\":\"\",\"url\":\"/pages_template/components/form/form-slot\"},{\"menu_id\":\"vk-data-form-array-object\",\"name\":\"子表单\",\"icon\":\"\",\"url\":\"/pages_template/components/form/form-array-object\"},{\"menu_id\":\"vk-data-form-pro\",\"name\":\"万能表单\",\"icon\":\"\",\"url\":\"/pages_template/components/form/form-pro\"}]},{\"menu_id\":\"vk-data-input\",\"name\":\"Input 输入\",\"icon\":\"el-icon-edit-outline\",\"children\":[{\"menu_id\":\"vk-data-input-number\",\"name\":\"数字输入框\",\"icon\":\"\",\"url\":\"/pages_template/components/input/input-number\"},{\"menu_id\":\"vk-data-input-number-box\",\"name\":\"步进器\",\"icon\":\"\",\"url\":\"/pages_template/components/input/input-number-box\"},{\"menu_id\":\"vk-data-input-money\",\"name\":\"金额输入框\",\"icon\":\"\",\"url\":\"/pages_template/components/input/input-money\"},{\"menu_id\":\"vk-data-input-percentage\",\"name\":\"百分比输入框\",\"icon\":\"\",\"url\":\"/pages_template/components/input/input-percentage\"},{\"menu_id\":\"vk-data-input-json\",\"name\":\"JSON编辑器\",\"icon\":\"\",\"url\":\"/pages_template/components/input/input-json\"},{\"menu_id\":\"vk-data-input-province\",\"name\":\"省份选择器\",\"icon\":\"\",\"url\":\"/pages_template/components/input/input-province\"},{\"menu_id\":\"vk-data-input-address\",\"name\":\"省市区联动\",\"icon\":\"\",\"url\":\"/pages_template/components/input/input-address\"},{\"menu_id\":\"vk-data-input-select\",\"name\":\"下拉选择器\",\"icon\":\"\",\"url\":\"/pages_template/components/input/input-select\"},{\"menu_id\":\"vk-data-input-remote-select\",\"name\":\"远程搜索选择器\",\"icon\":\"\",\"url\":\"/pages_template/components/input/input-remote-select\"},{\"menu_id\":\"vk-data-input-all\",\"name\":\"聚合输入框\",\"icon\":\"\",\"url\":\"/pages_template/components/input/input\"}]},{\"menu_id\":\"vk-data-detail\",\"name\":\"Detail 详情展示\",\"icon\":\"el-icon-document\",\"children\":[{\"menu_id\":\"vk-data-detail-basic\",\"name\":\"基础形式\",\"icon\":\"\",\"url\":\"/pages_template/components/detail/detail-basic\"},{\"menu_id\":\"vk-data-detail-table\",\"name\":\"表格形式\",\"icon\":\"\",\"url\":\"/pages_template/components/detail/detail-table\"}]},{\"menu_id\":\"vk-data-dialog\",\"name\":\"Dialog 弹窗\",\"icon\":\"el-icon-copy-document\",\"children\":[{\"menu_id\":\"vk-data-dialog-basic\",\"name\":\"基础用法\",\"icon\":\"\",\"url\":\"/pages_template/components/dialog/dialog-basic\"},{\"menu_id\":\"vk-data-dialog-form\",\"name\":\"弹窗表单\",\"icon\":\"\",\"url\":\"/pages_template/components/dialog/dialog-form\"},{\"menu_id\":\"vk-data-dialog-table\",\"name\":\"弹窗表格\",\"icon\":\"\",\"url\":\"/pages_template/components/dialog/dialog-table\"}]},{\"menu_id\":\"vk-data-upload\",\"name\":\"Upload 上传\",\"icon\":\"el-icon-upload2\",\"children\":[{\"menu_id\":\"vk-data-upload-basic\",\"name\":\"基础用法\",\"icon\":\"\",\"url\":\"/pages_template/components/upload/upload-basic\"},{\"menu_id\":\"vk-data-upload-drag\",\"name\":\"拖拽上传\",\"icon\":\"\",\"url\":\"/pages_template/components/upload/upload-drag\"}]},{\"menu_id\":\"vk-data-editor\",\"name\":\"editor 编辑器\",\"icon\":\"el-icon-edit-outline\",\"children\":[{\"menu_id\":\"vk-data-editor-1\",\"name\":\"富文本-editor\",\"icon\":\"\",\"url\":\"/pages_template/components/editor/editor\"},{\"menu_id\":\"vk-data-editor-2\",\"name\":\"富文本-tinymce\",\"icon\":\"\",\"url\":\"/pages_template/components/editor/editor-tinymce\"}]}]},{\"menu_id\":\"__demo__\",\"name\":\"Element 静态功能演示\",\"comment\":\"以下菜单在正式环境不会出现!\",\"icon\":\"el-icon-star-off\",\"url\":\"\",\"sort\":1000,\"children\":[{\"menu_id\":\"__demo__popup\",\"name\":\"弹窗页面\",\"icon\":\"el-icon-tickets\",\"children\":[{\"menu_id\":\"__demo__popup-alert\",\"name\":\"alert\",\"icon\":\"\",\"url\":\"/pages_template/element/popup/alert\"},{\"menu_id\":\"__demo__popup-dialog\",\"name\":\"dialog\",\"icon\":\"\",\"url\":\"/pages_template/element/popup/dialog\"},{\"menu_id\":\"__demo__popup-drawer\",\"name\":\"drawer\",\"icon\":\"\",\"url\":\"/pages_template/element/popup/drawer\"},{\"menu_id\":\"__demo__popup-loading\",\"name\":\"loading\",\"icon\":\"\",\"url\":\"/pages_template/element/popup/loading\"},{\"menu_id\":\"__demo__popup-message\",\"name\":\"message\",\"icon\":\"\",\"url\":\"/pages_template/element/popup/message\"},{\"menu_id\":\"__demo__popup-message-box\",\"name\":\"message-box\",\"icon\":\"\",\"url\":\"/pages_template/element/popup/message-box\"},{\"menu_id\":\"__demo__popup-notification\",\"name\":\"notification\",\"icon\":\"\",\"url\":\"/pages_template/element/popup/notification\"},{\"menu_id\":\"__demo__popup-popconfirm\",\"name\":\"popconfirm\",\"icon\":\"\",\"url\":\"/pages_template/element/popup/popconfirm\"},{\"menu_id\":\"__demo__popup-popover\",\"name\":\"popover\",\"icon\":\"\",\"url\":\"/pages_template/element/popup/popover\"},{\"menu_id\":\"__demo__popup-tooltip\",\"name\":\"tooltip\",\"icon\":\"\",\"url\":\"/pages_template/element/popup/tooltip\"}]},{\"menu_id\":\"__demo__form\",\"name\":\"表单页面\",\"icon\":\"el-icon-s-order\",\"children\":[{\"menu_id\":\"__demo__form-basic-form\",\"name\":\"基础表单\",\"icon\":\"\",\"url\":\"/pages_template/element/form/basic-form\"},{\"menu_id\":\"__demo__form-advanced-form\",\"name\":\"高级表单\",\"icon\":\"\",\"url\":\"/pages_template/element/form/advanced-form\"},{\"menu_id\":\"__demo__form-step-form\",\"name\":\"分步表单\",\"icon\":\"\",\"url\":\"/pages_template/element/form/step-form\"}]},{\"menu_id\":\"__demo__result\",\"name\":\"结果页\",\"icon\":\"el-icon-circle-check\",\"children\":[{\"menu_id\":\"__demo__result-success\",\"name\":\"成功页\",\"icon\":\"\",\"url\":\"/pages_template/element/result/success\"},{\"menu_id\":\"__demo__result-fail\",\"name\":\"失败页\",\"icon\":\"\",\"url\":\"/pages_template/element/result/fail\"}]},{\"menu_id\":\"__demo__error\",\"name\":\"异常页面\",\"icon\":\"el-icon-warning-outline\",\"children\":[{\"menu_id\":\"__demo__error-403\",\"name\":\"403\",\"icon\":\"\",\"url\":\"/pages_plugs/error/403\"},{\"menu_id\":\"__demo__error-404\",\"name\":\"404\",\"icon\":\"\",\"url\":\"/pages_plugs/error/404\"},{\"menu_id\":\"__demo__error-500\",\"name\":\"500\",\"icon\":\"\",\"url\":\"/pages_plugs/error/500\"}]},{\"menu_id\":\"__demo__detail\",\"name\":\"详情页面\",\"icon\":\"el-icon-tickets\",\"children\":[{\"menu_id\":\"__demo__detail-comprehensive\",\"name\":\"综合详情页\",\"icon\":\"\",\"url\":\"/pages_template/element/detail/detail\"}]},{\"menu_id\":\"__demo__setting\",\"name\":\"设置\",\"icon\":\"el-icon-s-tools\",\"children\":[{\"menu_id\":\"__demo__setting-account\",\"name\":\"账户设置\",\"icon\":\"\",\"url\":\"/pages_template/element/setting/account\"}]}]},{\"menu_id\":\"__utils__\",\"name\":\"VK框架实用工具\",\"comment\":\"以下菜单在正式环境不会出现!\",\"icon\":\"el-icon-star-off\",\"url\":\"\",\"sort\":1001,\"children\":[{\"menu_id\":\"__utils__vk-form-visualizer\",\"name\":\"表单可视化设计器\",\"icon\":\"el-icon-tickets\",\"url\":\"https://vkunicloud.fsq.pub/vk-form-visualizer/\"}]},{\"menu_id\":\"__links__\",\"name\":\"友情链接\",\"comment\":\"以下菜单在正式环境不会出现!\",\"icon\":\"el-icon-star-off\",\"url\":\"\",\"sort\":1002,\"children\":[{\"menu_id\":\"__links__1\",\"name\":\"admin框架文档\",\"icon\":\"el-icon-tickets\",\"url\":\"https://vkdoc.fsq.pub/admin/\"},{\"menu_id\":\"__links__2\",\"name\":\"更多VK插件\",\"icon\":\"el-icon-tickets\",\"url\":\"https://ext.dcloud.net.cn/search?q=vk\"},{\"menu_id\":\"__links__3\",\"name\":\"unicloud文档\",\"icon\":\"el-icon-tickets\",\"url\":\"https://uniapp.dcloud.io/uniCloud/README\"},{\"menu_id\":\"__links__4\",\"name\":\"element文档\",\"icon\":\"el-icon-tickets\",\"url\":\"https://element.eleme.cn/#/zh-CN/component/button\"}]},{\"menu_id\":\"__test__\",\"name\":\"测试权限用\",\"comment\":\"以下菜单在正式环境不会出现!\",\"icon\":\"el-icon-star-off\",\"url\":\"\",\"sort\":900,\"children\":[{\"menu_id\":\"__test__1\",\"name\":\"查看表格\",\"icon\":\"el-icon-tickets\",\"url\":\"/pages_template/components/table/table-easy\"}]}]");

/***/ }),

/***/ 99:
/*!**************************************************************************!*\
  !*** D:/AI project/2026/wenmingshengchan/mp-admin/common/theme/index.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 5);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _white = _interopRequireDefault(__webpack_require__(/*! ./white.js */ 100));
var _black = _interopRequireDefault(__webpack_require__(/*! ./black.js */ 101));
var _blackWhite = _interopRequireDefault(__webpack_require__(/*! ./blackWhite.js */ 102));
var _eladmin = _interopRequireDefault(__webpack_require__(/*! ./eladmin.js */ 103));
var _default = {
  white: _white.default,
  black: _black.default,
  blackWhite: _blackWhite.default,
  eladmin: _eladmin.default
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map