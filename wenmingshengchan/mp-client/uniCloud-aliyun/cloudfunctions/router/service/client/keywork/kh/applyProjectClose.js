module.exports = {
  /**
   * 申请验收闭卷
   * @url client/keywork/kh/applyProjectClose
   * @description 将状态切换为待验收(1)并插入 Type=2 记录。采取原子性锁定机制防止连击或并发越权。
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let { uid } = userInfo;
    
    let { project_id, desc_content, attachment_imgs } = data;
    
    if (vk.pubfn.isNull(project_id)) return { code: -1, msg: "项目ID不能为空" };

    // 原子性更新：只有处于 0 或 3 的项目才能被切到 1
    // 利用 whereJson 的状态校验拦截掉并发请求（比如两人同时点交卷）
    let updateRes = await vk.baseDao.update({
      dbName: "key-project",
      whereJson: {
        _id: project_id,
        status: _.in([0, 3])
      },
      dataJson: {
        status: 1
      }
    });

    // 如果影响行数为 0，说明被他人抢先或者状态不对
    if (updateRes <= 0) {
      return { code: -1, msg: "申请失败，该项目可能已被发起验收或状态异常" };
    }

    // 插入闭卷申请记录 (Type: 2)
    await vk.baseDao.add({
      dbName: "key-project-process",
      dataJson: {
        project_id,
        type: 2, // 申请闭卷
        desc_content: desc_content || "发起结项申请",
        attachment_imgs: attachment_imgs || [],
        operate_uid: uid,
        create_time: new Date().getTime()
      }
    });

    return { code: 0, msg: "验收申请已成功提交" };
  }
};
