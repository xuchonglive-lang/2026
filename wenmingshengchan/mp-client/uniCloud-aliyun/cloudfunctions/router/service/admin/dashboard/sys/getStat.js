module.exports = {
  /**
   * 获取后台首页统计数据
   * @url admin/dashboard/sys/getStat 前端调用的url参数地址
   * @description 首页看板数据汇总
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: 'ok' };

    try {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0,0,0,0)).getTime();
      const endOfDay = new Date(today.setHours(23,59,59,999)).getTime();
      const dateStr = vk.pubfn.timeFormat(new Date(), "yyyy-MM-dd");

      // 1. 获取重控点位今日完成率 (status: 0待反馈, 1已反馈, 2已逾期)
      let pointTotal = await vk.baseDao.count({
        dbName: "key-point-feedback",
        whereJson: { shift_date: dateStr }
      });
      let pointDone = await vk.baseDao.count({
        dbName: "key-point-feedback",
        whereJson: { shift_date: dateStr, status: 1 }
      });
      let pointRate = pointTotal > 0 ? ((pointDone / pointTotal) * 100).toFixed(1) : 0;

      // 2. 获取B端待处理项数量
      // 日计划待验收 (status: 1已提交, 5超时未验收)
      let planAuditCount = await vk.baseDao.count({
        dbName: "daily-plan",
        whereJson: { status: _.in([1, 5]) }
      });
      // 重点项目待验收 (status: 1)
      let projectAuditCount = await vk.baseDao.count({
        dbName: "key-project",
        whereJson: { status: 1 }
      });
      // 问题报备待受理 (status: 0)
      let issueTodoCount = await vk.baseDao.count({
        dbName: "problem-report",
        whereJson: { status: 0 }
      });
      // 点位反馈已完成（用于B端抽查，这里视作待查阅）
      let pointAuditCount = await vk.baseDao.count({
        dbName: "key-point-feedback",
        whereJson: { shift_date: dateStr, status: 1 }
      });

      // 3. 进行中重点项目 (status: 0进行中, 3驳回后进行中)
      let projectActiveCount = await vk.baseDao.count({
        dbName: "key-project",
        whereJson: { status: _.in([0, 3]) }
      });
      let projectDelayCount = await vk.baseDao.count({
        dbName: "key-project",
        whereJson: { status: _.in([0, 3]), deadline_time: _.lt(Date.now()) }
      });

      // 4. 今日新增异常报备
      let issueNewCount = issueTodoCount; 
      let issueTotalCount = await vk.baseDao.count({
        dbName: "problem-report",
        whereJson: { create_time: _.gte(startOfDay).and(_.lte(endOfDay)) }
      });

      // --- 待办工作台列表数据 ---
      let pointAuditList = await vk.baseDao.selects({
        dbName: "key-point-feedback",
        whereJson: { status: 1 },
        pageIndex: 1, pageSize: 5,
        sortArr: [{ name: "submit_time", type: "desc" }]
      });
      let issueAuditList = await vk.baseDao.selects({
        dbName: "problem-report",
        whereJson: { status: 0 },
        pageIndex: 1, pageSize: 5,
        sortArr: [{ name: "create_time", type: "desc" }]
      });
      let planAuditList = await vk.baseDao.selects({
        dbName: "daily-plan",
        whereJson: { status: _.in([1, 5]) },
        pageIndex: 1, pageSize: 5,
        sortArr: [{ name: "create_time", type: "desc" }]
      });
      let projectAuditList = await vk.baseDao.selects({
        dbName: "key-project",
        whereJson: { status: 1 },
        pageIndex: 1, pageSize: 5,
        sortArr: [{ name: "deadline", type: "asc" }]
      });

      // --- 动态时间轴数据 (混合多源) ---
      let timeline = [];
      // 最新报备
      let recentIssues = await vk.baseDao.selects({
        dbName: "problem-report", pageIndex: 1, pageSize: 3,
        sortArr: [{ name: "create_time", type: "desc" }]
      });
      recentIssues.rows.forEach(item => timeline.push({
        content: `新异常报备: ${item.title || '无标题'}`,
        timestamp: item.create_time, type: 'danger', color: '#f56c6c'
      }));
      // 最新日计划
      let recentPlans = await vk.baseDao.selects({
        dbName: "daily-plan", whereJson: { status: _.in([1, 2]) },
        pageIndex: 1, pageSize: 3, sortArr: [{ name: "create_time", type: "desc" }] // Use create_time or deadline_time for lack of update_time
      });
      recentPlans.rows.forEach(item => timeline.push({
        content: `日计划[${item.title}]有了新进展`,
        timestamp: item.create_time, type: 'success', color: '#67c23a'
      }));
      // 最新重点项目
      let recentProjects = await vk.baseDao.selects({
        dbName: "key-project", whereJson: { status: _.in([1, 2]) },
        pageIndex: 1, pageSize: 3, sortArr: [{ name: "deadline", type: "desc" }]
      });
      recentProjects.rows.forEach(item => timeline.push({
        content: `重点项目[${item.title}]状态更新`,
        timestamp: item.deadline, type: 'warning', color: '#e6a23c'
      }));
      timeline.sort((a,b) => b.timestamp - a.timestamp);
      timeline = timeline.slice(0, 8); // 取前8条

      // --- 图表数据聚合 ---
      const $ = db.command.aggregate;
      
      // 饼图：报备问题按区域分组统计
      let pieDataRes = await db.collection("problem-report").aggregate()
        .group({ _id: '$area_id', count: $.sum(1) })
        .end();
      let pieData = pieDataRes.data.map(item => ({ name: item._id || '未知区域', value: item.count }));
      // 实际需要 area_name，可通过 foreignDB 或先去 base-area 查出名称。这里简化返回。
      
      // 折线图：近7天点位反馈趋势
      let sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
      let trendDataRes = await db.collection("key-point-feedback").aggregate()
        .match({ shift_date: _.gte(vk.pubfn.timeFormat(sevenDaysAgo, "yyyy-MM-dd")) })
        .group({ 
          _id: '$shift_date', 
          total: $.sum(1), 
          done: $.sum($.cond({ if: $.eq(['$status', 1]), then: 1, else: 0 })) 
        })
        .sort({ _id: 1 })
        .end();
      
      // 填充近7天日期
      let dates = [];
      let trendTotal = [];
      let trendDone = [];
      for(let i=6; i>=0; i--) {
        let d = new Date();
        d.setDate(d.getDate() - i);
        let dStr = vk.pubfn.timeFormat(d, "yyyy-MM-dd");
        let shortDStr = vk.pubfn.timeFormat(d, "MM-dd");
        dates.push(shortDStr);
        let match = trendDataRes.data.find(x => x._id === dStr);
        trendTotal.push(match ? match.total : 0);
        trendDone.push(match ? match.done : 0);
      }

      res.data = {
        kpi: {
          pointRate, pointTodoCount: pointTotal - pointDone,
          auditTotal: planAuditCount + projectAuditCount + issueTodoCount,
          planTodoCount: planAuditCount, projectAuditCount, issueTodoCount, pointAuditCount,
          projectActiveCount, projectDelayCount,
          issueNewCount, issueTotalCount
        },
        lists: {
          points: pointAuditList.rows,
          issues: issueAuditList.rows,
          plans: planAuditList.rows,
          projects: projectAuditList.rows
        },
        timeline: timeline,
        charts: {
          pie: pieData.length ? pieData : [{name: '暂无数据', value: 0}],
          trend: { dates, total: trendTotal, done: trendDone }
        }
      };

    } catch (err) {
      return { code: -1, msg: err.message };
    }

    return res;
  }
};
