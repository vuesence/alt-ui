# UI Component Library

A modern, accessible, and themeable UI component library built with Vue 3 and TypeScript.

## Features

- 🎨 Themeable with light, dark, and system themes
- 📱 Responsive design with mobile-first approach
- ♿ Accessible components following WAI-ARIA guidelines
- 🔍 Type-safe with full TypeScript support
- 🎯 Consistent design system with CSS variables
- 🚀 Modern Vue 3 Composition API

## Components

### Form Components

- `BaseInput`: Text input component with various states and validation
- `BaseSelect`: Select dropdown with options
- `BaseCheckbox`: Checkbox with indeterminate state support
- `BaseRadioGroup`: Radio button group with customizable items
- `BaseSwitch`: Toggle switch with label support

### Data Display Components

- `BaseTable`: Data table with sorting and editable cells
- `BaseSegmentGroup`: Segmented control for mutually exclusive options
- `BaseMenu`: Menu component for navigation or actions

## Usage

Import components and styles:

```javascript
// Import components
import { BaseInput, BaseSelect, BaseTable } from '../';

// Import utilities
import { cn, cssVar, pxToRem } from '../';

// Import types
import type { TableHeader, TableRow } from '../';
```

### Themes

The library supports three themes:
- Light theme (default)
- Dark theme
- System theme (follows system preferences)

To change the theme, set the `data-theme` attribute on the root element:

```html
<html data-theme="light">  <!-- or "dark" or "system" -->
```

### CSS Variables

The library uses CSS variables for consistent styling:

```css
:root {
  /* Colors */
  --alt-c-text-1: #18181b;
  --alt-c-surface-1: #ffffff;
  --alt-c-brand-1: #3b82f6;

  /* Spacing */
  --alt-space-1: 0.25rem;
  --alt-space-2: 0.5rem;
  --alt-space-3: 1rem;

  /* Typography */
  --alt-font-size-1: 1rem;
  --alt-font-weight-bold: 600;
}
```

### Responsive Design

The library includes responsive breakpoints:

```css
/* Small devices (640px and up) */
@media (min-width: 640px) { ... }

/* Medium devices (768px and up) */
@media (min-width: 768px) { ... }

/* Large devices (1024px and up) */
@media (min-width: 1024px) { ... }

/* Extra large devices (1280px and up) */
@media (min-width: 1280px) { ... }

/* 2XL devices (1536px and up) */
@media (min-width: 1536px) { ... }
```

## Development

### Demo

Check out the demo component at `src/ui/demo/UiDemo.vue` to see all components in action.

### Utilities

The library includes utility functions for:
- CSS class management
- CSS variable handling
- Unit conversion
- Media queries
- Type validation

### Contributing

1. Follow the Vue 3 Composition API style guide
2. Use TypeScript for type safety
3. Write descriptive prop and event names
4. Include JSDoc comments for documentation
5. Test components for accessibility
6. Maintain consistent styling with CSS variables 