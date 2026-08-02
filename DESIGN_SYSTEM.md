# Design System — Sakthivel Portfolio

This document is the single source of truth for the design, architecture, and implementation details of the portfolio website. It reflects the **current production implementation** in full. Any agent given this file should be able to reproduce the exact same visual design, motion choreography, and interaction behavior.

---

## 1. Product Surface

- **App type**: Single-page portfolio with a dedicated projects route and 404 page
- **Primary routes**:
  - `/` → cinematic portfolio narrative (home)
  - `/projects` → expanded project gallery with full project details
  - `*` → 404 Not Found fallback
- **Motion strategy**: GSAP + ScrollTrigger across all sections; Lenis smooth scrolling
- **Rendering**: Client-side SPA (Vite dev server on port 8080)
- **Hosting**: Vercel (configured via `vercel.json`)
- **Domain**: `https://sakthivel.daeq.in/`

---

## 2. Stack and Dependencies

### Runtime Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.3.1 | UI framework |
| `react-dom` | ^18.3.1 | DOM renderer |
| `react-router-dom` | ^6.30.2 | Client-side routing |
| `react-helmet-async` | ^2.0.5 | Per-route SEO `<head>` management |
| `gsap` | ^3.14.2 | Animation engine (GSAP + ScrollTrigger) |
| `@studio-freight/lenis` | ^1.0.42 | Smooth scroll engine |
| `lucide-react` | ^0.462.0 | Icon library (Sun, Moon, ArrowUpRight, ArrowLeft) |
| `@radix-ui/react-toast` | ^1.2.14 | Toast primitive (installed, not actively used in current UI) |
| `@radix-ui/react-tooltip` | ^1.2.7 | Tooltip primitive (installed, not actively used in current UI) |
| `sonner` | ^1.7.4 | Toast notifications (installed, not actively used in current UI) |
| `class-variance-authority` | ^0.7.1 | Variant utility (installed for design system extensibility) |
| `clsx` | ^2.1.1 | Class merging utility |
| `tailwind-merge` | ^2.6.0 | Tailwind class deduplication |
| `next-themes` | ^0.3.0 | Installed but **NOT used** — theme toggle is fully custom |

### Dev Dependencies

| Package | Purpose |
|---|---|
| `vite` ^5.4.19 | Build tool |
| `@vitejs/plugin-react-swc` | SWC-powered React transform |
| `typescript` ^5.8.3 | Type checking |
| `tailwindcss` ^3.4.17 | Utility-first CSS |
| `tailwindcss-animate` ^1.0.7 | Animation utilities plugin |
| `@tailwindcss/typography` ^0.5.16 | Prose styling plugin |
| `autoprefixer` + `postcss` | CSS post-processing |
| `eslint` + `typescript-eslint` | Linting |
| `vitest` + `@testing-library/react` + `jsdom` | Testing |

### Build Scripts

```json
{
  "dev": "vite",
  "build": "vite build",
  "build:dev": "vite build --mode development",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest",
  "verify": "npm run lint && npm run test && npm run build"
}
```

### Path Alias

- `@` → `./src` (configured in `vite.config.ts` and `tsconfig.app.json`)

---

## 3. Theme and Token System

Theme switching is handled by **manually toggling `.theme-light` on `<html>`** via a custom `ThemeToggle` component. State is persisted in `localStorage` under the key `"theme"` (`"light"` | `"dark"`). The `next-themes` package is installed but **not used**.

All tokens are HSL triplets (without the `hsl()` wrapper) consumed via `hsl(var(--token))`.

### 3.1 Core Tokens (`:root` — dark default)

Defined in `src/index.css`:

```css
--background: 0 0% 4%;
--foreground: 0 0% 95%;
--card: 0 0% 7%;
--card-foreground: 0 0% 95%;
--popover: 0 0% 7%;
--popover-foreground: 0 0% 95%;
--primary: 0 0% 95%;
--primary-foreground: 0 0% 4%;
--secondary: 0 0% 12%;
--secondary-foreground: 0 0% 95%;
--muted: 0 0% 15%;
--muted-foreground: 0 0% 55%;
--accent: 0 0% 18%;
--accent-foreground: 0 0% 95%;
--destructive: 0 84% 60%;
--destructive-foreground: 0 0% 95%;
--border: 0 0% 18%;
--input: 0 0% 18%;
--ring: 0 0% 55%;
--radius: 0rem;
```

