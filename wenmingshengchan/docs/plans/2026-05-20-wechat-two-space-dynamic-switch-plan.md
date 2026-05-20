# 微信小程序双空间动态切换实施计划

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 实现微信小程序在冷启动时从审核空间（Space A）动态拉取版本审核状态，过审后利用客户端 AOP 拦截器将所有后续请求物理重定向到正式空间（Space B），并结合本地缓存实现暖启动零延迟。

**Architecture:** 编译打包时在客户端 `app.config.js` 中静态配置双服务空间（default 为 Space A，prod 为 Space B）。运行时通过 AOP 拦截 `vk.callFunction` 并进行异步队列挂起，判定过审后将环境标识改为 `prod` 重新释放请求，利用本地 `uni.setStorageSync` 缓存判定结果以消除后续冷启动延迟。

**Tech Stack:** uni-app (Vue2/Vue3), uniCloud (Aliyun), vk-unicloud-router

---

### Task 1: 空间 A 数据库初始化

**Files:**
- Create: `mp-client/uniCloud-aliyun/database/sys_config.schema.json`（若不存在）
- Manual Action: 在 Space A 控制台数据库中创建集合与初始数据

**Step 1: 创建 sys_config Schema 文件**
创建或更新 Schema 文件，定义表结构。

```json
{
  "bsonType": "object",
  "required": ["key", "value"],
  "permission": {
    "read": false,
    "create": false,
    "update": false,
    "delete": false
  },
  "properties": {
    "_id": {
      "description": "ID，此处固定为 app_audit_config"
    },
    "key": {
      "bsonType": "string",
      "description": "配置键名"
    },
    "value": {
      "bsonType": "object",
      "properties": {
        "audit_versions": {
          "bsonType": "array",
          "items": {
            "bsonType": "string"
          },
          "description": "处于微信审核中的客户端版本列表"
        },
        "is_global_audit": {
          "bsonType": "bool",
          "description": "是否开启全局审核模式"
        }
      }
    },
    "description": {
      "bsonType": "string",
      "description": "配置描述"
    }
  }
}
```

**Step 2: 在 uniCloud 空间 A 数据库中手动录入记录**
在网页控制台的 `sys_config` 集合中添加以下记录：
```json
{
  "_id": "app_audit_config",
  "key": "app_audit_config",
  "value": {
    "audit_versions": ["1.1.0"],
    "is_global_audit": false
  },
  "description": "微信小程序版本审核状态配置"
}
```

**Step 3: 验证配置**
确认数据记录在 Space A 的云控制台成功保存。

**Step 4: Commit**
```bash
git add mp-client/uniCloud-aliyun/database/sys_config.schema.json
git commit -m "db: add sys_config schema for audit config"
```

---

### Task 2: 创建 checkAuditStatus 云函数（空间 A）

**Files:**
- Create: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/pub/checkAuditStatus.js`

**Step 1: 编写状态查询云接口**
编写不需登录的公共云函数，读取配置并与传入版本比对。

```javascript
'use strict';
module.exports = {
  /**
   * 校验当前小程序版本是否处于审核态
   * @param {Object} event 请求参数
   * @param {String} event.version 小程序当前运行版本号
   * @param {Object} context 上下文
   */
  main: async (event, context) => {
    const { version } = event.data;
    const db = uniCloud.database();
    
    try {
      const res = await db.collection('sys_config').doc('app_audit_config').get();
      if (!res.data || res.data.length === 0) {
        // 兜底：若未配置，默认已过审
        return { code: 0, isPassed: true };
      }
      
      const config = res.data[0].value;
      const isGlobalAudit = config.is_global_audit || false;
      const auditVersions = config.audit_versions || [];
      
      // 如果全局处于审核态，或者当前版本在审核列表中，则判定未过审
      if (isGlobalAudit || auditVersions.includes(version)) {
        return { code: 0, isPassed: false };
      }
      
      return { code: 0, isPassed: true };
    } catch (err) {
      // 数据库读取出错兜底：返回未过审，保证审核期间的安全
      return { code: 0, isPassed: false, msg: err.message };
    }
  }
}
```

**Step 2: 本地运行验证**
在 HBuilderX 中右键该函数选择“本地运行”，模拟入参：
```json
{
  "version": "1.1.0"
}
```
验证其返回 `{ code: 0, isPassed: false }`；修改入参为 `"1.0.0"`，验证其返回 `{ code: 0, isPassed: true }`。

**Step 3: 上传部署**
右键该云函数选择“上传并运行”至 Space A 审核空间。

**Step 4: Commit**
```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/pub/checkAuditStatus.js
git commit -m "feat: add checkAuditStatus cloud function"
```

---

### Task 3: 客户端 app.config.js 配置更新

**Files:**
- Modify: `mp-client/app.config.js:90-100`（或相应位置）

**Step 1: 修改 app.config.js 文件**
在 `app.config.js` 的 `uniCloud` 节点中增加 `envs` 空间列表配置，保留您的原始 `spaceId` 和密钥。

```diff
  // 第三方服务配置
  service: {
+   // ... 保留其他服务配置
  },
