# Design Brief — Makeupbyshiviagg

## Direction
Luxury editorial, celestial ethereal aesthetic. Premium makeup artist portfolio showcasing bridal and celebrity work. Deep, immersive dark environment with vibrant rose-pink and magenta accents. Every section elevated through 3D depth, floating elements, and animated glow effects.

## Tone
Luxurious, modern, sophisticated. Not minimal — intentional maximalism through carefully curated layering of depth, glow, and animation. Conveys exclusivity and artistry.

## Differentiation
Animated floating glow orbs in backgrounds. Blurry glowing text on key headers. 3D card transforms on services/testimonials. Celebrity badges as animated clusters. Full-page depth via layered shadows and glow effects.

## Palette

| Token | OKLCH | Usage |
| --- | --- | --- |
| Background | 0.08 0 0 | Deep navy-black base, immersive dark |
| Foreground | 0.94 0.01 320 | Cream off-white text, primary readable |
| Primary | 0.6 0.25 320 | Rose-pink, CTAs, key accents, glow effects |
| Secondary | 0.65 0.24 330 | Magenta, alternative highlights, depth |
| Accent | 0.75 0.15 65 | Soft gold, luxury touch, highlights |
| Card | 0.12 0.02 320 | Elevated card surfaces, slight pink tint |
| Border | 0.18 0.03 320 | Subtle pink-tinted dividers |
| Muted | 0.2 0.01 320 | Secondary text, reduced contrast |

## Typography

| Tier | Font | Role |
| --- | --- | --- |
| Display | Fraunces | Headers, hero titles, testimonials. Elegant serif conveys luxury. |
| Body | GeneralSans | Copy, descriptions, UI labels. Clean, modern, readable. |
| Mono | GeistMono | Code, metadata, timestamps. Monospace accent. |

## Elevation & Depth
- **Background**: Near-black canvas
- **Floating layers**: Cards with `shadow-card-elevated` (20px blur + glow)
- **Glow effects**: Blurry rose-pink orbs via `filter: blur()` and CSS shadows
- **Parallax**: Hero section with floating, animated background elements
- **3D transforms**: Cards scale/rotate on hover via Framer Motion

## Structural Zones

| Zone | Background | Style |
| --- | --- | --- |
| Hero | `bg-background` + animated glow orbs | Deep dark with floating elements, blurry text glow |
| Sections | Alternating `bg-background` / `bg-card/30` | Clean separation via subtle pink card tint |
| Cards | `bg-card` + `shadow-card-elevated` | Elevated with glow, soft rounded corners |
| CTAs | `bg-primary` + hover scale | Rose-pink, text-primary-foreground (dark) |
| Testimonials | `bg-card/40` + animated badges | Celebrity badges cluster around text with animation |

## Spacing & Rhythm
- Base unit: 1rem
- Sections: gap 3rem (24px)
- Cards: p-6 (24px internal padding)
- Headers: tracking-wide, letter-spacing increased for elegance
- Density: spacious, luxurious breathing room

## Component Patterns
- **Hero**: Full-width dark background, floating animated elements, centered premium image with glow border
- **Services**: Grid of 3D-transformed cards, hover scale + rotate via Framer Motion
- **Testimonials**: Celebrity badges cluster as animated badges, text with blurry glow
- **FAQ**: Accordion with smooth expand/collapse
- **CTA buttons**: `bg-primary` rose-pink, full-width or prominent placement
- **Floating buttons**: WhatsApp/Instagram, bottom-left/right, semi-transparent with glow hover state

## Motion
- **Fade-in**: 0.8s ease-out on section load
- **Slide-up**: 0.8s ease-out for content blocks
- **Float**: 6s infinite on decorative orbs, ease-in-out
- **Pulse-glow**: 3s infinite on glow shadows for ambient effect
- **Scale/rotate**: Hover on cards (Framer Motion scale 1.05, rotate 1deg)
- **Entrance**: Staggered animations per section for choreographed reveal

## Constraints
- No light mode — dark only
- No generic shadows; use glow effects exclusively
- All colors from OKLCH palette token, no arbitrary colors
- Font families set via CSS variables
- Border radius: `rounded-3xl` (1.5rem) for soft, organic feel

## Signature Detail
Blurry animated glow text on hero headers — achieved via `text-shadow` + `filter: blur()` + OKLCH pink with opacity. Floating orbs in background with semi-transparent glow, infinite float animation. Creates ethereal, luxurious, immersive atmosphere.