### 3.2 Portfolio-Specific Tokens (dark)

```css
--hero-bg: 0 0% 4%;
--hero-fg: 0 0% 93%;
--manifesto-muted: 0 0% 25%;
--manifesto-active: 0 0% 96%;
--section-dark: 0 0% 4%;
--section-light: 0 0% 95%;
--pill-border: 0 0% 20%;
```

### 3.3 Inverted Section Tokens (Skills + Footer transition)

```css
--inv-bg: 0 0% 100%;
--inv-fg: 0 0% 4%;
--inv-muted: 0 0% 50%;
--inv-border: 0 0% 85%;
--inv-card-bg: 0 0% 8%;
--inv-card-fg: 0 0% 95%;
--inv-wave-1: 0 0% 94%;
--inv-wave-2: 0 0% 97%;
--inv-wave-3: 0 0% 100%;
```

### 3.4 Navigation Tokens

```css
--nav-bg: 0 0% 8%;
--nav-border: 0 0% 18%;
--nav-active-bg: 0 0% 95%;
--nav-active-fg: 0 0% 4%;
--nav-muted: 0 0% 60%;
```

### 3.5 Sidebar Tokens

```css
--sidebar-background: 0 0% 7%;
--sidebar-foreground: 0 0% 95%;
--sidebar-primary: 0 0% 95%;
--sidebar-primary-foreground: 0 0% 4%;
--sidebar-accent: 0 0% 12%;
--sidebar-accent-foreground: 0 0% 95%;
--sidebar-border: 0 0% 18%;
--sidebar-ring: 0 0% 55%;
```

### 3.6 Light Theme Overrides (`.theme-light`)

```css
--background: 0 0% 95%;
--foreground: 0 0% 4%;
--card: 0 0% 100%;
--card-foreground: 0 0% 4%;
--primary: 0 0% 8%;
--primary-foreground: 0 0% 95%;
--secondary: 0 0% 90%;
--secondary-foreground: 0 0% 8%;
--muted: 0 0% 90%;
--muted-foreground: 0 0% 40%;
--accent: 0 0% 85%;
--accent-foreground: 0 0% 8%;
--border: 0 0% 80%;
--input: 0 0% 80%;

--hero-bg: 0 0% 95%;
--hero-fg: 0 0% 10%;
--section-dark: 0 0% 95%;
--section-light: 0 0% 4%;
--manifesto-muted: 0 0% 70%;
--manifesto-active: 0 0% 8%;

/* Inverted section flips to dark in light mode */
--inv-bg: 0 0% 6%;
--inv-fg: 0 0% 95%;
--inv-muted: 0 0% 55%;
--inv-border: 0 0% 25%;
--inv-card-bg: 0 0% 92%;
--inv-card-fg: 0 0% 8%;
--inv-wave-1: 0 0% 12%;
--inv-wave-2: 0 0% 8%;
--inv-wave-3: 0 0% 6%;

/* Nav pill in light mode */
--nav-bg: 0 0% 96%;
--nav-border: 0 0% 82%;
--nav-active-bg: 0 0% 8%;
--nav-active-fg: 0 0% 95%;
--nav-muted: 0 0% 45%;
```

---

## 4. Tailwind Configuration

Defined in `tailwind.config.ts`:

- **Dark mode**: `class` strategy (via `darkMode: ["class"]`)
- **Container**: centered, `2rem` padding, max `1400px` at `2xl`
- **Colors**: All core tokens mapped through `hsl(var(--token))` — includes `background`, `foreground`, `primary`, `secondary`, `destructive`, `muted`, `accent`, `popover`, `card`, `sidebar` (with sub-keys: `primary`, `accent`, `border`, `ring`)
- **Border radius**: Uses `--radius` variable (set to `0rem` for sharp corners)
- **Keyframes**: `accordion-down` and `accordion-up` (Radix accordion support)
- **Plugins**: `tailwindcss-animate`

---

## 5. Typography

| Role | Font Family | Weight Range |
|---|---|---|
| Body / UI text | Inter | 300–700 |
| Display / Headings | Space Grotesk | 300–700 (up to 800 in hero) |

