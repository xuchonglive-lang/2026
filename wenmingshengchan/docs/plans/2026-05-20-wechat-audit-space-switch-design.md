# 微信小程序版本审核与数据隔离动态切换设计文档

## 1. 背景与诉求
在开发与上传微信小程序时，由于微信对用户生成内容（UGC）、未备案社区、敏感权限等审核极其严格，且审核员通常随机填写垃圾/测试数据。
为了保证微信审核顺利通过，同时实现审核通过后**无需重新提审代码即可自动、无感地转换到正式云环境数据与功能**，需要建立一套动态切换机制。

经头脑风暴探讨，决定采用**“方案 1（单空间 + 动态版本审核开关）”**作为最终实施方案。该方案能够避免物理双服务空间带来的用户体系不互通（uni-id 登录态失效）、网络延迟、微信合法域名限制及维护成本翻倍等痛点。

## 2. 详细设计方案

### 2.1 数据库配置表设计
在当前关联的正式 uniCloud 服务空间中，新增或利用现有的系统配置表 `sys_config`。

#### 集合定义与 Schema：
* **表名**：`sys_config`
* **主键 `_id` / 唯一键 `key`**：`app_audit_config`
* **配置数据结构（值）**：
  ```json
  {
    "_id": "app_audit_config",
    "key": "app_audit_config",
    "value": {
      "audit_versions": ["1.0.0"],   // 处于微信审核中的版本号列表
      "is_global_audit": false       // 全局审核模式开关（测试或兜底用）
    },
    "description": "微信小程序版本审核状态配置"
  }
  ```

### 2.2 客户端版本获取与鉴权初始化
1. **获取版本号**：
   在 `App.vue` 或前端公共入口，使用微信原生及 uni-app 的接口读取当前运行版本号：
   ```javascript
   const accountInfo = uni.getAccountInfoSync();
   const currentVersion = accountInfo.miniProgram.version || 'develop'; // 兼容开发/体验版无版本号问题
   ```
2. **状态判定缓存**：
   在小程序全局变量（如 `uni.$app.isAuditMode`）中维护当前客户端是否为审核状态。
   调用公共云接口进行查询：
   ```javascript
   // 前端 App.vue 初始化逻辑
   uniCloud.callFunction({
     name: 'router',
     data: {
       action: 'client/pub/checkAuditStatus',
       data: { version: currentVersion }
     }
   }).then(res => {
     if (res.result && res.result.code === 0) {
       uni.$app.isAuditMode = res.result.isAudit;
       uni.$emit('auditModeChanged', res.result.isAudit);
     }
   }).catch(err => {
     // 兜底策略：网络异常时为防止违规功能暴露导致审核不通过，默认开启审核状态
     uni.$app.isAuditMode = true;
   });
   ```

### 2.3 前端 UI 分流与功能屏蔽
前端页面（如 `pages/index/index.vue` 等）通过 `isAuditMode` 进行条件渲染：
* **模块屏蔽**：在页面中使用 `v-if="!isAuditMode"` 动态隐藏涉及敏感权限、UGC、充值支付等容易引起审核被拒的交互控件。
* **页面分流**：若核心业务与审核标准严重冲突，可单独制作一个静态合规首页组件，通过条件判断整页替换首页渲染。

### 2.4 云端数据路由与 Mock 隔离
在 `vk-unicloud-router` 后台 service 云函数中，针对审核状态的数据做隔离处理：
* 在请求接收时，如果校验到 `isAudit: true`，则不查询生产数据库的敏感字段，且不对外网发起请求。
* 直接构造并返回一套安全、精美的 Mock 数据（如静态通知、模拟的系统今日任务、示范区域等）。
* **写入拦截**：审核员提交的任何脏表单数据，直接重定向写入一个独立的测试临时表（如 `audit_inputs`），或者直接返回成功但不持久化到主业务表。

### 2.5 审核通过后的切换流程
1. **微信官方审核通过并发布小程序**。
2. 管理员直接在 uniCloud 控制台或后台管理中修改 `sys_config` 中 `app_audit_config` 记录的 `audit_versions` 数组，将已发布的版本号从中移除。
3. 移除后，当用户（包括老用户）再次重新打开小程序时，版本匹配失败，云函数返回 `isAudit: false`，小程序前端与云函数数据立即同步、无感地切换为完整的正式生产版，整个过程无需二次提审。

## 3. 验收标准
1. **开发测试**：可以在本地将 `currentVersion` 设定为匹配项，验证前端敏感按钮是否彻底隐藏，且页面拉取到的列表数据为预设的 Mock 干净数据。
2. **提审测试**：发布体验版，将体验版版本号写入 `audit_versions`。提审时，审核人员看到的应是一个极简、合规的应用程序，不含有违规和报错。
3. **切换测试**：从配置表中移除该版本号，再次进入小程序，界面立即渲染出真实的业务流程和数据，且用户原本的登录状态完好不受损。
