// 定时任务自动加载模块 - 该文件负责扫描并导出同级目录下的所有任务逻辑
const fs = require('fs'); // 引入 Node.js 文件系统模块，用于同步读取目录内容
const path = require('path'); // 引入路径处理模块，用于解析文件扩展名和基本名称
const moduleObj = {}; // 初始化一个空对象，用于存储扫描到的所有子任务模块

// 开始执行自动扫描：获取当前 index.js 所在目录下的所有文件和文件夹名称
const files = fs.readdirSync(__dirname); // 同步读取当前工作目录的内容列表
files.forEach((file) => { // 遍历目录下的每一个条目
  // 过滤逻辑：排除掉 index.js 自身，且只处理以 .js 结尾的文件
  if (file !== 'index.js' && file.endsWith('.js')) { // 确保只加载子任务脚本
    const moduleName = path.basename(file, '.js'); // 获取不带 .js 后缀的文件名作为模块名称（Key）
    moduleObj[moduleName] = require(`./${file}`); // 使用 require 动态加载对应的任务脚本并挂载到对象上
  }
});

module.exports = moduleObj; // 导出整合后的任务对象，供外部 crontab/pub.js 统一调用
// 提示：新增定时任务只需在此目录下创建新的 .js 文件并导出异步函数即可
