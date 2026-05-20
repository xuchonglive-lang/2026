# 反馈任务逾期清算与数据获取顺序重构实施计划

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** 优化待办重控任务的逾期清算逻辑顺序，将 getTodoList.js 调整为“先判断并同步更新数据库，再获取最新的数据列表”，彻底解决数量和状态不一致的 Bug，同时优化 getTodoCount.js 的查询性能。

**Architecture:** 
1. 优化 `getTodoCount.js` 中拉取任务判定过期的数据库查询，加字段过滤以提升性能。
2. 重构 `getTodoList.js` 的执行流程，前置提取待判定任务并用 `await` 同步修改过期状态，后置执行复杂多表联查以过滤过期数据。

**Tech Stack:** uniCloud-aliyun 云函数, VK-uniCloud 框架 baseDao API

---

### Task 1: 优化 getTodoCount.js 轻量字段过滤

**Files:**
- Modify: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/feedback/kh/getTodoCount.js:24-33`

**Step 1: 修改 pendingTasks 的 selects 查询参数**

在 `getTodoCount.js` 中，添加 `fieldJson` 限制查询返回的字段：

```diff
 		// 2. 惰性逾期清算：获取当前用户所有未处理任务，检查是否已过物理截止时间
 		let pendingTasks = await vk.baseDao.selects({
 			dbName: "key-point-feedback",
+			fieldJson: { _id: 1, shift_type: 1, shift_date: 1, _add_time: 1 },
 			whereJson: {
 				assignee_ids: uid,
 				status: 0,
 				is_del: _.neq(1)
 			}
 		});
