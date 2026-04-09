---
name: stitch-import
description: Use when importing screen structures, CSS metrics, and hierarchical design data directly from Stitch MCP into the project frontend
---

# Stitch Import

## Overview

The `stitch-import` skill standardizes how to pull and interpret raw design configuration (such as component schema, tokens, and node hierarchies) from the Stitch MCP and map it strictly into a frontend codebase. This guarantees that visual specifications are imported programmatically rather than approximated.

## When to Use

- When querying Figma/Stitch screens via Stitch MCP server tools (e.g., `list_projects`, `get_screen`, `list_screens`).
- When extracting specific `node_tree` data (e.g. `flex-direction`, `padding`, `background-color`, `border-radius`) to translate into uniapp CSS layout classes.
- When porting entire page layouts from a `.pen` or Stitch project.

## Core Pattern

1. **Verify Target Screen**: Use the Stitch MCP `list_projects` and `list_screens` to confirm the exact UUID identifier of the layout screen requested by the user.
2. **Extract Node Tree Properties**: Call `get_screen` for the designated `screen_id`.
3. **Box-Model & Typography Parsing**: Map the exact nested object properties directly into your Vue `<style scoped>` metrics.
    - E.g., `gap: 20` -> `gap: 20px;`
    - `cornerRadius: [12, 12, 12, 12]` -> `border-radius: 12px;`
4. **Token Resolution**: Resolve remote image URLs (from `https://lh3.googleusercontent.com/...`) and inline them as `<image src="...">`.

## Common Mistakes

- Skipping the `padding` array translation inside Flexbox containers resulting in pinched UI content.
- Missing `mix-blend-mode` and nested absolute positioning within glass-morphic containers.

## Red Flags - STOP

- "The layout seems roughly like a 16px padding." 
- "I'll use default text styles because the JSON typography node is nested too deeply."
**All of these mean: Stop, explicitly find the Stitch attribute and parse its absolute value for exact UI alignment.**
