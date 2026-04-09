'use strict';
module.exports = {
  /**
   * 篡改更新文章表象信息机制
   * @url admin/info/detail/sys/update
   * @description 一套兼容并包、仅修改投喂过来差异项的高度弹性的更新服务站。
   */
  main: async (event) => {
    // 将整个事件模型中的载荷与底层执行引擎结构剥离提取
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;

    // 对获取到的变更意图各种散乱值进行拆分装箱挑拣
    let { _id, category_id, title, cover_img, content, is_top, publish_time } = data;
    
    // 无靶之盲射，系统坚决拦停报错
    if (!_id) return { code: -1, msg: "由于未指定待翻新的文章ID定位坐标，禁止修改请求" };

    // 创建局部手术刀涂改清单包：我们这是一种温和的动态重写，
    // 不用把原本不打算变动的原信息无脑抹掉或者置空，前端丢什么过来我们才打什么布丁上。
    let updateData = {};
    if (category_id !== undefined) updateData.category_id = category_id;  // 换归属坑位
    if (title !== undefined) updateData.title = title;                    // 改动对外炫首
    if (cover_img !== undefined) updateData.cover_img = cover_img;        // 刷新封面抓取展示图
    if (data.summary !== undefined) updateData.summary = data.summary;   // 传入自带摘要则采纳
    
    // content 可能包含数万字符容量非常庞大！仅在此次发难变更内容本身时才对其重构，能极速降低内存交换冗余损耗
    if (content !== undefined) {
       updateData.content = content;              
       // 更换正文时若未提供新 summary，自动从新正文中强行摘录前 60 字刷新摘要
       if (!data.summary) {
          let plainText = content.replace(/<[^>]+>/g, '').replace(/&[a-zA-Z]+;/ig, '').replace(/&#\d+;/g, '').trim();
          updateData.summary = plainText.substring(0, 60) + (plainText.length > 60 ? '...' : '');
       }
    }
    
    if (is_top !== undefined) updateData.is_top = is_top;                  // 修改拔高位
    if (publish_time !== undefined) updateData.publish_time = publish_time;// 伪装改变历史签发时空点位

    let res = { code: 0, msg: "本次重修改造已经精雕细琢施术完成" };
    
    // 通知底层数据库运用 updateById 定向制导单一特定文档修改操作，极大地提高了寻觅执行效率
    res.num = await vk.baseDao.updateById({
      dbName: "info",      // 定向至内容海洋区
      id: _id,             // 抛出门牌标致
      dataJson: updateData // 挂上需升级覆盖挂件组件包
    });

    return res;
  }
}
