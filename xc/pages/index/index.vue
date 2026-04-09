<template>
  <app-layout page-title="平台首页" :show-footer="false">
    <div class="min-h-screen bg-base-100 text-base-content font-sans overflow-x-hidden relative">
      <main class="w-full relative z-10 flex flex-col items-center">
        <!-- HERO SECTION -->
        <section class="max-w-[1350px] mx-auto w-full px-0 flex flex-col items-center text-center pt-32 pb-24">
          <div class="inline-flex items-center rounded-full border border-base-200 bg-base-100 px-3 py-1 text-sm font-medium mb-8">
            <span class="flex h-2 w-2 rounded-full bg-zinc-900 mr-2"></span>
            v2.0 Professional Enterprise Edition
          </div>
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 leading-[1.1] text-zinc-950">
            The Infrastructure for <br/> Modern Enterprises.
          </h1>
          <p class="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            Build, scale, and secure your workflows with our next-generation office platform. Optimized for high-concurrency production environments and professional management excellence.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button class="btn btn-neutral text-neutral-content rounded-md hover:bg-zinc-800 px-8" @click="goTo('/pages/login/index')">
              Start Building
            </button>
            <button class="btn bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-900 shadow-sm rounded-md px-8" @click="goTo('/pages/pro-mgmt/my-docs')">
              Read Documentation
            </button>
          </div>
        </section>

        <!-- ASYMMETRIC GRID -->
        <section class="max-w-[1350px] mx-auto w-full px-0 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32 z-10">
          <!-- Code Block Card -->
          <div class="lg:col-span-2 rounded-xl overflow-hidden border border-zinc-200 bg-zinc-950 text-zinc-50 shadow-sm">
            <div class="flex items-center px-4 py-3 border-b border-zinc-800 bg-zinc-900">
               <div class="flex gap-2">
                 <div class="w-3 h-3 rounded-full bg-zinc-700"></div>
                 <div class="w-3 h-3 rounded-full bg-zinc-700"></div>
                 <div class="w-3 h-3 rounded-full bg-zinc-700"></div>
               </div>
               <span class="ml-4 text-xs font-mono text-zinc-400">enterprise-integration.ts</span>
            </div>
            <div class="p-6 overflow-x-auto text-sm font-mono leading-loose">
              <span class="text-zinc-400">import</span> { EnterpriseSystem, Workflow } <span class="text-zinc-400">from</span> '@core/platform';<br/><br/>
              <span class="text-zinc-400">async function</span> initializeInfrastructure() {<br/>
              &nbsp;&nbsp;<span class="text-zinc-400">const</span> platform = <span class="text-zinc-400">new</span> EnterpriseSystem({<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;secure: <span class="text-zinc-300">true</span>,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;scaling: <span class="text-zinc-300">'auto'</span>,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;region: <span class="text-zinc-300">'global-01'</span><br/>
              &nbsp;&nbsp;});<br/><br/>
              &nbsp;&nbsp;<span class="text-zinc-500">// Initialize management modules</span><br/>
              &nbsp;&nbsp;<span class="text-zinc-400">await</span> platform.deploy(<span class="text-zinc-400">new</span> Workflow({<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;name: <span class="text-zinc-300">"Production Professional Management"</span>,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;compliance: [<span class="text-zinc-300">"SOC2"</span>, <span class="text-zinc-300">"GDPR"</span>],<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;autoAudit: <span class="text-zinc-300">true</span><br/>
              &nbsp;&nbsp;}));<br/><br/>
              &nbsp;&nbsp;<span class="text-zinc-400">return</span> platform.status();<br/>
              }
            </div>
          </div>

          <!-- Pricing Tier List Card -->
          <div class="card bg-white border border-zinc-200 shadow-sm rounded-xl">
            <div class="card-body p-8">
              <h2 class="text-xl font-semibold tracking-tight text-zinc-950 mb-6">Enterprise Tiers</h2>
              <ul class="flex flex-col gap-4 flex-grow">
                <li class="flex items-center justify-between pb-4 border-b border-zinc-100">
                  <div class="flex items-center gap-3">
                    <span class="w-2 h-2 rounded-full bg-zinc-900"></span>
                    <span class="font-medium text-sm text-zinc-900">Standard Cloud</span>
                  </div>
                  <span class="font-mono text-sm text-zinc-500">¥2,999/mo</span>
                </li>
                <li class="flex items-center justify-between pb-4 border-b border-zinc-100">
                  <div class="flex items-center gap-3">
                    <span class="w-2 h-2 rounded-full bg-zinc-900"></span>
                    <span class="font-medium text-sm text-zinc-900">Professional Hybrid</span>
                  </div>
                  <span class="font-mono text-sm text-zinc-500">¥8,500/mo</span>
                </li>
                <li class="flex items-center justify-between pt-2">
                  <div class="flex items-center gap-3">
                    <span class="w-2 h-2 rounded-full bg-zinc-300"></span>
                    <span class="font-medium text-sm text-zinc-900">Global Enterprise</span>
                  </div>
                  <span class="text-zinc-500 font-semibold uppercase tracking-wider text-xs">Contact Sales</span>
                </li>
              </ul>
              <div class="mt-8">
                <button class="btn btn-neutral w-full rounded-md text-neutral-content">View All Plans</button>
              </div>
            </div>
          </div>

          <!-- Security Certifications Card -->
          <div class="card bg-white border border-zinc-200 shadow-sm rounded-xl">
            <div class="card-body p-8">
              <h2 class="text-xl font-semibold tracking-tight text-zinc-950 mb-2">Security &amp; Compliance</h2>
              <p class="text-zinc-500 text-sm mb-6">We maintain rigorous standards to ensure your data remains your own.</p>
              
              <div class="grid grid-cols-3 gap-4">
                <div class="bg-zinc-50 rounded-lg p-4 flex flex-col items-center justify-center border border-zinc-100">
                  <span class="text-xs font-bold tracking-widest uppercase text-zinc-900">SOC 2</span>
                  <div class="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">Certified</div>
                </div>
                <div class="bg-zinc-50 rounded-lg p-4 flex flex-col items-center justify-center border border-zinc-100">
                  <span class="text-xs font-bold tracking-widest uppercase text-zinc-900">ISO 27001</span>
                  <div class="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">Compliant</div>
                </div>
                <div class="bg-zinc-50 rounded-lg p-4 flex flex-col items-center justify-center border border-zinc-100">
                  <span class="text-xs font-bold tracking-widest uppercase text-zinc-900">GDPR</span>
                  <div class="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">Ready</div>
                </div>
              </div>
              
              <div class="mt-8 pt-6 border-t border-zinc-100 flex items-center gap-2 text-sm text-zinc-500">
                <div class="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>
                <span>End-to-end encryption by default</span>
              </div>
            </div>
          </div>
        </section>

        <!-- FEATURES SECTION -->
        <section class="max-w-[1350px] mx-auto w-full px-0 mb-32 z-10 relative">
          <div class="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <h2 class="text-3xl font-bold tracking-tight text-zinc-950 mb-2">核心功能模块</h2>
              <p class="text-zinc-500">针对大型企业生产环节量身打造的专业化管理引擎</p>
            </div>
            <button class="btn btn-ghost hover:bg-zinc-100 text-zinc-900 mt-4 md:mt-0 rounded-md" @click="goTo('/pages/pro-mgmt/index')">
              探索大厅 &rarr;
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Feature 1 -->
            <div class="card bg-white border border-zinc-200 hover:border-zinc-300 shadow-sm transition-all duration-200 cursor-pointer rounded-xl" @click="goTo('/pages/key-work/list')">
              <div class="card-body p-6">
                <h4 class="text-lg font-semibold tracking-tight text-zinc-900 mb-2">工作推进</h4>
                <p class="text-sm text-zinc-500 leading-relaxed">
                  智能化的任务分配与进度追踪，通过实时看板可视化生产环节中的每一个关键节点。
                </p>
              </div>
            </div>
            <!-- Feature 2 -->
            <div class="card bg-white border border-zinc-200 hover:border-zinc-300 shadow-sm transition-all duration-200 cursor-pointer rounded-xl" @click="goTo('/pages/pro-mgmt/index')">
              <div class="card-body p-6">
                <h4 class="text-lg font-semibold tracking-tight text-zinc-900 mb-2">专业管理</h4>
                <p class="text-sm text-zinc-500 leading-relaxed">
                  深度的行业垂直管理工具，整合生产标准、质量控制与合规审计的一站式专业平台。
                </p>
              </div>
            </div>
            <!-- Feature 3 -->
            <div class="card bg-white border border-zinc-200 hover:border-zinc-300 shadow-sm transition-all duration-200 cursor-pointer rounded-xl" @click="goTo('/pages/info-publish/list')">
              <div class="card-body p-6">
                <h4 class="text-lg font-semibold tracking-tight text-zinc-900 mb-2">信息共享</h4>
                <p class="text-sm text-zinc-500 leading-relaxed">
                  打破部门间的信息孤岛，基于高并发架构的数据中台，确保信息流转的实时性与准确性。
                </p>
              </div>
            </div>
            <!-- Feature 4 -->
            <div class="card bg-white border border-zinc-200 hover:border-zinc-300 shadow-sm transition-all duration-200 cursor-pointer rounded-xl" @click="goTo('/pages/training/list')">
              <div class="card-body p-6">
                <h4 class="text-lg font-semibold tracking-tight text-zinc-900 mb-2">培训管理</h4>
                <p class="text-sm text-zinc-500 leading-relaxed">
                  全周期的员工技能提升体系，涵盖线上课程、实操考核与资质证书的全程数字化管理。
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- TRUST SECTION -->
        <section class="max-w-[1350px] mx-auto w-full px-0 py-16 border-t border-zinc-100 text-center">
          <p class="text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase mb-8">Trusted by Global Infrastructure Leaders</p>
          <div class="flex flex-wrap justify-center items-center gap-12 sm:gap-16 opacity-30 grayscale">
            <span class="font-bold text-xl tracking-tighter mix-blend-multiply">NEXUS.CORP</span>
            <span class="font-bold text-xl tracking-tighter mix-blend-multiply">STRATUM</span>
            <span class="font-bold text-xl tracking-tighter mix-blend-multiply">FORGE_SYS</span>
            <span class="font-bold text-xl tracking-tighter mix-blend-multiply">AVANT.BIO</span>
            <span class="font-bold text-xl tracking-tighter mix-blend-multiply">HELIOS</span>
          </div>
        </section>
      </main>

      <!-- DAISYUI FOOTER -->
      <footer class="w-full border-t border-zinc-200 bg-white">
        <div class="max-w-[1350px] mx-auto px-0 py-12 flex flex-col md:flex-row justify-between w-full">
          <aside class="max-w-xs mb-8 md:mb-0">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-6 h-6 rounded bg-zinc-900"></div>
              <span class="text-xl font-bold tracking-tight text-zinc-900">XC.PLATFORM</span>
            </div>
            <p class="text-zinc-500 text-sm leading-relaxed mb-6">
              致力于为现代企业提供最坚实的数字化生产管理基础设施。Optimized for high concurrency and scale.
            </p>
          </aside> 
          <div class="flex gap-16">
            <nav class="flex flex-col gap-3">
              <h6 class="text-sm font-semibold text-zinc-900 mb-2">解决方案</h6> 
              <a class="text-sm text-zinc-500 hover:text-zinc-900 cursor-pointer" @click.prevent="goTo('/pages/key-work/list')">产品功能</a> 
              <a class="text-sm text-zinc-500 hover:text-zinc-900 cursor-pointer" @click.prevent="goTo('/pages/pro-mgmt/index')">安全保障</a> 
              <a class="text-sm text-zinc-500 hover:text-zinc-900 cursor-pointer" @click.prevent="goTo('/pages/training/list')">价格方案</a>
            </nav> 
            <nav class="flex flex-col gap-3">
              <h6 class="text-sm font-semibold text-zinc-900 mb-2">关于我们</h6> 
              <a class="text-sm text-zinc-500 hover:text-zinc-900 cursor-pointer">企业文化</a> 
              <a class="text-sm text-zinc-500 hover:text-zinc-900 cursor-pointer">技术团队</a> 
              <a class="text-sm text-zinc-500 hover:text-zinc-900 cursor-pointer">联系方式</a>
            </nav> 
          </div>
        </div>
        <div class="max-w-[1350px] mx-auto px-0 py-6 border-t border-zinc-100 flex justify-between items-center text-xs text-zinc-400">
           <p>© 2026 xuchong group. All rights reserved.</p>
           <p>冀ICP备2024077622号-1</p>
        </div>
      </footer>
    </div>
  </app-layout>
</template>

<script>
export default {
  name: 'index',
  methods: {
    goTo(path) {
      uni.navigateTo({ url: path })
    }
  }
}
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  display: inline-block;
  vertical-align: middle;
}
</style>