```

**Step 2: 静态代码检查**

运行 Node 语法检查以确保没有拼写错误或括号不匹配：
```bash
node -c mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/feedback/kh/getTodoCount.js
```
Expected: 无语法错误输出。

**Step 3: 提交改动**

```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/feedback/kh/getTodoCount.js
git commit -m "perf: optimize getTodoCount by restricting fields for overdue checks"
```

---

### Task 2: 重构 getTodoList.js 惰性更新和数据查询顺序

**Files:**
- Modify: `mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/feedback/kh/getTodoList.js:13-146`

**Step 1: 重写 getTodoList 核心逻辑**

将 getTodoList 的业务流程调整为“先查询并清算逾期状态，再获取真正的数据列表”：

```javascript
		// 业务逻辑开始-----------------------------------------------------------
		// 1. 获取班次配置 Map
		let configs = await vk.baseDao.selects({ dbName: "key-point-cron-config" });
		let shiftMap = {};
		if (configs.rows) {
			configs.rows.forEach(c => shiftMap[c.shift_type] = c);
		}

		let now = new Date();
		let currentTime = now.getTime();

		// 2. 轻量惰性逾期清算：获取当前用户所有未处理任务（不联表，只查最小必要字段）
		let pendingTasks = await vk.baseDao.selects({
			dbName: "key-point-feedback",
			fieldJson: { _id: 1, shift_type: 1, shift_date: 1, _add_time: 1 },
			whereJson: {
				assignee_ids: uid,
				status: 0,
				is_del: _.neq(1)
			}
		});

		let overdueIds = []; // 收集本次查询发现的逾期 ID
		if (pendingTasks.rows) {
			for (let row of pendingTasks.rows) {
				let conf = shiftMap[row.shift_type];
				if (conf && conf.feedback_start && conf.feedback_end) {
					let dateStr = row.shift_date || vk.pubfn.timeFormat(row._add_time, "yyyy-MM-dd");
					let [year, month, day] = dateStr.split('-').map(Number);
					let physicalStartDate = new Date(year, month - 1, day, 0, 0, 0);
					if (conf.feedback_start >= "20:00") {
						physicalStartDate.setDate(physicalStartDate.getDate() - 1);
					}
					let [endH, endM] = conf.feedback_end.split(':').map(Number);
					let endTimeObj = new Date(physicalStartDate);
					if (conf.feedback_end < conf.feedback_start) {
						endTimeObj.setDate(endTimeObj.getDate() + 1);
					}
					endTimeObj.setHours(endH, endM, 0, 0);
					let endTime = endTimeObj.getTime();

					if (currentTime > endTime) {
						overdueIds.push(row._id);
					}
				}
			}
		}

		// 强同步更新数据库中的逾期状态
		if (overdueIds.length > 0) {
			await vk.baseDao.update({
				dbName: "key-point-feedback",
				whereJson: { _id: _.in(overdueIds), status: 0 },
				dataJson: { status: 2 }
			});
		}

		// 3. 安全拉取最新真正有效的数据列表（已过期的已被剔除）
		let selectRes = await vk.baseDao.selects({
			dbName: "key-point-feedback",
			whereJson: {
				assignee_ids: uid,
				status: 0,
				is_del: _.neq(1)
			},
			foreignDB: [
				{
					dbName: "base-point",
					localKey: "point_id",
					foreignKey: "_id",
					as: "point_info",
					limit: 1
				},
				{
					dbName: "base-area",
					localKey: "area_id",
					foreignKey: "_id",
					as: "area_info",
					limit: 1
				},
				{
					dbName: "uni-id-users",
					localKey: "assignee_ids",
					localKeyType: "array",
					foreignKey: "_id",
					as: "assignee_info",
					fieldJson: { _id: 1, real_name: 1, avatar: 1 },
					limit: 100
				},
				{
					dbName: "uni-id-users",
					localKey: "issuer_uid",
					foreignKey: "_id",
					as: "issuer_info",
					fieldJson: { _id: 1, real_name: 1, avatar: 1 },
					limit: 1
				},
				{
					dbName: "base-dept",
					localKey: "dept_id",
					foreignKey: "_id",
					as: "dept_info",
					fieldJson: { _id: 1, name: 1 },
					limit: 1
				}
			]
		});

		// 4. 注入反馈时间窗口状态 (仅包含 waiting 和 active)
		if (selectRes.rows) {
			for (let row of selectRes.rows) {
				let conf = shiftMap[row.shift_type];
				if (conf && conf.feedback_start && conf.feedback_end) {
					let dateStr = row.shift_date || vk.pubfn.timeFormat(row._add_time, "yyyy-MM-dd");
					let [year, month, day] = dateStr.split('-').map(Number);
					let physicalStartDate = new Date(year, month - 1, day, 0, 0, 0);
					if (conf.feedback_start >= "20:00") {
						physicalStartDate.setDate(physicalStartDate.getDate() - 1);
					}
					let [startH, startM] = conf.feedback_start.split(':').map(Number);
					let startTimeObj = new Date(physicalStartDate);
					startTimeObj.setHours(startH, startM, 0, 0);
					let startTime = startTimeObj.getTime();

					row._feedback_start = conf.feedback_start;
					row._feedback_end = conf.feedback_end;
					row._feedback_display_date = vk.pubfn.timeFormat(startTime, "yyyy-MM-dd");

					if (currentTime < startTime) {
						row._feedback_status = 'waiting';
					} else {
						row._feedback_status = 'active';
					}
				} else {
					row._feedback_status = 'active';
				}
			}
		}

		res.rows = selectRes.rows || [];
		res.total = selectRes.total || (selectRes.rows ? selectRes.rows.length : 0);
		res.hasMore = false;
		// 业务逻辑结束-----------------------------------------------------------
```

**Step 2: 静态代码检查**

```bash
node -c mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/feedback/kh/getTodoList.js
```
Expected: 无语法错误输出。

**Step 3: 提交改动**

```bash
git add mp-client/uniCloud-aliyun/cloudfunctions/router/service/client/feedback/kh/getTodoList.js
git commit -m "refactor: restructure getTodoList to clean up overdue tasks before querying rows"
```
