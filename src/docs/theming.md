# Alt-UI Theming System

The Alt-UI library includes a powerful and flexible theming system that allows you to customize the visual appearance of components across different projects.

## Basic Usage

### 1. Theme Provider

The `ThemeProvider` manages theme selection and application. The library automatically initializes a default theme provider, but you can create your own with custom options:

```ts
import { ThemeProvider } from 'alt-ui';

// Use the default singleton
import { themeProvider } from 'alt-ui';

// Or create your own instance
const customThemeProvider = new ThemeProvider({
  defaultTheme: 'light',  // 'light', 'dark', 'system', or custom theme name
  storageKey: 'my-app-theme'  // localStorage key for persisting theme preference
});

// Apply a theme
themeProvider.applyTheme('dark');

// Get current theme
const currentTheme = themeProvider.getTheme();

// Get resolved theme (resolves 'system' to actual theme - 'light' or 'dark')
const resolvedTheme = themeProvider.getResolvedTheme();
```

### 2. Theme Toggle

The library provides a `ThemeToggle` component that makes it easy to add theme switching:

```ts
import { ThemeToggle } from 'alt-ui';

// Create a toggle with a button element
const button = document.getElementById('theme-toggle-btn');
const themeToggle = new ThemeToggle({ 
  element: button,
  themes: ['light', 'dark', 'system', 'custom'] // Available themes to toggle between
});

// Or with a select element
const select = document.getElementById('theme-select');
const themeToggle = new ThemeToggle({ element: select });

// Or with a container element (creates a select menu)
const container = document.getElementById('theme-container');
const themeToggle = new ThemeToggle({ element: container });
```

## Creating Custom Themes

### 1. Create a CSS Theme File

Create a CSS file for your custom theme following this pattern:

```css
/* my-custom-theme.css */
:root[data-theme="custom-theme-name"] {
  /* Primary Colors */
  --theme-primary-50: #f0f9ff;
  --theme-primary-100: #e0f2fe;
  /* ...and so on for all colors */
  
  /* Surface Colors */
  --theme-surface-1: #ffffff;
  /* ...and so on */
  
  /* Text Colors */
  --theme-text-1: #1f2937;
  /* ...and so on */
  
  /* Other theme variables as needed */
}
```

### 2. Import Your Theme File

Import your custom theme file in your application:

```ts
// Import the base styles and theme configuration
import 'alt-ui/styles';

// Import your custom theme
import './my-custom-theme.css';
```

### 3. Use the Theme

```ts
import { themeProvider } from 'alt-ui';

// Apply your custom theme
themeProvider.applyTheme('custom-theme-name');
```

## Using Theme Variables in Your Components

All components in the Alt-UI library use the theme variables. You can also use these variables in your own custom components:

```css
.my-component {
  color: var(--theme-text-1);
  background-color: var(--theme-surface-1);
  border: 1px solid var(--theme-border);
  box-shadow: var(--theme-shadow-1);
}

.my-button {
  background-color: var(--theme-primary-500);
  color: white;
}

.my-button:hover {
  background-color: var(--theme-primary-600);
}
```

## Available Theme Variables

The theme system provides a comprehensive set of variables that map to the design tokens:

- **Colors**
  - Primary: `--theme-primary-{50-900}`
  - Secondary: `--theme-secondary-{50-900}`
  - Accent: `--theme-accent-{50-900}`
  - Neutral: `--theme-neutral-{50-900}`
  - Functional: `--theme-success`, `--theme-warning`, `--theme-danger`, `--theme-info`

- **Surfaces**: `--theme-surface-{1-5}`
- **Text**: `--theme-text-{1-3}`
- **Background**: `--theme-bg`, `--theme-bg-alt`, `--theme-bg-soft`
- **Borders**: `--theme-border`, `--theme-divider`
- **Typography**: `--theme-font-family-{base|heading|mono}`
- **Shadows**: `--theme-shadow-{1-5}`
- **Border Radius**: `--theme-radius-{sm|base|md|lg|xl|full}`

## Theme Migration

When migrating an existing project to use the theming system:

1. Update all hardcoded color values to use theme variables
2. Replace direct design token references (e.g., `--alt-c-brand-1`) with theme variables (e.g., `--theme-primary-500`)
3. Create custom themes as needed for project-specific styling 