import os
import re

# Mapping of file paths to titles
page_configs = {
    "pages/index/index.vue": {"title": "首页"},
    "pages/info/index.vue": {"title": "信息中心"},
    "pages/info/detail/index.vue": {"title": "信息详情"},
    "pages/plan/list.vue": {"title": "计划管理"},
    "pages/plan/feedback.vue": {"title": "计划反馈"},
    "pages/plan/history/index.vue": {"title": "历史计划"},
    "pages/keywork/project/list/index.vue": {"title": "重点项目"},
    "pages/keywork/project/process-feed/index.vue": {"title": "进度反馈"},
    "pages/keywork/project/apply-finish/index.vue": {"title": "申请结项"},
    "pages/keywork/project/result-view/index.vue": {"title": "成果查看"},
    "pages/feedback/todo-list/index.vue": {"title": "待反馈点位"},
    "pages/feedback/submit/index.vue": {"title": "提交反馈"},
    "pages/feedback/history/index.vue": {"title": "反馈历史"},
    "pages/report/submit-entry/index.vue": {"title": "报表提交"},
    "pages/report/public-board/index.vue": {"title": "公示板"},
    "pages/report/my-record/index.vue": {"title": "提交记录"},
    "pages/user/login/index.vue": {"title": "登录"},
    "pages/user/register/index.vue": {"title": "注册"},
    "pages/user/audit-status/index.vue": {"title": "审核状态"},
    "pages/user/mine/index.vue": {"title": "个人中心"},
    "pages/login/index.vue": {"title": "登录"},
    "pages/error/404/404.vue": {"title": "页面未找到"},
    "pages/template/list.vue": {"title": "模板列表"},
}

root_dir = r"d:\AI project\2026\wenmingshengchan\mp-client"

def process_file(rel_path, config):
    full_path = os.path.join(root_dir, rel_path.replace("/", "\\"))
    if not os.path.exists(full_path):
        print(f"Skipping {rel_path}: File not found")
        return

    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove existing cu-custom if any
    content = re.sub(r'<cu-custom.*?</cu-custom>', '', content, flags=re.DOTALL)
    
    # Prepare new cu-custom tag with :isCustom="true" for ALL pages
    title = config["title"]
    new_tag = f'\n    <cu-custom bgColor="bg-gradual-blue" :isCustom="true">\n      <block slot="backText"></block>\n      <block slot="content">{title}</block>\n    </cu-custom>'

    # Find the first tag inside <template>
    match = re.search(r'(<template>[\s\n]*<[a-zA-Z0-9\-]+[^>]*>)', content)
    if match:
        insertion_point = match.end()
        new_content = content[:insertion_point] + new_tag + content[insertion_point:]
        
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {rel_path}")
    else:
        print(f"Failed to find insertion point in {rel_path}")

for rel_path, config in page_configs.items():
    process_file(rel_path, config)
