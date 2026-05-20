# 微信小程序双服务空间动态路由切换设计文档

## 1. 背景与业务诉求
为了符合微信小程序的严格审核机制（规避UGC、敏感权限、支付等引起的审核拒审风险），我们需要在提审期间向微信审核员展示一套完全合规、干净的展示环境，并在审核通过后**无需重新提审客户端代码**即可无缝、无感地切换到正式云空间与完整功能。

本方案采用**“编译期静态注册双空间 + 运行期动态路由切换”**的架构，利用 `vk-unicloud-router` 框架的多服务空间（envs）配置能力与客户端 AOP 拦截技术，实现物理级别的数据与服务隔离，并引入了本地缓存优化机制以消除冷启动延迟。

---

## 2. 整体架构设计

```mermaid
graph TD
    subgraph 客户端 (微信小程序)
        AOP[AOP 拦截器]
        Cache[本地缓存检测]
        App[小程序入口 main.js]
    end

    subgraph 云服务空间 (uniCloud)
        SpaceA[(1. 审核/测试空间 Space A - default)]
        SpaceB[(2. 正式/生产空间 Space B - prod)]
    end

    subgraph 运营管理
        Console[uniCloud 网页控制台]
    end

    App -->|1. 读取本地缓存| Cache
    Cache -->|未命中: 请求判定| SpaceA
    Cache -->|已命中: 直接放行| SpaceB
    AOP -->|路由重定向 env: 'prod'| SpaceB
    Console -->|手动修改版本状态| SpaceA
```

### 2.1 空间角色分工
1. **空间 A（审核空间 - 默认环境 `default`）**：
   * 客户端编译打包时默认连接的空间。
   * 包含合规的 Mock 数据库和最少化的审核用云函数。
   * 承载审核状态配置表 `sys_config`。
2. **空间 B（正式空间 - 业务环境 `prod`）**：
   * 存储完整业务数据与真正的用户数据。
   * 审核通过后，客户端的业务请求将动态路由至此空间。
   * 承载 B端 后台管理系统。

---

## 3. 详细技术设计

### 3.1 客户端双空间注册 (`app.config.js`)
在客户端的 `app.config.js` 的 `uniCloud` 属性中静态注册这两个环境：

```javascript
// app.config.js
module.exports = {
  // 其他基础配置...
  uniCloud: {
    envs: {
      // 默认/审核空间 A（客户端冷启动默认请求此空间）
      "default": {
        "provider": "aliyun",
        "spaceId": "audit-space-id-xxxxxx",
        "clientSecret": "audit-client-secret-yyyyyy"
      },
      // 正式业务空间 B（审核通过后动态切换至此）
      "prod": {
        "provider": "aliyun",
        "spaceId": "prod-space-id-xxxxxx",
        "clientSecret": "prod-client-secret-yyyyyy"
      }
    }
  }
}
```

### 3.2 审核状态配置表与判定接口（空间 A）
#### 3.2.1 数据库结构
在空间 A 的 `sys_config` 集合中建立配置记录：
* **记录 ID (`_id`) / `key`**：`app_audit_config`
* **字段结构**：
  ```json
  {
    "_id": "app_audit_config",
    "key": "app_audit_config",
    "value": {
      "audit_versions": ["1.1.0"],    // 处于微信审核中的客户端版本列表
      "is_global_audit": false        // 全局强制审核开关（测试或紧急下线敏感功能用）
    },
    "description": "微信小程序版本审核状态配置"
  }
  ```

#### 3.2.2 状态查询接口 `client/pub/checkAuditStatus`
部署于空间 A 的公共免登录云函数：
* **输入参数**：`{ version: '1.1.0' }`
* **处理逻辑**：
  1. 读取 `sys_config` 中的 `app_audit_config` 记录。
  2. 若配置不存在，默认返回 `{ code: 0, isPassed: true }`（防报错兜底）。
  3. 若 `is_global_audit === true` 或 `audit_versions` 包含传入 the `version`：
     * 返回 `{ code: 0, isPassed: false }`（继续留在审核空间 A）。
  4. 否则：
     * 返回 `{ code: 0, isPassed: true }`（切换至正式空间 B）。

---

### 3.3 客户端 AOP 劫持与“挂起队列”及“本地缓存”设计
为了消除冷启动请求判定带来的首页加载卡顿，引入**本地缓存校验**：

