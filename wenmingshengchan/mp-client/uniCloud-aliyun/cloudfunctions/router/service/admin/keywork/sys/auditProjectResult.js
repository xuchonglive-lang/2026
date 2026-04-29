module.exports = {
  /**
   * B端审核验收项目结果
   * @url admin/keywork/sys/auditProjectResult
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let uid = userInfo._id || userInfo.uid || event.uid;

    let { project_id, _id, is_pass, audit_remark, attachment_imgs = [] } = data;
    let target_id = project_id || _id;

    if (vk.pubfn.isNull(target_id)) return { code: -1, msg: "项目ID为空" };

    // 原子操作：确保只审核"待验收"(1)的项目防并发篡改
    if (is_pass) {
      // 验收通过 -> 状态切至 2
      let updateRes = await vk.baseDao.update({
        dbName: "key-project",
        whereJson: { _id: target_id, status: 1 },
        dataJson: { status: 2, audit_remark: audit_remark || "验收通过" }
      });
      if (updateRes <= 0) return { code: -1, msg: "操作失败，可能项目状态已被抢先处理" };
      
      // 验收通过也插入一条节点（保持双端行为一致）
      await vk.baseDao.add({
        dbName: "key-project-process",
        dataJson: {
          project_id: target_id,
          type: 4,
          desc_content: audit_remark || "验收通过，项目已顺利结案归档",
          attachment_imgs: attachment_imgs,
          operate_uid: uid,
          create_time: new Date().getTime()
        }
      });
      return { code: 0, msg: "验收成功，项目已归档结案" };
      
    } else {
      // 验收驳回 -> 状态切至 3
      let updateRes = await vk.baseDao.update({
        dbName: "key-project",
        whereJson: { _id: target_id, status: 1 },
        dataJson: { status: 3, audit_remark: audit_remark || "验收不达标被驳回" }
      });
      if (updateRes <= 0) return { code: -1, msg: "操作失败，可能项目状态已被抢先处理" };
      
      // 驳回时，补偿插入一个 Type=3 的过程节点
      await vk.baseDao.add({
        dbName: "key-project-process",
        dataJson: {
          project_id: target_id,
          type: 3,
          desc_content: audit_remark || "被后台管理员驳回退修",
          attachment_imgs: attachment_imgs,
          operate_uid: uid,
          create_time: new Date().getTime()
        }
      });
      
      return { code: 0, msg: "已下发驳回指令并重置为进行中" };
    }
  }
};
