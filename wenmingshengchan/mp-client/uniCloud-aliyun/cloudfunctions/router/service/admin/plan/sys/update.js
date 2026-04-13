'use strict';
module.exports = {
  /**
   * 修改/重整日计划单据核心数据 (B端后台管理员专用)
   * @url admin/plan/sys/update
   * @description 管理后台表单发起的实体数据篡改，支持各种预设状态下的容错转换与内容补齐。
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk } = util;

    // 克隆传递的表单数据源为局部变量
    let dataJson = { ...data };
    
    // 中间件处理：如果前端发送了修改的截止时限且为本地格式字符串，予以抹平转换
    if (dataJson.deadline_time && typeof dataJson.deadline_time === 'string') {
      dataJson.deadline_time = new Date(dataJson.deadline_time).getTime();
    }
    // 获取分配人员的信息，继承其部门
    if (dataJson.assignee_ids && dataJson.assignee_ids.length > 0) {
      let main_assignee_id = Array.isArray(dataJson.assignee_ids) ? dataJson.assignee_ids[0] : dataJson.assignee_ids;
      let userRes = await vk.baseDao.findById({
        dbName: "uni-id-users",
        id: main_assignee_id
      });
      if (userRes && userRes.department_id) {
        dataJson.dept_id = userRes.department_id;
      }
    }

    // 调用基础库，根据 _id 覆盖保存其值
    let num = await vk.baseDao.updateById({
      dbName: "daily-plan",
      id: dataJson._id,
      dataJson: dataJson
    });

    return { code: 0, msg: "修改成功", num };
  }
}