```javascript
// main.js - 注入于 Vue/vk 初始化之后，页面加载之前
import vk from './uni_modules/vk-unicloud';

let isConfigLoaded = false; // 环境配置是否就绪
const requestQueue = [];    // 请求暂存队列
uni.$app = uni.$app || {};

// 1. 获取当前版本并读取本地已过审版本缓存
const accountInfo = uni.getAccountInfoSync();
const currentVersion = accountInfo.miniProgram.version || 'develop';
const cachedPassedVersion = uni.getStorageSync('app_env_passed_version');

if (cachedPassedVersion === currentVersion) {
  // 缓存命中：说明该版本早已过审，直接切换到 prod 空间，零延迟启动！
  uni.$app.currentEnv = 'prod';
  isConfigLoaded = true;
} else {
  // 缓存未命中：新版本发布后首次启动，需要等待网络判定
  uni.$app.currentEnv = 'default';
  isConfigLoaded = false;
}

// 2. 发起异步状态判定
vk.callFunction({
  url: 'client/pub/checkAuditStatus',
  data: { version: currentVersion },
  success: (res) => {
    if (res.code === 0 && res.isPassed) {
      uni.$app.currentEnv = 'prod';
      uni.setStorageSync('app_env_passed_version', currentVersion); // 写入缓存
    } else {
      uni.$app.currentEnv = 'default';
      uni.removeStorageSync('app_env_passed_version');
    }
    releaseQueue();
  },
  fail: () => {
    uni.$app.currentEnv = 'default'; // 异常兜底，留在默认审核空间
    releaseQueue();
  }
});

// 3. 劫持底层 vk.callFunction
const originalCallFunction = vk.callFunction;
vk.callFunction = function(options) {
  // 判定状态接口本身或已指定 env 的接口直接放行
  if (options.url === 'client/pub/checkAuditStatus' || options.env) {
    return originalCallFunction.call(this, options);
  }

  // 若就绪，直接注入 env 调用
  if (isConfigLoaded) {
    options.env = uni.$app.currentEnv;
    return originalCallFunction.call(this, options);
  }

  // 未就绪则挂起，返回 Promise 桥接
  return new Promise((resolve, reject) => {
    requestQueue.push({
      options,
      resolve,
      reject,
      context: this
    });
  });
};

// 4. 队列释放
function releaseQueue() {
  isConfigLoaded = true;
  while (requestQueue.length > 0) {
    const { options, resolve, reject, context } = requestQueue.shift();
    options.env = uni.$app.currentEnv;
    originalCallFunction.call(context || vk, options)
      .then(resolve)
      .catch(reject);
  }
}
```

---

## 4. 功能分流与 Mock 数据隔离策略
1. **数据物理隔离**：
   * 空间 A 的数据库不含生产数据。我们只需在空间 A 录入若干条绿色、合规的模拟记录（如“示范工程列表”）。
   * 空间 A 的所有云函数在查询数据库时，自然只会返回这些安全的 Mock 数据，无需代码侵入。
   * 审核员提交的表单数据直接写入空间 A，不影响空间 B。
2. **第三方服务拦截**：
   * 针对空间 A，在云端配置或中间件中，拦截短信、支付等请求，采用静态数据（如万能登录验证码 `123456`）进行 Mock 返回。
3. **前端 UI 分流**：
   * 在小程序中提供全局 Mixin，绑定 `currentEnv` 计算属性。
   * 前端模板通过 `v-if="currentEnv === 'prod'"` 控制敏感入口（如在线客服、投诉、支付）的显示和隐藏。

---

## 5. 审核通过后的转换操作指南
当小程序通过微信官方审核并发布上线后，管理员进行如下操作：
1. 登录 **uniCloud 网页控制台**。
2. 切换至 **空间 A（审核空间）**。
3. 打开云数据库中的 `sys_config` 集合。
4. 找到 `app_audit_config` 记录，编辑其 `value.audit_versions` 数组，将已过审发布的小程序版本号（例如 `"1.1.0"`）从中**移除**并保存。
5. 移除后，所有重新打开小程序的普通用户，判定接口将返回 `isPassed: true`，客户端自动并永久切换至 **空间 B（正式空间）**。

---

## 6. 验收与测试标准
1. **冷启动与缓存测试**：
   * 清理小程序缓存后冷启动，验证 `checkAuditStatus` 的请求发送与返回过程是否能正确挂起及释放业务请求。
   * 验证第二次启动时是否能命中本地缓存，跳过挂起逻辑实现直接路由。
2. **测试空间验证**：
   * 将当前开发版本号写入空间 A 的 `audit_versions`。在客户端进行操作，验证看到的是否均为空间 A 的 Mock 数据，且无敏感按钮。
3. **正式环境验证**：
   * 将当前版本号从配置中移除，重新启动小程序。验证请求参数中是否自动附带了 `env: "prod"`，且界面展示的是空间 B 的真实业务数据。
