/**
 * Stitch HTML → Vue SFC Converter
 * 将 Stitch 生成的 HTML 页面转换为 Vue 2 单文件组件（静态模式）
 * 修复：从 body 中移除 <style> 标签，避免 Vue 模板解析错误
 */
const fs = require('fs');
const path = require('path');

const BASE = 'd:\\AI project\\2026\\xc';
const HTML_DIR = path.join(BASE, '.stitch-html');

// Screen → Vue file mapping
const MAPPING = [
  { html: 'index.html',                  vue: 'pages/index/index.vue' },
  { html: 'login.html',                  vue: 'pages/login/index.vue' },
  { html: 'key-work-list.html',          vue: 'pages/key-work/list.vue' },
  { html: 'key-work-detail.html',        vue: 'pages/key-work/task-detail.vue' },
  { html: 'info-publish-list.html',      vue: 'pages/info-publish/list.vue' },
  { html: 'info-publish-detail.html',    vue: 'pages/info-publish/detail.vue' },
  { html: 'training-list.html',          vue: 'pages/training/list.vue' },
  { html: 'training-video-detail.html',  vue: 'pages/training/video-detail.vue' },
  { html: 'pro-mgmt-index.html',         vue: 'pages/pro-mgmt/index.vue' },
  { html: 'pro-mgmt-network.html',       vue: 'pages/pro-mgmt/network.vue' },
  { html: 'pro-mgmt-calendar.html',      vue: 'pages/pro-mgmt/calendar.vue' },
  { html: 'pro-mgmt-my-docs.html',       vue: 'pages/pro-mgmt/my-docs.vue' },
  { html: 'message-list.html',           vue: 'pages/message/list.vue' },
  { html: 'message-detail.html',         vue: 'pages/message/detail.vue' },
  { html: 'workbench.html',              vue: 'pages/workbench/index.vue' },
  { html: 'user-center.html',            vue: 'pages_plugs/user-center/index.vue' },
  { html: 'user-center-my-training.html',vue: 'pages_plugs/user-center/my-training.vue' },
  { html: 'user-center-settings.html',   vue: 'pages_plugs/user-center/settings.vue' },
  { html: 'user-center-my-tasks.html',   vue: 'pages_plugs/user-center/my-tasks.vue' },
];

function extractBodyAndStyle(htmlContent) {
  // Extract <body> content
  let body = '';
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    body = bodyMatch[1].trim();
  } else {
    body = htmlContent;
  }

  // Remove <script> AND <style> tags from body
  // (styles are extracted separately into <style scoped>)
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');
  body = body.replace(/<style[\s\S]*?<\/style>/gi, '');

  // Clean up excessive whitespace left by removed tags
  body = body.replace(/\n\s*\n\s*\n/g, '\n\n');

  // Extract all <style> content from the full HTML
  let styles = '';
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let styleMatch;
  while ((styleMatch = styleRegex.exec(htmlContent)) !== null) {
    styles += styleMatch[1] + '\n';
  }

  // Extract Google Fonts links
  const linkRegex = /<link[^>]*href="([^"]*fonts[^"]*)"[^>]*>/gi;
  let fontImports = '';
  let linkMatch;
  while ((linkMatch = linkRegex.exec(htmlContent)) !== null) {
    fontImports += `@import url('${linkMatch[1]}');\n`;
  }

  return { body, styles: fontImports + styles };
}

function htmlToVueSFC(htmlContent, pageName) {
  const { body, styles } = extractBodyAndStyle(htmlContent);

  const vue = `<template>
  <div class="stitch-page stitch-${pageName}">
    ${body}
  </div>
</template>

<script>
export default {
  name: '${pageName}',
  data() {
    return {}
  }
}
</script>

<style scoped>
${styles}
</style>
`;
  return vue;
}

// Process all files
let success = 0;
let failed = 0;

for (const item of MAPPING) {
  const htmlPath = path.join(HTML_DIR, item.html);
  const vuePath = path.join(BASE, item.vue);

  if (!fs.existsSync(htmlPath)) {
    console.log(`[SKIP] ${item.html} not found`);
    failed++;
    continue;
  }

  try {
    const vueDir = path.dirname(vuePath);
    if (!fs.existsSync(vueDir)) {
      fs.mkdirSync(vueDir, { recursive: true });
    }

    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    const pageName = path.basename(item.vue, '.vue');
    const vueSFC = htmlToVueSFC(htmlContent, pageName);

    fs.writeFileSync(vuePath, vueSFC, 'utf-8');
    console.log(`[OK] ${item.html} -> ${item.vue} (${vueSFC.length} bytes)`);
    success++;
  } catch (err) {
    console.log(`[ERR] ${item.html}: ${err.message}`);
    failed++;
  }
}

console.log(`\nDone: ${success} success, ${failed} failed, ${MAPPING.length} total`);