- **Loading**: Google Fonts via `<link>` in `index.html` with `preconnect`
- **Base behavior** (in `src/index.css`):
  - `html` → `font-family: 'Inter', sans-serif` with antialiasing
  - `h1–h6` → `font-family: 'Space Grotesk', sans-serif`
- **Fluid sizing**: Hero title uses `clamp()` — e.g., `clamp(72px, 20vw, 124px)` mobile, `clamp(112px, 19vw, 300px)` desktop
- **Letter spacing**: Hero title uses extreme tight tracking (`-0.07em`); labels use wide tracking (`0.14em` to `0.5em`)

---

## 6. Layout and Spacing

- **Full-width section architecture**: No fixed centered shell. Each section owns its own width and padding.
- **Common section paddings**:
  - Standard: `py-24 md:py-32`
  - Manifesto: `py-40 md:py-56`
  - Philosophy: `py-24 md:py-32`
  - Skills: `pb-32 pt-8`
- **Horizontal spacing patterns**:
  - `px-6` (mobile base)
  - `px-8 md:px-16` (standard sections)
  - `lg:px-24` (wider blocks like Skills)
- **Content max-widths**:
  - Hero grid: `max-w-[1400px]`
  - Manifesto blocks: `max-w-4xl mx-auto`
  - Philosophy descriptions: `max-w-md`
  - Skills bottom statement: `max-w-2xl`
  - Hero description: `max-w-[340px] md:max-w-[420px]`

---

## 7. Section Architecture

### 7.1 Home Route (`/` → `src/pages/Index.tsx`)

Render order inside `<SmoothScroll>`:

1. **`<Helmet>`** — Route-level SEO meta tags
2. **`<IntroLoader>`** — Conditional (hidden after first session play)
3. **`<ThemeToggle>`** — Fixed position button (top-right)
4. **`<main>`** — Animated entrance (`opacity: 0 → 1, y: 40 → 0`) after intro completes:
   1. `<HeroSection>`
   2. `<ManifestoSection>`
   3. `<ProjectsSection>`
   4. `<PhilosophySection>`
   5. `<SkillsSection>`
   6. `<FooterSection>`

**Behaviors**:
- Intro is skipped on repeat visits within the same session (`sessionStorage.getItem("intro_seen")`)
- Body overflow is locked during intro (`document.body.style.overflow = "hidden"`)
- Hash-based scroll (e.g., `/#selected-works-bottom`) is handled after intro with a 100ms delay
- `window.history.scrollRestoration = "manual"` is set on mount

### 7.2 Projects Route (`/projects` → `src/pages/Projects.tsx`)

Structure inside `<SmoothScroll>`:

1. **`<Helmet>`** — Route-level SEO
2. **`<ThemeToggle>`** — Fixed position
3. **Header**: Back link → `/#selected-works-bottom` with `<Magnetic>` + `<ArrowLeft>` icon
4. **Page heading**: "All Works" — `text-6xl md:text-8xl lg:text-9xl`
5. **Section 1 — "Main Projects"** (first 4): 2-column grid (`md:grid-cols-2`)
6. **Section 2 — "Upcoming / Ongoing Projects"** (remaining 2): 2-column grid
7. Each card has:
   - Clip-path image reveal animation
   - Desktop: Glassmorphism hover overlay with description, highlights, and "Explore Project" link
   - Mobile: Flowed layout below image with description, highlights, and link
   - Title, domain tag, and year/status metadata

**Behaviors**:
- Forces scroll to top on mount (native + Lenis `lenis-scroll-top` event)
- `activeProject` state drives hover highlight animations (image darkening, glass panel reveal, highlight item stagger)

### 7.3 NotFound Route (`*` → `src/pages/NotFound.tsx`)

- Centered 404 message with "Return to Home" link
- `noindex, nofollow` meta robots

---

## 8. Animation System

### 8.1 Global Animation Infrastructure

- **Lenis** drives smooth scrolling (`lerp: 0.07, smoothWheel: true`)
- **ScrollTrigger** synced via `lenis.on("scroll", ScrollTrigger.update)`
- **GSAP ticker** integration: `gsap.ticker.add(lenisTick)` with `lagSmoothing(0)`
- **Custom events** for scroll control:
  - `"lenis-scroll-to"` — `CustomEvent<{ id: string }>` → smooth scroll to element
  - `"lenis-scroll-top"` — Instant scroll to top
