'use strict';
/**
 * ====================================================================
 * vk-fun 技能 - JS API 调用全量示例 (js-api-examples.js)
 * ====================================================================
 * 本文件为宪法第七章 JS API Norm 的可运行参考代码。
 * 涵盖：前端 vk.pubfn 工具优先用法、路由鉴权、弹窗、列表分页等。
 * ====================================================================
 */

// =====================================================================
// 1. 工具优先 — 宪法强制：时间、对象、数组操作优先使用 vk.pubfn
// =====================================================================

/** 时间格式化（强制使用 vk.pubfn.timeFormat） */
function timeFormatExamples() {
  // 标准格式化
  let str1 = vk.pubfn.timeFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
  // → "2026-03-13 14:00:00"

  // 只要日期
  let str2 = vk.pubfn.timeFormat(new Date(), 'yyyy-MM-dd');
  // → "2026-03-13"

  // 带时区偏移
  let str3 = vk.pubfn.timeFormat(new Date(), 'yyyy-MM-dd hh:mm:ss', { timeZone: 8 });

  // 获取日期详细信息
  let info = vk.pubfn.getDateInfo(new Date());
  // → { year, month, day, hour, minute, second, week, yearDay }

  // 获取时间范围
  let time = vk.pubfn.getCommonTime(new Date());
  // → todayStart/todayEnd, weekStart/weekEnd, monthStart/monthEnd ...

  // 日期偏移
  let ts = vk.pubfn.getOffsetTime(new Date(), { type: 'day', mode: -1, value: 7 });
  // → 7天前的时间戳

  // 快捷偏移
  let { startTime, endTime } = vk.pubfn.getDayOffsetStartAndEnd(0);   // 今天起止
  let lastWeek = vk.pubfn.getWeekOffsetStartAndEnd(-1);               // 上周起止
  let lastMonth = vk.pubfn.getMonthOffsetStartAndEnd(-1);             // 上月起止
}

/** 对象操作（强制使用 vk.pubfn） */
function objectExamples() {
  let obj = { name: '张三', age: 18, password: '123456' };

  // 浅拷贝（断开引用）
  let copy = vk.pubfn.copyObject(obj);

  // 深度克隆（含函数）
  let clone = vk.pubfn.deepClone(obj);

  // 安全取值（避免 undefined 报错）
  let val = vk.pubfn.getData(obj, 'a.b.c', '默认值');

  // 安全赋值
  vk.pubfn.setData(obj, 'a.b.c', '新值');

  // 提取指定字段
  let newObj = vk.pubfn.getNewObject(obj, ['name', 'age']);
  // → { name: '张三', age: 18 }

  // 删除敏感字段
  vk.pubfn.deleteObjectKeys(obj, ['password', 'token']);

  // 对比差异
  let diff = vk.pubfn.getObjectDiff({ a: 1, b: 2 }, { a: 1, b: 3 });
  // → { b: { oldValue: 2, newValue: 3 } }
}

/** 数组操作（强制使用 vk.pubfn） */
function arrayExamples() {
  let arr = [
    { _id: '001', name: '张三' },
    { _id: '002', name: '李四' },
  ];

  // 数组转树
  let tree = vk.pubfn.arrayToTree(arr, {
    id: '_id',
    parent_id: 'parent_id',
    children: 'children',
    root_value: 0,
  });

  // 树转数组
  let flatArr = vk.pubfn.treeToArray(tree, { children: 'children' });

  // 查找元素
  let item = vk.pubfn.getListItem(arr, '_id', '001');       // 返回对象
  let index = vk.pubfn.getListIndex(arr, '_id', '001');      // 返回索引
  let both = vk.pubfn.getListItemIndex(arr, '_id', '001');   // { item, index }

  // 合并数组去重
  let merged = vk.pubfn.arr_concat(arr, [{ _id: '003', name: '王五' }], '_id');

  // 数组转对象
  let json = vk.pubfn.arrayToJson(arr, '_id');
  // → { '001': { _id: '001', name: '张三' }, ... }

  // 提取字段值数组
  let names = vk.pubfn.arrayObjectGetArray(arr, 'name');
  // → ['张三', '李四']

  // 检测交集
  let has = vk.pubfn.checkArrayIntersection(['a', 'b'], ['b', 'c']);
  // → true
}

/** 判空系列（强制使用 vk.pubfn） */
function nullCheckExamples() {
  vk.pubfn.isNull(undefined);          // true（undefined/null/""/[]/{}均为空）
  vk.pubfn.isNotNull('abc');           // true
  vk.pubfn.isNullOne('a', '', 'c');    // true（任一为空）
  vk.pubfn.isNullAll('', null, undefined); // true（全部为空）
  vk.pubfn.isNotNullAll('a', 'b', 'c');   // true（全部非空）

  // 返回第一个空属性的 key
  let key = vk.pubfn.isNullOneByObject({ name: '张三', mobile: '' });
  // → 'mobile'
}

