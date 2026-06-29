# JChemistry Website Redesign — Project Progress

---

## Phase 1 — UX Audit
**Date:** June 28, 2026
**Role:** Senior UX Researcher & Product Manager
**Status:** ✅ Complete — Awaiting Client Approval

---

### Scope
Full UX audit of the existing JChemistry website based on 4 screenshots:
- `homepage_desktop.png`
- `course-list.png`
- `Course_details_page_FULL_VIEW.png`
- `main_website_FULL_VIEW.png`

---

### Key Findings Summary

#### Critical Issues (Must Fix Before Launch)
1. **No search functionality** — users cannot search across 30+ courses
2. **No testimonials or social proof** — zero trust signals on homepage, listing, or detail pages
3. **No course filtering or sorting** — listing page is an unsorted dump
4. **IA organized around batch durations (SKUs), not user goals** — fundamental mismatch with how students shop
5. **Single CTA on course detail page, no sticky enroll button** — conversion flow is broken
6. **Low contrast hero text** — fails WCAG AA; gray text on dark background
7. **Mobile: no sticky nav, no jump links, endless single-column scroll** — primary device audience is on mobile

#### High Priority Issues
- No instructor bio or credentials visible
- No FAQ section anywhere
- Identical AI-generated thumbnails across all course cards in a category
- No pricing context, no anchoring, no urgency signals
- Yellow syllabus highlights have no legend or explanation
- Gmail address in header undermines institutional trust
- No "About" page — platform credibility is completely absent
- Enrollment flow is opaque (no post-click confirmation of what happens)

#### Medium Priority Issues
- "Fixed Validity Batch" terminology unexplained on first encounter
- No breadcrumb on course detail page
- "Download App" given equal nav weight to "Courses"
- Curriculum and syllabus sections overlap and confuse each other
- Course cards show price but no ratings, duration summary, or difficulty

#### Low Priority Issues
- Copyright year stuck at 2021
- Footer column labels ("Useful Links," "Other Links") are meaningless
- Social icons in header are uncolored and low-visibility
- No "skip to main content" accessibility link

---

### Audit Categories Completed
- [x] UI Problems
- [x] UX Problems
- [x] Navigation Problems
- [x] Course Discovery Problems
- [x] Information Architecture Problems
- [x] Mobile Usability Problems
- [x] Conversion Problems
- [x] Trust-Building Problems
- [x] Accessibility Concerns
- [x] Performance Observations

---

### Recommended IA Restructure (High Level, for Phase 2 Validation)
Current IA groups courses by **batch duration** (3 months / 6 months / 1 year).
Proposed IA should group by **exam goal** → **subject** → **duration/format**:

```
Home
├── Courses
│   ├── CSIR-NET Prep
│   │   ├── Complete Course
│   │   ├── Physical Chemistry
│   │   ├── Organic Chemistry
│   │   └── Inorganic Chemistry
│   ├── GATE Prep
│   │   └── [same structure]
│   └── IIT-JAM Prep
│       └── [same structure]
├── Free Resources
│   └── Demo Course
├── About / Instructor
├── Results / Testimonials
├── FAQ
└── Contact
```

---

### Next Steps (Pending Approval)
- [x] Phase 2: IA, Sitemap, Flows & Navigation — complete
- [x] Phase 3: AntiGravity prompt engineering — complete
- [ ] Phase 4: AntiGravity implementation (client-executed)
- [ ] Phase 5: Review and QA of AntiGravity output

---

## Phase 3 — AntiGravity Prompt Engineering
**Date:** June 28, 2026
**Status:** ✅ Complete — Awaiting Client Approval

### Decision: 4 Prompts (not 1, not 8)

**Why not 1 prompt?**
A single prompt for a full homepage exceeds AntiGravity's reliable context window for quality output. Design system decisions made early (tokens, BEM naming, grid strategy) get contradicted or forgotten midway. The result is inconsistent CSS, broken accessibility, and unchecked layout at multiple breakpoints.

**Why not 6–8 prompts?**
More prompts means more context overhead per prompt (re-explaining what not to touch), more credit usage, and higher risk of drift between sessions. Each prompt boundary is a risk point — fewer boundaries = fewer risks.

**Why 4 specifically?**
Split along natural build phases where each phase produces something independently testable:
- Prompt 1: Design system + navigation → testable: does the nav work at all breakpoints?
- Prompt 2: Above-the-fold content → testable: does the exam filter and course grid work?
- Prompt 3: Below-the-fold + footer → testable: does the full page scroll correctly?
- Prompt 4: Polish + audit → testable: does it pass WCAG and SEO checks?

