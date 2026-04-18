# 重点项目管理 - 任务追踪 (Task List)

| 状态 | 任务名称 | 描述 |
| --- | --- | --- |
| [x] | Task 1: 数据库底层建设 | 创建 `key-project` 和 `key-project-process` Schema。 |
| [x] | Task 2.1: 云端 C端 接口 | 实现 `getProjectList`, `addProcessRecord`, `applyProjectClose`。 |
| [x] | Task 2.2: 云端 B端 接口 | 实现 `createProject`, `auditProjectResult`, `getAdminProjectList`，并实施树状权限下推和防并发死锁。 |
| [x] | Task 3: 客户端视图层 | 开发 `list.vue`, `process-feed.vue`, `apply-finish.vue` 及时间轴渲染、逾期计算，并无缝注入了获取详情的前端API支撑。 |
| [x] | Task 4: B端后台界面 | 开发 `project-list.vue` 万能表单、动态标红警示及附带批注栏的验收结案集成面板。 |
