# Base Data Schema Design (2026-04-19)

## Overview
This document finalizes the design decision to decouple User's Department and Group assignments into two distinct flat fields, transitioning away from the previous ambiguous single-field affiliation model.

## Design Decisions

### 1. Database Schema (`uni-id-users`)
To achieve maximal querying efficiency and simplify the data binding for frontend components (especially standard table and detail views), the schema is expanded:
- **`department_id`** (String): Explicitly represents the ID of the top-level parent Department (e.g., 安环部).
- **`group_id`** (String): Explicitly represents the ID of the secondary child Group/Squad (e.g., 巡检一班).

### 2. Frontend Registration (`/pages/user/register.vue`)
The cascader component naturally yields an array of selected node IDs, e.g., `[deptId, groupId]`.
The frontend will transmit this array or split it into two payload keys.

### 3. Cloud Function Logic (`client/user/updateUserInfo.js`)
When processing a registration or profile update:
- Extract `deptId` and `groupId` from the client's payload.
- Update the user record with both `department_id: deptId` and `group_id: groupId`.
- Include a safety invariant check: Optional verification that the provided `groupId` truly belongs to `deptId` by querying `base-dept` to prevent malicious or malformed API calls.

### 4. Admin Display (`admin/baseinfo/user/getList.js` & `list.vue`)
The data-table definition will declare two `foreignDB` bindings pointing to `base-dept`.
- Binding 1: `localKey: "department_id"` -> `as: "dept_info"`
- Binding 2: `localKey: "group_id"` -> `as: "group_info"`
The UI will render these side-by-side, resolving the issue where only the final leaf group name could be displayed.

## Trade-offs Considered
We considered keeping a single `group_id` and relying on the tree structure to retroactively determine the Department via `parent_id` lookup. While that ensures 100% structural integrity without redundancy, it severely degrades the DX (Developer Experience) and query performance when performing simple flat filtering operations on the `uni-id-users` table. The chosen **Flat-Two-Field** approach favors read performance and visual binding simplicity over strict 3NF database normalization.