- **Cleanup**: All animation hooks use `gsap.context()` with `.revert()` on unmount

### 8.2 IntroLoader (`src/components/IntroLoader.tsx`)

A slot-machine themed intro experience:

**Phases**:
1. **Image preload**: All 4 project images (`redactify`, `voicesop`, `groundwork`, `daeq`) are preloaded with a 5s timeout fallback
2. **Entrance**: Frame scales in (`scale: 0.9 → 1`), lever slides in from right, hints and skip button stagger in
3. **Lever interaction**:
   - Drag knob downward (mouse or touch) — pull threshold is 40px
   - Quick click/tap (<250ms) also triggers the spin
   - Elastic rebound if pull is insufficient
4. **Reel spin**: 3 numeric reels (digits 0–9 repeated 3×) spin with staggered delays (`i * 0.35s`), land on `[1, 0, 0]` with `back.out(1.4)` easing
5. **Frame bounce**: Subtle `scale: 1.03` bounce on reel landing
6. **Lever → % morph**: Lever arm fades/shrinks out, `%` symbol rotates in with `back.out(1.8)`
7. **Hold "100%"**: Brief pause showing the result
8. **Fade to black**: Digits and dividers fade, frame background morphs to black
9. **Scale transition**: Frame scales to `25×` filling the screen, then fades out

**UI elements**:
- White background (`hsl(0 0% 100%)`) with black elements (monochrome)
- Responsive digit height: `--digit-h: 80px` mobile, `130px` desktop
- Desktop hint: Curved arrow SVG pointing to lever with "Drag the lever" text (pulsing)
- Mobile hint: Reversed arrow above the lever
- Skip button: Bottom-right, pill-shaped, `"Skip Intro"` — immediately calls `onComplete`

### 8.3 HeroSection (`src/components/sections/HeroSection.tsx`)

**Layout**: Full-screen section with background image and content overlay

**Elements**:
- Background: `hero.webp` image — `bg-cover bg-center`, fixed on desktop (`bg-scroll md:bg-fixed`)
- Radial gradient overlay: `radial-gradient(ellipse at center, rgba(10,10,10,0) 0%, rgba(10,10,10,0.4) 100%)`
- Bottom gradient: `linear-gradient(to bottom, ...)` for text readability
- Blur notice: Top-right floating text — "It's not low image quality ~ I blurred it on purpose :)"
- Content grid: `grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]`
- Left block: Name heading ("Sakthivel") + tagline pill ("I build products which / people can actually use")
- Right block: Description paragraph
- Meta bar (bottom): Social links (X, LinkedIn, GitHub) + "Scroll" indicator with line

**Entrance animations** (delay: 0.05s if returning, 3.7s if first visit):
1. Background fade in (1.2s)
2. Name clip-path reveal: `inset(100% 0 0 0) → inset(0%)` + `y: 80 → 0` (1.2s)
3. Tagline fade: `y: 20 → 0` (0.8s)
4. Description fade: `y: 15 → 0` (0.8s)

**Scroll exit** (`ScrollTrigger`, `start: "top top"`, `end: "60% top"`, `scrub: 0.6`):
- Background opacity fades (`1 - progress * 3.1`) with parallax translateY (`progress * 92px`)
- Content opacity fades linearly

### 8.4 ManifestoSection (`src/components/sections/ManifestoSection.tsx`)

**Layout**: 4 text blocks with numbered labels, SVG flowing line background

**Content blocks**:
1. "I don't begin with tools or trends. / I begin with intuition ~ / then turn it into systems."
2. "I design and ship complex software / by collapsing ideas directly / into production."
3. "From concept to live deployment, / faster than traditional / development allows. / [break] / No ceremony. No unnecessary layers. / Just software that works."
4. "Every project here started / as a question. / The answer became a product."

**Highlighted words**: `intuition`, `systems`, `ship`, `production`, `live`, `faster`, `No ceremony`, `works`, `question`, `product` — rendered with:
- Background bar: `hsl(var(--manifesto-active))` scaled from `scaleX(0) → 1`
- Text color: `hsl(var(--background))` (inverted) with `transition: color 0.3s ease`

