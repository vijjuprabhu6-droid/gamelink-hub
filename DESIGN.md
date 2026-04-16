# Design Brief

## Direction

Gaming Community Hub — a bold, energetic game discovery platform with dark-first aesthetic and vibrant accent hierarchy.

## Tone

High-contrast gaming platform with tech-forward confidence; minimal decoration, maximum interactivity and clarity.

## Differentiation

Vivid purple primary + warm orange accents create gaming-specific energy; Space Grotesk headline + Bricolage Grotesque body establish modern, confident tone distinct from generic game sites.

## Color Palette

| Token      | OKLCH           | Role                                   |
|----------|-----------------|----------------------------------------|
| background | 0.14 0.01 260  | Deep charcoal base (dark mode primary) |
| foreground | 0.95 0.01 260  | High-contrast white text               |
| card       | 0.19 0.015 260 | Elevated surface for game cards        |
| primary    | 0.65 0.25 300  | Vivid violet for hero + CTAs           |
| accent     | 0.75 0.22 30   | Warm orange for secondary actions      |
| muted      | 0.25 0.02 260  | Subtle dividers + disabled states      |

## Typography

- Display: Space Grotesk — headings, hero text, interactive labels
- Body: Bricolage Grotesque — UI text, descriptions, metadata
- Scale: hero `text-6xl font-bold tracking-tight`, h2 `text-3xl font-bold`, label `text-xs font-semibold uppercase`, body `text-base`

## Elevation & Depth

Cards cast subtle shadows (`shadow-card`); interactive elements glow on hover via `glow-accent` utility. No stacked gradients or excessive depth — clarity through contrast.

## Structural Zones

| Zone    | Background          | Border              | Notes                              |
|---------|-------------------- |-------------------- |-----------------------------------|
| Header  | `bg-card` + border  | `border-border`     | Top nav with logo, search, profile |
| Content | `bg-background`     | —                   | Game link grid on dark base        |
| Footer  | `bg-muted/5` + border | `border-border`   | Links, attribution                 |

## Spacing & Rhythm

Grid gap 24px (lg), 16px (md), 12px (sm); section padding 32px (lg), 20px (md). Game cards use 12px internal padding. No irregular spacing — Tailwind default scale enforced.

## Component Patterns

- Buttons: primary `bg-primary text-primary-foreground`, secondary `border border-primary text-primary`, CTA `bg-accent text-accent-foreground`. All use `hover:opacity-90 transition-smooth`.
- Cards: `rounded-lg shadow-card bg-card`. Game cards include thumbnail, title, description, store badge, open link button.
- Badges: `rounded-full px-2 py-1 text-xs font-semibold` (Steam = blue, Epic = gray, itch.io = orange).

## Motion

- Entrance: `fade-in` (300ms) on page load, `slide-up` (300ms) on card appear.
- Hover: Primary buttons scale to 105% + `glow-accent`; cards lift slightly (`shadow-elevated`).
- Decorative: None — motion serves function only.

## Constraints

- No gradients or transparency blurs on backgrounds.
- Dark mode mandatory; no light mode toggle.
- All text must pass WCAG AA+ contrast (verified via OKLCH L difference).
- No animations exceed 300ms; cubic-bezier(0.4, 0, 0.2, 1) is standard.

## Signature Detail

Glowing purple accent underlines on interactive text labels (`text-accent-underline` utility) create gaming-forward identity while maintaining clarity and avoiding decoration overload.

