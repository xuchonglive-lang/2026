import json
import os

log_file = r"C:\Users\xuchong\.gemini\antigravity\brain\32cb32c8-4752-4ed8-a666-91a5d3cddf49\.system_generated\logs\overview.txt"

with open(log_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

output = []
recording = False
for line in lines:
    if "The following code has been modified to include a line number before every line" in line and "pages/showpoint/showpoint.vue" in "".join(output[-10:]):
        recording = True
        output = []
        continue
    
    if recording:
        if line.startswith('The above content shows the entire') or line.startswith('{"step_index":'):
            break
        # remove line number prefix like "1: "
        if ":" in line:
            parts = line.split(":", 1)
            if parts[0].strip().isdigit():
                if parts[1].startswith(" "):
                    output.append(parts[1][1:])
                else:
                    output.append(parts[1])
            else:
                output.append(line)
        else:
            output.append(line)

with open(r"d:\AI project\2026\wenmingshengchan\mp-client\showpoint_backup_prev.vue", 'w', encoding='utf-8') as f:
    f.writelines(output)
print(f"Extracted {len(output)} lines from previous conversation log")