/** 格式检测 */
function testExamples() {
  vk.pubfn.test('15200000001', 'mobile');  // true
  vk.pubfn.test('abc@qq.com', 'email');    // true
  vk.pubfn.test('100.50', 'amount');       // true

  // 表单验证器
  // { validator: vk.pubfn.validator('mobile'), message: '手机号格式错误', trigger: 'blur' }
}

// =====================================================================
// 2. 路由鉴权 — 宪法强制：页面跳转使用 vk.navigateTo
// =====================================================================

/** 路由跳转（含内置登录检测） */
function navigationExamples() {
  // 普通跳转（自动处理 tab 页）
  vk.navigateTo('/pages/detail/detail?id=001');

  // 关闭当前页跳转
  vk.redirectTo('/pages/list/list');

  // 关闭所有重新打开
  vk.reLaunch('/pages/index/index');

  // 跳转 tabBar
  vk.switchTab('/pages/index/index');

  // 返回上一页
  vk.navigateBack();

  // 跳转首页
  vk.navigateToHome();

  // 跳转登录页（自动记录来源页，登录后返回）
  vk.navigateToLogin();

  // 检测登录状态（未登录自动跳转登录页）
  vk.pubfn.checkLogin();
}

// =====================================================================
// 3. 前端云函数调用
// =====================================================================

/** 标准云函数调用 */
function callFunctionExample() {
  vk.callFunction({
    url: 'client/training/kh/getList',
    title: '加载中...',
    data: {
      pageIndex: 1,
      pageSize: 10,
    },
    success: (data) => {
      // data 即云函数 return 的内容
      console.log(data);
    },
    fail: (err) => {
      // code 非 0 时进入
      console.error(err);
    },
  });
}

// =====================================================================
// 4. 前端列表分页（手机端专用）
// =====================================================================

/** 手机端分页加载（配合 onReachBottom） */
function listPaginationExample() {
  // 在 methods 中定义
  function getList() {
    vk.pubfn.getListData({
      that: this,
      url: 'client/training/kh/getList',
      listName: 'rows',
      data: {
        category_id: this.currentCategory,
      },
      dataPreprocess: (list) => {
        // 数据预处理（可选）
        return list.map((item) => {
          item.timeStr = vk.pubfn.timeFormat(item._add_time, 'yyyy-MM-dd');
          return item;
        });
      },
    });
  }
}

// =====================================================================
// 5. 弹窗与提示
// =====================================================================

/** 弹窗类 API */
function dialogExamples() {
  // 提示框
  vk.alert('操作成功');
  vk.alert('内容', '标题', '确定', () => {});

  // 确认框
  vk.confirm('确认删除？', ({ confirm }) => {
    if (confirm) { /* 执行删除 */ }
  });

  // 输入框
  vk.prompt('请输入原因', ({ confirm, content }) => {
    if (confirm) { console.log(content); }
  });

  // 轻提示
  vk.toast('保存成功', 'success');

  // 加载提示
  vk.showLoading('提交中...');
  // ... 异步操作完成后
  vk.hideLoading();

  // 操作菜单
  vk.showActionSheet({
    title: '请选择操作',
    list: ['编辑', '删除', '分享'],
    success: ({ index }) => {
      console.log('选择了:', index);
    },
  });
}

// =====================================================================
// 6. 防抖与节流
// =====================================================================

/** 防抖/节流 */
function debounceThrottleExamples() {
  // 防抖：用户停止操作 500ms 后执行
  vk.pubfn.debounce(() => {
    console.log('搜索');
  }, 500, 'searchKey');

  // 节流：每 1000ms 最多执行一次
  vk.pubfn.throttle(() => {
    console.log('滚动');
  }, 1000, 'scrollKey');
}

// =====================================================================
// 7. 其他常用
// =====================================================================

/** 延迟 */
async function sleepExample() {
  await vk.pubfn.sleep(1000); // 等待 1 秒
}

/** 随机数 */
function randomExamples() {
  let str = vk.pubfn.random(6);                                    // 6位随机字符串
  let num = vk.pubfn.random(4, '0123456789');                      // 4位数字验证码
  let unique = vk.pubfn.random(8, undefined, ['existingCode1']);   // 不重复
}

/** 字符串隐藏 */
function hiddenExample() {
  let phone = vk.pubfn.hidden('15200000001', 3, 7);
  // → "152****0001"
}

/** 获取当前页面信息 */
function currentPageExample() {
  let page = vk.pubfn.getCurrentPage();
  // page.fullPath  完整路径（含参数）
  // page.route     路径（不含参数）
  // page.options   页面参数
  // page.$vm       vue 实例
}

/** 全局配置 */
function configExample() {
  let config = vk.getConfig();           // 所有配置
  let loginUrl = vk.getConfig('login.url'); // 指定配置
}
