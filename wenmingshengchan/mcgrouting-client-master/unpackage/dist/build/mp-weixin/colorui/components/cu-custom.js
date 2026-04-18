(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{"42e8":function(t,n,a){},"55c2":function(t,n,a){"use strict";a.r(n);var e=a("c6e0"),u=a.n(e);for(var o in e)"default"!==o&&function(t){a.d(n,t,(function(){return e[t]}))}(o);n["default"]=u.a},"9f91":function(t,n,a){"use strict";a.r(n);var e=a("b3b1"),u=a("55c2");for(var o in u)"default"!==o&&function(t){a.d(n,t,(function(){return u[t]}))}(o);a("d9fc");var c,r=a("f0c5"),l=Object(r["a"])(u["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],c);n["default"]=l.exports},b3b1:function(t,n,a){"use strict";var e;a.d(n,"b",(function(){return u})),a.d(n,"c",(function(){return o})),a.d(n,"a",(function(){return e}));var u=function(){var t=this,n=t.$createElement;t._self._c},o=[]},c6e0:function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=getApp(),e={data:function(){return{StatusBar:a.globalData.StatusBar,CustomBar:a.globalData.CustomBar,Custom:a.globalData.Custom}},components:{},props:{bgColor:{type:String,default:""},isCustom:{type:[Boolean,String],default:!1},isBack:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},options:{addGlobalClass:!0,multipleSlots:!0},methods:{BackPage:function(){t.navigateBack({delta:1}).catch((function(n){console.info("error",n),t.reLaunch({url:"/pages/index/index"})}))},toHome:function(){t.reLaunch({url:"/pages/index/index"})}}};n.default=e}).call(this,a("543d")["default"])},d9fc:function(t,n,a){"use strict";var e=a("42e8"),u=a.n(e);u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9f91"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);
