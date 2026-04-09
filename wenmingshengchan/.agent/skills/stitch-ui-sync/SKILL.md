---
name: stitch-ui-sync
description: Use when bridging UI layouts from Stitch MCP instances or design tools into native frontend code to ensure strict 1:1 visual mapping
---

# Stitch UI Sync

## Overview

Stitch UI Sync bridges the gap between Stitch MCP/Stitch designs and frontend code implementations. It enforces a strict bidirectional understanding of the DOM structure, CSS tokens, and component architecture required to map a visual design exactly to code.

## When to Use

- When using Stitch MCP tools (`get_project`, `get_screen`, etc.) to read design data
- When updating or executing frontend UI replication tasks
- When you need to extract and apply atomic CSS/Tailwind classes into native component structures (e.g., Vue `<style scoped>`)

## Core Pattern

When pulling from Stitch, **do not guess** margins, paddings, or colors.

1. **Query Stitch MCP**: Pull the precise `designSystem` and screen schema.
2. **Extract Tokens**: Map colors (surface, primary), fonts, and shadows directly to CSS variables or scoped classes.
3. **Replicate Structure**: Translate the node hierarchy (Level 0 Floor, Level 1 Container, Level 2 Glass, etc.) exactly.

## Common Mistakes

- **Eyeballing spacing**: Do NOT guess `padding-top: 10px` when the Stitch object specifies `padding: [12, 16]`. 
- **Losing effects**: Overlooking `backdrop-filter`, `mix-blend-mode`, or `box-shadow` properties defined in Stitch.

**Red Flags - STOP and Check Design**
- "I think `margin: 10px` is close enough."
- "I'll just use a generic button class."
- **All of these mean: Stop. Check the exact Stitch MCP or prototype property, and replicate.**
