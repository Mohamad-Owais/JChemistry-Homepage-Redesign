# JChemistry Homepage Redesign — Phase 1 (Foundation & Navigation)

This is the production-ready code foundation for the JChemistry website redesign. JChemistry is an academic platform delivering premium coaching and course preparation for **CSIR-NET**, **GATE**, and **IIT-JAM** chemistry aspirants.

This phase implements the global design tokens, CSS styling resets, semantic layout grids, and the primary responsive navigation system.

---

## Folder Structure

The project has been organized with a strict separation of concerns, avoiding bloated monolithic files.

```
/
│
├── index.html                  # Main page entry. Contains semantic HTML5 tags and inline SVGs.
│
├── css/
│   ├── variables.css           # Global design system tokens (colors, typography, spacing, shadows).
│   ├── base.css                # Base document resets, custom focus ring outlines, and accessibility elements.
│   ├── layout.css              # Page containers, scroll lock controllers, and modal overlays.
│   ├── navigation.css          # Desktop mega menu columns, mobile drawer accordion, utility bar, and search overlays.
│   └── responsive.css          # Responsive breakpoint overrides for mobile/tablet/desktop.
│
├── js/
│   ├── accessibility.js        # Focus trap, keyboard loop containment, and restore-focus helpers.
│   ├── navigation.js           # Scroll triggers, mobile drawer toggle, overlay click listeners, and escape closures.
│   └── main.js                 # Global bootstrapping script, running event registrations on DOM ready.
│
└── README.md                   # Project documentation.
```

---

## Tech Stack

- **HTML5**: Semantic tags (`<header>`, `<nav>`, `<main>`, `<svg>`, `<kbd>`).
- **CSS3**: Variables, Flexbox, CSS Grid, Backdrop blur effects, smooth hardware-accelerated transitions.
- **Vanilla JavaScript (ES6+)**: Custom handlers, lightweight DOM selectors, and event listeners. No jQuery, Bootstrap, Tailwind, or libraries.

---

## Design System Custom Properties (`css/variables.css`)

All components leverage CSS Custom Properties defined in `:root`:
- **Colors**: Uses semantic naming conventions:
  - `--color-primary`: Premium deep academic navy blue (`#0e1e38`).
  - `--color-accent`: High-contrast conversion emerald green (`#0f9f68`).
  - `--color-bg`: Slate page background (`#f8fafc`).
  - `--color-text`: Highly legible slate text (`#0f172a`).
  - `--color-focus`: Contrast focus outline color (`#2563eb`).
- **Typography**: Single import of Inter font from Google Fonts. Standardized weights: 400, 500, 600, 700.
- **Spacing**: Rigid 4px spacing scale (`--space-1` = 4px, `--space-2` = 8px, `--space-3` = 12px, etc.).
- **Borders & Radii**: Smooth border widths and curved radii (`--radius-xs` up to `--radius-full`).
- **Shadows**: Apple/Stripe-style layered drop shadows (`--shadow-sm` to `--shadow-xl`).
- **Transitions**: Native cubic-bezier curves for hover states and drawers.

---

## Accessibility (WCAG AA Compliant)

- **Skip to Content Link**: A keyboard-accessible link at the top of the DOM allowing keyboard users to bypass navigation columns directly to `#main-content`.
- **Keyboard Focus Trap**: Tabbing remains locked within active overlays (mobile side drawer and search modal) to prevent blind tabs behind screen boundaries.
- **Escape Key Actions**: Active drawers and modal panels close instantly when the user presses `ESC`.
- **Aria Roles**: Programmatically switches `aria-expanded`, `aria-hidden`, and `aria-haspopup` in sync with javascript-triggered animations.
- **Min Touch Target**: All tap triggers, icons, and menus are padded to at least `44px × 44px` to meet mobile interaction standards.
- **Visible Outlines**: Focus rings are styled with high-contrast offsets (`:focus-visible`) to maintain a clean visual look for mouse clicks while keeping navigation visible for keyboard-only users.

---

## How to Run & Validate

1. Start a local preview server from the workspace root directory:
   - For example: `python -m http.server 8000` or double-click `index.html` in your browser.
2. Verify Desktop Interactions:
   - Hover or tab to the **Courses** menu item to trigger the fade-slide mega menu.
   - Click the search icon in the top right to open the trappable Search modal overlay.
   - Scroll down to check that the utility bar slides out of view and the main nav transitions to a sticky layout at the top.
3. Verify Mobile/Tablet Interactions:
   - Resize your browser below `1024px`.
   - The desktop menu links hide, a bottom sticky bar (Login/Enroll Now) appears, and the top header includes a hamburger icon.
   - Click the hamburger icon to slide open the side drawer menu. Click **Courses** in the drawer to toggle the nested links panel.

---

## Phase 2 Roadmap

The foundation is complete. In **Phase 2**, we will implement:
- **Hero Section**: Chemistry value propositions, CTAs, exam quick filters.
- **Social Proof Bar**: Trusted enrollment statistics and results.
- **Exam Picker**: Dynamic selection of GATE, CSIR-NET, or JAM.
- **Featured Course Grid**: Structured course card renders using javascript data arrays.
