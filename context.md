# H2O Life — Hero Parallax Fix Log

**Status:** ✅ All phases complete  
**Last Updated:** 2026-02-14

---

## Phase 1 — Transparent Gap Fix

**Problem:** White/transparent checkered gap at top of hero on `localhost:3000`.

### Root Causes
1. Gradient started near-white `#e8f4fc`
2. Sky image only 55% height, no top bleed
3. Mountains/lake started at `top: 5%`
4. CSS `*` transition on `background-color` caused hydration flash
5. Container fallback `#b0d4ee` too light
6. Hero `<section>` had no fallback bg

### Fixes Applied
- [x] Gradient top color darkened
- [x] Sky layer: added top bleed, increased height
- [x] Mountains/lake: moved to top edge
- [x] Container bg updated
- [x] Hero fallback bg added
- [x] Removed `background-color` from `*` transition

---

## Phase 2 — Responsive Layer Sizing

**Problem:** Mountain perfect on mobile but too small on desktop landscape.

### Fixes Applied
- [x] Added `isPortrait` / `isUltrawide` aspect-ratio detection
- [x] Sky/mountains/lake heights adapt per aspect ratio
- [x] Rock repositions on portrait vs landscape
- [x] Leaves bleed increased to 10% all sides
- [x] Can uses `clamp(140px, 22vw, 280px)`

---

## Phase 3 — Desktop Mountain Tuning + Teal Fix

**Problem:** Mountain needed to touch top edge on desktop. Gradient had a  
teal-green cast (`#87CEEB`, `#6bbcd9`) that didn't match the natural scene.

### Fixes Applied
- [x] Mountains desktop: `top: -32%`, `width: 130%`, `height: 80%`
- [x] Removed teal-green tints from gradient
- [x] New palette: pure blue `#7CB9D6` base (no green)
- [x] Gradient: `#7CB9D6 → #8ec5de → #a3d1e8 → #8ec5de → #7CB9D6 → #5a9cb8`
- [x] Container bg: `#87CEEB` → `#7CB9D6`
- [x] Hero fallback: `#87CEEB` → `#7CB9D6`

### Current Mountain Values
| Aspect     | Top    | Width | Height |
|------------|--------|-------|--------|
| Portrait   | -5%    | 116%  | 70%    |
| Desktop    | -32%   | 130%  | 80%    |
| Ultrawide  | -30%   | 130%  | 100%   |

---

## Phase 4 — Entry Animations + Touch Parallax + Can Rotation (2026-02-14)

**Problem:** No entry animations, parallax only works on desktop (mouse), can rotation too slow.

### Entry Animations (GSAP timeline, buttery smooth)
- [x] **Mountains** — slide up from `y: 40%` with `opacity: 0` → position, 2.0s `power2.out`
- [x] **Lake** — fade in from `opacity: 0`, 1.8s
- [x] **Rock** — scale up from `y: 60%`, `scale: 0.8` with `back.out(1.2)` bounce, 1.6s
- [x] **Leaves** — sweep in from `y: 50%` bottom, 2.2s `power3.out`
- [x] All animations staggered for cinematic feel

### Touch Parallax (mobile/tablet)
- [x] `touchmove` handler — maps touch position to parallax offset (reduced multipliers: 10x/6y vs 14x/8y)
- [x] `touchend` — smoothly returns all layers to center (2.0s `power3.out`)
- [x] Gyroscope (`deviceorientation`) — uses `gamma`/`beta` for tilt-based parallax on mobile
- [x] All with longer `duration` for buttery smooth feel

### Can 360 Rotation
- [x] `autoRotateSpeed` increased from `0.3` → `0.6` (smooth continuous spin)
- [x] `dampingFactor` reduced from `0.05` → `0.03` (smoother damping)

---

## Decisions

- Color: `#7CB9D6` — pure blue, no green/teal cast
- Parallax speeds: Unchanged throughout
- CSS: `background-color` removed from global `*` transitions
- Touch parallax uses reduced multipliers (10/6) vs mouse (14/8) for comfortable mobile feel
- Gyroscope parallax uses even gentler values (8/5) for subtle tilt effect

---

## Phase 5 — Rock in Front + Fixed Position (2026-02-14)

**Problem:** Rock was behind can (z:4 vs z:12), moved during parallax, and needed to be bigger.

### Fixes Applied
- [x] Rock z-index: `4` → `14` (now renders IN FRONT of can)
- [x] Can z-index: `12` → `11` (behind rock)
- [x] Rock removed from parallax layer array — no longer moves with mouse/touch/gyro
- [x] Rock removed `will-change-transform` (static element now)
- [x] Rock size increased ~8%: desktop `660px/56vw`, ultrawide `700px/48vw`, portrait `460px/85vw`
- [x] Rock + can share same `left` center point (`68%` desktop, `55%` portrait)
- [x] Both use `translateX(-50%)` for perfect center alignment
- [x] Neither moves position during parallax — fully fixed

---

## Phase 6 — Mobile Interactivity + Layout Restructure (2026-02-14)

**Problem:** 3D can not interactive on mobile — text overlay (`zIndex: 18`, full height) blocked all touch events. SHOP NOW button and scroll indicator placement needed rework.

### Mobile Touch Fix
- [x] Text overlay wrapper set to `pointer-events-none` — all touch/mouse events pass through to 3D canvas
- [x] SHOP NOW button given `pointer-events-auto` — stays clickable
- [x] On portrait, text overlay height limited to `55%` — leaves bottom half fully unblocked for can interaction

### SHOP NOW Button Relocation
- [x] Removed from hero text overlay (was inline with text content)
- [x] Moved to standalone centered position at bottom of hero
- [x] Then moved OUT of hero section entirely into `page.tsx`
- [x] Now sits in black area (`#0A0F14`) between Hero and Features sections
- [x] Styled: `py-8` padding, centered, same pill style with border + backdrop blur

### Scroll Indicator Removed
- [x] Removed "Scroll" text + gradient line at bottom of hero
- [x] Was at `bottom: 40px`, `zIndex: 20` — no longer needed

### Files Modified
- `src/components/sections/Hero.tsx` — removed button + scroll indicator, added `pointer-events-none`
- `src/app/page.tsx` — added SHOP NOW button div between `<Hero />` and `<Features />`