'use strict';
module.exports = {
  /**
   * 管理我的操作记录（修改/软删除）
   * @url client/user/kh/manageMyRecord
   */
  main: async (event) => {
    let { data = {}, userInfo, util } = event;
    let { vk, db, _ } = util;
    let uid = userInfo._id;
    let { action, type, id, updateData, data: oldData, timeKey } = data;
    if (!updateData && oldData) updateData = oldData;

    if (!id || !type || !action) return { code: -1, msg: '参数缺失' };

    let dbName = "";
    if (type === 'point') dbName = "key-point-feedback";
    else if (type === 'project') dbName = "key-project-process";
    else if (type === 'plan') dbName = "daily-plan";
    else if (type === 'issue') dbName = "problem-report";

    // 1. 获取原记录并校验权限及时间
    let record = await vk.baseDao.findById({ dbName, id });
    if (!record) return { code: -1, msg: '记录不存在' };

    // 权限校验与创建时间提取
    let createTime = 0;
    if (type === 'point') {
      if (record.submit_uid !== uid) return { code: -1, msg: '无权操作他人记录' };
      createTime = record.submit_time;
    } else if (type === 'project') {
      if (record.operate_uid !== uid) return { code: -1, msg: '无权操作他人记录' };
      createTime = record.create_time;
    } else if (type === 'issue') {
      if (record.create_uid !== uid) return { code: -1, msg: '无权操作他人记录' };
      createTime = record.create_time;
    } else if (type === 'plan') {
      // 日计划特殊处理，因为它是一个数组
      // 我们需要根据 timeKey (即反馈的时间戳) 来定位数组中的元素
      if (!timeKey) return { code: -1, msg: '计划反馈需提供定位时间戳' };
      let feedbackItem = (record.feedbacks || []).find(f => f.uid === uid && f.time === timeKey);
      if (!feedbackItem) return { code: -1, msg: '未找到对应的反馈记录' };
      createTime = feedbackItem.time;
    }

    // 2. 24小时校验 (1天 = 86400000ms)
    let now = Date.now();
    if (now - createTime > 24 * 60 * 60 * 1000) {
      return { code: -1, msg: '操作失败：记录已超过24小时，不可修改或删除。' };
    }

    // 3. 执行动作
    if (action === 'delete') {
      if (type === 'point') {
        // 现场反馈删除：回滚到待反馈状态
        await vk.baseDao.updateById({
          dbName,
          id,
          dataJson: {
            status: 0,
            submit_uid: null,
            submit_time: null,
            images: [],
            content: ""
          }
        });
      } else if (type === 'project' || type === 'issue') {
        // 软删除
        await vk.baseDao.updateById({
          dbName,
          id,
          dataJson: { is_del: 1 }
        });
      } else if (type === 'plan') {
        // 从 feedbacks 数组中拉出
        await vk.baseDao.update({
          dbName,
          whereJson: { _id: id },
          dataJson: {
            feedbacks: _.pull({
              time: timeKey,
              uid: uid
            })
          }
        });
        // 如果拉出后没有其他反馈了，可以考虑把 status 改回 0 (可选，根据业务逻辑)
      }
      return { code: 0, msg: '删除成功' };
    } else if (action === 'update' || action === 'edit') {
      if (type === 'point') {
        await vk.baseDao.updateById({
          dbName,
          id,
          dataJson: {
            images: updateData.images,
            content: updateData.content,
            update_time: now
          }
        });
      } else if (type === 'project') {
        await vk.baseDao.updateById({
          dbName,
          id,
          dataJson: {
            desc_content: updateData.desc_content,
            attachment_imgs: updateData.attachment_imgs,
            update_time: now
          }
        });
      } else if (type === 'issue') {
        await vk.baseDao.updateById({
          dbName,
          id,
          dataJson: {
            ...updateData,
            update_time: now
          }
        });
      } else if (type === 'plan') {
        // 更新数组中的特定项
        // 注意：uniapp db.command.update 不直接支持更新数组特定索引的值，通常需要先查出整个数组修改后再存回，或者使用聚合。
        // 这里采用：先查出整个 feedbacks 数组，修改后保存。
        let newFeedbacks = record.feedbacks.map(f => {
          if (f.uid === uid && f.time === timeKey) {
            return {
              ...f,
              content: updateData.content,
              images: updateData.images,
              update_time: now
            };
          }
          return f;
        });
        await vk.baseDao.updateById({
          dbName,
          id,
          dataJson: { feedbacks: newFeedbacks, update_time: now }
        });
      }
      return { code: 0, msg: '更新成功' };
    }

    return { code: -1, msg: '未知的操作指令' };
  }
};
