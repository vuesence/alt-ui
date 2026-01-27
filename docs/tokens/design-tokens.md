# Design Tokens

Design tokens are the fundamental building blocks of our design system, serving as the single source of truth for visual language and design principles.

## Token Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PRIMITIVE TOKENS                         │
│  (colors.css, typography.css, spacing.css, effects.css)     │
│                                                             │
│  --alt-c-brand-1-500    --alt-space-4    --alt-shadow-2     │
│  --alt-c-gray-200       --alt-radius-md  --alt-font-size-1  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    SEMANTIC TOKENS                          │
│           (light.css, dark.css - theme-dependent)           │
│                                                             │
│  --alt-c-text-1    --alt-c-surface-1    --alt-c-border      │
│  --alt-c-bg        --alt-c-divider      --alt-c-overlay     │
└─────────────────────────────────────────────────────────────┘
```

### Core Principles

1. **Single Source of Truth** — Primitives defined once in `tokens/`
2. **Theme Independence** — Primitives don't change between themes
3. **Semantic Mapping** — Themes only override semantic tokens
4. **No Hardcoded Values** — Always use tokens, never raw HEX/px

---

## Color Tokens

### Brand Colors (Primitives)

```css
/* Primary brand palette */
--alt-c-brand-1: #428AC8;           /* Base brand color */
--alt-c-brand-1-50:  #EBF3FA;       /* Lightest */
--alt-c-brand-1-100: #D7E7F5;
--alt-c-brand-1-200: #B0CFEB;
--alt-c-brand-1-300: #88B7E1;
--alt-c-brand-1-400: #619FD7;
--alt-c-brand-1-500: #428AC8;       /* Base = 500 */
--alt-c-brand-1-600: #346EA0;
--alt-c-brand-1-700: #275278;
--alt-c-brand-1-800: #1A3750;
--alt-c-brand-1-900: #0D1B28;       /* Darkest */

/* Secondary and accent palettes follow same pattern */
--alt-c-brand-2-{50-900}            /* Teal */
--alt-c-brand-3-{50-900}            /* Red/Accent */
```

### Functional Colors

```css
--alt-c-success:   #18794e;         /* Green - positive states */
--alt-c-warning:   #d97706;         /* Amber - caution states */
--alt-c-danger:    #dc2626;         /* Red - error/destructive */
--alt-c-info:      #0284c7;         /* Blue - informational */
--alt-c-attention: #f97316;         /* Orange - attention needed */
```

### Convenience Aliases

```css
--alt-c-brand:     var(--alt-c-brand-1-500);  /* Quick access to primary brand */
```

### Soft Variants (15% opacity backgrounds)

```css
--alt-c-success-soft:   color-mix(in srgb, var(--alt-c-success) 15%, transparent);
--alt-c-warning-soft:   color-mix(in srgb, var(--alt-c-warning) 15%, transparent);
--alt-c-danger-soft:    color-mix(in srgb, var(--alt-c-danger) 15%, transparent);
--alt-c-info-soft:      color-mix(in srgb, var(--alt-c-info) 15%, transparent);
--alt-c-attention-soft: color-mix(in srgb, var(--alt-c-attention) 15%, transparent);
--alt-c-brand-soft:     color-mix(in srgb, var(--alt-c-brand) 15%, transparent);
```

> **Dark theme note:** Soft variants are overridden in `dark.css` with 25% opacity for better visibility.

### Semantic Colors (Theme-dependent)

```css
/* Text hierarchy */
--alt-c-text-1: ...;   /* Primary text - most important */
--alt-c-text-2: ...;   /* Secondary text - supporting */
--alt-c-text-3: ...;   /* Tertiary text - subtle/disabled */

/* Surface layers */
--alt-c-surface-1: ...; /* Base background */
--alt-c-surface-2: ...; /* Elevated layer */
--alt-c-surface-3: ...; /* Higher elevation */
--alt-c-surface-4: ...; /* Even higher */
--alt-c-surface-5: ...; /* Highest */

