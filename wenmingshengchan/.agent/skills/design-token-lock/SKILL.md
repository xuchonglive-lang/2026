---
name: design-token-lock
description: Use when defining color palettes, typography, spacing, and radius variables to strictly enforce a design system
---

# Design Token Lock

## Overview

Design Token Lock ensures that frontend implementations operate off a strict, pre-defined set of design system tokens (e.g. variables for colors, typography, or spacing). It prevents random hardcoded values that pollute the UI.

## When to Use

- When building or refactoring a UI component library
- When implementing a CSS root token namespace (`:root { --md-sys-color-primary: ... }`)
- When translating Material Design 3 (MD3), Stitch Design System, or custom brand palettes into codebase configurations

## Core Pattern

1. **Never hardcode hexes** outside of the variable dictionary. If a button needs `#0066ff`, it should reference `var(--md-sys-color-primary)` or the mapped Tailwind alias classes (e.g., `bg-primary`, `bg-primary-container`).
2. **Standardize Font Families**: Group font stacks into tokens.
   `font-headline` → `font-family: 'Manrope', -apple-system, sans-serif;`
3. **Lock Padding/Margin Ratios**: Only utilize scale steps (e.g., `4px`, `8px`, `12px`, `16px`). Avoid arbitrary values like `11px` unless explicitly instructed by a layout glitch.
4. **Theme Toggles**: Always group tokens in a way that allows dark mode overrides (e.g., separate light/dark variables if required).

## Common Mistakes

- Writing inline pixel/hex values inside `<style scoped>` for widely reused colors.
- Using `rgba` overlays incorrectly instead of defining alpha-based tokens (e.g., `rgba(255, 255, 255, 0.4)` vs `var(--surface-container-alpha-40)`).

## Red Flags - STOP

- "I'll just hardcode `<text style="color: #666">` here temporarily."
- "I don't know what variable corresponds to gray, so I'll just use `#ccc`."
**All of these mean: Look up the design system token and use it instead.**
