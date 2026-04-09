# Design System Specification: Industrial Clarity

## 1. Overview & Creative North Star: "The Precision Lens"

This design system moves away from the cluttered, "dashboard-heavy" aesthetics of traditional industrial software. Our Creative North Star is **The Precision Lens**. We treat the WeChat Mini Program interface not as a flat screen, but as a high-tech optical instrument—a sheet of polished glass overlaid on the factory floor.

By utilizing glassmorphism, we achieve a sense of "Airy Authority." We break the standard template look through **Intentional Depth Layering**: using light, transparency, and blurred textures to create a workspace that feels organized yet infinite. The interface should feel like a premium piece of industrial equipment: precise, durable, and sophisticated.

---

## 2. Colors & Surface Philosophy

### The Industrial Palette
The palette is rooted in `primary` (#0050cb) for authority and a range of translucent neutrals to simulate depth.

*   **Primary (Industrial Blue):** Use `primary` (#0050cb) for critical actions and `primary_container` (#0066ff) for interactive states.
*   **Surface Hierarchy:** 
    *   **Base:** `surface` (#f7f9fb) with a subtle linear gradient to `primary_fixed` (#dae1ff).
    *   **Nesting:** Place `surface_container_lowest` (#ffffff) cards on `surface_container` (#eceef0) backgrounds to create natural separation.

### The "No-Line" Rule
Prohibit the use of 1px solid, opaque borders for sectioning. Structural boundaries are defined by:
1.  **Background Shifts:** Moving from `surface` to `surface_container_low`.
2.  **Translucency:** Using `rgba(255, 255, 255, 0.2)` glass surfaces against the textured background.

### Glass & Gradient Implementation
To achieve the "signature" look, floating cards must use:
*   **Background:** `rgba(255, 255, 255, 0.25)` (interpolated from `on_primary_container`).
*   **Blur:** `backdrop-filter: blur(20px)`.
*   **Texture:** A subtle 8px industrial grid pattern applied to the `background` layer, visible only through the glass components.

---

## 3. Typography: Editorial Precision

We use a high-contrast scale to ensure industrial data feels like an editorial report rather than a spreadsheet.

*   **Display & Headlines:** Use **Manrope** for numbers and English headers (`display-md`, `headline-sm`). This adds a modern, technical feel.
*   **Body & Labels:** Use **Inter** (or a clean system Sans-Serif for Chinese) for all functional text.
*   **The Professional Scale:** We favor `body-sm` (0.75rem) and `label-md` (0.75rem) for data density. Small text, when perfectly aligned and given generous tracking, communicates professional "precision."
*   **Hierarchy:** `on_surface` (#191c1e) for primary data; `on_surface_variant` (#424656) for secondary metadata.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved through "Tonal Stacking." An industrial sensor card should not just sit on a background; it should float within it.
*   **Level 0 (Floor):** Gradient `surface` with grid texture.
*   **Level 1 (Plinth):** `surface_container_low` for grouping large content areas.
*   **Level 2 (Active Glass):** Glassmorphic cards with `surface_container_lowest` at 20% opacity.

### Ambient Shadows
Forget heavy "Drop Shadows." Use **Ambient Glows**:
*   **Shadow Color:** A tinted version of `primary` at 5% opacity.
*   **Shadow Specs:** `box-shadow: 0 8px 32px 0 rgba(0, 80, 203, 0.08)`.

### The Ghost Border
For accessibility on glass elements, use a "Ghost Border":
*   `1px solid rgba(255, 255, 255, 0.2)` (derived from `outline_variant`). This catches the "light" at the edge of the glass without creating a hard cage around the data.

---

## 5. Components

### Cards & Lists
*   **Rule:** Forbid divider lines. 
*   **Style:** Use `xl` (0.75rem) roundedness for cards. Separate list items using 8px of vertical whitespace or a subtle toggle between `surface_container_lowest` and `surface_container_low`.
*   **Glass Cards:** Use for real-time monitoring stats. Ensure `backdrop-filter` is active to maintain readability over the grid background.

### Buttons (Industrial Grade)
*   **Primary:** `primary_container` background with `on_primary` text. Apply a subtle 2px inner-glow on top to simulate a physical button.
*   **Secondary:** Glassmorphic background (`rgba(255,255,255,0.2)`) with `primary` text.
*   **States:** On `hover` or `tap`, scale the button to `0.98` and increase shadow spread to simulate "pressing" into the glass.

### Input Fields
*   **Style:** Minimalist. No bottom line. Use a `surface_container_highest` background with `sm` (0.125rem) rounding.
*   **Focus:** Transition background to `primary_fixed` and add the "Ghost Border."

### Data Chips
*   **Status:** Use `tertiary_container` for warnings and `secondary_container` for neutral states. 
*   **Shape:** `full` (pill-shaped) for high scannability.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use strict alignment. Everything should snap to a 16px grid.
*   **Do** use `letter-spacing: 0.05em` for labels to increase the "high-end" feel.
*   **Do** leverage `surface_container_highest` for "inset" elements like search bars to create a 3D carved effect.

### Don't:
*   **Don't** use pure black (#000000). Always use `on_surface` for text to maintain the industrial blue-grey tint.
*   **Don't** stack glass on glass. One layer of glass is premium; two layers is a blur. Use a solid surface for the inner layer.
*   **Don't** use aggressive animations. Use "Industrial Damping": `cubic-bezier(0.2, 0.8, 0.2, 1)` for all transitions.

---

## 7. Signature WeChat Mini Program Components

*   **The Status Bar Blot:** Use a semi-transparent `surface_bright` blur at the top of the screen to allow the grid texture to fade out as the user scrolls, maintaining legibility of the system clock and icons.
*   **The Bottom Action Sheet:** A large, `xl` roundedness glass panel that slides up, utilizing `surface_container_lowest` at 80% opacity to ensure high contrast for navigation links.