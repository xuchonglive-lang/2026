module.exports = {
  /**
   * 添加进展汇报 (阶段性记录)
   * @url client/keywork/kh/addProcessRecord
   * @description 在项目为进行中或驳回后进行中状态时，新增 Type=1 的过程记录
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let { uid } = userInfo;
    
    let { project_id, desc_content, attachment_imgs } = data;
    
    if (vk.pubfn.isNull(project_id)) return { code: -1, msg: "项目ID不能为空" };
    if (vk.pubfn.isNull(desc_content)) return { code: -1, msg: "汇报内容不能为空" };

    // 校验项目状态，只有 0 或 3 才能汇报
    let projectInfo = await vk.baseDao.findById({
      dbName: "key-project",
      id: project_id
    });
    if (!projectInfo) return { code: -1, msg: "项目不存在" };
    if (![0, 3].includes(projectInfo.status)) {
      return { code: -1, msg: "当前项目状态不可进行过程汇报" };
    }

    // 插入记录 (Type: 1)
    let res = await vk.baseDao.add({
      dbName: "key-project-process",
      dataJson: {
        project_id,
        type: 1, // 正常过渡汇报
        desc_content,
        attachment_imgs: attachment_imgs || [],
        operate_uid: uid,
        create_time: new Date().getTime()
      }
    });

    return res;
  }
};
