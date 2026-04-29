'use strict'; // 使用严格模式，防止意外的全局变量和非安全行为
let vk = uniCloud.vk; // 定义全局 vk 实例变量，用于后续获取框架核心能力

const tasks = require('./tasks'); // 引入任务模块文件夹，通常包含具体的任务执行函数
const taskConfig = require('./taskConfig.js'); // 引入任务配置文件，定义各任务的触发频率和执行逻辑

/**
 * 权限注意：访问以下链接查看相关云对象的权限文档
 * 文档地址：https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/cloudObject.html#内置权限
 */
const cloudObject = { // 定义云对象，集成了定时任务的处理逻辑
  isCloudObject: true, // 明确标记此文件为云对象模式，以便框架正确识别与分发
  /**
   * 请求前处理，主要用于调用具体方法之前进行预处理
   * 一般用于拦截器、身份验证、参数校验、定义全局对象等场景
   * 文档地址：https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/cloudObject.html#before-预处理
   */
  _before: async function () { // 在执行任何方法前的钩子函数
    vk = uniCloud.vk; // 重新确保 vk 实例已挂载到全局，方便内部使用
    const clientInfo = this.getClientInfo(); // 获取当前请求的客户端信息（包括来源、IP等）
    const cloudInfo = this.getCloudInfo(); // 获取当前云端的运行环境信息
    // 安全校验：如果请求既不是来自定时触发（timing），也不是在本地开发环境运行，则判定为非法访问
    if (clientInfo.source !== 'timing' && cloudInfo.runtimeEnv !== 'local') { // 非定时器或本地调用拦截
      return { code: -1, msg: '不支持的运行方式' }; // 返回错误提示，防止外部通过 HTTP 恶意调用
    }
  },
  // 加载具体的定时任务逻辑
  ...tasks, // 使用扩展运算符将 tasks 模块中定义的所有方法注入到此云对象中
  /**
   * 定时任务的核心执行主入口
   * @url crontab/pub.timing 对应的云函数路由调用地址
   */
  timing: async function () { // 定时任务执行的主入口函数
    const timingTask = vk.createTimingTask(this); // 利用 vk 框架创建定时任务执行器
    return await timingTask(taskConfig); // 根据 taskConfig 中的配置参数，异步执行相关的子任务任务流
  },
};

module.exports = cloudObject; // 将云对象导出，使 uniCloud 能够加载并执行此服务
