# 微信小程序三云空间动态切换设计文档

## 1. 背景与业务诉求
针对微信小程序审核机制的合规性要求，需要建立测试（审核）环境与生产正式环境的彻底物理隔离。
本设计引入**第三个云服务空间（主控空间 Master Space）**，配合 `vk-unicloud-router` 框架的多服务空间（envs）配置能力，通过 B 端管理后台动态调配小程序客户端云函数接口的数据路由，达到审核期和正式期无缝切换的目的。

### 核心架构图
```mermaid
graph TD
    subgraph 客户端 (微信小程序)
        AOP[AOP 拦截器]
        App[小程序 App.vue]
    end

    subgraph 云空间集群 (uniCloud)
        Master[(1. 主控云空间 Master - 默认)]
        Test[(2. 测试云空间 Test - 审核态)]
        Prod[(3. 正式云空间 Prod - 正式态)]
    end

    subgraph 后台管理 (B端管理平台)
        B[B端配置页面]
    end

    App -->|1. 获取版本号并查询当前激活环境| Master
    Master -->|2. 返回激活环境: test/prod| App
    AOP -->|3. 根据变量动态路由后续请求| Test
    AOP -->|3. 根据变量动态路由后续请求| Prod
    B -->|配置环境与审核版本映射关系| Master
```

---

## 2. 详细技术设计

### 2.1 客户端多空间配置 (`app.config.js`)
在客户端的 `app.config.js` 的 `uniCloud` 属性中注册这三个环境。其中，主控空间配置为默认环境 (`default`)：

```javascript
// app.config.js
module.exports = {
  // 基础项目配置...
  
  uniCloud: {
    envs: {
      // 1. 默认/主控空间：用于存放环境路由配置，并作为B端管理后台的主数据空间
      "default": {
        "provider": "aliyun",
        "spaceId": "master-space-id-xxxxxx",
        "clientSecret": "master-client-secret-yyyyyy"
      },
      // 2. 测试/审核空间：承载审核期模拟数据与测试逻辑
      "test": {
        "provider": "aliyun",
        "spaceId": "test-space-id-xxxxxx",
        "clientSecret": "test-client-secret-yyyyyy"
      },
      // 3. 正式生产空间：存放核心业务数据与正式运行期的云函数
      "prod": {
        "provider": "aliyun",
        "spaceId": "prod-space-id-xxxxxx",
        "clientSecret": "prod-client-secret-yyyyyy"
      }
    }
  }
}
```

### 2.2 主控空间数据表与判断接口
1. **路由规则表：`sys_config`**
   在 Master 云空间的数据库中添加如下路由记录：
   * **记录 `_id` / `key`**：`app_env_route_config`
   * **值结构 (`value`)**：
     ```json
     {
       "default_env": "prod",          // 兜底/默认的业务环境
       "audit_env": "test",           // 审核时路由的环境
       "audit_versions": ["1.1.0"]    // 当前处理审核中的微信版本列表
     }
     ```

2. **路由查询云接口：`client/pub/getActiveEnv`**
   部署于 Master 云空间。小程序在冷启动时传入自身版本号，由云端返回目标路由环境：
   ```javascript
   // 部署于 Master 云空间对应服务中
   module.exports = {
     main: async (event, context) => {
       const { version } = event.data;
       const db = uniCloud.database();
       
       const res = await db.collection('sys_config').doc('app_env_route_config').get();
       if (!res.data || res.data.length === 0) {
         return { code: 0, activeEnv: 'prod' };
       }
       
       const config = res.data[0].value;
       let activeEnv = config.default_env;
       
       // 检查当前版本是否匹配处于审核中的版本列表
       if (config.audit_versions.includes(version)) {
         activeEnv = config.audit_env;
       }
       
       return {
         code: 0,
         activeEnv: activeEnv
       };
     }
   }
   ```

### 2.3 B 端后台管理端配置
B 端后台管理系统连接在 Master（默认）空间运行，提供一个专门的开关与版本管理表单页面：
* **核心输入**：可增加/删除审核状态中的版本号，设置默认路由的兜底环境。
* **数据写回**：直接更新 Master 空间中 `sys_config` 的 `app_env_route_config`，实时生效。

### 2.4 客户端 AOP 劫持与“网络请求挂起队列”防竞争设计
由于获取当前激活环境是异步请求，为防止在获取环境结果返回前，首页的业务请求被发送到默认空间（主控空间），需要实现一个基于 Promise 队列的 AOP 拦截器。

此代码应当在小程序的 `main.js` 或 `App.vue` 入口的最顶部（且在 `vk` 挂载之后）强行同步注入：

```javascript
// AOP 动态环境注入拦截器
let isConfigLoaded = false;
const requestQueue = []; // 网络请求暂存队列

// 1. 发起拉取环境的配置请求
const accountInfo = uni.getAccountInfoSync();
const currentVersion = accountInfo.miniProgram.version || 'develop';

uniCloud.callFunction({
  name: 'router',
  data: {
    action: 'client/pub/getActiveEnv',
    data: { version: currentVersion }
  }
}).then(res => {
  if (res.result && res.result.code === 0) {
    uni.$app.currentEnv = res.result.activeEnv;
  } else {
    uni.$app.currentEnv = 'test'; // 异常兜底，默认偏向测试安全环境
  }
  releaseQueue();
}).catch(err => {
  uni.$app.currentEnv = 'test'; // 异常兜底
  releaseQueue();
});

// 2. 劫持原有的 vk.callFunction 核心底层方法
const originalCallFunction = vk.callFunction;
vk.callFunction = function(options) {
  // 如果是获取配置本身的接口，或者请求已经指明了 env，直接放行，不挂起
  if (options.url === 'client/pub/getActiveEnv' || options.env) {
    return originalCallFunction.call(this, options);
  }

  // 若路由环境尚未返回，返回 Promise 挂起并将调用上下文存入队列中
  if (!isConfigLoaded) {
    return new Promise((resolve, reject) => {
      requestQueue.push({
        options,
        resolve,
        reject
      });
    });
  }

  // 路由环境已就绪，注入活跃环境参数 env，发送请求
  options.env = uni.$app.currentEnv;
  return originalCallFunction.call(this, options);
};

// 3. 队列批量释放逻辑
function releaseQueue() {
  isConfigLoaded = true;
  while (requestQueue.length > 0) {
    const { options, resolve, reject } = requestQueue.shift();
    options.env = uni.$app.currentEnv; // 注入就绪的环境标识
    
    // 执行真正的底层云函数调用，并打通其 Promise 链路
    originalCallFunction.call(vk, options)
      .then(resolve)
      .catch(reject);
  }
}
```

---

## 3. 方案验收与验证标准
1. **冷启动防并发测试**：在微信开发者工具中调慢网络速度，在首页放置多个并发的接口调用，查看控制台 NetWork，确认所有业务接口请求是在 `getActiveEnv` 请求成功后、且带有正确的 `env` 标识被统一发出的。
2. **测试空间验证**：在 Master 空间中配置该版本指向 `test` 环境，验证前端登录后是否位于测试隔离数据库中。
3. **正式切换验证**：在 B 端后台把测试版本从 `audit_versions` 列表中剔除，重新启动小程序，网络请求自动带有 `env: "prod"`，页面自动展示真实线上业务数据，且用户登录和操作行为均完全独立于测试环境。
