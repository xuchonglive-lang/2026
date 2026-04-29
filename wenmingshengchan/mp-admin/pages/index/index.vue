<template>
  <view class="page-body dashboard-container">
    <!-- 顶部：全局数据核心指标 -->
    <el-row :gutter="20" class="kpi-row">
      <el-col :span="6">
        <el-card shadow="hover" class="kpi-card bg-primary">
          <div class="kpi-title">今日重控点位完成率</div>
          <div class="kpi-value">{{ stat.kpi.pointRate }}<span class="kpi-unit">%</span></div>
          <div class="kpi-desc">未完成：{{ stat.kpi.pointTodoCount }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="kpi-card bg-success">
          <div class="kpi-title">B端待验收/待受理</div>
          <div class="kpi-value">{{ stat.kpi.auditTotal }}<span class="kpi-unit">项</span></div>
          <div class="kpi-desc" style="font-size:12px;">计划:{{ stat.kpi.planTodoCount }} 项目:{{ stat.kpi.projectAuditCount }} 报备:{{ stat.kpi.issueTodoCount }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="kpi-card bg-warning">
          <div class="kpi-title">进行中重点项目</div>
          <div class="kpi-value">{{ stat.kpi.projectActiveCount }}<span class="kpi-unit">个</span></div>
          <div class="kpi-desc text-danger" :style="stat.kpi.projectDelayCount > 0 ? 'color: #ff4d4f;' : ''">延期预警：{{ stat.kpi.projectDelayCount }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="kpi-card bg-danger">
          <div class="kpi-title">今日新增异常报备</div>
          <div class="kpi-value">{{ stat.kpi.issueNewCount }}<span class="kpi-unit">起</span></div>
          <div class="kpi-desc">今日总报备：{{ stat.kpi.issueTotalCount }}</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="main-row">
      <!-- 左侧：待办事项 与 图表 -->
      <el-col :span="16">
        <el-card shadow="hover" class="todo-card">
          <div slot="header" class="card-header">
            <span>我的待办工作台</span>
          </div>
          <el-tabs v-model="activeTodoTab">
            <el-tab-pane :label="`待查阅点位 (${stat.lists.points.length})`" name="points">
              <el-table :data="stat.lists.points" style="width: 100%" size="small">
                <el-table-column label="反馈时间" width="150">
                  <template slot-scope="scope">{{ vk.pubfn.timeFormat(scope.row.submit_time, 'MM-dd hh:mm') }}</template>
                </el-table-column>
                <el-table-column prop="area_name" label="点位区域"></el-table-column>
                <el-table-column prop="point_name" label="点位名称"></el-table-column>
                <el-table-column label="操作" width="120">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="pageTo('/pages/feedback/feedback-list')">去查阅</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-empty v-if="stat.lists.points.length === 0" description="暂无待查阅点位" :image-size="60"></el-empty>
            </el-tab-pane>
            <el-tab-pane :label="`待受理报备 (${stat.lists.issues.length})`" name="issues">
              <el-table :data="stat.lists.issues" style="width: 100%" size="small">
                <el-table-column label="报备时间" width="150">
                  <template slot-scope="scope">{{ vk.pubfn.timeFormat(scope.row.create_time, 'MM-dd hh:mm') }}</template>
                </el-table-column>
                <el-table-column prop="title" label="问题描述"></el-table-column>
                <el-table-column label="操作" width="120">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="pageTo('/pages/report/report-list')">去受理</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-empty v-if="stat.lists.issues.length === 0" description="暂无待受理报备" :image-size="60"></el-empty>
            </el-tab-pane>
            <el-tab-pane :label="`待验收计划 (${stat.lists.plans.length})`" name="plans">
              <el-table :data="stat.lists.plans" style="width: 100%" size="small">
                <el-table-column label="创建时间" width="150">
                  <template slot-scope="scope">{{ vk.pubfn.timeFormat(scope.row.create_time, 'MM-dd hh:mm') }}</template>
                </el-table-column>
                <el-table-column prop="title" label="计划名称"></el-table-column>
                <el-table-column label="操作" width="120">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="pageTo('/pages/plan/plan-list')">去验收</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-empty v-if="stat.lists.plans.length === 0" description="暂无待验收计划" :image-size="60"></el-empty>
            </el-tab-pane>
            <el-tab-pane :label="`待终审项目 (${stat.lists.projects ? stat.lists.projects.length : 0})`" name="projects">
              <el-table :data="stat.lists.projects || []" style="width: 100%" size="small">
                <el-table-column label="截止时间" width="150">
                  <template slot-scope="scope">{{ vk.pubfn.timeFormat(scope.row.deadline, 'MM-dd hh:mm') }}</template>
                </el-table-column>
                <el-table-column prop="title" label="项目名称"></el-table-column>
                <el-table-column label="操作" width="120">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="pageTo('/pages/keywork/project-list')">去审核</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-empty v-if="!stat.lists.projects || stat.lists.projects.length === 0" description="暂无待终审项目" :image-size="60"></el-empty>
            </el-tab-pane>
          </el-tabs>
        </el-card>

        <!-- 数据可视化区域 -->
        <el-row :gutter="20" class="chart-row">
          <el-col :span="12">
            <el-card shadow="hover" class="chart-card">
              <div slot="header"><span>七日反馈趋势</span></div>
              <div class="chart-container" ref="trendChart" style="height: 250px; width: 100%;"></div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover" class="chart-card">
              <div slot="header"><span>报备问题区域分布</span></div>
              <div class="chart-container" ref="pieChart" style="height: 250px; width: 100%;"></div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>

      <!-- 右侧：快捷入口与实时动态 -->
      <el-col :span="8">
        <!-- 快捷入口 -->
        <el-card shadow="hover" class="quick-action-card">
          <div slot="header"><span>快捷操作</span></div>
          <div class="action-grid">
            <div class="action-item" @click="pageTo('/pages/info/info-list')">
              <div class="icon-wrap bg-blue-light"><i class="el-icon-message"></i></div>
              <span>发布资讯</span>
            </div>
            <div class="action-item" @click="pageTo('/pages/plan/plan-list')">
              <div class="icon-wrap bg-green-light"><i class="el-icon-document-add"></i></div>
              <span>下发计划</span>
            </div>
            <div class="action-item" @click="pageTo('/pages/keywork/project-list')">
              <div class="icon-wrap bg-orange-light"><i class="el-icon-folder-add"></i></div>
              <span>立项项目</span>
            </div>
            <div class="action-item" @click="pageTo('/pages/feedback/point-config')">
              <div class="icon-wrap bg-purple-light"><i class="el-icon-setting"></i></div>
              <span>配置点位</span>
            </div>
            <div class="action-item" @click="pageTo('/pages/report/report-list')">
              <div class="icon-wrap" style="background:#fff1f0;color:#f5222d;"><i class="el-icon-warning-outline"></i></div>
              <span>异常报备</span>
            </div>
            <div class="action-item" @click="pageTo('/pages/feedback/cron-config')">
              <div class="icon-wrap" style="background:#e6fffb;color:#13c2c2;"><i class="el-icon-time"></i></div>
              <span>定时任务</span>
            </div>
          </div>
        </el-card>

        <!-- 实时动态 -->
        <el-card shadow="hover" class="timeline-card">
          <div slot="header"><span>实时动态流</span></div>
          <el-timeline v-if="stat.timeline && stat.timeline.length > 0">
            <el-timeline-item
              v-for="(activity, index) in stat.timeline"
              :key="index"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :timestamp="vk.pubfn.timeFormat(activity.timestamp, 'MM-dd hh:mm')">
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
          <el-empty v-else description="暂无动态"></el-empty>
        </el-card>
      </el-col>
    </el-row>
  </view>
</template>

<script>
import * as echarts from 'echarts';

let vk = uni.vk;
export default {
  data() {
    return {
      vk: uni.vk,
      activeTodoTab: 'points',
      stat: {
        kpi: {
          pointRate: 0,
          pointTodoCount: 0,
          auditTotal: 0,
          planTodoCount: 0,
          projectAuditCount: 0,
          issueTodoCount: 0,
          pointAuditCount: 0,
          projectActiveCount: 0,
          projectDelayCount: 0,
          issueNewCount: 0,
          issueTotalCount: 0
        },
        lists: {
          points: [],
          issues: [],
          plans: [],
          projects: []
        },
        timeline: [],
        charts: {
          pie: [],
          trend: { dates: [], total: [], done: [] }
        }
      }
    };
  },
  onLoad(options = {}) {
    vk = this.vk;
    this.init(options);
  },
  methods: {
    async init(options) {
      try {
        let res = await vk.callFunction({
          url: 'admin/dashboard/sys/getStat',
          data: {}
        });
        if (res.code === 0 && res.data) {
          this.stat = res.data;
          this.$nextTick(() => {
            this.initCharts();
          });
        }
      } catch (err) {}
    },
    initCharts() {
      if (this.$refs.trendChart && this.stat.charts) {
        let trendChart = echarts.init(this.$refs.trendChart);
        trendChart.setOption({
          tooltip: { trigger: 'axis' },
          grid: { top: 30, right: 20, bottom: 20, left: 40 },
          legend: { data: ['反馈总数', '已完成'] },
          xAxis: { type: 'category', data: this.stat.charts.trend.dates },
          yAxis: { type: 'value' },
          series: [
            { name: '反馈总数', data: this.stat.charts.trend.total, type: 'line', smooth: true, itemStyle: { color: '#faad14' } },
            { name: '已完成', data: this.stat.charts.trend.done, type: 'line', smooth: true, itemStyle: { color: '#1890ff' } }
          ]
        });
      }
      if (this.$refs.pieChart && this.stat.charts) {
        let pieChart = echarts.init(this.$refs.pieChart);
        pieChart.setOption({
          tooltip: { trigger: 'item' },
          series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: { show: false, position: 'center' },
            labelLine: { show: false },
            data: this.stat.charts.pie
          }]
        });
      }
    },
    pageTo(path) {
      vk.navigateTo(path);
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
}

.kpi-row {
  margin-bottom: 20px;
}

.kpi-card {
  border: none;
  border-radius: 8px;
  color: #fff;
  
  .kpi-title {
    font-size: 14px;
    opacity: 0.9;
    margin-bottom: 10px;
  }
  .kpi-value {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 10px;
    
    .kpi-unit {
      font-size: 14px;
      font-weight: normal;
      margin-left: 5px;
      opacity: 0.8;
    }
  }
  .kpi-desc {
    font-size: 13px;
    opacity: 0.8;
    background: rgba(0, 0, 0, 0.1);
    padding: 4px 8px;
    border-radius: 4px;
    display: inline-block;
  }
  
  &.bg-primary { background: linear-gradient(135deg, #1890ff, #36a3f7); }
  &.bg-success { background: linear-gradient(135deg, #52c41a, #73d13d); }
  &.bg-warning { background: linear-gradient(135deg, #faad14, #ffc53d); }
  &.bg-danger { background: linear-gradient(135deg, #f5222d, #ff4d4f); }
}

.main-row {
  margin-bottom: 20px;
}

.todo-card {
  margin-bottom: 20px;
  border-radius: 8px;
}

.chart-row {
  margin-top: 20px;
}

.chart-card {
  border-radius: 8px;
  
  .chart-placeholder {
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #909399;
    background: #f8f9fa;
    border-radius: 4px;
    
    i {
      font-size: 48px;
      margin-bottom: 10px;
      color: #dcdfe6;
    }
  }
}

.quick-action-card {
  margin-bottom: 20px;
  border-radius: 8px;
  
  .action-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    
    .action-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      
      &:hover {
        background: #e6f7ff;
        transform: translateY(-2px);
      }
      
      .icon-wrap {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;
        
        i {
          font-size: 24px;
        }
      }
      
      span {
        font-size: 13px;
        color: #606266;
      }
    }
  }
}

/* 柔和的图标背景色 */
.bg-blue-light { background: #e6f7ff; color: #1890ff; }
.bg-green-light { background: #f6ffed; color: #52c41a; }
.bg-orange-light { background: #fffbe6; color: #faad14; }
.bg-purple-light { background: #f9f0ff; color: #722ed1; }

.timeline-card {
  border-radius: 8px;
  
  ::v-deep .el-timeline-item__content {
    font-size: 13px;
    color: #606266;
  }
}
</style>
