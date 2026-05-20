import json
import os
import re

log_file = r"C:\Users\xuchong\.gemini\antigravity\brain\65f66e24-1228-4f02-b8e1-63177d9ba9fd\.system_generated\logs\overview.txt"

with open(log_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

output = []
recording = False
for line in lines:
    if "The following is the current content of the file d:\\AI project\\2026\\wenmingshengchan\\mp-client\\pages\\showpoint\\showpoint.vue:" in line:
        recording = True
        output = []
        continue
    
    if recording:
        if "```" in line and len(output) > 0: # end of code block
            break
        output.append(line)

with open(r"d:\AI project\2026\wenmingshengchan\mp-client\showpoint_backup_1.vue", 'w', encoding='utf-8') as f:
    f.writelines(output)
print(f"Extracted {len(output)} lines")
