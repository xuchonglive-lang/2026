# 2026-05-17 日常计划列表区域下拉单列展示设计方案

## 1. 背景与目标
在文明生产管理系统的日常计划列表页面（`pages/plan/list.vue`）中，原有的区域过滤功能采用的是联动式多列筛选（区域和点位两级联动）。用户要求将下拉选择过滤区域的组件改为**单列显示所有的区域**，直接按区域进行计划筛选，简化操作流。

## 2. 详细设计方案（方案 1）
本方案采取彻底重构单列区域选择器的方式，移除冗余的点位联动，优化页面请求性能。

### 2.1 模板（Template）修改
- 将搜索面板中展示的标签由 `区域/点位` 变更为 `区域`。
- 对 `<u-select>` 组件进行重构：
  - 将 `:list="locationTree"` 修改为 `:list="selectAreaList"`。
  - 将 `mode="mutil-column-auto"` 修改为 `mode="single-column"`。

### 2.2 脚本（Script）修改
- 在 `data()` 中：
  - 新增 `selectAreaList` 状态：初始化为 `[{ value: '', label: '所有区域' }]`。
  - 废弃/移除原有的 `locationTree` 变量。
- 在 `methods` 中：
  - **`init()`**: 移除 `this.getLocationTree()` 这一云函数调用，保留 `this.getAreaList()`。
  - **`getAreaList()`**:
    - 获取区域列表成功后，不仅赋值给 `this.areaList`，还要对数据进行格式化（将 `_id` 映射为 `value`，`name` 映射为 `label`），并赋值给 `this.selectAreaList`。
  - **`getLocationTree()`**: 完全删除该无用方法。
  - **`onLocationConfirm(arr)`**:
    - 仅解析 `arr[0]` 并更新 `searchForm.areaId` 和 `searchForm.areaName`。
    - 将 `searchForm.pointId` 重置为空字符串，因为不再支持点位级过滤。

## 3. 风险与影响评估
- **影响范围**：仅限于日常计划列表页面（`pages/plan/list.vue`）。
- **测试与验证方案**：
  - 点击“区域”选择器时，应能拉起单列选择窗。
  - 选择具体区域或“所有区域”后，应能自动触发搜索并拉取过滤后的任务列表。
  - 控制台无报错，网络请求中不再出现 `getAreaPointTree` 云函数的调用。