**SVG line**: S-curve path drawn on scroll (`strokeDashoffset` animation, `scrub: 0.6`, stroke color `hsl(0 0% 25%)`, width `10`, opacity `0.5`)

**Text animations**:
- Per-line reveal: `y: 50 → 0, opacity: 0 → 1` with `power3.out`
- Symbol scramble: Each word scrambles through random symbols (`!@#$%&*+^?/<>{}[]~`) over 10 iterations at 30ms intervals, progressively revealing final text
- Highlight bar scales in 0.35s after line starts, staggered by index
- Reverse on scroll-back: lines fade down, highlight bars reset to `scaleX(0)`
- Block spacing: `mb-44 md:mb-64` between blocks

### 8.5 ProjectsSection (`src/components/sections/ProjectsSection.tsx`)

**Responsive split**: Uses `useIsMobile()` hook (breakpoint: 768px)

**Project data** (4 projects on home page):

| Title | Domains | Image |
|---|---|---|
| Redactify | AI Security, Privacy | `redactify.webp` |
| VoiceSOP | Applied AI, Automation | `voicesop.webp` |
| Groundwork | Developer Tooling, Architecture | `groundwork.webp` |
| daeq.in | Design, User Experience | `daeq.webp` |

**Mobile layout** (`<MobileProjects>`):
- Vertical stack with `gap-10`
- Each card: clip-path image reveal (`inset(100% 0 0 0) → inset(0%)`, 1.2s, `power4.out`), card fade-up (`y: 60 → 0`, 0.8s)
- Heading "All Works" animates in
- "View All Projects" magnetic CTA at bottom

**Desktop layout** (`<DesktopProjects>`):
- Horizontal pinned scroll: Sticky `top: 0`, `height: screen`, track moves with `x: -scrollAmount * progress`
- Heading "All Works" with per-character 3D reveal (`y: 120 → 0, rotateX: 90 → 0`, stagger 0.04s, perspective `600px`)
- Divider line scale-in after heading
- Cards: `w-[40vw]`, clip-path mask reveal, `scale: 0.92 → 1` on viewport entry, reverse on exit
- Image parallax: `xPercent: -8 * progress`
- Title/metadata fade-up with 0.15s delay after card
- "View All Projects" CTA as last track item (`w-[30vw]`)

### 8.6 PhilosophySection (`src/components/sections/PhilosophySection.tsx`)

**Layout**: `flex-col md:flex-row` — sticky left heading + scrolling right principles

**Left heading** (sticky on desktop: `md:h-screen md:sticky md:top-0`):
- Line 1: "I don't chase innovation." — fade-up
- Line 2: "I eliminate friction." — fade-up with 0.2s delay, `text-muted-foreground`

**Right principles** (4 cards):

| # | Title | Description |
|---|---|---|
| 01 | Applied AI | Not AI for AI's sake... |
| 02 | SaaS Architecture | Multi-tenant systems... |
| 03 | Rapid Deployment | From zero to production... |
| 04 | User-Centric Design | Beautiful interfaces... |

**Per-card animation timeline** (`trigger: card, start: "top 85%"`, `toggleActions: "play none none none"`):
1. Border line draws in: `scaleX: 0 → 1` (0.8s, `power2.inOut`)
2. Number fades: `y: 12 → 0` (0.6s)
3. Title fades up: `y: 24 → 0` (0.8s)
4. Description fades up: `y: 20 → 0` (0.8s)

### 8.7 SkillsSection (`src/components/sections/SkillsSection.tsx`)

**Layout**: SVG wave transition → inverted-theme content block

**Skills data**:
- **Core Languages & Platforms**: Python, C, Java, SQL, Firebase, Supabase, Vercel
- **AI & Intelligence**: Applied AI, AI Automations, Context Engineering, AI Designing
- **AI-Augmented**: JavaScript, React, Next.js, Tauri

**SVG waves** (3 paths, `viewBox: 0 0 1440 320`):
- Wave 1: Morphs from curved → flat (`scrub: 0.5`, `start: "top 100%"`, `end: "top 20%"`)
- Wave 2: Similar morph (`scrub: 0.8`, `start: "top 95%"`, `end: "top 15%"`)
- Wave 3: Similar morph (`scrub: 1.2`, `start: "top 90%"`, `end: "top 10%"`)
- Each wave fills with `hsl(var(--inv-wave-N))`
- Height: `clamp(160px, 25vw, 400px)`

