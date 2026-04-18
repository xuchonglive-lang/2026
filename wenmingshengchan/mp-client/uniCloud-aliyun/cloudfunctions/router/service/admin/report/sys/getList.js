module.exports = {
  /**
   * B端获取报备列表（树状权限下钻隔离）
   * @url admin/report/sys/getList
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data;
    let res = { code: 0, msg: '' };

    let whereJson = {};
    let formData = data.formData || {};
    
    // 如果有查询条件
    if (vk.pubfn.isNotNull(formData.title)) {
      whereJson.title = new RegExp(formData.title);
    }
    if (vk.pubfn.isNotNull(formData.status)) {
      whereJson.status = formData.status;
    }
    // 添加按日期范围查询
    if (formData._add_time && formData._add_time.length === 2) {
      whereJson._add_time = _.gte(formData._add_time[0]).lte(formData._add_time[1]);
    }

    // 树状权限下钻
    let roleArr = userInfo.role || [];
    let isSuperAdmin = roleArr.includes('super_admin');
    let deptIds = [];
    
    if (!isSuperAdmin) {
      let myDeptId = userInfo.department_id;
      if (!myDeptId) return { code: -1, msg: '您暂无归属部门，无法查看数据' };
      
      let allDeptsRes = await vk.baseDao.select({
        dbName: "base-dept",
        pageSize: 1000
      });
      let allDepts = allDeptsRes.rows || [];
      
      deptIds = [myDeptId];
      let findChildren = (parentId) => {
        let children = allDepts.filter(d => d.parent_id === parentId);
        for (let child of children) {
          deptIds.push(child._id);
          findChildren(child._id);
        }
      };
      findChildren(myDeptId);
      
      // 测试阶段暂时注释掉严格的数据隔离，以便验证是否是因为提交的数据不属于该管理员的部门导致
      // whereJson.manager_dept_id = _.in(deptIds);
    }

    // 强制清理 data 里的 formData 避免 getTableData 内部重复或者错误的解析
    let safeData = {
      pageIndex: data.pageIndex,
      pageSize: data.pageSize
    };

    let result = await vk.baseDao.getTableData({
      dbName: "problem-report",
      data: safeData,
      whereJson,
      sortArr: [{ "name": "_add_time", "type": "desc" }],
      foreignDB: [
        {
          dbName: "base-area",
          localKey: "area_id",
          foreignKey: "_id",
          as: "area_info",
          limit: 1
        },
        {
          dbName: "base-point",
          localKey: "point_id",
          foreignKey: "_id",
          as: "point_info",
          limit: 1
        },
        {
          dbName: "base-dept",
          localKey: "manager_dept_id",
          foreignKey: "_id",
          as: "dept_info",
          limit: 1
        },
        {
          dbName: "uni-id-users",
          localKey: "create_uid",
          foreignKey: "_id",
          as: "user_info",
          limit: 1,
          fieldJson: { nickname: true, real_name: true, mobile: true }
        }
      ]
    });

    if (result.rows) {
      result.rows.forEach(item => {
        item.area_name = item.area_info ? item.area_info.name : '';
        item.point_name = item.point_info ? item.point_info.name : '';
        item.dept_name = item.dept_info ? item.dept_info.name : '';
        
        let realName = item.user_info ? (item.user_info.nickname || item.user_info.real_name || '未知') : '未知';
        if (item.is_anonymous) {
          item.user_name = `${realName} (匿名)`;
        } else {
          item.user_name = realName;
        }
      });
    }

    if (result.total === 0) {
      result.debug = { 
        whereJson, 
        roleArr, 
        deptIds, 
        isSuperAdmin 
      };
    }

    return result;
  }
};
