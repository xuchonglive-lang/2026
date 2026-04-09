'use strict';
module.exports = {
  /**
   * C端获取详情并搭载 60s 防抖录入阅读流水的重型网关
   * @url client/info/kh/getDetailAndRecord
   * @description 满足提案对防伪防刷的机制核定：返回正文给用户，并侦测其此前的查阅脚印防无理刷点击量。
   */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    let { uid } = data; // 直接提取来访者的自然UID
    let res = { code: 0, msg: '' };
    
    let { info_id } = data; 
    if (!info_id) return { code: -1, msg: "传达坐标失明：未能寻查定位该文集" };

    // 核心步骤 1：寻找源信息骨架，将真正的富文本 content 深层内构抛出来
    res.item = await vk.baseDao.findById({
      dbName: "info",
      id: info_id
    });

    if (res.item && res.item.category_id) {
       let catRes = await db.collection("info-category").doc(res.item.category_id).get();
       if (catRes.data && catRes.data.length > 0) {
           res.item.category_info = [catRes.data[0]];
       }
    }
    
    // 如果已被删除了或是并不存在
    if (vk.pubfn.isNull(res.item) || res.item.is_del === 1 || res.item.status === 0) {
      return { code: -1, msg: "很遗憾，该公文因已过时退档或涉限制内容被没收下架，无法审读" };
    }

    // 核心步骤 2：【神圣防刷战线】检查日志水表
    // 规定时限要求：判断在一分钟（60000 毫秒）的超短期轮回中是否曾发生过相同阅览事件
    let minuteAgoTime = Date.now() - 60000; 

    // 使用高并发轻量 count 执行探雷侦查
    let recentReadCount = await vk.baseDao.count({
      dbName: "info-read-log", 
      whereJson: {
        info_id: info_id,     // 同一篇文章
        user_id: uid,         // 同一个人
        // _.gte 即 '>=' ，判定此人的最后打卡是不是仍在这一分钟的高危冷却时段内
        read_time: _.gte(minuteAgoTime) 
      }
    });

    // 核心步骤 3：判定裁决。如果在这一分钟内并没有刷单嫌疑（数量为0）
    if (recentReadCount === 0) {
       // 执行 A 分支：我们认为这是一次清白的初来或再度访问事件，记录这踏步足迹。
       await vk.baseDao.add({
         dbName: "info-read-log",
         dataJson: {
           info_id: info_id,
           user_id: uid,
           read_time: Date.now()  // 压下现在的确切时间戳作为档案凭记
         }
       });

       // 执行 B 分支：因这足迹是有效的，必须真实给其主体源文章的热度榜加上一把火！
       // 请注意这里务必使用 `_.inc(1)` 的高级语法，保证高并发时自增1呈现绝对原子互斥性。千万不用去读取后再 +1 覆盖！
       await vk.baseDao.updateById({
         dbName: "info",
         id: info_id,
         dataJson: {
           view_count: _.inc(1) 
         }
       });
       
       // 为了让此人前端界面数字当场随动显眼变更，给 item 返回层临时加 1 
       res.item.view_count += 1;
    }

    // 将承载全貌正文及动态最新阅读量的对象发射走 
    return res;
  }
}