**Skill chips**:
- Staggered entrance: `y: 60 → 0, opacity: 0 → 1`, stagger `0.04`, duration `0.6s`
- Two card styles:
  - **Outline** (`.skill-card-outline`): Border `1px solid hsl(var(--inv-border))`, hover fills with `hsl(var(--inv-card-bg))`
  - **Filled** (`.skill-card-filled`): Background `hsl(var(--inv-card-bg))`, hover fills with `hsl(var(--inv-border))`
- Hover text color changes are handled in CSS (`.skill-card-outline:hover .skill-label` → `hsl(var(--inv-card-fg))`)
- Shape: `rounded-full`, padding `px-6 py-3`

**Bottom statement**: "I don't just write code ~ I craft experiences that blur the line between design and engineering." — `text-2xl md:text-3xl`, `hsl(var(--inv-muted))`

### 8.8 FooterSection (`src/components/sections/FooterSection.tsx`)

**Layout**: Inverted-bg section → SVG morph transition → rounded contact container

**Dual SVG morph** (2 paths, `viewBox: 0 0 1440 300`):
- Path 1: Morphs from curved → flat (`scrub: 0.6`, `start: "top bottom"`, `end: "top 40%"`)
- Path 2: Morphs from curved → flat (`scrub: 1`, `start: "top bottom"`, `end: "top 35%"`)
- Both filled with `hsl(var(--section-dark))`
- Height: `clamp(120px, 20vw, 300px)`

**Contact container**: Dark rounded card (`borderRadius: "48px 48px 0 0"`, `marginTop: "-48px"`)
- Heading: "Ready to build / the future?" — fade-up from `y: 60` (1.2s)
- Email CTA: `sakthivel.hsr06@gmail.com` with `<Magnetic>` wrapper (strength: 30), `<ArrowUpRight>` icon, `hover:opacity-60`
- Social links: GitHub, LinkedIn, X — `opacity-70 hover:opacity-100`
- Bottom bar: "Built with only AI ~ and intention." — `opacity-60`, separated by `border-t border-border`

---

## 9. Interaction Patterns

### Magnetic Hover (`src/components/Magnetic.tsx`)

- Wraps CTA elements (footer email, "View All Projects" links, back link)
- Uses `gsap.quickTo` for elastic follow (`elastic.out(1, 0.3)`, 0.8s duration)
- Tracks mouse distance from element center; applies proportional offset within `maxDist` radius
- Resets to `(0, 0)` on mouse leave
- Configurable `strength` prop (default: 20)

### Theme Toggle (`src/components/ThemeToggle.tsx`)

- Fixed position: `top-6 right-6`, `z-[60]`
- Icons: `<Sun>` (dark mode) / `<Moon>` (light mode) from lucide-react, size 20, strokeWidth 1.5
- Toggle animates icon: `rotate: -90 → 0, scale: 0 → 1, opacity: 0 → 1` with `back.out(2)`, 0.5s (skipped on first mount)
- Entrance animation: `y: -20 → 0`, delay 4s (synced with intro completion)
- Persists to `localStorage.getItem("theme")`
- Toggles `.theme-light` class on `<html>` element

### View Cursor (CSS in `src/index.css`)

```css
.view-cursor {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: hsl(var(--foreground));
  color: hsl(var(--background));
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  pointer-events: none;
  position: fixed;
  z-index: 9999;
}
```

### Project Hover (Projects Page)

- Image filter: `brightness(0.6) saturate(1.2)` on hover, `brightness(1) saturate(1)` default
- Glass panel: `backdrop-filter: blur(20px) saturate(180%)`, `rgba(255,255,255,0.03)` background, `0.1` border opacity
- Highlight items: Staggered `opacity: 0 → 1, y: 10 → 0` (0.4s, stagger 0.05)
- Title opacity dims to 0.6 on hover

---

## 10. Responsive Strategy

