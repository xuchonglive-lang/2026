---
name: pixel-perfect
description: Use when implementing frontend UI components and the user requests exact 1:1 pixel perfection or prototype replication
---

# Pixel Perfect

## Overview

Pixel Perfect enforces absolute 1:1 fidelity between a design prototype and frontend output. It ensures no "AI aesthetics" or generic assumptions creep into the design replication.

## When to Use

- When the prompt includes "1:1", "复刻", or "pixel-perfect"
- When reproducing high-fidelity UI constraints
- When porting Tailwind layouts/classes to native or scoped CSS

## Core Pattern

1. **Extract Root Values**: Translate Tailwind grid structures, flex behaviors, and sizing metrics strictly into native CSS. E.g., `gap-6` MUST be `gap: 24px` or `gap: 1.5rem`.
2. **Reverse Engineer Gradients/Filters**: Replicate complex UI features like `bg-gradient-to-br from-surface` into exact linear-gradients parsing the design token hex codes.
3. **Typography Locking**: Explicitly map `font-family`, `tracking-wide` (`letter-spacing: 0.025em`), and `leading-tight` (`line-height: 1.2`). Do NOT rely on browser default headings.
4. **Interactive States**: Replicate `hover:scale-[0.98]` as `transform: scale(0.98)` with appropriate transition timesteps (e.g., `transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)`).

## Quick Reference 

| Tailwind Metric | CSS Translation |
|---|---|
| `shadow-[0_4px_20px_0_rgba(...)]` | `box-shadow: 0 4px 20px 0 rgba(...);` |
| `backdrop-blur-[20px]` | `backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);` |
| `tracking-[0.05em]` | `letter-spacing: 0.05em;` |
| `mix-blend-multiply` | `mix-blend-mode: multiply;` |

## Common Mistakes

- Ignoring line-heights and letter-spacing, which dramatically changes typographic feel.
- Using generic shadows (`box-shadow: 0 2px 4px rgba(0,0,0,0.1)`) instead of the custom ambient colored shadows extracted from the prototype `ambient-glow`.
