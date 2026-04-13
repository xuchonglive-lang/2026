# 日治理计划前端页面 UI5 像素级复刻总结

## 1. 阶段目标与背景
基于前期已经稳定的“日治理计划管理”模块服务端 API，本次我们进入纯粹的**前端表现层改造**。目标是按照 `UI5` 提供的设计稿（工业玻璃拟物风 Industrial Clarity）和 `DESIGN.md` 设计系统规范，对微信小程序的日计划执行列表（`plan/list/index.vue`）和反馈详情（`plan/feedback/index.vue`）这两大 C 端核心页面进行 **1:1 像素级复刻**。

---

## 2. 核心架构与设计迁移

为了将 TailwindCSS 环境下的 UI 设计系统完全接入原生使用 SCSS 的微信小程序体系内，主要完成了以下视觉与交互规范转换：

### 2.1 工业视觉体系落地 (SCSS)
定义了一套严格遵从 UI5 的 SCSS 变量与原子类化混入（Mixins）：
- **色阶管控**：
  - `$primary: #0050cb;` 主品牌蓝
  - `$primary-fixed: #dae1ff;` `$secondary-fixed: #dae1ff;` 状态容器蓝
  - `$surface-container-high`: 背景基础灰度，结合复杂的多层渐变提供工业感。
- **背景纹理叠加**：
  采用了 `background-image` 定义两层径向渐变（Radial Gradient）配合正交 `linear-gradient` （白色发光线条模拟工业网格），精准还原设计稿。

### 2.2 核心组件复刻

#### 1) 玻璃态组件 (Glassmorphism)
对核心卡片、导航底栏等结构采用降级+特性的实现：
```scss
.glass-panel {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px); // 毛玻璃特性
  border: 1px solid rgba(255, 255, 255, 0.5); // Ghost Border
  box-shadow: 0 16rpx 64rpx 0 rgba(0, 102, 255, 0.05); // Ambient Glows
}
```

#### 2) 头像重叠栈 (Avatar Stacking)
通过负外边距处理多人执行环境下的头像重叠排版，在 `feedback/index.vue` 内置信心地展示团队执行情况：
```scss
.avatar-stack {
  margin-left: -16rpx;
}
.avatar-stack > view {
  margin-left: -12rpx;
}
```

#### 3) 微交互支持 (Micro-interactions)
引入 `.active-scale` 实现物理按键下压感，并在状态胶囊按钮与底部分屏动作按钮上高频配置：
```scss
.active-scale:active {
  transform: scale(0.98);
  transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

---

## 3. 页面重构内容明细

### 3.1 方案列表页 (`mp-client/pages/plan/list/index.vue`)
- **双层布局**：外层提供带有吸顶粘性（Sticky）的 Tabs 控制（`我的计划`/`需验收`），支持顺滑的分组展示。
- **状态标签封装**：将 1-6 的状态码通过计算属性映射至纯色、轮廓、玻璃透明等不同的状态表现层级。
- **逻辑绑定**：原有 `z-paging` 或原生的下拉刷新 API 生命周期依旧保留，UI 更新不打断原本稳定的列表异步流与鉴权。

### 3.2 执行反馈页 (`mp-client/pages/plan/feedback/index.vue`)
- **信息分层**：
  - 重设 `日计划内容` 、 `完成反馈` 和 `确认意见` 三大块（Section）。
  - 应用了专属样式 `.section-title-underline`（底部蓝色强调横条）。
- **图片宫格交互**：反馈中的实地相片呈现基于等比例缩小切割（aspect-video + object-cover）渲染，还原照片网格原貌。
- **底栏状态驱动动作 (Status-driven Floating Action Bar)**
  - `can_submit` = true 呈现底部固定的大尺寸“计划执行反馈”按钮。
  - `can_verify` = true 则分拆为【驳回】（红色轮廓）和【通过】（全色填充）两列布局。
- **重构反馈提交流程**：完全适配到具有玻璃外壳感的弹层 UI (Modal Mask + Glass Panel)，并保持原 `vk.callFunction` 直传的稳定性。

---

## 4. 后续建议
1. 受制于微信小程序编译引擎的差异性，请通过 HBuilderX 试运行验证该页面样式在真机（尤其是 iOS 低版本无 `backdrop-filter` 支持时）的表现，若透明度过高，已配置底色 `rgba(255,255,255,0.4)` 作为不透明度降级兜底。
2. “日治理计划”模块相关前端与云端业务目前已**全面实现闭环**，可提交代码并准备进入验收环节。