+ uniCloud: {
+   envs: {
+     // 默认空间：对应空间 A（审核空间）
+     "default": {
+       "provider": "aliyun",
+       "spaceId": "audit-space-id-xxxxxx",
+       "clientSecret": "audit-client-secret-yyyyyy"
+     },
+     // 正式空间：对应空间 B（正式生产空间）
+     "prod": {
+       "provider": "aliyun",
+       "spaceId": "prod-space-id-xxxxxx",
+       "clientSecret": "prod-client-secret-yyyyyy"
+     }
+   }
+ }
```

**Step 2: 验证配置正确性**
编译客户端，确保打包没有报语法错误。

**Step 3: Commit**
```bash
git add mp-client/app.config.js
git commit -m "config: register default and prod spaces in envs"
```

---

### Task 4: 客户端 AOP 拦截器与缓存层实现

**Files:**
- Modify: `mp-client/main.js`

**Step 1: 编写 AOP 拦截代码并注入 main.js**
修改客户端 `main.js`。在 `Vue.use(vk, config)` (Vue2) 或 `app.use(vk, config)` (Vue3) 执行之后，强行插入 AOP 拦截逻辑。

根据项目当前的 Vue 版本（项目 main.js 中包含 `#ifdef VUE2` 和 `#ifdef VUE3` 双判断，均需覆盖）：

```javascript
// 在 main.js 中合适位置写入以下 AOP 拦截器

const initEnvRouter = () => {
  let isConfigLoaded = false;
  const requestQueue = [];
  uni.$app = uni.$app || {};

  // 1. 获取小程序版本信息
  const accountInfo = uni.getAccountInfoSync();
  const currentVersion = accountInfo.miniProgram.version || 'develop';
  const cachedPassedVersion = uni.getStorageSync('app_env_passed_version');

  // 2. 本地缓存优先判定
  if (cachedPassedVersion === currentVersion) {
    uni.$app.currentEnv = 'prod';
    isConfigLoaded = true;
  } else {
    uni.$app.currentEnv = 'default';
    isConfigLoaded = false;
  }

  // 3. 异步状态拉取
  vk.callFunction({
    url: 'client/pub/checkAuditStatus',
    data: { version: currentVersion },
    success: (res) => {
      if (res.code === 0 && res.isPassed) {
        uni.$app.currentEnv = 'prod';
        uni.setStorageSync('app_env_passed_version', currentVersion);
      } else {
        uni.$app.currentEnv = 'default';
        uni.removeStorageSync('app_env_passed_version');
      }
      releaseQueue();
    },
    fail: () => {
      uni.$app.currentEnv = 'default'; // 异常安全兜底
      releaseQueue();
    }
  });

  // 4. 劫持底层 vk.callFunction
  const originalCallFunction = vk.callFunction;
  vk.callFunction = function(options) {
    if (options.url === 'client/pub/checkAuditStatus' || options.env) {
      return originalCallFunction.call(this, options);
    }

    if (isConfigLoaded) {
      options.env = uni.$app.currentEnv;
      return originalCallFunction.call(this, options);
    }

    return new Promise((resolve, reject) => {
      requestQueue.push({
        options,
        resolve,
        reject,
        context: this
      });
    });
  };

  // 5. 释放队列
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
};

// 执行环境路由器初始化
initEnvRouter();
```

**Step 2: 页面级别全局注入**
在 `main.js` 中增加全局 Mixin，便于所有页面和组件动态获取 `currentEnv`：
```javascript
// 对于 Vue2
Vue.mixin({
  computed: {
    currentEnv() {
      return uni.$app.currentEnv || 'default';
    }
  }
});
// 对于 Vue3 结构：
// app.mixin({ ... })
```

**Step 3: 运行测试验证**
1. 启动微信开发者工具中的小程序。
2. 在微信开发者工具的 Storage 中清除 `app_env_passed_version`。
3. 模拟弱网，查看 Network 选项卡：
   * 验证 `client/pub/checkAuditStatus` 是否在最先被发出并等待。
   * 验证后续的首页列表请求是否被挂起，直到校验接口返回后，才携带正确的 `env` 参数统一发出。
4. 第二次冷启动小程序，验证是否命中缓存，零延迟直接发出业务请求。

**Step 4: Commit**
```bash
git add mp-client/main.js
git commit -m "feat: implement client AOP interceptor and storage cache"
```
