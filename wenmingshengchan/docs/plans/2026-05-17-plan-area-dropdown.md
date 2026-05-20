# 日常计划区域下拉单列展示实现计划

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 修改日常计划列表页面的区域选择器，单列展示所有的区域，从而简化按区域过滤计划的操作。

**Architecture:** 更新 `pages/plan/list.vue` 以绑定单列区域列表而不是嵌套的区域-点位树，修改确认逻辑以处理单列选择，并移除冗余的 getAreaPointTree 云函数调用。

**Tech Stack:** Vue 2, uni-app, uView (vk-uview-ui)

---

### Task 1: 重构日常计划页面区域选择的模板与逻辑

**Files:**
- Modify: `d:\AI project\2026\wenmingshengchan\mp-client\pages\plan\list.vue`

**Step 1: 修改模板配置**
- 将组件模板中表示筛选字段的 `<text class="input-label display-block mb-2">区域/点位</text>` 修改为 `<text class="input-label display-block mb-2">区域</text>`。
- 将 `<u-select>` 标签中的 `:list="locationTree"` 修改为 `:list="selectAreaList"`，并将 `mode="mutil-column-auto"` 修改为 `mode="single-column"`。

**Step 2: 初始化 selectAreaList 并进行数据格式化**
- 在 `data()` 中添加 `selectAreaList` 状态并初始化：
  ```javascript
  selectAreaList: [
    { value: '', label: '所有区域' }
  ],
  ```
- 移除 `data()` 中的 `locationTree` 变量以减少内存开销。
- 在 `getAreaList()` 方法中，获取数据成功后，通过 `map` 方法将列表数据映射为带有 `value` 和 `label` 的属性格式，从而完成格式化填充，并刷新 `selectKey`：
  ```javascript
  this.selectAreaList = this.areaList.map(item => ({
    value: item._id,
    label: item.name
  }));
  this.selectKey = Date.now();
  ```
- 从 `init()` 方法中删除 `this.getLocationTree();` 这一冗余云函数调用。
- 从组件中删除整个已不需要的 `getLocationTree()` 方法。

**Step 3: 优化 onLocationConfirm 确认选择方法**
- 重写 `onLocationConfirm(arr)` 方法，仅接收并处理单列选中项（即第一列 `arr[0]`），设置筛选数据，并且不再过滤点位（`pointId` 置空）：
  ```javascript
  onLocationConfirm(arr) {
    let area = arr[0];
    if (area && area.value) {
      this.searchForm.areaId = area.value;
      this.searchForm.pointId = '';
      this.searchForm.areaName = area.label;
    } else {
      this.searchForm.areaId = '';
      this.searchForm.pointId = '';
      this.searchForm.areaName = '所有区域';
    }
    this.onSearch();
  },
  ```

**Step 4: 编译验证**
- 通过编译验证代码正确性。
- 确认组件交互无误且日常计划查询能够正常根据区域筛选返回结果。

**Step 5: 提交更改**
- 将改动提交至 Git。
