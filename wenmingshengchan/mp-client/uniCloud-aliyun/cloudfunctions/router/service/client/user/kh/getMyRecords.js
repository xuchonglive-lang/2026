'use strict';
module.exports = {
  /**
   * 获取我的各类操作记录
   * @url client/user/kh/getMyRecords
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let uid = userInfo._id;
    let { type, pageIndex = 1, pageSize = 10 } = data;

    let res = { code: 0, msg: '', rows: [], total: 0 };

    const formatId = (id) => {
      if (typeof id === 'string' && id.length === 24 && /^[0-9a-fA-F]+$/.test(id)) {
        try { return db.command.ObjectId(id); } catch (e) { return id; }
      }
      return id;
    };

    if (type === 'point') {
      // 现场反馈信息 (key-point-feedback)
      res = await vk.baseDao.selects({
        dbName: "key-point-feedback",
        pageIndex,
        pageSize,
        whereJson: {
          submit_uid: uid,
          status: 1,
          is_del: _.neq(1)
        },
        sortArr: [{ name: "submit_time", type: "desc" }]
      });

      if (res.rows && res.rows.length > 0) {
        let pointIds = [...new Set(res.rows.map(item => item.point_id).filter(id => id))];
        let pointsRes = await vk.baseDao.select({
          dbName: "base-point",
          whereJson: { _id: _.in([...pointIds, ...pointIds.map(id => formatId(id))]) },
          pageSize: 500
        });
        let pointMap = {};
        (pointsRes.rows || []).forEach(p => { pointMap[p._id.toString()] = p; });
        res.rows.forEach(item => {
          let pIdStr = item.point_id ? item.point_id.toString() : "";
          item.point_info = pointMap[pIdStr] ? [pointMap[pIdStr]] : [];
        });
      }
    } else if (type === 'project') {
      // 重点项目过程记录 (key-project-process)
      res = await vk.baseDao.selects({
        dbName: "key-project-process",
        pageIndex,
        pageSize,
        whereJson: {
          operate_uid: uid,
          type: 1,
          is_del: _.neq(1)
        },
        sortArr: [{ name: "create_time", type: "desc" }]
      });
      
      if (res.rows && res.rows.length > 0) {
        let projectIds = [...new Set(res.rows.map(item => item.project_id).filter(id => id))];
        let projectsRes = await vk.baseDao.select({
          dbName: "key-project",
          whereJson: { _id: _.in([...projectIds, ...projectIds.map(id => formatId(id))]) },
          pageSize: 500
        });
        
        let projectMap = {};
        (projectsRes.rows || []).forEach(p => { projectMap[p._id.toString()] = p; });
        
        res.rows.forEach(item => {
          let pIdStr = item.project_id ? item.project_id.toString() : "";
          item.project_info = projectMap[pIdStr] ? [projectMap[pIdStr]] : [];
          if (item.attachment_imgs && !item.images) {
            item.images = item.attachment_imgs.map(img => (typeof img === 'object' ? img.url : img));
          }
        });
      }
    } else if (type === 'plan') {
      // 日计划执行历史
      let result = await vk.baseDao.selects({
        dbName: "daily-plan",
        pageIndex,
        pageSize,
        whereJson: { 
          feedbacks: _.elemMatch({ uid: uid, type: 'submit' }), 
          is_del: _.neq(1) 
        },
        sortArr: [{ name: "update_time", type: "desc" }, { name: "_add_time", type: "desc" }]
      });
      
      let allFeedbacks = [];
      result.rows.forEach(plan => {
        let myFeedbacks = (plan.feedbacks || []).filter(f => f.uid === uid && f.type === 'submit');
        myFeedbacks.forEach(fb => {
          allFeedbacks.push({
            ...fb,
            _id: plan._id, // 用于定位主单据
            plan_title: plan.title,
            plan_info: plan,
            create_time: fb.time
          });
        });
      });
      
      // 重新排序，确保所有计划的所有反馈都是倒序排列
      allFeedbacks.sort((a, b) => b.create_time - a.create_time);
      
      res = {
        code: 0,
        rows: allFeedbacks,
        total: allFeedbacks.length // 注意：这会导致分页总数在逻辑上与数据库不一致，但在C端历史展示中更为直观
      };
    } else if (type === 'issue') {
      // 问题报备记录 (problem-report)
      res = await vk.baseDao.selects({
        dbName: "problem-report",
        pageIndex,
        pageSize,
        whereJson: { create_uid: uid, is_del: _.neq(1) },
        sortArr: [{ name: "create_time", type: "desc" }]
      });

      if (res.rows && res.rows.length > 0) {
        let areaIds = [...new Set(res.rows.map(item => item.area_id).filter(id => id))];
        let pointIds = [...new Set(res.rows.map(item => item.point_id).filter(id => id))];
        
        let [areasRes, pointsRes] = await Promise.all([
          vk.baseDao.select({
            dbName: "base-area",
            whereJson: { _id: _.in([...areaIds, ...areaIds.map(id => formatId(id))]) },
            pageSize: 500
          }),
          vk.baseDao.select({
            dbName: "base-point",
            whereJson: { _id: _.in([...pointIds, ...pointIds.map(id => formatId(id))]) },
            pageSize: 500
          })
        ]);

        let areaMap = {};
        (areasRes.rows || []).forEach(a => { areaMap[a._id.toString()] = a; });
        let pointMap = {};
        (pointsRes.rows || []).forEach(p => { pointMap[p._id.toString()] = p; });

        res.rows.forEach(item => {
          let aIdStr = item.area_id ? item.area_id.toString() : "";
          let pIdStr = item.point_id ? item.point_id.toString() : "";
          item.area_info = areaMap[aIdStr] ? [areaMap[aIdStr]] : [];
          item.point_info = pointMap[pIdStr] ? [pointMap[pIdStr]] : [];
        });
      }
    }

    return res;
  }
};