### Prompts Summary

| # | Prompt | Sections Covered | Key Risk Managed |
|---|--------|-----------------|-----------------|
| 1 | Foundation, Design System & Navigation | Design tokens, utility bar, primary nav, mega-menu, mobile nav, sticky bar | Design system drift in later prompts |
| 2 | Hero, Social Proof, Exam Picker, Courses | Hero, proof bar, exam filter, course grid | Exam filter JS and card render pattern |
| 3 | Instructor, Testimonials, How It Works, Demo CTA, Footer | 5 sections + footer | Section alternation, dark CTA section, footer grid |
| 4 | Polish, Performance, Accessibility, QA | Entire page audit and fix | WCAG failures, cross-breakpoint breaks, SEO gaps |

### Key Technical Decisions Made in Prompts
- Vanilla JS only — no frameworks, no libraries
- Inter font (400/500/600) via Google Fonts — single import
- CSS custom properties for every token in `:root`
- BEM class naming convention
- Mobile-first CSS with 4 breakpoints (375/768/1024/1280)
- Course cards and testimonials rendered via JS arrays, not hardcoded HTML
- Inline SVG for all icons — no icon font libraries
- CSS scroll snap for mobile testimonials — no JS carousel
- Schema.org JSON-LD: Course (×2), AggregateRating, Organization
- Content max-width: 1200px throughout
- Sticky mobile bottom bar replaces desktop "Enroll Now" on mobile

---

---

## Phase 2 — IA, Sitemap, Flows & Navigation
**Date:** June 28, 2026
**Status:** ✅ Complete — Awaiting Client Approval

### Deliverables Produced

#### 1. Sitemap
Full 3-level sitemap. Top-level pages: Home, Courses, Free Resources, About/Tutor, Results/Reviews, Contact/FAQ. Shared auth pages: Sign up, Log in, Student Dashboard. Course detail and Enroll/Payment pages are leaf nodes under the Courses branch.

#### 2. Information Architecture
IA restructured from SKU-first (batch duration) to **goal-first**:
- Tier 1: Exam goal (CSIR-NET / GATE / IIT-JAM)
- Tier 2: Subject (Complete / Physical / Organic / Inorganic)
- Tier 3: Duration (3 months / 6 months / 1 year / Test series only / Free demo)
- Leaf: Course detail page → Enroll

Mental model: "I need Physical Chemistry for CSIR-NET for 3 months" → 3 clicks to course detail.

#### 3. User Flow
Entry paths (direct, search, referral) → Homepage → Exam intent decision → Browse by exam OR search → Course detail → Demo (optional loop) → Sign up/log in → Payment → Dashboard.

#### 4. Navigation Structure
- Desktop: Single nav bar with logo, 5 nav items (Courses with mega-menu, Results, About, Free Resources, Search icon), Log in text link, "Enroll now" CTA button.
- Courses mega-menu: 3 columns (CSIR-NET / GATE / IIT-JAM), each listing subject sub-pages. Footer bar with "View all" and "Try free demo".
- Mobile: Hamburger with labeled stacked links + sticky bottom bar with Log in and Enroll now.

#### 5. Homepage Section Order
1. Hero banner (exam names + value prop + CTA) — Critical
2. Social proof bar (students enrolled, selections, reviews) — Critical
3. Exam goal picker (3 buttons) — Critical
4. Featured/popular courses (4–6 cards) — High
5. About the instructor — High
6. Student results + testimonials — High
7. How it works — Medium
8. Try free demo CTA — Medium
9. Download app — Medium
10. FAQ strip (top 5) — Low
11. Footer — Low

#### 6. Course Discovery Flow
Three entry paths (nav mega-menu, search bar, homepage exam picker) → Course listing page with 5 filters (exam, subject, duration, price, sort) → Filtered course cards → Course detail → Watch demo (loop) OR Enroll now.

#### 7. Purchase Flow
Enroll CTA → Auth check (sign up/log in if needed) → Order summary (price, validity dates, coupon, refund policy) → Payment (UPI/card/net banking + SSL badge) → Confirmation (receipt + email/SMS) → Student dashboard.

---

---

*Progress doc will be updated at the end of each phase. Previous entries are never removed.*
