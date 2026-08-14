# Accessibility Analysis: Custom vs. Radix / shadcn/ui Implementation

## Overview
This document compares manually authored accessible React components against standard implementations from `shadcn/ui` (built on top of Radix UI primitives).

---

## Concrete Gaps Identified in Custom Implementation

### 1. Robust Focus Restoration & Portal Rendering (Modal)
- **Custom Gap:** Our custom `Modal` renders in-place inside the parent DOM tree. If parent containers use `overflow: hidden` or `z-index` stacking contexts, the modal can suffer visual clipping or z-index collisions. Furthermore, manual focus trapping relies on querying interactive elements via static string selectors (`querySelectorAll`), which misses edge cases like dynamically mounted elements, iframe contents, or custom elements.
- **shadcn/Radix Solution:** Radix uses `@radix-ui/react-portal` to render dialogs at the root body level and `@radix-ui/react-focus-scope` to reliably handle focus loops, dynamic content insertions, scroll locking, and strict restoration of the triggering element's focus state upon unmounting.

### 2. Automatic vs. Manual Tab Activation & Keyboard Navigation (Tabs)
- **Custom Gap:** In our custom `Tabs` implementation, arrow keys automatically change the active tab state (`setActiveTab`) immediately on focus change. While valid under W3C guidelines, complex tab panels requiring heavy data loading should support *manual activation* (where arrow keys move focus, but `Space` or `Enter` selects the tab).
- **shadcn/Radix Solution:** `shadcn/ui` provides built-in `activationMode="automatic | manual"` options out-of-the-box, handles RTL directionality (`dir="rtl"`) for Arrow Left/Right key swapping, and properly handles SSR rehydration without focus flashes.

---

## TypeScript Verification
All props strictly enforce strongly typed interfaces (`ModalProps`, `TabsProps`, `DisclosureProps`) with standard `React.ReactNode` for children and zero `any` type escapes.