const fs = require('fs');
const path = require('path');

const adminDir = 'd:/AI project/2026/wenmingshengchan/mp-client/uniCloud-aliyun/cloudfunctions/router/service/admin';
const res = {};

fs.readdirSync(adminDir).forEach(mod => {
  const modPath = path.join(adminDir, mod);
  if (fs.statSync(modPath).isDirectory() && !['system', 'system_uni'].includes(mod)) {
    res[mod] = [];
    const sysPath = path.join(modPath, 'sys');
    if (fs.existsSync(sysPath)) {
      fs.readdirSync(sysPath).forEach(f => {
        if (f.endsWith('.js')) {
          res[mod].push(f.replace('.js', ''));
        }
      });
    } else {
      // Check subdirectories
      fs.readdirSync(modPath).forEach(d => {
        const subPath = path.join(modPath, d);
        if (fs.statSync(subPath).isDirectory()) {
          const p = path.join(subPath, 'sys');
          if (fs.existsSync(p)) {
            fs.readdirSync(p).forEach(f => {
              if (f.endsWith('.js')) {
                res[mod].push(d + '/sys/' + f.replace('.js', ''));
              }
            });
          }
        }
      });
    }
  }
});

console.log(JSON.stringify(res, null, 2));

// Generate the permissions JSON based on the exact files
const categories = {
  'base-area': { pId: 'baseinfo-manage', pName: '业务基础数据管理', name: '业务区域管理', sort: 110 },
  'base-dept': { pId: 'baseinfo-manage', pName: '业务基础数据管理', name: '部门组别管理', sort: 110 },
  'base-point': { pId: 'baseinfo-manage', pName: '业务基础数据管理', name: '重点管控点管理', sort: 110 },
  'user': { pId: 'baseinfo-manage', pName: '业务基础数据管理', name: '职工管理', sort: 110 },
  'feedback': { pId: 'feedback-manage', pName: '现场巡检反馈管理', name: '反馈与配置管理', sort: 120 },
  'info': { pId: 'info-manage', pName: '信息发布管控', name: '信息与分类', sort: 130 },
  'keywork': { pId: 'keywork-manage', pName: '重点工作调度管理', name: '重点工作综合', sort: 140 },
  'plan': { pId: 'plan-manage', pName: '生产日计划调度', name: '日计划综合', sort: 150 },
  'report': { pId: 'report-manage', pName: '现场问题报备系统', name: '报备综合', sort: 160 },
  'dashboard': { pId: 'dashboard-manage', pName: '控制台大盘', name: '大盘概览', sort: 105 }
};

const results = [];
const addTime = 1714580000000;
const addedParents = new Set();

Object.keys(res).forEach(mod => {
  const cat = categories[mod] || { pId: mod + '-manage', pName: mod + '管理', name: mod + '配置', sort: 200 };
  const pId = 'wmsc-' + cat.pId;
  
  if (!addedParents.has(pId)) {
    results.push({
      _id: pId,
      _add_time: addTime,
      permission_id: pId,
      permission_name: cat.pName,
      sort: cat.sort,
      enable: true
    });
    addedParents.add(pId);
  }
  
  const childId = pId + '-' + mod;
  results.push({
    _id: childId,
    _add_time: addTime,
    permission_id: childId,
    permission_name: cat.pName.replace('管理','') + ' - ' + cat.name,
    sort: 1,
    enable: true,
    parent_id: pId
  });

  const funcs = res[mod];
  let actAdd = [], actDel = [], actUpd = [], actRead = [];
  
  funcs.forEach(f => {
    let url = 'admin/' + mod + '/' + (f.includes('/sys/') ? f : ('sys/' + f));
    if (f.startsWith('add')) actAdd.push(url);
    else if (f.startsWith('delete') || f.includes('delete')) actDel.push(url);
    else if (f.startsWith('update') || f.includes('replyAndFix') || f.includes('transferIssue') || f.includes('audit')) actUpd.push(url);
    else actRead.push(url);
  });
  
  const acts = [
    { action: '查', suffix: 'read', urls: actRead, curd: 4, level: 1, sort: 1 },
    { action: '增', suffix: 'add', urls: actAdd, curd: 1, level: 2, sort: 2 },
    { action: '改', suffix: 'update', urls: actUpd, curd: 3, level: 3, sort: 3 },
    { action: '删', suffix: 'delete', urls: actDel, curd: 2, level: 4, sort: 4 }
  ];
  
  acts.forEach(act => {
    if (act.urls.length > 0) {
      results.push({
        _id: childId + '-' + act.suffix,
        _add_time: addTime,
        permission_id: childId + '-' + act.suffix,
        permission_name: cat.name + ' - ' + act.action,
        url: act.urls,
        sort: act.sort,
        enable: true,
        match_mode: 0,
        parent_id: childId,
        curd_category: act.curd,
        level: act.level
      });
    }
  });
});

const ndjson = results.map(i => JSON.stringify(i)).join('\n');
fs.writeFileSync('d:/AI project/2026/wenmingshengchan/mp-client/uniCloud-aliyun/database/business_permissions_exact_ndjson.json', ndjson, 'utf8');
console.log('Generated exact permissions');
