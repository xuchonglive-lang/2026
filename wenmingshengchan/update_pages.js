const fs = require('fs');

const pagesPath = 'pages.json';
let data = fs.readFileSync(pagesPath, 'utf8');

const tabBarConfig = `"tabBar": {
    "color": "#94a3b8",
    "selectedColor": "#0050cb",
    "backgroundColor": "#ffffff",
    "borderStyle": "white",
    "custom": true,
    "list": [
      { "pagePath": "pages/index/index", "text": "首页" },
      { "pagePath": "pages/info/index/index", "text": "信息传达" },
      { "pagePath": "pages/feedback/todo-list/index", "text": "任务执行" },
      { "pagePath": "pages/plan/list/index", "text": "计划执行" },
      { "pagePath": "pages/user/mine/index", "text": "我的" }
    ]
  },
  "subPackages": [`;

if (!data.includes('"tabBar"')) {
  data = data.replace(/"subPackages"\s*:\s*\[/, tabBarConfig);
  fs.writeFileSync(pagesPath, data);
  console.log('Tabbar configuration correctly injected.');
} else {
  console.log('Tabbar already exists');
}
