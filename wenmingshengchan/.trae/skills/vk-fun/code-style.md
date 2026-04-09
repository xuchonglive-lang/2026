# 代码格式化规范

## Prettier 配置

项目使用 Prettier 作为代码格式化工具。以下是标准配置：

```js
module.exports = {
  printWidth: 180,                    // 单行最大字符数
  tabWidth: 2,                        // 缩进空格数
  useTabs: false,                     // 使用空格缩进
  semi: true,                         // 语句末尾分号
  singleQuote: true,                  // 使用单引号
  trailingComma: 'es5',              // ES5 兼容尾逗号
  bracketSpacing: true,               // 对象花括号空格 { foo: bar }
  bracketSameLine: false,             // 闭合括号不换行
  arrowParens: 'always',              // 箭头函数始终加括号 (x) => x
  endOfLine: 'lf',                    // 换行符 lf
  htmlWhitespaceSensitivity: 'css',   // HTML 空白敏感度
  vueIndentScriptAndStyle: true,      // Vue script/style 内容缩进
  quoteProps: 'as-needed',            // 属性仅必要时加引号
  proseWrap: 'preserve',             // 保留手动换行
  embeddedLanguageFormatting: 'auto', // 自动格式化嵌入代码
  singleAttributePerLine: false,      // 属性尽可能同行
  parsers: {
    '.nvue': 'vue',
    '.ux': 'vue',
    '.uvue': 'vue',
    '.uts': 'typescript',
  },
};
```

## HBuilderX 编辑器配置

在【工具】→【设置】→【源码视图】中合并以下配置：

```json
{
  "defaultFomat.javascript_es6": "formator-prettier",
  "defaultFomat.json": "formator-prettier",
  "defaultFomat.markdown": "formator-prettier",
  "defaultFomat.vue": "formator-prettier",
  "prettier._enable": true,
  "prettier.useEditorIndentStyle": false,
  "prettier.scope": "**/*.vue,**/*.nvue,**/*.ux,**/*.ts,**/*.tsx,**/*.less,**/*.sass,**/*.scss,**/*.js,,**/*.json",
  "editor.formatOnSave": true
}
```

## .prettierignore 忽略文件

```txt
node_modules/
.node_modules/
unpackage/
dist/
uni_modules/
.vscode/
.hbuilderx/
.idea/
.vite/
.eslintcache
.DS_Store
package-lock.json
yarn.lock
pnpm-lock.yaml
*.min.js
*.min.css
manifest.json
static/
changelog.md
```

## 特殊文件覆盖配置

```js
overrides: [
  {
    // config.js 和 uni-config-center 使用双引号
    files: ['**/config.js', 'uni_modules/uni-config-center/**/*.js'],
    options: {
      singleQuote: false,
      quoteProps: 'preserve',
    },
  },
],
```

## 批量格式化命令

```bash
# 安装全局 prettier（与 HBuilderX 版本对齐）
npm install -g prettier@2.8.4 --registry https://registry.npmmirror.com

# 在项目根目录执行格式化
npx prettier "**/*" --write --ignore-unknown

# 卸载
npm uninstall -g prettier
```
