<template>
  <div class="flex flex-col lg:flex-row gap-8 w-full items-start mt-0">
    
    <!-- Left Sidebar (TOC) for PC -->
    <aside class="w-[240px] flex-shrink-0 hidden md:block animate-fade-in text-zinc-900 sticky top-24 self-start mt-0" style="height: max-content;">
      <div class="flex flex-col gap-6">
        <!-- Sidebar Top Slot (Author card etc) -->
        <slot name="sidebar-top"></slot>
      
        <nav v-if="tocHtml" class="flex flex-col gap-2 bg-white border border-zinc-200 shadow-sm p-6 rounded-2xl max-h-[75vh] overflow-y-auto custom-scrollbar mt-0">
          <div class="text-xs font-bold tracking-wider text-zinc-400 uppercase mb-2 border-b border-zinc-100 pb-2">文章目录</div>
          <div class="toc-container text-[13px] font-medium" v-html="tocHtml"></div>
        </nav>
      </div>
    </aside>

    <!-- Content Area -->
    <article class="flex-grow w-full max-w-4xl order-1 md:order-2 bg-white border border-transparent md:border-zinc-200 md:shadow-sm md:rounded-2xl p-0 md:p-6 lg:px-10 animate-fade-in min-w-0 overflow-hidden mt-0">
      
      <!-- Mobile TOC Dropdown -->
      <div class="block md:hidden bg-zinc-50 border border-zinc-200 rounded-xl p-4 mb-8" v-if="tocHtml">
        <div class="flex items-center justify-between cursor-pointer" @click="showMobileToc = !showMobileToc">
           <div class="font-bold text-[14px] text-zinc-900 flex items-center gap-2">
              📖 文章目录
           </div>
           <span class="material-symbols-outlined transition-transform duration-200 text-zinc-500" :class="showMobileToc ? 'rotate-180' : ''">expand_more</span>
        </div>
        <div v-show="showMobileToc" class="mt-4 pt-4 border-t border-zinc-200">
           <div class="toc-container text-[14px]" v-html="tocHtml"></div>
        </div>
      </div>

      <!-- Header Slot -->
      <slot name="header"></slot>

      <!-- Markdown Body -->
      <section class="markdown-body max-w-none text-zinc-700 leading-relaxed text-[15px]" v-html="htmlContent"></section>
      
      <!-- Footer Slot -->
      <slot name="footer"></slot>
    </article>
    
  </div>
</template>

<script>
// 使用 markdown-it 全家桶
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'github-markdown-css/github-markdown-light.css';
import MarkdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';

export default {
  name: 'MarkdownViewer',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      htmlContent: '',
      tocHtml: '',
      showMobileToc: false
    }
  },
  watch: {
    content: {
      immediate: true,
      handler(val) {
        this.renderMarkdown(val);
      }
    }
  },
  methods: {
    renderMarkdown(text) {
      if (!text) {
        this.htmlContent = '';
        this.tocHtml = '';
        return;
      }

      let generatedToc = '';

      const md = new MarkdownIt({
        html: false, // 防止 XSS 注入设置
        linkify: true,
        typographer: true,
        breaks: true, // 开启换行符支持，单回车也能换行
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return '<pre class="hljs"><code>' +
                     hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                     '</code></pre>';
            } catch (__) {}
          }
          return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
      })
      .use(markdownItAnchor, {
        // 仅开启核心的头部 ID 绑定供锚点跳跃（移除丑陋并干扰视线的 '#' 符号标签）
      })
      .use(markdownItTocDoneRight, {
        level: [1, 2, 3],
        listType: 'ul',
        callback: (html, ast) => {
          generatedToc = html;
        }
      });

      // 在开头注入 [toc] 让回调触发
      const rawContent = `[toc]\n\n${text}`;
      let fullHtml = md.render(rawContent);

      this.tocHtml = generatedToc;
      // 将生成的自带目录节点从 HTML 串中完全彻底地清理掉，以防止它遗留在 DOM 中抢占高度
      if (generatedToc) {
        fullHtml = fullHtml.replace(generatedToc, '');
      }
      this.htmlContent = fullHtml;
    }
  }
}
</script>

<style>
/* 彻底隐藏注入在正文中的自带 TOC 导航区块结构 */
.table-of-contents {
  display: none !important;
}
.markdown-body .table-of-contents {
  display: none !important;
}
/* MD-Juice 风格排版优化 */
.markdown-body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important;
  color: #27272a !important;
}
.markdown-body blockquote {
  color: #71717a !important;
  padding: 2px 20px !important;
  margin: 20px 0 !important;
  border-left: 4px solid #3b82f6 !important;
  background-color: #f8fafc !important;
}
.markdown-body h1, .markdown-body h2 {
  border-bottom: 2px solid #f4f4f5 !important;
  padding-bottom: 0.3em !important;
  margin-top: 1.5em !important;
  margin-bottom: 1em !important;
  font-weight: 600 !important;
  color: #18181b !important;
}
.markdown-body code:not([class*="language-"]) {
  background-color: #f4f4f5 !important;
  color: #0284c7 !important;
  padding: 2px 6px !important;
  border-radius: 4px !important;
  font-size: 0.85em !important;
}
.markdown-body a {
  color: #2563eb !important;
  text-decoration: none !important;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}
.markdown-body a:hover {
  border-color: #2563eb;
}

/* TOC 目录树精美样式 */
.toc-container ul {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.toc-container ul li {
  list-style: none;
}
.toc-container ul li a {
  display: block;
  padding: 6px 12px;
  color: #71717a; /* zinc-500 */
  border-radius: 4px;
  transition: all 0.2s;
  text-decoration: none;
  font-weight: 500;
}
.toc-container ul li a:hover {
  background-color: #f4f4f5; /* zinc-100 */
  color: #18181b; /* zinc-900 */
}
.toc-container ul ul {
  padding-left: 12px;
  margin-top: 4px;
  margin-bottom: 4px;
  border-left: 2px solid #e4e4e7;
}

/* 高亮代码块 UI 调整 */
.markdown-body pre.hljs {
  border-radius: 8px;
  padding: 16px;
  background-color: #f4f4f5 !important;
  color: #27272a !important;
  font-size: 13px;
  overflow-x: auto;
  border: 1px solid #e4e4e7;
}

/* 锚点样式 */
.header-anchor {
  color: #a1a1aa;
  text-decoration: none;
  margin-right: 8px;
  opacity: 0;
  transition: opacity 0.2s;
}
h1:hover .header-anchor,
h2:hover .header-anchor,
h3:hover .header-anchor,
h4:hover .header-anchor {
  opacity: 1;
}

/* 防止内容溢出的兼容性方案 */
.markdown-body {
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  max-width: 100%;
}
.markdown-body img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
.markdown-body table {
  display: block;
  overflow-x: auto;
  width: 100%;
  border-collapse: collapse;
}
.markdown-body table th,
.markdown-body table td {
  border: 1px solid #e4e4e7;
  padding: 8px 16px;
}
.markdown-body p, .markdown-body li {
  max-width: 100%;
  overflow-x: hidden;
}
</style>