/* Background aliases */
--alt-c-bg:      var(--alt-c-surface-1);
--alt-c-bg-alt:  var(--alt-c-surface-2);
--alt-c-bg-soft: var(--alt-c-surface-3);

/* Borders */
--alt-c-border:  ...;   /* Standard borders */
--alt-c-divider: ...;   /* Divider lines */

/* Overlay */
--alt-c-overlay: rgba(0, 0, 0, 0.5);  /* Modal backdrops */
```

---

## Typography Tokens

### Font Families

```css
--alt-font-family-base:    'Roboto', system-ui, sans-serif;
--alt-font-family-heading: 'Roboto Slab', serif;
--alt-font-family-mono:    ui-monospace, 'SF Mono', monospace;
```

### Font Sizes

```css
--alt-font-size-initial: 15px;    /* Root font size */
--alt-font-size-000: 0.625rem;    /* 10px - tiny */
--alt-font-size-00:  0.75rem;     /* 12px - caption */
--alt-font-size-0:   0.875rem;    /* 14px - small */
--alt-font-size-1:   1rem;        /* 16px - body */
--alt-font-size-2:   1.125rem;    /* 18px - large body */
--alt-font-size-3:   1.25rem;     /* 20px - h4 */
--alt-font-size-4:   1.5rem;      /* 24px - h3 */
--alt-font-size-5:   1.875rem;    /* 30px - h2 */
--alt-font-size-6:   2.25rem;     /* 36px - h1 */
```

### Font Weights

```css
--alt-font-weight-light:    300;
--alt-font-weight-regular:  400;
--alt-font-weight-medium:   500;
--alt-font-weight-semibold: 600;  /* Most common for emphasis */
--alt-font-weight-bold:     700;
```

### Line Heights

```css
--alt-line-height-0: 1.1;   /* Tight - headings */
--alt-line-height-1: 1.25;  /* Compact */
--alt-line-height-2: 1.5;   /* Normal - body text */
--alt-line-height-3: 1.75;  /* Relaxed */
--alt-line-height-4: 2;     /* Loose */
```

### Letter Spacing

```css
--alt-letter-spacing-tight:  -0.025em;  /* Headings */
--alt-letter-spacing-normal: 0;         /* Body */
--alt-letter-spacing-wide:   0.025em;   /* Uppercase, captions */
```

---

## Spacing Tokens

```css
--alt-space-0:  0.125rem;   /* 2px */
--alt-space-1:  0.25rem;    /* 4px */
--alt-space-2:  0.5rem;     /* 8px */
--alt-space-3:  0.75rem;    /* 12px */
--alt-space-4:  1rem;       /* 16px - base unit */
--alt-space-5:  1.5rem;     /* 24px */
--alt-space-6:  2rem;       /* 32px */
--alt-space-7:  2.5rem;     /* 40px */
--alt-space-8:  3rem;       /* 48px */
--alt-space-9:  3.5rem;     /* 56px */
--alt-space-10: 4rem;       /* 64px */
--alt-space-11: 4.5rem;     /* 72px */
--alt-space-12: 5rem;       /* 80px */
```

---

## Border Radius Tokens

```css
--alt-radius-sm:   0.125rem;  /* 2px - subtle rounding */
--alt-radius-base: 0.25rem;   /* 4px - default */
--alt-radius-md:   0.375rem;  /* 6px - medium */
--alt-radius-lg:   0.5rem;    /* 8px - large */
--alt-radius-xl:   0.75rem;   /* 12px - extra large */
--alt-radius-full: 9999px;    /* Pill/circle */
```

---

## Effect Tokens

### Shadows

```css
--alt-shadow-1: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--alt-shadow-2: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--alt-shadow-3: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--alt-shadow-4: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--alt-shadow-5: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

### Focus Ring

```css
--alt-focus-ring: 0 0 0 3px var(--alt-c-brand-1-200);
--alt-focus-ring-offset: 2px;
```

### Transitions