- **Mobile-first** with Tailwind breakpoints: `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px)
- **`useIsMobile()` hook** (`src/hooks/use-mobile.tsx`): `window.matchMedia("(max-width: 767px)")`, returns boolean
  - Used in ProjectsSection to switch between vertical (mobile) and horizontal pinned (desktop) layouts
- **Hero**: `clamp()` for fluid title sizing, responsive grid columns, position offsets per breakpoint
- **IntroLoader**: `--digit-h` CSS variable responsive (80px → 130px at `md`)
- **Projects page**: Grid switches from 1-col to 2-col at `md`; glass panels hidden on mobile (`hidden md:block`) with flowed layout fallback
- **Hero background**: `bg-scroll md:bg-fixed` (parallax only on desktop)

---

## 11. SEO and Meta Infrastructure

### 11.1 Static Meta (`index.html`)

- Title: "Sakthivel ~ AI-Native Engineer"
- Description, keywords, robots (`index, follow, max-image-preview:large`), author, theme-color (`#0a0a0a`)
- Open Graph: title, description, type (`website`), locale (`en_US`), url, site_name, image (`og-image.svg`)
- Twitter Card: `summary_large_image`, site `@SAKTHIVEL_E_`
- JSON-LD structured data: `Person` + `WebSite` schema with `sameAs` links (GitHub, LinkedIn, X)

### 11.2 Per-Route Meta (`react-helmet-async`)

- **Home**: Title "Sakthivel | AI-Native Engineer", canonical, OG title/description/url
- **Projects**: Title "Projects | Sakthivel Portfolio", canonical `/projects`, OG tags
- **404**: Title "404 | Sakthivel Portfolio", `noindex, nofollow`

### 11.3 Social Links

- GitHub: `https://github.com/SAKTHIVEL280`
- LinkedIn: `https://www.linkedin.com/in/sakthivel-e-1924a0292/`
- X/Twitter: `https://x.com/SAKTHIVEL_E_`

---

## 12. Component Inventory

### 12.1 Route-Level Pages (`src/pages/`)

| File | Route | Lazy? |
|---|---|---|
| `Index.tsx` | `/` | Yes (`React.lazy`) |
| `Projects.tsx` | `/projects` | Yes (`React.lazy`) |
| `NotFound.tsx` | `*` | Yes (`React.lazy`) |

All routes are wrapped in `<Suspense fallback={null}>` inside `<HelmetProvider>` + `<BrowserRouter>`.

### 12.2 Custom Components (`src/components/`)

| Component | File | Purpose |
|---|---|---|
| `SmoothScroll` | `SmoothScroll.tsx` | Lenis wrapper; syncs GSAP ticker; custom scroll events |
| `IntroLoader` | `IntroLoader.tsx` | Slot machine intro with lever interaction + skip |
| `Magnetic` | `Magnetic.tsx` | Elastic mouse-follow wrapper for CTA elements |
| `ThemeToggle` | `ThemeToggle.tsx` | Sun/Moon icon toggle with localStorage persistence |

### 12.3 Section Components (`src/components/sections/`)

| Component | File | Section ID |
|---|---|---|
| `HeroSection` | `HeroSection.tsx` | `#hero` |
| `ManifestoSection` | `ManifestoSection.tsx` | `#manifesto` |
| `ProjectsSection` | `ProjectsSection.tsx` | `#projects` |
| `PhilosophySection` | `PhilosophySection.tsx` | `#philosophy` |
| `SkillsSection` | `SkillsSection.tsx` | `#skills` |
| `FooterSection` | `FooterSection.tsx` | `#footer` |

### 12.4 Hooks (`src/hooks/`)

| Hook | File | Purpose |
|---|---|---|
| `useIsMobile` | `use-mobile.tsx` | Media query hook, breakpoint at 768px |

### 12.5 Installed but Unused UI Primitives

The following Radix/Sonner packages are **installed in `package.json` but have no corresponding component files** in the current codebase. There is no `src/components/ui/` directory:
- `@radix-ui/react-toast`
- `@radix-ui/react-tooltip`
- `sonner`

---

## 13. Asset Inventory (`src/assets/`)

| File | Usage |
|---|---|
| `hero.webp` | HeroSection background image |
| `redactify.webp` | Redactify project card |
| `voicesop.webp` | VoiceSOP project card |
| `groundwork.webp` | Groundwork project card |
| `daeq.webp` | daeq.in project card |
| `kite.webp` | Kite Browser project card (Projects page only) |
| `studyvault.webp` | Study Vault project card (Projects page only) |

---

## 14. Project Data (Full Catalogue)

### Home Page Projects (4 — shown in ProjectsSection)

