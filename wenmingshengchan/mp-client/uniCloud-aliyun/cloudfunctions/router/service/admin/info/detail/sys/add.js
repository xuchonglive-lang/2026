'use strict';
module.exports = {
  /**
   * 缔造信息文章详情下行接口
   * @url admin/info/detail/sys/add
   * @description 管理端承接通过 Tinymce 发布传来的庞大而错综复杂的富文本语料库，对其中必要的数据实施脱敏验证并做默认装配处理后灌注底库。
   */
  main: async (event) => {
    // 拉取提取工作流外置资源变量及触发者投送载荷
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    // 分拣 vk.baseDao 这一云引擎核心套件的各种子服务把手
    let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
    
    // 对前端庞大报文做出精准制导析脱
    // category_id 为该文名义父级；title 为吸睛标头；content 是巨量级 html 富文段；
    // is_top 为提级权限棒；status 关涉到立即公开与否；publish_time 为刻度锚。
    let { category_id, title, cover_img, content, is_top, status, publish_time } = data;
    
    // 发文的铁血校验：无头、无身、无祖宗的畸形数据决不可通行
    if (!title || !content || !category_id) {
      return { code: -1, msg: "由于该信件残缺了必填的关键文章元数据成分，拒绝签收录入" };
    }

    // 提取和生成 summary 字段
    let finalSummary = data.summary || "";
    if (!finalSummary && content) {
      // 暴力剥离掉富文本包含的全部 HTML 标签结构与多余实体空格转换组合（如 &nbsp; / &quot; / &#39;）
      let plainText = content.replace(/<[^>]+>/g, '').replace(/&[a-zA-Z]+;/ig, '').replace(/&#\d+;/g, '').trim();
      finalSummary = plainText.substring(0, 60) + (plainText.length > 60 ? '...' : '');
    }

    // 为安全而生的重组净化数据桶！不要直接将接收对象倾倒给底层驱动。务必手动赋值洗白来抹除恶意属性。
    let insertData = {
      category_id,                           // 外键直接接管
      title,                                 // 照单接收标题文本
      cover_img,                             // 接收外链大图或留空
      summary: finalSummary,                 // 加入全自动截取的精简摘要字符串
      content,                               // 全量加载巨量信息字符串码流
      view_count: 0,                         // 【架构定调】新发出的文章默认访问度是白板0阅
      is_top: is_top || false,               // 如果没勾置顶，自然就是做普通的流媒体推送
      status: status !== undefined ? status : 1, // 如果不在意掩藏，预设发出去即可见（启用状态）
      publish_time: publish_time || Date.now(), // 默认发布基准刻在此时此刻当前时钟之上
      is_del: 0                              // 刚诞生的实体生龙活虎，不能带有死亡软删刺青
    };

    let res = { code: 0, msg: '伟大的宏愿：一纸公文宣天下！文章已顺滑入库！' };
    
    // 将拼凑并安检后的合规长文交由库管体系执行新增事务
    res.id = await vk.baseDao.add({ 
      dbName: "info",      // 定位向最大体积的文章巨表
      dataJson: insertData // 输入净空数据源
    });
    
    return res;
  }
}