```css
--alt-transition-fast: 150ms;
--alt-transition-base: 250ms;
--alt-transition-slow: 350ms;

--alt-ease-in:     cubic-bezier(0.4, 0, 1, 1);
--alt-ease-out:    cubic-bezier(0, 0, 0.2, 1);
--alt-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Prebuilt transitions */
--alt-transition-colors:    var(--alt-transition-base) ease-in-out;
--alt-transition-transform: var(--alt-transition-base) var(--alt-ease-in-out);
--alt-transition-opacity:   var(--alt-transition-base) var(--alt-ease-in-out);
--alt-transition-all:       all 0.3s ease-in-out;
```

---

## Z-Index Tokens

```css
--alt-z-negative: -1;      /* Behind base layer */
--alt-z-elevate:  1;       /* Slightly elevated */
--alt-z-sticky:   100;     /* Sticky elements */
--alt-z-header:   200;     /* App header */
--alt-z-dropdown: 300;     /* Dropdowns, menus */
--alt-z-modal:    400;     /* Modal dialogs */
--alt-z-toast:    500;     /* Toast notifications */
--alt-z-tooltip:  600;     /* Tooltips (highest) */
```

---

## Layout Tokens

```css
--alt-layout-max-width:     1380px;
--alt-layout-content-width: 860px;
--alt-layout-sidebar-width: 272px;
--alt-layout-header-height: 4rem;
--alt-layout-footer-height: 3rem;
```

---

## Best Practices

### DO ✓

```css
/* Use semantic tokens for theme-aware styling */
.card {
  background: var(--alt-c-surface-2);
  color: var(--alt-c-text-1);
  border: 1px solid var(--alt-c-border);
}

/* Use spacing tokens for consistent layout */
.section {
  padding: var(--alt-space-4);
  gap: var(--alt-space-3);
}

/* Use font tokens for typography */
.title {
  font-size: var(--alt-font-size-4);
  font-weight: var(--alt-font-weight-semibold);
}

/* Use soft variants for subtle backgrounds */
.success-banner {
  background: var(--alt-c-success-soft);
  color: var(--alt-c-success);
}
```

### DON'T ✗

```css
/* DON'T hardcode colors */
.card {
  background: #f8fafc;  /* ✗ Use var(--alt-c-surface-2) */
  color: #333;          /* ✗ Use var(--alt-c-text-1) */
}

/* DON'T hardcode spacing */
.section {
  padding: 16px;        /* ✗ Use var(--alt-space-4) */
  margin-bottom: 24px;  /* ✗ Use var(--alt-space-5) */
}

/* DON'T use @media for mobile detection */
@media (max-width: 768px) {  /* ✗ Use .mobile class */
  .sidebar { display: none; }
}

/* DO use body class for responsive */
.mobile .sidebar { display: none; }  /* ✓ */
```

---

## File Structure

```
src/styles/
├── tokens/
│   ├── colors.css      # Primitive colors (brand, gray, functional)
│   ├── typography.css  # Font families, sizes, weights
│   ├── spacing.css     # Space scale, radius, layout
│   └── effects.css     # Shadows, transitions, z-index
├── theme/
│   ├── light.css       # Light theme semantic mappings
│   ├── dark.css        # Dark theme semantic mappings
│   └── system.css      # System preference detection
├── base/
│   ├── reset.css       # CSS reset
│   ├── fonts.css       # Font imports
│   ├── animations.css  # Keyframe animations
│   └── badge.css       # Badge utility classes
└── index.ts            # Central export
```

---

## Adding New Tokens

1. **Identify the category** — Is it a primitive or semantic token?
2. **Add to appropriate file** — `tokens/` for primitives, `theme/` for semantic
3. **Follow naming convention** — `--alt-{category}-{name}[-{variant}]`
4. **Document the token** — Update this file
5. **Use consistently** — Never mix tokens with hardcoded values

### Naming Convention

```
--alt-{category}-{name}[-{variant}]

Examples:
--alt-c-brand-1-500      # color, brand-1, shade 500
--alt-font-size-2        # font, size, scale 2
--alt-space-4            # space, scale 4
--alt-shadow-3           # shadow, level 3
--alt-c-success-soft     # color, success, soft variant
```