| Title | Domains | Image |
|---|---|---|
| Redactify | AI Security, Privacy | `redactify.webp` |
| VoiceSOP | Applied AI, Automation | `voicesop.webp` |
| Groundwork | Developer Tooling, Architecture | `groundwork.webp` |
| daeq.in | Design, User Experience | `daeq.webp` |

### Projects Page — All Projects (6 total)

**Main Projects (first 4)**:

| Title | Year | Link | Description | Highlights |
|---|---|---|---|---|
| Redactify | 2026 | redactify.daeq.in | AI-powered document redaction, 100% browser-side | BERT NER, PDF/DOCX/TXT, Zero data transmission |
| VoiceSOP | 2026 | github.com/SAKTHIVEL280/VoiceSOP | Voice → structured SOPs | Voice-to-SOP pipeline, AI formatting, Next.js+Supabase |
| Groundwork | 2026 | groundwork.daeq.in | Pre-code planning tool | 10 sections, Visual canvas+AI, Exportable briefs |
| daeq.in | 2025 | daeq.in | AI-native build partner for startups | 3× faster, Full design-to-deploy, AI workflows |

**Upcoming / Ongoing (last 2)**:

| Title | Year | Link | Description | Highlights |
|---|---|---|---|---|
| Kite Browser | 2026 | github.com/SAKTHIVEL280/Kite | Minimal focus browser | Liquid Glass UI, Adaptive Theme, Zero Telemetry |
| Study Vault | 2026 | github.com/SAKTHIVEL280/StudyVault | AI study management | Ask Your Notes chat, Flashcards, Concept Canvas |

---

## 15. Custom CSS (`src/index.css` — beyond tokens)

### Lenis Integration

```css
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
```

### Skill Card Hover Text

```css
.skill-card-outline:hover .skill-label { color: hsl(var(--inv-card-fg)); }
.skill-card-filled:hover .skill-label { color: hsl(var(--inv-fg)); }
```

### Global Base Styles

```css
* { @apply border-border; }
body { @apply bg-background text-foreground; overflow-x: hidden; }
```

---

## 16. Design Rules

1. **Achromatic palette only** — the entire design is grayscale (`0 0% N%`). Do NOT introduce colors unless a full token redesign is intentional.
2. **Token-driven colors** — all colors must be added via CSS custom properties, never hardcoded ad-hoc values (except the hero section which uses hardcoded `#0a0a0a`, `#d9d9d9`, `#000000` for deliberate theme-independence).
3. **GSAP for major choreography** — use GSAP + ScrollTrigger for all entrance, scroll, and transition animations. CSS transitions are reserved for hover states only.
4. **Cleanup all animation hooks** — always use `gsap.context()` and `.revert()` in `useEffect` cleanup.
5. **Section timing coherence** — maintain consistent easing (`power3.out` for entrances, `power2.in` for exits) and stagger patterns across routes.
6. **Mobile-first responsive** — design for mobile first, enhance at `md` and `lg` breakpoints.
7. **Lenis sync required** — any new ScrollTrigger usage must work within the existing Lenis integration.
8. **Session-aware intro** — the intro loader should only play once per browser session.
9. **Font pairing is fixed** — Inter for body, Space Grotesk for headings. Do not introduce other fonts.
10. **Inverted section pattern** — Skills and Footer use the `--inv-*` token set to create visual contrast. Maintain this pattern for any new contrast sections.

---

## 17. Maintenance Checklist

Before shipping visual or motion changes:

1. `npm run lint`
2. `npm run test`
3. `npm run build`
4. Verify all three routes:
   - `/`
   - `/projects`
   - `/*` (404)
5. Verify theme toggle works correctly in both modes
6. Verify key animation sequences:
   - IntroLoader (lever drag, skip button, reel spin, scale-out)
   - Hero entrance + scroll parallax
   - Manifesto text scramble + highlight bars
   - Projects: mobile vertical vs. desktop horizontal pinned scroll
   - Philosophy: sticky heading + principle card stagger
   - Skills: SVG wave morph + chip entrance
   - Footer: SVG morph + contact reveal + magnetic CTA
7. Test on both desktop and mobile widths (≥768px and <768px)
8. Verify Lenis smooth scroll is working and not conflicting with ScrollTrigger
