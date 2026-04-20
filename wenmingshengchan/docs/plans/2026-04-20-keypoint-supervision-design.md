# 重控点位监督管理 设计文档
**日期**: 2026-04-20
**功能分支**: `[feat-keypoint-supervision]`
**方案选择**: 方案B (纯惰性查询 + 凌晨兜底)

## 1. 核心机制
- **任务分发**: 定时任务 `generateFeedbackTasks` 负责每天在配置的时间点，结合 `key-point-cron-config` 与 `key-point-config`，生成打卡快照单据，初始状态为 `status: 0`。
- **状态流转**: 
  - `status: 0` (待反馈)
  - `status: 1` (已反馈)
  - `status: 2` (已逾期)
- **惰性感知更新 (Lazy Status Update)**:
  - C端 (`getTodoList`, `getHistoryList`) 和 B端 (`getFeedbackList`) 在查询时，云函数基于单据属性和当前时间，动态判断是否已过“每班结束后2小时内”的窗口期。如果已过，返回数据时将 `status` 动态伪装/替换为 `2`。
  - 配置独立的兜底定时脚本（如每日凌晨），将数据库中遗留过期且未反馈的 `status: 0` 物理更新为 `status: 2`。
- **并发控制机制 (抢答)**:
  - C端提交反馈时，完全弃用“先查后改”，严格执行无锁抢答：`await vk.baseDao.update({ where: { _id: id, status: 0 }, data: { status: 1, ... } })`。
  - 若影响行数为 0，由拦截器抛出阻断弹窗“该任务已被同组人员完成或已硬逾期”。
- **撤回机制**:
  - 员工提交后，如果发现有问题，在允许的反馈窗口期内允许调用“撤回”。
  - 撤回操作将物理数据状态重置回 `0`，并清空相关图片及内容，重新释放给全组抢答。

## 2. 数据结构设计
1. **`key-point-cron-config`** (班次时间控制): `shift_type`, `trigger_time`
2. **`key-point-config`** (任务配置): `point_id`, `area_id`, `dept_id`, `assignee_ids` (数组), `feedback_standard`, `require_shifts`, `status`
3. **`key-point-feedback`** (事实打卡表): `config_id`, `shift_date`, `shift_type`, `status` (0/1/2), `submit_uid`, `main_image`, `sub_images`, `photo_shoot_time`, `device_model`, `content`

## 3. 边界处理约定
- 不强制校验照片 EXIF 与提交时间的时差，仅做提取并展示，由管理人员现实判断。
- 不引入系统内的复杂请假排班对接，无人打卡即走正常逾期流程。
- 不要求强制水印。
- 不强制配置订阅消息提醒。
- 夜班数据归属日期（`shift_date`）顺延记为次日。
