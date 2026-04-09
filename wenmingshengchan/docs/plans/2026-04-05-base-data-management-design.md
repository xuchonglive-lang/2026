# 基础数据管理 - 架构规范与设计文档 (Design Doc)

**模块名称**：公共核心 - 基础数据管理
**创建时间**：2026-04-05
**文档来源**：头脑风暴确立

## 1. 架构与数据库基石设计

本系统严格沿用 `vk-unicloud` 底座规范并扩展。

### 核心表结构建设
- **uni-id-users (扩展)**：
  - 核心增配：`department_id` (String类型) 用于组织唯一映射。
  - 状态位设计：`audit_status` (0:未完善, 1:待审, 2:被系统拒绝, 3:全量通过)；`status` (0:正常, 1:冻结账户)。
  - `real_name`, `mobile` 用于真实可诉的数据回溯。
- **base-dept (组织架构树)**：具有 `parent_id` 形成（矿区公司 -> 管理部门 -> 执行班组）严密三级森林。
- **base-area (作业区域)**：具有 `manager_dept_id` 指向管理它的责任大部门。
- **base-point (作业点位)**：具有 `area_id` 与细分后的 `manager_dept_id` 实名节点。

### 服务端网关与路由
- **C 端 (mp-client)**: 统一收敛至云函数 `router/service/client/user/` 处理静默授权与资料提交。
- **B 端 (mp-admin)**: 会员列表、区域、组织等通用接口收敛于 `router/service/admin/baseinfo/`。云端使用全隔离的访问模型，强制权限与 Token 查验。

---

## 2. 身份认证死锁边界流 (C-End Workflow)

为应对复杂的现场登录并防阻不明数据试探，执行最严苛流控与最新的微信隐私合规标准：

1. **微信原生态合规授权 (Privacy Auth Pattern)**：
   - 彻底废弃旧版 `getUserProfile`，引入类似参考项目 `mp-login` 中的 `<AuthDialog>` 标准组件。
   - 必须通过 `<button open-type="chooseAvatar">` 组件事件拦截用户头像。
   - 必须通过 `<input type="nickname">` 并前置调用 `uni.requirePrivacyAuthorize` 校验隐私协议后，安全合法地猎取真实昵称。
2. **静默登录关联**：利用 `loginByWeixin` 配合前置拿到的头像昵称，在远端生成或补全缺省壳账户。
3. **全局网关过滤 (loginFilter)**：只要在小程序中企图调用非白名单接口，触发过滤器强行拦截校验 `audit_status`，一旦核实异常则抛出 `-1002` 基础阻拦码。
4. **前端状态死锁隔离**：
   - 侦探到 `-1002` 的无权错误后，`reLaunch` 强切页面至拦截提示页。
   - 如果 `audit_status === 2`：开启死锁拦截模式，不可进行任何自助“再提交修改”，界面文案统一引导：“认证已被驳回，请联系各线组长线下清理申请重新录入”。

---

## 3. RBAC 融合动态穿透鉴权 (B-End Authorization)

对于存在层级关系的业务数据（如看部门所有人员），采取在云函数端包装条件反射的模式保护数据边界：

1. **角色切分**：`dept_admin` 角色。
2. **下钻穿透算法**：
   - 云函数查询列表前，依据 `token` 内解析的 `department_id` 去 `base-dept` 表递归拿到“自身 + 全部子孙 ID”的 `ID数组`。
   - 在 JQL 获取单据、获取审核列表时，植入自动 `where({ department_id: dbCmd.in(ID数组) })` 重建隔离。
3. 免除每行数据上冗余各种冗长父亲 ID 的臃肿做法。

---

## 4. 全局生命周期安全守卫 (Lifecycle Defense Logic)

不允许出现因随意删除或变更顶层组织概念，进而产生无头尸体般的“孤儿员工/记录”。

1. **人员守卫 (User Guardianship)**：
   - 云端拦截器：挂靠在 `admin/baseinfo/dept/delete` 或 `/update`。
   - 行动：检测 `status` 若为“无效/禁用”，提前在事务中执行 `count(uni-id-users)`。如命中存在活跃人员，事务直接挂起报错。
2. **重控点与区域守卫**：
   - 对于带有明显警报历史、或明确标识为 `is_heavy_control` 的作业点位，禁止直接物理 `delete` 进垃圾堆，仅允许 `Update status=不可见(下线)`，彻底留存痕迹追溯。
3. **区域-点位权责遗传 (Cascading Fill)**：
   - 新建点位触发前端/后端挂载的钩子函数：点位自动带入其上级"作业区域"的 `manager_dept_id` 。
   - 后门设计：依旧保留直接强制修改点位 `manager_dept_id` 的开放空间，应对诸如特种设备需要跨区域调派独立责任部门维护的现场变阵需求。

## 5. UI 架构底座与样式流派 (UI Infrastructure)

**视觉标准与设计系统**的落地采用全局 Tailwind + Vue 全局样式映射表结合的方式进行架构约束，确保各端表现如一：

- **主题代号**：重工业毛玻璃（Industrial Manufacturing Dashboard Glassmorphism）。
- **底座集成 (`app.scss` / `tailwind.config.js`)**：
  - 将所有原生的深蓝点缀色（如 `#0050cb`, `#b3c5ff`, `#f7f9fb`）锁定为一个原子变量类集合供统一调度。
  - 定义工业光晕效应 `.ambient-glow` 与 背景涂鸦矩阵 `.industrial-grid` 作为独立复用类。
  - **组件化反馈**：抽出并锁定 `.transition-industrial` 的 `cubic-bezier(0.2, 0.8, 0.2, 1)` 以达成阻尼动画效果。
  - C端组件的构建需要 1:1 对标 `docs/UI` 下的设计高保真原稿 (`login`, `mine`, `register`, `audit-status`) 的排版。

## 6. 后台管理 (Admin Backend) 闭环联动

防患于未然的关键在于彻底管住 B 端。在 `mp-admin` 云函数侧对**部门/区域/点位**的操作必须建立强制拦截机制：
- **查**：Admin端仅能读取分配授权以下的部门和网格树。
- **改/删**：基础表中的数据（如节点与对应作业点位）严格采用逻辑关联保护。即在发起“禁用或物理删除”动作前，必须在中间件或事务钩子中执行**生命周期依赖校验**，如果其下属仍然包裹了活跃用户或有子区域挂载，强制阻断操作，实现安全的数据级联闭环。
